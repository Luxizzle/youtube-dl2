// haha yes hardcoded values fight me

const flagAliases = {
  h: 'help',
  U: 'update',
  i: 'ignore-errors',
  '4': 'force-ipv4',
  '6': 'force-ipv6',
  r: 'rate-limit',
  R: 'retries',
  a: 'batch-file',
  o: 'output',
  A: 'auto-number',
  t: 'title',
  l: 'listeral',
  w: 'no-overwrites',
  c: 'continue',
  q: 'quiet',
  s: 'simulate',
  g: 'get-url',
  e: 'get-title',
  j: 'dump-json',
  J: 'dump-single-json',
  v: 'verbose',
  C: 'call-home',
  f: 'format',
  F: 'list-formats',
  u: 'username',
  p: 'password',
  '2': 'twofactor',
  n: 'netrc',
  x: 'extract-audio',
  k: 'keep-video',
}

const withValue = [
  'default-search',
  'proxy',
  'socket-timeout',
  'source-address',
  'cn-verification-proxy',
  'playlist-start',
  'playlist-end',
  'playlist-items',
  'match-title',
  'reject-title',
  'max-downloads',
  'min-filesize',
  'max-filesize',
  'date',
  'datebefore',
  'dateafter',
  'min-views',
  'max-views',
  'match-filter',
  'age-limit',
  'download-archive',
  'rate-limit',
  'retries',
  'buffer-size',
  'external-downloader',
  'external-downloader-args',
  'batch-file',
  'output',
  'autonumber-size',
  'load-info',
  'cookies',
  'cache-dir',
  'encoding',
  'user-agent',
  'referer',
  'add-header',
  'sleep-interval',
  'format',
  'merge-output-format',
  'sub-format',
  'sub-lang',
  'username',
  'password',
  'twofactor',
  'video-password',
  'audio-format',
  'audio-quality',
  'recode-video',
  'postprocessor-args',
  'metadata-from-title',
  'fixup',
  'ffmpeg-location',
  'exec',
  'convert-subs'
]

/**
 * Parses youtube-dl flags from an object to an argument array.
 */

function parseArgs(args) {
  let newArgs = []

  for (let flag in args) {
    let value = args[flag]

    if (flagAliases[flag]) flag = flagAliases[flag]
    flag = flag.replace(/\_/g, '-')

    let arg = withValue.indexOf(flag) > -1
      ? `--${flag}=${value}`
      : value ? `--${flag}` : false

    if (arg) newArgs.push(arg)
  }

  return newArgs
}

module.exports = parseArgs