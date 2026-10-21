import { useState } from "react";
import {
  PiArrowDownBold,
  PiArrowUpBold,
  PiCaretDownBold,
  PiMagnifyingGlassBold,
  PiPlusBold,
} from "react-icons/pi";

/* ---------- Custom icons traced from Figma (24x24 grid) ---------------- */
// Custom icons traced from the Figma design (24x24 grid, colour = currentColor).
// "bg" is the colour of the icon box (#3231DB at 10% on white) used for cut-outs.
const BG = "#ECEBFB";

const base = (size) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
});

const RobotIcon = ({ size = 24 }) => (
  <svg {...base(size)}>
    <path d="M12 2.8v2.6" />
    <circle cx="12" cy="2.6" r="1.1" fill="currentColor" stroke="none" />
    <path
      d="M5.2 9.2c4.2-2.2 9.4-2.2 13.6 0l2.4-1.2-.8 5.2-1.6.6c-.4 3.6-3.3 5.6-7.2 5.6s-6.8-2-7.2-5.6l-1.6-.6L2.8 8z"
      fill="currentColor"
      stroke="none"
    />
    <rect x="7.3" y="10.6" width="9.4" height="3.8" rx="1.9" fill={BG} stroke="none" />
    <circle cx="10" cy="12.5" r="0.8" fill="currentColor" stroke="none" />
    <circle cx="14" cy="12.5" r="0.8" fill="currentColor" stroke="none" />
    <path d="M10.6 16.8h2.8" stroke={BG} strokeWidth="1.1" />
  </svg>
);

const InvestmentIcon = ({ size = 24 }) => (
  <svg {...base(size)} strokeWidth="1.4">
    <circle cx="13.5" cy="5.6" r="2.6" />
    <circle cx="13.5" cy="5.6" r="0.9" />
    <path d="M13.5 8.2v3.6" />
    <path d="M11.2 10.2c1 .1 1.8.6 2.3 1.5M15.8 10.2c-1 .1-1.8.6-2.3 1.5" />
    <path d="M3.2 15.4l3.6-1.6 3.7 4.6-3.6 1.6z" />
    <path d="M9.4 15.3l3.1-.9c1 .2 1.5.5 2.2 1l5.1-3c1-.5 1.9.8 1 1.6l-6.5 5.2c-1 .8-2.4 1-3.6.6l-2.9-1.1" />
  </svg>
);

const ImageIcon = ({ size = 24 }) => (
  <svg {...base(size)} strokeWidth="1.7">
    <rect x="3.5" y="4.5" width="17" height="15" rx="2.2" />
    <circle cx="15.6" cy="9.4" r="1.5" />
    <path d="M3.8 16.8l5.2-5.3 3.6 3.6 2.6-2.4 5 4.8" />
  </svg>
);

const TranslateIcon = ({ size = 24 }) => (
  <svg {...base(size)} strokeWidth="1.5">
    <rect x="3" y="3" width="10" height="10" rx="1.8" />
    <path d="M6 6.4h4.2M8.1 5.2v1.2M6.6 11l3.2-4M6.8 8.2l3 3" />
    <rect x="11.2" y="11.2" width="9.8" height="9.8" rx="1.8" />
    <path d="M14.4 18.2l1.7-4.4 1.7 4.4M15 16.9h2.2" />
    <path d="M15.2 4.6c2.3-.6 4.4.7 4.8 3M19.6 5.2l.4 2.6-2.4-.4" />
    <path d="M8.8 19.2c-2.3.5-4.2-.8-4.7-3M4.4 18.6l-.4-2.6 2.5.5" />
  </svg>
);

const ChatIcon = ({ size = 24 }) => (
  <svg {...base(size)} strokeWidth="1.5">
    <path d="M3.6 16.2a6.9 6.9 0 1 1 2.8 2.3l-3.6 1.1z" />
    <path d="M6.7 11.8l1.4-3.6 1.4 3.6M7.2 10.7h1.8M11.2 8.2v3.6" />
    <path d="M14.4 12.6a5.2 5.2 0 0 1 4.9 7.4l1.1 3.1-3.2-1.2a5.2 5.2 0 0 1-5.1-.4" />
    <path d="M15.6 17.4h3.2" />
  </svg>
);

const AnalyticsIcon = ({ size = 24 }) => (
  <svg {...base(size)} strokeWidth="1.5">
    <circle cx="4.7" cy="19.2" r="1.4" />
    <rect x="8" y="14" width="3" height="6.6" rx="1.5" />
    <rect x="12.4" y="16.6" width="3" height="4" rx="1.5" />
    <rect x="16.8" y="9" width="3" height="11.6" rx="1.5" />
    <path d="M3.8 13.2l5-4.6 3.4 2.6 7.2-6.4M16.6 4.8h3v3" />
  </svg>
);

const VoiceIcon = ({ size = 24 }) => (
  <svg {...base(size)} strokeWidth="1.5">
    <path d="M3.6 10v6.4M6.4 7.2v12M9.2 5v16.2M12 8.4v8.6M14.8 12v4.2" />
    <path
      d="M18.6 2.4c.5 3 1.6 4.1 4.4 4.6-2.8.5-3.9 1.6-4.4 4.6-.5-3-1.6-4.1-4.4-4.6 2.8-.5 3.9-1.6 4.4-4.6z"
      fill="currentColor"
      stroke="none"
    />
  </svg>
);

const AutomationIcon = ({ size = 24 }) => (
  <svg {...base(size)} strokeWidth="1.4">
    <path d="M15.29 9.91 L16.85 10.13 L16.85 13.87 L15.29 14.09 L15.81 12.85 L16.75 14.11 L14.11 16.75 L12.85 15.81 L14.09 15.29 L13.87 16.85 L10.13 16.85 L9.91 15.29 L11.15 15.81 L9.89 16.75 L7.25 14.11 L8.19 12.85 L8.71 14.09 L7.15 13.87 L7.15 10.13 L8.71 9.91 L8.19 11.15 L7.25 9.89 L9.89 7.25 L11.15 8.19 L9.91 8.71 L10.13 7.15 L13.87 7.15 L14.09 8.71 L12.85 8.19 L14.11 7.25 L16.75 9.89 L15.81 11.15z" fill="currentColor" strokeWidth="0.6" />
    <circle cx="12" cy="12" r="1.7" fill={BG} stroke="none" />
    <path d="M20.6 9.6A9 9 0 0 0 5.5 5.6M5.2 3.6l.2 2.4 2.4-.3" />
    <path d="M3.4 14.4a9 9 0 0 0 15.1 4M18.8 20.4l-.2-2.4-2.4.3" />
  </svg>
);

const AssistantStatusIcon = ({ size = 24 }) => (
  <svg {...base(size)} strokeWidth="1.5">
    <path d="M12 3v2.2" />
    <circle cx="12" cy="2.8" r="0.9" fill="currentColor" stroke="none" />
    <path d="M4.6 11c0-2.6 1.8-4.6 4.2-4.6h6.4c2.4 0 4.2 2 4.2 4.6v1.6c0 3.4-3.2 5.6-7.4 5.6s-7.4-2.2-7.4-5.6z" />
    <circle cx="9.2" cy="11.4" r="0.9" fill="currentColor" stroke="none" />
    <circle cx="14.8" cy="11.4" r="0.9" fill="currentColor" stroke="none" />
    <path d="M17.4 13.6l-2.2 3.4h1.9l-1.5 3.4 3.3-4.2h-2z" fill="currentColor" strokeWidth="0.5" />
  </svg>
);

const CoinsIcon = ({ size = 24 }) => (
  <svg {...base(size)} strokeWidth="1.8">
    <ellipse cx="9" cy="5.6" rx="5.4" ry="2.3" />
    <path d="M3.6 5.6v11.2c0 1.3 2.4 2.3 5.4 2.3M3.6 9.4c0 1.3 2.4 2.3 5.4 2.3M3.6 13.1c0 1.3 2.4 2.3 5.4 2.3M14.4 5.6v3.6" />
    <circle cx="16" cy="15.6" r="4" />
  </svg>
);

/* ==========================================================================
   FIGMA TOKENS (measured from the Figma properties panel)
   --------------------------------------------------------------------------
   Text dark ......... #0A0847   (100% title, 80% labels, 60% sub-text)
   Primary / accent .. #001984   (stat values, buttons, toggles)
   Icon colour ....... #3231DB   (icon bg = same colour at 10%)
   Card border ....... #E2DFFC   (section cards, inputs)
   Divider ........... #001984 at 10%
   Section card ...... radius 7.5, border 0.75, padding 28/27/29/27
   ========================================================================== */

/* ---------- Switch ------------------------------------------------------- */
// sm = AI Assistant cards (track 20 x 12), md = Search / Credit rows (track 26 x 15)
const SWITCH_SIZES = {
  sm: { w: 20, h: 12, k: 10, m: 1 },
  md: { w: 26, h: 15, k: 13, m: 1 },
};

function Switch({ checked, onChange, size = "md" }) {
  const { w, h, k, m } = SWITCH_SIZES[size];
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      aria-pressed={checked}
      style={{ width: w, height: h }}
      className={`relative shrink-0 cursor-pointer rounded-full transition-colors ${
        checked ? "bg-[#001984]" : "bg-[#D9DBE9]"
      }`}
    >
      <span
        style={{
          width: k,
          height: k,
          top: m,
          left: checked ? w - k - m : m,
        }}
        className="absolute rounded-full bg-white transition-all"
      />
    </button>
  );
}

/* ---------- Input / Select boxes (109 x 38, radius 8) --------------------- */
const boxCls =
  "h-[38px] rounded-[8px] border border-[#E2DFFC] bg-white px-[12px] text-center text-[12px] font-medium text-[#0A0847]/60 outline-none transition focus:border-[#001984]";

function NumberBox({ value, type = "number" }) {
  return (
    <input
      type={type}
      defaultValue={value}
      className={`${boxCls} w-[109px]`}
    />
  );
}

function CaretBox({ value }) {
  return (
    <div className="relative w-[109px]">
      <input
        type="text"
        defaultValue={value}
        className={`${boxCls} w-full pr-[24px]`}
      />
      <PiCaretDownBold
        size={10}
        className="pointer-events-none absolute right-[12px] top-1/2 -translate-y-1/2 text-[#0A0847]/60"
      />
    </div>
  );
}

function UnitSelect({ options = [], value, width }) {
  return (
    <select
      defaultValue={value}
      style={{ width }}
      className={`${boxCls} cursor-pointer appearance-none`}
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

/* ---------- Section card (Assistant Status / Search / Credit) ------------ */
function SectionCard({ Icon, title, subtitle, children }) {
  return (
    <div className="flex flex-col rounded-[7.5px] border-[0.75px] border-[#E2DFFC] bg-white pb-[29px] pl-[27px] pr-[27px] pt-[28px]">
      <div className="flex items-center gap-[12px]">
        <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[8px] bg-[#3231DB]/10 p-[7px] text-[#3231DB]">
          <Icon size={24} />
        </div>
        <div className="min-w-0">
          <h2 className="text-[16px] font-semibold leading-[19px] text-[#0A0847]">
            {title}
          </h2>
          <p className="mt-[2px] text-[12px] font-medium leading-[15px] text-[#0A0847]/60">
            {subtitle}
          </p>
        </div>
      </div>
      <div className="my-[20px] h-px w-full bg-[#001984]/10" />
      {children}
    </div>
  );
}

/* ==========================================================================
   MOCK DATA
   ========================================================================== */
const STATS = [
  { label: "Success Rate", value: "12,455", pct: "8.5%", tone: "up", Arrow: PiArrowUpBold },
  { label: "Refunded", value: "3.25M", pct: "2.4%", tone: "flat" },
  { label: "Generate Coin", value: "896.62", pct: "4.6%", tone: "down", Arrow: PiArrowDownBold },
  { label: "Interaction", value: "97.6%", pct: "6.4%", tone: "up", Arrow: PiArrowUpBold },
];

const TONE_CLS = {
  up: "text-success",
  down: "text-danger",
  flat: "text-[#001984]",
};

const ASSISTANTS = [
  { label: "AI Assistant", Icon: RobotIcon },
  { label: "Smart Investment", Icon: InvestmentIcon },
  { label: "Image Generation", Icon: ImageIcon },
  { label: "Translation", Icon: TranslateIcon },
  { label: "Chat Support", Icon: ChatIcon },
  { label: "Data Analytics", Icon: AnalyticsIcon },
  { label: "Voice Recognition", Icon: VoiceIcon },
  { label: "Automation", Icon: AutomationIcon },
];

const SEARCH_ROWS = [
  { label: "Enable AI Search", desc: "Allow AI-powered search across the app", type: "toggle" },
  { label: "Daily Website Search Limit", desc: "Set the maximum daily website search per user or IP", type: "number", value: 50 },
  { label: "Minimum Words per Search Query", desc: "Set minimum word requirement", type: "text", value: "2 words" },
  { label: "Maximum Search Suggestions", desc: "Limit search suggestions shown", type: "text", value: "5 List" },
  { label: "Max Settings per Rule", desc: "Limit settings configuration per rule", type: "number", value: 3 },
  { label: "Maximize Limit", desc: "Set the maximum limit allowed", type: "number", value: 50 },
  { label: "AI Visibility (Coming soon in future updates)", desc: "Enable/disable AI visibility at screen", type: "toggle", italic: true },
  { label: "Maximize Limit", desc: "Automatically deactivate inactive rules after (days)", type: "caret", value: 50 },
];

const CREDIT_RULES = [
  {
    label: "Daily Website Search Limit",
    desc: "Set the maximum daily website search per user or IP",
    value: 10,
    unit: "Per Day",
    units: ["Per Day", "Per Week", "Per Month"],
    selectWidth: 135,
  },
  {
    label: "Deduction/Use",
    desc: null,
    value: 1,
    unit: "Per Activity",
    units: ["Per Activity", "Per Day", "Per Session"],
    selectWidth: 148,
  },
];

/* ==========================================================================
   PAGE
   ========================================================================== */
export default function AIOverview() {
  const [assistants, setAssistants] = useState(
    Object.fromEntries(ASSISTANTS.map((a) => [a.label, true])),
  );
  const [searchToggles, setSearchToggles] = useState({
    "Enable AI Search": true,
    "AI Visibility (Coming soon in future updates)": true,
  });
  const [reverseRules, setReverseRules] = useState(true);

  return (
    <div className="ai-theme min-h-screen space-y-[24px] bg-[#F8FAFC] p-6 font-[Inter]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-[15px]">
          <h1 className="text-[22px] font-semibold leading-[27px] text-[#0A0847]">
            AI Overview & Usage Controls
          </h1>
          <p className="text-[16px] font-medium leading-[19px] text-[#0A0847]/60">
            Track AI usage, system health, and performance
          </p>
        </div>
        <button
          type="button"
          className="flex h-[42px] w-[178px] cursor-pointer items-center justify-center gap-[15px] rounded-[8px] bg-[#001984] text-[14px] font-semibold leading-[17px] text-white transition hover:bg-[#00126B]"
        >
          <PiPlusBold size={11} />
          Add New Journey
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-[17px]">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="flex h-[155px] flex-col justify-center gap-[10px] rounded-[8px] border border-[#E2DFFC] bg-white pl-[16px] pr-[29px]"
          >
            <p className="text-[14px] font-semibold leading-[17px] text-[#0A0847]/80">
              {s.label}
            </p>
            <p className="text-[22px] font-semibold leading-[27px] text-[#001984]">
              {s.value}
            </p>
            <div
              className={`flex items-center gap-[3px] text-[10px] font-semibold leading-[12px] ${TONE_CLS[s.tone]}`}
            >
              {s.Arrow ? (
                <s.Arrow size={10} />
              ) : (
                <span className="inline-block h-[4px] w-[4px] rounded-full bg-current" />
              )}
              <span>
                {s.pct}
                <span className="text-[#0A0847]/60"> vs yesterday</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* AI Assistant Status */}
      <SectionCard
        Icon={AssistantStatusIcon}
        title="AI Assistant Status"
        subtitle="Set when and how your verse will be displayed"
      >
        <div className="grid grid-cols-4 gap-[8px]">
          {ASSISTANTS.map(({ label, Icon }) => (
            <div
              key={label}
              className="flex flex-col gap-[10px] rounded-[8px] border border-[#E2DFFC] p-[10px]"
            >
              <div className="flex min-w-0 items-center gap-[8px]">
                <div className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[8px] bg-[#3231DB]/10 text-[#3231DB]">
                  <Icon size={24} />
                </div>
                <p className="truncate text-[14px] font-semibold leading-[17px] text-[#0A0847]/80">
                  {label}
                </p>
              </div>
              <div className="h-px w-full bg-[#001984]/10" />
              <div className="flex h-[21px] items-center justify-between">
                <p className="text-[12px] font-medium leading-[15px] text-[#0A0847]/80">
                  Enable Share
                </p>
                <Switch
                  size="sm"
                  checked={assistants[label]}
                  onChange={(v) => setAssistants((p) => ({ ...p, [label]: v }))}
                />
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Search Engine */}
      <SectionCard
        Icon={PiMagnifyingGlassBold}
        title="Search Engine"
        subtitle="Configure search slots and limit per time"
      >
        <div>
          {SEARCH_ROWS.map((row, i) => (
            <div
              key={`${row.label}-${i}`}
              className={`flex items-center justify-between gap-[16px] border-b border-[#001984]/10 ${
                row.type === "toggle" ? "py-[16px]" : "py-[20px]"
              }`}
            >
              <div className="min-w-0">
                <p className="text-[14px] font-semibold leading-[17px] text-[#0A0847]/80">
                  {row.label}
                </p>
                <p
                  className={`text-[10px] font-medium leading-[12px] text-[#0A0847]/80 ${
                    row.italic ? "italic" : ""
                  }`}
                >
                  {row.desc}
                </p>
              </div>

              <div className="flex shrink-0 items-center">
                {row.type === "toggle" && (
                  <Switch
                    checked={searchToggles[row.label]}
                    onChange={(v) =>
                      setSearchToggles((p) => ({ ...p, [row.label]: v }))
                    }
                  />
                )}
                {row.type === "number" && <NumberBox value={row.value} />}
                {row.type === "text" && (
                  <NumberBox type="text" value={row.value} />
                )}
                {row.type === "caret" && <CaretBox value={row.value} />}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-[20px] flex justify-end">
          <button
            type="button"
            className="h-[42px] w-[178px] cursor-pointer rounded-[8px] bg-[#001984] px-[16px] text-[14px] font-semibold leading-[17px] text-white transition hover:bg-[#00126B]"
          >
            Save Changes
          </button>
        </div>
      </SectionCard>

      {/* Credit Rules */}
      <SectionCard
        Icon={CoinsIcon}
        title="Credit Rules"
        subtitle="Define credit consumption and generation rules"
      >
        <div className="flex flex-col gap-[20px]">
          {CREDIT_RULES.map((row) => (
            <div
              key={row.label}
              className="flex h-[80px] w-full items-center justify-between gap-[16px] rounded-[7.5px] border border-[#001984]/10 bg-white p-[20px]"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-[14px] font-semibold leading-[17px] text-[#0A0847]/80">
                  {row.label}
                </p>
                <p className="min-h-[12px] text-[10px] font-medium leading-[12px] text-[#0A0847]/60">
                  {row.desc}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-[16px]">
                <NumberBox value={row.value} />
                <UnitSelect
                  options={row.units}
                  value={row.unit}
                  width={row.selectWidth}
                />
              </div>
            </div>
          ))}

        {/* Reverse Rules */}
<div className="flex items-center justify-between gap-[16px] border-b border-[#001984]/10 py-[16px]">
  <div className="min-w-0 flex-1">
    <p className="truncate text-[14px] font-semibold leading-[17px] text-[#0A0847]/80">
      Reverse Rules
    </p>
    <p className="text-[10px] font-medium leading-[12px] text-[#0A0847]/60">
      If the fetched result is not as per Search deduct credit
    </p>
  </div>
  <Switch checked={reverseRules} onChange={setReverseRules} />
</div>
        </div>
      </SectionCard>
    </div>
  );
}