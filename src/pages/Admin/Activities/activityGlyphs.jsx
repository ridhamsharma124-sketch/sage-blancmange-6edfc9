
export function WordSearchGlyph({ size = 24, ...rest }) {
  const TILE = "fill-[#16A34A]";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      {...rest}
    >
      {/* four tiles */}
      <rect x="2.5" y="2.5" width="9" height="9" rx="2.2" className={TILE} />
      <rect x="12.5" y="2.5" width="9" height="9" rx="2.2" className={TILE} />
      <rect x="2.5" y="12.5" width="9" height="9" rx="2.2" className={TILE} />
      <rect x="12.5" y="12.5" width="9" height="9" rx="2.2" className={TILE} />

      {/* white marks — an "i", a "t", an "o" and a dash */}
      <g
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 4.9v4.2" />
        <path d="M17 4.9v4.2M15.4 6.2h3.2" />
        <circle cx="7" cy="17" r="2.1" />
        <path d="M14.9 17h4.2" />
      </g>
    </svg>
  );
}

/* -------------------------------------------------------------------------
   MEMORY VERSE — open book: cross on left page, lines on right page,
   bookmark ribbon hanging from the bottom
   ---------------------------------------------------------------------- */
export function MemoryVerseGlyph({ size = 24, ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#F97316"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...rest}
    >
      {/* open book — left + right page and spine */}
      <path d="M12 7.2C10 5.6 6.4 5 3 5.4v12c3.4-.4 7 .2 9 1.8" />
      <path d="M12 7.2c2-1.6 5.6-2.2 9-1.8v12c-3.4-.4-7 .2-9 1.8" />
      <path d="M12 7.2v12" />

      {/* small cross on the left page */}
      <path d="M7 9.6v3.6" strokeWidth="1.5" />
      <path d="M5.4 11.2h3.2" strokeWidth="1.5" />

      {/* horizontal lines on the right page */}
      <path d="M14.2 10h3.6" strokeWidth="1.4" />
      <path d="M14.2 12.3h3.6" strokeWidth="1.4" />
      <path d="M14.2 14.6h1.6" strokeWidth="1.4" />

      {/* bookmark ribbon hanging below the book */}
      <path d="M16.2 16.4v5.4L18 20l1.8 1.8v-5.4" strokeWidth="1.6" />
    </svg>
  );
}
