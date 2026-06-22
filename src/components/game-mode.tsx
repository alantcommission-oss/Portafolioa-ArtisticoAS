"use client";

import { useEffect } from "react";

interface Props {
  onBack: () => void;
  count: number;
}

export default function GameMode({ onBack, count }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onBack();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onBack]);

  return (
    <>
      <div className="fixed top-4 left-4 z-[9999] flex items-center gap-2 pointer-events-none">
        <button
          onClick={onBack}
          className="pointer-events-auto isaac-btn !text-[11px] !px-3 !py-1.5"
        >
          ← Menú
        </button>
        <span className="font-heading text-[10px] tracking-[2px] text-[var(--text-faint)]">
          ESC
        </span>
      </div>

      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none">
        <div className="font-heading text-[11px] tracking-[3px] text-[var(--parch)] bg-[var(--ink2)]/80 border border-[var(--mag)]/30 rounded px-4 py-2 whitespace-nowrap text-center">
          Pasá el pájaro sobre la pelotita ✦ {count}
        </div>
      </div>
    </>
  );
}
