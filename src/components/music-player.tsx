"use client";

import { useRef, useState, useCallback } from "react";

const CHORDS: number[][] = [
  [261.63, 329.63, 392.00, 493.88], // Cmaj7
  [293.66, 349.23, 440.00, 523.25], // Dm7
  [329.63, 392.00, 523.25, 587.33], // Em7
  [261.63, 329.63, 440.00, 523.25], // Am7
  [220.00, 261.63, 329.63, 392.00], // Fmaj7
  [261.63, 329.63, 392.00, 440.00], // C
];

let ctx: AudioContext | null = null;

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const state = useRef({ nodes: [] as OscillatorNode[], gain: null as GainNode | null, chordIdx: 0, stopped: false });
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const stop = useCallback(() => {
    state.current.stopped = true;
    if (timerRef.current) clearTimeout(timerRef.current);
    state.current.nodes.forEach((n) => { try { n.stop(); } catch {} });
    state.current.nodes = [];
    if (state.current.gain) {
      try { state.current.gain.gain.setValueAtTime(0, ctx!.currentTime); } catch {}
    }
  }, []);

  const playChord = useCallback(() => {
    if (state.current.stopped) return;
    if (!ctx) return;
    const now = ctx.currentTime;
    const freqs = CHORDS[state.current.chordIdx];
    state.current.chordIdx = (state.current.chordIdx + 1) % CHORDS.length;

    state.current.nodes.forEach((n) => { try { n.stop(now); } catch {} });

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.06, now + 1);
    gain.gain.linearRampToValueAtTime(0.04, now + 4);
    gain.gain.linearRampToValueAtTime(0, now + 5.5);
    gain.connect(ctx.destination);
    state.current.gain = gain;

    const nodes: OscillatorNode[] = [];
    freqs.forEach((freq) => {
      const osc = ctx!.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);
      const detune = (Math.random() - 0.5) * 0.3;
      osc.detune.setValueAtTime(detune, now);
      const nodeGain = ctx!.createGain();
      nodeGain.gain.setValueAtTime(0.4, now);
      nodeGain.gain.linearRampToValueAtTime(0, now + 5.5);
      osc.connect(nodeGain);
      nodeGain.connect(gain);
      osc.start(now);
      osc.stop(now + 5.5);
      nodes.push(osc);
    });
    state.current.nodes = nodes;

    timerRef.current = setTimeout(playChord, 5500);
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
    state.current.chordIdx = 0;
    setPlaying(true);
    playChord();
  }, [playing, playChord, stop]);

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
