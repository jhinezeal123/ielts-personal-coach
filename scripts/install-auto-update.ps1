<#
.SYNOPSIS
  Registers the "IELTS Coach Auto Update" Scheduled Task for the current user
  (no admin needed). Runs scripts/auto-update.ps1 daily at 07:00 and at logon;
  missed runs are caught up (StartWhenAvailable). Re-running replaces the task.
  Windows PowerShell 5.1 compatible. ASCII-only source.
#>
[CmdletBinding()]
param(
    [string]$Time = '07:00',
    [switch]$NoRunNow
)

$ErrorActionPreference = 'Stop'
$TaskName = 'IELTS Coach Auto Update'
$Script   = Join-Path $PSScriptRoot 'auto-update.ps1'

if (-not (Test-Path -LiteralPath $Script)) { Write-Host "Not found: $Script"; exit 1 }
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host 'WARNING: git was not found on PATH. The task will be installed, but updates need Git for Windows.'
}

$user = [System.Security.Principal.WindowsIdentity]::GetCurrent().Name
$psExe = Join-Path $env:SystemRoot 'System32\WindowsPowerShell\v1.0\powershell.exe'
$argLine = '-NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File "' + $Script + '"'

$action = New-ScheduledTaskAction -Execute $psExe -Argument $argLine -WorkingDirectory $PSScriptRoot

$daily = New-ScheduledTaskTrigger -Daily -At ([datetime]::ParseExact($Time, 'HH:mm', [System.Globalization.CultureInfo]::InvariantCulture))
$logon = New-ScheduledTaskTrigger -AtLogOn -User $user
$logon.Delay = 'PT2M'   # give the network a moment after logon

$settings = New-ScheduledTaskSettingsSet -StartWhenAvailable -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries `
    -ExecutionTimeLimit (New-TimeSpan -Minutes 15) -MultipleInstances IgnoreNew

$principal = New-ScheduledTaskPrincipal -UserId $user -LogonType Interactive -RunLevel Limited

$task = New-ScheduledTask -Action $action -Trigger @($daily, $logon) -Settings $settings -Principal $principal `
    -Description 'Checks GitHub (jhinezeal123/ielts-personal-coach) for a new IELTS Coach release and fast-forwards the local copy. Log: scripts\auto-update.log'

try {
    Register-ScheduledTask -TaskName $TaskName -InputObject $task -Force | Out-Null
} catch {
    Write-Host ('Could not register the scheduled task: ' + $_.Exception.Message)
    exit 1
}
Write-Host "Installed scheduled task '$TaskName' (daily at $Time and at logon, user $user)."

if (-not $NoRunNow) {
    try {
        Start-ScheduledTask -TaskName $TaskName
        Write-Host 'Started a first check now. See scripts\auto-update.log for the result.'
    } catch {
        Write-Host ('Could not start the task now: ' + $_.Exception.Message)
    }
}
exit 0
