import mock from '../../lib/mock'

const response = {}

mock.onGet('/command', {
    params: {
        commandText: '[ESP444]RESTART'
    }
})
.reply(200, response)