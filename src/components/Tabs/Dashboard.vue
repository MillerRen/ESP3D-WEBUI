<template>
    <div class="container-fluid">
        <div class="panel-flex-col">
            <div class="grid-container">
                <ControlsPanel
                    v-if="preferences.enable_control_panel == 'true'"
                    :preferences="preferences"
                    :fwData="fwData"
                />
                <GrblPanel
                    v-if="preferences.enable_grbl_panel == 'true'"
                    :preferences="preferences"
                    :fwData="fwData"
                />
                <TemperaturePanel
                    v-if="preferences.enable_temperature_panel == 'true'"
                    :fwData="fwData"
                />
                <ExtruderPanel
                    v-if="preferences.enable_extruder_panel == 'true'"
                    :preferences="preferences"
                    :fwData="fwData"
                />
                <SDPanel v-if="preferences.enable_files_panel == 'true'" :fwData="fwData" />
                <ConsolePanel v-if="preferences.enable_commands_panel == 'true'" :fwData="fwData" />
            </div>
        </div>
    </div>
</template>

<script>
import ControlsPanel from "../Dashboard/ControlsPanel.vue"
import ConsolePanel from '../Dashboard/ConsolePanel.vue'
import SDPanel from "../Dashboard/SDPanel.vue"

export default {
    components: {
        ControlsPanel,
        ConsolePanel,
        SDPanel,
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