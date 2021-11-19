<template>
    <div  class="panel panel-default panel-flex-col">
        <div class="panel-heading">
            <b>
                <span v-t>Commands</span>
            </b>
            <button
                
                class="btn btn-primary btn-xs pull-right"
                @click="clearConsole()"
                translate
            >Clear</button>
        </div>
        <div  class="panel-body panel-flex-main">
            <pre ref="monitor" style="height: 350px;" :style="{ scrollTop: scrollTop }">{{ messages }}</pre>
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
                                translateph
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
                                <input type="checkbox" v-model="preferences.enable_autoscroll" />
                                <span v-t>Autoscroll</span>
                            </label>
                        </div>&nbsp;&nbsp;
                        <div class="checkbox">
                            <label>
                                <input type="checkbox" v-model="preferences.enable_verbose_mode" />
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
    data() {
        return {
            cmd: ''
        }
    },
    computed: {
        preferences() {
            return this.$store.preferences
        },
        messages() {
            return this.$store.messages.map(item => item.msg).join('\n')
        }
    },
    methods: {
        sendCustomCommand() {
            this.$store.sendCustomCommand(this.cmd)
                .then(() => {
                    this.cmd = ''
                })
        },
        clearConsole() {
            this.$store.clearMessages()
        },
        onKeyup() { },
        scrollTop() {
            if (!this.preferences.enable_autoscroll) return
            this.$refs.monitor.scrollTop = this.$refs.monitor.scrollHeight
        }
    },
    mounted() {
        this.$watch('messages', this.scrollTop)
        // this.$refs.monitor
    }
}
</script>