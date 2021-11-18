module.exports = function (req, res, next) {
    if(req.query.commandText == '?') {
        return res.status(200).end()
    }
    next()
}
