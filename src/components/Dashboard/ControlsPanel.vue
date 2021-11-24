<template>
  <div  class="panel panel-default panel-flex-col panel-min-width">
    <div class="panel-heading">
      <h3 class="panel-title">
        <span v-t>Controls</span>
      </h3>
    </div>
    <div  class="panel-body panel-flex-main">
      <div class="row">
        <div  class="col col-md-8 col-lg-6">
          <Jog :selectAxis="selectAxis.toUpperCase()" />
        </div>
        <div class="col col-md-4 col-lg-6">
          <div  class="macro-container">
            <button class="btn btn-primary btn-sm" @click="openMacroModal">
              <i class="glyphicon glyphicon-plus-sign"></i>
            </button>
            <button
              class="btn btn-sm"
              :class="'btn-'+m.class"
              v-for="(m,index) in macros"
              :key="index"
              v-show="m.class"
              @click="runMacro(m)"
            >
            <i class="glyphicon" :class="'glyphicon-'+m.glyph"></i>
            {{ m.name }}
            </button>
          </div>
        </div>
        <div class="col">&nbsp;</div>
      </div>
      <div
        class="position-container"
        v-if="fwData.target_firmware == 'grbl' || fwData.target_firmware == 'grbl-embedded'"
      >
        <button class="btn btn-xs btn-default"  @click="sendZeroCommand(zeroAxes)">
          &Oslash;
          <span style="font-size:8px;" >{{ axis.toUpperCase() }}</span>
        </button>
        <button
          
          class="btn btn-primary btn-xs"
          @click="motorsOff()"
          v-t
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
                <button
                  class="btn btn-xs btn-default"
                  @click="sendZeroCommand(axes.toUpperCase() + '0')"
                >&Oslash;</button>
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
        <div class="input-group input-group-sm">
          <span class="input-group-addon">XY:</span>
          <input class="form-control w8" type="number" min="1" v-model="preferences.xy_feedrate" />
          <span class="input-group-addon" v-t>mm/min</span>
        </div>&nbsp;
        <div class="input-group input-group-sm">
          <span class="input-group-addon" >{{selectAxis.toUpperCase()}}:</span>
          <select class="form-control w5" v-model="selectAxis" v-if="axis.length>3">
            <option :value="axes" v-for="axes in axis.slice(2)" :key="axes">{{axes}}</option>
          </select>
          <input class="form-control w5" type="number" min="1" v-model="preferences[selectAxis+'_feedrate']" />
          <span class="input-group-addon" v-t>mm/min</span>
        </div>
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
    zeroAxes() {
      return this.axis.split('').map(item => item.toUpperCase() + '0').join(' ')
    },
    macros() {
      return this.$store.macros
    }
  },
  data () {
    return {
      selectAxis: 'z'
    }
  },
  methods: {
    motorsOff() {
      return this.$store.motorsOff()
    },
    openMacroModal() {
      var macroModal = this.$modal({
        title: 'Macro Editor',
        events: {
          success () {
            if(macroModal) macroModal.close()
          }
        }
      }, 'MacroModal')
    },
    runMacro(m) {
      return this.$store.runMacro(m)
    },
    sendZeroCommand(axis) {
      return this.$store.sendZeroCommand(axis)
    }
  },
  mounted () {
    // this.$store.getMacros()
  }
};
</script>

<style>
.macro-container {
  display: grid;
  grid-gap: 10px;
  padding: 10px;
  grid-template-columns: 50% 50%;
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