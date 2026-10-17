import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import { mkdirSync, renameSync, rmSync, readdirSync } from "node:fs";
import { join } from "node:path";
const out = process.argv[2];
const text = "Klikasz spację w grze i twoja postać skacze. Ale w tym ułamku sekundy dzieje się naprawdę dużo. Zobaczmy, co dokładnie.";
const voices = [
  ["1-andrew", "en-US-AndrewMultilingualNeural", "+8%"],
  ["2-brian", "en-US-BrianMultilingualNeural", "+8%"],
  ["3-florian", "de-DE-FlorianMultilingualNeural", "+8%"],
  ["4-zofia", "pl-PL-ZofiaNeural", "+10%"],
  ["5-ava", "en-US-AvaMultilingualNeural", "+8%"],
  ["6-emma", "en-US-EmmaMultilingualNeural", "+8%"],
  ["7-seraphina", "de-DE-SeraphinaMultilingualNeural", "+8%"],
  ["0-marek-obecny", "pl-PL-MarekNeural", "+12%"],
];
for (const [name, v, rate] of voices) {
  for (let k = 0; k < 3; k++) {
    try {
      const tmp = join(out, "tmp-" + name);
      rmSync(tmp, { recursive: true, force: true });
      mkdirSync(tmp, { recursive: true });
      const tts = new MsEdgeTTS();
      await tts.setMetadata(v, OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3);
      await tts.toFile(tmp, text, { rate });
      tts.close();
      for (const f of readdirSync(tmp)) if (f.endsWith(".mp3")) renameSync(join(tmp, f), join(out, `glos-${name}.mp3`));
      rmSync(tmp, { recursive: true, force: true });
      console.log("ok", name);
      break;
    } catch (e) { console.log("retry", name, e.message); }
  }
}
