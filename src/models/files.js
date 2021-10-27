import http from '../../lib/http'

const baseURL = '/upload'

function action(action, path, name) {
    let params = {}
    if (action) {
        params.action = action
    }
    if (path) {
        params.path = path
    }
    if (name) {
        params.filename = name
    }
    console.log(typeof action)
    console.log(arguments, params)
    return http.get(baseURL, {
        params
    }).then(response => {
        response.files = parseFiles(response.files)
        return response
    })
}

function parseFiles(files) {
    var files_file_list = []
    for (var i = 0; i < files.length; i++) {
        var file_name = "";
        var isdirectory = false;
        var fsize = "";
        if (files[i].size == "-1") isdirectory = true;
        else fsize = files[i].size;

        file_name = files[i].name;

        // var isprint = files_showprintbutton(file_name, isdirectory);
        var file_entry = {
            name: file_name,
            sdname: files[i].name,
            size: fsize,
            isdir: isdirectory,
            datetime: files[i].datetime,
            // isprintable: isprint
        };
        files_file_list.push(file_entry);
    }
    return files_file_list
}

function getFiles(path) {
    return action(undefined, path)
}

function createDir(name) {
    return action('createdir', name)
}

function deleteDir(name) {
    return action('deletedir', name)
}

function deleteFile(name) {
    return action('delete', name)
}

export default {
    getFiles,
    createDir,
    deleteDir,
    deleteFile
}
