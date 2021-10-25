import http from '../../lib/http'

function login () {
    return http.get('/command')
}

export default {
    login
}
