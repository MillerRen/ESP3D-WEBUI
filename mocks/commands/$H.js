import mock from "../mock"

mock.onGet('/command', {
    params: {
        commandText: '$H'
    }
}).reply(200, 'ok')
