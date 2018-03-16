const ytdl = require('../index')
const test = require('ava')
const fs = require('fs-extra')
const getStream = require('get-stream')
const del = require('del')
const Stream = require('stream')

test.before(async t => {
  await del('tmp')
  await fs.ensureDir('tmp')
})

test('returns a stream', async t => {
  const result = ytdl('https://www.youtube.com/watch?v=n5CwXuyNfoc', { format: 'best' })

  t.true(result instanceof Stream)

  result.pipe(fs.createWriteStream('tmp/stream.mp4'))
  await getStream(result)

  const size = (await fs.stat('tmp/stream.mp4')).size
  t.is(size, 41446725)
})

test('.buffer returns a buffer', async t => {
  const result = await ytdl.buffer('https://www.youtube.com/watch?v=n5CwXuyNfoc', { format: 'best' })

  t.true(result instanceof Buffer)

  await fs.writeFile('tmp/buffer.mp4', result)
  const size = (await fs.stat('tmp/buffer.mp4')).size
  t.is(size, 41446725)
})

test('.file Returns a promise', async t => {
  const result = ytdl.file('tmp/file.mp4', 'https://www.youtube.com/watch?v=n5CwXuyNfoc', { format: 'best' })

  t.true(result instanceof Promise)

  await result

  const size = (await fs.stat('tmp/file.mp4')).size
  t.is(size, 41446725)
})


