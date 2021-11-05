<template>
    <div id="settingstab" class="tabcontent">
        <center>
            <h2>
                <span translate>ESP3D Settings</span>
            </h2>
            <table>
                <tr>
                    <td style="padding:10px">
                        <button type="button" class="btn btn-info" @click="showStatusModal">
                            <span v-html="$options.filters.icon('th-list')"></span>
                        </button>
                    </td>
                    <td style="padding:10px">
                        <button type="button" class="btn btn-success" @click="showSPIFFSModal">
                            <span v-html="$options.filters.icon('folder-open')"></span>
                        </button>
                    </td>
                    <td style="padding:10px">
                        <button
                            id="settings_update_fw_btn"
                            type="button"
                            class="btn btn-warning"
                            @click="showUpdateModal"
                        >
                            <span v-html="$options.filters.icon('cloud-upload')"></span>
                        </button>
                    </td>
                    <td style="padding:10px">
                        <button
                            type="button"
                            id="settings_restart_btn"
                            class="btn btn-danger"
                            @click="restartESP();"
                        >
                            <span v-html="$options.filters.icon('off')"></span>
                        </button>
                    </td>
                    <td style="padding:10px">
                        <button
                            type="button"
                            id="settings_refresh_btn"
                            class="btn btn-primary"
                            @click="refreshSettings()"
                        >
                            <span v-html="$options.filters.icon('refresh')"></span>
                        </button>
                    </td>
                </tr>
            </table>
            <br />
            <span id="settings_status"></span>
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