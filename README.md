### [Google Maps _places_ import tool](https://github.com/warren-bank/node-google-maps-places-import-tool)

Command-line tool to import _places_ into Google Maps. Supports: geoJSON, KML, GPX.

#### Background:

* [Google Maps](https://maps.google.com/) doesn't yet provide a way to import lists of _places_
  * menu option: "Your places" &gt; "Saved"
* [Google Trips](https://get.google.com/trips/) _Saved Places_ are [built on top of Google Maps lists](https://www.androidpolice.com/2017/12/08/google-trips-consolidates-bookmarked-places-maps-search-lets-merge-trips-edit-reservations/) of _places_
  * when planning a trip, the ability to import lists of _places_ would be extremely helpful
  * an import tool is needed

- - - -

#### Installation (global w/ npm):

```bash
npm install @warren-bank/node-google-maps-places-import-tool --global
```

#### Dependencies (global):

* [puppeteer](https://github.com/GoogleChrome/puppeteer)
  * install globally with a full copy of Chromium web browser:
    ```bash
      npm install puppeteer --global
    ```

#### Binary (global):

```bash
gmaps-places <options>
```

- - - -

#### Installation (local w/ wget via github):

```bash
mkdir 'workspace'
cd    'workspace'

wget --content-disposition --no-check-certificate 'https://github.com/warren-bank/node-google-maps-places-import-tool/archive/master.zip'
unzip 'node-google-maps-places-import-tool-master.zip'
rm -f 'node-google-maps-places-import-tool-master.zip'

cd 'node-google-maps-places-import-tool-master'
```

#### Dependencies (local):

* [puppeteer](https://github.com/GoogleChrome/puppeteer)
  * install locally with a full copy of Chromium web browser:
    ```bash
      npm install puppeteer --save
    ```

#### Binary (local):

```bash
npm run 'gmaps-places' <options>
```

- - - -

#### Usage:

```bash
gmaps-places <options>

options:
========
"-h"
"--help"
    Print all command-line options.

"-v"
"--version"
    Print version number.

"-d"
"--debug"
    Print the list of Google Maps URLs obtained from the "input" filepath.
    Does not perform import.

"-D"
"--distinct"
    Restrict each "distinct" place to a single list.
    No action will occcur when the place has already been added to another list.

"-u <username>"
"--username <username>"
    Specify the Google account "username".

"-p <password>"
"--password <password>"
    Specify the Google account "password".

"-l <list>"
"--list <list>"
    Specify the Google Maps "list" name.
    Value is not case sensitive.
    The default is: "Starred places"

"-i <filepath>"
"--input <filepath>"
    Specify the "input" filepath.
    File extension determines how the contents are parsed.
    Supported extensions:
      * "json": geoJSON
      * "kml"
      * "gpx"
      * "txt": list of Google Maps URLs
        - https://www.google.com/maps/place/...
        - https://www.google.com/maps/dir/...
```

#### Caveats:

* "input" files in "txt" format are parsed with the attempt to be very forgiving of sloppy format
  * the parser tries to extract as many lat/lon pairs as are contained in each URL
  * helpful when URLs are obtained from non-technical users
  * sometimes this is good and produces the desired result
  * sometimes it results in extra "places"
  * may require some cleanup after import
    * still faster than entering the data manually

#### Example:

* [this test script](https://github.com/warren-bank/node-google-maps-places-import-tool/blob/master/tests/run.sh) is a good demo

- - - -

#### Credits:

* [Benji Bilheimer](https://github.com/benjibee) came up with the idea to use [puppeteer](https://github.com/GoogleChrome/puppeteer) and a [working implementation](https://gist.github.com/benjibee/37e0031a8aa7a25e9814a01bdb03217c)

#### Changes from original implementation:

* moves hard-coded variables to CLI options
* supports more input data formats

#### Legal:

* copyright:
  * [Benji Bilheimer](https://github.com/benjibee)
  * [Warren Bank](https://github.com/warren-bank)
* license: [GPL-2.0](https://www.gnu.org/licenses/old-licenses/gpl-2.0.txt)
