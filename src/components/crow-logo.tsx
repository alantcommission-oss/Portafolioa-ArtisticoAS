export function CrowLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Crow logo"
    >
      {/* Body */}
      <ellipse cx="100" cy="120" rx="35" ry="45" fill="#1a1410" stroke="#b30089" strokeWidth="2" />
      {/* Head */}
      <circle cx="100" cy="70" r="20" fill="#1a1410" stroke="#b30089" strokeWidth="2" />
      {/* Beak */}
      <polygon points="115,70 140,75 115,78" fill="#b30089" />
      {/* Eye */}
      <circle cx="108" cy="67" r="3" fill="#b30089" />
      {/* Wing */}
      <path
        d="M70 100 Q40 60 30 30 Q60 50 75 90"
        fill="#2a1f1a"
        stroke="#b30089"
        strokeWidth="1.5"
      />
      <path
        d="M130 100 Q160 60 170 30 Q140 50 125 90"
        fill="#2a1f1a"
        stroke="#b30089"
        strokeWidth="1.5"
      />
      {/* Tail */}
      <path
        d="M85 160 L75 190 L90 175 L95 195 L100 175 L105 195 L110 175 L125 190 L115 160"
        fill="#1a1410"
        stroke="#b30089"
        strokeWidth="1.5"
      />
      {/* Feet */}
      <line x1="90" y1="165" x2="80" y2="190" stroke="#b30089" strokeWidth="2" />
      <line x1="110" y1="165" x2="120" y2="190" stroke="#b30089" strokeWidth="2" />
    </svg>
  );
}
