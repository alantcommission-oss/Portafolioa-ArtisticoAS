"use client";

export default function Watermark() {
  return (
    <div className="absolute inset-0 pointer-events-none z-[5] flex items-center justify-center overflow-hidden select-none">
      <span className="text-white/10 text-[clamp(24px,4vw,48px)] font-heading tracking-[6px] uppercase rotate-[-25deg] whitespace-nowrap">
        AlantArt
      </span>
    </div>
  );
}
