import { readFileSync, writeFileSync, renameSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { wordFlags, sourceText } from "./punct.mjs";

// Shorten pauses between words: every gap longer than MAX seconds is cut down to MAX.
// Rewrites <base>.mp3 and <base>.json (Edge TTS word-boundary metadata) in place, keeping them in sync.
// Sentence ends (from punctuation in the script text) keep a slightly longer pause, clause ends a bit less.
// usage: node tighten.mjs [base=assets/audio/vo] [maxGap=0.1] [sentenceGap=0.18] [commaGap=0.12]
const base = process.argv[2] || "assets/audio/vo";
const MAX = +(process.argv[3] || 0.1);
const SENT = +(process.argv[4] || 0.18);
const COMMA = +(process.argv[5] || 0.12);
const TAIL = 0.04; // keep a little audio after each word end so endings are not clipped

const meta = JSON.parse(readFileSync(`${base}.json`, "utf8"));
const F = wordFlags(meta.Metadata.map((m) => m.Data.text.Text), process.env.VO_TEXT || sourceText());
const W = meta.Metadata.map((m) => ({ s: m.Data.Offset / 1e7, e: (m.Data.Offset + m.Data.Duration) / 1e7 }));
const total = +execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", `${base}.mp3`]).toString();

// keep-ranges in the source audio
const keep = [];
let start = 0;
const shift = new Array(W.length).fill(0);
let removed = 0;
for (let i = 0; i < W.length - 1; i++) {
  shift[i] = removed;
  const gap = W[i + 1].s - W[i].e;
  const cap = F[i].end ? SENT : F[i].comma ? COMMA : MAX;
  if (gap > cap) {
    const cutFrom = W[i].e + Math.min(TAIL, cap / 2) + (cap - Math.min(TAIL, cap / 2)) / 2;
    const cutTo = W[i + 1].s - (cap - Math.min(TAIL, cap / 2)) / 2;
    if (cutTo > cutFrom) {
      keep.push([start, cutFrom]);
      removed += cutTo - cutFrom;
      start = cutTo;
    }
  }
}
shift[W.length - 1] = removed;
keep.push([start, total]);

const parts = keep.map(([a, b], i) => `[0:a]atrim=start=${a.toFixed(4)}:end=${b.toFixed(4)},asetpts=PTS-STARTPTS[p${i}]`);
const filter = `${parts.join(";")};${keep.map((_, i) => `[p${i}]`).join("")}concat=n=${keep.length}:v=0:a=1[out]`;
writeFileSync(`${base}.filter.txt`, filter);
execFileSync("ffmpeg", ["-y", "-v", "error", "-i", `${base}.mp3`, "-filter_complex_script", `${base}.filter.txt`, "-map", "[out]", "-ar", "24000", "-b:a", "128k", `${base}.tight.mp3`]);
renameSync(`${base}.tight.mp3`, `${base}.mp3`);

meta.Metadata.forEach((m, i) => (m.Data.Offset = Math.round(m.Data.Offset - shift[i] * 1e7)));
writeFileSync(`${base}.json`, JSON.stringify(meta, null, 2));
console.log(`tightened: ${keep.length - 1} pauses cut, ${removed.toFixed(2)} s removed (${total.toFixed(2)} → ${(total - removed).toFixed(2)} s)`);
