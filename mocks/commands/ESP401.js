module.exports = function (req, res, next) {
    if (req.query.plain == '[ESP401]P=Sta/SSID T=S V=NETGEAR_2GEXT_OFFICE2') {
      return res.send('ok').end()
    }
    next()
  }