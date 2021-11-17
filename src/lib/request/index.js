import buildURL from './buildURL'
import { typeOf } from './utils'
import defaults from './defaults'

function request (config) {
  config = Object.assign({}, defaults, config)
  return new Promise(function (resolve, reject) {
    const url = buildURL(config.url, config.params, config.serialize)
    const xhr = new XMLHttpRequest()
    xhr.open(config.method, url, true)
    xhr.timeout = config.timeout
    xhr.responseType = config.responseType || 'text'
    xhr.onreadystatechange = function () {
      if (xhr.readyState != 4) return
      if (xhr.status >= 400)
        return reject({
          status: xhr.status,
          statusText: xhr.statusText
        })
      let res = 'response' in xhr ? xhr.response : xhr.responseText
      if (res && typeOf(res) == 'String') {
        try {
          res = JSON.parse(res)
        } catch (e) {
          console.log(config.url, e)
        }
      }

      const response = {
        status: xhr.status,
        statusText: xhr.statusText,
        data: res
      }
      resolve(response)
    }
    xhr.onabort = function () {
      reject(new Error('request abort'))
    }
    xhr.onerror = function (err) {
      reject(new Error(err))
    }
    xhr.ontimeout = function () {
      reject(new Error('request abort'))
    }
    if (typeOf(config.onDownloadProgress) == 'Function') {
      xhr.onprogress = config.onDownloadProgress
    }
    if (typeOf(config.onUploadProgress) == 'Function') {
      xhr.upload.onprogress = config.onUploadProgress
    }

    xhr.send(config.data)
  })
}

export default request
