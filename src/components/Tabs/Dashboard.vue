<template>
  <div class="container-fluid">
    <div class="grid-container">
      <template v-for="panel in panels">
        <component :is="panel.name" v-if="panel.enable" :key="panel.name" />
      </template>
    </div>
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
        }
      ]
    }
  }
}
</script>
