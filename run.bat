@echo off
chcp 65001 >nul
cls
echo ================================================
echo    Roblox Auto Registration Tool
echo ================================================
echo.

REM ตรวจสอบว่ามี node_modules หรือไม่
if not exist "node_modules\" (
    echo [INFO] กำลังติดตั้ง Dependencies...
    call npm install >nul 2>&1
    if %errorlevel% neq 0 (
        echo [ERROR] ติดตั้งล้มเหลว - รัน: npm install
        pause
        exit /b 1
    )
    echo [SUCCESS] ติดตั้งเสร็จสิ้น
    echo.
)

echo ================================================
echo    เริ่มต้นโปรแกรม...
echo ================================================
echo.

REM รันโปรแกรม
node index.js

echo.
echo ================================================
echo    โปรแกรมทำงานเสร็จสิ้น
echo ================================================
echo.
pause

