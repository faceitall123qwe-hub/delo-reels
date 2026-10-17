import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import { mkdirSync, renameSync, rmSync, readdirSync } from "node:fs";
import { join } from "node:path";

const VOICE = "de-DE-FlorianMultilingualNeural";
const RATE = "+15%";
const PITCH = "-6%";
// tech terms spelled phonetically so the Polish voice reads them naturally
const text =
  "Strona, na której się logujesz, nie zna twojego hasła. I bardzo dobrze. Zobacz, jak to działa. Kiedy zakładasz konto, strona nie zapisuje hasła. Przepuszcza je przez funkcję skrótu, czyli hasz. Z hasła kot jeden dwa trzy robi się długi ciąg znaków, którego nie da się odwrócić. Przy logowaniu strona robi to samo z hasłem, które wpisałeś, i porównuje wyniki. Pasuje? Wchodzisz. Do tego dochodzi sól, czyli losowe znaki dodane do każdego hasła. Dzięki temu dwie osoby z tym samym hasłem mają zupełnie inne hasze. A dobre algorytmy, jak be krypt czy Argon dwa, są celowo wolne. Zgadywanie milionów haseł staje się wtedy bardzo drogie. Jeśli strona po kliknięciu nie pamiętam hasła wysyła ci twoje stare hasło mailem, to znaczy, że trzyma je otwartym tekstem. Uciekaj. A najpopularniejsze hasło na świecie to wciąż jeden dwa trzy cztery pięć sześć. Bezpieczne strony i logowanie budujemy w Delo Kompani. Obserwuj po więcej.";

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
