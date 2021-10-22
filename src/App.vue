<template>
  <main id="app">
    <Navbar :fwData="fwData" @showModal="showModal" />
    <br />
    <Tabs v-model="mainTab" />
    <br />
    <ConfigPanel v-if="mainTab == 'printer'" />
    <DashboardPanel v-if="mainTab == 'dashboard'" />
    <CameraPanel v-if="mainTab == 'camera'" />
    <SettingsPanel
      v-if="mainTab == 'esp3d'"
      v-model="settings"
      @updateSettings="updateSettings"
    />
  </main>
</template>

<script>
import API from "./apis";

import Navbar from "./components/Layout/Navbar.vue";
import Tabs from "./components/Layout/Tabs.vue";
import SettingsPanel from "./components/Tabs/Settings.vue";
import ConfigPanel from "./components/Tabs/Config.vue";
import CameraPanel from "./components/Tabs/Camera.vue";
import DashboardPanel from "./components/Tabs/Dashboard.vue";

// import StatusModal from "./components/Modals/StatusModal.vue"
import SetupModal from "./components/Modals/SetupModal.vue";
import CreditsModal from "./components/Modals/CreditsModal.vue";
import LoginModal from "./components/Modals/LoginModal.vue";
import PreferenceModal from "./components/Modals/PreferenceModal.vue";
import PasswordModal from "./components/Modals/PasswordModal.vue";
// import SPIFFSModal from "./components/Modals/SPIFFSModal.vue"
// import UpdateModal from "./components/Modals/UpdateModal.vue"
// import WiFiModal from "./components/Modals/WiFiModal.vue"

export default {
  name: "App",
  components: {
    Navbar,
    Tabs,
    SettingsPanel,
    ConfigPanel,
    DashboardPanel,
    CameraPanel,
    // StatusModal,
    // SPIFFSModal,
    // UpdateModal,
    // WiFiModal
  },
  data() {
    return {
      mainTab: "dashboard",
      fwData: {
        ui_version: "2.1b75",
        fw_version: "",
        direct_sd: "",
        primary_sd: "",
        secondary_sd: "",
        ESP3D_authentication: "",
        async_webcommunication: "",
        websocket_port: "",
        websocket_ip: "",
        esp_hostname: "",
        target_firmware: "",
        grblaxis: "",
      },
      settings: null,
      preferences: null,
      status: "",
      wifiList: [],
    };
  },
  methods: {
    getFWInfo() {
      return API.getInstance()
        .getFWData()
        .then((response) => {
          Object.assign(this.fwData, response);
          document.title = response.esp_hostname || "ESP3D WebUI";
          this.connectionModal.close();
          return response;
        })
        .catch((err) => {
          this.connectionModal.message = err.message;
          this.connectionModal.okText = "retry";
        });
    },
    getSettings() {
      return API.getInstance()
        .getSettings()
        .then((response) => {
          this.settings = response;
          return response
        })
        .catch((err) => {
          this.$modal({
            title: "Error",
            message: err.message,
          });
        });
    },
    updateSettings(val) {
      return API.getInstance().updateSettings(val);
    },
    getPreferences() {
      return API.getInstance()
        .getPreferences()
        .then((response) => {
          this.preferences = response[0];
        });
    },
    getStatus() {
      return API.getInstance()
        .getStatus()
        .then((response) => {
          this.status = response;
        });
    },
    scanWifi() {
      return API.getInstance()
        .scanWifi()
        .then((response) => {
          this.wifiList = response;
        });
    },
    login(data) {
      return API.getInstance().login(data);
    },
    showModal(name) {
      let method = `show${name}Modal`;
      if (!this[method]) {
        throw new Error(`Unknown method: ${method}`);
      }
      this[method].call(this, name);
    },
    showCreditsModal() {
      this.$modal(
        {
          title: "Credits",
        },
        CreditsModal
      );
    },
    showPreferenceModal() {
      this.$modal(
        {
          title: "Perference",
          data: {
            preferences: this.preferences
          },
          okText: '',
          cancelText: '',
          events: {
            update(data) {
              console.log(data);
            },
          },
        },
        PreferenceModal
      );
    },
    showSetupModal() {
      this.$modal(
        {
          title: "Setup",
          data: this.preferences,
          events: {
            update(data) {
              console.log(data);
            },
          },
        },
        SetupModal
      );
    },
    showLoginModal() {
      let that = this
      return new Promise((resolve, reject) => {
        this.$modal(
          {
            title: "Login",
            size: 'sm',
            okText:'',
            cancelText:'',
            closeable:false,
            events: {
              update(data) {
                that.login(data)
                  .then(() => {
                    resolve(data);
                  })
                  .catch((err) => {
                    reject(err);
                  });
              },
            },
          },
          LoginModal
        );
      });
    },
    showPasswordModal() {
      this.$modal(
        {
          title: "Change Password",
          data: this.preferences,
          events: {
            update(data) {
              console.log(data);
            },
          },
        },
        PasswordModal
      );
    },
  },
  mounted() {
    this.connectionModal = this.$modal({
      title: "Connecting",
      message: "Connecting...",
      closeable: false,
      autoClose: false,
      okText: "",
      cancelText: "",
    });
    this.connectionModal.$on("postive", () => {
      this.getFWInfo();
      this.connectionModal.message = "Connecting...";
    });
    this.getFWInfo()
      .then((fwData) => {
        if (!fwData) return;
        if (fwData.ESP3D_authentication) {
          return this.showLoginModal(); // should return new promise
        }
        return fwData;
      })
      .then((fwData) => {
        if (!fwData) return;
        return this.getSettings();
      })
      .then((settings) => {
        if (!settings) return;
        return this.getPreferences();
      });
  },
};
</script>

<style>
body {
  font-family: "Arial", sans-serif;
  font-size: 14px;
}

.form_control {
  height: 34px !important;
}
.fixedbutton {
  width: 8em !important;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.input-min {
  min-width: 8em;
}

.ico_feedback {
  right: 1em !important;
  top: 3px;
  z-index: 10 !important;
}

.no_overflow {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.hide_it {
  display: none;
}

.not_visible {
  visibility: hidden;
}

.no_margin {
  margin: 0 !important;
  line-height: 0;
}

.noshowonlowrestab {
}

.btn-svg {
  padding: 4px 0px 0px 0px !important;
  width: 34px !important;
  height: 34px !important;
}

.btn-svg-no_pad {
  padding: 0px 0px 0px 0px !important;
  height: 34px !important;
}

.noshowonlowres {
  display: inline-block;
}

.loadertxt {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: 15px 10px;
  text-align: center;
  z-index: 2;
}

.topmarginspace {
  margin-top: 20px;
}

.loader {
  border: 4px solid #f3f3f3;
  /* Light grey */
  border-top: 4px solid #3498db;
  /* Blue */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
  z-index: 1;
}

.loader_centered {
  background-color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: auto;
}

@-webkit-keyframes pulse {
  50% {
    background: red;
  }
}

@keyframes pulse {
  50% {
    background: red;
  }
}

.loader-pulse {
  position: relative;
  width: 0.25em;
  height: 0.4em;
  background: rgba(255, 0, 0, 0.2);
  -webkit-animation: pulse 750ms infinite;
  animation: pulse 750ms infinite;
  -webkit-animation-delay: 250ms;
  animation-delay: 250ms;
}

.loader-pulse:before,
.loader-pulse:after {
  content: "";
  position: absolute;
  display: block;
  height: 0.4em;
  width: 0.25em;
  background: rgba(255, 0, 0, 0.2);
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  -webkit-animation: pulse 750ms infinite;
  animation: pulse 750ms infinite;
}

.loader-pulse:before {
  left: -0.5em;
}

.loader-pulse:after {
  left: 0.5em;
  -webkit-animation-delay: 500ms;
  animation-delay: 500ms;
}

.panel-min-width {
  min-width: 350px;
}

.panel-max-height {
  max-height: 410px;
}

.panel-footer-height {
  min-height: 4em;
}

.panel-scroll {
  overflow-y: scroll;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes pulse {
  50% {
    background: red;
  }
}

@keyframes pulse {
  50% {
    background: red;
  }
}

.list-group-hover:hover {
  background-color: #f5f5f5;
}

.table-borderless tbody tr td,
.table-borderless tbody tr th,
.table-borderless thead tr td,
.table-borderless thead tr th,
.table-borderless tfoot tr th,
.table-borderless tfoot tr td {
  border: none;
}

.panel-footer1 {
  padding: 10px 15px;
  color: #31708f;
  background-color: #f5f5f5;
  border-color: #dddddd;
  border-top: 1px solid #dddddd;
}

.filetext {
  display: block;
  width: 12em;
  min-width: 12em;
  max-width: 12em;
  height: 34px;
  padding: 6px 6px;
  font-size: 14px;
  color: #555555;
  background-color: #ffffff;
  background-image: none;
  text-align: left;
  border: 0px solid #ffffff;
}

.wauto {
  width: auto !important;
}

.w4 {
  width: 4em !important;
}

.w5 {
  width: 5em !important;
}

.w6 {
  width: 6em !important;
}

.w8 {
  width: 8em !important;
}

w14 {
  width: 14em !important;
}

w25 {
  width: 25em !important;
}

.w50 {
  width: 50em !important;
}

@media (max-width: 360px) {
  .container-fluid {
    min-width: 350px;
    margin-left: -10px;
    margin-right: -10px;
  }

  .panel {
    margin-left: -17px;
    margin-right: -13px;
  }

  .pull-left,
  .pull-right {
    float: unset !important;
  }

  noshowonlowrestab,
  .noshowonlowres {
    display: none;
  }
}

@media (min-width: 361px) and (max-width: 640px) {
  .container-fluid {
    min-width: 350px;
    margin-left: -10px;
    margin-right: -10px;
  }

  .panel {
    margin-left: -17px;
    margin-right: -13px;
  }

  noshowonlowrestab,
  .noshowonlowres {
    display: none;
  }
}

.grid-container {
  display: inline-grid;
  grid-gap: 10px;
  padding: 10px;
  grid-template-columns: auto auto auto auto auto;
}

.position-container {
  margin-left: -10px;
  display: inline-grid;
  grid-gap: 10px;
  padding: 10px;
  grid-template-columns: auto auto auto auto;
}

.position_text {
  font-size: 16px;
  font-weight: bold;
}

.macro-container {
  display: inline-grid;
  grid-gap: 10px;
  padding: 10px;
  grid-template-columns: auto auto;
}

.panel-flex-col {
  display: flex;
  flex-direction: column;
  width: 100%;
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

@media only screen and (max-width: 1200px) {
  .macro-container {
    grid-template-columns: auto auto auto;
  }
}

@media only screen and (max-width: 800px) {
  .grid-container {
    grid-template-columns: 100%;
  }
}

@media (min-width: 800px) and (max-width: 1350px) {
  .fixedbutton {
    width: 6em !important;
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

@media (min-width: 1600px) {
  .fixedbutton {
    width: 6em !important;
  }
}

@media (min-width: 641px) {
  .container-fluid {
    min-width: 350px;
  }
}

.status_text {
  font-size: 25px;
  letter-spacing: 2px;
  word-spacing: 2px;
  color: #000000;
  font-weight: 900;
  text-decoration: none;
  font-style: normal;
  font-variant: small-caps slashed-zero;
  text-transform: none;
}

.td_center {
  align: center;
  valign: middle;
  text-align: center;
}

.button_txt {
}
</style>
