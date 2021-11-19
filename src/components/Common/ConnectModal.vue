<template>
    <center>
        <span >
            <span v-t>Please wait...</span>
            <progress :value="bootProgress" max="100"></progress>
        </span>
        <br>
        <br>
        <span v-if="error" class="text-danger">
            <span v-t>Connection failed! is your FW correct?</span>
        </span>
    </center>
</template>

<script>
import { TOTAL_BOOT_STEPS } from "../../constants"
export default {
    props: {
        bootStep: {
            type: Number,
            default: 0
        },
        error: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        bootProgress() {
            return Math.round(this.bootStep * 100 / TOTAL_BOOT_STEPS)
        }
    }
}
</script>