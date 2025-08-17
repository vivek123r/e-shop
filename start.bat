@echo off
echo ===================================
echo   STARTING E-SHOP APPLICATION
echo ===================================

echo.
echo Starting backend server...
start cmd /k "cd backend && node server.js"

echo.
echo Waiting for backend to start...
timeout /t 3 > nul

echo.
echo Starting React frontend...
start cmd /k "npm start"

echo.
echo ===================================
echo   APPLICATION STARTED
echo ===================================
echo.
echo Backend API: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Press any key to stop all servers...
pause > nul

echo.
echo Stopping servers...
taskkill /f /im node.exe > nul 2>&1
echo Done!
