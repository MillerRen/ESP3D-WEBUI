<template>
    <div class="panel" id="SPIFFS">
        <div class="panel-body">
            <div class="panel-flex-row">
                <input
                    ref="fileinput"
                    type="file"
                    style="display:none"
                    id="SPIFFS-select"
                    name="myfiles[]"
                    multiple
                    @change="checkFiles()"
                />
                <table id="SPIFFS-select_form">
                    <tr>
                        <td>
                            <button
                                class="btn btn-info"
                                type="button"
                                id="SPIFFS_select_files"
                                @click="$refs.fileinput.click();"
                                translate
                            >Select files</button>
                        </td>
                        <td>
                            <div class="filetext no_overflow" id="SPIFFS_file_name">
                                <span v-if="uploads && uploads.length == 1">{{ uploads[0].name }}</span>
                                <span v-if="uploads && uploads.length > 1">{{ uploads.length }} files</span>
                            </div>
                        </td>
                    </tr>
                </table>&nbsp;
                <button
                    class="btn btn-primary btn-svg"
                    type="button"
                    id="SPIFFS_uploadbtn"
                    @click="uploadFile();"
                >
                    <svg width="1.3em" height="1.2em" viewBox="0 0 1300 1200">
                        <g transform="translate(0,1200) scale(1, -1)">
                            <path
                                fill="currentColor"
                                d="M600 1177q117 0 224 -45.5t184.5 -123t123 -184.5t45.5 -224t-45.5 -224t-123 -184.5t-184.5 -123t-224 -45.5t-224 45.5t-184.5 123t-123 184.5t-45.5 224t45.5 224t123 184.5t184.5 123t224 45.5zM600 1027q-116 0 -214.5 -57t-155.5 -155.5t-57 -214.5t57 -214.5 t155.5 -155.5t214.5 -57t214.5 57t155.5 155.5t57 214.5t-57 214.5t-155.5 155.5t-214.5 57zM632 914l223 -275q13 -16 8 -27.5t-26 -11.5h-137v-275q0 -10 -7.5 -17.5t-17.5 -7.5h-150q-10 0 -17.5 7.5t-7.5 17.5v275h-137q-21 0 -26 11.5t8 27.5l223 275q13 16 32 16 t32 -16z"
                            />
                        </g>
                    </svg>
                </button>
                <progress style="display:none;" name="prg" id="SPIFFS_prg" max="100"></progress>
                &nbsp;
                <span
                    id="uploadSPIFFSmsg"
                    style="display:none;"
                    translate
                >Uploading</span>
            </div>

            <br />
            <br />
            <div class="panel">
                <div class="panel-body">
                    <div class="panel-flex-row">
                        <button @click="createDir()" class="btn btn-info btn-svg-no_pad">
                            <svg width="35px" height="25px" viewBox="0 0 40 30">
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
                        <div id="SPIFFS_loader" class="loader" style="width:2em;height:2em;" v-if="loading"></div>
                        <div id="SPIFFS_path" class="info">
                            <!-- <table>
                                <tr>
                                    <td>
                                        <button class="btn btn-primary">/</button>
                                    </td>
                                    <td v-for="p in currentPath.split('/')" :key="p">{{ p }}</td>
                                </tr>
                            </table> -->
                        </div>
                    </div>
                    <table
                        class="table table-striped"
                        style="border:1px solid #dddddd;margin-bottom:20px;"
                    >
                        <thead>
                            <tr>
                                <th width="0%" translate>Type</th>
                                <th width="auto" translate>Name</th>
                                <th translate>Size</th>
                                <th width="0%"></th>
                            </tr>
                        </thead>
                        <tbody id="SPIFFS_file_list">
                            <tr v-for="(file, index) in files" :key="index">
                                <td v-html="$options.filters.icon('file')"></td>
                                <td>{{ file.path }}{{ file.name }}</td>
                                <td>{{ file.size }}</td>
                                <td>
                                    <button
                                        class="btn btn-danger btn-sm"
                                        v-html="$options.filters.icon('trash')"
                                        @click="deleteFile(file)"
                                    ></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="panel-footer" id="SPIFFS_status"></div>
            </div>
        </div>
    </div>
</template>

<script>
import API from "../../apis"
export default {
    data() {
        return {
            files: [],
            uploads: [],
            currentPath: '/',
            loading: false
        }
    },
    methods: {
        deleteFile(file) {
            var modal = this.$modal({
                title: 'Please Confirm',
                message: 'Confirm deletion of file: ' + file.name
            })
            modal.$on('postive', () => {
                API.getInstance()
                .spiffsDelete(file.name)
            })
        },
        createDir() {
            this.$modal({
                title: 'Please enter directory name',
                prompt: true,
                callback (value) {
                    API.getInstance()
                        .spiffsCreateDir(value)
                }
            })
        },
        checkFiles() {
            this.uploads = this.$refs.fileinput.files
        },
        uploadFile() {
            return API.getInstance()
                .spiffsUpload(this.uploads)
        },
        getFiles () {
            this.loading = true
           return API.getInstance()
            .spiffsList()
            .then(response => {
                this.loading = false
                this.files = response
            })
        }
    },
    mounted() {
        this.getFiles()
    }
}
</script>