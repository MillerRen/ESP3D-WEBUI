import http from "../lib/http"

var fwData

function sendCommand (cmd) {
  return http.get('/command', {
    cmd
  })
}

function getFWData () {
  if(fwData) {
    return Promise.resolve(fwData)
  }
  return sendCommand('[ESP800]')
    .then(response => {
      fwData = response
      return response
    })
}

export default {
  sendCommand,
  getFWData
}