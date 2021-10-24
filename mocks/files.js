import mock from './mock'
import response from './data/files.json'

mock.onGet('/files', {
    params: {
        action: 'list'
    }
}).reply(200, response)

mock.onGet('/files', {
    params: {
        action: 'list',
        filename: 'all',
        path: '/'
    }
}).reply(200, response)

mock.onGet('/files', {
    params: {
        action: 'list',
        filename: 'all',
        path: '/Testname/'
    }
}).reply(200, { "files": [{ "name": "test.js", "size": "1 KB" }] })

mock.onGet('/files', {
    params: {
        action: 'delete',
        filename: 'index.html.gz'
    }
}).reply(200, {})

mock.onPost('/files', {
}).reply(200, {})