import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import { mkdirSync, renameSync, rmSync, readdirSync } from "node:fs";
import { join } from "node:path";

const VOICE = "de-DE-FlorianMultilingualNeural";
const RATE = "+15%";
const PITCH = "-6%";
// tech terms spelled phonetically so the Polish voice reads them naturally
const text =
  "Klikasz spację w grze i twoja postać skacze. Ale w tym ułamku sekundy dzieje się naprawdę dużo. Klawiatura wykrywa wciśnięcie i wysyła je przez u es be do komputera, nawet tysiąc razy na sekundę. Gra od razu pokazuje skok u ciebie, zanim serwer cokolwiek potwierdzi. To tak zwana predykcja. W tym samym czasie mały pakiet u de pe leci przez internet do serwera gry. Serwer sprawdza, czy skok jest możliwy i czy nie oszukujesz, i liczy fizykę, na przykład sześćdziesiąt cztery razy na sekundę. Potem wysyła nowy stan gry do wszystkich graczy i dopiero wtedy inni widzą, że skoczyłeś. Cała ta droga trwa zwykle kilkadziesiąt milisekund. Szybciej niż mrugnięcie okiem. Takie systemy budujemy na co dzień, tylko dla firm. Delo Kompani: strony i automatyzacje. Obserwuj po więcej.";

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
