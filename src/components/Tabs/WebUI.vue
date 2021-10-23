<template>
    <div class="panel" id="SPIFFS">
        <div class="panel-body">
            <div class="panel-flex-row">
                <input
                    type="file"
                    style="display:none"
                    id="SPIFFS-select"
                    name="myfiles[]"
                    multiple
                    onchange="checkSPIFFSfiles()"
                />
                <table id="SPIFFS-select_form">
                    <tr>
                        <td>
                            <button
                                class="btn btn-info"
                                type="button"
                                id="SPIFFS_select_files"
                                onclick="document.getElementById('SPIFFS-select').click();"
                                translate
                            >Select files</button>
                        </td>
                        <td>
                            <div
                                class="filetext no_overflow"
                                id="SPIFFS_file_name"
                                onmouseup="document.getElementById('SPIFFS_select_files').click();"
                            ></div>
                        </td>
                    </tr>
                </table>&nbsp;
                <button
                    class="btn btn-primary btn-svg"
                    type="button"
                    id="SPIFFS_uploadbtn"
                    onclick="SPIFFS_UploadFile();"
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
                        <button onclick="SPIFFS_Createdir()" class="btn btn-info btn-svg-no_pad">
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
                        <div id="SPIFFS_loader" class="loader" style="width:2em;height:2em;"></div>
                        <div id="SPIFFS_path" class="info">&nbsp;</div>
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
                                <td>{{file.path}}{{file.name}}</td>
                                <td>{{file.size}}</td>
                                <td></td>
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
    data () {
        return {
            files: []
        }
    },
    mounted () {
        API.getInstance()
            .spiffsList()
            .then(response => {
                this.files = response
            })
    }
}
</script>