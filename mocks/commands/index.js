// import './ESP220'
// import './ESP400'
// import './ESP401'
// import './ESP410'
// import './ESP420'
// import './ESP444'
// import './ESP800'
// import './$$'
// import './$H'
// import './❓'

module.exports = function (app) {
  app.get(
    '/command',
    require('./ESP800'),
    require('./ESP400'),
    require('./❓'),
    require('./$$'),
    require('../notfound')
  )
}
