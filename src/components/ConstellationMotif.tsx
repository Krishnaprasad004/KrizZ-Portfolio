export default function ConstellationMotif({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 64 40"
      className={`pointer-events-none h-8 w-14 shrink-0 ${className ?? ""}`}
    >
      <g stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.4">
        <line x1="6" y1="30" x2="26" y2="10" />
        <line x1="26" y1="10" x2="44" y2="22" />
        <line x1="44" y1="22" x2="58" y2="9" />
      </g>
      <g fill="#38bdf8">
        <circle cx="6" cy="30" r="2" opacity="0.75" />
        <circle cx="26" cy="10" r="1.6" opacity="0.6" />
        <circle cx="44" cy="22" r="1.8" opacity="0.65" />
        <circle cx="58" cy="9" r="1.4" opacity="0.5" />
      </g>
    </svg>
  );
}
