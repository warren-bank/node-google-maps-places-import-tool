@echo off

set DIR=%~dp0.
set workspace=%DIR%\workspace

if exist "%workspace%" rmdir /Q /S "%workspace%"
mkdir "%workspace%"
cd "%workspace%"

call npm init -y
call npm install --save "%DIR%\.."
cls

set PATH=%workspace%\node_modules\.bin;%PATH%

set dir_input=%~dp0.\input_data

call "%~dp0.\login_credentials\google_account.bat"

call gmaps-places --help >"help.txt"

rem :: named lists need to exist in Google account
call gmaps-places %GMAPS_PLACES_OPTS% --username "%GOOGLE_ACCOUNT_ID%" --password "%GOOGLE_ACCOUNT_PASS%" --list "test_HI_Oahu_txt"     --input "%dir_input%\HI-Oahu.txt"
call gmaps-places %GMAPS_PLACES_OPTS% --username "%GOOGLE_ACCOUNT_ID%" --password "%GOOGLE_ACCOUNT_PASS%" --list "test_HI_Oahu_json"    --input "%dir_input%\HI-Oahu.json"
call gmaps-places %GMAPS_PLACES_OPTS% --username "%GOOGLE_ACCOUNT_ID%" --password "%GOOGLE_ACCOUNT_PASS%" --list "test_HI_Oahu_kml"     --input "%dir_input%\HI-Oahu.kml"
call gmaps-places %GMAPS_PLACES_OPTS% --username "%GOOGLE_ACCOUNT_ID%" --password "%GOOGLE_ACCOUNT_PASS%" --list "test_HI_Oahu_gpx_wpt" --input "%dir_input%\HI-Oahu.wpt.gpx"
call gmaps-places %GMAPS_PLACES_OPTS% --username "%GOOGLE_ACCOUNT_ID%" --password "%GOOGLE_ACCOUNT_PASS%" --list "test_HI_Oahu_gpx_rte" --input "%dir_input%\HI-Oahu.rte.gpx"
