"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const sections = [
  { id: "title", label: "Title" },
  { id: "gallery", label: "Gallery" },
  { id: "about", label: "About" },
  { id: "commissions", label: "Commissions" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("title");

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      setActive(hash || "title");
    };
    window.addEventListener("hashchange", onHashChange);
    onHashChange();
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const scrollTo = (id: string) => {
    setOpen(false);
    window.location.hash = id;
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <button
          onClick={() => scrollTo("title")}
          className="font-heading text-lg text-accent hover:text-accent/80 transition-colors"
        >
          Alan T
        </button>

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-6">
          {sections.map((s) => (
            <li key={s.id}>
              <button
                onClick={() => scrollTo(s.id)}
                className={`font-heading text-sm tracking-wider uppercase transition-colors hover:text-accent ${
                  active === s.id ? "text-accent" : "text-foreground/70"
                }`}
              >
                {s.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <ul className="md:hidden border-t border-border bg-background/95 backdrop-blur-sm">
          {sections.map((s) => (
            <li key={s.id}>
              <button
                onClick={() => scrollTo(s.id)}
                className={`w-full text-left px-4 py-3 font-heading text-sm tracking-wider uppercase transition-colors hover:bg-muted ${
                  active === s.id ? "text-accent" : "text-foreground/70"
                }`}
              >
                {s.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
