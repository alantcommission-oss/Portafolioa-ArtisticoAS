"use client";

import { useState, useEffect } from "react";
import BallGame from "./ball-game";

type Participant = { instagram: string; points: number; visits: number };

export default function PromoBanner() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"promo" | "leaderboard" | "game">("promo");
  const [instagram, setInstagram] = useState("");
  const [me, setMe] = useState<Participant | null>(null);
  const [leaderboard, setLeaderboard] = useState<Participant[]>([]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("promo_instagram");
    if (stored) {
      setInstagram(stored);
      fetch(`/api/promo?instagram=${encodeURIComponent(stored)}`)
        .then((r) => r.json())
        .then((d) => { if (d.instagram) setMe(d); })
        .catch(() => {});
    }
    fetch("/api/promo?action=leaderboard")
      .then((r) => r.json())
      .then((d) => { if (Array.isArray(d)) setLeaderboard(d); })
      .catch(() => {});
  }, []);

  const handleRegister = async () => {
    if (!instagram.trim()) return;
    setLoading(true);
    setMsg("");
    const clean = instagram.replace(/^@/, "").trim();
    try {
      const r = await fetch("/api/promo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "register", instagram: clean }),
      });
      const d = await r.json();
      if (r.ok) {
        setMe(d);
        sessionStorage.setItem("promo_instagram", clean);
        setMsg("¡Registrado! Visitá seguido y jugá para sumar puntos.");
        fetch("/api/promo?action=leaderboard").then((res) => res.json()).then((d) => { if (Array.isArray(d)) setLeaderboard(d); });
      } else {
        setMsg(d.error || "Error");
      }
    } catch {
      setMsg("Error de conexión");
    }
    setLoading(false);
  };

  const handleVisit = async () => {
    const stored = sessionStorage.getItem("promo_instagram");
    if (!stored) return;
    try {
      const r = await fetch("/api/promo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "visit", instagram: stored }),
      });
      const d = await r.json();
      if (r.ok) setMe(d);
    } catch {}
  };

  useEffect(() => {
    if (!me) return;
    const saved = sessionStorage.getItem("promo_visited");
    if (!saved) {
      handleVisit();
      sessionStorage.setItem("promo_visited", "1");
    }
  }, [me]);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-20 right-6 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-[var(--ink2)] border border-[var(--mag)]/30 text-[var(--mag)] hover:bg-[var(--mag)] hover:text-[var(--ink)] transition-all opacity-70 hover:opacity-100 text-xs font-bold"
        title="Promo"
      >
        🏆
      </button>

      {open && (
        <div className="fixed bottom-36 right-6 z-50 w-80 max-h-[70vh] bg-[var(--ink2)] border border-[var(--mag)]/30 rounded-xl shadow-2xl overflow-hidden flex flex-col">
          <div className="flex border-b border-[var(--mag)]/20">
            <button
              onClick={() => setTab("promo")}
              className={`flex-1 py-2 text-xs font-semibold transition ${tab === "promo" ? "text-[var(--mag)] border-b-2 border-[var(--mag)]" : "text-white/50 hover:text-white/80"}`}
            >
              🎯 Promo
            </button>
            <button
              onClick={() => setTab("leaderboard")}
              className={`flex-1 py-2 text-xs font-semibold transition ${tab === "leaderboard" ? "text-[var(--mag)] border-b-2 border-[var(--mag)]" : "text-white/50 hover:text-white/80"}`}
            >
              🏅 Ranking
            </button>
            <button
              onClick={() => setTab("game")}
              className={`flex-1 py-2 text-xs font-semibold transition ${tab === "game" ? "text-[var(--mag)] border-b-2 border-[var(--mag)]" : "text-white/50 hover:text-white/80"}`}
            >
              🎮 Jugar
            </button>
          </div>

          <div className="overflow-y-auto p-4 space-y-3 text-xs">
            {tab === "promo" && (
              <>
                <div className="text-center">
                  <h3 className="text-lg font-bold text-[var(--mag)] font-[var(--font-cinzel)] tracking-wide">🎯 PELOTITA CHALLENGE</h3>
                  <p className="text-white/50 text-[10px] mt-1">Ganate un dibujo GRATIS</p>
                </div>

                <p className="text-white/90 leading-relaxed font-[var(--font-crimson)] text-sm">
                  <strong className="text-white">@alant_arts1</strong> — Aprovechó su libre albedrío para crearse un portafolio, junto con un mini juego para entretenimiento. Si querés un dibujo <strong>GRATIS</strong>, participá.
                </p>

                <div className="bg-black/30 rounded-lg p-3 space-y-1 text-white/70 text-[11px]">
                  <p className="font-bold text-white/90 text-xs">📜 Reglas</p>
                  <ul className="list-disc list-inside space-y-0.5">
                    <li>Registrate con tu Instagram abajo</li>
                    <li>Sumá <strong className="text-[var(--mag)]">100 pelotitas</strong> (visitando + jugando)</li>
                    <li>El que llegue primero, gana</li>
                  </ul>
                  <p className="mt-2"><strong className="text-[var(--mag)]">🎁 Premio:</strong> Dibujo <strong>sticker medio cuerpo, sin fondo</strong>.</p>
                </div>

                <div className="bg-black/30 rounded-lg p-3 space-y-1 text-white/70 text-[11px]">
                  <p className="font-bold text-white/90 text-xs">📋 Cómo reclamar</p>
                  <ol className="list-decimal list-inside space-y-0.5 pl-1">
                    <li>Llegá a 100 pelotitas</li>
                    <li>Sacá <strong>captura de pantalla</strong> de tu perfil acá mostrando las 100</li>
                    <li>Enviala por <strong>Instagram DM</strong> a <strong className="text-[var(--mag)]">@alant_arts1</strong></li>
                    <li>Coordinamos tu dibujo</li>
                  </ol>
                </div>

                <div className="bg-[var(--mag)]/10 border border-[var(--mag)]/20 rounded-lg p-3 text-center">
                  <p className="text-white/80 text-xs font-semibold">🔗 Ingresá acá</p>
                  <a href="https://portafolioa-artisticoas.onrender.com" target="_blank" rel="noopener noreferrer" className="text-[var(--mag)] text-xs underline hover:brightness-125 break-all">
                    portafolioa-artisticoas.onrender.com
                  </a>
                  <p className="text-white/40 text-[10px] mt-1">⚠️ Si la página tarda en cargar, <strong className="text-white/70">refrescá (F5)</strong> — Render a veces se duerme un poco.</p>
                </div>

                {!me ? (
                  <div className="space-y-2 pt-2">
                    <input
                      value={instagram}
                      onChange={(e) => setInstagram(e.target.value)}
                      placeholder="Tu Instagram..."
                      className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-xs placeholder-white/30 outline-none focus:border-[var(--mag)] transition"
                      onKeyDown={(e) => e.key === "Enter" && handleRegister()}
                    />
                    <button
                      onClick={handleRegister}
                      disabled={loading}
                      className="w-full py-2 rounded-lg bg-[var(--mag)] text-white font-semibold text-xs hover:brightness-110 transition disabled:opacity-50"
                    >
                      {loading ? "..." : "Participar 🎮"}
                    </button>
                    {msg && <p className="text-white/60 text-[10px]">{msg}</p>}
                  </div>
                ) : (
                  <div className="bg-black/30 rounded-lg p-3 space-y-1">
                    <p className="text-white/80 font-semibold">@{me.instagram}</p>
                    <p className="text-lg font-bold text-[var(--mag)]">{me.points} <span className="text-xs text-white/50 font-normal">/ 100 pelotitas</span></p>
                    <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[var(--mag)] rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, (me.points / 100) * 100)}%` }}
                      />
                    </div>
                    <p className="text-white/40 text-[10px]">Visitas: {me.visits}</p>
                    {me.points >= 100 && (
                      <div className="mt-2 bg-[var(--mag)]/20 border border-[var(--mag)]/40 rounded-lg p-3 text-center space-y-2">
                        <p className="text-[var(--mag)] font-bold text-sm">🎉 ¡Llegaste a 100!</p>
                        <p className="text-white/70 text-[10px]">Sacá captura de esta pantalla y enviala por <strong>Instagram DM</strong> a <strong className="text-[var(--mag)]">@alant_arts1</strong> para coordinar tu dibujo.</p>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {tab === "game" && (
              <BallGame onPoints={(pts) => {
                const stored = sessionStorage.getItem("promo_instagram");
                if (!stored) return;
                fetch("/api/promo", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ action: "game-score", instagram: stored, points: pts }),
                }).then(r => r.json()).then(d => {
                  if (d.instagram) {
                    setMe(d);
                    fetch("/api/promo?action=leaderboard").then(res => res.json()).then(dd => {
                      if (Array.isArray(dd)) setLeaderboard(dd);
                    });
                  }
                }).catch(() => {});
              }} />
            )}

            {tab === "leaderboard" && (
              <div className="space-y-1">
                {leaderboard.length === 0 && <p className="text-white/40 text-center">Sin participantes aún</p>}
                {leaderboard.map((p, i) => (
                  <div
                    key={p.instagram}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg ${
                      me?.instagram === p.instagram ? "bg-[var(--mag)]/10 border border-[var(--mag)]/30" : "bg-black/20"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-white/40 w-4 text-center">{i + 1}</span>
                      <span className="text-white/80">@{p.instagram}</span>
                    </div>
                    <span className="text-[var(--mag)] font-bold">{p.points}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
