@echo off
echo ===================================================
echo   Portfolio GitHub Deployment Script
echo ===================================================
echo.
echo Checking if Git is installed...
where git >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Git was not found on your system!
    echo Please download and install Git from: https://git-scm.com/
    echo Make sure to check the option "Add Git to PATH" during installation.
    echo.
    pause
    exit /b
)

echo Git detected! Configuring local repository...
echo.

:: Configure Git globally
git config --global user.name "Devakishore S"
git config --global user.email "devakishores0@gmail.com"

:: Initialise and push
echo Initialising Git...
git init

echo Adding files...
git add .

echo Committing...
git commit -m "Initial commit - Minimalist Portfolio Website"

echo Setting branch to main...
git branch -M main

echo Adding remote origin...
:: Remove remote origin if it already exists to avoid conflict
git remote remove origin >nul 2>&1
git remote add origin https://github.com/Devakishore707/Personal-Portfolio.git

echo.
echo ===================================================
echo Ready to push to GitHub. 
echo A browser window may open asking you to log into GitHub.
echo ===================================================
echo.
git push -u origin main

echo.
echo Done! Please check your GitHub repository at:
echo https://github.com/Devakishore707/Personal-Portfolio
echo.
pause
