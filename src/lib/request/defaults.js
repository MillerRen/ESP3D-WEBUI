import { typeOf } from './utils'

export default {
  baseURL: '',
  method: 'get',
  url: '',
  params: {},
  body: null,
  timeout: 0,
  serialize: function (obj) {
    if (typeOf(obj) !== 'Object')
      throw new Error('serialize function only support object')
    return Object.keys(obj)
      .map(k => `${k}=${obj[k]}`)
      .join('&')
  }
}
