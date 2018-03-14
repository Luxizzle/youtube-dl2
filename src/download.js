const DuplexStream = require('stream').Duplex
const getInfo = require('./get-info')
const p = require('./util/p')
const parseArgs = require('./util/parse-args')
const execa = require('execa')
const streamToPromise = require('stream-to-promise')

function stream(urls, args = {}) {
  urls = Array.isArray(urls) ? urls : [urls]

  args = Object.assign({
    o: '-',
    quiet: true
  }, args)

  args = parseArgs(args)

  args.push('--')
  urls.forEach((url) => { args.push(url) })

  let process = execa('youtube-dl', args)

  return process
}

async function buffer(urls, args = {}) {
  return new Promise(async (resolve, reject) => {
    urls = Array.isArray(urls) ? urls : [urls]

    //if (urls.length > 1) return reject( new Error('Playlists and multiple urls not supported right now') )
    //let [err, info] = await p(getInfo(urls, args))
    //if (err) return reject( err )
    //if (Array.isArray(info)) return reject( new Error('Playlists and multiple urls not supported right now') )

    let process = stream(urls, args)

    let data = []
    let errorData = []
    let isError = false

    process.stdout
      .on('data', (chunk) => {
        if (isError) return
        data.push(chunk)
      })
      .on('end', () => {
        if (isError) return
        resolve( Buffer.concat(data) )
      })

    process.stderr
      .on('data', async (chunk) => {
        isError = true
        errorData.push(chunk)
      })
      .on('end', () => {
        reject( Buffer.concat(errorData).toString() )
      })
  })

}

module.exports = {
  stream,
  buffer
}