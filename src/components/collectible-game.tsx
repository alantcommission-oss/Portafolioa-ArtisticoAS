"use client";

import { useEffect, useRef, useState } from "react";
import { cursorPos } from "@/lib/cursor-pos";

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
    const timer = setTimeout(() => setShowHint(false), 6000);
    return () => clearTimeout(timer);
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
