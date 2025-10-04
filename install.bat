@echo off
chcp 65001 >nul
cls
echo ================================================
echo    ติดตั้ง Dependencies
echo ================================================
echo.

REM ตรวจสอบว่ามี Node.js หรือไม่
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] ไม่พบ Node.js
    echo กรุณาติดตั้ง Node.js จาก https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo [INFO] Node.js เวอร์ชัน:
node --version
echo.
echo [INFO] npm เวอร์ชัน:
npm --version
echo.

echo ================================================
echo กำลังติดตั้ง Dependencies...
echo (อาจใช้เวลา 2-5 นาที)
echo ================================================
echo.

npm install

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] การติดตั้งล้มเหลว!
    echo.
    echo ลองแก้ไขด้วยคำสั่งเหล่านี้:
    echo   1. npm cache clean --force
    echo   2. npm install
    echo.
    pause
    exit /b 1
)

echo.
echo ================================================
echo [SUCCESS] ติดตั้งสำเร็จ!
echo ================================================
echo.
echo ตอนนี้สามารถรันโปรแกรมได้โดย:
echo   - ดับเบิลคลิก run.bat
echo   หรือ
echo   - พิมพ์คำสั่ง: npm start
echo.
pause

