import http from '../../lib/http'

const baseURL = '/command'

function getConfig (fw) {
    console.log(fw)
    let cmd = ''
    if (fw == "smoothieware") {
        cmd = "cat " + "/sd/config";
    }
    if (fw.indexOf('grbl')!=-1) {
        cmd = '$$'
    }
    if (fw.indexOf('marlin')!=-1) {
        cmd = 'M503'
    }
    return http.get(baseURL, {
        params: {
            plain: cmd
        }
    })
}

export default {
    getConfig
}