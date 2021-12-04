import Vue from 'vue'
import Model from './models'

const fw = new Model()

const store = Vue.observable(fw)

Vue.prototype.$store = store

export default store
