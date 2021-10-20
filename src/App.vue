<template>
  <main id="app">
    <Navbar />
  </main>
</template>

<script>
import Navbar from "./components/Navbar.vue"
import API from './apis'

export default {
  name: 'App',
  components: {
    Navbar
  },
  data () {
    return {
      fw: {}
    }
  },
  methods: {
    getFWInfo () {
      return API.getInstance()
      .command('[ESP800]')
      .then((response) => {
        this.fw = response
        this.connectionModal.close()
      })
      .catch(err => {
        console.log(this.connectionModal, err)
        this.connectionModal.message = err.message
        this.connectionModal.okText = 'retry'
      })
    }
  },
  mounted () {
    this.connectionModal = this.$modal({
      title: 'Connecting',
      message: 'Connecting...',
      closeable: false,
      autoClose: false,
      okText: '',
      cancelText: ''
    })
    this.connectionModal.$on('postive', () => {
      this.getFWInfo()
      this.connectionModal.message = 'Connecting...'
    })
    this.getFWInfo()
  }
}
</script>

<style>
</style>
