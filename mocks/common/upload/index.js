
module.exports = function (app) {
  app.use('/upload', require('./list'), require('../notfound'))
}