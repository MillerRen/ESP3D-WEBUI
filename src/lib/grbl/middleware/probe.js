var regex = /^\[PRB:.*\]/

export default function (ctx, next) {
  if (!regex.test(ctx.input)) return next()
  ctx.type = 'probeResult'

  var probeData = ctx.input
    .replace('[PRB:', '')
    .replace(']', '')
    .split(':')

  ctx.location = probeData[0].split(',').map(v => parseFloat(v))
  ctx.success = parseInt(probeData[1]) === 1

  next()
}
