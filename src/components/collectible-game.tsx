"use client";

import { useEffect, useRef, useState } from "react";
import { cursorPos } from "@/lib/cursor-pos";

let audioCtx: AudioContext | null = null;

function playCollectSound() {
  if (!audioCtx) audioCtx = new AudioContext();
  if (audioCtx.state === "suspended") audioCtx.resume();
  const now = audioCtx.currentTime;

  [523.25, 659.25, 783.99].forEach((freq, i) => {
    const osc = audioCtx!.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now + i * 0.06);
    const g = audioCtx!.createGain();
    g.gain.setValueAtTime(0, now + i * 0.06);
    g.gain.linearRampToValueAtTime(0.08, now + i * 0.06 + 0.04);
    g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.6);
    osc.connect(g);
    g.connect(audioCtx!.destination);
    osc.start(now + i * 0.06);
    osc.stop(now + i * 0.06 + 0.6);
  });
}

function randPos() {
  return {
    x: 5 + Math.random() * 85,
    y: 8 + Math.random() * 75,
  };
}

const COLLECT_DIST = 7;

export default function CollectibleGame() {
  const [count, setCount] = useState(0);
  const [ball, setBall] = useState(randPos);
  const ballRef = useRef(ball);
  const [pop, setPop] = useState(false);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    setShowHint(false);
  }, []);

  useEffect(() => {
    let raf: number;
    const tick = () => {
      const cx = cursorPos.x;
      const cy = cursorPos.y;
      const b = ballRef.current;
      const dx = cx - (b.x + 0.5);
      const dy = cy - (b.y + 0.5);
      if (dx * dx + dy * dy < COLLECT_DIST * COLLECT_DIST) {
        playCollectSound();
        const next = randPos();
        ballRef.current = next;
        setBall(next);
        setCount((c) => c + 1);
        setPop(true);
        setTimeout(() => setPop(false), 200);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      <div
        className="fixed pointer-events-none z-[9998] flex items-center justify-center"
        style={{ left: `${ball.x}%`, top: `${ball.y}%` }}
      >
        <div
          className={`rounded-full transition-transform duration-150 ${pop ? "scale-150 opacity-0" : "scale-100 opacity-100"}`}
          style={{
            width: "14px",
            height: "14px",
            background: "radial-gradient(circle at 35% 35%, #8f8, #080)",
            boxShadow: "0 0 10px rgba(0,200,0,0.7)",
          }}
        />
      </div>
      {showHint && (
        <div
          className="fixed pointer-events-none z-[9998] animate-bounce"
          style={{
            left: `${ball.x + 0.5}%`,
            top: `${ball.y - 3}%`,
            transform: "translate(-50%, -100%)",
          }}
        >
          <span className="text-[10px] text-[var(--text-faint)] font-heading tracking-[1px] whitespace-nowrap">▼ el pajaro puede comerlo</span>
        </div>
      )}
      <div className="fixed top-4 left-4 z-[9999] font-heading text-xs tracking-[3px] text-[var(--parch)] bg-[var(--ink2)] border border-[var(--mag)]/20 rounded px-3 py-1.5 select-none">
        ✦ {count}
      </div>
    </>
  );
}
