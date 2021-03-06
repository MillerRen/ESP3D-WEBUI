
const response = [
  {
      "language": "en",
      "enable_lock_UI": "false",
      "enable_ping": "true",
      "enable_DHT": "false",
      "enable_camera": "true",
      "auto_load_camera": "false",
      "camera_address": "",
      "number_extruders": "1",
      "is_mixed_extruder": "false",
      "enable_redundant": "false",
      "enable_probe": "true",
      "enable_bed": "false",
      "enable_chamber": "false",
      "enable_fan": "false",
      "enable_control_panel": "true",
      "enable_grbl_panel": "true",
      "interval_positions": "3",
      "interval_temperatures": "3",
      "interval_status": "3",
      "xy_feedrate": "1000",
      "z_feedrate": "100",
      "a_feedrate": "100",
      "b_feedrate": "100",
      "c_feedrate": "100",
      "e_feedrate": "400",
      "e_distance": "5",
      "enable_temperatures_panel": "false",
      "enable_extruder_panel": "false",
      "enable_files_panel": "true",
      "has_TFT_SD": "false",
      "has_TFT_USB": "false",
      "f_filters": "g;G;gco;GCO;gcode;GCODE;nc;NC;ngc;NCG;tap;TAP;txt;TXT",
      "enable_commands_panel": "true",
      "enable_autoscroll": "true",
      "enable_verbose_mode": "true",
      "enable_grbl_probe_panel": "true",
      "enable_grbl_surface_panel": "true",
      "probemaxtravel": "40",
      "probefeedrate": "100",
      "probetouchplatethickness": "0.5",
      "surfacewidth": "100",
      "surfacelength": "400",
      "surfacezdepth": "0",
      "surfacebitdiam": "12.7",
      "surfacestepover": "40",
      "surfacefeedrate": "1000",
      "surfacespindle": "10000"
  }
]


module.exports = function (app) {
  app.get('/preferences.json', function (req, res, next) {
    res.json(response)
  })
}