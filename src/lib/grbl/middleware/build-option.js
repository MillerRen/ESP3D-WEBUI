const regex = /^\[OPT:.*\]/

export default function (ctx, next) {
  if (!regex.test(ctx.input)) return next()
  ctx.type = 'buildOption'
  
  var options = ctx.input
  var versionMatch = options.match(/\[(.+)\]/)
  var versionData = versionMatch[1].split(':')

  versionData = versionData[1]
  var versionOptions = versionData.split(',')
  var versionCodes = versionOptions[0].split('')
  var versionExtras = versionOptions.slice(1, versionOptions.length)

  var buildOptions = []
  var buildExtras = []

  versionCodes.forEach(function (code) {
    buildOptions.push({ code: code })
  })

  versionExtras.forEach(function (extra) {
    buildExtras.push(extra)
  })

  ctx.buildOptions = buildOptions
  ctx.buildExtras = buildExtras
  
  next()
}
