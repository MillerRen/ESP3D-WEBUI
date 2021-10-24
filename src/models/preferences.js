import http from '../../lib/http'

const PREFERENCES_FILE_NAME = 'preferences.json'
const baseURL = '/' + PREFERENCES_FILE_NAME

const DEAULT_PREFERENCES = [{
    "language": "en",
    "enable_lock_UI": "false",
    "enable_ping": "true",
    "enable_DHT": "false",
    "enable_camera": "false",
    "auto_load_camera": "false",
    "camera_address": "",
    "number_extruders": "1",
    "is_mixed_extruder": "false",
    "enable_redundant": "false",
    "enable_probe": "false",
    "enable_bed": "false",
    "enable_chamber": "false",
    "enable_fan": "false",
    "enable_control_panel": "true",
    "enable_grbl_panel": "true",
    "interval_positions": "3",
    "interval_temperatures": "3",
    "interval_status": "3",
    "xy_feedrate": "1000",
    "z_feedrate": "100",
    "a_feedrate": "100",
    "b_feedrate": "100",
    "c_feedrate": "100",
    "e_feedrate": "400",
    "e_distance": "5",
    "f_filters": "g;G;gco;GCO;gcode;GCODE",
    "enable_temperatures_panel": "true",
    "enable_extruder_panel": "true",
    "enable_files_panel": "true",
    "has_TFT_SD": "false",
    "has_TFT_USB": "false",
    "enable_commands_panel": "true",
    "enable_autoscroll": "true",
    "enable_verbose_mode": "true",
    "enable_grbl_probe_panel": "false",
    "enable_grbl_surface_panel": "false",
    "probemaxtravel": "40",
    "probefeedrate": "100",
    "probetouchplatethickness": "0.5",
    "surfacewidth": "100",
    "surfacelength": "400",
    "surfacezdepth": "0",
    "surfacebitdiam": "12.7",
    "surfacestepover": "40",
    "surfacefeedrate": "1000",
    "surfacespindle": "10000"
  }]

function getPreferences () {
    return http.get(baseURL)
        .then((response) => {
            if (typeof response == 'string' && response.indexOf("<HTML>") != -1) {
                throw new Error('Not found ' + PREFERENCES_FILE_NAME)
            }
            return response[0]
        })
        .catch((err) => {
            console.log(err)
            return DEAULT_PREFERENCES[0]
        })
}

function updatePreferences (preferences) {
    var blob = new Blob([JSON.stringify([preferences], null, " ")], {
        type: 'application/json'
    });
    var file = new File([blob], PREFERENCES_FILE_NAME);
    var formData = new FormData();
    formData.append('path', '/');
    formData.append('myfile[]', file, PREFERENCES_FILE_NAME);
    return http.post(baseURL, formData)
}

export default {
    getPreferences,
    updatePreferences
}