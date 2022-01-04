import mock from '../mock'

const response = {}

mock.onGet('/command', {
    params: {
        commandText: '[ESP444]RESTART'
    }
})
.reply(200, response)