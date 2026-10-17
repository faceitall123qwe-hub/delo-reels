import { build, icon } from "./short.mjs";

// global word times: spację .71, skacze 2.15, Ale 3.48, Klawiatura 6.48, USB 8.43, tysiąc 9.92, Gra 11.85, skok 12.73,
// serwer 13.92, predykcja 16.59, pakiet 19.01, UDP 19.43, serwera 20.84, Serwer 22.32, możliwy 23.93, oszukujesz 24.56,
// fizykę 25.62, sześćdziesiąt 26.73, wysyła 29.26, wszystkich 30.20, skoczyłeś 32.47, Cała 33.90, kilkadziesiąt 35.10,
// mrugnięcie 37.70, Takie 39.44, firm 41.39, Delo 42.64, strony 43.78, Obserwuj 45.99
const IN = (sel, t, extra = "") => `tl.fromTo($("${sel}"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.45, ease: E${extra} }, ${t});`;
const TAG = `<div class="tag mono">IT OD ŚRODKA · #1</div>`;
const BASE = `
@R .tag { position:absolute; left:0; right:0; top:200px; text-align:center; font-size:44px; color:var(--muted); }
@R .ttl { position:absolute; left:80px; right:80px; top:290px; text-align:center; font-size:84px; }
@R .nd { position:absolute; width:250px; height:230px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:16px; color:var(--muted); }
@R .nd > .ic { width:84px; height:84px; stroke-width:1.4; }
@R .nd .lb { color:var(--text); font-size:46px; }
@R .avatar { position:absolute; width:90px; height:90px; border-radius:22px; background:var(--green); }
`;
const scenes = [];

// 1 hook: spacebar + jump
scenes.push({
  start: 0,
  css: `${BASE}
@R .key { position:absolute; left:140px; top:980px; width:800px; height:170px; border-radius:30px; background:var(--panel); border:3px solid var(--line);
  box-shadow:0 14px 0 #1c2421; display:flex; align-items:center; justify-content:center; font-size:64px; color:var(--text); }
@R .avatar { left:495px; top:820px; }
@R .floor { position:absolute; left:340px; right:340px; top:912px; height:4px; background:var(--line); }
@R .q { position:absolute; left:80px; right:80px; top:300px; text-align:center; font-size:96px; }`,
  html: `${TAG}
<h1 class="hd q">Co się dzieje, gdy <span class="g">klikasz spację</span>?</h1>
<div class="floor"></div><div class="avatar"></div>
<div class="key mono">SPACJA</div>`,
  js: `
tl.fromTo($(".tag"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0);
${IN(".key", "0.05")}
tl.fromTo([$(".floor"), $(".avatar")], { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.2);
tl.to($(".key"), { y: 12, boxShadow: "0 2px 0 #1c2421", borderColor: "#3ee08f", duration: 0.08, ease: "power2.out" }, T(0.71));
tl.to($(".key"), { y: 0, boxShadow: "0 14px 0 #1c2421", borderColor: "#24302b", duration: 0.2, ease: E }, T(0.95));
tl.to($(".avatar"), { y: -210, duration: 0.42, ease: "power2.out" }, T(0.8));
tl.to($(".avatar"), { y: 0, duration: 0.42, ease: "power2.in" }, T(1.22));
tl.to($(".avatar"), { y: -210, duration: 0.42, ease: "power2.out" }, T(2.1));
tl.to($(".avatar"), { y: 0, duration: 0.42, ease: "power2.in" }, T(2.52));
${IN(".q", "0.1")}
`,
});

// 2 keyboard -> USB -> PC
scenes.push({
  start: 6.2,
  css: `${BASE}
@R .k { left:120px; top:640px; } @R .pc { left:710px; top:640px; }
@R .wire path { stroke:var(--green); stroke-width:4; }
@R .pk { position:absolute; left:380px; top:741px; width:28px; height:28px; border-radius:50%; background:var(--yellow); }
@R .usb { position:absolute; left:380px; top:640px; width:320px; text-align:center; font-size:52px; color:var(--green); }
@R .hz { position:absolute; left:0; right:0; top:990px; text-align:center; font-size:150px; color:var(--yellow); }
@R .ms { position:absolute; left:0; right:0; top:1180px; text-align:center; font-size:52px; color:var(--muted); }`,
  html: `${TAG}
<h1 class="hd ttl">Klawiatura <span class="g">→</span> komputer</h1>
<svg class="wire" viewBox="0 0 1080 1920"><path class="ln" pathLength="1" d="M370 755 L710 755"/></svg>
<div class="card nd k">${icon("keyboard")}<span class="lb">klawiatura</span></div>
<div class="card nd pc">${icon("cpu")}<span class="lb">komputer</span></div>
<div class="usb mono">USB</div>
${[0, 1, 2].map((i) => `<div class="pk p${i}"></div>`).join("")}
<div class="hz mono">1000×/s</div>
<div class="ms">sprawdzanie klawiszy co 1 ms</div>`,
  js: `
${IN(".ttl", "T(6.3)")}
${IN(".k", "T(6.5)")}
${IN(".pc", "T(6.7)")}
draw(".ln", T(8.1), 0.5);
tl.fromTo($(".usb"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, T(8.4));
${[0, 1, 2].map((i) => `tl.fromTo($(".p${i}"), { opacity: 1, x: 0 }, { x: 300, duration: 0.5, ease: "none" }, T(8.6) + ${i} * 0.25); tl.set($(".p${i}"), { opacity: 0 }, T(9.1) + ${i} * 0.25);`).join("\n")}
tl.fromTo($(".hz"), { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.45, ease: E }, T(9.85));
${IN(".ms", "T(10.4)")}
`,
});

// 3 client prediction
scenes.push({
  start: 11.7,
  css: `${BASE}
@R .scr { position:absolute; left:120px; top:560px; width:520px; height:440px; border-radius:30px; background:var(--panel); border:3px solid var(--green); }
@R .scr .lb { position:absolute; left:0; right:0; top:24px; text-align:center; font-size:46px; color:var(--green); }
@R .scr .fl { position:absolute; left:60px; right:60px; top:360px; height:4px; background:var(--line); }
@R .scr .avatar { left:215px; top:270px; }
@R .sv { left:710px; top:640px; opacity:.5; }
@R .qm { position:absolute; left:710px; top:890px; width:250px; text-align:center; font-size:46px; color:var(--muted); }
@R .pred { position:absolute; left:0; right:0; top:1110px; text-align:center; font-size:110px; color:var(--yellow); }
@R .sub { position:absolute; left:80px; right:80px; top:1250px; text-align:center; font-size:48px; color:var(--muted); }`,
  html: `${TAG}
<h1 class="hd ttl">Skok <span class="g">od razu</span> u ciebie</h1>
<div class="scr"><div class="lb">twój ekran</div><div class="fl"></div><div class="avatar"></div></div>
<div class="card nd sv">${icon("server")}<span class="lb">serwer</span></div>
<div class="qm">jeszcze nie wie</div>
<div class="pred mono">PREDYKCJA</div>
<div class="sub">gra zgaduje wynik, zanim serwer odpowie</div>`,
  js: `
${IN(".ttl", "T(11.8)")}
${IN(".scr", "T(11.9)")}
tl.to($(".scr .avatar"), { y: -160, duration: 0.4, ease: "power2.out" }, T(12.7));
tl.to($(".scr .avatar"), { y: 0, duration: 0.4, ease: "power2.in" }, T(13.1));
tl.fromTo($(".sv"), { opacity: 0 }, { opacity: 0.5, duration: 0.4 }, T(13.9));
tl.fromTo($(".qm"), { opacity: 0 }, { opacity: 1, duration: 0.4 }, T(14.3));
tl.fromTo($(".pred"), { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.45, ease: E }, T(16.5));
${IN(".sub", "T(16.9)")}
`,
});

// 4 UDP packet
scenes.push({
  start: 17.9,
  css: `${BASE}
@R .a { left:60px; top:700px; width:240px; } @R .g2 { left:420px; top:700px; width:240px; } @R .s { left:780px; top:700px; width:240px; }
@R .wire path { stroke:#3a4842; stroke-width:4; stroke-dasharray:14 12; }
@R .pkt { position:absolute; left:120px; top:600px; padding:10px 22px; border-radius:16px; background:var(--panel); border:2px solid var(--yellow); color:var(--yellow); font-size:44px; }
@R .ping { position:absolute; left:0; right:0; top:1050px; text-align:center; font-size:110px; color:var(--green); }
@R .pl { position:absolute; left:0; right:0; top:1190px; text-align:center; font-size:48px; color:var(--muted); }`,
  html: `${TAG}
<h1 class="hd ttl">Pakiet leci do <span class="g">serwera</span></h1>
<svg class="wire" viewBox="0 0 1080 1920"><path d="M300 815 L420 815"/><path d="M660 815 L780 815"/></svg>
<div class="card nd a">${icon("gamepad-2")}<span class="lb">ty</span></div>
<div class="card nd g2">${icon("globe")}<span class="lb">internet</span></div>
<div class="card nd s">${icon("server")}<span class="lb">serwer</span></div>
<div class="pkt mono">UDP · skok</div>
<div class="ping mono">≈ 30 ms</div>
<div class="pl">typowy ping w Europie</div>`,
  js: `
${IN(".ttl", "T(18.0)")}
tl.fromTo($(".nd"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.45, ease: E, stagger: 0.1 }, T(18.1));
tl.fromTo($(".pkt"), { opacity: 0, x: 0 }, { opacity: 1, x: 0, duration: 0.3 }, T(19.0));
tl.to($(".pkt"), { x: 560, duration: 1.8, ease: "power1.inOut" }, T(19.5));
tl.fromTo($(".ping"), { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.45, ease: E }, T(20.8));
${IN(".pl", "T(21.1)")}
`,
});

// 5 server checks
const checks = [
  ["czy skok jest możliwy", 23.9],
  ["czy nie oszukujesz", 24.5],
  ["fizyka · 64× na sekundę", 26.7],
];
scenes.push({
  start: 22.1,
  css: `${BASE}
@R .srv { position:absolute; left:340px; top:440px; width:400px; height:230px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:14px; color:var(--green); border-color:rgba(62,224,143,.5); }
@R .srv .ic { width:90px; height:90px; stroke-width:1.4; }
@R .srv .lb { color:var(--text); font-size:52px; }
@R .ck { position:absolute; left:120px; right:120px; height:130px; display:flex; align-items:center; gap:26px; padding:0 40px; border-radius:28px; background:var(--panel); border:1.5px solid var(--line); font-size:52px; }
@R .ck .ic { width:56px; height:56px; color:var(--green); stroke-width:2; flex:none; }
${checks.map((_, i) => `@R .c${i} { top:${760 + i * 160}px; }`).join("\n")}`,
  html: `${TAG}
<div class="card srv">${icon("server")}<span class="lb">serwer gry</span></div>
${checks.map(([t], i) => `<div class="ck c${i}">${icon(i === 2 ? "timer" : "shield-check")}<span>${t}</span></div>`).join("\n")}`,
  js: `
${IN(".srv", "T(22.2)")}
${checks.map(([, t], i) => IN(`.c${i}`, `T(${t})`)).join("\n")}
tl.fromTo($(".c2 .ic"), { rotate: 0 }, { rotate: 360, duration: 1.2, ease: "power2.inOut" }, T(27.0));
`,
});

// 6 broadcast to players
const px = [100, 415, 730];
scenes.push({
  start: 28.8,
  css: `${BASE}
@R .srv { position:absolute; left:250px; top:440px; width:580px; height:200px; display:flex; align-items:center; justify-content:center; gap:20px; color:var(--green); }
@R .srv .ic { width:72px; height:72px; stroke-width:1.4; }
@R .srv .lb { color:var(--text); font-size:52px; }
@R .wire path { stroke:var(--green); stroke-width:3; }
@R .pl { position:absolute; top:900px; width:250px; height:300px; border-radius:28px; background:var(--panel); border:1.5px solid var(--line); }
@R .pl .lb { position:absolute; left:0; right:0; top:20px; text-align:center; font-size:44px; color:var(--muted); }
@R .pl .fl { position:absolute; left:40px; right:40px; top:250px; height:4px; background:var(--line); }
@R .pl .avatar { left:90px; top:180px; width:70px; height:70px; border-radius:18px; }
${px.map((x, i) => `@R .p${i} { left:${x}px; }`).join("\n")}
@R .cap { position:absolute; left:80px; right:80px; top:1260px; text-align:center; font-size:56px; font-weight:600; }`,
  html: `${TAG}
<div class="card srv">${icon("server")}<span class="lb">nowy stan gry</span></div>
<svg class="wire" viewBox="0 0 1080 1920">${px.map((x, i) => `<path class="w${i}" pathLength="1" d="M540 640 C 540 770, ${x + 125} 770, ${x + 125} 900"/>`).join("")}</svg>
${px.map((_, i) => `<div class="pl p${i}"><div class="lb">gracz ${i + 1}</div><div class="fl"></div><div class="avatar"></div></div>`).join("")}
<div class="cap">teraz <span class="y">inni</span> widzą twój skok</div>`,
  js: `
${IN(".srv", "T(28.9)")}
${px.map((_, i) => `draw(".w${i}", T(29.3) + ${i} * 0.15, 0.5);`).join("\n")}
tl.fromTo($(".pl"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.45, ease: E, stagger: 0.12 }, T(30.1));
tl.to($(".pl .avatar"), { y: -110, duration: 0.35, ease: "power2.out", stagger: 0.05 }, T(32.4));
tl.to($(".pl .avatar"), { y: 0, duration: 0.35, ease: "power2.in", stagger: 0.05 }, T(32.75));
${IN(".cap", "T(31.5)")}
`,
});

// 7 timing vs blink
scenes.push({
  start: 33.7,
  css: `${BASE}
@R .row { position:absolute; left:120px; right:120px; }
@R .row .lb { display:flex; justify-content:space-between; font-size:52px; margin-bottom:22px; }
@R .row .bar { height:64px; border-radius:18px; background:var(--line); overflow:hidden; }
@R .row .bar i { display:block; height:100%; border-radius:18px; }
@R .r0 { top:600px; } @R .r0 i { width:17%; background:var(--green); }
@R .r1 { top:840px; } @R .r1 i { width:100%; background:#4a5751; }
@R .big { position:absolute; left:80px; right:80px; top:1110px; text-align:center; font-size:96px; }`,
  html: `${TAG}
<h1 class="hd ttl">Ile to <span class="g">trwa</span>?</h1>
<div class="row r0"><div class="lb"><span>cała droga</span><span class="mono g">≈ 50 ms</span></div><div class="bar"><i></i></div></div>
<div class="row r1"><div class="lb"><span>mrugnięcie</span><span class="mono muted">≈ 300 ms</span></div><div class="bar"><i></i></div></div>
<h1 class="hd big">szybciej niż <span class="y">mrugnięcie</span></h1>`,
  js: `
${IN(".ttl", "T(33.8)")}
${IN(".r0", "T(34.5)")}
tl.fromTo($(".r0 i"), { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: 0.6, ease: E }, T(35.1));
${IN(".r1", "T(37.0)")}
tl.fromTo($(".r1 i"), { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: 0.9, ease: E }, T(37.6));
${IN(".big", "T(38.1)")}
`,
});

// 8 Delo Company CTA
scenes.push({
  start: 39.2,
  exit: 0.5,
  css: `
@R .pre { position:absolute; left:80px; right:80px; top:380px; text-align:center; font-size:60px; color:var(--muted); }
@R .logo { position:absolute; left:0; right:0; top:560px; text-align:center; font-size:150px; line-height:0.92; }
@R .what { position:absolute; left:0; right:0; top:900px; display:flex; justify-content:center; gap:22px; }
@R .chip { padding:14px 30px; border-radius:22px; background:var(--panel); border:1.5px solid var(--line); font-size:52px; }
@R .fl { position:absolute; left:290px; top:1080px; width:500px; height:130px; border-radius:65px; background:var(--green); color:#0b0e0d;
  display:flex; align-items:center; justify-content:center; gap:20px; font-size:60px; font-weight:700; }
@R .fl .ic { width:56px; height:56px; stroke-width:2.4; }`,
  html: `
<div class="pre">takie systemy budujemy dla firm</div>
<h1 class="hd logo">DELO<br><span class="g">COMPANY</span></h1>
<div class="what"><span class="chip">strony www</span><span class="chip g">automatyzacje</span></div>
<div class="fl">${icon("plus")}Obserwuj</div>`,
  js: `
${IN(".pre", "T(39.4)")}
tl.fromTo($(".logo"), { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.6, ease: E }, T(42.5));
tl.fromTo($(".chip"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4, ease: E, stagger: 0.25 }, T(43.7));
tl.fromTo($(".fl"), { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.45, ease: E }, T(45.9));
tl.fromTo($(".fl"), { scale: 1 }, { scale: 1.05, duration: 0.18, ease: "power2.out", yoyo: true, repeat: 1 }, T(46.7));
`,
});

build({
  title: "Co się dzieje, gdy klikasz spację",
  music: 0.28,
  scenes,
  replace: [
    [["u", "es", "be"], "USB"],
    [["u", "de", "pe"], "UDP"],
    [["kompani"], "Company"],
  ],
  sfx: [
    ["key-press", 0.95, 0.4, 0.5, 13],
    ["pop", 10.1, 0.72, 0.3, 13],
    ["click-soft", 24.15, 0.365, 0.4, 14],
    ["click-soft", 24.75, 0.365, 0.4, 13],
    ["chime", 42.7, 2.5, 0.2, 15],
  ],
});
