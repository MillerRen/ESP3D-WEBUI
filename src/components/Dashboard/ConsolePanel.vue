<template>
  <div class="panel panel-default panel-flex-col">
    <div class="panel-heading">
      <b>
        <span v-t>Commands</span>
      </b>
      <button
        class="btn btn-primary btn-xs pull-right"
        @click="clearConsole()"
        v-t
      >
        Clear
      </button>
    </div>
    <div class="panel-body panel-flex-main">
      <pre
        ref="monitor"
        style="height: 350px"
        :style="{ scrollTop: scrollTop }"
      >
        <p
  v-for="(message,index) in messages"
  :key="index"
  :class="{ 'text-danger': message.type == 'error', 'text-warning': message.type == 'alarm' }"
  v-t
>{{ message.msg }}</p>
        </pre>
    </div>
    <div class="panel-footer">
      <div class="panel-flex-row">
        <form @submit.prevent="sendCustomCommand" class="form-inline">
          <div class="form-group">
            <div class="input-group input-group-sm">
              <input
                autocomplete="off"
                class="form-control w14"
                type="text"
                @keyup="onKeyup"
                v-model="cmd"
                placeholder="Send Command..."
                required
              />
              <span class="input-group-btn">
                <button type="submit" class="btn btn-success" v-t>Send</button>
              </span>
            </div>
          </div>
          <div class="form-group">
            &nbsp;&nbsp;
            <div class="checkbox">
              <label>
                <input
                  type="checkbox"
                  v-model="preferences.enable_autoscroll"
                />
                <span v-t>Autoscroll</span>
              </label>
            </div>
            &nbsp;&nbsp;
            <div class="checkbox">
              <label>
                <input
                  type="checkbox"
                  v-model="preferences.enable_verbose_mode"
                />
                <span v-t>Verbose mode</span>
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConsolePanel",
  inject: ["preferences", "Commands"],
  data() {
    return {
      cmd: "",
      messages: [],
    };
  },
  methods: {
    sendCustomCommand() {
      this.messages.push({
        type: 'input',
        msg: this.cmd
      })
      this.Commands.sendCommand(this.cmd).then(() => {
        this.cmd = "";
      });
    },
    clearConsole() {
      this.messages = [];
    },
    onKeyup() {},
    scrollTop() {
      if (!this.preferences.enable_autoscroll) return;
      this.$refs.monitor.scrollTop = this.$refs.monitor.scrollHeight;
    },
  },
  mounted() {
    this.$watch("messages", this.scrollTop);
    this.$root.$on("stream", (msg) => {
      this.messages.push(msg);
    });
  },
};
</script>