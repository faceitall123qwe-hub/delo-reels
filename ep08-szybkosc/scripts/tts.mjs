import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import { mkdirSync, renameSync, rmSync, readdirSync } from "node:fs";
import { join } from "node:path";

const VOICE = "de-DE-FlorianMultilingualNeural";
const RATE = "+15%";
const PITCH = "-6%";
// tech terms spelled phonetically so the Polish voice reads them naturally
const text =
  "Twoja strona ładuje się pięć sekund? To tracisz klientów. Według Google, gdy czas ładowania rośnie z jednej do trzech sekund, szansa, że ktoś wyjdzie, rośnie o trzydzieści dwa procent. Skąd te sekundy? Po pierwsze: zdjęcia. Zdjęcie prosto z telefonu waży kilka megabajtów. Po zmniejszeniu i kompresji: kilkaset kilobajtów. Po drugie: skrypty. Czaty, piksele reklamowe, wtyczki. Każdy to kolejny plik, który przeglądarka musi pobrać i uruchomić. Po trzecie: serwer bez kesza. Przy każdym wejściu buduje stronę od zera. Rozwiązanie: lekkie zdjęcia, mniej skryptów, kesz i sieć ce de en, czyli kopie strony blisko użytkownika. Szybkie strony budujemy w Delo Kompani. Obserwuj po więcej.";

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
