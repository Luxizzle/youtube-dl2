const test = require('ava')

const getInfo = require('../src/get-info')

test('gets info', async t => {
  const info = await getInfo('https://www.youtube.com/watch?v=RB4nFoA63rs', {
    format: 'best',
    extract_audio: true
  })
  const keys = [
    'title',
    'uploader',
    'width',
    'extractor',
    '_filename',
    'duration',
    'ext',
    'thumbnail',
    'thumbnails',
    'vcodec',
    'webpage_url',
    'webpage_url_basename'
  ]
  const info2 = {}

  keys.forEach(key => {
    info2[key] = info[key]
  })

  t.snapshot(info2)
})