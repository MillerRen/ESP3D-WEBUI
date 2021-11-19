<template>
  <div class="panel panel-default">
    <div class="panel-heading form-inline clearfix">
      <div class="btn-toolbar">
        <div class="input-group input-group-sm">
          <span class="input-group-btn">
            <button
              @click="createDir()"
              class="btn btn-info btn-sm"
              style="padding: -2px 2px 0x 0px;"
            >
              <i class="glyphicon glyphicon-folder-open"></i>
            </button>
          </span>
          <input type="text" class="form-control" placeholder="input dir name" />
        </div>

        <div class="input-group input-group-sm">
          <label
            for
            class="form-control file-input-label"
            :style="{ background: 'linear-gradient(90deg, #6c3 ' + progress + '%, #fff 0%)' }"
          >
            <span v-if="fileName">{{ fileName }}</span>
            <span v-if="!fileName">No file choosen</span>
            <input
              type="file"
              id="files_input_file"
              @change="checkFiles"
              accept=".g, .gco, .gcode, .G, .GCO, .GCODE"
              class="file-input"
            />
          </label>
          <span class="input-group-btn">
            <button
              type="button"
              class="btn btn-primary btn-sm"
              @click="upload"
              :disabled="!uploads.length || progress > 0"
            >
              <i class="glyphicon glyphicon-upload"></i>
            </button>
          </span>
        </div>
        <button class="btn btn-primary btn-sm" @click="refresh">
          <i class="glyphicon glyphicon-refresh"></i>
        </button>
      </div>
    </div>
    <div class="panel-body">
      <div class="file-list" style="height:350px;overflow-y:scroll">
        <ul class="list-group">
          <li
            v-if="currentPath != '/'"
            class="list-group-item list-group-hover"
            style="cursor:pointer"
            @click="levelup()"
          >
            <i class="glyphicon glyphicon-level-up"></i>&nbsp;&nbsp;
            <span v-t>Up...</span>
          </li>
          <li class="list-group-item list-group-hover" v-for="file in data.files" :key="file.name">
            <div class="row">
              <div class="col-md-5 col-sm-5 no_overflow">
                <table>
                  <tr>
                    <td>
                      <a href @click="dir(file.name)" class="btn btn-xs btn-link">{{ file.name }}</a>
                    </td>
                  </tr>
                </table>
              </div>
              <div class="col-md-2 col-sm2">{{ file.size != -1 ? file.size : '' }}</div>
              <div class="col-md-3 col-sm-3">{{ file.datetime }}</div>
              <div class="col-md-2 col-sm2" style="text-align:right">
                <button class="btn btn-xs btn-success" v-if="file.isprintable" @click="print(file)">
                  <i class="glyphicon glyphicon-play"></i>
                </button>
                &nbsp;
                <button class="btn btn-xs btn-danger" @click="remove(file)">
                  <i class="glyphicon glyphicon-trash"></i>
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="panel-footer">
      <div class="row" v-if="data.status && data.status.toLowerCase() == 'ok'">
        <div class="col-md-12">
          <div class="form-inline">
            <div class="form-group">
              <div class="form-control-static">
                <span>
                  <span v-t>Total:</span>&nbsp;
                  <span>{{ data.total }}</span>
                </span>
                <span>&nbsp;|&nbsp;</span>
                <span>
                  <span v-t>Used:</span>&nbsp;
                  <span>{{ data.used }}</span>
                </span>
                <span>&nbsp;</span>
                <span class="noshowonlowres">| &nbsp;</span>
                <span>
                  <span v-t>Occupation:</span>
                  <meter style="width:150px" min="0" max="100" high="90" :value="data.occupation"></meter>
                </span>
                <span>{{ data.occupation }}</span>
                <span>%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FileSystem',
  props: {
    adapter: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      currentPath: '/',
      progress: -1,
      uploads: [],
      data: {}
    }
  },
  computed: {
    fileName() {
      return this.uploads.length > 0 ? this.uploads[0].name : ''
    }
  },
  methods: {
    checkFiles(e) {
      this.uploads = e.target.files
    },
    dir() {
      return this.adapter.list(this.currentPath)
    },
    list() {
      // return this.adapter.list(this.currentPath)
    },
    refresh() {
      return this.list()
    },
    createDir(dir) {
      return this.adapter.createDir(dir)
    },
    upload() {
      return this.adapter.upload(this.uploads)
    },
    remove(file) {
      return this.adapter.remove(file)
    },
    print(file) {
      this.adapter.print(file)
    }
  },
  mounted() {
    this.list()
  }
}
</script>

<style>
.file-input-label {
  position: relative;
  width: 120px !important;
}
.file-input-label .file-input {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  opacity: 0.01;
  cursor: pointer;
}
</style>