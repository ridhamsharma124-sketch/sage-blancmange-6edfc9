import { Fragment, useState } from "react";
import {
  LuBookOpen,
  LuBot,
  LuCheck,
  LuChevronDown,
  LuCircleHelp,
  LuClock,
  LuEye,
  LuHistory,
  LuList,
  LuListChecks,
  LuMinus,
  LuPlus,
  LuRefreshCw,
  LuSparkles,
  LuTrash2,
} from "react-icons/lu";
import realistic1 from "../../../assets/Realistic1.png";
import realistic2 from "../../../assets/Realistic2.png";
import realistic3 from "../../../assets/Realistic3.png";
import realistic4 from "../../../assets/Realistic4.png";
import aiGenImg1 from "../../../assets/AI Generator img1.png";
import aiGenImg2 from "../../../assets/AI Generator img2.png";
import aiGenImg3 from "../../../assets/AI Generator img3.png";
import aiGenImg4 from "../../../assets/AI Generator img4.png";
import aiGenImg5 from "../../../assets/AI Generator img5.png";

/* ==========================================================================
   STYLE TOKENS
   ========================================================================== */
const CARD = "rounded-[8px] border border-[#E2DFFC] bg-white";
const SELECT_FIELD =
  "h-full w-full cursor-pointer appearance-none rounded-[6px] border border-[#F2F2F2] bg-white pl-[12px] pr-[50px] text-[14px] text-[#0A0847] outline-none";
const LABEL = "text-[14px] font-semibold text-[#0A0847]";

/* ==========================================================================
   MOCK DATA
   ========================================================================== */
const LOCATION_SELECTORS = [
  { label: "Testament", value: "Old Testament" },
  { label: "Book", value: "Genesis" },
  { label: "Chapter", value: "Chapter 1" },
  { label: "Level", value: "Level 1" },
];

const QUESTION_TYPES = [
  { id: "mc", label: "Multiple Choice", kind: "list" },
  { id: "fitb", label: "Fill in the Blank", kind: "check" },
  { id: "tf", label: "True / False", kind: "check" },
  { id: "order", label: "Tag an Order", kind: "order" },
];

const DIFFICULTY_MIX = [
  { label: "Easy", value: 40, bg: "#E6F6EA", fg: "#2E9E3E" },
  { label: "Medium", value: 40, bg: "#FBE9DC", fg: "#D9722B" },
  { label: "Hard", value: 20, bg: "#FBE3E8", fg: "#D1264A" },
];

const IMAGE_STYLES = [
  { id: "s1", src: realistic1, caption: "Realistic" },
  { id: "s2", src: realistic2, caption: "Realistic" },
  { id: "s3", src: realistic3, caption: "Realistic" },
  { id: "s4", src: realistic4, caption: "Realistic" },
];

const TYPE_BADGE = {
  "Multiple Choice": { bg: "#EDE6F9", fg: "#6B2FB3" },
  "Fill in the Blank": { bg: "#E6F6EA", fg: "#2E9E3E" },
  "True / False": { bg: "#E3F2FB", fg: "#1E88C7" },
  "Tag an Order": { bg: "#FBEBDD", fg: "#D9722B" },
  "Who Am I": { bg: "#FBE3E8", fg: "#6B2FB3" },
};

const DIFF_BADGE = {
  Easy: { bg: "#E6F6EA", fg: "#2E9E3E" },
  Medium: { bg: "#FBE9DC", fg: "#D9722B" },
  Hard: { bg: "#FBE3E8", fg: "#D1264A" },
};

const QUESTIONS = [
  {
    id: 1,
    image: aiGenImg1,
    question: "What did the serpent say to the woman in the garden?",
    options: [
      "A. You will surely die.",
      "B. You will surely not die.",
      "C. God is watching you.",
      "D. This fruit is not for you.",
    ],
    correct: 1,
    answer: null,
    verse: "Genesis 3:4",
    difficulty: "Easy",
    type: "Multiple Choice",
  },
  {
    id: 2,
    image: aiGenImg2,
    question: "Fill in the blank: The woman saw that the tree was ______ to the eyes",
    options: [],
    correct: null,
    answer: "pleasing",
    verse: "Genesis 3:4",
    difficulty: "Easy",
    type: "Fill in the Blank",
  },
  {
    id: 3,
    image: aiGenImg3,
    question: "Is it true that Adam blamed Eve for eating the fruit?",
    options: ["A. True", "B. False"],
    correct: 0,
    answer: null,
    verse: "Genesis 3:4",
    difficulty: "Medium",
    type: "True / False",
  },
  {
    id: 4,
    image: aiGenImg4,
    question: "Place the events in order:",
    order: ["1. Serpent talks to Eve", "2. Eve eats the fruit", "3. Adam eats the fruit"],
    options: [],
    correct: null,
    answer: null,
    verse: "Genesis 3:4",
    difficulty: "Hard",
    type: "Tag an Order",
  },
  {
    id: 5,
    image: aiGenImg5,
    question: "Who am I? I was created from Adam's rib.",
    options: [],
    correct: null,
    answer: "Eve",
    verse: "Genesis 3:4",
    difficulty: "Easy",
    type: "Who Am I",
  },
];

/* ==========================================================================
   SMALL BUILDING BLOCKS
   ========================================================================== */
function SectionTitle({ step, title }) {
  return (
    <div className="flex items-center gap-[10px]">
      <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[#00007A] text-[11px] leading-none font-semibold text-white">
        {step}
      </span>
      <h3 className="text-[16px] font-semibold text-[#0A0847]">{title}</h3>
    </div>
  );
}

function FieldSelect({ value, options, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <select aria-label={value} defaultValue={value} className={SELECT_FIELD}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <LuChevronDown
        size={16}
        className="pointer-events-none absolute top-1/2 right-[16px] -translate-y-1/2 text-[#0A0847]"
      />
    </div>
  );
}

function Badge({ children, bg, fg }) {
  return (
    <span
      className="inline-flex items-center rounded-[4px] p-[8px] text-[12px] leading-none font-medium whitespace-nowrap"
      style={{ background: bg, color: fg }}
    >
      {children}
    </span>
  );
}

function TypeGlyph({ kind }) {
  if (kind === "order") {
    return (
      <span className="flex items-center gap-[3px]">
        {[1, 2, 3].map((n, index) => (
          <Fragment key={n}>
            {index > 0 && <span className="h-px w-[6px] bg-[#00007A]" />}
            <span className="flex h-[15px] w-[15px] items-center justify-center rounded-full bg-[#00007A] text-[8px] font-bold text-white">
              {n}
            </span>
          </Fragment>
        ))}
      </span>
    );
  }

  return (
    <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-[#00007A] text-white">
      {kind === "list" ? <LuList size={15} /> : <LuListChecks size={15} />}
    </span>
  );
}

/* ==========================================================================
   PAGE
   ========================================================================== */
export default function AIQuizGenerator() {
  const [count, setCount] = useState(15);
  const [activeTypes, setActiveTypes] = useState(QUESTION_TYPES.map((type) => type.id));
  const [styleId, setStyleId] = useState("s1");
  const [selectAll, setSelectAll] = useState(true);
  const [note, setNote] = useState("");

  const toggleType = (id) =>
    setActiveTypes((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );

  return (
    <div className="min-h-screen w-full bg-[#F8F8FF] p-6 font-inter">
      {/* ================= PAGE HEADER ================= */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[24px] font-bold text-[#0A0847]">AI Question Generator</h1>
          <p className="mt-[8px] text-[15px] text-[#0A0847]/70">
            Generate questions and images for any level in one go.
          </p>
        </div>

        <div className="flex items-center gap-[14px]">
          <button
            type="button"
            className="flex h-[44px] w-[164px] cursor-pointer items-center justify-center gap-[8px] rounded-[8px] border border-[#1E1B4B] bg-white text-[15px] font-semibold text-[#0A0847]"
          >
            <LuCircleHelp size={17} strokeWidth={1.8} />
            How it works
          </button>
          <button
            type="button"
            className="flex h-[44px] w-[156px] cursor-pointer items-center justify-center gap-[8px] rounded-[8px] border border-[#1E1B4B] bg-white text-[15px] font-semibold text-[#0A0847]"
          >
            <LuHistory size={17} strokeWidth={1.8} />
            History
          </button>
        </div>
      </div>

      {/* ================= LOCATION CARD ================= */}
      <div className={`mt-[40px] flex h-[92px] items-center px-[24px] ${CARD}`}>
        <div className="flex flex-1 items-center">
          {LOCATION_SELECTORS.map((selector, index) => (
            <Fragment key={selector.label}>
              {index > 0 && <span className="h-[48px] w-px bg-[#E2DFFC]" />}
              <div className="flex flex-1 items-center gap-[10px] px-[16px]">
                <span className="flex min-w-0 flex-col">
                  <span className="text-[12px] text-[#0A0847]/70">{selector.label}</span>
                  <span className="text-[16px] font-bold text-[#0A0847]">{selector.value}</span>
                </span>
                <LuChevronDown size={16} className="ml-auto shrink-0 text-[#0A0847]" />
              </div>
            </Fragment>
          ))}
        </div>

        <div className="ml-[16px] flex w-[226px] shrink-0 flex-col justify-center gap-[4px] rounded-[8px] bg-[#EEEAFB] p-[12px]">
          <span className="text-[14px] font-semibold text-[#0A0847]">Select Location</span>
          <span className="text-[13px] text-[#0A0847]/70">Genesis › Chapter 3 › Level 1</span>
        </div>
      </div>

      {/* ================= TWO COLUMNS ================= */}
      <div className="mt-[28px] grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-stretch gap-[24px]">
        {/* ============ LEFT : CONFIGURATION ============ */}
        <div className={`flex min-w-0 flex-col px-[20px] pt-[20px] pb-[24px] ${CARD}`}>
          {/* tabs */}
          <div>
            <div className="flex h-[48px] items-start gap-[32px]">
              <button
                type="button"
                className="relative flex h-[48px] cursor-pointer items-center text-[15px] font-medium text-[#0A0847]"
              >
                Generate Questions
                <span className="absolute right-0 bottom-0 left-0 h-[2px] bg-[#00007A]" />
              </button>
              <button
                type="button"
                className="flex h-[48px] cursor-pointer items-center text-[15px] font-medium text-[#0A0847]/70"
              >
                Generation History
              </button>
            </div>
            <div className="h-px w-full bg-[#E2DFFC]" />
          </div>

          <div className="mt-[24px]">
            <SectionTitle step="1" title="Question Settings" />
          </div>

          {/* number of questions */}
          <div className="mt-[20px]">
            <p className={LABEL}>
              Number of Questions to Generate <span className="text-[#D1264A]">*</span>
            </p>
            <div className="mt-[8px] flex h-[47px] w-[337px] max-w-full items-stretch overflow-hidden rounded-[8px] border border-[#E2DFFC] bg-white">
              <button
                type="button"
                aria-label="Decrease"
                onClick={() => setCount((current) => Math.max(1, current - 1))}
                className="flex w-[40px] shrink-0 cursor-pointer items-center justify-center border-r border-[#E2DFFC] text-[#0A0847]"
              >
                <LuMinus size={16} />
              </button>
              <span className="flex flex-1 items-center justify-center text-[15px] font-semibold text-[#0A0847]">
                {count}
              </span>
              <button
                type="button"
                aria-label="Increase"
                onClick={() => setCount((current) => current + 1)}
                className="flex w-[45px] shrink-0 cursor-pointer items-center justify-center border-l border-[#E2DFFC] text-[#0A0847]"
              >
                <LuPlus size={16} />
              </button>
            </div>
            <p className="mt-[8px] text-[13px] text-[#0A0847]/70">
              Recommended: 5–30 at a time for best results.
            </p>
          </div>

          {/* question types */}
          <div className="mt-[24px]">
            <p className={LABEL}>Question Types</p>
            <div className="mt-[8px] grid grid-cols-4 gap-[8px]">
              {QUESTION_TYPES.map((type) => {
                const active = activeTypes.includes(type.id);
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => toggleType(type.id)}
                    className={`relative flex h-[84px] min-w-0 cursor-pointer flex-col items-center justify-center gap-[8px] rounded-[8px] border px-[1px] text-center ${
                      active ? "border-[#00007A] bg-[#F4F1FE]" : "border-[#E2DFFC] bg-[#F9F9FF]"
                    }`}
                  >
                    <TypeGlyph kind={type.kind} />
                    <span className="text-[14px] leading-[1.2] font-medium whitespace-nowrap text-[#0A0847]">
                      {type.label}
                    </span>
                    {active && (
                      <span className="absolute top-[6px] right-[6px] z-10 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#2E9E3E] text-white">
                        <LuCheck size={12} strokeWidth={3} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              className="mt-[12px] flex h-[39px] w-full cursor-pointer items-center gap-[10px] rounded-[8px] border border-[#E2DFFC] bg-white px-[16px] py-[7px] text-[14px] font-medium text-[#0A0847]"
            >
              + 6 more
              <LuChevronDown size={15} />
            </button>
          </div>

          {/* difficulty mix */}
          <div className="mt-[24px]">
            <div className="flex items-center gap-[8px]">
              <p className="text-[16px] font-semibold text-[#0A0847]">Difficulty Mix</p>
              <LuCircleHelp size={16} className="text-[#0A0847]/70" />
            </div>
            <div className="mt-[8px] flex gap-[12px]">
              {DIFFICULTY_MIX.map((entry) => (
                <div
                  key={entry.label}
                  className="flex h-[47px] w-[118px] shrink-0 flex-col justify-center gap-[2px] rounded-[6px] border border-[#E2DFFC] bg-white px-[10px]"
                >
                  <span className="flex items-center justify-between text-[14px] font-medium text-[#0A0847]">
                    {entry.label}
                    <LuChevronDown size={14} />
                  </span>
                  <span className="text-[14px] font-medium text-[#0A0847]">{entry.value} %</span>
                </div>
              ))}
            </div>
            <p className="mt-[8px] text-[13px] text-[#0A0847]/70">
              AI will split approximately balanced difficulty questions.
            </p>
          </div>

          {/* additional instructions */}
          <div className="mt-[16px]">
            <p className={LABEL}>Additional Instructions (Optional)</p>
            <div className="relative mt-[6px]">
              <textarea
                rows={2}
                value={note}
                maxLength={500}
                onChange={(event) => setNote(event.target.value)}
                placeholder="Add any special instructions for the AI..."
                className="h-[56px] w-full resize-none rounded-[8px] border border-[#E2DFFC] bg-white p-[12px] text-[14px] text-[#0A0847] outline-none placeholder:text-[#0A0847]/60"
              />
              <span className="absolute right-[10px] bottom-[6px] text-[12px] italic text-[#0A0847]/70">
                {note.length} / 500
              </span>
            </div>
          </div>

          <div className="mt-[16px] h-px w-full bg-[#E2DFFC]" />

          {/* ================= SECTION 2 : IMAGE SETTINGS ================= */}
          <div className="mt-[24px]">
            <SectionTitle step="2" title="Image Settings" />
          </div>

          <p className={`mt-[20px] ${LABEL}`}>Image Style</p>
          <div className="mt-[8px] flex gap-[8px]">
            {IMAGE_STYLES.map((style) => {
              const active = styleId === style.id;
              return (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => setStyleId(style.id)}
                  className={`relative flex h-[147px] max-w-[140px] min-w-0 flex-1 cursor-pointer flex-col gap-[6px] rounded-[8px] border p-[8px] ${
                    active ? "border-[#00007A] bg-[#F4F1FE]" : "border-[#E2DFFC] bg-[#FEFFFF]"
                  }`}
                >
                  <span className="min-h-0 w-full flex-1 overflow-hidden rounded-[6px] bg-[#EEEAFB]">
                    <img
                      src={style.src}
                      alt={style.caption}
                      className="h-full w-full object-cover"
                      onError={(event) => {
                        event.currentTarget.style.visibility = "hidden";
                      }}
                    />
                  </span>
                  <span className="text-center text-[14px] font-medium text-[#0A0847]">
                    {style.caption}
                  </span>
                  {active && (
                    <span className="absolute top-[6px] right-[6px] z-10 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#2E9E3E] text-white">
                      <LuCheck size={12} strokeWidth={3} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* quality + format */}
          <div className="mt-[20px] flex gap-[8px]">
            <div className="w-[272px] shrink-0">
              <p className={LABEL}>Image Quality</p>
              <div className="mt-[6px] h-[33px]">
                <FieldSelect value="High (Recommended)" options={["High (Recommended)", "Standard"]} />
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <p className={LABEL}>Image Format</p>
              <div className="mt-[6px] h-[33px]">
                <FieldSelect value="Landscape (16:9)" options={["Landscape (16:9)", "Square (1:1)"]} />
              </div>
            </div>
          </div>

          {/* info + estimated time */}
          <div className="mt-[16px] flex flex-wrap items-end gap-[16px]">
            <div className="w-full max-w-[272px] min-h-[153px] min-w-0 rounded-[6px] bg-[#F1EFFD] p-[12px]">
              <div className="flex items-center gap-[8px]">
                <LuBot size={22} className="text-[#2B4FA8]" />
                <span className="text-[15px] font-semibold text-[#2B4FA8]">AI will generate</span>
              </div>
              <ul className="mt-[8px] space-y-[4px] text-[12px] leading-[1.55] text-[#2B4FA8]">
                <li>• Questions with answers and options</li>
                <li>• Relevant Bible verses</li>
                <li>• Explanations</li>
                <li>• Hints</li>
                <li>• High-quality images for each question</li>
              </ul>
            </div>
            <div className="flex items-center gap-[8px] pb-[4px] text-[13px] text-[#0A0847]/70">
              <LuClock size={18} />
              Estimated time: 30–60 seconds
            </div>
          </div>

          <button
            type="button"
            className="mt-[12px] flex h-[38px] w-full cursor-pointer items-center justify-center gap-[8px] rounded-[6px] border border-[#00007A] bg-[#F1EFFD] text-[14px] font-medium text-[#00007A]"
          >
            <LuSparkles size={17} strokeWidth={2} />
            Generate Questions &amp; Images
          </button>
        </div>

        {/* ============ RIGHT : PREVIEW ============ */}
        <div className={`flex min-w-0 flex-col p-[16px] ${CARD}`}>
          <div className="flex items-start justify-between gap-[10px]">
            <div className="min-w-0">
              <div className="flex items-center gap-[10px]">
                <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[#00007A] text-[11px] leading-none font-semibold text-white">
                  3
                </span>
                <h3 className="text-[16px] font-semibold text-[#0A0847]">
                  Generated Questions Preview
                </h3>
              </div>
              <p className="mt-[6px] pl-[28px] text-[13px] text-[#0A0847]/70">
                Review and edit before adding to Level 1.
              </p>
            </div>
            <span className="shrink-0 rounded-[6px] bg-[#E8E8F6] px-[10px] py-[4px] text-[12px] font-medium text-[#0A0847]">
              15 Questions Generated
            </span>
          </div>

          <label className="mt-[8px] flex cursor-pointer items-center gap-[8px] self-start">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={(event) => setSelectAll(event.target.checked)}
              className="h-[16px] w-[16px] cursor-pointer appearance-none rounded-[3px] border-[1.5px] border-[#6B6F8D] checked:border-[#00007A] checked:bg-[#00007A]"
            />
            <span className="text-[13px] font-medium text-[#0A0847]">Select All</span>
          </label>

          <div className="mt-[16px] flex w-full flex-col gap-[16px]">
            {QUESTIONS.map((q) => {
              const type = TYPE_BADGE[q.type];
              const diff = DIFF_BADGE[q.difficulty];
              return (
                <div
                  key={q.id}
                  className="mx-auto w-full max-w-none rounded-[8px] border border-[#E2DFFC] bg-white p-[16px]"
                >
                    <div className="relative aspect-[401/186] w-full overflow-hidden rounded-[8px] border border-[#E2DFFC] bg-white">
                      <img
                        src={q.image}
                        alt=""
                        className="block h-full w-full object-cover"
                        onError={(event) => {
                          event.currentTarget.style.visibility = "hidden";
                        }}
                      />
                    </div>

                    <p className="mt-[12px] text-[15px] leading-[1.35] font-semibold text-[#0A0847]">
                      {q.question}
                    </p>

                    {q.order && (
                      <div className="mt-[8px] space-y-[4px] text-[14px] text-[#0A0847]/70">
                        {q.order.map((step) => (
                          <p key={step}>{step}</p>
                        ))}
                      </div>
                    )}

                    {q.options.length > 0 && (
                      <div className="mt-[8px] flex flex-col gap-[6px]">
                        {q.options.map((option, index) => {
                          const active = q.correct === index;
                          return (
                            <div key={option} className="flex items-center gap-[8px]">
                              <span
                                className={`flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full border-2 ${
                                  active ? "border-[#2E9E3E]" : "border-[#C9CCE0]"
                                }`}
                              >
                                {active && <span className="h-[9px] w-[9px] rounded-full bg-[#2E9E3E]" />}
                              </span>
                              <span
                                className={`rounded-[6px] px-[12px] py-[6px] text-[14px] ${
                                  active
                                    ? "bg-[#EAF7EC] font-medium text-[#2E9E3E]"
                                    : "text-[#0A0847]"
                                }`}
                              >
                                {option}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {q.answer && (
                      <p className="mt-[8px] text-[13px] text-[#0A0847]/70">
                        <span className="font-medium text-[#0A0847]">Correct Answer:</span>{" "}
                        <span className="font-bold text-[#2E9E3E]">{q.answer}</span>
                      </p>
                    )}

                    <div className="mt-[12px] h-px w-full bg-[#E2DFFC]" />

                    <div className="mt-[10px] flex items-end justify-between gap-[10px]">
                      <div className="flex flex-col gap-[8px]">
                        <span className="flex items-center gap-[8px] text-[16px] font-semibold text-[#0A0847]">
                          <LuBookOpen size={22} className="text-[#00007A]" />
                          {q.verse}
                        </span>
                        <span className="flex items-center gap-[8px] text-[13px] font-semibold text-[#0A0847]">
                          Difficulty <Badge bg={diff.bg} fg={diff.fg}>{q.difficulty}</Badge>
                        </span>
                        <span className="flex items-center gap-[8px] text-[13px] font-semibold text-[#0A0847]">
                          Type <Badge bg={type.bg} fg={type.fg}>{q.type}</Badge>
                        </span>
                      </div>

                      <div className="flex flex-col gap-[10px]">
                        <button
                          type="button"
                          className="flex h-[34px] w-[44px] cursor-pointer items-center justify-center rounded-[4px] border border-[#E2DFFC] bg-white text-[13px] font-medium text-[#0A0847]"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          aria-label="Preview"
                          className="flex h-[34px] w-[44px] cursor-pointer items-center justify-center rounded-[4px] border border-[#E2DFFC] bg-white text-[#00007A]"
                        >
                          <LuEye size={16} />
                        </button>
                        <button
                          type="button"
                          aria-label="Delete"
                          className="flex h-[34px] w-[44px] cursor-pointer items-center justify-center rounded-[4px] border border-[#E2DFFC] bg-white text-[#D1264A]"
                        >
                          <LuTrash2 size={16} />
                        </button>
                      </div>
                    </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================= BOTTOM ACTION ROW (below both cards) ================= */}
      <div className="mt-[24px] flex items-center justify-between">
        <span className="text-[14px] font-semibold text-[#0A0847]">15 questions generated</span>
        <div className="flex items-center gap-[10px]">
          <button
            type="button"
            className="h-[42px] w-[158px] cursor-pointer rounded-[4px] border border-[#E2DFFC] bg-white text-[14px] font-semibold text-[#0A0847]"
          >
            Cancel
          </button>
          <button
            type="button"
            className="flex h-[42px] w-[130px] cursor-pointer items-center justify-center gap-[8px] rounded-[4px] border border-[#E2DFFC] bg-white text-[14px] font-semibold text-[#0A0847]"
          >
            <LuRefreshCw size={15} />
            Regenerate
          </button>
          <button
            type="button"
            className="flex h-[42px] w-[189px] cursor-pointer items-center justify-center gap-[8px] rounded-[4px] bg-[#00007A] text-[14px] font-semibold whitespace-nowrap text-white"
          >
            <LuPlus size={16} strokeWidth={2.2} />
            Add All to Level 1
          </button>
        </div>
      </div>

      <div className="h-[40px]" />
    </div>
  );
}
