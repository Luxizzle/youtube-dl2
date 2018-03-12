const test = require('ava')

const getInfo = require('../src/get-info')

test('single video', async t => {
  const info = await getInfo('https://www.youtube.com/watch?v=RB4nFoA63rs')
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
  t.log(info)

  const info2 = {}

  keys.forEach(key => {
    info2[key] = info[key]
  })

  t.snapshot(info2)
})

test('multiple videos', async t => {
  t.true(Array.isArray(await getInfo([
    'https://www.youtube.com/watch?v=RB4nFoA63rs',
    'https://youtu.be/imMSZLOElBw'
  ])))
})

test('playlist', async t => {
  t.true(Array.isArray(await getInfo('https://www.youtube.com/playlist?list=PL4AA2CAF1947F471A')))
})