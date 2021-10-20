import axios from "axios"
import AxiosMockAdapter from 'axios-mock-adapter'

const mock = new AxiosMockAdapter(axios)

mock.onGet('/command', {
    params: {
        plain: '[ESP800]'
    }
})
.reply(200, 'FW version:0.9.200 # FW target:smoothieware # FW HW:Direct SD # primary sd:/ext/ # secondary sd:/sd/ # authentication: yes')
