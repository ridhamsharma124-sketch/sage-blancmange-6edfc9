export default function AuthFooter() {
  return (
    <footer className="flex h-[35px] shrink-0 items-center justify-between bg-[var(--auth-footer)] pl-[43px] pr-[40px] text-[12px] font-normal italic leading-[18px] text-white/80">
      <span>
        © 2026. <span className="font-semibold">VPeters Initiative</span>
      </span>
      <div className="flex items-center gap-[20px]">
        <a href="#" className="transition hover:text-white">
          Privacy Policy
        </a>
        <span className="h-[13px] border-l border-white/40" />
        <a href="#" className="transition hover:text-white">
          Terms of Service
        </a>
        <span className="h-[13px] border-l border-white/40" />
        <a href="#" className="transition hover:text-white">
          Contact Us
        </a>
      </div>
    </footer>
  );
}