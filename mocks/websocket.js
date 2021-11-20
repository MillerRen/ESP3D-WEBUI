const constants = require('../mocks/data/spec_constants')
const message = constants.validStrings.status[7]
// const message = constants.validStrings.alarm[0]

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


