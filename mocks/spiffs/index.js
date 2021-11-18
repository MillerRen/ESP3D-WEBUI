
module.exports = function (app) {
  app.get('/preferences.json', require('./preferences'))
  app.get('/macrocfg.json', require('./macros'))
  app.get('/files', require('./files'))
}