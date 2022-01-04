<template>
  <div class="tabcontent">
    <center>
      <!-- <h2>
        <span v-t>ESP3D Settings</span>
      </h2> -->
      <div class="btn-toolbar" style="display:inline-block">
        <button type="button" class="btn btn-info" @click="showStatusModal">
          <i class="glyphicon glyphicon-th-list"></i>
        </button>
        <button type="button" class="btn btn-success" @click="showSPIFFSModal">
          <i class="glyphicon glyphicon-folder-open"></i>
        </button>
        <button type="button" class="btn btn-warning" @click="showUpdateModal">
          <i class="glyphicon glyphicon-cloud-upload"></i>
        </button>
        <button type="button" class="btn btn-danger" @click="restartESP()">
          <i class="glyphicon glyphicon-off"></i>
        </button>
        <button
          type="button"
          class="btn btn-primary"
          @click="showPreferencesModal()"
        >
          <i class="glyphicon glyphicon-eye-open"></i>
        </button>
        <button
          type="button"
          class="btn btn-primary"
          @click="refreshSettings()"
        >
          <i class="glyphicon glyphicon-refresh"></i>
        </button>
      </div>
      <hr />
      <Settings ref="settings" />
    </center>
  </div>
</template>

<script>
import SPIFFSModal from "../Settings/SPIFFSModal.vue";
import UpdateModal from "../Settings/UpdateModal.vue";
import StatusModal from "../Settings/StatusModal.vue";
import RestartModal from "../Settings/RestartModal.vue";

export default {
  data() {
    return {
      tab: "settings",
    };
  },
  methods: {
    refreshSettings() {
      this.$refs.settings.refreshSettings();
    },
    restartESP() {
      var that = this;
      var modal = this.$modal({
        title: "Please Confirm",
        message: "Restart ESP3D",
        okText: "确定",
        cancelText: "Cancel",
        callback(ok) {
          if (ok) {
            that.restarting();
            modal.close();
          }
        },
      });
    },
    restarting() {
      this.$modal(
        {
          title: "Restarting ESP3D",
          closeable: false,
        },
        RestartModal
      );
    },
    showStatusModal() {
      let modal = this.$modal(
        {
          title: "ESP3D Status",
          events: {
            cancel() {
              modal.close();
            },
          },
        },
        StatusModal
      );
    },
    showSPIFFSModal() {
      this.$modal(
        {
          title: "ESP3D Filesystem",
        },
        SPIFFSModal
      );
    },
    showUpdateModal() {
      this.$modal(
        {
          title: "ESP3D Update",
        },
        UpdateModal
      );
    },
    showPreferencesModal() {
      var modal = this.$modal(
        {
          title: "Preferences",
          data: {
            preferences: this.$store.preferences,
          },
          events: {
            success() {
              modal.close();
            },
            cancel() {
              modal.close();
            },
          },
        },
        "PreferencesModal"
      );
    },
  },
};
</script>