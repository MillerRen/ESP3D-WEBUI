import http from "../lib/http"

function sendCommand (cmd) {
  return http.get('/command', {
    cmd
  })
}



export default {
  sendCommand
}