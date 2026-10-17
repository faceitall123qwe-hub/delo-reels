import { build, icon } from "./short.mjs";

// global word times (Andrew +18%): zna 2.60, hasła 3.13, dobrze 4.40, działa 6.14, konto 7.55, zapisuje 8.70, funkcję 10.77,
// hash 12.20, kot123 13.52, ciąg 15.60, odwrócić 17.39, logowaniu 18.50, wpisałeś 21.07, porównuje 21.98, Pasuje 23.28,
// Wchodzisz 24.05, sól 25.74, losowe 26.57, dwie 29.83, inne 32.38, algorytmy 33.90, bcrypt 35.06, Argon2 35.97, wolne 37.56,
// Zgadywanie 38.32, drogie 40.74, kliknięciu 42.28, mailem 45.14, otwartym 47.34, Uciekaj 48.70, najpopularniejsze 49.84,
// 123456 52.24, Bezpieczne 54.84, Delo 56.88, Obserwuj 58.21
const IN = (sel, t, extra = "") => `tl.fromTo($("${sel}"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.45, ease: E${extra} }, ${t});`;
const TAG = `<div class="tag mono">IT OD ŚRODKA · #5</div>`;
const HASH_A = "$2b$12$R9h7cIPz0gi.URNNX3kh2O";
const HASH_B = "$2b$12$Lq4vT8mWe1sZ0pYc6nJd5u";
const BASE = `
@R .tag { position:absolute; left:0; right:0; top:200px; text-align:center; font-size:44px; color:var(--muted); }
@R .ttl { position:absolute; left:80px; right:80px; top:290px; text-align:center; font-size:84px; }
@R .box { position:absolute; left:120px; right:120px; height:130px; border-radius:28px; background:var(--panel); border:1.5px solid var(--line);
  display:flex; align-items:center; justify-content:center; gap:22px; font-size:52px; }
@R .box .ic { width:56px; height:56px; stroke-width:1.6; flex:none; }
@R .hash { font-size:40px; color:var(--green); letter-spacing:-0.02em; }
@R .arr { position:absolute; left:0; right:0; text-align:center; font-size:72px; color:var(--muted); }
@R .ch { display:none; }
`;
const typed = (s) => [...s].map((c) => `<span class="ch">${c}</span>`).join("");
const TYPE = `function type(sel, t, step) { var els = document.querySelectorAll(R + sel + " .ch"); for (var i = 0; i < els.length; i++) tl.set(els[i], { display: "inline" }, t + i * step); }`;
const scenes = [];

// 1 hook: login form, "the site doesn't know your password"
scenes.push({
  start: 0,
  css: `${BASE}
@R .q { position:absolute; left:80px; right:80px; top:300px; text-align:center; font-size:96px; }
@R .lg { left:140px; top:640px; width:800px; padding:44px 50px; display:flex; flex-direction:column; gap:14px; }
@R .lg .fl { font-size:40px; color:var(--muted); }
@R .lg .in { height:96px; border-radius:18px; border:1.5px solid var(--line); background:#0e1311; display:flex; align-items:center; padding:0 28px; font-size:50px; margin-bottom:10px; }
@R .lg .btn { height:104px; border-radius:22px; background:var(--green); color:#0b0e0d; display:flex; align-items:center; justify-content:center; font-size:54px; font-weight:700; margin-top:8px; }`,
  html: `${TAG}
<h1 class="hd q">Ta strona <span class="y">nie zna</span> twojego hasła</h1>
<div class="card lg"><div class="fl mono">e-mail</div><div class="in mono">anna@firma.pl</div>
<div class="fl mono">hasło</div><div class="in mono pw">${typed("••••••")}</div><div class="btn">Zaloguj</div></div>`,
  js: `${TYPE}
tl.fromTo($(".tag"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0);
${IN(".q", "0.05")}
${IN(".lg", "0.25")}
type(".pw", T(1.0), 0.12);
tl.fromTo($(".q .y"), { scale: 1 }, { scale: 1.06, duration: 0.2, ease: "power2.out", yoyo: true, repeat: 1 }, T(2.6));
`,
});

// 2 sign-up: password -> hash function -> one-way string
scenes.push({
  start: 6.8,
  css: `${BASE}
@R .b0 { top:440px; } @R .b1 { top:680px; border-color:rgba(62,224,143,.6); } @R .b2 { top:920px; }
@R .b1 .ic { color:var(--green); }
@R .a0 { top:575px; } @R .a1 { top:815px; }
@R .no { position:absolute; left:0; right:0; top:1100px; display:flex; justify-content:center; align-items:center; gap:22px; font-size:50px; color:var(--yellow); }
@R .no .ic { width:56px; height:56px; stroke-width:1.8; }`,
  html: `${TAG}
<h1 class="hd ttl">Zakładasz <span class="g">konto</span></h1>
<div class="box b0 mono">kot123</div>
<div class="arr a0">↓</div>
<div class="box b1">${icon("cpu")}<span>funkcja skrótu (hash)</span></div>
<div class="arr a1">↓</div>
<div class="box b2"><span class="mono hash">${HASH_A}</span></div>
<div class="no">${icon("undo-2")}<span>nie da się odwrócić</span></div>`,
  js: `
${IN(".ttl", "T(6.9)")}
${IN(".b0", "T(8.6)")}
tl.fromTo($(".a0"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, T(10.0));
${IN(".b1", "T(10.7)")}
tl.fromTo($(".a1"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, T(14.6));
${IN(".b2", "T(15.0)")}
${IN(".no", "T(17.3)")}
tl.fromTo($(".no .ic"), { rotate: 0 }, { rotate: -40, duration: 0.3, yoyo: true, repeat: 1, ease: "power2.inOut" }, T(17.6));
`,
});

// 3 login: hash what you typed, compare
scenes.push({
  start: 17.9,
  css: `${BASE}
@R .col { position:absolute; left:100px; right:100px; display:flex; flex-direction:column; gap:14px; }
@R .c0 { top:420px; } @R .c1 { top:740px; }
@R .col .h { font-size:44px; color:var(--muted); text-align:center; }
@R .col .v { height:120px; border-radius:24px; background:var(--panel); border:1.5px solid var(--line); display:flex; align-items:center; justify-content:center; padding:0 16px; }
@R .col .hash { font-size:40px; }
@R .eq { position:absolute; left:0; right:0; top:612px; text-align:center; font-size:110px; line-height:1; font-weight:700; color:var(--green); }
@R .ok { position:absolute; left:200px; right:200px; top:1020px; height:140px; border-radius:70px; background:var(--green); color:#0b0e0d;
  display:flex; align-items:center; justify-content:center; gap:20px; font-size:60px; font-weight:700; }
@R .ok .ic { width:60px; height:60px; stroke-width:2.4; }`,
  html: `${TAG}
<h1 class="hd ttl">Logujesz się</h1>
<div class="col c0"><div class="h">wpisane hasło, po hashu</div><div class="v"><span class="mono hash">${HASH_A}</span></div></div>
<div class="col c1"><div class="h">hash w bazie</div><div class="v"><span class="mono hash">${HASH_A}</span></div></div>
<div class="eq">=</div>
<div class="ok">${icon("check")}Wchodzisz</div>`,
  js: `
${IN(".ttl", "T(18.0)")}
${IN(".c0", "T(20.9)")}
${IN(".c1", "T(21.9)")}
tl.fromTo($(".eq"), { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.4, ease: E }, T(23.2));
tl.fromTo($(".ok"), { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.45, ease: E }, T(24.0));
`,
});

// 4 salt: same password, different hashes
scenes.push({
  start: 24.8,
  css: `${BASE}
@R .u { position:absolute; left:100px; right:100px; padding:28px 36px; border-radius:28px; background:var(--panel); border:1.5px solid var(--line); display:flex; flex-direction:column; gap:14px; }
@R .u0 { top:480px; } @R .u1 { top:800px; }
@R .u .l1 { display:flex; align-items:center; gap:18px; font-size:48px; }
@R .u .salt { padding:4px 16px; border-radius:12px; background:rgba(245,197,24,.14); color:var(--yellow); }
@R .u .hash { font-size:38px; }
@R .diff { position:absolute; left:80px; right:80px; top:1130px; text-align:center; font-size:58px; font-weight:600; }`,
  html: `${TAG}
<h1 class="hd ttl">Plus <span class="y">sól</span></h1>
<div class="u u0"><div class="l1"><span>Anna:</span><span class="mono">kot123</span><span class="mono salt s0">+ x7Q9</span></div><div class="mono hash h0">${HASH_A}</div></div>
<div class="u u1"><div class="l1"><span>Jan:</span><span class="mono">kot123</span><span class="mono salt s1">+ p2Mk</span></div><div class="mono hash h1">${HASH_B}</div></div>
<div class="diff">to samo hasło, <span class="g">inne hashe</span></div>`,
  js: `
${IN(".ttl", "T(25.0)")}
${IN(".u0", "T(25.6)")}
tl.fromTo([$(".s0")], { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.35, ease: E }, T(26.6));
tl.fromTo($(".h0"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, T(27.5));
${IN(".u1", "T(29.8)")}
tl.fromTo([$(".s1")], { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.35, ease: E }, T(30.4));
tl.fromTo($(".h1"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, T(31.6));
${IN(".diff", "T(32.3)")}
`,
});

// 5 slow algorithms
scenes.push({
  start: 33.3,
  css: `${BASE}
@R .algs { position:absolute; left:0; right:0; top:440px; display:flex; justify-content:center; gap:24px; }
@R .chip { padding:16px 34px; border-radius:24px; background:var(--panel); border:1.5px solid rgba(62,224,143,.6); color:var(--green); font-size:56px; }
@R .br { position:absolute; left:120px; right:120px; }
@R .br .lb { display:flex; justify-content:space-between; font-size:46px; margin-bottom:20px; }
@R .br .bar { height:66px; border-radius:20px; background:var(--line); overflow:hidden; }
@R .br .bar i { display:block; height:100%; border-radius:20px; }
@R .x0 { top:680px; } @R .x0 i { width:100%; background:#4a5751; }
@R .x1 { top:900px; } @R .x1 i { width:6%; background:var(--green); }
@R .cap { position:absolute; left:80px; right:80px; top:1120px; text-align:center; font-size:56px; font-weight:600; }`,
  html: `${TAG}
<h1 class="hd ttl">Celowo <span class="g">wolne</span></h1>
<div class="algs"><span class="chip mono c0">bcrypt</span><span class="chip mono c1">Argon2</span></div>
<div class="br x0"><div class="lb"><span>szybki hash</span><span class="mono muted">miliardy prób/s</span></div><div class="bar"><i></i></div></div>
<div class="br x1"><div class="lb"><span>bcrypt</span><span class="mono g">tysiące prób/s</span></div><div class="bar"><i></i></div></div>
<div class="cap">zgadywanie staje się <span class="y">bardzo drogie</span></div>`,
  js: `
${IN(".ttl", "T(33.5)")}
tl.fromTo($(".c0"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: E }, T(35.0));
tl.fromTo($(".c1"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: E }, T(35.9));
${IN(".x0", "T(38.2)")}
tl.fromTo($(".x0 i"), { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: 0.6, ease: E }, T(38.5));
${IN(".x1", "T(39.0)")}
tl.fromTo($(".x1 i"), { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: 0.8, ease: E }, T(39.3));
${IN(".cap", "T(40.5)")}
`,
});

// 6 red flag: password sent back by email
scenes.push({
  start: 41.3,
  css: `${BASE}
@R .ml { position:absolute; left:100px; right:100px; top:440px; padding:36px 40px; border-radius:30px; background:var(--panel); border:2px solid rgba(245,197,24,.7); }
@R .ml .t { display:flex; align-items:center; gap:18px; font-size:42px; color:var(--muted); margin-bottom:20px; }
@R .ml .t .ic { width:46px; height:46px; color:var(--yellow); }
@R .ml .s { font-size:50px; font-weight:600; margin-bottom:16px; }
@R .ml .b { font-size:48px; }
@R .ml .pw { color:var(--yellow); }
@R .warn { position:absolute; left:80px; right:80px; top:880px; text-align:center; font-size:52px; color:var(--muted); }
@R .run { position:absolute; left:0; right:0; top:1020px; text-align:center; font-size:150px; font-weight:700; letter-spacing:-0.04em; color:var(--yellow); }`,
  html: `${TAG}
<h1 class="hd ttl">Czerwona <span class="y">flaga</span></h1>
<div class="ml"><div class="t">${icon("mail")}<span>„Nie pamiętam hasła”</span></div>
  <div class="s">Przypomnienie hasła</div><div class="b">Twoje hasło to: <span class="mono pw">kot123</span></div></div>
<div class="warn">strona trzyma hasła otwartym tekstem</div>
<div class="run">UCIEKAJ</div>`,
  js: `
${IN(".ttl", "T(41.4)")}
${IN(".ml", "T(42.2)")}
tl.fromTo($(".ml .pw"), { scale: 1 }, { scale: 1.12, duration: 0.2, ease: "power2.out", yoyo: true, repeat: 1 }, T(45.1));
${IN(".warn", "T(47.2)")}
tl.fromTo($(".run"), { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.35, ease: E }, T(48.65));
`,
});

// 7 most common password
scenes.push({
  start: 49.6,
  css: `${BASE}
@R .lbl { position:absolute; left:80px; right:80px; top:400px; text-align:center; font-size:60px; color:var(--muted); }
@R .pw { position:absolute; left:0; right:0; top:560px; text-align:center; font-size:220px; line-height:1; color:var(--yellow); }
@R .sec { position:absolute; left:0; right:0; top:860px; display:flex; justify-content:center; align-items:center; gap:22px; font-size:56px; }
@R .sec .ic { width:60px; height:60px; color:var(--yellow); stroke-width:1.7; }
@R .src { position:absolute; left:0; right:0; top:1020px; text-align:center; font-size:42px; color:var(--muted); }`,
  html: `${TAG}
<div class="lbl">najpopularniejsze hasło świata</div>
<div class="pw mono">${typed("123456")}</div>
<div class="sec">${icon("timer")}<span>łamane w mniej niż sekundę</span></div>
<div class="src">NordPass, 2024</div>`,
  js: `${TYPE}
${IN(".lbl", "T(49.8)")}
type(".pw", T(52.2), 0.07);
${IN(".sec", "T(52.7)")}
${IN(".src", "T(52.9)")}
`,
});

// 8 CTA
scenes.push({
  start: 54.6,
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
<div class="pre"><span class="g">bezpieczne</span> strony i logowanie</div>
<h1 class="hd logo">DELO<br><span class="g">COMPANY</span></h1>
<div class="what"><span class="chip">strony www</span><span class="chip g">automatyzacje</span></div>
<div class="fl">${icon("plus")}Obserwuj</div>`,
  js: `
${IN(".pre", "T(54.8)")}
tl.fromTo($(".logo"), { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.6, ease: E }, T(56.7));
tl.fromTo($(".chip"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4, ease: E, stagger: 0.2 }, T(57.2));
tl.fromTo($(".fl"), { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.45, ease: E }, T(58.1));
tl.fromTo($(".fl"), { scale: 1 }, { scale: 1.05, duration: 0.18, ease: "power2.out", yoyo: true, repeat: 1 }, T(58.9));
`,
});

build({
  title: "Strona nie zna twojego hasła",
  music: 0.28,
  tail: 0.9,
  scenes,
  replace: [
    [["kot", "jeden", "dwa", "trzy"], "kot123"],
    [["jeden", "dwa", "trzy", "cztery", "pięć", "sześć"], "123456"],
    [["hasz"], "hash"],
    [["hasze"], "hashe"],
    [["be", "krypt"], "bcrypt"],
    [["argon", "dwa"], "Argon2"],
    [["kompani"], "Company"],
  ],
  sfx: [
    ["typing", 1.0, 0.75, 0.3, 14],
    ["pop", 24.0, 0.72, 0.3, 13],
    ["click-soft", 45.1, 0.365, 0.45, 13],
    ["pop", 48.65, 0.72, 0.35, 14],
    ["typing", 52.2, 1.5, 0.3, 14],
    ["chime", 56.7, 2.5, 0.2, 15],
  ],
});
