const regex = /^ok/
export default function (ctx, next) {
  if(!regex.test(ctx.input)) return next()
  ctx.type = 'success'
  next()
}