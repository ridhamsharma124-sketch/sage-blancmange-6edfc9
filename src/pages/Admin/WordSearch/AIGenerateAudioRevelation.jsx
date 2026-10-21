import { useState } from "react";
import {
  LuChevronDown,
  LuChevronUp,
  LuCircleCheck,
  LuImage,
  LuImagePlus,
  LuPencil,
  LuRotateCw,
  LuArrowRight,
  LuSave,
  LuX,
  LuPlay,
} from "react-icons/lu";
import sunImg from "../../../assets/word search/sun.png";
import seaWaterImg from "../../../assets/word search/sea water.png";

/* ==========================================================================
   TOKENS
   ========================================================================== */
const HEADING = "#0A0847";
const PRIMARY = "#001984";
const MUTED = "rgba(10, 8, 71, 0.6)";
const LABEL_COLOR = "rgba(10, 8, 71, 0.8)";
const DIVIDER_COLOR = "rgba(10, 8, 71, 0.1)";
const GREEN = "#22C55E";
const GREEN_TEXT = "#16A34A";

const CONTROL_CLS =
  "h-[40px] w-full cursor-pointer appearance-none rounded-[7.47px] border border-[#E2DFFC] bg-white pl-3 pr-8 text-[12px] outline-none focus:border-[#001984]/40";

/* ==========================================================================
   PRIMITIVES
   ========================================================================== */
function Chevron() {
  return (
    <LuChevronDown
      size={14}
      className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2"
      style={{ color: MUTED }}
      aria-hidden
    />
  );
}

function FieldLabel({ htmlFor, children }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-[12px] leading-none font-semibold whitespace-nowrap"
      style={{ color: LABEL_COLOR }}
    >
      {children}
    </label>
  );
}

function SelectControl({ id, value, defaultValue, onChange, options, disabled = false, className = "" }) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        disabled={disabled}
        className={`${CONTROL_CLS} ${disabled ? "cursor-not-allowed" : ""} ${className}`}
        style={{ color: MUTED }}
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

function NumberStepper({ value, defaultValue, onChange, label }) {
  const interactive = typeof onChange === "function";
  return (
    <div className="relative">
      <input
        {...(interactive
          ? { type: "number", value, onChange: (e) => onChange(Number(e.target.value)) }
          : { defaultValue })}
        min="0"
        aria-label={label}
        className="h-[40px] w-full rounded-[7.47px] border border-[#E2DFFC] bg-white pr-[30px] pl-3 text-[12px] outline-none focus:border-[#001984]/40"
        style={{ color: MUTED }}
      />
      {interactive ? (
        <span className="pointer-events-none absolute top-1/2 right-2 flex -translate-y-1/2 flex-col">
          <button
            type="button"
            tabIndex={-1}
            aria-label={`Increase ${label}`}
            onClick={() => onChange((value ?? 0) + 1)}
            className="pointer-events-auto flex h-[10px] w-[16px] cursor-pointer items-center justify-center"
            style={{ color: MUTED }}
          >
            <LuChevronUp size={11} />
          </button>
          <button
            type="button"
            tabIndex={-1}
            aria-label={`Decrease ${label}`}
            onClick={() => onChange(Math.max(0, (value ?? 0) - 1))}
            className="pointer-events-auto flex h-[10px] w-[16px] cursor-pointer items-center justify-center"
            style={{ color: MUTED }}
          >
            <LuChevronDown size={11} />
          </button>
        </span>
      ) : (
        <span className="pointer-events-none absolute top-1/2 right-2 flex -translate-y-1/2 flex-col">
          <svg width="10" height="6" viewBox="0 0 10 6">
            <path
              d="M1 4L5 1L9 4"
              stroke={MUTED}
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          <svg width="10" height="6" viewBox="0 0 10 6" className="mt-[1px]">
            <path
              d="M1 1L5 4L9 1"
              stroke={MUTED}
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </span>
      )}
    </div>
  );
}

function Toggle({ on, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className="relative h-[18px] w-[32px] shrink-0 cursor-pointer rounded-full transition-colors"
      style={{ backgroundColor: on ? GREEN : "#D6D6DE" }}
    >
      <span
        className="absolute top-[2px] h-[14px] w-[14px] rounded-full bg-white transition-all"
        style={{ left: on ? 16 : 2 }}
      />
    </button>
  );
}

/* label on the left, toggle on the right — label 12/600, gap ~14 */
function ToggleRight({ label, on, onChange, className = "" }) {
  return (
    <div className={`flex items-center gap-[14px] ${className}`}>
      <span className="text-[12px] font-semibold whitespace-nowrap" style={{ color: HEADING }}>
        {label}
      </span>
      <Toggle on={on} onChange={onChange} label={label} />
    </div>
  );
}

/* toggle on the left, label on the right — label 13/500 */
function ToggleLeft({ label, on, onChange, className = "" }) {
  return (
    <div className={`flex items-center gap-[10px] ${className}`}>
      <Toggle on={on} onChange={onChange} label={label} />
      <span className="text-[13px] font-medium whitespace-nowrap" style={{ color: HEADING }}>
        {label}
      </span>
    </div>
  );
}

/* label + control wrapper (label single line, 8px above the control) */
function Field({ label, htmlFor, width = "flex-1", children }) {
  return (
    <div className={`${width} min-w-0 shrink-0`}>
      <FieldLabel htmlFor={htmlFor}>{label}</FieldLabel>
      <div className="mt-[8px]">{children}</div>
    </div>
  );
}

/* ==========================================================================
   PAGE HEADER + TOP DROPDOWN ROW + TABS
   ========================================================================== */
const HEADER_WIDTHS = ["w-[222px]", "w-[222px]", "w-[160px]", "w-[171px]"];
const TABS = ["Manual Entry", "CSV Upload", "AI Generate"];

function Tabs({ activeTab = "AI Generate", onTabChange }) {
  return (
    <div className="mt-[24px] w-full border-b border-[#E2DFFC]">
      <div className="flex gap-[32px]">
        {TABS.map((t) => {
          const active = t === activeTab;
          return (
            <button
              key={t}
              type="button"
              onClick={onTabChange ? () => onTabChange(t) : undefined}
              className={`relative py-[10px] text-[12px] ${active ? "font-semibold" : "font-medium"}`}
              style={{ color: active ? HEADING : MUTED }}
            >
              {t}
              {active && (
                <span
                  className="absolute -bottom-px left-0 h-[2px] w-full"
                  style={{ backgroundColor: HEADING }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PageHeader({ headerFields, pointsControl, activeTab, onTabChange }) {
  return (
    <>
      <h1 className="text-[22px] leading-none font-semibold" style={{ color: HEADING }}>
        Add / Edit Word Search
      </h1>
      <p className="mt-[8px] text-[16px] leading-none font-medium" style={{ color: MUTED }}>
        Choose the activity type and how you want to create it.
      </p>

      <div className="mt-[16px] flex gap-[24px]">
        {headerFields.map((f, i) => (
          <Field key={f.label} label={f.label} htmlFor={f.htmlFor} width={HEADER_WIDTHS[i]}>
            {f.control}
          </Field>
        ))}
        <Field label="Points per Puzzle" width="flex-1">
          {pointsControl}
        </Field>
      </div>

      <Tabs activeTab={activeTab} onTabChange={onTabChange} />
    </>
  );
}

/* ==========================================================================
   SECTION TITLE + FORM CARD
   ========================================================================== */
function SectionHeading({ title, subtitle }) {
  return (
    <>
      <h2 className="mt-[24px] text-[20px] leading-none font-semibold" style={{ color: HEADING }}>
        {title}
      </h2>
      <p className="mt-[8px] text-[16px] leading-none font-medium" style={{ color: MUTED }}>
        {subtitle}
      </p>
    </>
  );
}

function FormCard({ children }) {
  return (
    <div className="mt-[16px] flex min-h-[311px] w-[1059px] flex-col rounded-[7.5px] border-[0.75px] border-[#E2DFFC] bg-white pt-[16px] pr-[28px] pb-[16px] pl-[27px]">
      {children}
    </div>
  );
}

function FormRow({ children, gap = "gap-[24px]", className = "" }) {
  return <div className={`flex h-[63px] items-center ${gap} ${className}`}>{children}</div>;
}

function Divider() {
  return <div className="my-[20px] h-px w-full" style={{ backgroundColor: DIVIDER_COLOR }} />;
}

/* New Levels multi-select — h40, chips 75x26 r8 */
function LevelsSelect({ levels, onRemove }) {
  return (
    <div className="flex h-[40px] w-full items-center gap-[8px] overflow-hidden rounded-[7.47px] border border-[#E2DFFC] bg-white px-[12px]">
      {levels.map((lv) => (
        <span
          key={lv}
          className="flex h-[26px] min-w-[75px] shrink-0 items-center justify-center gap-[8px] rounded-[8px] border border-[#CFD6EF] bg-[#F5F4FE] px-[12px] text-[11px] font-medium whitespace-nowrap"
          style={{ color: PRIMARY }}
        >
          {lv}
          {onRemove ? (
            <button
              type="button"
              aria-label={`Remove ${lv}`}
              onClick={() => onRemove(lv)}
              className="cursor-pointer"
              style={{ color: PRIMARY }}
            >
              <LuX size={12} />
            </button>
          ) : (
            <LuX size={12} aria-hidden />
          )}
        </span>
      ))}
    </div>
  );
}

/* Puzzles per Level — read-only, placeholder-style muted text */
function PuzzlesPerLevel({ text }) {
  return (
    <input
      readOnly
      value={text}
      aria-label="Puzzles per Level"
      className="h-[40px] w-full rounded-[7.47px] border border-[#E2DFFC] bg-white px-[12px] text-[12px] outline-none"
      style={{ color: MUTED }}
    />
  );
}

/* ==========================================================================
   GENERATED PUZZLES PREVIEW
   ========================================================================== */
function PreviewHeading() {
  return (
    <h3 className="mt-[24px] text-[14px] leading-none font-semibold" style={{ color: HEADING }}>
      Generated Puzzles Preview
    </h3>
  );
}

function PreviewGrid({ children }) {
  return <div className="mt-[16px] flex gap-[24px]">{children}</div>;
}

function PuzzleCard({ title, children, actions }) {
  return (
    <div className="flex h-[413px] w-[519px] flex-col gap-[16px] rounded-[7.5px] border-[0.75px] border-[#E2DFFC] bg-white pt-[24px] pr-[19px] pb-[26px] pl-[22px]">
      <div className="flex items-center justify-between">
        <p className="text-[12px] font-medium" style={{ color: MUTED }}>
          {title}
        </p>
        <span
          className="flex h-[20px] items-center rounded-[4px] px-[8px] text-[10px] font-semibold"
          style={{ backgroundColor: "#E8FBEF", color: GREEN_TEXT }}
        >
          AI IMAGE
        </span>
      </div>

      <div className="flex h-[223px] w-full gap-[21px]">{children}</div>

      <div className="flex flex-col gap-[8px]">{actions}</div>
    </div>
  );
}

function PreviewImage({ src, alt }) {
  return (
    <div
      className="flex h-[223px] w-[230px] shrink-0 items-center justify-center overflow-hidden rounded-[8px]"
      style={{ backgroundColor: "#F3F4F6" }}
    >
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <LuImage size={28} style={{ color: "#9CA3AF" }} aria-hidden />
      )}
    </div>
  );
}

function OutlineAction({ icon: Icon, className = "", children }) {
  return (
    <button
      type="button"
      className={`flex h-[31px] cursor-pointer items-center justify-center gap-[6px] rounded-[6px] border border-[#E2DFFC] bg-white text-[11px] font-medium whitespace-nowrap transition-colors hover:bg-[#F7F8FE] ${className}`}
      style={{ color: HEADING }}
    >
      <Icon size={12} />
      {children}
    </button>
  );
}

function CardActions() {
  return (
    <>
      <div className="flex gap-[8px]">
        <OutlineAction icon={LuRotateCw} className="w-[130px]">
          Regenerate Puzzle
        </OutlineAction>
        <OutlineAction icon={LuImage}>Regenerate Image</OutlineAction>
        <OutlineAction icon={LuImagePlus}>Replace Image</OutlineAction>
      </div>
      <div className="flex gap-[8px]">
        <OutlineAction icon={LuPencil} className="w-[74px]">
          Edit
        </OutlineAction>
        <button
          type="button"
          className="flex h-[31px] w-[120px] cursor-pointer items-center justify-center gap-[6px] rounded-[6px] text-[11px] font-medium whitespace-nowrap text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: PRIMARY }}
        >
          <LuCircleCheck size={12} />
          Publish Approved
        </button>
      </div>
    </>
  );
}

/* ==========================================================================
   PAGE FOOTER
   ========================================================================== */
function PageFooter() {
  return (
    <div className="mt-[24px] flex items-center justify-between">
      <button
        type="button"
        className="flex h-[42px] w-[97px] cursor-pointer items-center justify-center rounded-[6px] border border-[#E2DFFC] bg-white text-[14px] font-semibold transition-colors hover:bg-[#F5F8FD]"
        style={{ color: HEADING }}
      >
        Cancel
      </button>

      <div className="flex gap-[12px]">
        <button
          type="button"
          className="flex h-[42px] w-[119px] cursor-pointer items-center justify-center gap-[8px] rounded-[6px] border border-[#E2DFFC] bg-white text-[14px] font-semibold transition-colors hover:bg-[#F5F8FD]"
          style={{ color: HEADING }}
        >
          <LuSave size={16} style={{ color: PRIMARY }} />
          Save draft
        </button>
        <button
          type="button"
          className="flex h-[42px] w-[180px] cursor-pointer items-center justify-center gap-[8px] rounded-[6px] text-[14px] font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: PRIMARY }}
        >
          Publish Approved
          <LuArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

/* ==========================================================================
   AUDIO PAGE PARTS
   ========================================================================== */
const HEADER_FIELDS = [
  { id: "testament", label: "Testament", value: "Old Testament", options: ["Old Testament", "New Testament"] },
  { id: "book", label: "Book", value: "Genesis", options: ["Genesis", "Exodus", "Psalms", "John"] },
  { id: "chapter", label: "Chapter", value: "1", options: ["1", "2", "3"] },
  { id: "difficulty", label: "Difficulty", value: "Easy", options: ["Easy", "Medium", "Hard"] },
];

const PASSAGE_OPTIONS = [
  "Creation (Genesis 1)",
  "Noah's Ark (Genesis 6)",
  "Abraham's Call (Genesis 12)",
  "The Exodus (Exodus 14)",
];
const VOICE_OPTIONS = ["Male – Warm", "Male – Deep", "Female – Warm", "Female – Soft"];
const AUDIO_LENGTH_OPTIONS = ["1", "2", "3", "4", "5"];
const WORD_BANK_OPTIONS = ["Show", "Hide"];
const PUZZLE_COUNT_OPTIONS = ["1", "2", "3", "4", "5"];
const IMAGE_STYLE_OPTIONS = ["Biblical Illustration", "Watercolour", "Modern Art", "Line Art"];
const SAFETY_OPTIONS = ["Family Safe", "Family Safe (Strict)", "Unfiltered"];

const WAVEFORM = [
  6, 12, 18, 9, 15, 20, 8, 14, 7, 17, 11, 19, 6, 13, 9, 16, 7, 20, 10, 14, 8, 18, 12, 6, 15, 9,
  17, 11, 7, 19, 13, 8, 16, 10, 6, 14, 18, 9, 12, 20, 7, 15, 11, 8,
];

function AudioPlayer() {
  return (
    <div
      className="mt-[12px] flex h-[34px] w-full items-center gap-[8px] rounded-[8px] px-[8px]"
      style={{ backgroundColor: "#EFEDFB" }}
    >
      <button
        type="button"
        aria-label="Play audio"
        className="flex h-[18px] w-[18px] shrink-0 cursor-pointer items-center justify-center rounded-full transition-opacity hover:opacity-90"
        style={{ backgroundColor: PRIMARY }}
      >
        <LuPlay size={8} className="text-white" fill="white" aria-hidden />
      </button>

      <div className="flex h-full min-w-0 flex-1 items-center gap-[1px] overflow-hidden">
        {WAVEFORM.map((h, i) => (
          <span
            key={i}
            className="flex-1 rounded-full"
            style={{ height: h, backgroundColor: PRIMARY, minWidth: "1px" }}
          />
        ))}
      </div>

      <span className="shrink-0 text-[10px] whitespace-nowrap" style={{ color: MUTED }}>
        0:00 / 0:30
      </span>
    </div>
  );
}

function AudioOption({ option, index, correct }) {
  return (
    <div className="flex items-center gap-[8px]">
      <span
        className="flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-full"
        style={{ border: correct ? `1.5px solid ${GREEN}` : "1.5px solid #C3C4D4" }}
      >
        {correct && (
          <span className="h-[6px] w-[6px] rounded-full" style={{ backgroundColor: GREEN }} />
        )}
      </span>
      <span className="text-[11px] font-medium" style={{ color: correct ? GREEN_TEXT : HEADING }}>
        {`${String.fromCharCode(65 + index)}. ${option}`}
      </span>
    </div>
  );
}

function AudioBody({ src, alt, question, options, correctIndex }) {
  return (
    <>
      <PreviewImage src={src} alt={alt} />
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-medium whitespace-nowrap" style={{ color: HEADING }}>
          Listen to the audio. Then answer the question.
        </p>

        <AudioPlayer />

        <p className="mt-[12px] text-[12px] font-semibold" style={{ color: HEADING }}>
          {question}
        </p>

        <div className="mt-[12px] flex flex-col gap-[8px]">
          {options.map((opt, i) => (
            <AudioOption key={`${opt}-${i}`} option={opt} index={i} correct={i === correctIndex} />
          ))}
        </div>
      </div>
    </>
  );
}

/* ==========================================================================
   PAGE
   ========================================================================== */
export default function AIGenerateAudioRevelation() {
  const [points, setPoints] = useState(10);
  const [values, setValues] = useState(() =>
    HEADER_FIELDS.reduce((acc, f) => ({ ...acc, [f.id]: f.value }), {}),
  );

  const [passage, setPassage] = useState(PASSAGE_OPTIONS[0]);
  const [voice, setVoice] = useState(VOICE_OPTIONS[0]);
  const [audioLength, setAudioLength] = useState(AUDIO_LENGTH_OPTIONS[3]);
  const [wordBank, setWordBank] = useState(WORD_BANK_OPTIONS[0]);
  const [preserve, setPreserve] = useState(true);
  const [count, setCount] = useState(PUZZLE_COUNT_OPTIONS[1]);
  const [levels, setLevels] = useState(["Level 1", "Level 2"]);
  const [aiImage, setAiImage] = useState(true);
  const [imageStyle, setImageStyle] = useState(IMAGE_STYLE_OPTIONS[0]);
  const [safety, setSafety] = useState(SAFETY_OPTIONS[0]);
  const [noText, setNoText] = useState(true);
  const [transcript, setTranscript] = useState(true);

  const removeLevel = (lv) => setLevels((p) => p.filter((x) => x !== lv));

  const headerFields = HEADER_FIELDS.map((f) => ({
    label: f.label,
    htmlFor: f.id,
    control: (
      <SelectControl
        id={f.id}
        value={values[f.id]}
        onChange={(e) => setValues((p) => ({ ...p, [f.id]: e.target.value }))}
        options={f.options}
      />
    ),
  }));

  const puzzlesPerLevel = levels.map((lv) => `${lv}: 1`).join("    ");

  return (
    <div className="min-h-[calc(100vh-72px)] font-[Inter]" style={{ backgroundColor: "#F9FAFE" }}>
      <div className="mx-auto w-full max-w-[1114px] px-6 pt-6 pb-[48px]">
        <PageHeader
          headerFields={headerFields}
          pointsControl={
            <NumberStepper value={points} onChange={setPoints} label="Points per Puzzle" />
          }
          activeTab="AI Generate"
        />

        <SectionHeading
          title="AI Generate - Audio Revelation"
          subtitle="Generate puzzles with audio clues for listening and answering."
        />

        <FormCard>
          {/* ROW 1 */}
          <FormRow>
            <Field label="Passage / Topic" htmlFor="passage" width="w-[190px]">
              <SelectControl
                id="passage"
                value={passage}
                onChange={(e) => setPassage(e.target.value)}
                options={PASSAGE_OPTIONS}
              />
            </Field>
            <Field label="AI Narration Voice" htmlFor="voice" width="w-[180px]">
              <SelectControl
                id="voice"
                value={voice}
                onChange={(e) => setVoice(e.target.value)}
                options={VOICE_OPTIONS}
              />
            </Field>
            <Field label="Audio Length" htmlFor="audioLength" width="w-[130px]">
              <SelectControl
                id="audioLength"
                value={audioLength}
                onChange={(e) => setAudioLength(e.target.value)}
                options={AUDIO_LENGTH_OPTIONS}
              />
            </Field>
            <Field label="Word Bank" htmlFor="wordBank" width="w-[162px]">
              <SelectControl
                id="wordBank"
                value={wordBank}
                onChange={(e) => setWordBank(e.target.value)}
                options={WORD_BANK_OPTIONS}
              />
            </Field>
            <ToggleRight
              label="Preserve Verse Wording"
              on={preserve}
              onChange={setPreserve}
              className="ml-auto"
            />
          </FormRow>

          <Divider />

          {/* ROW 2 */}
          <FormRow>
            <Field label="Number of Puzzles" htmlFor="numPuzzles" width="w-[168px]">
              <SelectControl
                id="numPuzzles"
                value={count}
                onChange={(e) => setCount(e.target.value)}
                options={PUZZLE_COUNT_OPTIONS}
              />
            </Field>
            <Field label="Grid Size" htmlFor="gridSize" width="w-[134px]">
              <SelectControl id="gridSize" disabled defaultValue="-" options={["-"]} />
            </Field>
            <Field label="New Levels" width="flex-1">
              <LevelsSelect levels={levels} onRemove={removeLevel} />
            </Field>
            <Field label="Puzzles per Level" width="w-[274px]">
              <PuzzlesPerLevel text={puzzlesPerLevel} />
            </Field>
          </FormRow>

          <Divider />

          {/* ROW 3 — one horizontal line */}
          <FormRow gap="gap-[16px]">
            <ToggleLeft
              label="Generate a unique AI image for every puzzle"
              on={aiImage}
              onChange={setAiImage}
            />
            <Field label="AI Image Style" htmlFor="imageStyle" width="w-[155px]">
              <SelectControl
                id="imageStyle"
                value={imageStyle}
                onChange={(e) => setImageStyle(e.target.value)}
                options={IMAGE_STYLE_OPTIONS}
              />
            </Field>
            <Field label="Image Safety" htmlFor="imageSafety" width="w-[140px]">
              <SelectControl
                id="imageSafety"
                value={safety}
                onChange={(e) => setSafety(e.target.value)}
                options={SAFETY_OPTIONS}
              />
            </Field>
            <ToggleRight label="No text in image" on={noText} onChange={setNoText} />
            <ToggleRight
              label="Generate Transcript"
              on={transcript}
              onChange={setTranscript}
              className="ml-auto"
            />
          </FormRow>
        </FormCard>

        <PreviewHeading />
        <PreviewGrid>
          <PuzzleCard title="Level 1 - Puzzle 1" actions={<CardActions />}>
            <AudioBody
              src={sunImg}
              alt="Level 1 image"
              question="1. What did God create in the beginning?"
              options={["The earth", "The sun", "The heavens and the earth", "The stars"]}
              correctIndex={2}
            />
          </PuzzleCard>
          <PuzzleCard title="Level 2 - Puzzle 1" actions={<CardActions />}>
            <AudioBody
              src={seaWaterImg}
              alt="Level 2 image"
              question="2. What did God call the light?"
              options={["Day", "Day", "Night", "Evening"]}
              correctIndex={0}
            />
          </PuzzleCard>
        </PreviewGrid>

        <PageFooter />
      </div>
    </div>
  );
}
