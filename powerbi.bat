@echo off
title Dawininstall
color 0b
chcp 65001

setlocal

if "%~1" == "" (
    echo No value provided.
    exit /b 1
)

echo Received value from web : %~1


endlocal
set comname=%~1

set pcname=%~1
set run="\\192.168.1.1\drive_for_file_sharing_share\PBIDesktopSetup_x64.exe" -q -norestart ACCEPT_EULA=1
\\192.168.1.1\Script\PSTools\PsExec.exe -nobanner \\%pcname% -u apu\admin -p "P@ssw0rd" %run%