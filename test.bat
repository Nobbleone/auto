@echo off
chcp 65001 >nul
cls
echo ================================================
echo    Roblox Auto Registration - TEST MODE
echo ================================================
echo.

REM ตรวจสอบว่ามี node_modules หรือไม่
if not exist "node_modules\" (
    echo [INFO] กำลังติดตั้ง Dependencies...
    call npm install >nul 2>&1
    if %errorlevel% neq 0 (
        echo [ERROR] ติดตั้งล้มเหลว
        pause
        exit /b 1
    )
    echo [SUCCESS] ติดตั้งเสร็จสิ้น
    echo.
)

echo ================================================
echo    กำลังรันโปรแกรม (แสดง Debug ทั้งหมด)
echo ================================================
echo.

REM รันโปรแกรมแบบแสดง debug ทั้งหมด
node index.js

echo.
echo ================================================
echo    โปรแกรมทำงานเสร็จสิ้น
echo ================================================
echo.
pause

