
module.exports = function (app) {
  app.use('/upload', require('./list'), function (req, res, next) {
    res.status(404).end()
  })
}