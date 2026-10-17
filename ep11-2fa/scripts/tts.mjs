import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import { mkdirSync, renameSync, rmSync, readdirSync } from "node:fs";
import { join } from "node:path";

const VOICE = "de-DE-FlorianMultilingualNeural";
const RATE = "+15%";
const PITCH = "-6%";
// tech terms spelled phonetically so the Polish voice reads them naturally
const text =
  "Logujesz się, a strona wysyła ci jeszcze kod esemesem. Po co, skoro znasz hasło? Bo hasła wyciekają. Ktoś zna twoje hasło, ale nie ma twojego telefonu, więc się nie zaloguje. To weryfikacja dwuetapowa: coś, co wiesz, i coś, co masz. Według Majkrosoftu blokuje ponad dziewięćdziesiąt dziewięć i dziewięć dziesiątych procent automatycznych ataków na konta. Ale esemes to najsłabsza wersja. Oszust może przejąć twój numer u operatora albo wyłudzić kod przez telefon. Lepsza jest aplikacja, która co trzydzieści sekund generuje nowy kod, albo klucz sprzętowy. I najważniejsze: nikomu nie podawaj kodu. Bank nigdy o niego nie zapyta. Bezpieczne logowanie wdrażamy w Delo Kompani. Obserwuj po więcej.";

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
