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
        <i class="glyphicon glyphicon-refresh"></i>
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
                                            
                                          >
                                          <i class="glyphicon glyphicon-repeat"></i>
                                          </button>
                                        </span>
                                        <input class="hidden" />
                                      </div>
                                    </td>
                                    <td>
                                      <div class="input-group">
                                        <span class="input-group-addon hidden"></span>
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
                                        <span class="input-group-addon hidden"></span>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <div class="input-group">
                                <input class="hidden" />
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
        <!-- <div id="config_override_list_content" class="hidden">
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
                  v-if="fwData.target_firmware=='smoothieware'"
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
        </div> -->
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
      loading: false
    }
  },
  computed: {
    config () {
      return this.$store.config
    }
  },
  methods: {
    refreshConfig() {
      this.loading = true
      return this.$store.getConfig()
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
        .then((reponse) => {
          if (reponse == 'ok') {
            item.defaultValue = item.value
          }
        })
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