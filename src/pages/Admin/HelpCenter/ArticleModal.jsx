import { useEffect, useRef, useState } from "react";
import {
  LuCircleX,
  LuChevronDown,
  LuBold,
  LuItalic,
  LuUnderline,
  LuLink,
  LuAlignLeft,
} from "react-icons/lu";

const MAX_SUMMARY = 160;

const TITLE_OPTIONS = [
  "Manage My Subscription",
  "Managing Your Subscription",
  "Payment Method",
  "Gift Code Redemption",
  "Set Reading Plan Goals",
  "Reset Password",
];

const CATEGORY_OPTIONS = [
  "Subscription & Billing",
  "Gift Codes",
  "Account Settings",
  "Bible Content",
  "Donations",
  "Notifications",
  "Security",
  "Privacy Tips",
];

const SUMMARY_BODY =
  "You can view, change, or cancel your subscription at any time.";

const SUMMARY_STEPS = [
  "Go to Profile > My Subscription.",
  "View your current plan and next billing date.",
  "Tap Change Plan to upgrade or downgrade.",
];

const DEFAULT_CHIPS = ["Update Payment Method", "Cancel Subscription"];

/* ==========================================================================
   FIELD PRIMITIVES
   ========================================================================== */
function Label({ children, htmlFor }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-[12px] font-semibold text-[#0A0847]/80"
    >
      {children}
    </label>
  );
}

function SelectField({ id, value, onChange, options, placeholder }) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-[45px] w-full cursor-pointer appearance-none rounded-lg border border-[#E2DFFC] bg-card pl-3 pr-8 text-[13px] text-body outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-edge"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <LuChevronDown
        size={14}
        strokeWidth={2.5}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-select-chevron"
      />
    </div>
  );
}

/* ==========================================================================
   RICH TEXT TOOLBAR — one joined button group
   ========================================================================== */
function Toolbar() {
  const base =
    "flex h-[23px] items-center justify-center gap-0.5 bg-toolbar px-1.5 text-toolbar-icon transition-colors hover:bg-toolbar-hover";

  return (
    <div className="border-b border-edge px-3 py-2.5">
      <div className="inline-flex overflow-hidden rounded border border-toolbar-edge">
        <button type="button" title="Bold" className={`${base} w-8`}>
          <LuBold size={14} />
        </button>
        <button
          type="button"
          title="Italic"
          className={`${base} w-8 border-l border-toolbar-edge`}
        >
          <LuItalic size={14} />
        </button>
        <button
          type="button"
          title="Underline"
          className={`${base} border-l border-toolbar-edge`}
        >
          <LuUnderline size={14} />
          <LuChevronDown size={10} strokeWidth={2.5} />
        </button>
        <button
          type="button"
          title="Insert link"
          className={`${base} w-8 border-l border-toolbar-edge`}
        >
          <LuLink size={14} />
        </button>
        <button
          type="button"
          title="Align"
          className={`${base} w-8 border-l border-toolbar-edge`}
        >
          <LuAlignLeft size={14} />
        </button>
      </div>
    </div>
  );
}

/* ==========================================================================
   PUBLISHED TOGGLE — 36x20
   ========================================================================== */
function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-[17px] w-[29px] shrink-0 cursor-pointer rounded-full transition-colors ${
        checked ? "bg-toggle-on" : "bg-toggle-off"
      }`}
    >
      <span
        className={`absolute top-[2px] h-[13px] w-[13px] rounded-full bg-card transition-all ${
          checked ? "left-[14px]" : "left-[2px]"
        }`}
      />
    </button>
  );
}

/* ==========================================================================
   CREATE / EDIT ARTICLE — centered modal dialog
   ========================================================================== */
export default function ArticleModal({ mode, article, onClose }) {
  const isCreate = mode === "create";
  const dialogRef = useRef(null);

  const [title, setTitle] = useState(isCreate ? "" : (article?.title ?? ""));
  const [category, setCategory] = useState(
    isCreate ? "" : (article?.category ?? ""),
  );
  const [summary, setSummary] = useState(
    isCreate
      ? ""
      : "Manage your subscription, payments, and billing information.",
  );
  const [chips, setChips] = useState([...DEFAULT_CHIPS]);
  const [published, setPublished] = useState(!isCreate);

  /* focus trap + focus returns to the trigger that opened the modal */
  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const node = dialogRef.current;

    const focusables = () =>
      Array.from(
        node?.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );

    focusables()[0]?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const list = focusables();
      if (list.length === 0) return;
      const first = list[0];
      const last = list[list.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    node?.addEventListener("keydown", onKeyDown);
    return () => {
      node?.removeEventListener("keydown", onKeyDown);
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [onClose]);

  const removeChip = (chip) =>
    setChips((prev) => prev.filter((item) => item !== chip));

  return (
    <div className="am-theme fixed inset-0 z-[70] flex items-center justify-center">
      {/* overlay */}
      <div
        className="absolute inset-0 backdrop-blur-sm"
        style={{ background: "var(--overlay)" }}
        onClick={onClose}
        aria-hidden
      />

      {/* dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={isCreate ? "Create Article" : "Edit Article"}
        className="relative flex max-h-[92vh] w-[316px] max-w-[calc(100vw-32px)] flex-col gap-[14px] overflow-x-hidden overflow-y-auto rounded-[12px] bg-card p-4 font-[Inter]"
        style={{ boxShadow: "var(--modal-shadow)" }}
      >
        {/* header */}
        <div className="flex w-full min-w-0 box-border items-center justify-between gap-3">
          <h2 className="text-[14px] font-semibold text-[#0A0847]">
            Create / Edit Article
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#001984] transition-opacity hover:opacity-70"
          >
            <LuCircleX size={20} strokeWidth={2} />
          </button>
        </div>

        {/* content stack — gap 14 handled by the card */}
        <div className="w-full min-w-0 box-border">
          <Label htmlFor="article-title">Article Title</Label>
          <SelectField
            id="article-title"
            value={title}
            onChange={setTitle}
            options={TITLE_OPTIONS}
            placeholder="Select article title"
          />
        </div>

        <div className="w-full min-w-0 box-border">
          <Label htmlFor="article-category">Category</Label>
          <SelectField
            id="article-category"
            value={category}
            onChange={setCategory}
            options={CATEGORY_OPTIONS}
            placeholder="Select category"
          />
        </div>

        <div className="w-full min-w-0 box-border">
          <Label htmlFor="article-summary">Short Description</Label>
          <div className="relative">
            <textarea
              id="article-summary"
              value={summary}
              maxLength={MAX_SUMMARY}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Add a short description"
              className="h-[75px] w-full resize-none rounded-lg border border-[#E2DFFC] bg-card py-3 pl-3 pr-3 text-[12px] font-medium text-[#0A0847]/80 outline-none transition-colors placeholder:text-placeholder-ink focus:border-primary focus:ring-2 focus:ring-edge"
            />
            <span className="pointer-events-none absolute bottom-2 right-3 text-xs text-counter">
              {summary.length}/{MAX_SUMMARY}
            </span>
          </div>
        </div>

        <div className="w-full min-w-0 box-border">
          <Label>Story Summary:</Label>
          <div className="flex h-[216px] w-full min-w-0 box-border flex-col overflow-hidden rounded-lg border border-[#E2DFFC] bg-white">
            <Toolbar />
            <div className="min-h-0 flex-1 overflow-hidden p-4">
              <p className="text-[13px] font-medium leading-[1.5] text-body-muted">
                {SUMMARY_BODY}
              </p>
              <ol className="mt-2 space-y-1">
                {SUMMARY_STEPS.map((step, index) => (
                  <li
                    key={step}
                    className="flex gap-2 text-[13px] font-medium leading-[1.5] text-counter"
                  >
                    <span className="font-bold">{index + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        <div className="w-full min-w-0 box-border">
          <Label>Related Articles</Label>
          <div className="flex w-full min-w-0 box-border flex-wrap gap-2 rounded-lg border border-[#E2DFFC] p-3">
            {chips.map((chip) => (
              <span
                key={chip}
                className="flex h-[35px] items-center gap-1.5 rounded-md border border-[#E2DFFC] bg-chip px-[10px] text-[12px] font-medium text-[#0A0847]"
              >
                {chip}
                <button
                  type="button"
                  onClick={() => removeChip(chip)}
                  aria-label={`Remove ${chip}`}
                  className="cursor-pointer text-[#001984] transition-opacity hover:opacity-70"
                >
                  <LuCircleX size={16} strokeWidth={2} />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="flex w-full min-w-0 box-border items-center justify-between gap-3">
          <span className="text-[14px] font-semibold text-[#0A0847]">
            Published
          </span>
          <Toggle
            checked={published}
            onChange={setPublished}
            label="Published"
          />
        </div>

        {/* divider below Published */}
        <div className="h-px w-full min-w-0 shrink-0 box-border bg-[#E2DFFC]" />

        {/* footer actions */}
        <div className="flex w-full min-w-0 box-border flex-col gap-[13px]">
          <div className="grid grid-cols-2 gap-[13px]">
            <button
              type="button"
              className="h-[42px] cursor-pointer rounded-lg border border-[#E2DFFC] bg-[#FAFAFC] text-[15px] font-semibold text-[#0A0847]/80 transition-colors hover:bg-chip"
            >
              Save Draft
            </button>
            <button
              type="button"
              className="h-[42px] cursor-pointer rounded-lg border border-[#E2DFFC] bg-[#FAFAFC] text-[15px] font-semibold text-[#0A0847]/80 transition-colors hover:bg-chip"
            >
              Preview
            </button>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="h-[42px] w-full cursor-pointer rounded-lg bg-[#001984] text-[16px] font-semibold text-white transition-colors hover:bg-[#001266]"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}