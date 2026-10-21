import QuoteBox from "./QuoteBox";


export default function AuthCard({
  title,
  subtitle,
  children,
  className = "lg:h-[var(--card-h,803px)]",
}) {
  return (
    <div className={`relative w-full lg:shrink-0 ${className}`}>
      {/* back card (Figma: offset layer behind the main card) */}
      <div
        className="absolute inset-0 -z-10 translate-x-3 translate-y-2 scale-y-[0.97] rounded-[20px] bg-white/40"
        aria-hidden
      />

    
      <div className="relative flex h-full max-h-full w-full flex-col overflow-y-auto rounded-[20px] bg-white px-7 py-7 shadow-[0_10px_40px_rgba(0,0,0,0.12)] lg:px-20">
        <div className="my-auto w-full">
          {title && (
            <h2 className="mb-1 text-[32px] font-semibold leading-[48px] text-[#0A0847]">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mb-8 text-sm font-medium leading-[21px] text-[#0A0847]/60">
              {subtitle}
            </p>
          )}

          {children}

          <QuoteBox />
          <p className="mt-3 text-center text-[10.5px] font-medium italic leading-4 text-[#0A0847]/90">
            Authorized access only. Activity is monitored.
          </p>
        </div>
      </div>
    </div>
  );
}