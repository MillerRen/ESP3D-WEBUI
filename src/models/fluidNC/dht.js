export default function (data, convertDHT2Fahrenheit) {
  var dht = {
    humidity: '',
    temperature: ''
  }
  var tdata = data.split(' ')
  if (tdata.length != 2) {
    console.log('DHT data invalid: ' + data)
    return
  }
  var temp = convertDHT2Fahrenheit
    ? parseFloat(tdata[0]) * 1.8 + 32
    : parseFloat(tdata[0])
  dht.humidity =
    parseFloat(tdata[1])
      .toFixed(2)
      .toString() + '%'
  var temps = temp.toFixed(2).toString() + '&deg;'
  if (convertDHT2Fahrenheit) temps += 'F'
  else temps += 'C'
  dht.temperature = temps

  return dht
}
