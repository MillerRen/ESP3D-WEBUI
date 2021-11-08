<template>
  <div class="container-fluid">
    
    <div class="tab">
      <ul class="nav nav-tabs">
      <li :class="{ active: value == 'dashboard' }">
        <a href=" " @click.prevent="opentab('dashboard')">
          <i class="glyphicon glyphicon-dashboard"></i>
        <span translate>Dashboard</span>
        </a>
      </li>
      <li v-if="preferences.enable_camera == 'true'" :class="{ active: value == 'camera' }">
        <a href=" " @click.prevent="opentab('camera')">
          <i class="glyphicon glyphicon-camera"></i>
        <span translate>Camera</span>
        </a>
      </li>
      <li :class="{ active: value == 'printer' }">
        <a href=" " @click.prevent="opentab('printer')">
          <i class="glyphicon glyphicon-wrench"></i>
          <span translate>Machine</span>
        </a>
      </li>
      <li :class="{ active: value == 'settings' }">
        <a href=" " @click.prevent="opentab('settings')">
         <i class="glyphicon glyphicon-tasks"></i>
        <span translate>ESP3D</span>
        </a>
      </li>
    </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      default: "dashboard",
    },
    preferences: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    opentab(tab) {
      this.$emit("input", tab);
    },
  },
};
</script>
<style>
/* Style the tab */
div.tab {
  overflow: hidden;
  padding: 10px;
  padding-bottom: 0;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  border-top: 1px solid #ccc;
  border-bottom: none;
  background-color: #f1f1f1;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}


/* Style the tab content */
.tabcontent {
  /* display: none; */
  padding: 6px 12px;
}
</style>