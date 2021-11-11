import http from '../../lib/http'
import WS from '../../lib/websocket'
import { MACROS_FILE_NAME, PREFERENCES_FILE_NAME, TOTAL_WAITING_TIMES } from '../../constants'
import Config from './config'
import Settings from './settings'
import Firmware from './firmware'
import Status from './status'
import Files from './files'
import Websocket from './websocket'
const constants = require("grbl-parser/lib/constants")
const Checker = require("grbl-parser/lib/checker")
const StatusExtractor = require("grbl-parser/lib/status_extractor")
const Extractor = require("grbl-parser/lib/extractor")

var checker = new Checker()
var messageTypes = constants.messageTypes
var statusExtractor = new StatusExtractor()
var extractor = new Extractor()

const DEFAULT_PREFERENCES = [{ "language": "en", "enable_lock_UI": "false", "enable_ping": "true", "enable_DHT": "false", "enable_camera": "false", "auto_load_camera": "false", "camera_address": "", "number_extruders": "1", "is_mixed_extruder": "false", "enable_bed": "false", "enable_fan": "false", "enable_control_panel": "true", "enable_grbl_panel": "true", "interval_positions": "3", "interval_temperatures": "3", "interval_status": "3", "xy_feedrate": "1000", "z_feedrate": "100", "a_feedrate": "100", "b_feedrate": "100", "c_feedrate": "100", "e_feedrate": "400", "e_distance": "5", "enable_temperatures_panel": "false", "enable_extruder_panel": "false", "enable_files_panel": "true", "f_filters": "g;G;gco;GCO;gcode;GCODE;nc;NC;ngc;NCG;tap;TAP;txt;TXT", "enable_commands_panel": "true", "enable_autoscroll": "true", "enable_verbose_mode": "true", "enable_grbl_probe_panel": "false", "probemaxtravel": "40", "probefeedrate": "100", "probetouchplatethickness": "0.5" }]

export default class Grbl {
    constructor() {
        this.fwData = null
        this.settings = null
        this.preferences = null
        this.macros = null
        this.config = null
        this.user = null
        this.status = null
        this.restartingProgress = 0
        this.uploadingProgress = 0
        this.messages = []
        this.spiffs = {}
        this.sdfs = {}
        this.report = {}
        this.MPos = {
            x: 0,
            y: 0,
            z: 0,
            a: 0,
            b: 0,
            c: 0,
            d: 0,
            e: 0
        }
        this.WPos = {
            x: 0,
            y: 0,
            z: 0,
            a: 0,
            b: 0,
            c: 0,
            d: 0,
            e: 0
        }
        this.grblStatus = {}
        this.probeStatus = false
    }

    startSocket() {
        var that = this
        var url = this.fwData.async_webcommunication ? 'ws://' + document.location.host + '/ws' : 'ws://' + this.fwData.websocket_ip + ':' + this.fwData.websocket_port
        console.log("Socket is: " + url);
        this.ws = new WS(url, {
            protocols: ['arduino'],
            onmessage(e) {
                var msg = Websocket.parseMessage(e)
                msg.type == 'stream' ? that.processStream(msg) : console.log(msg)
            }
        });

    }

    processStream(msg) {

        var data = msg.msg.trim()
        var report = {}
        if (checker.isStatusReport(data)) {
            report = statusExtractor.statusReport(data)
            Object.assign(this.MPos, report.data.machinePosition)
            Object.assign(this.WPos, report.data.workPosition)
            Object.assign(this.grblStatus, report.data.status)
        }
        else if (checker.isSuccessResponse(data)) {
            report = extractor.successReport(data)
        }

        else if (checker.isGrblInitialization(data)) {
            report = extractor.grblInitReport(data)
        }

        else if (checker.isAlarm(data)) {
            report = extractor.alarmReport(data)
        }

        else if (checker.isError(data)) {
            report = extractor.errorReport(data)
        }

        else if (checker.isGrblSetting(data.substr(0, 4))) {
            report = extractor.settingsReport(data)
            this.config = Config.parseConfig(data)
        }

        else if (checker.isFeedbackMessage(data)) {
            report = extractor.feedbackMessageReport(data)
        }

        else if (checker.isBuildVersion(data)) {
            report = extractor.buildVersionReport(data)
        }

        else if (checker.isBuildOptions(data)) {
            report = extractor.buildOptionsReport(data)
        }

        else if (checker.isGcodeState(data)) {
            report = extractor.gcodeStateReport(data)
        }

        else if (checker.isHelpMessage(data)) {
            report = extractor.helpMessageReport(data)
        }

        else if (checker.isGcodeSystem(data)) {
            report = extractor.gcodeSystemReport(data)
        }

        else if (checker.isProbeResult(data)) {
            report = extractor.probeResultReport(data)
        }

        else if (checker.isEcho(data)) {
            report = extractor.echoReport(data)
        }

        else if (checker.isStartupLine(data)) {
            report = extractor.startupLineReport(data)
        }

        else {
            report = { input: data, type: messageTypes.unknown }
        }

        if (this.preferences.enable_verbose_mode || (report.type != 'status')) {
            this.messages.push(msg)
        }
console.log(report)
        this.report = report
    }

    processStatus(msg) {
        console.log('process status', msg)
    }

    processProbe(msg) {
        console.log('process probe', msg)
    }

    processMessage(msg) {
        console.log('process message', msg)
    }

    processReset(msg) {
        console.log('process reset', msg)
    }

    clearMessages() {
        this.messages = []
    }

    sendCustomCommand(cmd) {
        this.messages.push({
            type: 'input',
            msg: cmd
        })
        return http.sendCommandText(cmd)
    }

    sendRealtimeCommand(cmd) {
        return http.sendCommandText(cmd)
    }

    uploadFile(url, fd, path) {
        this.uploadingProgress = 0
        return http.sendFileHttp(url, fd, path, (e) => {
            this.uploadingProgress = Math.round(e.loaded * 100 / e.total)
        })
            .then(() => {
                this.uploadingProgress = 0
            })
    }

    listSPIFFS(url, params) {
        return http.listFiles(url, params)
            .then(response => Files.parseFiles(response, ''))
    }

    listSD(url, params) {
        return http.listFiles(url, params)
            .then(response => Files.parseFiles(response, this.preferences.f_filters))
    }

    createDir(url, params) {
        params.action = 'createdir'
        return http.sendGetHttp(url, params)
            .then(response => Files.parseFiles(response, this.preferences.f_filters))
    }

    deleteDir(url, params) {
        params.action = 'deletedir'
        return http.sendGetHttp(url, params)
            .then(response => Files.parseFiles(response, this.preferences.f_filters))
    }

    deleteFile(url, params) {
        params.action = 'delete'
        return http.sendGetHttp(url, params)
            .then(response => Files.parseFiles(response, this.preferences.f_filters))
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

        return this.uploadFile(PREFERENCES_FILE_NAME, [file])
    }

    getConfig() {
        return http.sendCommand('$$')
            .then(response => {
                if (response) {
                    this.config = Config.parseConfig(response)
                    return this.config
                }
                return response
            })
    }

    updateConfig(cmd) {
        return http.sendCommand(cmd)
    }

    getMacros() {
        return http.sendGetHttp(MACROS_FILE_NAME)
            .then((response) => {
                var macros
                if (typeof response == 'string' && response.indexOf("<HTML>") != -1) {
                    macros = []
                } else {
                    macros = response
                }
                this.macros = macros
                return macros
            })
    }

    updateMacros(macros) {
        var blob = new Blob([JSON.stringify([macros], null, " ")], {
            type: 'application/json'
        });
        var file = new File([blob], MACROS_FILE_NAME);

        return this.uploadFile(MACROS_FILE_NAME, [file])
    }

    runMacro(macro) {
        if (macro.target == 'ESP') {
            return this.sendCustomCommand(`[ESP700]${macro.filename}`)
        } else if (macro.target == 'SD') {
            return this.printFile(macro.filename)
        } else if (macro.target == 'URI') {
            window.open(macro.filename)
        }

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
        return this.uploadFile('/updatefw', files, '/')
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
            .then(this.getPosition)

    }

    homeX() {
        return http.sendCommandText('$HX')
            .then(this.getPosition)

    }

    homeY() {
        return http.sendCommandText('$HY')
            .then(this.getPosition)

    }

    homeZ() {
        return http.sendCommandText('$HZ')
            .then(this.getPosition)

    }

    jog(cmd, feedrate) {
        let command = "$J=G91 G21 F" + feedrate + " " + cmd
        return http.sendCommandText(command)
            .then(this.getPosition)

    }

    disableAlarm() {
        return http.sendCommandText('$X')
    }

    resetGrbl() {
        return http.sendCommandText(String.fromCharCode(0x18))
    }

    getPosition() {
        return http.sendCommandText('?')
    }

    sendZeroCommand(axis) {
        return http.sendCommandText(`G10 L20 P0 ${axis}`)
            .then(this.getPosition)
    }

    autoCheckPosition() {
        var timer = setInterval(() => {
            if (!this.preferences.interval_positions) {
                clearInterval(timer)
            }
            this.getPosition()
        }, this.preferences.interval_positions * 1000)
    }

}


