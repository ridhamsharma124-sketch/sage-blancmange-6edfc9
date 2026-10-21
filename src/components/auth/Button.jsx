
export default function Button({ children, className = "mt-6", ...props }) {
  return (
    <button
      className={`h-10 w-full rounded-lg bg-[#001984] px-6 text-sm font-semibold leading-none text-white transition hover:bg-[var(--auth-button-hover)] active:scale-[0.99] ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}