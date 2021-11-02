import http from 'axios'


if (process.env.NODE_ENV === 'development') {
    require('../../mocks')
}

http.interceptors.response.use(function (response) {
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

import {
    COMMAND_URL,
    LOGIN_URL
} from "../constants"


function sendGetHttp(url, params) {
    return http.get(url, {
        params
    })
}

function sendPostHttp(url, data, params) {
    return http.post(url, {
        data,
        params
    })
}

function sendFileHttp(space, files, path, onUploadProgress) {
    var fd = new FormData()
    fd.append('path', path)
    for (var i = 0; i < files.length; i++) {
        var file = files[i]
        var fileName = path + file.name
        var arg = fileName + 'S'
        fd.append(arg, file.size)
        fd.append('myfile[]', file, fileName)
    }
    return http.post(space, fd, {
        onUploadProgress
    })
        .then(response => response.data)
        .then(response => {
            if (!response.files) {
                response.files = []
            }
            return response
        })
}

function listFiles(path, params) {
    return sendGetHttp(path, {
        action: 'list',
        filename: 'all',
        ...params
    })
}

function deleteFile(path, params) {
    return sendGetHttp(path, {
        action: 'delete',
        ...params
    })
}

function deleteDir(path, params) {
    return sendGetHttp(path, {
        action: 'deletedir',
        ...params
    })
}

function createDir(path, params) {
    return sendGetHttp(path, {
        action: 'createdir',
        ...params
    })
}

function login(params) {
    return sendGetHttp(LOGIN_URL, params)
}

function checkLogin() {
    return sendGetHttp(LOGIN_URL)
        .then(response => {
            var user = Object.assign({}, response)
            if (typeof (response.authentication_lvl) !== 'undefined') {
                if (response.authentication_lvl != "guest") {
                    user.need_auth = false
                } else user.need_auth = true
            } else {
                user.need_auth = true
            }

            return user
        })
}

function sendCommand(cmd) {
    return sendGetHttp(COMMAND_URL, {
        plain: cmd
    })
}

function sendCommandText(cmd) {

    return sendGetHttp(COMMAND_URL, {
        commandText: cmd
    })
}

export default {
    sendGetHttp,
    sendPostHttp,
    sendFileHttp,
    listFiles,
    deleteFile,
    createDir,
    deleteDir,
    login,
    checkLogin,
    sendCommand,
    sendCommandText
}