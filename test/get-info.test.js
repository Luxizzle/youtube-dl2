const test = require('ava')

const getInfo = require('../src/get-info')

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

function parseInfo(info) {
  const info2 = {}

  keys.forEach(key => {
    info2[key] = info[key]
  })

  return info2
}

test('single video', async t => {
  let info = await getInfo('https://www.youtube.com/watch?v=RB4nFoA63rs', { format: 'best' })
 
  info = parseInfo(info)

  t.snapshot(info)
})

test('multiple videos', async t => {
  let info = await getInfo([
    'https://www.youtube.com/watch?v=RB4nFoA63rs',
    'https://youtu.be/imMSZLOElBw'
  ], { format: 'best' })

  t.true(Array.isArray(info))

  info = info.map((v) => parseInfo(v)) 

  t.snapshot(info)
})

test('playlist', async t => {
  let info = await getInfo('https://www.youtube.com/playlist?list=PL4AA2CAF1947F471A', { format: 'best' })

  t.true(Array.isArray(info))

  info = info.map((v) => parseInfo(v)) 

  t.snapshot(info)
})