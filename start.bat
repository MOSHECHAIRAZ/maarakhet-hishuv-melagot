@echo off
echo ====================================
echo Scholarship Calculator System
echo ====================================
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    echo.
)

echo Starting server...
echo Server will run on: http://localhost:3001
echo.
start http://localhost:3001
echo.
call npm start
