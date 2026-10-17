<#
.SYNOPSIS
  Removes the "IELTS Coach Auto Update" Scheduled Task (current user, no admin).
  Windows PowerShell 5.1 compatible. ASCII-only source.
#>
$ErrorActionPreference = 'Stop'
$TaskName = 'IELTS Coach Auto Update'

$existing = Get-ScheduledTask -TaskName $TaskName -ErrorAction SilentlyContinue
if (-not $existing) {
    Write-Host "Scheduled task '$TaskName' is not installed. Nothing to do."
    exit 0
}
try {
    Unregister-ScheduledTask -TaskName $TaskName -Confirm:$false
    Write-Host "Removed scheduled task '$TaskName'. Auto update is now off."
} catch {
    Write-Host ('Could not remove the scheduled task: ' + $_.Exception.Message)
    exit 1
}
exit 0
