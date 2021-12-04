var regex = /^\[echo:.*\]/

export default function (ctx, next) {
  if(!regex.test(ctx.input)) return next()
  ctx.type = 'echo'
  
  var echoData = ctx.input
    .replace('[', '')
    .replace(']', '')
    .split(':')
  ctx.message = echoData[1]

  next()
}