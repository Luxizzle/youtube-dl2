module.exports = require('./src/download').stream

Object.assign(module.exports, {
  getInfo: require('./src/get-info'),
  buffer: require('./src/download').buffer
})