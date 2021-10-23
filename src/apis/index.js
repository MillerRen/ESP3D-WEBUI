import axios from "axios"
import defaultPreferenceList from "./default_preferences"

if (process.env.NODE_ENV === 'development') {
    require('../mocks')
}

const PREFERENCES_FILE_NAME = '/preferences.json'

let instance = null

class API {
    constructor() {
        this.client = axios.create()
        this.client.interceptors.response.use((response) => {
            if (process.env.NODE_ENV !== 'production') {
                console.log(response.config.url, response)
            }
            return response.data
        }, (error) => {
            return Promise.reject(error)
        })
    }

    static getInstance(opts) {
        if (!instance) {
            instance = new API(opts)
        }

        return instance
    }

    command(command) {
        var url = '/command'
        return this.client.get(url, {
            params: {
                plain: command
            }
        })
    }

    files(command, fileName) {
        var url = '/files'
        var params = {
            action: command
        }
        if (fileName) {
            params.filename = fileName
        }
        return this.client.get(url, {
            params: params
        })
    }

    spiffsList() {
        return this.files('list')
            .then(response => {
                return response.files
            })
    }

    spiffsDelete(name) {
        return this.files('delete', name)
            .then(response => {
                console.log(response)
            })
    }

    spiffsUpload(files, path) {
        var formData = new FormData();
        var url = "/files";
        formData.append('path', path);
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            var arg = path + file.name + "S";
            //append file size first to check updload is complete
            formData.append(arg, file.size);
            formData.append('myfile[]', file, path + file.name);
        }
        return this.client.post(url, formData)
    }

    getFWData() {
        return this.command('[ESP800]')
            .then(response => {
                var fw = this._parseFWData(response)
                if (!fw) throw new Error('unknown firmware')
                return fw
            })
    }



    _parseFWData(response) {
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

    getSettings() {
        return this.command('[ESP400]')
            .then(response => {
                if (!response.EEPROM) {
                    throw new Error('wrong data')
                }
                let settings = this._parseSettings(response.EEPROM)
                return settings
            })
    }

    _parseSettings(settings) {
        var setting_configList = []
        for (var vindex in settings) {
            var sentry = settings[vindex]
            var slabel = sentry.H;
            var svalue = sentry.V;
            var scmd = "[ESP401]P=" + sentry.P + " T=" + sentry.T + " V=";
            var options = [];
            var min;
            var max;
            if (typeof sentry.M !== 'undefined') {
                min = sentry.M;
            } else { //add limit according the type
                if (sentry.T == "B") min = -127
                else if (sentry.T == "S") min = 0
                else if (sentry.T == "A") min = 7
                else if (sentry.T == "I") min = 0
            }
            if (typeof sentry.S !== 'undefined') {
                max = sentry.S;
            } else { //add limit according the type
                if (sentry.T == "B") max = 255;
                else if (sentry.T == "S") max = 255;
                else if (sentry.T == "A") max = 15;
                else if (sentry.T == "I") max = 2147483647;
            }
            //list possible options if defined
            if (typeof sentry.O !== 'undefined') {
                for (var i in sentry.O) {
                    var val = sentry.O[i];
                    for (var j in val) {
                        var sub_key = j;
                        var sub_val = val[j];
                        sub_val = sub_val.trim();
                        sub_key = sub_key.trim();
                        var option = {
                            id: sub_val,
                            display: sub_key
                        };
                        options.push(option);
                        //console.log("*" + sub_key + "* and *" + sub_val + "*");
                    }
                }
            }
            svalue = svalue.trim();
            //create entry in list
            var config_entry = {
                index: vindex,
                F: sentry.F,
                label: slabel,
                defaultvalue: svalue,
                cmd: scmd,
                Options: options,
                min_val: min,
                max_val: max,
                type: sentry.T,
                pos: sentry.P
            };
            setting_configList.push(config_entry);
        }

        return setting_configList
    }

    updateSettings(cmd) {
        console.log(cmd)
        return this.command(cmd)
    }

    getPreferences() {
        return this.client.get(PREFERENCES_FILE_NAME)
            .then(response => {
                if (typeof response == 'string' && response.indexOf("<HTML>") != -1) {
                    throw new Error('Not found ' + PREFERENCES_FILE_NAME)
                }
                return response[0]
            })
            .catch((err) => {
                console.log(err)
                return defaultPreferenceList[0]
            })
    }

    updatePreferences(preferenceslist) {
        var blob = new Blob([JSON.stringify([preferenceslist], null, " ")], {
            type: 'application/json'
        });
        var file = new File([blob], PREFERENCES_FILE_NAME);
        var formData = new FormData();
        var url = "/files";
        formData.append('path', '/');
        formData.append('myfile[]', file, PREFERENCES_FILE_NAME);

        return this.client.post(url, formData)
    }

    getStatus() {
        return this.command('[ESP420]plain')
    }

    scanWifi() {
        return this.command('[ESP410]')
    }

    login(data) {
        return this.client.get('/login', {
            params: data
        })
    }

    checkNeedLogin() {
        return this.client.get('/login')
            .then(response => response)
    }
}

export default API
