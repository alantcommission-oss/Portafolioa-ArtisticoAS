"use client";

import { useState, useEffect } from "react";
import { useLang } from "@/lib/i18n/language-context";

interface Artwork {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string;
  tags: string[];
  position: number;
}

interface Props {
  onBack: () => void;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function GalleryScreen({ onBack }: Props) {
  const { t } = useLang();
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [selected, setSelected] = useState<Artwork | null>(null);
  const [related, setRelated] = useState<Artwork[]>([]);

  useEffect(() => {
    fetch("/api/admin/artworks")
      .then((r) => r.ok ? r.json() : [])
      .then((data: Artwork[]) => {
        const shuffled = shuffle(data);
        setArtworks(shuffled.slice(0, 12));
      });
  }, []);

  function openDetail(art: Artwork) {
    setSelected(art);
    const others = artworks.filter((a) => a.id !== art.id);
    setRelated(shuffle(others).slice(0, 4));
  }

  return (
    <div className="page visible flex flex-col items-center z-10 px-4 overflow-y-auto py-10">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="font-heading text-xs tracking-[5px] text-[var(--mag)] uppercase mb-4">
            {t("gallery_title")}
          </h2>
          <button onClick={onBack} className="isaac-btn !text-[11px] !p-2">
            ← {t("back")}
          </button>
        </div>

        {artworks.length === 0 ? (
          <p className="text-center text-[11px] text-[var(--text-faint)] italic mt-12">
            {t("gallery_empty")}
          </p>
        ) : (
          <>
            {/* masonry grid */}
            <div className="gallery-masonry">
              {artworks.map((art) => (
                <div
                  key={art.id}
                  onClick={() => openDetail(art)}
                  className="break-inside-avoid rounded overflow-hidden border border-[#2a1a20] hover:border-[var(--mag)] hover:scale-[1.03] transition-all duration-300 cursor-pointer group relative"
                >
                  <img
                    src={art.imageUrl}
                    alt={art.title}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-end p-3">
                    <span className="font-heading text-[10px] tracking-[2px] text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      {art.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* detail modal */}
            {selected && (
              <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-4" onClick={() => setSelected(null)}>
                <div className="bg-[var(--ink)] border border-[var(--mag)]/30 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                  <img src={selected.imageUrl} alt={selected.title} className="w-full object-cover max-h-[50vh] rounded-t-lg" />
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-heading text-xs tracking-[3px] text-[var(--mag)]">{selected.title}</h3>
                      <button onClick={() => setSelected(null)} className="text-[var(--text-faint)] hover:text-[var(--mag)] text-sm">✕</button>
                    </div>
                    {selected.description && (
                      <p className="text-xs text-[var(--parch-dim)] mb-3">{selected.description}</p>
                    )}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {selected.tags.map((tag) => (
                        <span key={tag} className="text-[9px] px-2 py-0.5 rounded bg-[var(--mag)]/10 text-[var(--mag)] border border-[var(--mag)]/20">{tag}</span>
                      ))}
                    </div>

                    {/* related */}
                    {related.length > 0 && (
                      <div>
                        <p className="font-heading text-[9px] tracking-[3px] text-[var(--text-faint)] uppercase mb-2">Relacionados</p>
                        <div className="grid grid-cols-4 gap-2">
                          {related.map((r) => (
                            <button key={r.id} onClick={() => openDetail(r)}
                              className="rounded overflow-hidden border border-[#2a1a20] hover:border-[var(--mag)] transition-all">
                              <img src={r.imageUrl} alt={r.title} className="w-full aspect-square object-cover" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
