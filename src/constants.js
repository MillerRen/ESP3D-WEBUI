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
export const ESP_HOST_NAME = "ESP3D WebUI"

export const TOTAL_WAITING_TIMES = 40

export const FIRMWARE_NAMES = {
    'repetier': 'Repetier',
    'repetier4davinci': 'Repetier for Davinci',
    'smoothieware': 'Smoothieware',
    'grbl-embedded': 'GRBL ESP32',
    'marlin-embedded': 'Marlin ESP32',
    'marlin': 'Marlin',
    'marlinkimbra': 'Marlin Kimbra',
    'grbl': 'Grbl',
    '': 'Unknown'
}