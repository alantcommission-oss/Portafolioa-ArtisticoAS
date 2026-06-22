"use client";

import { useRef, useState, useCallback } from "react";

const MELODY = [
  { f: 523.25, i: "piano" },
  { f: 587.33, i: "xylo" },
  { f: 659.25, i: "piano" },
  { f: 783.99, i: "xylo" },
  { f: 880.00, i: "piano" },
  { f: 1046.50, i: "xylo" },
  { f: 880.00, i: "piano" },
  { f: 783.99, i: "xylo" },
  { f: 659.25, i: "piano" },
  { f: 587.33, i: "xylo" },
  { f: 523.25, i: "piano" },
  { f: 659.25, i: "xylo" },
  { f: 783.99, i: "piano" },
  { f: 880.00, i: "xylo" },
  { f: 1046.50, i: "piano" },
  { f: 1174.66, i: "xylo" },
  { f: 1046.50, i: "piano" },
  { f: 880.00, i: "xylo" },
  { f: 783.99, i: "piano" },
  { f: 659.25, i: "xylo" },
  { f: 587.33, i: "piano" },
  { f: 523.25, i: "xylo" },
  { f: 440.00, i: "piano" },
  { f: 523.25, i: "xylo" },
  { f: 659.25, i: "piano" },
  { f: 783.99, i: "xylo" },
  { f: 880.00, i: "piano" },
  { f: 659.25, i: "xylo" },
  { f: 783.99, i: "piano" },
  { f: 1046.50, i: "xylo" },
  { f: 880.00, i: "piano" },
  { f: 659.25, i: "xylo" },
  { f: 587.33, i: "piano" },
  { f: 523.25, i: "xylo" },
  { f: 440.00, i: "piano" },
  { f: 392.00, i: "xylo" },
  { f: 440.00, i: "piano" },
  { f: 523.25, i: "xylo" },
  { f: 587.33, i: "piano" },
  { f: 659.25, i: "xylo" },
  { f: 783.99, i: "piano" },
  { f: 880.00, i: "xylo" },
  { f: 1046.50, i: "piano" },
  { f: 880.00, i: "xylo" },
  { f: 783.99, i: "piano" },
  { f: 659.25, i: "xylo" },
  { f: 587.33, i: "piano" },
  { f: 523.25, i: "xylo" },
];

const DRONE_NOTES = [261.63, 329.63, 392.00, 440.00];

let ctx: AudioContext | null = null;

function playPiano(now: number, freq: number) {
  if (!ctx) return;
  [1, 2.01, 3.02].forEach((mult, i) => {
    const osc = ctx!.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq * mult, now);
    const g = ctx!.createGain();
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(i === 0 ? 0.06 : 0.015, now + 0.08);
    g.gain.linearRampToValueAtTime(0.03, now + 0.4);
    g.gain.exponentialRampToValueAtTime(0.001, now + 1.1);
    osc.connect(g);
    g.connect(ctx!.destination);
    osc.start(now);
    osc.stop(now + 1.1);
  });
}

function playXylo(now: number, freq: number) {
  if (!ctx) return;
  const osc = ctx!.createOscillator();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(freq, now);
  osc.frequency.linearRampToValueAtTime(freq * 1.0015, now + 0.04);
  const g = ctx!.createGain();
  g.gain.setValueAtTime(0, now);
  g.gain.linearRampToValueAtTime(0.05, now + 0.01);
  g.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
  osc.connect(g);
  g.connect(ctx!.destination);
  osc.start(now);
  osc.stop(now + 0.4);
}

let droneNodes: OscillatorNode[] = [];
let droneGains: GainNode[] = [];

function startDrone() {
  if (!ctx) return;
  const now = ctx.currentTime;
  droneGains = [];
  DRONE_NOTES.forEach((freq) => {
    const osc = ctx!.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now);
    const g = ctx!.createGain();
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(0.006, now + 5);
    osc.connect(g);
    g.connect(ctx!.destination);
    osc.start(now);
    droneNodes.push(osc);
    droneGains.push(g);
  });
}

function stopDrone() {
  if (!ctx) return;
  const now = ctx.currentTime;
  droneGains.forEach((g) => {
    try { g.gain.linearRampToValueAtTime(0, now + 1); } catch {}
  });
  setTimeout(() => {
    droneNodes.forEach((osc) => { try { osc.stop(); } catch {} });
    droneNodes = [];
    droneGains = [];
  }, 1100);
}

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const state = useRef({ idx: 0, stopped: false });
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const stop = useCallback(() => {
    state.current.stopped = true;
    if (timerRef.current) clearTimeout(timerRef.current);
    stopDrone();
  }, []);

  const playNote = useCallback(() => {
    if (state.current.stopped || !ctx) return;
    const now = ctx.currentTime;
    const note = MELODY[state.current.idx];
    state.current.idx = (state.current.idx + 1) % MELODY.length;

    if (note.i === "piano") playPiano(now, note.f);
    else playXylo(now, note.f);

    timerRef.current = setTimeout(playNote, 520 + Math.random() * 160);
  }, []);

  const toggle = useCallback(() => {
    if (playing) {
      stop();
      setPlaying(false);
      return;
    }
    if (!ctx) ctx = new AudioContext();
    if (ctx.state === "suspended") ctx.resume();
    state.current.stopped = false;
    state.current.idx = 0;
    setPlaying(true);
    startDrone();
    playNote();
  }, [playing, playNote, stop]);

  return (
    <button
      onClick={toggle}
      className="fixed top-4 right-4 z-[9999] w-10 h-10 flex items-center justify-center rounded-full border border-[var(--mag)]/30 bg-[var(--ink2)] hover:bg-[var(--mag-dim)] transition-all hover:scale-110"
      title={playing ? "Detener música" : "Iniciar música"}
    >
      <span className="text-[var(--parch-mid)] text-lg leading-none">
        {playing ? "♫" : "♪"}
      </span>
    </button>
  );
}
