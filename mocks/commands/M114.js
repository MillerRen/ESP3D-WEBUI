module.exports = function (req, res, next) {
  if(req.query.commandText == 'M114') {
      return res.status(200).end()
  }
  next()
}
