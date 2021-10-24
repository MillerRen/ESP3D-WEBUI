import http from "../../lib/http";

const baseURL = '/files'

function list () {
    return http.get(baseURL, {
        params: {
            action: 'list'
        }
    })
}

function create (fd) {
    return http.post(baseURL, {
        data: fd
    })
}

export default {
    list,
    create
}