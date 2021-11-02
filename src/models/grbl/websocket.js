function parseBinary (data) {
    var bytes = new Uint8Array(data)
    var msg = ''
    for (let i = 0; i < bytes.length; i++) {
        const b = bytes[i];
        msg += String.fromCharCode(b)
    }
    return {
        type: 'stream',
        msg
    }
}

function parseText (data) {
    var response = {    }
    var arr = data.split(':')
    if(arr.length == 1) {
        response.type = 'msg'
        response.msg = arr[0]
    }
    if (arr.length==2) {
        response.msg = arr[1]
        response.type = arr[0].toLowerCase()
    }
    if(arr.length>2) {
        response.type = 'error'
        response.error_code = arr[1]
        response.msg = arr[2]
    }
    return data
}

function parseMessage(e) {
    return e.data instanceof ArrayBuffer ? parseBinary(e.data) : parseText(e.data)
}

export default {
    parseMessage
}