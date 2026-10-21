import { useState } from "react";
import selectorBookIcon from "../../../assets/activities/selector_book.png";
import chevronIcon from "../../../assets/activities/sel_chevron.png";
import chipXIcon from "../../../assets/activities/ws_chip_x.png";
import plusIcon from "../../../assets/activities/ws_plus.png";
import downloadIcon from "../../../assets/activities/ws_download.png";

/* ==========================================================================
   MOCK DATA — hardcoded exactly as specified
   ========================================================================== */
const PUZZLE_SIZE_OPTIONS = ["12 × 12", "10 × 10", "14 × 14", "16 × 16"];
const DIFFICULTY_OPTIONS = ["Easy", "Medium", "Hard"];
const STATUS_OPTIONS = ["Draft", "Active", "Inactive"];
const MAX_WORDS = 30;

const WORD_DIRECTIONS = ["Horizontal", "Vertical", "Diagonal", "Backward"];

const INITIAL_WORDS = [
  "JESUS",
  "NICODEMUS",
  "LIGHT",
  "WORLD",
  "SPIRIT",
  "BELIEVE",
  "ETERNAL",
  "TRUTH",
];

/* dot colour per word — drives the "Words to Find" list */
const WORD_DOT_COLORS = {
  JESUS: "#A8E6A1",
  NICODEMUS: "#A8E6A1",
  LIGHT: "#93B8F5",
  WORLD: "#C4A5F2",
  SPIRIT: "#93B8F5",
  BELIEVE: "#F7C77E",
  ETERNAL: "#F27C9A",
  TRUTH: "#F27C9A",
};

const CLUE_PLACEHOLDER = "Find the hidden words from John 3.";

/* -------------------------------------------------------------------------
   12 × 12 LETTER GRID
   ---------------------------------------------------------------------- */
const GRID = [
  "JESUSXKMLNLL",
  "KIGAMMKKOJXY",
  "BTFEZHXNCBEF",
  "LIGHTIHOLEEY",
  "PMAVRIUYQOCW",
  "NZWEFCXRYNDQ",
  "NZBOKDMINTBE",
  "LIEVEHRKCRAH",
  "HCNKFNNKTRUT",
  "HDLGUZRULIIH",
  "YLACRTTHHMOT",
  "AWOMMZGQDIAV",
];

/* highlight pills — ONE rounded rectangle behind each whole word */
const PILLS = {
  green: { bg: "rgba(33, 172, 28, 0.15)", border: "rgba(33, 172, 28, 0.4)" },
  blue: { bg: "rgba(152, 200, 253, 0.3)", border: "rgba(152, 200, 253, 0.8)" },
  purple: { bg: "rgba(64, 34, 209, 0.15)", border: "rgba(64, 34, 209, 0.35)" },
  orange: { bg: "rgba(245, 158, 11, 0.2)", border: "rgba(245, 158, 11, 0.5)" },
  pink: { bg: "rgba(244, 63, 94, 0.15)", border: "rgba(244, 63, 94, 0.35)" },
};

/* JESUS (r0 c0-4), HOLEE (r3 c6-10), MAV (r4 c1-3),
   NKFNNKTR (r8 c2-9), TTHHM (r10 c5-9) */
const HIGHLIGHTS = [
  { row: 0, col: 0, length: 5, tone: "green" },
  { row: 3, col: 6, length: 5, tone: "blue" },
  { row: 4, col: 1, length: 3, tone: "purple" },
  { row: 8, col: 2, length: 8, tone: "orange" },
  { row: 10, col: 5, length: 5, tone: "pink" },
];

/* ==========================================================================
   PAGE-LOCAL STYLES (activityFormShared.jsx left untouched for other pages)
   ========================================================================== */
const cardClass =
  "flex w-full min-w-0 flex-col gap-[10px] rounded-lg border border-[#E2DFFC] bg-[#FEFFFF] pt-[19px] pr-[22px] pb-[35px] pl-[24px]";

const labelCls = "mb-2 block text-[12px] font-semibold text-[#0A0847]";

const fieldCls =
  "h-10 w-full rounded-[7.47px] border border-[#E2DFFC] bg-white py-[10px] pl-[12px] pr-[50px] text-[12px] font-medium text-[#0A0847]/80 outline-none transition focus:border-[#001984]";

const dividerCls = "h-px w-full bg-[#0A0847]/10";

const outlineButton =
  "flex h-12 w-[152px] shrink-0 cursor-pointer items-center justify-center rounded-lg border border-[#001984] bg-[#FEFEFE] text-[14px] font-medium text-[#001984] transition-colors hover:bg-[#F1F1F9]";

const purpleButton =
  "flex h-12 w-[174px] shrink-0 cursor-pointer items-center justify-center rounded-lg bg-[#4022D1] px-4 py-[10px] text-[14px] font-medium text-white transition-colors hover:opacity-90";

const stepButton =
  "flex h-[43px] shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-[#001984] bg-[#FEFEFE] px-3 text-[14px] font-medium text-[#001984] transition-colors hover:bg-[#F1F1F9]";

/* ==========================================================================
   SUB-COMPONENTS
   ========================================================================== */
function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-[6px] text-[16px] font-medium text-[#0A0847]/60">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item} className="flex items-center gap-[6px]">
              {index > 0 && <span aria-hidden>&gt;</span>}
              <span aria-current={isLast ? "page" : undefined}>{item}</span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function LocationChip({ parts = ["New Testament", "John", "Chapter 3"] }) {
  return (
    <div className="inline-flex h-[49px] w-[396px] max-w-full items-center gap-[12px] self-start rounded-[8px] border border-[#E2DFFC] bg-[#F7F7F9] pl-[15px] pr-[12px]">
      <img src={selectorBookIcon} alt="" className="h-[19px] w-[24px] shrink-0" />
      <p className="text-[14px] font-semibold text-[#0A0847]">
        {parts.map((part, index) => (
          <span key={part}>
            {index > 0 && <span className="px-[8px] font-medium text-[#0A0847]/60">&gt;</span>}
            <span>{part}</span>
          </span>
        ))}
      </p>
    </div>
  );
}

function Field({ label, required, htmlFor, children }) {
  return (
    <div>
      {label && (
        <label htmlFor={htmlFor} className={labelCls}>
          {label} {required && <span className="text-[#E11D48]">*</span>}
        </label>
      )}
      {children}
    </div>
  );
}

function TextInput({ id, value, onChange, adornment }) {
  return (
    <div className="relative w-full">
      <input
        id={id}
        type="text"
        value={value}
        onChange={onChange}
        className={fieldCls}
      />
      {adornment && (
        <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[12px] text-[#0A0847]/60">
          {adornment}
        </span>
      )}
    </div>
  );
}

function Select({ id, value, options, onChange }) {
  return (
    <div className="relative w-full">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${fieldCls} cursor-pointer appearance-none`}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <img
        src={chevronIcon}
        alt=""
        className="pointer-events-none absolute top-1/2 right-4 w-[10px] -translate-y-1/2"
      />
    </div>
  );
}

/* ==========================================================================
   LIVE PUZZLE PREVIEW (right card)
   ========================================================================== */
function PuzzleGrid() {
  return (
    <div className="w-full rounded-lg border border-[#E2DFFC] bg-[#FEFFFF] p-[26px]">
      <div className="grid grid-cols-12 gap-y-5">
        {GRID.map((rowLetters, rowIndex) =>
          [...rowLetters].map((letter, colIndex) => {
            const highlight = HIGHLIGHTS.find(
              (item) => item.row === rowIndex && item.col === colIndex,
            );
            const tone = highlight ? PILLS[highlight.tone] : null;

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="relative flex h-9 items-center justify-center"
              >
                {tone && (
                  <span
                    aria-hidden
                    style={{
                      width: `calc(${highlight.length} * 100%)`,
                      background: tone.bg,
                      borderColor: tone.border,
                    }}
                    className="absolute left-0 top-1/2 z-0 h-9 -translate-y-1/2 rounded-lg border"
                  />
                )}
                <span className="relative z-[1] text-[16px] font-medium text-[#0A0847]">
                  {letter}
                </span>
              </div>
            );
          }),
        )}
      </div>
    </div>
  );
}

function WordsToFind({ words }) {
  return (
    <div className="rounded-lg border border-[#E2DFFC] bg-[#FEFFFF] pt-[19px] pr-[22px] pb-[19px] pl-[22px]">
      <h3 className="text-[22px] font-semibold text-[#0A0847]">Words to Find</h3>

      <ul className="mt-4 grid grid-flow-col grid-rows-4 gap-x-6 gap-y-3">
        {words.map((word) => (
          <li
            key={word}
            className="flex items-center gap-3 text-[14px] font-semibold whitespace-nowrap text-[#0A0847] uppercase"
          >
            <span
              style={{ background: WORD_DOT_COLORS[word] }}
              className="h-3 w-3 shrink-0 rounded-full"
            />
            {word}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ==========================================================================
   PAGE
   ========================================================================== */
export default function AddWordSearch() {
  const [title, setTitle] = useState("John 3 Word Search");
  const [puzzleSize, setPuzzleSize] = useState("12 × 12");
  const [difficulty, setDifficulty] = useState("Medium");
  const [directions, setDirections] = useState(WORD_DIRECTIONS);
  const [words, setWords] = useState(INITIAL_WORDS);
  const [clue, setClue] = useState("");
  const [timeLimit, setTimeLimit] = useState("10");
  const [rewardPoints, setRewardPoints] = useState("10");
  const [status, setStatus] = useState("Draft");

  const toggleDirection = (direction) =>
    setDirections((prev) =>
      prev.includes(direction)
        ? prev.filter((item) => item !== direction)
        : [...prev, direction],
    );

  const removeWord = (word) =>
    setWords((prev) => prev.filter((item) => item !== word));

  return (
    <div className="min-h-screen bg-[#F9FAFE] font-[Inter] text-[#0A0847]">
      <div className="flex w-full min-w-0 flex-col px-5 py-6">
        <Breadcrumb
          items={[
            "Bible Content",
            "Activities",
            "John",
            "Chapter 3",
            "Word Search",
          ]}
        />

        <h1 className="mt-5 text-[22px] font-semibold text-[#0A0847]">
          Add Word Search
        </h1>
        <p className="mt-2 text-[16px] font-medium text-[#0A0847]/60">
          Engage and track activities for each chapter.
        </p>

        <div className="mt-5">
          <LocationChip />
        </div>

        {/* TWO COLUMNS — equal, fluid, equal heights (bottoms aligned) */}
        <div className="mt-5 grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6">
          {/* LEFT — configure form */}
          <section className={cardClass}>
            <h2 className="text-[14px] font-semibold text-[#001984]">
              Configure Your Quiz
            </h2>

            <Field label="Puzzle Title" required htmlFor="puzzle-title">
              <TextInput
                id="puzzle-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Field>

            <Field label="Puzzle Size" required htmlFor="puzzle-size">
              <Select
                id="puzzle-size"
                value={puzzleSize}
                options={PUZZLE_SIZE_OPTIONS}
                onChange={setPuzzleSize}
              />
            </Field>

            <Field label="Difficulty" required htmlFor="difficulty">
              <Select
                id="difficulty"
                value={difficulty}
                options={DIFFICULTY_OPTIONS}
                onChange={setDifficulty}
              />
            </Field>

            <div className={dividerCls} />

            {/* WORD DIRECTION CHECKBOXES */}
            <div>
              <p className="text-[14px] font-semibold text-[#0A0847]">
                Word Direction
              </p>

              <div className="mt-2.5 flex w-[245px] flex-col gap-4">
                {WORD_DIRECTIONS.map((direction) => (
                  <label
                    key={direction}
                    className="flex cursor-pointer items-center gap-2.5 text-[14px] font-medium text-[#0A0847]"
                  >
                    <input
                      type="checkbox"
                      checked={directions.includes(direction)}
                      onChange={() => toggleDirection(direction)}
                      className="h-[16.67px] w-[16.67px] shrink-0 cursor-pointer accent-[#001984]"
                    />
                    {direction}
                  </label>
                ))}
              </div>
            </div>

            <div className={dividerCls} />

            {/* WORDS */}
            <div>
              <div className="flex items-center justify-between">
                <p className="text-[14px] font-semibold text-[#0A0847]">
                  Word Direction
                </p>
                <p className="text-[12px] font-medium text-[#0A0847]/60">
                  {words.length} / {MAX_WORDS}
                </p>
              </div>

              <div className="mt-3 flex flex-wrap gap-2.5">
                {words.map((word) => (
                  <span
                    key={word}
                    className="flex h-[35px] items-center gap-2 rounded-lg border border-[#E2DFFC] bg-[#FEFFFF] px-[13px]"
                  >
                    <span className="text-[12px] font-medium uppercase text-[#001984]">
                      {word}
                    </span>
                    <button
                      type="button"
                      aria-label={`Remove ${word}`}
                      onClick={() => removeWord(word)}
                      className="flex cursor-pointer items-center"
                    >
                      <img src={chipXIcon} alt="" className="h-[14px] w-[14px]" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <button type="button" className={`${stepButton} w-[164px] font-semibold`}>
                <img src={plusIcon} alt="" className="h-[16px] w-[16px] shrink-0" />
                Add New Book
              </button>

              <button type="button" className={`${stepButton} w-[244px] font-semibold`}>
                <img src={downloadIcon} alt="" className="h-[13px] w-[12px] shrink-0" />
                Import Words from Chapter
              </button>
            </div>

            {/* CLUE */}
            <Field label="Clue / Instruction" htmlFor="clue">
              <div className="relative">
                <textarea
                  id="clue"
                  value={clue}
                  maxLength={200}
                  placeholder={CLUE_PLACEHOLDER}
                  onChange={(e) => setClue(e.target.value)}
                  className="h-[85px] w-full resize-none rounded-[7.47px] border border-[#E2DFFC] bg-white px-3 py-[10px] text-[12px] leading-relaxed text-[#0A0847]/80 outline-none transition placeholder:text-[#0A0847]/60 focus:border-[#001984]"
                />
                <span className="absolute right-3 bottom-2.5 text-[10px] text-[#0A0847]/60">
                  {clue.length} / 200
                </span>
              </div>
            </Field>

            <Field label="Time Limit (Optional)" htmlFor="time-limit">
              <TextInput
                id="time-limit"
                value={timeLimit}
                onChange={(e) => setTimeLimit(e.target.value)}
                adornment="min"
              />
            </Field>

            <Field label="Reward Points" htmlFor="reward-points">
              <TextInput
                id="reward-points"
                value={rewardPoints}
                onChange={(e) => setRewardPoints(e.target.value)}
              />
            </Field>

            <Field label="Status" htmlFor="status">
              <Select
                id="status"
                value={status}
                options={STATUS_OPTIONS}
                onChange={setStatus}
              />
            </Field>
          </section>

          {/* RIGHT — live puzzle preview */}
          <section className={cardClass}>
            <div className="flex flex-col gap-5">
              <div>
                <h2 className="text-[22px] font-semibold text-[#0A0847]">
                  Live Puzzle Preview
                </h2>
                <p className="mt-1 max-w-[330px] text-[16px] leading-[1.4] font-medium text-[#0A0847]/60">
                  This is how your word search puzzle will appear to users.
                </p>
              </div>

              <PuzzleGrid />

              <WordsToFind words={words} />
            </div>
          </section>
        </div>

        {/* BOTTOM ACTION ROW */}
        <div className="mt-6 flex w-full flex-wrap items-center justify-between gap-4">
          <button type="button" className={outlineButton}>
            Cancel
          </button>

          <div className="flex flex-wrap items-center gap-4">
            <button type="button" className={outlineButton}>
              Save as Draft
            </button>
            <button type="button" className={outlineButton}>
              Preview
            </button>
            <button type="button" className={purpleButton}>
              Publish Word Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}