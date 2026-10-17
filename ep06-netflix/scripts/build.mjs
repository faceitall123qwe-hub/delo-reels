import { build, icon } from "./short.mjs";

// global word times (Florian, tightened): Netflix .77, zacina 1.90, Polska 3.92, trzy 5.23, Pierwsza 6.25, blisko 7.60,
// sieć 9.57, dostawców 11.75, Ameryki 13.82, operatora 15.72, Druga 16.59, popularne 17.72, nocy 19.30, ruch 20.80,
// Trzecia 21.35, kawałki 22.96, sekund 23.72, jakościach 25.83, Odtwarzacz 26.71, mierzy 27.82, zwalnia 29.76,
// niższej 31.69, zatrzymać 33.16, zapas 34.67, bufor 35.52, kilkanaście 36.25, rozmywa 39.35, stoi 40.80,
// Szybkie 41.48, Delo 43.28, Obserwuj 44.45
const IN = (sel, t, extra = "") => `tl.fromTo($("${sel}"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.45, ease: E${extra} }, ${t});`;
const TAG = `<div class="tag mono">IT OD ŚRODKA · #6</div>`;
const BASE = `
@R .tag { position:absolute; left:0; right:0; top:200px; text-align:center; font-size:44px; color:var(--muted); }
@R .ttl { position:absolute; left:80px; right:80px; top:290px; text-align:center; font-size:84px; }
@R .num { color:var(--yellow); }
@R .nd { position:absolute; width:300px; height:200px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:14px; color:var(--muted); }
@R .nd > .ic { width:76px; height:76px; stroke-width:1.4; }
@R .nd .lb { color:var(--text); font-size:46px; }
`;
const scenes = [];

// 1 hook: smooth playback, whole country watching, three tricks
scenes.push({
  start: 0,
  css: `${BASE}
@R .q { position:absolute; left:80px; right:80px; top:300px; text-align:center; font-size:96px; }
@R .scr { position:absolute; left:120px; right:120px; top:600px; height:470px; border-radius:30px; background:#0e1311; border:1.5px solid var(--line); overflow:hidden; }
@R .scr .frame { position:absolute; left:24px; right:24px; top:24px; bottom:80px; border-radius:18px; background:linear-gradient(135deg, #16352a, #10221c 55%, #2b2a14); }
@R .scr .ic { position:absolute; left:50%; top:42%; width:110px; height:110px; margin:-55px 0 0 -55px; color:var(--text); stroke-width:1.5; }
@R .scr .pb { position:absolute; left:24px; right:24px; bottom:36px; height:10px; border-radius:5px; background:var(--line); overflow:hidden; }
@R .scr .pb i { display:block; width:100%; height:100%; background:var(--green); }
@R .homes { position:absolute; left:120px; right:120px; top:1110px; display:grid; grid-template-columns:repeat(10, 1fr); gap:12px; }
@R .homes i { display:block; height:40px; border-radius:10px; background:#1f2a26; }
@R .tricks { position:absolute; left:0; right:0; top:1230px; display:flex; justify-content:center; gap:24px; }
@R .tricks span { width:110px; height:110px; border-radius:30px; background:var(--panel); border:2px solid var(--yellow); color:var(--yellow);
  display:flex; align-items:center; justify-content:center; font-size:60px; font-weight:700; }`,
  html: `${TAG}
<h1 class="hd q">Dlaczego Netflix <span class="g">się nie zacina</span>?</h1>
<div class="scr"><div class="frame"></div>${icon("play")}<div class="pb"><i></i></div></div>
<div class="homes">${"<i></i>".repeat(20)}</div>
<div class="tricks"><span>1</span><span>2</span><span>3</span></div>`,
  js: `
tl.fromTo($(".tag"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0);
${IN(".q", "0.05")}
${IN(".scr", "0.2")}
tl.fromTo($(".scr .pb i"), { scaleX: 0.08, transformOrigin: "0% 50%" }, { scaleX: 0.5, duration: 5.5, ease: "none" }, 0.4);
tl.to($(".scr .ic"), { opacity: 0, scale: 0.8, duration: 0.3 }, T(1.9));
tl.fromTo($(".homes i"), { opacity: 0 }, { opacity: 1, duration: 0.2, stagger: 0.03 }, T(2.9));
tl.to($(".homes i"), { backgroundColor: "#3ee08f", duration: 0.2, stagger: 0.03 }, T(3.7));
tl.fromTo($(".tricks span"), { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.35, ease: E, stagger: 0.12 }, T(5.2));
`,
});

// 2 trick 1: server close to you
scenes.push({
  start: 6.0,
  css: `${BASE}
@R .nd.w { width:490px; }
@R .us { left:140px; top:440px; opacity:.55; height:190px; }
@R .op { left:140px; top:740px; height:250px; border-color:rgba(62,224,143,.6); }
@R .op .nl { font-size:42px; color:var(--green); }
@R .you { left:140px; top:1100px; height:190px; }
@R .wire .far { stroke:#4a5751; stroke-width:4; stroke-dasharray:14 14; }
@R .wire .near { stroke:var(--green); stroke-width:6; }
@R .xl { position:absolute; left:680px; top:440px; display:flex; align-items:center; gap:12px; color:var(--yellow); font-size:46px; }
@R .xl .ic { width:46px; height:46px; stroke-width:2.2; }`,
  html: `${TAG}
<h1 class="hd ttl"><span class="num">1.</span> Serwer <span class="g">blisko ciebie</span></h1>
<svg class="wire" viewBox="0 0 1080 1920"><path class="far" d="M630 535 C 960 600, 960 1130, 630 1195"/><path class="near" pathLength="1" d="M385 990 L385 1100"/></svg>
<div class="card nd w us">${icon("globe")}<span class="lb">USA</span></div>
<div class="card nd w op">${icon("building-2")}<span class="lb">twój operator</span><span class="nl mono">+ serwer Netflix</span></div>
<div class="card nd w you">${icon("tv")}<span class="lb">ty</span></div>
<div class="xl">${icon("x")}<span>za daleko</span></div>`,
  js: `
${IN(".ttl", "T(6.2)")}
${IN(".you", "T(7.4)")}
${IN(".op", "T(9.4)")}
tl.fromTo($(".op .nl"), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4, ease: E }, T(11.7));
tl.fromTo([$(".us"), $(".far")], { opacity: 0 }, { opacity: 0.55, duration: 0.5 }, T(13.4));
tl.fromTo($(".xl"), { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.4, ease: E }, T(14.0));
draw(".near", T(15.3), 0.6);
`,
});

// 3 trick 2: copy at night (traffic over 24 h)
const traffic = [22, 15, 10, 7, 6, 7, 12, 22, 34, 40, 44, 47, 52, 50, 48, 50, 55, 63, 74, 86, 95, 98, 82, 45, 24];
const cx = (h) => 120 + (h / 24) * 840;
const cy = (v) => 1060 - v * 4.2;
scenes.push({
  start: 16.4,
  css: `${BASE}
@R .wire .ln { stroke:var(--text); stroke-width:4; fill:none; }
@R .wire .night { fill:rgba(62,224,143,.14); stroke:none; }
@R .wire .eve { fill:rgba(245,197,24,.12); stroke:none; }
@R .wire .ax { stroke:var(--line); stroke-width:3; }
@R .lbl { position:absolute; font-size:42px; }
@R .l0 { left:${cx(1.2)}px; top:1090px; color:var(--green); } @R .l1 { left:${cx(18.6)}px; top:1090px; color:var(--yellow); }
@R .hrs { position:absolute; left:120px; right:120px; top:1170px; display:flex; justify-content:space-between; font-size:40px; color:var(--muted); }
@R .moon { position:absolute; left:${cx(2.4)}px; top:560px; display:flex; flex-direction:column; align-items:center; gap:10px; color:var(--green); }
@R .moon .ic { width:84px; height:84px; stroke-width:1.5; }
@R .moon span { font-size:42px; }`,
  html: `${TAG}
<h1 class="hd ttl"><span class="num">2.</span> Kopiowanie <span class="g">nocą</span></h1>
<svg class="wire" viewBox="0 0 1080 1920">
  <rect class="night" x="${cx(1)}" y="${cy(100)}" width="${cx(6) - cx(1)}" height="${cy(0) - cy(100)}" rx="16"/>
  <rect class="eve" x="${cx(18)}" y="${cy(100)}" width="${cx(23) - cx(18)}" height="${cy(0) - cy(100)}" rx="16"/>
  <path class="ax" d="M120 ${cy(0)} L960 ${cy(0)}"/>
  <path class="ln" pathLength="1" d="${traffic.map((v, h) => `${h ? "L" : "M"}${cx(h).toFixed(1)} ${cy(v).toFixed(1)}`).join(" ")}"/>
</svg>
<div class="moon">${icon("moon")}<span>kopiowanie</span></div>
<div class="lbl l0">mały ruch</div><div class="lbl l1">oglądanie</div>
<div class="hrs mono"><span>00</span><span>06</span><span>12</span><span>18</span><span>24</span></div>`,
  js: `
${IN(".ttl", "T(16.6)")}
tl.fromTo([$(".ax"), $(".hrs")], { opacity: 0 }, { opacity: 1, duration: 0.4 }, T(17.0));
draw(".ln", T(17.2), 1.6);
tl.fromTo([$(".eve"), $(".l1")], { opacity: 0 }, { opacity: 1, duration: 0.4 }, T(18.5));
tl.fromTo([$(".night"), $(".l0")], { opacity: 0 }, { opacity: 1, duration: 0.4 }, T(19.3));
tl.fromTo($(".moon"), { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.45, ease: E }, T(19.4));
`,
});

// 4 trick 3: chunks in many qualities
const Q = ["4K", "1080p", "720p", "480p"];
scenes.push({
  start: 21.2,
  css: `${BASE}
@R .strip { position:absolute; left:100px; right:100px; top:520px; display:grid; grid-template-columns:repeat(6, 1fr); gap:12px; }
@R .ck { display:flex; flex-direction:column; gap:10px; }
@R .ck .top { height:96px; border-radius:16px; background:var(--panel); border:2px solid var(--green); display:flex; align-items:center; justify-content:center; font-size:36px; color:var(--green); }
@R .ck .q { height:66px; border-radius:12px; background:#151d1a; border:1.5px solid var(--line); display:flex; align-items:center; justify-content:center; font-size:30px; color:var(--muted); }
@R .ql { position:absolute; left:0; right:0; top:1060px; text-align:center; font-size:52px; }
@R .sl { position:absolute; left:0; right:0; top:440px; text-align:center; font-size:44px; color:var(--muted); }`,
  html: `${TAG}
<h1 class="hd ttl"><span class="num">3.</span> Kawałki <span class="g">filmu</span></h1>
<div class="sl">każdy kawałek: kilka sekund</div>
<div class="strip">${Array.from({ length: 6 }, (_, i) => `<div class="ck c${i}"><div class="top mono">${i + 1}</div>${Q.map((q) => `<div class="q mono">${q}</div>`).join("")}</div>`).join("")}</div>
<div class="ql">każdy w <span class="y">wielu jakościach</span></div>`,
  js: `
${IN(".ttl", "T(21.4)")}
tl.fromTo($(".ck .top"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.35, ease: E, stagger: 0.08 }, T(22.9));
${IN(".sl", "T(23.6)")}
tl.fromTo($(".ck .q"), { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.25, ease: E, stagger: 0.03 }, T(25.0));
${IN(".ql", "T(25.8)")}
`,
});

// 5 adaptive quality: link slows -> next chunk lower quality, no stop
const picked = ["1080p", "1080p", "1080p", "480p", "720p", "1080p"];
scenes.push({
  start: 26.6,
  css: `${BASE}
@R .ga { position:absolute; left:120px; right:120px; top:440px; }
@R .ga .row { display:flex; align-items:center; gap:18px; font-size:46px; margin-bottom:20px; color:var(--muted); }
@R .ga .row .ic { width:52px; height:52px; color:var(--green); stroke-width:1.6; }
@R .ga .bar { height:56px; border-radius:18px; background:var(--line); overflow:hidden; }
@R .ga .bar i { display:block; width:100%; height:100%; border-radius:18px; background:var(--green); }
@R .seq { position:absolute; left:100px; right:100px; top:720px; display:grid; grid-template-columns:repeat(6, 1fr); gap:12px; }
@R .seq div { height:150px; border-radius:18px; background:var(--panel); border:2px solid var(--line); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:6px; }
@R .seq .n { font-size:34px; color:var(--muted); }
@R .seq .v { font-size:32px; color:var(--green); }
@R .seq .low { border-color:var(--yellow); } @R .seq .low .v { color:var(--yellow); }
@R .np { position:absolute; left:0; right:0; top:960px; display:flex; justify-content:center; align-items:center; gap:22px; font-size:56px; font-weight:600; }
@R .np .ic { width:60px; height:60px; color:var(--yellow); stroke-width:2; }`,
  html: `${TAG}
<div class="ga"><div class="row">${icon("gauge")}<span>twoje łącze</span></div><div class="bar"><i></i></div></div>
<div class="seq">${picked.map((q, i) => `<div class="s${i} ${q === "480p" ? "low" : ""}"><span class="n mono">${i + 1}</span><span class="v mono">${q}</span></div>`).join("")}</div>
<div class="np">${icon("pause")}<span>zamiast <span class="y">zatrzymania</span></span></div>`,
  js: `
${IN(".ga", "T(26.8)")}
tl.fromTo($(".ga .bar i"), { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 0.9, duration: 0.6, ease: E }, T(27.8));
${[0, 1, 2].map((i) => `tl.fromTo($(".s${i}"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.3, ease: E }, T(28.0) + ${i} * 0.3);`).join("\n")}
tl.to($(".ga .bar i"), { scaleX: 0.3, backgroundColor: "#f5c518", duration: 0.5, ease: IO }, T(29.7));
tl.fromTo($(".s3"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.3, ease: E }, T(31.6));
tl.to($(".ga .bar i"), { scaleX: 0.6, backgroundColor: "#3ee08f", duration: 0.5, ease: IO }, T(32.2));
tl.fromTo($(".s4"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.3, ease: E }, T(32.4));
tl.to($(".ga .bar i"), { scaleX: 0.9, duration: 0.5, ease: IO }, T(32.8));
tl.fromTo($(".s5"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.3, ease: E }, T(33.0));
${IN(".np", "T(32.7)")}
`,
});

// 6 buffer + blur instead of stop
scenes.push({
  start: 33.8,
  css: `${BASE}
@R .vid { position:absolute; left:120px; right:120px; top:420px; height:420px; border-radius:26px; overflow:hidden; background:#0e1311; border:1.5px solid var(--line); }
@R .vid .frame { position:absolute; inset:20px; border-radius:16px; background:linear-gradient(135deg, #1d4a39, #12281f 50%, #3a3818); }
@R .vid .ob { position:absolute; left:120px; top:110px; width:180px; height:180px; border-radius:50%; background:#3ee08f; opacity:.75; }
@R .vid .ob2 { position:absolute; right:140px; top:150px; width:260px; height:120px; border-radius:24px; background:#f5c518; opacity:.6; }
@R .tl { position:absolute; left:120px; right:120px; top:920px; height:24px; border-radius:12px; background:var(--line); }
@R .tl .bf { position:absolute; left:0; top:0; bottom:0; width:62%; border-radius:12px; background:#4a5751; }
@R .tl .pl { position:absolute; left:0; top:0; bottom:0; width:38%; border-radius:12px; background:var(--green); }
@R .tl .hd2 { position:absolute; left:38%; top:-14px; width:52px; height:52px; margin-left:-26px; border-radius:50%; background:var(--text); }
@R .bl { position:absolute; left:0; right:0; top:980px; display:flex; justify-content:center; gap:40px; font-size:44px; }
@R .cap { position:absolute; left:80px; right:80px; top:1120px; text-align:center; font-size:56px; font-weight:600; }`,
  html: `${TAG}
<h1 class="hd ttl">Zapas: <span class="g">bufor</span></h1>
<div class="vid"><div class="frame"><div class="ob"></div><div class="ob2"></div></div></div>
<div class="tl"><div class="bf"></div><div class="pl"></div><div class="hd2"></div></div>
<div class="bl"><span class="g">oglądasz</span><span class="muted">pobrane ≈ 15 s do przodu</span></div>
<div class="cap">czasem <span class="y">rozmyte</span>, prawie nigdy <span class="g">nie stoi</span></div>`,
  js: `
${IN(".ttl", "T(34.0)")}
${IN(".vid", "T(34.3)")}
tl.fromTo($(".tl"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, T(34.6));
tl.fromTo($(".tl .bf"), { scaleX: 0.6, transformOrigin: "0% 50%" }, { scaleX: 1, duration: 0.9, ease: E }, T(35.5));
${IN(".bl", "T(36.2)")}
tl.to($(".vid .frame"), { filter: "blur(14px)", duration: 0.3 }, T(39.3));
tl.to($(".vid .frame"), { filter: "blur(0px)", duration: 0.6 }, T(40.1));
${IN(".cap", "T(39.6)")}
`,
});

// 7 CTA
scenes.push({
  start: 41.4,
  exit: 0.5,
  css: `
@R .pre { position:absolute; left:60px; right:60px; top:420px; text-align:center; font-size:54px; color:var(--text); font-weight:600; }
@R .logo { position:absolute; left:0; right:0; top:580px; text-align:center; font-size:150px; line-height:0.92; }
@R .what { position:absolute; left:0; right:0; top:920px; display:flex; justify-content:center; gap:22px; }
@R .chip { padding:14px 30px; border-radius:22px; background:var(--panel); border:1.5px solid var(--line); font-size:52px; }
@R .fl { position:absolute; left:290px; top:1100px; width:500px; height:130px; border-radius:65px; background:var(--green); color:#0b0e0d;
  display:flex; align-items:center; justify-content:center; gap:20px; font-size:60px; font-weight:700; }
@R .fl .ic { width:56px; height:56px; stroke-width:2.4; }`,
  html: `
<div class="pre"><span class="g">szybkie</span> strony i aplikacje</div>
<h1 class="hd logo">DELO<br><span class="g">COMPANY</span></h1>
<div class="what"><span class="chip">strony www</span><span class="chip g">automatyzacje</span></div>
<div class="fl">${icon("plus")}Obserwuj</div>`,
  js: `
${IN(".pre", "T(41.5)")}
tl.fromTo($(".logo"), { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.6, ease: E }, T(43.2));
tl.fromTo($(".chip"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4, ease: E, stagger: 0.2 }, T(43.7));
tl.fromTo($(".fl"), { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.45, ease: E }, T(44.4));
tl.fromTo($(".fl"), { scale: 1 }, { scale: 1.05, duration: 0.18, ease: "power2.out", yoyo: true, repeat: 1 }, T(45.1));
`,
});

build({
  title: "Dlaczego Netflix się nie zacina",
  music: 0.28,
  tail: 0.9,
  scenes,
  replace: [[["kompani"], "Company"]],
  sfx: [
    ["pop", 5.2, 0.72, 0.3, 13],
    ["click-soft", 11.7, 0.365, 0.45, 13],
    ["pop", 19.4, 0.72, 0.3, 14],
    ["click-soft", 31.6, 0.365, 0.45, 13],
    ["chime", 43.2, 2.5, 0.2, 15],
  ],
});
