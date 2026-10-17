import { build, icon } from "./short.mjs";

// global word times (Florian, tightened): stronę 0.83, Google 1.93, istnieje 3.37, robot 4.52, Guglbot 5.08, chodzi 6.20,
// klika 7.15, linki 7.49, Na 8.20, trafia 8.93, innej 9.29, mapy 10.34, zgłosisz 11.54, Potem 12.37, przeglądarka 13.32,
// zapisuje 14.22, indeksie 14.69, biblioteka 16.24, setki 17.05, ponad 18.30, gigabajtów 19.14, Dopiero 20.29, wpisze 21.27,
// wybiera 22.22, najlepsze 23.01, Liczy 24.17, treść 24.56, szybkość 25.13, telefonie 26.94, Nikt 27.76, linkuje 28.60,
// mapy 29.49, Robot 30.47, znaleźć 31.50, Strony 32.35, widzi 33.61, Delo 34.68, Obserwuj 35.78
const IN = (sel, t, extra = "") => `tl.fromTo($("${sel}"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.45, ease: E${extra} }, ${t});`;
const TAG = `<div class="tag mono">IT OD ŚRODKA · #9</div>`;
const BASE = `
@R .tag { position:absolute; left:0; right:0; top:200px; text-align:center; font-size:44px; color:var(--muted); }
@R .ttl { position:absolute; left:80px; right:80px; top:290px; text-align:center; font-size:84px; }
@R .site { position:absolute; height:130px; border-radius:30px; background:var(--panel); border:2px solid var(--line);
  display:flex; align-items:center; justify-content:center; gap:16px; font-size:42px; }
@R .site .ic { width:48px; height:48px; color:var(--muted); stroke-width:1.7; }
@R .bot { position:absolute; width:100px; height:100px; border-radius:50%; background:var(--green); color:#0b0e0d; display:flex; align-items:center; justify-content:center; }
@R .bot .ic { width:58px; height:58px; stroke-width:2; }
`;
const scenes = [];

// 1 hook: new website, Google does not know it yet
scenes.push({
  start: 0,
  css: `${BASE}
@R .q { position:absolute; left:80px; right:80px; top:300px; text-align:center; font-size:92px; }
@R .s0 { left:240px; right:240px; top:620px; }
@R .nw { position:absolute; left:760px; top:590px; padding:6px 18px; border-radius:14px; background:var(--green); color:#0b0e0d; font-size:32px; font-weight:700; }
@R .sb { position:absolute; left:120px; right:120px; top:870px; height:120px; border-radius:60px; background:var(--panel); border:1.5px solid var(--line);
  display:flex; align-items:center; gap:20px; padding:0 40px; font-size:44px; color:var(--muted); }
@R .sb .ic { width:50px; height:50px; stroke-width:1.8; }
@R .qm { position:absolute; left:0; right:0; top:1040px; text-align:center; font-size:150px; font-weight:700; color:var(--yellow); }`,
  html: `${TAG}
<h1 class="hd q">Skąd <span class="g">Google</span> wie<br>o twojej stronie?</h1>
<div class="site s0">${icon("globe")}<span class="mono">twojafirma.pl</span></div>
<div class="nw mono">NOWA</div>
<div class="sb">${icon("search")}<span class="mono">twojafirma</span></div>
<div class="qm">?</div>`,
  js: `
tl.fromTo($(".tag"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0);
${IN(".q", "0.05")}
${IN(".s0", "0.3")}
tl.fromTo($(".nw"), { opacity: 0, scale: 0.6, rotate: -8 }, { opacity: 1, scale: 1, rotate: 6, duration: 0.4, ease: E }, T(0.6));
${IN(".sb", "T(1.9)")}
tl.fromTo($(".qm"), { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.4, ease: E }, T(3.3));
`,
});

// 2 Googlebot follows links across the web, reaches your site; sitemap as a shortcut
const N = { a: [180, 560], b: [540, 500], c: [900, 600], d: [290, 810], e: [770, 800] };
const YOU = [700, 1080];
const MAP = [235, 1080];
const edges = [["a", "b"], ["b", "c"], ["a", "d"], ["b", "e"], ["c", "e"], ["d", "e"]];
const P = (k) => (k === "you" ? YOU : N[k]);
const ed = (p, q, cls = "") => `<path class="${cls}" pathLength="1" d="M${P(p)[0]} ${P(p)[1]} L${P(q)[0]} ${P(q)[1]}"/>`;
const mv = (k) => `{ x: ${P(k)[0] - N.a[0]}, y: ${P(k)[1] - N.a[1]}, duration: 0.55, ease: IO }`;
scenes.push({
  start: 4.05,
  css: `${BASE}
@R .wire path.hot { stroke:var(--green); stroke-width:5; }
@R .wire path.sm { stroke:var(--yellow); stroke-width:4; stroke-dasharray:10 12; }
@R .nd { position:absolute; width:110px; height:110px; margin:-55px 0 0 -55px; border-radius:26px; background:var(--panel); border:1.5px solid var(--line);
  display:flex; align-items:center; justify-content:center; color:var(--muted); }
@R .nd .ic { width:50px; height:50px; stroke-width:1.5; }
${Object.entries(N).map(([k, [x, y]]) => `@R .n-${k} { left:${x}px; top:${y}px; }`).join("\n")}
@R .you { left:${YOU[0] - 200}px; width:400px; top:${YOU[1] - 65}px; font-size:36px; }
@R .map { left:${MAP[0] - 165}px; width:330px; top:${MAP[1] - 65}px; font-size:34px; border-color:#6b5a1a; color:var(--yellow); }
@R .map .ic { color:var(--yellow); }
@R .bot { left:${N.a[0] - 50}px; top:${N.a[1] - 50}px; }`,
  html: `${TAG}
<h1 class="hd ttl"><span class="g">Googlebot</span></h1>
<svg class="wire" viewBox="0 0 1080 1920">${edges.map(([p, q]) => ed(p, q)).join("")}${ed("e", "you", "hot")}
<path class="sm" d="M${MAP[0] + 165} ${MAP[1]} L${YOU[0] - 200} ${YOU[1]}"/></svg>
${Object.keys(N).map((k) => `<div class="nd n-${k}">${icon("file-text")}</div>`).join("")}
<div class="site you">${icon("globe")}<span class="mono">twojafirma.pl</span></div>
<div class="site map">${icon("map")}<span class="mono">sitemap.xml</span></div>
<div class="bot">${icon("bot")}</div>`,
  js: `
${IN(".ttl", "T(4.2)")}
tl.fromTo($(".nd"), { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.35, ease: E, stagger: 0.07 }, T(4.6));
tl.fromTo($(".wire path:not(.hot):not(.sm)"), { opacity: 0 }, { opacity: 1, duration: 0.4, stagger: 0.05 }, T(4.9));
tl.fromTo($(".bot"), { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.4, ease: E }, T(5.05));
tl.to($(".bot"), ${mv("b")}, T(6.2));
tl.to($(".bot"), ${mv("e")}, T(7.1));
tl.fromTo($(".you"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: E }, T(7.8));
draw(".wire path.hot", T(8.2), 0.5);
tl.to($(".bot"), ${mv("you")}, T(8.4));
tl.to($(".you"), { borderColor: "#3ee08f", duration: 0.3 }, T(8.9));
tl.to($(".bot"), { x: ${YOU[0] - N.a[0]}, y: ${YOU[1] - N.a[1] - 120}, duration: 0.4, ease: E }, T(9.4));
${IN(".map", "T(10.2)")}
tl.fromTo($(".wire path.sm"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, T(10.6));
tl.to($(".wire path.sm"), { strokeDashoffset: -88, duration: 1.4, ease: "none" }, T(10.6));
`,
});

// 3 render like a browser, store in the index; index size
const sep = `function (v) { return String(Math.round(v)).replace(/\\B(?=(\\d{3})+(?!\\d))/g, " "); }`;
scenes.push({
  start: 12.2,
  css: `${BASE}
@R .brw { position:absolute; left:100px; top:470px; width:400px; height:300px; border-radius:28px; background:#0e1311; border:1.5px solid var(--line); overflow:hidden; }
@R .brw .bar { height:56px; border-bottom:1.5px solid var(--line); display:flex; align-items:center; gap:10px; padding:0 20px; }
@R .brw .bar i { width:14px; height:14px; border-radius:50%; background:#2b3632; display:block; }
@R .brw .sk { position:absolute; left:28px; height:22px; border-radius:11px; background:#24302b; transform-origin:0 50%; }
@R .brw .im { position:absolute; left:28px; top:150px; width:150px; height:110px; border-radius:14px; background:#1d4a39; transform-origin:0 0; }
@R .arr { position:absolute; left:500px; top:575px; width:80px; text-align:center; font-size:64px; color:var(--muted); }
@R .idx { position:absolute; left:580px; top:470px; width:400px; height:300px; border-radius:28px; background:var(--panel); border:1.5px solid var(--line);
  display:flex; flex-direction:column; align-items:center; justify-content:center; gap:14px; color:var(--green); }
@R .idx .ic { width:110px; height:110px; stroke-width:1.3; }
@R .idx .lb { color:var(--text); font-size:46px; }
@R .lbl { position:absolute; top:790px; width:400px; text-align:center; font-size:38px; color:var(--muted); }
@R .l0 { left:100px; } @R .l1 { left:580px; }
@R .pg { position:absolute; left:250px; top:575px; width:90px; height:110px; border-radius:14px; background:var(--panel); border:2px solid var(--green);
  display:flex; align-items:center; justify-content:center; color:var(--green); }
@R .pg .ic { width:50px; height:50px; }
@R .st { position:absolute; left:110px; right:110px; height:180px; border-radius:30px; background:var(--panel); border:1.5px solid var(--line);
  display:flex; flex-direction:column; justify-content:center; padding:0 44px; }
@R .st .v { font-size:76px; font-weight:700; letter-spacing:-0.03em; color:var(--green); }
@R .st .u { font-size:40px; color:var(--muted); }
@R .st0 { top:880px; } @R .st1 { top:1090px; }`,
  html: `${TAG}
<h1 class="hd ttl">Render → <span class="g">indeks</span></h1>
<div class="brw"><div class="bar"><i></i><i></i><i></i></div>
<span class="sk" style="top:80px;width:300px"></span><span class="sk" style="top:116px;width:220px"></span>
<span class="im"></span><span class="sk" style="left:200px;top:160px;width:160px"></span><span class="sk" style="left:200px;top:196px;width:120px"></span></div>
<div class="arr">→</div>
<div class="idx">${icon("library")}<span class="lb">indeks Google</span></div>
<div class="lbl l0">jak przeglądarka</div>
<div class="pg">${icon("file-text")}</div>
<div class="st st0"><span class="v">setki miliardów</span><span class="u">stron w indeksie</span></div>
<div class="st st1"><span class="v mono"><span class="c">0</span> GB</span><span class="u">ponad tyle danych</span></div>`,
  js: `
${IN(".ttl", "T(12.35)")}
${IN(".brw", "T(12.6)")}
tl.fromTo($(".brw .sk, .brw .im"), { scaleX: 0 }, { scaleX: 1, duration: 0.35, ease: E, stagger: 0.1 }, T(13.0));
${IN(".l0", "T(13.3)")}
tl.fromTo($(".arr"), { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.3 }, T(13.9));
${IN(".idx", "T(14.1)")}
tl.fromTo($(".pg"), { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.25, ease: E }, T(14.25));
tl.to($(".pg"), { x: 480, duration: 0.5, ease: IO }, T(14.45));
tl.to($(".pg"), { opacity: 0, scale: 0.5, duration: 0.2 }, T(14.95));
tl.fromTo($(".idx"), { scale: 1 }, { scale: 1.05, duration: 0.15, yoyo: true, repeat: 1 }, T(14.95));
${IN(".st0", "T(17.0)")}
${IN(".st1", "T(18.3)")}
count(".st1 .c", 0, 100000000, T(18.4), 0.9, ${sep});
`,
});

// 4 ranking: query -> best results from the index; content, speed, mobile
const res = [
  ["r-a", "salon-anna.pl", 640],
  ["r-b", "fryzjerzy24.pl", 790],
  ["r-y", "twojafirma.pl", 940],
];
scenes.push({
  start: 20.1,
  css: `${BASE}
@R .sb { position:absolute; left:110px; right:110px; top:460px; height:120px; border-radius:60px; background:var(--panel); border:1.5px solid var(--line);
  display:flex; align-items:center; gap:20px; padding:0 40px; font-size:46px; }
@R .sb .ic { width:50px; height:50px; color:var(--muted); stroke-width:1.8; }
@R .sb .qt { clip-path:inset(0 100% 0 0); }
@R .rs { position:absolute; left:110px; right:110px; height:130px; border-radius:26px; background:var(--panel); border:1.5px solid var(--line);
  display:flex; align-items:center; gap:24px; padding:0 34px; }
@R .rs .fv { width:56px; height:56px; border-radius:50%; background:#24302b; flex:none; }
@R .rs .t { display:flex; flex-direction:column; gap:10px; }
@R .rs .d { font-size:40px; }
@R .rs .ln { width:360px; height:16px; border-radius:8px; background:#24302b; }
${res.map(([c, , y]) => `@R .${c} { top:${y}px; }`).join("\n")}
@R .r-y { border-color:#2b5a45; } @R .r-y .fv { background:var(--green); } @R .r-y .d { color:var(--green); }
@R .fx { position:absolute; left:0; right:0; top:1120px; display:flex; justify-content:center; gap:20px; }
@R .fc { height:110px; padding:0 28px; border-radius:55px; background:var(--panel); border:1.5px solid var(--line); display:flex; align-items:center; gap:14px; font-size:44px; }
@R .fc .ic { width:48px; height:48px; color:var(--green); stroke-width:1.8; }`,
  html: `${TAG}
<h1 class="hd ttl">Wyniki</h1>
<div class="sb">${icon("search")}<span class="qt mono">fryzjer kraków</span></div>
${res.map(([c, d]) => `<div class="rs ${c}"><span class="fv"></span><span class="t"><span class="d mono">${d}</span><span class="ln"></span></span></div>`).join("")}
<div class="fx"><div class="fc f0">${icon("file-text")}treść</div><div class="fc f1">${icon("zap")}szybkość</div><div class="fc f2">${icon("smartphone")}telefon</div></div>`,
  js: `
${IN(".ttl", "T(20.25)")}
${IN(".sb", "T(20.5)")}
tl.to($(".sb .qt"), { clipPath: "inset(0 0% 0 0)", duration: 0.7, ease: "steps(14)" }, T(20.9));
tl.fromTo($(".rs"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.35, ease: E, stagger: 0.12 }, T(22.2));
tl.to($(".r-y"), { y: -300, duration: 0.6, ease: IO }, T(23.3));
tl.to([$(".r-a"), $(".r-b")], { y: 150, duration: 0.6, ease: IO }, T(23.3));
${IN(".f0", "T(24.5)")}
${IN(".f1", "T(25.1)")}
${IN(".f2", "T(26.6)")}
`,
});

// 5 no links, no sitemap: the bot may not find you for a long time
scenes.push({
  start: 27.6,
  css: `${BASE}
@R .bot { left:170px; top:500px; }
@R .bub { position:absolute; left:290px; top:470px; width:80px; height:80px; border-radius:24px; background:var(--panel); border:2px solid var(--yellow);
  color:var(--yellow); font-size:54px; font-weight:700; display:flex; align-items:center; justify-content:center; }
@R .you { left:300px; right:300px; top:720px; opacity:.55; }
@R .ch { position:absolute; left:170px; right:170px; height:110px; border-radius:28px; background:var(--panel); border:1.5px solid #6b5a1a;
  display:flex; align-items:center; gap:20px; padding:0 32px; font-size:46px; }
@R .ch .ic { width:50px; height:50px; color:var(--yellow); stroke-width:1.8; }
@R .c0 { top:930px; } @R .c1 { top:1065px; }`,
  html: `${TAG}
<h1 class="hd ttl">Brak <span class="y">linków</span> i mapy?</h1>
<div class="bot">${icon("bot")}</div><div class="bub">?</div>
<div class="site you">${icon("globe")}<span class="mono">twojafirma.pl</span></div>
<div class="ch c0">${icon("link")}0 linków do ciebie</div>
<div class="ch c1">${icon("map")}brak sitemap.xml</div>`,
  js: `
${IN(".ttl", "T(27.75)")}
tl.fromTo($(".you"), { opacity: 0 }, { opacity: 0.55, duration: 0.4 }, T(27.9));
${IN(".c0", "T(28.5)")}
${IN(".c1", "T(29.4)")}
tl.fromTo($(".bot"), { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.35, ease: E }, T(30.3));
tl.fromTo($(".bub"), { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.3, ease: E }, T(30.5));
tl.to([$(".bot"), $(".bub")], { x: 60, y: -20, duration: 0.5, ease: IO, yoyo: true, repeat: 1 }, T(30.8));
tl.to([$(".bot"), $(".bub")], { x: -340, opacity: 0, duration: 0.5, ease: "power2.in" }, T(31.6));
tl.to($(".you"), { opacity: 0.3, duration: 0.4 }, T(31.6));
`,
});

// 6 CTA
scenes.push({
  start: 32.2,
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
<div class="pre">strony, które <span class="g">Google widzi</span></div>
<h1 class="hd logo">DELO<br><span class="g">COMPANY</span></h1>
<div class="what"><span class="chip g">strony www</span><span class="chip">automatyzacje</span></div>
<div class="fl">${icon("plus")}Obserwuj</div>`,
  js: `
${IN(".pre", "T(32.35)")}
tl.fromTo($(".logo"), { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.6, ease: E }, T(34.6));
tl.fromTo($(".chip"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4, ease: E, stagger: 0.2 }, T(35.0));
tl.fromTo($(".fl"), { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.45, ease: E }, T(35.75));
tl.fromTo($(".fl"), { scale: 1 }, { scale: 1.05, duration: 0.18, ease: "power2.out", yoyo: true, repeat: 1 }, T(36.4));
`,
});

build({
  title: "Jak twoja strona trafia do Google",
  music: 0.11,
  tail: 0.9,
  scenes,
  replace: [
    [["guglbot"], "Googlebot"],
    [["kompani"], "Company"],
  ],
  sfx: [
    ["pop", 8.9, 0.72, 0.3, 13],
    ["click-soft", 14.95, 0.365, 0.45, 13],
    ["pop", 23.4, 0.72, 0.3, 14],
    ["chime", 34.6, 2.5, 0.2, 15],
  ],
});
