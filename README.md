# youtube-music-viewer

[日本語のREADMEはこちらから](README-ja.md)

This is an extended version of [yay4ya/akikunouta](https://github.com/yay4ya/akikunouta) that supports multiple singers.

## Acknowledgements

Heartfelt thanks to [yay4ya](https://github.com/yay4ya) for creating something so wonderful and uploading it as open source.

## Requirements

- Viewer (Build)
  - NodeJS (Tested with `v15.4.0`)
  - Yarn (Tested with `v1.22.5`)
- Add Track Script `scripts/add_track.py` (Run)
  - Python3 (Tested with `v3.8.5`)
  - Dependencies packages: `requests`

## Other details

### Inserted Tracks

I have added [2020 Nijisanji Unit Song Festival](https://www.youtube.com/watch?v=A6jnAB4c7xQ), which is a recent and much sung live performance, to each song.

### Add Track Script

I have placed a Python script that adds a track to `scripts/add_track.py`.  
Run it in a UTF-8 shell such as WSL Bash.

```shell
$ python3 scripts/add_track.py
Note: This program should be run from a UTF-8 shell.

Input Track title: LOVE & JOY
Input singers (comma separated): 本間ひまわり,鈴原るる
Input Track artist: 木村由姫
Input Video url: https://www.youtube.com/watch?v=A6jnAB4c7xQ
Input Published date (e.g. 2020-01-01): 2020-12-29
Input Tags (comma separated): 2020NJU歌謡祭
Input Start time (sec): 606
Input End time (sec): 878

--------------------------------------------------

Id:             0
Title:          LOVE & JOY
Singers:        ['本間ひまわり', 'でびでび・でびる']
Artist:         木村由姫
Video:          2020 にじさんじユニット歌謡祭 / #NJU歌謡祭 (A6jnAB4c7xQ)
PublishedDate:  2020-12-29
Tags:           ['2020NJU歌謡祭']
Start:          10:06 (606 seconds)
End:            14:38 (878 seconds)

Is this OK? [Y/n]: y
```

## License

The license for this project is [MIT License](LICENSE).
