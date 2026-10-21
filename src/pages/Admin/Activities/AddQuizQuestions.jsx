import { useState } from "react";
import { LuDownload, LuChevronDown, LuPencil } from "react-icons/lu";
import {
  FiCheckSquare,
  FiXCircle,
  FiAlignLeft,
  FiUser,
  FiExternalLink,
  FiVolume2,
} from "react-icons/fi";
import { RiListUnordered } from "react-icons/ri";
import { IoImage } from "react-icons/io5";
import { BsBarChart } from "react-icons/bs";

/* Figma icon: src/assets/activities/selector_book.png */
import selectorBookIcon from "../../../assets/activities/selector_book.png";

/* ==========================================================================
   CUSTOM ICONS (Figma jaisa look)
   ========================================================================== */

// 4-point concave star ka path
function starPath(cx, cy, r) {
  const k = r * 0.22;
  return `M${cx} ${cy - r} Q${cx + k} ${cy - k} ${cx + r} ${cy} Q${cx + k} ${cy + k} ${cx} ${cy + r} Q${cx - k} ${cy + k} ${cx - r} ${cy} Q${cx - k} ${cy - k} ${cx} ${cy - r}Z`;
}

function SparklesIcon({ size = 62, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 62 62"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d={starPath(20, 40, 19)} />
      <path d={starPath(44, 14, 11)} />
      <path d={starPath(48, 44, 9)} />
    </svg>
  );
}

function CsvFileIcon({ size = 62, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 62 62"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden
      {...props}
    >
      {/* back page */}
      <path d="M22 8h20l10 10v32a2 2 0 0 1-2 2h-4" />
      {/* front page */}
      <path d="M12 12h20l10 10v32a2 2 0 0 1-2 2H12a2 2 0 0 1-2-2V14a2 2 0 0 1 2-2Z" />
      <path d="M32 12v10h10" />
      {/* CSV label */}
      <rect x="5" y="30" width="30" height="14" rx="2" fill="#fff" />
      <text
        x="20"
        y="41"
        textAnchor="middle"
        fontSize="10"
        fontWeight="700"
        fontFamily="Inter, sans-serif"
        fill="currentColor"
        stroke="none"
      >
        CSV
      </text>
    </svg>
  );
}

function FillBlankIcon() {
  return (
    <span className="text-[15px] font-bold leading-none tracking-tighter">
      A...
    </span>
  );
}

function FlipMatchIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="2.5" strokeDasharray="3 2.4" />
      <path d="M9 8.5 17 11.5l-3.5 1.5L12 16.5Z" />
    </svg>
  );
}

function VideoIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M10 8.5 16 12l-6 3.5Z" />
    </svg>
  );
}

/* ==========================================================================
   MOCK DATA
   ========================================================================== */
const BREADCRUMBS = ["Dashboard", "Activities", "John", "Chapter 3", "Quiz"];

const LOCATION_PARTS = ["New Testament", "John", "Chapter 3"];

const QUESTION_TYPES = [
  { id: "multiple-choice", label: "Multiple Choice", Icon: RiListUnordered },
  { id: "multiple-select", label: "Multiple Select", Icon: FiCheckSquare },
  { id: "fill-blank", label: "Fill in the Blank", Icon: FillBlankIcon },
  { id: "true-false", label: "True / False", Icon: FiXCircle },
  { id: "short-answer", label: "Short Answer", Icon: FiAlignLeft },
  { id: "image-based", label: "Image Based", Icon: IoImage },
  { id: "flip-and-match", label: "Flip And Match", Icon: FlipMatchIcon },
  { id: "who-am-i", label: "Who Am I", Icon: FiUser },
  { id: "match-following", label: "Match the Following", Icon: FiExternalLink },
  { id: "audio-quiz", label: "Audio Quiz", Icon: FiVolume2 },
  { id: "video-questions", label: "Video Questions", Icon: VideoIcon },
  { id: "instant-analytics", label: "Instant Analytics", Icon: BsBarChart },
];

/* ==========================================================================
   PRIMITIVES
   ========================================================================== */
function Breadcrumb() {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2.5 text-[18px] font-medium leading-[22px] text-[#0A084799]">
        {BREADCRUMBS.map((crumb, index) => {
          const isLast = index === BREADCRUMBS.length - 1;
          return (
            <li key={crumb} className="flex items-center gap-2.5">
              {index > 0 && <span aria-hidden>&gt;</span>}
              <span aria-current={isLast ? "page" : undefined}>{crumb}</span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function LocationChip() {
  return (
    <div className="flex h-[49px] w-[396px] max-w-full items-center gap-2.5 rounded-lg border border-[#E5E3EB] bg-[#F7F7F9] pt-[13px] pr-3 pb-3 pl-[15px]">
      <img
          src={selectorBookIcon}
          alt=""
          width={24}
          height={24}
          className="h-6 w-6 shrink-0"
        />
      <p className="flex items-center gap-4 text-[16px] font-semibold leading-6 text-[#0A0847CC]">
        {LOCATION_PARTS.map((part, index) => (
          <span key={part} className="flex items-center gap-4">
            {index > 0 && <span aria-hidden>&gt;</span>}
            <span>{part}</span>
          </span>
        ))}
      </p>
    </div>
  );
}

function SectionHeader({ title, required, subtitle }) {
  return (
    <div className="flex flex-col gap-[14px]">
      <h2 className="text-[22px] font-semibold leading-[27px] text-[#0A0847CC]">
        {title}
        {required && <span className="text-[#D4001A]"> *</span>}
      </h2>
      <p className="text-[16px] font-medium leading-[19px] text-[#0A084799]">
        {subtitle}
      </p>
    </div>
  );
}

function QuestionTypeRow({ type, selected, onSelect }) {
  const { Icon } = type;
  return (
    <label className="flex h-[46.7px] cursor-pointer items-center px-[18px] transition-colors hover:bg-[#FAFAFE]">
      <input
        type="radio"
        name="question-type"
        value={type.id}
        checked={selected}
        onChange={() => onSelect(type.id)}
        className="h-5 w-5 shrink-0 cursor-pointer appearance-none rounded-full border-2 border-[#0A0847B3] bg-white checked:border-[#001984] checked:bg-[#001984] checked:shadow-[inset_0_0_0_3px_#fff]"
      />
      <span className="ml-[14px] flex h-5 w-6 shrink-0 items-center justify-center text-[#0A0847]">
        <Icon size={18} aria-hidden />
      </span>
      <span className="ml-2 text-[14px] font-semibold leading-5 text-[#0A0847CC]">
        {type.label}
      </span>
    </label>
  );
}

function MethodCard({ title, description, icon, iconColor, active, children }) {
  return (
    <div
      className={`flex h-[374px] flex-col items-center rounded-lg border bg-[#F9F8FD] px-5 pt-12 pb-[22px] text-center ${
        active ? "border-[#0A54AB]" : "border-[#E4DFFA]"
      }`}
    >
      <div
        className="flex h-[60px] items-center justify-center"
        style={{ color: iconColor }}
      >
        {icon}
      </div>
      <h3 className="mt-5 text-[16px] font-semibold leading-4 text-[#0A0847CC]">
        {title}
      </h3>
      <p className="mt-3 w-[200px] text-[14px] font-medium leading-[21px] text-[#0A0847CC]">
        {description}
      </p>
      <div className="mt-auto flex w-full flex-col gap-4">{children}</div>
    </div>
  );
}

/* ==========================================================================
   PAGE
   ========================================================================== */
export default function AddQuizQuestions() {
  const [questionType, setQuestionType] = useState("multiple-choice");
  const selectedType = QUESTION_TYPES.find((type) => type.id === questionType);

  return (
    <div className="min-h-screen bg-[#F8F9FE] font-[Inter] text-[#0A0847]">
      <div className="max-w-[1067px] px-5 py-6">
        {/* header */}
        <Breadcrumb />

        <div className="mt-2.5 flex flex-col gap-[15px]">
          <h1 className="text-[22px] font-semibold leading-[27px] text-[#0A0847]">
            Add Quiz Questions
          </h1>
          <p className="text-[16px] font-medium leading-[19px] text-[#0A084799]">
            Engage and track activities for each chapter.
          </p>
        </div>

        <div className="mt-5">
          <LocationChip />
        </div>

        {/* section 1 */}
        <section className="mt-5 rounded-lg border border-[#E2DFFC] bg-white px-[33px] py-[29px]">
          <SectionHeader
            title="1. Choose Question Type"
            required
            subtitle="Engage and track activities for each chapter."
          />

          <div className="mt-9 w-full sm:w-[540px]">
            <div className="relative flex h-[39px] w-full items-center rounded-lg border border-[#0A0847] bg-white pl-[23px]">
              <span
                className={`text-[14px] font-medium ${
                  selectedType ? "text-[#0A0847CC]" : "text-[#0A084799]"
                }`}
              >
                {selectedType ? selectedType.label : "Select Question Type"}
              </span>
              <LuChevronDown
                size={14}
                aria-hidden
                className="pointer-events-none absolute top-1/2 right-[19px] -translate-y-1/2 text-[#0A0847]"
              />
            </div>

            <div className="mt-0.5 overflow-hidden rounded-lg border border-[#E2DFFC] bg-white pt-2.5 pb-[13px]">
              {QUESTION_TYPES.map((type) => (
                <QuestionTypeRow
                  key={type.id}
                  type={type}
                  selected={questionType === type.id}
                  onSelect={setQuestionType}
                />
              ))}
            </div>
          </div>
        </section>

        {/* section 2 */}
        <section className="mt-6 rounded-lg border border-[#E2DFFC] bg-white px-[33px] py-[29px]">
          <SectionHeader
            title="2. Choose How to Add Questions"
            subtitle="You can add questions manually, upload from a file, or generate with AI."
          />

          <div className="mt-10 grid grid-cols-1 gap-[25px] lg:grid-cols-3">
            <MethodCard
              title="AI Generation"
              description="Generate questions automatically using AI assistant"
              icon={<SparklesIcon size={60} />}
              iconColor="#4B1ECB"
            >
              <button
                type="button"
                className="h-[47px] w-full cursor-pointer rounded-lg bg-[#4B1ECB] text-[14px] font-semibold text-white transition-colors hover:bg-[#3F17AD]"
              >
                Run AI Generate ✨
              </button>
            </MethodCard>

            <MethodCard
              title="Manual or File Upload"
              description="Add questions manually or upload questions from a file"
              icon={<LuPencil size={46} strokeWidth={1.6} aria-hidden />}
              iconColor="#189227"
            >
              <button
                type="button"
                className="h-[47px] w-full cursor-pointer rounded-lg bg-[#189227] text-[14px] font-semibold text-white transition-colors hover:bg-[#137A20]"
              >
                Add Manually
              </button>
            </MethodCard>

            <MethodCard
              title="Bulk Upload (CSV)"
              description="Upload a CSV file with your quiz questions"
              icon={<CsvFileIcon size={62} />}
              iconColor="#0A54AB"
              active
            >
              <button
                type="button"
                className="flex h-[42px] w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-[#0A54AB] bg-white text-[14px] font-semibold text-[#0A54AB] transition-colors hover:bg-[#0A54AB]/5"
              >
                <LuDownload size={12} aria-hidden />
                Download Template
              </button>
              <button
                type="button"
                className="flex h-[42px] w-full cursor-pointer items-center justify-center rounded-lg border border-[#0A54AB] bg-white text-[14px] font-semibold text-[#0A54AB] transition-colors hover:bg-[#0A54AB]/5"
              >
                Upload CSV
              </button>
            </MethodCard>
          </div>
        </section>
      </div>
    </div>
  );
}