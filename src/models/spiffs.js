import http from "../../lib/http";

const baseURL = '/files'

function command (action, filename, path) {
    let params  = {
        action: action
    }
    if (path) {
        params.path = path
    }
    if (filename) {
        params.filename = filename
    }
    
    return http.get(baseURL, {
        params
    })
}

function list (path) {
    return command('list', 'all', path)
}

function upload (files, path) {
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

function deleteFile(name, path) {
    return command('delete', name, path)
        .then(response => {
            console.log(response)
        })
}

function createDir (dir, path) {
    return command('createdir', dir, path)
}

function deleteDir(name) {
    return command('deletedir', name)
}

export default {
    list,
    upload,
    deleteFile,
    createDir,
    deleteDir
}