
module.exports = function (app) {
  app.get('/files', require('./files'))
}