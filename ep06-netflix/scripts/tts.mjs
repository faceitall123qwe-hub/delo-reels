import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import { mkdirSync, renameSync, rmSync, readdirSync } from "node:fs";
import { join } from "node:path";

const VOICE = "de-DE-FlorianMultilingualNeural";
const RATE = "+15%";
const PITCH = "-6%";
// tech terms spelled phonetically so the Polish voice reads them naturally
const text =
  "Dlaczego Netflix prawie nigdy się nie zacina, nawet gdy wieczorem ogląda cała Polska? Są na to trzy sztuczki. Pierwsza: serwer stoi blisko ciebie. Netflix ma własną sieć serwerów i stawia je bezpośrednio u dostawców internetu. Film nie leci z Ameryki, tylko często od twojego operatora. Druga: nowe i popularne filmy są tam kopiowane w nocy, kiedy w sieci jest mały ruch. Trzecia: film jest pocięty na kawałki po kilka sekund, a każdy kawałek istnieje w wielu jakościach. Odtwarzacz cały czas mierzy twoje łącze. Gdy internet zwalnia, następny kawałek pobiera w niższej jakości, zamiast się zatrzymać. Do tego trzyma zapas, czyli bufor, na kilkanaście sekund do przodu. Dlatego obraz czasem na chwilę się rozmywa, ale prawie nigdy nie stoi. Szybkie strony i aplikacje budujemy w Delo Kompani. Obserwuj po więcej.";

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
