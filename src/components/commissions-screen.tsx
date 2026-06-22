"use client";

import { useState, useRef } from "react";
import { useLang } from "@/lib/i18n/language-context";

interface Props {
  onBack: () => void;
  type: "dibujo" | "pagina";
}

/* ── furry category icons ── */
function FoxIcon() {
  return <svg width="36" height="36" viewBox="0 0 36 36"><path d="M18 30C10 30 4 24 4 16S10 4 18 4s14 6 14 14-6 12-14 12z" fill="none" stroke="#b30089" strokeWidth="1.5"/><circle cx="13" cy="15" r="2.5" fill="#b30089" opacity="0.5"/><circle cx="23" cy="15" r="2.5" fill="#b30089" opacity="0.5"/><path d="M12 10L8 4l6 4M24 10l4-6-6 4M18 20c-3 0-5 2-5 4h10c0-2-2-4-5-4z" fill="none" stroke="#b30089" strokeWidth="1.2" strokeLinecap="round"/><path d="M10 22c-2 1-4 3-4 5s2 2 4 0 2-4 0-5zM26 22c2 1 4 3 4 5s-2 2-4 0-2-4 0-5z" fill="#b30089" opacity="0.3"/></svg>;
}
function WolfIcon() {
  return <svg width="36" height="36" viewBox="0 0 36 36"><path d="M18 28C8 28 4 20 4 12S10 4 18 4s14 4 14 12-4 12-14 12z" fill="none" stroke="#b30089" strokeWidth="1.5"/><circle cx="11" cy="13" r="3" fill="#b30089" opacity="0.4"/><circle cx="25" cy="13" r="3" fill="#b30089" opacity="0.4"/><ellipse cx="11" cy="11" rx="1.5" ry="1" fill="#cc00a0" opacity="0.6"/><ellipse cx="25" cy="11" rx="1.5" ry="1" fill="#cc00a0" opacity="0.6"/><path d="M8 8l-2-4 6 2M28 8l2-4-6 2" fill="none" stroke="#b30089" strokeWidth="1.2"/><path d="M14 22c2 2 6 2 8 0" fill="none" stroke="#b30089" strokeWidth="1.2"/></svg>;
}
function FelineIcon() {
  return <svg width="36" height="36" viewBox="0 0 36 36"><path d="M18 26C8 26 6 18 6 12S12 4 18 4s12 4 12 8-2 14-12 14z" fill="none" stroke="#b30089" strokeWidth="1.5"/><circle cx="12" cy="12" r="2.5" fill="#b30089" opacity="0.5"/><circle cx="24" cy="12" r="2.5" fill="#b30089" opacity="0.5"/><path d="M10 8l-3-5 5 3M26 8l3-5-5 3" fill="none" stroke="#b30089" strokeWidth="1.2" strokeLinecap="round"/><path d="M12 18c0 3 3 6 6 6s6-3 6-6" fill="none" stroke="#b30089" strokeWidth="1"/><path d="M15 22c-1 2-3 4-5 4s-3-1-1-3 4-2 6-1zM21 22c1 2 3 4 5 4s3-1 1-3-4-2-6-1z" fill="#b30089" opacity="0.2"/></svg>;
}
function DragonIcon() {
  return <svg width="36" height="36" viewBox="0 0 36 36"><path d="M18 26c6 0 12-4 12-10S24 4 18 4 6 10 6 16s6 10 12 10z" fill="none" stroke="#b30089" strokeWidth="1.5"/><circle cx="12" cy="13" r="2" fill="#b30089" opacity="0.5"/><circle cx="24" cy="13" r="2" fill="#b30089" opacity="0.5"/><path d="M16 18l2 4 2-4" fill="none" stroke="#b30089" strokeWidth="1.2"/><path d="M8 10l-4-2 5 1M28 10l4-2-5 1" fill="none" stroke="#b30089" strokeWidth="1"/><path d="M12 18c-3 2-6 6-4 8s6-1 8-4zM24 18c3 2 6 6 4 8s-6-1-8-4z" fill="#b30089" opacity="0.15"/></svg>;
}
function OtherIcon() {
  return <svg width="36" height="36" viewBox="0 0 36 36"><circle cx="18" cy="18" r="14" fill="none" stroke="#b30089" strokeWidth="1.5"/><circle cx="12" cy="14" r="2" fill="#b30089" opacity="0.5"/><circle cx="24" cy="14" r="2" fill="#b30089" opacity="0.5"/><path d="M12 22c2 3 10 3 12 0" fill="none" stroke="#b30089" strokeWidth="1.2"/><path d="M13 8l-3-4 5 2M23 8l3-4-5 2" fill="none" stroke="#b30089" strokeWidth="1"/></svg>;
}

/* ── body icons ── */
function BodyIcon({ type }: { type: string }) {
  const s = 28;
  if (type === "head") {
    return <svg width={s} height={s} viewBox="0 0 32 32"><circle cx="16" cy="14" r="10" fill="none" stroke="#b30089" strokeWidth="1.2"/><circle cx="12" cy="12" r="2" fill="#b30089" opacity="0.4"/><circle cx="20" cy="12" r="2" fill="#b30089" opacity="0.4"/><path d="M12 20c2 2 8 2 8 0" fill="none" stroke="#b30089" strokeWidth="1"/></svg>;
  }
  if (type === "half") {
    return <svg width={s} height={s} viewBox="0 0 32 32"><circle cx="16" cy="8" r="6" fill="none" stroke="#b30089" strokeWidth="1.2"/><rect x="8" y="14" width="16" height="14" rx="2" fill="none" stroke="#b30089" strokeWidth="1"/></svg>;
  }
  return <svg width={s} height={s} viewBox="0 0 32 32"><circle cx="16" cy="6" r="5" fill="none" stroke="#b30089" strokeWidth="1.2"/><rect x="10" y="11" width="12" height="10" rx="1.5" fill="none" stroke="#b30089" strokeWidth="1"/><rect x="10" y="21" width="5" height="9" rx="1.5" fill="none" stroke="#b30089" strokeWidth="1"/><rect x="17" y="21" width="5" height="9" rx="1.5" fill="none" stroke="#b30089" strokeWidth="1"/></svg>;
}

export default function CommissionsScreen({ onBack, type }: Props) {
  const { t } = useLang();
  const fileRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState(0);
  const [sent, setSent] = useState(false);

  /* drawing state */
  const [category, setCategory] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [shading, setShading] = useState(false);
  const [hasBg, setHasBg] = useState(false);
  const [extraChar, setExtraChar] = useState(false);
  const [sticker, setSticker] = useState(false);
  const [nsfw, setNsfw] = useState(false);

  /* page state */
  const [pageCat, setPageCat] = useState("");
  const [timeLimit, setTimeLimit] = useState("");
  const [budget, setBudget] = useState("");
  const [purpose, setPurpose] = useState("");

  /* common */
  const [desc, setDesc] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const addFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    setFiles((prev) => [...prev, ...selected].slice(0, 10));
  };

  const removeFile = (i: number) => setFiles((prev) => prev.filter((_, idx) => idx !== i));

  const canSubmit = () => {
    if (type === "dibujo") return category && bodyType && desc && files.length >= 1;
    return pageCat && desc && files.length >= 1;
  };

  const [orderMsg, setOrderMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const orderType = type === "dibujo" ? "Dibujo" : "Página web";
    const details = type === "dibujo"
      ? `Categoría: ${category} | Tipo: ${bodyType} | Shade&Shine: ${shading} | Personaje extra: ${extraChar} | Sticker: ${sticker} | NSFW: ${nsfw} | Fondo: ${hasBg}`
      : `Categoría: ${pageCat} | Tiempo: ${timeLimit} | Presupuesto: ${budget} | Propósito: ${purpose}`;
    const msg = `${details}\n\nDescripción:\n${desc}`;
    const payload = {
      name: "Pedido vía web",
      email: "pedido@alantart.dev",
      subject: `Pedido de comisión: ${orderType}`,
      message: msg,
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setOrderMsg(msg);
        setSent(true);
      }
    } catch {
      alert("Error al enviar el pedido. Intentalo de nuevo.");
    }
  };

  function redirectTo(platform: "telegram" | "instagram" | "gmail") {
    const text = encodeURIComponent(`${orderMsg}\n\n¡Hola Alan! Quiero coordinar esta comisión.`);
    const urls = {
      telegram: `https://t.me/AlanTMouse?text=${text}`,
      instagram: "https://www.instagram.com/alan_t.mouse/",
      gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=alantcommission@gmail.com&body=${text}`,
    };
    window.open(urls[platform], "_blank", "noopener");
  }

  /* ── DRAWING FLOW ── */
  if (type === "dibujo") {
    const furryCats = [
      { id: "fox", icon: <FoxIcon />, label: t("cat_fox") },
      { id: "wolf", icon: <WolfIcon />, label: t("cat_wolf") },
      { id: "feline", icon: <FelineIcon />, label: t("cat_cat") },
      { id: "dragon", icon: <DragonIcon />, label: t("cat_dragon") },
      { id: "other", icon: <OtherIcon />, label: t("cat_other") },
    ];
    const bodyTypes = [
      { id: "head", label: t("comm_head"), sub: t("comm_head_desc"), price: "$10" },
      { id: "half", label: t("comm_half"), sub: t("comm_half_desc"), price: "$15" },
      { id: "full", label: t("comm_full"), sub: t("comm_full_desc"), price: "$20" },
    ];

    return (
      <div className="page visible flex flex-col items-center justify-center z-10 px-4 overflow-y-auto py-10">
        <div className="w-full max-w-lg">
          <button onClick={onBack} className="isaac-btn !text-[11px] !p-2 mb-4">← {t("back")}</button>
          <h2 className="font-heading text-sm tracking-[5px] text-[var(--mag)] uppercase text-center mb-6">{t("menu_dibujo")}</h2>
          <div className="mag-divider mb-6" />

          {/* step 0: furry category */}
          {step === 0 && (
            <div>
              <p className="font-heading text-xs tracking-[3px] text-[var(--parch)] text-center mb-5">{t("select_category")}</p>
              <div className="grid grid-cols-5 gap-2">
                {furryCats.map((c) => (
                  <button key={c.id} onClick={() => { setCategory(c.id); setStep(1); }}
                    className={`comm-card flex flex-col items-center gap-2 p-3 rounded bg-[var(--ink2)] ${category === c.id ? "!border-[var(--mag)]" : "!border-[#2a1a20]"}`}>
                    {c.icon}
                    <span className="font-heading text-[10px] tracking-[2px] text-[var(--parch)]">{c.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* step 1: body type */}
          {step === 1 && (
            <div>
              <p className="font-heading text-xs tracking-[3px] text-[var(--parch)] text-center mb-5">{t("select_body")}</p>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {bodyTypes.map((b) => (
                  <button key={b.id} onClick={() => setBodyType(b.id)}
                    className={`comm-card flex flex-col items-center gap-2 p-4 rounded bg-[var(--ink2)] text-center ${bodyType === b.id ? "!border-[var(--mag)]" : "!border-[#2a1a20]"}`}>
                    <BodyIcon type={b.id} />
                    <span className="font-heading text-xs tracking-[2px] text-[var(--parch)]">{b.label}</span>
                    <span className="text-[10px] text-[var(--text-faint)] italic">{b.sub}</span>
                    <span className="text-xs font-heading tracking-[2px] text-[var(--mag)] mt-auto">{b.price}</span>
                  </button>
                ))}
              </div>
              <button onClick={() => setStep(2)} className="isaac-btn primary w-full !text-center !block">{t("add_ons")} →</button>
            </div>
          )}

          {/* step 2: add-ons */}
          {step === 2 && (
            <div>
              <p className="font-heading text-xs tracking-[3px] text-[var(--parch)] text-center mb-5">{t("add_ons")}</p>
              <div className="space-y-3 mb-6">
                <label className={`comm-card flex items-center gap-4 p-4 rounded bg-[var(--ink2)] cursor-pointer ${shading ? "!border-[var(--mag)]" : "!border-[#2a1a20]"}`}>
                  <input type="checkbox" checked={shading} onChange={() => setShading(!shading)} className="accent-[var(--mag)]" />
                  <div className="flex-1">
                    <span className="font-heading text-xs tracking-[2px] text-[var(--parch)]">{t("shading")}</span>
                    <p className="text-[10px] text-[var(--text-faint)] italic mt-0.5">{t("shading_desc")}</p>
                  </div>
                  <span className="text-xs text-[var(--mag)]">+$5</span>
                </label>
                {/* extra character */}
                <label className={`comm-card flex items-center gap-4 p-4 rounded bg-[var(--ink2)] cursor-pointer ${extraChar ? "!border-[var(--mag)]" : "!border-[#2a1a20]"}`}>
                  <input type="checkbox" checked={extraChar} onChange={() => setExtraChar(!extraChar)} className="accent-[var(--mag)]" />
                  <div className="flex-1">
                    <span className="font-heading text-xs tracking-[2px] text-[var(--parch)]">{t("extra_char")}</span>
                    <p className="text-[10px] text-[var(--text-faint)] italic mt-0.5">{t("extra_char_desc")}</p>
                  </div>
                  <span className="text-xs text-[var(--mag)]">+50%</span>
                </label>
                {/* sticker */}
                <label className={`comm-card flex items-center gap-4 p-4 rounded bg-[var(--ink2)] cursor-pointer ${sticker ? "!border-[var(--mag)]" : "!border-[#2a1a20]"}`}>
                  <input type="checkbox" checked={sticker} onChange={() => setSticker(!sticker)} className="accent-[var(--mag)]" />
                  <div className="flex-1">
                    <span className="font-heading text-xs tracking-[2px] text-[var(--parch)]">{t("sticker")}</span>
                    <p className="text-[10px] text-[var(--text-faint)] italic mt-0.5">{t("sticker_desc")}</p>
                  </div>
                  <span className="text-xs text-[var(--mag)]">$3</span>
                </label>
                {/* nsfw */}
                <label className={`comm-card flex items-center gap-4 p-4 rounded bg-[var(--ink2)] cursor-pointer ${nsfw ? "!border-[var(--mag)]" : "!border-[#2a1a20]"}`}>
                  <input type="checkbox" checked={nsfw} onChange={() => setNsfw(!nsfw)} className="accent-[var(--mag)]" />
                  <div className="flex-1">
                    <span className="font-heading text-xs tracking-[2px] text-[var(--parch)]">NSFW</span>
                    <p className="text-[10px] text-[var(--text-faint)] italic mt-0.5">{t("nsfw_desc")}</p>
                  </div>
                  <span className="text-xs text-[var(--mag)]">+$9</span>
                </label>
                {/* bg */}
                <label className={`comm-card flex items-center gap-4 p-4 rounded bg-[var(--ink2)] cursor-pointer ${hasBg ? "!border-[var(--mag)]" : "!border-[#2a1a20]"}`}>
                  <input type="checkbox" checked={hasBg} onChange={() => setHasBg(!hasBg)} className="accent-[var(--mag)]" />
                  <div className="flex-1">
                    <span className="font-heading text-xs tracking-[2px] text-[var(--parch)]">{t("background")}</span>
                    <p className="text-[10px] text-[var(--text-faint)] italic mt-0.5">{t("background_desc")}</p>
                  </div>
                  <span className="text-xs text-[var(--mag)]">+$7</span>
                </label>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="isaac-btn flex-1 !text-center">← {t("back")}</button>
                <button onClick={() => setStep(3)} className="isaac-btn primary flex-1 !text-center">{t("order_details")} →</button>
              </div>
            </div>
          )}

          {/* step 3: order form */}
          {step === 3 && (
            <form onSubmit={handleSubmit}>
              <p className="font-heading text-xs tracking-[3px] text-[var(--parch)] text-center mb-5">{t("order_details")}</p>
              <div className="space-y-4 mb-6">
                <textarea value={desc} onChange={(e) => setDesc(e.target.value)} required
                  className="contact-input min-h-[100px] resize-none" placeholder={t("order_description")} />

                {/* file upload */}
                <div>
                  <p className="font-heading text-[10px] tracking-[3px] text-[var(--text-faint)] uppercase mb-2">{t("order_images")}</p>
                  <p className="text-[10px] text-[var(--text-faint)] italic mb-2">{t("order_min")} · {t("order_max")} ({files.length}/10)</p>
                  <input ref={fileRef} type="file" accept="image/*" multiple onChange={addFiles} className="hidden" />
                  <button type="button" onClick={() => fileRef.current?.click()}
                    className="w-full p-3 border border-dashed border-[#3a2a20] rounded text-xs text-[var(--text-faint)] hover:border-[var(--mag)] transition-all">
                    + {t("order_images")}
                  </button>
                  {files.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {files.map((f, i) => (
                        <span key={i} className="text-[10px] text-[var(--parch-dim)] bg-[var(--ink2)] px-2 py-1 rounded flex items-center gap-2">
                          {f.name.slice(0, 15)}…
                          <button type="button" onClick={() => removeFile(i)} className="text-[var(--mag)]">✕</button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {sent ? (
                <div className="text-center">
                  <p className="font-heading text-xs tracking-[3px] text-[var(--mag)] mb-4">{t("order_sent")}</p>
                  <p className="font-heading text-[10px] tracking-[4px] text-[var(--text-faint)] uppercase mb-3">Contactarme para coordinar</p>
                  <div className="flex flex-col gap-2">
                    <button type="button" onClick={() => redirectTo("telegram")} className="isaac-btn primary !text-sm w-full">Telegram</button>
                    <button type="button" onClick={() => redirectTo("instagram")} className="isaac-btn primary !text-sm w-full">Instagram</button>
                    <button type="button" onClick={() => redirectTo("gmail")} className="isaac-btn primary !text-sm w-full">Gmail</button>
                  </div>
                </div>
              ) : (
                <button type="submit" disabled={!canSubmit()} className="isaac-btn primary w-full !text-center !block disabled:opacity-30">
                  {t("order_submit")}
                </button>
              )}
            </form>
          )}
        </div>
      </div>
    );
  }

  /* ── PAGE COMMISSIONS FLOW ── */
  const pageCats = [
    { id: "empresa", label: t("page_empresa"), desc: t("page_empresa_desc"), icon: "🏢" },
    { id: "personal", label: t("page_personal"), desc: t("page_personal_desc"), icon: "👤" },
  ];

  return (
    <div className="page visible flex flex-col items-center justify-center z-10 px-4 overflow-y-auto py-10">
      <div className="w-full max-w-lg">
        <button onClick={onBack} className="isaac-btn !text-[11px] !p-2 mb-4">← {t("back")}</button>
        <h2 className="font-heading text-sm tracking-[5px] text-[var(--mag)] uppercase text-center mb-6">{t("menu_pagina")}</h2>
        <div className="mag-divider mb-6" />

        {/* step 0: category */}
        {step === 0 && (
          <div>
            <p className="font-heading text-xs tracking-[3px] text-[var(--parch)] text-center mb-5">{t("select_category")}</p>
            <div className="grid grid-cols-2 gap-3">
              {pageCats.map((c) => (
                <button key={c.id} onClick={() => { setPageCat(c.id); setStep(1); }}
                  className={`comm-card flex flex-col items-center gap-2 p-5 rounded bg-[var(--ink2)] text-center ${pageCat === c.id ? "!border-[var(--mag)]" : "!border-[#2a1a20]"}`}>
                  <span className="text-2xl">{c.icon}</span>
                  <span className="font-heading text-xs tracking-[2px] text-[var(--parch)]">{c.label}</span>
                  <span className="text-[10px] text-[var(--text-faint)] italic">{c.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* step 1: options */}
        {step === 1 && (
          <div>
            <p className="font-heading text-xs tracking-[3px] text-[var(--parch)] text-center mb-5">{t("add_ons")}</p>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block font-heading text-[10px] tracking-[3px] text-[var(--text-faint)] uppercase mb-1">{t("page_time")}</label>
                <input value={timeLimit} onChange={(e) => setTimeLimit(e.target.value)} className="contact-input" placeholder={t("page_time_placeholder")} />
              </div>
              <div>
                <label className="block font-heading text-[10px] tracking-[3px] text-[var(--text-faint)] uppercase mb-1">{t("page_budget")}</label>
                <input value={budget} onChange={(e) => setBudget(e.target.value)} className="contact-input" placeholder={t("page_budget_placeholder")} />
              </div>
              <div>
                <label className="block font-heading text-[10px] tracking-[3px] text-[var(--text-faint)] uppercase mb-1">{t("page_purpose")}</label>
                <textarea value={purpose} onChange={(e) => setPurpose(e.target.value)} className="contact-input min-h-[80px] resize-none" placeholder={t("page_purpose_placeholder")} />
              </div>
            </div>
            <button onClick={() => setStep(2)} className="isaac-btn primary w-full !text-center !block">{t("order_details")} →</button>
          </div>
        )}

        {/* step 2: order form */}
        {step === 2 && (
          <form onSubmit={handleSubmit}>
            <p className="font-heading text-xs tracking-[3px] text-[var(--parch)] text-center mb-5">{t("order_details")}</p>
            <div className="space-y-4 mb-6">
              <textarea value={desc} onChange={(e) => setDesc(e.target.value)} required
                className="contact-input min-h-[100px] resize-none" placeholder={t("order_description")} />
              <div>
                <p className="font-heading text-[10px] tracking-[3px] text-[var(--text-faint)] uppercase mb-2">{t("order_images")}</p>
                <p className="text-[10px] text-[var(--text-faint)] italic mb-2">{t("order_min")} · {t("order_max")} ({files.length}/10)</p>
                <input ref={fileRef} type="file" accept="image/*" multiple onChange={addFiles} className="hidden" />
                <button type="button" onClick={() => fileRef.current?.click()}
                  className="w-full p-3 border border-dashed border-[#3a2a20] rounded text-xs text-[var(--text-faint)] hover:border-[var(--mag)] transition-all">
                  + {t("order_images")}
                </button>
                {files.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {files.map((f, i) => (
                      <span key={i} className="text-[10px] text-[var(--parch-dim)] bg-[var(--ink2)] px-2 py-1 rounded flex items-center gap-2">
                        {f.name.slice(0, 15)}…
                        <button type="button" onClick={() => removeFile(i)} className="text-[var(--mag)]">✕</button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {sent ? (
              <div className="text-center">
                <p className="font-heading text-xs tracking-[3px] text-[var(--mag)] mb-4">{t("order_sent")}</p>
                <p className="font-heading text-[10px] tracking-[4px] text-[var(--text-faint)] uppercase mb-3">Contactarme para coordinar</p>
                <div className="flex flex-col gap-2">
                  <button type="button" onClick={() => redirectTo("telegram")} className="isaac-btn primary !text-sm w-full">Telegram</button>
                  <button type="button" onClick={() => redirectTo("instagram")} className="isaac-btn primary !text-sm w-full">Instagram</button>
                  <button type="button" onClick={() => redirectTo("gmail")} className="isaac-btn primary !text-sm w-full">Gmail</button>
                </div>
              </div>
            ) : (
              <button type="submit" disabled={!canSubmit()} className="isaac-btn primary w-full !text-center !block disabled:opacity-30">
                {t("order_submit")}
              </button>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
