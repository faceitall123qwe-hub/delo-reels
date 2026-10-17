import { readFileSync } from "node:fs";
import { build, icon } from "./short.mjs";

// global word times (Florian, tightened): QR 1.15, właściwie 2.17, Zwykły 3.22, adres 4.77, zapisany 5.67, kwadracikach 6.18,
// Czarny 7.19, jedynka 8.12, biały 8.72, zero 9.16, Trzy 9.79, rogach 10.72, aparatowi 11.54, obrócony 13.34, Dlatego 14.17,
// kątem 15.45, najlepsze 16.36, zapasowe 17.66, najwyższym 18.72, odczytać 19.84, trzydziestu 21.30, zniszczonych 22.52,
// logo 24.55, środek 24.84, QR 25.87, Japonii 26.97, 1994 27.37-28.66, śledzenia 29.62, samochodowych 30.38, uwaga 31.51,
// wszędzie 32.91, wpiszesz 34.26, sprawdź 34.88, adres 35.25, Kody 35.95, Delo 38.35, Obserwuj 39.47
const IN = (sel, t, extra = "") => `tl.fromTo($("${sel}"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.45, ease: E${extra} }, ${t});`;
const TAG = `<div class="tag mono">IT OD ŚRODKA · #10</div>`;
const BASE = `
@R .tag { position:absolute; left:0; right:0; top:200px; text-align:center; font-size:44px; color:var(--muted); }
@R .ttl { position:absolute; left:80px; right:80px; top:290px; text-align:center; font-size:84px; }
@R .qr { position:absolute; }
@R .qr svg { display:block; width:100%; height:100%; }
@R .chip { position:absolute; height:110px; padding:0 34px; border-radius:55px; background:var(--panel); border:1.5px solid var(--line);
  display:flex; align-items:center; gap:16px; font-size:46px; white-space:nowrap; }
@R .chip .ic { width:50px; height:50px; stroke-width:1.9; }
`;

// real level-H QR matrix (encodes "DELO COMPANY - IT od srodka #10"), drawn with a 2-module quiet zone
const M = JSON.parse(readFileSync("scripts/qr.json", "utf8"));
const n = M.length;
const Q = 2;
const VB = n + 2 * Q;
let d = "";
M.forEach((r, y) => [...r].forEach((c, x) => c === "1" && (d += `M${x + Q} ${y + Q}h1v1h-1z`)));
const qrSvg = (extra = "") =>
  `<svg viewBox="0 0 ${VB} ${VB}" shape-rendering="crispEdges"><rect width="${VB}" height="${VB}" rx="1.6" fill="#f4f7f5"/><path d="${d}" fill="#0b0e0d"/>${extra}</svg>`;
// finder-pattern overlays, in % of the QR box
const fp = [[Q, Q], [Q + n - 7, Q], [Q, Q + n - 7]].map(([x, y]) => [((x - 0.6) / VB) * 100, ((y - 0.6) / VB) * 100, (8.2 / VB) * 100]);
const FP = fp.map(([x, y, s], i) => `<div class="fp f${i}" style="left:${x}%;top:${y}%;width:${s}%;height:${s}%"></div>`).join("");
const FPCSS = `@R .fp { position:absolute; border:7px solid var(--green); border-radius:14px; box-shadow:0 0 30px rgba(62,224,143,.5); }`;

const scenes = [];

// 1 hook: scanning a QR code
scenes.push({
  start: 0,
  css: `${BASE}
@R .q { position:absolute; left:80px; right:80px; top:300px; text-align:center; font-size:92px; }
@R .qr { left:260px; top:540px; width:560px; height:560px; overflow:hidden; border-radius:18px; }
@R .scan { position:absolute; left:0; right:0; top:0; height:8px; background:var(--green); box-shadow:0 0 30px 8px rgba(62,224,143,.55); }
@R .cn { position:absolute; width:90px; height:90px; border:8px solid var(--text); }
@R .c0 { left:220px; top:500px; border-right:0; border-bottom:0; border-radius:26px 0 0 0; }
@R .c1 { left:770px; top:500px; border-left:0; border-bottom:0; border-radius:0 26px 0 0; }
@R .c2 { left:220px; top:1050px; border-right:0; border-top:0; border-radius:0 0 0 26px; }
@R .c3 { left:770px; top:1050px; border-left:0; border-top:0; border-radius:0 0 26px 0; }`,
  html: `${TAG}
<h1 class="hd q">Co jest w <span class="g" style="white-space:nowrap">kodzie QR</span>?</h1>
<div class="qr">${qrSvg()}<div class="scan"></div></div>
<div class="cn c0"></div><div class="cn c1"></div><div class="cn c2"></div><div class="cn c3"></div>`,
  js: `
tl.fromTo($(".tag"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0);
${IN(".q", "0.05")}
tl.fromTo($(".qr"), { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.5, ease: E }, 0.15);
tl.fromTo($(".cn"), { opacity: 0, scale: 1.25 }, { opacity: 1, scale: 1, duration: 0.45, ease: E, stagger: 0.05 }, 0.3);
tl.fromTo($(".scan"), { y: 0 }, { y: 552, duration: 1.1, ease: "power1.inOut", yoyo: true, repeat: 2 }, 0.4);
`,
});

// 2 plain text -> bits -> squares; black = 1, white = 0
const bits = ["01110100", "01110111"]; // "t", "w"
const CELL = 52;
const cellX = (i) => 84 + i * (CELL + 4) + (i >= 8 ? 16 : 0);
scenes.push({
  start: 2.95,
  css: `${BASE}
@R .txt { position:absolute; left:160px; right:160px; top:470px; height:130px; border-radius:30px; background:var(--panel); border:1.5px solid var(--line);
  display:flex; align-items:center; justify-content:center; font-size:56px; }
@R .txt .hl { transition:none; }
@R .bl { position:absolute; top:636px; width:100px; margin-left:-50px; text-align:center; font-size:44px; color:var(--yellow); }
@R .strip { position:absolute; left:64px; right:64px; top:730px; height:92px; border-radius:16px; background:#f4f7f5; }
@R .dg { position:absolute; top:690px; width:${CELL}px; text-align:center; font-size:38px; color:var(--muted); }
@R .ce { position:absolute; top:745px; width:${CELL}px; height:${CELL}px; border-radius:6px; }
@R .ce.k { background:#0b0e0d; } @R .ce.w { background:#f4f7f5; border:2px dashed #c9d2cd; }
@R .lg { position:absolute; top:900px; width:400px; height:170px; border-radius:30px; background:var(--panel); border:1.5px solid var(--line);
  display:flex; align-items:center; justify-content:center; gap:30px; font-size:72px; font-weight:700; }
@R .lg i { display:block; width:90px; height:90px; border-radius:12px; }
@R .lg0 { left:110px; } @R .lg0 i { background:#0b0e0d; border:3px solid #3a4842; }
@R .lg1 { left:570px; } @R .lg1 i { background:#f4f7f5; }`,
  html: `${TAG}
<h1 class="hd ttl">Zwykły <span class="g">tekst</span></h1>
<div class="txt mono"><span class="hl h0">t</span><span class="hl h1">w</span>ojafirma.pl</div>
<div class="bl b0 mono" style="left:306px">t</div><div class="bl b1 mono" style="left:770px">w</div>
<div class="strip"></div>
${bits.join("").split("").map((b, i) => `<div class="dg mono" style="left:${cellX(i)}px">${b}</div><div class="ce ${b === "1" ? "k" : "w"}" style="left:${cellX(i)}px"></div>`).join("")}
<div class="lg lg0"><i></i><span>= 1</span></div>
<div class="lg lg1"><i></i><span>= 0</span></div>`,
  js: `
${IN(".ttl", "T(3.1)")}
${IN(".txt", "T(3.4)")}
tl.to([$(".h0"), $(".h1")], { color: "#f5c518", duration: 0.25 }, T(5.0));
tl.fromTo($(".bl"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, T(5.3));
tl.fromTo($(".strip"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, T(5.8));
tl.fromTo($(".dg"), { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.2, stagger: 0.025 }, T(5.5));
tl.fromTo($(".ce"), { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.25, ease: E, stagger: 0.03 }, T(5.9));
${IN(".lg0", "T(7.15)")}
${IN(".lg1", "T(8.7)")}
`,
});

// 3 three finder patterns: where the code is and how it is rotated
scenes.push({
  start: 9.6,
  css: `${BASE}
${FPCSS}
@R .qw { position:absolute; left:300px; top:500px; width:480px; height:480px; }
@R .qw .qr { left:0; top:0; width:100%; height:100%; }
@R .ok { left:150px; top:1130px; color:var(--green); border-color:#2b5a45; }`,
  html: `${TAG}
<h1 class="hd ttl">Trzy <span class="g">znaczniki</span></h1>
<div class="qw"><div class="qr">${qrSvg()}</div>${FP}</div>
<div class="chip ok">${icon("circle-check")}działa pod każdym kątem</div>`,
  js: `
${IN(".ttl", "T(9.75)")}
tl.fromTo($(".qw"), { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.45, ease: E }, T(9.7));
tl.fromTo($(".fp"), { opacity: 0, scale: 1.6 }, { opacity: 1, scale: 1, duration: 0.4, ease: E, stagger: 0.18 }, T(10.0));
tl.fromTo($(".fp"), { scale: 1 }, { scale: 1.12, duration: 0.2, yoyo: true, repeat: 1, stagger: 0.1 }, T(11.5));
tl.to($(".qw"), { rotate: 90, duration: 0.6, ease: IO }, T(13.1));
tl.to($(".qw"), { rotate: 215, duration: 0.7, ease: IO }, T(14.2));
${IN(".ok", "T(14.9)")}
`,
});

// 4 error correction: up to ~30% damaged still reads; that's why a logo fits in the middle
const dmg = "M19 15 L27 13 L31 17 L35 16 L36 24 L33 29 L35 34 L27 36 L23 32 L18 34 L16 28 L19 23 Z";
const LG = 9;
scenes.push({
  start: 16.0,
  css: `${BASE}
@R .qr { left:290px; top:460px; width:500px; height:500px; }
@R .qr .dm { fill:#0b0e0d; stroke:var(--yellow); stroke-width:0.35; stroke-dasharray:0.8 0.6; }
@R .qr .lgo rect { fill:var(--green); } @R .qr .lgo text { font-weight:700; font-size:3.4px; fill:#0b0e0d; }
@R .lv { left:110px; top:1000px; } @R .lv .ic { color:var(--green); }
@R .pc { left:110px; top:1130px; border-color:#6b5a1a; } @R .pc .ic { color:var(--yellow); }
@R .rd { position:absolute; left:640px; top:1000px; height:110px; padding:0 30px; border-radius:55px; background:#123526; color:var(--green);
  display:flex; align-items:center; gap:14px; font-size:46px; font-weight:600; }
@R .rd .ic { width:50px; height:50px; stroke-width:2.2; }`,
  html: `${TAG}
<h1 class="hd ttl">Dane <span class="g">zapasowe</span></h1>
<div class="qr">${qrSvg(`<path class="dm" d="${dmg}"/><g class="lgo"><rect x="${(VB - LG) / 2}" y="${(VB - LG) / 2}" width="${LG}" height="${LG}" rx="2"/><text x="${VB / 2}" y="${VB / 2 + 1.2}" text-anchor="middle">DELO</text></g>`)}</div>
<div class="chip lv">${icon("shield-check")}poziom H</div>
<div class="chip pc">${icon("triangle-alert")}do ~30% zniszczonych danych</div>
<div class="rd">${icon("check")}działa</div>`,
  js: `
${IN(".ttl", "T(16.2)")}
tl.fromTo($(".qr"), { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.45, ease: E }, T(16.4));
tl.set($(".qr .lgo"), { opacity: 0 }, 0);
tl.set($(".qr .dm"), { opacity: 0 }, 0);
${IN(".lv", "T(18.5)")}
tl.fromTo($(".qr .dm"), { opacity: 0, scale: 0.3, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.5, ease: E }, T(20.5));
${IN(".pc", "T(21.25)")}
tl.fromTo($(".rd"), { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.35, ease: E }, T(22.4));
tl.to($(".qr .dm"), { opacity: 0, duration: 0.3 }, T(23.4));
tl.fromTo($(".qr .lgo"), { opacity: 0, scale: 0.4, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.45, ease: E }, T(24.5));
`,
});

// 5 history: Japan 1994, tracking car parts
scenes.push({
  start: 25.4,
  css: `${BASE}
@R .yr { position:absolute; left:0; right:0; top:450px; line-height:1; text-align:center; font-size:230px; font-weight:700; letter-spacing:-0.04em; color:var(--yellow); }
@R .who { position:absolute; left:0; right:0; top:730px; text-align:center; font-size:44px; color:var(--muted); }
@R .car { position:absolute; left:110px; right:110px; top:830px; height:130px; border-radius:30px; background:var(--panel); border:1.5px solid var(--line);
  display:flex; align-items:center; gap:22px; padding:0 32px; font-size:42px; white-space:nowrap; }
@R .car .ic { width:60px; height:60px; color:var(--green); stroke-width:1.6; flex:none; }
@R .belt { position:absolute; left:80px; right:80px; top:1180px; height:10px; border-radius:5px; background:#24302b; }
@R .pk { position:absolute; top:1040px; width:130px; height:130px; border-radius:20px; background:#3a2f1a; border:2px solid #6b5a1a;
  display:flex; align-items:center; justify-content:center; }
@R .pk i { display:block; width:58px; height:58px; border-radius:6px; background:#f4f7f5; padding:6px; }
@R .pk .ic { width:46px; height:46px; color:#0b0e0d; stroke-width:2.2; }`,
  html: `${TAG}
<h1 class="hd ttl">Skąd się wziął <span class="g" style="white-space:nowrap">kod QR</span>?</h1>
<div class="yr mono">1990</div>
<div class="who">Japonia, firma Denso</div>
<div class="car">${icon("car")}śledzenie części samochodowych</div>
<div class="belt"></div>
${[0, 1, 2, 3].map((i) => `<div class="pk" style="left:${120 + i * 230}px"><i>${icon("qr-code")}</i></div>`).join("")}`,
  js: `
${IN(".ttl", "T(25.55)")}
tl.fromTo($(".yr"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, T(26.4));
count(".yr", 1990, 1994, T(26.5), 0.9, function (v) { return String(Math.round(v)); });
${IN(".who", "T(27.1)")}
${IN(".car", "T(29.45)")}
tl.fromTo($(".belt"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, T(29.7));
tl.fromTo($(".pk"), { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.4, ease: E, stagger: 0.1 }, T(29.8));
tl.to($(".pk"), { x: 90, duration: 1.4, ease: "none" }, T(30.25));
`,
});

// 6 warning: a QR can lead anywhere, check the real domain before typing anything
scenes.push({
  start: 31.2,
  css: `${BASE}
@R .ph { position:absolute; left:200px; right:200px; top:450px; height:620px; border-radius:56px; background:var(--panel); border:2.5px solid var(--line); }
@R .ph .sc { position:absolute; left:0; right:0; top:40px; display:flex; justify-content:center; align-items:center; gap:14px; font-size:38px; color:var(--muted); }
@R .ph .sc .ic { width:46px; height:46px; }
@R .ph .url { position:absolute; left:40px; right:40px; top:130px; padding:22px 28px; border-radius:24px; background:#0e1311; border:1.5px solid var(--line); font-size:40px; line-height:1.3; }
@R .ph .url .r { color:var(--yellow); font-weight:500; }
@R .ph .lab { position:absolute; left:40px; right:40px; top:330px; font-size:34px; color:var(--yellow); text-align:right; }
@R .ph .inp { position:absolute; left:40px; right:40px; top:420px; height:110px; border-radius:24px; background:#0e1311; border:1.5px solid var(--line);
  display:flex; align-items:center; padding:0 28px; font-size:44px; color:var(--muted); }
@R .ph .x { position:absolute; right:60px; top:440px; width:70px; height:70px; border-radius:50%; background:#3a1d1a; color:#ff6b5b; display:flex; align-items:center; justify-content:center; }
@R .ph .x .ic { width:44px; height:44px; stroke-width:2.6; }
@R .chk { left:240px; top:1120px; color:var(--yellow); border-color:#6b5a1a; }`,
  html: `${TAG}
<h1 class="hd ttl"><span class="y">Uwaga</span></h1>
<div class="ph"><div class="sc">${icon("scan-qr-code")}zeskanowano</div>
<div class="url mono">twoj-bank.pl.<br><span class="r">weryfikacja.xyz</span></div>
<div class="lab">prawdziwa domena ↑</div>
<div class="inp mono">hasło: ••••••</div><div class="x">${icon("x")}</div></div>
<div class="chip chk">${icon("eye")}sprawdź adres</div>`,
  js: `
${IN(".ttl", "T(31.4)")}
${IN(".ph", "T(31.7)")}
tl.fromTo($(".ph .url"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.35, ease: E }, T(32.3));
tl.fromTo($(".ph .lab"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, T(32.9));
tl.fromTo($(".ph .inp"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.35, ease: E }, T(33.6));
tl.fromTo($(".ph .x"), { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.3, ease: E }, T(34.2));
${IN(".chk", "T(34.85)")}
`,
});

// 7 CTA
scenes.push({
  start: 35.8,
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
<div class="pre"><span class="g">kody QR</span> i automatyzacje dla firm</div>
<h1 class="hd logo">DELO<br><span class="g">COMPANY</span></h1>
<div class="what"><span class="chip">strony www</span><span class="chip g">automatyzacje</span></div>
<div class="fl">${icon("plus")}Obserwuj</div>`,
  js: `
${IN(".pre", "T(35.95)")}
tl.fromTo($(".logo"), { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.6, ease: E }, T(38.3));
tl.fromTo($(".chip"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4, ease: E, stagger: 0.2 }, T(38.75));
tl.fromTo($(".fl"), { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.45, ease: E }, T(39.45));
tl.fromTo($(".fl"), { scale: 1 }, { scale: 1.05, duration: 0.18, ease: "power2.out", yoyo: true, repeat: 1 }, T(40.1));
`,
});

build({
  title: "Jak działa kod QR",
  music: 0.11,
  tail: 0.9,
  scenes,
  replace: [
    [["ku", "er"], "QR"],
    [["trzydziestu", "procent"], "30%"],
    [["tysiąc", "dziewięćset", "dziewięćdziesiątym", "czwartym"], "1994"],
    [["kompani"], "Company"],
  ],
  sfx: [
    ["click-soft", 0.5, 0.365, 0.4, 13],
    ["pop", 10.0, 0.72, 0.28, 13],
    ["pop", 22.4, 0.72, 0.3, 14],
    ["pop", 24.5, 0.72, 0.28, 13],
    ["click-soft", 34.2, 0.365, 0.45, 13],
    ["chime", 38.3, 2.5, 0.2, 15],
  ],
});
