import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LuChevronDown,
  LuChevronUp,
  LuRotateCw,
  LuRefreshCw,
  LuImagePlus,
  LuSparkles,
  LuGrid3X3,
  LuSettings,
  LuSlidersHorizontal,
  LuBookOpen,
  LuCheck,
  LuPencil,
  LuUpload,
  LuDownload,
  LuSave,
  LuEye,
  LuArrowRight,
  LuList,
  LuFileSpreadsheet,
} from "react-icons/lu";
import mysteryScripture from "../../../assets/word search/Mystery Scripture.png";

/* ==========================================================================
   DESIGN TOKENS
   ========================================================================== */
const NAVY = "#001984";
const HEADING = "#1B1F4B";
const GRAY = "#6B7194";
const BORDER = "#E4E7F5";
const PAGE_BG = "#F7F8FF";
const TINT_BG = "#F2F3FC"; /* navy at 5% on white */
const TINT_BORDER = "#AEB7D0";

const fieldClass =
  "h-[44px] w-full cursor-pointer appearance-none rounded-[6px] border border-[#E4E7F5] bg-white pl-3 pr-8 text-[13px] outline-none focus:border-[#001984]";

const fieldLabel = "mb-1.5 block text-[12px] font-bold";
const fieldValue = { color: HEADING };

/* ==========================================================================
   DATA
   ========================================================================== */
const FIELDS = [
  { id: "testament", label: "Testament", value: "Old Testament", options: ["Old Testament", "New Testament"] },
  { id: "book", label: "Book", value: "Genesis", options: ["Genesis", "Exodus", "Psalms", "John"] },
  { id: "chapter", label: "Chapter", value: "1", options: ["1", "2", "3"] },
  { id: "level", label: "Level", value: "Level 1", options: ["Level 1", "Level 2", "Level 3"] },
  { id: "difficulty", label: "Difficulty", value: "Easy", options: ["Easy", "Medium", "Hard"] },
];

const WORD_SEARCH_TYPES = [
  {
    id: "hidden",
    title: "Hidden Restoration",
    description: "Find hidden Bible words from clues.",
    Glyph: LuGrid3X3,
  },
  {
    id: "verse",
    title: "Verse Restoration",
    description: "Restore missing words in a verse.",
    Glyph: LuSettings,
  },
  {
    id: "audio",
    title: "Audio Revelation",
    description: "Listen and identify the correct answer.",
    Glyph: LuSlidersHorizontal,
  },
  {
    id: "mystery",
    title: "Mystery Scripture",
    description: "Reveal the hidden Scripture.",
    Glyph: LuBookOpen,
  },
];

const CREATION_METHODS = [
  {
    id: "manual",
    title: "Add Manually",
    description: "Create and enter puzzles one by one.",
    Glyph: LuPencil,
    iconInCircle: true,
    buttons: [
      { label: "Start Manual Entry", variant: "primary" },
    ],
  },
  {
    id: "csv",
    title: "Bulk Upload CSV",
    description: "Upload multiple puzzles at once.",
    Glyph: LuUpload,
    buttons: [
      { label: "Download Template", variant: "ghost", icon: LuDownload },
      { label: "Generate AI Image", variant: "outline", icon: LuUpload, full: true },
    ],
  },
  {
    id: "ai",
    title: "AI Generate",
    description: "Let AI create puzzles for this chapter.",
    Glyph: LuSparkles,
    buttons: [
      { label: "Generate with AI", variant: "primary" },
    ],
  },
];

const POLICY = [
  { Glyph: LuList, label: "Manual:", text: "chapter default image assigned automatically" },
  { Glyph: LuFileSpreadsheet, label: "CSV:", text: "chapter default image assigned unless changed" },
  { Glyph: LuSparkles, label: "AI Generate", text: "unique AI image created for every puzzle" },
];

/* ==========================================================================
   BUTTONS
   ========================================================================== */
function PrimaryButton({ label, onClick, icon: Icon, className = "", height = "h-[44px]" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${height} flex cursor-pointer items-center justify-center gap-2 rounded-[6px] px-4 text-[13px] font-semibold text-white transition-opacity hover:opacity-90 ${className}`}
      style={{ backgroundColor: NAVY }}
    >
      {Icon && <Icon size={15} />}
      {label}
    </button>
  );
}

function OutlineButton({ label, onClick, icon: Icon, className = "", height = "h-[44px]", fill = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${height} flex cursor-pointer items-center justify-center gap-2 rounded-[6px] px-4 text-[13px] font-semibold transition-colors hover:bg-[#F0F2FB] ${className}`}
      style={{
        border: `1px solid ${NAVY}`,
        color: NAVY,
        backgroundColor: fill ? "#FFFFFF" : "transparent",
      }}
    >
      {Icon && <Icon size={15} />}
      {label}
    </button>
  );
}

/* ==========================================================================
   SCREEN 3 — ADD / EDIT WORD SEARCH (form page)
   ========================================================================== */
export default function AddEditWordSearch() {
  const navigate = useNavigate();
  const [wsType, setWsType] = useState("hidden");
  const [reward, setReward] = useState(10);
  const [values, setValues] = useState(() =>
    FIELDS.reduce((acc, f) => ({ ...acc, [f.id]: f.value }), {}),
  );

  return (
    <div className="min-h-[calc(100vh-72px)] font-[Inter]" style={{ backgroundColor: PAGE_BG, color: HEADING }}>
      <div className="mx-auto max-w-[1062px] px-5 py-6">
        {/* header */}
        <h1 className="text-[24px] font-bold" style={{ color: HEADING }}>
          Add / Edit Word Search
        </h1>
        <p className="mt-1 text-[14px]" style={{ color: GRAY }}>
          Choose the activity type and how you want to create it.
        </p>

        {/* 6 fields */}
        <div className="mt-7 grid grid-cols-6 gap-4">
          {FIELDS.map(({ id, label, options }) => (
            <div key={id}>
              <label htmlFor={id} className={fieldLabel} style={{ color: HEADING }}>
                {label}
              </label>
              <div className="relative">
                <select
                  id={id}
                  value={values[id]}
                  onChange={(e) => setValues((prev) => ({ ...prev, [id]: e.target.value }))}
                  className={fieldClass}
                  style={fieldValue}
                >
                  {options.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
                <LuChevronDown
                  size={15}
                  className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2"
                  style={{ color: GRAY }}
                  aria-hidden
                />
              </div>
            </div>
          ))}

          {/* reward points with stepper */}
          <div>
            <label htmlFor="reward" className={fieldLabel} style={{ color: HEADING }}>
              Reward Points
            </label>
            <div className="relative">
              <input
                id="reward"
                type="number"
                min="0"
                value={reward}
                onChange={(e) => setReward(Number(e.target.value))}
                className="h-[44px] w-full rounded-[6px] border border-[#E4E7F5] bg-white pr-8 pl-3 text-[13px] outline-none focus:border-[#001984]"
                style={fieldValue}
              />
              <span className="pointer-events-none absolute top-1/2 right-2 flex -translate-y-1/2 flex-col">
                <button
                  type="button"
                  tabIndex={-1}
                  aria-label="Increase reward points"
                  onClick={() => setReward((n) => n + 1)}
                  className="flex h-[11px] w-[16px] cursor-pointer items-center justify-center text-[#6B7194]"
                >
                  <LuChevronUp size={11} />
                </button>
                <button
                  type="button"
                  tabIndex={-1}
                  aria-label="Decrease reward points"
                  onClick={() => setReward((n) => Math.max(0, n - 1))}
                  className="flex h-[11px] w-[16px] cursor-pointer items-center justify-center text-[#6B7194]"
                >
                  <LuChevronDown size={11} />
                </button>
              </span>
            </div>
          </div>
        </div>

        {/* default image panel */}
        <div
          className="mt-8 flex h-[268px] items-center gap-6 rounded-[8px] border px-6 py-6"
          style={{ backgroundColor: TINT_BG, borderColor: TINT_BORDER }}
        >
          <img
            src={mysteryScripture}
            alt="Mystery Scripture"
            className="h-[220px] w-[297px] shrink-0 rounded-[8px] border object-cover object-top"
            style={{ borderColor: BORDER }}
          />

          <div className="min-w-0 flex-1">
            <p className="text-[15px] font-bold" style={{ color: HEADING }}>
              Default image: Genesis 1
            </p>
            <p className="mt-1.5 max-w-[520px] text-[12px] leading-[1.6]" style={{ color: GRAY }}>
              This image will be used as the default for all puzzles in this chapter when
              created manually or via CSV upload.
            </p>

            <div className="mt-4 flex items-center gap-2.5">
              <OutlineButton label="Replace Default" icon={LuRotateCw} height="h-[38px]" />
              <PrimaryButton label="Generate AI Image" icon={LuImagePlus} height="h-[38px]" />
              <OutlineButton label="Reset" icon={LuRefreshCw} height="h-[38px]" />
            </div>
          </div>
        </div>

        {/* 1. type */}
        <h2 className="mt-8 text-[15px] font-bold" style={{ color: HEADING }}>
          1. Choose Word Search Type
        </h2>

        <div className="mt-4 grid grid-cols-4 gap-6">
          {WORD_SEARCH_TYPES.map(({ id, title, description, Glyph }) => {
            const selected = wsType === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setWsType(id)}
                className="relative flex h-[156px] cursor-pointer flex-col items-center justify-center rounded-[7.5px] border px-5 pb-7 pt-[27px] text-center transition-colors"
                style={{
                  borderWidth: 1,
                  borderColor: selected ? NAVY : BORDER,
                  backgroundColor: selected ? TINT_BG : "#FFFFFF",
                }}
              >
                <Glyph size={40} strokeWidth={1.3} style={{ color: NAVY }} aria-hidden />
                <span className="mt-3 text-[13px] font-bold" style={{ color: HEADING }}>
                  {title}
                </span>
                <span className="mt-1 text-[11px] leading-[1.5]" style={{ color: GRAY }}>
                  {description}
                </span>

                {selected && (
                  <span
                    className="absolute -top-2.5 -right-2.5 flex h-[22px] w-[22px] items-center justify-center rounded-full"
                    style={{ backgroundColor: NAVY }}
                  >
                    <LuCheck size={13} className="text-white" aria-hidden />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* 2. creation method */}
        <h2 className="mt-8 text-[15px] font-bold" style={{ color: HEADING }}>
          2. Choose Creation Method
        </h2>

        <div className="mt-4 grid grid-cols-3 gap-6">
          {CREATION_METHODS.map(({ id, title, description, Glyph, iconInCircle, buttons }) => (
            <div
              key={id}
              className="flex h-[182px] flex-col rounded-[7.5px] border bg-white px-6 pt-[25px] pb-[17px]"
              style={{ borderWidth: 1, borderColor: BORDER }}
            >
              {iconInCircle ? (
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F0F1F6]">
                  <Glyph size={16} style={{ color: HEADING }} aria-hidden />
                </span>
              ) : (
                <Glyph size={22} strokeWidth={1.6} style={{ color: HEADING }} aria-hidden />
              )}

              <p className="mt-2.5 text-[14px] font-bold" style={{ color: HEADING }}>
                {title}
              </p>
              <p className="mt-1 text-[12px] leading-[1.5]" style={{ color: GRAY }}>
                {description}
              </p>

              <div className="mt-auto flex flex-col gap-2">
                {buttons.map((btn) =>
                  btn.variant === "primary" ? (
                    <PrimaryButton
                      key={btn.label}
                      label={btn.label}
                      height="h-[36px]"
                      onClick={
                        id === "manual"
                          ? () => navigate(`/admin/word-search/add-edit/manual-${wsType}`)
                          : id === "ai"
                          ? () =>
                              navigate(
                                wsType === "verse"
                                  ? "/admin/word-search/add-edit/ai-generate/verse-restoration"
                                  : wsType === "audio"
                                  ? "/admin/word-search/add-edit/ai-generate/audio-revelation"
                                  : "/admin/word-search/add-edit/ai-generate",
                              )
                          : undefined
                      }
                    />
                  ) : (
                    <OutlineButton
                      key={btn.label}
                      label={btn.label}
                      icon={btn.icon}
                      height="h-[36px]"
                      fill={btn.full}
                    />
                  ),
                )}
              </div>
            </div>
          ))}
        </div>

        {/* image usage policy */}
        <div
          className="mt-8 rounded-[8px] border px-6 pt-[27px] pb-5"
          style={{ backgroundColor: TINT_BG, borderColor: TINT_BORDER }}
        >
          <p className="text-[15px] font-bold" style={{ color: HEADING }}>
            Image Usage Policy
          </p>

          <div className="mt-4 grid grid-cols-3">
            {POLICY.map(({ Glyph, label, text }, i) => (
              <div
                key={label}
                className={`flex items-start gap-3 px-4 ${i > 0 ? "border-l border-dashed" : ""}`}
                style={i > 0 ? { borderColor: TINT_BORDER } : undefined}
              >
                <Glyph
                  size={22}
                  strokeWidth={1.5}
                  className="mt-0.5 shrink-0"
                  style={{ color: NAVY }}
                  aria-hidden
                />
                <p className="text-[12px] leading-[1.6]" style={{ color: GRAY }}>
                  <span className="font-bold" style={{ color: HEADING }}>
                    {label}
                  </span>{" "}
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* bottom actions */}
        <div className="mt-8 flex items-center justify-between gap-4 pb-6">
          <button
            type="button"
            className="cursor-pointer text-[13px] font-semibold"
            style={{ color: GRAY }}
          >
            Cancel
          </button>

          <div className="flex items-center gap-3">
            <OutlineButton label="Save draft" icon={LuSave} />
            <OutlineButton label="Preview" icon={LuEye} />
            <PrimaryButton
              label={
                <>
                  Continue <LuArrowRight size={15} />
                </>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}