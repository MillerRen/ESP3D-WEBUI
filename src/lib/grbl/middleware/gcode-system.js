var regex = /^\[(G\d+|TLO):.*\]/

export default function (ctx, next) {
  if(!regex.test(ctx.input)) return next()
  ctx.type = 'gcodeSystem'
  
  var systemData = ctx.input
    .replace('[', '')
    .replace(']', '')
    .split(':')
    
  if (systemData[0] == 'TLO') {
    ctx.coordinates = { z: parseFloat(systemData[1]) }
  } else {
    ctx.coordinates = systemData[1].split(',').map(v=>parseFloat(v))
  }

  next()
}