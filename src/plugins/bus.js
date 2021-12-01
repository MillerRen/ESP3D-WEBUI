
export default function (Vue, options) {
  Vue.prototype.$bus = new Vue(options)
}