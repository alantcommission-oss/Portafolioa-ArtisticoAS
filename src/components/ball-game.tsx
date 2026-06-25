"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface Ball {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
  life: number;
}

const COLORS = ["#b30089", "#ff6ec7", "#ff1493", "#ff69b4", "#ff3366", "#cc0066"];

export default function BallGame({ onPoints }: { onPoints?: (pts: number) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [message, setMessage] = useState("");
  const ballsRef = useRef<Ball[]>([]);
  const scoreRef = useRef(0);
  const idRef = useRef(0);
  const animRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);

  const spawnBall = useCallback((w: number, h: number) => {
    const r = 10 + Math.random() * 15;
    const x = r + Math.random() * (w - r * 2);
    const y = r + Math.random() * (h - r * 2);
    const speed = 0.5 + Math.random() * 1.5;
    const angle = Math.random() * Math.PI * 2;
    ballsRef.current.push({
      id: idRef.current++,
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      r,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      life: 200 + Math.random() * 300,
    });
  }, []);

  const start = useCallback(() => {
    setPlaying(true);
    setScore(0);
    scoreRef.current = 0;
    setTimeLeft(30);
    setMessage("");
    ballsRef.current = [];
    idRef.current = 0;
  }, []);

  useEffect(() => {
    if (!playing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width = canvas.clientWidth;
    const h = canvas.height = canvas.clientHeight;

    for (let i = 0; i < 8; i++) spawnBall(w, h);

    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setPlaying(false);
          setMessage("¡Tiempo! Puntos: " + scoreRef.current);
          onPoints?.(scoreRef.current);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    const frame = () => {
      ctx.clearRect(0, 0, w, h);
      const balls = ballsRef.current;
      for (let i = balls.length - 1; i >= 0; i--) {
        const b = balls[i];
        b.x += b.vx;
        b.y += b.vy;
        b.life--;
        if (b.x - b.r < 0 || b.x + b.r > w) b.vx *= -1;
        if (b.y - b.r < 0 || b.y + b.r > h) b.vy *= -1;
        b.x = Math.max(b.r, Math.min(w - b.r, b.x));
        b.y = Math.max(b.r, Math.min(h - b.r, b.y));

        if (b.life <= 0 || b.x <= 0 || b.x >= w || b.y <= 0 || b.y >= h) {
          balls.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0.2)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      if (balls.length < 5) spawnBall(w, h);
      if (balls.length > 15) balls.splice(0, balls.length - 15);

      animRef.current = requestAnimationFrame(frame);
    };
    animRef.current = requestAnimationFrame(frame);

    return () => {
      clearInterval(timerRef.current);
      cancelAnimationFrame(animRef.current);
    };
  }, [playing, spawnBall]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!playing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const balls = ballsRef.current;
    for (let i = balls.length - 1; i >= 0; i--) {
      const b = balls[i];
      const dx = x - b.x;
      const dy = y - b.y;
      if (dx * dx + dy * dy < b.r * b.r) {
        balls.splice(i, 1);
        const pts = Math.ceil(b.r / 3);
        scoreRef.current += pts;
        setScore(scoreRef.current);
        break;
      }
    }
  }, [playing]);

  return (
    <div className="w-full max-w-md mx-auto">
      {!playing && (
        <div className="text-center space-y-3 py-6">
          <p className="text-white/70 text-sm font-[var(--font-crimson)]">
            Atrapá las pelotitas para sumar puntos. {message || "Tenés 30 segundos."}
          </p>
          <button
            onClick={start}
            className="px-6 py-2 rounded-lg bg-[var(--mag)] text-white font-semibold text-sm hover:brightness-110 transition"
          >
            🎮 Jugar
          </button>
        </div>
      )}

      {playing && (
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-white/60 px-1">
            <span>Puntos: <strong className="text-[var(--mag)]">{score}</strong></span>
            <span>Tiempo: <strong className={timeLeft <= 5 ? "text-red-400" : "text-white/80"}>{timeLeft}s</strong></span>
          </div>
          <canvas
            ref={canvasRef}
            onClick={handleClick}
            className="w-full h-64 rounded-xl bg-black/40 border border-white/5 cursor-crosshair"
          />
        </div>
      )}
    </div>
  );
}
