<template>
  <div class="container-fluid">
    <center>
      <span id="settings_filters">
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
              <div class="form-group has-feedback" :class="{'has-warning':setting.value!=setting.defaultvalue}">
                <div class="input-group">
                  <span class="input-group-btn">
                    <button
                      class="btn btn-default btn-svg"
                      type="button"
                      v-html="$options.filters.icon('repeat')"
                      @click="revertToDefaultValue(setting)"
                    ></button>
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
    };
  },
  computed: {
    settings () {
      return this.$store.settings
    }
  },
  methods: {
    setValue(setting) {
      this.$store.updateSettings(setting.cmd + setting.value)
    },
    revertToDefaultValue(setting) {
      setting.value = setting.defaultvalue
    }
  },
};
</script>