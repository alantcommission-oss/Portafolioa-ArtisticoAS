"use client";

import { useLang } from "@/lib/i18n/language-context";

interface Props {
  onBack: () => void;
}

const types = [
  { key: "comm_head", desc: "comm_head_desc", price: "comm_headtip", icon: "head" },
  { key: "comm_half", desc: "comm_half_desc", price: "comm_halftip", icon: "half" },
  { key: "comm_full", desc: "comm_full_desc", price: "comm_fulltip", icon: "full" },
];

function TypeIcon({ type }: { type: string }) {
  const w = 32, h = 48;
  if (type === "head") {
    return (
      <svg width={w} height={h} viewBox="0 0 32 52">
        <circle cx="16" cy="18" r="14" fill="none" stroke="#b30089" strokeWidth="1" opacity="0.3" />
        <circle cx="16" cy="16" r="10" fill="#b30089" opacity="0.2" />
        <ellipse cx="16" cy="40" rx="12" ry="7" fill="none" stroke="#b30089" strokeWidth="0.5" opacity="0.2" />
      </svg>
    );
  }
  if (type === "half") {
    return (
      <svg width={w} height={h} viewBox="0 0 32 52">
        <circle cx="16" cy="10" r="8" fill="#b30089" opacity="0.2" />
        <rect x="8" y="18" width="16" height="20" rx="3" fill="none" stroke="#b30089" strokeWidth="0.8" opacity="0.3" />
      </svg>
    );
  }
  return (
    <svg width={w} height={h} viewBox="0 0 32 52">
      <circle cx="16" cy="7" r="6" fill="#b30089" opacity="0.2" />
      <rect x="9" y="13" width="14" height="18" rx="2" fill="none" stroke="#b30089" strokeWidth="0.8" opacity="0.3" />
      <rect x="9" y="31" width="5.5" height="16" rx="2" fill="none" stroke="#b30089" strokeWidth="0.6" opacity="0.2" />
      <rect x="17.5" y="31" width="5.5" height="16" rx="2" fill="none" stroke="#b30089" strokeWidth="0.6" opacity="0.2" />
    </svg>
  );
}

export default function CommissionsScreen({ onBack }: Props) {
  const { t } = useLang();

  return (
    <div className="page visible flex flex-col items-center justify-center z-10 px-4">
      <div className="w-full max-w-md">
        <button onClick={onBack} className="isaac-btn !text-[10px] !p-2 mb-6">
          ← {t("back")}
        </button>

        <h2 className="font-heading text-xs tracking-[5px] text-[var(--mag)] uppercase text-center mb-1">
          {t("menu_comisiones")}
        </h2>
        <div className="mag-divider mb-8" />

        <div className="grid grid-cols-3 gap-3">
          {types.map((type) => (
            <div key={type.key} className="comm-card bg-[var(--ink2)] rounded p-4 flex flex-col items-center gap-3 text-center">
              <TypeIcon type={type.icon} />
              <span className="font-heading text-[11px] tracking-[2px] text-[var(--parch)]">
                {t(type.key)}
              </span>
              <span className="text-[10px] text-[var(--text-faint)] italic">
                {t(type.desc)}
              </span>
              <span className="text-[11px] font-heading tracking-[2px] text-[var(--mag)] mt-auto">
                {t(type.price)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
