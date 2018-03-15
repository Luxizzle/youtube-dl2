const through2 = require('through2')
const getInfo = require('./get-info')
const p = require('./util/p')
const parseArgs = require('./util/parse-args')
const execa = require('execa')
const fs = require('fs-extra')
const getStream = require('get-stream')

function stream(urls, args = {}) {
  urls = Array.isArray(urls) ? urls : [urls]

  args = Object.assign({
    o: '-',
    quiet: true
  }, args)

  args = parseArgs(args)

  args.push('--')
  urls.forEach((url) => { args.push(url) })

  let dlProcess = execa('youtube-dl', args, {
    maxBuffer: Infinity
  })

  let stream = through2()

  dlProcess.stdout
    .pipe(stream)

  dlProcess.catch((err) => stream.destroy(err))
 
  return stream
}

function buffer(urls, args = {}) {
  return new Promise(async (resolve, reject) => {
    urls = Array.isArray(urls) ? urls : [urls]

    let dlStream = stream(urls, args)

    let data = []

    dlStream
      .on('data', (chunk) => {
        data.push(chunk)
      })
      .on('error', (err) => {
        reject(err)
      })
      .on('finish', () => {
        resolve(Buffer.concat(data))
      })

  })
}

function file(filename, urls, args) {
  let dlStream = stream(urls, args)
  let file = fs.createWriteStream(filename)
  dlStream.pipe(file)

  return getStream(dlStream)
}

module.exports = {
  stream,
  buffer,
  file
}