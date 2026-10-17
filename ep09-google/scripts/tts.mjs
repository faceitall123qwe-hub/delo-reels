import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import { mkdirSync, renameSync, rmSync, readdirSync } from "node:fs";
import { join } from "node:path";

const VOICE = "de-DE-FlorianMultilingualNeural";
const RATE = "+15%";
const PITCH = "-6%";
// tech terms spelled phonetically so the Polish voice reads them naturally
const text =
  "Masz nową stronę. Skąd Google w ogóle wie, że ona istnieje? Jego robot, Guglbot, cały czas chodzi po internecie i klika w linki. Na twoją stronę trafia z innej strony albo z mapy witryny, którą mu zgłosisz. Potem otwiera ją jak przeglądarka i zapisuje w indeksie. To gigantyczna biblioteka: setki miliardów stron i ponad sto milionów gigabajtów danych. Dopiero kiedy ktoś coś wpisze, Google wybiera z indeksu najlepsze wyniki. Liczy się treść, szybkość i to, jak strona działa na telefonie. Nikt do ciebie nie linkuje i nie ma mapy witryny? Robot może długo cię nie znaleźć. Strony, które Google widzi, budujemy w Delo Kompani. Obserwuj po więcej.";

const out = "assets/audio";
const tmp = join(out, "tmp");
rmSync(tmp, { recursive: true, force: true });
mkdirSync(tmp, { recursive: true });
const tts = new MsEdgeTTS();
await tts.setMetadata(VOICE, OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3, { wordBoundaryEnabled: true });
await tts.toFile(tmp, text, { rate: RATE, pitch: PITCH });
tts.close();
for (const f of readdirSync(tmp)) renameSync(join(tmp, f), join(out, f.endsWith(".mp3") ? "vo.mp3" : "vo.json"));
rmSync(tmp, { recursive: true, force: true });
console.log("ok");
