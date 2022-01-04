const requireUncached = require('../../lib/requireUncached')

module.exports = function (app) {
  app.get(
    '/command',
    requireUncached(__dirname,'./ESP220'),
    requireUncached(__dirname,'./ESP800'),
    requireUncached(__dirname,'./ESP400'),
    requireUncached(__dirname,'./ESP401'),
    requireUncached(__dirname,'./ESP410'),
    requireUncached(__dirname,'./ESP420'),
    requireUncached(__dirname,'./❓'),
    requireUncached(__dirname,'./$$'),
    requireUncached(__dirname,'./$X'),
    requireUncached(__dirname,'./$n=x'),
    requireUncached(__dirname,'./probe'),
  )
}
