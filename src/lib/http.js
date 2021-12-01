import request from './request'


function get (url, params) {
  return request({
    method: 'get',
    url,
    params
  })
  .then(response=>response.data)
}

function post (url, data, params) {
  return request({
    url,
    method: 'post',
    data,
    params
  })
  .then(response=>response.data)
}

function upload (space, files, path, onUploadProgress) {
  var fd = new FormData()
  fd.append('path', path)
  for (var i = 0; i < files.length; i++) {
    var file = files[i]
    var fileName = path + file.name
    var arg = fileName + 'S'
    fd.append(arg, file.size)
    fd.append('myfile[]', file, fileName)
  }
  return request({
      url: space,
      method: 'post',
      data: fd,
      onUploadProgress
    })
    .then(response => response.data)
}

function sendCommand (command) {
  return get('/command', {
    plain: command
  })
}

export default {
  get,
  post,
  upload,
  sendCommand
}
