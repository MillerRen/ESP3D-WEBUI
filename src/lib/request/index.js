import buildURL from './buildURL'
import { typeOf } from './utils'
import defaults from './defaults'

function request (config) {
  config = Object.assign({}, defaults, config)
  return new Promise(function (resolve, reject) {
    const url = buildURL(config.url, config.params, config.serialize)
    const xhr = new XMLHttpRequest()
    xhr.timeout = config.timeout
    xhr.onreadystatechange = function () {
      if (xhr.readyState != 4) return
      const response = {
        status: xhr.status,
        statusText: xhr.statusText,
        data:
          !config.responseType || ~xhr.responseType.indexOf(['text', 'json'])
            ? xhr.responseText
            : xhr.response
      }
      try{
        const res = config.transformResponse.call(config, response.data)
        resolve(res)
      } catch(e) {
        reject(e)
      }
      
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
    xhr.open(config.method, url, true)
    xhr.send(config.data)
  })
}

export default request
