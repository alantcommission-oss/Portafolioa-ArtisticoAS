"use client";

import { useEffect } from "react";

interface Props {
  onBack: () => void;
}

export default function GameMode({ onBack }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onBack();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onBack]);

  return (
    <>
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none">
        <div className="font-heading text-[11px] tracking-[3px] text-[var(--parch)] bg-[var(--ink2)]/80 border border-[var(--mag)]/30 rounded px-4 py-2 whitespace-nowrap text-center">
          Pasá el pájaro sobre la pelotita
        </div>
      </div>

      <div className="fixed top-14 left-4 z-[9999] pointer-events-none">
        <button
          onClick={onBack}
          className="pointer-events-auto isaac-btn !text-[11px] !px-3 !py-1"
        >
          ← Menú
        </button>
      </div>
    </>
  );
}
