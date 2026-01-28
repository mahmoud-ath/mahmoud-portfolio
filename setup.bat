@echo off
REM Dynamic Project Management System - Setup Script (Windows)
REM This script helps initialize the system and verify everything works

color 0A
title Portfolio Project Management Setup
echo.
echo ================================
echo Portfolio Project Management Setup
echo ================================
echo.

REM Check if Node.js is installed
echo Checking Node.js installation...
where /q node
if errorlevel 1 (
    color 0C
    echo X Node.js is not installed
    color 0A
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
node --version
echo.

REM Check if npm is installed
echo Checking npm installation...
where /q npm
if errorlevel 1 (
    color 0C
    echo X npm is not installed
    color 0A
    pause
    exit /b 1
)
npm --version
echo.

REM Check dependencies
echo Checking project dependencies...
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    if errorlevel 1 (
        color 0C
        echo X Failed to install dependencies
        color 0A
        pause
        exit /b 1
    )
)
echo.

REM Check if projects.json exists
echo Checking data files...
if not exist "public\data\projects.json" (
    echo ! projects.json not found, creating from template...
    if not exist "public\data" mkdir public\data
    echo [] > public\data\projects.json
)
echo.

REM Summary
color 0B
echo ================================
echo Setup Complete!
echo ================================
color 0A
echo.
echo Next steps:
echo.
echo 1. Install concurrently for easier development:
echo    npm install --save-dev concurrently
echo.
echo 2. Or run both servers manually:
echo    Terminal 1: npm run dev
echo    Terminal 2: node server.js
echo.
echo 3. Access the admin dashboard:
echo    http://localhost:3000/#/admin
echo.
echo 4. Login with password: Admin123!
echo.
echo For more information, see ADMIN_GUIDE.md
echo.
pause
