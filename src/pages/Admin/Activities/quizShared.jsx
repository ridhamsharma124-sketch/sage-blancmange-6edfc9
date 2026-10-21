import { LuBookOpen, LuChevronRight, LuChevronDown, LuImage } from "react-icons/lu";

/* ==========================================================================
   SHARED PRIMITIVES — used by AIQuizGenerator, AddQuestionManually and
   BulkUploadQuizQuestions.
   ========================================================================== */

export const labelClass = "mb-[6px] block text-[13px] font-semibold text-[#0A0847]";

export const inputClass =
  "h-11 w-full rounded-lg border border-[#E5E4EC] bg-white px-4 text-[13.5px] text-[#0A0847] outline-none transition placeholder:text-[#0A084799] focus:border-[#041581]";

export const selectClass =
  "h-11 w-full cursor-pointer appearance-none rounded-lg border border-[#E5E4EC] bg-white pl-4 pr-10 text-[13.5px] text-[#0A0847] outline-none transition focus:border-[#041581]";

export const textareaClass =
  "w-full resize-none rounded-lg border border-[#E5E4EC] bg-white px-4 py-3 text-[13.5px] leading-relaxed text-[#0A0847] outline-none transition placeholder:text-[#0A084799] focus:border-[#041581]";

export const helperClass = "mt-[6px] text-[12px] text-[#0A084799]";

export const outlineButton =
  "flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#E5E4EC] bg-white px-4 text-[13px] font-semibold text-[#0A0847] transition-colors hover:bg-[#F9FAFE]";

export const outlineNavyButton =
  "flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#041581] bg-white px-4 text-[13px] font-semibold text-[#041581] transition-colors hover:bg-[#041581]/5";

export const filledNavyButton =
  "flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#041581] px-4 text-[13px] font-semibold text-white transition-colors hover:bg-[#030D5C]";

export const filledPurpleButton =
  "flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#6D28D9] px-4 text-[13px] font-semibold text-white transition-colors hover:bg-[#5B21B6]";

/* -------------------------------------------------------------------------
   BREADCRUMB
   ---------------------------------------------------------------------- */
export function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-[#0A084799]">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item} className="flex items-center gap-1.5">
              {index > 0 && (
                <LuChevronRight size={13} className="text-[#0A084766]" aria-hidden />
              )}
              <span
                aria-current={isLast ? "page" : undefined}
                className={isLast ? "font-bold text-[#0A0847]" : undefined}
              >
                {item}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/* -------------------------------------------------------------------------
   LOCATION CHIP
   ---------------------------------------------------------------------- */
export function LocationChip({ parts = ["New Testament", "John", "Chapter 3"] }) {
  return (
    <div className="inline-flex items-center gap-2.5 rounded-lg bg-[#F3F3F7] px-4 py-2.5">
      <LuBookOpen size={16} className="shrink-0 text-[#5B0FEE]" aria-hidden />
      <p className="text-[13px]">
        {parts.map((part, index) => (
          <span key={part}>
            {index > 0 && <span className="px-1.5 text-[#0A084766]">&gt;</span>}
            <span className="font-bold text-[#0A0847]">{part}</span>
          </span>
        ))}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------
   IMAGE PLACEHOLDER — no real image, dimensions match the design spec
   ---------------------------------------------------------------------- */
export function ImagePlaceholder({
  width = 165,
  height = 165,
  label = "Image",
  className = "",
}) {
  return (
    <div
      style={{ width, height }}
      className={`flex shrink-0 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-[#E5E4EC] bg-[#F3F4F6] ${className}`}
      role="img"
      aria-label={`${label} placeholder`}
    >
      <LuImage size={28} className="text-[#9CA3AF]" aria-hidden />
      <span className="text-[11px] text-[#9CA3AF]">{label}</span>
    </div>
  );
}

/* -------------------------------------------------------------------------
   TOGGLE
   ---------------------------------------------------------------------- */
export function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors ${
        checked ? "bg-[#0A55A6]" : "bg-[#D1D5DB]"
      }`}
    >
      <span
        className={`absolute top-[3px] h-4 w-4 rounded-full bg-white shadow-sm transition-all ${
          checked ? "left-[25px]" : "left-[3px]"
        }`}
      />
    </button>
  );
}

/* -------------------------------------------------------------------------
   FIELDS
   ---------------------------------------------------------------------- */
export function Field({ label, required, helper, children, htmlFor }) {
  return (
    <div>
      {label && (
        <label htmlFor={htmlFor} className={labelClass}>
          {label} {required && <span className="text-[#E11D48]">*</span>}
        </label>
      )}
      {children}
      {helper && <p className={helperClass}>{helper}</p>}
    </div>
  );
}

export function TextInput({ id, value, placeholder, onChange, className = "" }) {
  return (
    <input
      id={id}
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className={`${inputClass} ${className}`}
    />
  );
}

export function TextArea({ id, value, placeholder, onChange, rows = 3, maxLength }) {
  return (
    <textarea
      id={id}
      rows={rows}
      value={value}
      maxLength={maxLength}
      placeholder={placeholder}
      onChange={onChange}
      className={textareaClass}
    />
  );
}

export function SelectField({ id, value, options, onChange, className = "" }) {
  return (
    <div className={`relative w-full [&>svg]:pointer-events-none ${className}`}>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className={selectClass}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <LuChevronDown
        size={16}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0A0847CC]"
        aria-hidden
      />
    </div>
  );
}

/* -------------------------------------------------------------------------
   CHAR COUNTER
   ---------------------------------------------------------------------- */
export function CharCounter({ current, max }) {
  return (
    <p className="mt-1 text-right text-[11px] text-[#0A084799]">
      {current}/{max}
    </p>
  );
}

/* -------------------------------------------------------------------------
   STEP CIRCLE
   ---------------------------------------------------------------------- */
export function StepCircle({ n }) {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#041581] text-[13px] font-bold text-white">
      {n}
    </span>
  );
}

/* -------------------------------------------------------------------------
   STATUS PILLS
   ---------------------------------------------------------------------- */
const PILL_TONES = {
  green: "bg-[#EAF9E9] text-[#16A34A]",
  red: "bg-[#FDEEEE] text-[#DC2626]",
  blue: "bg-[#DBEAFE] text-[#2563EB]",
};

export function StatusPill({ tone = "green", children }) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-[5px] text-[12px] font-semibold ${PILL_TONES[tone]}`}
    >
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------
   CARD SHELL
   ---------------------------------------------------------------------- */
export function Card({ title, subtitle, children, className = "", bodyClassName = "" }) {
  return (
    <section className={`rounded-xl border border-[#E5E4EC] bg-white ${className}`}>
      {(title || subtitle) && (
        <div className="border-b border-[#EFEDF8] px-6 py-5">
          {title && (
            <h2 className="text-[20px] font-bold text-[#0A0847]">{title}</h2>
          )}
          {subtitle && (
            <p className="mt-1 text-[13px] text-[#0A084799]">{subtitle}</p>
          )}
        </div>
      )}
      <div className={`px-6 py-5 ${bodyClassName}`}>{children}</div>
    </section>
  );
}
