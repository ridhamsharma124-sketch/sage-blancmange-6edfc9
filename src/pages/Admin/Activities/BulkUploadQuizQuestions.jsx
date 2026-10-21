import { useRef, useState } from "react";
import selectorBookIcon from "../../../assets/activities/selector_book.png";
import uploadCloudIcon from "../../../assets/activities/upload_cloud.png";
import {
  LuDownload,
  LuSearch,
  LuFileSpreadsheet,
  LuFileText,
  LuCircleCheck,
  LuTriangleAlert,
  LuPencil,
  LuTrash2,
  LuChevronDown,
  LuChevronRight,
} from "react-icons/lu";

/* ==========================================================================
   MOCK DATA — hardcoded exactly as specified
   ========================================================================== */
const QUESTION_TYPE_OPTIONS = ["Multiple Choice"];

const MOCK_FILE_NAME = "john_3_bulkquiz_2026.csv";
const MOCK_FILE_META = "12.4 KB • 25 rows";

const STAT_CARDS = [
  {
    key: "ready",
    value: "18",
    label: "Ready",
    icon: LuCircleCheck,
    iconWrap: "bg-[#21AC1C]/10",
    iconColor: "text-[#21AC1C]",
  },
  {
    key: "errors",
    value: "2",
    label: "Errors",
    icon: LuTriangleAlert,
    iconWrap: "bg-[#DC2626]/10",
    iconColor: "text-[#DC2626]",
  },
  {
    key: "duplicates",
    value: "0",
    label: "Duplicates",
    icon: LuFileText,
    iconWrap: "bg-[#2270AD]/10",
    iconColor: "text-[#2270AD]",
  },
];

const READY_COUNT = STAT_CARDS.find((stat) => stat.key === "ready")?.value ?? "0";

const TABLE_ROWS = [
  {
    no: "1",
    description: "Knowledge quiz with multiple question types",
    answer: "B",
    reference: "John 3:1–21",
    status: "Valid",
  },
  {
    no: "2",
    description: "What is the new birth?",
    answer: "A",
    reference: "John 3:3",
    status: "Valid",
  },
  {
    no: "3",
    description: "Who sent His only Son?",
    answer: "C",
    reference: "John 3:16",
    status: "Valid",
  },
  {
    no: "4",
    description: "What is the light mentioned?",
    answer: "C",
    reference: "John 3:19",
    status: "Error",
  },
  {
    no: "5",
    description: "Who must be born again?",
    answer: "B",
    reference: "John 3:5",
    status: "Valid",
  },
  {
    no: "6",
    description: "What is eternal life?",
    answer: "A",
    reference: "John 3:36",
    status: "Valid",
  },
];

/* ==========================================================================
   PAGE-LOCAL STYLES
   ========================================================================== */
const labelCls = "mb-1.5 block text-[12px] font-semibold text-[#0A0847]";

const fieldCls =
  "h-10 w-full rounded-[7.47px] border border-[#E2DFFC] bg-white py-[10px] pl-[12px] pr-[50px] text-[12px] font-medium text-[#0A0847]/80 outline-none transition focus:border-[#001984]";

const stepButton =
  "flex h-10 min-w-[133px] w-fit shrink-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-[#001984] bg-[#FEFEFE] px-4 py-2 text-[13px] font-medium text-[#001984] transition-colors hover:bg-[#F1F1F9]";

const outlineButton =
  "flex h-12 w-[152px] shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#001984] bg-[#FEFEFE] text-[14px] font-medium text-[#001984] transition-colors hover:bg-[#F1F1F9]";

const purpleButton =
  "flex h-12 w-[174px] shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#4022D1] px-4 py-[10px] text-[14px] font-medium text-white transition-colors hover:opacity-90";

const formatSize = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;

/* Columns: checkbox | No. | Description | Correct Answer | Bible Reference | Status | Actions */
const TABLE_GRID =
  "grid grid-cols-[48px_56px_minmax(0,1fr)_120px_130px_100px_104px] items-center gap-3 px-4";

/* ==========================================================================
   SUB-COMPONENTS
   ========================================================================== */
function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-[16px] font-medium text-[#0A0847]/60">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item} className="flex items-center gap-1.5">
              {index > 0 && (
                <LuChevronRight size={14} className="text-[#0A0847]/60" aria-hidden />
              )}
              <span aria-current={isLast ? "page" : undefined}>{item}</span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function LocationChip({ parts = ["New Testament", "John", "Chapter 3"] }) {
  return (
    <div className="inline-flex w-fit items-center gap-[10px] self-start rounded-lg border border-[#E2DFFC] bg-[#F7F7F9] pt-[13px] pr-[12px] pb-[12px] pl-[15px]">
      <img
        src={selectorBookIcon}
        alt="Book Icon"
        className="h-4 w-4 shrink-0 object-contain"
      />
      <p className="text-[13px] leading-[22px]">
        {parts.map((part, index) => (
          <span key={part}>
            {index > 0 && <span className="px-1.5 text-[#0A0847]/60">&gt;</span>}
            <span className="font-bold text-[#0A0847]">{part}</span>
          </span>
        ))}
      </p>
    </div>
  );
}

function StepRow({ step, title, description, headerRight, children }) {
  return (
    <section className="flex w-full flex-col gap-3 rounded-lg border border-[#E2DFFC] bg-[#FEFFFF] p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3.5">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#001984] text-[12px] font-semibold text-white">
            {step}
          </span>
          <div className="min-w-0">
            <h2 className="text-[14px] font-semibold text-[#0A0847]">{title}</h2>
            <p className="mt-0.5 text-[12px] font-medium text-[#0A0847]/60">
              {description}
            </p>
          </div>
        </div>
        {headerRight}
      </div>
      {children}
    </section>
  );
}

/* ==========================================================================
   PAGE
   ========================================================================== */
export default function BulkUploadQuizQuestions() {
  const [questionType, setQuestionType] = useState("Multiple Choice");
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const dragDepth = useRef(0);

  const openPicker = () => fileInputRef.current?.click();

  const acceptFiles = (files) => {
    const picked = files?.[0];
    if (!picked) return;
    if (picked.type !== "text/csv" && !picked.name.toLowerCase().endsWith(".csv")) return;
    setFile(picked);
  };

  const fileName = file ? file.name : MOCK_FILE_NAME;
  const fileMeta = file ? `${formatSize(file.size)} • 25 rows` : MOCK_FILE_META;

  return (
    <div className="min-h-screen bg-[#F9FAFE] font-[Inter] text-[#0A0847]">
      <div className="flex w-full min-w-0 flex-col px-6 py-6">
        <Breadcrumb
          items={[
            "Bible Content",
            "Activities",
            "John",
            "Chapter 3",
            "Quiz",
            "Bulk Upload",
          ]}
        />

        <h1 className="mt-5 text-[22px] font-semibold text-[#0A0847]">
          Bulk Upload Quiz Questions
        </h1>

        {/* TOP — Location Chip + Question Type Select */}
        <div className="mt-5">
          <LocationChip />

          <div className="mt-4 w-[535px] max-w-full">
            <label htmlFor="q-type" className={labelCls}>
              Question Type <span className="text-[#E11D48]">*</span>
            </label>
            <div className="relative">
              <select
                id="q-type"
                value={questionType}
                onChange={(e) => setQuestionType(e.target.value)}
                className={`${fieldCls} cursor-pointer appearance-none`}
              >
                {QUESTION_TYPE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <LuChevronDown
                size={16}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#0A0847]/60"
                aria-hidden
              />
            </div>
            <p className="mt-1.5 text-[10px] text-[#0A0847]/60">
              Choose the question type before uploading.
            </p>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          className="hidden"
          onChange={(e) => acceptFiles(e.target.files)}
        />

        {/* STEP CARDS */}
        <div className="mt-5 flex flex-col gap-4">
          {/* STEP 1 */}
          <StepRow
            step={1}
            title="Download CSV Template"
            description="Download the template file to enter your questions."
            headerRight={
              <button type="button" className={stepButton}>
                <LuDownload size={16} className="shrink-0" />
                Download Template
              </button>
            }
          />

          {/* STEP 2 — Drag-and-drop dropzone */}
          <StepRow
            step={2}
            title="Upload Completed CSV"
            description="Upload your filled data (CSV format)."
          >
            <div
              role="button"
              tabIndex={0}
              onClick={openPicker}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openPicker();
                }
              }}
              onDragEnter={(e) => {
                e.preventDefault();
                dragDepth.current += 1;
                setDragActive(true);
              }}
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                dragDepth.current -= 1;
                if (dragDepth.current <= 0) {
                  dragDepth.current = 0;
                  setDragActive(false);
                }
              }}
              onDrop={(e) => {
                e.preventDefault();
                dragDepth.current = 0;
                setDragActive(false);
                acceptFiles(e.dataTransfer.files);
              }}
              className={`relative mx-auto flex h-[147px] w-full max-w-[874px] cursor-pointer items-center justify-between rounded-lg border border-dashed border-[#001984] px-8 transition-colors ${
                dragActive ? "bg-[#E4E4F7]" : "bg-[#F3F4FF] hover:bg-[#EFEDF9]"
              }`}
            >
              <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-3">
                {/* Figma cloud-upload icon (cut from Figma frame) */}
                <img
                  src={uploadCloudIcon}
                  alt=""
                  className="h-[52px] w-auto shrink-0"
                />
                <div className="text-center">
                  <p className="text-[16px] font-semibold text-[#0A0847]">
                    Drag and drop your file here
                  </p>
                  <p className="mt-0.5 text-[12px] text-[#0A0847]/60">or</p>
                  <p className="mt-0.5 text-[12px] text-[#0A0847]/60">
                    Supported format: .csv
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  openPicker();
                }}
                className="ml-auto flex h-[43px] w-[217px] shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#001984] bg-[#FEFEFE] p-3 text-[14px] font-medium text-[#001984] transition-colors hover:bg-[#F1F1F9]"
              >
                Browse File
              </button>
            </div>
          </StepRow>
        </div>

        {/* COMBINED CARD — Validate Results + File Row + Stats + Table */}
        <section className="mt-4 flex w-full flex-col gap-4 rounded-lg border border-[#E2DFFC] bg-[#FEFFFF] p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3.5">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#001984] text-[12px] font-semibold text-white">
                3
              </span>
              <div className="min-w-0">
                <h2 className="text-[14px] font-semibold text-[#0A0847]">Validate Results</h2>
                <p className="mt-0.5 text-[12px] font-medium text-[#0A0847]/60">
                  Review your file to confirm for errors before importing.
                </p>
              </div>
            </div>
            <button type="button" className={stepButton}>
              <LuSearch size={16} className="shrink-0" />
              Validate CSV
            </button>
          </div>

          {/* FILE ROW */}
          <div className="flex h-[72px] items-center justify-between gap-3 rounded-lg bg-[#F9F9FF] pr-[31px] pl-5">
            <div className="flex min-w-0 items-center gap-3">
              <LuFileSpreadsheet size={20} className="shrink-0 text-[#16A34A]" aria-hidden />
              <div className="min-w-0">
                <p className="truncate text-[14px] font-semibold text-[#001984]">
                  {fileName}
                </p>
                <p className="mt-0.5 text-[12px] text-[#0A0847]/60">{fileMeta}</p>
              </div>
            </div>
            <LuCircleCheck
              size={20}
              className="shrink-0 text-[#16A34A]"
              aria-label="File validated"
            />
          </div>

          {/* STAT CARDS */}
          <div className="grid grid-cols-3 gap-4">
            {STAT_CARDS.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.key}
                  className="flex h-[106px] min-w-0 items-center gap-4 rounded-lg border border-[#E2DFFC] bg-[#FEFFFF] p-[22px]"
                >
                  <span
                    className={`flex h-[62px] w-[62px] shrink-0 items-center justify-center rounded-xl ${stat.iconWrap}`}
                  >
                    <Icon size={26} className={stat.iconColor} aria-hidden />
                  </span>
                  <div className="flex min-w-0 flex-col gap-2.5">
                    <p className="text-[22px] leading-none font-semibold text-[#0A0847]">
                      {stat.value}
                    </p>
                    <p className="text-[14px] font-medium text-[#0A0847]/60">
                      {stat.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* VALIDATION TABLE */}
          <div className="w-full overflow-hidden rounded-lg border border-[#E2DFFC] bg-white">
            <div
              className={`${TABLE_GRID} h-[50px] bg-[#F3F7FD] text-[14px] font-medium text-[#0A0847]/80`}
            >
              <div className="flex items-center justify-start">
                <input
                  type="checkbox"
                  aria-label="Select all rows"
                  className="h-4 w-4 cursor-pointer rounded-[4px] border border-[#E2DFFC] accent-[#001984]"
                />
              </div>
              <div className="text-center">No.</div>
              <div className="text-center">Description</div>
              <div className="text-center">Correct Answer</div>
              <div className="text-center">Bible Reference</div>
              <div className="text-center">Status</div>
              <div className="text-center">Actions</div>
            </div>

            {TABLE_ROWS.map((row) => (
              <div
                key={row.no}
                className={`${TABLE_GRID} h-[63px] border-b-[0.75px] border-[#E9E9E9] bg-white text-[12px] font-medium text-[#0A0847]/80 last:border-b-0`}
              >
                <div className="flex items-center justify-start">
                  <input
                    type="checkbox"
                    aria-label={`Select row ${row.no}`}
                    className="h-4 w-4 cursor-pointer rounded-[4px] border border-[#E2DFFC] accent-[#001984]"
                  />
                </div>
                <div className="text-center">{row.no}</div>
                <div className="text-center leading-4">{row.description}</div>
                <div className="text-center">{row.answer}</div>
                <div className="text-center">{row.reference}</div>
                <div className="flex items-center justify-center">
                  <span
                    className={`flex h-[28px] w-fit items-center rounded-lg px-3 text-[12px] font-medium ${
                      row.status === "Valid"
                        ? "bg-[#21AC1C]/10 text-[#21AC1C]"
                        : "bg-[#FEE2E2] text-[#DC2626]"
                    }`}
                  >
                    {row.status}
                  </span>
                </div>
                <div className="flex items-center justify-center">
                  <div className="flex w-[72px] gap-2">
                    <button
                      type="button"
                      aria-label={`Edit row ${row.no}`}
                      className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-md border border-[#E2DFFC] bg-white text-[#001984] transition hover:border-[#001984]"
                    >
                      <LuPencil size={16} />
                    </button>
                    <button
                      type="button"
                      aria-label={`Delete row ${row.no}`}
                      className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-md border border-[#E2DFFC] bg-white text-[#DC2626] transition hover:border-[#DC2626]"
                    >
                      <LuTrash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* BOTTOM ACTION ROW */}
        <div className="mt-6 flex w-full flex-wrap items-center justify-between gap-3">
          <button type="button" className={outlineButton}>
            Cancel
          </button>
          <div className="flex flex-wrap items-center gap-4">
            <button type="button" onClick={openPicker} className={outlineButton}>
              Replace File
            </button>
            <button type="button" className={outlineButton}>
              Save as Draft
            </button>
            <button type="button" className={purpleButton}>
              Import {READY_COUNT} Questions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}