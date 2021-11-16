<template>
    <div  class="tabcontent">
        <center>
            <br />
            <form class="form-inline">
                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-addon">@</div>
                        <input
                            type="text"
                            class="form-control w50"
                            v-model="preferences.camera_address"
                            @keyup.enter="loadFrame"
                            translateph
                            placeholder="Camera address"
                        />
                    </div>
                </div>
                <button type="button" class="btn btn-primary" @click="loadFrame">
                    <i class="glyphicon glyphicon-share-alt"></i>
                </button>
                <!-- <button type="button" class="btn btn-info" onclick="camera_GetAddress();">
                    <i class="glyphicon glyphicon-save"></i>
                </button> -->
                <button type="button" class="btn btn-warning" @click="saveCameraAdress();">
                    <i class="glyphicon glyphicon-open"></i>
                </button>
            </form>
            <br />
            <table >
                <tr>
                    <td width="100%">
                        <div class="embed-responsive embed-responsive-16by9">
                            <iframe class="embed-responsive-item" ref="cameraFrame"></iframe>
                        </div>
                    </td>
                    <td valign="top">
                        <button
                            type="button"
                            @click="deattachCamera"
                            v-if="preferences.camera_address"
                        >
                            <span>
                                <svg width="1.3em" height="1.2em" viewBox="0 0 1300 1200">
                                    <g transform="translate(50,1200) scale(1, -1)">
                                        <path
                                            fill="currentColor"
                                            d="M750 1200h400q21 0 35.5 -14.5t14.5 -35.5v-400q0 -21 -10.5 -25t-24.5 10l-109 109l-312 -312q-15 -15 -35.5 -15t-35.5 15l-141 141q-15 15 -15 35.5t15 35.5l312 312l-109 109q-14 14 -10 24.5t25 10.5zM456 900h-156q-41 0 -70.5 -29.5t-29.5 -70.5v-500 q0 -41 29.5 -70.5t70.5 -29.5h500q41 0 70.5 29.5t29.5 70.5v148l200 200v-298q0 -165 -93.5 -257.5t-256.5 -92.5h-400q-165 0 -257.5 92.5t-92.5 257.5v400q0 165 92.5 257.5t257.5 92.5h300z"
                                        />
                                    </g>
                                </svg>
                            </span>
                        </button>
                    </td>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                </tr>
            </table>
        </center>
    </div>
</template>

<script>
export default {
    computed: {
        preferences() {
            return this.$store.preferences
        }
    },
    methods: {
        loadFrame() {
            this.$refs.cameraFrame.src = this.preferences.camera_address
        },
        deattachCamera() {
            this.$refs.cameraFrame.src = ''
            window.open(this.preferences.camera_address)
        },
        saveCameraAddress() {
            this.$store.updatePreferences(this.preferences)
        }
    }
}
</script>