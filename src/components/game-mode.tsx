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
    <div className="fixed inset-0 z-50 flex items-end justify-center pb-8 pointer-events-none">
      <button
        onClick={onBack}
        className="pointer-events-auto isaac-btn !text-[10px] !px-3 !py-1.5 opacity-30 hover:opacity-100 transition-opacity"
      >
        ← Volver
      </button>
    </div>
  );
}
