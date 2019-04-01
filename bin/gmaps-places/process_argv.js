const grep_argv = require('./grep_argv')

const fs   = require('fs')
const path = require('path')

const argv_flags = {
  "--help":                                 {bool: true},
  "--version":                              {bool: true},
  "--debug":                                {bool: true},

  "--username":                             {},
  "--password":                             {},
  "--list":                                 {},
  "--input":                                {file: "path"}
}

const argv_flag_aliases = {
  "--help":                                 ["-h"],
  "--version":                              ["-v"],
  "--debug":                                ["-d"],
  "--username":                             ["-u"],
  "--password":                             ["-p"],
  "--list":                                 ["-l"],
  "--input":                                ["-i"]
}

const get_merged_argv_flags = function(){
  let argv_flags_merged = {...argv_flags}
  let key, flag_opts, aliases, alias

  for (key in argv_flag_aliases){
    flag_opts = argv_flags[key]
    aliases   = argv_flag_aliases[key]

    if ((flag_opts instanceof Object) && (Array.isArray(aliases))){
      for (alias of aliases){
        argv_flags_merged[alias] = flag_opts
      }
    }
  }

  return argv_flags_merged
}

const normalize_argv_vals = function(){
  if (!(argv_vals instanceof Object)) return

  let key, argv_val, aliases, alias

  for (key in argv_flag_aliases){
    argv_val = argv_vals[key]
    aliases  = argv_flag_aliases[key]

    if ((!argv_val) && (Array.isArray(aliases))){
      for (alias of aliases){
        argv_val = argv_vals[alias]
        if (argv_val) {
          argv_vals[key] = argv_val
          break
        }
      }
    }
  }
}

let argv_vals
try {
  argv_vals = grep_argv(get_merged_argv_flags(), true)

  normalize_argv_vals()
}
catch(e) {
  console.log('ERROR: ' + e.message)
  process.exit(0)
}

if (argv_vals["--help"]) {
  const help = require('./help')
  console.log(help)
  process.exit(0)
}

if (argv_vals["--version"]) {
  const data = require('../../package.json')
  console.log(data.version)
  process.exit(0)
}

if (!argv_vals["--username"]) {
  console.log('ERROR: Google account "username" is required')
  process.exit(0)
}

if (!argv_vals["--password"]) {
  console.log('ERROR: Google account "password" is required')
  process.exit(0)
}

if (!argv_vals["--list"]) {
  // default value
  argv_vals["--list"] = 'starred places'
}
else {
  argv_vals["--list"] = argv_vals["--list"].toLowerCase()
}

if (!argv_vals["--input"]) {
  console.log('ERROR: Path to input file containing "places" data is required')
  process.exit(0)
}

if (! fs.existsSync(argv_vals["--input"])) {
  console.log('ERROR: Path to input file containing "places" data does not exist')
  process.exit(0)
}

const input_filepath = argv_vals["--input"]
const input_file_ext = path.extname(input_filepath).toLowerCase().substr(1)

argv_vals["--input"] = fs.readFileSync(argv_vals["--input"], {encoding: 'utf8'})

switch(input_file_ext) {
  case 'json':
  case 'kml':
  case 'gpx':
  case 'txt':
    argv_vals["--input"] = require(`./input_parsers/${input_file_ext}`)(argv_vals["--input"])
    break
  default:
    console.log('ERROR: Path to input file containing "places" data ends with an unsupported file extension')
    process.exit(0)
}

if (argv_vals["--debug"]) {
  console.log('input filepath:', input_filepath)
  console.log('input file ext:', input_file_ext)
  console.log('Google Maps URLs count:', argv_vals["--input"].length)
  console.log('Google Maps URLs array:', JSON.stringify(argv_vals["--input"], null, 2))
  process.exit(0)
}

module.exports = argv_vals
