<template>
  <div class="container-fluid">
    <div class="tab">
      <button
        class="tablinks"
        :class="{ active: value == 'dashboard' }"
        @click="opentab('dashboard')"
      >
        <span v-html="$options.filters.icon('dashboard')"></span>
        <span translate>Dashboard</span>
      </button>
      <button
        v-if="preferences.enable_camera == 'true'"
        class="tablinks"
        :class="{ active: value == 'camera' }"
        @click="opentab('camera')"
        id="camtablink"
      >
        <span v-html="$options.filters.icon('camera')"></span>
        <span translate>Camera</span>
      </button>
      <button
        class="tablinks"
        :class="{ active: value == 'printer' }"
        @click="opentab('printer')"
      >
        <span v-html="$options.filters.icon('wrench')"></span>
        <span id="tab_printer_configuration">
          <span translate>Machine</span>
        </span>
      </button>

      <button
        class="tablinks"
        :class="{ active: value == 'settings' }"
        @click="opentab('settings')"
        id="settingtablink"
      >
        <span v-html="$options.filters.icon('tasks')"></span>
        <span translate>ESP3D</span>
      </button>
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
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  background-color: #f1f1f1;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}

/* Style the buttons inside the tab */
div.tab button {
  background-color: inherit;
  float: left;
  border-top: 1px solid #f1f1f1;
  border-bottom: 1px solid #f1f1f1;
  border-left: 1px solid #f1f1f1;
  border-right: 1px solid #f1f1f1;
  outline: none;
  cursor: pointer;
  padding: 12px 14px;
  transition: 0.3s;
  color: #337ab7;
}

/* Change background color of buttons on hover */
div.tab button:hover {
  background-color: #ddd;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
}

/* Create an active/current tablink class */
div.tab button.active {
  background-color: #ffffff;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #fff;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  color: #555555;
}

/* Style the tab content */
.tabcontent {
  /* display: none; */
  padding: 6px 12px;
}
</style>