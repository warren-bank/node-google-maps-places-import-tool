#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
workspace="${DIR}/workspace"

[ -d "$workspace" ] && rm -rf "$workspace"
mkdir "$workspace"
cd "$workspace"

npm init -y
npm install --save "${DIR}/.."
clear

PATH="${workspace}/node_modules/.bin:${PATH}"

dir_input="${DIR}/input_data"

source "${DIR}/login_credentials/google_account.sh"

gmaps-places --help >"help.txt"

# named lists need to exist in Google account
gmaps-places $GMAPS_PLACES_OPTS --username "$GOOGLE_ACCOUNT_ID" --password "$GOOGLE_ACCOUNT_PASS" --list "test_HI_Oahu_txt"     --input "${dir_input}/HI-Oahu.txt"
gmaps-places $GMAPS_PLACES_OPTS --username "$GOOGLE_ACCOUNT_ID" --password "$GOOGLE_ACCOUNT_PASS" --list "test_HI_Oahu_json"    --input "${dir_input}/HI-Oahu.json"
gmaps-places $GMAPS_PLACES_OPTS --username "$GOOGLE_ACCOUNT_ID" --password "$GOOGLE_ACCOUNT_PASS" --list "test_HI_Oahu_kml"     --input "${dir_input}/HI-Oahu.kml"
gmaps-places $GMAPS_PLACES_OPTS --username "$GOOGLE_ACCOUNT_ID" --password "$GOOGLE_ACCOUNT_PASS" --list "test_HI_Oahu_gpx_wpt" --input "${dir_input}/HI-Oahu.wpt.gpx"
gmaps-places $GMAPS_PLACES_OPTS --username "$GOOGLE_ACCOUNT_ID" --password "$GOOGLE_ACCOUNT_PASS" --list "test_HI_Oahu_gpx_rte" --input "${dir_input}/HI-Oahu.rte.gpx"
