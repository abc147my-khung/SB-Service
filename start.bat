@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Please install Node.js 18 or newer first.
  echo https://nodejs.org/
  pause
  exit /b 1
)
echo Starting S^&B SERVICE...
echo Website: http://127.0.0.1:3000
echo Admin:   http://127.0.0.1:3000/admin
start "" http://127.0.0.1:3000
node server.js
pause
