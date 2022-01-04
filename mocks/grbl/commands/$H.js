module.exports = function (req, res, next) {
    if(req.query.commandText == '$H'||req.query.commandText == '$HX'||req.query.commandText == '$HY'||req.query.commandText == '$HZ') {
        return res.status(200).end()
    }
    next()
}
