# youtube-dl2

WIP - Not exactly functional right now.

Its literally the same functionality of the original youtube-dl, but more in my style and hopefully better tested and updated

Last tested with version: `2018.03.10`

**IMPORTANT:** This version does not come with youtube-dl pre-installed. install it and have it in your path, else its not going to work.

## Differences

The original youtube-dl downloads the video on request. This kills a lot of functionality in youtube-dl itself like extracting audio. This module gives more control over your output and what the module does.

This module also improves on some things like better process cleanup with some updated methods.

End goal is a more testable, updated and controllable youtube-dl.

## Usage

#### options

Options are not pushed to youtube-dl in the normal fashion, instead you can pass an object like this:
```js
{
  format: 'best' // --format=best
  min_views: 1000 // --min-views=1000
  r: '50K' // --limit-rate=50K,
  geo_bypass: true // --geo-bypass
}
```
Underscores (`_`) are replaced with minus signs (`-`) and aliases are replaced by their full flag name.

This just makes it a bit easier to manipulate and read.

#### youtubedl2(url, [options])

Downloads url and returns it as a stream.

Returns an execa returnable where .stdout is the output stream. This is subject to change.

**Note:** Does not support arguments like `extract_audio` due to the nature of youtube-dl outputting to stdout. Read more [below](#downloading-audio).

#### youtubedl2.buffer(url, [options])

Returns a promise which returns the file as buffer

#### youtubedl2.getInfo(url, [options])

Gets info of url in `--dump-json` format

Url can be some sort of playlist or an array of urls too.

Returns a promise

## Downloading audio

Due to the nature of youtube-dl's outputting to stdout, it does not support flags like `--extract-audio`. There are a few ways around this.

#### Selecting audio format

The `format` option allows a few different arguments.

- `bestaudio`
- `worstaudio`
- Any sound file extension (make sure the queried url supports it by checking the `info.formats` from `youtube-dl2.sgetInfo`)

More info here: <https://github.com/rg3/youtube-dl/blob/master/README.md#format-selection>

#### Manually converting it with ffmpeg

Example: `ffmpeg -i video.mp4 -f mp3 -ab 192000 -vn music.mp3`

This is just a really simple example, but you can get more complicated.

Check the [ffmpeg docs](https://ffmpeg.org/ffmpeg.html) for more info.

**Note:** I might implement this natively into the module itself.