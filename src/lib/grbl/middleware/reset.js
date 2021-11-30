const regex = /^Grbl\sv?(\d\.\d.)\s\['\$'\sfor\shelp\]/

export default function (ctx, next) {
  if(!regex.test(ctx.input)) return next()
  ctx.type = 'reset'
  ctx.version = regex.match(ctx.input)[1]
  next()
}