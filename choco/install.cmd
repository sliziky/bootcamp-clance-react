@echo off

call choco feature enable -n allowGlobalConfirmation

REM --- Browsers ---
call choco install Firefox
call choco install GoogleChrome

REM --- FE development ---
call choco install nvm
call choco install yarn
call choco install git
call choco install notepadplusplus

REM --- BE development ---
call choco install docker-desktop
call choco install dotnetcore-sdk
call choco install fiddler
call choco install ilspy

REM -- IDE ---
call choco install vscode
call choco install visualstudio2019community
call choco install visualstudio2019-workload-azure
call choco install visualstudio2019-workload-manageddesktop
call choco install visualstudio2019-workload-netcoretools
call choco install visualstudio2019-workload-netweb

REM --- PowerShell Core ---
call choco install powershell-core

REM --- Go ---
call choco install golang

REM --- Python ---
call choco install python
call choco install python3

REM --- Support system tools ---
call choco install adexplorer
call choco install ccleaner
call choco install Cmder
call choco install procexp
call choco install totalcommander
call choco install foxitreader

REM --- SQL ---
call choco install sql-server-express
call choco install sql-server-management-studio
