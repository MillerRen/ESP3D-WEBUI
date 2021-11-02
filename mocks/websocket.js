class WebSocketMock {
    constructor (url, protocols) {
        console.log('Mock '+url, +protocols.join(','))
    }
}

window.WebSocket = WebSocketMock