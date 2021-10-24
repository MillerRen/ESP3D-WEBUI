import http from '../../lib/http'

const baseURL = '/updatefw'

function update (files) {
    var formData = new FormData();
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var arg = "/" + file.name + "S";
        //append file size first to check updload is complete
        formData.append(arg, file.size);
        formData.append('myfile[]', file, "/" + file.name);
    }
    return http.post(baseURL, formData)
}

export default {
    update
}