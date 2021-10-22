<template>
  <div class="modal-body panel-scroll">
    <center>
      <div id="langage_list"></div>
    </center>
    <br />
    <div class="panel panel-default">
      <div class="panel-heading">
        <div class="checkbox">
          <label>
            <input type="checkbox" v-model="preferences.enable_lock_UI" />
            <span translate>Enable lock interface</span>
          </label>
        </div>
      </div>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading">
        <div class="checkbox">
          <label>
            <input type="checkbox" v-model="preferences.enable_ping" />
            <span translate>Connection monitoring</span>
          </label>
        </div>
      </div>
    </div>
    <div id="DHT_pref_panel" class="panel panel-default">
      <div class="panel-heading">
        <div class="checkbox">
          <label>
            <input type="checkbox" v-model="preferences.enable_DHT" />
            <span translate>Show DHT output</span>
          </label>
        </div>
      </div>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading">
        <div class="checkbox">
          <label>
            <input type="checkbox" v-model="preferences.enable_camera_panel" />
            <span translate>Show camera panel</span>
          </label>
        </div>
      </div>
      <div v-if="preferences.enable_camera_panel" class="panel-body">
        <div class="checkbox">
          <label>
            <input
              type="checkbox"
              v-model="preferences.autoload_camera_panel"
            />
            <span translate>Auto load camera</span>
          </label>
        </div>
        <div class="form-inline">
          <div class="form-group">
            <span><span translate>Camera address</span>:</span>
            <input
              type="text"
              class="form-control w14"
              v-model="preferences.enable_camera_webaddress"
              translateph
              placeholder="Camera address"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading">
        <div class="checkbox">
          <label>
            <input type="checkbox" v-model="preferences.enable_control_panel" />
            <span translate>Show control panel</span>
          </label>
        </div>
      </div>
      <div v-if="preferences.enable_control_panel" class="panel-body">
        <div id="pos_Interval_check_group">
          <table>
            <tr>
              <td>
                <span><span translate>Position Refresh Time</span>:&nbsp;</span>
              </td>
              <td>
                <div class="input-group has-control">
                  <input
                    class="form-control w4"
                    type="number"
                    min="1"
                    max="99"
                    v-model="preferences.pos_Interval_check"
                    onchange="Checkvalues('pos_Interval_check')"
                  />
                  <span
                    id="pos_Interval_check_icon"
                    class="form-control-feedback ico_feedback"
                  ></span>
                </div>
              </td>
              <td>
                <div class="input-group">
                  <input />
                  <span class="input-group-addon form_control" translate
                    >sec</span
                  >
                </div>
              </td>
            </tr>
          </table>
        </div>
        <br />
        <div id="control_xy_velocity_group">
          <table>
            <tr>
              <td>
                <span><span translate>XY feedrate</span>:&nbsp;</span>
              </td>
              <td>
                <div class="input-group has-control">
                  <input
                    class="form-control w8"
                    type="number"
                    min="1"
                    v-model="preferences.control_xy_velocity"
                    onchange="Checkvalues('control_xy_velocity')"
                  />
                  <span
                    id="control_xy_velocity_icon"
                    class="form-control-feedback ico_feedback"
                  ></span>
                </div>
              </td>
              <td>
                <div class="input-group">
                  <input />
                  <span class="input-group-addon form_control" translate
                    >mm/min</span
                  >
                </div>
              </td>
            </tr>
          </table>
        </div>

        <br />

        <div id="control_z_velocity_group">
          <table>
            <tr>
              <td>
                <span><span translate>Z feedrate</span>:&nbsp;</span>
              </td>
              <td>
                <div class="input-group has-control">
                  <input
                    class="form-control w6"
                    type="number"
                    min="1"
                    v-model="preferences.control_z_velocity"
                    onchange="Checkvalues('control_z_velocity')"
                  />
                  <span
                    id="control_z_velocity_icon"
                    class="form-control-feedback ico_feedback"
                  ></span>
                </div>
              </td>
              <td>
                <div class="input-group">
                  <input />
                  <span class="input-group-addon form_control" translate
                    >mm/min</span
                  >
                </div>
              </td>
            </tr>
          </table>
        </div>
        <div id="control_a_velocity_group" class="hide_it topmarginspace">
          <table>
            <tr>
              <td>
                <span><span translate>A feedrate</span>:&nbsp;</span>
              </td>
              <td>
                <div class="input-group has-control">
                  <input
                    class="form-control w6"
                    type="number"
                    min="1"
                    v-model="preferences.control_a_velocity"
                    onchange="Checkvalues('control_a_velocity')"
                  />
                  <span
                    id="control_a_velocity_icon"
                    class="form-control-feedback ico_feedback"
                  ></span>
                </div>
              </td>
              <td>
                <div class="input-group">
                  <input />
                  <span class="input-group-addon form_control" translate
                    >mm/min</span
                  >
                </div>
              </td>
            </tr>
          </table>
        </div>
        <div id="control_b_velocity_group" class="hide_it topmarginspace">
          <table>
            <tr>
              <td>
                <span><span translate>B feedrate</span>:&nbsp;</span>
              </td>
              <td>
                <div class="input-group has-control">
                  <input
                    class="form-control w6"
                    type="number"
                    min="1"
                    v-model="preferences.control_b_velocity"
                    onchange="Checkvalues('control_b_velocity')"
                  />
                  <span
                    id="control_b_velocity_icon"
                    class="form-control-feedback ico_feedback"
                  ></span>
                </div>
              </td>
              <td>
                <div class="input-group">
                  <input />
                  <span class="input-group-addon form_control" translate
                    >mm/min</span
                  >
                </div>
              </td>
            </tr>
          </table>
        </div>
        <div id="control_c_velocity_group" class="hide_it topmarginspace">
          <table>
            <tr>
              <td>
                <span><span translate>C feedrate</span>:&nbsp;</span>
              </td>
              <td>
                <div class="input-group has-control">
                  <input
                    class="form-control w6"
                    type="number"
                    min="1"
                    v-model="preferences.control_c_velocity"
                    onchange="Checkvalues('control_c_velocity')"
                  />
                  <span
                    id="control_c_velocity_icon"
                    class="form-control-feedback ico_feedback"
                  ></span>
                </div>
              </td>
              <td>
                <div class="input-group">
                  <input />
                  <span class="input-group-addon form_control" translate
                    >mm/min</span
                  >
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div id="temp_pref_panel" class="panel panel-default">
      <div class="panel-heading">
        <div class="checkbox">
          <label>
            <input
              type="checkbox"
              v-model="preferences.enable_temperatures_panel"
            />
            <span translate>Show temperatures panel</span>
          </label>
        </div>
      </div>
      <div v-if="preferences.enable_temperatures_panel" class="panel-body">
        <div id="tempInterval_check_group">
          <table>
            <tr>
              <td>
                <span
                  ><span translate>Temperature Refresh Time</span>:&nbsp;</span
                >
              </td>
              <td>
                <div class="input-group has-control">
                  <input
                    class="form-control w4"
                    type="number"
                    min="1"
                    max="99"
                    v-model="preferences.tempInterval_check"
                    onchange="Checkvalues('tempInterval_check')"
                  />
                  <span
                    id="tempInterval_check_icon"
                    class="form-control-feedback ico_feedback"
                  ></span>
                </div>
              </td>
              <td>
                <div class="input-group">
                  <input />
                  <span class="input-group-addon form_control" translate
                    >sec</span
                  >
                </div>
              </td>
            </tr>
          </table>
        </div>
        <div class="checkbox" id="redundant_controls_option">
          <label>
            <input
              type="checkbox"
              v-model="preferences.enable_redundant_controls"
            />
            <span translate>Enable heater T0 redundant temperatures</span>
          </label>
        </div>
        <div class="checkbox" id="probe_controls_option">
          <label>
            <input
              type="checkbox"
              v-model="preferences.enable_probe_controls"
            />
            <span translate>Enable probe temperatures</span>
          </label>
        </div>
        <div class="checkbox" id="bed_controls_option">
          <label>
            <input type="checkbox" v-model="preferences.enable_bed_controls" />
            <span translate>Enable bed controls</span>
          </label>
        </div>
        <div class="checkbox" id="chamber_controls_option">
          <label>
            <input
              type="checkbox"
              v-model="preferences.enable_chamber_controls"
            />
            <span translate>Enable chamber controls</span>
          </label>
        </div>
      </div>
    </div>
    <div id="ext_pref_panel" class="panel panel-default">
      <div class="panel-heading">
        <div class="checkbox">
          <label>
            <input
              type="checkbox"
              v-model="preferences.enable_extruder_panel"
            />
            <span translate>Show extruder panel</span>
          </label>
        </div>
      </div>
      <div v-if="preferences.enable_extruder_panel" class="panel-body">
        <div id="filament_length_group">
          <table>
            <tr>
              <td>
                <span><span translate>Length</span>:&nbsp;</span>
              </td>
              <td>
                <div class="input-group has-control">
                  <input
                    class="form-control w6"
                    type="number"
                    min="1"
                    max="9999"
                    v-model="preferences.filament_length"
                    onchange="Checkvalues('filament_length')"
                  />
                  <span
                    id="filament_length_icon"
                    class="form-control-feedback ico_feedback"
                  ></span>
                </div>
              </td>
              <td>
                <div class="input-group">
                  <input />
                  <span class="input-group-addon form_control" translate
                    >mm</span
                  >
                </div>
              </td>
            </tr>
          </table>
        </div>
        <br />
        <div id="e_velocity_group">
          <table>
            <tr>
              <td>
                <span><span translate>E feedrate</span>:&nbsp;</span>
              </td>
              <td>
                <div class="input-group has-control">
                  <input
                    class="form-control w6"
                    type="number"
                    min="1"
                    max="9999"
                    v-model="preferences.e_velocity"
                    onchange="Checkvalues('e_velocity')"
                  />
                  <span
                    id="e_velocity_icon"
                    class="form-control-feedback ico_feedback"
                  ></span>
                </div>
              </td>
              <td>
                <div class="input-group">
                  <input />
                  <span class="input-group-addon form_control" translate
                    >mm/min</span
                  >
                </div>
              </td>
            </tr>
          </table>
        </div>

        <br />

        <div id="control_nb_extruders_group">
          <table>
            <tr>
              <td>
                <span><span translate>Number of extruders</span>:&nbsp;</span>
              </td>
              <td>
                <select
                  class="form-control"
                  v-model="preferences.control_nb_extruders"
                >
                  <option value="1">1</option>
                </select>
              </td>
            </tr>
          </table>
        </div>
        <div class="checkbox">
          <label>
            <input
              type="checkbox"
              v-model="preferences.enable_mixed_E_controls"
            />
            <span translate>Mixed extruders</span>
          </label>
        </div>
        <div class="checkbox">
          <label>
            <input type="checkbox" v-model="preferences.enable_fan_controls" />
            <span translate>Enable fan controls</span>
          </label>
        </div>
      </div>
    </div>
    <div class="panel panel-default" id="grbl_pref_panel">
      <div class="panel-heading">
        <div class="checkbox">
          <label>
            <input type="checkbox" v-model="preferences.enable_grbl_panel" />
            <span translate>Show GRBL panel</span>
          </label>
        </div>
      </div>
      <div v-if="preferences.enable_grbl_panel" class="panel-body">
        <div id="status_Interval_check_group">
          <table>
            <tr>
              <td>
                <span><span translate>Status Refresh Time</span>:&nbsp;</span>
              </td>
              <td>
                <div class="input-group has-control">
                  <input
                    class="form-control w4"
                    type="number"
                    min="1"
                    max="99"
                    v-model="preferences.status_Interval_check"
                    onchange="Checkvalues('status_Interval_check')"
                  />
                  <span
                    id="status_Interval_check_icon"
                    class="form-control-feedback ico_feedback"
                  ></span>
                </div>
              </td>
              <td>
                <div class="input-group">
                  <input />
                  <span class="input-group-addon form_control" translate
                    >sec</span
                  >
                </div>
              </td>
            </tr>
          </table>
        </div>
        <br />
        <div class="panel panel-default" id="grbl_pref_probe_tab">
          <div class="panel-heading">
            <div class="checkbox">
              <label>
                <input
                  type="checkbox"
                  v-model="preferences.enable_grbl_probe_tab"
                />
                <span translate>Show probe panel</span>
              </label>
            </div>
          </div>
          <div v-if="preferences.enable_grbl_probe_tab" class="panel-body">
            <div id="probemaxtravel_group">
              <table>
                <tr>
                  <td>
                    <span><span translate>Max travel</span>:&nbsp;</span>
                  </td>
                  <td>
                    <div class="input-group has-control">
                      <input
                        class="form-control w8"
                        type="number"
                        min="1"
                        max="99999"
                        v-model="preferences.probemaxtravel"
                        onchange="Checkvalues('probemaxtravel')"
                      />
                      <span
                        id="probemaxtravel_icon"
                        class="form-control-feedback ico_feedback"
                      ></span>
                    </div>
                  </td>
                  <td>
                    <div class="input-group">
                      <input />
                      <span class="input-group-addon form_control" translate
                        >mm</span
                      >
                    </div>
                  </td>
                </tr>
              </table>
            </div>
            <br />
            <div id="probefeedrate_group">
              <table>
                <tr>
                  <td>
                    <span><span translate>Feed rate</span>:&nbsp;</span>
                  </td>
                  <td>
                    <div class="input-group has-control">
                      <input
                        class="form-control w8"
                        type="number"
                        min="1"
                        max="99999"
                        v-model="preferences.probefeedrate"
                        onchange="Checkvalues('probefeedrate')"
                      />
                      <span
                        id="probefeedrate_icon"
                        class="form-control-feedback ico_feedback"
                      ></span>
                    </div>
                  </td>
                  <td>
                    <div class="input-group">
                      <input />
                      <span class="input-group-addon form_control" translate
                        >mm/min</span
                      >
                    </div>
                  </td>
                </tr>
              </table>
            </div>
            <br />
            <div id="probetouchplatethickness_group">
              <table>
                <tr>
                  <td>
                    <span
                      ><span translate>Touch plate thickness</span>:&nbsp;</span
                    >
                  </td>
                  <td>
                    <div class="input-group has-control">
                      <input
                        class="form-control w8"
                        type="number"
                        min="0"
                        max="99999"
                        v-model="preferences.probetouchplatethickness"
                        onchange="Checkvalues('probetouchplatethickness')"
                      />
                      <span
                        id="probetouchplatethickness_icon"
                        class="form-control-feedback ico_feedback"
                      ></span>
                    </div>
                  </td>
                  <td>
                    <div class="input-group">
                      <input />
                      <span class="input-group-addon form_control" translate
                        >mm</span
                      >
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <br />
        <div class="panel panel-default" id="grbl_pref_surface_tab">
          <div class="panel-heading">
            <div class="checkbox">
              <label>
                <input
                  type="checkbox"
                  v-model="preferences.enable_grbl_surface_tab"
                />
                <span translate>Show surface panel</span>
              </label>
            </div>
          </div>
          <div v-if="preferences.enable_grbl_surface_tab" class="panel-body">
            <div id="surfacewidth_group">
              <table>
                <tr>
                  <td>
                    <span><span translate>Surface Width (X)</span>:&nbsp;</span>
                  </td>
                  <td>
                    <div class="input-group has-control">
                      <input
                        class="form-control w6"
                        type="number"
                        min="1"
                        max="99999"
                        v-model="preferences.surfacewidth"
                        onchange="Checkvalues('surfacewidth')"
                      />
                      <span
                        id="surfacewidth_icon"
                        class="form-control-feedback ico_feedback"
                      ></span>
                    </div>
                  </td>
                  <td>
                    <div class="input-group">
                      <input />
                      <span class="input-group-addon form_control" translate
                        >mm</span
                      >
                    </div>
                  </td>
                </tr>
              </table>
            </div>
            <br />
            <div id="surfacelength_group">
              <table>
                <tr>
                  <td>
                    <span
                      ><span translate>Surface Length (Y)</span>:&nbsp;</span
                    >
                  </td>
                  <td>
                    <div class="input-group has-control">
                      <input
                        class="form-control w6"
                        type="number"
                        min="1"
                        max="99999"
                        v-model="preferences.surfacelength"
                        onchange="Checkvalues('surfacelength')"
                      />
                      <span
                        id="surfacelength_icon"
                        class="form-control-feedback ico_feedback"
                      ></span>
                    </div>
                  </td>
                  <td>
                    <div class="input-group">
                      <input />
                      <span class="input-group-addon form_control" translate
                        >mm</span
                      >
                    </div>
                  </td>
                </tr>
              </table>
            </div>
            <br />
            <div id="surfacezdepth_group">
              <table>
                <tr>
                  <td>
                    <span><span translate>Skim Depth (-Z)</span>:&nbsp;</span>
                  </td>
                  <td>
                    <div class="input-group has-control">
                      <input
                        class="form-control w5"
                        type="number"
                        min="0.1"
                        max="9999"
                        v-model="preferences.surfacezdepth"
                        onchange="Checkvalues('surfacezdepth')"
                      />
                      <span
                        id="surfacezdepth_icon"
                        class="form-control-feedback ico_feedback"
                      ></span>
                    </div>
                  </td>
                  <td>
                    <div class="input-group">
                      <input />
                      <span class="input-group-addon form_control" translate
                        >mm</span
                      >
                    </div>
                  </td>
                </tr>
              </table>
            </div>
            <br />
            <div id="surfacebitdiam_group">
              <table>
                <tr>
                  <td>
                    <span><span translate>Bit Diameter</span>:&nbsp;</span>
                  </td>
                  <td>
                    <div class="input-group has-control">
                      <input
                        class="form-control w6"
                        type="number"
                        min="0.1"
                        max="999"
                        v-model="preferences.surfacebitdiam"
                        onchange="Checkvalues('surfacebitdiam')"
                      />
                      <span
                        id="surfacebitdiam_icon"
                        class="form-control-feedback ico_feedback"
                      ></span>
                    </div>
                  </td>
                  <td>
                    <div class="input-group">
                      <input />
                      <span class="input-group-addon form_control" translate
                        >mm</span
                      >
                    </div>
                  </td>
                </tr>
              </table>
            </div>
            <br />
            <div id="surfacestepover_group">
              <table>
                <tr>
                  <td>
                    <span
                      ><span translate>Surfacing Stepover</span>:&nbsp;</span
                    >
                  </td>
                  <td>
                    <div class="input-group has-control">
                      <input
                        class="form-control w5"
                        type="number"
                        min="1"
                        max="100"
                        v-model="preferences.surfacestepover"
                        onchange="Checkvalues('surfacestepover')"
                      />
                      <span
                        id="surfacestepover_icon"
                        class="form-control-feedback ico_feedback"
                      ></span>
                    </div>
                  </td>
                  <td>
                    <div class="input-group">
                      <input />
                      <span class="input-group-addon form_control" translate
                        >mm</span
                      >
                    </div>
                  </td>
                </tr>
              </table>
            </div>
            <br />
            <div id="surfacefeedrate_group">
              <table>
                <tr>
                  <td>
                    <span
                      ><span translate>Surfacing Feedrate</span>:&nbsp;</span
                    >
                  </td>
                  <td>
                    <div class="input-group has-control">
                      <input
                        class="form-control w6"
                        type="number"
                        min="1"
                        max="99999"
                        v-model="preferences.surfacefeedrate"
                        onchange="Checkvalues('surfacefeedrate')"
                      />
                      <span
                        id="surfacefeedrate_icon"
                        class="form-control-feedback ico_feedback"
                      ></span>
                    </div>
                  </td>
                  <td>
                    <div class="input-group">
                      <input />
                      <span class="input-group-addon form_control" translate
                        >mm</span
                      >
                    </div>
                  </td>
                </tr>
              </table>
            </div>
            <br />
            <div id="surfacespindle_group">
              <table>
                <tr>
                  <td>
                    <span
                      ><span translate>Surfacing Spindle RPM</span>:&nbsp;</span
                    >
                  </td>
                  <td>
                    <div class="input-group has-control">
                      <input
                        class="form-control w6"
                        type="number"
                        min="0"
                        max="99999"
                        v-model="preferences.surfacespindle"
                        onchange="Checkvalues('surfacespindle')"
                      />
                      <span
                        id="surfacespindle_icon"
                        class="form-control-feedback ico_feedback"
                      ></span>
                    </div>
                  </td>
                  <td>
                    <div class="input-group">
                      <input />
                      <span class="input-group-addon form_control" translate
                        >mm</span
                      >
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading">
        <div class="checkbox">
          <label>
            <input type="checkbox" v-model="preferences.enable_files_panel" />
            <span translate>Show files panel</span>
          </label>
        </div>
      </div>
      <div v-if="preferences.enable_files_panel" class="panel-body">
        <div id="filters_group">
          <table>
            <tr>
              <td colspan="2">
                <div class="checkbox">
                  <label>
                    <input type="checkbox" v-model="preferences.has_TFT_SD" />
                    <span translate>TFT SD card</span>
                  </label>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <div class="checkbox">
                  <label>
                    <input type="checkbox" v-model="preferences.has_TFT_USB" />
                    <span translate>TFT USB disk</span>
                  </label>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <span
                  ><span translate>File extensions (use ; to separate)</span
                  >:&nbsp;</span
                >
              </td>
              <td>
                <div class="input-group has-control">
                  <input
                    class="form-control w25"
                    type="text"
                    v-model="preferences.f_filters"
                  />
                  <span
                    id="filters_icon"
                    class="form-control-feedback ico_feedback"
                  ></span>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading">
        <div class="checkbox">
          <label>
            <input
              type="checkbox"
              v-model="preferences.enable_commands_panel"
            />
            <span translate>Show commands panel</span>
          </label>
        </div>
      </div>
      <div v-if="preferences.enable_commands_panel" class="panel-body">
        <div class="checkbox">
          <label>
            <input type="checkbox" v-model="preferences.enable_autoscroll" />
            <span translate>Autoscroll</span>
          </label>
        </div>
        <div id="verbose_mode_prefs_check" class="checkbox">
          <label>
            <input type="checkbox" v-model="preferences.enable_verbose_mode" />
            <span translate>Verbose mode</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    preferences: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>