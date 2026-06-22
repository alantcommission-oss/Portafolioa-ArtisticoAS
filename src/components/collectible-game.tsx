"use client";

import { useEffect, useRef, useState } from "react";
import { cursorPos } from "@/lib/cursor-pos";

interface Ball {
  x: number;
  y: number;
}

function randPos() {
  return {
    x: 5 + Math.random() * 85,
    y: 8 + Math.random() * 75,
  };
}

const COLLECT_DIST = 5;

export default function CollectibleGame() {
  const [count, setCount] = useState(0);
  const [ball, setBall] = useState<Ball>(randPos);
  const ballRef = useRef(ball);
  const rafRef = useRef<number>(0);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const tick = () => {
      const cx = cursorPos.x;
      const cy = cursorPos.y;
      const b = ballRef.current;
      const dx = cx - b.x;
      const dy = cy - b.y;
      if (Math.sqrt(dx * dx + dy * dy) < COLLECT_DIST) {
        const next = randPos();
        ballRef.current = next;
        setBall(next);
        setCount((c) => c + 1);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <>
      {/* green ball */}
      <div
        className="fixed pointer-events-none z-[9998] w-[12px] h-[12px] rounded-full"
        style={{
          left: `${ball.x}%`,
          top: `${ball.y}%`,
          background: "radial-gradient(circle at 35% 35%, #8f8, #0a0)",
          boxShadow: "0 0 8px rgba(0,200,0,0.6)",
        }}
      />
      {/* hint arrow */}
      {showHint && (
        <div
          className="fixed pointer-events-none z-[9998] animate-bounce"
          style={{
            left: `${ball.x}%`,
            top: `${ball.y - 3}%`,
            transform: "translate(-50%, -100%)",
          }}
        >
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-[10px] text-[var(--text-faint)] font-heading tracking-[1px] whitespace-nowrap">▼ el pajaro puede comerlo</span>
          </div>
        </div>
      )}
      {/* counter */}
      <div className="fixed top-4 left-4 z-[9999] font-heading text-xs tracking-[3px] text-[var(--parch)] bg-[var(--ink2)] border border-[var(--mag)]/20 rounded px-3 py-1.5 select-none">
        {count} ✦
      </div>
    </>
  );
}
