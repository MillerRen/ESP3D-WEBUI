
// const response = 'FW version:0.9.200 # FW target:smoothieware # FW HW:Direct SD # primary sd:/ext/ # secondary sd:/sd/ # authentication: no'
const response = 'FW version:1.3a (20210424) # FW target:grbl-embedded # FW HW:Direct SD # primary sd:/sd # secondary sd:none # authentication:no # webcommunication: Sync: 81:192.168.0.1 # hostname:grblesp(AP mode) # axis:4'

module.exports = function (req, res, next) {
    if(req.query.plain == '[ESP800]') {
        return res.json(response)
    }
    next()
}