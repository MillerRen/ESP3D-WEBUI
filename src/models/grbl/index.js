import http from '../../lib/http'
import WS from '../../lib/websocket'
import { PREFERENCES_FILE_NAME, TOTAL_WAITING_TIMES } from '../../constants'
import Config from './config'
import Settings from './settings'
import Firmware from './firmware'
import Status from './status'
import Files from './files'
import Websocket from './websocket'

const DEFAULT_PREFERENCES = [{ "language": "en", "enable_lock_UI": "false", "enable_ping": "true", "enable_DHT": "false", "enable_camera": "false", "auto_load_camera": "false", "camera_address": "", "number_extruders": "1", "is_mixed_extruder": "false", "enable_bed": "false", "enable_fan": "false", "enable_control_panel": "true", "enable_grbl_panel": "true", "interval_positions": "3", "interval_temperatures": "3", "interval_status": "3", "xy_feedrate": "1000", "z_feedrate": "100", "a_feedrate": "100", "b_feedrate": "100", "c_feedrate": "100", "e_feedrate": "400", "e_distance": "5", "enable_temperatures_panel": "false", "enable_extruder_panel": "false", "enable_files_panel": "true", "f_filters": "g;G;gco;GCO;gcode;GCODE;nc;NC;ngc;NCG;tap;TAP;txt;TXT", "enable_commands_panel": "true", "enable_autoscroll": "true", "enable_verbose_mode": "true", "enable_grbl_probe_panel": "false", "probemaxtravel": "40", "probefeedrate": "100", "probetouchplatethickness": "0.5" }]

export default class Grbl {
    constructor() {
        this.fwData = null
        this.settings = null
        this.preferences = null
        this.config = null
        this.user = null
        this.status = null
        this.restartingProgress = 0
        this.uploadingProgress = 0
        this.messages = []
    }

    startSocket() {
        // var that = this
        var url = this.fwData.async_webcommunication ? 'ws://' + document.location.host + '/ws':'ws://' + this.fwData.websocket_ip + ':' + this.fwData.websocket_port
        console.log("Socket is: " + url);
        this.ws = new WS(url,  ['arduino']);
        this.ws.onMessage = (e) => {
            this.messages.push(Websocket.parseMessage(e))
        }

    }

    clearMessages () {
        this.messages  = []
    }

    sendCustomCommand(cmd) {
        return http.sendCommandText(cmd)
    }

    uploadFile(url, fd, path) {
        return http.sendFileHttp(url, fd, path, (e) => {
            this.uploadingProgress = Math.round(e.loaded * 100 / e.total)
        })
            .finally(() => {
                this.uploadingProgress = 0
            })
    }

    listSPIFFS(url, params) {
        return http.listFiles(url, params)
    }

    listSD(url, params) {
        return http.listFiles(url, params)
            .then(response => Files.parseFiles(response, this.preferences))
    }

    printFile(filename) {
        let cmd = `[ESP220]${filename}`
        return http.sendCommandText(cmd)
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
        return http.sendCommand('[ESP800]')
            .then(response => {
                var fwData = Firmware.parseFWData(response)
                this.fwData = fwData
                return fwData
            })
    }

    getSettings() {
        return http.sendCommand('[ESP400]')
            .then(response => {
                if (!response.EEPROM) {
                    throw new Error('wrong data')
                }
                let settings = Settings.parseSettings(response.EEPROM)
                this.settings = settings
                return settings
            })
    }

    getPreferences() {
        return http.sendGetHttp(PREFERENCES_FILE_NAME)
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

    updateSettings(cmd) {
        return http.sendCommand(cmd)
    }

    updatePreferences(preferences) {
        var blob = new Blob([JSON.stringify([preferences], null, " ")], {
            type: 'application/json'
        });
        var file = new File([blob], PREFERENCES_FILE_NAME);

        return http.uploadFile(PREFERENCES_FILE_NAME, [file])
    }

    getConfig() {
        return http.sendCommand('$$')
            .then(response => Config.parseConfig(response))
    }

    getESPStatus() {
        return http.sendCommand('[ESP420]plain')
            .then(response => {
                let status = Status.parseStatus(response)
                this.status = status
                return status
            })
    }

    restartESP() {
        return http.sendCommandText('[ESP444]RESTART')
            .then(() => {
                this.waitRestarting()
            })
    }

    updateFirmware(files) {
        return http.uploadFile('/updatefw', files, '/')
            .then(() => {
                this.waitRestarting()
            })
    }

    waitRestarting() {
        this.restartingProgress = 0
        var process = 1
        var timer = setInterval(() => {
            process++
            this.restartingProgress = Math.round(process * 100 / TOTAL_WAITING_TIMES)
            if (process > TOTAL_WAITING_TIMES) {
                process = 0
                clearInterval(timer)
                location.reload()
            }
        }, 1000)
    }

    homeAll() {
        return http.sendCommandText('$H')
    }

    homeX() {
        return http.sendCommandText('$HX')
    }

    homeY() {
        return http.sendCommandText('$HY')
    }

    homeZ() {
        return http.sendCommandText('$HZ')
    }

    jog(cmd, feedrate) {
        let command = "$J=G91 G21 F" + feedrate + " " + cmd
        return http.sendCommandText(command)
    }



}


