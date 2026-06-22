"use client";

import { useEffect, useState } from "react";

export default function CursorFollower() {
  const [x, setX] = useState(50);

  useEffect(() => {
    let target = 50;
    let current = 50;

    const onMove = (e: MouseEvent) => {
      target = (e.clientX / window.innerWidth) * 100;
    };

    const tick = () => {
      current += (target - current) * 0.04;
      setX(current);
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    let raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <img
      src="/uploads/dsCCHSS.png"
      alt=""
      className="fixed bottom-2 pointer-events-none z-[9999] w-10 h-auto opacity-30"
      style={{ left: `${x}%`, transform: "translateX(-50%)" }}
    />
  );
}
