const statusRegex = /^<.*>/
const statusMap = {
  "A": "accessories",
  "Bf": "buffer",
  "Buf": "buffer",
  "RX": "buffer",
  "FS": "realtimeFeed",
  "MPos": "machinePosition",
  "Ov": "override",
  "Lim": "pins",
  "Pn": "pins",
  "Pin": "pins",
  "WCO": "workcoordinateOffset",
  "WPos": "workPosition",
  "SD": "sd"
}

export default function (ctx, next) {
  var message = ctx.input
  
  if (!statusRegex.test(message)) {
    return next()
  }
  ctx.type = 'status'
  var match = message.match(/^<(.*)>/)[1]

  var statusData = match.split('|')
  var status = statusData.shift().split(':')

  ctx.status = status[0]
  ctx.status_code = status[1]

  statusData
    .map(str => {
    var info = str.split(':')
    var type = info[0]
    var value = info[1].split(',')
    if(value.length == 1) value = value[0].split('')
    ctx[statusMap[type]] = value
  })

  next()
}
