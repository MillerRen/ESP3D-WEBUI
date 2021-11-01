<template>
    <div id="filesPanel" class="panel panel-default panel-flex-col">
        <div class="panel-heading">
            <div class="row">
                <div class="col-md-12">
                    <div class="pull-left">
                        <table>
                            <tr>
                                <td>
                                    <b>
                                        <span id="fileSource" translate>SD Files</span>
                                    </b>
                                </td>
                                <td>&nbsp;&nbsp;</td>
                                <td>
                                    <button
                                        v-if="fwData.target_firmware != 'smoothieware' && fwData.target_firmware != 'grbl'"
                                        @click="createDir()"
                                        class="btn btn-info btn-xs"
                                        style="padding: -2px 2px 0x 0px;"
                                    >
                                        <svg width="1.5em" height="1.2em" viewBox="5 10 30 10">
                                            <rect
                                                x="5"
                                                y="10"
                                                width="30"
                                                height="20"
                                                rx="2"
                                                ry="2"
                                                fill="currentColor"
                                            />
                                            <rect
                                                x="20"
                                                y="5"
                                                width="15"
                                                height="15"
                                                rx="2"
                                                ry="2"
                                                fill="currentColor"
                                            />
                                            <text
                                                x="15"
                                                y="25"
                                                font-size="18"
                                                font-weight="800"
                                                fill="#5BC0DE"
                                            >+</text>
                                        </svg>
                                    </button>
                                </td>
                                <td>&nbsp;&nbsp;</td>
                                <td>
                                    <span id="files_currentPath">{{ currentPath }}</span>
                                </td>
                                <td>&nbsp;&nbsp;</td>
                                <td>
                                    <div v-if="loading" style="width:1em;height:1em" class="loader"></div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="pull-right" v-if="uploading">
                        <table>
                            <tr>
                                <td>
                                    <span translate>Uploading</span>
                                </td>
                                <td>&nbsp;</td>
                                <td>
                                    <span class="text-info" id="files_currentUpload_msg"></span>
                                </td>
                                <td>&nbsp;</td>
                                <td width="100px">
                                    <progress name="prg" :value="uploadingProgress" max="100"></progress>
                                </td>
                                <td>
                                    <span id="files_percent_upload">{{ uploadingProgress }}</span>%
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="pull-right" id="files_navigation_buttons" v-if="!uploading">
                        <div class="item-flex-row-wrap">
                            <button
                                class="btn btn-xs btn-primary"
                                onclick="files_filter_button(this);"
                            >
                                <span id="files_filter_glyph" style="position:relative; top:2px">
                                    <svg width="1.3em" height="1.2em" viewBox="0 0 1300 1200">
                                        <g transform="translate(50,1200) scale(1, -1)">
                                            <path
                                                fill="currentColor"
                                                d="M150 1200h900q21 0 35.5 -14.5t14.5 -35.5t-14.5 -35.5t-35.5 -14.5h-900q-21 0 -35.5 14.5t-14.5 35.5t14.5 35.5t35.5 14.5zM700 500v-300l-200 -200v500l-350 500h900z"
                                            />
                                        </g>
                                    </svg>
                                </span>
                            </button>
                            &nbsp;
                            <button
                                v-if="fwData.target_firmware != 'smoothieware' && fwData.target_firmware != 'grbl'"
                                v-show="preferences.has_TFT_SD != 'true' && preferences.has_TFT_USB != 'true'"
                                class="btn btn-xs btn-primary"
                                @click="getFiles(currentPath)"
                                translate
                            >Refresh</button>
                            <button
                                class="btn btn-xs btn-primary"
                                v-if="fwData.target_firmware == 'smoothieware' && fwData.primary_sd.toLowerCase() != 'none'"
                                @click="refreshSD1()"
                            >SD 1</button>
                            &nbsp;
                            <button
                                class="btn btn-xs btn-primary"
                                v-if="fwData.target_firmware == 'smoothieware' && fwData.primary_sd.toLowerCase() != 'none'"
                                @click="refreshSD2()"
                            >SD 2</button>
                            &nbsp;
                            <button
                                class="btn btn-xs btn-primary"
                                @click="refreshPrinterSD()"
                                v-show="preferences.has_TFT_SD == 'true' || preferences.has_TFT_USB == 'true'"
                                v-if="fwData.target_firmware != 'grbl'"
                            >SD</button>
                            &nbsp;
                            <button
                                class="btn btn-xs btn-primary"
                                @click="refreshTFTSD"
                                v-if="preferences.has_TFT_SD == 'true'"
                            >TFT SD</button>
                            &nbsp;
                            <button
                                class="btn btn-xs btn-primary"
                                @click="refreshTFTUSB"
                                v-if="preferences.has_TFT_USB == 'true'"
                            >TFT USB</button>
                            &nbsp;
                            <button
                                v-if="fwData.target_firmware != 'grbl' && fwData.target_firmware != 'grbl-embedded'"
                                @click="checkPrintingProgress"
                                class="btn btn-xs btn-primary"
                                translate
                            >Progress</button>
                            &nbsp;
                            <button
                                v-if="fwData.target_firmware != 'grbl' && fwData.target_firmware != 'grbl-embedded'"
                                @click="abortPrinting"
                                class="btn btn-xs btn-primary"
                                translate
                            >Abort</button>
                            &nbsp;
                            <button
                                v-if="fwData.target_firmware != 'grbl'"
                                class="btn btn-xs btn-primary"
                                @click="$refs.files_input_file.click()"
                                translate
                            >Upload</button>
                            <input
                                type="file"
                                ref="files_input_file"
                                @change="checkFiles"
                                accept=".g, .gco, .gcode, .G, .GCO, .GCODE"
                                style="display:none"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div
            id="file-body"
            class="panel-body panel-height panel-max-height panel-scroll panel-flex-main"
        >
            <div v-if="loading" id="files_list_loader" class="loader" style="margin:auto"></div>
            <ul class="list-group" id="files_fileList">
                <li
                    v-if="currentPath != '/'"
                    class="list-group-item list-group-hover"
                    style="cursor:pointer"
                    @click="levelup()"
                >
                    <span v-html="$options.filters.icon('level-up')"></span>&nbsp;&nbsp;
                    <span translate>Up...</span>
                </li>
                <li class="list-group-item list-group-hover" v-for="file in files" :key="file.name">
                    <div class="row">
                        <div class="col-md-5 col-sm-5 no_overflow">
                            <table>
                                <tr>
                                    <td>
                                        <a
                                            href="###"
                                            @click="selectDir(file.name)"
                                            class="btn btn-xs btn-link"
                                        >{{ file.name }}</a>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="col-md-2 col-sm2">{{ file.size != -1 ? file.size : '' }}</div>
                        <div class="col-md-3 col-sm-3">{{ file.datetime }}</div>
                        <div class="col-md-2 col-sm2">
                            <button
                                class="btn btn-xs btn-success"
                                v-html="$options.filters.icon('play')"
                                v-if="file.isprintable"
                                @click="printFile(file)"
                            ></button>
                            &nbsp;
                            <button
                                class="btn btn-xs btn-danger"
                                v-html="$options.filters.icon('trash')"
                                @click="deleteFile(file)"
                            ></button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="panel-footer panel-footer-height">
            <div class="row" v-if="sdfs.status && sdfs.status.toLowerCase() == 'ok'">
                <div class="col-md-12">
                    <div class="form-inline">
                        <div class="form-group">
                            <span>
                                <span translate>Total:</span>&nbsp;
                                <span id="files_sd_status_total">{{ sdfs.total }}</span>
                            </span>
                            <span>&nbsp;|&nbsp;</span>
                            <span>
                                <span translate>Used:</span>&nbsp;
                                <span id="files_sd_status_used">{{ sdfs.used }}</span>
                            </span>
                            <span>&nbsp;</span>
                            <span class="noshowonlowres">| &nbsp;</span>
                            <span class="form-inline">
                                <div class="form-group">
                                    <span>
                                        <span translate>Occupation:</span>
                                        <meter
                                            id="files_sd_status_occupation"
                                            style="width:150px"
                                            min="0"
                                            max="100"
                                            high="90"
                                            :value="sdfs.occupation"
                                        ></meter>
                                    </span>
                                    <span id="files_sd_status_percent">{{ sdfs.occupation }}</span>
                                    <span>%</span>
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row" v-if="sdfs.status && sdfs.status.toLowerCase() != 'ok'">
                <div class="col-md-12">
                    <span id="files_sd_status_msg">{{ sdfs.status }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { UPLOAD_URL } from "../../constants"
export default {
    props: {
        fwData: {
            type: Object,
            default() {
                return {
                    primary_sd: '',
                    secondary_sd: ''
                }
            }
        }
    },
    data() {
        return {
            sdfs: {
                files: []
            },
            loading: false,
            uploading: false,
            uploads: [],
            currentPath: '/'
        }
    },
    computed: {
        baseURL() {
            return this.fwData.target_firmware == 'smoothieware' ? this.fwData.primary_sd : UPLOAD_URL
        },
        files() {
            return this.sdfs.files.filter(item => item.size == -1).concat(this.sdfs.files.filter(item => item.size != -1))
        },
        preferences() {
            return this.$store.preferences
        },
        uploadingProgress() {
            return this.$store.uploadingProgress
        }
    },
    methods: {
        deleteFile(file) {
            var that = this
            this.$modal({
                title: 'Please Confirm',
                message: 'Confirm deletion of file: ' + file.name,
                okText: 'Confirm',
                callback() {
                    that.loading = true
                    that.$store
                        .deleteFile(that.baseURL, {
                            filename: file.name,
                            path: that.currentPath
                        })
                        .then(response => {
                            that.loading = false
                            that.sdfs = response
                        })
                        .catch(that.sdfsFailed)
                }
            })
        },
        deleteDir(file) {
            var that = this
            this.$modal({
                title: 'Please Confirm',
                message: 'Confirm deletion of directory: ' + file.name,
                okText: 'Confirm',
                callback() {
                    that.loading = true
                    that.$store
                        .deleteDir(that.baseURL, {
                            filename: file.name,
                            path: that.currentPath
                        })
                        .then(response => {
                            that.loading = false
                            that.sdfs = response
                        })
                        .catch(that.sdfsFailed)
                }
            })
        },
        createDir() {
            var that = this
            this.$modal({
                title: 'Please enter directory name',
                prompt: true,
                okText: 'OK',
                callback(confirm, value) {
                    if (!confirm) return
                    that.loading = true
                    this.$store
                        .createDir(that.baseURL, {
                            filename: value,
                            path: that.currentPath
                        })
                        .then(response => {
                            that.loading = false
                            that.sdfs = response
                        })
                        .catch(that.sdfsFailed)

                }
            })
        },
        selectDir(path) {
            this.loading = true
            this.currentPath = path
            this.getFiles(path)
                .catch(this.sdfsFailed)

        },
        gotoDir(path) {
            let index = this.paths.indexOf(path)
            this.selectDir('/' + this.paths.slice(0, index + 1).join('/') + '/')
        },
        checkFiles() {
            this.uploads = this.$refs.files_input_file.files
            this.uploadFile()
        },
        uploadFile() {
            this.uploading = true
            return this.$store
                .uploadFile(UPLOAD_URL, this.uploads, this.currentPath)
                .then(() => {
                    this.uploads = []
                    this.uploading = false
                    return this.refreshFiles()
                })
                .catch(this.sdfsFailed)
                .finally(() => {
                    this.uploding = false
                })

        },
        getFiles(path) {
            this.loading = true
            return this.$store
                .listSD(this.baseURL, {
                    path
                })
                .then(response => {
                    this.loading = false
                    this.sdfs = response
                })
                .catch(this.sdfsFailed)

        },
        refreshFiles() {
            return this.getFiles(this.currentPath)
        },
        levelup() {
            var tlist = this.currentPath.split("/");
            var path = "/";
            var nb = 1;
            while (nb < (tlist.length - 2)) {
                path += tlist[nb] + "/";
                nb++;
            }
            
            this.getFiles(path)
        },
        printFile (file) {
            return this.$store.printFile(file.name)
        },
        abortPrinting () {},
        checkPrintingProgress () {},
        refreshSD() { },
        refreshSD1() { },
        refreshSD2() { },
        refreshTFTSD() { },
        refreshTFTUSB() { },
        refreshPrinterSD() { },
        sdfsFailed(err) {
            this.loading = false
            this.$modal({
                title: 'Error',
                message: err.message
            })
        }
    },
    mounted() {
        this.fwData.direct_sd && this.getFiles(this.currentPath)
    }
}
</script>