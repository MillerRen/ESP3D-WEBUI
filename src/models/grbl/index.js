import Base from '../base'
import { PREFERENCES_FILE_NAME } from '../../constants'
import Config from './config'
import Settings from './settings'
import Firmware from './firmware'

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
                var fwData = Firmware.parseFWData(response)
                this.fwData = fwData
                return fwData
            })
    }

    getSettings() {
        return this.sendCommand('[ESP400]')
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

    getConfig () {
        return this.sendCommand('$$')
            .then(response => Config.parseConfig(response))
    }
    
}


