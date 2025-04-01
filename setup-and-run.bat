@echo off
echo ====================================
echo  Hospital Management System Setup
echo ====================================
echo.

echo Installing dependencies...
call npm run install-all

echo.
echo Starting the application...
call npm start

echo.
echo If the browser doesn't open automatically, go to:
echo Client: http://localhost:5173
echo Server: http://localhost:5000/api/test

pause 