<template>
  <div  class="tabcontent">
    <center>
      <h2 >
        <span translate>Printer configuration</span>
      </h2>
      <button
        type="button"
        
        class="btn btn-primary"
        @click="refreshConfig();"
      >
        <i class="glyphicon glyphicon-refresh"></i>
      </button>
      <br />
      <span ></span>
      <hr />
      <div class="loader" v-show="loading"></div>
      <div >
        <div  v-if="fwData.target_firmware == 'smoothieware'">
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
                      <span >config</span>
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
                      <span >smoothieware</span>
                    </label>
                  </div>
                </td>
              </tr>
            </table>
          </center>
        </div>
        <div >
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
            <tbody >
              <tr v-for="item in config" :key="item.lable">
                <td style="vertical-align:middle">{{ item.label }}</td>
                <td style="vertical-align:middle;">
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <div
                            class="has-feedback"
                            :class="{ 'has-warning': item.defaultvalue != item.value }"
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
                                class="form-control"
                                style="width:auto"
                                v-model="item.value"
                              />
                              <span class="input-group-btn">
                                <button
                                  
                                  class="btn btn-default"
                                  @click="updateConfig(item)"
                                  translate
                                  english_content="Set"
                                >Set</button>&nbsp;
                              </span>
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
        <!-- <div  class="hidden">
          <table>
            <tr>
              <td style="padding: 10px">
                <button
                  type="button"
                  
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
            <tbody ></tbody>
          </table>
        </div>-->
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
    config() {
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