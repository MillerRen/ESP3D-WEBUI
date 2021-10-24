<template>
  <div class="container-fluid">
    <div class="panel panel-default">
      <div class="panel-body">
        <table>
          <tr>
            <td>
              <input
                type="file"
                style="display:none"
                ref="fileinput"
                name="myfiles[]"
                accept=".bin, .bin.gz"
                @change="checkupdatefile();"
              />
              <table id="fw-select_form">
                <tr>
                  <td>
                    <button
                      class="btn btn-info"
                      type="button"
                      id="fw_select_files"
                      @click="$refs.fileinput.click();"
                      translate
                    >Select file</button>
                  </td>
                  <td>
                    <div
                      class="filetext no_overflow"
                      id="fw_file_name"
                    >{{ files[0] && files[0].name }}</div>
                  </td>
                </tr>
              </table>
            </td>

            <td>&nbsp;</td>
            <td>
              <button
                class="btn btn-primary"
                id="uploadfw-button"
                @click="updatefw"
                :disabled="!files.length"
                translate
              >Update</button>
            </td>
            <td>
              <progress v-if="uploading" name="prgfw" id="prgfw" max="100"></progress>
            </td>
            <td>&nbsp;</td>
            <td>
              <span v-if="uploading" translate>Restarting, please wait....</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import firmware from '../../models/firmware'

export default {
  data() {
    return {
      uploading: 0,
      files: []
    }
  },
  methods: {
    updatefw() {
      this.uploading = true
      firmware.update(this.files)
        .finally(() => {
          this.uploading = false
        })
    },
    checkupdatefile() {
      this.files = this.$refs.fileinput.files
    }
  }
}
</script>