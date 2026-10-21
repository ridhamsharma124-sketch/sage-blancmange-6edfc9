import { Fragment, useRef, useState } from "react";
import { LuChevronDown, LuCircleCheck, LuCircleX, LuPlay } from "react-icons/lu";
import selectorBook from "../../../assets/activities/selector_book.png";
import audioFileIcon from "../../../assets/activities/audio_file_icon.png";

/* ==========================================================================
   PRIMITIVES USED ONLY BY THE NEW ACTIVITY PAGES
   AddChapterAudioStory / AddMemoryVerse
   ========================================================================== */

export const labelClass = "mb-[6px] block text-[12px] font-semibold text-[#0A0847]";

/* Figma input: h40, radius 7.47, border 1px #E2DFFC, padding 10/12, Inter 500 12px @80% */
export const inputClass =
  "h-10 w-full rounded-[7.47px] border border-[#E2DFFC] bg-white px-3 text-[12px] font-medium text-[#0A0847]/80 outline-none transition placeholder:text-[#0A084799] focus:border-[#041581]";

/* width is added per-button: w-[152px] / w-[188px] / w-full
   Figma button text: Inter 600 14px @80% */
export const outlineButton =
  "flex h-12 cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#001984] bg-[#FEFEFE] px-3 py-3 text-[14px] font-semibold text-[#0A0847]/80 transition-colors hover:bg-[#F1F1F9]";

export const purpleButton =
  "flex h-12 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#4C1DD6] px-6 text-[14px] font-semibold text-white transition-colors hover:bg-[#4318B8]";

/* left (form) card — Figma padding: top 19 / right 22 / bottom 35 / left 16, gap 10 */
export const formCardClass =
  "flex min-w-0 w-full flex-col gap-[10px] rounded-lg border border-[#E2DFFC] bg-[#FEFEFF] pt-[19px] pr-[22px] pb-[35px] pl-4";

export const pageShellClass = "min-h-screen bg-[#F9FAFE] font-[Inter] text-[#0A0847]";

/* outer gutter layer (page-wide horizontal padding) */
export const pageBodyClass = "w-full px-7 py-6";

/* centered content wrapper: max width 1072px */
export const pageInnerClass = "mx-auto w-full max-w-[1072px]";

/* left card 578px fixed, preview takes the rest */
export const cardRowClass = "mt-6 grid grid-cols-[578px_minmax(0,1fr)] gap-6";

/* ~56px between cards and the button row */
export const actionRowClass =
  "mt-14 flex flex-wrap items-center justify-between gap-4";

/* -------------------------------------------------------------------------
   BREADCRUMB — 16px, all items same grey/weight, plain ">" separator
   ---------------------------------------------------------------------- */
export function Breadcrumb({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2">
      {items.map((item, index) => (
        <Fragment key={`${item}-${index}`}>
          {index > 0 && (
            <span
              aria-hidden
              className="text-[16px] font-medium text-[#0A0847]/60"
            >
              &gt;
            </span>
          )}
          <span className="text-[16px] font-medium text-[#0A0847]/60">
            {item}
          </span>
        </Fragment>
      ))}
    </nav>
  );
}

/* -------------------------------------------------------------------------
   LOCATION BAR — h48, light grey bg, 1px light border,
   24x24 selector_book icon, 10px icon gap, 12px gap between text / ">" / text
   ---------------------------------------------------------------------- */
export function LocationChip({ parts = ["New Testament", "John", "Chapter 3"] }) {
  return (
    <div className="inline-flex h-12 items-center gap-2.5 rounded-lg border border-[#E2DFFC] bg-[#F3F3F7] px-4">
      <img
        src={selectorBook}
        alt=""
        aria-hidden
        className="h-6 w-6 shrink-0 object-contain"
      />
      <div className="flex items-center gap-3">
        {parts.map((part, index) => (
          <Fragment key={`${part}-${index}`}>
            {index > 0 && (
              <span aria-hidden className="text-[16px] font-medium text-[#0A0847]/60">
                &gt;
              </span>
            )}
            <span className="text-[16px] font-semibold text-[#0A0847]">{part}</span>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------
   PAGE HEADER — breadcrumb + H1 (+ optional subtitle) + location bar
   ---------------------------------------------------------------------- */
export function ActivityPageHeader({ breadcrumb, title, subtitle }) {
  return (
    <>
      <Breadcrumb items={breadcrumb} />

      <div className="mt-[33px]">
        <h1 className="text-[22px] font-semibold leading-none text-[#0A0847]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-[6px] text-[14px] text-[#0A084799]">{subtitle}</p>
        )}
      </div>

      <div className="mt-6 w-full max-w-[533px] [&>div]:w-full">
        <LocationChip />
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------
   FIELDS
   ---------------------------------------------------------------------- */
export function Field({ label, required, htmlFor, children, className = "" }) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={htmlFor} className={labelClass}>
          {label} {required && <span className="text-[#E11D48]">*</span>}
        </label>
      )}
      {children}
    </div>
  );
}

export function TextInput({
  id,
  value,
  onChange,
  placeholder,
  adornment,
  className = "",
}) {
  return (
    <div className="relative w-full">
      <input
        id={id}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={`${inputClass} ${adornment ? "pr-14" : ""} ${className}`}
      />
      {adornment && (
        <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[12px] text-[#0A084799]">
          {adornment}
        </span>
      )}
    </div>
  );
}

export function Select({ id, value, options, onChange, className = "" }) {
  return (
    <div className={`relative w-full ${className}`}>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className={`${inputClass} cursor-pointer appearance-none pr-10`}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <LuChevronDown
        size={16}
        className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[#0A084799]"
        aria-hidden
      />
    </div>
  );
}

/* textarea with the character counter sitting INSIDE, bottom-right
   Figma: radius 7.47, text Inter 600 12px @60%, left padding ~15px */
export function TextArea({
  id,
  value,
  onChange,
  max,
  className = "",
  rows = 3,
}) {
  return (
    <div className="relative">
      <textarea
        id={id}
        rows={rows}
        value={value}
        maxLength={max}
        onChange={onChange}
        className={`w-full resize-none rounded-[7.47px] border border-[#E2DFFC] bg-white px-[15px] pt-3 pb-7 text-[12px] font-semibold leading-[15px] text-[#0A0847]/60 outline-none transition placeholder:text-[#0A084799] focus:border-[#041581] ${className}`}
      />
      <span className="absolute right-4 bottom-2.5 text-[11px] italic text-[#0A084799]">
        {value.length} / {max}
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------
   TOGGLE — 26 x 16 track, 12px white knob
   ---------------------------------------------------------------------- */
export function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-4 w-[26px] shrink-0 cursor-pointer rounded-full transition-colors ${
        checked ? "bg-[#0B4FBF]" : "bg-[#D1D5DB]"
      }`}
    >
      <span
        className={`absolute top-[2px] h-3 w-3 rounded-full bg-white shadow-sm transition-all ${
          checked ? "left-[12px]" : "left-[2px]"
        }`}
      />
    </button>
  );
}

/* -------------------------------------------------------------------------
   IMAGE UPLOAD BOX — click to browse, drag & drop, removable
   Figma: 535 x 193, radius 8, caption Inter 500 12px, letter-spacing 2%
   ---------------------------------------------------------------------- */
export function ImageUploadBox({
  image,
  onSelect,
  onRemove,
  caption,
  alt,
  width = "max-w-[535px]",
}) {
  const inputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  const openPicker = () => inputRef.current?.click();

  const take = (files) => {
    const file = files?.[0];
    if (file && file.type.startsWith("image/")) onSelect(URL.createObjectURL(file));
  };

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        aria-label={alt}
        onClick={openPicker}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openPicker();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          take(e.dataTransfer.files);
        }}
        className={`relative h-[193px] w-full ${width} cursor-pointer overflow-hidden rounded-lg border bg-white transition-colors ${
          image
            ? "border-solid border-[#E2DFFC]"
            : dragActive
              ? "border-dashed border-[#041581]"
              : "border-dashed border-[#E2DFFC]"
        }`}
      >
        {image && (
          <img
            src={image}
            alt={alt}
            className="h-full w-full object-cover"
            draggable={false}
          />
        )}

        {image && (
          <button
            type="button"
            aria-label="Remove image"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="absolute top-3 right-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white"
          >
            <LuCircleX size={26} className="text-[#0A0847]" aria-hidden />
          </button>
        )}
      </div>

      <p className="mt-2 text-center text-[12px] font-medium leading-[18px] tracking-[0.02em] text-[#0A084799]">
        {caption[0]}
        <br />
        {caption[1]}
      </p>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => take(e.target.files)}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------
   AUDIO FILE CARD — header row (icon / name / meta / check) + body slot
   Figma: icon 42x42, name Inter 600 14px, meta Inter 500 12px,
   check 29x29 / 2.5px stroke / #259147
   ---------------------------------------------------------------------- */
export const AUDIO_FILE_NAME = "john_3_bulkquiz_2026.csv";
export const AUDIO_FILE_META = "12.4 KB • 25 rows";

export function AudioFileCard({ children }) {
  return (
    <div className="w-full overflow-hidden rounded-lg border border-[#E2DFFC] bg-[#FBFBFF]">
      <div className="flex h-[72px] items-center gap-3 px-4">
        <img
          src={audioFileIcon}
          alt=""
          aria-hidden
          className="h-[42px] w-[42px] shrink-0 object-contain"
        />

        <div className="min-w-0 flex-1">
          <p className="truncate text-[14px] font-semibold text-[#0A0847]">
            {AUDIO_FILE_NAME}
          </p>
          <p className="text-[12px] font-medium text-[#0A0847]/60">
            {AUDIO_FILE_META}
          </p>
        </div>

        <LuCircleCheck
          size={29}
          strokeWidth={2.5}
          className="shrink-0 text-[#259147]"
          aria-hidden
        />
      </div>

      {children && <div className="border-t border-[#E2DFFC]">{children}</div>}
    </div>
  );
}

/* -------------------------------------------------------------------------
   WAVEFORM — 60 thin bars, fixed pattern so it never shifts between renders
   ---------------------------------------------------------------------- */
const WAVE_BARS = [
  8, 14, 20, 12, 6, 16, 22, 10, 18, 24, 9, 13, 19, 7, 15, 21, 11, 17, 23, 8, 14, 20,
  12, 6, 16, 22, 10, 18, 24, 9, 13, 19, 7, 15, 21, 11, 17, 23, 8, 14, 20, 12, 6, 16,
  22, 10, 18, 24, 9, 13, 19, 7, 15, 21, 11, 17, 23, 8, 14, 20, 12,
];

export function Waveform() {
  return (
    <div className="flex h-full flex-1 items-center gap-[1.5px] overflow-hidden">
      {WAVE_BARS.map((height, index) => (
        <span
          key={index}
          style={{ height }}
          className="w-[1.5px] shrink-0 rounded-full bg-[#8B9BE0]"
        />
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------
   AUDIO PLAYER BAR
   Figma (form):    535 x 51,  padding 12 / 16, gap 10, play circle ~21px
   Figma (preview): 402 x 62,  padding 16 / 29 / 12 / 16, gap 10, play circle 28px
   Play circle #001984, time text Inter 500 12px @80%, bg #FEFEFF, radius 8
   Use variant="preview" for the Story Entry Preview card.
   ---------------------------------------------------------------------- */
export function AudioPlayer({ time, variant = "form" }) {
  const isPreview = variant === "preview";

  return (
    <div
      className={`flex w-full items-center gap-[10px] rounded-lg border border-[#E2DFFC] bg-[#FEFEFF] ${
        isPreview ? "h-[62px] pt-4 pr-[29px] pb-3 pl-4" : "h-[51px] px-4 py-3"
      }`}
    >
      <span
        className={`flex shrink-0 items-center justify-center rounded-full bg-[#001984] ${
          isPreview ? "h-7 w-7" : "h-[21px] w-[21px]"
        }`}
      >
        <LuPlay
          size={isPreview ? 12 : 9}
          className="ml-[1px] text-white"
          aria-hidden
        />
      </span>

      <Waveform />

      <span className="shrink-0 text-[12px] font-medium text-[#0A0847]/80">
        {time}
      </span>
    </div>
  );
}