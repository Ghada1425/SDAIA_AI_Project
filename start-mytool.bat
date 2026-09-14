@echo off
setlocal
cd /d "%~dp0"

start "Mytool server" /min cmd /c "npm start"
timeout /t 2 /nobreak >nul
start "" "http://127.0.0.1:3000"

echo.
echo Mytool is opening at http://127.0.0.1:3000
echo Keep the Mytool server window running while you use the site.
pause