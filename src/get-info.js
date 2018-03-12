const isJson = require('./util/is-json')
const parseArgs = require('./util/parse-args')
const p = require('./util/p')
const execa = require('execa')
const debug = require('debug')('youtube-dl2:get-info')

async function getInfo(url, options = {}) {
  options = Object.assign({
    dump_json: true,
    format: 'best'
  }, options)

  let args = parseArgs(options)

  args.push('--')
  args.push(url)

  let [ err, result ] = await p(execa('youtube-dl', args))

  if (err) throw err
  if (!isJson(result.stdout)) throw new Error('Output is not json')

  data = JSON.parse(result.stdout)

  return data
}

module.exports = getInfo