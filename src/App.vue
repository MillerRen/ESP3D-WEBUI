<template>
  <main id="app">
    <Navbar />
  </main>
</template>

<script>
import Navbar from "./components/Navbar.vue"
import API from "./apis"

export default {
  name: "App",
  components: {
    Navbar,
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
