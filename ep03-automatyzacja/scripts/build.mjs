import { build, icon } from "./short.mjs";

// global word times (Brian): formularz 1.22, dalej 3.42, zauważyć 5.79, Excela 7.50, odpisać 8.24, kilku 10.27, automatyzacją 12.65,
// Formularz 14.10, serwer 15.53, zapisuje 17.21, CRM 18.64, bazie 20.38, sekundzie 22.68, maila 24.07, powiadomienie 26.33,
// trzy 29.53, wyśle 31.16, kilka 33.30, nocy 35.10, ręcznego 36.19, opłaca 38.64, Harvard 40.05, godziny 43.21, siedem 44.58,
// automatyzacje 48.52, Delo 49.92, Obserwuj 51.31
const IN = (sel, t, extra = "") => `tl.fromTo($("${sel}"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.45, ease: E${extra} }, ${t});`;
const TAG = `<div class="tag mono">IT OD ŚRODKA · #3</div>`;
const BASE = `
@R .tag { position:absolute; left:0; right:0; top:200px; text-align:center; font-size:44px; color:var(--muted); }
@R .ttl { position:absolute; left:80px; right:80px; top:290px; text-align:center; font-size:84px; }
@R .nd { position:absolute; width:250px; height:230px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:16px; color:var(--muted); }
@R .nd > .ic { width:84px; height:84px; stroke-width:1.4; }
@R .nd .lb { color:var(--text); font-size:46px; }
@R .row { position:absolute; left:120px; right:120px; height:140px; display:flex; align-items:center; gap:30px; padding:0 40px; border-radius:30px; background:var(--panel); border:1.5px solid var(--line); font-size:54px; }
@R .row .ic { width:60px; height:60px; stroke-width:1.6; flex:none; }
`;
const FORM = (cls, top) => `<div class="card form ${cls}" style="top:${top}px">
  <div class="fl mono">imię</div><div class="in mono">Anna Kowalska</div>
  <div class="fl mono">e-mail</div><div class="in mono">anna@firma.pl</div>
  <div class="btn">Wyślij</div></div>`;
const FORMCSS = `
@R .form { left:140px; width:800px; padding:44px 50px; display:flex; flex-direction:column; gap:14px; }
@R .form .fl { font-size:40px; color:var(--muted); }
@R .form .in { height:90px; border-radius:18px; border:1.5px solid var(--line); background:#0e1311; display:flex; align-items:center; padding:0 28px; font-size:48px; margin-bottom:10px; }
@R .form .btn { height:100px; border-radius:22px; background:var(--green); color:#0b0e0d; display:flex; align-items:center; justify-content:center; font-size:54px; font-weight:700; margin-top:10px; }`;
const scenes = [];

// 1 hook: form submit
scenes.push({
  start: 0,
  css: `${BASE}${FORMCSS}
@R .q { position:absolute; left:80px; right:80px; top:300px; text-align:center; font-size:96px; }
@R .cur { position:absolute; left:640px; top:1240px; width:80px; height:80px; color:var(--text); }
@R .cur .ic { width:80px; height:80px; stroke-width:1.6; }
@R .ok { position:absolute; left:0; right:0; top:1310px; text-align:center; font-size:52px; color:var(--green); }`,
  html: `${TAG}
<h1 class="hd q">Klient wysłał formularz. <span class="g">Co dalej?</span></h1>
${FORM("f1", 560)}
<div class="cur">${icon("mouse-pointer-2")}</div>
<div class="ok">✓ wysłano</div>`,
  js: `
tl.fromTo($(".tag"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0);
${IN(".q", "0.05")}
${IN(".f1", "0.2")}
tl.fromTo($(".cur"), { opacity: 0, x: 120, y: 160 }, { opacity: 1, x: 0, y: 0, duration: 0.8, ease: IO }, T(1.0));
tl.to($(".f1 .btn"), { scale: 0.96, duration: 0.08, yoyo: true, repeat: 1 }, T(2.2));
tl.fromTo($(".ok"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.35, ease: E }, T(2.35));
`,
});

// 2 without automation
const manual = [
  ["eye", "ktoś musi to zauważyć", 5.79],
  ["table", "przepisać do Excela", 7.5],
  ["mail", "odpisać ręcznie", 8.24],
];
scenes.push({
  start: 4.1,
  css: `${BASE}
@R .bad { position:absolute; left:0; right:0; top:200px; text-align:center; font-size:48px; color:var(--yellow); }
@R .row .ic { color:var(--muted); }
${manual.map((_, i) => `@R .m${i} { top:${470 + i * 170}px; }`).join("\n")}
@R .late { position:absolute; left:0; right:0; top:1010px; display:flex; justify-content:center; align-items:center; gap:28px; color:var(--yellow); }
@R .late .ic { width:110px; height:110px; stroke-width:1.5; }
@R .late .v { font-size:110px; font-weight:700; letter-spacing:-0.03em; }
@R .late2 { position:absolute; left:0; right:0; top:1160px; text-align:center; font-size:52px; color:var(--muted); }`,
  html: `<div class="bad mono">BEZ AUTOMATYZACJI</div>
<h1 class="hd ttl">Ręczna <span class="y">robota</span></h1>
${manual.map(([ic, t], i) => `<div class="row m${i}">${icon(ic)}<span>${t}</span></div>`).join("")}
<div class="late">${icon("clock")}<span class="v mono">+3 h</span></div>
<div class="late2">klient czeka godzinami</div>`,
  js: `
${IN(".bad", "T(4.2)")}
${IN(".ttl", "T(4.3)")}
${manual.map(([, , t], i) => IN(`.m${i}`, `T(${t})`)).join("\n")}
tl.fromTo($(".late"), { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.45, ease: E }, T(10.2));
tl.fromTo($(".late .ic"), { rotate: 0 }, { rotate: 360, duration: 1.0, ease: "power2.inOut" }, T(10.2));
${IN(".late2", "T(10.6)")}
`,
});

// 3 switch
scenes.push({
  start: 11.5,
  css: `${BASE}
@R .sw { position:absolute; left:0; right:0; top:620px; display:flex; flex-direction:column; align-items:center; gap:30px; color:var(--green); }
@R .sw .ic { width:200px; height:200px; stroke-width:1.3; }
@R .sw .t { font-size:100px; font-weight:700; letter-spacing:-0.04em; line-height:1; text-align:center; }`,
  html: `<div class="sw">${icon("zap")}<div class="t">Z<br>AUTOMATYZACJĄ</div></div>`,
  js: `
tl.fromTo($(".sw"), { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5, ease: E }, T(11.7));
tl.fromTo($(".sw .ic"), { rotate: -12 }, { rotate: 0, duration: 0.5, ease: E }, T(12.6));
`,
});

// 4 form -> server -> CRM
scenes.push({
  start: 13.9,
  css: `${BASE}
@R .a { left:60px; top:480px; } @R .s { left:415px; top:480px; } @R .c { left:770px; top:480px; }
@R .c { border-color:rgba(62,224,143,.6); }
@R .wire path { stroke:var(--green); stroke-width:4; }
@R .pk { position:absolute; left:250px; top:575px; width:36px; height:36px; border-radius:50%; background:var(--yellow); }
@R .crm { position:absolute; left:100px; right:100px; top:820px; border-radius:30px; background:var(--panel); border:1.5px solid var(--line); overflow:hidden; }
@R .crm .h { display:flex; align-items:center; gap:18px; padding:26px 34px; border-bottom:1.5px solid var(--line); font-size:48px; color:var(--muted); }
@R .crm .h .ic { width:48px; height:48px; color:var(--green); }
@R .crm .r { display:flex; justify-content:space-between; align-items:center; padding:0 34px; height:100px; border-top:1.5px solid var(--line); font-size:44px; color:var(--muted); }
@R .crm .new { color:var(--text); background:rgba(62,224,143,.10); }
@R .crm .new .st { color:var(--green); }
@R .note { position:absolute; left:0; right:0; top:1290px; text-align:center; font-size:52px; color:var(--muted); }`,
  html: `${TAG}
<svg class="wire" viewBox="0 0 1080 1920"><path class="l0" pathLength="1" d="M310 595 L415 595"/><path class="l1" pathLength="1" d="M665 595 L770 595"/></svg>
<div class="card nd a">${icon("file-text")}<span class="lb">formularz</span></div>
<div class="card nd s">${icon("server")}<span class="lb">serwer</span></div>
<div class="card nd c">${icon("database")}<span class="lb">CRM</span></div>
<div class="pk"></div>
<div class="crm"><div class="h">${icon("users")}<span>klienci</span></div>
  <div class="r new"><span>Anna Kowalska</span><span class="st mono">nowy lead</span></div>
  <div class="r"><span>Jan Nowak</span><span class="mono">oferta</span></div>
  <div class="r"><span>Ewa Wiśniewska</span><span class="mono">klient</span></div></div>
<div class="note">baza twoich klientów</div>`,
  js: `
tl.fromTo($(".nd"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.45, ease: E, stagger: 0.15 }, T(14.1));
draw(".l0", T(14.7), 0.4);
tl.fromTo($(".pk"), { opacity: 0, x: 0 }, { opacity: 1, x: 0, duration: 0.2 }, T(14.8));
tl.to($(".pk"), { x: 520, duration: 1.2, ease: IO }, T(15.0));
draw(".l1", T(16.4), 0.4);
tl.to($(".pk"), { opacity: 0, duration: 0.2 }, T(16.6));
tl.fromTo($(".crm"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.45, ease: E }, T(17.0));
tl.fromTo($(".crm .r:not(.new)"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, T(17.1));
tl.fromTo($(".crm .new"), { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.45, ease: E }, T(17.7));
tl.fromTo($(".c"), { scale: 1 }, { scale: 1.06, duration: 0.2, ease: "power2.out", yoyo: true, repeat: 1 }, T(18.64));
${IN(".note", "T(20.3)")}
`,
});

// 5 same second: client mail + sales phone
scenes.push({
  start: 21.9,
  css: `${BASE}
@R .hdr { position:absolute; left:80px; right:80px; top:300px; text-align:center; font-size:76px; }
@R .mail { position:absolute; left:100px; right:100px; top:500px; padding:36px 40px; border-radius:30px; background:var(--panel); border:1.5px solid rgba(62,224,143,.5); }
@R .mail .t { display:flex; align-items:center; gap:18px; font-size:44px; color:var(--muted); margin-bottom:18px; }
@R .mail .t .ic { width:48px; height:48px; color:var(--green); }
@R .mail .b { font-size:54px; font-weight:600; }
@R .ph { position:absolute; left:100px; right:100px; top:880px; padding:30px 40px; border-radius:30px; background:#1a2420; border:1.5px solid var(--line); display:flex; gap:26px; align-items:center; }
@R .ph .ic { width:70px; height:70px; color:var(--yellow); stroke-width:1.6; flex:none; }
@R .ph .s { font-size:40px; color:var(--muted); }
@R .ph .b { font-size:52px; font-weight:600; }`,
  html: `${TAG}
<h1 class="hd hdr">W tej samej <span class="g">sekundzie</span></h1>
<div class="mail"><div class="t">${icon("mail")}<span>do: anna@firma.pl</span></div><div class="b">Dziękujemy! Odezwiemy się wkrótce.</div></div>
<div class="ph">${icon("bell")}<div><div class="s">telefon handlowca</div><div class="b">Nowy lead: Anna K.</div></div></div>`,
  js: `
${IN(".hdr", "T(22.1)")}
tl.fromTo($(".mail"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.45, ease: E }, T(23.9));
tl.fromTo($(".ph"), { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.45, ease: E }, T(26.2));
tl.fromTo($(".ph .ic"), { rotate: -14 }, { rotate: 14, duration: 0.08, yoyo: true, repeat: 5, ease: "none" }, T(26.4));
`,
});

// 6 reminder after 3 days
scenes.push({
  start: 27.8,
  css: `${BASE}
@R .tlx { position:absolute; left:140px; right:140px; top:640px; height:4px; background:var(--line); }
@R .d { position:absolute; top:612px; width:60px; height:60px; border-radius:50%; background:var(--panel); border:3px solid var(--line); }
${[0, 1, 2, 3].map((i) => `@R .d${i} { left:${140 + i * 253 - 30}px; }`).join("\n")}
@R .dl { position:absolute; top:700px; width:200px; text-align:center; font-size:44px; color:var(--muted); }
${[0, 1, 2, 3].map((i) => `@R .dl${i} { left:${140 + i * 253 - 100}px; }`).join("\n")}
@R .rem { position:absolute; left:100px; right:100px; top:880px; padding:34px 40px; border-radius:30px; background:var(--panel); border:1.5px solid rgba(245,197,24,.6); display:flex; gap:26px; align-items:center; }
@R .rem .ic { width:70px; height:70px; color:var(--yellow); stroke-width:1.6; flex:none; }
@R .rem .s { font-size:40px; color:var(--muted); }
@R .rem .b { font-size:52px; font-weight:600; }`,
  html: `${TAG}
<h1 class="hd ttl">Brak odpowiedzi? <span class="y">Przypomnienie</span></h1>
<div class="tlx"></div>
${[0, 1, 2, 3].map((i) => `<div class="d d${i}"></div><div class="dl dl${i} mono">dzień ${i}</div>`).join("")}
<div class="rem">${icon("send")}<div><div class="s">wysłane automatycznie</div><div class="b">Przypomnienie o ofercie</div></div></div>`,
  js: `
${IN(".ttl", "T(28.0)")}
tl.fromTo([$(".tlx"), $(".d"), $(".dl")], { opacity: 0 }, { opacity: 1, duration: 0.4 }, T(28.3));
${[0, 1, 2, 3].map((i) => `tl.to($(".d${i}"), { borderColor: "${i === 3 ? "#f5c518" : "#3ee08f"}", backgroundColor: "${i === 3 ? "rgba(245,197,24,.2)" : "rgba(62,224,143,.15)"}", duration: 0.3 }, T(28.9) + ${i} * 0.4);`).join("\n")}
tl.fromTo($(".rem"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.45, ease: E }, T(31.1));
`,
});

// 7 benefits
const ben = [
  ["zap", "kilka sekund", 33.3],
  ["moon", "w dzień i w nocy", 34.55],
  ["check", "zero przepisywania", 36.19],
];
scenes.push({
  start: 32.4,
  css: `${BASE}
@R .row .ic { color:var(--green); }
${ben.map((_, i) => `@R .b${i} { top:${520 + i * 180}px; }`).join("\n")}`,
  html: `${TAG}
<h1 class="hd ttl">Bez <span class="g">ręcznej pracy</span></h1>
${ben.map(([ic, t], i) => `<div class="row b${i}">${icon(ic)}<span>${t}</span></div>`).join("")}`,
  js: `
${IN(".ttl", "T(32.5)")}
${ben.map(([, , t], i) => IN(`.b${i}`, `T(${t})`)).join("\n")}
`,
});

// 8 HBR stat
scenes.push({
  start: 37.7,
  css: `${BASE}
@R .src { position:absolute; left:0; right:0; top:330px; text-align:center; font-size:48px; color:var(--muted); }
@R .hdr { position:absolute; left:80px; right:80px; top:420px; text-align:center; font-size:84px; }
@R .br { position:absolute; left:120px; right:120px; }
@R .br .lb { display:flex; justify-content:space-between; font-size:50px; margin-bottom:20px; }
@R .br .bar { height:70px; border-radius:20px; background:var(--line); overflow:hidden; }
@R .br .bar i { display:block; height:100%; border-radius:20px; }
@R .x0 { top:700px; } @R .x0 i { width:100%; background:var(--green); }
@R .x1 { top:920px; } @R .x1 i { width:14.3%; background:#4a5751; }
@R .big { position:absolute; left:80px; right:80px; top:1130px; text-align:center; font-size:72px; font-weight:700; letter-spacing:-0.03em; }`,
  html: `${TAG}
<div class="src">Harvard Business Review</div>
<h1 class="hd hdr">Szybkość <span class="g">się opłaca</span></h1>
<div class="br x0"><div class="lb"><span>odpowiedź w 1 h</span><span class="mono g">≈ 7×</span></div><div class="bar"><i></i></div></div>
<div class="br x1"><div class="lb"><span>później</span><span class="mono muted">1×</span></div><div class="bar"><i></i></div></div>
<div class="big">szansa na <span class="y">konkretną rozmowę</span></div>`,
  js: `
${IN(".hdr", "T(37.9)")}
${IN(".src", "T(40.0)")}
${IN(".x1", "T(42.6)")}
tl.fromTo($(".x1 i"), { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: 0.5, ease: E }, T(42.9));
${IN(".x0", "T(43.2)")}
tl.fromTo($(".x0 i"), { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: 1.0, ease: E }, T(44.5));
${IN(".big", "T(46.0)")}
`,
});

// 9 CTA
scenes.push({
  start: 47.9,
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
<div class="pre">budujemy takie <span class="g">automatyzacje</span></div>
<h1 class="hd logo">DELO<br><span class="g">COMPANY</span></h1>
<div class="what"><span class="chip">strony www</span><span class="chip g">automatyzacje</span></div>
<div class="fl">${icon("plus")}Obserwuj</div>`,
  js: `
${IN(".pre", "T(48.1)")}
tl.fromTo($(".logo"), { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.6, ease: E }, T(49.8));
tl.fromTo($(".chip"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4, ease: E, stagger: 0.2 }, T(50.4));
tl.fromTo($(".fl"), { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.45, ease: E }, T(51.2));
tl.fromTo($(".fl"), { scale: 1 }, { scale: 1.05, duration: 0.18, ease: "power2.out", yoyo: true, repeat: 1 }, T(52.0));
`,
});

build({
  title: "Jak działa automatyzacja w firmie",
  music: 0.28,
  scenes,
  replace: [
    [["ce", "er", "em"], "CRM"],
    [["kompani"], "Company"],
  ],
  sfx: [
    ["click-soft", 2.2, 0.365, 0.5, 13],
    ["pop", 10.2, 0.72, 0.3, 13],
    ["pop", 17.7, 0.72, 0.3, 14],
    ["click-soft", 26.4, 0.365, 0.45, 13],
    ["click-soft", 31.1, 0.365, 0.45, 14],
    ["chime", 49.8, 2.5, 0.2, 15],
  ],
});
