"use client";

import { useLang } from "@/lib/i18n/language-context";

export default function TitleScreen({ onStart }: { onStart: () => void }) {
  const { t, lang, toggle } = useLang();

  return (
    <div className="page visible flex flex-col items-center justify-center gap-8 z-10">
      {/* crow */}
      <div className="relative mb-2">
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-3 rounded-full bg-black/30 shadow-pulse" />
        <svg
          className="crow-bob title-crow"
          width="110" height="120" viewBox="0 0 130 140"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse cx="65" cy="98" rx="30" ry="32" fill="#5a003f" />
          {[48,52,57,65,73,78,82].map((x, i) => (
            <line key={i} x1={x} y1={78 + i * 2 * 0} x2={x - Math.sign(x - 65) * (i % 2 === 0 ? 6 : 3)} y2={66 + i} stroke="#7a0055" strokeWidth="1.5" strokeLinecap="round" />
          ))}
          <path d="M35 103 Q12 80 22 57 Q36 76 50 88Z" fill="#3d0028" />
          <path d="M95 103 Q118 80 108 57 Q94 76 80 88Z" fill="#3d0028" />
          <circle cx="65" cy="52" r="25" fill="#B30089" />
          <path d="M58 33 Q55 17 60 8 Q63 21 65 29Z" fill="#cc00a0" />
          <path d="M65 31 Q65 13 67 5 Q70 19 68 29Z" fill="#e800b8" />
          <path d="M71 33 Q74 17 70 8 Q68 21 66 29Z" fill="#cc00a0" />
          <circle cx="57" cy="48" r="7" fill="#0e0018" />
          <circle cx="57" cy="48" r="5" fill="#1c0028" />
          <circle cx="55" cy="46" r="2.5" fill="#ff40d0" opacity="0.9" />
          <circle cx="54.2" cy="45.2" r="1" fill="#fff" opacity="0.95" />
          <path d="M51 128 Q43 140 48 147" stroke="#3d0028" strokeWidth="8" strokeLinecap="round" fill="none" />
          <path d="M60 131 Q57 143 60 148" stroke="#4d0034" strokeWidth="8" strokeLinecap="round" fill="none" />
          <path d="M68 131 Q68 143 70 148" stroke="#4d0034" strokeWidth="8" strokeLinecap="round" fill="none" />
          <path d="M77 130 Q82 141 80 147" stroke="#3d0028" strokeWidth="8" strokeLinecap="round" fill="none" />
        </svg>
      </div>

      {/* title */}
      <div className="text-center space-y-3">
        <p className="font-heading text-[10px] tracking-[6px] text-[var(--mag)] uppercase">
          Portafolio de Dibujos
        </p>
        <h1 className="font-heading text-[clamp(28px,5vw,42px)] font-black tracking-[4px] text-[var(--parch)] leading-none">
          Alant<span className="text-[var(--mag)]">Art</span>
        </h1>
        <div className="mag-divider !w-[140px]" />
        <p className="text-[13px] tracking-[3px] text-[var(--text-faint)] italic">
          {t("subtitle")}
        </p>
      </div>

      {/* buttons */}
      <div className="flex flex-col items-center gap-3 mt-4">
        <button onClick={onStart} className="isaac-btn primary">
          {t("start")}
        </button>
        <button onClick={toggle} className="isaac-btn !text-[11px]">
          {lang === "es" ? "English" : "Español"}
        </button>
      </div>

      <p className="absolute bottom-8 text-[10px] tracking-[4px] text-[var(--text-faint)] italic animate-pulse">
        ◆ &nbsp; {t("start")} &nbsp; ◆
      </p>
    </div>
  );
}
