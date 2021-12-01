
// const response = 'FW version:0.9.200 # FW target:smoothieware # FW HW:Direct SD # primary sd:/ext/ # secondary sd:/sd/ # authentication: no'
const response = {
    FWVersion: "3.0.0.a28",
    FWTarget: 40,
    SDConnection: "none",
    Authentication: "Enabled",
    WebCommunication: "Synchronous",
    WebSocketIP: "localhost",
    WebSocketport: "81",
    Hostname: "esp3d",
    WiFiMode: "STA",
    WebUpdate: "Enabled",
    Filesystem: "SPIFFS",
    Time: "none",
    Cam_ID: "4",
    Cam_name: "ESP32 Cam",
  }

module.exports = function (req, res, next) {
    if(req.query.cmd == '[ESP800]') {
        return res.json(response)
    }
    next()
}