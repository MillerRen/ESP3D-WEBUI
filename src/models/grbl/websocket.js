function parseMessage(e) {
    var msg = "";
    var wsmsg = ""
    var enable_ping = true
    var response = {}
    //bin
    if (e.data instanceof ArrayBuffer) {
        var bytes = new Uint8Array(e.data);
        for (var i = 0; i < bytes.length; i++) {
            msg += String.fromCharCode(bytes[i]);
            if ((bytes[i] == 10) || (bytes[i] == 13)) {
                wsmsg += msg;
                // Monitor_output_Update(wsmsg);
                // process_socket_response(wsmsg);
                if (!((wsmsg.startsWith("ok T:") || wsmsg.startsWith("X:") || wsmsg.startsWith("FR:") || wsmsg.startsWith("echo:E0 Flow")))) console.log(wsmsg);
                // wsmsg = "";
                // msg = "";
            }
        }
        wsmsg += msg;
    } else {
        msg += e.data;
        var tval = msg.split(":");
        if (tval.length >= 2) {
            if (tval[0] == 'CURRENT_ID') {
                response.page_id = tval[1];
                console.log("connection id = " + response.page_id);
            }
            if (enable_ping) {
                if (tval[0] == 'PING') {
                    response.page_id = tval[1];
                    console.log("ping from id = " + response.page_id);
                    // last_ping = Date.now();
                    // if (interval_ping == -1) interval_ping = setInterval(function () {
                    //     check_ping();
                    // }, 10 * 1000);
                }
            }
            if (tval[0] == 'ACTIVE_ID') {
                if (response.page_id != tval[1]) {
                    // Disable_interface();
                }
            }
            if (tval[0] == 'DHT') {
                // Handle_DHT(tval[1]);
            }
            if (tval[0] == 'ERROR') {
                response.esp_error_message = tval[2];
                response.esp_error_code = tval[1];
                console.log("ERROR: " + tval[2] + " code:" + tval[1]);
                // CancelCurrentUpload();
            }
            if (tval[0] == 'MSG') {
                // var error_message = tval[2];
                // var error_code = tval[1];
                console.log("MSG: " + tval[2] + " code:" + tval[1]);
            }
        }

    }
    return wsmsg
}

export default {
    parseMessage
}