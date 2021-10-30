<template>
    <div class="container-fluid">
        <div class="panel-flex-col">
            <div class="grid-container">
                <ControlsPanel v-if="preferences.enable_control_panel=='true'" :preferences="preferences" />
                <GrblPanel v-if="preferences.enable_grbl_panel=='true'" :preferences="preferences" />
                <TemperaturePanel v-if="preferences.enable_temperature_panel=='true'" />
                <ExtruderPanel v-if="preferences.enable_extruder_panel=='true'" :preferences="preferences" />
                <SDPanel v-if="preferences.enable_files_panel=='true'" :fwData="fwData" />
                <ConsolePanel v-if="preferences.enable_commands_panel=='true'" :fwData="fwData" />
            </div>
        </div>
    </div>
</template>

<script>
import ControlsPanel from "../Dashboard/ControlsPanel.vue"
import ConsolePanel from '../Dashboard/ConsolePanel.vue'
import GrblPanel from "../Dashboard/GrblPanel.vue"
import SDPanel from "../Dashboard/SDPanel.vue"
import TemperaturePanel from "../Dashboard/TemperaturePanel.vue"
import ExtruderPanel from "../Dashboard/ExtruderPanel.vue"

export default {
    components: {
        ControlsPanel,
        ConsolePanel,
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