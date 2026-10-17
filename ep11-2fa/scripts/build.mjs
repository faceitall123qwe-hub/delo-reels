import { build, icon } from "./short.mjs";

// global word times (Florian, tightened): wysyła 1.62, kod 2.26, esemesem 2.44, Po 3.32, hasło 4.48, hasła 5.43, wyciekają 5.78,
// Ktoś 6.55, hasło 7.26, ale 7.90, telefonu 8.61, zaloguje 9.75, weryfikacja 10.75, dwuetapowa 11.31, wiesz 12.89, masz 14.16,
// Majkrosoftu 15.20, blokuje 15.93, 99,9% 16.58-18.22, automatycznych 18.65, konta 19.82, esemes 20.82, najsłabsza 21.38,
// Oszust 22.62, numer 23.71, operatora 24.08, wyłudzić 25.05, telefon 25.79, aplikacja 27.13, trzydzieści 28.33, generuje 29.08,
// nowy 29.45, klucz 30.39, sprzętowy 30.60, najważniejsze 31.57, nikomu 32.52, kodu 33.35, Bank 34.01, zapyta 35.06,
// Bezpieczne 35.85, Delo 37.33, Obserwuj 38.52
const IN = (sel, t, extra = "") => `tl.fromTo($("${sel}"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.45, ease: E${extra} }, ${t});`;
const TAG = `<div class="tag mono">IT OD ŚRODKA · #11</div>`;
const CODE = "482 913";
const BASE = `
@R .tag { position:absolute; left:0; right:0; top:200px; text-align:center; font-size:44px; color:var(--muted); }
@R .ttl { position:absolute; left:80px; right:80px; top:290px; text-align:center; font-size:84px; }
@R .row { position:absolute; left:110px; right:110px; height:130px; display:flex; align-items:center; gap:28px; padding:0 36px; border-radius:30px;
  background:var(--panel); border:1.5px solid var(--line); font-size:50px; }
@R .row .ic { width:60px; height:60px; stroke-width:1.7; flex:none; }
@R .row .st { margin-left:auto; display:flex; } @R .row .st .ic { width:56px; height:56px; stroke-width:2.4; }
@R .sms { position:absolute; left:110px; right:110px; height:150px; border-radius:34px; background:#1a2220; border:1.5px solid #2f3d37;
  display:flex; align-items:center; gap:26px; padding:0 34px; box-shadow:0 20px 50px rgba(0,0,0,.45); }
@R .sms .ap { width:84px; height:84px; border-radius:22px; background:var(--green); color:#0b0e0d; display:flex; align-items:center; justify-content:center; flex:none; }
@R .sms .ap .ic { width:50px; height:50px; stroke-width:2; }
@R .sms .tx { display:flex; flex-direction:column; gap:6px; }
@R .sms .fr { font-size:34px; color:var(--muted); } @R .sms .bd { font-size:46px; }
@R .sms .bd b { color:var(--yellow); font-weight:700; }
`;
const SMS = (cls, body) => `<div class="sms ${cls}"><div class="ap">${icon("message-square")}</div><div class="tx"><span class="fr">SMS · teraz</span><span class="bd">${body}</span></div></div>`;
const scenes = [];

// 1 hook: login form, then an SMS code arrives
scenes.push({
  start: 0,
  css: `${BASE}
@R .q { position:absolute; left:80px; right:80px; top:300px; text-align:center; font-size:92px; }
@R .lg { position:absolute; left:170px; right:170px; top:530px; height:400px; border-radius:36px; background:var(--panel); border:1.5px solid var(--line); }
@R .lg .f { position:absolute; left:40px; right:40px; height:96px; border-radius:22px; background:#0e1311; border:1.5px solid var(--line);
  display:flex; align-items:center; gap:18px; padding:0 26px; font-size:38px; color:var(--muted); }
@R .lg .f .ic { width:44px; height:44px; stroke-width:1.7; }
@R .lg .f0 { top:40px; } @R .lg .f1 { top:156px; }
@R .lg .bt { position:absolute; left:40px; right:40px; top:276px; height:90px; border-radius:22px; background:var(--green); color:#0b0e0d;
  display:flex; align-items:center; justify-content:center; font-size:42px; font-weight:700; }
@R .s0 { top:1000px; }`,
  html: `${TAG}
<h1 class="hd q">Po co ten <span class="g" style="white-space:nowrap">kod SMS</span>?</h1>
<div class="lg"><div class="f f0">${icon("at-sign")}<span class="mono">anna@firma.pl</span></div>
<div class="f f1">${icon("lock-keyhole")}<span class="mono">••••••••••</span></div><div class="bt">Zaloguj</div></div>
${SMS("s0", `Twój kod: <b class="mono">${CODE}</b>`)}`,
  js: `
tl.fromTo($(".tag"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0);
${IN(".q", "0.05")}
${IN(".lg", "0.25")}
tl.fromTo($(".lg .bt"), { scale: 1 }, { scale: 0.95, duration: 0.12, yoyo: true, repeat: 1 }, T(1.3));
tl.fromTo($(".s0"), { opacity: 0, y: -80 }, { opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.6)" }, T(2.2));
`,
});

// 2 passwords leak: a thief has the password but not your phone
scenes.push({
  start: 5.0,
  css: `${BASE}
@R .r0 { top:470px; border-color:#6b5a1a; } @R .r0 .ic { color:var(--yellow); }
@R .r1 { top:640px; } @R .r1 > .ic { color:var(--muted); }
@R .r2 { top:810px; } @R .r2 > .ic { color:var(--muted); }
@R .ok { color:var(--green); } @R .no { color:#ff6b5b; }
@R .res { position:absolute; left:0; right:0; top:1040px; display:flex; justify-content:center; align-items:center; gap:22px; font-size:66px; font-weight:700; letter-spacing:-0.02em; }
@R .res .ic { width:76px; height:76px; color:#ff6b5b; stroke-width:2.2; }`,
  html: `${TAG}
<h1 class="hd ttl">Hasła <span class="y">wyciekają</span></h1>
<div class="row r0">${icon("database")}<span>wyciek: twoje hasło</span></div>
<div class="row r1">${icon("venetian-mask")}<span>oszust ma hasło</span><span class="st ok">${icon("check")}</span></div>
<div class="row r2">${icon("smartphone")}<span>ale nie ma telefonu</span><span class="st no">${icon("x")}</span></div>
<div class="res">${icon("ban")}<span>nie zaloguje się</span></div>`,
  js: `
${IN(".ttl", "T(5.15)")}
${IN(".r0", "T(5.7)")}
${IN(".r1", "T(6.6)")}
tl.fromTo($(".r1 .st"), { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.3, ease: E }, T(7.3));
${IN(".r2", "T(7.9)")}
tl.fromTo($(".r2 .st"), { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.3, ease: E }, T(8.6));
tl.fromTo($(".res"), { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.4, ease: E }, T(9.4));
`,
});

// 3 two-step verification: something you know + something you have
scenes.push({
  start: 10.4,
  css: `${BASE}
@R .fc { position:absolute; top:550px; width:380px; height:420px; border-radius:36px; background:var(--panel); border:1.5px solid var(--line);
  display:flex; flex-direction:column; align-items:center; justify-content:center; gap:22px; text-align:center; }
@R .fc .ic { width:120px; height:120px; stroke-width:1.3; }
@R .fc .a { font-size:46px; font-weight:600; } @R .fc .b { font-size:38px; color:var(--muted); }
@R .k { left:110px; } @R .k .ic { color:var(--yellow); }
@R .p { right:110px; } @R .p .ic { color:var(--green); }
@R .plus { position:absolute; left:490px; top:710px; width:100px; text-align:center; font-size:90px; font-weight:700; color:var(--muted); }
@R .ok { position:absolute; left:0; right:0; top:1050px; display:flex; justify-content:center; align-items:center; gap:20px; font-size:58px; font-weight:700; color:var(--green); }
@R .ok .ic { width:68px; height:68px; stroke-width:2; }`,
  html: `${TAG}
<h1 class="hd ttl">Weryfikacja <span class="g">dwuetapowa</span></h1>
<div class="fc k">${icon("key-round")}<span class="a">coś, co wiesz</span><span class="b">hasło</span></div>
<div class="plus">+</div>
<div class="fc p">${icon("smartphone")}<span class="a">coś, co masz</span><span class="b">telefon</span></div>
<div class="ok">${icon("shield-check")}<span>wejście</span></div>`,
  js: `
${IN(".ttl", "T(10.6)")}
${IN(".k", "T(12.1)")}
tl.fromTo($(".plus"), { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.3, ease: E }, T(13.2));
${IN(".p", "T(13.4)")}
tl.fromTo($(".ok"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.35, ease: E }, T(14.2));
`,
});

// 4 Microsoft: MFA blocks over 99.9% of automated attacks
scenes.push({
  start: 14.6,
  css: `${BASE}
@R .who { position:absolute; left:0; right:0; top:470px; text-align:center; font-size:50px; color:var(--muted); }
@R .big { position:absolute; left:0; right:0; top:560px; text-align:center; font-size:260px; line-height:1; font-weight:700; letter-spacing:-0.05em; color:var(--green); }
@R .lab { position:absolute; left:100px; right:100px; top:880px; text-align:center; font-size:56px; font-weight:600; line-height:1.2; }
@R .src { position:absolute; left:0; right:0; top:1120px; text-align:center; font-size:36px; color:var(--muted); }`,
  html: `${TAG}
<h1 class="hd ttl">Czy to <span class="g">działa</span>?</h1>
<div class="who">według Microsoftu blokuje ponad</div>
<div class="big mono">0%</div>
<div class="lab">automatycznych ataków na konta</div>
<div class="src mono">Microsoft, 2019</div>`,
  js: `
${IN(".ttl", "T(14.75)")}
${IN(".who", "T(15.2)")}
tl.fromTo($(".big"), { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.35, ease: E }, T(16.4));
count(".big", 0, 99.9, T(16.5), 1.2, function (v) { return v.toFixed(1).replace(".", ",") + "%"; });
${IN(".lab", "T(18.6)")}
${IN(".src", "T(19.4)")}
`,
});

// 5 SMS is the weakest: SIM swap at the carrier, or a scam call asking for the code
scenes.push({
  start: 20.35,
  css: `${BASE}
@R .ph { position:absolute; top:480px; width:260px; height:380px; border-radius:44px; background:var(--panel); border:2.5px solid var(--line);
  display:flex; flex-direction:column; align-items:center; justify-content:flex-end; padding-bottom:30px; font-size:40px; color:var(--muted); }
@R .ph .ic { position:absolute; top:40px; width:70px; height:70px; stroke-width:1.5; }
@R .me { left:150px; } @R .th { right:150px; border-color:#6b5a1a; } @R .th .ic { color:var(--yellow); }
@R .sim { position:absolute; left:235px; top:640px; width:90px; height:110px; border-radius:12px 34px 12px 12px; background:var(--yellow); color:#0b0e0d;
  display:flex; align-items:center; justify-content:center; }
@R .sim .ic { width:56px; height:56px; stroke-width:1.8; }
@R .op { position:absolute; left:0; right:0; top:890px; text-align:center; font-size:40px; color:var(--yellow); }
@R .call { top:990px; border-color:#6b5a1a; } @R .call .ic { color:var(--yellow); }
@R .call .qt { font-style:italic; }`,
  html: `${TAG}
<h1 class="hd ttl"><span class="y">Słaby punkt</span>: SMS</h1>
<div class="ph me">${icon("smartphone")}<span>ty</span></div>
<div class="ph th">${icon("venetian-mask")}<span>oszust</span></div>
<div class="sim">${icon("card-sim")}</div>
<div class="op">przejęcie numeru u operatora</div>
<div class="row call">${icon("phone-incoming")}<span class="qt">„Tu bank, podaj kod”</span></div>`,
  js: `
${IN(".ttl", "T(20.5)")}
tl.fromTo($(".ph"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.45, ease: E, stagger: 0.15 }, T(22.6));
tl.fromTo($(".sim"), { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.3, ease: E }, T(22.9));
tl.to($(".sim"), { x: 520, duration: 0.7, ease: IO }, T(23.5));
${IN(".op", "T(24.0)")}
${IN(".call", "T(24.9)")}
`,
});

// 6 better: authenticator app (new code every 30 s) or a hardware key
const R = 70;
const C = +(2 * Math.PI * R).toFixed(1);
scenes.push({
  start: 26.4,
  css: `${BASE}
@R .au { position:absolute; left:110px; right:110px; top:480px; height:300px; border-radius:36px; background:var(--panel); border:1.5px solid #2b5a45; }
@R .au .nm { position:absolute; left:44px; top:40px; font-size:40px; color:var(--muted); }
@R .au .cd { position:absolute; left:44px; top:110px; font-size:120px; font-weight:700; letter-spacing:0.02em; color:var(--green); }
@R .au .c2 { opacity:0; }
@R .au svg { position:absolute; right:50px; top:70px; width:170px; height:170px; transform:rotate(-90deg); }
@R .au circle { fill:none; stroke-width:12; }
@R .au .bg { stroke:#24302b; } @R .au .fg { stroke:var(--green); stroke-dasharray:${C}; stroke-linecap:round; }
@R .au .sec { position:absolute; right:50px; top:70px; width:170px; height:170px; display:flex; align-items:center; justify-content:center; font-size:44px; }
@R .ky { top:850px; } @R .ky .ic { color:var(--green); }
@R .lv { position:absolute; left:110px; right:110px; top:1040px; display:flex; gap:16px; }
@R .lv span { flex:1; height:96px; border-radius:24px; display:flex; align-items:center; justify-content:center; font-size:38px; border:1.5px solid var(--line); background:var(--panel); }
@R .lvc { position:absolute; left:0; right:0; top:1155px; text-align:center; font-size:36px; color:var(--muted); }
@R .lv .l0 { color:var(--yellow); } @R .lv .l1, @R .lv .l2 { color:var(--green); border-color:#2b5a45; }`,
  html: `${TAG}
<h1 class="hd ttl">Lepiej: <span class="g">aplikacja</span></h1>
<div class="au"><span class="nm">Authenticator · twoje konto</span><span class="cd mono c1">381 204</span><span class="cd mono c2">907 516</span>
<svg viewBox="0 0 170 170"><circle class="bg" cx="85" cy="85" r="${R}"/><circle class="fg" cx="85" cy="85" r="${R}"/></svg><span class="sec mono">30</span></div>
<div class="row ky">${icon("usb")}<span>albo klucz sprzętowy</span></div>
<div class="lv"><span class="l0">SMS</span><span class="l1">aplikacja</span><span class="l2">klucz</span></div>
<div class="lvc">od najsłabszej do najmocniejszej ochrony</div>`,
  js: `
${IN(".ttl", "T(26.55)")}
${IN(".au", "T(27.0)")}
tl.fromTo($(".au .fg"), { strokeDashoffset: 0 }, { strokeDashoffset: ${C}, duration: 1.7, ease: "none" }, T(27.4));
count(".au .sec", 30, 0, T(27.4), 1.7, function (v) { return String(Math.round(v)); });
tl.to($(".au .c1"), { opacity: 0, y: -30, duration: 0.25 }, T(29.1));
tl.fromTo($(".au .c2"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.3, ease: E }, T(29.15));
tl.set($(".au .fg"), { strokeDashoffset: 0 }, T(29.15));
tl.set($(".au .sec"), { textContent: "30" }, T(29.15));
${IN(".ky", "T(30.2)")}
tl.fromTo($(".lv span"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3, ease: E, stagger: 0.12 }, T(30.7));
tl.fromTo($(".lvc"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, T(30.9));
`,
});

// 7 the rule: never give the code to anyone; a bank will never ask for it
scenes.push({
  start: 31.3,
  css: `${BASE}
@R .rule { position:absolute; left:80px; right:80px; top:470px; text-align:center; font-size:96px; line-height:1.05; }
@R .s1 { top:750px; height:180px; }
@R .s1 .bd { font-size:40px; }
@R .bk { top:1000px; border-color:#2b5a45; } @R .bk .ic { color:var(--green); }`,
  html: `${TAG}
<h1 class="hd ttl">Najważniejsze</h1>
<div class="hd rule"><span class="y">Nikomu</span><br>nie podawaj kodu</div>
${SMS("s1", `Kod: <b class="mono">${CODE}</b>. Nie podawaj go nikomu.`)}
<div class="row bk">${icon("landmark")}<span>bank nigdy o niego nie zapyta</span></div>`,
  js: `
${IN(".ttl", "T(31.45)")}
${IN(".rule", "T(32.45)")}
tl.fromTo($(".s1"), { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: 0.45, ease: E }, T(33.0));
${IN(".bk", "T(34.0)")}
`,
});

// 8 CTA
scenes.push({
  start: 35.7,
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
<div class="pre"><span class="g">bezpieczne</span> logowanie dla firm</div>
<h1 class="hd logo">DELO<br><span class="g">COMPANY</span></h1>
<div class="what"><span class="chip">strony www</span><span class="chip g">automatyzacje</span></div>
<div class="fl">${icon("plus")}Obserwuj</div>`,
  js: `
${IN(".pre", "T(35.85)")}
tl.fromTo($(".logo"), { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.6, ease: E }, T(37.3));
tl.fromTo($(".chip"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4, ease: E, stagger: 0.2 }, T(37.75));
tl.fromTo($(".fl"), { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.45, ease: E }, T(38.5));
tl.fromTo($(".fl"), { scale: 1 }, { scale: 1.05, duration: 0.18, ease: "power2.out", yoyo: true, repeat: 1 }, T(39.15));
`,
});

build({
  title: "Po co kod SMS przy logowaniu",
  music: 0.11,
  tail: 0.9,
  scenes,
  replace: [
    [["esemesem"], "SMS-em"],
    [["esemes"], "SMS"],
    [["majkrosoftu"], "Microsoftu"],
    [["dziewięćdziesiąt", "dziewięć", "i", "dziewięć", "dziesiątych", "procent"], "99,9%"],
    [["kompani"], "Company"],
  ],
  sfx: [
    ["pop", 2.2, 0.72, 0.3, 13],
    ["click-soft", 9.4, 0.365, 0.45, 13],
    ["pop", 16.5, 0.72, 0.28, 14],
    ["click-soft", 29.15, 0.365, 0.4, 13],
    ["pop", 33.0, 0.72, 0.28, 13],
    ["chime", 37.3, 2.5, 0.2, 15],
  ],
});
