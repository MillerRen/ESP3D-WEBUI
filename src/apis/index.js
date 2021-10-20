import axios from "axios"

let instance = null

class API {
    constructor () {
        this.client = axios.create()
    }

    static getInstance (opts) {
        if(!instance) {
          instance = new API(opts)
        }
        
        return instance
    }

    command (command) {
        var url = '/command'
        return this.client.get(url, {
            params: {
                plain: command
            }
        })
    }
}

export default API
