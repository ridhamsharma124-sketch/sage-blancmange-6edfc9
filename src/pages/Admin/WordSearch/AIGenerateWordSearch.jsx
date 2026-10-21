import { useState } from "react";
import {
  LuChevronDown,
  LuChevronUp,
  LuRotateCw,
  LuCheck,
  LuX,
  LuImagePlus,
  LuPlus,
  LuSparkles,
  LuSave,
  LuEye,
  LuArrowRight,
  LuZap,
} from "react-icons/lu";
import lionImg from "../../../assets/word search/lion1.png";
import lion2Img from "../../../assets/word search/lion2.png";

/* ==========================================================================
   TOKENS
   ========================================================================== */
const NAVY = "#041581";
const HEADING = "#0A0847";
const GRAY = "#6B7194";
const BORDER = "#E5E4EC";
const CARD_BORDER = "#E2DFFC";
const PAGE_BG = "#F9FAFE";
const GREEN = "#16A34A";
const LAVENDER = "#F1EFFC";

/* ==========================================================================
   HEADER FIELDS
   ========================================================================== */
const HEADER_FIELDS = [
  { id: "testament", label: "Testament", value: "Old Testament", options: ["Old Testament", "New Testament"] },
  { id: "book", label: "Book", value: "Genesis", options: ["Genesis", "Exodus", "Psalms", "John"] },
  { id: "chapter", label: "Chapter", value: "1", options: ["1", "2", "3"] },
  { id: "difficulty", label: "Difficulty", value: "Easy", options: ["Easy", "Medium", "Hard"] },
];

const TOPIC_OPTIONS = ["Creation (Genesis 1)", "Creation (Genesis 1:1-8)", "Genesis 1 — Full Chapter"];
const CLUE_STYLE_OPTIONS = ["Short Clues", "Long Clues", "Mixed Clues"];
const UNIQUE_OPTIONS = ["High (No Duplicates)", "Medium", "Low"];
const PUZZLE_COUNT_OPTIONS = ["1", "2", "3", "4", "5"];
const GRID_OPTIONS = ["10 x 10", "12 x 12", "15 x 15", "20 x 20"];
const IMAGE_STYLE_OPTIONS = ["Biblical Illustration", "Watercolour", "Modern Art", "Line Art"];
const SAFETY_OPTIONS = ["Family Safe", "Family Safe (Strict)", "Unfiltered"];

const LEVEL_OPTIONS = ["Level 1", "Level 2", "Level 3", "Level 4", "Level 5"];

/* ==========================================================================
   PRIMITIVES
   ========================================================================== */
const selectCls =
  "h-[38px] w-full cursor-pointer appearance-none rounded-[6px] border border-[#E5E4EC] bg-white pl-3 pr-8 text-[13px] outline-none focus:border-[#041581]";

const lbl = "mb-1.5 block text-[12px] font-bold";
function Chevron() {
  return (
    <LuChevronDown
      size={15}
      className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2"
      style={{ color: GRAY }}
      aria-hidden
    />
  );
}

function Toggle({ on, onChange, label, color = GREEN }) {
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

function NumberStepper({ value, onChange, label }) {
  return (
    <div className="relative">
      <input
        type="number"
        min="0"
        aria-label={label}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-[38px] w-full rounded-[6px] border border-[#E5E4EC] bg-white pr-8 pl-3 text-[13px] outline-none focus:border-[#041581]"
        style={{ color: HEADING }}
      />
      <span className="pointer-events-none absolute top-1/2 right-2 flex -translate-y-1/2 flex-col">
        <button
          type="button"
          tabIndex={-1}
          aria-label={`Increase ${label}`}
          onClick={() => onChange((n) => (n ?? 0) + 1)}
          className="flex h-[10px] w-[16px] cursor-pointer items-center justify-center text-[#6B7194]"
        >
          <LuChevronUp size={11} />
        </button>
        <button
          type="button"
          tabIndex={-1}
          aria-label={`Decrease ${label}`}
          onClick={() => onChange((n) => Math.max(0, (n ?? 0) - 1))}
          className="flex h-[10px] w-[16px] cursor-pointer items-center justify-center text-[#6B7194]"
        >
          <LuChevronDown size={11} />
        </button>
      </span>
    </div>
  );
}

/* ==========================================================================
   TABS
   ========================================================================== */
const TABS = ["Manual Entry", "CSV Upload", "AI Generate"];

function TabsRow() {
  return (
    <div className="mt-[30px] flex items-stretch border-b border-[#E5E4EC]">
      {TABS.map((t) => {
        const active = t === "AI Generate";
        return (
          <button
            key={t}
            type="button"
            className={`h-[50px] px-6 text-[15px] ${
              active
                ? "-mb-px border-b-2 font-bold"
                : "font-normal"
            }`}
            style={{
              borderColor: active ? NAVY : "transparent",
              color: active ? NAVY : GRAY,
            }}
          >
            {t}
          </button>
        );
      })}
    </div>
  );
}

/* ==========================================================================
   AI GENERATE FORM CONTAINER
   ========================================================================== */
function AIGenerateForm() {
  const [topic, setTopic] = useState(TOPIC_OPTIONS[0]);
  const [words, setWords] = useState(12);
  const [clueStyle, setClueStyle] = useState(CLUE_STYLE_OPTIONS[0]);
  const [diagonal, setDiagonal] = useState(true);
  const [backward, setBackward] = useState(true);
  const [uniqueness, setUniqueness] = useState(UNIQUE_OPTIONS[0]);
  const [count, setCount] = useState("2");
  const [gridSize, setGridSize] = useState(GRID_OPTIONS[2]);
  const [levels, setLevels] = useState(["Level 1", "Level 2", "Level 3"]);
  const [aiImage, setAiImage] = useState(true);
  const [imageStyle, setImageStyle] = useState(IMAGE_STYLE_OPTIONS[0]);
  const [safety, setSafety] = useState(SAFETY_OPTIONS[0]);
  const [noText, setNoText] = useState(true);

  const removeLevel = (lv) => setLevels((p) => p.filter((x) => x !== lv));

  const perLevel = levels.map((lv, i) => ({
    label: `${lv}:`,
    value: i === 2 ? 0 : 1,
  }));

  return (
    <div
      className="flex w-full flex-col gap-[10px] rounded-[7.5px] border bg-white pt-4 pr-7 pb-4 pl-[27px]"
      style={{ height: "321px", borderWidth: "0.75px", borderColor: BORDER }}
    >
      <div>
        <h2 className="text-[18px] font-bold" style={{ color: HEADING }}>
          Add / Edit Word Search
        </h2>
        <p className="mt-1 text-[13px]" style={{ color: GRAY }}>
          hoose the activity type and how you want to create it.
        </p>
      </div>

      {/* ROW 1 — 6 fields */}
      <div className="flex items-start gap-[10px]">
        <div className="w-[214px] shrink-0">
          <label className={lbl} style={{ color: HEADING }}>Topic / Passage</label>
          <div className="relative">
            <select value={topic} onChange={(e) => setTopic(e.target.value)} className={selectCls} style={{ color: HEADING }}>
              {TOPIC_OPTIONS.map((o) => (<option key={o} value={o}>{o}</option>))}
            </select>
            <Chevron />
          </div>
        </div>

        <div className="w-[122px] shrink-0">
          <label className={lbl} style={{ color: HEADING }}>Words per Puzzle</label>
          <NumberStepper value={words} onChange={setWords} label="Words per Puzzle" />
        </div>

        <div className="w-[138px] shrink-0">
          <label className={lbl} style={{ color: HEADING }}>Clue Style</label>
          <div className="relative">
            <select value={clueStyle} onChange={(e) => setClueStyle(e.target.value)} className={selectCls} style={{ color: HEADING }}>
              {CLUE_STYLE_OPTIONS.map((o) => (<option key={o} value={o}>{o}</option>))}
            </select>
            <Chevron />
          </div>
        </div>

        <div className="w-[104px] shrink-0">
          <label className={lbl} style={{ color: HEADING }}>Allow Diagonal</label>
          <div className="flex h-[38px] items-center">
            <Toggle on={diagonal} onChange={setDiagonal} label="Allow Diagonal" />
          </div>
        </div>

        <div className="w-[112px] shrink-0">
          <label className={lbl} style={{ color: HEADING }}>Allow Backward</label>
          <div className="flex h-[38px] items-center">
            <Toggle on={backward} onChange={setBackward} label="Allow Backward" />
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <label className={lbl} style={{ color: HEADING }}>Answer Uniqueness</label>
          <div className="relative">
            <select value={uniqueness} onChange={(e) => setUniqueness(e.target.value)} className={selectCls} style={{ color: HEADING }}>
              {UNIQUE_OPTIONS.map((o) => (<option key={o} value={o}>{o}</option>))}
            </select>
            <Chevron />
          </div>
        </div>
      </div>

      {/* ROW 2 — 4 fields */}
      <div className="flex items-start gap-[10px]">
        <div className="w-[152px] shrink-0">
          <label className={lbl} style={{ color: HEADING }}>Number of Puzzles</label>
          <div className="relative">
            <select value={count} onChange={(e) => setCount(e.target.value)} className={selectCls} style={{ color: HEADING }}>
              {PUZZLE_COUNT_OPTIONS.map((o) => (<option key={o} value={o}>{o}</option>))}
            </select>
            <Chevron />
          </div>
        </div>

        <div className="w-[131px] shrink-0">
          <label className={lbl} style={{ color: HEADING }}>Grid Size</label>
          <div className="relative">
            <select value={gridSize} onChange={(e) => setGridSize(e.target.value)} className={selectCls} style={{ color: HEADING }}>
              {GRID_OPTIONS.map((o) => (<option key={o} value={o}>{o}</option>))}
            </select>
            <Chevron />
          </div>
        </div>

        <div className="w-[356px] shrink-0">
          <label className={lbl} style={{ color: HEADING }}>New Levels</label>
          <div className="flex h-[38px] w-full items-center gap-1.5 rounded-[6px] border border-[#E5E4EC] bg-white px-2">
            {levels.map((lv) => (
              <span
                key={lv}
                className="flex h-[24px] shrink-0 items-center gap-1 rounded-[5px] px-2 text-[12px] font-semibold"
                style={{ backgroundColor: LAVENDER, color: NAVY }}
              >
                {lv}
                <button
                  type="button"
                  aria-label={`Remove ${lv}`}
                  onClick={() => removeLevel(lv)}
                  className="cursor-pointer"
                  style={{ color: NAVY }}
                >
                  <LuX size={11} />
                </button>
              </span>
            ))}
            <label
              className="ml-auto flex h-[24px] w-[24px] shrink-0 cursor-pointer items-center justify-center rounded-[5px] border"
              style={{ borderColor: BORDER, color: NAVY }}
            >
              <LuPlus size={13} />
              <select
                aria-label="Add level"
                value=""
                onChange={(e) => {
                  if (e.target.value && !levels.includes(e.target.value)) {
                    setLevels((p) => [...p, e.target.value]);
                  }
                }}
                className="absolute h-px w-px opacity-0"
              >
                <option value="">Add…</option>
                {LEVEL_OPTIONS.map((o) => (<option key={o} value={o}>{o}</option>))}
              </select>
            </label>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <label className={lbl} style={{ color: HEADING }}>Puzzles per Level</label>
          <div
            className="flex h-[38px] items-center gap-3 rounded-[6px] border border-[#E5E4EC] bg-white px-3 text-[12px]"
            style={{ color: HEADING }}
          >
            {perLevel.map((p) => (
              <span key={p.label} className="whitespace-nowrap">
                <span className="font-bold">{p.label}</span> {p.value}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ROW 3 — 4 items */}
      <div className="flex items-start gap-[10px]">
        <div className="w-[292px] shrink-0">
          <label className={lbl} style={{ color: HEADING }}>Generate a unique AI image for every puzzle</label>
          <div className="flex h-[38px] items-center">
            <Toggle on={aiImage} onChange={setAiImage} label="Generate a unique AI image for every puzzle" />
          </div>
        </div>

        <div className="w-[178px] shrink-0">
          <label className={lbl} style={{ color: HEADING }}>AI Image Style</label>
          <div className="relative">
            <select value={imageStyle} onChange={(e) => setImageStyle(e.target.value)} className={selectCls} style={{ color: HEADING }}>
              {IMAGE_STYLE_OPTIONS.map((o) => (<option key={o} value={o}>{o}</option>))}
            </select>
            <Chevron />
          </div>
        </div>

        <div className="w-[145px] shrink-0">
          <label className={lbl} style={{ color: HEADING }}>Image Safety</label>
          <div className="relative">
            <select value={safety} onChange={(e) => setSafety(e.target.value)} className={selectCls} style={{ color: HEADING }}>
              {SAFETY_OPTIONS.map((o) => (<option key={o} value={o}>{o}</option>))}
            </select>
            <Chevron />
          </div>
        </div>

        <div className="w-[150px] shrink-0">
          <label className={lbl} style={{ color: HEADING }}>No text in image</label>
          <div className="flex h-[38px] items-center">
            <Toggle on={noText} onChange={setNoText} label="No text in image" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   PUZZLE CARD
   ========================================================================== */
/* 15 x 15 word-search grid — each string is one row of 15 letters (Level 2) */
const LETTERS_15 = [
  "LIGHTSOFCREEDHE",
  "AVENWATERSAYVEI",
  "NDGIOORFISHBIRD",
  "SCASEARTFNDAYFO",
  "ULIGHTSOFCREEDH",
  "EAVENWATERSAYVE",
  "INDGIOORFISHBIR",
  "DSCASEARTFNDAYF",
  "OULIGHTSOFCREED",
  "HEAVENWATERSAYV",
  "EINDGIOORFISHBI",
  "RDSCASEARTFNDAY",
  "FOULIGHTSOFCREE",
  "DHEAVENWATERSAY",
  "VEINDGIOORFISHB",
];

/* 11 x 6 word-search grid — each string is one row of 11 letters (Level 1).
   Row 1 opens with LIGHT on the left edge (clue 6). */
const LETTERS = [
  "LIGHTSOFCRE",
  "EDHEAVENWAT",
  "ERSSAYEINDI",
  "GOORFISHBIR",
  "DSCASEARTFN",
  "DAYFOUCLUES",
];

const CLUES = [
  "The expanse above the earth",
  "The waters separated together",
  "Made on the fifth day",
  "The planet we live on",
  "The day God began",
  "The light which is on the day left side",
];

const LETTER_TINT = "#0A0847CC";
const CLUE_TINT = "#0A084799";

function LetterGrid() {
  return (
    <div
      className="grid h-[223px] w-[229px] shrink-0 content-center"
      style={{
        gridTemplateColumns: "repeat(15, 1fr)",
        columnGap: "2px",
        rowGap: "2px",
      }}
    >
      {LETTERS_15.flatMap((row, i) =>
        row.split("").map((ch, j) => (
          <span
            key={`${i}-${j}`}
            className="flex items-center justify-center text-[12px] leading-none font-bold"
            style={{ color: LETTER_TINT }}
          >
            {ch}
          </span>
        )),
      )}
    </div>
  );
}

function LetterGridLight({ rows = LETTERS }) {
  return (
    <div
      className="grid w-[229px] shrink-0"
      style={{
        gridTemplateColumns: `repeat(${rows[0].length}, 1fr)`,
        columnGap: "2px",
        rowGap: "3px",
      }}
    >
      {rows.flatMap((row, i) =>
        row.split("").map((ch, j) => (
          <span
            key={`${i}-${j}`}
            className="flex items-center justify-center text-[12px] leading-none font-bold"
            style={{ color: LETTER_TINT }}
          >
            {ch}
          </span>
        )),
      )}
    </div>
  );
}

function ClueList({ clues = CLUES }) {
  return (
    <div className="mt-4 w-[229px] shrink-0">
      <p className="text-[11px] font-bold tracking-[0.4px]" style={{ color: NAVY }}>
        CLUES
      </p>
      <ol className="mt-1.5 space-y-1">
        {clues.map((c, i) => (
          <li key={c} className="flex items-start gap-1.5 text-[10px] leading-[1.4]">
            <span className="font-bold" style={{ color: CLUE_TINT }}>
              {i + 1}.
            </span>
            <span style={{ color: CLUE_TINT }}>{c}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function PuzzleCard({ level, puzzle }) {
  return (
    <div
      className="flex w-[519px] flex-col rounded-[7.5px] border bg-white pt-[15px] pr-[21px] pb-[28px] pl-5"
      style={{ minHeight: "413px", borderWidth: "0.75px", borderColor: CARD_BORDER }}
    >
      {/* top row */}
      <div className="flex items-start justify-between">
        <p className="text-[13px] font-bold" style={{ color: HEADING }}>
          {level} • Puzzle {puzzle}
        </p>
        <span
          className="flex h-[20px] items-center rounded-[10px] px-2.5 text-[10px] font-bold tracking-[0.4px]"
          style={{ backgroundColor: "#E3F7E6", color: GREEN }}
        >
          AI IMAGE
        </span>
      </div>

      {/* 2-column body */}
      <div className="mt-3 flex flex-1 items-start gap-5">
        <div
          className="h-[223px] w-[229px] shrink-0 overflow-hidden rounded-[7.5px] border"
          style={{ borderWidth: "0.75px", borderColor: CARD_BORDER }}
        >
          <img src={lionImg} alt="Lion" className="h-full w-full object-cover" />
        </div>

        <LetterGrid />
      </div>

      {/* button row 1 */}
      <div className="mt-3 flex items-center gap-2">
        <SmallOutline icon={LuRotateCw} label="Regenerate Puzzle" />
        <SmallOutline icon={LuZap} label="Regenerate Image" />
        <SmallOutline icon={LuImagePlus} label="Replace Image" />
      </div>

      {/* button row 2 */}
      <div className="mt-2 flex items-center gap-2">
        <SmallOutline icon={LuSparkles} label="Edit" />
        <button
          type="button"
          className="flex h-[30px] cursor-pointer items-center gap-1.5 rounded-[6px] px-3 text-[12px] font-bold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: NAVY }}
        >
          <LuCheck size={13} />
          Publish Approved
        </button>
      </div>
    </div>
  );
}

function LevelOneCard({ level, puzzle }) {
  return (
    <div
      className="flex w-[519px] flex-col rounded-[7.5px] border bg-white pt-[15px] pr-[21px] pb-[28px] pl-5"
      style={{ minHeight: "413px", borderWidth: "0.75px", borderColor: CARD_BORDER }}
    >
      {/* top row */}
      <div className="flex items-start justify-between">
        <p className="text-[13px] font-bold" style={{ color: HEADING }}>
          {level} • Puzzle {puzzle}
        </p>
        <span
          className="flex h-[20px] items-center rounded-[10px] px-2.5 text-[10px] font-bold tracking-[0.4px]"
          style={{ backgroundColor: "#E3F7E6", color: GREEN }}
        >
          AI IMAGE
        </span>
      </div>

      {/* 2-column body — image box on the left, alphabet + clues on the right */}
      <div className="mt-3 flex flex-1 items-start gap-5">
        <div
          className="h-[223px] w-[229px] shrink-0 overflow-hidden rounded-[7.5px] border"
          style={{ borderWidth: "0.75px", borderColor: CARD_BORDER }}
        >
          <img src={lion2Img} alt="Lion 2" className="h-full w-full object-cover" />
        </div>

        <div className="flex w-[229px] shrink-0 flex-col">
          <LetterGridLight />
          <ClueList />
        </div>
      </div>

      {/* button row 1 */}
      <div className="mt-3 flex items-center gap-2">
        <SmallOutline icon={LuRotateCw} label="Regenerate Puzzle" />
        <SmallOutline icon={LuZap} label="Regenerate Image" />
        <SmallOutline icon={LuImagePlus} label="Replace Image" />
      </div>

      {/* button row 2 */}
      <div className="mt-2 flex items-center gap-2">
        <SmallOutline icon={LuSparkles} label="Edit" />
        <button
          type="button"
          className="flex h-[30px] cursor-pointer items-center gap-1.5 rounded-[6px] px-3 text-[12px] font-bold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: NAVY }}
        >
          <LuCheck size={13} />
          Publish Approved
        </button>
      </div>
    </div>
  );
}

function SmallOutline({ icon: Icon, label }) {
  return (
    <button
      type="button"
      className="flex h-[30px] cursor-pointer items-center gap-1.5 rounded-[6px] border px-3 text-[12px] font-semibold transition-colors hover:bg-[#F7F8FE]"
      style={{ borderColor: NAVY, color: NAVY }}
    >
      <Icon size={13} />
      {label}
    </button>
  );
}

/* ==========================================================================
   PAGE
   ========================================================================== */
export default function AIGeneratePage() {
  const [reward, setReward] = useState(10);
  const [values, setValues] = useState(() =>
    HEADER_FIELDS.reduce((acc, f) => ({ ...acc, [f.id]: f.value }), {}),
  );

  return (
    <div
      className="min-h-[calc(100vh-72px)]"
      style={{
        backgroundColor: PAGE_BG,
        color: HEADING,
        fontFamily: "'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif",
      }}
    >
      <div className="mx-auto max-w-[1119px] px-5 py-6">
        {/* page header */}
        <h1 className="text-[22px] font-bold" style={{ color: HEADING }}>
          Add / Edit Word Search
        </h1>
        <p className="mt-1 text-[14px]" style={{ color: GRAY }}>
          hoose the activity type and how you want to create it.
        </p>

        {/* 5 filter fields */}
        <div className="mt-6 grid grid-cols-5 gap-4">
          {HEADER_FIELDS.map(({ id, label, options }) => (
            <div key={id}>
              <label htmlFor={id} className={lbl} style={{ color: HEADING }}>
                {label}
              </label>
              <div className="relative">
                <select
                  id={id}
                  value={values[id]}
                  onChange={(e) => setValues((p) => ({ ...p, [id]: e.target.value }))}
                  className={selectCls}
                  style={{ color: HEADING }}
                >
                  {options.map((o) => (<option key={o} value={o}>{o}</option>))}
                </select>
                <Chevron />
              </div>
            </div>
          ))}

          <div>
            <label htmlFor="reward" className={lbl} style={{ color: HEADING }}>
              Reward Points
            </label>
            <NumberStepper value={reward} onChange={setReward} label="Reward Points" />
          </div>
        </div>

        <TabsRow />

        {/* AI generate form */}
        <div className="mt-8">
          <AIGenerateForm />
        </div>

        {/* generated puzzles preview */}
        <h3 className="mt-8 text-[15px] font-bold" style={{ color: HEADING }}>
          Generated Puzzles Preview
        </h3>

        <div className="mt-4 grid grid-cols-2 gap-[21px]">
          <LevelOneCard level="Level 1" puzzle={1} />
          <PuzzleCard level="Level 2" puzzle={1} />
        </div>

        {/* bottom page actions */}
        <div className="mt-8 flex items-center justify-between gap-4 pb-6">
          <button
            type="button"
            className="flex h-[44px] cursor-pointer items-center rounded-[6px] border px-4 text-[13px] font-semibold transition-colors hover:bg-[#F0F2FB]"
            style={{ borderColor: NAVY, color: NAVY }}
          >
            Cancel
          </button>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              className="flex h-[44px] cursor-pointer items-center gap-2 rounded-[6px] border px-4 text-[13px] font-semibold transition-colors hover:bg-[#F0F2FB]"
              style={{ borderColor: NAVY, color: NAVY }}
            >
              <LuSave size={15} />
              Save draft
            </button>
            <button
              type="button"
              className="flex h-[44px] cursor-pointer items-center gap-2 rounded-[6px] border px-4 text-[13px] font-semibold transition-colors hover:bg-[#F0F2FB]"
              style={{ borderColor: NAVY, color: NAVY }}
            >
              <LuEye size={15} />
              Preview
            </button>
            <button
              type="button"
              className="flex h-[44px] cursor-pointer items-center gap-2 rounded-[6px] px-4 text-[13px] font-bold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: NAVY }}
            >
              <LuArrowRight size={15} />
              Publish Approved
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}