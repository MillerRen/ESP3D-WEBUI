var regex = /^error:(.+)/

export default function (ctx, next) {
  if(!regex.test(ctx.input)) return next()
  ctx.type = 'error'
  ctx.code = ctx.input.match(regex)[1]
  next()
}