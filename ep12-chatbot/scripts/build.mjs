import { build, icon } from "./short.mjs";

// global word times (Florian, tightened): czatbotem 0.79, firmy 1.72, Skąd 2.41, odpowiedź 3.13, model 4.33, AI 4.65, firmie 5.64,
// czatbot 6.99, przeszukuje 7.82, dokumenty 8.37, cennik 9.13, regulamin 9.84, najczęstsze 10.64, Znalezione 11.89,
// fragmenty 12.42, pytaniem 13.83, pisze 15.11, odpowiedź 15.36, nazywa 16.50, rag 16.88, Bez 17.49, zgaduje 18.31,
// zmyślać 19.30, 2024 20.26-21.08, Air Canada 22.16, zapłacić 23.01, klientowi 23.44, wymyślił 24.76, zwrotu 25.53, bilet 25.93,
// Trybunał 26.57, czatbota 28.24, firma 29.20, czatbot 30.56, źródło 31.28, trudne 32.05, człowiekowi 33.13, Takie 34.01,
// Delo 35.24, Obserwuj 36.43
const IN = (sel, t, extra = "") => `tl.fromTo($("${sel}"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.45, ease: E${extra} }, ${t});`;
const POP = (sel, t) => `tl.fromTo($("${sel}"), { opacity: 0, y: 24, scale: 0.92 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: E }, ${t});`;
const TAG = `<div class="tag mono">IT OD ŚRODKA · #12</div>`;
const Q = "Ile kosztuje dostawa?";
const BASE = `
@R .tag { position:absolute; left:0; right:0; top:200px; text-align:center; font-size:44px; color:var(--muted); }
@R .ttl { position:absolute; left:80px; right:80px; top:290px; text-align:center; font-size:84px; }
@R .cw { position:absolute; left:110px; right:110px; border-radius:36px; background:#0e1311; border:1.5px solid var(--line); overflow:hidden; }
@R .cw .hb { height:100px; display:flex; align-items:center; gap:20px; padding:0 30px; border-bottom:1.5px solid var(--line); font-size:40px; }
@R .av { width:60px; height:60px; border-radius:50%; background:var(--green); color:#0b0e0d; display:flex; align-items:center; justify-content:center; flex:none; }
@R .av .ic { width:36px; height:36px; stroke-width:2; }
@R .cw .hb .st { margin-left:auto; font-size:32px; color:var(--green); }
@R .ub { position:absolute; right:30px; max-width:640px; padding:20px 28px; border-radius:28px 28px 8px 28px; background:#1d4a39; font-size:42px; }
@R .bb { position:absolute; left:30px; max-width:680px; padding:20px 28px; border-radius:28px 28px 28px 8px; background:var(--panel); border:1.5px solid var(--line); font-size:42px; line-height:1.25; }
@R .src { position:absolute; left:30px; padding:10px 20px; border-radius:16px; background:#123526; color:var(--green); font-size:32px; display:flex; align-items:center; gap:10px; }
@R .src .ic { width:34px; height:34px; stroke-width:2; }
@R .badge { position:absolute; padding:10px 22px; border-radius:16px; font-size:34px; font-weight:700; display:flex; align-items:center; gap:10px; }
@R .badge .ic { width:36px; height:36px; stroke-width:2.2; }
@R .bad { background:#3a2f1a; color:var(--yellow); border:2px solid var(--yellow); }
@R .row { position:absolute; left:110px; right:110px; height:120px; display:flex; align-items:center; gap:24px; padding:0 34px; border-radius:30px;
  background:var(--panel); border:1.5px solid var(--line); font-size:46px; }
@R .row .ic { width:54px; height:54px; stroke-width:1.7; flex:none; }
`;
const HEAD = (st = "online") => `<div class="hb"><div class="av">${icon("bot")}</div><span>Asystent</span><span class="st mono">${st}</span></div>`;
const scenes = [];

// 1 hook: you ask the website chat a question
scenes.push({
  start: 0,
  css: `${BASE}
@R .q { position:absolute; left:80px; right:80px; top:300px; text-align:center; font-size:92px; }
@R .c1 { top:560px; height:560px; }
@R .c1 .ub { top:150px; }
@R .dots { position:absolute; left:30px; top:300px; padding:26px 30px; border-radius:28px 28px 28px 8px; background:var(--panel); border:1.5px solid var(--line); display:flex; gap:12px; }
@R .dots i { display:block; width:18px; height:18px; border-radius:50%; background:var(--muted); }`,
  html: `${TAG}
<h1 class="hd q">Skąd chatbot zna <span class="g">odpowiedź</span>?</h1>
<div class="cw c1">${HEAD()}<div class="ub">${Q}</div><div class="dots"><i></i><i></i><i></i></div></div>`,
  js: `
tl.fromTo($(".tag"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0);
${IN(".q", "0.05")}
${IN(".c1", "0.25")}
${POP(".c1 .ub", "T(0.7)")}
${POP(".dots", "T(1.6)")}
tl.fromTo($(".dots i"), { y: 0 }, { y: -12, duration: 0.25, yoyo: true, repeat: 5, stagger: 0.1, ease: "sine.inOut" }, T(1.9));
`,
});

// 2 the AI model alone knows nothing about this company
scenes.push({
  start: 3.85,
  css: `${BASE}
@R .br { position:absolute; left:390px; top:470px; width:300px; height:300px; border-radius:50%; background:var(--panel); border:2px solid var(--line);
  display:flex; align-items:center; justify-content:center; color:var(--green); }
@R .br .ic { width:150px; height:150px; stroke-width:1.2; }
@R .qm { position:absolute; left:700px; top:430px; width:110px; height:110px; border-radius:30px; background:var(--panel); border:2px solid var(--yellow);
  color:var(--yellow); font-size:72px; font-weight:700; display:flex; align-items:center; justify-content:center; }
@R .r0 { top:860px; } @R .r0 .ic { color:var(--muted); }
@R .r0 .x { margin-left:auto; color:#ff6b5b; } @R .r0 .x .ic { color:#ff6b5b; stroke-width:2.6; }`,
  html: `${TAG}
<h1 class="hd ttl">Sam model <span class="y">nie wie</span></h1>
<div class="br">${icon("brain")}</div><div class="qm">?</div>
<div class="row r0">${icon("building-2")}<span>o twojej firmie</span><span class="x">${icon("x")}</span></div>`,
  js: `
${IN(".ttl", "T(4.0)")}
tl.fromTo($(".br"), { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.45, ease: E }, T(4.3));
tl.fromTo($(".qm"), { opacity: 0, scale: 0.5, rotate: -15 }, { opacity: 1, scale: 1, rotate: 8, duration: 0.4, ease: E }, T(4.95));
${IN(".r0", "T(5.3)")}
tl.fromTo($(".r0 .x"), { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.3, ease: E }, T(5.6));
`,
});

// 3 a good chatbot first searches the company's documents
const docs = [
  ["file-text", "cennik.pdf", 9.1],
  ["file-text", "regulamin.pdf", 9.8],
  ["circle-help", "najczęstsze pytania", 10.6],
];
scenes.push({
  start: 6.15,
  css: `${BASE}
${docs.map((_, i) => `@R .d${i} { top:${470 + i * 150}px; }`).join("\n")}
@R .row .ic { color:var(--muted); }
@R .lens { position:absolute; left:780px; top:450px; width:150px; height:150px; border-radius:50%; background:rgba(62,224,143,.12); border:4px solid var(--green);
  display:flex; align-items:center; justify-content:center; color:var(--green); }
@R .lens .ic { width:70px; height:70px; stroke-width:2; }
@R .hit { position:absolute; left:110px; right:110px; top:960px; padding:26px 34px; border-radius:30px; background:#2a2412; border:2px solid var(--yellow);
  font-size:44px; display:flex; align-items:center; gap:22px; }
@R .hit .ic { width:54px; height:54px; color:var(--yellow); stroke-width:1.8; flex:none; }
@R .hit small { display:block; font-size:32px; color:var(--muted); margin-top:4px; }`,
  html: `${TAG}
<h1 class="hd ttl">Najpierw <span class="g">szuka</span></h1>
${docs.map(([ic, t], i) => `<div class="row d${i}">${icon(ic)}<span class="mono">${t}</span></div>`).join("")}
<div class="lens">${icon("search")}</div>
<div class="hit">${icon("file-search")}<div>„Dostawa kurierem: 15 zł”<small>znaleziony fragment · cennik.pdf</small></div></div>`,
  js: `
${IN(".ttl", "T(6.3)")}
tl.fromTo($(".lens"), { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.4, ease: E }, T(7.4));
${docs.map(([, , t], i) => IN(`.d${i}`, `T(${t})`)).join("\n")}
tl.to($(".lens"), { y: 150, duration: 0.5, ease: IO }, T(9.8));
tl.to($(".lens"), { y: 300, duration: 0.5, ease: IO }, T(10.6));
tl.to($(".lens"), { y: 0, duration: 0.6, ease: IO }, T(11.25));
tl.to($(".d0"), { borderColor: "#f5c518", duration: 0.3 }, T(11.6));
${IN(".hit", "T(11.75)")}
`,
});

// 4 question + found fragments -> AI writes the answer; that's RAG
scenes.push({
  start: 12.25,
  css: `${BASE}
@R .qa { top:470px; } @R .qa .ic { color:var(--green); }
@R .fb { top:610px; border-color:#6b5a1a; } @R .fb .ic { color:var(--yellow); }
@R .pl { position:absolute; left:0; right:0; top:745px; text-align:center; font-size:60px; font-weight:700; color:var(--muted); }
@R .ai { position:absolute; left:470px; top:830px; width:140px; height:140px; border-radius:40px; background:var(--green); color:#0b0e0d;
  display:flex; align-items:center; justify-content:center; }
@R .ai .ic { width:76px; height:76px; stroke-width:1.8; }
@R .an { position:absolute; left:110px; right:110px; top:1010px; padding:24px 32px; border-radius:30px 30px 30px 8px; background:var(--panel); border:1.5px solid #2b5a45; font-size:44px; }
@R .rag { position:absolute; left:0; right:0; top:1150px; text-align:center; font-size:46px; color:var(--muted); }
@R .rag b { color:var(--green); font-size:62px; margin-right:16px; }`,
  html: `${TAG}
<h1 class="hd ttl">Pytanie + <span class="g">fragmenty</span></h1>
<div class="row qa">${icon("message-circle")}<span>${Q}</span></div>
<div class="row fb">${icon("file-search")}<span>„Dostawa kurierem: 15 zł”</span></div>
<div class="pl">↓</div>
<div class="ai">${icon("sparkles")}</div>
<div class="an">Dostawa kurierem kosztuje 15 zł.</div>
<div class="rag"><b class="mono">RAG</b>najpierw szukaj, potem pisz</div>`,
  js: `
${IN(".ttl", "T(12.4)")}
${IN(".fb", "T(12.5)")}
${IN(".qa", "T(13.4)")}
tl.fromTo($(".pl"), { opacity: 0 }, { opacity: 1, duration: 0.25 }, T(14.3));
tl.fromTo($(".ai"), { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.4, ease: E }, T(14.4));
tl.to($(".ai"), { rotate: 360, duration: 0.8, ease: IO }, T(14.6));
tl.fromTo($(".an"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.4, ease: E }, T(15.1));
tl.fromTo($(".rag"), { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.4, ease: E }, T(16.75));
`,
});

// 5 without it the AI guesses and can make things up
scenes.push({
  start: 17.35,
  css: `${BASE}
@R .c2 { top:480px; height:560px; }
@R .c2 .ub { top:140px; }
@R .c2 .bb { top:290px; }
@R .c2 .bad { left:30px; top:440px; }`,
  html: `${TAG}
<h1 class="hd ttl">Bez tego <span class="y">zmyśla</span></h1>
<div class="cw c2">${HEAD()}<div class="ub">${Q}</div><div class="bb">Dostawa jest zawsze darmowa!</div><div class="badge bad">${icon("triangle-alert")}zmyślone</div></div>`,
  js: `
${IN(".ttl", "T(17.5)")}
${IN(".c2", "T(17.6)")}
${POP(".c2 .ub", "T(17.8)")}
${POP(".c2 .bb", "T(18.3)")}
${POP(".c2 .bad", "T(19.1)")}
`,
});

// 6 Air Canada 2024: had to pay because its chatbot invented a refund rule; tribunal: the company is responsible
scenes.push({
  start: 20.0,
  css: `${BASE}
@R .pay { top:460px; border-color:#6b5a1a; } @R .pay .ic { color:var(--yellow); }
@R .pay .amt { margin-left:auto; color:var(--yellow); font-weight:700; }
@R .c3 { top:620px; height:300px; }
@R .c3 .bb { top:125px; font-size:40px; }
@R .c3 .bad { right:30px; top:30px; }
@R .gv { position:absolute; left:110px; right:110px; top:960px; padding:30px 36px; border-radius:30px; background:var(--panel); border:1.5px solid var(--line);
  display:flex; align-items:center; gap:26px; font-size:46px; line-height:1.2; }
@R .gv .ic { width:70px; height:70px; color:var(--green); stroke-width:1.6; flex:none; }
@R .gv .f { color:var(--green); font-weight:700; }`,
  html: `${TAG}
<h1 class="hd ttl"><span class="y">Air Canada</span>, 2024</h1>
<div class="row pay">${icon("plane")}<span>zapłata dla klienta</span><span class="amt mono">812 CAD</span></div>
<div class="cw c3"><div class="hb"><div class="av">${icon("bot")}</div><span>chatbot linii</span></div>
<div class="bb">„Zniżkę dostaniesz też po locie, masz 90 dni”</div></div>
<div class="badge bad b3" style="right:140px;top:650px">${icon("triangle-alert")}zmyślone</div>
<div class="gv">${icon("gavel")}<div>Trybunał: za słowa chatbota<br>odpowiada <span class="f">firma</span></div></div>`,
  js: `
${IN(".ttl", "T(20.15)")}
${IN(".pay", "T(22.9)")}
${IN(".c3", "T(24.1)")}
${POP(".c3 .bb", "T(24.4)")}
${POP(".b3", "T(25.5)")}
${IN(".gv", "T(26.55)")}
tl.fromTo($(".gv .f"), { scale: 1 }, { scale: 1.12, duration: 0.2, yoyo: true, repeat: 1 }, T(29.15));
`,
});

// 7 a good chatbot cites its source and hands hard cases to a human
scenes.push({
  start: 29.75,
  css: `${BASE}
@R .c4 { top:470px; height:660px; }
@R .c4 .ub { top:130px; }
@R .c4 .bb { top:260px; }
@R .c4 .src { top:370px; }
@R .hu { position:absolute; left:30px; right:30px; top:480px; padding:22px 28px; border-radius:24px; background:#123526; border:1.5px solid #2b5a45;
  display:flex; align-items:center; gap:20px; font-size:40px; }
@R .hu .ic { width:52px; height:52px; color:var(--green); stroke-width:1.8; flex:none; }`,
  html: `${TAG}
<h1 class="hd ttl">Dobry <span class="g">chatbot</span></h1>
<div class="cw c4">${HEAD()}<div class="ub">${Q}</div><div class="bb">Dostawa kurierem: 15 zł.</div>
<div class="src mono">${icon("link")}źródło: cennik.pdf</div>
<div class="hu">${icon("headset")}<span>trudna sprawa? przekazuję konsultantowi</span></div></div>`,
  js: `
${IN(".ttl", "T(29.9)")}
${IN(".c4", "T(30.0)")}
${POP(".c4 .ub", "T(30.2)")}
${POP(".c4 .bb", "T(30.5)")}
${POP(".c4 .src", "T(30.95)")}
${POP(".c4 .hu", "T(32.6)")}
`,
});

// 8 CTA
scenes.push({
  start: 33.85,
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
<div class="pre"><span class="g">chatboty</span> i automatyzacje dla firm</div>
<h1 class="hd logo">DELO<br><span class="g">COMPANY</span></h1>
<div class="what"><span class="chip">strony www</span><span class="chip g">automatyzacje</span></div>
<div class="fl">${icon("plus")}Obserwuj</div>`,
  js: `
${IN(".pre", "T(34.0)")}
tl.fromTo($(".logo"), { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.6, ease: E }, T(35.2));
tl.fromTo($(".chip"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4, ease: E, stagger: 0.2 }, T(35.65));
tl.fromTo($(".fl"), { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.45, ease: E }, T(36.4));
tl.fromTo($(".fl"), { scale: 1 }, { scale: 1.05, duration: 0.18, ease: "power2.out", yoyo: true, repeat: 1 }, T(37.05));
`,
});

build({
  title: "Jak działa chatbot AI na stronie firmy",
  music: 0.11,
  tail: 0.9,
  scenes,
  replace: [
    [["czatbotem"], "chatbotem"],
    [["czatbota"], "chatbota"],
    [["czatboty"], "chatboty"],
    [["czatbot"], "chatbot"],
    [["ej", "aj"], "AI"],
    [["rag"], "RAG"],
    [["dwa", "tysiące", "dwudziestym", "czwartym"], "2024"],
    [["er", "kanada"], "Air Canada"],
    [["kompani"], "Company"],
  ],
  sfx: [
    ["pop", 0.7, 0.72, 0.28, 13],
    ["click-soft", 11.75, 0.365, 0.4, 13],
    ["pop", 15.1, 0.72, 0.28, 14],
    ["click-soft", 19.1, 0.365, 0.45, 13],
    ["pop", 30.95, 0.72, 0.28, 14],
    ["chime", 35.2, 2.5, 0.2, 15],
  ],
});
