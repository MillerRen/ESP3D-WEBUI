<template>
  <div class="container-fluid" id="settings_list_content">
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
        <tbody id="settings_list_data">
          <tr v-for="(setting, index) in value" :key="index" v-show="setting.F == settingsType">
            <td>{{ setting.label }}</td>
            <td>
              <div class="input-group">
                <span class="input-group-btn">
                  <button
                    class="btn btn-default btn-svg"
                    type="button"
                    v-html="$options.filters.icon('repeat')"
                    @click="revertToDefaultValue(setting, index)"
                  ></button>
                </span>
                <input type="text" class="form-control" :value="setting.defaultvalue" v-if="setting.type!='F'&&!(setting.Options&&setting.Options.length)" />
                <select v-model="setting.defaultvalue" v-if="setting.type == 'F'" class="form-control">
                  <option value="1">Enable</option>
                  <option value="0">Disable</option>
                </select>
                <select v-model="setting.defaultvalue" v-if="setting.Options&&setting.Options.length" class="form-control">
                  <option v-for="o in setting.Options" :key="o.id" :value="o.id">{{o.display}}</option>
                </select>
                <span class="input-group-btn">
                  <button class="btn btn-default" type="button" @click="setValue(setting)">set</button>
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </center>
  </div>
</template>

<script>
import commands from "../../models/commands";
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
    setValue(setting) {
      commands.updateSettings(setting.cmd + setting.defaultvalue)
    },
    revertToDefaultValue(setting) {
      console.log(setting)
    }
  },
};
</script>