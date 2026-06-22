"use client";

import { useEffect, useRef } from "react";
import { cursorPos } from "@/lib/cursor-pos";

export default function CursorFollower() {
  const imgRef = useRef<HTMLImageElement>(null);

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
      cursorPos.x = currentX;
      cursorPos.y = currentY;
      if (imgRef.current) {
        imgRef.current.style.left = `${currentX}%`;
        imgRef.current.style.top = `${currentY}%`;
      }
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
      ref={imgRef}
      src="/uploads/dsCCHSS.png"
      alt=""
      className="fixed pointer-events-none z-[9999] w-10 h-auto opacity-30"
      style={{ left: "50%", top: "95%", transform: "translate(-50%, -50%)" }}
    />
  );
}
