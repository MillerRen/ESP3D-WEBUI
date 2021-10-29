import mock from '../../lib/mock'
import response from '../data/files.json'

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
        path: '/',
        filename: 'index.html.gz'
    }
}).reply(200, Object.assign({}, response, {
    files: response.files.filter(item=>item.name!='index.html.gz')
}))

mock.onGet('/files', {
    params: {
        action: 'deletedir',
        path: '/',
        filename: 'Testname'
    }
}).reply(200, Object.assign({}, response, {
    files: response.files.filter(item=>item.name!='Testname')
}))

mock.onGet('/files', {
    params: {
        action: 'createdir',
        path: '/',
        filename: 'test'
    }
}).reply(200, Object.assign({}, response, {
    files: response.files.concat([{name: 'test', size: -1}])
}))

mock.onPost('/files', {
}).reply(200, {})