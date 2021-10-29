import mock from '../../lib/mock'

// const response = 'FW version:0.9.200 # FW target:smoothieware # FW HW:Direct SD # primary sd:/ext/ # secondary sd:/sd/ # authentication: no'
const fw_grbl = 'FW version:1.3a (20210424) # FW target:grbl-embedded # FW HW:Direct SD # primary sd:/sd # secondary sd:none # authentication:yes # webcommunication: Sync: 81:192.168.1.4 # hostname:grblesp # axis:4'

mock.onGet('/command', {
    params: {
        plain: '[ESP800]'
    }
})
.reply(200, fw_grbl)