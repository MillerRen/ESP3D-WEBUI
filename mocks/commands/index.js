module.exports = function (app) {
  app.get(
    '/command',
    require('./ESP220'),
    require('./ESP800'),
    require('./ESP400'),
    require('./❓'),
    require('./$$'),
    require('../notfound')
  )
}
