import mock from '../mock'

const response = {}

mock.onGet('/command', {
    params: {
        commandText: '[ESP220]test2.gco'
    }
})
.reply(200, response)