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
    <div className="fixed top-4 left-4 z-[9999] flex items-center gap-3 pointer-events-none">
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
  );
}
