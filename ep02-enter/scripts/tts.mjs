import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import { mkdirSync, renameSync, rmSync, readdirSync } from "node:fs";
import { join } from "node:path";

const VOICE = "de-DE-FlorianMultilingualNeural";
const RATE = "+15%";
const PITCH = "-6%";
// tech terms spelled phonetically so the Polish voice reads them naturally
const text =
  "Wpisujesz adres strony i naciskasz Enter. Po sekundzie widzisz stronę. Ale co się dzieje pomiędzy? Najpierw przeglądarka pyta de en es: jaki numer i pe ma ta nazwa? To jak książka telefoniczna internetu. Potem łączy się z serwerem i ustala szyfrowanie. Stąd kłódka przy adresie. Teraz wysyła prośbę: daj mi stronę główną. Serwer uruchamia kod, pobiera dane z bazy i odsyła gotowy ha te em el. Przeglądarka czyta go i dociąga style, skrypty i zdjęcia. Często kilkadziesiąt plików. Na końcu układa wszystko na ekranie i rysuje stronę. Według Google, gdy strona na telefonie ładuje się dłużej niż trzy sekundy, ponad połowa odwiedzających rezygnuje. Dlatego w Delo Kompani budujemy szybkie strony. Obserwuj po więcej.";

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
