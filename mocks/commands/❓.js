import mock from "../mock"

mock.onGet('/command', {
    params: {
        commandText: '?'
    }
}).reply(200, 'ok')
