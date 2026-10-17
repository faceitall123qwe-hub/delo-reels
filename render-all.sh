#!/bin/bash
D="/c/Users/hp/Desktop/Filmy MP4"
declare -A NAMES=(
  [ep01-spacja]="delo-01-co-sie-dzieje-gdy-klikasz-spacje.mp4"
  [ep02-enter]="delo-02-co-sie-dzieje-po-enter.mp4"
  [ep03-automatyzacja]="delo-03-jak-dziala-automatyzacja-w-firmie.mp4"
  [ep04-blik]="delo-04-co-sie-dzieje-gdy-placisz-blikiem.mp4"
  [ep05-haslo]="delo-05-strona-nie-zna-twojego-hasla.mp4"
)
for e in ep01-spacja ep02-enter ep03-automatyzacja ep04-blik ep05-haslo; do
  cd "/c/Users/hp/Desktop/Claude Projects/delo-reels/$e" || exit 1
  mkdir -p out
  npx hyperframes render --fps 30 --quality high --output out/r.mp4 2>&1 | grep -E "MB ·|✗" | sed "s/^/$e: /"
  if [ -f out/r.mp4 ]; then
    cp -f out/r.mp4 "$D/${NAMES[$e]}" && cmp -s out/r.mp4 "$D/${NAMES[$e]}" && echo "$e: copied ok" && rm -rf out
    ffmpeg -v info -i "$D/${NAMES[$e]}" -af loudnorm=print_format=summary -f null - 2>&1 | grep -E "Input Integrated" | sed "s/^/$e: /"
  else
    echo "$e: RENDER FAILED"
  fi
done
echo ALL DONE
