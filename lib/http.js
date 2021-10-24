import axios from 'axios'

axios.interceptors.response.use(function (response) {
    return response.data
})

export default axios