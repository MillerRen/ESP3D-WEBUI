import axios from "axios";
const http = axios.create({
    baseURL: '/files'
})

export function list () {
    return axios.get({
        params: {
            action: 'list'
        }
    })
}

export function create (fd) {
    return axios.post({
        data: fd
    })
}