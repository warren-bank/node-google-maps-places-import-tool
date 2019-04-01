const parser = function(data) {
  const urls = []

  try {
    data = JSON.parse(data)

    // sanity check
    if (!data || !(data instanceof Object) || !(Array.isArray(data.features)) || !data.features.length)
      throw ''

    // all good..
    let index, properties

    for (index in data.features) {
      properties = data.features[index].properties

      if (properties && (properties instanceof Object) && properties["Google Maps URL"]) {
        urls.push( properties["Google Maps URL"] )
      }
    }
  }
  catch(error) {
    console.log('ERROR: Path to input file containing "places" data in JSON format did not parse correctly')
    process.exit(0)
  }

  return urls
}

module.exports = parser
