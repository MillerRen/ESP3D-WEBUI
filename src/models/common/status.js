import { UI_VERSION } from '../../constants'

function parseStatus(response) {
    var status = []
    var tresponse = response.split("\n");
    for (let i = 0; i < tresponse.length - 1; i++) {
        var data = tresponse[i].split(":");
        status.push(data)
    }
    status.push(['WebUI version', UI_VERSION])
    return status
}

export default {
    parseStatus
}