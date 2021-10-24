import mock from './mock'

var response = { "files": [{ "name": "config.html.gz", "size": "4.76 KB" }, { "name": "index.html.gz", "size": "21.44 KB" }, { "name": "favicon.ico", "size": "1.12 KB" }, { "name": "config.htm", "size": "19.65 KB" }, { "name": "config2.htm", "size": "19.98 KB" }, { "name": "Testname", "size": "-1" }, { "name": "index2.html.gz", "size": "28.89 KB" }], "path": "/", "status": "Ok", "total": "2.81 MB", "used": "118.88 KB", "occupation": "4" }

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