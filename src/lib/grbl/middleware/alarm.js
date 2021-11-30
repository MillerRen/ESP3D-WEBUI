var regex = /^ALARM:(.+)/

export default function (ctx, next) {
  if(!regex.test(ctx.input)) return next()
  ctx.type = 'alarm'
  ctx.code = ctx.input.match(regex)[1]
  next()
}