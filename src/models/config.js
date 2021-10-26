
import grbl from "./grbl";
import http from '../../lib/http'

const baseURL = '/command'

function command(command) {
    return http.get(baseURL, {
        params: {
            plain: command
        }
    })
}


function getConfig(fw) {
    console.log(fw)
    switch (fw) {
        case 'smoothieware':
            break;
        case 'grbl':
            return grbl.getConfig()
        case 'marlin':
            break;
        case 'grbl-embedded':
            return grbl.getConfig()
        case 'marlin-embeded':
            break;
    }
    
}

function updateConfig(fw, item) {
    return command(item.cmd+item.value)
}

export default {
    getConfig,
    updateConfig
}