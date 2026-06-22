"use client";

import { useLang } from "@/lib/i18n/language-context";

interface Props {
  onBack: () => void;
}

const placeholderArtworks = Array.from({ length: 9 }, (_, i) => ({
  id: i,
  title: `Artwork ${i + 1}`,
  color: `hsl(${300 + i * 8}, 30%, ${15 + i * 3}%)`,
}));

export default function GalleryScreen({ onBack }: Props) {
  const { t } = useLang();

  return (
    <div className="page visible flex flex-col items-center justify-center z-10 px-4 overflow-y-auto py-10">
      <div className="w-full max-w-2xl">
        <button onClick={onBack} className="isaac-btn !text-[10px] !p-2 mb-4">
          ← {t("back")}
        </button>

        <h2 className="font-heading text-xs tracking-[5px] text-[var(--mag)] uppercase text-center mb-8">
          {t("gallery_title")}
        </h2>

        <div className="gallery-masonry">
          {placeholderArtworks.map((art) => (
            <div
              key={art.id}
              className="break-inside-avoid rounded overflow-hidden border border-[#2a1a20] hover:border-[var(--mag)] transition-all duration-300 cursor-pointer"
              style={{ background: art.color, aspectRatio: `${0.7 + Math.random() * 0.6}` }}
            >
              <div className="w-full h-full flex items-center justify-center p-4">
                <span className="font-heading text-[10px] tracking-[2px] text-[var(--parch-dim)]">
                  {art.title}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center mt-6 text-[11px] text-[var(--text-faint)] italic">
          {t("gallery_empty")}
        </p>
      </div>
    </div>
  );
}
