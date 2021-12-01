
var response = "Chip ID: 13874112\nCPU Frequency: 160Mhz\nFree memory: 24.23 KB\nSDK: 2.0.0(656edbf)\nFlash Size: 4.00 MB\nAvailable Size for update: 652.17 KB(Ok)\nAvailable Size for SPIFFS: 3.00 MB\nBaud rate: 115200\nSleep mode: None\nChannel: 1\nPhy Mode: 11g\nWeb port: 80\nData port: 8888\nHostname: lucesp\nActive Mode: Station (5C:CF:7F:D3:B3:C0)\nConnected to: NETGEAR_2GEXT_OFFICE2\nSignal: 98%\nIP Mode: DHCP\nIP: 192.168.1.51\nGateway: 192.168.1.1\nMask: 255.255.255.0\nDNS: 192.168.1.1\nDisabled Mode: Access Point (5E:CF:7F:D3:B3:C0)\nCaptive portal: Enabled\nSSDP: Enabled\nNetBios: Enabled\nmDNS: Enabled\nWeb Update: Enabled\nPin Recovery: Disabled\nAuthentication: Disabled\nTarget Firmware: Smoothieware\nSD Card Support: Enabled\nFW version: 0.9.93\n";

module.exports = function (req, res, next) {
    if(req.query.cmd == '[ESP420]cmd') {
        return res.send(response).end()
    }
    next()
}