<template>
    <div class="container-fluid">
            <div class="grid-container">
                <!-- <ControlsPanel
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
                <ConsolePanel v-if="preferences.enable_commands_panel == 'true'" :fwData="fwData" /> -->
            </div>
            <template v-for="panel in panels">
                <component :is="panel.name" v-if="panel.enable" />
            </template>
    </div>
</template>

<script>

export default {
    name: 'Dashboard',
    inject: ['fwData', 'preferences'],
    data () {
        return {
            panels: [
                {
                    name: 'GrblPanel',
                    enable: true
                },
                 {
                    name: 'TemperaturePanel',
                    enable: true
                },
                 {
                    name: 'ExtruderPanel',
                    enable: true
                },
                 {
                    name: 'SDPanel',
                    enable: true
                },
                 {
                    name: 'ConsolePanel',
                    enable: true
                },
            ]
        }
    }
}
</script>