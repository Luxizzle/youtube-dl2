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
})

test('.buffer returns a buffer', async t => {
  const result = await ytdl.buffer('https://www.youtube.com/watch?v=n5CwXuyNfoc', { format: 'best' })

  t.true(result instanceof Buffer)

  await fs.writeFile('tmp/buffer.mp4', result)
})

test('.file Returns a promise', async t => {
  const result = ytdl.file('tmp/file.mp4', 'https://www.youtube.com/watch?v=n5CwXuyNfoc', { format: 'best' })

  t.true(result instanceof Promise)

  await result
})


