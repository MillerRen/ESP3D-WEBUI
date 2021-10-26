import axios from 'axios'


if (process.env.NODE_ENV === 'development') {
    require('../mocks')
}

axios.interceptors.response.use(function (response) {
    if (process.env.NODE_ENV !== 'production') {
        console.log(response.config.url, response)
    }
    return response.data
}, function (error) {
    if (process.env.NODE_ENV !== 'production') {
        console.log(error.config.url, error.config.params)
    }
    return Promise.reject(error)
})

export default axios