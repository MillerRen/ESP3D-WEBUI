import http from "../../lib/http";

const baseURL = '/files'

function command (action, path, filename) {
    let params  = {
        action: action
    }
    if (path) {
        params.path = path
    }
    if (filename) {
        params.filename = filename
    }
    if (path)
    return http.get(baseURL, {
        params
    })
}

function list () {
    return command(list)
}

function createFile (files, path) {
    var formData = new FormData();
        formData.append('path', path);
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            var arg = path + file.name + "S";
            //append file size first to check updload is complete
            formData.append(arg, file.size);
            formData.append('myfile[]', file, path + file.name);
        }
        return http.post(baseURL, formData)
}

function deleteFile(name) {
    return this.command('delete', name)
        .then(response => {
            console.log(response)
        })
}

function createDir (fd) {
    return http.post(baseURL, {
        data: fd
    })
}

function deleteDir(name) {
    return this.command('deletedir', name)
        .then(response => {
            console.log(response)
        })
}

export default {
    list,
    createFile,
    deleteFile,
    createDir,
    deleteDir
}