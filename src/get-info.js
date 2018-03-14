const isJson = require('./util/is-json')
const parseArgs = require('./util/parse-args')
const p = require('./util/p')
const execa = require('execa')
const debug = require('debug')('youtube-dl2:get-info')

async function getInfo(urls, args = {}) {
  urls = Array.isArray(urls) ? urls : [urls]

  args = Object.assign({
    dump_json: true
  }, args)

  args = parseArgs(args)

  args.push('--')
  urls.forEach((url) => { args.push(url) })

  let [ err, result ] = await p(execa('youtube-dl', args))
  if (err) throw err

  let info = result.stdout.trim().split(/\r?\n/).map((data) => {
    if (!isJson(data)) throw new Error('Output is not json')

    return JSON.parse(data)
  })

  if (info.length === 1) info = info[0]

  return info
}

module.exports = getInfo