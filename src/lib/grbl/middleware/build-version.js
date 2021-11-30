const regex = /^\[(VER:)?(\d\.\d\w).+:.*\]/

export default function (ctx, next) {
  if (!regex.test(ctx.input)) return next()
  ctx.type = 'buildVersion'
  var versionMatch = ctx.input
    .replace('[', '')
    .replace('VER:', '')
    .replace(']', '')
    .split(':') //  '1.1f.20170131', 'My string!!'
  var versionData = versionMatch[0].match(/^(.+)\.(\d{8})$/)
  ctx.version = versionData[1]
  ctx.buildDate = versionData[2]
  if (versionMatch[1]) ctx.buildString = versionMatch[1]
  
  next()
}
