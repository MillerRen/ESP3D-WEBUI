<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-6">
                <ControlsPanel />
            </div>
            <div class="col-sm-6">
                <GrblPanel />
            </div>
            <div class="col-sm-6">
                <TemperaturePanel />
            </div>
            <div class="col-sm-6">
                <SDPanel />
            </div>
            <div class="col-sm-6">
                <ConsolePanel />
            </div>
        </div>
    </div>
</template>

<script>
import ControlsPanel from "./ControlsPanel.vue"
import ConsolePanel from './ConsolePanel.vue'
import GrblPanel from "./GrblPanel.vue"
import SDPanel from "./SDPanel.vue"
import TemperaturePanel from "./TemperaturePanel.vue"

export default {
    components: {
        ControlsPanel,
        ConsolePanel,
        GrblPanel,
        SDPanel,
        TemperaturePanel
    }
}
</script>