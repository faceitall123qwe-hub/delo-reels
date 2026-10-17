import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import { mkdirSync, renameSync, rmSync, readdirSync } from "node:fs";
import { join } from "node:path";

const VOICE = "de-DE-FlorianMultilingualNeural";
const RATE = "+15%";
const PITCH = "-6%";
// tech terms spelled phonetically so the Polish voice reads them naturally
const text =
  "Klient wypełnia formularz na twojej stronie. I co dalej? W wielu firmach ktoś musi to zauważyć, przepisać do Excela i odpisać. Często dopiero po kilku godzinach. A teraz wersja z automatyzacją. Formularz wysyła dane na serwer. Ten od razu zapisuje klienta w systemie ce er em, czyli w bazie twoich klientów. W tej samej sekundzie klient dostaje maila z potwierdzeniem, a handlowiec powiadomienie na telefon. Jeśli klient nie odpowie przez trzy dni, system sam wyśle przypomnienie. Wszystko trwa kilka sekund, w dzień i w nocy, bez ręcznego przepisywania. A szybkość się opłaca. Według Harvard Business Review firmy, które odzywają się w ciągu godziny, mają prawie siedem razy większą szansę na konkretną rozmowę z klientem. Takie automatyzacje budujemy w Delo Kompani. Obserwuj po więcej.";

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
