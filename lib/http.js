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




function sendGetHttp(path, params) {
    return axios.get(path, {
        params
    })
}

function sendPostHttp(path, data, params) {
    return axios.post(path, {
        data,
        params
    })
}

function sendFileHttp(path, files, params) {
    var fd = new FormData()
    fd.append('path', path)
    for (var i = 0; i < files.length; i++) {
        var file = files[i]
        var fileName = path + file.name
        var arg = fileName + 'S'
        fd.append(arg, file.size)
        fd.append('myfile[]', file, fileName)
    }
    return sendPostHttp(path, fd, params)
}

export default {
    sendGetHttp,
    sendPostHttp,
    sendFileHttp
}