#!/bin/bash
# usage: ./voice.sh epNN-slug  -> TTS (retry), tighten pauses, loudnorm
cd "/c/Users/hp/Desktop/Claude Projects/delo-reels/$1" || exit 1
rm -f assets/audio/vo.mp3 assets/audio/vo.json
for k in 1 2 3 4 5; do [ -f assets/audio/vo.json ] && break; node scripts/tts.mjs >/dev/null 2>&1 || sleep 2; done
[ -f assets/audio/vo.json ] || { echo "$1 TTS FAILED"; exit 1; }
node scripts/tighten.mjs assets/audio/vo | sed "s/^/$1: /"
ffmpeg -y -v error -i assets/audio/vo.mp3 -af loudnorm=I=-16:TP=-1.5:LRA=11 -ar 24000 -b:a 128k assets/audio/vo.norm.mp3 && mv -f assets/audio/vo.norm.mp3 assets/audio/vo.mp3
rm -f assets/audio/vo.filter.txt
echo "$1 done $(ffprobe -v error -show_entries format=duration -of csv=p=0 assets/audio/vo.mp3)s"
