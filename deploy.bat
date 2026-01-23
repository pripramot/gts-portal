@echo off
chcp 65001 >nul
color 0B
title Deploy ACESO Web Portal to Firebase

echo ╔══════════════════════════════════════════════════════╗
echo ║                                                      ║
echo ║    🚀 Deploy ACESO Web Portal to Firebase           ║
echo ║                                                      ║
echo ╚══════════════════════════════════════════════════════╝
echo.

echo กำลังเตรียมการ Deploy...
echo.

REM Check if Firebase CLI is installed
firebase --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] ไม่พบ Firebase CLI!
    echo กรุณารันคำสั่ง: npm install -g firebase-tools
    pause
    exit /b 1
)

echo [OK] พบ Firebase CLI แล้ว
echo.

REM Login to Firebase
echo ขั้นตอนที่ 1: Login Firebase
echo.
firebase login --no-localhost

if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Login ล้มเหลว!
    pause
    exit /b 1
)

echo.
echo ╔══════════════════════════════════════════════════════╗
echo ║            ✓ Login Firebase สำเร็จ                  ║
echo ╚══════════════════════════════════════════════════════╝
echo.

REM Deploy
echo ขั้นตอนที่ 2: Deploy ไปยัง Firebase Hosting
echo.
firebase deploy --only hosting

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ╔══════════════════════════════════════════════════════╗
    echo ║              ✓ Deploy สำเร็จ!                       ║
    echo ╚══════════════════════════════════════════════════════╝
    echo.
    echo 🌐 URL: https://rungroj-carrent.web.app
    echo 🌐 URL: https://rungroj-carrent.firebaseapp.com
    echo.
    echo ลองเข้าไปดูได้เลยครับ!
) else (
    echo.
    echo [ERROR] Deploy ล้มเหลว!
    echo กรุณาตรวจสอบ error ข้างบน
)

echo.
pause
