function parseSettings(settings) {
    var setting_configList = []
    for (var vindex in settings) {
        var sentry = settings[vindex]
        var slabel = sentry.H;
        var svalue = sentry.V;
        var scmd = "[ESP401]P=" + sentry.P + " T=" + sentry.T + " V=";
        var options = [];
        var min;
        var max;
        if (typeof sentry.M !== 'undefined') {
            min = sentry.M;
        } else { //add limit according the type
            if (sentry.T == "B") min = -127
            else if (sentry.T == "S") min = 0
            else if (sentry.T == "A") min = 7
            else if (sentry.T == "I") min = 0
        }
        if (typeof sentry.S !== 'undefined') {
            max = sentry.S;
        } else { //add limit according the type
            if (sentry.T == "B") max = 255;
            else if (sentry.T == "S") max = 255;
            else if (sentry.T == "A") max = 15;
            else if (sentry.T == "I") max = 2147483647;
        }
        //list possible options if defined
        if (typeof sentry.O !== 'undefined') {
            for (var i in sentry.O) {
                var val = sentry.O[i];
                for (var j in val) {
                    var sub_key = j;
                    var sub_val = val[j];
                    sub_val = sub_val.trim();
                    sub_key = sub_key.trim();
                    var option = {
                        id: sub_val,
                        display: sub_key
                    };
                    options.push(option);
                    //console.log("*" + sub_key + "* and *" + sub_val + "*");
                }
            }
        }
        svalue = svalue.trim();
        //create entry in list
        var config_entry = {
            index: vindex,
            F: sentry.F,
            label: slabel,
            defaultvalue: svalue,
            value: svalue,
            cmd: scmd,
            Options: options,
            min_val: min,
            max_val: max,
            type: sentry.T,
            pos: sentry.P,
            success: false
        };
        setting_configList.push(config_entry);
    }

    return setting_configList
}

export default {
    parseSettings
}