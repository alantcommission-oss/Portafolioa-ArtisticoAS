"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light") {
      setLight(true);
      document.documentElement.classList.add("light");
    }
  }, []);

  const toggle = () => {
    const next = !light;
    setLight(next);
    document.documentElement.classList.toggle("light", next);
    localStorage.setItem("theme", next ? "light" : "dark");
  };

  return (
    <button
      onClick={toggle}
      className="fixed top-4 right-4 z-[9999] w-10 h-10 flex items-center justify-center rounded-full border border-[var(--mag)]/30 bg-[var(--ink2)] hover:bg-[var(--mag-dim)] transition-all hover:scale-110"
      title={light ? "Modo oscuro" : "Modo claro"}
    >
      <span className="text-[var(--parch-mid)] text-lg leading-none">
        {light ? "☾" : "☀"}
      </span>
    </button>
  );
}
