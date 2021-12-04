function parseFiles(response, filters) {
    let files_file_list = [];
    if (!response) {
        response = {}
    }
    if (typeof response.files != 'undefined') {
        for (var i = 0; i < response.files.length; i++) {
            var file = response.files[i]
            var file_entry = {
                name: file.name,
                sdname: file.name,
                size: file.size,
                isdir: file.size == "-1",
                datetime: file.datetime,
                isprintable: files_showprintbutton(file.name, filters||'')
            };
            files_file_list.push(file_entry);
        }
        response.files = files_file_list.sort((a,b)=>b.isdir-a.isdir)
    } else {
        response.files = []
    }
    return response
}

function files_showprintbutton(filename, f_filters) {
    var tfiles_filters = f_filters.split(';')
    if (tfiles_filters.length == 0) {
        return true;
    }
    for (var i = 0; i < tfiles_filters.length; i++) {
        var v = "." + tfiles_filters[i].trim();
        if (filename.endsWith(v)) return true;
    }
    return false;
}

export default {
    parseFiles
}