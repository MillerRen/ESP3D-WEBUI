import Vue from 'vue'
const TargetFirmware = require('./models/' + process.env.VUE_APP_TARGET_ENV + '/index.js').default

if(process.env.NODE_ENV == 'development') {
    console.log('target:' + process.env.VUE_APP_TARGET_ENV)
}

const fw = new TargetFirmware()

const store = Vue.observable(fw)

Vue.prototype.$store = store

export default store
