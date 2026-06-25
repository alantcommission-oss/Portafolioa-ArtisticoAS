"use client";

import { useEffect, useState } from "react";
import BallGame from "./ball-game";

interface Props {
  onBack: () => void;
}

export default function GameMode({ onBack }: Props) {
  const [puntos, setPuntos] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onBack();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onBack]);

  const handleGamePoints = (pts: number) => {
    const stored = sessionStorage.getItem("promo_instagram");
    if (!stored) return;
    fetch("/api/promo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "game-score", instagram: stored, points: pts }),
    }).then(r => r.json()).then(d => {
      if (d.points) setPuntos(d.points);
    }).catch(() => {});
  };

  return (
    <>
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999]">
        <div className="font-heading text-[11px] tracking-[3px] text-[var(--parch)] bg-[var(--ink2)]/80 border border-[var(--mag)]/30 rounded px-4 py-2 whitespace-nowrap text-center">
          🎯 Atrapá las pelotitas — sumá puntos para la promo
        </div>
      </div>

      <div className="fixed top-14 left-4 z-[9999]">
        <button onClick={onBack} className="isaac-btn !text-[11px] !px-3 !py-1">
          ← Menú
        </button>
      </div>

      {puntos > 0 && (
        <div className="fixed top-4 right-4 z-[9999] font-heading text-xs tracking-[2px] text-[var(--mag)] bg-[var(--ink2)]/80 border border-[var(--mag)]/30 rounded px-3 py-1.5">
          🏆 {puntos}
        </div>
      )}

      <div className="fixed inset-0 z-[9995] flex items-center justify-center pointer-events-none">
        <div className="pointer-events-auto w-full max-w-lg px-4">
          <BallGame onPoints={handleGamePoints} />
        </div>
      </div>
    </>
  );
}
