<template>
  <div class="toaster">
    <div class="toaster-content">
      <div class="alert alert-warning" v-if="message">
      {{message}}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    message () {
      return this.$store.message
    }
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
</style>