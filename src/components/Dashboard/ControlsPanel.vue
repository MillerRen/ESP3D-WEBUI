<template>
  <div id="controlPanel" class="panel panel-default panel-flex-col panel-min-width">
    <div class="panel-heading">
      <div class="row">
        <div class="col-md-12">
          <div class="pull-left">
            <h3 class="panel-title">
              <span translate>Controls</span>
            </h3>
          </div>
          <div class="pull-right">
            <div id="auto_check_control" class="panel-flex-row">
                  <div class="checkbox">
                    <label>
                      <input
                        type="checkbox"
                        id="autocheck_position"
                        onclick="on_autocheck_position()"
                      />
                      <span translate>auto-check position every:</span>
                    </label>
                  </div>
                  <div class="input-group">
                    <input
                      class="form-control w4"
                      type="number"
                      min="1"
                      max="99"
                      id="posInterval_check"
                      v-model="preferences.interval_positions"
                      onchange="onPosIntervalChange()"
                    />
                    <span class="input-group-addon" translate>sec</span>
                  </div>
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
      <div
        class="position-container"
        v-if="fwData.target_firmware == 'grbl' || fwData.target_firmware == 'grbl-embedded'"
      >
        <button
          class="btn btn-xs btn-default"
          id="zero_xyz_btn"
          onclick="SendZerocommand(grblzerocmd)"
        >
          &Oslash;
          <span style="font-size:8px;" id="zero_xyz_btn_txt">{{ axis.toUpperCase() }}</span>
        </button>
      </div>
      <br />
      <div
        class="position-container"
        v-if="fwData.target_firmware == 'grbl' || fwData.target_firmware == 'grbl-embedded'"
      >
        <div class="position_text" v-for="axes in axis" :key="axes">
          <table>
            <tr>
              <td>
                <button class="btn btn-xs btn-default" onclick="SendZerocommand('X0')">&Oslash;</button>
              </td>
              <td>
                <span class="label label-default" style="padding: 5px 5px 3px 5px;">
                  <span>{{ fwData.target_firmware == 'grbl' || fwData.target_firmware == 'grbl-embedded' ? axes.toUpperCase() + 'w' : axes.toUpperCase() }}</span>:
                  <span>{{ WPos[axes] }}</span>
                </span>
              </td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td>
                <table>
                  <tr style="height: 5px;"></tr>
                  <tr>
                    <td>
                      <span class="label label-default" style="padding: 5px 5px 3px 5px;">
                        <span>{{ axes.toUpperCase() }}m</span>:
                        <span>{{ MPos[axes] }}</span>
                      </span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <br />
    </div>
    <div class="panel-footer">
      <div class="panel-flex-row">
        <table class="input-group">
          <tr>
            <td>
              <span class="input-group-addon form_control">XY:</span>
              <input class="hidden" />
            </td>
            <td>
              <span class="input-group-addon hidden"></span>
              <input
                class="form-control w8"
                type="number"
                min="1"
                v-model="preferences.xy_feedrate"
              />
              <span class="input-group-addon form_control" translate>mm/min</span>
            </td>
          </tr>
        </table>&nbsp;
        <table id="z_velocity_display" class="input-group">
          <tr>
            <td>
              <span class="input-group-addon form_control" id="axis_label">Z:</span>
              <input class="hidden" />
            </td>
            <td class="hidden" id="axis_selection"></td>
            <td>
              <span class="input-group-addon hidden"></span>
              <input
                class="form-control w5"
                type="number"
                min="1"
                v-model="preferences.z_feedrate"
                onchange="onZvelocityChange()"
              />
              <span class="input-group-addon form_control" translate>mm/min</span>
            </td>
          </tr>
        </table>&nbsp;
        <button
          id="motor_off_control"
          class="btn btn-primary"
          onclick="control_motorsOff()"
          translate
        >Motors off</button>
      </div>
    </div>
  </div>
</template>

<script>
import Jog from "./Jog.vue";

export default {
  components: {
    Jog,
  },
  props: {
    fwData: {
      type: Object,
      default() {
        return {}
      }
    },
    preferences: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  // data () {
  //   return {
  //     axis: 'xyzabc'
  //   }
  // },
  computed: {
    MPos() {
      return this.$store.MPos
    },
    WPos() {
      return this.$store.WPos
    },
    axis() {
      return 'xyzabc'.slice(0, this.$store.fwData.grblaxis)
    }
  }
};
</script>