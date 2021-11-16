<template>
    <div  class="tabcontent">
        <center>
            <h2>
                <span translate>ESP3D Settings</span>
            </h2>
            <table>
                <tr>
                    <td style="padding:10px">
                        <button type="button" class="btn btn-info" @click="showStatusModal">
                            <i class="glyphicon glyphicon-th-list"></i>
                        </button>
                    </td>
                    <td style="padding:10px">
                        <button type="button" class="btn btn-success" @click="showSPIFFSModal">
                            <i class="glyphicon glyphicon-folder-open"></i>
                        </button>
                    </td>
                    <td style="padding:10px">
                        <button
                            
                            type="button"
                            class="btn btn-warning"
                            @click="showUpdateModal"
                        >
                            <i class="glyphicon glyphicon-cloud-upload"></i>
                        </button>
                    </td>
                    <td style="padding:10px">
                        <button
                            type="button"
                            
                            class="btn btn-danger"
                            @click="restartESP();"
                        >
                            <i class="glyphicon glyphicon-off"></i>
                        </button>
                    </td>
                    <td style="padding:10px">
                        <button
                            type="button"
                            
                            class="btn btn-primary"
                            @click="refreshSettings()"
                        >
                            <i class="glyphicon glyphicon-refresh"></i>
                        </button>
                    </td>
                </tr>
            </table>
            <span ></span>
            <hr />
            <Settings ref="settings" />
        </center>
    </div>
</template>

<script>
import Settings from "../Settings/Settings.vue"
import SPIFFSModal from "../Settings/SPIFFSModal.vue"
import UpdateModal from "../Settings/UpdateModal.vue"
import StatusModal from "../Settings/StatusModal.vue"
import RestartModal from "../Settings/RestartModal.vue"

export default {
    components: {
        Settings
    },
    data() {
        return {
            tab: 'settings'
        }
    },
    methods: {
        refreshSettings() {
            this.$refs.settings.refreshSettings()
        },
        restartESP() {
            var that = this
            var modal = this.$modal({
                title: 'Please Confirm',
                message: 'Restart ESP3D',
                okText: 'OK',
                cancelText: 'Cancel',
                callback(ok) {
                    if (ok) {
                        that.restarting()
                        modal.close()
                    }
                }
            })
        },
        restarting() {
            this.$modal({
                title: 'Restarting ESP3D',
                closeable: false,
            }, RestartModal)
        },
        showStatusModal () {
            let modal = this.$modal({
                title: 'ESP3D Status',
                events: {
                    cancel () {
                        modal.close()
                    }
                }
            }, StatusModal)
        },
        showSPIFFSModal () {
            this.$modal({
                title: 'ESP3D FileSystem'
            }, SPIFFSModal)
        },
        showUpdateModal () {
            this.$modal({
                title: 'ESP3D Firmware Update'
            }, UpdateModal)
        }
    }
}
</script>