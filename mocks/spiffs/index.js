// import './files'
// import './preferences'
// import './macros'

module.exports = function (app) {
  app.get('/preferences.json', require('./preferences'))
}