export const PREFERENCES_FILE_NAME = '/preferences.json'
export const MACROS_FILE_NAME = '/macrocfg.json'
export const LOGIN_URL = '/login'
export const COMMAND_URL = '/command'
export const SPIFFS_URL = '/files'
export const UPLOAD_URL = '/upload'
export const PRIMARY_SD_URL = '/ext/'
export const SECONDARY_SD_URL = '/sd/'

export const UI_VERSION = process.env.VUE_APP_UI_VERSION

export const TOTAL_BOOT_STEPS = 4
export const ESP_HOST_NAME = 'ESP3D WebUI'

export const TOTAL_WAITING_TIMES = 40

export const FIRMWARE_NAMES = {
  repetier: 'Repetier',
  repetier4davinci: 'Repetier for Davinci',
  smoothieware: 'Smoothieware',
  'grbl-embedded': 'GRBL ESP32',
  'marlin-embedded': 'Marlin ESP32',
  marlin: 'Marlin',
  marlinkimbra: 'Marlin Kimbra',
  grbl: 'Grbl',
  '': 'Unknown'
}

export const LANGUAGES = [
  ['de', 'Deutsch'],
  ['en', 'English'],
  ['es', 'Espa&ntilde;ol'],
  ['fr', 'Fran&ccedil;ais'],
  ['it', 'Italiano'],
  ['ja', '&#26085;&#26412;&#35486;'],
  ['hu', 'Magyar'],
  ['pl', 'Polski'],
  ['ptbr', 'Português-Br'],
  ['ru', 'Русский'],
  ['tr', 'T&uuml;rk&ccedil;e'],
  ['uk', 'Українська'],
  ['zh_CN', '&#31616;&#20307;&#20013;&#25991;']
]

export const DEFAULT_PREFERENCES = [
  {
    language: 'en',
    enable_lock_UI: 'false',
    enable_ping: 'true',
    enable_DHT: 'false',
    enable_camera: 'false',
    auto_load_camera: 'false',
    camera_address: '',
    number_extruders: '1',
    is_mixed_extruder: 'false',
    enable_bed: 'false',
    enable_fan: 'false',
    enable_control_panel: 'true',
    enable_grbl_panel: 'true',
    interval_positions: '3',
    interval_temperatures: '3',
    interval_status: '3',
    xy_feedrate: '1000',
    z_feedrate: '100',
    a_feedrate: '100',
    b_feedrate: '100',
    c_feedrate: '100',
    e_feedrate: '400',
    e_distance: '5',
    enable_temperatures_panel: 'false',
    enable_extruder_panel: 'false',
    enable_files_panel: 'true',
    f_filters: 'g;G;gco;GCO;gcode;GCODE;nc;NC;ngc;NCG;tap;TAP;txt;TXT',
    enable_commands_panel: 'true',
    enable_autoscroll: 'true',
    enable_verbose_mode: 'true',
    enable_grbl_probe_panel: 'false',
    probemaxtravel: '40',
    probefeedrate: '100',
    probetouchplatethickness: '0.5'
  }
]
