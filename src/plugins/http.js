
import http from '../lib/http'
import request from '../lib/request'

export default function (Vue) {
  Vue.prototype.$http = http
  Vue.prototype.$request = request
}