import { build, icon } from "./short.mjs";

// global word times (Florian, tightened): WhatsAppie 1.35, przeczytać 3.11, nawet 5.16, nie 6.03, szyfrowanie 6.71, e2e 7.39,
// telefon 8.78, odbiorcy 9.63, klucze 10.69, szyfrowana 12.14, wyjdzie 13.28, Serwery 14.74, przekazują 16.12, ciąg 17.44,
// treść 19.17, Odszyfruje 19.90, odbiorcy 21.27, uwaga 22.39, metadane 23.88, kim 24.90, kiedy 25.55, kopia 26.37,
// chmurze 27.08, e2e 28.15, włączysz 29.78, ustawieniach 30.25, atak 32.03, odblokowany 33.33, pomoże 35.95,
// Bezpieczne 36.73, Delo 39.19, Obserwuj 40.34
const IN = (sel, t, extra = "") => `tl.fromTo($("${sel}"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.45, ease: E${extra} }, ${t});`;
const TAG = `<div class="tag mono">IT OD ŚRODKA · #7</div>`;
const MSG = "Spotkanie o 15?";
const CIPH = "x9#Qf!2@";
const BASE = `
@R .tag { position:absolute; left:0; right:0; top:200px; text-align:center; font-size:44px; color:var(--muted); }
@R .ttl { position:absolute; left:80px; right:80px; top:290px; text-align:center; font-size:84px; }
@R .ph { position:absolute; width:300px; height:420px; border-radius:44px; background:var(--panel); border:2.5px solid var(--line); }
@R .ph .who { position:absolute; left:0; right:0; bottom:24px; text-align:center; font-size:42px; color:var(--muted); }
@R .ph .key { position:absolute; left:50%; top:30px; width:70px; height:70px; margin-left:-35px; border-radius:20px; background:rgba(245,197,24,.15); color:var(--yellow); display:flex; align-items:center; justify-content:center; }
@R .ph .key .ic { width:44px; height:44px; stroke-width:1.8; }
@R .bub { position:absolute; padding:16px 26px; border-radius:26px 26px 26px 8px; background:#1d4a39; color:var(--text); font-size:44px; white-space:nowrap; }
@R .enc { position:absolute; padding:14px 24px; border-radius:20px; background:var(--panel); border:2px solid var(--yellow); color:var(--yellow); font-size:40px; white-space:nowrap; display:flex; align-items:center; gap:12px; }
@R .enc .ic { width:40px; height:40px; stroke-width:2; }
`;
const scenes = [];

// 1 hook: message sent - who can read it?
scenes.push({
  start: 0,
  css: `${BASE}
@R .q { position:absolute; left:80px; right:80px; top:300px; text-align:center; font-size:96px; }
@R .chat { position:absolute; left:140px; right:140px; top:620px; height:440px; border-radius:36px; background:#0e1311; border:1.5px solid var(--line); }
@R .chat .bub { right:40px; top:60px; border-radius:26px 26px 8px 26px; }
@R .chat .tick { position:absolute; right:48px; top:150px; font-size:40px; color:var(--green); }
@R .ans { position:absolute; left:0; right:0; top:1110px; display:flex; justify-content:center; align-items:center; gap:24px; font-size:64px; font-weight:700; letter-spacing:-0.02em; }
@R .ans .ic { width:70px; height:70px; color:var(--green); stroke-width:1.8; }`,
  html: `${TAG}
<h1 class="hd q">Kto może przeczytać <span class="g">twoją wiadomość</span>?</h1>
<div class="chat"><div class="bub">${MSG}</div><div class="tick mono">✓✓</div></div>
<div class="ans">${icon("eye-off")}<span>nawet <span class="g">WhatsApp</span> nie</span></div>`,
  js: `
tl.fromTo($(".tag"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0);
${IN(".q", "0.05")}
${IN(".chat", "0.2")}
tl.fromTo($(".chat .bub"), { opacity: 0, y: 30, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: E }, T(1.0));
tl.fromTo($(".chat .tick"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, T(1.6));
${IN(".ans", "T(5.1)")}
`,
});

// 2 end-to-end: keys on both phones, encrypted before it leaves
scenes.push({
  start: 6.4,
  css: `${BASE}
@R .p0 { left:100px; top:560px; height:380px; } @R .p1 { left:680px; top:560px; height:380px; }
@R .b0 { left:100px; top:980px; }
@R .e0 { left:100px; top:980px; }
@R .lab { position:absolute; left:0; right:0; top:1110px; text-align:center; font-size:56px; font-weight:600; }`,
  html: `${TAG}
<h1 class="hd ttl">Szyfrowanie <span class="g" style="white-space:nowrap">end-to-end</span></h1>
<div class="ph p0"><div class="key k0">${icon("key-round")}</div><div class="who">ty</div></div>
<div class="ph p1"><div class="key k1">${icon("key-round")}</div><div class="who">odbiorca</div></div>
<div class="bub b0">${MSG}</div>
<div class="enc e0 mono">${icon("lock")}${CIPH}</div>
<div class="lab">szyfrowane <span class="y">zanim wyjdzie</span> z telefonu</div>`,
  js: `
${IN(".ttl", "T(6.6)")}
tl.fromTo($(".ph"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.45, ease: E, stagger: 0.15 }, T(8.4));
tl.fromTo($(".key"), { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.4, ease: E, stagger: 0.15 }, T(10.6));
tl.fromTo($(".b0"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.35, ease: E }, T(11.4));
tl.to($(".b0"), { opacity: 0, filter: "blur(8px)", duration: 0.3 }, T(12.15));
tl.fromTo($(".e0"), { opacity: 0, filter: "blur(8px)" }, { opacity: 1, filter: "blur(0px)", duration: 0.35 }, T(12.25));
${IN(".lab", "T(12.9)")}
`,
});

// 3 servers only relay ciphertext; recipient decrypts
scenes.push({
  start: 14.6,
  css: `${BASE}
@R .p0 { left:60px; top:760px; width:240px; height:340px; } @R .p1 { left:780px; top:760px; width:240px; height:340px; }
@R .sv { position:absolute; left:300px; top:430px; width:480px; height:230px; border-radius:30px; background:var(--panel); border:1.5px solid var(--line);
  display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; color:var(--muted); }
@R .sv .ic { width:76px; height:76px; stroke-width:1.4; }
@R .sv .lb { color:var(--text); font-size:44px; }
@R .wire path { stroke:#3a4842; stroke-width:4; stroke-dasharray:12 12; }
@R .e1 { left:60px; top:684px; }
@R .sees { position:absolute; left:0; right:0; top:1150px; display:flex; justify-content:center; align-items:center; gap:18px; font-size:48px; color:var(--muted); }
@R .sees .ic { width:50px; height:50px; color:var(--yellow); }
@R .b1 { left:620px; top:1150px; border-radius:26px 26px 8px 26px; }`,
  html: `${TAG}
<svg class="wire" viewBox="0 0 1080 1920"><path d="M180 760 L300 600"/><path d="M780 600 L900 760"/></svg>
<div class="sv">${icon("server")}<span class="lb">serwer WhatsApp</span></div>
<div class="ph p0"><div class="key">${icon("key-round")}</div><div class="who">ty</div></div>
<div class="ph p1"><div class="key">${icon("key-round")}</div><div class="who">odbiorca</div></div>
<div class="enc e1 mono">${icon("lock")}${CIPH}</div>
<div class="sees">${icon("eye")}<span>serwer widzi tylko szyfr</span></div>
<div class="bub b1">${MSG}</div>`,
  js: `
tl.fromTo([$(".sv"), $(".ph")], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.45, ease: E, stagger: 0.1 }, T(14.7));
tl.fromTo($(".e1"), { opacity: 0, x: 0, y: 0 }, { opacity: 1, x: 0, y: 0, duration: 0.3 }, T(15.4));
tl.to($(".e1"), { x: 345, duration: 0.8, ease: IO }, T(15.8));
${IN(".sees", "T(17.4)")}
tl.to($(".e1"), { x: 700, duration: 0.8, ease: IO }, T(18.9));
tl.to($(".e1"), { opacity: 0, filter: "blur(8px)", duration: 0.3 }, T(20.0));
tl.to($(".sees"), { opacity: 0, duration: 0.3 }, T(20.0));
tl.fromTo($(".b1"), { opacity: 0, filter: "blur(8px)" }, { opacity: 1, filter: "blur(0px)", duration: 0.35 }, T(20.1));
`,
});

// 4 metadata is still visible
const meta = [
  ["users", "z kim piszesz", 24.9, "y"],
  ["clock", "kiedy", 25.55, "y"],
  ["eye-off", "treść wiadomości", 23.88, "g"],
];
scenes.push({
  start: 22.0,
  css: `${BASE}
@R .row { position:absolute; left:120px; right:120px; height:140px; display:flex; align-items:center; gap:30px; padding:0 40px; border-radius:30px; background:var(--panel); border:1.5px solid var(--line); font-size:54px; }
@R .row .ic { width:60px; height:60px; stroke-width:1.6; flex:none; }
@R .row .st { margin-left:auto; font-size:46px; }
${meta.map((_, i) => `@R .m${i} { top:${480 + i * 170}px; }`).join("\n")}
@R .y .ic { color:var(--yellow); } @R .g .ic { color:var(--green); }`,
  html: `${TAG}
<h1 class="hd ttl">Ale <span class="y">metadane</span> widać</h1>
${meta.map(([ic, t, , c], i) => `<div class="row m${i} ${c}">${icon(ic)}<span>${t}</span><span class="st mono ${c === "y" ? "y" : "g"}">${c === "y" ? "widać" : "ukryta"}</span></div>`).join("")}`,
  js: `
${IN(".ttl", "T(22.2)")}
${IN(".m2", "T(23.8)")}
${IN(".m0", "T(24.8)")}
${IN(".m1", "T(25.5)")}
`,
});

// 5 cloud backup only E2E when you turn it on
scenes.push({
  start: 26.1,
  css: `${BASE}
@R .cl { position:absolute; left:0; right:0; top:440px; display:flex; justify-content:center; color:var(--muted); }
@R .cl .ic { width:160px; height:160px; stroke-width:1.2; }
@R .set { position:absolute; left:100px; right:100px; top:690px; padding:34px 40px; border-radius:30px; background:var(--panel); border:1.5px solid var(--line);
  display:flex; align-items:center; gap:30px; }
@R .set .t { flex:1; font-size:48px; line-height:1.2; }
@R .sw { width:150px; height:84px; border-radius:42px; background:#2b3632; position:relative; flex:none; }
@R .sw i { position:absolute; left:8px; top:8px; width:68px; height:68px; border-radius:50%; background:var(--muted); display:block; }
@R .def { position:absolute; left:0; right:0; top:930px; text-align:center; font-size:50px; color:var(--yellow); }`,
  html: `${TAG}
<h1 class="hd ttl">Kopia w <span class="g">chmurze</span></h1>
<div class="cl">${icon("cloud")}</div>
<div class="set"><div class="t">Szyfrowana kopia zapasowa end-to-end</div><div class="sw"><i></i></div></div>
<div class="def">domyślnie wyłączona, włącz ją</div>`,
  js: `
${IN(".ttl", "T(26.2)")}
${IN(".cl", "T(26.9)")}
${IN(".set", "T(27.5)")}
tl.to($(".sw"), { backgroundColor: "#3ee08f", duration: 0.25 }, T(29.8));
tl.to($(".sw i"), { x: 66, backgroundColor: "#0b0e0d", duration: 0.3, ease: E }, T(29.8));
tl.to($(".cl"), { color: "#3ee08f", duration: 0.3 }, T(29.9));
${IN(".def", "T(30.1)")}
`,
});

// 6 unlocked phone beats any encryption
scenes.push({
  start: 31.0,
  css: `${BASE}
@R .big { position:absolute; left:390px; top:440px; width:300px; height:520px; border-radius:50px; background:var(--panel); border:3px solid var(--yellow);
  display:flex; flex-direction:column; align-items:center; justify-content:center; gap:20px; color:var(--yellow); }
@R .big .ic { width:110px; height:110px; stroke-width:1.5; }
@R .big .lb { color:var(--text); font-size:44px; }
@R .cap { position:absolute; left:80px; right:80px; top:1030px; text-align:center; font-size:62px; font-weight:700; letter-spacing:-0.02em; }`,
  html: `${TAG}
<h1 class="hd ttl">Najprostszy <span class="y">atak</span></h1>
<div class="big">${icon("lock-open")}<span class="lb">odblokowany</span></div>
<div class="cap">wtedy <span class="y">żadne szyfrowanie</span> nie pomoże</div>`,
  js: `
${IN(".ttl", "T(31.2)")}
tl.fromTo($(".big"), { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.45, ease: E }, T(32.5));
tl.fromTo($(".big .ic"), { rotate: -10 }, { rotate: 0, duration: 0.4, ease: E }, T(33.3));
${IN(".cap", "T(34.7)")}
`,
});

// 7 CTA
scenes.push({
  start: 36.5,
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
<div class="pre"><span class="g">bezpieczne</span> aplikacje i automatyzacje</div>
<h1 class="hd logo">DELO<br><span class="g">COMPANY</span></h1>
<div class="what"><span class="chip">strony www</span><span class="chip g">automatyzacje</span></div>
<div class="fl">${icon("plus")}Obserwuj</div>`,
  js: `
${IN(".pre", "T(36.7)")}
tl.fromTo($(".logo"), { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.6, ease: E }, T(39.1));
tl.fromTo($(".chip"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4, ease: E, stagger: 0.2 }, T(39.6));
tl.fromTo($(".fl"), { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.45, ease: E }, T(40.3));
tl.fromTo($(".fl"), { scale: 1 }, { scale: 1.05, duration: 0.18, ease: "power2.out", yoyo: true, repeat: 1 }, T(41.0));
`,
});

build({
  title: "Kto może przeczytać twoją wiadomość",
  music: 0.11,
  tail: 0.9,
  scenes,
  replace: [
    [["end", "tu", "end"], "end-to-end"],
    [["kompani"], "Company"],
  ],
  sfx: [
    ["pop", 1.0, 0.72, 0.3, 13],
    ["click-soft", 12.2, 0.365, 0.45, 13],
    ["pop", 20.1, 0.72, 0.3, 14],
    ["click-soft", 29.8, 0.365, 0.45, 13],
    ["chime", 39.1, 2.5, 0.2, 15],
  ],
});
