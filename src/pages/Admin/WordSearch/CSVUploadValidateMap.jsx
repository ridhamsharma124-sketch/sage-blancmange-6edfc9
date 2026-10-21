import { Fragment, useState } from "react";
import { LuArrowRight, LuCheck, LuChevronDown } from "react-icons/lu";

/* ==========================================================================
   ICON — CSV FILE (navy outlined document with small "CSV" label, 30px)
   ========================================================================== */
function CsvFileIcon() {
  return (
    <svg width="27" height="30" viewBox="0 0 27 30" fill="none" aria-hidden>
      <path
        d="M5 1.5h10.5l8 8v19H5v-27Z"
        stroke="#0A0847"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path d="M15.5 1.5v8h8" stroke="#0A0847" strokeWidth="1.3" strokeLinejoin="round" />
      <text
        x="14"
        y="24.4"
        textAnchor="middle"
        fontSize="7.4"
        fontWeight="700"
        fontFamily="Inter, sans-serif"
        fill="#0A0847"
      >
        CSV
      </text>
    </svg>
  );
}

/* ==========================================================================
   SHARED
   ========================================================================== */

/* Single consistent select used by every "Maps To (App Field)" dropdown.
   112 x 36, radius 7.47, 50px right padding leaves the chevron its slot and
   truncates long labels to an ellipsis instead of stretching the column. */
function FieldSelect({ value, options, onChange, ariaLabel }) {
  return (
    <div className="relative w-[112px]">
      <select
        aria-label={ariaLabel}
        title={value}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="h-[36px] w-[112px] cursor-pointer appearance-none truncate rounded-[7.47px] border border-[#E2DFFC] bg-white pr-[50px] pl-3 text-[12px] text-[#374151] outline-none focus:border-[#001984]/40"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>

      <LuChevronDown
        size={12}
        strokeWidth={1.8}
        className="pointer-events-none absolute top-1/2 right-[16px] -translate-y-1/2 text-[#374151]/70"
        aria-hidden
      />
    </div>
  );
}

/* Green check + light-green "Validated" badge — identical size on every row. */
function ValidatedCell() {
  return (
    <div className="flex items-center gap-2">
      <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-[#22C55E]">
        <LuCheck size={13} strokeWidth={2.5} className="text-white" aria-hidden />
      </span>
      <span className="flex h-[28px] w-[76px] shrink-0 items-center justify-center rounded-[8px] bg-[#E8FBEF] text-[12px] font-semibold text-[#16A34A]">
        Validated
      </span>
    </div>
  );
}

function FixRowButton() {
  return (
    <button
      type="button"
      className="flex h-[32px] w-[79px] shrink-0 cursor-pointer items-center justify-center rounded-[8px] border border-[#001984] bg-white text-[12px] font-semibold text-[#001984] transition-colors hover:bg-[#F3F5FC]"
    >
      Fix Row
    </button>
  );
}

/* ==========================================================================
   DATA
   ========================================================================== */
const MAPPING_ROWS = [
  {
    column: "clue",
    sample: "Who created the heavens and the earth?",
    options: ["Clue", "Question", "Instructions", "Skip"],
  },
  {
    column: "answer",
    sample: "God",
    options: ["Answer (Hidden Word)", "Answer", "Correct Answer", "Skip"],
  },
  {
    column: "created_by",
    sample: "Admin User",
    options: ["Created By", "Author", "Creator", "Skip"],
  },
  {
    column: "difficulty",
    sample: "1",
    options: ["Difficulty Level", "Level", "Difficulty", "Skip"],
  },
  {
    column: "reward_points",
    sample: "10",
    options: ["Reward Points", "Points", "Skip"],
  },
];

const REVIEW_ROWS = [
  { row: "7", issue: "Missing answer", data: "(blank)" },
  { row: "15", issue: "Invalid reward points", data: "abc" },
];

const GUIDE_HEADERS = [
  "Hidden Restoration",
  "Verse Restoration",
  "Audio Revelation",
  "Mystery Scripture",
];

const GUIDE_ROWS = [
  ["clue", "verse_reference", "audio_file", "scripture_reference"],
  ["answer", "verse_text", "question", "clue"],
  ["created_by", "missing_word", "answer", "answer"],
  ["difficulty", "created_by", "created_by", "created_by"],
  ["reward_points", "difficulty", "difficulty", "difficulty"],
];

/* Figma wraps `reward_points` one character later than the underscore
   (reward_poi / nts) and every other value at the underscore. */
function GuideCell({ value }) {
  const className =
    "px-5 text-[11px] leading-[1.4] font-medium break-words text-[#374151]";

  if (value === "reward_points") {
    return (
      <span className={className}>
        reward_poi
        <wbr />
        nts
      </span>
    );
  }

  const parts = value.split("_");

  return (
    <span className={className}>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {part}
          {i < parts.length - 1 && "_"}
          {i < parts.length - 1 && <wbr />}
        </Fragment>
      ))}
    </span>
  );
}

/* ==========================================================================
   PAGE
   ========================================================================== */
export default function CSVUploadValidateMap() {
  const [mapping, setMapping] = useState(() => ({
    clue: "Clue",
    answer: "Answer (Hidden Word)",
    created_by: "Created By",
    difficulty: "Difficulty Level",
    reward_points: "Reward Points",
  }));

  return (
    <div className="min-h-[calc(100vh-72px)] bg-[#F8F8FC] font-inter text-[#0A0847]">
      <div className="mx-auto w-full max-w-[1108px] px-6 py-6">
        {/* ---------------- header ---------------- */}
        <p className="text-[14px] font-normal text-[#6B6A80]">
          Add / Edit Word Search - CSV Upload
        </p>

        <h1 className="mt-1.5 text-[22px] leading-[1.2] font-semibold text-[#0A0847]">
          1. CSV Upload - Validate &amp; Map
        </h1>

        <p className="mt-1.5 text-[14px] font-normal text-[#0A0847]/60">
          We&apos;ve validated your file and mapped the columns to the correct fields.
        </p>

        {/* ---------------- top row ---------------- */}
        <div className="mt-6 flex gap-6">
          {/* uploaded file */}
          <section className="flex w-[339px] shrink-0 flex-col gap-[10px] rounded-[7.5px] border-[0.75px] border-[#E2DFFC] bg-white p-5">
            <h2 className="text-[14px] leading-[1.2] font-semibold text-[#0A0847]">
              Uploaded File
            </h2>

            <div className="flex items-center gap-[10px]">
              <CsvFileIcon />

              <div className="min-w-0 flex-1">
                <p className="truncate text-[12px] font-semibold text-[#0A0847]">
                  genesis_word_search.csv
                </p>
                <p className="mt-1 text-[10px] text-[#0A0847]/60">12.4 KB • 24 rows</p>
              </div>

              <span className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full bg-[#22C55E]">
                <LuCheck size={16} strokeWidth={2.5} className="text-white" aria-hidden />
              </span>
            </div>
          </section>

          {/* validation summary */}
          <section className="flex flex-1 flex-col gap-[10px] rounded-[7.5px] border-[0.75px] border-[#E2DFFC] bg-white p-5">
            <h2 className="text-[14px] leading-[1.2] font-semibold text-[#0A0847]">
              Validation Summary
            </h2>

            <div className="flex gap-[10px]">
              <div className="flex h-[90px] w-[209px] shrink-0 flex-col items-center justify-center gap-1 rounded-[8px] border border-[#22C55E] bg-[#F0FAF0]">
                <p className="text-[22px] leading-none font-semibold text-[#15803D]">22</p>
                <p className="text-[12px] font-semibold text-[#15803D]">Valid Rows</p>
              </div>

              <div className="flex h-[90px] w-[209px] shrink-0 flex-col items-center justify-center gap-1 rounded-[8px] border border-[#F97316] bg-[#FFF6EE]">
                <p className="text-[22px] leading-none font-semibold text-[#EA580C]">2</p>
                <p className="text-[12px] font-semibold text-[#EA580C]">Need Review</p>
              </div>

              <div className="flex h-[90px] w-[209px] shrink-0 flex-col items-center justify-center gap-1 rounded-[8px] border border-[#001984] bg-white">
                <p className="text-[22px] leading-none font-semibold text-[#0A0847]">0</p>
                <p className="text-[12px] font-semibold text-[#0A0847]">Duplicates</p>
              </div>
            </div>
          </section>
        </div>

        {/* ---------------- two-column grid ---------------- */}
        <div className="mt-6 grid grid-cols-[517px_517px] gap-6">
          {/* 1. column mapping */}
          <section className="flex min-h-[742px] w-[517px] flex-col gap-[10px] rounded-[7.5px] border-[0.75px] border-[#E2DFFC] bg-white pt-[21px] pr-[10px] pb-[32px] pl-[16px]">
            <h2 className="text-[14px] leading-[1.2] font-semibold text-[#0A0847]">
              1. Column Mapping
            </h2>

            <div className="w-full">
              {/* header */}
              <div className="grid h-[50px] w-full grid-cols-[90px_135px_130px_134px] items-center border-b-[0.75px] border-[#E9E9E9] bg-[#F3F3FD]">
                <span className="px-2 text-[12px] leading-[1.25] font-semibold text-[#0A0847]">
                  CSV Column
                </span>
                <span className="px-2 text-[12px] font-semibold text-[#0A0847]">Sample Data</span>
                <span className="px-2 text-[12px] leading-[1.25] font-semibold text-[#0A0847]">
                  Maps To (App Field)
                </span>
                <span className="px-2 text-[12px] font-semibold text-[#0A0847]">Status</span>
              </div>

              {/* rows */}
              {MAPPING_ROWS.map(({ column, sample, options }) => (
                <div
                  key={column}
                  className="grid h-[62px] w-full grid-cols-[90px_135px_130px_134px] items-center border-b-[0.75px] border-[#E9E9E9] py-2"
                >
                  <span className="px-2 text-[12px] leading-[1.25] font-medium break-words text-[#374151]">
                    {column}
                  </span>

                  <span className="px-2 text-[12px] leading-[1.35] font-medium text-[#374151]">
                    {sample}
                  </span>

                  <div className="px-2">
                    <FieldSelect
                      ariaLabel={`Maps ${column} to app field`}
                      value={mapping[column]}
                      options={options}
                      onChange={(v) => setMapping((prev) => ({ ...prev, [column]: v }))}
                    />
                  </div>

                  <div className="px-2">
                    <ValidatedCell />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* right column */}
          <div className="flex w-[517px] flex-col gap-6">
            {/* 2. rows needing review */}
            <section className="flex w-[517px] shrink-0 flex-col gap-[10px] rounded-[7.5px] border-[0.75px] border-[#E2DFFC] bg-white p-4">
              <h2 className="text-[14px] leading-[1.2] font-semibold text-[#0A0847]">
                2. Rows Needing Review (2)
              </h2>

              <div className="w-[481px]">
                {/* header */}
                <div className="grid h-[50px] w-full grid-cols-[50px_140px_83px_168px] items-center border-b-[0.75px] border-[#E9E9E9] bg-[#F3F3FD] px-5">
                  <span className="text-[12px] font-semibold text-[#0A0847]">Row #</span>
                  <span className="text-[12px] font-semibold text-[#0A0847]">Issue</span>
                  <span className="text-[12px] font-semibold text-[#0A0847]">Data</span>
                  <span className="text-center text-[12px] font-semibold text-[#0A0847]">
                    Actions
                  </span>
                </div>

                {/* contiguous rows — no gap, no rounding */}
                {REVIEW_ROWS.map(({ row, issue, data }) => (
                  <div
                    key={row}
                    className="grid h-[62px] w-full grid-cols-[50px_140px_83px_168px] items-center border-b-[0.75px] border-[#DDAEAE] bg-[#FEF5F5] px-5 py-2"
                  >
                    <span className="text-[12px] font-semibold text-[#A0003C]">{row}</span>

                    <span className="text-[12px] font-semibold text-[#A0003C]">{issue}</span>

                    <span className="text-[12px] font-semibold text-[#A0003C]">{data}</span>

                    <div className="flex items-center justify-center gap-2">
                      <FixRowButton />
                      <FixRowButton />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 3. column guide by type */}
            <section className="flex w-[517px] flex-1 flex-col gap-[10px] rounded-[7.5px] border-[0.75px] border-[#E2DFFC] bg-white p-4">
              <h2 className="text-[14px] leading-[1.2] font-semibold text-[#0A0847]">
                3. Column Guide by Type
              </h2>

              <div className="w-[428px]">
                {/* header */}
                <div className="grid h-[50px] w-[428px] grid-cols-4 items-center border-b-[0.75px] border-[#E9E9E9] bg-[#F3F3FD]">
                  {GUIDE_HEADERS.map((h) => (
                    <span
                      key={h}
                      className="px-5 text-[11px] leading-[1.25] font-semibold text-[#0A0847]"
                    >
                      {h}
                    </span>
                  ))}
                </div>

                {/* rows */}
                {GUIDE_ROWS.map((row) => (
                  <div
                    key={row.join("-")}
                    className="grid h-[62px] w-[428px] grid-cols-4 items-center border-b-[0.75px] border-[#E9E9E9] py-2"
                  >
                    {row.map((cell, i) => (
                      <GuideCell key={i} value={cell} />
                    ))}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* ---------------- footer ---------------- */}
        <div className="mt-6 flex h-[43px] w-full items-center justify-between">
          <button
            type="button"
            className="flex h-[43px] w-[97px] cursor-pointer items-center justify-center rounded-[6px] border border-[#E2DFFC] bg-white text-[14px] font-semibold text-[#001984] transition-colors hover:bg-[#F5F8FD]"
          >
            Back
          </button>

          <button
            type="button"
            className="flex h-[43px] w-[200px] cursor-pointer items-center justify-center gap-2 rounded-[6px] bg-[#001984] text-[14px] font-semibold text-white transition-opacity hover:opacity-90"
          >
            <LuArrowRight size={16} strokeWidth={2} aria-hidden />
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
