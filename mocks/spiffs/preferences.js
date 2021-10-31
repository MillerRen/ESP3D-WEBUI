import mock from '../../lib/mock'

const response = require(`../data/preferences.${process.env.VUE_APP_TARGET_ENV}.json`)
mock.onGet('/preferences.json')
    .reply(200, response)
mock.onPost('/preferences.json')
    .reply(200, response)