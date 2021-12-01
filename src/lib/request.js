const defaults = {
  baseURL: '',
  method: 'get',
  url: '',
  params: {},
  body: null,
  timeout: 0,
  serialize: function (obj) {
    return Object.keys(obj)
      .map(k => `${k}=${obj[k]}`)
      .join('&')
  }
}

function buildURL(url, params, serialize) {
  if(typeof params == 'undefined') return url
  return url + '?' + serialize(params)
}

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
          statusText: xhr.statusText,
          responseText: xhr.responseText
        })
      let res = 'response' in xhr ? xhr.response : xhr.responseText
      if ((typeof res == 'string') && res.indexOf('<')!=0) {
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
    if (config.onDownloadProgress) {
      xhr.onprogress = config.onDownloadProgress
    }
    if (config.onUploadProgress) {
      xhr.upload.onprogress = config.onUploadProgress
    }

    xhr.send(config.data)
  })
}

export default request
