# Kill process using port 5000
# Run this if you get "EADDRINUSE" error

Write-Host "🔍 Checking port 5000..." -ForegroundColor Cyan

$process = Get-NetTCPConnection -LocalPort 5000 -ErrorAction SilentlyContinue

if ($process) {
    $pid = $process.OwningProcess
    Write-Host "❌ Port 5000 is in use by process ID: $pid" -ForegroundColor Red
    Write-Host "🔨 Killing process..." -ForegroundColor Yellow
    
    taskkill /PID $pid /F
    
    Write-Host "✅ Port 5000 is now free!" -ForegroundColor Green
    Write-Host ""
    Write-Host "You can now run: npm run dev" -ForegroundColor Cyan
} else {
    Write-Host "✅ Port 5000 is already free!" -ForegroundColor Green
}
