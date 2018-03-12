const getInfo = require('./get-info')
const p = require('./util/p')
const got = require('got')

async function download(data, options) {
  
}

async function toFile(data, fileName, options = {}) {
  if (data === undefined) throw new Error('Need something to download')
  
  options = Object.assign({

  }, options)

  let url
  
  if (typeof data === 'string') {
    let [ err, info ] = await p(getInfo(data, options))
  } else if (data.url !== undefined) {
    url = data.url
  } else {
    throw new Error('Invalid url')
  }
}