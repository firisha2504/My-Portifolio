@echo off
echo Checking port 5000...

for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5000') do (
    echo Killing process ID: %%a
    taskkill /F /PID %%a
    echo Port 5000 is now free!
    goto :done
)

echo Port 5000 is already free!

:done
pause
