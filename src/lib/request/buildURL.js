function buildURL(url, params, serialize) {
  if(typeof url == 'undefined') return url
  return url + '?' + serialize(params)
}

export default buildURL