"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n/language-context";

interface Props {
  onBack: () => void;
}

type Social = { key: string; label: string; placeholder: string };

const socials: Social[] = [
  { key: "instagram", label: "contact_instagram", placeholder: "instagram.com/tuusuario" },
  { key: "twitter", label: "contact_twitter", placeholder: "twitter.com/tuusuario" },
  { key: "telegram", label: "contact_telegram", placeholder: "t.me/tuusuario" },
];

export default function ContactsScreen({ onBack }: Props) {
  const { t } = useLang();
  const [sent, setSent] = useState(false);
  const [socialLinks, setSocialLinks] = useState<Record<string, string>>({});

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  }

  return (
    <div className="page visible flex flex-col items-center justify-center z-10 px-4 overflow-y-auto py-10">
      <div className="w-full max-w-md">
        <button onClick={onBack} className="isaac-btn !text-[10px] !p-2 mb-4">
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
          <div className="space-y-4">
            {socials.map((s) => (
              <div key={s.key}>
                <label className="block text-[10px] tracking-[3px] text-[var(--text-faint)] uppercase mb-1">
                  {t(s.label)}
                </label>
                <input
                  type="text"
                  className="social-input"
                  placeholder={s.placeholder}
                  value={socialLinks[s.key] || ""}
                  onChange={(e) => setSocialLinks((prev) => ({ ...prev, [s.key]: e.target.value }))}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
