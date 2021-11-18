
const response = require(`../data/preferences.${process.env.VUE_APP_TARGET_ENV}.json`)


module.exports = function (req, res, next) {
    res.json(response)
}