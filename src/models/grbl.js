import Base from './base'
import { ESP_HOST_NAME, PREFERENCES_FILE_NAME } from '../constants'

const DEFAULT_PREFERENCES = [{ "language": "en", "enable_lock_UI": "false", "enable_ping": "true", "enable_DHT": "false", "enable_camera": "false", "auto_load_camera": "false", "camera_address": "", "number_extruders": "1", "is_mixed_extruder": "false", "enable_bed": "false", "enable_fan": "false", "enable_control_panel": "true", "enable_grbl_panel": "true", "interval_positions": "3", "interval_temperatures": "3", "interval_status": "3", "xy_feedrate": "1000", "z_feedrate": "100", "a_feedrate": "100", "b_feedrate": "100", "c_feedrate": "100", "e_feedrate": "400", "e_distance": "5", "enable_temperatures_panel": "false", "enable_extruder_panel": "false", "enable_files_panel": "true", "f_filters": "g;G;gco;GCO;gcode;GCODE;nc;NC;ngc;NCG;tap;TAP;txt;TXT", "enable_commands_panel": "true", "enable_autoscroll": "true", "enable_verbose_mode": "true", "enable_grbl_probe_panel": "false", "probemaxtravel": "40", "probefeedrate": "100", "probetouchplatethickness": "0.5" }]

export default class Grbl extends Base {
    constructor() {
        super()
        this.fwData = null
        this.settings = null
        this.preferences = null
        this.config = null
        this.user = null
    }

    checkLogin() {
        return super.checkLogin()
            .then(user => {
                this.user = user
                return user
            })
    }

    login(data) {
        return super.login({
            USER: data.user,
            PASSWORD: data.password,
            SUBMIT: 'yes'
        })
    }

    getFWData() {
        return this.sendCommand('[ESP800]')
            .then(response => {
                var fwData = this.parseFWData(response)
                this.fwData = fwData
                return fwData
            })
    }

    parseFWData(response) {
        var fwData = {
            grblaxis: 3,
            esp_hostname: ESP_HOST_NAME
        }
        var tlist = response.split("#")
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
        return this.sendCommand('[ESP400]')
            .then(response => {
                if (!response.EEPROM) {
                    throw new Error('wrong data')
                }
                let settings = this.parseSettings(response.EEPROM)
                return settings
            })
    }

    parseSettings(settings) {
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
                value: svalue,
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

    getPreferences() {
        return this.sendGetHttp(PREFERENCES_FILE_NAME)
            .then((response) => {
                var preferences
                if (typeof response == 'string' && response.indexOf("<HTML>") != -1) {
                    preferences = DEFAULT_PREFERENCES[0]
                } else {
                    preferences = response[0]
                }
                this.preferences = preferences
                return preferences
            })
            .catch((err) => {
                console.log(err)
            })
    }

    
}