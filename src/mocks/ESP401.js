import mock from './mock'

const response = {}

mock.onGet('/command', {
    params: {
        plain: '[ESP401]P=0 T=B V=2'
    }
})
.reply(200, response)