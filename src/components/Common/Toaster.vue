<template>
  <div class="toaster">
    <div class="toaster-content" v-if="message">
      <button type="button" class="close" @click="close"><span>&times;</span></button>
      <div class="alert alert-warning">
      <span v-t>{{message}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      message: ''
    }
  },
  methods:{
    close() {
      this.message = ''
    }
  },
  mounted () {
    this.$root.$on('toast', (message) => {
      this.message = message
    })
  }
}
</script>

<style>
.toaster{
  position: fixed;
  height: 0;
  width: 100%;
  z-index: 9999;
}
.toaster-content{
  position: absolute;
  top: 15px;
  left: 50%;
  width: 300px;
  margin-left: -150px;
}
.toaster-content .alert {
  margin-bottom: 0;
  box-shadow: 0 0 12px grey;

}
.toaster-content progress {
  width: 100%;
}
</style>