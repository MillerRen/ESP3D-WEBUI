<template>
  <div class="panel panel-default panel-min-width">
    <div class="panel-heading">
      <div class="row">
        <div class="col-md-12">
          <div class="pull-left">
            <h3 class="panel-title">
              <span v-t>Temperatures</span>
            </h3>
          </div>
        </div>
      </div>
    </div>
    <div class="panel-body panel-height-temp">
      <table class="table table-responsive">
        <thead>
          <tr>
            <th v-t>Name</th>
            <th v-t>Options</th>
            <th v-t>Value | Target</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in 2" :key="i">
            <td>
              <span v-t>Heater T{{ i - 1 }}</span>
            </td>
            <td>
              <div class="panel-flex-row">
                <div class="input-group input-group-sm">
                  <span class="input-group-btn">
                    <button
                      onclick="temperature_heatOff('T0')"
                      class="btn btn-primary"
                    >
                      <i class="glyphicon glyphicon-off"></i>
                    </button>
                  </span>
                  <input
                    class="form-control"
                    type="number"
                    min="0"
                    max="999"
                    v-model="preferences.heaterT0SelectedTemp"
                    onkeyup="temperature_handleKeyUp(event, 'T0')"
                  />
                  <span class="input-group-addon" v-t>&deg;C</span>
                  <span class="input-group-btn">
                    <button
                      onclick="temperature_heatSet('T0')"
                      class="btn btn-warning"
                    >
                      <i class="glyphicon glyphicon-ok"></i>
                    </button>
                  </span>
                </div>
              </div>
            </td>
            <td>
              <div class="panel-flex-col panel-flex-center">
                <span class="tempDisplay"></span>
                <span
                  class="invisible loader-pulse pull-right"
                  style="color: red"
                ></span>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <span v-t>Redundant</span>
            </td>
            <td>
              <div class="panel-flex-row">
                <span class="noshowonlowres">&nbsp;&nbsp;</span>
              </div>
            </td>
            <td>
              <div class="panel-flex-col panel-flex-center">
                <span class="tempDisplay"></span>
                <span
                  class="invisible loader-pulse pull-right"
                  style="color: red"
                ></span>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <span v-t>Probe</span>
            </td>
            <td>
              <div class="panel-flex-row">
                <span class="noshowonlowres">&nbsp;&nbsp;</span>
              </div>
            </td>
            <td>
              <div class="panel-flex-col panel-flex-center">
                <span class="tempDisplay"></span>
                <span
                  class="invisible loader-pulse pull-right"
                  style="color: red"
                ></span>
              </div>
            </td>
          </tr>
          <tr v-for="t in ['Bed', 'Chamber']" :key="t">
            <td>
              <span v-t>{{ t }}</span>
            </td>
            <td>
              <div class="panel-flex-row">
                <div class="input-group input-group-sm">
                  <span class="input-group-btn">
                    <button
                      onclick="temperature_heatOff('T0')"
                      class="btn btn-primary"
                    >
                      <i class="glyphicon glyphicon-off"></i>
                    </button>
                  </span>
                  <input
                    class="form-control"
                    type="number"
                    min="0"
                    max="999"
                    v-model="preferences.heaterT0SelectedTemp"
                    onkeyup="temperature_handleKeyUp(event, 'T0')"
                  />
                  <span class="input-group-addon" v-t>&deg;C</span>
                  <span class="input-group-btn">
                    <button
                      onclick="temperature_heatSet('T0')"
                      class="btn btn-warning"
                    >
                      <i class="glyphicon glyphicon-ok"></i>
                    </button>
                  </span>
                </div>
              </div>
            </td>
            <td>
              <div class="panel-flex-col panel-flex-center">
                <span class="tempDisplay"></span>
                <span
                  class="invisible loader-pulse pull-right"
                  style="color: red"
                ></span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <ul class="list-group">
        <li class="list-group-item hidden">
          <div class="panel-flex-row">
            <div>
              <canvas height="130" width="200"></canvas>
              &nbsp;&nbsp;
            </div>
            <div>
              <canvas height="130" width="200"></canvas>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="panel-footer">
        <div class="panel-flex-row">
              <div class="input-group input-group-sm">
                <label class="input-group-addon">
                  <input
                    type="checkbox"
                    v-model="preferences.enable_auto_check_temperature"
                    @click="autocheckTemperature()"
                  />
                  <span v-t>auto-check every:</span>
                </label>
                <input
                  class="form-control w4"
                  type="number"
                  min="1"
                  max="99"
                  v-model="preferences.interval_temperatures"
                  @change="onTempIntervalChange()"
                />
                <span class="input-group-addon form_control" translate
                  >sec</span
                >
              </div>
            </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['preferences']
};
</script>