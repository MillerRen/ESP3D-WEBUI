<template>
  <main id="app">
    <Navbar :fwData="fwData" />
    <Tabs v-model="mainTab" />
    <ControlsPanel v-if="mainTab=='dashboard'" />
    <SettingsPanel v-model="settings" v-if="mainTab=='esp3d'" @updateSettings="updateSettings" />
  </main>
</template>

<script>
import Navbar from "./components/Navbar.vue"
import Tabs from './components/Tabs.vue'
import API from "./apis"
import SettingsPanel from "./components/Settings.vue"
import ControlsPanel from "./components/ControlsPanel.vue"
// import Perference from "./components/Perference.vue"

export default {
  name: "App",
  components: {
    Navbar,
    Tabs,
    SettingsPanel,
    // Perference,
    ControlsPanel
  },
  data() {
    return {
      mainTab: 'dashboard',
      fwData: {
        ui_version: '2.1b75',
        fw_version: '',
        direct_sd: '',
        primary_sd: '',
        secondary_sd: '',
        ESP3D_authentication: '',
        async_webcommunication: '',
        websocket_port: '',
        websocket_ip: '',
        esp_hostname: '',
        target_firmware: '',
        grblaxis: ''
      },
      settings: null,
      perferences: null
    }
  },
  methods: {
    getFWInfo() {
      return API.getInstance()
        .getFWData()
        .then((response) => {
          Object.assign(this.fwData, response)
          document.title = response.esp_hostname || 'ESP3D WebUI'
          this.connectionModal.close()
        })
        .catch((err) => {
          this.connectionModal.message = err.message
          this.connectionModal.okText = "retry"
        })
    },
    getSettings () {
      return API.getInstance()
        .getSettings()
        .then(response => {
          this.settings = response
        })
        .catch(err => {
          this.$modal({
            title: 'Error',
            message: err.message
          })
        })
    },
    updateSettings (val) {
      return API.getInstance()
        .updateSettings(val)
    },
    getPerferences () {
      return API.getInstance()
        .getPerferences()
        .then(response => {
          this.perferences = response
        })
    }
  },
  mounted() {
    this.connectionModal = this.$modal({
      title: "Connecting",
      message: "Connecting...",
      closeable: false,
      autoClose: false,
      okText: "",
      cancelText: "",
    })
    this.connectionModal.$on("postive", () => {
      this.getFWInfo()
      this.connectionModal.message = "Connecting..."
    })
    this.getFWInfo()
      .then(() => {
        return this.getSettings()
      })
      .then(() => {
        return this.getPerferences()
      })
  },
}
</script>

<style>
</style>
