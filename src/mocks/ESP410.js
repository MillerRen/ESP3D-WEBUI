import mock from './mock'

var response = {"AP_LIST":[{"SSID":"HP-Setup>71-M277LaserJet","SIGNAL":"90","IS_PROTECTED":"0"},{"SSID":"NETGEAR_2GEXT_OFFICE2","SIGNAL":"58","IS_PROTECTED":"1"},{"SSID":"NETGEAR_2GEXT_OFFICE","SIGNAL":"34","IS_PROTECTED":"1"},{"SSID":"NETGEAR_2GEXT_COULOIR","SIGNAL":"18","IS_PROTECTED":"1"},{"SSID":"HP-Print-D3-ColorLaserJetPro","SIGNAL":"14","IS_PROTECTED":"0"},{"SSID":"external-wifi","SIGNAL":"20","IS_PROTECTED":"1"},{"SSID":"Livebox-4D0F","SIGNAL":"24","IS_PROTECTED":"1"},{"SSID":"SFR_2000","SIGNAL":"20","IS_PROTECTED":"1"},{"SSID":"SFR_0D90","SIGNAL":"26","IS_PROTECTED":"1"},{"SSID":"SFRWiFiFON","SIGNAL":"18","IS_PROTECTED":"0"},{"SSID":"SFRWiFiMobile","SIGNAL":"18","IS_PROTECTED":"1"},{"SSID":"FreeWifi","SIGNAL":"16","IS_PROTECTED":"0"}]}

mock.onGet('/command', {
    params: {
        plain: '[ESP401]P=0 T=B V=2'
    }
})
.reply(200, response)