<template>
  <main v-if="initialized">
    <Toaster />
    <Navbar :fwData="fwData" />
    <Tabs v-model="mainTab" :fwData="fwData" />
    <br />
    <ConfigPanel v-if="mainTab == 'printer'" :fwData="fwData" />
    <DashboardPanel
      v-if="mainTab == 'dashboard'"
      :fwData="fwData"
      :preferences="preferences"
    />
    <CameraPanel v-if="mainTab == 'camera'" :fwData="fwData" />
    <UpdatePanel v-if="mainTab == 'update'" :fwData="fwData" />
    <SettingsPanel v-if="mainTab == 'settings'" :fwData="fwData" />
  </main>
</template>

<script>
import Navbar from './components/Layout/Navbar.vue'
import Tabs from './components/Layout/Tabs.vue'
import SettingsPanel from './components/Tabs/Settings.vue'
import ConfigPanel from './components/Tabs/Config.vue'
import CameraPanel from './components/Tabs/Camera.vue'
import DashboardPanel from './components/Tabs/Dashboard.vue'
import Toaster from './components/Common/Toaster.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Tabs,
    ConfigPanel,
    DashboardPanel,
    CameraPanel,
    SettingsPanel,
    Toaster
  },
  data () {
    return {
      mainTab: 'dashboard',
      initialized: false
    }
  },
  computed: {
    fwData () {
      return this.$store.fwData
    },
    preferences () {
      return this.$store.preferences
    },
    disableUI () {
      return this.$store.disableUI
    }
  },
  watch: {
    disableUI () {
      this.openDiableModal()
    }
  },
  methods: {
    openDiableModal () {
      this.$store.enableAutoCheckPosition = false
      this.$store.autoCheckPosition()
      this.$modal({
        title: 'You are disconnected',
        message: 'Looks like you are connected from another place, so this page is now disconnected',
        okText: 'Please reconnect me',
        closeable: false,
        callback (val) {
          if(val) {
            location.reload()
          }
        }
      })
    },
    // boot step 1
    getFWData () {
      this.connectModal.data.bootStep = 1
      this.connectModal.data.error = false
      this.connectModal.okText = ''

      return this.$store
        .getFWData()
        .then(fwData => {
          console.log('Fw identification:', fwData)
          document.title = fwData.esp_hostname
          if (fwData.ESP3D_authentication) {
            this.checkLogin()
            return
          }

          this.getSettings()
        })
        .catch(err => {
          this.connectModal.data.error = true
          this.connectModal.okText = 'Retry'
          console.log(err)
        })
    },
    checkLogin () {
      return this.$store
        .checkLogin()
        .then(user => {
          if (user.need_auth) {
            this.connectModal.close()
            this.login()
            return
          }
          this.getSettings()
        })
        .catch(err => {
          console.log(err)
          this.login()
        })
    },
    login () {
      var that = this
      that.loginModal = this.$modal(
        {
          title: 'Identification requested',
          events: {
            success () {
              that.loginModal.close()
              that.boot()
            }
          }
        },
        'LoginModal'
      )
    },
    // boot step 2
    getSettings () {
      this.connectModal.data.bootStep = 2
      return this.$store
        .getSettings()
        .then(() => {
          this.getPreferences()
        })
        .catch(err => {
          this.connectModal.message = err.message
        })
    },
    // boot step 3
    getPreferences () {
      this.connectModal.data.bootStep = 3
      return this.$store.getPreferences().then(() => {
        this.connectModal.data.bootStep = 4
        this.connectModal.close()
        this.initialized = true
        this.$store.startSocket()
        this.$store.autoCheckPosition()
        this.$store.getMacros()
      })
    },
    boot () {
      var that = this
      this.connectModal = this.$modal(
        {
          title: 'Connecting ESP3D...',
          closeable: false,
          autoClose: false,
          data: {
            bootStep: 0,
            error: false
          },
          callback () {
            that.getFWData()
          }
        },
        'ConnectModal'
      )
      this.getFWData()
    }
  },
  mounted () {
    this.boot()
  }
}
</script>

<style>
.loadertxt {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: 15px 10px;
  text-align: center;
  z-index: 2;
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
  content: '';
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

@media (min-width: 1600px) {
  .fixedbutton {
    width: 6em !important;
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

.btn-group:hover .dropdown-menu {
  display: block;
}

/* 滚动槽 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.06);
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.08);
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.12);
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
}
</style>
