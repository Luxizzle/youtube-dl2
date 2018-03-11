const test = require('ava')
const parseArgs = require('../src/util/parse-args')

test('parses args correctly', async t => {
  t.deepEqual(parseArgs({
    keep_video: true,
    format: 'best'
  }), [
    '--keep-video',
    '--format=best'
  ])
})

test('changes aliases correctly', async t => {
  t.deepEqual(parseArgs({
    k: true,
    f: 'best'
  }), [
    '--keep-video',
    '--format=best'
  ])
})