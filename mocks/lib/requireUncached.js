const path = require('path')
module.exports = function requireUncached(dir, file) {
  const module = path.join(dir, file)
  delete require.cache[require.resolve(module)];
  return require(module);
}