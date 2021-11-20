module.exports.parseCoordinates = function(position) {
  // example input: "23.3242,102.2234,0.4200"
  var coordinates = position.split(",")
  return {
    x: parseFloat(coordinates[0]),
    y: parseFloat(coordinates[1]),
    z: parseFloat(coordinates[2]),
    a: parseFloat(coordinates[3]),
    b: parseFloat(coordinates[4]),
    c: parseFloat(coordinates[5]),
  }
}
