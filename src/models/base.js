import http from "../../lib/http"

const COMMAND_URL = '/command'
const FILES_URL = '/files'

export default class {
    constructor () {
        this.fwData = null
        this.settings = null
        this.config = null
        this.http = http
    }

    sendCommand (cmd) {
        return http.sendGetHttp(COMMAND_URL, {
            plian: cmd
        })
    }
    
    sendCustomCommand (cmd) {
    
        return http.sendGetHttp(COMMAND_URL, {
            commandText: cmd
        })
    }
}