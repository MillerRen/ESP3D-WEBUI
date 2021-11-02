class WebSocketMock {
    constructor (url, protocols) {
        console.log('Mock '+url, protocols)
    }
}

window.WebSocket = WebSocketMock