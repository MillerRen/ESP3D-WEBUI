module.exports = function (app) {
  require('./preferences')(app)
  require('./macros')(app)
  require('./commands')(app)
  require('../common/spiffs')(app)
  require('../common/upload')(app)
}