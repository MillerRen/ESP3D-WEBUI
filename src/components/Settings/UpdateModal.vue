<template>
    <div class="panel-body">
        <table v-if="!restartingProgress">
            <tr>
                <td>
                    <input
                        type="file"
                        style="display:none"
                        id="fw-select"
                        name="myfiles[]"
                        accept=".bin, .bin.gz"
                        @change="checkupdatefile()"
                        ref="fileInput"
                    />
                    <table id="fw-select_form">
                        <tr>
                            <td>
                                <button
                                    class="btn btn-info"
                                    type="button"
                                    id="fw_select_files"
                                    @click="$refs.fileInput.click()"
                                    translate
                                >Select file</button>
                            </td>
                            <td>
                                <div
                                    class="filetext no_overflow"
                                    v-if="uploads && uploads.length"
                                    @click="$refs.fileInput.click()"
                                >{{ uploads[0].name }}</div>
                            </td>
                        </tr>
                    </table>
                </td>

                <td>&nbsp;</td>
                <td>
                    <button
                        class="btn btn-primary"
                        id="uploadfw-button"
                        v-if="uploads && uploads.length"
                        @click="UploadUpdatefile();"
                        translate
                    >Update</button>
                </td>
                <td>&nbsp;&nbsp;</td>
                <td>
                    <progress name="prgfw" max="100" :value="uploadingProgress" v-if="uploadingProgress"></progress>
                    <span v-if="uploadingProgress">{{uploadingProgress}}%</span> 
                </td>
            </tr>
        </table>
        <br>
        <div class="restarting-msg text-center" v-if="restartingProgress">
                    <progress name="prgfw" max="100" :value="restartingProgress" ></progress>
                    <span  translate>&nbsp; Restarting, please wait....</span>
        </div>
        <br>
        <div v-if="errmsg" class="errmsg text-danger">{{ errmsg }}</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            uploads: null,
            uploading: false,
            errmsg: ''
        }
    },
    computed: {
        uploadingProgress () {
            return this.$store.uploadingProgress
        },
        restartingProgress () {
            return this.$store.restartingProgress
        }
    },
    methods: {
        UploadUpdatefile() {
            this.upoading = true
            this.$store.updateFirmware(this.uploads)
                .catch(err => {
                    this.errmsg = err
                })
                .finally(() => {
                    this.uploading = false
                })
        },
        checkupdatefile() {
            this.uploads = this.$refs.fileInput.files
        }
    }
}
</script>