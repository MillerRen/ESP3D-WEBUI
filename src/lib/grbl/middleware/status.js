const statusRegex = /^<.*>/

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

  statusData.map(str => {
    var info = str.split(':')
    var type = info[0]
    var value = info[1].split(',')
    if (value.length == 1) value = value[0].split('')
    if(type=='MPos'||type=='WPos'||type=='WCO') {
      value = value.map(v=>parseFloat(v))
    }
    ctx[type] = value
  })

  if(ctx.MPos&&ctx.WCO) {
    ctx.WPos = ctx.MPos.map((v,i)=>v-ctx.WCO[i])
  }
  if(ctx.WPos&&ctx.WCO) {
    ctx.MPos = ctx.WPos.map((v,i)=>v+ctx.WCO[i])
  }

  next()
}
