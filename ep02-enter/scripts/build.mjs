import { build, icon } from "./short.mjs";

// global word times: adres .82, Enter 2.14, sekundzie 3.51, Ale 5.59, przeglądarka 8.05, DNS 8.84, IP 10.40, książka 12.44,
// serwerem 15.50, szyfrowanie 16.44, kłódka 18.29, wysyła 20.51, główną 22.03, Serwer 23.37, kod 24.16, bazy 25.29, HTML 26.23,
// Przeglądarka 28.46, style 30.03, skrypty 30.65, zdjęcia 31.24, kilkadziesiąt 32.99, układa 35.37, rysuje 36.58,
// Google 38.55, trzy 40.72, połowa 41.80, rezygnuje 42.72, Delo 44.57, szybkie 45.71, Obserwuj 47.31
const IN = (sel, t, extra = "") => `tl.fromTo($("${sel}"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.45, ease: E${extra} }, ${t});`;
const TAG = `<div class="tag mono">IT OD ŚRODKA · #2</div>`;
const DOMAIN = "twojafirma.pl";
const BASE = `
@R .tag { position:absolute; left:0; right:0; top:200px; text-align:center; font-size:44px; color:var(--muted); }
@R .ttl { position:absolute; left:80px; right:80px; top:290px; text-align:center; font-size:84px; }
@R .nd { position:absolute; width:250px; height:230px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:16px; color:var(--muted); }
@R .nd > .ic { width:84px; height:84px; stroke-width:1.4; }
@R .nd .lb { color:var(--text); font-size:46px; }
@R .bar { position:absolute; left:100px; right:100px; height:110px; border-radius:55px; background:var(--panel); border:2px solid var(--line);
  display:flex; align-items:center; gap:22px; padding:0 40px; font-size:54px; }
@R .bar .ic { width:48px; height:48px; color:var(--muted); stroke-width:1.8; flex:none; }
@R .ch { display:none; }
`;
const typed = (s) => [...s].map((c) => `<span class="ch">${c}</span>`).join("");
const TYPE = `function type(sel, t, step) { var els = document.querySelectorAll(R + sel + " .ch"); for (var i = 0; i < els.length; i++) tl.set(els[i], { display: "inline" }, t + i * step); }`;
const scenes = [];

// 1 hook: address bar + Enter
scenes.push({
  start: 0,
  css: `${BASE}
@R .q { position:absolute; left:80px; right:80px; top:300px; text-align:center; font-size:100px; }
@R .b1 { top:620px; }
@R .ent { position:absolute; left:620px; top:790px; width:360px; height:150px; border-radius:30px; background:var(--panel); border:3px solid var(--line);
  box-shadow:0 14px 0 #1c2421; display:flex; align-items:center; justify-content:center; gap:18px; font-size:56px; }
@R .ent .ic { width:52px; height:52px; stroke-width:2; }
@R .pg { position:absolute; left:100px; right:100px; top:1000px; height:330px; border-radius:30px; background:var(--panel); border:1.5px solid var(--line); overflow:hidden; }
@R .pg i { position:absolute; left:40px; border-radius:12px; background:#1f2a26; display:block; }`,
  html: `${TAG}
<h1 class="hd q">Co się dzieje po <span class="g">Enter</span>?</h1>
<div class="bar b1">${icon("globe")}<span class="mono">${typed(DOMAIN)}</span></div>
<div class="ent mono">${icon("corner-down-left")}Enter</div>
<div class="pg"><i style="top:36px; width:820px; height:40px"></i><i style="top:110px; width:520px; height:150px; background:rgba(62,224,143,.14)"></i><i style="top:110px; left:600px; width:240px; height:30px"></i><i style="top:160px; left:600px; width:200px; height:30px"></i></div>`,
  js: `${TYPE}
tl.fromTo($(".tag"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0);
${IN(".q", "0.05")}
${IN(".b1", "0.15")}
type(".b1", T(0.4), 0.09);
${IN(".ent", "T(1.4)")}
tl.to($(".ent"), { y: 12, boxShadow: "0 2px 0 #1c2421", borderColor: "#3ee08f", color: "#3ee08f", duration: 0.08 }, T(2.14));
tl.to($(".ent"), { y: 0, boxShadow: "0 14px 0 #1c2421", duration: 0.2, ease: E }, T(2.35));
tl.fromTo($(".pg"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, ease: E }, T(3.5));
tl.fromTo($(".pg i"), { opacity: 0 }, { opacity: 1, duration: 0.3, stagger: 0.08 }, T(3.6));
tl.to($(".pg"), { opacity: 0.25, duration: 0.4 }, T(5.6));
`,
});

// 2 DNS
scenes.push({
  start: 7.4,
  css: `${BASE}
@R .nm { position:absolute; left:100px; right:100px; top:520px; height:150px; border-radius:30px; background:var(--panel); border:1.5px solid var(--line);
  display:flex; align-items:center; justify-content:center; font-size:72px; }
@R .arr { position:absolute; left:0; right:0; top:700px; text-align:center; font-size:90px; color:var(--muted); }
@R .ip { position:absolute; left:100px; right:100px; top:840px; height:150px; border-radius:30px; background:var(--panel); border:3px solid var(--green);
  display:flex; align-items:center; justify-content:center; font-size:72px; color:var(--green); }
@R .bk { position:absolute; left:80px; right:80px; top:1100px; display:flex; justify-content:center; align-items:center; gap:22px; font-size:52px; color:var(--muted); }
@R .bk .ic { width:60px; height:60px; color:var(--yellow); stroke-width:1.6; }`,
  html: `${TAG}
<h1 class="hd ttl">Krok 1: <span class="g">DNS</span></h1>
<div class="nm mono">${DOMAIN}</div>
<div class="arr">↓</div>
<div class="ip mono">203.0.113.10</div>
<div class="bk">${icon("book-open")}<span>książka telefoniczna internetu</span></div>`,
  js: `
${IN(".ttl", "T(7.6)")}
${IN(".nm", "T(8.0)")}
tl.fromTo($(".arr"), { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.4, ease: E }, T(9.9));
tl.fromTo($(".ip"), { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.45, ease: E }, T(10.4));
${IN(".bk", "T(12.4)")}
`,
});

// 3 TLS
scenes.push({
  start: 14.6,
  css: `${BASE}
@R .a { left:100px; top:560px; } @R .s { left:730px; top:560px; }
@R .wire path { stroke:var(--green); stroke-width:4; }
@R .lk { position:absolute; left:470px; top:600px; width:140px; height:140px; border-radius:50%; background:var(--bg); border:3px solid var(--green);
  display:flex; align-items:center; justify-content:center; color:var(--green); }
@R .lk .ic { width:70px; height:70px; stroke-width:1.8; }
@R .b3 { top:960px; }
@R .b3 .ic { color:var(--green); }
@R .b3 .g { color:var(--green); }`,
  html: `${TAG}
<h1 class="hd ttl">Krok 2: <span class="g">szyfrowanie</span></h1>
<svg class="wire" viewBox="0 0 1080 1920"><path class="ln" pathLength="1" d="M350 675 L730 675"/></svg>
<div class="card nd a">${icon("smartphone")}<span class="lb">ty</span></div>
<div class="card nd s">${icon("server")}<span class="lb">serwer</span></div>
<div class="lk">${icon("lock")}</div>
<div class="bar b3">${icon("lock")}<span class="mono"><span class="g">https://</span>${DOMAIN}</span></div>`,
  js: `
${IN(".ttl", "T(14.8)")}
tl.fromTo($(".nd"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.45, ease: E, stagger: 0.12 }, T(15.0));
draw(".ln", T(15.5), 0.6);
tl.fromTo($(".lk"), { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.45, ease: E }, T(16.4));
${IN(".b3", "T(18.2)")}
`,
});

// 4 request
scenes.push({
  start: 19.9,
  css: `${BASE}
@R .a { left:100px; top:620px; } @R .s { left:730px; top:620px; }
@R .wire path { stroke:#3a4842; stroke-width:4; stroke-dasharray:14 12; }
@R .pk { position:absolute; left:120px; top:520px; padding:12px 26px; border-radius:18px; background:var(--panel); border:2px solid var(--yellow); color:var(--yellow); font-size:52px; }
@R .say { position:absolute; left:80px; right:80px; top:960px; text-align:center; font-size:64px; font-weight:600; }`,
  html: `${TAG}
<h1 class="hd ttl">Krok 3: <span class="g">prośba</span></h1>
<svg class="wire" viewBox="0 0 1080 1920"><path d="M350 735 L730 735"/></svg>
<div class="card nd a">${icon("smartphone")}<span class="lb">ty</span></div>
<div class="card nd s">${icon("server")}<span class="lb">serwer</span></div>
<div class="pk mono">GET /</div>
<div class="say">„daj mi <span class="y">stronę główną</span>”</div>`,
  js: `
${IN(".ttl", "T(20.0)")}
tl.fromTo($(".nd"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, T(20.0));
tl.fromTo($(".pk"), { opacity: 0, x: 0 }, { opacity: 1, x: 0, duration: 0.3 }, T(20.5));
tl.to($(".pk"), { x: 620, duration: 1.4, ease: "power1.inOut" }, T(20.8));
${IN(".say", "T(21.4)")}
`,
});

// 5 server work
const steps = [
  ["code", "uruchamia kod", 24.16],
  ["database", "pobiera dane z bazy", 25.29],
  ["file-code", "gotowy HTML", 26.23],
];
scenes.push({
  start: 23.1,
  css: `${BASE}
@R .st { position:absolute; left:120px; right:120px; height:150px; display:flex; align-items:center; gap:30px; padding:0 44px; border-radius:30px; background:var(--panel); border:1.5px solid var(--line); font-size:58px; }
@R .st .ic { width:64px; height:64px; color:var(--green); stroke-width:1.6; flex:none; }
${steps.map((_, i) => `@R .s${i} { top:${480 + i * 230}px; }`).join("\n")}
@R .s2 { border-color:rgba(62,224,143,.6); }
@R .dn { position:absolute; left:0; right:0; text-align:center; font-size:60px; color:var(--muted); }
@R .d0 { top:${480 + 150 + 10}px; } @R .d1 { top:${480 + 230 + 150 + 10}px; }`,
  html: `${TAG}
<h1 class="hd ttl">Serwer <span class="g">pracuje</span></h1>
${steps.map(([ic, t], i) => `<div class="st s${i}">${icon(ic)}<span>${t}</span></div>`).join("")}
<div class="dn d0">↓</div><div class="dn d1">↓</div>`,
  js: `
${IN(".ttl", "T(23.3)")}
${steps.map(([, , t], i) => IN(`.s${i}`, `T(${t})`)).join("\n")}
tl.fromTo($(".d0"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, T(25.1));
tl.fromTo($(".d1"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, T(26.0));
`,
});

// 6 browser pulls files
const kinds = [
  ["file-code", "HTML", 28.46],
  ["palette", "CSS", 30.03],
  ["braces", "JS", 30.65],
  ["image", "zdjęcia", 31.24],
];
scenes.push({
  start: 28.2,
  css: `${BASE}
@R .k { position:absolute; width:400px; height:130px; display:flex; align-items:center; gap:22px; padding:0 34px; border-radius:26px; background:var(--panel); border:1.5px solid var(--line); font-size:54px; }
@R .k .ic { width:56px; height:56px; color:var(--green); stroke-width:1.6; }
${kinds.map((_, i) => `@R .k${i} { left:${i % 2 ? 560 : 120}px; top:${470 + Math.floor(i / 2) * 160}px; }`).join("\n")}
@R .grid { position:absolute; left:120px; top:850px; width:840px; display:grid; grid-template-columns:repeat(8, 1fr); gap:14px; }
@R .grid i { display:block; height:70px; border-radius:12px; background:#1f2a26; border:1.5px solid var(--line); }
@R .cnt { position:absolute; left:0; right:0; top:1150px; text-align:center; font-size:60px; font-weight:600; }`,
  html: `${TAG}
<h1 class="hd ttl">Dociąga <span class="g">pliki</span></h1>
${kinds.map(([ic, t], i) => `<div class="k k${i}">${icon(ic)}<span class="mono">${t}</span></div>`).join("")}
<div class="grid">${"<i></i>".repeat(24)}</div>
<div class="cnt">często <span class="y">kilkadziesiąt</span> plików</div>`,
  js: `
${IN(".ttl", "T(28.3)")}
${kinds.map(([, , t], i) => IN(`.k${i}`, `T(${t})`)).join("\n")}
tl.fromTo($(".grid i"), { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.25, ease: E, stagger: 0.04 }, T(31.8));
${IN(".cnt", "T(32.9)")}
`,
});

// 7 render
scenes.push({
  start: 34.6,
  css: `${BASE}
@R .br { position:absolute; left:100px; right:100px; top:460px; height:760px; border-radius:30px; background:var(--panel); border:1.5px solid var(--line); overflow:hidden; }
@R .br .top { height:80px; border-bottom:1.5px solid var(--line); display:flex; align-items:center; gap:12px; padding:0 30px; }
@R .br .top b { display:block; width:16px; height:16px; border-radius:50%; background:#2b3632; }
@R .e { position:absolute; border-radius:14px; }
@R .nav { left:40px; right:40px; top:120px; height:60px; background:#1f2a26; }
@R .hero { left:40px; right:40px; top:220px; height:260px; background:rgba(62,224,143,.14); border:1.5px solid rgba(62,224,143,.4); display:flex; align-items:center; justify-content:center; color:var(--green); }
@R .hero .ic { width:90px; height:90px; stroke-width:1.3; }
@R .t1 { left:40px; top:520px; width:600px; height:40px; background:#26332e; }
@R .t2 { left:40px; top:585px; width:500px; height:28px; background:#1d2723; }
@R .btn { left:40px; top:650px; width:260px; height:70px; border-radius:35px; background:var(--green); }`,
  html: `${TAG}
<h1 class="hd ttl">Rysuje <span class="g">stronę</span></h1>
<div class="br"><div class="top"><b></b><b></b><b></b></div>
<div class="e nav"></div><div class="e hero">${icon("image")}</div><div class="e t1"></div><div class="e t2"></div><div class="e btn"></div></div>`,
  js: `
${IN(".ttl", "T(34.7)")}
${IN(".br", "T(34.8)")}
tl.fromTo($(".e"), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.35, ease: E, stagger: 0.25 }, T(35.4));
`,
});

// 8 business stat
scenes.push({
  start: 37.9,
  css: `${BASE}
@R .src { position:absolute; left:0; right:0; top:300px; text-align:center; font-size:48px; color:var(--muted); }
@R .tm { position:absolute; left:0; right:0; top:430px; display:flex; justify-content:center; align-items:center; gap:30px; color:var(--yellow); }
@R .tm .ic { width:130px; height:130px; stroke-width:1.5; }
@R .tm .v { font-size:200px; font-weight:700; letter-spacing:-0.04em; }
@R .lb2 { position:absolute; left:80px; right:80px; top:700px; text-align:center; font-size:56px; color:var(--muted); }
@R .ppl { position:absolute; left:120px; top:840px; width:840px; display:grid; grid-template-columns:repeat(10, 1fr); gap:14px; }
@R .ppl i { display:block; height:84px; border-radius:42px 42px 14px 14px; background:var(--green); }
@R .big { position:absolute; left:80px; right:80px; top:1060px; text-align:center; font-size:76px; font-weight:700; letter-spacing:-0.03em; }`,
  html: `${TAG}
<div class="src">według Google</div>
<div class="tm">${icon("timer")}<span class="v mono">3 s</span></div>
<div class="lb2">strona na telefonie ładuje się dłużej</div>
<div class="ppl">${Array.from({ length: 20 }, (_, i) => `<i class="p${i}"></i>`).join("")}</div>
<div class="big"><span class="y">ponad połowa</span> rezygnuje</div>`,
  js: `
${IN(".src", "T(38.1)")}
tl.fromTo($(".tm"), { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.45, ease: E }, T(40.6));
${IN(".lb2", "T(39.3)")}
tl.fromTo($(".ppl i"), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.25, ease: E, stagger: 0.02 }, T(41.2));
tl.to([${Array.from({ length: 11 }, (_, i) => `$(".p${19 - i}")`).join(", ")}], { opacity: 0.18, backgroundColor: "#8a9891", duration: 0.3, stagger: 0.04 }, T(42.0));
${IN(".big", "T(42.6)")}
`,
});

// 9 Delo CTA
scenes.push({
  start: 43.8,
  exit: 0.5,
  css: `
@R .pre { position:absolute; left:80px; right:80px; top:400px; text-align:center; font-size:64px; color:var(--text); font-weight:600; }
@R .logo { position:absolute; left:0; right:0; top:580px; text-align:center; font-size:150px; line-height:0.92; }
@R .what { position:absolute; left:0; right:0; top:920px; display:flex; justify-content:center; gap:22px; }
@R .chip { padding:14px 30px; border-radius:22px; background:var(--panel); border:1.5px solid var(--line); font-size:52px; }
@R .fl { position:absolute; left:290px; top:1100px; width:500px; height:130px; border-radius:65px; background:var(--green); color:#0b0e0d;
  display:flex; align-items:center; justify-content:center; gap:20px; font-size:60px; font-weight:700; }
@R .fl .ic { width:56px; height:56px; stroke-width:2.4; }`,
  html: `
<h1 class="hd logo">DELO<br><span class="g">COMPANY</span></h1>
<div class="pre">budujemy <span class="g">szybkie</span> strony</div>
<div class="what"><span class="chip">strony www</span><span class="chip g">automatyzacje</span></div>
<div class="fl">${icon("plus")}Obserwuj</div>`,
  js: `
tl.fromTo($(".logo"), { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.6, ease: E }, T(44.4));
${IN(".pre", "T(45.3)")}
tl.fromTo($(".chip"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4, ease: E, stagger: 0.2 }, T(46.0));
tl.fromTo($(".fl"), { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.45, ease: E }, T(47.2));
tl.fromTo($(".fl"), { scale: 1 }, { scale: 1.05, duration: 0.18, ease: "power2.out", yoyo: true, repeat: 1 }, T(48.0));
`,
});

build({
  title: "Co się dzieje po Enter",
  music: 0.28,
  scenes,
  replace: [
    [["de", "en", "es"], "DNS"],
    [["i", "pe"], "IP"],
    [["ha", "te", "em", "el"], "HTML"],
    [["kompani"], "Company"],
  ],
  sfx: [
    ["key-press", 2.14, 0.4, 0.5, 13],
    ["pop", 10.4, 0.72, 0.3, 13],
    ["click-soft", 16.44, 0.365, 0.45, 14],
    ["chime", 44.4, 2.5, 0.2, 15],
  ],
});
