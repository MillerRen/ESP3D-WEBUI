module.exports = function (app) {
  app.get(
    '/command',
    require('./ESP800'),
    require('./ESP400'),
    require('./❓'),
    require('./$$'),
    require('../notfound'),
    require('./ESP220')
  )
}
