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
} from "react-icons/lu";
import Clues1Img from "../../../assets/word search/Clues1.png";
import Clues2Img from "../../../assets/word search/Clues2.png";

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
   PAGE
   ========================================================================== */
const CLUES_1 = [
  "The waters covered the earth.",
  "Noah built one of these.",
  "Two of every kind entered.",
  "It rained for forty of these.",
  "The dove brought back an olive ___.",
  "The mountains were covered.",
  "God made a covenant with Noah.",
  "The sign in the sky.",
];

const CLUES_2 = [
  "God led His people by this.",
  "They crossed on dry ground.",
  "Manna fell from the sky.",
  "Water came from the rock.",
  "The mountain where God spoke.",
  "They traveled forty of these.",
  "God gave them His law.",
  "The land promised to them.",
];

function CluesColumn({ clues }) {
  return (
    <div className="min-w-0 flex-1">
      <p className="text-[11px] leading-none font-semibold" style={{ color: HEADING }}>
        Clues
      </p>
      <ol
        className="mt-[12px] list-decimal pl-[18px] text-[10px] font-medium leading-[20px]"
        style={{ color: MUTED }}
      >
        {clues.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ol>
    </div>
  );
}

export default function AIGenerateMysteryScripture() {
  const [hideRef, setHideRef] = useState(true);
  const [uniqueImg, setUniqueImg] = useState(true);
  const [noTextImg, setNoTextImg] = useState(true);
  const [activeTab, setActiveTab] = useState("AI Generate");

  const headerFields = [
    {
      label: "Testament",
      htmlFor: "testament",
      control: <SelectControl id="testament" defaultValue="Old Testament" options={["Old Testament"]} />,
    },
    {
      label: "Book",
      htmlFor: "book",
      control: <SelectControl id="book" defaultValue="Genesis" options={["Genesis"]} />,
    },
    {
      label: "Chapter",
      htmlFor: "chapter",
      control: <SelectControl id="chapter" defaultValue="1" options={["1"]} />,
    },
    {
      label: "Difficulty",
      htmlFor: "difficulty",
      control: <SelectControl id="difficulty" defaultValue="Easy" options={["Easy"]} />,
    },
  ];

  return (
    <div className="min-h-[calc(100vh-72px)] font-[Inter]" style={{ backgroundColor: "#F9FAFE" }}>
      <div className="mx-auto w-full max-w-[1114px] px-6 pt-6 pb-[48px]">
        <PageHeader
          headerFields={headerFields}
          pointsControl={<NumberStepper defaultValue="10" label="Points per Puzzle" />}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <SectionHeading
          title="AI Generate - Mystery Scripture"
          subtitle="Generate puzzles with Scripture clues to discover the hidden passage."
        />

        <FormCard>
          {/* ROW 1 */}
          <FormRow>
            <Field label="Scripture Range" htmlFor="scriptureRange" width="w-[188px]">
              <SelectControl
                id="scriptureRange"
                defaultValue="Genesis 1:1–31"
                options={["Genesis 1:1–31"]}
              />
            </Field>
            <Field label="Clue Count" htmlFor="clueCount" width="w-[131px]">
              <SelectControl id="clueCount" defaultValue="8" options={["8"]} />
            </Field>
            <Field label="Clue Difficulty Progression" htmlFor="clueDifficulty" width="w-[190px]">
              <SelectControl
                id="clueDifficulty"
                defaultValue="Easy to Hard"
                options={["Easy to Hard"]}
              />
            </Field>
            <ToggleRight
              label="Hide Reference Until Completion"
              on={hideRef}
              onChange={setHideRef}
              className="ml-auto"
            />
          </FormRow>

          <Divider />

          {/* ROW 2 */}
          <FormRow>
            <Field label="Number of Puzzles" htmlFor="numPuzzles" width="w-[168px]">
              <SelectControl id="numPuzzles" defaultValue="2" options={["2"]} />
            </Field>
            <Field label="Grid Size" htmlFor="gridSize" width="w-[134px]">
              <SelectControl id="gridSize" defaultValue="15 × 15" options={["15 × 15"]} />
            </Field>
            <Field label="New Levels" width="w-[334px]">
              <LevelsSelect levels={["Level 1", "Level 2"]} />
            </Field>
            <Field label="Puzzles per Level" width="flex-1">
              <PuzzlesPerLevel text="Level 1: 1    Level 2: 1" />
            </Field>
          </FormRow>

          <Divider />

          {/* ROW 3 */}
          <FormRow>
            <ToggleLeft
              label="Generate a unique AI image for every puzzle"
              on={uniqueImg}
              onChange={setUniqueImg}
            />
            <Field label="AI Image Style" htmlFor="imageStyle" width="w-[155px]">
              <SelectControl
                id="imageStyle"
                defaultValue="Biblical Illustration"
                options={["Biblical Illustration"]}
              />
            </Field>
            <Field label="Image Safety" htmlFor="imageSafety" width="w-[168px]">
              <SelectControl
                id="imageSafety"
                defaultValue="Family Safe"
                options={["Family Safe"]}
              />
            </Field>
            <ToggleRight
              label="No text in image"
              on={noTextImg}
              onChange={setNoTextImg}
              className="ml-auto"
            />
          </FormRow>
        </FormCard>

        <PreviewHeading />
        <PreviewGrid>
          <PuzzleCard title="Level 1 - Puzzle 1" actions={<CardActions />}>
            <PreviewImage src={Clues1Img} alt="Clues 1" />
            <CluesColumn clues={CLUES_1} />
          </PuzzleCard>
          <PuzzleCard title="Level 2 - Puzzle 1" actions={<CardActions />}>
            <PreviewImage src={Clues2Img} alt="Clues 2" />
            <CluesColumn clues={CLUES_2} />
          </PuzzleCard>
        </PreviewGrid>

        <PageFooter />
      </div>
    </div>
  );
}
