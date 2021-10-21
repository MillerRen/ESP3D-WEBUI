<template>
  <main id="app">
    <Navbar />
    <Tabs />
    <Settings />
  </main>
</template>

<script>
import Navbar from "./components/Navbar.vue"
import Tabs from './components/Tabs.vue'
import API from "./apis"
import Settings from "./components/Settings.vue"

export default {
  name: "App",
  components: {
    Navbar,
    Tabs,
    Settings
  },
  data() {
    return {
      fwData: {
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
    }
  },
  methods: {
    getFWInfo() {
      return API.getInstance()
        .getFWData()
        .then((response) => {
          this.fwData = response
          document.title = response.esp_hostname || 'ESP3D WebUI'
          this.connectionModal.close()
        })
        .catch((err) => {
          this.connectionModal.message = err.message
          this.connectionModal.okText = "retry"
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
  },
}
</script>

<style>
</style>
