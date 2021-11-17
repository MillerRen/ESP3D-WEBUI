function buildURL(url, params, serialize) {
  if(typeof params == 'undefined') return url
  return url + '?' + serialize(params)
}

export default buildURL