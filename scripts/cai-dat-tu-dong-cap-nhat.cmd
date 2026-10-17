@echo off
rem Bat tu dong cap nhat IELTS Coach (moi ngay 07:00 va khi dang nhap Windows).
echo Dang cai dat tu dong cap nhat IELTS Coach...
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0install-auto-update.ps1"
echo.
echo Xong. Ban co the dong cua so nay.
pause
