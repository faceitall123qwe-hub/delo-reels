import { build, icon } from "./short.mjs";

// global word times (Florian, tightened): sekund 1.76, klientów 3.09, Google 4.43, jednej 6.15, trzech 6.48, szansa 7.27,
// trzydzieści 9.23, Skąd 10.49, zdjęcia 12.75, Zdjęcie 13.68, megabajtów 15.50, zmniejszeniu 16.68, kilkaset 18.14,
// skrypty 20.40, Czaty 21.30, piksele 21.95, wtyczki 22.85, Każdy 23.52, plik 24.36, przeglądarka 25.12, pobrać 25.89,
// uruchomić 26.38, trzecie 27.42, serwer 28.06, kesza 28.65, Przy 29.34, wejściu 29.96, buduje 30.33, zera 31.11,
// Rozwiązanie 31.78, lekkie 32.68, mniej 33.70, kesz 34.62, sieć 35.00, czyli 36.17, użytkownika 37.14, Szybkie 38.09,
// Delo 39.28, Obserwuj 40.44
const IN = (sel, t, extra = "") => `tl.fromTo($("${sel}"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.45, ease: E${extra} }, ${t});`;
const TAG = `<div class="tag mono">IT OD ŚRODKA · #8</div>`;
const SEC = `function (v) { return v.toFixed(1).replace(".", ",") + " s"; }`;
const BASE = `
@R .tag { position:absolute; left:0; right:0; top:200px; text-align:center; font-size:44px; color:var(--muted); }
@R .ttl { position:absolute; left:80px; right:80px; top:290px; text-align:center; font-size:84px; }
@R .row { position:absolute; left:110px; right:110px; height:120px; display:flex; align-items:center; gap:28px; padding:0 36px; border-radius:30px;
  background:var(--panel); border:1.5px solid var(--line); font-size:52px; }
@R .row .ic { width:58px; height:58px; stroke-width:1.7; flex:none; }
`;
const scenes = [];

// 1 hook: page still loading, timer runs to 5 s, customers leave
scenes.push({
  start: 0,
  css: `${BASE}
@R .q { position:absolute; left:80px; right:80px; top:300px; text-align:center; font-size:92px; }
@R .br { position:absolute; left:120px; right:120px; top:580px; height:460px; border-radius:36px; background:#0e1311; border:1.5px solid var(--line); overflow:hidden; }
@R .br .bar { height:84px; display:flex; align-items:center; gap:14px; padding:0 30px; border-bottom:1.5px solid var(--line); }
@R .br .bar i { width:18px; height:18px; border-radius:50%; background:#2b3632; display:block; flex:none; }
@R .br .url { margin-left:14px; flex:1; height:50px; border-radius:25px; background:var(--panel); display:flex; align-items:center; padding:0 24px; font-size:32px; color:var(--muted); }
@R .br .prog { position:absolute; left:0; top:84px; height:6px; width:100%; background:var(--yellow); transform-origin:0 50%; }
@R .br .mid { position:absolute; left:0; right:0; top:90px; bottom:0; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:16px; }
@R .spin { color:var(--muted); } @R .spin .ic { width:84px; height:84px; stroke-width:1.8; }
@R .tm { font-size:130px; font-weight:700; color:var(--yellow); }
@R .us { position:absolute; left:0; right:0; top:1085px; display:flex; justify-content:center; gap:30px; }
@R .us .ic { width:70px; height:70px; color:var(--muted); stroke-width:1.8; }
@R .lose { position:absolute; left:0; right:0; top:1190px; text-align:center; font-size:66px; font-weight:700; letter-spacing:-0.02em; }`,
  html: `${TAG}
<h1 class="hd q">Strona ładuje się <span class="y" style="white-space:nowrap">5 sekund?</span></h1>
<div class="br"><div class="bar"><i></i><i></i><i></i><div class="url mono">twojafirma.pl</div></div><div class="prog"></div>
<div class="mid"><div class="spin">${icon("loader")}</div><div class="tm mono">0,0 s</div></div></div>
<div class="us"><span class="u">${icon("user")}</span><span class="u">${icon("user")}</span><span class="u">${icon("user")}</span></div>
<div class="lose">tracisz <span class="y">klientów</span></div>`,
  js: `
tl.fromTo($(".tag"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0);
${IN(".q", "0.05")}
${IN(".br", "0.2")}
tl.to($(".spin"), { rotate: 900, duration: 3.6, ease: "none" }, 0.2);
tl.fromTo($(".br .prog"), { scaleX: 0 }, { scaleX: 0.62, duration: 3.4, ease: "power1.out" }, 0.3);
count(".tm", 0, 5, 0.4, 1.5, ${SEC});
tl.fromTo($(".us .u"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3, ease: E, stagger: 0.08 }, T(2.45));
${IN(".lose", "T(2.6)")}
tl.to($(".us .u"), { x: 420, opacity: 0, duration: 0.55, ease: "power2.in", stagger: 0.1 }, T(3.1));
`,
});

// 2 Google: 1 s -> 3 s = +32% chance to leave
scenes.push({
  start: 3.85,
  css: `${BASE}
@R .cap1 { position:absolute; left:0; right:0; top:470px; text-align:center; font-size:44px; color:var(--muted); }
@R .trk { position:absolute; left:170px; right:170px; top:560px; height:110px; }
@R .trk .ln { position:absolute; left:40px; right:40px; top:53px; height:4px; background:var(--line); border-radius:2px; }
@R .trk .fill { position:absolute; left:40px; right:40px; top:53px; height:4px; background:var(--yellow); border-radius:2px; transform-origin:0 50%; }
@R .trk .pt { position:absolute; top:20px; width:80px; height:70px; border-radius:20px; background:var(--panel); border:2px solid var(--line); font-size:38px; display:flex; align-items:center; justify-content:center; }
@R .trk .a { left:0; } @R .trk .b { right:0; border-color:var(--yellow); color:var(--yellow); }
@R .lab { position:absolute; left:0; right:0; top:740px; text-align:center; font-size:54px; font-weight:600; }
@R .big { position:absolute; left:0; right:0; top:820px; text-align:center; font-size:250px; font-weight:700; letter-spacing:-0.05em; color:var(--yellow); }
@R .src { position:absolute; left:0; right:0; top:1140px; text-align:center; font-size:36px; color:var(--muted); }`,
  html: `${TAG}
<h1 class="hd ttl">Według <span class="g">Google</span></h1>
<div class="cap1">czas ładowania</div>
<div class="trk"><div class="ln"></div><div class="fill"></div><div class="pt a mono">1 s</div><div class="pt b mono">3 s</div></div>
<div class="lab">szansa, że ktoś wyjdzie</div>
<div class="big mono">+0%</div>
<div class="src mono">Google, 2017</div>`,
  js: `
${IN(".ttl", "T(4.0)")}
${IN(".cap1", "T(5.0)")}
tl.fromTo($(".trk"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, T(5.0));
tl.fromTo($(".trk .a"), { scale: 0.7 }, { scale: 1, duration: 0.3, ease: E }, T(6.1));
tl.fromTo($(".trk .fill"), { scaleX: 0 }, { scaleX: 1, duration: 0.45, ease: IO }, T(6.2));
tl.fromTo($(".trk .b"), { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.3, ease: E }, T(6.5));
${IN(".lab", "T(7.2)")}
tl.fromTo($(".big"), { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.35, ease: E }, T(9.1));
count(".big", 0, 32, T(9.15), 0.6, function (v) { return "+" + Math.round(v) + "%"; });
${IN(".src", "T(9.8)")}
`,
});

// 3 waterfall: where do the seconds go
const wf = [
  ["serwer", 0, 150, "y"],
  ["index.html", 150, 40, ""],
  ["style.css", 190, 50, ""],
  ["zdjecie.jpg", 200, 340, "y"],
  ["czat.js", 210, 130, "y"],
  ["pixel.js", 225, 110, "y"],
  ["wtyczka.js", 245, 160, "y"],
];
scenes.push({
  start: 10.3,
  css: `${BASE}
@R .wf { position:absolute; left:80px; right:80px; top:500px; }
@R .wr { position:relative; height:86px; display:flex; align-items:center; }
@R .wr .n { width:300px; font-size:36px; color:var(--muted); }
@R .wr .b { position:absolute; height:40px; border-radius:10px; background:#2b5a45; transform-origin:0 50%; }
@R .wr .b.y { background:var(--yellow); }
@R .ax { position:absolute; left:380px; right:80px; top:1130px; display:flex; justify-content:space-between; font-size:34px; color:var(--muted); }`,
  html: `${TAG}
<h1 class="hd ttl">Skąd te <span class="y">sekundy</span>?</h1>
<div class="wf">${wf.map(([n, x, w, c]) => `<div class="wr"><span class="n mono">${n}</span><span class="b ${c}" style="left:${300 + x}px;width:${w}px"></span></div>`).join("")}</div>
<div class="ax mono"><span>0 s</span><span>5 s</span></div>`,
  js: `
${IN(".ttl", "T(10.45)")}
tl.fromTo($(".wr .n"), { opacity: 0 }, { opacity: 1, duration: 0.25, stagger: 0.07 }, T(10.7));
tl.fromTo($(".wr .b"), { scaleX: 0 }, { scaleX: 1, duration: 0.45, ease: "power2.out", stagger: 0.09 }, T(10.8));
tl.fromTo($(".ax"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, T(11.1));
`,
});

// 4 images: 4.8 MB straight from the phone -> a few hundred KB
const FILE = (cls, name, size, color, w) => `
<div class="fc ${cls}"><div class="fi">${icon("image")}</div><div class="fn mono">${name}</div><div class="fs mono ${color}">${size}</div>
<div class="fb"><i class="${color}" style="width:${w}%"></i></div></div>`;
scenes.push({
  start: 11.75,
  css: `${BASE}
@R .fc { position:absolute; left:110px; right:110px; height:250px; border-radius:30px; background:var(--panel); border:1.5px solid var(--line); }
@R .fc .fi { position:absolute; left:40px; top:40px; color:var(--muted); } @R .fc .fi .ic { width:96px; height:96px; stroke-width:1.4; }
@R .fc .fn { position:absolute; left:170px; top:52px; font-size:44px; }
@R .fc .fs { position:absolute; right:40px; top:44px; font-size:62px; font-weight:700; }
@R .fc .fb { position:absolute; left:40px; right:40px; bottom:44px; height:22px; border-radius:11px; background:#1b2420; overflow:hidden; }
@R .fc .fb i { display:block; height:100%; border-radius:11px; transform-origin:0 50%; }
@R .fc .fb i.y { background:var(--yellow); } @R .fc .fb i.g { background:var(--green); }
@R .c0 { top:500px; } @R .c1 { top:1010px; border-color:#2b5a45; }
@R .mid { position:absolute; left:0; right:0; top:800px; display:flex; justify-content:center; align-items:center; gap:18px; font-size:46px; color:var(--green); }
@R .mid .ic { width:56px; height:56px; stroke-width:1.8; }`,
  html: `${TAG}
<h1 class="hd ttl"><span class="y">1.</span> Zdjęcia</h1>
${FILE("c0", "IMG_2041.jpg", "4,8 MB", "y", 100)}
<div class="mid">${icon("image-down")}<span>zmniejszenie + kompresja</span></div>
${FILE("c1", "zdjecie.webp", "180 KB", "g", 4)}`,
  js: `
${IN(".ttl", "T(11.9)")}
${IN(".c0", "T(13.6)")}
tl.fromTo($(".c0 .fs"), { opacity: 0 }, { opacity: 1, duration: 0.2 }, T(15.2));
count(".c0 .fs", 0, 4.8, T(15.2), 0.5, function (v) { return v.toFixed(1).replace(".", ",") + " MB"; });
tl.fromTo($(".c0 .fb i"), { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: "power2.out" }, T(15.2));
${IN(".mid", "T(16.5)")}
${IN(".c1", "T(17.3)")}
tl.fromTo($(".c1 .fs"), { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.3, ease: E }, T(18.1));
tl.fromTo($(".c1 .fb i"), { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: "power2.out" }, T(18.1));
`,
});

// 5 scripts: every widget is another file to download and run
const js = [
  ["czat.js", 21.3],
  ["pixel.js", 21.95],
  ["reklama.js", 22.3],
  ["wtyczka.js", 22.85],
  ["slider.js", 23.05],
  ["analytics.js", 23.25],
];
scenes.push({
  start: 19.45,
  css: `${BASE}
@R .bx { position:absolute; left:110px; right:110px; top:480px; height:560px; border-radius:36px; background:#0e1311; border:2px solid var(--line); }
@R .bx .bt { position:absolute; left:36px; top:26px; font-size:34px; color:var(--muted); }
@R .chip { position:absolute; width:380px; height:110px; border-radius:24px; background:var(--panel); border:1.5px solid var(--line);
  display:flex; align-items:center; gap:18px; padding:0 26px; font-size:40px; }
@R .chip .ic { width:46px; height:46px; color:var(--yellow); stroke-width:1.8; flex:none; }
${js.map((_, i) => `@R .j${i} { left:${i % 2 ? 452 : 46}px; top:${100 + Math.floor(i / 2) * 140}px; }`).join("\n")}
@R .flow { position:absolute; left:0; right:0; top:1110px; display:flex; justify-content:center; align-items:center; gap:24px; }
@R .pill { height:110px; padding:0 34px; border-radius:55px; background:var(--panel); border:1.5px solid var(--line); display:flex; align-items:center; gap:16px; font-size:48px; }
@R .pill .ic { width:52px; height:52px; color:var(--yellow); stroke-width:1.8; }
@R .arr { font-size:56px; color:var(--muted); }`,
  html: `${TAG}
<h1 class="hd ttl"><span class="y">2.</span> Skrypty</h1>
<div class="bx"><span class="bt mono">twojafirma.pl</span>
${js.map(([n], i) => `<div class="chip j${i} mono">${icon("file-code")}${n}</div>`).join("")}</div>
<div class="flow"><div class="pill p0">${icon("download")}pobierz</div><span class="arr">→</span><div class="pill p1">${icon("cpu")}uruchom</div></div>`,
  js: `
${IN(".ttl", "T(19.6)")}
${IN(".bx", "T(20.3)")}
${js.map(([, t], i) => `tl.fromTo($(".j${i}"), { opacity: 0, y: -40, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: E }, T(${t}));`).join("\n")}
tl.fromTo($(".chip"), { scale: 1 }, { scale: 1.05, duration: 0.15, yoyo: true, repeat: 1, stagger: 0.05 }, T(24.3));
tl.to($(".bx"), { borderColor: "#f5c518", duration: 0.3 }, T(25.1));
${IN(".p0", "T(25.85)")}
tl.fromTo($(".flow .arr"), { opacity: 0 }, { opacity: 1, duration: 0.2 }, T(26.2));
${IN(".p1", "T(26.35)")}
`,
});

// 6 server without cache: every visit builds the page from zero
scenes.push({
  start: 27.1,
  css: `${BASE}
@R .srv { position:absolute; left:290px; right:290px; top:470px; height:250px; border-radius:30px; background:var(--panel); border:1.5px solid var(--line);
  display:flex; flex-direction:column; align-items:center; justify-content:center; gap:14px; color:var(--muted); }
@R .srv .ic { width:84px; height:84px; stroke-width:1.4; }
@R .srv .gear { position:absolute; right:36px; top:30px; color:var(--yellow); } @R .srv .gear .ic { width:52px; height:52px; }
@R .srv .lb { color:var(--text); font-size:42px; }
@R .v { position:absolute; left:110px; right:110px; height:120px; display:flex; align-items:center; gap:24px; }
@R .v .ic { width:56px; height:56px; color:var(--muted); stroke-width:1.7; flex:none; }
@R .v .n { width:230px; font-size:40px; color:var(--muted); }
@R .v .tr { flex:1; height:28px; border-radius:14px; background:#1b2420; overflow:hidden; }
@R .v .tr i { display:block; width:100%; height:100%; background:var(--yellow); transform-origin:0 50%; }
@R .v .z { width:170px; text-align:right; font-size:38px; color:var(--yellow); }
@R .v0 { top:790px; } @R .v1 { top:920px; } @R .v2 { top:1050px; }`,
  html: `${TAG}
<h1 class="hd ttl"><span class="y">3.</span> Serwer bez cache</h1>
<div class="srv"><div class="gear">${icon("settings")}</div>${icon("server")}<span class="lb">buduje stronę</span></div>
${[0, 1, 2].map((i) => `<div class="v v${i}">${icon("user")}<span class="n mono">wejście ${i + 1}</span><div class="tr"><i></i></div><span class="z mono">od zera</span></div>`).join("")}`,
  js: `
${IN(".ttl", "T(27.3)")}
${IN(".srv", "T(28.0)")}
tl.to($(".srv .gear"), { rotate: 540, duration: 3.6, ease: "none" }, T(28.2));
${[29.3, 29.95, 30.6]
  .map(
    (t, i) => `tl.fromTo($(".v${i}"), { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.3, ease: E }, T(${t}));
tl.fromTo($(".v${i} .tr i"), { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: "none" }, T(${t + 0.1}));
tl.fromTo($(".v${i} .z"), { opacity: 0 }, { opacity: 1, duration: 0.2 }, T(${t + 0.7}));`,
  )
  .join("\n")}
`,
});

// 7 the fix: checklist, then the page loads fast
const fix = [
  ["lekkie zdjęcia", 32.6],
  ["mniej skryptów", 33.65],
  ["cache", 34.55],
  ["sieć CDN", 34.95],
];
scenes.push({
  start: 31.6,
  css: `${BASE}
@R .ok .ic { color:var(--green); }
${fix.map((_, i) => `@R .f${i} { top:${470 + i * 145}px; }`).join("\n")}
@R .f3 { height:170px; align-items:flex-start; padding-top:28px; }
@R .f3 .sub { position:absolute; left:122px; top:96px; font-size:38px; color:var(--muted); }
@R .ld { position:absolute; left:110px; right:110px; top:1110px; height:120px; border-radius:30px; background:#0e1311; border:1.5px solid #2b5a45;
  display:flex; align-items:center; gap:22px; padding:0 34px; }
@R .ld .ic { width:56px; height:56px; color:var(--green); stroke-width:1.8; flex:none; }
@R .ld .tr { flex:1; height:24px; border-radius:12px; background:#1b2420; overflow:hidden; }
@R .ld .tr i { display:block; width:100%; height:100%; background:var(--green); transform-origin:0 50%; }`,
  html: `${TAG}
<h1 class="hd ttl"><span class="g">Rozwiązanie</span></h1>
${fix.map(([t], i) => `<div class="row ok f${i}">${icon("circle-check")}<span>${t}</span>${i === 3 ? `<span class="sub">kopie strony blisko użytkownika</span>` : ""}</div>`).join("")}
<div class="ld">${icon("zap")}<div class="tr"><i></i></div></div>`,
  js: `
${IN(".ttl", "T(31.75)")}
${fix.map(([, t], i) => IN(`.f${i}`, `T(${t})`)).join("\n")}
tl.fromTo($(".f3 .sub"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, T(36.15));
${IN(".ld", "T(36.6)")}
tl.fromTo($(".ld .tr i"), { scaleX: 0 }, { scaleX: 1, duration: 0.45, ease: "power3.out" }, T(36.9));
`,
});

// 8 CTA
scenes.push({
  start: 37.9,
  exit: 0.5,
  css: `
@R .pre { position:absolute; left:60px; right:60px; top:420px; text-align:center; font-size:52px; color:var(--text); font-weight:600; }
@R .logo { position:absolute; left:0; right:0; top:580px; text-align:center; font-size:150px; line-height:0.92; }
@R .what { position:absolute; left:0; right:0; top:920px; display:flex; justify-content:center; gap:22px; }
@R .chip { padding:14px 30px; border-radius:22px; background:var(--panel); border:1.5px solid var(--line); font-size:52px; }
@R .fl { position:absolute; left:290px; top:1100px; width:500px; height:130px; border-radius:65px; background:var(--green); color:#0b0e0d;
  display:flex; align-items:center; justify-content:center; gap:20px; font-size:60px; font-weight:700; }
@R .fl .ic { width:56px; height:56px; stroke-width:2.4; }`,
  html: `
<div class="pre"><span class="g">szybkie</span> strony dla firm</div>
<h1 class="hd logo">DELO<br><span class="g">COMPANY</span></h1>
<div class="what"><span class="chip g">strony www</span><span class="chip">automatyzacje</span></div>
<div class="fl">${icon("plus")}Obserwuj</div>`,
  js: `
${IN(".pre", "T(38.05)")}
tl.fromTo($(".logo"), { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.6, ease: E }, T(39.2));
tl.fromTo($(".chip"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4, ease: E, stagger: 0.2 }, T(39.7));
tl.fromTo($(".fl"), { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.45, ease: E }, T(40.4));
tl.fromTo($(".fl"), { scale: 1 }, { scale: 1.05, duration: 0.18, ease: "power2.out", yoyo: true, repeat: 1 }, T(41.1));
`,
});

build({
  title: "Dlaczego twoja strona ładuje się 5 sekund",
  music: 0.11,
  tail: 0.9,
  scenes,
  replace: [
    [["trzydzieści", "dwa", "procent"], "32%"],
    [["kesza"], "cache"],
    [["kesz"], "cache"],
    [["ce", "de", "en"], "CDN"],
    [["kompani"], "Company"],
  ],
  sfx: [
    ["click-soft", 1.9, 0.365, 0.45, 13],
    ["pop", 9.2, 0.72, 0.3, 13],
    ["pop", 18.1, 0.72, 0.3, 14],
    ["click-soft", 36.9, 0.365, 0.45, 13],
    ["chime", 39.2, 2.5, 0.2, 15],
  ],
});
