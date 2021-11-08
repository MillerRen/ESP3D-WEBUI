<template>
    <div id="grblPanel" class="panel panel-default panel-flex-col panel-min-width">
        <div class="panel-heading">
            <h3 class="panel-title">
                <span translate>GRBL</span>
            </h3>
        </div>

        <div id="control-body" class="panel-body panel-flex-main">
            <div class="panel-flex-col">
                <table width="100%">
                    <tr>
                        <td class="td_center">
                            <table>
                                <tr>
                                    <td>
                                        <button
                                            id="clear_status_btn"
                                            class="btn btn-default btn-xs"
                                            @click="disableAlarm"
                                            style="padding: 5px 5px 0 5px;"
                                            v-if="report.type == 'alarm'"
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
                                    <td style="text-align: left; width:100%;height:30px;">
                                        <div id="grbl_status" class="status_text">{{ reportType }}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        colspan="2"
                                        style="text-align: left; height:20px;"
                                        id="grbl_status_text"
                                        v-if="report.type == 'alarm'"
                                    >{{ report.data.message }}</td>
                                </tr>
                            </table>
                        </td>
                        <td>
                            <table>
                                <tr>
                                    <td style="width:100%;height:2em;"></td>
                                    <td>
                                        <button
                                            id="sd_pause_btn"
                                            v-if="report.type == 'status' && report.data.status.state == 'run'"
                                            class="btn btn-default"
                                            @click="$store.sendRealtimeCommand('!');"
                                            style="padding: 5px 4px 0 5px;"
                                        >
                                            <i class="glyphicon glyphicon-pause"></i>
                                        </button>
                                    </td>
                                    <td>&nbsp;</td>
                                    <td>
                                        <button
                                            v-if="report.type == 'status' && report.data.status.state == 'run'"
                                            id="sd_resume_btn"
                                            class="btn btn-default"
                                            @click="$store.sendRealtimeCommand('~');"
                                            style="padding: 5px 4px 0 5px;"
                                        >
                                            <i class="glyphicon glyphicon-play"></i>
                                        </button>
                                    </td>
                                    <td>&nbsp;</td>
                                    <td>
                                        <button
                                            v-if="report.type == 'status' && report.data.status.state == 'run'"
                                            id="sd_reset_btn"
                                            class="btn btn-danger"
                                            @click="resetGrbl();"
                                            style="padding: 5px 0px 0px 0px;"
                                        >
                                            <i class="glyphicon glyphicon-reweet"></i>
                                        </button>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" class="td_center">
                            <center>
                                <div id="grbl_SD_status"></div>
                            </center>
                        </td>
                    </tr>
                </table>
                <br />
                
                <div class="panel panel-default">
                    <div class="panel-heading" style="padding-bottom: 0;">
                    <ul class="nav nav-tabs" style="margin-bottom:-1px">
                        <li :class="{active:tab=='override'}">
                            <a href=""
                                class="tablinks"
                                @click.prevent="opentab('override')"
                            >
                                <span translate>Override</span>
                            </a>
                        </li>
                        <li :class="{active:tab=='probe'}">
                            <a href=""
                                class="tablinks"
                                @click.prevent="opentab('probe')"
                                v-if="preferences.enable_grbl_probe_panel"
                            >
                                <span translate>Probe</span>
                            </a>
                        </li>
                        <li :class="{active:tab=='surfacing'}">
                            <a href=""
                                class="tablinks"
                                @click.prevent="opentab('surfacing')"
                                v-if="preferences.enable_grbl_surface_panel"
                            >
                                <span translate>Surfacing Wizard</span>
                            </a>
                        </li>
                    </ul>
                </div>
                    <div class="panel-body panel-flex-main">
                        <div id="grbluitabscontent">
                            <div v-if="tab=='override'" class="tabcontent">
                                <table width="100%">
                                    <tr>
                                        <td style="height:10px;"></td>
                                    </tr>
                                    <tr>
                                        <td class="td_center">
                                            <button
                                                class="btn btn-default"
                                                @click="$store.sendRealtimeCommand(String.fromCharCode(0x92, 0x0));"
                                                style="padding: 5px 4px 0 5px;"
                                            >
                                                <table>
                                                    <tr>
                                                        <td>
                                                            <i
                                                                class="glyphicon glyphicon-fast-backward"
                                                            ></i>
                                                        </td>
                                                        <td>
                                                            <span class="button_txt">F10%</span>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </button>
                                        </td>
                                        <td class="td_center">
                                            <button
                                                class="btn btn-default"
                                                @click="$store.sendRealtimeCommand(String.fromCharCode(0x94, 0x0));"
                                                style="padding: 5px 4px 0 5px;"
                                            >
                                                <table>
                                                    <tr>
                                                        <td>
                                                            <i
                                                                class="glyphicon glyphicon-step-backward"
                                                            ></i>
                                                        </td>
                                                        <td>
                                                            <span class="button_txt">&nbsp;F1%</span>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </button>
                                        </td>
                                        <td class="td_center">
                                            <button
                                                class="btn btn-default"
                                                @click="$store.sendRealtimeCommand(String.fromCharCode(0x90, 0x0));"
                                                style="padding: 5px 4px 0 5px;"
                                            >
                                                <i class="glyphicon glyphicon-repeat"></i>
                                            </button>
                                        </td>
                                        <td class="td_center">
                                            <button
                                                class="btn btn-default"
                                                @click="$store.sendRealtimeCommand(String.fromCharCode(0x93, 0x0));"
                                                style="padding: 5px 4px 0 5px;"
                                            >
                                                <table>
                                                    <tr>
                                                        <td>
                                                            <i
                                                                class="glyphicon glyphicon-step-forward"
                                                            ></i>
                                                        </td>
                                                        <td>
                                                            <span class="button_txt">&nbsp;F1%</span>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </button>
                                        </td>
                                        <td class="td_center">
                                            <button
                                                class="btn btn-default"
                                                @click="$store.sendRealtimeCommand(String.fromCharCode(0x91, 0x0));"
                                                style="padding: 5px 4px 0 5px;"
                                            >
                                                <table>
                                                    <tr>
                                                        <td>
                                                            <i
                                                                class="glyphicon glyphicon-fast-forward"
                                                            ></i>
                                                        </td>
                                                        <td>
                                                            <span class="button_txt">F10%</span>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="height:10px;"></td>
                                    </tr>
                                    <tr>
                                        <td class="td_center">
                                            <button
                                                class="btn btn-default"
                                                @click="$store.sendRealtimeCommand(String.fromCharCode(0x9B, 0x0));"
                                                style="padding: 5px 4px 0 5px;"
                                            >
                                                <table>
                                                    <tr>
                                                        <td>
                                                            <i
                                                                class="glyphicon glyphicon-fast-backward"
                                                            ></i>
                                                        </td>
                                                        <td>
                                                            <span class="button_txt">S10%</span>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </button>
                                        </td>
                                        <td class="td_center">
                                            <button
                                                class="btn btn-default"
                                                @click="$store.sendRealtimeCommand(String.fromCharCode(0x9D, 0x0));"
                                                style="padding: 5px 4px 0 5px;"
                                            >
                                                <table>
                                                    <tr>
                                                        <td>
                                                            <i
                                                                class="glyphicon glyphicon-step-backward"
                                                            ></i>
                                                        </td>
                                                        <td>
                                                            <span class="button_txt">&nbsp;S1%</span>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </button>
                                        </td>
                                        <td class="td_center">
                                            <button
                                                class="btn btn-default"
                                                @click="$store.sendRealtimeCommand(String.fromCharCode(0x99, 0x0));"
                                                style="padding: 5px 4px 0 5px;"
                                            >
                                                <i class="glyphicon glyphicon-repeat"></i>
                                            </button>
                                        </td>
                                        <td class="td_center">
                                            <button
                                                class="btn btn-default"
                                                @click="$store.sendRealtimeCommand(String.fromCharCode(0x9C, 0x0));"
                                                style="padding: 5px 4px 0 5px;"
                                            >
                                                <table>
                                                    <tr>
                                                        <td>
                                                            <i
                                                                class="glyphicon glyphicon-step-forward"
                                                            ></i>
                                                        </td>
                                                        <td>
                                                            <span class="button_txt">&nbsp;S1%</span>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </button>
                                        </td>
                                        <td class="td_center">
                                            <button
                                                class="btn btn-default"
                                                @click="$store.sendRealtimeCommand(String.fromCharCode(0x9A, 0x0));"
                                                style="padding: 5px 4px 0 5px;"
                                            >
                                                <table>
                                                    <tr>
                                                        <td>
                                                            <i
                                                                class="glyphicon glyphicon-fast-forward"
                                                            ></i>
                                                        </td>
                                                        <td>
                                                            <span class="button_txt">S10%</span>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="height:10px;"></td>
                                    </tr>
                                </table>
                                <table width="100%">
                                    <tr>
                                        <td class="td_center" width="33%">
                                            <button
                                                class="btn btn-default"
                                                @click="$store.sendRealtimeCommand(String.fromCharCode(0x9E, 0x0));"
                                                style="padding: 5px 4px 0 5px;"
                                            >
                                                <table>
                                                    <tr>
                                                        <td>
                                                            <i class="glyphicon glyphicon-record"></i>
                                                        </td>
                                                        <td>
                                                            <span
                                                                class="button_txt"
                                                                translate
                                                            >Spindle</span>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </button>
                                        </td>
                                        <td>&nbsp;</td>
                                        <td class="td_center" width="33%">
                                            <button
                                                class="btn btn-default"
                                                @click="$store.sendRealtimeCommand(String.fromCharCode(0xA0, 0x0));"
                                                style="padding: 5px 4px 0 5px;"
                                            >
                                                <table>
                                                    <tr>
                                                        <td>
                                                            <i class="glyphicon glyphicon-tint"></i>
                                                        </td>
                                                        <td>
                                                            <span class="button_txt" translate>Flood</span>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </button>
                                        </td>
                                        <td>&nbsp;</td>
                                        <td class="td_center" width="33%">
                                            <button
                                                class="btn btn-default"
                                                @click="$store.sendRealtimeCommand(String.fromCharCode(0xA1, 0x0));"
                                                style="padding: 5px 4px 0 5px;"
                                            >
                                                <table>
                                                    <tr>
                                                        <td>
                                                            <i class="glyphicon glyphicon-cloud"></i>
                                                        </td>
                                                        <td>
                                                            <span class="button_txt" translate>Mist</span>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </button>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div v-if="tab=='probe'" class="tabcontent" style="margin: auto;">
                                <table>
                                    <tr>
                                        <td>
                                            <div class="input-group">
                                                <span class="input-group-addon form_control">
                                                    <span translate>Max travel</span>:
                                                </span>
                                                <input
                                                    class="form-control w6"
                                                    type="number"
                                                    min="1"
                                                    v-model="preferences.probemaxtravel"
                                                    onchange="onprobemaxtravelChange()"
                                                />
                                                <span
                                                    class="input-group-addon form_control"
                                                    translate
                                                >mm</span>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                                <br />
                                <table>
                                    <tr>
                                        <td>
                                            <div class="input-group">
                                                <span class="input-group-addon form_control">
                                                    <span translate>Feed rate</span>:
                                                </span>
                                                <input
                                                    class="form-control w6"
                                                    type="number"
                                                    min="1"
                                                    v-model="preferences.probefeedrate"
                                                />
                                                <span
                                                    class="input-group-addon form_control"
                                                    translate
                                                >mm/min</span>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                                <br />
                                <table>
                                    <tr>
                                        <td>
                                            <div class="input-group">
                                                <span class="input-group-addon form_control">
                                                    <span translate>Plate thickness</span>:
                                                </span>
                                                <input
                                                    class="form-control w5"
                                                    type="number"
                                                    min="0"
                                                    v-model="preferences.probetouchplatethickness"
                                                    onchange="onprobetouchplatethicknessChange()"
                                                />
                                                <span
                                                    class="input-group-addon form_control"
                                                    translate
                                                >mm</span>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                                <br />
                                <table>
                                    <tr>
                                        <td nowrap translate style="vertical-align: middle; ">
                                            <span translate>Touch status</span>:
                                        </td>
                                        <td id="touch_status_icon"></td>
                                        <td width="100%">&nbsp;</td>
                                        <td>
                                            <span class="hidden" id="probingtext">
                                                <table>
                                                    <tr>
                                                        <td>
                                                            <span translate>Probing...</span>
                                                        </td>
                                                        <td>
                                                            <div
                                                                class="loader"
                                                                style="width:2em;height:2em;"
                                                            ></div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </span>
                                            <button
                                                class="btn btn-primary"
                                                id="probingbtn"
                                                @click="startProbeProcess();"
                                                translate
                                            >Start Probe</button>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div v-if="tab=='surfacing'" class="tabcontent" style="margin: auto;">
                                <table class="table table-responsive" style="width:auto;">
                                    <tr>
                                        <td>
                                            <div class="input-group">
                                                <span
                                                    style="width:150px;"
                                                    class="input-group-addon form_control"
                                                >
                                                    <span translate>Width (X)</span>:
                                                </span>
                                                <input
                                                    class="form-control w6"
                                                    style="text-align: right;"
                                                    type="number"
                                                    min="1"
                                                    max="9999"
                                                    v-model="preferences.surfacewidth"
                                                />
                                                <span
                                                    style="width:80px;"
                                                    class="input-group-addon form_control"
                                                    translate
                                                >mm</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="input-group">
                                                <span
                                                    style="width:150px;"
                                                    class="input-group-addon form_control"
                                                >
                                                    <span translate>Length (Y)</span>:
                                                </span>
                                                <input
                                                    class="form-control w6"
                                                    style="text-align: right;"
                                                    type="number"
                                                    min="1"
                                                    max="9999"
                                                    v-model="preferences.surfacelength"
                                                />
                                                <span
                                                    style="width:80px;"
                                                    class="input-group-addon form_control"
                                                    translate
                                                >mm</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="input-group">
                                                <span
                                                    style="width:150px;"
                                                    class="input-group-addon form_control"
                                                >
                                                    <span translate>Skim Depth (Z-)</span>:
                                                </span>
                                                <input
                                                    class="form-control w6"
                                                    style="text-align: right;"
                                                    type="number"
                                                    min="0.1"
                                                    max="999"
                                                    v-model="preferences.surfacezdepth"
                                                />
                                                <span
                                                    style="width:80px;"
                                                    class="input-group-addon form_control"
                                                    translate
                                                >mm</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="input-group">
                                                <span
                                                    style="width:150px;"
                                                    class="input-group-addon form_control"
                                                >
                                                    <span translate>Bit Diameter</span>:
                                                </span>
                                                <input
                                                    class="form-control w6"
                                                    style="text-align: right;"
                                                    type="number"
                                                    min="0.1"
                                                    max="999"
                                                    v-model="preferences.surfacebitdiam"
                                                />
                                                <span
                                                    style="width:80px;"
                                                    class="input-group-addon form_control"
                                                    translate
                                                >mm</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="input-group">
                                                <span
                                                    style="width:150px;"
                                                    class="input-group-addon form_control"
                                                >
                                                    <span translate>Stepover</span>:
                                                </span>
                                                <input
                                                    class="form-control w6"
                                                    style="text-align: right;"
                                                    type="number"
                                                    min="0"
                                                    max="99"
                                                    v-model="preferences.surfacestepover"
                                                />
                                                <span
                                                    style="width:80px;"
                                                    class="input-group-addon form_control"
                                                    translate
                                                >%</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="input-group">
                                                <span
                                                    style="width:150px;"
                                                    class="input-group-addon form_control"
                                                >
                                                    <span translate>Feedrate</span>:
                                                </span>
                                                <input
                                                    class="form-control w6"
                                                    style="text-align: right;"
                                                    type="number"
                                                    min="500"
                                                    max="10000"
                                                    v-model="preferences.surfacefeedrate"
                                                />
                                                <span
                                                    style="width:80px;"
                                                    class="input-group-addon form_control"
                                                    translate
                                                >mm/min</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="input-group">
                                                <span
                                                    style="width:150px;"
                                                    class="input-group-addon form_control"
                                                >
                                                    <span translate>Spindle RPM</span>:
                                                </span>
                                                <input
                                                    class="form-control w6"
                                                    style="text-align: right;"
                                                    type="number"
                                                    min="500"
                                                    max="50000"
                                                    v-model="preferences.surfacespindle"
                                                />
                                                <span
                                                    style="width:80px;"
                                                    class="input-group-addon form_control"
                                                    translate
                                                >RPM</span>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                                <br />
                                <table>
                                    <tr>
                                        <td>
                                            <span class="hidden" id="surfacingtext">
                                                <table>
                                                    <tr>
                                                        <td>
                                                            <span translate>Surfacing...</span>
                                                        </td>
                                                        <td>
                                                            <div
                                                                class="loader"
                                                                style="width:2em;height:2em;"
                                                            ></div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </span>
                                            <button
                                                class="btn btn-primary"
                                                @click="StartSurfaceProcess();"
                                                translate
                                            >Start Surfacing</button>
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
                <button id="global_reset_btn" class="btn btn-danger" @click="resetGrbl();">
                    <i class="glyphicon glyphicon-repeat"></i>
                </button>
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
                return {}
            }
        }
    },
    data () {
        return {
            tab: 'override'
        }
    },
    computed: {
        grblErrorMessage() {
            return ['alarm', 'hold', 'error', 'door'].indexOf(this.$store.report.type) > -1 ? this.$store.report.data.message : ''
        },
        report() {
            return this.$store.report
        },
        reportType() {
            return this.$store.report.type == 'status' ? this.$store.report.data.status.state : this.$store.report.type
        }
    },
    methods: {
        disableAlarm() {
            this.$store.disableAlarm()
        },
        resetGrbl() {
            this.$store.resetGrbl()
        },
        startProbeProcess() {
            var cmd = "G38.2 G91 Z-" + this.preferences.probemaxtravel + ' F' + this.preferences.probefeedrate
            return this.$store.sendCustomCommand(cmd)
        },
        opentab(tab) {
            this.tab = tab
        }
    }
}
</script>