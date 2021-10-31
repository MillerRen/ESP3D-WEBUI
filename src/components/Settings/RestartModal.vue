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
export default {
    data() {
        return {
            errmsg: ''
        }
    },
    computed: {
        percent() {
            return this.$store.restartingProgress
        }
    },
    methods: {
        restartESP() {
            this.errmsg = ''
            this.$store.restartESP()
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