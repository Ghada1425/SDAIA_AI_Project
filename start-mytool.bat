@echo off
setlocal
cd /d "%~dp0"

start "Mytool server" /min cmd /c "npm start"
timeout /t 2 /nobreak >nul
start "" "http://localhost:3000"

echo.
echo Mytool is opening at http://localhost:3000
echo Keep the Mytool server window running while you use the site.
pause