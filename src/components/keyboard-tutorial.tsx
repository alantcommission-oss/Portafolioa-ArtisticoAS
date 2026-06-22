"use client";

import { useState, useEffect, useRef } from "react";
import { cursorPos } from "@/lib/cursor-pos";

export default function KeyboardTutorial() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 7000);
    return () => clearTimeout(timer);
  }, []);

  const posRef = useRef({ x: 50, y: 95 });
  const [pos, setPos] = useState({ x: 50, y: 95 });

  useEffect(() => {
    const interval = setInterval(() => {
      const { x, y } = cursorPos;
      if (Math.abs(x - posRef.current.x) > 0.5 || Math.abs(y - posRef.current.y) > 0.5) {
        posRef.current = { x, y };
        setPos({ x, y });
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);

  if (!show) return null;

  const bubbleX = pos.x;
  const bubbleY = Math.max(0, pos.y - 14);

  return (
    <div
      className="fixed z-[9998] pointer-events-none animate-fade-in"
      style={{
        left: `${bubbleX}%`,
        top: `${bubbleY}%`,
        transform: "translate(-50%, -100%)",
      }}
    >
      <div className="bg-[var(--ink2)] border border-[var(--mag)]/30 rounded-lg px-3 py-1.5 text-center shadow-[0_0_20px_rgba(179,0,137,0.15)] whitespace-nowrap">
        <p className="font-heading text-[10px] tracking-[2px] text-[var(--parch)]">
          W A S D — mover · ESC — volver
        </p>
      </div>
      <div className="flex justify-center">
        <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-[var(--mag)]/30" />
      </div>
    </div>
  );
}
