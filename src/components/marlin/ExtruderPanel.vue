<template>
    <div  class="panel panel-default panel-flex-col panel-min-width">
        <div class="panel-heading">
            <div class="row">
                <div class="col-md-12">
                    <div class="pull-left">
                        <b>
                            <span v-t>Extruders</span>
                        </b>
                    </div>
                </div>
            </div>
        </div>
        <div  class="panel-body panel-height panel-flex-main">
            <ul class="list-group">
                <li class="list-group-item">
                    <div class="row">
                        <div class="col-md-4">
                            <b>
                                <label v-t>Name</label>
                            </b>
                        </div>
                        <div class="col-md-8">
                            <b>
                                <label v-t>Options</label>
                            </b>
                        </div>
                    </div>
                </li>
                <li class="list-group-item hidden" >
                    <div class="row">
                        <div class="col-md-4">
                            <table>
                                <tr>
                                    <td>
                                        <span v-t>Extruder</span>
                                    </td>
                                    <td>&nbsp;</td>
                                    <td >
                                        <select
                                            style="width:4em"
                                            class="form-control"
                                            v-model="preferences.active_extruder"
                                            onchange="Set_active_extruder(); "
                                        >
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                        </select>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="col-md-8">
                            <div class="form-inline">
                                <div class="form-group">
                                    <button
                                        onclick="Extrude_cmd(current_active_extruder, 1)"
                                        class="btn btn-primary"
                                        translate
                                    >Extrude</button>
                                    <button
                                        onclick="Extrude_cmd(current_active_extruder, -1)"
                                        class="btn btn-info"
                                        translate
                                    >Reverse</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li class="list-group-item hidden" >
                    <div class="row">
                        <div class="col-md-4">
                            <span v-t>Extruder T0</span>
                        </div>
                        <div class="col-md-8">
                            <div class="form-inline">
                                <div class="form-group">
                                    <button
                                        onclick="Extrude_cmd('T0', 1)"
                                        class="btn btn-primary"
                                        translate
                                    >Extrude</button>
                                    <button
                                        onclick="Extrude_cmd('T0', -1)"
                                        class="btn btn-info"
                                        translate
                                    >Reverse</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li class="list-group-item hidden" >
                    <div class="row">
                        <div class="col-md-4">
                            <span v-t>Extruder T1</span>
                        </div>
                        <div class="col-md-8">
                            <div class="form-inline">
                                <div class="form-group">
                                    <button
                                        onclick="Extrude_cmd('T1', 1)"
                                        class="btn btn-primary"
                                        translate
                                    >Extrude</button>
                                    <button
                                        onclick="Extrude_cmd('T1', -1)"
                                        class="btn btn-info"
                                        translate
                                    >Reverse</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li class="list-group-item">
                    <div class="row">
                        <div class="col-md-4">
                            <span v-t>Flow (50-300%)</span>&nbsp;
                            <span ></span>
                        </div>
                        <div class="col-md-8">
                            <div class="panel-flex-row">
                                <button onclick="flowInit_cmd()" class="btn btn-primary">
                                    <svg width="1.3em" height="1.2em" viewBox="0 0 1300 1200">
                                        <g transform="translate(50,1200) scale(1, -1)">
                                            <path
                                                fill="currentColor"
                                                d="M650 1200h50q40 0 70 -40.5t30 -84.5v-150l-28 -125h328q40 0 70 -40.5t30 -84.5v-100q0 -45 -29 -74l-238 -344q-16 -24 -38 -40.5t-45 -16.5h-250q-7 0 -42 25t-66 50l-31 25h-61q-45 0 -72.5 18t-27.5 57v400q0 36 20 63l145 196l96 198q13 28 37.5 48t51.5 20z M650 1100l-100 -212l-150 -213v-375h100l136 -100h214l250 375v125h-450l50 225v175h-50zM50 800h100q21 0 35.5 -14.5t14.5 -35.5v-500q0 -21 -14.5 -35.5t-35.5 -14.5h-100q-21 0 -35.5 14.5t-14.5 35.5v500q0 21 14.5 35.5t35.5 14.5z"
                                            />
                                        </g>
                                    </svg>
                                </button>
                                &nbsp;&nbsp;
                                <table>
                                    <tr>
                                        <td>
                                            <div class="input-group">
                                                <input
                                                    class="form-control w5"
                                                    type="number"
                                                    min="50"
                                                    max="300"
                                                    v-model="preferences.flowSelectedValue"
                                                    value
                                                    onkeyup="extruder_handleKeyUp(event, 'Flow')"
                                                />
                                                <span class="input-group-addon hidden"></span>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="input-group">
                                                <input class="hidden" />
                                                <span
                                                    class="input-group-addon"
                                                    translate
                                                >&#37;</span>
                                            </div>
                                        </td>
                                    </tr>
                                </table>&nbsp;&nbsp;
                                <button onclick="flowSet_cmd()" class="btn btn-danger">
                                    <svg width="1.3em" height="1.2em" viewBox="0 0 1300 1200">
                                        <g transform="translate(50,1200) scale(1, -1)">
                                            <path
                                                fill="currentColor"
                                                d="M465 477l571 571q8 8 18 8t17 -8l177 -177q8 -7 8 -17t-8 -18l-783 -784q-7 -8 -17.5 -8t-17.5 8l-384 384q-8 8 -8 18t8 17l177 177q7 8 17 8t18 -8l171 -171q7 -7 18 -7t18 7z"
                                            />
                                        </g>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </li>
                <li class="list-group-item">
                    <div class="row">
                        <div class="col-md-4">
                            <span v-t>Feed (25-150%)</span>&nbsp;
                            <span ></span>
                        </div>
                        <div class="col-md-8">
                            <div class="panel-flex-row">
                                <button onclick="feedInit_cmd()" class="btn btn-primary">
                                    <svg width="1.3em" height="1.2em" viewBox="0 0 1300 1200">
                                        <g transform="translate(50,1200) scale(1, -1)">
                                            <path
                                                fill="currentColor"
                                                d="M650 1200h50q40 0 70 -40.5t30 -84.5v-150l-28 -125h328q40 0 70 -40.5t30 -84.5v-100q0 -45 -29 -74l-238 -344q-16 -24 -38 -40.5t-45 -16.5h-250q-7 0 -42 25t-66 50l-31 25h-61q-45 0 -72.5 18t-27.5 57v400q0 36 20 63l145 196l96 198q13 28 37.5 48t51.5 20z M650 1100l-100 -212l-150 -213v-375h100l136 -100h214l250 375v125h-450l50 225v175h-50zM50 800h100q21 0 35.5 -14.5t14.5 -35.5v-500q0 -21 -14.5 -35.5t-35.5 -14.5h-100q-21 0 -35.5 14.5t-14.5 35.5v500q0 21 14.5 35.5t35.5 14.5z"
                                            />
                                        </g>
                                    </svg>
                                </button>
                                &nbsp;&nbsp;
                                <table>
                                    <tr>
                                        <td>
                                            <div class="input-group">
                                                <input
                                                    class="form-control w5"
                                                    type="number"
                                                    min="25"
                                                    max="150"
                                                    v-model="preferences.feedSelectedValue"
                                                    value
                                                    onkeyup="extruder_handleKeyUp(event,'Feed')"
                                                />
                                                <span class="input-group-addon hidden"></span>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="input-group">
                                                <input class="hidden" />
                                                <span
                                                    class="input-group-addon"
                                                    translate
                                                >&#37;</span>
                                            </div>
                                        </td>
                                    </tr>
                                </table>&nbsp;&nbsp;
                                <button onclick="feedSet_cmd()" class="btn btn-danger">
                                    <svg width="1.3em" height="1.2em" viewBox="0 0 1300 1200">
                                        <g transform="translate(50,1200) scale(1, -1)">
                                            <path
                                                fill="currentColor"
                                                d="M465 477l571 571q8 8 18 8t17 -8l177 -177q8 -7 8 -17t-8 -18l-783 -784q-7 -8 -17.5 -8t-17.5 8l-384 384q-8 8 -8 18t8 17l177 177q7 8 17 8t18 -8l171 -171q7 -7 18 -7t18 7z"
                                            />
                                        </g>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </li>
                <li class="list-group-item hidden" >
                    <div class="row">
                        <div class="col-md-4">
                            <span v-t>Fan (0-100%)</span>
                        </div>
                        <div class="col-md-8">
                            <div class="panel-flex-row">
                                <button onclick="fanOff_cmd()" class="btn btn-primary">
                                    <svg width="1.3em" height="1.2em" viewBox="0 0 1300 1200">
                                        <g transform="translate(50,1200) scale(1, -1)">
                                            <path
                                                fill="currentColor"
                                                d="M550 1200h100q21 0 35.5 -14.5t14.5 -35.5v-400q0 -21 -14.5 -35.5t-35.5 -14.5h-100q-21 0 -35.5 14.5t-14.5 35.5v400q0 21 14.5 35.5t35.5 14.5zM800 975v166q167 -62 272 -209.5t105 -331.5q0 -117 -45.5 -224t-123 -184.5t-184.5 -123t-224 -45.5t-224 45.5 t-184.5 123t-123 184.5t-45.5 224q0 184 105 331.5t272 209.5v-166q-103 -55 -165 -155t-62 -220q0 -116 57 -214.5t155.5 -155.5t214.5 -57t214.5 57t155.5 155.5t57 214.5q0 120 -62 220t-165 155z"
                                            />
                                        </g>
                                    </svg>
                                </button>
                                &nbsp;&nbsp;
                                <table>
                                    <tr>
                                        <td>
                                            <div class="input-group">
                                                <input
                                                    class="form-control w5"
                                                    type="number"
                                                    min="0"
                                                    max="100"
                                                    v-model="preferences.fanSelectedValue"
                                                    onkeyup="extruder_handleKeyUp(event, 'Fan')"
                                                />
                                                <span class="input-group-addon hidden"></span>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="input-group">
                                                <input class="hidden" />
                                                <span
                                                    class="input-group-addon"
                                                    translate
                                                >&#37;</span>
                                            </div>
                                        </td>
                                    </tr>
                                </table>&nbsp;&nbsp;
                                <button onclick="fanSet_cmd()" class="btn btn-danger">
                                    <svg width="1.3em" height="1.2em" viewBox="0 0 1300 1200">
                                        <g transform="translate(50,1200) scale(1, -1)">
                                            <path
                                                fill="currentColor"
                                                d="M465 477l571 571q8 8 18 8t17 -8l177 -177q8 -7 8 -17t-8 -18l-783 -784q-7 -8 -17.5 -8t-17.5 8l-384 384q-8 8 -8 18t8 17l177 177q7 8 17 8t18 -8l171 -171q7 -7 18 -7t18 7z"
                                            />
                                        </g>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="panel-footer">
            <div class="panel-flex-row">
                <table>
                    <tr>
                        <td>
                            <div class="input-group">
                                <span class="input-group-addon" v-t>Extrude</span>
                                <input class="hidden" />
                            </div>
                        </td>
                        <td>
                            <div class="input-group">
                                <span class="input-group-addon hidden"></span>
                                <input
                                    class="form-control w4"
                                    type="number"
                                    min="1"
                                    max="9999"
                                    onchange="on_extruder_length_Change()"
                                    onkeyup="on_extruder_length_Change()"
                                    v-model="preferences.e_distance"
                                />
                                <span class="input-group-addon hidden"></span>
                            </div>
                        </td>
                        <td>
                            <div class="input-group">
                                <input class="hidden" />
                                <span class="input-group-addon" v-t>mm</span>
                            </div>
                        </td>
                    </tr>
                </table>&nbsp;
                <table>
                    <tr>
                        <td>
                            <div class="input-group">
                                <span class="input-group-addon">@</span>
                                <input class="hidden" />
                            </div>
                        </td>
                        <td>
                            <div class="input-group">
                                <span class="input-group-addon hidden"></span>
                                <input
                                    class="form-control w5"
                                    type="number"
                                    min="1"
                                    max="9999"
                                    onkeyup="on_extruder_velocity_Change()"
                                    v-model="preferences.e_feedrate"
                                />
                                <span class="input-group-addon hidden"></span>
                            </div>
                        </td>
                        <td>
                            <div class="input-group">
                                <input class="hidden" />
                                <span class="input-group-addon" v-t>mm/min</span>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        preferences: {
            type: Object,
            default () {
                return {}
            }
        }
    }
}
</script>