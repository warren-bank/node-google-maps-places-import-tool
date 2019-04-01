const parser = function(data) {
  const urls  = []
  const regex = new RegExp('<coordinates>([-]?\\d+\\.\\d+),([-]?\\d+\\.\\d+),?(?:[-]?\\d+\\.?\\d*)?</coordinates>', 'ig')

  try {
    data = data.replace(/[\r\n\s]/g, '')

    let matches, url

    while ((matches = regex.exec(data)) !== null) {
      const lon = matches[1]
      const lat = matches[2]
      const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`
      urls.push(url)
    }
  }
  catch(error) {
    console.log('ERROR: Path to input file containing "places" data in KML format did not parse correctly')
    process.exit(0)
  }

  return urls
}

module.exports = parser
