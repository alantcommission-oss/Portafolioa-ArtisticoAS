"use client";

import { useEffect, useState } from "react";

export default function CursorFollower() {
  const [x, setX] = useState(50);
  const [y, setY] = useState(95);

  useEffect(() => {
    let targetX = 50;
    let targetY = 95;
    let currentX = 50;
    let currentY = 95;
    const keys = { w: false, a: false, s: false, d: false };
    const step = 0.8;

    const onMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth) * 100;
      targetY = (e.clientY / window.innerHeight) * 100;
    };

    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k in keys) {
        keys[k as keyof typeof keys] = e.type === "keydown";
      }
    };

    const tick = () => {
      if (keys.a) targetX = Math.max(0, targetX - step);
      if (keys.d) targetX = Math.min(100, targetX + step);
      if (keys.w) targetY = Math.max(0, targetY - step);
      if (keys.s) targetY = Math.min(100, targetY + step);
      currentX += (targetX - currentX) * 0.04;
      currentY += (targetY - currentY) * 0.04;
      setX(currentX);
      setY(currentY);
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKey);
    let raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onKey);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <img
      src="/uploads/dsCCHSS.png"
      alt=""
      className="fixed pointer-events-none z-[9999] w-10 h-auto opacity-30"
      style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
    />
  );
}
