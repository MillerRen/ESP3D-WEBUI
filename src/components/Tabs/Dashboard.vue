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
          name: 'ControlsPanel',
          enable: true
        },
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
<style>
.grid-container {
  display: grid;
  grid-gap: 10px;
  padding: 5px;
  justify-content: center;
  grid-template-columns: auto auto auto auto auto;
}
.panel-flex-col {
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow:hidden;
}
.panel-flex-center {
  align-items: center;
  justify-content: center;
}
.item-flex-row {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.item-flex-row-wrap {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.panel-flex-row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.panel-flex-main {
  flex: 1;
}
@media only screen and (max-width: 800px) {
  .grid-container {
    grid-template-columns: 100%;
  }
}
@media (min-width: 801px) and (max-width: 1600px) {
  .grid-container {
    grid-template-columns: 50% 50%;
  }
}
@media (min-width: 1601px) and (max-width: 2400px) {
  .grid-container {
    grid-template-columns: 33% 34% 33%;
  }
}
@media (min-width: 2401px) and (max-width: 3200px) {
  .grid-container {
    grid-template-columns: 25% 25% 25% 25%;
  }
}
@media (min-width: 3201px) and (max-width: 4000px) {
  .grid-container {
    grid-template-columns: 20% 20% 20% 20% 20%;
  }
}
</style>
