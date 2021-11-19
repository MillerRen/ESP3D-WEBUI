<template>
  <div class="tabcontent">
    <center>
      <h2>
        <span v-t>Printer configuration</span>
      </h2>
      <div class="btn-toolbar" style="display: inline-block">
        <!-- <button type="button" class="btn btn-success" @click="refreshConfig()">
          <i class="glyphicon glyphicon-save"></i>
        </button>
        <button type="button" class="btn btn-warning" @click="refreshConfig()">
          <i class="glyphicon glyphicon-trash"></i>
        </button> -->
        <button type="button" class="btn btn-primary" @click="refreshConfig()">
          <i class="glyphicon glyphicon-refresh"></i>
        </button>
      </div>

      <hr />
      <div class="loader" v-show="loading"></div>
      <div>
        <div v-if="fwData.target_firmware == 'smoothieware'">
          <center>
            <table>
              <tr>
                <td style="padding: 10px">
                  <div class="radio-inline">
                    <label>
                      <input
                        type="radio"
                        name="config_filter"
                        value="config"
                        onclick="config_display_override(false);"
                      />
                      <span v-t>config</span>
                    </label>
                  </div>
                </td>
                <td style="padding: 10px">
                  <div class="radio-inline">
                    <label>
                      <input
                        type="radio"
                        name="config_filter"
                        value="override"
                        onclick="config_display_override(true);"
                      />
                      <span>smoothieware</span>
                    </label>
                  </div>
                </td>
              </tr>
            </table>
          </center>
        </div>
        <div>
          <table
            class="
              table table-bordered table-striped table-hover table-responsive
            "
            style="
              width: auto;
              max-width: 90% !important;
              word-wrap: break-word;
            "
          >
            <thead>
              <tr>
                <th width="0%" v-t>Label</th>
                <th width="auto" v-t>Value</th>
                <th width="0%" v-t>Help</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in config" :key="item.lable">
                <td style="vertical-align: middle">{{ item.label }}</td>
                <td style="vertical-align: middle">
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <div
                            :class="{
                              'has-warning': item.defaultvalue != item.value,
                            }"
                          >
                            <div class="input-group">
                              <span class="input-group-btn">
                                <button
                                  class="btn btn-default btn-svg"
                                  @click="item.value = item.defaultvalue"
                                >
                                  <i class="glyphicon glyphicon-repeat"></i>
                                </button>
                              </span>
                              <input
                                type="text"
                                class="form-control w6"
                                v-model="item.value"
                              />
                              <span class="input-group-btn">
                                <button
                                  class="btn btn-default"
                                  @click="updateConfig(item)"
                                  v-t
                                >
                                  Set</button
                                >&nbsp;
                              </span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td style="vertical-align: middle" v-t>{{ item.help }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </center>
  </div>
</template>

<script>
export default {
  props: {
    fwData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    config() {
      return this.$store.config;
    },
  },
  methods: {
    refreshConfig() {
      this.loading = true;
      return this.$store
        .getConfig()
        .catch((err) => {
          this.$modal({
            title: "Get Config failed",
            message: "Error" + err.message,
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    updateConfig(item) {
      this.loading = true;
      return this.$store
        .updateConfig(item.cmd + item.value)
        .then((reponse) => {
          if (reponse == "ok") {
            item.defaultValue = item.value;
          }
        })
        .catch((err) => {
          this.$modal({
            title: "Set failed",
            message: "Error" + err.message,
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  mounted() {
    this.refreshConfig();
  },
};
</script>