<template>
  <div id="configtab" class="tabcontent">
    <center>
      <h2 id="tab_title_configuration">
        <span translate>Printer configuration</span>
      </h2>
      <button
        type="button"
        id="config_refresh_btn"
        class="btn btn-primary"
        @click="refreshConfig();"
      >
        <svg width="1.3em" height="1.2em" viewBox="0 0 1300 1200">
          <g transform="translate(50,1200) scale(1, -1)">
            <path
              fill="currentColor"
              d="M947 1060l135 135q7 7 12.5 5t5.5 -13v-361q0 -11 -7.5 -18.5t-18.5 -7.5h-361q-11 0 -13 5.5t5 12.5l134 134q-110 75 -239 75q-116 0 -214.5 -57t-155.5 -155.5t-57 -214.5h-150q0 117 45.5 224t123 184.5t184.5 123t224 45.5q192 0 347 -117zM1027 600h150 q0 -117 -45.5 -224t-123 -184.5t-184.5 -123t-224 -45.5q-192 0 -348 118l-134 -134q-7 -8 -12.5 -5.5t-5.5 12.5v360q0 11 7.5 18.5t18.5 7.5h360q10 0 12.5 -5.5t-5.5 -12.5l-133 -133q110 -76 240 -76q116 0 214.5 57t155.5 155.5t57 214.5z"
            />
          </g>
        </svg>
      </button>
      <br />
      <span id="config_status"></span>
      <hr />
      <div class="loader" v-show="loading"></div>
      <div id="config_list_content">
        <div id="config_smoothie_nav" v-if="fwData.target_firmware == 'smoothieware'">
          <center>
            <table>
              <tr>
                <td style="padding: 10px">
                  <div class="radio-inline">
                    <label>
                      <input
                        type="radio"
                        id="config_main_file"
                        name="config_filter"
                        value="config"
                        onclick="config_display_override(false);"
                      />
                      <span id="config_main_file_name">config</span>
                    </label>
                  </div>
                </td>
                <td style="padding: 10px">
                  <div class="radio-inline">
                    <label>
                      <input
                        type="radio"
                        id="config_override_file"
                        name="config_filter"
                        value="override"
                        onclick="config_display_override(true);"
                      />
                      <span id="config_override_file_name">smoothieware</span>
                    </label>
                  </div>
                </td>
              </tr>
            </table>
          </center>
        </div>
        <div id="config_main_content">
          <table
            class="table table-bordered table-striped table-hover table-responsive"
            style="
              width: auto;
              max-width: 90% !important;
              word-wrap: break-word;
            "
          >
            <thead>
              <tr>
                <th width="0%" translate>Label</th>
                <th width="auto" translate>Value</th>
                <th width="0%" translate>Help</th>
              </tr>
            </thead>
            <tbody id="config_list_data">
              <tr v-for="item in config" :key="item.lable">
                <td style="vertical-align:middle">{{ item.label }}</td>
                <td style="vertical-align:middle;">
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <div
                            id="status_config_0"
                            class="form-group has-feedback"
                            style="margin: auto;"
                          >
                            <div class="item-flex-row">
                              <table>
                                <tbody>
                                  <tr>
                                    <td>
                                      <div class="input-group">
                                        <span class="input-group-btn">
                                          <button
                                            class="btn btn-default btn-svg"
                                            @click="item.value = item.defaultvalue"
                                            v-html="$options.filters.icon('repeat')"
                                          ></button>
                                        </span>
                                        <input class="hide_it" />
                                      </div>
                                    </td>
                                    <td>
                                      <div class="input-group">
                                        <span class="input-group-addon hide_it"></span>
                                        <input
                                          id="config_0"
                                          type="text"
                                          class="form-control"
                                          style="width:auto"
                                          v-model="item.value"
                                        />
                                        <span
                                          id="icon_config_0"
                                          class="form-control-feedback ico_feedback"
                                        ></span>
                                        <span class="input-group-addon hide_it"></span>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <div class="input-group">
                                <input class="hide_it" />
                                <span class="input-group-btn">
                                  <button
                                    id="btn_config_0"
                                    class="btn btn-default"
                                    @click="updateConfig(item)"
                                    translate
                                    english_content="Set"
                                  >Set</button>&nbsp;
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td style="vertical-align:middle">{{ item.help }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id="config_override_list_content">
          <table>
            <tr>
              <td style="padding: 10px">
                <button
                  type="button"
                  id="config_apply_override"
                  class="btn btn-success"
                  onclick="Apply_config_override()"
                >
                  <span>
                    <svg width="1.3em" height="1.2em" viewBox="0 0 1300 1200">
                      <g transform="translate(50,1200) scale(1, -1)">
                        <path
                          fill="currentColor"
                          d="M450 1200h200q21 0 35.5 -14.5t14.5 -35.5v-350h245q20 0 25 -11t-9 -26l-383 -426q-14 -15 -33.5 -15t-32.5 15l-379 426q-13 15 -8.5 26t25.5 11h250v350q0 21 14.5 35.5t35.5 14.5zM50 300h1000q21 0 35.5 -14.5t14.5 -35.5v-250h-1100v250q0 21 14.5 35.5t35.5 14.5z M900 200v-50h100v50h-100z"
                        />
                      </g>
                    </svg>
                  </span>
                </button>
              </td>
              <td style="padding: 10px">
                <button
                  type="button"
                  id="config_delete_override"
                  class="btn btn-warning"
                  onclick="Delete_config_override()"
                >
                  <span>
                    <svg width="1.3em" height="1.2em" viewBox="0 0 1300 1200">
                      <g transform="translate(50,1200) scale(1, -1)">
                        <path
                          fill="currentColor"
                          d="M500 1300h300q41 0 70.5 -29.5t29.5 -70.5v-100h275q10 0 17.5 -7.5t7.5 -17.5v-75h-1100v75q0 10 7.5 17.5t17.5 7.5h275v100q0 41 29.5 70.5t70.5 29.5zM500 1200v-100h300v100h-300zM1100 900v-800q0 -41 -29.5 -70.5t-70.5 -29.5h-700q-41 0 -70.5 29.5t-29.5 70.5 v800h900zM300 800v-700h100v700h-100zM500 800v-700h100v700h-100zM700 800v-700h100v700h-100zM900 800v-700h100v700h-100z"
                        />
                      </g>
                    </svg>
                  </span>
                </button>
              </td>
            </tr>
          </table>
          <table
            class="table table-bordered table-striped table-hover table-responsive"
            style="
              width: auto;
              max-width: 90% !important;
              word-wrap: break-word;
            "
          >
            <tbody id="config_override_data"></tbody>
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
        return {}
      }
    }
  },
  data() {
    return {
      config: [],
      loading: false
    }
  },
  methods: {
    refreshConfig() {
      this.loading = true
      return this.$store.getConfig(this.fwData.target_firmware)
        .then((response) => {
          this.config = response
        })
        .catch(err => {
          this.$modal({
            title: 'Get Config failed',
            message: 'Error' + err.message
          })
        })
        .finally(() => {
          this.loading = false
        })
    },
    updateConfig(item) {
      this.loading = true
      return this.$store.updateConfig(item.cmd + item.value)
        .catch((err) => {
          this.$modal({
            title: 'Set failed',
            message: 'Error' + err.message
          })
        })
        .finally(() => {
          this.loading = false
        })
    }
  },
  mounted() {
    this.refreshConfig()
  }
}
</script>