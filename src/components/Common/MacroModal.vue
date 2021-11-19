<template>
  <form class="modal-body" @submit.prevent="updateMacros">
    <table class="table table-responsive">
      <thead>
        <tr>
          <th></th>
          <th v-t>Name</th>
          <th v-t>Icon</th>
          <th v-t>Color</th>
          <th v-t>Target</th>
          <th v-t>Filename/URI</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(m, index) in macros" :key="index">
          <td>
            <button
              type="button"
              class="btn btn-sm btn-default"
              v-if="!m.class"
              @click="resetMacro(m)"
            >
              <i class="glyphicon glyphicon-plus"></i>
            </button>
            <button
              type="button"
              class="btn btn-sm btn-danger"
              v-if="m.class"
              @click="resetMacro(m)"
            >
              <i class="glyphicon glyphicon-trash"></i>
            </button>
          </td>
          <td>
            <input
              type="text"
              v-model="m.name"
              class="form-control w4 input-sm"
              v-if="m.class"
              required
            />
          </td>
          <td>
            <div class="btn-group" v-if="m.class">
              <button type="button" class="btn btn-sm dropdown-toggle" :class="'btn-' + m.class">
                <i class="glyphicon" :class="'glyphicon-' + m.glyph" v-if="m.class"></i>
                <span class="caret"></span>
              </button>
              <ul class="dropdown-menu" style="min-width:20em">
                <li style="width:2em;float:left" v-for="icon in icons" :key="icon">
                  <a href @click.prevent="m.glyph=icon">
                    <i class="glyphicon" :class="'glyphicon-' + icon"></i>
                  </a>
                </li>
              </ul>
            </div>
          </td>
          <td>
            <div class="btn-group" v-if="m.class">
              <button type="button" class="btn btn-sm dropdown-toggle" :class="'btn-' + m.class">
                {{ m.class }}
                <span class="caret"></span>
              </button>
              <ul class="dropdown-menu">
                <li
                  :value="color"
                  v-for="color in [
                    'default',
                    'primary',
                    'info',
                    'warning',
                    'danger'
                  ]"
                  :key="color"
                >
                  <a
                    href
                    @click.prevent="m.class = color"
                    class="btn btn-sm"
                    :class="'btn-' + color"
                  >{{ color }}</a>
                </li>
              </ul>
            </div>
          </td>
          <td>
            <select v-model="m.target" class="form-control input-sm" v-if="m.class" required>
              <option
                :value="target"
                v-for="target in ['ESP', 'SD', 'URI']"
                :key="target"
              >{{ target }}</option>
            </select>
          </td>
          <td>
            <input type="text" class="form-control input-sm" v-model="m.filename" v-if="m.class" />
          </td>
        </tr>
      </tbody>
    </table>
    <hr />
    <div class="clearfix">
      <!-- <div class="pull-left" id="macrodlg_upload_msg">
        <span v-t>Saving</span>
        &nbsp;
        <progress name="prg" id="macrodlg_prg" max="100"></progress>
        &nbsp;
        <span id="macrodlg_upload_percent">0</span>%
      </div>-->
      <div class="pull-right">
        <button type="submit" class="btn btn-primary pull-right" v-t>Save</button>
      </div>
    </div>
  </form>
</template>

<script>
import { ICONS_LIST } from "../../constants"
export default {
  computed: {
    macros() {
      return this.$store.macros
    },
    icons() {
      return ICONS_LIST
    }
  },
  methods: {
    getMacros() {
      return this.$store.getMacros()
    },
    updateMacros() {
      this.$store.updateMacros(this.$store.macros)
        .then(() => {
          this.$emit('success')
        })
    },
    resetMacro(m) {
      if (m.class) {
        m.name = ''
        m.class = ''
        m.target = ''
        m.glyph = ''
        m.filename = ''
      } else {
        m.name = 'M' + (1 + m.index)
        m.class = 'default'
        m.target = 'ESP'
        m.glyph = 'star'
        m.filename = '/macro' + (1 + m.index) + '.g'
      }
    }
  },
  mounted() {
    this.getMacros()
  }
}
</script>

<style></style>
