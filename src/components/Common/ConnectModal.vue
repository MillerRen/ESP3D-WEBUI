<template>
  <div class="connect-modal">
    <center v-if="!need_auth">
      <span>
        <span v-t>Please wait...</span>
        <progress :value="bootProgress" max="100"></progress>
      </span>
      <br />
      <br />
      <span v-if="error" class="text-danger">
        <span v-t>Connection failed! is your FW correct?</span>
      </span>
    </center>
    <form class="form" @submit.prevent="submit" v-if="need_auth">
      <div class="form-group">
        <label for="" class="form-control-label" v-t>User:</label>
        <input type="text" class="form-control" required v-model="user.user" />
      </div>
      <div class="form-group">
        <label for="" class="form-control-label" v-t>Password:</label>
        <input
          type="password"
          class="form-control"
          required
          v-model="user.password"
        />
      </div>
      <div class="form-grou">
        <p class="control-static text-danger">{{ msg }}</p>
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary" v-t>Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import { TOTAL_BOOT_STEPS, DEFAULT_PREFERENCES } from '../../constants'
export default {
  name: 'ConnectModal',
  props: {
      fwData: {
          type: Object
      }
  },
  data () {
    return {
      bootStep: 0,
      need_auth: false,
      error: ''
    }
  },
  computed: {
    bootProgress () {
      return Math.round((this.bootStep * 100) / TOTAL_BOOT_STEPS)
    }
  },
  methods: {
    getFWData () {
      if (this.fwData) {
        return Promise.resolve(this.fwData)
      }
      return this.$http
        .sendCommand('[ESP800]')
        .then(fwData => {
          return this._parseFWData(fwData)
        })
        .then(fwData => {
          this.$emit('fwData', fwData)
          if (!fwData.ESP3D_authentication) {
            this.$emit('needAuth')
            return Promise.reject()
          }
        })
    },
    getSettings () {
      return this.$http
        .sendCommand('[ESP400]')
        .then(response => {
          if (!response.EEPROM) {
            throw new Error('Wrong data')
          }
          return this._parseSettings(response.EEPROM)
        })
        .then(settings => {
          this.$emit('settings', settings)
          return settings
        })
    },
    getPrefereces () {
      return this.$http.get('/preferences.json').then(response => {
        var preferences
        if (typeof response == 'string' && response.indexOf('<HTML>') != -1) {
          preferences = DEFAULT_PREFERENCES[0]
        } else {
          preferences = response[0]
        }
        return preferences
      })
    },
    _parseFWData (response) {
      var fwData = {
        grblaxis: 3,
        esp_hostname: 'ESP3D WebUI'
        // ui_version: UI_VERSION,
      }
      var tlist = response.split('#')
      if (tlist.length < 3) {
        return false
      }
      //FW version
      var sublist = tlist[0].split(':')
      if (sublist.length != 2) {
        return false
      }
      fwData.fw_version = sublist[1].toLowerCase().trim()
      //FW target
      sublist = tlist[1].split(':')
      if (sublist.length != 2) {
        return false
      }
      fwData.target_firmware = sublist[1].toLowerCase().trim()
      //FW HW
      sublist = tlist[2].split(':')
      if (sublist.length != 2) {
        return false
      }
      var sddirect = sublist[1].toLowerCase().trim()
      if (sddirect == 'direct sd') fwData.direct_sd = true
      else fwData.direct_sd = false
      //primary sd
      sublist = tlist[3].split(':')
      if (sublist.length != 2) {
        return false
      }
      if (!fwData.direct_sd && fwData.target_firmware == 'smoothieware') {
        fwData.primary_sd = 'sd/'
      } else {
        fwData.primary_sd = sublist[1].toLowerCase().trim()
      }
      //secondary sd
      sublist = tlist[4].split(':')
      if (sublist.length != 2) {
        return false
      }
      if (!fwData.direct_sd && fwData.target_firmware == 'smoothieware') {
        fwData.secondary_sd = 'ext/'
      } else {
        fwData.secondary_sd = sublist[1].toLowerCase().trim()
      }
      //authentication
      sublist = tlist[5].split(':')
      if (sublist.length != 2) {
        return false
      }
      if (sublist[0].trim() == 'authentication' && sublist[1].trim() == 'yes')
        fwData.ESP3D_authentication = true
      else fwData.ESP3D_authentication = false
      //async communications
      if (tlist.length > 6) {
        sublist = tlist[6].split(':')
        if (
          sublist[0].trim() == 'webcommunication' &&
          sublist[1].trim() == 'Async'
        )
          fwData.async_webcommunication = true
        else {
          fwData.async_webcommunication = false
          fwData.websocket_port = sublist[2].trim()
          if (sublist.length > 3) {
            fwData.websocket_ip = sublist[3].trim()
          } else {
            fwData.websocket_ip = document.location.hostname
          }
        }
      }
      if (tlist.length > 7) {
        sublist = tlist[7].split(':')
        if (sublist[0].trim() == 'hostname')
          fwData.esp_hostname = sublist[1].trim()
      }

      if (fwData.target_firmware == 'grbl-embedded' && tlist.length > 8) {
        sublist = tlist[8].split(':')
        if (sublist[0].trim() == 'axis') {
          fwData.grblaxis = parseInt(sublist[1].trim())
        }
      }

      return fwData
    },
    _parseSettings (settings) {
      var setting_configList = []
      for (var vindex in settings) {
        var sentry = settings[vindex]
        var slabel = sentry.H
        var svalue = sentry.V
        var scmd = '[ESP401]P=' + sentry.P + ' T=' + sentry.T + ' V='
        var options = []
        var min
        var max
        if (typeof sentry.M !== 'undefined') {
          min = sentry.M
        } else {
          //add limit according the type
          if (sentry.T == 'B') min = -127
          else if (sentry.T == 'S') min = 0
          else if (sentry.T == 'A') min = 7
          else if (sentry.T == 'I') min = 0
        }
        if (typeof sentry.S !== 'undefined') {
          max = sentry.S
        } else {
          //add limit according the type
          if (sentry.T == 'B') max = 255
          else if (sentry.T == 'S') max = 255
          else if (sentry.T == 'A') max = 15
          else if (sentry.T == 'I') max = 2147483647
        }
        //list possible options if defined
        if (typeof sentry.O !== 'undefined') {
          for (var i in sentry.O) {
            var val = sentry.O[i]
            for (var j in val) {
              var sub_key = j
              var sub_val = val[j]
              sub_val = sub_val.trim()
              sub_key = sub_key.trim()
              var option = {
                id: sub_val,
                display: sub_key
              }
              options.push(option)
              //console.log("*" + sub_key + "* and *" + sub_val + "*");
            }
          }
        }
        svalue = svalue.trim()
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
          pos: sentry.P,
          success: false
        }
        setting_configList.push(config_entry)
      }

      return setting_configList
    }
  },
  mounted () {
    this.bootStep = 1
    this.getFWData()
      .then(() => {
        this.bootStep = 2
        return this.getSettings()
      })
      .then(() => {
        this.bootStep = 3
        return this.getPrefereces()
      })
      .then(() => {
        this.bootStep = 4
        this.$emit('success')
      })
  }
}
</script>
