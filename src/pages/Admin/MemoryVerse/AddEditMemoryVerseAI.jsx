import { useState } from "react";
import {
  LuCheck,
  LuChevronDown,
  LuEye,
  LuImage,
  LuInfo,
  LuPencil,
  LuRefreshCw,
  LuSave,
  LuSend,
  LuSparkles,
  LuX,
} from "react-icons/lu";
import { Breadcrumb } from "../Activities/quizShared";
import trustInLord1 from "../../../assets/Trust in the Lord 1.png";
import trustInLord2 from "../../../assets/Trust in the Lord 2.png";

const TABS = ["Manual Entry", "CSV Upload", "AI Generate"];

const TESTAMENTS = ["Old Testament", "New Testament"];
const BOOKS = ["Joshua", "Proverbs", "Psalms", "Philippians"];
const CHAPTERS = ["1", "3", "4", "5", "6", "9", "13", "23"];
const TRANSLATIONS = [
  "NIV – New International Version",
  "KJV – King James Version",
  "ESV – English Standard Version",
];
const VERSE_COUNTS = ["1 verse", "2 verses", "3 verses", "5 verses"];
const DIFFICULTIES = [
  "Level 1 (Ages 4-6)",
  "Level 2 (Ages 7-8)",
  "Level 3 (Ages 9-11)",
  "Level 4 (Ages 12-14)",
  "Level 5 (Ages 15+)",
];
const ALL_LEVELS = ["Level 1", "Level 2", "Level 3", "Level 4", "Level 5"];

const AI_CHECKLIST = [
  "Verse Selection",
  "Title & Instructions",
  "All 5 Learning Steps",
  "Hints & Feedback",
  "Audio Narration",
  "Unique Image for Each Verse",
];

const GENERATED = [
  {
    id: 1,
    title: "Trust in the Lord —",
    reference: "Proverbs 3:5–6",
    description:
      "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    reward: "50 pts",
    level: "Level 3",
    image: trustInLord2,
  },
  {
    id: 2,
    title: "Trust in the Lord —",
    reference: "Proverbs 3:5–6",
    description:
      "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    reward: "50 pts",
    level: "Level 3",
    image: trustInLord1,
  },
];

/* ==========================================================================
   STYLE TOKENS (Figma: Memory Verse -> AI Generate)
   navy #001984 | heading #0A0847 | border #E1DFFC | white #FFFFFF
   ========================================================================== */
const shellClass = "min-h-[calc(100vh-72px)] bg-[#F9FAFE] font-inter text-[#0A0847]";
const bodyClass = "mx-auto w-full max-w-[1107px] space-y-5 px-5 py-6";

const fieldLabelClass = "mb-[8px] block text-[12px] font-semibold text-[#0A0847]";

const outlineBtn =
  "flex h-[43px] cursor-pointer items-center justify-center gap-2 rounded-[7.5px] border border-[#001984] bg-white px-4 text-[12px] font-semibold text-[#0A0847] transition-colors hover:bg-[#F1F1F9]";

const outlineBtnSm =
  "flex h-[30px] cursor-pointer items-center justify-center gap-2 rounded-[7.5px] border border-[#001984] bg-white px-3 text-[11px] font-semibold text-[#0A0847] transition-colors hover:bg-[#F1F1F9]";

const filledBtn =
  "flex h-[43px] cursor-pointer items-center justify-center gap-2 rounded-[7.5px] bg-[#001984] px-4 text-[12px] font-semibold text-white transition-colors hover:bg-[#030F63]";

const rowBtn =
  "flex h-[28px] w-full cursor-pointer items-center justify-start gap-[6px] rounded-[6px] border border-[#001984] bg-white px-[10px] text-[11px] font-medium text-[#0A0847] transition-colors hover:bg-[#F1F1F9]";

/* ==========================================================================
   SMALL PIECES
   ========================================================================== */
function Dropdown({ value, onChange, options, ariaLabel }) {
  return (
    <div className="relative w-full">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={ariaLabel}
        className="h-[40px] w-full cursor-pointer appearance-none rounded-[7.5px] border border-[#E1DFFC] bg-white py-0 pr-8 pl-3 text-[13px] font-medium text-[#4A4D6A] outline-none transition focus:border-[#001984]"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <LuChevronDown
        size={14}
        className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-[#6B6F8D]"
      />
    </div>
  );
}

function LabelledField({ label, children }) {
  return (
    <div>
      <p className={fieldLabelClass}>{label}</p>
      {children}
    </div>
  );
}

function StepCircles() {
  return (
    <div className="flex items-center gap-[6px]">
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          className="flex h-[16px] w-[16px] items-center justify-center rounded-full bg-[#001984] text-[9px] font-semibold text-white"
        >
          {n}
        </span>
      ))}
    </div>
  );
}

function ToggleSwitch({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors ${
        checked ? "bg-[#1D4ED8]" : "bg-[#D1D5DB]"
      }`}
    >
      <span
        className={`absolute top-[2px] h-4 w-4 rounded-full bg-white shadow-sm transition-all ${
          checked ? "left-[18px]" : "left-[2px]"
        }`}
      />
    </button>
  );
}

function ToggleRow({ label, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <p className="min-w-0 text-[12px] leading-[1.4] font-normal text-[#6C6B91]">{label}</p>
      <ToggleSwitch checked={checked} onChange={onChange} label={label} />
    </div>
  );
}

/* ==========================================================================
   PAGE
   ========================================================================== */
export default function AddEditMemoryVerseAI() {
  const [testament, setTestament] = useState(TESTAMENTS[0]);
  const [book, setBook] = useState(BOOKS[0]);
  const [chapter, setChapter] = useState(CHAPTERS[0]);
  const [translation, setTranslation] = useState(TRANSLATIONS[0]);
  const [verseCount, setVerseCount] = useState(VERSE_COUNTS[1]);
  const [difficulty, setDifficulty] = useState(DIFFICULTIES[2]);

  const [levels, setLevels] = useState(["Level 1", "Level 2", "Level 3", "Level 4", "Level 5"]);
  const [levelMenuOpen, setLevelMenuOpen] = useState(false);

  const [createMode, setCreateMode] = useState("Existing Levels");
  const [genImages, setGenImages] = useState(true);
  const [genAudio, setGenAudio] = useState(true);

  const [selected, setSelected] = useState(GENERATED.map((g) => g.id));

  const toggleLevel = (lvl) =>
    setLevels((prev) =>
      prev.includes(lvl) ? prev.filter((l) => l !== lvl) : [...prev, lvl],
    );

  const availableLevels = ALL_LEVELS.filter((l) => !levels.includes(l));

  const allSelected = selected.length === GENERATED.length;
  const toggleAll = () => setSelected(allSelected ? [] : GENERATED.map((g) => g.id));
  const toggleOne = (id) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <div className={shellClass}>
      <div className={bodyClass}>
        {/* ---------------- header ---------------- */}
        <Breadcrumb items={["Bible Content", "Memory Verses", "Add / Edit"]} />

        <div className="flex min-h-[56px] flex-wrap items-center justify-between gap-4">
          <h1 className="text-[22px] font-bold text-[#0A0847]">Add / Edit Memory Verse</h1>

          <div className="flex items-center gap-4">
            <button type="button" className={`${outlineBtn} w-[120px]`}>
              <LuSave size={14} /> Save draft
            </button>
            <button type="button" className={outlineBtn}>
              <LuEye size={14} /> Preview
            </button>
            <button type="button" className={filledBtn}>
              <LuSend size={14} /> Publish Update
            </button>
          </div>
        </div>

        {/* ---------------- tabs ---------------- */}
        <div className="flex items-center gap-6 border-b border-[#E1DFFC]">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              className={`relative cursor-pointer pb-3 text-[13px] font-semibold transition-colors ${
                t === "AI Generate"
                  ? "text-[#001984]"
                  : "text-[#0A084799] hover:text-[#0A0847]"
              }`}
            >
              {t}
              {t === "AI Generate" && (
                <span className="absolute right-0 -bottom-px left-0 h-[2px] rounded-full bg-[#001984]" />
              )}
            </button>
          ))}
        </div>

        {/* ---------------- form section ---------------- */}
        <section className="flex w-[1065px] max-w-full flex-col gap-[10px] rounded-[7.5px] border-[0.75px] border-[#E1DFFC] bg-white pt-[20px] pr-[15px] pb-[20px] pl-[15px]">
          <h2 className="text-[14px] font-semibold leading-none text-[#0A0847]">
            AI Memory Verse Generator
          </h2>
          <p className="text-[12px] leading-none text-[#6C6B91]">
            Choose the activity type and how you want to create it.
          </p>

          <div className="grid grid-cols-1 gap-[24px] lg:grid-cols-[546px_minmax(0,1fr)]">
            {/* LEFT — form fields */}
            <div className="flex flex-col gap-[16px]">
              <div className="grid grid-cols-3 gap-[24px]">
                <LabelledField label="Testament">
                  <Dropdown
                    value={testament}
                    onChange={setTestament}
                    options={TESTAMENTS}
                    ariaLabel="Testament"
                  />
                </LabelledField>
                <LabelledField label="Book">
                  <Dropdown value={book} onChange={setBook} options={BOOKS} ariaLabel="Book" />
                </LabelledField>
                <LabelledField label="Chapter">
                  <Dropdown
                    value={chapter}
                    onChange={setChapter}
                    options={CHAPTERS}
                    ariaLabel="Chapter"
                  />
                </LabelledField>
              </div>

              <LabelledField label="Bible Translation">
                <Dropdown
                  value={translation}
                  onChange={setTranslation}
                  options={TRANSLATIONS}
                  ariaLabel="Bible Translation"
                />
              </LabelledField>

              <div className="grid grid-cols-2 gap-[24px]">
                <LabelledField label="Number of Memory Verses">
                  <Dropdown
                    value={verseCount}
                    onChange={setVerseCount}
                    options={VERSE_COUNTS}
                    ariaLabel="Number of Memory Verses"
                  />
                </LabelledField>
                <LabelledField label="Difficulty">
                  <Dropdown
                    value={difficulty}
                    onChange={setDifficulty}
                    options={DIFFICULTIES}
                    ariaLabel="Difficulty"
                  />
                </LabelledField>
              </div>

              {/* assigned levels */}
              <div>
                <p className={fieldLabelClass}>Assign to Levels</p>
                <div className="relative">
                  <div className="flex h-[40px] w-full items-center gap-[8px] rounded-[7.5px] border border-[#E1DFFC] bg-white pr-2.5 pl-3">
                    {levels.map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => toggleLevel(lvl)}
                        className={`flex h-[26px] min-w-[75px] shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-[8px] border px-[10px] text-[11px] font-medium transition ${
                          lvl === "Level 3"
                            ? "border-[#001984] bg-[#001984] text-white"
                            : "border-[#E1DFFC] bg-white text-[#0A0847] hover:border-[#001984]"
                        }`}
                      >
                        {lvl}
                        <LuX size={11} />
                      </button>
                    ))}

                    <button
                      type="button"
                      aria-label="Add level"
                      onClick={() => setLevelMenuOpen((o) => !o)}
                      className="ml-auto flex h-[24px] w-[24px] shrink-0 cursor-pointer items-center justify-center text-[#6B6F8D] transition hover:text-[#001984]"
                    >
                      <LuChevronDown size={16} />
                    </button>
                  </div>

                  {levelMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setLevelMenuOpen(false)}
                        aria-hidden
                      />
                      <div className="absolute top-[44px] right-0 z-20 w-[150px] rounded-[7.5px] border border-[#E1DFFC] bg-white py-1 shadow-[0_8px_24px_rgba(10,8,71,0.12)]">
                        {availableLevels.length === 0 && (
                          <p className="px-3 py-2 text-[11px] text-[#6C6B91]">All levels added</p>
                        )}
                        {availableLevels.map((lvl) => (
                          <button
                            key={lvl}
                            type="button"
                            onClick={() => toggleLevel(lvl)}
                            className="flex w-full cursor-pointer px-3 py-2 text-left text-[12px] text-[#0A0847] transition hover:bg-[#F7F7FC]"
                          >
                            {lvl}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* create as */}
              <div>
                <p className={fieldLabelClass}>Create as</p>
                <div className="flex items-center gap-6">
                  {["New Levels", "Existing Levels"].map((opt) => (
                    <label
                      key={opt}
                      className="flex h-[22px] cursor-pointer items-center gap-2 text-[13px] font-medium text-[#0A0847]"
                    >
                      <input
                        type="radio"
                        name="create-as"
                        checked={createMode === opt}
                        onChange={() => setCreateMode(opt)}
                        className="h-[18px] w-[18px] accent-[#001984]"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT — AI checklist card, with toggles + generate beside it */}
            <div className="flex items-start gap-[16px]">
              <div className="flex h-[331px] w-[201px] shrink-0 flex-col gap-[10px] rounded-[7.5px] border-[0.75px] border-[#E1DFFC] bg-white pt-[12px] pr-[27px] pb-[12px] pl-[12px]">
                <p className="text-[14px] font-semibold text-[#0A0847]">AI Will Create</p>
                <ul className="flex flex-col gap-[10px]">
                  {AI_CHECKLIST.map((item) => (
                    <li key={item} className="flex items-start gap-[8px]">
                      <span className="mt-[1px] flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-full bg-[#001984]">
                        <LuCheck size={9} strokeWidth={3} className="text-white" />
                      </span>
                      <span className="text-[12px] font-medium leading-[1.4] text-[#6C6B91]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex min-w-0 flex-1 flex-col gap-[16px] pt-[4px]">
                <div className="flex flex-col gap-4">
                  <ToggleRow
                    label="Generate unique AI image for every verse"
                    checked={genImages}
                    onChange={setGenImages}
                  />
                  <ToggleRow
                    label="Generate audio narration (optional)"
                    checked={genAudio}
                    onChange={setGenAudio}
                  />
                </div>

                <button
                  type="button"
                  className="flex h-[40px] w-full cursor-pointer items-center justify-center gap-2 rounded-[7.5px] bg-[#001984] text-[13px] font-semibold text-white transition-colors hover:bg-[#030F63]"
                >
                  <LuSparkles size={15} /> Generate Memory Verses
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- generated verses preview ---------------- */}
        <section className="w-[1065px] max-w-full rounded-[7.5px] border-[0.75px] border-[#E1DFFC] bg-[#F8F8FF] p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-[13px] font-semibold text-[#0A0847]">AI Memory Verse Generator</p>
              <p className="mt-1 text-[12px] text-[#6C6B91]">
                Review your AI-generated verses before publishing.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <label className="flex cursor-pointer items-center gap-2 text-[12px] text-[#0A0847]">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                  className="h-[14px] w-[14px] accent-[#001984]"
                />
                Select all
              </label>
              <span className="text-[12px] text-[#6C6B91]">{selected.length} selected</span>
              <button type="button" className={outlineBtnSm}>
                <LuRefreshCw size={13} /> Regenerate All
              </button>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-[24px]">
            {GENERATED.map((v) => (
              <div
                key={v.id}
                className="border-b border-[#E5E7EB] pb-[24px] last:border-b-0 last:pb-0"
              >
                <div className="grid grid-cols-1 gap-[24px] lg:grid-cols-[467px_minmax(0,1fr)_283px] lg:gap-0">
                  {/* left: checkbox + thumb + meta + steps */}
                  <div className="flex gap-[12px] lg:pr-[24px]">
                    <input
                      type="checkbox"
                      checked={selected.includes(v.id)}
                      onChange={() => toggleOne(v.id)}
                      aria-label={`Select ${v.title}`}
                      className="mt-1 h-[14px] w-[14px] shrink-0 accent-[#001984]"
                    />

                    <div className="flex w-full max-w-[417px] gap-[12px]">
                      <img
                        src={v.image}
                        alt=""
                        className="h-[95px] w-[129px] shrink-0 rounded-[6px] bg-[#F1F2F8] object-cover"
                      />

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-[13px] font-semibold text-[#0A0847]">{v.title}</p>
                          <span className="rounded-[4px] bg-[#F1EFFD] px-[6px] py-[2px] text-[10px] font-semibold text-[#6B668F]">
                            AI
                          </span>
                        </div>

                        <p className="mt-[2px] text-[12px] font-semibold italic text-[#6C6B91]">
                          {v.reference}
                        </p>

                        <p className="mt-[6px] line-clamp-3 max-w-[360px] text-[12px] leading-[1.5] text-[#6C6B91]">
                          {v.description}
                        </p>

                        <div className="mt-[8px]">
                          <StepCircles />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* middle: reward + assigned levels */}
                  <div className="flex flex-col gap-4 lg:border-l lg:border-[#E5E7EB] lg:pl-[24px]">
                    <div>
                      <p className="text-[11px] text-[#6C6B91]">Reward</p>
                      <p className="mt-[2px] text-[20px] font-medium text-[#0A0847]">
                        {v.reward}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] text-[#6C6B91]">Assigned Levels</p>
                      <span className="mt-[6px] inline-flex h-[25px] w-[92px] items-center justify-center rounded-[8px] border border-[#E1DFFC] bg-[#F1EFFD] text-[11px] font-medium text-[#0A0847]">
                        {v.level}
                      </span>
                    </div>
                  </div>

                  {/* right: 4 stacked outline buttons */}
                  <div className="flex flex-col gap-[8px] lg:border-l lg:border-[#E5E7EB] lg:pl-[24px]">
                    <button type="button" className={rowBtn}>
                      <LuPencil size={12} /> Edit
                    </button>
                    <button type="button" className={rowBtn}>
                      <LuRefreshCw size={12} /> Regenerate Verse
                    </button>
                    <button type="button" className={rowBtn}>
                      <LuImage size={12} /> Regenerate Image
                    </button>
                    <button type="button" className={rowBtn}>
                      <LuRefreshCw size={12} /> Replace Image
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ---------------- bottom bar ---------------- */}
          <div className="-mx-6 -mb-6 mt-6 flex flex-wrap items-center justify-between gap-3 bg-[#F1F2F8] px-6 py-[14px]">
            <p className="flex items-center gap-2 text-[12px] text-[#6C6B91]">
              <LuInfo size={14} /> {selected.length} verses selected for publishing.
            </p>
            <button
              type="button"
              className="flex h-[40px] cursor-pointer items-center justify-center gap-2 rounded-[7.5px] bg-[#001984] px-4 text-[13px] font-semibold text-white transition-colors hover:bg-[#030F63]"
            >
              <LuSend size={14} /> Publish Selected
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
