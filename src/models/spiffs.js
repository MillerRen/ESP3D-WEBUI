import http from "../../lib/http";

const baseURL = '/files'

function list (path) {
    return http.sendGet({
        action: 'list',
        path
    })
}

function upload (files, path) {
    return http.sendFileHttp(path, files)
}

function deleteFile(filename, path) {
    return http.sendGetHttp({
        action: 'delete',
        path,
        filename
    })
}

function createDir (filename, path) {
    return http.sendGetHttp({
        action: 'createdir',
        path,
        filename
    })
}

function deleteDir(filename, path) {
    return http.sendGetHttp({
        action: 'deletedir',
        path,
        filename
    })
}

export default {
    list,
    upload,
    deleteFile,
    createDir,
    deleteDir
}