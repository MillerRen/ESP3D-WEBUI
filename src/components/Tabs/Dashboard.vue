<template>
  <div class="container-fluid">
    <div class="grid-container">
      <template v-for="panel in panels">
        <component
          v-if="preferences[panel.enable] == 'true'&&panel.show"
          :key="panel.panel"
          :is="panel.panel"
        ></component>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["fwData", "preferences"],
  data() {
    return {
      panels: [
        {
          show: true,
          panel: "ControlsPanel",
          enable: "enable_control_panel",
        },
        {
          show:
            this.fwData.target_firmware == "grbl" ||
            this.fwData.target_firmware == "grbl-embedded",
          panel: "GrblPanel",
          enable: "enable_grbl_panel",
        },
        {
          show:
            this.fwData.target_firmware == "marlin" ||
            this.fwData.target_firmware == "marlin-embedded",
          panel: "TemperaturePanel",
          enable: "enable_temperatures_panel",
        },
        {
          show:
            this.fwData.target_firmware == "marlin" ||
            this.fwData.target_firmware == "marlin-embedded",
          panel: "ExtruderPanel",
          enable: "enable_extruder_panel",
        },
        {
          show: true,
          panel: "SDPanel",
          enable: "enable_files_panel",
        },
        {
          show: true,
          panel: "ConsolePanel",
          enable: "enable_commands_panel",
        },
      ],
    };
  },
};
</script>