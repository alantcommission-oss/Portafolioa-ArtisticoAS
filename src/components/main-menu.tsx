"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n/language-context";

interface Props {
  onSelect: (section: string) => void;
}

export default function MainMenu({ onSelect }: Props) {
  const { t } = useLang();
  const [comOpen, setComOpen] = useState(false);

  const items = [
    { id: "commissions", label: t("menu_comisiones"), hasSub: true },
    { id: "gallery", label: t("menu_galeria") },
    { id: "contacts", label: t("menu_contactos") },
  ];

  return (
    <div className="page visible flex flex-col items-center justify-center z-10">
      <div className="w-full max-w-sm px-6">
        <div className="text-center mb-10">
          <h2 className="font-heading text-xs tracking-[6px] text-[var(--mag)] uppercase">
            Alant<span className="text-[var(--parch)]">Art</span>
          </h2>
          <div className="mag-divider mt-2" />
        </div>

        <div className="flex flex-col gap-0.5">
          {items.map((item) => (
            <div key={item.id}>
              <div
                className="menu-item"
                onClick={() => {
                  if (item.hasSub) {
                    setComOpen((prev) => !prev);
                  } else {
                    onSelect(item.id);
                  }
                }}
              >
                <span className="menu-dot" />
                <span className="menu-label">{item.label}</span>
              </div>

              {item.hasSub && (
                <div className={`submenu ${comOpen ? "open" : ""}`}>
                  <div className="sub-item" onClick={() => onSelect("comm-dibujo")}>
                    <span className="sub-label">{t("menu_dibujo")}</span>
                  </div>
                  <div className="sub-item" onClick={() => onSelect("comm-pagina")}>
                    <span className="sub-label">{t("menu_pagina")}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="text-center mt-12 text-[10px] tracking-[4px] text-[var(--text-faint)] italic">
          ◆ &nbsp; {t("start")} &nbsp; ◆
        </p>
      </div>
    </div>
  );
}
