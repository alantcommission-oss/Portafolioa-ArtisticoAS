"use client";

import { useLang } from "@/lib/i18n/language-context";

export default function TitleScreen({ onStart }: { onStart: () => void }) {
  const { t, lang, toggle } = useLang();

  return (
    <div className="page visible flex flex-col items-center justify-center gap-8 z-10">
      {/* logo */}
      <div className="relative mb-2">
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-3 rounded-full bg-black/30 shadow-pulse" />
        <img
          src="/uploads/dsCCHSS.png"
          alt="AlantArt"
          className="w-[160px] h-auto crow-bob title-crow"
        />
      </div>

      {/* title */}
      <div className="text-center space-y-3">
        <p className="font-heading text-[13px] tracking-[6px] text-[var(--mag)] uppercase">
          Portafolio de Dibujos
        </p>
        <h1 className="font-heading text-[clamp(42px,7vw,60px)] font-black tracking-[4px] text-[var(--parch)] leading-none">
          Alant<span className="text-[var(--mag)]">Art</span>
        </h1>
        <div className="mag-divider !w-[140px]" />
        <p className="text-[16px] tracking-[3px] text-[var(--text-faint)] italic">
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

      <p className="absolute bottom-8 text-[13px] tracking-[4px] text-[var(--text-faint)] italic animate-pulse">
        ◆ &nbsp; {t("start")} &nbsp; ◆
      </p>
    </div>
  );
}
