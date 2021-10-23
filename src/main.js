import 'bootstrap/dist/css/bootstrap.css'
import Vue from 'vue'
import './filters/icon'
import VueModalBootstrap from './plugins/modal'

import App from './App.vue'

Vue.use(VueModalBootstrap)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
