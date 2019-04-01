const help = `
usage:
======
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

"-u <username>"
"--username <username>"
    Specify the Google account "username".

"-p <password>"
"--password <password>"
    Specify the Google account "password".

"-l <list>"
"--list <list>"
    Specify the Google Maps "list" name.
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
`

module.exports = help
