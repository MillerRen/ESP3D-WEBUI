const regex = /^Grbl\sv?(\d\.\d.)\s\['\$'\sfor\shelp\]/

export default function (ctx, next) {
  if(!regex.test(ctx.input)) return next()
  ctx.type = 'reset'
  ctx.version = ctx.input.match(regex)[1]
  next()
}