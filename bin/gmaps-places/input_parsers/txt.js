const parser = function(data) {
  const urls  = []
  const regex1 = new RegExp('!1d([-]?\\d+\\.\\d+)!2d([-]?\\d+\\.\\d+)', 'g')
  const regex2 = new RegExp('!3d([-]?\\d+\\.\\d+)!4d([-]?\\d+\\.\\d+)', 'g')

  try {
    data = data.replace(/[\r\n\s]/g, '')

    let matches, url

    while ((matches = regex1.exec(data)) !== null) {
      const lon = matches[1]
      const lat = matches[2]
      const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`
      urls.push(url)
    }

    while ((matches = regex2.exec(data)) !== null) {
      const lat = matches[1]
      const lon = matches[2]
      const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`
      urls.push(url)
    }
  }
  catch(error) {
    console.log('ERROR: Path to input file containing "places" data in TXT format did not parse correctly')
    process.exit(0)
  }

  return urls
}

module.exports = parser
