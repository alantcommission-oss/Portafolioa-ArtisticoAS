"use client";

import { useRef, useState, useCallback } from "react";

const MELODY = [
  { f: 523.25, i: "piano" },
  { f: 587.33, i: "xylo" },
  { f: 659.25, i: "piano" },
  { f: 783.99, i: "xylo" },
  { f: 880.00, i: "piano" },
  { f: 783.99, i: "xylo" },
  { f: 659.25, i: "piano" },
  { f: 587.33, i: "xylo" },
  { f: 523.25, i: "piano" },
  { f: 659.25, i: "xylo" },
  { f: 783.99, i: "piano" },
  { f: 880.00, i: "xylo" },
  { f: 1046.50, i: "xylo" },
  { f: 880.00, i: "piano" },
  { f: 783.99, i: "xylo" },
  { f: 659.25, i: "piano" },
  { f: 587.33, i: "xylo" },
  { f: 523.25, i: "piano" },
  { f: 659.25, i: "xylo" },
  { f: 783.99, i: "piano" },
  { f: 880.00, i: "xylo" },
  { f: 1046.50, i: "xylo" },
  { f: 880.00, i: "piano" },
  { f: 783.99, i: "xylo" },
  { f: 659.25, i: "piano" },
  { f: 587.33, i: "xylo" },
  { f: 523.25, i: "piano" },
];

const DRONE = [261.63, 329.63, 392.00];

let ctx: AudioContext | null = null;

function playPiano(now: number, freq: number) {
  if (!ctx) return;
  [1, 2.01, 3.02].forEach((mult, i) => {
    const osc = ctx!.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq * mult, now);
    const g = ctx!.createGain();
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(i === 0 ? 0.07 : 0.02, now + 0.06);
    g.gain.linearRampToValueAtTime(0.04, now + 0.3);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
    osc.connect(g);
    g.connect(ctx!.destination);
    osc.start(now);
    osc.stop(now + 0.9);
  });
}

function playXylo(now: number, freq: number) {
  if (!ctx) return;
  const osc = ctx!.createOscillator();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(freq, now);
  osc.frequency.linearRampToValueAtTime(freq * 1.002, now + 0.05);
  const g = ctx!.createGain();
  g.gain.setValueAtTime(0, now);
  g.gain.linearRampToValueAtTime(0.06, now + 0.01);
  g.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
  osc.connect(g);
  g.connect(ctx!.destination);
  osc.start(now);
  osc.stop(now + 0.35);
}

let droneNodes: OscillatorNode[] = [];

function startDrone() {
  if (!ctx) return;
  const now = ctx.currentTime;
  DRONE.forEach((freq, i) => {
    const osc = ctx!.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now);
    const g = ctx!.createGain();
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(0.015, now + 2);
    osc.connect(g);
    g.connect(ctx!.destination);
    osc.start(now);
    droneNodes.push(osc);
  });
}

function stopDrone() {
  if (!ctx) return;
  const now = ctx.currentTime;
  droneNodes.forEach((osc) => {
    try {
      osc.frequency.linearRampToValueAtTime(0.01, now + 0.05);
    } catch {}
  });
  droneNodes = [];
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

    timerRef.current = setTimeout(playNote, 550 + Math.random() * 150);
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
