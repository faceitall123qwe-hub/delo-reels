import { writeFileSync } from "node:fs";

// usage: node music-styles.mjs <trap|dnb|phonk> <out.wav> [seconds]
const STYLE = process.argv[2];
const OUT = process.argv[3];
const DUR = +(process.argv[4] || 64);
const SR = 44100;
const N = Math.floor(SR * DUR);
const hz = (m) => 440 * 2 ** ((m - 69) / 12);
let seed = 777;
const rnd = () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648) * 2 - 1;
const buf = () => new Float32Array(N);
const saw = (ph) => 2 * (ph - Math.floor(ph + 0.5));
const sq = (ph) => (ph % 1 < 0.5 ? 1 : -1);

function biquad(x, type, f, q = 0.707) {
  const w = (2 * Math.PI * f) / SR, c = Math.cos(w), s = Math.sin(w), a = s / (2 * q);
  let b0, b1, b2;
  if (type === "lp") { b0 = (1 - c) / 2; b1 = 1 - c; b2 = (1 - c) / 2; }
  else if (type === "hp") { b0 = (1 + c) / 2; b1 = -(1 + c); b2 = (1 + c) / 2; }
  else { b0 = a; b1 = 0; b2 = -a; } // bandpass
  const a0 = 1 + a, a1 = -2 * c, a2 = 1 - a;
  let x1 = 0, x2 = 0, y1 = 0, y2 = 0;
  for (let i = 0; i < x.length; i++) {
    const y = (b0 * x[i] + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2) / a0;
    x2 = x1; x1 = x[i]; y2 = y1; y1 = y; x[i] = y;
  }
  return x;
}
function add(dst, t0, len, fn) {
  const s0 = Math.floor(t0 * SR);
  for (let i = 0; i < len * SR; i++) {
    const s = s0 + i;
    if (s >= N) break;
    if (s >= 0) dst[s] += fn(i / SR);
  }
}
const kickHit = (dst, t0, amp = 1, tail = 7) => {
  let ph = 0;
  add(dst, t0, 0.45, (t) => {
    ph += (45 + 120 * Math.exp(-t * 40)) / SR;
    return amp * (Math.sin(2 * Math.PI * ph) * Math.exp(-t * tail) + (t < 0.004 ? rnd() * 0.3 : 0));
  });
};
const noiseHit = (dst, t0, amp, dec, len = 0.25) => add(dst, t0, len, (t) => rnd() * amp * Math.exp(-t * dec));
const snareHit = (dst, tone, t0, amp = 1) => {
  noiseHit(dst, t0, 0.7 * amp, 16, 0.3);
  add(tone, t0, 0.2, (t) => amp * 0.5 * Math.sin(2 * Math.PI * 190 * t) * Math.exp(-t * 25));
};
// 808 sub with optional glide and saturation
const sub808 = (dst, t0, len, m0, m1 = m0, amp = 0.8, drive = 1.5) => {
  let ph = 0;
  add(dst, t0, len, (t) => {
    const m = m1 === m0 ? m0 : m0 + (m1 - m0) * Math.min(1, t / 0.08);
    ph += hz(m) / SR;
    const env = Math.min(1, t / 0.003) * Math.min(1, (len - t) / 0.05) * Math.exp(-t * 0.9);
    return amp * Math.tanh(drive * Math.sin(2 * Math.PI * ph)) * env;
  });
};
const pluck = (dst, t0, m, amp, dec = 9) => {
  const f = hz(m);
  add(dst, t0, 0.6, (t) => amp * (Math.sin(2 * Math.PI * f * t) + 0.35 * Math.sin(4 * Math.PI * f * t) + 0.12 * Math.sin(6 * Math.PI * f * t)) * Math.exp(-t * dec) * Math.min(1, t / 0.003));
};
const cowbell = (dst, t0, m, amp) => {
  const f1 = hz(m), f2 = f1 * 1.48;
  add(dst, t0, 0.45, (t) => amp * (sq(f1 * t) + sq(f2 * t)) * 0.5 * (t < 0.02 ? 1 : Math.exp(-(t - 0.02) * 9)));
};

const L = buf(), R = buf();
const drums = buf(), tone = buf(), hats = buf(), bass = buf(), mel = buf(), padB = buf();
let duckFn = () => 1;

if (STYLE === "trap") {
  const BPM = 140, b16 = 60 / BPM / 4, bar = b16 * 16;
  const roots = [45, 41, 43, 40]; // A F G E (minor feel)
  const kickSteps = [0, 7, 10];
  const melody = [[69, 0], [72, 3], [76, 6], [74, 8], [72, 11], [71, 14]];
  for (let b = 0; b * bar < DUR; b++) {
    const t0 = b * bar;
    kickSteps.forEach((k) => kickHit(drums, t0 + k * b16, 0.9, 5));
    snareHit(drums, tone, t0 + 8 * b16, 1.1);
    noiseHit(drums, t0 + 8 * b16 + 0.012, 0.5, 30);
    for (let k = 0; k < 16; k += 2) noiseHit(hats, t0 + k * b16, k % 4 ? 0.35 : 0.5, 60, 0.08);
    if (b % 2 === 1) for (let k = 0; k < 8; k++) noiseHit(hats, t0 + 12 * b16 + (k * b16) / 2, 0.28, 80, 0.05);
    const r = roots[b % 4];
    sub808(bass, t0, b16 * 7, r - 12 + 12, r, 0.9, 2.2);
    sub808(bass, t0 + 10 * b16, b16 * 6, r + 7 - 12 + 12, r, 0.8, 2.2);
    if (b >= 1) melody.forEach(([m, st]) => pluck(mel, t0 + st * b16, m - (b % 4 === 1 ? 4 : b % 4 === 2 ? 2 : b % 4 === 3 ? 5 : 0) + 12, 0.16, 7));
  }
} else if (STYLE === "dnb") {
  const BPM = 172, b16 = 60 / BPM / 4, bar = b16 * 16;
  const prog = [[57, 60, 64], [53, 57, 60], [55, 59, 62], [52, 55, 59]];
  for (let b = 0; b * bar < DUR; b++) {
    const t0 = b * bar;
    [0, 10].forEach((k) => kickHit(drums, t0 + k * b16, 1.0, 9));
    [4, 12].forEach((k) => snareHit(drums, tone, t0 + k * b16, 1.0));
    if (b % 2) snareHit(drums, tone, t0 + 15 * b16, 0.45);
    for (let k = 0; k < 16; k += 2) noiseHit(hats, t0 + k * b16 + (k % 4 === 2 ? b16 * 0.15 : 0), k % 4 ? 0.45 : 0.25, 55, 0.07);
    noiseHit(hats, t0 + 14 * b16, 0.35, 12, 0.3);
    const ch = prog[b % 4];
    // reese bass: detuned saws, sustained
    for (const det of [-0.35, 0.35]) {
      let ph = 0;
      add(bass, t0, bar, (t) => { ph += hz(ch[0] - 24) * (1 + det / 100) / SR; return saw(ph) * 0.35 * Math.min(1, t / 0.01); });
    }
    for (const m of ch) for (const det of [-0.1, 0.1]) {
      let ph = 0.3;
      add(padB, t0, bar, (t) => { ph += hz(m) * (1 + det / 100) / SR; return saw(ph) * 0.06; });
    }
    if (b >= 2) for (let k = 0; k < 16; k += 2) pluck(mel, t0 + k * b16, ch[(k / 2) % 3] + 24, 0.1, 14);
  }
  const half = (60 / 172) * 2;
  duckFn = (t) => 0.55 + 0.45 * Math.min(1, (t % half) / half / 0.35);
} else if (STYLE === "phonk") {
  const BPM = 130, b16 = 60 / BPM / 4, bar = b16 * 16;
  const bellPat = [[0, 69], [3, 69], [6, 72], [8, 69], [10, 67], [11, 69], [14, 64]];
  const roots = [45, 45, 41, 43];
  for (let b = 0; b * bar < DUR; b++) {
    const t0 = b * bar;
    [0, 3, 6, 10].forEach((k) => kickHit(drums, t0 + k * b16, 0.85, 6));
    [4, 12].forEach((k) => { snareHit(drums, tone, t0 + k * b16, 0.9); noiseHit(drums, t0 + k * b16 + 0.01, 0.45, 25); });
    for (let k = 0; k < 16; k++) noiseHit(hats, t0 + k * b16, k % 2 ? 0.18 : 0.32, 70, 0.05);
    const r = roots[b % 4];
    sub808(bass, t0, b16 * 6, r, r, 1.0, 4.0);
    sub808(bass, t0 + 6 * b16, b16 * 4, r + 3, r + 3, 0.9, 4.0);
    sub808(bass, t0 + 10 * b16, b16 * 6, r, r, 1.0, 4.0);
    const sh = b % 4 === 2 ? -4 : b % 4 === 3 ? -2 : 0;
    bellPat.forEach(([k, m]) => cowbell(mel, t0 + k * b16, m + sh, 0.22));
  }
}

biquad(hats, "hp", 7500);
biquad(drums, "lp", 9000);
biquad(bass, "lp", STYLE === "dnb" ? 900 : 1600);
biquad(bass, "hp", 32);
biquad(padB, "lp", 1800);
if (STYLE === "phonk") { biquad(mel, "bp", 1100, 1.2); }

let peak = 0;
for (let s = 0; s < N; s++) {
  const t = s / SR;
  const fade = Math.min(1, t / 0.3) * Math.min(1, (DUR - t) / 2.5);
  const d = duckFn(t);
  const mono = drums[s] * 0.85 + tone[s] * 0.6 + bass[s] * 0.8 * d;
  L[s] = (mono + mel[s] * 0.9 * d + padB[s] * 1.1 * d + hats[s] * 0.45) * fade;
  R[s] = (mono + mel[s] * 1.1 * d + padB[s] * 0.9 * d + hats[s] * 0.55) * fade;
  peak = Math.max(peak, Math.abs(L[s]), Math.abs(R[s]));
}
const norm = 0.89 / peak;
const out = Buffer.alloc(44 + N * 4);
out.write("RIFF", 0); out.writeUInt32LE(36 + N * 4, 4); out.write("WAVEfmt ", 8);
out.writeUInt32LE(16, 16); out.writeUInt16LE(1, 20); out.writeUInt16LE(2, 22); out.writeUInt32LE(SR, 24);
out.writeUInt32LE(SR * 4, 28); out.writeUInt16LE(4, 32); out.writeUInt16LE(16, 34); out.write("data", 36); out.writeUInt32LE(N * 4, 40);
for (let s = 0; s < N; s++) {
  out.writeInt16LE(Math.round(Math.max(-1, Math.min(1, L[s] * norm)) * 32767), 44 + s * 4);
  out.writeInt16LE(Math.round(Math.max(-1, Math.min(1, R[s] * norm)) * 32767), 46 + s * 4);
}
writeFileSync(OUT, out);
console.log("ok", STYLE, DUR);
