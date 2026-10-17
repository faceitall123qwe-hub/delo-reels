import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import { mkdirSync, renameSync, rmSync, readdirSync } from "node:fs";
import { join } from "node:path";
const out = process.argv[2];
const text = "Strona, na której się logujesz, nie zna twojego hasła. I bardzo dobrze! Zobacz, jak to działa.";
const voices = [
  ["11-william-meski", "en-AU-WilliamMultilingualNeural", "+15%", "+3%"],
  ["12-remy-meski", "fr-FR-RemyMultilingualNeural", "+15%", "+3%"],
  ["13-giuseppe-meski", "it-IT-GiuseppeMultilingualNeural", "+15%", "+3%"],
  ["14-hyunsu-meski", "ko-KR-HyunsuMultilingualNeural", "+15%", "+3%"],
  ["15-florian-meski", "de-DE-FlorianMultilingualNeural", "+15%", "+4%"],
  ["16-marek-energiczny", "pl-PL-MarekNeural", "+18%", "+6%"],
  ["17-zofia-energiczna", "pl-PL-ZofiaNeural", "+15%", "+4%"],
  ["18-ava-energiczna", "en-US-AvaMultilingualNeural", "+15%", "+3%"],
  ["19-seraphina-energiczna", "de-DE-SeraphinaMultilingualNeural", "+15%", "+3%"],
  ["20-vivienne-energiczna", "fr-FR-VivienneMultilingualNeural", "+15%", "+3%"],
  ["21-thalita-energiczna", "pt-BR-ThalitaMultilingualNeural", "+15%", "+3%"],
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
