# Shazagram

Telegram bot for Shazam

DEMO: **[https://t.me/shazagram_bot](https://t.me/shazagram_bot?start=github_repo)**

[![Screenshot](https://raw.githubusercontent.com/kuberlancer/shazagram/main/screenshot.png?raw=true)](https://t.me/shazagram_bot?start=github_repo)

Features:

- Recognize music from an audio/video file (.mp3, .mp4, .webm).
- Recognize music from YouTube video (you can send a link with current time parameter as well).

## Requirements (Ubuntu 20.04)

FFmpeg

```sh
sudo apt update
sudo apt install ffmpeg -y
```

[SongRec](https://github.com/marin-m/SongRec)

```sh
sudo apt-add-repository ppa:marin-m/songrec -y -u
sudo apt install songrec -y
sudo apt install build-essential libasound2-dev libgtk-3-dev libssl-dev -y
```

It can be useful to install [ngrok](https://ngrok.com/) as well

## Using

Create `.env` file in project's root directory and populate it

```
API_URL=http://localhost:5000
PORT=5000
TELEGRAM_API_TOKEN=...
```

Then, run

```sh
yarn run build && yarn run start
```

or

```sh
yarn run start:dev
```

## Licence

The Unlicense
