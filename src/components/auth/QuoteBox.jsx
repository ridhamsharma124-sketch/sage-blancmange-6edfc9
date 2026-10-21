function BibleIcon({ size = 38 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 38 38"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 text-[#001984]"
      aria-hidden="true"
    >
      {/* book cover */}
      <path d="M9 5.5h18a2 2 0 0 1 2 2V30a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V7.5a2 2 0 0 1 2-2Z" />
      {/* spine */}
      <path d="M12 5.5V32" />
      {/* bottom pages */}
      <path d="M7 29.5h-.5M29 29.5h.5" />
      <path d="M12 35h15" />
      {/* cross */}
      <path d="M20.5 10v13" />
      <path d="M16.5 14.5h8" />
    </svg>
  );
}

export default function QuoteBox() {
  return (
    <div className="mt-6 flex min-h-[65px] items-center gap-5 rounded-[4px] border border-[var(--auth-quote-border)] bg-[#EFF6FE] px-3.5 pb-[13px] pt-3">
      <BibleIcon size={38} />
      <div>
        <p className="text-[10px] font-normal leading-[15px] text-[#0A0847]">
          &ldquo;I can do all things through Christ who strengthens me.&rdquo;
        </p>
        <p className="text-[10px] font-semibold leading-[15px] text-[#001984]">
          - Philippians 4:13
        </p>
      </div>
    </div>
  );
}