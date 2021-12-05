import http from '../lib/http'
import DEFAULT_PREFERENCES from '../assets/preferences.json'

const PREFERENCES_FILE_NAME = '/preferences.json'

var preferences

function getPreferences () {
  if(preferences) {
    return Promise.resolve(preferences)
  }
  return http.get(PREFERENCES_FILE_NAME)
    .then((response) => {
      if(response.indexOf('<')==0) {
        return DEFAULT_PREFERENCES
      }
      return response
    })
    .catch(() => {
      return DEFAULT_PREFERENCES
    })
    .finally(response => {
      preferences = response
    })
}

function updatePreferences (data) {
  return http.upload(data)
}

export default {
  getPreferences,
  updatePreferences
}