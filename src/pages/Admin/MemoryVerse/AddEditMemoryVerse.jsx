import { useState } from "react";
import {
  LuArrowRight,
  LuCalendar,
  LuChevronLeft,
  LuChevronRight,
  LuCircleCheck,
  LuCoins,
  LuEye,
  LuImage,
  LuMusic,
  LuPlay,
  LuRefreshCw,
  LuSave,
  LuSend,
  LuStar,
  LuUpload,
  LuVolume2,
} from "react-icons/lu";
import memoryVerseImg from "../../../assets/Memory Verse img.png";

const skyImage = null;

/* ==========================================================================
   TOKENS — taken verbatim from the design spec
   ========================================================================== */
const PAGE_BG = "#F8F8FF";
const GREEN_BTN = "#3DBE4A";

/* every card on the page */
const CARD = "rounded-[7.5px] border-[0.75px] border-[#E2DFFC] bg-white";

/* input / select / textarea */
const FIELD =
  "w-full rounded-[6px] border-[0.75px] border-[#E2DFFC] bg-white px-3 text-[13px] text-[#1E1B4B] outline-none";
const INPUT_H = "h-[38px]";
const LABEL = "text-[12px] font-semibold text-[#1E1B4B]";
const COUNTER = "text-right text-[11px] italic text-[#6B7280]";

function Field({ label, optional, required, children, className = "" }) {
  return (
    <div className={className}>
      {label && (
        <p className={`${LABEL} mb-[6px]`}>
          {label}
          {required && <span className="text-[#E53935]"> *</span>}
          {optional && <span className="font-normal text-[#6B7280]"> (Optional)</span>}
        </p>
      )}
      {children}
    </div>
  );
}

/* text input */
function TextInput({ value, readOnly, className = "", ...props }) {
  return (
    <input
      type="text"
      value={value}
      readOnly={readOnly}
      className={`${FIELD} ${INPUT_H} ${className}`}
      {...props}
    />
  );
}

/* select */
function Select({ value, options, className = "" }) {
  return (
    <select className={`${FIELD} ${INPUT_H} cursor-pointer ${className}`} defaultValue={value}>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

/* textarea with the italic counter sitting directly beneath, right aligned */
function TextArea({ value, max, rows = 2, small, count, className = "" }) {
  const len = count ?? value.length;
  return (
    <div>
      <textarea
        value={value}
        readOnly
        rows={rows}
        className={`${FIELD} resize-none py-2 leading-[1.45] ${small ? "text-[11px]" : "text-[13px]"} ${className}`}
      />
      <p className={`${COUNTER} mt-1`}>
        {len}/{max}
      </p>
    </div>
  );
}

/* single-line field with the counter inside the right edge of the field */
function InlineCounterInput({ value, max, count }) {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        readOnly
        className={`${FIELD} ${INPUT_H} pr-[64px]`}
      />
      <span className="absolute top-1/2 right-3 -translate-y-1/2 text-[11px] italic text-[#6B7280]">
        {count ?? value.length}/{max}
      </span>
    </div>
  );
}

const OUTLINE_BTN =
  "flex h-[34px] w-full cursor-pointer items-center justify-center gap-2 rounded-[6px] border-[0.75px] border-[#E2DFFC] bg-white text-[11px] font-semibold text-[#1E1B4B] transition-colors hover:bg-[#F7F7FC]";

const IMG_ACTION_BTN =
  "flex h-[32px] w-full cursor-pointer items-center justify-center gap-[5px] rounded-[6px] border-[0.75px] border-[#E2DFFC] bg-white px-[6px] text-[10px] font-semibold whitespace-nowrap text-[#1E1B4B] transition-colors hover:bg-[#F7F7FC]";

/* ==========================================================================
   AUDIO
   ========================================================================== */
function PlayButton({ size = 34 }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-full bg-[#00007A] text-white"
      style={{ width: size, height: size }}
    >
      <LuPlay size={size * 0.36} className="ml-[2px]" />
    </span>
  );
}

/* navy-filled progress bar with a white thumb ringed in navy */
function AudioSlider({ fill = 70 }) {
  return (
    <div className="relative h-[4px] flex-1 rounded-full bg-[#E2DFFC]">
      <div className="h-full rounded-full bg-[#041581]" style={{ width: `${fill}%` }} />
      <span
        className="absolute top-1/2 h-[10px] w-[10px] -translate-y-1/2 rounded-full border border-[#041581] bg-white"
        style={{ left: `calc(${fill}% - 5px)` }}
      />
    </div>
  );
}

/* ==========================================================================
   STEP 1 — ANSWER CHOICES (shared by the form and the phone preview)
   ========================================================================== */
const ANSWERS = [
  { key: "A", text: "Be strong and courageous.", correct: true },
  { key: "B", text: "Be kind and generous.", correct: false },
  { key: "C", text: "Be careful and quiet.", correct: false },
  { key: "D", text: "Be patient and gentle.", correct: false },
];

function AnswerLetter({ letter, correct, size = 18, fontSize = 10 }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full font-bold ${
        correct ? "bg-[#2E9E3E] text-white" : "border-[0.75px] border-[#041581] text-[#041581]"
      }`}
      style={{ width: size, height: size, fontSize }}
    >
      {letter}
    </span>
  );
}

function ChoiceRows({ height = 34, fontSize = 11, gap = 6 }) {
  return (
    <div className="flex flex-col" style={{ gap }}>
      {ANSWERS.map((a) => (
        <div
          key={a.key}
          className={`flex items-center rounded-[6px] border-[0.75px] px-2 ${
            a.correct ? "border-[#CDEBCD] bg-[#F0FAF0]" : "border-[#E2DFFC] bg-white"
          }`}
          style={{ height, gap: 8 }}
        >
          <AnswerLetter letter={a.key} correct={a.correct} size={18} fontSize={10} />
          <span className="truncate text-[#1E1B4B]" style={{ fontSize }}>
            {a.text}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ==========================================================================
   CARD 3 — STEP LIST
   ========================================================================== */
const STEP_LIST = [
  { n: 2, name: "Fill in the Blanks" },
  { n: 3, name: "Tap in Order" },
  { n: 4, name: "Verse Builder" },
  { n: 5, name: "I Recited It" },
];

function StepListCard() {
  return (
    <div className={`${CARD} pt-[17px] pr-[18px] pb-[17px] pl-[15px]`}>
      <div className="flex flex-col" style={{ gap: 10 }}>
        {STEP_LIST.map((s) => (
          <div
            key={s.n}
            className={`flex items-center justify-between rounded-[6px] border-[0.75px] border-[#E2DFFC] bg-[#EEF0F7] px-3`}
            style={{ height: 42 }}
          >
            <div className="flex min-w-0 items-center" style={{ gap: 10 }}>
              <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border-[0.75px] border-[#041581] text-[11px] font-bold text-[#041581]">
                {s.n}
              </span>
              <span className="truncate text-[14px] font-semibold text-[#1E1B4B]">{s.name}</span>
            </div>

            <div className="flex shrink-0 items-center" style={{ gap: 14 }}>
              <span className="flex items-center" style={{ gap: 5 }}>
                <LuCircleCheck size={15} className="text-[#2E9E3E]" />
                <span className="text-[11px] font-semibold text-[#2E9E3E]">Confirmed</span>
              </span>

              <span className="flex items-center" style={{ gap: 3 }}>
                <span className="text-[12px] font-semibold text-[#1E1B4B]">Edit</span>
                <LuChevronRight size={12} className="text-[#1E1B4B]" />
              </span>
            </div>
          </div>
        ))}

        <div className="flex items-center" style={{ gap: 8 }}>
          <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-[0.75px] border-[#041581] text-[11px] font-bold text-[#041581]">
            !
          </span>
          <span className="text-[14px] font-semibold text-[#6B668F]">
            Each step can be previewed before publishing.
          </span>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   CARD 7 — PHONE MOCK
   ========================================================================== */
function PhonePreview() {
  return (
    <div className={`${CARD} flex flex-col p-[14px]`} style={{ gap: 10 }}>
      <p className="text-[16px] font-semibold text-[#2A2750]">Mobile Preview</p>

      <div className="relative w-full overflow-hidden rounded-[6px] border-[0.75px] border-[#E2DFFC] bg-white">
        {/* sky hero */}
        <div
          className="relative h-[100px] w-full rounded-t-[6px] bg-[#CFE4F5] bg-cover bg-center bg-no-repeat"
          style={skyImage ? { backgroundImage: `url(${skyImage})` } : undefined}
        >
          <div className="absolute top-[10px] left-[10px] flex h-[28px] w-[28px] items-center justify-center rounded-full bg-white">
            <LuChevronLeft size={16} className="text-[#2A2750]" />
          </div>
          <div className="absolute top-[13px] left-[48px] flex h-[22px] items-center rounded-full bg-white px-[14px] text-[11px] font-medium text-[#2A2750]">
            Level 2
          </div>
          <div
            className="absolute top-[13px] right-[10px] flex h-[22px] items-center rounded-full bg-white"
            style={{ gap: 6, paddingLeft: 14, paddingRight: 12 }}
          >
            <LuCoins size={12} className="text-[#F5A623]" />
            <span className="text-[11px] font-semibold text-[#2A2750]">250</span>
          </div>
        </div>

        {/* white sheet — overlaps bottom of sky by 10px */}
        <div className="relative -mt-[10px] rounded-t-[12px] bg-white pt-[46px]">
          {/* 1/5 step circle — 28px over the sky image */}
          <div className="absolute top-[-18px] left-1/2 -translate-x-1/2">
            <div className="flex h-[56px] w-[56px] flex-col items-center justify-center rounded-full border-[3px] border-[#0B0B6B] bg-white">
              <span className="text-[15px] font-bold leading-none text-[#0B0B6B]">1/5</span>
              <span className="mt-[3px] text-[7px] font-normal leading-none text-[#6B7280]">
                Step
              </span>
            </div>
          </div>

          {/* navy card */}
          <div
            className="mx-[8px] flex flex-col rounded-[8px] bg-[#00007A] p-3"
            style={{ gap: 10 }}
          >
            <div className="flex items-center" style={{ gap: 8 }}>
              <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-white">
                <LuMusic size={11} className="text-[#00007A]" />
              </span>
              <span className="text-[13px] font-semibold text-white">Listen &amp; Choose</span>
            </div>

            <p className="text-left text-[10px] leading-[1.4] text-white/85">
              Listen to the verse and choose the correct one.
            </p>

            <div className="flex justify-center">
              <span className="flex h-[40px] w-[40px] items-center justify-center rounded-full border-[2px] border-white">
                <LuVolume2 size={20} strokeWidth={2} className="text-white" />
              </span>
            </div>

            <div className="flex items-center" style={{ gap: 8 }}>
              <div
                className="h-[4px] overflow-hidden rounded-[2px] bg-white/30"
                style={{ width: "65%" }}
              >
                <div className="h-full w-[30%] rounded-[2px] bg-white" />
              </div>
              <span className="shrink-0 text-[10px] font-medium text-white">00:00 / 00:18</span>
            </div>

            <div className="flex flex-col" style={{ gap: 8 }}>
              {ANSWERS.map((a) => (
                <div
                  key={a.key}
                  className={`flex items-center rounded-[6px] px-2 ${
                    a.correct ? "bg-[#F0FAF0]" : "bg-white"
                  }`}
                  style={{ height: 32, gap: 8 }}
                >
                  <span
                    className={`flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                      a.correct
                        ? "bg-[#2EAF4B] text-white"
                        : "border-[1.5px] border-[#0B0B6B] bg-transparent text-[#0B0B6B]"
                    }`}
                  >
                    {a.key}
                  </span>
                  <span className="text-[10px] font-semibold text-[#1E1B4B]">{a.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* next step button — in flow, no overlap */}
          <div
            className="mx-[8px] mt-[8px] flex h-[42px] cursor-pointer items-center justify-center rounded-[6px] text-[14px] font-semibold text-white"
            style={{ gap: 6, backgroundColor: GREEN_BTN }}
          >
            Next Step
            <LuArrowRight size={16} strokeWidth={1.5} className="text-white" />
          </div>

          {/* footer row */}
          <div className="mt-[12px] px-[8px] pb-[12px]">
            <div className="flex items-center justify-between">
              <span className="flex items-center text-[#1E1B4B]" style={{ gap: 4 }}>
                <LuStar size={12} className="text-[#F5A623]" fill="#F5A623" />
                <span className="text-[10px]">50 pts</span>
              </span>
              <span className="text-[10px] text-[#6B7280]">1 of 5 Steps</span>
            </div>
            <div className="mt-[6px] h-[4px] w-full overflow-hidden rounded-[2px] bg-[#E6E8F7]">
              <div className="h-full w-[20%] rounded-[2px] bg-[#0B0B6B]" />
            </div>
          </div>
        </div>
      </div>

      <p className="text-center text-[10px] leading-[1.4] italic text-[#8B8FA8]">
        This is a simplified preview of Step 1: Listen / Choose
      </p>
    </div>
  );
}

/* ==========================================================================
   PAGE
   ========================================================================== */
const STEP_TABS = [
  "1 Listen / Choose",
  "2 Fill in the Blanks",
  "3 Tap in Order",
  "4 Fill in the Blanks",
  "5 Tap in Order",
];

export default function AddEditMemoryVerse() {
  const [activeStep, setActiveStep] = useState(STEP_TABS[0]);
  const [showLevelToggle, setShowLevelToggle] = useState(true);

  return (
    <div
      className="min-h-screen w-full font-[Inter] text-[#1E1B4B]"
      style={{ backgroundColor: PAGE_BG }}
    >
      {/* ---------------- page header ---------------- */}
      <div className="mx-auto w-full max-w-[1090px] px-[18px] pt-[18px]">
        {/* breadcrumb row + back button */}
        <div className="flex items-center" style={{ gap: 10 }}>
          <span className="flex h-[28px] w-[28px] items-center justify-center rounded-full border-[0.75px] border-[#E2DFFC] bg-white">
            <LuChevronLeft size={15} className="text-[#1E1B4B]" />
          </span>
          <nav className="flex items-center text-[13px] text-[#6B668F]" style={{ gap: 6 }}>
            {["Old Testament", "Joshua", "Chapter 1", "Level 3"].map((c, i) => (
              <span key={c} className="flex items-center" style={{ gap: 6 }}>
                {i > 0 && <span className="text-[#6B668F66]">&gt;</span>}
                <span className={i === 3 ? "font-semibold text-[#1E1B4B]" : undefined}>{c}</span>
              </span>
            ))}
          </nav>
        </div>

        {/* title row */}
        <div
          className="mt-[14px] flex flex-wrap items-center justify-between"
          style={{ gap: 10 }}
        >
          <h1 className="text-[24px] font-bold text-[#1E1B4B]">Add / Edit Memory Verse</h1>

          <div className="flex items-center" style={{ gap: 10 }}>
            <button
              type="button"
              className="flex h-[40px] cursor-pointer items-center gap-2 rounded-[6px] border-[0.75px] border-[#E2DFFC] bg-white px-4 text-[13px] font-semibold text-[#1E1B4B] transition-colors hover:bg-[#F7F7FC]"
            >
              <LuSave size={14} /> Save draft
            </button>
            <button
              type="button"
              className="flex h-[40px] cursor-pointer items-center gap-2 rounded-[6px] border-[0.75px] border-[#E2DFFC] bg-white px-4 text-[13px] font-semibold text-[#1E1B4B] transition-colors hover:bg-[#F7F7FC]"
            >
              <LuEye size={14} /> Preview
            </button>
            <button
              type="button"
              className="flex h-[40px] cursor-pointer items-center gap-2 rounded-[6px] bg-[#00007A] px-4 text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
            >
              <LuSend size={14} /> Publish
            </button>
          </div>
        </div>

        {/* ---------------- 3 column layout ---------------- */}
        <div
          className="mt-[16px] grid items-start pb-[18px]"
          style={{
            gridTemplateColumns: "488px 285px 249px",
            gap: 16,
          }}
        >
          {/* ============ LEFT COLUMN ============ */}
          <div className="flex flex-col" style={{ gap: 16 }}>
            {/* ---- Card 1 : Verse Details (height 621) ---- */}
            <div
              className={`${CARD} pt-[18px] pr-[21px] pb-[18px] pl-[20px]`}
              style={{ height: 621, display: "flex", flexDirection: "column", gap: 10 }}
            >
              <p className="text-[14px] font-semibold text-[#1E1B4B]">Verse Details</p>

              <Field label="Testament">
                <TextInput value="Be strong and courageous" readOnly />
              </Field>

              <Field label="Testament">
                <Select
                  value="Old Testament"
                  options={["Old Testament", "New Testament"]}
                />
              </Field>

              <div className="grid grid-cols-2" style={{ gap: 16 }}>
                <Field label="Book">
                  <Select value="Joshua" options={["Joshua", "Proverbs", "Psalms"]} />
                </Field>
                <Field label="Chapter">
                  <Select value="1" options={["1", "2", "3", "4"]} />
                </Field>
              </div>

              <div className="grid grid-cols-2" style={{ gap: 16 }}>
                <Field label="Verse Reference">
                  <Select value="Joshua 1:9" options={["Joshua 1:9", "Joshua 1:8"]} />
                </Field>
                <Field label="Chapter">
                  <Select value="NIV" options={["NIV", "KJV", "ESV"]} />
                </Field>
              </div>

              <Field label="Full Verse Text">
                <TextArea
                  small
                  rows={3}
                  max={1000}
                  count={133}
                  value="Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go."
                />
              </Field>

              <Field label="Short Instruction">
                <InlineCounterInput
                  max={100}
                  count={99}
                  value="Listen to the verse and choose the correct one."
                />
              </Field>

              <Field label="Activity Length">
                <Select value="5 Steps" options={["5 Steps", "3 Steps", "4 Steps"]} />
              </Field>
            </div>

            {/* ---- Card 2 : Build the 5 Steps ---- */}
            <div className={`${CARD} p-[18px] pl-[20px] pr-[21px]`}>
              <p className="text-[14px] font-semibold text-[#1E1B4B]">Build the 5 Steps</p>

              {/* step pills, wrapped into 2 rows */}
              <div className="mt-[10px] flex flex-wrap" style={{ gap: 8 }}>
                {STEP_TABS.map((t) => {
                  const active = t === activeStep;
                  const num = t.split(" ")[0];
                  const rest = t.slice(num.length + 1);

                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setActiveStep(t)}
                      className={`flex h-[30px] cursor-pointer items-center rounded-full px-3 text-[11px] font-semibold transition-colors ${
                        active
                          ? "bg-[#00007A] text-white"
                          : "border-[0.75px] border-[#E2DFFC] bg-[#EEF0FB] text-[#1E1B4B]"
                      }`}
                      style={{ gap: 6 }}
                    >
                      <span
                        className={`flex h-[16px] w-[16px] items-center justify-center rounded-full text-[9px] font-bold ${
                          active ? "bg-white text-[#00007A]" : "bg-white text-[#1E1B4B]"
                        }`}
                      >
                        {num}
                      </span>
                      {rest}
                    </button>
                  );
                })}
              </div>

              {/* two inner columns */}
              <div className="mt-[16px] grid grid-cols-2 items-start" style={{ gap: 16 }}>
                {/* inner column A */}
                <div className="flex flex-col" style={{ gap: 10 }}>
                  <Field label="Instruction Text">
                    <TextArea
                      max={100}
                      rows={3}
                      value="Well done, faithful servant! Keep God's Word in your heart."
                    />
                  </Field>

                  <Field label="Audio">
                    <div className="flex items-center rounded-[6px] border-[0.75px] border-[#E2DFFC] bg-white px-2.5 py-2">
                      <PlayButton size={30} />
                      <div className="ml-2 min-w-0 flex-1">
                        <p className="truncate text-[11px] italic text-[#1E1B4B]">
                          joshua-1-9-niv.mp3
                        </p>
                        <AudioSlider fill={70} />
                      </div>
                      <span className="ml-2 shrink-0 text-[11px] italic text-[#6B7280]">00:18</span>
                    </div>
                  </Field>

                  <Field label="Answer Choices">
                    <ChoiceRows />
                  </Field>
                </div>

                {/* inner column B */}
                <div className="flex flex-col" style={{ gap: 10 }}>
                  <Field label="Instruction Text">
                    <div className="flex flex-wrap items-center" style={{ gap: 16 }}>
                      {["A", "B", "C", "D"].map((k, i) => (
                        <label
                          key={k}
                          className="flex cursor-pointer items-center text-[12px] text-[#1E1B4B]"
                          style={{ gap: 8 }}
                        >
                          <input
                            type="radio"
                            name="instruction-radio"
                            defaultChecked={i === 0}
                            className="h-[14px] w-[14px] accent-[#041581]"
                          />
                          {k}
                        </label>
                      ))}
                    </div>
                  </Field>

                  <Field label="Hint Text" optional>
                    <TextArea max={100} rows={2} value="Think about what God commands us to be" />
                  </Field>

                  <Field label="Success Feedback">
                    <InlineCounterInput max={100} value="That's right! Great job!" />
                  </Field>

                  <Field label="Error Feedback">
                    <InlineCounterInput max={100} value="Not quite. Listen again and try!" />
                  </Field>
                </div>
              </div>
            </div>

            {/* ---- Card 3 : step list (height 249) ---- */}
            <StepListCard />
          </div>

          {/* ============ MIDDLE COLUMN ============ */}
          <div className="flex flex-col" style={{ gap: 16 }}>
            {/* ---- Card 4 : Media ---- */}
            <div className={`${CARD} p-[18px] pl-[20px] pr-[21px]`}>
              <p className="text-[14px] font-semibold text-[#1E1B4B]">Media</p>

              <div className="mt-[10px]">
                <p className="mb-[6px] text-[12px] text-[#6B7280]">Chapter Default Image</p>
                <div className="flex items-start" style={{ gap: 10 }}>
                  <div
                    className="shrink-0 overflow-hidden rounded-[6px] border-[0.75px] border-[#E2DFFC] bg-[#F1F2F8]"
                    style={{ width: 115, height: 131 }}
                  >
                    <img
                      src={memoryVerseImg}
                      alt="Chapter default image"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col" style={{ gap: 8 }}>
                    <button type="button" className={IMG_ACTION_BTN}>
                      <LuRefreshCw size={12} /> Regenerate Puzzle
                    </button>
                    <button type="button" className={IMG_ACTION_BTN}>
                      <LuImage size={12} /> Regenerate Image
                    </button>
                    <button type="button" className={IMG_ACTION_BTN}>
                      <LuUpload size={12} /> Replace Image
                    </button>
                  </div>
                </div>
              </div>

              <div className="my-[10px] h-px w-full bg-[#E2DFFC]" />

              <div>
                <p className="mb-[6px] text-[12px] text-[#6B7280]">Audio (Verse Narration)</p>
                <div className="flex items-center rounded-[6px] border-[0.75px] border-[#E2DFFC] bg-white p-2.5">
                  <PlayButton size={30} />
                  <div className="ml-2 min-w-0">
                    <p className="truncate text-[11px] italic text-[#1E1B4B]">
                      joshua-1-9-niv.mp3
                    </p>
                    <p className="text-[11px] italic text-[#6B7280]">00:18</p>
                  </div>
                </div>

                <button type="button" className={`${OUTLINE_BTN} mt-[10px]`}>
                  <LuUpload size={13} /> Replace Audio
                </button>
                <p className="mt-1.5 text-[10px] italic text-[#6B7280]">
                  Recommended: MP3, max 5MB
                </p>
              </div>
            </div>

            {/* ---- Card 5 : Completion & Reward ---- */}
            <div className={`${CARD} p-[18px] pl-[20px] pr-[21px]`}>
              <p className="text-[14px] font-semibold text-[#1E1B4B]">Completion &amp; Reward</p>

              <div className="mt-[10px] flex flex-col" style={{ gap: 10 }}>
                <Field label="Reward Points" required>
                  <TextInput value="50" readOnly />
                </Field>
                <Field label="Completion Title" required>
                  <TextInput value="Verse Memorized!" readOnly />
                </Field>
                <Field label="Completion Button Label" required>
                  <TextInput value="I Recited It" readOnly />
                </Field>
                <Field label="Success Page" required>
                  <Select
                    value="Use standard reward success page"
                    options={["Use standard reward success page", "Use custom success page"]}
                  />
                </Field>
                <Field label="Next Action" required>
                  <Select
                    value="Collect Reward & Continue"
                    options={["Collect Reward & Continue", "Return to Home"]}
                  />
                </Field>
                <Field label="Amen / Encouragement Message (Optional):">
                  <TextArea
                    max={100}
                    rows={2}
                    value="Well done, faithful servant! Keep God's Word in your heart."
                  />
                </Field>
              </div>
            </div>

            {/* ---- Card 6 : Publishing ---- */}
            <div
              className={`${CARD} p-3`}
              style={{ display: "flex", flexDirection: "column", gap: 10 }}
            >
              <p className="text-[14px] font-semibold text-[#1E1B4B]">Publishing</p>

              <Field label="Status">
                <Select value="Published" options={["Published", "Draft", "Scheduled"]} />
              </Field>

              <div className="grid grid-cols-2" style={{ gap: 10 }}>
                <Field label="Start Date">
                  <div className="relative">
                    <TextInput value="May 12, 2024" readOnly className="pr-8" />
                    <LuCalendar
                      size={13}
                      className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-[#6B7280]"
                    />
                  </div>
                </Field>
                <Field label="End Date">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="No end date"
                      className={`${FIELD} ${INPUT_H} pr-8 placeholder:text-[#6B7280]`}
                    />
                    <LuCalendar
                      size={13}
                      className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-[#6B7280]"
                    />
                  </div>
                </Field>
              </div>

              <Field label="Display Order">
                <TextInput value="10" readOnly />
              </Field>

              <div className="flex items-center justify-between">
                <p className={LABEL}>Display Order</p>
                <button
                  type="button"
                  role="switch"
                  aria-checked={showLevelToggle}
                  onClick={() => setShowLevelToggle((v) => !v)}
                  className={`relative h-[20px] w-[36px] shrink-0 cursor-pointer rounded-full transition-colors ${
                    showLevelToggle ? "bg-[#041581]" : "bg-[#D1D5DB]"
                  }`}
                >
                  <span
                    className={`absolute top-[2px] h-4 w-4 rounded-full bg-white transition-all ${
                      showLevelToggle ? "left-[18px]" : "left-[2px]"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* ============ RIGHT COLUMN ============ */}
          <PhonePreview />
        </div>
      </div>
    </div>
  );
}
