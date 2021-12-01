// import './commands'
// import './spiffs'
// import './upload'
// import './login'
// import './firmware'

module.exports = function (app) {
  require('./commands')(app)
  require('./spiffs')(app)
  require('./upload')(app)
  require('./login')(app)
  
}