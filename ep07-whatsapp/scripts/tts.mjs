import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import { mkdirSync, renameSync, rmSync, readdirSync } from "node:fs";
import { join } from "node:path";

const VOICE = "de-DE-FlorianMultilingualNeural";
const RATE = "+15%";
const PITCH = "-6%";
// tech terms spelled phonetically so the Polish voice reads them naturally
const text =
  "Wysyłasz wiadomość na WhatsAppie. Kto jeszcze może ją przeczytać? Krótka odpowiedź: nawet sam WhatsApp nie. To szyfrowanie end tu end. Twój telefon i telefon odbiorcy mają własne klucze. Wiadomość jest szyfrowana, zanim wyjdzie z twojego telefonu. Serwery WhatsAppa tylko ją przekazują. Widzą ciąg przypadkowych znaków, a nie treść. Odszyfruje ją dopiero telefon odbiorcy. Ale uwaga: WhatsApp nadal widzi metadane, czyli z kim piszesz i kiedy. A kopia czatów w chmurze jest szyfrowana end tu end tylko wtedy, gdy włączysz to w ustawieniach. No i najprostszy atak: ktoś bierze twój odblokowany telefon. Wtedy żadne szyfrowanie nie pomoże. Bezpieczne aplikacje i automatyzacje budujemy w Delo Kompani. Obserwuj po więcej.";

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
