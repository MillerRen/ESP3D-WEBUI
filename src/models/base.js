import http from "../../lib/http"

import { 
    COMMAND_URL,
    LOGIN_URL
} from "../constants"

export default class {
    
    sendGetHttp (url, params) {
        return http.get(url, {
            params
        })
    }

    sendPostHttp (url, data, params) {
        return http.post(url, {
            data,
            params
        })
    }

    sendFileHttp (space, files, path, onUploadProgress) {
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
    }

    listFiles (path, params) {
        return this.sendGetHttp(path, {
            action: 'list',
            filename: 'all',
            ...params
        })
    }

    deleteFile (path, params) {
        return this.sendGetHttp(path, {
            action: 'delete',
            ...params
        })
    }

    deleteDir (path, params) {
        return this.sendGetHttp(path, {
            action: 'deletedir',
            ...params
        })
    }

    createDir (path, params) {
        return this.sendGetHttp(path, {
            action: 'createdir',
            ...params
        })
    }

    login (params) {
        return this.sendGetHttp(LOGIN_URL, params)
    }

    checkLogin () {
        return this.sendGetHttp(LOGIN_URL)
            .then(response => {
                var user = Object.assign({}, response)
                if (typeof(response.authentication_lvl) !== 'undefined') {
                    if (response.authentication_lvl != "guest") {
                        user.need_auth = false
                    } else user.need_auth = true 
                } else {
                    user.need_auth = true
                }

                return user
            })
    }

    sendCommand (cmd) {
        return this.sendGetHttp(COMMAND_URL, {
            plain: cmd
        })
    }
    
    sendCommandText (cmd) {
    
        return this.sendGetHttp(COMMAND_URL, {
            commandText: cmd
        })
    }    
    
}