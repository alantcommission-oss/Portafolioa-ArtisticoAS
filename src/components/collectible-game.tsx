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
    y: 5 + Math.random() * 80,
  };
}

const BALL_SIZE = 2.5;
const COLLECT_DIST = 4;

export default function CollectibleGame() {
  const [count, setCount] = useState(0);
  const ballsRef = useRef<Ball[]>([randPos(), randPos(), randPos()]);
  const [balls, setBalls] = useState<Ball[]>(ballsRef.current);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const tick = () => {
      const cx = cursorPos.x;
      const cy = cursorPos.y;
      let changed = false;
      const next = ballsRef.current.map((b) => {
        const dx = cx - b.x;
        const dy = cy - b.y;
        if (Math.sqrt(dx * dx + dy * dy) < COLLECT_DIST) {
          changed = true;
          setCount((c) => c + 1);
          return randPos();
        }
        return b;
      });
      if (changed) {
        ballsRef.current = next;
        setBalls([...next]);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <>
      {balls.map((b, i) => (
        <div
          key={i}
          className="fixed pointer-events-none z-[9998] w-[10px] h-[10px] rounded-full"
          style={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            background: "radial-gradient(circle at 35% 35%, #8f8, #0a0)",
            boxShadow: "0 0 6px rgba(0,200,0,0.5)",
          }}
        />
      ))}
      <div className="fixed top-4 left-4 z-[9999] font-heading text-xs tracking-[3px] text-[var(--parch)] bg-[var(--ink2)] border border-[var(--mag)]/20 rounded px-3 py-1.5 select-none">
        {count} ✦
      </div>
    </>
  );
}
