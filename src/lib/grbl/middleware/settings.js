const regex = /^\$\d+=.+/

export default function (ctx, next) {
  if(!regex.test(ctx.input)) return next()
  ctx.type = 'settings'
  var settings = ctx.input.split('\r\n')
  ctx.settings = settings.map(v=>v.split('='))
  next()
}