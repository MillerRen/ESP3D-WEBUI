
module.exports = function (req, res, next) {
  if(req.query.commandText == 'G38.2 G91 Z-40 F100') {
      return res.status(200).end()
  }
  next()
}