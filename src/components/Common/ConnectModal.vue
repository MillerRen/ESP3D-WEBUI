<template>
  <div class="connect-modal">
    <center>
      <span>
        <span v-t>Please wait...</span>
        <progress :value="bootProgress" max="100"></progress>
      </span>
      <br />
      <br />
      <span v-if="error" class="text-danger">
        <span v-t>Connection failed! is your FW correct?</span>
      </span>
    </center>
  </div>
</template>

<script>
export default {
  name: 'ConnectModal',
  props: {
      step: {
          type: Number
      },
      error: {
          type: String
      }
  },
  computed: {
    bootProgress () {
      return Math.round((this.step * 100) / 3)
    }
  }
}
</script>
