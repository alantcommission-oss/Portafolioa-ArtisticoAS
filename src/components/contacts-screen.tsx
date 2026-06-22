"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n/language-context";

interface Props {
  onBack: () => void;
}

export default function ContactsScreen({ onBack }: Props) {
  const { t } = useLang();
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  }

  return (
    <div className="page visible flex flex-col items-center justify-center z-10 px-4 overflow-y-auto py-10">
      <div className="w-full max-w-md">
        <button onClick={onBack} className="isaac-btn !text-[11px] !p-2 mb-4">
          ← {t("back")}
        </button>

        <h2 className="font-heading text-xs tracking-[5px] text-[var(--mag)] uppercase text-center mb-8">
          {t("contact_title")}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-10">
          <div className="grid grid-cols-2 gap-3">
            <input type="text" className="contact-input" placeholder={t("contact_placeholder_name")} required />
            <input type="email" className="contact-input" placeholder={t("contact_placeholder_email")} required />
          </div>
          <input type="text" className="contact-input" placeholder={t("contact_placeholder_subject")} required />
          <textarea className="contact-input min-h-[100px] resize-none" placeholder={t("contact_placeholder_message")} required />
          <button type="submit" className="isaac-btn primary w-full !text-center !block">
            {sent ? t("contact_sent") : t("contact_send")}
          </button>
        </form>

        {/* Social */}
        <div className="text-center">
          <div className="mag-divider mb-4" />
          <h3 className="font-heading text-[10px] tracking-[4px] text-[var(--text-faint)] uppercase mb-4">
            {t("contact_social")}
          </h3>
          <div className="flex flex-col gap-3">
            {/* Instagram */}
            <a href="https://www.instagram.com/alan_t.mouse/?hl=es-la" target="_blank" rel="noopener noreferrer"
              className="comm-card flex items-center gap-4 p-4 rounded bg-[var(--ink2)] !border-[#2a1a20] hover:!border-[var(--mag)] transition-all group">
              <span className="text-lg">📸</span>
              <div className="flex-1 text-left">
                <span className="font-heading text-xs tracking-[2px] text-[var(--parch)] group-hover:text-[var(--mag)] transition-colors">Instagram</span>
                <p className="text-[10px] text-[var(--text-faint)]">@alan_t.mouse</p>
              </div>
              <span className="text-[var(--mag)] text-xs opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </a>

            {/* Telegram */}
            <a href="https://t.me/+hWKCNY6LF0JlYjYx" target="_blank" rel="noopener noreferrer"
              className="comm-card flex items-center gap-4 p-4 rounded bg-[var(--ink2)] !border-[#2a1a20] hover:!border-[var(--mag)] transition-all group">
              <span className="text-lg">✈️</span>
              <div className="flex-1 text-left">
                <span className="font-heading text-xs tracking-[2px] text-[var(--parch)] group-hover:text-[var(--mag)] transition-colors">Telegram</span>
                <p className="text-[10px] text-[var(--text-faint)]">@AlanTMouse</p>
              </div>
              <span className="text-[var(--mag)] text-xs opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </a>

            {/* Twitter/X */}
            <a href="https://x.com/alan_candy?t=F7mPuWMxgrRI5HbUswXqAQ&s=09" target="_blank" rel="noopener noreferrer"
              className="comm-card flex items-center gap-4 p-4 rounded bg-[var(--ink2)] !border-[#2a1a20] hover:!border-[var(--mag)] transition-all group">
              <span className="text-lg">🐦</span>
              <div className="flex-1 text-left">
                <span className="font-heading text-xs tracking-[2px] text-[var(--parch)] group-hover:text-[var(--mag)] transition-colors">X / Twitter</span>
                <p className="text-[10px] text-[var(--text-faint)]">@alan_candy</p>
              </div>
              <span className="text-[var(--mag)] text-xs opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
