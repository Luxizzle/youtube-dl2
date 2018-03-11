const isJson = require('./util/is-json')
const parseArgs = require('./util/parse-args')
const p = require('./util/p')
const execa = require('execa')
const debug = require('debug')('youtube-dl2:get-info')

const defaultArgs =[
  '--dump-json'
]

async function getInfo(url, options = {}) {
  options = parseArgs(options)

  let args = Array.from(defaultArgs)

  args.push('--')
  args.push(url)

  let [ err, result ] = await p(execa('youtube-dl', options.concat(args)))

  if (err) throw err
  if (!isJson(result.stdout)) throw new Error('Output is not json')

  data = JSON.parse(result.stdout)

  return data
}

module.exports = getInfo