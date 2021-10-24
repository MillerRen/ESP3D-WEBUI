import http from "../../lib/http";

const baseURL = '/files'

export function list () {
    return http.get(baseURL, {
        params: {
            action: 'list'
        }
    })
}

export function create (fd) {
    return http.post(baseURL, {
        data: fd
    })
}