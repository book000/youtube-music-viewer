# youtube-music-viewer

[Click here for English README](README.md)

複数の歌唱者をサポートする [yay4ya/akikunouta](https://github.com/yay4ya/akikunouta) の拡張バージョンです。

## Acknowledgements

素晴らしい作品を制作し、それをオープンソースとしてアップしてくれた [yay4ya](https://github.com/yay4ya) さんへ心からの感謝を。

## Requirements

- Viewer (Build)
  - NodeJS (Tested with `v15.4.0`)
  - Yarn (Tested with `v1.22.5`)
- Add Track Script `scripts/add_track.py` (Run)
  - Python3 (Tested with `v3.8.5`)
  - Dependencies packages: `requests`

## Other details

### Inserted Tracks

最近かつ複数人が多く歌唱したライブである [2020 にじさんじユニット歌謡祭](https://www.youtube.com/watch?v=A6jnAB4c7xQ) を各楽曲ごとに追加しています。

### Add Track Script

`scripts/add_track.py` にトラックを追加するPythonスクリプトを配置しました。
WSL Bash などの UTF-8 シェルで実行してください。

```shell
$ python3 scripts/add_track.py
Note: This program should be run from a UTF-8 shell.

Input Track title: LOVE & JOY
Input singers (comma separated): 本間ひまわり,でびでび・でびる
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

このプロジェクトのライセンスは [MIT License](LICENSE) です。
