module.exports = function (req, res, next) {
  if(req.query.cmd == '$32=1') {
      return res.status(200).end()
  }
  next()
}

