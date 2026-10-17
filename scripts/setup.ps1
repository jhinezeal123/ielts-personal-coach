<#
.SYNOPSIS
  One-shot installer for IELTS Coach on a new Windows machine.

.DESCRIPTION
  Run from PowerShell (no admin needed, except what winget asks for when installing Git):

    irm https://raw.githubusercontent.com/jhinezeal123/ielts-personal-coach/main/scripts/setup.ps1 | iex

  or double-click scripts\cai-dat-may-moi.cmd in a downloaded ZIP copy.

  Steps (all idempotent - safe to run again):
    1. Make sure git is available (installs Git for Windows via winget if missing).
    2. Clone the repo into "$env:USERPROFILE\Documents\IELTS Coach"
       (or fast-forward it with "git pull --ff-only" if it is already a clone).
    3. Run scripts\install-auto-update.ps1 from the clone: registers the per-user
       scheduled task (daily 07:00 + logon) and runs it once (release check + content sync).
    4. Create "IELTS Coach" shortcuts on the Desktop and in the Start Menu that open
       app\index.html in the default browser.
    5. Print a short summary (Vietnamese, without diacritics so it shows correctly in any console).

  Windows PowerShell 5.1 compatible. ASCII-only source (PS 5.1 reads BOM-less files as ANSI).
  Never calls 'exit' in the main body, so 'irm | iex' does not close the user's window.

.PARAMETER InstallDir
  Target folder. Default: "$env:USERPROFILE\Documents\IELTS Coach".

.PARAMETER SkipTask
  Do not register the scheduled task. Instead runs scripts\auto-update.ps1 once in a child
  process (release check + content sync) so the copy is still complete. For testing.

.PARAMETER NoShortcut
  Do not create Desktop / Start Menu shortcuts. For testing.
#>
[CmdletBinding()]
param(
    [string]$InstallDir = '',
    [switch]$SkipTask,
    [switch]$NoShortcut
)

function Invoke-IeltsCoachSetup {
    param(
        [string]$InstallDir,
        [switch]$SkipTask,
        [switch]$NoShortcut
    )
    Set-StrictMode -Version 2.0
    $ErrorActionPreference = 'Stop'

    $RepoUrl  = 'https://github.com/jhinezeal123/ielts-personal-coach.git'
    $AppName  = 'IELTS Coach'
    if ([string]::IsNullOrWhiteSpace($InstallDir)) {
        $docs = [Environment]::GetFolderPath('MyDocuments')
        if ([string]::IsNullOrWhiteSpace($docs)) { $docs = Join-Path $env:USERPROFILE 'Documents' }
        $InstallDir = Join-Path $docs $AppName
    }
    $InstallDir = [System.IO.Path]::GetFullPath($InstallDir)

    function Say([string]$Text, [string]$Color = 'Gray') { Write-Host $Text -ForegroundColor $Color }
    function Step([string]$Text) { Write-Host ''; Write-Host ('==> ' + $Text) -ForegroundColor Cyan }
    function Fail([string]$Text) {
        Write-Host ''
        Write-Host ('LOI: ' + $Text) -ForegroundColor Red
        Write-Host 'Cai dat chua xong. Sua loi tren roi chay lai lenh cai dat (chay lai bao nhieu lan cung an toan).' -ForegroundColor Yellow
    }

    function Update-SessionPath {
        $machine = [Environment]::GetEnvironmentVariable('Path', 'Machine')
        $user    = [Environment]::GetEnvironmentVariable('Path', 'User')
        $env:Path = (@($machine, $user) | Where-Object { $_ }) -join ';'
        if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
            foreach ($p in @("$env:ProgramFiles\Git\cmd", "${env:ProgramFiles(x86)}\Git\cmd", "$env:LOCALAPPDATA\Programs\Git\cmd")) {
                if ($p -and (Test-Path -LiteralPath (Join-Path $p 'git.exe'))) { $env:Path = $env:Path + ';' + $p; break }
            }
        }
    }

    function Invoke-Git {
        # Runs git, streams nothing, returns @{ Code; Output }. Never throws on stderr.
        param([string[]]$GitArgs)
        $old = $ErrorActionPreference
        $ErrorActionPreference = 'Continue'
        try {
            $out = & git @GitArgs 2>&1 | ForEach-Object { "$_" }
            $code = $LASTEXITCODE
        } finally { $ErrorActionPreference = $old }
        return @{ Code = $code; Output = (($out | Out-String).Trim()) }
    }

    try { [Net.ServicePointManager]::SecurityProtocol = [Net.ServicePointManager]::SecurityProtocol -bor [Net.SecurityProtocolType]::Tls12 } catch { }

    Say ''
    Say '=== Cai dat IELTS Coach ===' 'Green'
    Say ('Thu muc cai dat: ' + $InstallDir)

    # ---- 1. Git ---------------------------------------------------------------
    Step 'Kiem tra Git'
    if (-not (Get-Command git -ErrorAction SilentlyContinue)) { Update-SessionPath }
    if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
        if (-not (Get-Command winget -ErrorAction SilentlyContinue)) {
            Fail 'May chua co Git va cung khong co winget de tu cai.'
            Say 'Hay cai Git for Windows thu cong:' 'Yellow'
            Say '  1. Mo https://git-scm.com/download/win va tai ban "64-bit Git for Windows Setup".' 'Yellow'
            Say '  2. Chay file cai dat, bam Next den het (giu mac dinh).' 'Yellow'
            Say '  3. Dong cua so PowerShell nay, mo cua so moi va chay lai lenh cai dat.' 'Yellow'
            return
        }
        Say 'Chua co Git. Dang cai Git for Windows bang winget (co the hien hop thoai xin quyen, hay bam Yes)...'
        $old = $ErrorActionPreference
        $ErrorActionPreference = 'Continue'
        try {
            & winget install --id Git.Git -e --source winget --accept-package-agreements --accept-source-agreements
        } finally { $ErrorActionPreference = $old }
        Update-SessionPath
        if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
            Fail 'Da thu cai Git nhung van chua tim thay lenh git.'
            Say 'Hay dong cua so PowerShell nay, mo cua so moi va chay lai lenh cai dat.' 'Yellow'
            Say 'Neu van loi, cai Git thu cong tu https://git-scm.com/download/win roi chay lai.' 'Yellow'
            return
        }
    }
    $gv = Invoke-Git @('--version')
    Say ('OK: ' + $gv.Output) 'Green'

    # ---- 2. Clone or fast-forward ------------------------------------------------
    Step 'Tai ma nguon app'
    $isRepo = Test-Path -LiteralPath (Join-Path $InstallDir '.git')
    if ($isRepo) {
        Say 'Thu muc da co ban cai truoc do. Dang cap nhat (git pull --ff-only)...'
        $r = Invoke-Git @('-C', $InstallDir, 'pull', '--ff-only')
        if ($r.Code -ne 0) {
            Say ('CANH BAO: khong cap nhat duoc, giu nguyen ban hien co. Chi tiet: ' + $r.Output) 'Yellow'
        } else {
            Say ('OK: ' + $r.Output) 'Green'
        }
    } else {
        $nonEmpty = (Test-Path -LiteralPath $InstallDir) -and
                    (@(Get-ChildItem -LiteralPath $InstallDir -Force -ErrorAction SilentlyContinue).Count -gt 0)
        if ($nonEmpty) {
            Fail ("Thu muc '" + $InstallDir + "' da ton tai, khong rong va khong phai ban cai bang git.")
            Say 'Hay doi ten / xoa thu muc do, hoac chon thu muc khac:' 'Yellow'
            Say '  & ([scriptblock]::Create((irm https://raw.githubusercontent.com/jhinezeal123/ielts-personal-coach/main/scripts/setup.ps1))) -InstallDir "D:\IELTS Coach"' 'Yellow'
            return
        }
        $parent = Split-Path -Parent $InstallDir
        if ($parent -and -not (Test-Path -LiteralPath $parent)) { New-Item -ItemType Directory -Path $parent -Force | Out-Null }
        Say ('Dang tai ve tu ' + $RepoUrl + ' ...')
        $r = Invoke-Git @('clone', $RepoUrl, $InstallDir)
        if ($r.Code -ne 0) {
            Fail ('git clone that bai (kiem tra mang Internet). Chi tiet: ' + $r.Output)
            return
        }
        Say 'OK: da tai ve.' 'Green'
    }

    $indexHtml = Join-Path $InstallDir 'app\index.html'
    if (-not (Test-Path -LiteralPath $indexHtml)) {
        Fail ("Khong tim thay '" + $indexHtml + "'.")
        return
    }

    # ---- 3. Auto-update task (also syncs lesson packs) ---------------------------
    $psExe = Join-Path $env:SystemRoot 'System32\WindowsPowerShell\v1.0\powershell.exe'
    if ($SkipTask) {
        Step 'Bo qua dang ky tu dong cap nhat (-SkipTask); chay kiem tra cap nhat + dong bo bai mot lan'
        $au = Join-Path $InstallDir 'scripts\auto-update.ps1'
        if (Test-Path -LiteralPath $au) {
            & $psExe -NoProfile -ExecutionPolicy Bypass -File $au | Out-Host
        } else {
            Say 'CANH BAO: khong thay scripts\auto-update.ps1.' 'Yellow'
        }
    } else {
        Step 'Bat tu dong cap nhat (moi ngay 07:00 va khi dang nhap Windows)'
        $inst = Join-Path $InstallDir 'scripts\install-auto-update.ps1'
        if (Test-Path -LiteralPath $inst) {
            & $psExe -NoProfile -ExecutionPolicy Bypass -File $inst | Out-Host
            if ($LASTEXITCODE -ne 0) {
                Say 'CANH BAO: chua bat duoc tu dong cap nhat. Sau nay co the bam dup scripts\cai-dat-tu-dong-cap-nhat.cmd de thu lai.' 'Yellow'
            } else {
                Say 'OK: da bat tu dong cap nhat va chay lan kiem tra dau tien (ca tai bai hoc moi).' 'Green'
            }
        } else {
            Say 'CANH BAO: khong thay scripts\install-auto-update.ps1.' 'Yellow'
        }
    }

    # ---- 4. Shortcuts --------------------------------------------------------------
    $made = @()
    if ($NoShortcut) {
        Step 'Bo qua tao loi tat (-NoShortcut)'
    } else {
        Step 'Tao loi tat "IELTS Coach" tren Desktop va Start Menu'
        try {
            $shell = New-Object -ComObject WScript.Shell
            $targets = @(
                [Environment]::GetFolderPath('Desktop'),
                [Environment]::GetFolderPath('Programs')
            ) | Where-Object { $_ -and (Test-Path -LiteralPath $_) }
            foreach ($dir in $targets) {
                $lnkPath = Join-Path $dir ($AppName + '.lnk')
                $lnk = $shell.CreateShortcut($lnkPath)
                $lnk.TargetPath = $indexHtml          # opens in the default browser
                $lnk.WorkingDirectory = (Join-Path $InstallDir 'app')
                $lnk.Description = 'IELTS Coach - mo app luyen thi IELTS'
                $lnk.Save()
                $made += $lnkPath
                Say ('OK: ' + $lnkPath) 'Green'
            }
        } catch {
            Say ('CANH BAO: khong tao duoc loi tat: ' + $_.Exception.Message) 'Yellow'
        }
    }

    # ---- 5. Summary ----------------------------------------------------------------
    Say ''
    Say '=== Xong! ===' 'Green'
    Say ('App nam o:     ' + $indexHtml)
    if ($made.Count -gt 0) { Say 'Mo app:        bam dup loi tat "IELTS Coach" tren Desktop hoac trong Start Menu.' }
    else { Say 'Mo app:        bam dup file app\index.html (mo bang Chrome hoac Edge).' }
    if ($SkipTask) { Say 'Cap nhat:      CHUA bat tu dong cap nhat (-SkipTask).' }
    else { Say 'Cap nhat:      tu dong moi ngay 07:00 va khi dang nhap Windows (tinh nang moi + bai hoc moi).' }
    Say ''
    Say 'Chuyen du lieu tu may cu sang (neu co):' 'Yellow'
    Say '  1. Tren may cu: mo app -> Cai dat -> Sao luu & khoi phuc -> Tai ban sao luu (file .json).' 'Yellow'
    Say '  2. Tren may nay: mo app -> Cai dat -> Sao luu & khoi phuc -> Khoi phuc tu tep... -> chon file .json.' 'Yellow'
    Say '  Du lieu luu trong trinh duyet: luon mo app bang CUNG mot trinh duyet (Chrome hoac Edge).' 'Yellow'
    Say ''
}

try {
    Invoke-IeltsCoachSetup -InstallDir $InstallDir -SkipTask:$SkipTask -NoShortcut:$NoShortcut
} catch {
    Write-Host ''
    Write-Host ('LOI khong mong doi: ' + $_.Exception.Message) -ForegroundColor Red
    Write-Host 'Cai dat chua xong. Sua loi tren roi chay lai lenh cai dat (chay lai bao nhieu lan cung an toan).' -ForegroundColor Yellow
}
