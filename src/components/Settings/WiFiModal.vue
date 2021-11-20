<template>
  <div class="modal-body">
    <center>
      <span v-t v-if="!wifis.length">Scanning</span>
      <div class="loader hidden"></div>
      <div class="table-responsive" v-if="wifis.length">
        <table class="table table-bordered table-striped">
          <thead class="noshowonlowrestab">
            <tr>
              <th v-t>SSID</th>
              <th v-t>Signal</th>
              <th v-t>Protected</th>
              <th v-t>Join</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="wifi in wifis" :key="wifi.SSID">
              <td>{{ wifi.SSID }}</td>
              <td>{{ wifi.SIGNAL }}%</td>
              <td>
                <i
                  class="glyphicon"
                  :class="'glyphicon-' + (wifi.IS_PROTECTED=='1' ? 'lock' : 'signal')"
                ></i>
              </td>
              <td>
                  <button class="btn btn-sm btn-success" @click="join(wifi)">
                      <i class="glyphicon glyphicon-ok"></i>
                  </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </center>
  </div>
</template>

<script>
export default {
  data() {
    return {
      wifis: [],
    };
  },
  methods: {
    scanWifi() {
      return this.$store.scanWifi().then((response) => {
        this.wifis = response;
      });
    },
    join(wifi) {
        this.$emit('success', wifi.SSID)
    }
  },
  mounted() {
    this.scanWifi();
  },
};
</script>