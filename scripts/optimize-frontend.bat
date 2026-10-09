@echo off
echo Optimizing frontend...
cd frontend

echo Clearing cache...
rd /s /q node_modules
rd /s /q .cache
del package-lock.json

echo Reinstalling dependencies...
npm install

echo Done! Now run: npm start
pause
