@echo off

setlocal enabledelayedexpansion

:loop
set /p pkg=package: 
npm install !pkg!

pause
goto loop