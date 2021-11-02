import mock from '../mock'
import progress from '../progress'

const response = require(`../data/preferences.${process.env.VUE_APP_TARGET_ENV}.json`)
mock.onGet('/preferences.json')
    .reply(200, response)
mock.onPost('/preferences.json')
    .reply(progress)