<#
.SYNOPSIS
  IELTS Coach content sync. Downloads lesson packs (content channel, see content/CONTRACT.md)
  into app/content-packs/ without needing an app release.

.DESCRIPTION
  - Downloads content/manifest.json from GitHub (raw.githubusercontent.com, branch main).
  - Downloads every pack whose local copy is missing or whose sha256 differs; verifies sha256.
  - Downloads missing audio assets to app/content-packs/audio/<file> (browser-like User-Agent).
  - Removes packs (and audio files) that are no longer listed.
  - Rewrites app/content-packs/index.js LAST (temp file + move), so a failed sync leaves
    the previous index working.
  - Only ever writes inside app/content-packs/ (git-ignored). Never touches git-tracked files.
  - Logs to scripts/auto-update.log. Always exits 0.

  Windows PowerShell 5.1 compatible, no external dependencies. ASCII-only source.

.PARAMETER ManifestUrl
  Manifest location (http(s) or file:// - the latter is for testing). Packs are fetched relative to it.

.PARAMETER DryRun
  Only report what would happen. Nothing is written except the log.
#>
[CmdletBinding()]
param(
    [string]$ManifestUrl = 'https://raw.githubusercontent.com/jhinezeal123/ielts-personal-coach/main/content/manifest.json',
    [switch]$DryRun
)

Set-StrictMode -Version 2.0
$ErrorActionPreference = 'Stop'

$RepoRoot  = Split-Path -Parent $PSScriptRoot
$LogFile   = Join-Path $PSScriptRoot 'auto-update.log'
$AppDir    = Join-Path $RepoRoot 'app'
$Dest      = Join-Path $AppDir 'content-packs'
$PacksDir  = Join-Path $Dest 'packs'
$AudioDir  = Join-Path $Dest 'audio'
$TmpDir    = Join-Path $Dest '.tmp'
$IndexJs   = Join-Path $Dest 'index.js'
$UserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36 IELTS-Coach-Sync'
$Utf8      = New-Object System.Text.UTF8Encoding($false)

function Write-Log {
    param([string]$Message, [string]$Level = 'INFO')
    $prefix = '[sync] '
    if ($DryRun) { $prefix = '[sync] [dry-run] ' }
    $line = '{0} [{1}] {2}{3}' -f (Get-Date -Format 'yyyy-MM-dd HH:mm:ss'), $Level, $prefix, $Message
    Write-Host $line
    try { [System.IO.File]::AppendAllText($LogFile, $line + [Environment]::NewLine, $Utf8) } catch { }
}

# Refuse any path outside app/content-packs (defence in depth: we never write elsewhere).
function Assert-Inside {
    param([string]$Path)
    $full = [System.IO.Path]::GetFullPath($Path)
    $root = [System.IO.Path]::GetFullPath($Dest).TrimEnd('\') + '\'
    if (-not $full.StartsWith($root, [System.StringComparison]::OrdinalIgnoreCase)) {
        throw "Refusing to write outside app/content-packs: $full"
    }
    return $full
}

function Get-Download {
    # Downloads $Url to $OutFile (overwrites). Supports http(s) and file:// (testing).
    param([string]$Url, [string]$OutFile, [int]$TimeoutSec = 60)
    $out = Assert-Inside $OutFile
    $req = [System.Net.WebRequest]::Create($Url)
    $req.Timeout = $TimeoutSec * 1000
    if ($req -is [System.Net.HttpWebRequest]) {
        $req.UserAgent = $UserAgent
        $req.ReadWriteTimeout = $TimeoutSec * 1000
        $req.AllowAutoRedirect = $true
        $req.Accept = '*/*'
        $req.AutomaticDecompression = [System.Net.DecompressionMethods]::GZip -bor [System.Net.DecompressionMethods]::Deflate
    }
    $resp = $null; $in = $null; $fs = $null
    try {
        $resp = $req.GetResponse()
        $in = $resp.GetResponseStream()
        $fs = [System.IO.File]::Create($out)
        $buf = New-Object byte[] 65536
        while (($n = $in.Read($buf, 0, $buf.Length)) -gt 0) { $fs.Write($buf, 0, $n) }
    } finally {
        if ($fs) { $fs.Dispose() }
        if ($in) { $in.Dispose() }
        if ($resp) { $resp.Close() }
    }
}

function Get-Sha256 {
    param([string]$Path)
    return (Get-FileHash -LiteralPath $Path -Algorithm SHA256).Hash.ToLowerInvariant()
}

function Move-Into {
    # Atomic-ish replace: move temp file over the destination.
    param([string]$From, [string]$To)
    $to = Assert-Inside $To
    $dir = Split-Path -Parent $to
    if (-not (Test-Path -LiteralPath $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
    if (Test-Path -LiteralPath $to) { Remove-Item -LiteralPath $to -Force }
    Move-Item -LiteralPath $From -Destination $to -Force
}

function Read-PreviousIndex {
    # Returns the previous index object or $null. index.js = "window.IELTS_CONTENT_INDEX = {json};"
    if (-not (Test-Path -LiteralPath $IndexJs)) { return $null }
    try {
        $t = [System.IO.File]::ReadAllText($IndexJs)
        $a = $t.IndexOf('{'); $b = $t.LastIndexOf('}')
        if ($a -lt 0 -or $b -le $a) { return $null }
        return ($t.Substring($a, $b - $a + 1) | ConvertFrom-Json)
    } catch { return $null }
}

function Get-Prop {
    param($Obj, [string]$Name)
    if ($null -eq $Obj) { return $null }
    $p = $Obj.PSObject.Properties[$Name]
    if ($p) { return $p.Value }
    return $null
}

function Test-SafeRelPath {
    param([string]$Rel)
    if ([string]::IsNullOrWhiteSpace($Rel)) { return $false }
    if ($Rel -notmatch '^[A-Za-z0-9._-]+(/[A-Za-z0-9._-]+)*$') { return $false }
    foreach ($seg in $Rel.Split('/')) { if ($seg -eq '.' -or $seg -eq '..') { return $false } }
    return $true
}

function Invoke-Sync {
    Write-Log "Content sync started ($ManifestUrl)"
    try {
        [Net.ServicePointManager]::SecurityProtocol = [Net.ServicePointManager]::SecurityProtocol -bor [Net.SecurityProtocolType]::Tls12
    } catch { }

    # Safety: app/content-packs must not contain git-tracked files.
    if (Get-Command git -ErrorAction SilentlyContinue) {
        $old = $ErrorActionPreference; $ErrorActionPreference = 'Continue'
        try { $tracked = & git -C $RepoRoot ls-files -- 'app/content-packs' 2>$null } finally { $ErrorActionPreference = $old }
        if ($tracked) { Write-Log 'app/content-packs contains git-tracked files; refusing to sync.' 'ERROR'; return }
    }

    $isFileManifest = $ManifestUrl -match '^file:'
    if (-not $DryRun) {
        foreach ($d in @($Dest, $PacksDir, $AudioDir, $TmpDir)) {
            if (-not (Test-Path -LiteralPath $d)) { New-Item -ItemType Directory -Path $d -Force | Out-Null }
        }
    } elseif (-not (Test-Path -LiteralPath $TmpDir)) {
        # Dry run still needs a scratch place for the manifest; use the system temp folder.
        $script:TmpDir = Join-Path ([System.IO.Path]::GetTempPath()) ('ielts-sync-' + [guid]::NewGuid().ToString('N'))
        $script:Dest = $TmpDir
        New-Item -ItemType Directory -Path $TmpDir -Force | Out-Null
    }

    # --- manifest -----------------------------------------------------------
    $mTmp = Join-Path $TmpDir 'manifest.json'
    try {
        Get-Download -Url $ManifestUrl -OutFile $mTmp -TimeoutSec 60
        $manifest = [System.IO.File]::ReadAllText($mTmp, $Utf8) | ConvertFrom-Json
    } catch {
        Write-Log ("Could not download/parse manifest: " + $_.Exception.Message) 'WARN'
        return
    } finally {
        if (Test-Path -LiteralPath $mTmp) { Remove-Item -LiteralPath $mTmp -Force -ErrorAction SilentlyContinue }
    }
    if ((Get-Prop $manifest 'schema') -ne 1) { Write-Log ("Unsupported manifest schema: " + (Get-Prop $manifest 'schema')) 'WARN'; return }
    $contentVersion = Get-Prop $manifest 'contentVersion'
    $base = $ManifestUrl.Substring(0, $ManifestUrl.LastIndexOf('/') + 1)
    $prev = Read-PreviousIndex
    $prevPacks = @()
    if ($prev -and (Get-Prop $prev 'packs')) { $prevPacks = @(Get-Prop $prev 'packs') }

    $entries = New-Object System.Collections.ArrayList
    $keepPackFiles = @{}
    $keepAudio = @{}
    $stats = @{ packsNew = 0; packsSame = 0; packsFailed = 0; assetsNew = 0; assetsFailed = 0 }

    foreach ($p in @(Get-Prop $manifest 'packs')) {
        if ($null -eq $p) { continue }
        $id = [string](Get-Prop $p 'id')
        $file = [string](Get-Prop $p 'file')
        $sha = ([string](Get-Prop $p 'sha256')).ToLowerInvariant()
        if ($id -notmatch '^[a-z0-9][a-z0-9-]*$' -or $file -ne "packs/$id.js" -or $sha -notmatch '^[0-9a-f]{64}$') {
            Write-Log "Skipping invalid manifest entry (id '$id', file '$file')." 'WARN'
            continue
        }
        $local = Join-Path $PacksDir ($id + '.js')
        $entry = [ordered]@{ id = $id; file = $file; version = (Get-Prop $p 'version'); minAppVersion = (Get-Prop $p 'minAppVersion') }
        $ok = $false
        if ((Test-Path -LiteralPath $local) -and ((Get-Sha256 $local) -eq $sha)) {
            $ok = $true; $stats.packsSame++
        } elseif ($DryRun) {
            Write-Log "Would download pack $id"
            $ok = $true; $stats.packsNew++
        } else {
            $tmp = Join-Path $TmpDir ($id + '.js.part')
            try {
                Get-Download -Url ($base + $file) -OutFile $tmp -TimeoutSec 120
                $got = Get-Sha256 $tmp
                if ($got -ne $sha) { throw "sha256 mismatch (expected $sha, got $got)" }
                Move-Into -From $tmp -To $local
                $ok = $true; $stats.packsNew++
                Write-Log "Pack $id updated (version $($entry.version))."
            } catch {
                $stats.packsFailed++
                Write-Log ("Pack $id failed: " + $_.Exception.Message) 'WARN'
                if (Test-Path -LiteralPath $tmp) { Remove-Item -LiteralPath $tmp -Force -ErrorAction SilentlyContinue }
                # Keep serving the previous copy (with its previous index entry), if any.
                $old = $prevPacks | Where-Object { $_ -and (Get-Prop $_ 'id') -eq $id } | Select-Object -First 1
                if ($old -and (Test-Path -LiteralPath $local)) {
                    $entry = [ordered]@{ id = $id; file = $file; version = (Get-Prop $old 'version'); minAppVersion = (Get-Prop $old 'minAppVersion') }
                    $ok = $true
                    Write-Log "Keeping previous copy of pack $id."
                }
            }
        }
        if (-not $ok) { continue }
        [void]$entries.Add($entry)
        $keepPackFiles[($id + '.js').ToLowerInvariant()] = $true

        # --- assets (download when missing; app falls back to the remote URL if this fails) ---
        foreach ($a in @(Get-Prop $p 'assets')) {
            if ($null -eq $a) { continue }
            $af = [string](Get-Prop $a 'file'); $au = [string](Get-Prop $a 'url')
            if (-not (Test-SafeRelPath $af)) { Write-Log "Pack $id - unsafe asset path '$af' skipped." 'WARN'; continue }
            $schemeOk = ($au -match '^https?://') -or ($isFileManifest -and $au -match '^file:')
            if (-not $schemeOk) { Write-Log "Pack $id - asset '$af' has an unsupported URL; skipped." 'WARN'; continue }
            $keepAudio[$af.ToLowerInvariant()] = $true
            $target = Join-Path $AudioDir ($af -replace '/', '\')
            if ((Test-Path -LiteralPath $target) -and ((Get-Item -LiteralPath $target).Length -gt 0)) { continue }
            if ($DryRun) { Write-Log "Would download asset $af"; continue }
            $atmp = Join-Path $TmpDir ([guid]::NewGuid().ToString('N') + '.part')
            try {
                # web.archive.org answers back-to-back downloads with 429 Too Many Requests: back off and retry.
                for ($try = 1; ; $try++) {
                    try { Get-Download -Url $au -OutFile $atmp -TimeoutSec 600; break }
                    catch {
                        if ($try -ge 3 -or $_.Exception.Message -notmatch '\((429|503)\)') { throw }
                        Write-Log "Asset $af - server busy, retrying in $(20 * $try)s."
                        Start-Sleep -Seconds (20 * $try)
                    }
                }
                if ((Get-Item -LiteralPath $atmp).Length -le 0) { throw 'empty file' }
                Move-Into -From $atmp -To $target
                $stats.assetsNew++
            } catch {
                $stats.assetsFailed++
                Write-Log ("Asset $af failed (app will stream it from the web instead): " + $_.Exception.Message) 'WARN'
                if (Test-Path -LiteralPath $atmp) { Remove-Item -LiteralPath $atmp -Force -ErrorAction SilentlyContinue }
            }
        }
    }

    if ($DryRun) {
        Write-Log ("Dry run: contentVersion $contentVersion, $($entries.Count) pack(s); $($stats.packsNew) would be downloaded. Nothing changed.")
        if (Test-Path -LiteralPath $TmpDir) { Remove-Item -LiteralPath $TmpDir -Recurse -Force -ErrorAction SilentlyContinue }
        return
    }

    # --- prune packs/audio no longer listed ---------------------------------
    foreach ($f in @(Get-ChildItem -LiteralPath $PacksDir -File -ErrorAction SilentlyContinue)) {
        if (-not $keepPackFiles.ContainsKey($f.Name.ToLowerInvariant())) {
            Remove-Item -LiteralPath (Assert-Inside $f.FullName) -Force -ErrorAction SilentlyContinue
            Write-Log "Removed pack file $($f.Name) (no longer listed)."
        }
    }
    $audioRoot = [System.IO.Path]::GetFullPath($AudioDir).TrimEnd('\') + '\'
    foreach ($f in @(Get-ChildItem -LiteralPath $AudioDir -File -Recurse -ErrorAction SilentlyContinue)) {
        $rel = $f.FullName.Substring($audioRoot.Length).Replace('\', '/').ToLowerInvariant()
        if (-not $keepAudio.ContainsKey($rel)) {
            Remove-Item -LiteralPath (Assert-Inside $f.FullName) -Force -ErrorAction SilentlyContinue
            Write-Log "Removed audio file $rel (no longer listed)."
        }
    }
    # empty audio sub-folders
    @(Get-ChildItem -LiteralPath $AudioDir -Directory -Recurse -ErrorAction SilentlyContinue) | Sort-Object { $_.FullName.Length } -Descending | ForEach-Object {
        if (-not (Get-ChildItem -LiteralPath $_.FullName -Force -ErrorAction SilentlyContinue)) { Remove-Item -LiteralPath $_.FullName -Force -ErrorAction SilentlyContinue }
    }

    # --- index.js last (temp + move) ----------------------------------------
    $index = [ordered]@{
        contentVersion = $contentVersion
        syncedAt       = (Get-Date).ToUniversalTime().ToString('yyyy-MM-ddTHH:mm:ssZ')
        packs          = @($entries.ToArray())
    }
    $json = ConvertTo-Json -InputObject $index -Depth 5 -Compress
    $content = "/* Generated by scripts/sync-content.ps1 - do not edit, not tracked by git. */`r`nwindow.IELTS_CONTENT_INDEX = $json;`r`n"
    $itmp = Join-Path $TmpDir 'index.js.part'
    [System.IO.File]::WriteAllText((Assert-Inside $itmp), $content, $Utf8)
    Move-Into -From $itmp -To $IndexJs
    try { Remove-Item -LiteralPath $TmpDir -Recurse -Force -ErrorAction SilentlyContinue } catch { }

    Write-Log ("Content sync done: contentVersion $contentVersion, $($entries.Count) pack(s) " +
        "($($stats.packsNew) updated, $($stats.packsSame) unchanged, $($stats.packsFailed) failed), " +
        "$($stats.assetsNew) audio file(s) downloaded, $($stats.assetsFailed) failed. Reload the app page to see new lessons.")
}

if ($MyInvocation.InvocationName -ne '.') {
    try {
        Invoke-Sync
    } catch {
        Write-Log ("Unexpected sync error: " + $_.Exception.Message) 'ERROR'
    } finally {
        # scratch folder (content-packs/.tmp, or a system temp folder in dry-run mode)
        try { if (Test-Path -LiteralPath $TmpDir) { Remove-Item -LiteralPath $TmpDir -Recurse -Force -ErrorAction SilentlyContinue } } catch { }
    }
    exit 0
}
