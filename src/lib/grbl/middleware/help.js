const regex = /^\[HLP:.*\]/

export default function (ctx, next) {
  if(!regex.test(ctx.input)) return next()
  ctx.type = 'help'
  
  var helpData = ctx.input
    .replace('[HLP:', '')
    .replace(']', '')
    .split(' ')

  ctx.availableCommands = []

  helpData.forEach(function (command) {
    ctx.availableCommands.push(command)
  })

  next()
}
