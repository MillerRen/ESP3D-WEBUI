class WebSocketMock {
    constructor (url, protocols) {
        console.log('Mock '+url, protocols)
    }

    receive (msg) {
        this.onmessage(msg)
    }
}

window.WebSocket = WebSocketMock