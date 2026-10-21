import { useState } from "react";
import {
  LuChevronDown,
  LuChevronUp,
  LuRefreshCw,
  LuRotateCcw,
  LuSparkles,
  LuX,
  LuSave,
  LuEye,
  LuArrowRight,
} from "react-icons/lu";
import puzzleImg from "../../../assets/word search/Puzzle img.png";

/* ==========================================================================
   TOKENS
   ========================================================================== */
const BODY = "#3D3561";
const NAVY = "#001984";
const GREEN = "#2EB84B";
const PAGE_BG = "#F8F9FE";

const TABS = ["Manual Entry", "CSV Upload", "AI Generate"];

const FILTER_FIELDS = [
  { id: "testament", label: "Testament", w: "w-[221px]", value: "Old Testament", options: ["Old Testament", "New Testament"] },
  { id: "book", label: "Book", w: "w-[162px]", value: "Genesis", options: ["Genesis", "Exodus", "Psalms", "John"] },
  { id: "chapter", label: "Chapter", w: "w-[130px]", value: "1", options: ["1", "2", "3"] },
  { id: "level", label: "Level", w: "w-[139px]", value: "Level 1", options: ["Level 1", "Level 2", "Level 3"] },
  { id: "difficulty", label: "Difficulty", w: "w-[159px]", value: "Easy", options: ["Easy", "Medium", "Hard"] },
];

const GRID_OPTIONS = ["10 × 10", "12 × 12", "15 × 15", "20 × 20"];
const GRID_VALUE = "15 × 15";

const VERSE_TEXT = "In the beginning God created the heavens and the earth.";
const MISSING_WORDS = ["Beginning", "God", "created", "heavens", "heavens"];
const VERSE_ANSWERS = ["Beginning", "God", "created", "heavens", "heavens"];

const cardCls = `rounded-[8px] border border-[#EFECFB] bg-white`;
const field =
  "h-[38px] w-full rounded-[8px] border border-[#E4E5F0] bg-white px-3 text-[13px] font-normal text-[#6B668F] outline-none focus:border-[#001984]";
const area =
  "w-full resize-none rounded-[8px] border border-[#E4E5F0] bg-white px-3 py-2 text-[13px] font-normal leading-[1.55] text-[#6B668F] outline-none focus:border-[#001984]";
const lbl = "mb-[6px] block text-[14px] font-semibold text-[#3D3561]";
const lblSoft = "mb-[6px] block text-[13px] font-normal text-[#6B668F]";

/* ==========================================================================
   SHARED PRIMITIVES
   ========================================================================== */
function Chevron({ className = "top-1/2 right-2.5 -translate-y-1/2", size = 14 }) {
  return (
    <LuChevronDown
      size={size}
      className={`pointer-events-none absolute ${className} text-[#9B96B8]`}
      aria-hidden
    />
  );
}

function Select({ value, onChange, options, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${field} cursor-pointer appearance-none pr-8`}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <Chevron />
    </div>
  );
}

function Toggle({ on, onChange, label, color = "#0552AA" }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className="relative h-[15px] w-[26px] shrink-0 cursor-pointer rounded-full transition-colors"
      style={{ backgroundColor: on ? color : "#D6D5E4" }}
    >
      <span
        className="absolute top-[2px] h-[11px] w-[11px] rounded-full bg-white shadow-sm transition-all"
        style={{ left: on ? 13 : 2 }}
      />
    </button>
  );
}

function DistractorChip({ children }) {
  return (
    <span
      className="inline-flex h-7 shrink-0 items-center gap-1.5 rounded-[8px] border px-2.5 text-[12px] font-medium whitespace-nowrap"
      style={{ backgroundColor: "#F4F2FC", borderColor: "#E3DFF6", color: BODY }}
    >
      {children}
      <LuX size={12} style={{ color: "#1F2FD8" }} aria-hidden />
    </span>
  );
}

/* ==========================================================================
   SHARED PAGE SECTIONS
   ========================================================================== */
function FilterFields() {
  const [values, setValues] = useState(() =>
    FILTER_FIELDS.reduce((acc, f) => ({ ...acc, [f.id]: f.value }), {}),
  );
  const [reward, setReward] = useState(10);

  return (
    <div className="flex items-start gap-6">
      {FILTER_FIELDS.map(({ id, label, w, options }) => (
        <div key={id} className={w}>
          <label
            htmlFor={id}
            className="mb-2 block text-[14px] font-medium text-[#0A0240]"
          >
            {label}
          </label>
          <Select
            value={values[id]}
            onChange={(v) => setValues((p) => ({ ...p, [id]: v }))}
            options={options}
            className="w-full"
          />
        </div>
      ))}

      <div className="w-[130px] shrink-0">
        <label htmlFor="reward" className="mb-2 block text-[14px] font-medium text-[#0A0240]">
          Reward Points
        </label>
        <div className="relative">
          <input
            id="reward"
            type="number"
            min="0"
            value={reward}
            onChange={(e) => setReward(Number(e.target.value))}
            className={`${field} pr-6`}
          />
          <span className="pointer-events-none absolute top-1/2 right-1.5 flex -translate-y-1/2 flex-col">
            <button
              type="button"
              tabIndex={-1}
              aria-label="Increase reward points"
              onClick={() => setReward((n) => n + 1)}
              className="flex h-[9px] w-[14px] cursor-pointer items-center justify-center text-[#9B96B8]"
            >
              <LuChevronUp size={11} />
            </button>
            <button
              type="button"
              tabIndex={-1}
              aria-label="Decrease reward points"
              onClick={() => setReward((n) => Math.max(0, n - 1))}
              className="flex h-[9px] w-[14px] cursor-pointer items-center justify-center text-[#9B96B8]"
            >
              <LuChevronDown size={11} />
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}

function TabsRow() {
  return (
    <div className="mt-[30px] flex items-stretch border-b border-[#E4E5F0]">
      {TABS.map((t) => {
        const active = t === "Manual Entry";
        return (
          <button
            key={t}
            type="button"
            className={`h-[50px] px-6 text-[15px] ${
              active
                ? "-mb-px border-b-2 border-[#001984] font-semibold text-[#001984]"
                : "font-normal text-[#6B668F]"
            }`}
          >
            {t}
          </button>
        );
      })}
    </div>
  );
}

function BottomBar() {
  const [published, setPublished] = useState(true);
  return (
    <div className="mt-12 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <span className="text-[15px] font-semibold text-[#6B668F]">Status</span>
        <Toggle on={published} onChange={setPublished} label="Toggle status" color={GREEN} />
        <span
          className="rounded-[6px] px-2.5 py-1 text-[13px] font-medium"
          style={{ backgroundColor: "#E3F7E6", color: GREEN }}
        >
          Published
        </span>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="flex h-[46px] cursor-pointer items-center justify-center gap-2 rounded-[8px] border border-[#E4E5F0] bg-white px-5 text-[14px] font-semibold text-[#3D3561] transition-colors hover:bg-[#F7F8FE]"
        >
          <LuSave size={16} style={{ color: NAVY }} />
          Save draft
        </button>
        <button
          type="button"
          className="flex h-[46px] cursor-pointer items-center justify-center gap-2 rounded-[8px] border border-[#E4E5F0] bg-white px-5 text-[14px] font-semibold text-[#3D3561] transition-colors hover:bg-[#F7F8FE]"
        >
          <LuEye size={16} style={{ color: NAVY }} />
          Preview
        </button>
        <button
          type="button"
          className="flex h-[46px] w-[190px] cursor-pointer items-center justify-center gap-2 rounded-[8px] text-[14px] font-bold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: NAVY }}
        >
          <LuArrowRight size={16} />
          Add Puzzle
        </button>
      </div>
    </div>
  );
}

function PuzzleImageCard() {
  return (
    <div className={`${cardCls} flex w-[298px] shrink-0 flex-col p-4`}>
      <h2 className="text-[15px] font-bold text-[#3D3561]">Puzzle Image</h2>

      <img
        src={puzzleImg}
        alt="Genesis garden and lake"
        className="mt-6 h-[167px] w-[264px] rounded-[8px] border border-[#AEB7D0] object-cover"
      />

      <div className="mt-6 flex items-start justify-between gap-2">
        <p className="text-[12px] leading-[1.4] text-[#6B668F]">
          Chapter default image
          <br />
          applied automatically
        </p>
        <span
          className="flex h-[29px] w-[79px] shrink-0 items-center justify-center rounded-[4px] text-[12px] font-bold text-[#001984]"
          style={{ backgroundColor: "#E3E4F6" }}
        >
          DEFAULT
        </span>
      </div>

      <div className="mt-6 flex h-[32px] items-center gap-2.5">
        <button
          type="button"
          className="flex h-[32px] w-[122px] shrink-0 cursor-pointer items-center gap-1 rounded-[8px] bg-[#FEFEFE] px-3 text-[12px] font-medium whitespace-nowrap text-[#0A0240] transition-colors hover:bg-[#F7F8FE]"
          style={{ border: "1px solid #E2DFFC" }}
        >
          <LuRefreshCw size={14} />
          Replace Default
        </button>
        <button
          type="button"
          className="flex h-[32px] w-[131px] shrink-0 cursor-pointer items-center gap-1 rounded-[8px] px-3 text-[12px] font-medium whitespace-nowrap text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: NAVY }}
        >
          <LuSparkles size={14} />
          Generate AI Image
        </button>
      </div>

      <button
        type="button"
        className="mt-6 flex h-[32px] w-full cursor-pointer items-center justify-center gap-1.5 rounded-[8px] bg-white px-3 text-[12px] font-medium whitespace-nowrap text-[#0A0240] transition-colors hover:bg-[#F7F8FE]"
        style={{ border: "1px solid #E2DFFC" }}
      >
        <LuRotateCcw size={14} />
        Reset to Chapter Default
      </button>
    </div>
  );
}

/* ==========================================================================
   VERSE RESTORATION
   ========================================================================== */
function VerseMiddle() {
  const [title, setTitle] = useState("Verse Restoration – Genesis 1:1");
  const [reference, setReference] = useState("Genesis");
  const [translation, setTranslation] = useState("NIV");
  const [verse, setVerse] = useState(VERSE_TEXT);
  const [answers, setAnswers] = useState(VERSE_ANSWERS);
  const [showBank, setShowBank] = useState(true);

  return (
    <div className={`${cardCls} flex min-w-0 flex-1 flex-col p-4`}>
      <label className={lbl}>Puzzle Title</label>
      <input value={title} onChange={(e) => setTitle(e.target.value)} className={field} />

      <div className="mt-[10px] flex items-start gap-2.5">
        <div className="min-w-0 flex-1">
          <label className={lbl}>Verse Reference</label>
          <input
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            className={field}
          />
        </div>
        <div className="w-[130px] shrink-0">
          <label className={lbl}>Translation</label>
          <Select
            value={translation}
            onChange={setTranslation}
            options={["NIV", "KJV", "ESV", "NLT"]}
            className="w-full"
          />
        </div>
      </div>

      <div className="mt-[10px]">
        <label className={lbl}>Full Verse Text</label>
        <textarea
          value={verse}
          onChange={(e) => setVerse(e.target.value)}
          className={`${area} h-[76px]`}
        />
      </div>

      <div className="mt-[10px]">
        <label className={lblSoft}>Missing Words (these will be hidden in the puzzle)</label>
        <div className="relative w-full rounded-[8px] border border-[#E4E5F0] bg-white px-3 py-2 pr-9">
          <div className="flex flex-wrap items-center gap-1.5">
            {MISSING_WORDS.map((w, i) => (
              <DistractorChip key={`${w}-${i}`}>{w}</DistractorChip>
            ))}
          </div>
          <Chevron />
        </div>
      </div>

      <div className="mt-[10px] flex items-start gap-2.5">
        <div className="min-w-0 flex-1">
          <p className={lblSoft}>Answer Word List (all hidden words)</p>
          <div className="mt-2.5 flex flex-col gap-2.5">
            {answers.map((v, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <span className="w-[14px] shrink-0 text-[14px] font-semibold text-[#3D3561]">
                  {i + 1}
                </span>
                <input
                  value={v}
                  onChange={(e) =>
                    setAnswers((p) => p.map((a2, j) => (j === i ? e.target.value : a2)))
                  }
                  className={`${field} flex-1`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="w-[205px] shrink-0 rounded-[8px] border border-[#E4E5F0] bg-white p-2.5">
          <div className="flex items-start justify-between gap-2">
            <p className="text-[12px] font-normal text-[#6B668F]">
              Show Word Bank (for verse restoration puzzles):
            </p>
            <Toggle on={showBank} onChange={setShowBank} label="Show Word Bank" />
          </div>
          <p className="mt-1.5 text-[12px] leading-[1.45] text-[#6B668F]">
            Display a word bank to help players solve the puzzle.
          </p>
        </div>
      </div>
    </div>
  );
}

function VerseRight() {
  const [size, setSize] = useState(GRID_VALUE);
  return (
    <div className={`${cardCls} h-full w-full p-4`}>
      <label className={lbl}>Grid Size</label>
      <Select value={size} onChange={setSize} options={GRID_OPTIONS} className="w-full" />
    </div>
  );
}

/* ==========================================================================
   PAGE
   ========================================================================== */
export default function ManualVerseRestoration() {
  return (
    <div
      className="min-h-[calc(100vh-72px)]"
      style={{
        backgroundColor: PAGE_BG,
        color: BODY,
        fontFamily: "'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif",
      }}
    >
      <div className="mx-auto max-w-[1118px] px-7 py-6">
        <nav className="text-[16px] font-normal text-[#6B668F]">
          Word Search <span className="mx-1">&gt;</span> Add <span className="mx-1">&gt;</span> Manual
        </nav>

        <h1 className="mt-[13px] text-[24px] leading-[1.2] font-bold text-[#0A0240]">
          Add Word Search — Manual Entry
        </h1>

        <p className="mt-[13px] text-[15px] font-semibold text-[#6B668F]">
          Manual — Verse Restoration
        </p>

        <div className="mt-[23px]">
          <FilterFields />
        </div>

        <TabsRow />

        <div className="mt-8">
          <div className="flex items-stretch gap-5">
            <PuzzleImageCard />
            <div className="flex min-w-0 flex-1 items-stretch gap-5">
              <VerseMiddle />
              <div className="flex w-[200px] shrink-0 flex-col">
                <VerseRight />
              </div>
            </div>
          </div>
        </div>

        <BottomBar />
      </div>
    </div>
  );
}