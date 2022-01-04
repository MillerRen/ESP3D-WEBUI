
const response = 'FW version: FluidNC v3.2.8 # FW target:grbl-embedded  # FW HW:No SD  # primary sd:/sd # secondary sd:none # authentication:no # webcommunication: Sync: 81:192.168.0.1 # hostname:fluidnc(AP mode) # axis:3'

module.exports = function (req, res, next) {
    if(req.query.plain == '[ESP800]') {
        return res.json(response)
    }
    next()
}