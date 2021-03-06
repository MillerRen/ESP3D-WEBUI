// import 'core-js' 可以再这里按需引入polyfill
import 'bootstrap/dist/css/bootstrap.css'
import Vue from 'vue'
import './directives'
import './components'
import './store'
import VueModalBootstrap from './plugins/modal'

import App from './App.vue'

Vue.use(VueModalBootstrap)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
