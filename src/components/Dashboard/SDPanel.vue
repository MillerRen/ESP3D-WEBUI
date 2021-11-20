<template>
  <div class="panel panel-default panel-flex-col">
    <div class="panel-heading">
      <div class="row">
        <div class="col-md-12">
          <div class="pull-left">
            <table>
              <tr>
                <td>
                  <b>
                    <span v-t>SD Files</span>
                  </b>
                </td>
                <td>&nbsp;&nbsp;</td>
                <td>
                  <button
                    v-if="
                      fwData.target_firmware != 'smoothieware' &&
                      fwData.target_firmware != 'grbl'
                    "
                    @click="createDir()"
                    class="btn btn-info btn-xs"
                    style="padding: -2px 2px 0x 0px"
                  >
                    <i class="glyphicon glyphicon-folder-open"></i>
                  </button>
                </td>
                <td>&nbsp;&nbsp;</td>
                <td>
                  <div
                    v-if="loading"
                    style="width: 1em; height: 1em"
                    class="loader"
                  ></div>
                </td>
              </tr>
            </table>
          </div>
          <div class="pull-right" v-if="uploading">
            <table>
              <tr>
                <td>
                  <span v-t>Uploading</span>
                </td>
                <td>&nbsp;</td>
                <td>
                  <span class="text-info"></span>
                </td>
                <td>&nbsp;</td>
                <td width="100px">
                  <progress
                    name="prg"
                    :value="uploadingProgress"
                    max="100"
                  ></progress>
                </td>
                <td>
                  <span>{{ uploadingProgress }}</span
                  >%
                </td>
              </tr>
            </table>
          </div>
          <div class="pull-right" v-if="!uploading">
            <div class="item-flex-row-wrap">
              <button
                class="btn btn-xs btn-primary"
                onclick="files_filter_button(this);"
              >
                <span style="position: relative; top: 2px">
                  <i class="glyphicon glyphicon-filter"></i>
                </span>
              </button>
              &nbsp;
              <button
                v-if="
                  fwData.target_firmware != 'smoothieware' &&
                  fwData.target_firmware != 'grbl'
                "
                v-show="
                  preferences.has_TFT_SD != 'true' &&
                  preferences.has_TFT_USB != 'true'
                "
                class="btn btn-xs btn-primary"
                @click="getFiles(currentPath)"
                v-t
              >
                Refresh
              </button>
              <button
                class="btn btn-xs btn-primary"
                v-if="
                  fwData.target_firmware == 'smoothieware' &&
                  fwData.primary_sd.toLowerCase() != 'none'
                "
                @click="refreshSD1()"
              >
                SD 1
              </button>
              &nbsp;
              <button
                class="btn btn-xs btn-primary"
                v-if="
                  fwData.target_firmware == 'smoothieware' &&
                  fwData.primary_sd.toLowerCase() != 'none'
                "
                @click="refreshSD2()"
              >
                SD 2
              </button>
              &nbsp;
              <button
                class="btn btn-xs btn-primary"
                @click="refreshPrinterSD()"
                v-show="
                  preferences.has_TFT_SD == 'true' ||
                  preferences.has_TFT_USB == 'true'
                "
                v-if="fwData.target_firmware != 'grbl'"
              >
                SD
              </button>
              &nbsp;
              <button
                class="btn btn-xs btn-primary"
                @click="refreshTFTSD"
                v-if="preferences.has_TFT_SD == 'true'"
              >
                TFT SD
              </button>
              &nbsp;
              <button
                class="btn btn-xs btn-primary"
                @click="refreshTFTUSB"
                v-if="preferences.has_TFT_USB == 'true'"
              >
                TFT USB
              </button>
              &nbsp;
              <button
                v-if="
                  fwData.target_firmware != 'grbl' &&
                  fwData.target_firmware != 'grbl-embedded'
                "
                @click="checkPrintingProgress"
                class="btn btn-xs btn-primary"
                v-t
              >
                Progress
              </button>
              &nbsp;
              <button
                v-if="
                  fwData.target_firmware != 'grbl' &&
                  fwData.target_firmware != 'grbl-embedded'
                "
                @click="abortPrinting"
                class="btn btn-xs btn-primary"
                v-t
              >
                Abort
              </button>
              &nbsp;
              <button
                v-if="fwData.target_firmware != 'grbl'"
                class="btn btn-xs btn-primary"
                @click="$refs.files_input_file.click()"
                v-t
              >
                Upload
              </button>
              <input
                type="file"
                ref="files_input_file"
                @change="checkFiles"
                accept=".g, .gco, .gcode, .G, .GCO, .GCODE"
                style="display: none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="
        panel-body panel-height panel-max-height panel-scroll panel-flex-main
      "
    >
      <!-- <div v-if="loading"  class="loader" style="margin:auto"></div> -->
      <div class="file-list" style="height: 350px; overflow-y: scroll">
        <ul class="list-group">
          <li
            v-if="currentPath != '/'"
            class="list-group-item list-group-hover"
            style="cursor: pointer"
            @click="levelup()"
          >
            <i class="glyphicon glyphicon-level-up"></i>&nbsp;&nbsp;
            <span v-t>Up...</span>
          </li>
          <li
            class="list-group-item list-group-hover"
            v-for="file in files"
            :key="file.name"
          >
            <div class="row">
              <div class="col-md-5 col-sm-5 no_overflow">
                <table>
                  <tr>
                    <td>
                      <a
                        href="###"
                        @click="selectDir(file.name)"
                        class="btn btn-xs btn-link"
                        >{{ file.name }}</a
                      >
                    </td>
                  </tr>
                </table>
              </div>
              <div class="col-md-2 col-sm2">
                {{ file.size != -1 ? file.size : "" }}
              </div>
              <div class="col-md-3 col-sm-3">{{ file.datetime }}</div>
              <div class="col-md-2 col-sm2" style="text-align: right">
                <button
                  class="btn btn-xs btn-success"
                  v-if="file.isprintable"
                  @click="printFile(file)"
                >
                  <i class="glyphicon glyphicon-play"></i>
                </button>
                &nbsp;
                <button class="btn btn-xs btn-danger" @click="deleteFile(file)">
                  <i class="glyphicon glyphicon-trash"></i>
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="panel-footer panel-footer-height">
      <div class="row" v-if="sdfs.status && sdfs.status.toLowerCase() == 'ok'">
        <div class="col-md-12">
          <div class="form-inline">
            <div class="form-group">
              <div class="form-control-static">
                <span>
                  <span v-t>Total:</span>&nbsp;
                  <span>{{ sdfs.total }}</span>
                </span>
                <span>&nbsp;|&nbsp;</span>
                <span>
                  <span v-t>Used:</span>&nbsp;
                  <span>{{ sdfs.used }}</span>
                </span>
                <span>&nbsp;</span>
                <span class="noshowonlowres">| &nbsp;</span>
                <span>
                  <span v-t>Occupation:</span>
                  <meter
                    style="width: 150px"
                    min="0"
                    max="100"
                    high="90"
                    :value="sdfs.occupation"
                  ></meter>
                </span>
                <span>{{ sdfs.occupation }}</span>
                <span>%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row" v-if="sdfs.status && sdfs.status.toLowerCase() != 'ok'">
        <div class="col-md-12">
          <span>{{ sdfs.status }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { UPLOAD_URL } from "../../constants";
export default {
  props: {
    fwData: {
      type: Object,
      default() {
        return {
          primary_sd: "",
          secondary_sd: "",
        };
      },
    },
  },
  data() {
    return {
      sdfs: {
        files: [],
      },
      loading: false,
      uploading: false,
      uploads: [],
      currentPath: "/",
    };
  },
  computed: {
    baseURL() {
      return this.fwData.target_firmware == "smoothieware"
        ? this.fwData.primary_sd
        : UPLOAD_URL;
    },
    files() {
      return this.sdfs.files;
    },
    preferences() {
      return this.$store.preferences;
    },
    uploadingProgress() {
      return this.$store.uploadingProgress;
    },
  },
  methods: {
    deleteFile(file) {
      var that = this;
      this.$modal({
        title: "Confirm deletion of file: ",
        message: file.name,
        okText: "Confirm",
        callback() {
          that.loading = true;
          that.$store
            .deleteFile(that.baseURL, {
              filename: file.name,
              path: that.currentPath,
            })
            .then((response) => {
              that.loading = false;
              that.sdfs = response;
            })
            .catch(that.sdfsFailed);
        },
      });
    },
    deleteDir(file) {
      var that = this;
      this.$modal({
        title: "Confirm deletion of directory: ",
        message: file.name,
        okText: "Confirm",
        callback() {
          that.loading = true;
          that.$store
            .deleteDir(that.baseURL, {
              filename: file.name,
              path: that.currentPath,
            })
            .then((response) => {
              that.loading = false;
              that.sdfs = response;
            })
            .catch(that.sdfsFailed);
        },
      });
    },
    createDir() {
      var that = this;
      this.$modal({
        title: "Please enter directory name",
        prompt: true,
        okText: "OK",
        callback(confirm, value) {
          if (!confirm) return;
          that.loading = true;
          this.$store
            .createDir(that.baseURL, {
              filename: value,
              path: that.currentPath,
            })
            .then((response) => {
              that.loading = false;
              that.sdfs = response;
            })
            .catch(that.sdfsFailed);
        },
      });
    },
    selectDir(path) {
      this.loading = true;
      this.currentPath = path;
      this.getFiles(path).catch(this.sdfsFailed);
    },
    gotoDir(path) {
      let index = this.paths.indexOf(path);
      this.selectDir("/" + this.paths.slice(0, index + 1).join("/") + "/");
    },
    checkFiles() {
      this.uploads = this.$refs.files_input_file.files;
      this.uploadFile();
    },
    uploadFile() {
      this.uploading = true;
      return this.$store
        .uploadFile(UPLOAD_URL, this.uploads, this.currentPath)
        .then(() => {
          this.uploads = [];
          this.uploading = false;
          return this.refreshFiles();
        })
        .catch(this.sdfsFailed)
        .finally(() => {
          this.uploding = false;
        });
    },
    getFiles(path) {
      this.loading = true;
      return this.$store
        .listSD(this.baseURL, {
          path,
        })
        .then((response) => {
          this.loading = false;
          this.sdfs = response;
        })
        .catch(this.sdfsFailed);
    },
    refreshFiles() {
      return this.getFiles(this.currentPath);
    },
    levelup() {
      var tlist = this.currentPath.split("/");
      var path = "/";
      var nb = 1;
      while (nb < tlist.length - 2) {
        path += tlist[nb] + "/";
        nb++;
      }

      this.getFiles(path);
    },
    printFile(file) {
      return this.$store.printFile(file.name);
    },
    abortPrinting() {},
    checkPrintingProgress() {},
    refreshSD() {},
    refreshSD1() {},
    refreshSD2() {},
    refreshTFTSD() {},
    refreshTFTUSB() {},
    refreshPrinterSD() {},
    sdfsFailed(err) {
      this.loading = false;
      this.$modal({
        title: "Error",
        message: err.message,
      });
    },
  },
  mounted() {
    this.fwData.direct_sd && this.getFiles(this.currentPath);
  },
};
</script>