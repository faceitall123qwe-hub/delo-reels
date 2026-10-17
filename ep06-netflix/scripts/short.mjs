import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { execSync } from "node:child_process";
import { wordFlags } from "./punct.mjs";

export const W = 1080;
export const H = 1920;
export const VO_OFFSET = 0.25;
const STEP = 0.045;

const probe = (f) => +(+execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 "${f}"`).toString()).toFixed(2);

export const icon = (name, cls = "") =>
  readFileSync(`node_modules/lucide-static/icons/${name}.svg`, "utf8")
    .replace(/<!--.*?-->\s*/s, "")
    .replace(/class="[^"]*"/, `class="ic ${cls}"`)
    .replace(/\s(width|height)="24"/g, "")
    .replace(/\n\s*/g, " ");

export const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const words = (replace = []) => {
  const md = JSON.parse(readFileSync("assets/audio/vo.json", "utf8")).Metadata;
  const fl = wordFlags(md.map((m) => m.Data.text.Text));
  const ws = md.map((m, i) => ({
    w: m.Data.text.Text,
    s: m.Data.Offset / 1e7 + VO_OFFSET,
    e: (m.Data.Offset + m.Data.Duration) / 1e7 + VO_OFFSET,
    brk: fl[i].end,
  }));
  // replace: [[["u","es","be"], "USB"], ...] — spoken phonetics -> displayed caption text
  const out = [];
  for (let i = 0; i < ws.length; i++) {
    const hit = replace.find(([seq]) => seq.every((t, k) => ws[i + k] && ws[i + k].w.toLowerCase() === t));
    if (hit) {
      out.push({ w: hit[1], s: ws[i].s, e: ws[i + hit[0].length - 1].e, brk: ws[i + hit[0].length - 1].brk });
      i += hit[0].length - 1;
    } else out.push(ws[i]);
  }
  return out;
};

// words -> caption chunks: never across a sentence end, max 3 words, split each sentence evenly (no lone trailing word)
function chunks(ws) {
  const out = [];
  let sent = [];
  const flush = () => {
    const n = Math.ceil(sent.length / 3);
    for (let k = 0, i = 0; k < n; k++) {
      const size = Math.ceil((sent.length - i) / (n - k));
      out.push(sent.slice(i, i + size));
      i += size;
    }
    sent = [];
  };
  ws.forEach((x, i) => {
    sent.push(x);
    if (x.brk || !ws[i + 1]) flush();
  });
  return out;
}

const sub = (id, css, html, js, dur, exit = 0.35) => {
  const R = `#${id}-root`;
  return `<!doctype html>
<html lang="pl">
  <head><meta charset="UTF-8" /></head>
  <body>
    <template>
      <style>
${R} { position:absolute; inset:0; }
${R} .stage { position:absolute; inset:0; }
${css.replace(/@R/g, R)}
      </style>
      <div id="${id}-root" data-composition-id="${id}" data-width="${W}" data-height="${H}">
        <div class="stage">
${html}
        </div>
      </div>
      <script>
        (function () {
          var R = "${R} ";
          var $ = function (s) { return R + s; };
          var E = "power3.out", IO = "power2.inOut";
          var tl = gsap.timeline({ paused: true });
          function count(sel, from, to, t, d, fmt) {
            var el = document.querySelector(R + sel);
            var o = { v: from };
            var f = fmt || function (v) { return Math.round(v).toLocaleString("en-US"); };
            tl.fromTo(o, { v: from }, { v: to, duration: d, ease: "power2.out", onUpdate: function () { el.textContent = f(o.v); } }, t);
          }
          function draw(sel, t, d) {
            tl.fromTo($(sel), { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: d || 0.5, ease: "power2.out" }, t);
          }
          ${exit ? `tl.fromTo($(".stage"), { opacity: 0, scale: 1.04 }, { opacity: 1, scale: 1, duration: 0.35, ease: E }, 0);` : ""}
${js}
          ${exit ? `tl.to($(".stage"), { opacity: 0, scale: 0.97, duration: ${exit}, ease: "power2.in" }, ${(dur - exit).toFixed(2)});` : ""}
          window.__timelines["${id}"] = tl;
        })();
      </script>
    </template>
  </body>
</html>
`;
};

// Scene times are authored against assets/audio/vo-ref.json (the voice the scenes were timed to).
// When vo.json comes from another voice with the same words, map old word starts -> new word starts.
function warpPoints() {
  if (!existsSync("assets/audio/vo-ref.json")) return [[0], [0]];
  const st = (f) => JSON.parse(readFileSync(f, "utf8")).Metadata.map((m) => m.Data.Offset / 1e7 + VO_OFFSET);
  const a = st("assets/audio/vo-ref.json"), b = st("assets/audio/vo.json");
  if (a.length !== b.length) throw new Error("vo-ref.json and vo.json have different word counts");
  return [[0, ...a.map((x) => +x.toFixed(3))], [0, ...b.map((x) => +x.toFixed(3))]];
}
const WARP_SRC = `function WARP(t) { var X = WX, Y = WY, n = X.length; if (t <= X[0]) return t; if (t >= X[n - 1]) return Y[n - 1] + (t - X[n - 1]);
  for (var i = 1; i < n; i++) if (t <= X[i]) { var k = X[i] === X[i - 1] ? 0 : (t - X[i - 1]) / (X[i] - X[i - 1]); return Y[i - 1] + k * (Y[i] - Y[i - 1]); } return t; }`;

// scenes: [{ start, dur, css, html, js, exit }], word times are global; inside a scene use T(globalTime)
export function build({ title, scenes, sfx, music = 0.22, tail = 1.2, replace = [] }) {
  const ws = words(replace);
  const total = +(ws.at(-1).e + tail).toFixed(2);
  mkdirSync("compositions", { recursive: true });
  const [WX, WY] = warpPoints();
  const warp = new Function("WX", "WY", `${WARP_SRC}; return WARP;`)(WX, WY);
  scenes.forEach((s) => (s.start = +warp(s.start).toFixed(2)));
  if (sfx) sfx.forEach((x) => (x[1] = warp(x[1])));

  scenes.forEach((s, i) => {
    const id = `s${String(i + 1).padStart(2, "0")}`;
    const end = i < scenes.length - 1 ? scenes[i + 1].start : total;
    s.dur = +(end - s.start).toFixed(2);
    const js = `          var WX = ${JSON.stringify(WX)}, WY = ${JSON.stringify(WY)};\n          ${WARP_SRC}\n          var T = function (g) { return WARP(g) - ${s.start}; };\n${s.js}`;
    writeFileSync(`compositions/${id}.html`, sub(id, s.css, s.html, js, s.dur, s.exit ?? 0.3));
  });

  const cs = chunks(ws);
  const capHtml = cs
    .map(
      (c, i) =>
        `<div class="cc cc${i}">${c.map((x, j) => `<span class="cw w${i}-${j}">${esc(x.w)}</span>`).join(" ")}</div>`,
    )
    .join("\n");
  const capJs = cs
    .map((c, i) => {
      const s = c[0].s;
      const e = cs[i + 1] ? Math.min(cs[i + 1][0].s, c.at(-1).e + 0.5) : c.at(-1).e + 0.6;
      return [
        `tl.fromTo($(".cc${i}"), { opacity: 0, y: 18, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 0.16, ease: E }, ${s.toFixed(2)});`,
        ...c.map((x, j) => `tl.to($(".w${i}-${j}"), { color: "#f5c518", duration: 0.06 }, ${x.s.toFixed(2)});`),
        `tl.to($(".cc${i}"), { opacity: 0, duration: 0.08 }, ${(e - 0.08).toFixed(2)});`,
      ].join("\n");
    })
    .join("\n");
  writeFileSync(
    "compositions/captions.html",
    sub(
      "captions",
      `@R .cc { position:absolute; left:90px; right:150px; top:1400px; text-align:center; opacity:0; }
@R .cw { display:inline-block; font-size:78px; font-weight:700; letter-spacing:-0.02em; color:#ffffff; padding:4px 10px; border-radius:16px; background:rgba(11,14,13,.82); margin:0 2px; }`,
      capHtml,
      capJs,
      total,
      0,
    ),
  );

  const audio = [
    `<audio id="vo" src="assets/audio/vo.mp3" data-start="${VO_OFFSET}" data-duration="${probe("assets/audio/vo.mp3")}" data-track-index="10" data-volume="1"></audio>`,
    `<audio id="music" src="assets/audio/music.mp3" data-start="0" data-duration="${total}" data-track-index="11" data-volume="1" data-automation='${JSON.stringify({
      version: 1,
      lanes: [{ target: "volume", points: [{ t: 0, v: music * 1.6 }, { t: 0.3, v: music }, { t: +(total - 1.2).toFixed(2), v: music }, { t: +(total - 0.9).toFixed(2), v: music * 1.6 }, { t: total, v: 0 }] }],
    })}'></audio>`,
  ];
  const all = [...scenes.slice(1).map((s, i) => [i % 2 ? "whoosh-short" : "whoosh", s.start - 0.1, 0.574, 0.35, 12]), ...(sfx || [])];
  all.forEach(([f, t, d, v, tr], i) =>
    audio.push(`<audio id="sfx-${String(i + 1).padStart(2, "0")}" src="assets/sfx/${f}.mp3" data-start="${Math.max(0, t).toFixed(2)}" data-duration="${d}" data-track-index="${tr}" data-volume="${v}"></audio>`),
  );

  const fonts = [
    ["Geist", "Geist-Regular", 400],
    ["Geist", "Geist-Medium", 500],
    ["Geist", "Geist-SemiBold", 600],
    ["Geist", "Geist-Bold", 700],
    ["Geist Mono", "GeistMono-Regular", 400],
    ["Geist Mono", "GeistMono-Medium", 500],
  ]
    .map(([f, file, w]) => `@font-face { font-family:"${f}"; src:url("assets/fonts/${file}.woff2") format("woff2"); font-weight:${w}; font-display:block; }`)
    .join("\n      ");

  writeFileSync(
    "index.html",
    `<!doctype html>
<html lang="pl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=${W}, height=${H}" />
    <title>${title}</title>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <style>
      ${fonts}
      :root { --bg:#0b0e0d; --panel:#111715; --line:#24302b; --text:#e9efeb; --muted:#8a9891; --green:#3ee08f; --yellow:#f5c518; }
      * { margin:0; padding:0; box-sizing:border-box; }
      html, body { margin:0; width:${W}px; height:${H}px; overflow:hidden; background:var(--bg); }
      #root { position:relative; width:100%; height:100%; overflow:hidden; background:var(--bg); color:var(--text);
        font-family:"Geist", system-ui, sans-serif; -webkit-font-smoothing:antialiased; }
      #bg { position:absolute; inset:0; }
      #bg .grid { position:absolute; inset:-60px; background-image:radial-gradient(rgba(233,239,235,.07) 1.5px, transparent 1.6px); background-size:48px 48px; }
      .hd { font-size:96px; font-weight:700; letter-spacing:-0.04em; line-height:1.02; color:var(--text); }
      .lb { font-size:52px; font-weight:500; letter-spacing:-0.01em; }
      .mono { font-family:"Geist Mono", ui-monospace, monospace; letter-spacing:-0.03em; }
      .muted { color:var(--muted); } .g { color:var(--green); } .y { color:var(--yellow); }
      .ic { display:block; }
      .card { position:absolute; border-radius:32px; background:var(--panel); border:1.5px solid var(--line); }
      .wire { position:absolute; left:0; top:0; width:${W}px; height:${H}px; }
      .wire path { fill:none; stroke:#3a4842; stroke-width:3; stroke-linecap:round; }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="${total}" data-width="${W}" data-height="${H}">
      <div id="bg" class="clip" data-start="0" data-duration="${total}" data-track-index="0"><div class="grid"></div></div>
${scenes
  .map((s, i) => {
    const id = `s${String(i + 1).padStart(2, "0")}`;
    return `      <div id="${id}" data-composition-id="${id}" data-composition-src="compositions/${id}.html" data-start="${s.start}" data-duration="${s.dur}" data-track-index="1" data-width="${W}" data-height="${H}"></div>`;
  })
  .join("\n")}
      <div id="captions" data-track-kind="captions" data-composition-id="captions" data-composition-src="compositions/captions.html" data-start="0" data-duration="${total}" data-track-index="3" data-width="${W}" data-height="${H}"></div>
      ${audio.join("\n      ")}
    </div>
    <script>
      const tl = gsap.timeline({ paused: true });
      tl.fromTo("#bg .grid", { y: 0 }, { y: 48, duration: ${total}, ease: "none" }, 0);
      window.__timelines["main"] = tl;
    </script>
  </body>
</html>
`,
  );
  console.log("built", scenes.length, "scenes + captions,", cs.length, "chunks, total", total);
}
