import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  LuEye,
  LuPlus,
  LuCalendar,
  LuChevronRight,
  LuCheck,
  LuHistory,
  LuBold,
  LuItalic,
  LuUnderline,
  LuList,
  LuListOrdered,
  LuAlignLeft,
  LuAlignCenter,
  LuAlignRight,
  LuIndentIncrease,
  LuTable,
  LuLink,
  LuUnlink,
  LuCode,
  LuEraser,
  LuImage,
  LuMaximize2,
  LuPaintBucket,
} from "react-icons/lu";

/* ==========================================================================
   STATIC CONTENT
   ========================================================================== */
const DOCUMENT_TYPES = [
  "Terms of Use",
  "Privacy Policy",
  "Community Guidelines",
  "Cookie Policy",
];

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    body: "By downloading, accessing, or using BriteOak, you agree to be bound by these Terms of Use. If you do not agree, please do not use the app.",
  },
  {
    title: "2. Using the App",
    body: "BriteOak is provided for your personal, non-commercial use. You agree not to misuse the app or interfere with its proper functioning.",
  },
  {
    title: "3. Accounts and Responsibilities",
    body: "You are responsible for maintaining the confidentiality of your account and for all activity that occurs under your account.",
  },
  {
    title: "4. Subscriptions and Payments",
    body: "Some features require a paid subscription. Payments are billed in advance and are non-refundable except as required by law.",
  },
];

const DOC_DEFAULTS = {
  "1": { type: "Terms of Use", title: "Terms of Use", version: "v2.5", date: "Aug 01, 2026" },
  "2": { type: "Privacy Policy", title: "Privacy Policy", version: "v4.1", date: "Jul 19, 2026" },
  "3": { type: "Community Guidelines", title: "Community Guidelines", version: "v1.0", date: "Aug 07, 2026" },
  "4": { type: "Cookie Policy", title: "Cookie Policy", version: "v2.0", date: "Aug 20, 2026" },
};

const FONT_FAMILIES = ["Inter", "Poppins", "Georgia", "Arial"];
const FONT_SIZES = ["14", "16", "18", "20", "24", "32"];


/* ==========================================================================
   ICONS 
   ========================================================================== */
function SaveIcon({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 3h11l4 4v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
      <path d="M7 3v4.5h8V3" />
      <rect x="6.5" y="13" width="11" height="8" fill="currentColor" />
    </svg>
  );
}

function InfoDot() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#001984"
      strokeLinecap="round"
      className="shrink-0 cursor-help"
      aria-label="More info"
    >
      <title>More info</title>
      <circle cx="12" cy="12" r="10.2" strokeWidth="1.6" />
      <path d="M12 6.8V13" strokeWidth="2.2" />
      <circle cx="12" cy="16.8" r="1.2" fill="#001984" stroke="none" />
    </svg>
  );
}

function Caret() {
  return (
    <svg width="7" height="5" viewBox="0 0 7 5" className="shrink-0" aria-hidden>
      <path d="M0 0h7L3.5 5z" fill="#646464" />
    </svg>
  );
}

/* ==========================================================================
   FORM PRIMITIVES
   ========================================================================== */
function FieldLabel({ children, htmlFor }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-[10px] block text-[12px] font-semibold leading-[15px] text-[#0A0847]/80"
    >
      {children}
    </label>
  );
}

const inputBase =
  "h-[45px] w-full rounded-[7.47px] border border-[#E2DFFC] bg-white text-[12px] font-medium leading-none text-[#0A0847]/80 outline-none transition-colors placeholder:text-[#0A0847]/60 focus:border-[#001984]";

function TextInput({ className = "", ...props }) {
  return <input className={`${inputBase} px-[12px] ${className}`} {...props} />;
}

function IconInput({ icon: Icon, ...props }) {
  return (
    <div className="relative">
      <Icon
        size={24}
        strokeWidth={1.5}
        className="pointer-events-none absolute left-[12px] top-1/2 -translate-y-1/2 text-[#0A0847]/70"
      />
      <input className={`${inputBase} pl-[46px] pr-[12px]`} {...props} />
    </div>
  );
}

function SelectField({ value, onChange, options }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputBase} cursor-pointer appearance-none py-[10px] pl-[12px] pr-[50px]`}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <LuChevronRight
        size={14}
        strokeWidth={3}
        className="pointer-events-none absolute right-[17px] top-1/2 -translate-y-1/2 text-[#0A0847]/70"
      />
    </div>
  );
}

function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-[15px] w-[26px] shrink-0 cursor-pointer rounded-full transition-colors ${
        checked ? "bg-[#0B5ED7]" : "bg-[#D1D5DB]"
      }`}
    >
      <span
        className={`absolute top-[2px] h-[11px] w-[11px] rounded-full bg-white transition-all ${
          checked ? "left-[13px]" : "left-[2px]"
        }`}
      />
    </button>
  );
}

function SegmentedControl({ options, value, onChange }) {
  return (
    <div className="flex h-[44px] w-full overflow-hidden rounded-[7.47px] border border-[#E2DFFC] bg-white">
      {options.map((option, index) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={`flex-1 cursor-pointer text-[12px] font-medium leading-none text-[#0A0847]/80 transition-colors ${
            index > 0 ? "border-l border-[#E2DFFC]" : ""
          } ${value === option ? "bg-[#E8E7F6]" : "bg-white hover:bg-[#F3F4FB]"}`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

function Checkbox({ checked, onChange, label }) {
  return (
    <label className="inline-flex w-fit cursor-pointer items-center gap-[8px]">
      <span className="relative inline-flex h-[16px] w-[16px]">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer h-[16px] w-[16px] cursor-pointer appearance-none rounded-[3px] border border-[#001984] bg-white transition-colors checked:bg-[#001984]"
        />
        <LuCheck
          size={11}
          strokeWidth={3.5}
          className="pointer-events-none absolute left-[2.5px] top-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100"
        />
      </span>
      <span className="text-[12px] font-medium leading-[15px] text-[#0A0847]/80">
        {label}
      </span>
    </label>
  );
}

/* ==========================================================================
   RICH TEXT TOOLBAR 
   ========================================================================== */
function ToolSelect({ value, onChange, options, className = "" }) {
  return (
    <div className={`relative shrink-0 ${className}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-[27px] w-full cursor-pointer appearance-none rounded-[3.25px] border-[1.63px] border-[#CCCCCC] bg-white pl-[8px] pr-[26px] text-[12px] font-medium leading-none text-[#0A0847]/80 outline-none transition-colors hover:bg-[#F7F7FB]"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {/* divider + caret, like the Figma select */}
      <span className="pointer-events-none absolute bottom-[2px] right-[22px] top-[2px] w-px bg-[#CCCCCC]" />
      <span className="pointer-events-none absolute right-[8px] top-1/2 -translate-y-1/2">
        <Caret />
      </span>
    </div>
  );
}

/* A joined group of buttons: 27px high, 1px #CCC border, radius 3.25, grey bg */
function ToolGroup({ children, width = "w-[88px]" }) {
  return (
    <div
      className={`inline-flex h-[27px] shrink-0 items-stretch divide-x divide-[#CCCCCC] overflow-hidden rounded-[3.25px] border border-[#CCCCCC] bg-[#EFEFEF] ${width}`}
    >
      {children}
    </div>
  );
}

function ToolBtn({ title, children }) {
  return (
    <button
      type="button"
      title={title}
      className="flex flex-1 cursor-pointer items-center justify-center gap-[3px] text-[#444444] transition-colors hover:bg-[#E3E3EA]"
    >
      {children}
    </button>
  );
}

function Toolbar() {
  const [family, setFamily] = useState("Inter");
  const [size, setSize] = useState("20");

  return (
    <div className="flex shrink-0 flex-col gap-[9px] overflow-x-auto">
      {/* Row 1 */}
      <div className="flex items-center gap-[13px]">
        <ToolSelect
          value={family}
          onChange={setFamily}
          options={FONT_FAMILIES}
          className="w-[188px]"
        />
        <ToolSelect
          value={size}
          onChange={setSize}
          options={FONT_SIZES}
          className="w-[88px]"
        />
        <ToolGroup>
          <ToolBtn title="Bulleted list">
            <LuList size={14} />
          </ToolBtn>
          <ToolBtn title="Numbered list">
            <LuListOrdered size={14} />
          </ToolBtn>
        </ToolGroup>
        <ToolGroup>
          <ToolBtn title="Text highlight">
            <span className="flex flex-col items-center leading-none">
              <LuPaintBucket size={13} />
              <span className="mt-[1px] h-[3px] w-[13px] bg-[#FFEB00]" />
            </span>
            <Caret />
          </ToolBtn>
          <ToolBtn title="Text color">
            <span className="flex flex-col items-center leading-none">
              <span className="text-[13px] font-bold text-[#333333]">A</span>
              <span className="mt-[1px] h-[3px] w-[12px] bg-[#E00000]" />
            </span>
            <Caret />
          </ToolBtn>
        </ToolGroup>
        <ToolGroup>
          <ToolBtn title="Align left">
            <LuAlignLeft size={12} />
          </ToolBtn>
          <ToolBtn title="Align center">
            <LuAlignCenter size={12} />
          </ToolBtn>
          <ToolBtn title="Align right">
            <LuAlignRight size={12} />
          </ToolBtn>
          <ToolBtn title="Indent">
            <LuIndentIncrease size={12} className="text-[#1D6FD6]" />
          </ToolBtn>
        </ToolGroup>
      </div>

      {/* Row 2 : starts under the size dropdown (188 + 13 = 201px) */}
      <div className="flex items-center gap-[13px] pl-[201px]">
        <ToolGroup>
          <ToolBtn title="Bold">
            <LuBold size={13} strokeWidth={3} />
          </ToolBtn>
          <ToolBtn title="Italic">
            <LuItalic size={13} />
          </ToolBtn>
          <ToolBtn title="Underline">
            <LuUnderline size={13} />
            <Caret />
          </ToolBtn>
        </ToolGroup>
        <ToolGroup width="w-[88px]">
          <ToolBtn title="Insert table">
            <LuTable size={14} />
            <Caret />
          </ToolBtn>
        </ToolGroup>
        <ToolGroup width="w-[64px]">
          <ToolBtn title="Insert link">
            <LuLink size={12} />
          </ToolBtn>
          <ToolBtn title="Remove link">
            <LuUnlink size={12} />
          </ToolBtn>
          <ToolBtn title="Code">
            <LuCode size={12} />
          </ToolBtn>
          <ToolBtn title="Clear formatting">
            <LuEraser size={12} />
          </ToolBtn>
        </ToolGroup>
        <ToolGroup width="w-[40px]">
          <ToolBtn title="Insert image">
            <LuImage size={12} />
          </ToolBtn>
          <ToolBtn title="Fullscreen">
            <LuMaximize2 size={12} />
          </ToolBtn>
        </ToolGroup>
      </div>
    </div>
  );
}

/* ==========================================================================
   MAIN PAGE
   ========================================================================== */
export default function EditLegalDocument() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const doc = DOC_DEFAULTS[searchParams.get("id")] || DOC_DEFAULTS["1"];

  const [docType, setDocType] = useState(doc.type);
  const [title, setTitle] = useState(doc.title);
  const [version, setVersion] = useState(doc.version);
  const [effectiveDate, setEffectiveDate] = useState(doc.date);
  const [status, setStatus] = useState("Draft");
  const [requireAcceptance, setRequireAcceptance] = useState(true);
  const [showNotice, setShowNotice] = useState(true);
  const [appliesTo, setAppliesTo] = useState({ mobile: true, web: true });
  const [summary, setSummary] = useState(
    "Updated effective date and clarified clauses for subscription billing and user responsibilities.",
  );

  const goBack = () => navigate("/admin/terms-privacy");

  const headerBtn =
    "flex h-[42px] cursor-pointer items-center gap-[10px] rounded-[8px] border border-[#E2DFFC] bg-white px-[13px] text-[14px] font-semibold leading-none text-[#0A0847]/80 transition-colors hover:bg-[#F3F4FB]";

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 font-[Inter] leading-[100%]">
      {/* ------------------------------ Header ------------------------------ */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex flex-wrap items-center gap-5">
          <h1 className="text-[22px] font-semibold leading-[27px] text-[#0A0847]">
            Edit Legal Document
          </h1>
          <span className="rounded-[4px] bg-[#EEEEF3] px-[8px] py-[5px] text-[12px] font-medium leading-[15px] text-[#0A0847]/60">
            {status}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-[12px]">
          <button type="button" className={headerBtn}>
            <span className="text-[#001984]">
              <SaveIcon size={16} />
            </span>
            Save draft
          </button>
          <button type="button" className={headerBtn}>
            <LuEye size={18} className="text-[#001984]" />
            Preview
          </button>
          <button
            type="button"
            className="flex h-[42px] w-[178px] cursor-pointer items-center justify-center gap-[10px] rounded-[8px] bg-[#001984] px-4 text-[14px] font-semibold leading-none text-white transition-colors hover:bg-[#001266]"
          >
            <LuPlus size={20} strokeWidth={1.8} />
            Publish Update
          </button>
        </div>
      </div>

      {/* ------------------------- Two column layout ------------------------ */}
      <div className="mt-6 grid grid-cols-1 items-stretch gap-[29px] lg:grid-cols-[663fr_379fr]">
        {/* ---------- LEFT CARD ---------- */}
        <div className="flex min-h-[671px] flex-col gap-5 rounded-[7.5px] border-[0.75px] border-[#E2DFFC] bg-white px-[20px] py-[23px]">
          <div>
            <FieldLabel htmlFor="doc-type">Document type</FieldLabel>
            <div id="doc-type">
              <SelectField
                value={docType}
                onChange={setDocType}
                options={DOCUMENT_TYPES}
              />
            </div>
          </div>

          <div>
            <FieldLabel htmlFor="doc-title">Document title</FieldLabel>
            <TextInput
              id="doc-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter document title"
            />
          </div>

          <div>
            <FieldLabel>Document content</FieldLabel>
            <div className="flex h-[397px] flex-col gap-4 overflow-hidden rounded-[7.47px] border border-[#E2DFFC] bg-white px-3 py-[10px]">
              <Toolbar />
              <div className="min-h-0 flex-1 overflow-auto pr-[38px]">
                <div className="flex flex-col gap-3">
                  {SECTIONS.map((section) => (
                    <div key={section.title}>
                      <h3 className="text-[14px] font-medium leading-[17px] text-[#0A0847]">
                        {section.title}
                      </h3>
                      <p className="mt-[6px] text-[12px] font-medium leading-[15px] text-[#0A0847]/70">
                        {section.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- RIGHT CARD ---------- */}
        
        <div className="flex flex-col gap-5 rounded-[7.5px] border-[0.75px] border-[#E2DFFC] bg-white px-[12px] pb-[22px] pt-[23px]">
          <div className="pr-[10px]">
            <FieldLabel htmlFor="doc-version">Version</FieldLabel>
            <TextInput
              id="doc-version"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              placeholder="e.g. v1.0"
            />
          </div>

          <div className="pr-[10px]">
            <FieldLabel htmlFor="doc-date">Effective date</FieldLabel>
            <IconInput
              id="doc-date"
              icon={LuCalendar}
              value={effectiveDate}
              onChange={(e) => setEffectiveDate(e.target.value)}
              placeholder="Select a date"
            />
          </div>

          <div className="pr-[10px]">
            <FieldLabel>Status</FieldLabel>
            <SegmentedControl
              options={["Draft", "Published"]}
              value={status}
              onChange={setStatus}
            />
          </div>

          <div className="flex h-[24px] items-center justify-between gap-3 pr-[10px]">
            <span className="flex items-center gap-[10px] text-[12px] font-semibold leading-[15px] text-[#0A0847]/80">
              Require user acceptance again
              <InfoDot />
            </span>
            <Toggle
              checked={requireAcceptance}
              onChange={setRequireAcceptance}
              label="Require user acceptance again"
            />
          </div>

          <div className="flex h-[24px] items-center justify-between gap-3 pr-[10px]">
            <span className="flex items-center gap-[10px] text-[12px] font-semibold leading-[15px] text-[#0A0847]/80">
              Show update notice
              <InfoDot />
            </span>
            <Toggle
              checked={showNotice}
              onChange={setShowNotice}
              label="Show update notice"
            />
          </div>

          <div>
            <p className="text-[14px] font-semibold leading-[17px] text-[#0A0847]">
              Applies to
            </p>
            <div className="mt-[9px] flex flex-col gap-[10px]">
              <Checkbox
                label="Mobile app"
                checked={appliesTo.mobile}
                onChange={(v) => setAppliesTo((p) => ({ ...p, mobile: v }))}
              />
              <Checkbox
                label="Web app"
                checked={appliesTo.web}
                onChange={(v) => setAppliesTo((p) => ({ ...p, web: v }))}
              />
            </div>
          </div>

          <div className="mt-5">
            <FieldLabel htmlFor="doc-summary">Summary of changes</FieldLabel>
            <textarea
              id="doc-summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Describe what changed in this version"
              className="h-[79px] w-full resize-none rounded-[7.47px] border border-[#E2DFFC] bg-white py-[10px] pl-[12px] pr-[50px] text-[12px] font-medium leading-[15px] text-[#0A0847]/80 outline-none transition-colors placeholder:text-[#0A0847]/60 focus:border-[#001984]"
            />
          </div>

          <button
            type="button"
            className="inline-flex w-fit cursor-pointer items-center gap-[8px] text-[12px] font-medium leading-[15px] text-[#0A0847]/60 transition-colors hover:text-[#001984]"
          >
            <LuHistory size={20} className="text-[#001984]" />
            Revision history
          </button>
        </div>
      </div>

      {/* ------------------------------ Footer ------------------------------ */}
      <div className="mt-8 flex flex-col items-stretch justify-between gap-3 sm:flex-row sm:items-center sm:px-3">
        <button
          type="button"
          onClick={goBack}
          className="h-[42px] w-full cursor-pointer rounded-[8px] border border-[#E2DFFC] bg-white px-4 text-[14px] font-semibold leading-none text-[#0A0847]/80 transition-colors hover:bg-[#F3F4FB] sm:w-[197px]"
        >
          Back
        </button>

        <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-8">
          <button
            type="button"
            className="flex h-[42px] w-full cursor-pointer items-center justify-center gap-[10px] rounded-[8px] border border-[#001984] bg-white px-4 text-[14px] font-semibold leading-none text-[#001984] transition-colors hover:bg-[#F3F4FB] sm:w-[212px]"
          >
            <SaveIcon size={16} />
            Save draft
          </button>
          <button
            type="button"
            className="h-[42px] w-full cursor-pointer rounded-[8px] bg-[#001984] px-4 text-[14px] font-semibold leading-none text-white transition-colors hover:bg-[#001266] sm:w-[317px]"
          >
            Publish Updates
          </button>
        </div>
      </div>
    </div>
  );
}