<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-6">
                <ControlsPanel :preferences="preferences" />
            </div>
            <div v-if="isGrbl" class="col-sm-6">
                <GrblPanel :preferences="preferences" />
            </div>
            <div v-if="!isGrbl" class="col-sm-6">
                <TemperaturePanel />
            </div>
            <div v-if="!isGrbl" class="col-sm-6">
                <ExtruderPanel :preferences="preferences" />
            </div>
            <div class="col-sm-6">
                <SDPanel :fwData="fwData" />
            </div>
            <!-- <div class="col-sm-6">
                <ConsolePanel />
            </div> -->
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
            default () {
                return {}
            }
        },
        preferences: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    computed: {
        isGrbl () {
            return this.fwData.target_firmware=='grbl'||this.fwData.target_firmware=='grbl-embedded'
        }
    }
}
</script>