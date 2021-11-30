var regex = /^\[((?!G|VER:|TLO|OPT|HLP|echo|PRB).+)\]/

export default function (ctx, next) {
  if(!regex.test(ctx.input)) return next()
  ctx.type = 'feedback'
  
  var message = ctx.input.replace('[', '').replace(']', '')

  if (message.includes('MSG:')) {
    var messageData = message.split(':')
    ctx.message = messageData[1]
  } else ctx.message = message

  next()
}