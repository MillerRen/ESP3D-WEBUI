<template>
  <main v-if="initialized">
    <Toaster />
    <Navbar v-model="mainTab" />
    <component :is="mainTab" />
  </main>
</template>

<script>
import Commands from './models/commands'
import Files from './models/files'

export default {
  name: 'App',
  provide () {
    return {
      fwData: this.fwData,
      preferences: this.preferences,
      Commands,
      Files
    }
  },
  data () {
    return {
      fwData: {},
      preferences: {},
      message: '',
      mainTab: "Dashboard",
      initialized: false,
      bootInfo: {
        error: '',
        step: NaN
      }
    }
  },
  methods: {
    // openDiableModal () {
    //   this.$store.enableAutoCheckPosition = false
    //   this.$store.autoCheckPosition()
    //   this.$modal({
    //     title: 'You are disconnected',
    //     message: 'Looks like you are connected from another place, so this page is now disconnected',
    //     okText: 'Please reconnect me',
    //     closeable: false,
    //     callback (val) {
    //       if(val) {
    //         location.reload()
    //       }
    //     }
    //   })
    // },

    login () {
      if (this.initialized) return
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

    boot () {
      this.bootInfo.step = 1
      this.connectModal = this.$modal(
        {
          title: 'Connecting ESP3D...',
          closeable: false,
          autoClose: false,
          data: this.bootInfo
        },
        'ConnectModal'
      )
      this.getFWData()
        .then(fwData => {
          this.bootInfo.step = 2
          Object.assign(this.fwData, fwData)
        })
        .then(() => {
          return this.getPreferences()
        })
        .then(preferences => {
          console.log(preferences.settings)
          this.bootInfo.step = 3
          Object.assign(this.preferences, preferences.settings)
          this.connectModal.close()
          this.initialized = true
        })
        .catch(err => {
          this.$bus.$emit('toast', err)
        })
    },
    getFWData () {
      return Commands.getFWData().then(fwData => {
        this.fwData = fwData
        if (fwData.ESP3D_authentication) {
          this.connectModal.close()
          this.login()
          return Promise.reject()
        }
      })
    },
    getPreferences () {
      return Files.getPreferences()
    }
  },
  mounted () {
    this.boot()
  }
}
</script>

<style>
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
