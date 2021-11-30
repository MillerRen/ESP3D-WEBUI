const constants = require('../mocks/data/spec_constants')
// const message = constants.validStrings.status[0]
// const message = constants.validStrings.alarm[7]
// const message = constants.validStrings.error[7]
// const message = constants.validStrings.probeResult[0]
// const message = constants.validStrings.setting[0]
// const message = constants.validStrings.buildVersion[0]
// const message = constants.validStrings.helpMessage[0]
// const message = constants.validStrings.probeResult[0]
// const message = constants.validStrings.echo[0]
// const message = constants.validStrings.startupLine[0]
// const message = constants.validStrings.gcodeState[0]
const message = constants.validStrings.gcodeSystem[0]

function str2bf (str) {
    var bf = new ArrayBuffer(str.length)
    var view = new Uint8Array(bf)
    for(let i=0;i<str.length;i++) {
        view[i] = str.charCodeAt(i)
    }
    
    return view.buffer
}

class WebSocketMock {

    constructor (url, protocols) {
        console.log('Mock '+url, protocols)
        setInterval(()=>{
            this.receive({
                data: str2bf(message)
            })
        }, 2000)
    }

    receive (msg) {
        this.onmessage(msg)
    }
}

window.WebSocket = WebSocketMock


