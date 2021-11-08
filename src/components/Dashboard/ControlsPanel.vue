<template>
  <div id="controlPanel" class="panel panel-default panel-flex-col panel-min-width">
    <div class="panel-heading">
      <h3 class="panel-title">
        <span translate>Controls</span>
      </h3>
    </div>
    <div id="control-body" class="panel-body panel-flex-main">
      <div class="row">
        <div id="JogUI" class="col col-md-8">
          <Jog />
        </div>
        <div class="col col-md-4">
          <div id="Macro_list" class="macro-container">
            <button class="btn btn-primary" @click="openMacroModal">
              <i class="glyphicon glyphicon-star"></i>
              &nbsp;
              <i class="glyphicon glyphicon-pencil"></i>
            </button>
            <button
              class="btn"
              v-for="(m,index) in macros"
              :key="index"
              v-show="m.class"
            >{{ m.name }}</button>
          </div>
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
        <button
          id="motor_off_control"
          class="btn btn-primary btn-xs"
          @click="motorsOff()"
          translate
        >Motors off</button>
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
        &nbsp;
        <div class="input-group">
          <span class="input-group-addon form_control">XY:</span>
          <input class="form-control w8" type="number" min="1" v-model="preferences.xy_feedrate" />
          <span class="input-group-addon form_control" translate>mm/min</span>
        </div>&nbsp;
        <div class="input-group">
          <span class="input-group-addon form_control" id="axis_label">Z:</span>
          <input class="form-control w5" type="number" min="1" v-model="preferences.z_feedrate" />
          <span class="input-group-addon form_control" translate>mm/min</span>
        </div>
&nbsp;
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
  computed: {
    MPos() {
      return this.$store.MPos
    },
    WPos() {
      return this.$store.WPos
    },
    axis() {
      return 'xyzabc'.slice(0, this.$store.fwData.grblaxis)
    },
    macros() {
      return this.$store.macros
    }
  },
  methods: {
    motorOff() {
      return this.$store.motorOff()
    },
    openMacroModal() {
      this.$modal({
        title: 'Macro Editor'
      }, 'MacroModal')
    }
  }
};
</script>

<style>
.macro-container {
  display: grid;
    grid-gap: 10px;
    padding: 10px;
    grid-template-columns: 100%;
}
.position-container {
  margin-left: -10px;
  display: inline-grid;
  grid-gap: 10px;
  padding: 10px;
  grid-template-columns: auto auto auto auto;
}

.position_text {
  font-size: 16px;
  font-weight: bold;
}
</style>