const grbl_help = {
    "$0": "Step pulse, microseconds",
    "$1": "Step idle delay, milliseconds",
    "$2": "Step port invert, mask",
    "$3": "Direction port invert, mask",
    "$4": "Step enable invert, boolean",
    "$5": "Limit pins invert, boolean",
    "$6": "Probe pin invert, boolean",
    "$10": "Status report, mask",
    "$11": "Junction deviation, mm",
    "$12": "Arc tolerance, mm",
    "$13": "Report inches, boolean",
    "$20": "Soft limits, boolean",
    "$21": "Hard limits, boolean",
    "$22": "Homing cycle, boolean",
    "$23": "Homing dir invert, mask",
    "$24": "Homing feed, mm/min",
    "$25": "Homing seek, mm/min",
    "$26": "Homing debounce, milliseconds",
    "$27": "Homing pull-off, mm",
    "$30": "Max spindle speed, RPM",
    "$31": "Min spindle speed, RPM",
    "$32": "Laser mode, boolean",
    "$100": "X steps/mm",
    "$101": "Y steps/mm",
    "$102": "Z steps/mm",
    "$103": "A steps/mm",
    "$104": "B steps/mm",
    "$105": "C steps/mm",
    "$110": "X Max rate, mm/min",
    "$111": "Y Max rate, mm/min",
    "$112": "Z Max rate, mm/min",
    "$113": "A Max rate, mm/min",
    "$114": "B Max rate, mm/min",
    "$115": "C Max rate, mm/min",
    "$120": "X Acceleration, mm/sec^2",
    "$121": "Y Acceleration, mm/sec^2",
    "$122": "Z Acceleration, mm/sec^2",
    "$123": "A Acceleration, mm/sec^2",
    "$124": "B Acceleration, mm/sec^2",
    "$125": "C Acceleration, mm/sec^2",
    "$130": "X Max travel, mm",
    "$131": "Y Max travel, mm",
    "$132": "Z Max travel, mm",
    "$133": "A Max travel, mm",
    "$134": "B Max travel, mm",
    "$135": "C Max travel, mm"

};

function create_config_entry(sentry, vindex) {
    var iscomment;
    var ssentry = sentry;
    var config_entry = {}
    if (!is_config_entry(ssentry)) return vindex;
    while (ssentry.indexOf("\t") > -1) {
        ssentry = ssentry.replace("\t", " ");
    }
    while (ssentry.indexOf("  ") > -1) {
        ssentry = ssentry.replace("  ", " ");
    }
    while (ssentry.indexOf("##") > -1) {
        ssentry = ssentry.replace("##", "#");
    }

    iscomment = is_config_commented(ssentry);
    if (iscomment) {
        while (ssentry.indexOf("<") != -1) {
            var m = ssentry.replace("<", "&lt;");
            ssentry = m.replace(">", "&gt;");
        }
        config_entry = {
            comment: ssentry,
            showcomment: true,
            index: vindex,
            label: "",
            help: "",
            defaultvalue: "",
            cmd: ""
        };
    } else {
        var slabel = get_config_label(ssentry);
        var svalue = get_config_value(ssentry);
        var shelp = get_config_help(ssentry);
        var scmd = get_config_command(ssentry)
        config_entry = {
            comment: ssentry,
            showcomment: false,
            index: vindex,
            label: slabel,
            help: shelp,
            defaultvalue: svalue,
            value: svalue,
            cmd: scmd
        }
    }

    return config_entry
}
//check it is valid entry
function is_config_entry(sline) {
    var line = sline.trim();
    if (line.length == 0) return false;
    if ((line.indexOf("$") == 0) && (line.indexOf("=") != -1)) return true;
    else return false

}

function get_config_label(sline) {

    var tline2 = sline.trim().split("=");
    return tline2[0];

}

function get_config_value(sline) {

    var tline2 = sline.trim().split("=");
    if (tline2.length > 1) return tline2[1];
    else return "???";
}

function get_config_help(sline) {

    return inline_help(get_config_label(sline))

}

function inline_help(label) {
    var shelp = "";
    shelp = grbl_help[label];
    if (typeof shelp === 'undefined') shelp = "";
    return shelp;
}


function get_config_command(sline) {

    return get_config_label(sline) + "=";

}

function is_config_commented() {
    return false;
}

function parseConfig(str) {
    var config = []
    var lines = str.split('\n')
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i]
        config.push(create_config_entry(line, i))
    }

    return config
}

export default {
    parseConfig
}