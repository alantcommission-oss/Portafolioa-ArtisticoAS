"use client";

import { useRef, useState, useCallback } from "react";

const NOTES = [
  523.25, 587.33, 659.25, 783.99, 880.00, 1046.50,
  880.00, 783.99, 659.25, 587.33, 523.25, 587.33,
  659.25, 783.99, 659.25, 587.33, 523.25, 587.33,
  659.25, 783.99, 880.00, 1046.50, 880.00, 783.99,
  659.25, 587.33, 523.25,
];

let ctx: AudioContext | null = null;

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const state = useRef({ idx: 0, stopped: false });
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const stop = useCallback(() => {
    state.current.stopped = true;
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const playNote = useCallback(() => {
    if (state.current.stopped || !ctx) return;
    const now = ctx.currentTime;
    const freq = NOTES[state.current.idx];
    state.current.idx = (state.current.idx + 1) % NOTES.length;

    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.25);

    timerRef.current = setTimeout(playNote, 200 + Math.random() * 100);
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
    playNote();
  }, [playing, playNote, stop]);

  return (
    <button
      onClick={toggle}
      className="fixed top-4 right-16 z-[9999] w-10 h-10 flex items-center justify-center rounded-full border border-[var(--mag)]/30 bg-[var(--ink2)] hover:bg-[var(--mag-dim)] transition-all hover:scale-110"
      title={playing ? "Detener música" : "Iniciar música"}
    >
      <span className="text-[var(--parch-mid)] text-lg leading-none">
        {playing ? "♫" : "♪"}
      </span>
    </button>
  );
}
