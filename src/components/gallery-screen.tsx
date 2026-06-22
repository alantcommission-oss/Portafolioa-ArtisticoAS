"use client";

import { useState, useEffect, useRef } from "react";
import { useLang } from "@/lib/i18n/language-context";
import Watermark from "@/components/watermark";

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
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [fullSize, setFullSize] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (selected) setSelected(null);
      else onBack();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  useEffect(() => {
    fetch("/api/gallery")
      .then((r) => r.ok ? r.json() : [])
      .then((data: Artwork[]) => {
        const shuffled = shuffle(data);
        setArtworks(shuffled);
      });
  }, []);

  const allTags = [...new Set(artworks.flatMap((a) => a.tags))].sort();
  const filtered = activeTag ? artworks.filter((a) => a.tags.includes(activeTag)) : artworks;

  useEffect(() => {
    if (selected) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [selected]);

  function openDetail(art: Artwork) {
    setSelected(art);
    const others = artworks.filter((a) => a.id !== art.id);
    setRelated(shuffle(others).slice(0, 8));
  }

  function isRevealed(id: string) {
    return revealed.has(id);
  }

  function reveal(id: string) {
    setRevealed((prev) => new Set(prev).add(id));
  }

  function ObscenoOverlay({ id, show }: { id: string; show: boolean }) {
    if (!show) return null;
    return (
      <button
        onClick={(e) => { e.stopPropagation(); reveal(id); }}
        className="absolute inset-0 flex items-center justify-center w-full z-10"
      >
        <span className="text-[11px] tracking-[3px] text-white/70 uppercase font-heading bg-black/50 px-4 py-2 rounded border border-white/20">
          {t("obsceno_click")}
        </span>
      </button>
    );
  }

  return (
    <div className="page visible flex flex-col items-center z-10 px-4 py-10 overflow-y-auto">
      <button onClick={onBack} className="isaac-btn !text-[14px] !px-4 !py-2 mb-6">
        ← {t("back")}
      </button>
      <div className="w-full max-w-5xl">
        <div className="text-center mb-8">
          <h2 className="font-heading text-sm tracking-[5px] text-[var(--mag)] uppercase mb-6">
            {t("gallery_title")}
          </h2>
        </div>

        {artworks.length === 0 ? (
          <p className="text-center text-[11px] text-[var(--text-faint)] italic mt-12">
            {t("gallery_empty")}
          </p>
        ) : (
          <>
            {/* tag filter */}
            {allTags.length > 0 && (
              <div className="flex flex-col items-center gap-2 mb-8">
                <button
                  onClick={() => setActiveTag(null)}
                  className={`px-3 py-1.5 text-xs tracking-wider uppercase font-heading rounded border transition-all ${
                    !activeTag
                      ? "bg-[var(--mag)] text-white border-[var(--mag)]"
                      : "bg-transparent text-[var(--text-faint)] border-[var(--mag)]/20 hover:border-[var(--mag)]/50 hover:text-[var(--mag)]"
                  }`}
                >
                  {t("gallery_all")}
                </button>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(tag)}
                    className={`px-3 py-1.5 text-xs tracking-wider uppercase font-heading rounded border transition-all ${
                      activeTag === tag
                        ? "bg-[var(--mag)] text-white border-[var(--mag)]"
                        : "bg-transparent text-[var(--text-faint)] border-[var(--mag)]/20 hover:border-[var(--mag)]/50 hover:text-[var(--mag)]"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}

            {/* masonry grid */}
            <div className="gallery-masonry">
              {filtered.map((art) => {
                const obsceno = art.tags.includes("obsceno");
                const shown = isRevealed(art.id);
                return (
                  <div
                    key={art.id}
                    onClick={() => obsceno && !shown ? reveal(art.id) : openDetail(art)}
                    className="break-inside-avoid rounded border border-[#2a1a20] hover:border-[var(--mag)] hover:scale-[1.4] hover:z-10 transition-all duration-300 cursor-pointer group relative"
                  >
                    <div className="relative rounded overflow-hidden">
                      <img
                        src={art.imageUrl}
                        alt={art.title}
                        className={`w-full h-auto object-cover ${obsceno && !shown ? "blur-xl brightness-50" : ""}`}
                        loading="lazy"
                      />
                      <Watermark />
                      <ObscenoOverlay id={art.id} show={obsceno && !shown} />
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-end p-3">
                      <span className="font-heading text-[10px] tracking-[2px] text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        {art.title}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* detail modal */}
            {fullSize && selected && (
              <div className="fixed inset-0 z-[300] bg-black/95 flex items-center justify-center p-4" onClick={() => setFullSize(false)}>
                <div className="relative max-w-full max-h-full" onClick={(e) => e.stopPropagation()}>
                  <img src={selected.imageUrl} alt={selected.title} className="max-w-full max-h-[95vh] object-contain" />
                  <Watermark />
                  <button onClick={() => setFullSize(false)} className="absolute top-2 right-2 text-white/60 hover:text-white text-xl">✕</button>
                </div>
              </div>
            )}
            {selected && (
              <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-4" onClick={() => setSelected(null)}>
                <div className="bg-[var(--ink)] border border-[var(--mag)]/30 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                  <div className="relative">
                    {(() => {
                      const obsceno = selected.tags.includes("obsceno");
                      const shown = isRevealed(selected.id);
                      return (
                        <>
                          <img
                            src={selected.imageUrl}
                            alt={selected.title}
                            className={`w-full object-cover max-h-[50vh] rounded-t-lg ${obsceno && !shown ? "blur-xl brightness-50" : ""}`}
                          />
                          <Watermark />
                          <ObscenoOverlay id={selected.id} show={obsceno && !shown} />
                        </>
                      );
                    })()}
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-heading text-xs tracking-[3px] text-[var(--mag)]">{selected.title}</h3>
                      <div className="flex items-center gap-2">
                        <button onClick={() => setFullSize(!fullSize)} className="text-[var(--text-faint)] hover:text-[var(--mag)] text-sm transition-colors" title={t("gallery_fullsize")}>⛶</button>
                        <button onClick={() => setSelected(null)} className="text-[var(--text-faint)] hover:text-[var(--mag)] text-sm">✕</button>
                      </div>
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
                        <p className="font-heading text-[11px] tracking-[3px] text-[var(--text-faint)] uppercase mb-3">{t("gallery_related")}</p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {related.map((r) => {
                            const obsceno = r.tags.includes("obsceno");
                            const shown = isRevealed(r.id);
                            return (
                              <button
                                key={r.id}
                                onClick={() => {
                                  if (obsceno && !shown) { reveal(r.id); return; }
                                  openDetail(r);
                                }}
                                className="relative rounded overflow-hidden border border-[#2a1a20] hover:border-[var(--mag)] hover:scale-110 transition-all duration-300"
                              >
                                <img
                                  src={r.imageUrl}
                                  alt={r.title}
                                  className={`w-full aspect-square object-cover ${obsceno && !shown ? "blur-xl brightness-50" : ""}`}
                                />
                                <Watermark />
                                <ObscenoOverlay id={r.id} show={obsceno && !shown} />
                              </button>
                            );
                          })}
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
