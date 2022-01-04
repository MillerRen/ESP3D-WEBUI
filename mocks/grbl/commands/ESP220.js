
module.exports = function (req, res, next) {
    if(req.query.commandText == '[ESP220]test2.gco') {
        return res.status(200).end()
    }
    next()
}