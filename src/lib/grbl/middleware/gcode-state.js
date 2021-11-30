var regex = /^\[.+(G\d).+(M\d).+\]/

export default function (ctx, next) {
  if(!regex.test(ctx.input)) return next()
  ctx.type = 'gcodeState'
  
  var gcodeData = ctx.input
    .replace('[', '')
    .replace(']', '')
    .replace('GC:', '')
    .split(' ')

  var codes = []

  gcodeData.forEach(function (code) {
    codes.push(code)
  })

  ctx.codec = codes

  next()
}