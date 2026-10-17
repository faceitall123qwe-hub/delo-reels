import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import { mkdirSync, renameSync, rmSync, readdirSync } from "node:fs";
import { join } from "node:path";

const VOICE = "de-DE-FlorianMultilingualNeural";
const RATE = "+15%";
const PITCH = "-6%";
// tech terms spelled phonetically so the Polish voice reads them naturally
const text =
  "Skanujesz kod ku er. Co tam właściwie jest? Zwykły tekst, najczęściej adres strony, zapisany w kwadracikach. Czarny kwadracik to jedynka, biały to zero. Trzy duże kwadraty w rogach pokazują aparatowi, gdzie jest kod i jak jest obrócony. Dlatego działa pod każdym kątem. A najlepsze: kod ma dane zapasowe. Na najwyższym poziomie da się go odczytać, nawet gdy około trzydziestu procent danych jest zniszczonych. Dlatego można wstawić logo na środek. Kod ku er wymyślono w Japonii w tysiąc dziewięćset dziewięćdziesiątym czwartym roku, do śledzenia części samochodowych. I uwaga: kod może prowadzić wszędzie, więc zanim coś wpiszesz, sprawdź adres. Kody ku er i automatyzacje dla firm robimy w Delo Kompani. Obserwuj po więcej.";

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
