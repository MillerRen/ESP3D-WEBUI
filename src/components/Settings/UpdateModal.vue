<template>
  <div class="panel-body">
    <table v-if="!restartingProgress">
      <tr>
        <td>
          <input
            type="file"
            style="display: none"
            name="myfiles[]"
            accept=".bin, .bin.gz"
            @change="checkupdatefile()"
            ref="fileInput"
          />
          <table>
            <tr>
              <td>
                <button
                  class="btn btn-info"
                  type="button"
                  @click="$refs.fileInput.click()"
                  v-t
                >
                  Select file
                </button>
              </td>
              <td>
                <div
                  class="filetext no_overflow"
                  v-if="uploads && uploads.length"
                  @click="$refs.fileInput.click()"
                >
                  {{ uploads[0].name }}
                </div>
              </td>
            </tr>
          </table>
        </td>

        <td>&nbsp;</td>
        <td>
          <button
            class="btn btn-primary"
            v-if="uploads && uploads.length"
            @click="UploadUpdatefile()"
            v-t
          >
            Update
          </button>
        </td>
        <td>&nbsp;&nbsp;</td>
        <td>
          <progress
            name="prgfw"
            max="100"
            :value="uploadingProgress"
            v-if="uploadingProgress"
          ></progress>
          <span v-if="uploadingProgress">{{ uploadingProgress }}%</span>
        </td>
      </tr>
    </table>
    <br />
    <div class="restarting-msg text-center" v-if="restartingProgress">
      <progress name="prgfw" max="100" :value="restartingProgress"></progress>
      &nbsp; 
      <span v-t>Restarting, please wait....</span>
    </div>
    <br />
    <div v-if="errmsg" class="errmsg text-danger">{{ errmsg }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uploads: null,
      uploading: false,
      errmsg: "",
    };
  },
  computed: {
    uploadingProgress() {
      return this.$store.uploadingProgress;
    },
    restartingProgress() {
      return this.$store.restartingProgress;
    },
  },
  methods: {
    UploadUpdatefile() {
      this.upoading = true;
      this.$store
        .updateFirmware(this.uploads)
        .catch((err) => {
          this.errmsg = err;
        })
        .finally(() => {
          this.uploading = false;
        });
    },
    checkupdatefile() {
      this.uploads = this.$refs.fileInput.files;
    },
  },
};
</script>