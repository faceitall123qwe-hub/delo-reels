import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import { mkdirSync, renameSync, rmSync, readdirSync } from "node:fs";
import { join } from "node:path";

const VOICE = "de-DE-FlorianMultilingualNeural";
const RATE = "+15%";
const PITCH = "-6%";
// tech terms spelled phonetically so the Polish voice reads them naturally
const text =
  "Piszesz z czatbotem na stronie firmy. Skąd on zna odpowiedź? Sam model ej aj nic nie wie o tej firmie. Dlatego dobry czatbot najpierw przeszukuje jej dokumenty: cennik, regulamin, najczęstsze pytania. Znalezione fragmenty dostaje razem z twoim pytaniem i dopiero wtedy pisze odpowiedź. To się nazywa rag. Bez tego ej aj zgaduje i potrafi zmyślać. W dwa tysiące dwudziestym czwartym roku linia Er Kanada musiała zapłacić klientowi, bo jej czatbot wymyślił zasady zwrotu za bilet. Trybunał uznał, że za słowa czatbota odpowiada firma. Dlatego dobry czatbot podaje źródło, a trudne sprawy przekazuje człowiekowi. Takie czatboty budujemy w Delo Kompani. Obserwuj po więcej.";

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
