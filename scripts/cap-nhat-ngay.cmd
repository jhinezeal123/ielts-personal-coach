@echo off
rem Kiem tra va tai ban moi IELTS Coach ngay bay gio.
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0auto-update.ps1"
echo.
echo Xong. Neu da tai ban moi, hay tai lai trang app (F5).
pause
