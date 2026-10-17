import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import { mkdirSync, renameSync, rmSync, readdirSync } from "node:fs";
import { join } from "node:path";
const out = process.argv[2];
const text = "Strona, na której się logujesz, nie zna twojego hasła. I bardzo dobrze! Kiedy zakładasz konto, strona nie zapisuje hasła. Przepuszcza je przez funkcję skrótu, czyli hasz. Pasuje? Wchodzisz.";
const variants = [["A-naturalny", "+0%"], ["B-nizszy", "-6%"], ["C-wyzszy", "+8%"]];
for (const [name, pitch] of variants) {
  for (let k = 0; k < 3; k++) {
    try {
      const tmp = join(out, "tmp-" + name);
      rmSync(tmp, { recursive: true, force: true }); mkdirSync(tmp, { recursive: true });
      const tts = new MsEdgeTTS();
      await tts.setMetadata("de-DE-FlorianMultilingualNeural", OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3, { wordBoundaryEnabled: true });
      await tts.toFile(tmp, text, { rate: "+15%", pitch });
      tts.close();
      for (const f of readdirSync(tmp)) renameSync(join(tmp, f), join(out, `ton-${name}.${f.endsWith(".mp3") ? "mp3" : "json"}`));
      rmSync(tmp, { recursive: true, force: true });
      console.log("ok", name); break;
    } catch (e) { console.log("retry", name, e.message); }
  }
}
