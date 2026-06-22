"use client";

import { useState, useEffect } from "react";

export default function KeyboardTutorial() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-16 left-1/2 -translate-x-1/2 z-[9998] flex flex-col items-center gap-2 pointer-events-none">
      <div className="bg-[var(--ink2)] border border-[var(--mag)]/30 rounded-lg px-4 py-2 text-center shadow-[0_0_20px_rgba(179,0,137,0.15)] animate-fade-in">
        <p className="font-heading text-[10px] tracking-[2px] text-[var(--parch)]">
          W A S D — mover personaje
        </p>
      </div>
      <div className="bg-[var(--ink2)] border border-[var(--mag)]/30 rounded-lg px-4 py-2 text-center shadow-[0_0_20px_rgba(179,0,137,0.15)]">
        <p className="font-heading text-[10px] tracking-[2px] text-[var(--parch)]">
          ESC — volver
        </p>
      </div>
      <div className="relative w-4 h-4">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-transparent border-t-[var(--mag)]/30" />
      </div>
    </div>
  );
}
