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
                                        @click="createDir()"
                                        class="btn btn-info btn-xs hide_it"
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
                                    <span id="files_currentPath"></span>
                                </td>
                                <td>&nbsp;&nbsp;</td>
                                <td>
                                    <div
                                        v-if="loading"
                                        style="width:1em;height:1em"
                                        class="loader"
                                    ></div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="hide_it pull-right" id="files_uploading_msg">
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
                                    <progress name="prg" id="files_prg" max="100"></progress>
                                </td>
                                <td>
                                    <span id="files_percent_upload"></span>%
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="pull-right" id="files_navigation_buttons">
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
                                class="btn btn-xs btn-primary"
                                @click="getFiles(currentPath)"
                                translate
                            >Refresh</button>
                            <button
                                class="btn btn-xs btn-primary hide_it"
                                id="files_refresh_primary_sd_btn"
                                onclick="files_refreshFiles(primary_sd)"
                            >SD 1</button>
                            &nbsp;
                            <button
                                class="btn btn-xs btn-primary hide_it"
                                id="files_refresh_secondary_sd_btn"
                                onclick="files_refreshFiles(secondary_sd)"
                            >SD 2</button>
                            &nbsp;
                            <span
                                class="hide_it"
                                id="files_refresh_printer_sd_btn"
                            >
                                <button
                                    class="btn btn-xs btn-primary"
                                    onclick="current_source = printer_sd ;files_refreshFiles(files_currentPath)"
                                >SD</button>
                                &nbsp;
                            </span>
                            <span class="hide_it" id="files_refresh_tft_sd_btn">
                                <button
                                    class="btn btn-xs btn-primary"
                                    onclick="current_source = tft_sd ;files_refreshFiles(files_currentPath)"
                                >TFT SD</button>
                                &nbsp;
                            </span>
                            <span class="hide_it" id="files_refresh_tft_usb_btn">
                                <button
                                    class="btn btn-xs btn-primary"
                                    onclick="current_source = tft_usb ;files_refreshFiles(files_currentPath)"
                                >TFT USB</button>
                                &nbsp;
                            </span>
                            <button
                                v-if="fwData.target_firmware == 'grbl' || fwData.target_firmware == 'grbl-embeded'"
                                id="progress_btn"
                                class="btn btn-xs btn-primary"
                                onclick="files_progress()"
                                translate
                            >Progress</button>
                            &nbsp;
                            <button
                                v-if="fwData.target_firmware == 'grbl' || fwData.target_firmware == 'grbl-embeded'"
                                id="abort_btn"
                                class="btn btn-xs btn-primary"
                                onclick="files_abort()"
                                translate
                            >Abort</button>
                            &nbsp;
                            <button
                                id="print_upload_btn"
                                class="btn btn-xs btn-primary"
                                onclick="files_select_upload()"
                                translate
                            >Upload</button>
                            <input
                                type="file"
                                id="files_input_file"
                                onchange="files_check_if_upload()"
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
            <div id="files_list_loader" class="loader hide_it" style="margin:auto"></div>
            <ul class="list-group" id="files_fileList">
                <li class="list-group-item list-group-hover" v-for="file in files" :key="file.name">
                    <div class="row">
                        <div class="col-md-5 col-sm-5 no_overflow">
                            <table>
                                <tr>
                                    <td>
                                        <span style="color:DeepSkyBlue;">{{ file.name }}</span>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="col-md-2 col-sm2">{{ file.size }}</div>
                        <div class="col-md-3 col-sm-3">{{ file.datetime }}</div>
                        <div class="col-md-2 col-sm2">
                            <button
                                class="btn btn-xs btn-success"
                                v-html="$options.filters.icon('play')"
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
            <div class="row hide_it" id="files_space_sd_status">
                <div class="col-md-12">
                    <div class="form-inline">
                        <div class="form-group">
                            <span>
                                <span translate>Total:</span>&nbsp;
                                <span id="files_sd_status_total"></span>
                            </span>
                            <span>&nbsp;|&nbsp;</span>
                            <span>
                                <span translate>Used:</span>&nbsp;
                                <span id="files_sd_status_used"></span>
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
                                            value="50"
                                        ></meter>
                                    </span>
                                    <span id="files_sd_status_percent"></span>
                                    <span>%</span>
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row hide_it" id="files_status_sd_status">
                <div class="col-md-12">
                    <span id="files_sd_status_msg">Ok</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import files from "../../models/files"
export default {
    props: {
        fwData: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            sdfs: {
                files: []
            },
            loading: false,
            currentPath: '/'
        }
    },
    computed: {
        files() {
            return this.sdfs.files.filter(item => !item.isdir)
        },
        dirs() {
            return this.sdfs.files.filter(item => item.isdir)
        }
    },
    methods: {
        getFiles(path) {
            this.loading = true
            return files.getFiles(path)
                .then(response => {
                    this.sdfs = response
                    this.loading = false
                })
                .catch(err => {
                    this.loading = false
                    this.$modal({
                        title: 'Error',
                        message: err.message
                    })
                })
        },
        deleteFile(file) {
            let modal = this.$modal({
                title: 'Please Confirm'
            })
            modal.$on('postive', () => {
                file.isdir ? files.deleteDir(file.name) : files.deleteFile(file.name)
            })
        },
        printFile(file) {
            this.loading = true
            files.printFile(file)
                .then(() => {
                    this.loading = false
                })
                .catch(err => {
                    this.loading = false
                    this.$modal({
                        title: 'Error',
                        message: err.message
                    })
                })
        },
        createDir() {
            this.$modal({
                title: 'Please enter directory name',
                prompt: true,
                callback(value) {
                    files.createDir(value)
                }
            })
        }
    },
    mounted() {
        this.getFiles(this.currentPath)
    }
}
</script>