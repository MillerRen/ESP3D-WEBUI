<template>
  <div class="panel panel-default panel-flex-col panel-min-width">
    <div class="panel-heading">
      <h3 class="panel-title">
        <span v-t>GRBL</span>
      </h3>
    </div>
    <div class="panel-body panel-flex-main">
      <div class="panel-flex-col">
        <table width="100%">
          <tr>
            <td class="text-center">
              <table>
                <tr>
                  <td>
                    <button
                      class="btn btn-default btn-xs"
                      @click="disableAlarm"
                      style="padding: 5px 5px 0 5px"
                      v-if="
                        report.type == 'alarm' || grblStatus.state == 'Alarm'
                      "
                    >
                      <svg
                        width="2em"
                        height="1.8em"
                        viewBox="-200 -200 1700 1600"
                      >
                        <g transform="translate(50,1200) scale(1, -1)">
                          <path
                            fill="black"
                            d="M553 1200h94q20 0 29 -10.5t3 -29.5l-18 -37q83 -19 144 -82.5t76 -140.5l63 -327l118 -173h17q19 0 33 -14.5t14 -35t-13 -40.5t-31 -27q-8 -4 -23 -9.5t-65 -19.5t-103 -25t-132.5 -20t-158.5 -9q-57 0 -115 5t-104 12t-88.5 15.5t-73.5 17.5t-54.5 16t-35.5 12l-11 4 q-18 8 -31 28t-13 40.5t14 35t33 14.5h17l118 173l63 327q15 77 76 140t144 83l-18 32q-6 19 3.5 32t28.5 13zM498 110q50 -6 102 -6q53 0 102 6q-12 -49 -39.5 -79.5t-62.5 -30.5t-63 30.5t-39 79.5z"
                          />
                          <circle
                            cx="600"
                            cy="600"
                            r="700"
                            stroke="red"
                            stroke-width="100"
                            fill="none"
                          />
                          <line
                            x1="106"
                            y1="106"
                            x2="1094"
                            y2="1094"
                            stroke="red"
                            stroke-width="100"
                          />
                        </g>
                      </svg>
                    </button>
                  </td>
                  <td>
                    <b>{{ grblStatus.state }} </b>
                  </td>
                  <td colspan="2" class="text-danger">
                    <span v-if="grblErrorMessage" v-t>
                      {{ grblErrorMessage }}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
            <td>
              <div
                v-if="sd && sd.progress"
                class="pull-left"
                style="line-height: 30px"
              >
                {{ sd.fileName }}&nbsp;<progress
                  :value="sd.progress"
                  max="100"
                  style="width: 96px"
                ></progress
                >{{ sd.progress }}%
              </div>
              <div
                class="btn-toolbar pull-right"
                v-if="report && report.data && report.data.status"
              >
                <button
                  v-if="report.data.status.state == 'Run'"
                  class="btn btn-default btn-sm"
                  @click="$store.sendRealtimeCommand('!')"
                >
                  <i class="glyphicon glyphicon-pause"></i>
                </button>
                <button
                  v-if="report.data.status.state == 'Hold'"
                  class="btn btn-default btn-sm"
                  @click="$store.sendRealtimeCommand('~')"
                >
                  <i class="glyphicon glyphicon-play"></i>
                </button>
                <button
                  v-if="
                    report.data.status.state == 'Run' ||
                    report.data.status.state == 'Hold'
                  "
                  class="btn btn-danger btn-sm"
                  @click="resetGrbl()"
                >
                  <i class="glyphicon glyphicon-repeat"></i>
                </button>
              </div>
            </td>
          </tr>
        </table>
        <br />
        <div class="panel panel-default">
          <div class="panel-heading" style="padding-bottom: 0">
            <ul class="nav nav-tabs" style="margin-bottom: -1px">
              <li :class="{ active: tab == 'override' }">
                <a href class="tablinks" @click.prevent="opentab('override')">
                  <span v-t>Override</span>
                </a>
              </li>
              <li :class="{ active: tab == 'probe' }">
                <a
                  href
                  class="tablinks"
                  @click.prevent="opentab('probe')"
                  v-if="preferences.enable_grbl_probe_panel == 'true'"
                >
                  <span v-t>Probe</span>
                </a>
              </li>
              <li :class="{ active: tab == 'surfacing' }">
                <a
                  href
                  class="tablinks"
                  @click.prevent="opentab('surfacing')"
                  v-if="preferences.enable_grbl_surface_panel == 'true'"
                >
                  <span v-t>Surfacing</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="panel-body panel-flex-main">
            <div>
              <div v-if="tab == 'override'" class="tabcontent">
                <table class="table">
                  <tr>
                    <td class="text-center">
                      <button
                        class="btn btn-default"
                        @click="
                          $store.sendRealtimeCommand(
                            String.fromCharCode(0x92, 0x0)
                          )
                        "
                        style="padding: 5px 4px 0 5px"
                      >
                        <i class="glyphicon glyphicon-fast-backward"></i>
                        <span class="button_txt">F10%</span>
                      </button>
                    </td>
                    <td class="text-center">
                      <button
                        class="btn btn-default"
                        @click="
                          $store.sendRealtimeCommand(
                            String.fromCharCode(0x94, 0x0)
                          )
                        "
                        style="padding: 5px 4px 0 5px"
                      >
                        <i class="glyphicon glyphicon-step-backward"></i>
                        <span class="button_txt">&nbsp;F1%</span>
                      </button>
                    </td>
                    <td class="text-center">
                      <button
                        class="btn btn-default"
                        @click="
                          $store.sendRealtimeCommand(
                            String.fromCharCode(0x90, 0x0)
                          )
                        "
                        style="padding: 5px 4px 0 5px"
                      >
                        <i class="glyphicon glyphicon-repeat"></i>
                      </button>
                    </td>
                    <td class="text-center">
                      <button
                        class="btn btn-default"
                        @click="
                          $store.sendRealtimeCommand(
                            String.fromCharCode(0x93, 0x0)
                          )
                        "
                        style="padding: 5px 4px 0 5px"
                      >
                        <i class="glyphicon glyphicon-step-forward"></i>
                        <span class="button_txt">&nbsp;F1%</span>
                      </button>
                    </td>
                    <td class="text-center">
                      <button
                        class="btn btn-default"
                        @click="
                          $store.sendRealtimeCommand(
                            String.fromCharCode(0x91, 0x0)
                          )
                        "
                        style="padding: 5px 4px 0 5px"
                      >
                        <i class="glyphicon glyphicon-fast-forward"></i>
                        <span class="button_txt">F10%</span>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td style="height: 10px"></td>
                  </tr>
                  <tr>
                    <td class="text-center">
                      <button
                        class="btn btn-default"
                        @click="
                          $store.sendRealtimeCommand(
                            String.fromCharCode(0x9b, 0x0)
                          )
                        "
                        style="padding: 5px 4px 0 5px"
                      >
                        <i class="glyphicon glyphicon-fast-backward"></i>
                        <span class="button_txt">S10%</span>
                      </button>
                    </td>
                    <td class="text-center">
                      <button
                        class="btn btn-default"
                        @click="
                          $store.sendRealtimeCommand(
                            String.fromCharCode(0x9d, 0x0)
                          )
                        "
                        style="padding: 5px 4px 0 5px"
                      >
                        <i class="glyphicon glyphicon-step-backward"></i>
                        <span class="button_txt">&nbsp;S1%</span>
                      </button>
                    </td>
                    <td class="text-center">
                      <button
                        class="btn btn-default"
                        @click="
                          $store.sendRealtimeCommand(
                            String.fromCharCode(0x99, 0x0)
                          )
                        "
                        style="padding: 5px 4px 0 5px"
                      >
                        <i class="glyphicon glyphicon-repeat"></i>
                      </button>
                    </td>
                    <td class="text-center">
                      <button
                        class="btn btn-default"
                        @click="
                          $store.sendRealtimeCommand(
                            String.fromCharCode(0x9c, 0x0)
                          )
                        "
                        style="padding: 5px 4px 0 5px"
                      >
                        <i class="glyphicon glyphicon-step-forward"></i>
                        <span class="button_txt">&nbsp;S1%</span>
                      </button>
                    </td>
                    <td class="text-center">
                      <button
                        class="btn btn-default"
                        @click="
                          $store.sendRealtimeCommand(
                            String.fromCharCode(0x9a, 0x0)
                          )
                        "
                        style="padding: 5px 4px 0 5px"
                      >
                        <i class="glyphicon glyphicon-fast-forward"></i>
                        <span class="button_txt">S10%</span>
                      </button>
                    </td>
                  </tr>
                </table>
                <table class="table">
                  <tr>
                    <td class="text-center" width="33%">
                      <button
                        class="btn btn-default"
                        @click="toggleSpindle()"
                        style="padding: 5px 4px 0 5px"
                      >
                        <i class="glyphicon glyphicon-record"></i>
                        <span class="button_txt" v-t>Spindle</span>
                      </button>
                    </td>
                    <td>&nbsp;</td>
                    <td class="text-center" width="33%">
                      <button
                        class="btn btn-default"
                        @click="
                          $store.sendRealtimeCommand(
                            String.fromCharCode(0xa0, 0x0)
                          )
                        "
                        style="padding: 5px 4px 0 5px"
                      >
                        <i class="glyphicon glyphicon-tint"></i>
                        <span class="button_txt" v-t>Flood</span>
                      </button>
                    </td>
                    <td>&nbsp;</td>
                    <td class="text-center" width="33%">
                      <button
                        class="btn btn-default"
                        @click="
                          $store.sendRealtimeCommand(
                            String.fromCharCode(0xa1, 0x0)
                          )
                        "
                        style="padding: 5px 4px 0 5px"
                      >
                        <i class="glyphicon glyphicon-cloud"></i>
                        <span class="button_txt" v-t>Mist</span>
                      </button>
                    </td>
                  </tr>
                </table>
                <hr />
                <table class="table">
                  <tr>
                    <td class="text-center clearfix">
                        <label
                          class="label"
                          :class="{
                            'label-warning': pins[pin],
                            'label-default': !pins[pin],
                          }"
                          v-for="pin in [
                            'X',
                            'Y',
                            'Z',
                            'A',
                            'B',
                            'C',
                            'P',
                            'D',
                            'H',
                            'R',
                            'S',
                          ]"
                          :key="pin"
                          style="margin: 2px; display:inline-block"
                        >
                          P{{ pin.toLowerCase() }}
                        </label>
                    </td>
                  </tr>
                </table>
              </div>
              <div
                v-if="tab == 'probe'"
                class="tabcontent"
                style="margin: auto"
              >
                <div class="form-group">
                  <div class="input-group input-group-sm">
                    <span class="input-group-addon">
                      <span v-t>Max travel</span>:
                    </span>
                    <input
                      class="form-control"
                      type="number"
                      min="1"
                      v-model="preferences.probemaxtravel"
                      onchange="onprobemaxtravelChange()"
                    />
                    <span class="input-group-addon" v-t>mm</span>
                  </div>
                </div>
                <div class="form-group input-group-sm">
                  <div class="input-group input-group-sm">
                    <span class="input-group-addon">
                      <span v-t>Feed rate</span>:
                    </span>
                    <input
                      class="form-control"
                      type="number"
                      min="1"
                      v-model="preferences.probefeedrate"
                    />
                    <span class="input-group-addon" v-t>mm/min</span>
                  </div>
                </div>
                <div class="form-group input-group-sm">
                  <div class="input-group input-group-sm">
                    <span class="input-group-addon">
                      <span v-t>Plate thickness</span>:
                    </span>
                    <input
                      class="form-control"
                      type="number"
                      min="0"
                      v-model="preferences.probetouchplatethickness"
                      onchange="onprobetouchplatethicknessChange()"
                    />
                    <span class="input-group-addon" v-t>mm</span>
                  </div>
                </div>
                <div class="form-group">
                  <button
                    :disabled="probeStatus"
                    class="btn btn-primary btn-sm"
                    @click="startProbeProcess()"
                    v-t
                  >
                    Start Probe
                  </button>
                  <span v-if="probeStatus" v-t>Probing...</span>
                </div>
              </div>
              <div
                v-if="tab == 'surfacing'"
                class="tabcontent"
                style="margin: auto"
              >
                <div class="input-group input-group-sm">
                  <span style="width: 150px" class="input-group-addon">
                    <span v-t>Width (X)</span>:
                  </span>
                  <input
                    class="form-control"
                    style="text-align: right"
                    type="number"
                    min="1"
                    max="9999"
                    v-model="preferences.surfacewidth"
                  />
                  <span style="width: 80px" class="input-group-addon" v-t
                    >mm</span
                  >
                </div>
                <div class="input-group input-group-sm">
                  <span style="width: 150px" class="input-group-addon">
                    <span v-t>Length (Y)</span>:
                  </span>
                  <input
                    class="form-control"
                    style="text-align: right"
                    type="number"
                    min="1"
                    max="9999"
                    v-model="preferences.surfacelength"
                  />
                  <span style="width: 80px" class="input-group-addon" v-t
                    >mm</span
                  >
                </div>
                <div class="input-group input-group-sm">
                  <span style="width: 150px" class="input-group-addon">
                    <span v-t>Skim Depth (Z-)</span>:
                  </span>
                  <input
                    class="form-control"
                    style="text-align: right"
                    type="number"
                    min="0.1"
                    max="999"
                    v-model="preferences.surfacezdepth"
                  />
                  <span style="width: 80px" class="input-group-addon" v-t
                    >mm</span
                  >
                </div>
                <div class="input-group input-group-sm">
                  <span style="width: 150px" class="input-group-addon">
                    <span v-t>Bit Diameter</span>:
                  </span>
                  <input
                    class="form-control"
                    style="text-align: right"
                    type="number"
                    min="0.1"
                    max="999"
                    v-model="preferences.surfacebitdiam"
                  />
                  <span style="width: 80px" class="input-group-addon" v-t
                    >mm</span
                  >
                </div>
                <div class="input-group input-group-sm">
                  <span style="width: 150px" class="input-group-addon">
                    <span v-t>Stepover</span>:
                  </span>
                  <input
                    class="form-control"
                    style="text-align: right"
                    type="number"
                    min="0"
                    max="99"
                    v-model="preferences.surfacestepover"
                  />
                  <span style="width: 80px" class="input-group-addon" v-t
                    >%</span
                  >
                </div>
                <div class="input-group input-group-sm">
                  <span style="width: 150px" class="input-group-addon">
                    <span v-t>Feedrate</span>:
                  </span>
                  <input
                    class="form-control"
                    style="text-align: right"
                    type="number"
                    min="500"
                    max="10000"
                    v-model="preferences.surfacefeedrate"
                  />
                  <span style="width: 80px" class="input-group-addon" v-t
                    >mm/min</span
                  >
                </div>
                <div class="input-group input-group-sm">
                  <span style="width: 150px" class="input-group-addon">
                    <span v-t>Spindle RPM</span>:
                  </span>
                  <input
                    class="form-control"
                    style="text-align: right"
                    type="number"
                    min="500"
                    max="50000"
                    v-model="preferences.surfacespindle"
                  />
                  <span style="width: 80px" class="input-group-addon" v-t
                    >RPM</span
                  >
                </div>
                <br />
                <table>
                  <tr>
                    <td>
                      <span class="hidden">
                        <table>
                          <tr>
                            <td>
                              <span v-t>Surfacing...</span>
                            </td>
                            <td>
                              <div
                                class="loader"
                                style="width: 2em; height: 2em"
                              ></div>
                            </td>
                          </tr>
                        </table>
                      </span>
                      <button
                        class="btn btn-primary btn-sm"
                        @click="StartSurfaceProcess()"
                        v-t
                      >
                        Start Surfacing
                      </button>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="panel-footer">
      <div class="panel-flex-row">
        <button class="btn btn-danger btn-sm" @click="resetGrbl()">
          <i class="glyphicon glyphicon-repeat"></i></button
        >&nbsp;
        <div class="input-group input-group-sm">
          <span class="input-group-addon">
            <span v-t>auto-check every:</span>
            <input
              type="checkbox"
              v-model="$store.enableAutoCheckPosition"
              @change="autoCheckPosition"
            />
          </span>
          <input
            class="form-control"
            type="number"
            min="1"
            max="99"
            v-model="preferences.interval_positions"
            @change="autoCheckPosition"
          />
          <span class="input-group-addon" v-t>sec</span>
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
  data() {
    return {
      tab: "override",
      spindleOn: false,
    };
  },
  computed: {
    grblErrorMessage() {
      return this.$store.grblErrorMessage;
    },
    report() {
      return this.$store.report;
    },
    grblStatus() {
      return this.$store.grblStatus;
    },
    probeStatus() {
      return this.$store.probeStatus;
    },
    pins() {
      return this.$store.pins;
    },
    sd() {
      return this.$store.sd;
    },
  },
  methods: {
    disableAlarm() {
      this.$store.disableAlarm();
    },
    resetGrbl() {
      this.$store.resetGrbl();
    },
    startProbeProcess() {
      this.$store.startProbeProcess();
    },
    opentab(tab) {
      this.tab = tab;
    },
    autoCheckPosition() {
      this.$store.autoCheckPosition();
    },
    toggleSpindle() {
      if (this.grblStatus.state == "Hold") {
        this.$store.sendRealtimeCommand(String.fromCharCode(0x9e, 0x0));
      } else {
        this.spindleOn = !this.spindleOn;
        this.$store.toggleSpindle(this.spindleOn);
      }
    },
  },
};
</script>
