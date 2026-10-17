import { writeFileSync } from "node:fs";

// Energetic 124 BPM house-style bed: kick, clap, hats, pumping bass, offbeat stabs, 16th arp.
const SR = 44100;
const DUR = +(process.argv[3] || 64);
const BPM = 124;
const beat = 60 / BPM;
const bar = beat * 4;
const N = Math.floor(SR * DUR);
const hz = (m) => 440 * 2 ** ((m - 69) / 12);

let seed = 12345;
const rnd = () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648) * 2 - 1;

const buf = () => new Float32Array(N);
function biquad(x, type, f, q = 0.707) {
  const w = (2 * Math.PI * f) / SR, c = Math.cos(w), s = Math.sin(w), a = s / (2 * q);
  let b0, b1, b2;
  if (type === "lp") { b0 = (1 - c) / 2; b1 = 1 - c; b2 = (1 - c) / 2; }
  else { b0 = (1 + c) / 2; b1 = -(1 + c); b2 = (1 + c) / 2; }
  const a0 = 1 + a, a1 = -2 * c, a2 = 1 - a;
  let x1 = 0, x2 = 0, y1 = 0, y2 = 0;
  for (let i = 0; i < x.length; i++) {
    const y = (b0 * x[i] + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2) / a0;
    x2 = x1; x1 = x[i]; y2 = y1; y1 = y; x[i] = y;
  }
  return x;
}
const saw = (ph) => 2 * (ph - Math.floor(ph + 0.5));

// Am - F - C - G, one bar each
const prog = [
  [57, 60, 64], // Am
  [53, 57, 60], // F
  [48, 55, 60], // C (C G C)
  [55, 59, 62], // G
];
const roots = [45, 41, 48, 43];
const bars = Math.ceil(DUR / bar);
const chordAt = (b) => prog[b % 4];
const rootAt = (b) => roots[b % 4];

// sidechain gain from the kick (four on the floor)
const duck = (t) => {
  const p = (t % beat) / beat;
  return 0.3 + 0.7 * Math.min(1, p / 0.45) ** 1.6;
};

const kick = buf(), clap = buf(), hat = buf(), bass = buf(), stab = buf(), arp = buf(), pad = buf();

for (let b = 0; b < bars; b++) {
  for (let q = 0; q < 4; q++) {
    const t0 = b * bar + q * beat;
    // kick
    let ph = 0;
    for (let i = 0; i < SR * 0.35; i++) {
      const s = Math.floor(t0 * SR) + i;
      if (s >= N) break;
      const t = i / SR;
      ph += (48 + 110 * Math.exp(-t * 38)) / SR;
      kick[s] += Math.sin(2 * Math.PI * ph) * Math.exp(-t * 7.5) + (i < 200 ? rnd() * 0.3 * (1 - i / 200) : 0);
    }
    // clap on 2 and 4
    if (q === 1 || q === 3) {
      for (let i = 0; i < SR * 0.22; i++) {
        const s = Math.floor(t0 * SR) + i;
        if (s >= N) break;
        const t = i / SR;
        const env = Math.exp(-((t % 0.011) * 300)) * (t < 0.033 ? 1 : 0) + (t >= 0.022 ? Math.exp(-(t - 0.022) * 18) : 0);
        clap[s] += rnd() * env * 0.8;
      }
    }
    // hats on 8ths (offbeat open-ish), 16ths quieter
    for (let k = 0; k < 4; k++) {
      const th = t0 + (k * beat) / 4;
      const off = k === 2;
      const amp = off ? 0.55 : k % 2 ? 0.22 : 0.14;
      const dec = off ? 18 : 45;
      for (let i = 0; i < SR * 0.12; i++) {
        const s = Math.floor(th * SR) + i;
        if (s >= N) break;
        hat[s] += rnd() * amp * Math.exp(-(i / SR) * dec);
      }
    }
  }
  // bass: 8th notes, octave jump on offbeats
  const r = rootAt(b);
  for (let e = 0; e < 8; e++) {
    const te = b * bar + (e * beat) / 2;
    const f = hz(r + (e % 2 ? 12 : 0));
    let ph = 0;
    for (let i = 0; i < SR * (beat / 2) * 0.92; i++) {
      const s = Math.floor(te * SR) + i;
      if (s >= N) break;
      ph += f / SR;
      const t = i / SR;
      bass[s] += saw(ph) * Math.min(1, t / 0.004) * Math.exp(-t * 3) * 0.6;
    }
  }
  // offbeat chord stabs + sustained pad
  const ch = chordAt(b);
  for (let q = 0; q < 4; q++) {
    const ts = b * bar + q * beat + beat / 2;
    for (const m of ch) {
      for (const det of [-0.08, 0.08]) {
        const f = hz(m + 12) * (1 + det / 100);
        let ph = rnd() * 0.5 + 0.5;
        for (let i = 0; i < SR * 0.22; i++) {
          const s = Math.floor(ts * SR) + i;
          if (s >= N) break;
          ph += f / SR;
          const t = i / SR;
          stab[s] += saw(ph) * Math.min(1, t / 0.003) * Math.exp(-t * 14) * 0.18;
        }
      }
    }
  }
  for (const m of ch) {
    for (const det of [-0.12, 0, 0.12]) {
      const f = hz(m) * (1 + det / 100);
      let ph = rnd() * 0.5 + 0.5;
      const s0 = Math.floor(b * bar * SR);
      for (let i = 0; i < SR * bar; i++) {
        const s = s0 + i;
        if (s >= N) break;
        ph += f / SR;
        pad[s] += saw(ph) * 0.05;
      }
    }
  }
  // 16th arp from bar 2
  if (b >= 2) {
    const notes = [ch[0] + 24, ch[1] + 24, ch[2] + 24, ch[1] + 24];
    for (let k = 0; k < 16; k++) {
      const ta = b * bar + (k * beat) / 4;
      const f = hz(notes[k % 4]);
      for (let i = 0; i < SR * 0.16; i++) {
        const s = Math.floor(ta * SR) + i;
        if (s >= N) break;
        const t = i / SR;
        arp[s] += (Math.sin(2 * Math.PI * f * t) + 0.3 * Math.sin(4 * Math.PI * f * t)) * Math.exp(-t * 22) * (k % 4 === 0 ? 0.16 : 0.1);
      }
    }
  }
}

biquad(clap, "hp", 900); biquad(clap, "lp", 4500);
biquad(hat, "hp", 7000);
biquad(bass, "lp", 700); biquad(bass, "hp", 40);
biquad(stab, "lp", 2600); biquad(stab, "hp", 200);
biquad(pad, "lp", 1400); biquad(pad, "hp", 150);
biquad(kick, "lp", 9000);

const L = buf(), R = buf();
let peak = 0;
for (let s = 0; s < N; s++) {
  const t = s / SR;
  const d = duck(t);
  const fade = Math.min(1, t / 0.4) * Math.min(1, (DUR - t) / 2.5);
  const mono = kick[s] * 0.95 + clap[s] * 0.5 + bass[s] * d * 0.75;
  const st = stab[s] * d, pd = pad[s] * d, ar = arp[s] * d, h = hat[s] * 0.5;
  L[s] = (mono + st * 0.9 + pd * 1.1 + ar * 0.7 + h * 0.8) * fade;
  R[s] = (mono + st * 1.1 + pd * 0.9 + ar * 1.1 + h * 1.0) * fade;
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
writeFileSync(process.argv[2] || "music-energy.wav", out);
console.log("ok", DUR, "s");
