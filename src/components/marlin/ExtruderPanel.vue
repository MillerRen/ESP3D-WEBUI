<template>
  <div class="panel panel-default panel-flex-col panel-min-width">
    <div class="panel-heading">
      <div class="row">
        <div class="col-md-12">
          <div class="pull-left">
            <b>
              <span v-t>Extruders</span>
            </b>
          </div>
        </div>
      </div>
    </div>
    <div class="panel-body panel-height panel-flex-main">
      <ul class="list-group">
        <li class="list-group-item">
          <div class="row">
            <div class="col-md-4">
              <b>
                <label v-t>Name</label>
              </b>
            </div>
            <div class="col-md-8">
              <b>
                <label v-t>Options</label>
              </b>
            </div>
          </div>
        </li>
        <li class="list-group-item hidden">
          <div class="row">
            <div class="col-md-4">
              <table>
                <tr>
                  <td>
                    <span v-t>Extruder</span>
                  </td>
                  <td>&nbsp;</td>
                  <td>
                    <select
                      style="width: 4em"
                      class="form-control"
                      v-model="preferences.active_extruder"
                      onchange="Set_active_extruder(); "
                    >
                      <option value="0">0</option>
                      <option value="1">1</option>
                    </select>
                  </td>
                </tr>
              </table>
            </div>
            <div class="col-md-8">
              <div class="form-inline">
                <div class="form-group">
                  <button
                    onclick="Extrude_cmd(current_active_extruder, 1)"
                    class="btn btn-primary"
                    v-t
                  >
                    Extrude
                  </button>
                  <button
                    onclick="Extrude_cmd(current_active_extruder, -1)"
                    class="btn btn-info"
                    v-t
                  >
                    Reverse
                  </button>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li class="list-group-item">
          <div class="row">
            <div class="col-md-4">
              <span v-t>Extruder T0</span>
            </div>
            <div class="col-md-8">
              <div class="form-inline">
                <div class="form-group">
                  <button
                    onclick="Extrude_cmd('T0', 1)"
                    class="btn btn-primary"
                    v-t
                  >
                    Extrude
                  </button>
                  <button
                    @click="Extrude_cmd('T0', -1)"
                    class="btn btn-info"
                    v-t
                  >
                    Reverse
                  </button>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li class="list-group-item">
          <div class="row">
            <div class="col-md-4">
              <span v-t>Extruder T1</span>
            </div>
            <div class="col-md-8">
              <div class="form-inline">
                <div class="form-group">
                  <button
                    @click="Extrude_cmd('T1', 1)"
                    class="btn btn-primary"
                    v-t
                  >
                    Extrude
                  </button>
                  <button
                    onclick="Extrude_cmd('T1', -1)"
                    class="btn btn-info"
                    v-t
                  >
                    Reverse
                  </button>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li class="list-group-item">
          <div class="row">
            <div class="col-md-4">
              <span v-t>Flow (50-300%)</span>&nbsp;
              <span></span>
            </div>
            <div class="col-md-8">
              <div class="panel-flex-row">
                <div class="input-group input-group-sm">
                  <span class="input-group-btn">
                    <button onclick="flowInit_cmd()" class="btn btn-primary">
                      <i class="glyphicon glyphicon-repeat"></i>
                    </button>
                  </span>
                  <input
                    class="form-control w5"
                    type="number"
                    min="50"
                    max="300"
                    v-model="preferences.flowSelectedValue"
                    value
                    onkeyup="extruder_handleKeyUp(event, 'Flow')"
                  />
                  <span class="input-group-addon" v-t>&#37;</span>
                  <span class="input-group-btn">
                    <button onclick="flowSet_cmd()" class="btn btn-warning">
                      <i class="glyphicon glyphicon-ok"></i>
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li class="list-group-item">
          <div class="row">
            <div class="col-md-4">
              <span v-t>Feed (25-150%)</span>&nbsp;
              <span></span>
            </div>
            <div class="col-md-8">
              <div class="panel-flex-row">
                <div class="input-group input-group-sm">
                  <span class="input-group-btn">
                    <button onclick="feedInit_cmd()" class="btn btn-primary">
                      <i class="glyphicon glyphicon-repeat"></i>
                    </button>
                  </span>
                  <input
                    class="form-control w5"
                    type="number"
                    min="25"
                    max="150"
                    v-model="preferences.feedSelectedValue"
                    value
                    onkeyup="extruder_handleKeyUp(event,'Feed')"
                  />
                  <span class="input-group-addon" translate>&#37;</span>
                  <span class="input-group-btn">
                    <button onclick="feedSet_cmd()" class="btn btn-warning">
                      <i class="glyphicon glyphicon-ok"></i>
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li class="list-group-item">
          <div class="row">
            <div class="col-md-4">
              <span v-t>Fan (0-100%)</span>
            </div>
            <div class="col-md-8">
              <div class="panel-flex-row">
                <div class="input-group input-group-sm">
                  <span class="input-group-btn">
                    <button onclick="fanOff_cmd()" class="btn btn-primary">
                      <i class="glyphicon glyphicon-repeat"></i>
                    </button>
                  </span>
                  <input
                    class="form-control w5"
                    type="number"
                    min="0"
                    max="100"
                    v-model="preferences.fanSelectedValue"
                    onkeyup="extruder_handleKeyUp(event, 'Fan')"
                  />
                  <span class="input-group-addon" translate>&#37;</span>
                  <span class="input-group-btn">
                    <button onclick="fanSet_cmd()" class="btn btn-warning">
                      <i class="glyphicon glyphicon-ok"></i>
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="panel-footer">
      <div class="panel-flex-row">
        <div class="input-group input-group-sm">
          <span class="input-group-addon" v-t>Extrude</span>
          <input
            class="form-control w4"
            type="number"
            min="1"
            max="9999"
            onchange="on_extruder_length_Change()"
            onkeyup="on_extruder_length_Change()"
            v-model="preferences.e_distance"
          />
          <span class="input-group-addon" v-t>mm</span>
        </div>
        &nbsp;
        <div class="input-group input-group-sm">
          <span class="input-group-addon">@</span>
          <input
            class="form-control w5"
            type="number"
            min="1"
            max="9999"
            onkeyup="on_extruder_velocity_Change()"
            v-model="preferences.e_feedrate"
          />
          <span class="input-group-addon" v-t>mm/min</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["preferences"],
};
</script>