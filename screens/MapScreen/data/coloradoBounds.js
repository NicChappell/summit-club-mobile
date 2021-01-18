// import geoJSON
const geoJSON = require('./geoJSON.json')

// destructure geoJSON
const { coordinates } = geoJSON.geometry

// isolate lat points
const latPoints = coordinates[0].map(coordinate => {
    return coordinate[1]
})

// isolate lng points
const lngPoints = coordinates[0].map(coordinate => {
    return coordinate[0]
})

// calculate min and max lat points
const minLat = Math.min.apply(Math, latPoints)
const maxLat = Math.max.apply(Math, latPoints)

// calculate min and max lng points
const minLng = Math.min.apply(Math, lngPoints)
const maxLng = Math.max.apply(Math, lngPoints)

// log bounds
console.log([minLat, maxLng])
console.log([maxLat, minLng])
