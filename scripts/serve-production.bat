@echo off
echo Building production frontend...
cd frontend

echo Building...
npm run build

echo Installing serve...
npm install -g serve

echo Starting production server...
echo Opening http://localhost:3000
serve -s build -l 3000

pause
