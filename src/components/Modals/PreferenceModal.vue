<template>
  <div class="modal-body panel-scroll">
    <center>
      <div></div>
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
    <div class="panel panel-default">
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
            <input type="checkbox" v-model="preferences.autoload_camera_panel" />
            <span translate>Auto load camera</span>
          </label>
        </div>
        <div class="form-inline">
          <div class="form-group">
            <span>
              <span translate>Camera address</span>:
            </span>
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
        <div>
          <table>
            <tr>
              <td>
                <span>
                  <span translate>Position Refresh Time</span>:&nbsp;
                </span>
              </td>
              <td>
                <div class="input-group has-control">
                  <input
                    class="form-control w4"
                    type="number"
                    min="1"
                    max="99"
                    v-model="preferences.interval_positions"
                  />
                  <span class="form-control-feedback ico_feedback"></span>
                </div>
              </td>
              <td>
                <div class="input-group">
                  <input class="hide_it" />
                  <span class="input-group-addon form_control" translate>sec</span>
                </div>
              </td>
            </tr>
          </table>
        </div>
        <br />
        <div>
          <table>
            <tr>
              <td>
                <span>
                  <span translate>XY feedrate</span>:&nbsp;
                </span>
              </td>
              <td>
                <div class="input-group has-control">
                  <input
                    class="form-control w8"
                    type="number"
                    min="1"
                    v-model="preferences.xy_feedrate"
                  />
                  <span class="form-control-feedback ico_feedback"></span>
                </div>
              </td>
              <td>
                <div class="input-group">
                  <input class="hide_it" />
                  <span class="input-group-addon form_control" translate>mm/min</span>
                </div>
              </td>
            </tr>
          </table>
        </div>

        <br />

        <div>
          <table>
            <tr>
              <td>
                <span>
                  <span translate>Z feedrate</span>:&nbsp;
                </span>
              </td>
              <td>
                <div class="input-group has-control">
                  <input
                    class="form-control w6"
                    type="number"
                    min="1"
                    v-model="preferences.z_feedrate"
                  />
                  <span class="form-control-feedback ico_feedback"></span>
                </div>
              </td>
              <td>
                <div class="input-group">
                  <input class="hide_it" />
                  <span class="input-group-addon form_control" translate>mm/min</span>
                </div>
              </td>
            </tr>
          </table>
        </div>
        <div class="hide_it topmarginspace">
          <table>
            <tr>
              <td>
                <span>
                  <span translate>A feedrate</span>:&nbsp;
                </span>
              </td>
              <td>
                <div class="input-group has-control">
                  <input
                    class="form-control w6"
                    type="number"
                    min="1"
                    v-model="preferences.a_feedrate"
                  />
                  <span class="form-control-feedback ico_feedback"></span>
                </div>
              </td>
              <td>
                <div class="input-group">
                  <input class="hide_it" />
                  <span class="input-group-addon form_control" translate>mm/min</span>
                </div>
              </td>
            </tr>
          </table>
        </div>
        <div class="hide_it topmarginspace">
          <table>
            <tr>
              <td>
                <span>
                  <span translate>B feedrate</span>:&nbsp;
                </span>
              </td>
              <td>
                <div class="input-group has-control">
                  <input
                    class="form-control w6"
                    type="number"
                    min="1"
                    v-model="preferences.b_feedrate"
                  />
                  <span class="form-control-feedback ico_feedback"></span>
                </div>
              </td>
              <td>
                <div class="input-group">
                  <input class="hide_it" />
                  <span class="input-group-addon form_control" translate>mm/min</span>
                </div>
              </td>
            </tr>
          </table>
        </div>
        <div class="hide_it topmarginspace">
          <table>
            <tr>
              <td>
                <span>
                  <span translate>C feedrate</span>:&nbsp;
                </span>
              </td>
              <td>
                <div class="input-group has-control">
                  <input
                    class="form-control w6"
                    type="number"
                    min="1"
                    v-model="preferences.c_feedrate"
                  />
                  <span class="form-control-feedback ico_feedback"></span>
                </div>
              </td>
              <td>
                <div class="input-group">
                  <input class="hide_it" />
                  <span class="input-group-addon form_control" translate>mm/min</span>
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
            <input type="checkbox" v-model="preferences.enable_temperatures_panel" />
            <span translate>Show temperatures panel</span>
          </label>
        </div>
      </div>
      <div v-if="preferences.enable_temperatures_panel" class="panel-body">
        <div>
          <table>
            <tr>
              <td>
                <span>
                  <span translate>Temperature Refresh Time</span>:&nbsp;
                </span>
              </td>
              <td>
                <div class="input-group has-control">
                  <input
                    class="form-control w4"
                    type="number"
                    min="1"
                    max="99"
                    v-model="preferences.interval_temperatures"
                  />
                  <span class="form-control-feedback ico_feedback"></span>
                </div>
              </td>
              <td>
                <div class="input-group">
                  <input class="hide_it" />
                  <span class="input-group-addon form_control" translate>sec</span>
                </div>
              </td>
            </tr>
          </table>
        </div>
        <div class="checkbox">
          <label>
            <input type="checkbox" v-model="preferences.enable_redundant" />
            <span translate>Enable heater T0 redundant temperatures</span>
          </label>
        </div>
        <div class="checkbox">
          <label>
            <input type="checkbox" v-model="preferences.enable_probe_controls" />
            <span translate>Enable probe temperatures</span>
          </label>
        </div>
        <div class="checkbox">
          <label>
            <input type="checkbox" v-model="preferences.enable_bed" />
            <span translate>Enable bed controls</span>
          </label>
        </div>
        <div class="checkbox">
          <label>
            <input type="checkbox" v-model="preferences.enable_chamber" />
            <span translate>Enable chamber controls</span>
          </label>
        </div>
      </div>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading">
        <div class="checkbox">
          <label>
            <input type="checkbox" v-model="preferences.enable_extruder_panel" />
            <span translate>Show extruder panel</span>
          </label>
        </div>
      </div>
      <div v-if="preferences.enable_extruder_panel" class="panel-body">
        <div>
          <table>
            <tr>
              <td>
                <span>
                  <span translate>Length</span>:&nbsp;
                </span>
              </td>
              <td>
                <div class="input-group has-control">
                  <input
                    class="form-control w6"
                    type="number"
                    min="1"
                    max="9999"
                    v-model="preferences.e_distance"
                  />
                  <span class="form-control-feedback ico_feedback"></span>
                </div>
              </td>
              <td>
                <div class="input-group">
                  <input class="hide_it" />
                  <span class="input-group-addon form_control" translate>mm</span>
                </div>
              </td>
            </tr>
          </table>
        </div>
        <br />
        <div>
          <table>
            <tr>
              <td>
                <span>
                  <span translate>E feedrate</span>:&nbsp;
                </span>
              </td>
              <td>
                <div class="input-group has-control">
                  <input
                    class="form-control w6"
                    type="number"
                    min="1"
                    max="9999"
                    v-model="preferences.e_feedrate"
                  />
                  <span class="form-control-feedback ico_feedback"></span>
                </div>
              </td>
              <td>
                <div class="input-group">
                  <input class="hide_it" />
                  <span class="input-group-addon form_control" translate>mm/min</span>
                </div>
              </td>
            </tr>
          </table>
        </div>

        <br />

        <div>
          <table>
            <tr>
              <td>
                <span>
                  <span translate>Number of extruders</span>:&nbsp;
                </span>
              </td>
              <td>
                <select class="form-control" v-model="preferences.number_extruders">
                  <option :value="v" v-for="v in number_extruders" :key="v">{{v}}</option>
                </select>
              </td>
            </tr>
          </table>
        </div>
        <div class="checkbox">
          <label>
            <input type="checkbox" v-model="preferences.is_mixed_extruder" />
            <span translate>Mixed extruders</span>
          </label>
        </div>
        <div class="checkbox">
          <label>
            <input type="checkbox" v-model="preferences.enable_fan" />
            <span translate>Enable fan controls</span>
          </label>
        </div>
      </div>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading">
        <div class="checkbox">
          <label>
            <input type="checkbox" v-model="preferences.enable_grbl_panel" />
            <span translate>Show GRBL panel</span>
          </label>
        </div>
      </div>
      <div v-if="preferences.enable_grbl_panel" class="panel-body">
        <div>
          <table>
            <tr>
              <td>
                <span>
                  <span translate>Status Refresh Time</span>:&nbsp;
                </span>
              </td>
              <td>
                <div class="input-group has-control">
                  <input
                    class="form-control w4"
                    type="number"
                    min="1"
                    max="99"
                    v-model="preferences.interval_status"
                  />
                  <span class="form-control-feedback ico_feedback"></span>
                </div>
              </td>
              <td>
                <div class="input-group">
                  <input class="hide_it" />
                  <span class="input-group-addon form_control" translate>sec</span>
                </div>
              </td>
            </tr>
          </table>
        </div>
        <br />
        <div class="panel panel-default">
          <div class="panel-heading">
            <div class="checkbox">
              <label>
                <input type="checkbox" v-model="preferences.enable_grbl_probe_panel" />
                <span translate>Show probe panel</span>
              </label>
            </div>
          </div>
          <div v-if="preferences.enable_grbl_probe_panel" class="panel-body">
            <div>
              <table>
                <tr>
                  <td>
                    <span>
                      <span translate>Max travel</span>:&nbsp;
                    </span>
                  </td>
                  <td>
                    <div class="input-group has-control">
                      <input
                        class="form-control w8"
                        type="number"
                        min="1"
                        max="99999"
                        v-model="preferences.probemaxtravel"
                      />
                      <span class="form-control-feedback ico_feedback"></span>
                    </div>
                  </td>
                  <td>
                    <div class="input-group">
                      <input class="hide_it" />
                      <span class="input-group-addon form_control" translate>mm</span>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
            <br />
            <div>
              <table>
                <tr>
                  <td>
                    <span>
                      <span translate>Feed rate</span>:&nbsp;
                    </span>
                  </td>
                  <td>
                    <div class="input-group has-control">
                      <input
                        class="form-control w8"
                        type="number"
                        min="1"
                        max="99999"
                        v-model="preferences.probefeedrate"
                      />
                      <span class="form-control-feedback ico_feedback"></span>
                    </div>
                  </td>
                  <td>
                    <div class="input-group">
                      <input class="hide_it" />
                      <span class="input-group-addon form_control" translate>mm/min</span>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
            <br />
            <div>
              <table>
                <tr>
                  <td>
                    <span>
                      <span translate>Touch plate thickness</span>:&nbsp;
                    </span>
                  </td>
                  <td>
                    <div class="input-group has-control">
                      <input
                        class="form-control w8"
                        type="number"
                        min="0"
                        max="99999"
                        v-model="preferences.probetouchplatethickness"
                      />
                      <span class="form-control-feedback ico_feedback"></span>
                    </div>
                  </td>
                  <td>
                    <div class="input-group">
                      <input class="hide_it" />
                      <span class="input-group-addon form_control" translate>mm</span>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <br />
        <div class="panel panel-default">
          <div class="panel-heading">
            <div class="checkbox">
              <label>
                <input type="checkbox" v-model="preferences.enable_grbl_surface_panel" />
                <span translate>Show surface panel</span>
              </label>
            </div>
          </div>
          <div v-if="preferences.enable_grbl_surface_panel" class="panel-body">
            <div>
              <table>
                <tr>
                  <td>
                    <span>
                      <span translate>Surface Width (X)</span>:&nbsp;
                    </span>
                  </td>
                  <td>
                    <div class="input-group has-control">
                      <input
                        class="form-control w6"
                        type="number"
                        min="1"
                        max="99999"
                        v-model="preferences.surfacewidth"
                      />
                      <span class="form-control-feedback ico_feedback"></span>
                    </div>
                  </td>
                  <td>
                    <div class="input-group">
                      <input class="hide_it" />
                      <span class="input-group-addon form_control" translate>mm</span>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
            <br />
            <div>
              <table>
                <tr>
                  <td>
                    <span>
                      <span translate>Surface Length (Y)</span>:&nbsp;
                    </span>
                  </td>
                  <td>
                    <div class="input-group has-control">
                      <input
                        class="form-control w6"
                        type="number"
                        min="1"
                        max="99999"
                        v-model="preferences.surfacelength"
                      />
                      <span class="form-control-feedback ico_feedback"></span>
                    </div>
                  </td>
                  <td>
                    <div class="input-group">
                      <input class="hide_it" />
                      <span class="input-group-addon form_control" translate>mm</span>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
            <br />
            <div>
              <table>
                <tr>
                  <td>
                    <span>
                      <span translate>Skim Depth (-Z)</span>:&nbsp;
                    </span>
                  </td>
                  <td>
                    <div class="input-group has-control">
                      <input
                        class="form-control w5"
                        type="number"
                        min="0.1"
                        max="9999"
                        v-model="preferences.surfacezdepth"
                      />
                      <span class="form-control-feedback ico_feedback"></span>
                    </div>
                  </td>
                  <td>
                    <div class="input-group">
                      <input class="hide_it" />
                      <span class="input-group-addon form_control" translate>mm</span>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
            <br />
            <div>
              <table>
                <tr>
                  <td>
                    <span>
                      <span translate>Bit Diameter</span>:&nbsp;
                    </span>
                  </td>
                  <td>
                    <div class="input-group has-control">
                      <input
                        class="form-control w6"
                        type="number"
                        min="0.1"
                        max="999"
                        v-model="preferences.surfacebitdiam"
                      />
                      <span class="form-control-feedback ico_feedback"></span>
                    </div>
                  </td>
                  <td>
                    <div class="input-group">
                      <input class="hide_it" />
                      <span class="input-group-addon form_control" translate>mm</span>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
            <br />
            <div>
              <table>
                <tr>
                  <td>
                    <span>
                      <span translate>Surfacing Stepover</span>:&nbsp;
                    </span>
                  </td>
                  <td>
                    <div class="input-group has-control">
                      <input
                        class="form-control w5"
                        type="number"
                        min="1"
                        max="100"
                        v-model="preferences.surfacestepover"
                      />
                      <span class="form-control-feedback ico_feedback"></span>
                    </div>
                  </td>
                  <td>
                    <div class="input-group">
                      <input class="hide_it" />
                      <span class="input-group-addon form_control" translate>mm</span>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
            <br />
            <div>
              <table>
                <tr>
                  <td>
                    <span>
                      <span translate>Surfacing Feedrate</span>:&nbsp;
                    </span>
                  </td>
                  <td>
                    <div class="input-group has-control">
                      <input
                        class="form-control w6"
                        type="number"
                        min="1"
                        max="99999"
                        v-model="preferences.surfacefeedrate"
                      />
                      <span class="form-control-feedback ico_feedback"></span>
                    </div>
                  </td>
                  <td>
                    <div class="input-group">
                      <input class="hide_it" />
                      <span class="input-group-addon form_control" translate>mm</span>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
            <br />
            <div>
              <table>
                <tr>
                  <td>
                    <span>
                      <span translate>Surfacing Spindle RPM</span>:&nbsp;
                    </span>
                  </td>
                  <td>
                    <div class="input-group has-control">
                      <input
                        class="form-control w6"
                        type="number"
                        min="0"
                        max="99999"
                        v-model="preferences.surfacespindle"
                      />
                      <span class="form-control-feedback ico_feedback"></span>
                    </div>
                  </td>
                  <td>
                    <div class="input-group">
                      <input class="hide_it" />
                      <span class="input-group-addon form_control" translate>mm</span>
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
        <div>
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
                <span>
                  <span translate>File extensions (use ; to separate)</span>:&nbsp;
                </span>
              </td>
              <td>
                <div class="input-group has-control">
                  <input class="form-control w25" type="text" v-model="preferences.f_filters" />
                  <span class="form-control-feedback ico_feedback"></span>
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
            <input type="checkbox" v-model="preferences.enable_commands_panel" />
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
        <div class="checkbox">
          <label>
            <input type="checkbox" v-model="preferences.enable_verbose_mode" />
            <span translate>Verbose mode</span>
          </label>
        </div>
      </div>
    </div>
    <div class="row">
      <span class="pull-right">&nbsp;&nbsp;</span>
      <span class="pull-right">
        <button class="btn btn-warning" @click="$emit('cancel')" translate>Cancel</button>
      </span>
      <span class="pull-right">&nbsp;&nbsp;</span>
      <span class="pull-right">
        <button class="btn btn-primary" @click="$emit('save')" translate>Save</button>
      </span>
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
  computed: {
    number_extruders () {
      return this.preferences.is_mixed_extruder ? 9 : 2
    }
  }
};
</script>