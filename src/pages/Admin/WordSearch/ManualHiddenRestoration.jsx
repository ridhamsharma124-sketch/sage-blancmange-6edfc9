import { useState } from "react";
import {
  LuChevronDown,
  LuChevronUp,
  LuRefreshCw,
  LuRotateCcw,
  LuSparkles,
  LuSave,
  LuEye,
  LuArrowRight,
  LuPlus,
  LuArrowUpDown,
  LuTrash2,
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

const HIDDEN_WORDS = [
  { n: 1, word: "CREATION", clue: "The act of bringing something into existence" },
  { n: 2, word: "HEAVENS", clue: "The sky and space above the earth" },
  { n: 3, word: "EARTH", clue: "The world God made" },
  { n: 4, word: "LIGHT", clue: "God said, \u201CLet there be light\u201D" },
  { n: 5, word: "WATERS", clue: "The waters above and below" },
  { n: 6, word: "PLANTS", clue: "Vegetation God caused to grow" },
];

const cardCls = `rounded-[8px] border border-[#EFECFB] bg-white`;
const field =
  "h-[38px] w-full rounded-[8px] border border-[#E4E5F0] bg-white px-3 text-[13px] font-normal text-[#6B668F] outline-none focus:border-[#001984]";
const lbl = "mb-[6px] block text-[14px] font-semibold text-[#3D3561]";

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

function ToggleRow({ label, on, onChange }) {
  return (
    <div className="flex h-10 items-center justify-between gap-3">
      <span className="text-[14px] font-medium text-[#3D3561]">{label}</span>
      <Toggle on={on} onChange={onChange} label={label} />
    </div>
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
   HIDDEN RESTORATION
   ========================================================================== */
function WordListTable({ rows }) {
  return (
    <>
      <p className={lbl}>Word List</p>
      <div className="mt-4 w-full">
        <table className="w-full table-fixed border-collapse text-left">
          <colgroup>
            <col style={{ width: "9.5%" }} />
            <col style={{ width: "21.4%" }} />
            <col style={{ width: "40.6%" }} />
            <col style={{ width: "28.5%" }} />
          </colgroup>
          <thead>
            <tr style={{ backgroundColor: "#F1F2FA" }} className="h-[49px]">
              {["#", "Word", "Clue", "Actions"].map((h) => (
                <th
                  key={h}
                  scope="col"
                  className="px-2 text-[13px] font-semibold text-[#3D3561]"
                  style={h === "#" || h === "Actions" ? { textAlign: "center" } : undefined}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.n} className="h-[51px] border-b border-[#EEEEF3]">
                <td className="px-2 py-2 text-center align-middle text-[13px] font-normal text-[#3D3561]">
                  {row.n}
                </td>
                <td className="px-2 py-2 align-middle text-[13px] font-normal text-[#3D3561]">
                  {row.word}
                </td>
                <td className="px-2 py-2 align-middle text-[13px] leading-[1.45] font-normal text-[#3D3561]">
                  {row.clue}
                </td>
                <td className="px-2 py-2 align-middle">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      aria-label={`Reorder ${row.word}`}
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[6px] border border-[#E6E7F0] bg-white transition-colors hover:bg-[#F7F8FE]"
                      style={{ color: "#03137F" }}
                    >
                      <LuArrowUpDown size={16} strokeWidth={2.5} />
                    </button>
                    <button
                      type="button"
                      aria-label={`Delete ${row.word}`}
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[6px] border border-[#E6E7F0] bg-white transition-colors hover:bg-[#FEF2F4]"
                      style={{ color: "#C8102E" }}
                    >
                      <LuTrash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        type="button"
        className="mt-6 flex h-10 w-[100px] cursor-pointer items-center justify-center gap-1.5 rounded-[8px] border border-[#E4E5F0] bg-white text-[14px] font-medium text-[#6B668F] transition-colors hover:bg-[#F7F8FE]"
      >
        <LuPlus size={16} />
        Add Word
      </button>
    </>
  );
}

function HiddenMiddle() {
  const [title, setTitle] = useState("Hidden Restoration");
  const [instructions, setInstructions] = useState("Find the hidden words from Genesis 1.");
  const [scripture, setScripture] = useState("Genesis 1 – The Creation");

  return (
    <div className={`${cardCls} flex min-w-0 flex-1 flex-col p-4`}>
      <div className="flex items-start gap-4">
        <div className="w-[231px] shrink-0">
          <label className={lbl}>Puzzle Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className={field} />
        </div>
        <div className="min-w-0 flex-1">
          <label className={lbl}>Instructions</label>
          <input
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className={field}
          />
        </div>
      </div>
      <div className="mt-[17px]">
        <label className={lbl}>Scripture / Topic</label>
        <input
          value={scripture}
          onChange={(e) => setScripture(e.target.value)}
          className={field}
        />
      </div>
      <div className="mt-4 border-b border-[#E4E5F0] pb-4" />
      <WordListTable rows={HIDDEN_WORDS} />
    </div>
  );
}

function HiddenRight() {
  const [size, setSize] = useState(GRID_VALUE);
  const [a, setA] = useState(true);
  const [b, setB] = useState(true);
  const [c, setC] = useState(true);
  return (
    <div className={`${cardCls} h-full w-full p-4`}>
      <label className={lbl}>Grid Size</label>
      <Select value={size} onChange={setSize} options={GRID_OPTIONS} className="w-full" />
      <div className="mt-[30px]">
        <ToggleRow label="Allow Diagonal" on={a} onChange={setA} />
        <ToggleRow label="Allow Backward" on={b} onChange={setB} />
        <ToggleRow label="Show Hints" on={c} onChange={setC} />
      </div>
    </div>
  );
}

/* ==========================================================================
   PAGE
   ========================================================================== */
export default function ManualHiddenRestoration() {
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
          Manual — Hidden Restoration
        </p>

        <div className="mt-[23px]">
          <FilterFields />
        </div>

        <TabsRow />

        <div className="mt-8">
          <div className="flex items-stretch gap-5">
            <PuzzleImageCard />
            <div className="flex min-w-0 flex-1 items-stretch gap-5">
              <HiddenMiddle />
              <div className="flex w-[200px] shrink-0 flex-col">
                <HiddenRight />
              </div>
            </div>
          </div>
        </div>

        <BottomBar />
      </div>
    </div>
  );
}