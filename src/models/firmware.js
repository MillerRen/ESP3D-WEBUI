import http from '../../lib/http'

const baseURL = '/updatefw'

function command(command) {
    return http.get('/command', {
        params: {
            plain: command
        }
    })
}

function getFW() {
    return command('[ESP800]')
        .then(response => {
            var fw = _parseFWData(response)
            if (!fw) throw new Error('unknown firmware')
            return fw
        })
}



function _parseFWData(response) {
    var fwData = {
        grblaxis: 3
    }
    var tlist = response.split("#")
    //FW version:0.9.200 # FW target:smoothieware # FW HW:Direct SD # primary sd:/ext/ # secondary sd:/sd/ # authentication: yes
    if (tlist.length < 3) {
        return false
    }
    //FW version
    var sublist = tlist[0].split(":")
    if (sublist.length != 2) {
        return false
    }
    fwData.fw_version = sublist[1].toLowerCase().trim()
    //FW target
    sublist = tlist[1].split(":")
    if (sublist.length != 2) {
        return false
    }
    fwData.target_firmware = sublist[1].toLowerCase().trim()
    //FW HW
    sublist = tlist[2].split(":")
    if (sublist.length != 2) {
        return false
    }
    var sddirect = sublist[1].toLowerCase().trim()
    if (sddirect == "direct sd") fwData.direct_sd = true
    else fwData.direct_sd = false
    //primary sd
    sublist = tlist[3].split(":")
    if (sublist.length != 2) {
        return false
    }
    if (!fwData.direct_sd && fwData.target_firmware == "smoothieware") {
        fwData.primary_sd = "sd/"
    } else {
        fwData.primary_sd = sublist[1].toLowerCase().trim()
    }
    //secondary sd
    sublist = tlist[4].split(":")
    if (sublist.length != 2) {
        return false
    }
    if (!fwData.direct_sd && fwData.target_firmware == "smoothieware") {
        fwData.secondary_sd = "ext/"
    } else {
        fwData.secondary_sd = sublist[1].toLowerCase().trim()
    }
    //authentication
    sublist = tlist[5].split(":")
    if (sublist.length != 2) {
        return false
    }
    if (sublist[0].trim() == "authentication" && sublist[1].trim() == "yes")
        fwData.ESP3D_authentication = true
    else fwData.ESP3D_authentication = false
    //async communications
    if (tlist.length > 6) {
        sublist = tlist[6].split(":")
        if (
            sublist[0].trim() == "webcommunication" &&
            sublist[1].trim() == "Async"
        )
            fwData.async_webcommunication = true
        else {
            fwData.async_webcommunication = false
            fwData.websocket_port = sublist[2].trim()
            if (sublist.length > 3) {
                fwData.websocket_ip = sublist[3].trim()
            } else {
                console.log("No IP for websocket, use default")
                fwData.websocket_ip = document.location.hostname
            }
        }
    }
    if (tlist.length > 7) {
        sublist = tlist[7].split(":")
        if (sublist[0].trim() == "hostname") fwData.esp_hostname = sublist[1].trim()
    }

    if (fwData.target_firmware == "grbl-embedded" && tlist.length > 8) {
        sublist = tlist[8].split(":")
        if (sublist[0].trim() == "axis") {
            fwData.grblaxis = parseInt(sublist[1].trim())
        }
    }

    return fwData
}

function updateFW (files) {
    var formData = new FormData();
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var arg = "/" + file.name + "S";
        //append file size first to check updload is complete
        formData.append(arg, file.size);
        formData.append('myfile[]', file, "/" + file.name);
    }
    return http.post(baseURL, formData)
}

export default {
    getFW,
    updateFW
}