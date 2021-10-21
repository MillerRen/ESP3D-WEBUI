<template>
  <div
    id="controlPanel"
    class="panel panel-default panel-flex-col panel-min-width"
  >
    <div class="panel-heading">
      <div class="row">
        <div class="col-md-12">
          <div class="pull-left">
            <b><span translate>Controls</span></b>
          </div>
          <div class="pull-right">
            <div id="auto_check_control" class="panel-flex-row">
              <table class="checkbox">
                <tr>
                  <td>&nbsp;&nbsp;</td>
                  <td>
                    <label>
                      <input
                        type="checkbox"
                        id="autocheck_position"
                        onclick="on_autocheck_position()"
                      />
                      <span translate>auto-check position every:</span>
                    </label>
                  </td>
                </tr>
              </table>
              <table class="input-group">
                <tr>
                  <td>
                    <input
                      class="form-control w4"
                      type="number"
                      min="1"
                      max="99"
                      id="posInterval_check"
                      onchange="onPosIntervalChange()"
                    />
                    <span class="input-group-addon form_control" translate
                      >sec</span
                    >
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="control-body" class="panel-body panel-flex-main">
      <div class="row">
        <div id="JogUI" class="col col-md-7 col-lg-7">
            <Jog />
        </div>
        <div class="col col-lg-4">
          <div id="Macro_list" class="macro-container"></div>
        </div>
        <div class="col">&nbsp;</div>
      </div>
    </div>
    <div class="panel-footer">
      <div class="panel-flex-row">
        <table class="input-group">
          <tr>
            <td>
              <span class="input-group-addon form_control">XY:</span>
              <input class="hide_it" />
            </td>
            <td>
              <span class="input-group-addon hide_it"></span>
              <input
                class="form-control w8"
                type="number"
                min="1"
                id="control_xy_velocity"
                onchange="onXYvelocityChange()"
              />
              <span class="input-group-addon form_control" translate
                >mm/min</span
              >
            </td>
          </tr>
        </table>

        &nbsp;
        <table id="z_velocity_display" class="input-group">
          <tr>
            <td>
              <span class="input-group-addon form_control" id="axis_label"
                >Z:</span
              >
              <input class="hide_it" />
            </td>
            <td class="hide_it" id="axis_selection"></td>
            <td>
              <span class="input-group-addon hide_it"></span>
              <input
                class="form-control w5"
                type="number"
                min="1"
                id="control_z_velocity"
                onchange="onZvelocityChange()"
              />
              <span class="input-group-addon form_control" translate
                >mm/min</span
              >
            </td>
          </tr>
        </table>

        &nbsp;
        <button
          id="motor_off_control"
          class="btn btn-primary"
          onclick="control_motorsOff()"
          translate
        >
          Motors off
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Jog from './Jog.vue'

export default {
    components: {
        Jog
    }
}
</script>