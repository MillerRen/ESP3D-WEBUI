<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-6">
                <ControlsPanel />
            </div>
            <div class="col-sm-6">
                <GrblPanel />
            </div>
            <!-- <div class="col-sm-6">
                <TemperaturePanel />
            </div> -->
            <!-- <div class="col-sm-6">
                <ExtruderPanel />
            </div> -->
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
// import TemperaturePanel from "../Dashboard/TemperaturePanel.vue"
// import ExtruderPanel from "../Dashboard/ExtruderPanel.vue"

export default {
    components: {
        ControlsPanel,
        // ConsolePanel,
        GrblPanel,
        SDPanel,
        // TemperaturePanel,
        // ExtruderPanel
    },
    props: {
        fwData: {
            type: Object,
            default () {
                return {}
            }
        }
    }
}
</script>