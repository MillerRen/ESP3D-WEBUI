module.exports = function (app) {
  app.get(
    '/command',
    require('./ESP220'),
    require('./ESP800'),
    require('./ESP400'),
    require('./ESP401'),
    require('./ESP410'),
    require('./ESP420'),
    require('./❓'),
    require('./$$'),
    require('./$X'),
    require('./$n=x'),
    require('./probe'),
    require('./M114'),
    require('../notfound')
  )
}
