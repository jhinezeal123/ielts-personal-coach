@echo off
rem Cai IELTS Coach tren may moi (dung khi ban tai ban ZIP tu GitHub).
rem Script se cai Git neu can, tai app vao "Documents\IELTS Coach", bat tu dong cap nhat va tao loi tat.
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0setup.ps1" %*
echo.
echo Ban co the dong cua so nay.
pause
