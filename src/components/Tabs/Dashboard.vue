<template>
    <div class="container-fluid">
        <div class="panel-flex-col">
            <div class="grid-container">
                <ControlsPanel :preferences="preferences" />
                <GrblPanel v-if="isGrbl" :preferences="preferences" />
                <TemperaturePanel v-if="!isGrbl" />
                <ExtruderPanel v-if="!isGrbl" :preferences="preferences" />
                <SDPanel :fwData="fwData" />
                <ConsolePanel />
            </div>
        </div>
    </div>
</template>

<script>
import ControlsPanel from "../Dashboard/ControlsPanel.vue"
// import ConsolePanel from '../Dashboard/ConsolePanel.vue'
import GrblPanel from "../Dashboard/GrblPanel.vue"
import SDPanel from "../Dashboard/SDPanel.vue"
import TemperaturePanel from "../Dashboard/TemperaturePanel.vue"
import ExtruderPanel from "../Dashboard/ExtruderPanel.vue"

export default {
    components: {
        ControlsPanel,
        // ConsolePanel,
        GrblPanel,
        SDPanel,
        TemperaturePanel,
        ExtruderPanel
    },
    props: {
        fwData: {
            type: Object,
            default() {
                return {}
            }
        },
        preferences: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    computed: {
        isGrbl() {
            return this.fwData.target_firmware == 'grbl' || this.fwData.target_firmware == 'grbl-embedded'
        }
    }
}
</script>