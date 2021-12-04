var regex = /^>?.+:?ok/

export default function (ctx, next) {
  if(!regex.test(ctx.input)) return next()
  ctx.type = 'startup'
  
  var startupData = ctx.input.replace('>', '').split(':')
  ctx.line = startupData[0]
  ctx.success = startupData[1] === 'ok'

  next()
}