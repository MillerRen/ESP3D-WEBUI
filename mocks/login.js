module.exports = function (app) {
    app.get('/login', checkLogin)
}

function checkLogin(req, res, next) {
  if (!req.query.USER) {
    return res.status(200).send({
      authentication_lvl: 'admin',
      user: 'miller'
    })
  }
  next()
}
