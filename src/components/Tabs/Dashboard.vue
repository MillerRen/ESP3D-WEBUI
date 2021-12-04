<template>
  <div class="container-fluid">
    <div class="grid-container">
      <template v-for="panel in panels">
        <component
          v-if="preferences[panel.enable]=='true'"
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
          panel: "ControlsPanel",
          enable: "enable_control_panel",
        },
        {
          panel: "GrblPanel",
          enable: "enable_grbl_panel",
        },
        {
          panel: "TemperaturePanel",
          enable: "enable_temperatures_panel",
        },
        {
          panel: "ExtruderPanel",
          enable: "enable_extruder_panel",
        },
        {
          panel: "SDPanel",
          enable: "enable_files_panel",
        },
        {
          panel: "ConsolePanel",
          enable: "enable_commands_panel",
        },
      ],
    };
  },
};
</script>