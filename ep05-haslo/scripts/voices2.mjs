import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import { mkdirSync, renameSync, rmSync, readdirSync } from "node:fs";
import { join } from "node:path";
const out = process.argv[2];
const text = "Strona, na której się logujesz, nie zna twojego hasła. I bardzo dobrze. Zobacz, jak to działa.";
const voices = [
  ["8-andrew-energiczny", "en-US-AndrewMultilingualNeural", "+18%", "+4%"],
  ["9-brian-energiczny", "en-US-BrianMultilingualNeural", "+20%", "+5%"],
  ["10-emma-energiczna", "en-US-EmmaMultilingualNeural", "+16%", "+3%"],
];
for (const [name, v, rate, pitch] of voices) {
  for (let k = 0; k < 3; k++) {
    try {
      const tmp = join(out, "tmp-" + name);
      rmSync(tmp, { recursive: true, force: true }); mkdirSync(tmp, { recursive: true });
      const tts = new MsEdgeTTS();
      await tts.setMetadata(v, OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3);
      await tts.toFile(tmp, text, { rate, pitch });
      tts.close();
      for (const f of readdirSync(tmp)) if (f.endsWith(".mp3")) renameSync(join(tmp, f), join(out, `glos-${name}.mp3`));
      rmSync(tmp, { recursive: true, force: true });
      console.log("ok", name); break;
    } catch (e) { console.log("retry", name, e.message); }
  }
}
