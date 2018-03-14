const ytdl = require('../index')
const test = require('ava')

const Stream = require('stream')

test('returns a stream', async t => {
  const result = ytdl('https://www.youtube.com/watch?v=n5CwXuyNfoc', { format: 'best' })

  t.true(result.stdout instanceof Stream)
})

test('.buffer returns a buffer', async t => {
  const result = await ytdl.buffer('https://www.youtube.com/watch?v=n5CwXuyNfoc', { format: 'best' })

  t.true(result instanceof Buffer)
})

test('.file Returns a promise', async t => {
  const result = await ytdl.file('https://www.youtube.com/watch?v=n5CwXuyNfoc', '/tmp/file.webm', { format: 'webm' })

  t.true(result instanceof Promise)
})

