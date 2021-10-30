<template>
    <div class="modal-setup">
        <div class="clearfix">
            <br />
            <div class="step no_navigationr">
                <div class="steplinks spacer"></div>
                <button class="steplinks" @click="step=0" :disabled="step<0" :class="{disabled:step<0}">
                    <svg width="1.3em" height="1.2em" viewBox="0 0 1300 1200">
                        <g transform="translate(50,1200) scale(1, -1)">
                            <path
                                fill="currentColor"
                                d="M658 1197l637 -1104q23 -38 7 -65.5t-60 -27.5h-1276q-44 0 -60 27.5t7 65.5l637 1104q22 39 54 39t54 -39zM704 800h-208q-20 0 -32 -14.5t-8 -34.5l58 -302q4 -20 21.5 -34.5t37.5 -14.5h54q20 0 37.5 14.5t21.5 34.5l58 302q4 20 -8 34.5t-32 14.5zM500 300v-100h200 v100h-200z"
                            />
                        </g>
                    </svg>
                </button>
                <div class="steplinks connecting-line" id="wizard_line1"></div>
                <button
                    class="steplinks "
                     @click="step=1" :disabled="step<1"
                      :class="{disabled:step<1}"
                >
                    <svg width="1.3em" height="1.2em" viewBox="0 0 1300 1200">
                        <g transform="translate(50,1200) scale(1, -1)">
                            <path
                                fill="currentColor"
                                d="M600 1174q33 0 74 -5l38 -152l5 -1q49 -14 94 -39l5 -2l134 80q61 -48 104 -105l-80 -134l3 -5q25 -44 39 -93l1 -6l152 -38q5 -43 5 -73q0 -34 -5 -74l-152 -38l-1 -6q-15 -49 -39 -93l-3 -5l80 -134q-48 -61 -104 -105l-134 81l-5 -3q-44 -25 -94 -39l-5 -2l-38 -151 q-43 -5 -74 -5q-33 0 -74 5l-38 151l-5 2q-49 14 -94 39l-5 3l-134 -81q-60 48 -104 105l80 134l-3 5q-25 45 -38 93l-2 6l-151 38q-6 42 -6 74q0 33 6 73l151 38l2 6q13 48 38 93l3 5l-80 134q47 61 105 105l133 -80l5 2q45 25 94 39l5 1l38 152q43 5 74 5zM600 815 q-89 0 -152 -63t-63 -151.5t63 -151.5t152 -63t152 63t63 151.5t-63 151.5t-152 63z"
                            />
                        </g>
                    </svg>
                </button>
                <div class="steplinks connecting-line" id="wizard_line2"></div>
                <button
                    class="steplinks"
                     @click="step=2" :disabled="step<2"
                      :class="{disabled:step<2}"
                >
                    <svg width="1.3em" height="1.2em" viewBox="0 0 1300 1200">
                        <g transform="translate(50,1200) scale(1, -1)">
                            <path
                                fill="currentColor"
                                d="M1025 1200h150q10 0 17.5 -7.5t7.5 -17.5v-1150q0 -10 -7.5 -17.5t-17.5 -7.5h-150q-10 0 -17.5 7.5t-7.5 17.5v1150q0 10 7.5 17.5t17.5 7.5zM725 800h150q10 0 17.5 -7.5t7.5 -17.5v-750q0 -10 -7.5 -17.5t-17.5 -7.5h-150q-10 0 -17.5 7.5t-7.5 17.5v750 q0 10 7.5 17.5t17.5 7.5zM425 500h150q10 0 17.5 -7.5t7.5 -17.5v-450q0 -10 -7.5 -17.5t-17.5 -7.5h-150q-10 0 -17.5 7.5t-7.5 17.5v450q0 10 7.5 17.5t17.5 7.5zM125 300h150q10 0 17.5 -7.5t7.5 -17.5v-250q0 -10 -7.5 -17.5t-17.5 -7.5h-150q-10 0 -17.5 7.5t-7.5 17.5 v250q0 10 7.5 17.5t17.5 7.5z"
                            />
                        </g>
                    </svg>
                </button>
                <div class="steplinks connecting-line" id="wizard_line3"></div>
                <button
                    class="steplinks "
                     @click="step=3" :disabled="step<3"
                      :class="{disabled:step<3}"
                >
                    <svg width="1.3em" height="1.2em" viewBox="0 0 1300 1200">
                        <g transform="translate(50,1200) scale(1, -1)">
                            <path
                                fill="currentColor"
                                d="M200 1100h700q124 0 212 -88t88 -212v-500q0 -124 -88 -212t-212 -88h-700q-124 0 -212 88t-88 212v500q0 124 88 212t212 88zM100 900v-700h900v700h-900zM500 700h-200v-100h200v-300h-300v100h200v100h-200v300h300v-100zM900 700v-300l-100 -100h-200v500h200z M700 700v-300h100v300h-100z"
                            />
                        </g>
                    </svg>
                </button>
                <div class="steplinks connecting-line" id="wizard_line4"></div>
                <button
                    class="steplinks"
                     @click="step=4" :disabled="step<4"
                      :class="{disabled:step<4}"
                >
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
        <br>
        <div class="clearfix">
            <div v-if="step==0" class="stepcontent">
                <span translate>This wizard will help you to configure the basic settings.</span>
                <br />
                <br />
                <center>
                    <div id="setup_langage_list"></div>
                </center>
                <br />
                <span translate>Press start to proceed.</span>
            </div>
            <div v-if="step==1" class="stepcontent">
                fw / baud
                <br />
            </div>
            <div v-if="step==2" class="stepcontent">
                wifi
                <br />
            </div>
            <div v-if="step==3" class="stepcontent">
                SD
                <br />
            </div>
            <div v-if="step==4"  class="stepcontent">
                <span translate>Setup is finished.</span>
                <br />
                <br />
                <span
                    translate
                >After closing, you will still be able to change or to fine tune your settings in main interface anytime.</span>
                <br />
                <span
                    translate
                >You may need to restart the board to apply the new settings and connect again.</span>
            </div>
        </div>
        <div class="clearfix">
            <span class="pull-right">
                <button
                    class="btn btn-warning"
                    @click="wizard()"
                    translate
                >Start setup</button>
            </span>
            <span class="pull-right">&nbsp;&nbsp;</span>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            step: 0
        }
    },
    methods: {
        wizard() {
            this.step++
        }
    }
}
</script>

<style>
/* Style the step */
div.step {
    overflow: hidden;
}

div.no_navigationr {
    pointer-events: none;
}

/* Style the buttons inside the step */
div.step button {
    background-color: inherit;
    float: left;
    border-radius: 50px;
    border-top: 1px solid #337AB7;
    border-bottom: 1px solid #337AB7;
    border-left: 1px solid #337AB7;
    border-right: 1px solid #337AB7;
    outline: none;
    cursor: pointer;
    padding: 12px 14px;
    margin: 0 auto;
    color: #337AB7;
}

.connecting-line {
    float: left;
    height: 2px;
    background: #e0e0e0;
    width: 50px;
    top: 50%;
    margin: 25px auto;
    z-index: 1;
}

.spacer {
    float: left;
    height: 1px;
    width: 25px;
}

.steplinks.disabled {
    cursor: not-allowed;
    background-color: #ddd;
    border-top: 1px solid #f1f1f1;
    border-bottom: 1px solid #f1f1f1;
    border-left: 1px solid #f1f1f1;
    border-right: 1px solid #f1f1f1;
    color: #555555;
}



/* Change background color of buttons on hover */
div.step button:hover {
    background-color: #23567F;
    color: #FFFFFF;
}

div.step button.disabled:hover {
    background-color: #ddd;
    color: #555555;
}

.steplinks.no_revert_wizard:hover,
.steplinks.no_revert_wizard {
    cursor: not-allowed;
    color: #337AB7;
    background-color: #FFFFFF;
}

/* Create an active/current steplink class */
div.step button.active {
    background-color: #337AB7;
    color: #FFFFFF;
    margin-bottom: 40;
}

/* Style the step content */
.stepcontent {
    /* display: none; */
    padding: 6px 12px;

}

@media (max-width: 360px) {
    .connecting-line {
        width: 2px !important;
    }

    .input-group {
        display: block;
    }
}
</style>