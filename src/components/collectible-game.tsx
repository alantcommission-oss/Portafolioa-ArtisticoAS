"use client";

import { useEffect, useRef, useState } from "react";
import { cursorPos } from "@/lib/cursor-pos";

let audioCtx: AudioContext | null = null;

function playCollectSound() {
  if (!audioCtx) audioCtx = new AudioContext();
  if (audioCtx.state === "suspended") audioCtx.resume();
  const now = audioCtx.currentTime;

  [523.25, 659.25, 783.99].forEach((freq, i) => {
    const osc = audioCtx!.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now + i * 0.06);
    const g = audioCtx!.createGain();
    g.gain.setValueAtTime(0, now + i * 0.06);
    g.gain.linearRampToValueAtTime(0.08, now + i * 0.06 + 0.04);
    g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.6);
    osc.connect(g);
    g.connect(audioCtx!.destination);
    osc.start(now + i * 0.06);
    osc.stop(now + i * 0.06 + 0.6);
  });
}

function playHitSound() {
  if (!audioCtx) audioCtx = new AudioContext();
  if (audioCtx.state === "suspended") audioCtx.resume();
  const now = audioCtx.currentTime;

  [220, 155].forEach((freq, i) => {
    const osc = audioCtx!.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(freq, now);
    const g = audioCtx!.createGain();
    g.gain.setValueAtTime(0.06, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    osc.connect(g);
    g.connect(audioCtx!.destination);
    osc.start(now);
    osc.stop(now + 0.3);
  });
}

function randPos() {
  return {
    x: 5 + Math.random() * 85,
    y: 8 + Math.random() * 75,
  };
}

const COLLECT_DIST = 7;
const TRI_COLLECT_DIST = 3;

interface Props {
  gameMode?: boolean;
}

interface TriData {
  x: number;
  y: number;
  id: number;
  hit: boolean;
}

export default function CollectibleGame({ gameMode }: Props) {
  const [count, setCount] = useState(0);
  const [ball, setBall] = useState(randPos);
  const ballRef = useRef(ball);
  const [pop, setPop] = useState(false);
  const [tris, setTris] = useState<TriData[]>([]);
  const trisRef = useRef<TriData[]>([]);
  const triIdCounter = useRef(0);
  const nextSpawn = useRef(5);
  const countRef = useRef(0);
  const gameModeRef = useRef(gameMode);
  gameModeRef.current = gameMode;

  useEffect(() => {
    let raf: number;
    const tick = () => {
      const cx = cursorPos.x;
      const cy = cursorPos.y;
      const gm = gameModeRef.current;

      if (gm) {
        const b = ballRef.current;
        const dx = cx - (b.x + 0.5);
        const dy = cy - (b.y + 0.5);
        if (dx * dx + dy * dy < COLLECT_DIST * COLLECT_DIST) {
          playCollectSound();
          const next = randPos();
          ballRef.current = next;
          setBall(next);
          setCount((c) => {
            const n = c + 1;
            countRef.current = n;
            if (n >= nextSpawn.current) {
              nextSpawn.current = n + 5;
              const t: TriData = { ...randPos(), id: ++triIdCounter.current, hit: false };
              trisRef.current = [...trisRef.current, t];
              setTris(trisRef.current);
            }
            return n;
          });
          setPop(true);
          setTimeout(() => setPop(false), 200);
        }

        const triArr = trisRef.current;
        for (let i = 0; i < triArr.length; i++) {
          const t = triArr[i];
          const tdx = cx - (t.x + 0.5);
          const tdy = cy - (t.y + 0.5);
          if (tdx * tdx + tdy * tdy < TRI_COLLECT_DIST * TRI_COLLECT_DIST) {
            cursorPos.hitAt = Date.now();
            playHitSound();
            const next = { ...randPos(), id: t.id, hit: true };
            triArr[i] = next;
            trisRef.current = triArr;
            setTris([...triArr]);
            setTimeout(() => {
              triArr[i] = { ...triArr[i], hit: false };
              trisRef.current = triArr;
              setTris([...triArr]);
            }, 200);
            setCount((c) => Math.max(0, c - 1));
            break;
          }
        }
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      {gameMode && (
        <div
          className="fixed pointer-events-none z-[9998] flex items-center justify-center"
          style={{ left: `${ball.x}%`, top: `${ball.y}%` }}
        >
          <div
            className={`rounded-full transition-transform duration-150 ${pop ? "scale-150 opacity-0" : "scale-100 opacity-100"}`}
            style={{
              width: "14px",
              height: "14px",
              background: "radial-gradient(circle at 35% 35%, #8f8, #080)",
              boxShadow: "0 0 10px rgba(0,200,0,0.7)",
            }}
          />
        </div>
      )}

      {gameMode && tris.map((t) => (
        <div
          key={t.id}
          className="fixed pointer-events-none z-[9998] flex items-center justify-center"
          style={{ left: `${t.x}%`, top: `${t.y}%` }}
        >
          <div
            className={`transition-transform duration-150 ${t.hit ? "scale-150 opacity-0" : "scale-100 opacity-100"}`}
            style={{
              width: 0,
              height: 0,
              borderLeft: "7px solid transparent",
              borderRight: "7px solid transparent",
              borderBottom: "14px solid #f44",
              filter: "drop-shadow(0 0 6px rgba(255,50,50,0.7))",
            }}
          />
        </div>
      ))}

      <div className="fixed top-4 left-4 z-[9999] font-heading text-xs tracking-[3px] text-[var(--parch)] bg-[var(--ink2)] border border-[var(--mag)]/20 rounded px-3 py-1.5 select-none">
        ✦ {count}
      </div>
    </>
  );
}
