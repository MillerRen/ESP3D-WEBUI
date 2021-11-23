import http from '../../lib/http'
import WS from '../../lib/websocket'

import Config from './config'
import Settings from './settings'
import Firmware from './firmware'
import Status from './status'
import Files from './files'
import Websocket from './websocket'

import { Checker, Extractor, StatusExtractor, constants } from '../../lib/grbl'

import {
  MACROS_FILE_NAME,
  PREFERENCES_FILE_NAME,
  TOTAL_WAITING_TIMES,
  LOGIN_URL,
  COMMAND_URL,
  DEFAULT_PREFERENCES
} from '../../constants'

var checker = new Checker()
var messageTypes = constants.messageTypes
var statusExtractor = new StatusExtractor()
var extractor = new Extractor()

var checkPositionTimer

export default class Grbl {
  constructor () {
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
    this.grblErrorMessage = ''
    this.enableAutoCheckPosition = true
    this.message = ''
  }

  startSocket () {
    var that = this
    var url = this.fwData.async_webcommunication
      ? 'ws://' + document.location.host + '/ws'
      : 'ws://' + this.fwData.websocket_ip + ':' + this.fwData.websocket_port
    console.log('Socket is: ' + url)
    this.ws = new WS(url, {
      protocols: ['arduino'],
      onmessage (e) {
        var msg = Websocket.parseMessage(e)
        msg.type == 'stream' ? that.processStream(msg) : console.log(msg)
      }
    })
  }

  processStream (msg) {
    var data = msg.msg.trim()
    var report = {}
    if (checker.isStatusReport(data)) {
      report = statusExtractor.statusReport(data)
      Object.assign(this.MPos, report.data.machinePosition)
      Object.assign(this.WPos, report.data.workPosition)
      Object.assign(this.grblStatus, report.data.status)
      if(report.data.status.state=='Hold') {
        this.grblErrorMessage = report.data.status.state+':'+report.data.status.code
      }
      if(report.data.status.state=='Idle') {
        this.grblErrorMessage = ''
      }
      if(report.data.status.state=='Run') {
        this.grblErrorMessage = ''
      }
    } else if (checker.isSuccessResponse(data)) {
      report = extractor.successReport(data)
    } else if (checker.isGrblInitialization(data)) {
      report = extractor.grblInitReport(data)
    } else if (checker.isAlarm(data)) {
      report = extractor.alarmReport(data)
      this.grblErrorMessage = report.input.split('\r')[0]
    } else if (checker.isError(data)) {
      report = extractor.errorReport(data)
      this.grblErrorMessage = report.input
    } else if (checker.isGrblSetting(data.substr(0, 4))) {
      report = extractor.settingsReport(data)
      this.config = Config.parseConfig(data)
    } else if (checker.isFeedbackMessage(data)) {
      report = extractor.feedbackMessageReport(data)
    } else if (checker.isBuildVersion(data)) {
      report = extractor.buildVersionReport(data)
    } else if (checker.isBuildOptions(data)) {
      report = extractor.buildOptionsReport(data)
    } else if (checker.isGcodeState(data)) {
      report = extractor.gcodeStateReport(data)
    } else if (checker.isHelpMessage(data)) {
      report = extractor.helpMessageReport(data)
    } else if (checker.isGcodeSystem(data)) {
      report = extractor.gcodeSystemReport(data)
    } else if (checker.isProbeResult(data)) {
      report = extractor.probeResultReport(data)
      this.probeStatus = false
    } else if (checker.isEcho(data)) {
      report = extractor.echoReport(data)
    } else if (checker.isStartupLine(data)) {
      report = extractor.startupLineReport(data)
    } else {
      report = { input: data, type: messageTypes.unknown }
    }

    if (this.preferences.enable_verbose_mode || report.type != 'status') {
      this.messages.push(msg)
    }
    console.log(report)
    this.report = report
  }

  clearMessages () {
    this.messages = []
  }

  sendCommand (cmd) {
    return http
      .sendGetHttp(COMMAND_URL, {
        plain: cmd
      })
      .catch(err => {
        this.message = 'send command failed'
        throw new Error(err)
      })
  }

  sendCommandText (cmd) {
    return http
      .sendGetHttp(COMMAND_URL, {
        commandText: cmd
      })
      .catch(err => {
        this.message = 'send command text failed'
        throw new Error(err)
      })
  }

  sendCustomCommand (cmd) {
    this.messages.push({
      type: 'input',
      msg: cmd
    })
    return this.sendCommandText(cmd)
  }

  sendRealtimeCommand (cmd) {
    return this.sendCommandText(cmd)
  }

  uploadFile (url, fd, path) {
    this.uploadingProgress = 0
    return http
      .sendFileHttp(url, fd, path, e => {
        this.uploadingProgress = Math.round((e.loaded * 100) / e.total)
      })
      .then(() => {
        this.uploadingProgress = 0
      })
  }

  listFiles (path, params) {
    return http.sendGetHttp(path, {
      action: 'list',
      filename: 'all',
      ...params
    })
  }

  listSPIFFS (url, params) {
    return this.listFiles(url, params).then(response =>
      Files.parseFiles(response, '')
    )
  }

  listSD (url, params) {
    return this.listFiles(url, params).then(response =>
      Files.parseFiles(response, this.preferences.f_filters)
    )
  }

  createDir (url, params) {
    params.action = 'createdir'
    return http
      .sendGetHttp(url, params)
      .then(response => Files.parseFiles(response, this.preferences.f_filters))
  }

  deleteDir (url, params) {
    params.action = 'deletedir'
    return http
      .sendGetHttp(url, params)
      .then(response => Files.parseFiles(response, this.preferences.f_filters))
  }

  deleteFile (url, params) {
    params.action = 'delete'
    return http
      .sendGetHttp(url, params)
      .then(response => Files.parseFiles(response, this.preferences.f_filters))
  }

  printFile (filename) {
    let cmd = `[ESP220]${filename}`
    return this.sendCommandText(cmd)
  }

  checkLogin () {
    return http.sendGetHttp(LOGIN_URL).then(response => {
      var user = Object.assign({}, response)
      if (typeof response.authentication_lvl !== 'undefined') {
        if (response.authentication_lvl != 'guest') {
          user.need_auth = false
        } else user.need_auth = true
      } else {
        user.need_auth = true
      }
      this.user = user
      return user
    })
  }

  login (data) {
    return super.login({
      USER: data.user,
      PASSWORD: data.password,
      SUBMIT: 'yes'
    })
  }

  getFWData () {
    return this.sendCommand('[ESP800]').then(response => {
      var fwData = Firmware.parseFWData(response)
      this.fwData = fwData
      return fwData
    })
  }

  getSettings () {
    return this.sendCommand('[ESP400]').then(response => {
      if (!response.EEPROM) {
        throw new Error('wrong data')
      }
      let settings = Settings.parseSettings(response.EEPROM)
      this.settings = settings
      return settings
    })
  }

  scanWifi () {
    return this.sendCommand('[ESP410]').then(response => response.AP_LIST)
  }

  getPreferences () {
    return http
      .sendGetHttp(PREFERENCES_FILE_NAME)
      .then(response => {
        var preferences
        if (typeof response == 'string' && response.indexOf('<HTML>') != -1) {
          preferences = DEFAULT_PREFERENCES[0]
        } else {
          preferences = response[0]
        }
        this.preferences = preferences
        return preferences
      })
      .catch(err => {
        console.log(err)
      })
  }

  updateSettings (cmd) {
    return this.sendCommand(cmd)
  }

  updatePreferences (preferences) {
    var blob = new Blob([JSON.stringify([preferences], null, ' ')], {
      type: 'application/json'
    })
    var file = new File([blob], PREFERENCES_FILE_NAME)

    return this.uploadFile('/files', [file], '/')
  }

  getConfig () {
    return this.sendCommand('$$').then(response => {
      if (response) {
        this.config = Config.parseConfig(response)
        return this.config
      }
      return response
    })
  }

  updateConfig (cmd) {
    return this.sendCommand(cmd)
  }

  getMacros () {
    return http.sendGetHttp(MACROS_FILE_NAME).then(response => {
      var macros
      if (typeof response == 'string' && response.indexOf('<HTML>') != -1) {
        macros = []
        for (let i = 0; i < 9; i++) {
          macros.push({
            name: '',
            glyph: '',
            filename: '',
            target: '',
            class: '',
            index: i
          })
        }
      } else {
        macros = response
      }
      this.macros = macros
      return macros
    })
  }

  updateMacros (macros) {
    var blob = new Blob([JSON.stringify(macros, null, ' ')], {
      type: 'application/json'
    })
    var file = new File([blob], MACROS_FILE_NAME)

    return this.uploadFile('/files', [file], '/')
  }

  runMacro (macro) {
    if (macro.target == 'ESP') {
      return this.sendCustomCommand(`[ESP700]${macro.filename}`)
    } else if (macro.target == 'SD') {
      return this.printFile(macro.filename)
    } else if (macro.target == 'URI') {
      window.open(macro.filename)
    }
  }

  getESPStatus () {
    return this.sendCommand('[ESP420]plain').then(response => {
      let status = Status.parseStatus(response)
      this.status = status
      return status
    })
  }

  restartESP () {
    return this.sendCommandText('[ESP444]RESTART').then(() => {
      this.waitRestarting()
    })
  }

  updateFirmware (files) {
    return this.uploadFile('/updatefw', files, '/').then(() => {
      this.waitRestarting()
    })
  }

  waitRestarting () {
    this.restartingProgress = 0
    var process = 1
    var timer = setInterval(() => {
      process++
      this.restartingProgress = Math.round(
        (process * 100) / TOTAL_WAITING_TIMES
      )
      if (process > TOTAL_WAITING_TIMES) {
        process = 0
        clearInterval(timer)
        location.reload()
      }
    }, 1000)
  }

  homeAll () {
    return this.sendCommandText('$H').then(() => this.getPosition)
  }

  homeX () {
    return this.sendCommandText('$HX').then(() => this.getPosition)
  }

  homeY () {
    return this.sendCommandText('$HY').then(() => this.getPosition)
  }

  homeZ () {
    return this.sendCommandText('$HZ').then(() => this.getPosition)
  }

  jog (cmd, feedrate) {
    let command = '$J=G91 G21 F' + feedrate + ' ' + cmd
    return this.sendCommandText(command).then(() => this.getPosition)
  }

  motorsOff () {
    return this.sendCommandText('$MD')
  }

  disableAlarm () {
    return this.sendCommandText('$X')
  }

  resetGrbl () {
    return this.sendCommandText(String.fromCharCode(0x18))
  }

  getPosition () {
    return this.sendCommandText('?')
  }

  sendZeroCommand (axis) {
    return this.sendCommandText(`G10 L20 P0 ${axis}`).then(
      () => this.getPosition
    )
  }

  autoCheckPosition () {
    if (checkPositionTimer) {
      clearInterval(checkPositionTimer)
    }
    if (!this.enableAutoCheckPosition || !this.preferences.interval_positions)
      return
    checkPositionTimer = setInterval(() => {
      if (!this.preferences.interval_positions) {
        clearInterval(checkPositionTimer)
      }
      this.getPosition()
    }, this.preferences.interval_positions * 1000)
  }

  startProbeProcess () {
    var cmd =
      'G38.2 G91 Z-' +
      this.preferences.probemaxtravel +
      ' F' +
      this.preferences.probefeedrate
    return this.sendCustomCommand(cmd)
  }
}
