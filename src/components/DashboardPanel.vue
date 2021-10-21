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
                <ConsolePanel />
            </div>
        </div>
    </div>
</template>

<script>
import ControlsPanel from "./ControlsPanel.vue"
import ConsolePanel from './ConsolePanel.vue'
import GrblPanel from "./GrblPanel.vue"

export default {
    components: {
        ControlsPanel,
        ConsolePanel,
        GrblPanel
    }
}
</script>