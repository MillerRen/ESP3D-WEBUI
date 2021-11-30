import http from '../../lib/http'
import WS from '../../lib/websocket'
import GrblPaser from '../../lib/grbl'

import Config from './config'
import Settings from './settings'
import Firmware from './firmware'
import Status from './status'
import Files from './files'
import Websocket from './websocket'
import dht from './dht'

import {
  MACROS_FILE_NAME,
  PREFERENCES_FILE_NAME,
  TOTAL_WAITING_TIMES,
  LOGIN_URL,
  COMMAND_URL,
  DEFAULT_PREFERENCES
} from '../../constants'



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
    this.sd = {}
    this.report = {}
    this.enableAutoCheckPosition = true
    this.message = ''
    this.page_id = 0
    this.disableUI = false
    this.dht = {
      humidity: '',
      temperature: ''
    }
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
        msg.type == 'stream' ? that.processStream(msg) : that.processText(msg)
      }
    })
  }

  processText (msg) {
    var tval = msg.split(':')
    if (tval.length >= 2) {
      if (tval[0] == 'CURRENT_ID') {
        this.page_id = tval[1]
        console.log('connection id = ' + this.page_id)
      }
      if (this.preferences.enable_ping) {
        if (tval[0] == 'PING') {
          this.page_id = tval[1]
          console.log('ping from id = ' + this.page_id)
        }
      }
      if (tval[0] == 'ACTIVE_ID') {
        if (this.page_id != tval[1]) {
          this.disableUI = true
        }
      }
      if (tval[0] == 'DHT') {
        this.dht = dht(tval[1])
      }
      if (tval[0] == 'ERROR') {
        this.message = tval[2]
        console.log('ERROR: ' + tval[2] + ' code:' + tval[1])
      }
      if (tval[0] == 'MSG') {
        this.message = tval[2]
        console.log('MSG: ' + tval[2] + ' code:' + tval[1])
      }
    }
  }

  processStream (msg) {
    var data = msg.msg.trim()
    var report = GrblPaser.run({
      input: data
    })
    this.report = Object.assign({}, report)

    if (this.preferences.enable_verbose_mode || report.type != 'status') {
      this.messages.push(report)
    }
  }

  clearMessages () {
    this.messages = []
  }

  sendCommand (cmd) {
    return http
      .sendGetHttp(COMMAND_URL, {
        plain: encodeURIComponent(cmd)
      })
      .catch(err => {
        this.message = err.responseText || 'send command failed'
        throw new Error(err)
      })
  }

  sendCommandText (cmd) {
    return http
      .sendGetHttp(COMMAND_URL, {
        commandText: encodeURIComponent(cmd)
      })
      .catch(err => {
        console.log(err)
        this.message = err.responseText || 'send command text failed'
        throw new Error(err)
      })
  }

  sendCustomCommand (cmd) {
    this.messages.push({
      type: 'input',
      msg: cmd,
      input: cmd
    })
    return this.sendCommandText(cmd)
  }

  sendRealtimeCommand (cmd) {
    console.log(cmd)
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
      .then((response) => {
        this.autoCheckPosition()
        return response
      })
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
        throw new Error('Wrong data')
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

  toggleSpindle (on) {
    return on ? this.sendCommandText('M3 S1000') : this.sendCommandText('M5')
  }

  autoCheckPosition () {
    if (checkPositionTimer) {
      clearInterval(checkPositionTimer)
    }
    if (!this.enableAutoCheckPosition || !this.preferences.interval_positions)
      return
    this.getPosition()
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
