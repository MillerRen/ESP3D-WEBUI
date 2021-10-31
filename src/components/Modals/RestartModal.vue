<template>
    <table>
        <tr>
            <td>
                <progress :value="percent" max="100"></progress>
            </td>
            <td>&nbsp;</td>
            <td>
                <span id="restartmsg" translate>Restarting, please wait....&nbsp;</span>
            </td>
            <td>
                <button v-if="errmsg" @click="restartESP" class="btn btn-primary btn-sm">Retry</button>
            </td>
        </tr>
        <tr>
            <td v-if="errmsg" colspan="3">
                <span class="text-danger">{{ errmsg }}</span>
            </td>
        </tr>
    </table>
</template>

<script>
const TOTAL_WAITING_TIMES = 40
export default {
    data() {
        return {
            process: 0,
            errmsg: ''
        }
    },
    computed: {
        percent() {
            return Math.round(this.process * 100 / TOTAL_WAITING_TIMES)
        }
    },
    methods: {
        count() {
            this.process = 1
            var timer = setInterval(() => {
                this.process++
                if (this.process > TOTAL_WAITING_TIMES) {
                    location.reload()
                    clearInterval(timer)
                    this.$emit('success')
                }
            }, 1000)
        },
        restartESP() {
            this.errmsg = ''
            this.$store.restartESP()
                .then(this.count)
                .catch(err => {
                    this.errmsg = err
                })
        }
    },
    mounted() {
        this.restartESP()
    }
}
</script>