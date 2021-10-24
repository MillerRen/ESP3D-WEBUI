import axios from 'axios'


if (process.env.NODE_ENV === 'development') {
    require('../mocks')
}

axios.interceptors.response.use(function (response) {
    if (process.env.NODE_ENV !== 'production') {
        console.log(response.config.url, response)
    }
    return response.data
})

export default axios