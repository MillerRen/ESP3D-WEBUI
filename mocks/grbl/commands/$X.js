module.exports = function (req, res, next) {
  if(req.query.commandText == '$X') {
      return res.status(200).end()
  }
  next()
}
