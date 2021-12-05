// simple translate directive
import Vue from 'vue'
// import messages from '../languages/zh_CN'

Vue.prototype.$messages = {}

export default function (el, binding, vnode) {
  let key = binding.value || el.textContent
  key = key.trim()
  el.textContent = vnode.context.$messages[key] || key // translate and fallback
}