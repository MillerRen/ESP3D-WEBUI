<template>
  <div class="modal-body panel-scroll">
    <!-- <center>
      <select v-model="preferences.language" class="form-control">
        <option :value="lang[0]" v-for="lang in languages" :key="lang[0]" v-html="lang[1]"></option>
      </select>
    </center>
    <br /> -->
    <div class="panel panel-default">
      <div class="panel-heading">
        <div class="checkbox">
          <label>
            <input
              type="checkbox"
              v-model="preferences.enable_lock_UI"
              true-value="true"
              false-value="false"
            />
            <span v-t>Enable lock interface</span>
          </label>
        </div>
      </div>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading">
        <div class="checkbox">
          <label>
            <input
              type="checkbox"
              v-model="preferences.enable_ping"
              true-value="true"
              false-value="false"
            />
            <span v-t>Connection monitoring</span>
          </label>
        </div>
      </div>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading">
        <div class="checkbox">
          <label>
            <input
              type="checkbox"
              v-model="preferences.enable_DHT"
              true-value="true"
              false-value="false"
            />
            <span v-t>Show DHT output</span>
          </label>
        </div>
      </div>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading">
        <div class="checkbox">
          <label>
            <input
              type="checkbox"
              v-model="preferences.enable_camera"
              true-value="true"
              false-value="false"
            />
            <span v-t>Show camera panel</span>
          </label>
        </div>
      </div>
      <div v-if="preferences.enable_camera == 'true'" class="panel-body">
        <div class="checkbox">
          <label>
            <input
              type="checkbox"
              v-model="preferences.autoload_camera"
              true-value="true"
              false-value="false"
            />
            <span v-t>Auto load camera</span>
          </label>
        </div>
        <div class="form-inline">
          <div class="form-group">
            <span> <span v-t>Camera address</span>: </span>
            <input
              type="text"
              class="form-control"
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
            <input
              type="checkbox"
              v-model="preferences.enable_control_panel"
              true-value="true"
              false-value="false"
            />
            <span v-t>Show control panel</span>
          </label>
        </div>
      </div>
      <div v-if="preferences.enable_control_panel == 'true'" class="panel-body">
        <table>
          <tr>
            <td>
              <span> <span v-t>Position Refresh Time</span>:&nbsp; </span>
            </td>
            <td>
              <div class="input-group input-group-sm has-control">
                <input
                  class="form-control"
                  type="number"
                  min="1"
                  max="99"
                  v-model="preferences.interval_positions"
                />
                <span class="input-group-addon form_control" v-t>sec</span>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <span> <span v-t>XY feedrate</span>:&nbsp; </span>
            </td>
            <td>
              <div class="input-group input-group-sm has-control">
                <input
                  class="form-control"
                  type="number"
                  min="1"
                  v-model="preferences.xy_feedrate"
                />
                <span class="input-group-addon form_control" v-t>mm/min</span>
              </div>
            </td>
          </tr>
          <tr v-for="axis in axes" :key="axis">
            <td>
              <span>
                <span v-t>{{ axis.toUpperCase() }} feedrate</span>:&nbsp;
              </span>
            </td>
            <td>
              <div class="input-group input-group-sm has-control">
                <input
                  class="form-control"
                  type="number"
                  min="1"
                  v-model="preferences[axis + '_feedrate']"
                />
                <span class="input-group-addon form_control" v-t>mm/min</span>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading">
        <div class="checkbox">
          <label>
            <input
              type="checkbox"
              v-model="preferences.enable_temperatures_panel"
              true-value="true"
              false-value="false"
            />
            <span v-t>Show temperatures panel</span>
          </label>
        </div>
      </div>
      <div
        v-if="preferences.enable_temperatures_panel == 'true'"
        class="panel-body"
      >
        <div>
          <table>
            <tr>
              <td>
                <span> <span v-t>Temperature Refresh Time</span>:&nbsp; </span>
              </td>
              <td>
                <div class="input-group input-group-sm has-control">
                  <input
                    class="form-control"
                    type="number"
                    min="1"
                    max="99"
                    v-model="preferences.interval_temperatures"
                  />
                  <span class="input-group-addon form_control" v-t>sec</span>
                </div>
              </td>
            </tr>
          </table>
        </div>
        <div class="checkbox">
          <label>
            <input
              type="checkbox"
              v-model="preferences.enable_redundant"
              true-value="true"
              false-value="false"
            />
            <span v-t>Enable heater T0 redundant temperatures</span>
          </label>
        </div>
        <div class="checkbox">
          <label>
            <input
              type="checkbox"
              v-model="preferences.enable_probe_controls"
              true-value="true"
              false-value="false"
            />
            <span v-t>Enable probe temperatures</span>
          </label>
        </div>
        <div class="checkbox">
          <label>
            <input
              type="checkbox"
              v-model="preferences.enable_bed"
              true-value="true"
              false-value="false"
            />
            <span v-t>Enable bed controls</span>
          </label>
        </div>
        <div class="checkbox">
          <label>
            <input
              type="checkbox"
              v-model="preferences.enable_chamber"
              true-value="true"
              false-value="false"
            />
            <span v-t>Enable chamber controls</span>
          </label>
        </div>
      </div>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading">
        <div class="checkbox">
          <label>
            <input
              type="checkbox"
              v-model="preferences.enable_extruder_panel"
              true-value="true"
              false-value="false"
            />
            <span v-t>Show extruder panel</span>
          </label>
        </div>
      </div>
      <div
        v-if="preferences.enable_extruder_panel == 'true'"
        class="panel-body"
      >
        <div>
          <table>
            <tr>
              <td>
                <span> <span v-t>Length</span>:&nbsp; </span>
              </td>
              <td>
                <div class="input-group input-group-sm has-control">
                  <input
                    class="form-control"
                    type="number"
                    min="1"
                    max="9999"
                    v-model="preferences.e_distance"
                  />
                  <span class="input-group-addon form_control" v-t>mm</span>
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
                <span> <span v-t>E feedrate</span>:&nbsp; </span>
              </td>
              <td>
                <div class="input-group input-group-sm has-control">
                  <input
                    class="form-control"
                    type="number"
                    min="1"
                    max="9999"
                    v-model="preferences.e_feedrate"
                  />
                  <span class="input-group-addon form_control" v-t>mm/min</span>
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
                <span> <span v-t>Number of extruders</span>:&nbsp; </span>
              </td>
              <td>
                <select
                  class="form-control"
                  v-model="preferences.number_extruders"
                >
                  <option :value="v" v-for="v in number_extruders" :key="v">
                    {{ v }}
                  </option>
                </select>
              </td>
            </tr>
          </table>
        </div>
        <div class="checkbox">
          <label>
            <input
              type="checkbox"
              v-model="preferences.is_mixed_extruder"
              true-value="true"
              false-value="false"
            />
            <span v-t>Mixed extruders</span>
          </label>
        </div>
        <div class="checkbox">
          <label>
            <input
              type="checkbox"
              v-model="preferences.enable_fan"
              true-value="true"
              false-value="false"
            />
            <span v-t>Enable fan controls</span>
          </label>
        </div>
      </div>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading">
        <div class="checkbox">
          <label>
            <input
              type="checkbox"
              v-model="preferences.enable_grbl_panel"
              true-value="true"
              false-value="false"
            />
            <span v-t>Show GRBL panel</span>
          </label>
        </div>
      </div>
      <div v-if="preferences.enable_grbl_panel == 'true'" class="panel-body">
        <div>
          <table>
            <tr>
              <td>
                <span> <span v-t>Status Refresh Time</span>:&nbsp; </span>
              </td>
              <td>
                <div class="input-group input-group-sm has-control">
                  <input
                    class="form-control"
                    type="number"
                    min="1"
                    max="99"
                    v-model="preferences.interval_status"
                  />
                  <span class="input-group-addon form_control" v-t>sec</span>
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
                <input
                  type="checkbox"
                  v-model="preferences.enable_grbl_probe_panel"
                  true-value="true"
                  false-value="false"
                />
                <span v-t>Show probe panel</span>
              </label>
            </div>
          </div>
          <div
            v-if="preferences.enable_grbl_probe_panel == 'true'"
            class="panel-body"
          >
            <table>
              <tr>
                <td>
                  <span> <span v-t>Max travel</span>:&nbsp; </span>
                </td>
                <td>
                  <div class="input-group input-group-sm has-control">
                    <input
                      class="form-control"
                      type="number"
                      min="1"
                      max="99999"
                      v-model="preferences.probemaxtravel"
                    />
                    <span class="input-group-addon form_control" v-t>mm</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <span> <span v-t>Feed rate</span>:&nbsp; </span>
                </td>
                <td>
                  <div class="input-group input-group-sm has-control">
                    <input
                      class="form-control"
                      type="number"
                      min="1"
                      max="99999"
                      v-model="preferences.probefeedrate"
                    />
                    <span class="input-group-addon form_control" v-t
                      >mm/min</span
                    >
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <span> <span v-t>Touch plate thickness</span>:&nbsp; </span>
                </td>
                <td>
                  <div class="input-group input-group-sm has-control">
                    <input
                      class="form-control"
                      type="number"
                      min="0"
                      max="99999"
                      v-model="preferences.probetouchplatethickness"
                    />
                    <span class="input-group-addon form_control" v-t>mm</span>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <br />
        <div class="panel panel-default">
          <div class="panel-heading">
            <div class="checkbox">
              <label>
                <input
                  type="checkbox"
                  v-model="preferences.enable_grbl_surface_panel"
                  true-value="true"
                  false-value="false"
                />
                <span v-t>Show surface panel</span>
              </label>
            </div>
          </div>
          <div
            v-if="preferences.enable_grbl_surface_panel == 'true'"
            class="panel-body"
          >
            <table>
              <tr>
                <td>
                  <span> <span v-t>Surface Width (X)</span>:&nbsp; </span>
                </td>
                <td>
                  <div class="input-group input-group-sm has-control">
                    <input
                      class="form-control"
                      type="number"
                      min="1"
                      max="99999"
                      v-model="preferences.surfacewidth"
                    />
                    <span class="input-group-addon form_control" v-t>mm</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <span> <span v-t>Surface Length (Y)</span>:&nbsp; </span>
                </td>
                <td>
                  <div class="input-group input-group-sm has-control">
                    <input
                      class="form-control"
                      type="number"
                      min="1"
                      max="99999"
                      v-model="preferences.surfacelength"
                    />
                    <span class="input-group-addon form_control" v-t>mm</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <span> <span v-t>Skim Depth (-Z)</span>:&nbsp; </span>
                </td>
                <td>
                  <div class="input-group input-group-sm has-control">
                    <input
                      class="form-control"
                      type="number"
                      min="0.1"
                      max="9999"
                      v-model="preferences.surfacezdepth"
                    />
                    <span class="input-group-addon form_control" v-t>mm</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <span> <span v-t>Bit Diameter</span>:&nbsp; </span>
                </td>
                <td>
                  <div class="input-group input-group-sm has-control">
                    <input
                      class="form-control"
                      type="number"
                      min="0.1"
                      max="999"
                      v-model="preferences.surfacebitdiam"
                    />
                    <span class="input-group-addon form_control" v-t>mm</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <span> <span v-t>Surfacing Stepover</span>:&nbsp; </span>
                </td>
                <td>
                  <div class="input-group input-group-sm has-control">
                    <input
                      class="form-control"
                      type="number"
                      min="1"
                      max="100"
                      v-model="preferences.surfacestepover"
                    />
                    <span class="input-group-addon form_control" v-t>mm</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <span> <span v-t>Surfacing Feedrate</span>:&nbsp; </span>
                </td>
                <td>
                  <div class="input-group input-group-sm has-control">
                    <input
                      class="form-control"
                      type="number"
                      min="1"
                      max="99999"
                      v-model="preferences.surfacefeedrate"
                    />
                    <span class="input-group-addon form_control" v-t>mm</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <span> <span v-t>Surfacing Spindle RPM</span>:&nbsp; </span>
                </td>
                <td>
                  <div class="input-group input-group-sm has-control">
                    <input
                      class="form-control"
                      type="number"
                      min="0"
                      max="99999"
                      v-model="preferences.surfacespindle"
                    />
                    <span class="input-group-addon form_control" v-t>mm</span>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading">
        <div class="checkbox">
          <label>
            <input
              type="checkbox"
              v-model="preferences.enable_files_panel"
              true-value="true"
              false-value="false"
            />
            <span v-t>Show files panel</span>
          </label>
        </div>
      </div>
      <div v-if="preferences.enable_files_panel == 'true'" class="panel-body">
        <div>
          <table>
            <tr>
              <td colspan="2">
                <div class="checkbox">
                  <label>
                    <input
                      type="checkbox"
                      v-model="preferences.has_TFT_SD"
                      true-value="true"
                      false-value="false"
                    />
                    <span v-t>TFT SD card</span>
                  </label>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <div class="checkbox">
                  <label>
                    <input
                      type="checkbox"
                      v-model="preferences.has_TFT_USB"
                      true-value="true"
                      false-value="false"
                    />
                    <span v-t>TFT USB disk</span>
                  </label>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <span>
                  <span v-t>File extensions (use ; to separate)</span>:&nbsp;
                </span>
              </td>
              <td>
                <div class="input-group input-group-sm has-control">
                  <input
                    class="form-control w25"
                    type="text"
                    v-model="preferences.f_filters"
                  />
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
            <input
              type="checkbox"
              v-model="preferences.enable_commands_panel"
              true-value="true"
              false-value="false"
            />
            <span v-t>Show commands panel</span>
          </label>
        </div>
      </div>
      <div
        v-if="preferences.enable_commands_panel == 'true'"
        class="panel-body"
      >
        <div class="checkbox">
          <label>
            <input
              type="checkbox"
              v-model="preferences.enable_autoscroll"
              true-value="true"
              false-value="false"
            />
            <span v-t>Autoscroll</span>
          </label>
        </div>
        <div class="checkbox">
          <label>
            <input
              type="checkbox"
              v-model="preferences.enable_verbose_mode"
              true-value="true"
              false-value="false"
            />
            <span v-t>Verbose mode</span>
          </label>
        </div>
      </div>
    </div>
    <div class="clearfix">
      <div class="pull-left" v-if="uploading">
        <span v-t>Saving</span>
        &nbsp;
        <progress
          name="prg"
          v-if="uploading"
          :value="uploadingProgress"
          max="100"
        ></progress>
        &nbsp;
        <!-- <span >0</span>% -->
      </div>
      <span class="pull-right">&nbsp;&nbsp;</span>
      <span class="pull-right">
        <button class="btn btn-warning" @click="$emit('cancel')" v-t>
          Cancel
        </button>
      </span>
      <span class="pull-right">&nbsp;&nbsp;</span>
      <span class="pull-right">
        <button class="btn btn-primary" @click="save" v-t>Save</button>
      </span>
    </div>
  </div>
</template>

<script>
import { LANGUAGES } from "../../constants";
export default {
  props: {
    preferences: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      uploading: false,
      languages: LANGUAGES,
    };
  },
  computed: {
    number_extruders() {
      return this.preferences.is_mixed_extruder ? 9 : 2;
    },
    uploadingProgress() {
      return this.$store.uploadingProgress;
    },
    axes() {
      return "xyzabc".slice(2, this.$store.fwData.grblaxis);
    },
  },
  methods: {
    save() {
      this.uploading = true;
      this.$store
        .updatePreferences(this.preferences)
        .then(() => {
          this.uploading = false;
          this.$emit("success");
        })
        .catch((err) => {
          this.uploading = false;
          console.log(err);
        });
    },
  },
};
</script>

<style>
.panel-heading .checkbox {
  margin-top: 0;
  margin-bottom: 0;
}
</style>