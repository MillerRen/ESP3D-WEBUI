<template>
    <div id="commandsPanel" class="panel panel-default panel-flex-col">
        <div class="panel-heading">
            <b>
                <span translate>Commands</span>
            </b>
            <button
                id="clear_monitor_btn"
                class="btn btn-primary btn-xs pull-right"
                @click="clearConsole()"
                translate
            >Clear</button>
        </div>
        <div id="command-body" class="panel-body panel-flex-main">
            <pre id="cmd_content" style="height: 350px;" :style="{scrollTop:scrollTop}">{{messages}}</pre>
        </div>
        <div class="panel-footer">
            <div class="panel-flex-row">
                <div class="input-group">
                    <div class="input-group">
                        <form @submit.prevent="sendCustomCommand">
                            <div class="input-group">
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
                                    <button
                                        type="submit"
                                        class="btn btn-success"
                                        translate
                                    >Send</button>
                                </span>
                            </div>
                        </form>
                    </div>
                </div>&nbsp;&nbsp;
                <div class="form-group">
                    <div class="checkbox">
                        <label>
                            <input
                                type="checkbox"
                                onclick=" Monitor_check_autoscroll()"
                                id="monitor_enable_autoscroll"
                            />
                            <span translate>Autoscroll</span>
                        </label>
                    </div>
                </div>&nbsp;&nbsp;
                <div class="form-group" id="cmd_verbose">
                    <div class="checkbox">
                        <label>
                            <input
                                type="checkbox"
                                onclick=" Monitor_check_verbose_mode()"
                                id="monitor_enable_verbose_mode"
                            />
                            <span translate>Verbose mode</span>
                        </label>
                    </div>
                </div>
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
        messages () {
            return this.$store.messages.map(item=>item.msg).join('\n')
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
        onKeyup () {},
        scrollTop () {
            // console.log(this.messages)
        }
    },
    mounted () {
        this.$watch('messages', this.scrollTop)
    }
}
</script>