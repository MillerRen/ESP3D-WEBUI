<template>
  <div class="container-fluid">
    <center>
      <span
        id="settings_filters"
        v-if="fwData.target_firmware != 'grbl-embedded' && fwData.target_firmware != 'marlin-embedded'"
      >
        <div class="radio-inline">
          <label>
            <input
              type="radio"
              id="network_setting_filter"
              name="setting_filter"
              v-model="settingsType"
              value="network"
            />
            <span translate>Network</span>
          </label>
        </div>
        <div class="radio-inline">
          <label>
            <input
              type="radio"
              id="printer_setting_filter"
              name="setting_filter"
              v-model="settingsType"
              value="printer"
            />
            <span translate>Printer</span>
          </label>
        </div>
      </span>
      <div class="settings-status" v-if="errmsg">{{ errmsg }}</div>
      <div class="loader" v-if="loading"></div>
      <table
        class="table table-bordered table-striped table-hover table-responsive"
        style="width: auto"
      >
        <thead>
          <tr>
            <th translate>Label</th>
            <th translate>Value</th>
          </tr>
        </thead>
        <tbody v-if="settings">
          <tr v-for="(setting, index) in settings" :key="index" v-show="setting.F == settingsType">
            <td>{{ setting.label }}</td>
            <td>
              <div
                class="has-feedback"
                :class="{ 'has-warning': setting.value != setting.defaultvalue }"
              >
                <div class="input-group">
                  <span class="input-group-btn">
                    <button
                      class="btn btn-default btn-svg"
                      type="button"
                      @click="revertToDefaultValue(setting)"
                    >
                      <i class="glyphicon glyphicon-repeat"></i>
                    </button>
                  </span>
                  <input
                    type="text"
                    class="form-control"
                    v-model="setting.value"
                    :min="setting.min_val"
                    :max="setting.max_val"
                    :minlength="setting.min_val"
                    :maxlength="setting.max_val"
                    v-if="!setting.Options.length"
                  />
                  <select
                    v-model="setting.value"
                    v-if="setting.Options.length"
                    class="form-control"
                  >
                    <option v-for="o in setting.Options" :key="o.id" :value="o.id">{{ o.display }}</option>
                  </select>
                  <span class="input-group-btn">
                    <button class="btn btn-default" type="button" @click="setValue(setting)">set</button>
                  </span>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </center>
  </div>
</template>

<script>
export default {
  data() {
    return {
      settingsType: "network",
      loading: false,
      errmsg: ''
    };
  },
  computed: {
    settings() {
      return this.$store.settings
    },
    fwData() {
      return this.$store.fwData
    }
  },
  methods: {
    setValue(setting) {
      this.loading = true
      this.$store.updateSettings(setting.cmd + setting.value)
        .then(() => {
          this.loading = false
        })
        .catch((err) => {
          this.loading = false
          this.errmsg = err
        })
    },
    refreshSettings() {
      this.loading = true
      this.$store.getSettings()
        .then((response) => { console.log(response) })
        .catch((err) => {
          this.errmsg = err
        })
        .finally(() => {
          this.loading = false
        })
    },
    revertToDefaultValue(setting) {
      setting.value = setting.defaultvalue
    }
  },
};
</script>