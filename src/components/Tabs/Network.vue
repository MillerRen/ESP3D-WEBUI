<template>
    <div class="container" id="settings_list_content">
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
          class="
            table table-bordered table-striped table-hover table-responsive
          "
          style="width: auto"
        >
          <thead>
            <tr>
              <th translate>Label</th>
              <th translate>Value</th>
            </tr>
          </thead>
          <tbody id="settings_list_data">
            <tr
              v-for="(setting, index) in value"
              :key="index"
              v-show="setting.F == settingsType"
            >
              <td>{{ setting.label }}</td>
              <td>
                <div class="input-group">
                  <span class="input-group-btn">
                    <button
                      class="btn btn-default btn-svg"
                      type="button"
                      v-html="$options.filters.icon('repeat')"
                    ></button>
                  </span>
                  <input
                    type="text"
                    class="form-control"
                    :value="setting.defaultvalue"
                  />
                  <span class="input-group-btn">
                    <button
                      class="btn btn-default"
                      type="button"
                      @click="setValue(setting)"
                    >set</button>
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
</template>

<script>

export default {
  props: {
    value: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      settingsType: "network",
    };
  },
  methods: {
    setValue (setting) {
        this.$emit('updateSettings', setting.cmd + setting.defaultvalue)
    }
  },
};
</script>