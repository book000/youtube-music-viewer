import json
import math
import os
import re

import requests

url_regex = r'(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})'
date_regex = r"^[0-9]{4}-[0-9]{2}-[0-9]{2}$"


def main():
    if not os.path.exists("src/data/tracks.json"):
        with open("src/data/tracks.json", "w") as f:
            f.write(json.dumps({}, indent=2, ensure_ascii=False))
    print()
    while True:
        title = input("Input Track title: ").strip()
        if title:
            break
        print("Please enter title.")

    while True:
        singers = input("Input singers (comma separated): ").strip()
        if not singers:
            print("Please enter singers.")
            continue
        break
    singers = singers.split(',')
    singers = list(map(lambda s: s.strip(), singers))

    while True:
        artist = input("Input Track artist: ").strip()
        if artist:
            break
        print("Please enter artist.")

    while True:
        videourl = input("Input Video url: ").strip()
        if not videourl:
            print("Please enter video url.")
            continue
        if re.search(url_regex, videourl) is not None:
            videoid = re.search(url_regex, videourl).group(1)
            response = requests.get(
                "https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v={}".format(videoid))
            if response.status_code == 200:
                break
            print("The video cannot be found. Please try again.")
            break
        print("Invalid YouTube Video URL. Please try again.")

    result = response.json()
    video_title = result["title"]

    while True:
        publishedAt = input("Input Published date (e.g. 2020-01-01): ").strip()
        if not publishedAt:
            print("Please enter published date.")
            continue
        if re.match(date_regex, publishedAt) is not None:
            break
        print("Invalid Published date. Please try again.")

    while True:
        tags = input("Input Tags (comma separated): ").strip()
        if tags:
            break
        print("Please enter tags.")
    tags = tags.split(',')
    tags = list(map(lambda s: s.strip(), tags))

    while True:
        start = input("Input Start time (sec): ").strip()
        if not start:
            print("Please enter start time.")
            continue
        if start.isdecimal() and start.isalnum():
            break
        print("Invalid start time. Please try again.")

    while True:
        end = input("Input End time (sec): ").strip()
        if not end:
            print("Please enter end time.")
            continue
        if end.isdecimal() and end.isalnum():
            break
        print("Invalid End time. Please try again.")

    with open("src/data/tracks.json", "r") as f:
        tracks = json.load(f)

    id = max(list(map(lambda x: x["id"], tracks))) + 1

    print()
    print("--------------------------------------------------")
    print()
    print("ID:            ", id)
    print("Title:         ", title)
    print("Singers:       ", singers)
    print("Artist:        ", artist)
    print("Video:         ", video_title, "(" + videoid + ")")
    print("PublishedDate: ", publishedAt)
    print("Tags:          ", tags)
    print("Start:         ", formatTime(int(start)), "(" + start + " seconds)")
    print("End:           ", formatTime(int(end)), "(" + end + " seconds)")
    print()
    while True:
        res = input("Is this OK? [Y/n]: ")
        if res.lower() == "y" or res.lower() == "yes" or res.lower() == "n" or res.lower() == "no":
            break
        print("Please y/n/yes/no")

    if res.lower() != "y" and res.lower() != "yes":
        print("Exit without saving.")
        return

    tracks.append({
        "id": id,
        "title": title,
        "singers": singers,
        "artist": artist,
        "videoid": videoid,
        "publishedAt": publishedAt,
        "tags": tags,
        "start": int(start),
        "end": int(end)
    })

    with open("src/data/tracks.json", "w") as f:
        f.write(json.dumps(tracks, indent=2, ensure_ascii=False))


def formatTime(seconds):
    day = seconds // (24 * 3600)
    seconds = seconds % (24 * 3600)
    hour = seconds // 3600
    seconds %= 3600
    minutes = seconds // 60
    seconds %= 60

    return ("" if math.floor(day) == 0 else "{}:".format(math.floor(day))) + \
           ("" if math.floor(hour) == 0 else "{}:".format(math.floor(hour))) + \
           ("" if math.floor(minutes) == 0 else "{}:".format(math.floor(minutes))) + \
           ("" if math.floor(day) != 0 and math.floor(hour) != 0 and math.floor(minutes) != 0
            and day == 0 else "{}".format(seconds))


if __name__ == "__main__":
    print("Note: This program should be run from a UTF-8 shell (e.g. Bash).")
    while True:
        main()
        print()
        while True:
            res = input("Do you want to add more? [Y/n]: ")
            if res.lower() == "y" or res.lower() == "yes" or res.lower() == "n" or res.lower() == "no":
                break
            print("Please y/n/yes/no")

        if res.lower() != "y" and res.lower() != "yes":
            break
