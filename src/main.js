import Vue from 'vue'
import './directives'
import './components'
import './plugins'

import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
