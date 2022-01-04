function process_grbl_position(response) {
    var tab1 = response.split("WCO:");
    if (tab1.length > 1) {
        var tab2 = tab1[1].split("|");
        var tab1 = tab2[0].split(">");
        var tab3 = tab1[0].split(",");
        WCOx = parseFloat(tab3[0]);
        if (tab3.length > 1) {
            WCOy = parseFloat(tab3[1]);
        } else {
            WCOy = 0;
        }
        if ((tab3.length > 2) && (grblaxis > 2)) {
            WCOz = parseFloat(tab3[2]);
        } else {
            WCOz = 0;
        }
         if ((tab3.length > 3) && (grblaxis > 3)) {
            WCOa = parseFloat(tab3[3]);
        } else {
            WCOa = 0;
        }
         if ((tab3.length > 4) && (grblaxis > 4)){
            WCOb = parseFloat(tab3[4]);
        } else {
            WCOb = 0;
        }
         if ((tab3.length > 5) && (grblaxis > 5)) {
            WCOc = parseFloat(tab3[5]);
        } else {
            WCOc = 0;
        }
        gotWCO = true;
    }
    tab1 = response.split("WPos:");
    if (tab1.length > 1) {
        var tab2 = tab1[1].split("|");
        var tab3 = tab2[0].split(",");
        document.getElementById('control_x_position').innerHTML = tab3[0];
        if (gotWCO) document.getElementById('control_xm_position').innerHTML = (WCOx + parseFloat(tab3[0])).toFixed(3);
        if (tab3.length > 1) {
            document.getElementById('control_y_position').innerHTML = tab3[1];
            if (gotWCO) document.getElementById('control_ym_position').innerHTML = (WCOy + parseFloat(tab3[1])).toFixed(3);
        }
        if ((tab3.length > 2) && (grblaxis > 2)) {
            document.getElementById('control_z_position').innerHTML = tab3[2];
            if (gotWCO) document.getElementById('control_zm_position').innerHTML = (WCOz + parseFloat(tab3[2])).toFixed(3);
        }
        if ((tab3.length > 3) && (grblaxis > 3)) {
            document.getElementById('control_a_position').innerHTML = tab3[3];
            if (gotWCO) document.getElementById('control_am_position').innerHTML = (WCOa + parseFloat(tab3[3])).toFixed(3);
        }
        if ((tab3.length > 4) && (grblaxis > 4)) {
            document.getElementById('control_b_position').innerHTML = tab3[4];
            if (gotWCO) document.getElementById('control_bm_position').innerHTML = (WCOb + parseFloat(tab3[4])).toFixed(3);
        }
        if ((tab3.length > 5) && (grblaxis > 5)) {
            document.getElementById('control_c_position').innerHTML = tab3[5];
            if (gotWCO) document.getElementById('control_cm_position').innerHTML = (WCOc + parseFloat(tab3[5])).toFixed(3);
        }

    } else {
        tab1 = response.split("MPos:");
        if (tab1.length > 1) {
            var tab2 = tab1[1].split("|");
            var tab3 = tab2[0].split(",");
            document.getElementById('control_xm_position').innerHTML = tab3[0];
            if (gotWCO) document.getElementById('control_x_position').innerHTML = (parseFloat(tab3[0]) - WCOx).toFixed(3);
            if (tab3.length > 1) {
                document.getElementById('control_ym_position').innerHTML = tab3[1];
                if (gotWCO) document.getElementById('control_y_position').innerHTML = (parseFloat(tab3[1]) - WCOy).toFixed(3);
            }
            if ((tab3.length > 2) && (grblaxis > 2)) {
                document.getElementById('control_zm_position').innerHTML = tab3[2];
                if (gotWCO) document.getElementById('control_z_position').innerHTML = (parseFloat(tab3[2]) - WCOz).toFixed(3);
            }
            if ((tab3.length > 3) && (grblaxis > 3)) {
                document.getElementById('control_am_position').innerHTML = tab3[3];
                if (gotWCO) document.getElementById('control_a_position').innerHTML = (parseFloat(tab3[3]) - WCOa).toFixed(3);
            }
            if ((tab3.length > 4) && (grblaxis > 4)) {
                document.getElementById('control_bm_position').innerHTML = tab3[4];
                if (gotWCO) document.getElementById('control_b_position').innerHTML = (parseFloat(tab3[4]) - WCOb).toFixed(3);
            }
            if ((tab3.length > 5) && (grblaxis > 5)) {
                document.getElementById('control_cm_position').innerHTML = tab3[5];
                if (gotWCO) document.getElementById('control_c_position').innerHTML = (parseFloat(tab3[5]) - WCOc).toFixed(3);
            }
        }
    }
}

export default process_grbl_position