import http from 'axios'

if (process.env.NODE_ENV === 'development') {
  require('../../mocks')
}

http.interceptors.response.use(
  function (response) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(
        response.config.url,
        new URLSearchParams(response.config.params).toString(),
        response
      )
    }
    return response.data
  },
  function (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(
        error.config.url,
        new URLSearchParams(error.config.params).toString()
      )
    }
    return Promise.reject(error)
  }
)

function sendGetHttp (url, params) {
  return http.get(url, {
    params
  })
}

function sendPostHttp (url, data, params) {
  return http.post(url, {
    data,
    params
  })
}

function sendFileHttp (space, files, path, onUploadProgress) {
  var fd = new FormData()
  fd.append('path', path)
  for (var i = 0; i < files.length; i++) {
    var file = files[i]
    var fileName = path + file.name
    var arg = fileName + 'S'
    fd.append(arg, file.size)
    fd.append('myfile[]', file, fileName)
  }
  return http
    .post(space, fd, {
      onUploadProgress
    })
    .then(response => response.data)
}

export default {
  sendGetHttp,
  sendPostHttp,
  sendFileHttp
}
