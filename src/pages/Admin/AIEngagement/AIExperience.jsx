import { useState } from "react";
import {
  PiCaretRight,
  PiPencilSimple,
  PiPlus,
  PiShieldWarning,
  PiSlidersHorizontal,
  PiTrash,
  PiWarningOctagon,
} from "react-icons/pi";

/* ==========================================================================
   SHARED STYLES
   ========================================================================== */
const thCls =
  "whitespace-nowrap border-b border-[color:var(--line)] bg-[#F3F4FB] px-[20px] py-[16px] text-left align-middle text-[14px] font-medium text-[color:var(--text-80)]";
const tdCls =
  "h-[62px] border-b-[0.75px] border-[#E9E9E9] px-[20px] py-[16px] align-middle text-[12px] font-medium text-[color:var(--text-80)]";

function StatusPill({ children }) {
  return (
    <span className="inline-flex h-[25px] items-center justify-center gap-[10px] rounded-[8px] border border-[color:var(--success-bd)] bg-[color:var(--success-bg)] px-[12px] py-[4px] text-[12px] font-medium text-[color:var(--success-fg)]">
      {children}
    </span>
  );
}

function RowActions() {
  return (
    <div className="flex items-center justify-end gap-[14px]">
      <button
        type="button"
        aria-label="Edit"
        className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[3px] border-[0.75px] border-[color:var(--border-soft)] bg-white transition hover:bg-[color:var(--hover-soft)]"
      >
        <PiPencilSimple size={16} className="text-[color:var(--text)]" />
      </button>
      <button
        type="button"
        aria-label="Delete"
        className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[3px] border-[0.75px] border-[color:var(--border-soft)] bg-white transition hover:bg-[color:var(--hover-soft)]"
      >
        <PiTrash size={16} className="text-[color:var(--danger)]" />
      </button>
    </div>
  );
}

function SelectedRadio({ selected }) {
  return (
    <span
      className={`flex h-[15.2px] w-[15.2px] items-center justify-center rounded-full border ${
        selected
          ? "border-[#001984] bg-white"
          : "border-[#001984]"
      }`}
    >
      {selected && (
        <span className="h-[6.4px] w-[6.4px] rounded-full bg-[color:var(--navy)]" />
      )}
    </span>
  );
}

function OutlineButton({ children, className = "", gap = 9 }) {
  return (
    <button
      type="button"
      style={{ gap: `${gap}px` }}
      className={`flex h-[42px] shrink-0 cursor-pointer items-center justify-center whitespace-nowrap rounded-[8px] border border-[color:var(--border-soft)] bg-[color:var(--card-bg)] px-[18px] text-[14px] font-semibold text-[color:var(--text)] transition hover:bg-[color:var(--hover-soft)] ${className}`}
    >
      <PiPlus size={16} />
      {children}
    </button>
  );
}

function SectionCard({ title, subtitle, action, className = "", style, gap = 24, children }) {
  return (
    <section
      style={{ ...style, gap: `${gap}px` }}
      className={`flex flex-col rounded-[7.5px] border-[0.75px] border-[color:var(--border-soft)] bg-[color:var(--card-bg)] ${className}`}
    >
      <div className={`flex ${action ? "items-center justify-between gap-[16px]" : ""}`}>
        <div className="flex h-[40px] flex-col gap-[4px]">
          <h2 className="text-[16px] font-semibold text-[color:var(--text)]">
            {title}
          </h2>
          <p className="text-[12px] font-normal leading-[19px] text-[color:var(--text-60)]">
            {subtitle}
          </p>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

/* ==========================================================================
   MOCK DATA
   ========================================================================== */
const VERSIONS = [
  { name: "New International Version", abbr: "NIV", status: "Enabled", selected: true },
  { name: "King James Version", abbr: "KJV", status: "Enabled", selected: false },
  { name: "English Standard Version", abbr: "ESV", status: "Enabled", selected: false },
  { name: "New Living Translation", abbr: "NLT", status: "Enabled", selected: false },
  { name: "New American Standard Bible", abbr: "NASB", status: "Active", selected: false },
  { name: "Amplified Bible", abbr: "AMP", status: "Active", selected: false },
  { name: "Christian Standard Bible", abbr: "CSB", status: "Active", selected: false },
];

const STYLES = [
  { name: "Encouraging", desc: "Warm, uplifting, and supportive responses" },
  { name: "Balanced", desc: "Neutral and informative with care" },
  { name: "Detailed", desc: "In-depth, comprehensive explanations" },
  { name: "Concise", desc: "Short, to-the-point and easy to understand" },
];

const PROMPTS = [
  "Explain John 3:16",
  "What does it mean to have faith?",
  "Write a prayer for healing",
  "What is the meaning of Psalm 23?",
  "Help me grow closer to God.",
];

const MODERATION = [
  {
    title: "Blocked Words / Topics",
    desc: "Manage blocked words and topics",
    Icon: PiShieldWarning,
  },
  {
    title: "Sensitive Topics",
    desc: "Configure sensitive topic handling",
    Icon: PiWarningOctagon,
  },
  {
    title: "Moderation Rules",
    desc: "Set rules and auto-moderation actions",
    Icon: PiSlidersHorizontal,
  },
  {
    title: "Moderation Rules",
    desc: "Set rules and auto-moderation actions",
    Icon: PiSlidersHorizontal,
  },
];

/* Save icon traced to match the Figma floppy (rounded body, top shutter, bottom label) */
const SaveIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 3h11l5 5v10a3 3 0 0 1-3 3H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
    <path d="M8 3v5h7V3" />
    <rect x="7" y="13" width="10" height="8" fill="currentColor" stroke="none" />
  </svg>
);

/* ==========================================================================
   PAGE
   ========================================================================== */
export default function AIExperience() {
  const [selectedVersion, setSelectedVersion] = useState("New International Version");

  return (
    <div className="aie-theme min-h-screen space-y-[16px] bg-[#F8FAFC] p-6 font-[Inter] leading-[100%]">
      {/* Header */}
      <div className="mx-auto w-[1072px] max-w-full">
        <h1 className="text-[22px] font-semibold text-[color:var(--text)]">
          AI Experience Setup
        </h1>
        <p className="mt-[8px] text-[16px] font-medium text-[color:var(--text-60)]">
          Configure how AI behaves and what users experience.
        </p>
      </div>

      {/* Card 1: Bible Version Management */}
      <SectionCard
        title="Bible Version Management"
        subtitle="Manage available Bible versions for AI responses."
        className="mx-auto w-[1072px] max-w-full"
        style={{ padding: "25px 33px 36px" }}
        action={
          <OutlineButton className="w-[178px]" gap={10}>
            Add Version
          </OutlineButton>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr>
                <th className={thCls}>Bible Version</th>
                <th className={thCls}>Abbreviation</th>
                <th className={thCls}>Status</th>
                <th className={thCls}>Default</th>
                <th className={`${thCls} text-right`}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {VERSIONS.map((v) => (
                <tr key={v.abbr}>
                  <td className={tdCls}>{v.name}</td>
                  <td className={tdCls}>{v.abbr}</td>
                  <td className={tdCls}>
                    <StatusPill>{v.status}</StatusPill>
                  </td>
                  <td className={tdCls}>
                    <button
                      type="button"
                      aria-label={`Set ${v.name} as default`}
                      onClick={() => setSelectedVersion(v.name)}
                      className="cursor-pointer"
                    >
                      <SelectedRadio selected={selectedVersion === v.name} />
                    </button>
                  </td>
                  <td className={`${tdCls} text-right`}>
                    <RowActions />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {/* Card 2: Response Style Management */}
      <SectionCard
        title="Response Style Management"
        subtitle="Manage the style and tone of AI responses."
        className="mx-auto w-[1072px] max-w-full"
        style={{ padding: "25px 33px 36px" }}
      >
        <div className="flex flex-col gap-[20px]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] border-collapse text-left">
              <thead>
                <tr>
                  <th className={thCls}>Style</th>
                  <th className={thCls}>Description</th>
                  <th className={thCls}>Status</th>
                  <th className={`${thCls} text-right`}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {STYLES.map((s) => (
                  <tr key={s.name}>
                    <td className={tdCls}>{s.name}</td>
                    <td className="h-[62px] border-b-[0.75px] border-[#E9E9E9] px-[20px] py-[16px] align-middle text-[12px] font-normal text-[color:var(--text-60)]">
                      {s.desc}
                    </td>
                    <td className={tdCls}>
                      <StatusPill>Enabled</StatusPill>
                    </td>
                    <td className={`${tdCls} text-right`}>
                      <RowActions />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <OutlineButton className="w-[141px]">Add New</OutlineButton>
          </div>
        </div>
      </SectionCard>

      {/* Two column row */}
      <div className="mx-auto flex w-full flex-col gap-[24px] xl:w-[1066px] xl:max-w-full xl:flex-row xl:items-stretch">
        {/* Left: Homepage Prompt Suggestions */}
        <SectionCard
          title="Bible Version Management"
          subtitle="Manage available Bible versions for AI responses."
          className="w-full xl:w-[521px]"
          style={{ padding: "20px" }}
          gap={10}
        >
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr>
                  <th className={thCls}>Homepage Prompt Suggestions</th>
                  <th className={`${thCls} text-right`}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {PROMPTS.map((prompt, i) => (
                  <tr key={prompt}>
                    <td className={tdCls}>
                      {i + 1}. {prompt}
                    </td>
                    <td className={`${tdCls} text-right`}>
                      <RowActions />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <OutlineButton className="w-[141px]">Add Prompt</OutlineButton>
          </div>
        </SectionCard>

        {/* Right: Content Moderation / Blocking */}
        <SectionCard
          title="Content Moderation / Blocking"
          subtitle="Restrict or warn users against certain content."
          className="w-full xl:w-[521px]"
          style={{ padding: "20px" }}
          gap={10}
        >
          <div className="flex flex-col gap-[12px]">
            {MODERATION.map((m, i) => (
              <button
                key={i}
                type="button"
                className="flex h-[77px] w-full cursor-pointer items-center justify-between gap-[12px] rounded-[7.5px] border-[0.75px] border-[color:var(--border-soft)] bg-white px-[10px] text-left transition hover:bg-[color:var(--hover-soft)]"
              >
                <span className="flex min-w-0 items-center gap-[12px]">
                  <span className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-[8px] bg-[color:var(--icon-bg)] text-[color:var(--icon)]">
                    <m.Icon size={17} />
                  </span>
                  <span className="flex h-[32px] min-w-0 flex-col justify-center gap-[2px]">
                    <span className="text-[14px] font-semibold text-[color:var(--text)]">
                      {m.title}
                    </span>
                    <span className="text-[12px] font-normal leading-[19px] text-[color:var(--text-60)]">
                      {m.desc}
                    </span>
                  </span>
                </span>
                <PiCaretRight size={15} className="shrink-0 text-[color:var(--text-60)]" />
              </button>
            ))}
          </div>

          <div>
            <OutlineButton className="w-[141px]">Add New</OutlineButton>
          </div>
        </SectionCard>
      </div>

      {/* Bottom: Save All Changes */}
      <div className="mx-auto flex w-[1072px] max-w-full justify-end">
        <button
          type="button"
          className="flex h-[42px] cursor-pointer items-center justify-center gap-[8px] rounded-[8px] bg-[color:var(--navy)] px-[20px] text-[14px] font-semibold text-white transition hover:bg-[#0a1c68]"
        >
          <SaveIcon size={16} />
          Save All Changes
        </button>
      </div>
    </div>
  );
}