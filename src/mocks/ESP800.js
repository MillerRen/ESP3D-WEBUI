import mock from './mock'

const response = 'FW version:0.9.200 # FW target:smoothieware # FW HW:Direct SD # primary sd:/ext/ # secondary sd:/sd/ # authentication: no'

mock.onGet('/command', {
    params: {
        plain: '[ESP800]'
    }
})
.reply(200, response)