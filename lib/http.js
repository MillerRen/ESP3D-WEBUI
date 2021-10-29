import axios from 'axios'


if (process.env.NODE_ENV === 'development') {
    require('../mocks')
}

axios.interceptors.response.use(function (response) {
    if (process.env.NODE_ENV !== 'production') {
        console.log(response.config.url, new URLSearchParams(response.config.params).toString(), response)
    }
    return response.data
}, function (error) {
    if (process.env.NODE_ENV !== 'production') {
        console.log(error.config.url, new URLSearchParams(error.config.params).toString(),)
    }
    return Promise.reject(error)
})


export default axios