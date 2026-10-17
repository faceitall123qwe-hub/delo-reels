import { readFileSync, existsSync } from "node:fs";

// The voiceover script text (punctuation is lost in the TTS word list, so we read it from the source).
export function sourceText() {
  if (existsSync("assets/audio/vo.txt")) return readFileSync("assets/audio/vo.txt", "utf8");
  const m = readFileSync("scripts/tts.mjs", "utf8").match(/const text =\s*("(?:[^"\\]|\\.)*")/);
  return m ? JSON.parse(m[1]) : "";
}

// For each TTS word: does it end a sentence (. ! ?) or a clause (, : ;) in the script text?
export function wordFlags(words, text = sourceText()) {
  const toks = text.split(/\s+/).filter(Boolean);
  const norm = (w) => w.toLowerCase().replace(/[^\p{L}\p{N}-]/gu, "");
  let j = 0;
  return words.map((w) => {
    const nw = norm(w);
    let k = j;
    while (k < toks.length && norm(toks[k]) !== nw) k++;
    if (k >= toks.length) return { end: false, comma: false };
    j = k + 1;
    return { end: /[.!?][”"]?$/.test(toks[k]), comma: /[,:;]$/.test(toks[k]) };
  });
}
