import { build, icon } from "./short.mjs";

// global word times (Brian): BLIK-iem .77, sześć 3.63, zapłacone 5.25, sekundach 7.79, Kod 8.87, banku 10.69, jednorazowy 11.97,
// minuty 13.81, Sklep 14.71, kwotę 15.97, BLIK 16.93, bank 19.08, pyta 20.99, Bank 22.65, powiadomienie 23.54, kwotę 26.10,
// sklep 26.58, PIN 28.12, Bank 29.08, środki 30.68, zgoda 32.65, sklepu 34.70, przyjęta 36.12, numeru 38.44, konta 40.62,
// rozliczają 42.90, tle 44.52, 2024 45.44, miliarda 49.23, sześć 51.02, Płatności 53.24, Delo 55.78, Obserwuj 57.15
const IN = (sel, t, extra = "") => `tl.fromTo($("${sel}"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.45, ease: E${extra} }, ${t});`;
const TAG = `<div class="tag mono">IT OD ŚRODKA · #4</div>`;
const CODE = "482 913";
const AMOUNT = "129,99 zł";
const BASE = `
@R .tag { position:absolute; left:0; right:0; top:200px; text-align:center; font-size:44px; color:var(--muted); }
@R .ttl { position:absolute; left:80px; right:80px; top:290px; text-align:center; font-size:84px; }
@R .nd { position:absolute; width:250px; height:230px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:16px; color:var(--muted); }
@R .nd > .ic { width:84px; height:84px; stroke-width:1.4; }
@R .nd .lb { color:var(--text); font-size:46px; }
@R .blik { display:inline-flex; align-items:center; justify-content:center; padding:6px 20px; border-radius:14px; background:#e9efeb; color:#0b0e0d; font-weight:700; letter-spacing:0.02em; }
@R .row { position:absolute; left:120px; right:120px; height:140px; display:flex; align-items:center; gap:30px; padding:0 40px; border-radius:30px; background:var(--panel); border:1.5px solid var(--line); font-size:52px; }
@R .row .ic { width:60px; height:60px; stroke-width:1.6; flex:none; }
@R .ch { display:none; }
`;
const typed = (s) => [...s].map((c) => `<span class="ch">${c === " " ? "&nbsp;" : c}</span>`).join("");
const TYPE = `function type(sel, t, step) { var els = document.querySelectorAll(R + sel + " .ch"); for (var i = 0; i < els.length; i++) tl.set(els[i], { display: "inline" }, t + i * step); }`;
const scenes = [];

// 1 hook: checkout with BLIK code
scenes.push({
  start: 0,
  css: `${BASE}
@R .q { position:absolute; left:80px; right:80px; top:300px; text-align:center; font-size:96px; }
@R .co { left:140px; top:560px; width:800px; padding:44px 50px; display:flex; flex-direction:column; gap:22px; }
@R .co .sum { display:flex; justify-content:space-between; font-size:52px; }
@R .co .sum .v { font-weight:700; }
@R .co .lbl { display:flex; align-items:center; gap:18px; font-size:44px; color:var(--muted); }
@R .co .blik { font-size:38px; }
@R .co .code { height:120px; border-radius:22px; border:2px solid var(--line); background:#0e1311; display:flex; align-items:center; justify-content:center; font-size:84px; letter-spacing:0.06em; }
@R .co .btn { height:110px; border-radius:22px; background:var(--green); color:#0b0e0d; display:flex; align-items:center; justify-content:center; font-size:56px; font-weight:700; position:relative; }
@R .co .btn span { position:absolute; }
@R .co .b2 { opacity:0; }`,
  html: `${TAG}
<h1 class="hd q">Co się dzieje, gdy płacisz <span class="g">BLIK-iem</span>?</h1>
<div class="card co">
  <div class="sum"><span>Do zapłaty</span><span class="v mono">${AMOUNT}</span></div>
  <div class="lbl"><span class="blik">BLIK</span><span>kod z aplikacji banku</span></div>
  <div class="code mono">${typed(CODE)}</div>
  <div class="btn"><span class="b1">Zapłać</span><span class="b2">✓ Opłacone</span></div>
</div>`,
  js: `${TYPE}
tl.fromTo($(".tag"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0);
${IN(".q", "0.05")}
${IN(".co", "0.2")}
type(".code", T(3.1), 0.12);
tl.to($(".co .code"), { borderColor: "#3ee08f", duration: 0.3 }, T(4.0));
tl.to($(".co .btn"), { scale: 0.97, duration: 0.08, yoyo: true, repeat: 1 }, T(4.5));
tl.to($(".co .b1"), { opacity: 0, duration: 0.2 }, T(5.2));
tl.to($(".co .b2"), { opacity: 1, duration: 0.2 }, T(5.25));
`,
});

// 2 bank app generates one-time code, 2 minutes
scenes.push({
  start: 8.6,
  css: `${BASE}
@R .ph { position:absolute; left:240px; top:440px; width:600px; height:760px; border-radius:60px; background:var(--panel); border:3px solid var(--line); }
@R .ph .top { position:absolute; left:0; right:0; top:50px; display:flex; justify-content:center; align-items:center; gap:16px; font-size:44px; color:var(--muted); }
@R .ph .top .ic { width:48px; height:48px; color:var(--green); }
@R .ph .code { position:absolute; left:0; right:0; top:250px; text-align:center; font-size:110px; letter-spacing:0.04em; }
@R .ring { position:absolute; left:200px; top:420px; width:200px; height:200px; }
@R .ring circle { fill:none; stroke-width:12; }
@R .ring .bg { stroke:var(--line); } @R .ring .fg { stroke:var(--yellow); stroke-linecap:round; }
@R .ring .t { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; font-size:52px; color:var(--yellow); }
@R .tags { position:absolute; left:0; right:0; top:1250px; display:flex; justify-content:center; gap:22px; }
@R .chip { padding:14px 30px; border-radius:22px; background:var(--panel); border:1.5px solid var(--line); font-size:50px; }`,
  html: `${TAG}
<div class="ph"><div class="top">${icon("landmark")}<span>aplikacja banku</span></div>
  <div class="code mono">${CODE}</div>
  <div class="ring"><svg viewBox="0 0 200 200" width="200" height="200"><circle class="bg" cx="100" cy="100" r="84"/><circle class="fg" cx="100" cy="100" r="84" pathLength="1" transform="rotate(-90 100 100)"/></svg><div class="t mono">2:00</div></div></div>
<div class="tags"><span class="chip c0">jednorazowy</span><span class="chip c1 y">ważny 2 min</span></div>`,
  js: `
${IN(".ph", "T(8.8)")}
tl.fromTo($(".ph .code"), { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.45, ease: E }, T(9.6));
tl.fromTo($(".ring .fg"), { strokeDasharray: 1, strokeDashoffset: 0 }, { strokeDashoffset: 0.85, duration: 4.8, ease: "none" }, T(9.8));
${IN(".c0", "T(11.9)")}
${IN(".c1", "T(13.5)")}
`,
});

// 3 shop -> BLIK -> your bank
scenes.push({
  start: 14.5,
  css: `${BASE}
@R .s { left:60px; top:520px; } @R .b { left:415px; top:520px; } @R .k { left:770px; top:520px; }
@R .b .blik { font-size:54px; padding:14px 26px; }
@R .wire path { stroke:var(--green); stroke-width:4; }
@R .pk { position:absolute; left:70px; top:392px; width:230px; padding:8px 0; border-radius:16px; background:var(--panel); border:2px solid var(--yellow); color:var(--yellow); font-size:40px; display:flex; flex-direction:column; align-items:center; line-height:1.15; }
@R .know { position:absolute; left:80px; right:80px; top:880px; text-align:center; font-size:60px; font-weight:600; }
@R .others { position:absolute; left:0; right:0; top:1040px; display:flex; justify-content:center; gap:22px; }
@R .others span { padding:12px 26px; border-radius:20px; border:1.5px solid var(--line); background:var(--panel); font-size:44px; color:var(--muted); }
@R .others .me { color:var(--green); border-color:rgba(62,224,143,.6); }`,
  html: `${TAG}
<h1 class="hd ttl">Kto do kogo <span class="g">pisze</span>?</h1>
<svg class="wire" viewBox="0 0 1080 1920"><path class="l0" pathLength="1" d="M310 635 L415 635"/><path class="l1" pathLength="1" d="M665 635 L770 635"/></svg>
<div class="card nd s">${icon("shopping-cart")}<span class="lb">sklep</span></div>
<div class="card nd b"><span class="blik">BLIK</span><span class="lb">system</span></div>
<div class="card nd k">${icon("landmark")}<span class="lb">twój bank</span></div>
<div class="pk mono"><span>${CODE}</span><span>${AMOUNT}</span></div>
<div class="know">BLIK wie, <span class="g">który bank</span> dał ten kod</div>
<div class="others"><span>bank A</span><span class="me">twój bank</span><span>bank C</span></div>`,
  js: `
${IN(".ttl", "T(14.6)")}
tl.fromTo($(".nd"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.45, ease: E, stagger: 0.15 }, T(14.7));
tl.fromTo($(".pk"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.35, ease: E }, T(15.5));
draw(".l0", T(16.4), 0.4);
tl.to($(".pk"), { x: 355, duration: 0.8, ease: IO }, T(16.5));
${IN(".know", "T(18.2)")}
tl.fromTo($(".others span"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: E, stagger: 0.1 }, T(18.8));
draw(".l1", T(20.9), 0.4);
tl.to($(".pk"), { x: 710, duration: 0.8, ease: IO }, T(21.0));
tl.to($(".k"), { borderColor: "rgba(62,224,143,.7)", duration: 0.3 }, T(21.8));
`,
});

// 4 push notification + PIN
scenes.push({
  start: 22.5,
  css: `${BASE}
@R .ph { position:absolute; left:200px; top:330px; width:680px; height:980px; border-radius:64px; background:#0e1311; border:3px solid var(--line); }
@R .nt { position:absolute; left:40px; right:40px; top:60px; padding:30px 34px; border-radius:30px; background:var(--panel); border:1.5px solid rgba(62,224,143,.5); }
@R .nt .h { display:flex; align-items:center; gap:16px; font-size:40px; color:var(--muted); margin-bottom:14px; }
@R .nt .h .ic { width:44px; height:44px; color:var(--green); }
@R .nt .b { font-size:50px; font-weight:600; }
@R .det { position:absolute; left:40px; right:40px; top:330px; display:flex; flex-direction:column; gap:18px; }
@R .det div { display:flex; justify-content:space-between; font-size:48px; padding:18px 30px; border-radius:20px; background:var(--panel); }
@R .det .k { color:var(--muted); }
@R .pin { position:absolute; left:0; right:0; top:640px; display:flex; justify-content:center; gap:30px; }
@R .pin i { display:block; width:46px; height:46px; border-radius:50%; border:3px solid var(--line); }
@R .pl { position:absolute; left:0; right:0; top:730px; text-align:center; font-size:44px; color:var(--muted); }`,
  html: `${TAG}
<div class="ph">
  <div class="nt"><div class="h">${icon("bell")}<span>twój bank · teraz</span></div><div class="b">Potwierdź płatność BLIK</div></div>
  <div class="det"><div class="d0"><span class="k">kwota</span><span class="mono">${AMOUNT}</span></div><div class="d1"><span class="k">sklep</span><span class="mono">sklep.pl</span></div></div>
  <div class="pin">${"<i></i>".repeat(4)}</div>
  <div class="pl">PIN</div>
</div>`,
  js: `
${IN(".ph", "T(22.6)")}
tl.fromTo($(".nt"), { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: 0.45, ease: E }, T(23.5));
${IN(".d0", "T(26.0)")}
${IN(".d1", "T(26.5)")}
tl.fromTo([$(".pin"), $(".pl")], { opacity: 0 }, { opacity: 1, duration: 0.3 }, T(27.3));
tl.to($(".pin i"), { backgroundColor: "#3ee08f", borderColor: "#3ee08f", duration: 0.08, stagger: 0.08 }, T(27.6));
`,
});

// 5 bank approves -> BLIK -> shop
scenes.push({
  start: 29.0,
  css: `${BASE}
@R .k { left:770px; top:470px; } @R .b { left:415px; top:470px; } @R .s { left:60px; top:470px; }
@R .b .blik { font-size:54px; padding:14px 26px; }
@R .wire path { stroke:var(--green); stroke-width:4; }
@R .fund { position:absolute; left:640px; top:740px; width:400px; display:flex; align-items:center; justify-content:center; gap:14px; font-size:46px; color:var(--green); }
@R .fund .ic { width:48px; height:48px; }
@R .ok { position:absolute; left:740px; top:380px; padding:10px 24px; border-radius:16px; background:var(--panel); border:2px solid var(--green); color:var(--green); font-size:48px; }
@R .done { position:absolute; left:120px; right:120px; top:950px; height:170px; border-radius:30px; background:rgba(62,224,143,.12); border:2px solid var(--green);
  display:flex; align-items:center; justify-content:center; gap:24px; font-size:60px; font-weight:700; color:var(--green); }
@R .done .ic { width:70px; height:70px; stroke-width:2; }`,
  html: `${TAG}
<h1 class="hd ttl">Bank mówi: <span class="g">zgoda</span></h1>
<svg class="wire" viewBox="0 0 1080 1920"><path class="l1" pathLength="1" d="M770 585 L665 585"/><path class="l0" pathLength="1" d="M415 585 L310 585"/></svg>
<div class="card nd s">${icon("shopping-cart")}<span class="lb">sklep</span></div>
<div class="card nd b"><span class="blik">BLIK</span><span class="lb">system</span></div>
<div class="card nd k">${icon("landmark")}<span class="lb">twój bank</span></div>
<div class="fund">${icon("check")}<span>środki są</span></div>
<div class="ok mono">zgoda</div>
<div class="done">${icon("badge-check")}<span>Płatność przyjęta</span></div>`,
  js: `
${IN(".ttl", "T(29.1)")}
tl.fromTo($(".nd"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, T(29.1));
${IN(".fund", "T(30.6)")}
tl.fromTo($(".ok"), { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.35, ease: E }, T(32.6));
draw(".l1", T(33.5), 0.4);
tl.to($(".ok"), { x: -355, duration: 0.7, ease: IO }, T(33.6));
draw(".l0", T(34.4), 0.4);
tl.to($(".ok"), { x: -710, duration: 0.7, ease: IO }, T(34.5));
tl.to($(".s"), { borderColor: "rgba(62,224,143,.7)", color: "#3ee08f", duration: 0.3 }, T(35.2));
tl.fromTo($(".done"), { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.45, ease: E }, T(36.0));
`,
});

// 6 what the shop does not get + settlement later
const nogo = [
  ["credit-card", "numer karty", 38.44],
  ["landmark", "dane twojego konta", 39.87],
];
scenes.push({
  start: 37.0,
  css: `${BASE}
@R .row .ic { color:var(--muted); }
@R .row .x { margin-left:auto; color:var(--yellow); font-size:60px; font-weight:700; }
${nogo.map((_, i) => `@R .n${i} { top:${480 + i * 170}px; }`).join("\n")}
@R .later { position:absolute; left:120px; right:120px; top:930px; padding:36px 40px; border-radius:30px; border:2px dashed rgba(138,152,145,.6); display:flex; align-items:center; gap:28px; }
@R .later .ic { width:64px; height:64px; color:var(--muted); stroke-width:1.5; flex:none; }
@R .later .s { font-size:42px; color:var(--muted); }
@R .later .b { font-size:52px; font-weight:600; }`,
  html: `${TAG}
<h1 class="hd ttl">Sklep <span class="y">nie dostaje</span></h1>
${nogo.map(([ic, t], i) => `<div class="row n${i}">${icon(ic)}<span>${t}</span><span class="x">✕</span></div>`).join("")}
<div class="later">${icon("hourglass")}<div><div class="s">później, w tle</div><div class="b">rozliczenie między bankami</div></div></div>`,
  js: `
${IN(".ttl", "T(37.1)")}
${nogo.map(([, , t], i) => IN(`.n${i}`, `T(${t})`)).join("\n")}
tl.fromTo($(".later"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.45, ease: E }, T(42.8));
tl.fromTo($(".later .ic"), { rotate: 0 }, { rotate: 180, duration: 0.8, ease: IO }, T(44.4));
`,
});

// 7 stats 2024
scenes.push({
  start: 45.1,
  css: `${BASE}
@R .yr { position:absolute; left:0; right:0; top:330px; text-align:center; font-size:56px; color:var(--muted); }
@R .big { position:absolute; left:0; right:0; top:440px; text-align:center; font-size:190px; color:var(--green); line-height:1; }
@R .bl { position:absolute; left:0; right:0; top:660px; text-align:center; font-size:60px; }
@R .day { position:absolute; left:120px; right:120px; top:880px; height:170px; border-radius:30px; background:var(--panel); border:1.5px solid var(--line);
  display:flex; align-items:center; justify-content:center; gap:26px; }
@R .day .v { font-size:96px; color:var(--yellow); }
@R .day .l { font-size:52px; color:var(--muted); }
@R .src { position:absolute; left:0; right:0; top:1110px; text-align:center; font-size:40px; color:var(--muted); }`,
  html: `${TAG}
<div class="yr mono">2024</div>
<div class="big mono cnt">0</div>
<div class="bl">operacji <span class="blik">BLIK</span></div>
<div class="day"><span class="v mono">6,6 mln</span><span class="l">dziennie</span></div>
<div class="src">dane: Polski Standard Płatności</div>`,
  js: `
${IN(".yr", "T(45.3)")}
tl.fromTo([$(".big"), $(".bl")], { opacity: 0 }, { opacity: 1, duration: 0.3 }, T(47.5));
count(".cnt", 0, 2.4, T(47.6), 2.0, function (v) { return v.toFixed(1).replace(".", ",") + " mld"; });
${IN(".day", "T(50.9)")}
${IN(".src", "T(51.6)")}
`,
});

// 8 CTA
scenes.push({
  start: 53.1,
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
<div class="pre">płatności i <span class="g">integracje</span> dla firm</div>
<h1 class="hd logo">DELO<br><span class="g">COMPANY</span></h1>
<div class="what"><span class="chip">strony www</span><span class="chip g">automatyzacje</span></div>
<div class="fl">${icon("plus")}Obserwuj</div>`,
  js: `
${IN(".pre", "T(53.3)")}
tl.fromTo($(".logo"), { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.6, ease: E }, T(55.6));
tl.fromTo($(".chip"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4, ease: E, stagger: 0.2 }, T(56.1));
tl.fromTo($(".fl"), { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.45, ease: E }, T(57.0));
tl.fromTo($(".fl"), { scale: 1 }, { scale: 1.05, duration: 0.18, ease: "power2.out", yoyo: true, repeat: 1 }, T(57.8));
`,
});

build({
  title: "Co się dzieje, gdy płacisz BLIK-iem",
  music: 0.28,
  scenes,
  replace: [
    [["dwa", "tysiące", "dwudziestym", "czwartym"], "2024"],
    [["kompani"], "Company"],
  ],
  sfx: [
    ["click-soft", 4.5, 0.365, 0.5, 13],
    ["pop", 5.25, 0.72, 0.3, 14],
    ["click-soft", 23.5, 0.365, 0.45, 13],
    ["pop", 36.0, 0.72, 0.3, 13],
    ["chime", 55.6, 2.5, 0.2, 15],
  ],
});
