import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import { mkdirSync, renameSync, rmSync, readdirSync } from "node:fs";
import { join } from "node:path";

const VOICE = "de-DE-FlorianMultilingualNeural";
const RATE = "+15%";
const PITCH = "-6%";
// tech terms spelled phonetically so the Polish voice reads them naturally
const text =
  "Płacisz BLIK-iem w sklepie internetowym. Wpisujesz sześć cyfr i po chwili jest zapłacone. Ale co dzieje się w tych kilku sekundach? Kod generuje aplikacja twojego banku. Jest jednorazowy i ważny tylko dwie minuty. Sklep wysyła kod i kwotę do systemu BLIK. System wie, który bank wygenerował ten kod, i pyta właśnie ten bank. Bank wysyła powiadomienie na twój telefon. Sprawdzasz kwotę i sklep, i potwierdzasz PIN-em. Bank sprawdza, czy masz środki, i odpowiada: zgoda. BLIK przekazuje to do sklepu i płatność jest przyjęta. Sklep nie dostaje ani numeru karty, ani danych twojego konta. A pieniądze między bankami rozliczają się później, w tle. W dwa tysiące dwudziestym czwartym roku Polacy użyli BLIK-a prawie dwa i pół miliarda razy. To ponad sześć milionów operacji dziennie. Płatności i integracje dla firm budujemy w Delo Kompani. Obserwuj po więcej.";

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
