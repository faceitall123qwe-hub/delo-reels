#!/bin/bash
# usage: ./render-one.sh epNN-slug output-name.mp4
D="${OUT_DIR:-$HOME/Desktop/Filmy MP4}"
cd "$(dirname "$0")/$1" || exit 1
rm -rf out && mkdir -p out
npx --yes hyperframes@0.8.134 render --fps 30 --quality high --output out/r.mp4 2>&1 | grep -E "MB ·|✗|rror" | sed "s/^/$1: /"
if [ -f out/r.mp4 ]; then
  cp -f out/r.mp4 "$D/$2" && cmp -s out/r.mp4 "$D/$2" && echo "$1: copied -> $2" && rm -rf out
  ffmpeg -v info -i "$D/$2" -af loudnorm=print_format=summary -f null - 2>&1 | grep -E "Input Integrated" | sed "s/^/$1: /"
else
  echo "$1: RENDER FAILED"
fi
