<template>
  <div class="panel panel-spiffs">
    <div class="panel-heading row">
      <div class="panel-flex-row">
        <table>
          <tr>
            <td>
              <input
                ref="fileinput"
                type="file"
                style="display: none"
                name="myfiles[]"
                multiple
                @change="checkFiles()"
              />
              <button
                class="btn btn-info"
                type="button"
                @click="$refs.fileinput.click()"
                v-t
              >
                Select files
              </button>
            </td>
            <td>
              <div class="filetext no_overflow">
                <span v-if="!uploads || !uploads.length" v-t
                  >No file chosen</span
                >
                <span v-if="uploads && uploads.length == 1">{{
                  uploads[0].name
                }}</span>
                <span v-if="uploads && uploads.length > 1"
                  >{{ uploads.length }} files</span
                >
              </div>
            </td>
          </tr>
        </table>
        &nbsp;
        <button
          class="btn btn-primary btn-svg"
          type="button"
          :disabled="uploads.length < 1 || uploading"
          @click="uploadFile()"
        >
          <i class="glyphicon glyphicon-upload"></i>
        </button>
        &nbsp;
        <progress
          v-if="uploading"
          :value="uploadingProgress"
          name="prg"
          max="100"
        ></progress>
        &nbsp;
        <span v-if="uploading" v-t>Uploading</span>
      </div>
    </div>
    <div class="panel-body row">
      <div class="panel-flex-row">
        <button class="btn btn-primary" type="button" @click="refreshFiles" v-t>
          Refresh
        </button>
        &nbsp;
        <button @click="createDir()" class="btn btn-info btn-svg-no_pad">
          <i class="glyphicon glyphicon-folder-open"></i>
        </button>
        <div class="info">
          <table>
            <tr>
              <td>
                <button class="btn btn-link" @click="selectDir('/')">/</button>
              </td>
              <td v-for="p in paths" :key="p">
                <button class="btn btn-link" @click="gotoDir(p)">{{ p }}</button
                >/
              </td>
            </tr>
          </table>
        </div>

        <div
          class="loader"
          style="width: 2em; height: 2em"
          v-if="loading"
        ></div>
      </div>
      <table class="table table-striped table-condensed" style="margin-bottom: 0px">
        <thead>
          <tr>
            <th width="0%" v-t>Type</th>
            <th width="auto" v-t>Name</th>
            <th v-t>Size</th>
            <th width="0%"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="file in files" :key="file.name">
            <td>
              <button class="btn btn-link btn-xs">
                <i
                  class="glyphicon"
                  :class="
                    file.isdir ? 'glyphicon-folder-open' : 'glyphicon-file'
                  "
                ></i>
              </button>
            </td>
            <td>
              <button
                class="btn btn-link btn-xs"
                @click="file.isdir && selectDir(currentPath + file.name + '/')"
              >
                {{ file.name }}{{ file.isdir ? "/" : "" }}
              </button>
            </td>
            <td>
                <button class="btn btn-link btn-xs">
                    {{ !file.isdir ? file.size : "" }}
                </button>
            </td>
            <td>
              <button class="btn btn-danger btn-xs" @click="remove(file)">
                <i class="glyphicon glyphicon-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="panel-footer">
      <span>
        <span v-t>Total:</span>&nbsp;
        <span>{{ stats.total }}</span>
      </span>
      <span>&nbsp;|&nbsp;</span>
      <span>
        <span v-t>Used:</span>&nbsp;
        <span>{{ stats.used }}</span>
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
          :value="stats.occupation"
        ></meter>
      </span>
      <span>{{ stats.occupation }}</span>
      <span>%</span>
    </div>
  </div>
</template>

<script>
import { SPIFFS_URL } from "../../constants";
export default {
  data() {
    return {
      uploading: false,
      uploads: [],
      currentPath: "/",
      loading: false,
      spiffs: {
        files: [],
      },
    };
  },
  computed: {
    files() {
      return this.spiffs.files;
    },
    stats() {
      return {
        status: this.spiffs.status,
        total: this.spiffs.total,
        used: this.spiffs.used,
        occupation: this.spiffs.occupation,
      };
    },
    paths() {
      let paths = this.currentPath.split("/");
      return paths.slice(1, paths.length - 1);
    },
    uploadingProgress() {
      return this.$store.uploadingProgress;
    },
  },
  methods: {
    remove(file) {
      return file.isdir ? this.deleteDir(file) : this.deleteFile(file);
    },
    deleteFile(file) {
      var that = this;
      this.$modal({
        title: "Please Confirm",
        message: "Confirm deletion of file: " + file.name,
        okText: "Confirm",
        callback() {
          that.loading = true;
          that.$store
            .deleteFile(SPIFFS_URL, {
              filename: file.name,
              path: that.currentPath,
            })
            .then((response) => {
              that.loading = false;
              that.spiffs = response;
            })
            .catch(that.spiffsFailed);
        },
      });
    },
    deleteDir(file) {
      var that = this;
      this.$modal({
        title: "Please Confirm",
        message: "Confirm deletion of directory: " + file.name,
        okText: "Confirm",
        callback() {
          that.loading = true;
          that.$store
            .deleteDir(SPIFFS_URL, {
              filename: file.name,
              path: that.currentPath,
            })
            .then((response) => {
              that.loading = false;
              that.spiffs = response;
            })
            .catch(that.spiffsFailed);
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
            .createDir(SPIFFS_URL, {
              filename: value,
              path: that.currentPath,
            })
            .then((response) => {
              that.loading = false;
              that.spiffs = response;
            })
            .catch(that.spiffsFailed);
        },
      });
    },
    selectDir(path) {
      this.loading = true;
      this.currentPath = path;
      this.getFiles(path).catch(this.spiffsFailed);
    },
    gotoDir(path) {
      let index = this.paths.indexOf(path);
      this.selectDir("/" + this.paths.slice(0, index + 1).join("/") + "/");
    },
    checkFiles() {
      this.uploads = this.$refs.fileinput.files;
    },
    uploadFile() {
      this.uploading = true;
      return this.$store
        .uploadFile(SPIFFS_URL, this.uploads, this.currentPath)
        .then(() => {
          this.uploading = false;
          this.uploads = [];
          return this.refreshFiles();
        })
        .catch(this.spiffsFailed)
        .finally(() => {
          this.uploads = [];
        });
    },
    getFiles(path) {
      this.loading = true;
      return this.$store
        .listSPIFFS(SPIFFS_URL, {
          path,
        })
        .then((response) => {
          this.loading = false;
          this.spiffs = response;
        })
        .catch(this.spiffsFailed);
    },
    refreshFiles() {
      return this.getFiles(this.currentPath);
    },
    spiffsFailed(err) {
      this.loading = false;
      this.uploading = false;
      this.$modal({
        title: "Error",
        message: err.message,
      });
    },
  },
  mounted() {
    this.getFiles(this.currentPath);
  },
};
</script>