<template>
  <div class="container-fluid">
    <center>
      <div class="radio-inline">
        <label>
          <input
            type="radio"
            name="setting_filter"
            v-model="settingsType"
            value="nvs"
          />
          <span v-t>Flash</span>
        </label>
      </div>
      <div class="radio-inline">
        <label>
          <input
            type="radio"
            name="setting_filter"
            v-model="settingsType"
            value="tree"
          />
          <span v-t>FluidNC</span>
        </label>
      </div>

      <!-- <div class="settings-status" v-if="errmsg">{{ errmsg }}</div> -->
      <div class="loader" v-if="loading"></div>
      <table
        class="table table-bordered table-striped table-hover table-responsive"
        style="width: auto"
      >
        <thead>
          <tr>
            <th v-t>Label</th>
            <th v-t>Value</th>
          </tr>
        </thead>
        <tbody v-if="settings">
          <tr
            v-for="(setting, index) in settings"
            :key="index"
            v-show="setting.F == settingsType"
          >
            <td class="text-muted" v-t>{{ setting.label }}</td>
            <td>
              <form @submit.prevent.stop="setValue(setting)">
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
                    :type="
                      setting.type == 'B' || setting.type == 'I'
                        ? 'number'
                        : 'text'
                    "
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
                    <option
                      v-for="o in setting.Options"
                      :key="o.id"
                      :value="o.id"
                      v-t
                    >
                      {{ o.display }}
                    </option>
                  </select>
                  <select
                    v-model="setting.value"
                    v-if="setting.type == 'F'"
                    class="form-control"
                  >
                    <option value="1" v-t>Disable</option>
                    <option value="0" v-t>Enable</option>
                  </select>
                  <span class="input-group-btn">
                    <button
                      class="btn btn-default"
                      type="button"
                      @click="scanWifi(setting)"
                      v-if="
                        setting.pos == 'Sta/SSID' || setting.pos == 'STA_SSID'
                      "
                    >
                      <i class="glyphicon glyphicon-search"></i>
                    </button>
                    <button
                      class="btn btn-default"
                      :class="{
                        'btn-warning': setting.defaultvalue != setting.value,
                        'btn-success': setting.success,
                      }"
                      :disabled="setting.defaultvalue == setting.value"
                      type="submit"
                      v-t
                    >
                      Set
                    </button>
                  </span>
                </div>
              </form>
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
      settingsType: "nvs",
      loading: false,
      errmsg: "",
    };
  },
  computed: {
    settings() {
      return this.$store.settings;
    },
    fwData() {
      return this.$store.fwData;
    },
  },
  methods: {
    setValue(setting) {
      this.loading = true;
      this.$store
        .updateSettings(setting.cmd + setting.value)
        .then((response) => {
          this.loading = false;
          if (response == "ok") {
            setting.defaultvalue = setting.value;
            setting.success = true;
          }
        })
        .catch((err) => {
          this.loading = false;
          this.errmsg = err;
        });
    },
    refreshSettings() {
      this.loading = true;
      this.$store
        .getSettings()
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          this.errmsg = err;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    revertToDefaultValue(setting) {
      setting.value = setting.defaultvalue;
    },
    scanWifi(setting) {
      var modal = this.$modal(
        {
          title: "List of available Access Points",
          events: {
            success(wifi) {
              setting.value = wifi;
              modal.close();
            },
          },
        },
        "WiFiModal"
      );
    },
  },
};
</script>
