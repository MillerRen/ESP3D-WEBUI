const target = process.env.VUE_APP_SUBTARGET_ENV

module.exports = function (app) {
  require('./'+target)(app)
  require('./common/notfound')
}