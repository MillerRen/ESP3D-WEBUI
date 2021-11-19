<template>
    <div class="modal-body">
        <span v-if="errmsg">{{ errmsg }}</span>
        <table class="table" v-if="status">
            <tr v-for="(s,index) in status" :key="index">
                <th>{{ s[0] }}:</th>
                <td>
                    <strong class="text-info">{{ s[1] }}</strong>
                </td>
            </tr>
        </table>

        <div class="clearfix">
            <div style="float:right; padding-right:20px;">
                <table>
                    <tr>
                        <td>
                            <div class="loader" v-if="loading"></div>
                        </td>
                        <td>
                            <button class="btn btn-warning" @click="$emit('cancel')" v-t>Close</button>
                        </td>
                        <td>
                            <span class>&nbsp;&nbsp;</span>
                        </td>
                        <td>
                            <button
                                class="btn btn-primary"
                                
                                @click="getESPStatus()"
                            >
                                <i class="glyphicon glyphicon-repeat"></i>
                            </button>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loading: false,
            errmsg: ''
        }
    },
    computed: {
        status() {
            return this.$store.status
        }
    },
    methods: {
        getESPStatus() {

            this.loading = true
            return this.$store.getESPStatus()
                .then(() => {
                    this.loading = false
                })
                .catch(err => {
                    this.loading = false
                    this.errmsg = err
                })
        }
    },
    mounted() {
        this.getESPStatus()
    }
}
</script>