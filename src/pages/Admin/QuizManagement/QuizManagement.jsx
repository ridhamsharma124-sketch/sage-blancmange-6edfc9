import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LuChevronDown,
  LuCircleHelp,
  LuCopy,
  LuEllipsisVertical,
  LuEye,
  LuFileSearch,
  LuFilter,
  LuHeadphones,
  LuInfo,
  LuPencil,
  LuPlus,
  LuSave,
  LuScrollText,
  LuSearch,
  LuSettings,
  LuSparkles,
  LuTrash2,
  LuUpload,
} from "react-icons/lu";
import bibleVerseImg from "../../../assets/Bible Verse img.png";

/* ==========================================================================
   STYLE TOKENS
   ========================================================================== */
const PANEL = "rounded-[7.5px] border-[0.75px] border-[#E2DFFC] bg-white";
const CARD = "rounded-[8px] border border-[#E2DFFC] bg-white";
const OUTLINE_BTN =
  "flex cursor-pointer items-center rounded-[6px] border border-[#1E1B4B] bg-white text-[14px] font-semibold text-[#1E1B4B]";

const nextId = () => Date.now();

/* ==========================================================================
   MOCK DATA
   ========================================================================== */
const LOCATION_SELECTORS = [
  { step: "1", label: "Testament", value: "Old Testament" },
  { step: "2", label: "Book", value: "Genesis" },
  { step: "3", label: "Chapter", value: "Chapter 1" },
];

const ACTIVITY_CARDS = [
  {
    title: "Quiz",
    description: "Test knowledge with different question types.",
    count: "42 Questions",
    tileBg: "#F0E6FA",
    iconColor: "#7B3FC4",
    Glyph: LuCircleHelp,
  },
  {
    title: "Word Search",
    description: "Find hidden words from the chapter.",
    count: "12 Puzzles",
    tileBg: "#E6F6EA",
    iconColor: "#2E9E3E",
    Glyph: LuFileSearch,
  },
  {
    title: "Audio Stories",
    description: "Listen to engaging Bible stories.",
    count: "5 Stories",
    tileBg: "#E0F6F8",
    iconColor: "#1E88C7",
    Glyph: LuHeadphones,
  },
  {
    title: "Memory Verses",
    description: "Learn and memorize key Bible verses.",
    count: "8 Verses",
    tileBg: "#FBEBDD",
    iconColor: "#D9722B",
    Glyph: LuScrollText,
  },
];

const LEVEL_TABS = [
  { line1: "Level 1", line2: "( 12 Qs)", count: 12, active: true },
  { line1: "Level 2", line2: "(12 Qs)", count: 12, active: false },
  { line1: "Level 3", line2: "(12 Qs)", count: 12, active: false },
  { line1: "Level 4", line2: "6 Qs", count: 6, active: false },
];

const TYPE_PILL = {
  "Multiple Choice": { bg: "#F0E6FA", border: "#D9C5F0", fg: "#6B2FB3" },
  "Fill in the Blank": { bg: "#E6F6EA", border: "#BFE3C7", fg: "#2E9E3E" },
  "True / False": { bg: "#E3F2FB", border: "#BFDDF2", fg: "#1E88C7" },
  "Tap in Order": { bg: "#FBEBDD", border: "#F2CFB0", fg: "#D9722B" },
  "Who Am I": { bg: "#F0E6FA", border: "#D9C5F0", fg: "#6B2FB3" },
};

const DIFFICULTY = {
  Easy: { bg: "#E6F6EA", fg: "#2E9E3E" },
  Medium: { bg: "#FBEBDD", fg: "#D9722B" },
  Hard: { bg: "#FBE3E8", fg: "#D1264A" },
};

const STATUS = {
  Published: { bg: "#E6F6EA", fg: "#2E9E3E" },
  Draft: { bg: "#FBEBDD", fg: "#D9722B" },
};

const TABLE_ROWS = [
  {
    id: 1,
    level: 1,
    question: "What did the serpent say to the woman in the garden?",
    type: "Multiple Choice",
    verse: "Genesis 3:1",
    difficulty: "Easy",
    status: "Published",
  },
  {
    id: 2,
    level: 1,
    question: "Fill in the blank: The woman saw that the tree was ______",
    type: "Fill in the Blank",
    verse: "Genesis 3:6",
    difficulty: "Medium",
    status: "Published",
  },
  {
    id: 3,
    level: 1,
    question: "Is it true that Adam blamed Eve for eating the fruit?",
    type: "True / False",
    verse: "Genesis 3:12",
    difficulty: "Easy",
    status: "Published",
  },
  {
    id: 4,
    level: 1,
    question:
      "Place the events in order: 1. Serpent talks to Eve, 2. Eve eats the fruit, 3. Adam eats the fruit",
    type: "Tap in Order",
    verse: "Genesis 3:1–6",
    difficulty: "Hard",
    status: "Draft",
  },
  {
    id: 5,
    level: 1,
    question: "Who am I? I was created from Adam's rib.",
    type: "Who Am I",
    verse: "Genesis 2:22",
    difficulty: "Easy",
    status: "Published",
  },
];

const COLUMNS = [
  { key: "id", label: "#", width: "5%" },
  { key: "question", label: "Question", width: "22%" },
  { key: "type", label: "Type", width: "13%" },
  { key: "verse", label: "Bible Verse", width: "14%" },
  { key: "difficulty", label: "Difficulty", width: "12%" },
  { key: "image", label: "Image", width: "11%" },
  { key: "status", label: "Status", width: "12%" },
  { key: "actions", label: "Actions", width: "11%" },
];

/* ==========================================================================
   SMALL BUILDING BLOCKS
   ========================================================================== */
function Select({
  value,
  className = "",
  radius = "rounded-[8px]",
  options = [],
  onChange,
  fit = false,
}) {
  const selectProps = onChange ? { value, onChange } : { defaultValue: value };
  const sizeClass = fit
    ? "w-auto max-w-full text-[11px] pl-[12px] pr-[12px]"
    : "w-full text-[14px] pl-[14px] pr-[34px]";

  return (
    <div className={`relative ${className}`}>
      <select
        aria-label={value}
        className={`h-full cursor-pointer appearance-none border border-[#E2DFFC] bg-white whitespace-nowrap text-[#1E1B4B] outline-none ${sizeClass} ${radius}`}
        {...selectProps}
      >
        {options.length > 0 ? (
          options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))
        ) : (
          <option value={value}>{value}</option>
        )}
      </select>
      <LuChevronDown
        size={fit ? 10 : 15}
        className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-[#1E1B4B] ${
          fit ? "right-[2px]" : "right-[12px]"
        }`}
      />
    </div>
  );
}

function Toggle() {
  return (
    <span className="flex h-[18px] w-[34px] shrink-0 items-center rounded-full bg-[#1565C0] px-[2px]">
      <span className="h-[14px] w-[14px] translate-x-[16px] rounded-full bg-white" />
    </span>
  );
}

function StatBlock({ label, value, withInfo = false }) {
  return (
    <div className="flex flex-col gap-[6px]">
      <span className="flex items-center gap-[5px] text-[12px] text-[#6B6F8D]">
        {label}
        {withInfo && <LuInfo size={13} className="text-[#6B6F8D]" />}
      </span>
      <span className="text-[16px] font-bold text-[#1E1B4B]">{value}</span>
    </div>
  );
}

function ActionTile({ className, icon, title, caption, titleClass, captionClass, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-auto min-h-[58px] w-[145px] cursor-pointer flex-col justify-center rounded-[6px] border px-[10px] py-[8px] text-left ${className}`}
    >
      <span className={`flex items-center gap-[6px] text-[12px] font-semibold ${titleClass}`}>
        {icon}
        {title}
      </span>
      <span className={`mt-[4px] text-[10px] italic ${captionClass}`}>{caption}</span>
    </button>
  );
}

/* ==========================================================================
   PAGE
   ========================================================================== */
export default function QuizManagement() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState(TABLE_ROWS);
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [selectedQuestionId, setSelectedQuestionId] = useState(TABLE_ROWS[0]?.id ?? null);
  const [openMenu, setOpenMenu] = useState(null);
  const [page, setPage] = useState(1);
  const [correctOption, setCorrectOption] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [questionTypeFilter, setQuestionTypeFilter] = useState("All Question Types");
  const [difficultyFilter, setDifficultyFilter] = useState("All Difficulties");
  const [statusFilter, setStatusFilter] = useState("All Status");

  useEffect(() => {
    const handleOutsideClick = () => setOpenMenu(null);
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  const filteredQuestions = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();

    return questions.filter((question) => {
      const matchesSearch =
        !query ||
        question.question.toLowerCase().includes(query) ||
        question.verse.toLowerCase().includes(query);
      const matchesType =
        questionTypeFilter === "All Question Types" || question.type === questionTypeFilter;
      const matchesDifficulty =
        difficultyFilter === "All Difficulties" || question.difficulty === difficultyFilter;
      const matchesStatus = statusFilter === "All Status" || question.status === statusFilter;

      return matchesSearch && matchesType && matchesDifficulty && matchesStatus;
    });
  }, [questions, searchTerm, questionTypeFilter, difficultyFilter, statusFilter]);

  const currentLevelQuestions = questions.filter((question) => question.level === selectedLevel);
  const selectedQuestion =
    questions.find((question) => question.id === selectedQuestionId) ?? currentLevelQuestions[0];

  const handleAddQuestion = () => {
    const nextLevelId = nextId();
    const newQuestion = {
      id: nextLevelId,
      level: selectedLevel,
      question: "New custom question for this level.",
      type: "Multiple Choice",
      verse: "Genesis 1:1",
      difficulty: "Easy",
      status: "Draft",
    };

    setQuestions((current) => [newQuestion, ...current]);
    setSelectedQuestionId(nextLevelId);
  };

  const handleDuplicateQuestion = (questionId) => {
    const target = questions.find((question) => question.id === questionId);
    if (!target) return;

    const duplicate = {
      ...target,
      id: nextId(),
      question: `${target.question} (Copy)`,
      status: "Draft",
    };

    setQuestions((current) => [duplicate, ...current]);
    setSelectedQuestionId(duplicate.id);
    setOpenMenu(null);
  };

  const handleDeleteQuestion = (questionId) => {
    setQuestions((current) => current.filter((question) => question.id !== questionId));
    setOpenMenu(null);

    const remaining = questions.filter((question) => question.id !== questionId);
    if (remaining.length > 0) {
      setSelectedQuestionId(remaining[0].id);
    }
  };

  const handlePublish = () => {
    setQuestions((current) =>
      current.map((question) =>
        question.level === selectedLevel ? { ...question, status: "Published" } : question,
      ),
    );
  };

  return (
    <div className="min-h-screen w-full bg-[#F8F8FF] p-6 font-inter">
      {/* ================= HEADER ROW ================= */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[24px] font-bold text-[#1E1B4B]">Bible Book Activities Manager</h1>
          <p className="mt-[8px] text-[15px] text-[#6B6F8D]">
            Manage questions and activities for each chapter.
          </p>
        </div>

        <div className="flex items-center gap-[14px]">
          <button
            type="button"
            className={`${OUTLINE_BTN} h-[40px] gap-[8px] px-[18px]`}
          >
            <LuEye size={17} strokeWidth={1.8} />
            Preview as User
          </button>
          <button
            type="button"
            className="flex h-[40px] cursor-pointer items-center gap-[8px] rounded-[8px] bg-[#00007A] px-[18px] text-[14px] font-semibold text-white"
            onClick={handlePublish}
          >
            <LuSave size={17} strokeWidth={1.8} />
            Publish Topic
          </button>
        </div>
      </div>

      {/* ================= LOCATION ROW ================= */}
      <div className="mt-[24px] flex gap-[18px]">
        {/* left location card */}
        <div className={`flex h-[93px] min-w-0 flex-[727_1_0px] items-center ${PANEL}`}>
          {LOCATION_SELECTORS.map((s, i) => (
            <div key={s.step} className="flex h-full flex-1 items-center">
              {i > 0 && <span className="h-full w-px bg-[#E2DFFC]" />}
              <div className="flex flex-1 items-center gap-[10px] px-[16px]">
                <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[#00007A] text-[10px] font-bold text-white">
                  {s.step}
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="text-[11px] text-[#6B6F8D]">{s.label}</span>
                  <span className="text-[18px] font-bold text-[#1E1B4B]">{s.value}</span>
                </span>
                <LuChevronDown size={16} className="ml-auto shrink-0 text-[#1E1B4B]" />
              </div>
            </div>
          ))}
        </div>

        {/* right Select Location card */}
        <div className={`flex h-[93px] min-w-0 flex-[321_1_0px] flex-col gap-[8px] p-[16px] ${PANEL}`}>
          <p className="text-[14px] font-semibold text-[#1E1B4B]">Select Location</p>
          <p className="text-[13px] text-[#6B6F8D]">
            Bible Content &gt; <span className="font-bold text-[#1E1B4B]">Genesis</span> &gt;{" "}
            <span className="font-bold text-[#1E1B4B]">Chapter 1</span> &gt; Quiz
          </p>
          <p className="text-[13px] text-[#6B6F8D]">
            Total Activities: <span className="font-bold text-[#1E1B4B]">4</span> • Total Questions:{" "}
            <span className="font-bold text-[#1E1B4B]">42</span>
          </p>
        </div>
      </div>

      {/* ================= TWO COLUMNS ================= */}
      <div className="mt-[24px] flex gap-[18px]">
        {/* ============ LEFT COLUMN ============ */}
        <div className="flex min-w-0 flex-[726_1_0px] flex-col">
          {/* ---------- Section A : Chapter Activities ---------- */}
          <div className="flex flex-col">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-[16px] font-semibold text-[#1E1B4B]">Chapter Activities</h2>
                <p className="mt-[6px] text-[13px] text-[#6B6F8D]">
                  Enable or disable activities for this chapter.
                </p>
              </div>
              <button type="button" className={`${OUTLINE_BTN} h-[40px] px-[20px]`}>
                Manage All Activities
              </button>
            </div>

            <div className="mt-[16px] grid grid-cols-4 gap-[14px]">
              {ACTIVITY_CARDS.map((a) => (
                <div
                  key={a.title}
                  className="flex min-h-[111px] flex-col gap-[10px] rounded-[8px] border border-[#E2DFFC] bg-white p-[8px]"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-[10px]">
                      <span
                        className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-[8px]"
                        style={{ background: a.tileBg }}
                      >
                        <a.Glyph size={19} style={{ color: a.iconColor }} />
                      </span>
                      <span className="text-[14px] font-semibold text-[#1E1B4B]">{a.title}</span>
                    </div>
                    <Toggle />
                  </div>

                  <p className="text-[11px] leading-[1.3] text-[#6B6F8D]">{a.description}</p>

                  <p className="mt-auto text-[11px] italic text-[#6B6F8D]">{a.count}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ---------- Section B : Quiz Level Manager ---------- */}
          <div
            className={`mt-[24px] flex min-h-[1028px] flex-1 flex-col gap-[14px] p-[20px] ${CARD}`}
          >
            <div>
              <h2 className="text-[16px] font-semibold text-[#1E1B4B]">Quiz Level Manager</h2>
              <p className="mt-[6px] text-[13px] text-[#6B6F8D]">
                Each level contains many questions. Three questions will appear to users per level.
              </p>
            </div>

            {/* stats row */}
            <div className="flex items-center">
              <StatBlock
                label={`Questions in Level ${selectedLevel}`}
                value={String(LEVEL_TABS[selectedLevel - 1]?.count ?? 0)}
              />
              <span className="mx-[24px] h-[34px] w-px bg-[#E2DFFC]" />
              <StatBlock label={`Questions in Level ${selectedLevel}`} value="3" withInfo />
              <button
                type="button"
                className={`${OUTLINE_BTN} ml-auto h-[40px] gap-[8px] px-[22px]`}
              >
                <LuSettings size={16} strokeWidth={1.8} />
                Level Settings
              </button>
            </div>

            {/* level tabs */}
            <div className="flex gap-[12px]">
              {LEVEL_TABS.map((tab) => {
                const isActive = LEVEL_TABS.indexOf(tab) + 1 === selectedLevel;

                return (
                  <button
                    key={tab.line1}
                    type="button"
                    onClick={() => {
                      const nextLevel = LEVEL_TABS.indexOf(tab) + 1;
                      setSelectedLevel(nextLevel);
                      setOpenMenu(null);
                      const firstQuestion = questions.find((question) => question.level === nextLevel);
                      if (firstQuestion) setSelectedQuestionId(firstQuestion.id);
                    }}
                    className={`flex h-[44px] cursor-pointer flex-col items-center justify-center rounded-[8px] px-[14px] text-[14px] font-medium leading-[1.2] ${
                      isActive
                        ? "bg-[#00007A] text-white"
                        : "border border-[#E2DFFC] bg-[#F3F4FC] text-[#1E1B4B]"
                    }`}
                  >
                    <span>{tab.line1}</span>
                    <span>{tab.line2}</span>
                  </button>
                );
              })}
              <button
                type="button"
                className="flex h-[44px] w-[135px] cursor-pointer items-center justify-center gap-[8px] rounded-[8px] border-[1.5px] border-dashed border-[#00007A] bg-transparent text-[14px] text-[#1E1B4B]"
              >
                <LuPlus size={16} strokeWidth={2} />
                Add Level
              </button>
            </div>

            {/* ---------- inner card : Questions in Level 1 ---------- */}
            <div className={`flex flex-1 flex-col gap-[14px] p-[20px] ${CARD}`}>
              {/* header */}
              <div className="flex items-start justify-between gap-[10px]">
                <div className="min-w-0 max-w-[300px] flex-1">
                  <h3 className="text-[16px] font-semibold text-[#1E1B4B]">
                    Questions in Level {selectedLevel}
                  </h3>
                  <p className="mt-[6px] text-[13px] leading-[1.4] text-[#6B6F8D]">
                    Manage questions for this level. Only 3 random questions will be shown to users.
                  </p>
                </div>

                <div className="ml-auto flex shrink-0 gap-[10px]">
                  <ActionTile
                    className="border-[#BFE3C7] bg-[#E8F6EC]"
                    icon={<LuPlus size={14} strokeWidth={2.2} />}
                    title="+ Add Question"
                    caption="Add one question at a time"
                    titleClass="text-[#2E9E3E]"
                    captionClass="text-[#6B6F8D]"
                    onClick={handleAddQuestion}
                  />
                  <ActionTile
                    className="border-[#D5DBF5] bg-[#EEF1FB]"
                    icon={<LuUpload size={14} strokeWidth={2} />}
                    title="Bulk Upload"
                    caption="Add one question at a time"
                    titleClass="text-[#1E1B4B]"
                    captionClass="text-[#6B6F8D]"
                  />
                  <ActionTile
                    className="border-[#00007A] bg-[#00007A]"
                    icon={<LuSparkles size={14} strokeWidth={2} />}
                    title="Generate AI Image"
                    caption="Create new questions & images"
                    titleClass="text-white"
                    captionClass="text-white/80"
                    onClick={() => navigate("/admin/quiz-management/ai-generator")}
                  />
                </div>
              </div>

              {/* divider */}
              <div className="h-px w-full bg-[#EEF0F8]" />

              {/* filter row */}
              <div className="flex min-h-[44px] flex-wrap items-center gap-[12px]">
                <div className="relative h-full min-w-[175px] max-w-[210px] flex-1">
                  <LuSearch
                    size={15}
                    className="pointer-events-none absolute top-1/2 left-[12px] -translate-y-1/2 text-[#6B6F8D]"
                  />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search questions..."
                    className="h-full w-full rounded-[4px] border border-[#E2DFFC] bg-white pr-[12px] pl-[34px] text-[14px] text-[#1E1B4B] outline-none placeholder:text-[#6B6F8D]"
                  />
                </div>

                <Select
                  fit
                  value={questionTypeFilter}
                  className="h-full shrink-0"
                  options={[
                    { value: "All Question Types", label: "All Question Types" },
                    { value: "Multiple Choice", label: "Multiple Choice" },
                    { value: "Fill in the Blank", label: "Fill in the Blank" },
                    { value: "True / False", label: "True / False" },
                    { value: "Tap in Order", label: "Tap in Order" },
                    { value: "Who Am I", label: "Who Am I" },
                  ]}
                  onChange={(event) => setQuestionTypeFilter(event.target.value)}
                />
                <Select
                  fit
                  value={difficultyFilter}
                  className="h-full shrink-0"
                  options={[
                    { value: "All Difficulties", label: "All Difficulties" },
                    { value: "Easy", label: "Easy" },
                    { value: "Medium", label: "Medium" },
                    { value: "Hard", label: "Hard" },
                  ]}
                  onChange={(event) => setDifficultyFilter(event.target.value)}
                />
                <Select
                  fit
                  value={statusFilter}
                  className="h-full shrink-0"
                  options={[
                    { value: "All Status", label: "All Status" },
                    { value: "Published", label: "Published" },
                    { value: "Draft", label: "Draft" },
                  ]}
                  onChange={(event) => setStatusFilter(event.target.value)}
                />

                <button
                  type="button"
                  className="flex h-full shrink-0 cursor-pointer items-center gap-[7px] rounded-[8px] border border-[#D5DBF5] bg-[#E6E8F7] px-[14px] text-[14px] font-semibold whitespace-nowrap text-[#1E1B4B]"
                >
                  <LuFilter size={15} strokeWidth={2} />
                  Filters
                </button>
              </div>

              {/* ---------- table ---------- */}
              <table className="w-full table-fixed border-collapse">
                <colgroup>
                  {COLUMNS.map((c) => (
                    <col key={c.key} style={{ width: c.width }} />
                  ))}
                </colgroup>

                <thead>
                  <tr>
                    {COLUMNS.map((c) => (
                      <th
                        key={c.key}
                        className="h-[48px] bg-[#F3F4FC] px-[8px] text-left text-[14px] font-semibold whitespace-nowrap text-[#1E1B4B] first:rounded-l-[6px] last:rounded-r-[6px]"
                      >
                        {c.label}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {filteredQuestions.length > 0 ? (
                    filteredQuestions.map((r) => {
                      const type = TYPE_PILL[r.type];
                      const diff = DIFFICULTY[r.difficulty];
                      const st = STATUS[r.status];
                      return (
                        <tr
                          key={r.id}
                          className={`cursor-pointer transition-colors ${
                            selectedQuestionId === r.id ? "bg-[#F5F3FF]" : "bg-white"
                          }`}
                          onClick={() => setSelectedQuestionId(r.id)}
                        >
                          <td className="h-[94px] border-b border-[#EEF0F8] px-[8px] text-center text-[14px] text-[#1E1B4B]">
                            {r.id}
                          </td>
                          <td className="h-[94px] border-b border-[#EEF0F8] px-[8px] text-[12px] text-[#1E1B4B]">
                            {r.question}
                          </td>
                          <td className="h-[94px] border-b border-[#EEF0F8] px-[8px]">
                            <span
                              className="inline-block rounded-[6px] border px-[6px] py-[4px] text-[11px] font-medium"
                              style={{
                                background: type.bg,
                                borderColor: type.border,
                                color: type.fg,
                              }}
                            >
                              {r.type}
                            </span>
                          </td>
                          <td className="h-[94px] border-b border-[#EEF0F8] px-[8px] text-[12px] whitespace-nowrap text-[#1E1B4B]">
                            {r.verse}
                          </td>
                          <td className="h-[94px] border-b border-[#EEF0F8] px-[8px] whitespace-nowrap">
                            <span
                              className="inline-block rounded-[6px] px-[6px] py-[4px] text-[11px] font-medium"
                              style={{ background: diff.bg, color: diff.fg }}
                            >
                              {r.difficulty}
                            </span>
                          </td>
                          <td className="h-[94px] border-b border-[#EEF0F8] px-[3px]">
                            <img
                              src={bibleVerseImg}
                              alt="Question illustration"
                              className="h-[44px] w-[64px] max-w-none rounded-[6px] object-cover"
                            />
                          </td>
                          <td className="h-[94px] border-b border-[#EEF0F8] px-[8px] whitespace-nowrap">
                            <span
                              className="inline-block rounded-[6px] px-[6px] py-[4px] text-[11px] font-medium"
                              style={{ background: st.bg, color: st.fg }}
                            >
                              {r.status}
                            </span>
                          </td>
                          <td className="h-[94px] border-b border-[#EEF0F8] px-[8px]">
                            <div className="relative flex justify-center">
                              <button
                                type="button"
                                aria-label="Row actions"
                                onClick={(event) => {
                                  event.stopPropagation();
                                  setOpenMenu(openMenu === r.id ? null : r.id);
                                }}
                                className="flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-[6px] bg-[#E6E8F7]"
                              >
                                <LuEllipsisVertical size={17} className="text-[#1E1B4B]" />
                              </button>

                              {openMenu === r.id && (
                                <div className="absolute top-[36px] right-0 z-20 flex w-[120px] flex-col gap-[10px] rounded-[8px] border border-[#E2DFFC] bg-white p-[6px]">
                                  <button
                                    type="button"
                                    className="flex cursor-pointer items-center gap-[8px] text-[13px] text-[#1E1B4B]"
                                    onClick={(event) => {
                                      event.stopPropagation();
                                      setSelectedQuestionId(r.id);
                                      setOpenMenu(null);
                                    }}
                                  >
                                    <LuPencil size={14} strokeWidth={1.8} />
                                    Edit
                                  </button>
                                  <button
                                    type="button"
                                    className="flex cursor-pointer items-center gap-[8px] text-[13px] text-[#1E1B4B]"
                                    onClick={(event) => {
                                      event.stopPropagation();
                                      handleDuplicateQuestion(r.id);
                                    }}
                                  >
                                    <LuCopy size={14} strokeWidth={1.8} />
                                    Duplicate
                                  </button>
                                  <button
                                    type="button"
                                    className="flex cursor-pointer items-center gap-[8px] text-[13px] text-[#D1264A]"
                                    onClick={(event) => {
                                      event.stopPropagation();
                                      handleDeleteQuestion(r.id);
                                    }}
                                  >
                                    <LuTrash2 size={14} strokeWidth={1.8} />
                                    Delete
                                  </button>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={COLUMNS.length} className="py-[20px] text-center text-[14px] text-[#6B6F8D]">
                        No questions match your current filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* ---------- pagination row (outside the card) ---------- */}
            <div className="flex items-center justify-between text-[14px] text-[#1E1B4B]">
              <div className="flex items-center gap-[8px]">
                <span>Display</span>
                <div className="h-[32px] w-[66px]">
                  <Select value="10" />
                </div>
                <span>questions.</span>
              </div>

              <div className="flex items-center gap-[6px]">
                <button
                  type="button"
                  aria-label="Previous page"
                  disabled={page === 1}
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                  className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[6px] border border-[#E2DFFC] bg-white text-[14px] text-[#1E1B4B] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {"<"}
                </button>
                {[1, 2, 3, 4, 5].map((pageNumber) => (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() => setPage(pageNumber)}
                    className={`flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[6px] text-[14px] ${
                      page === pageNumber
                        ? "bg-[#00007A] font-semibold text-white"
                        : "border border-[#E2DFFC] bg-white text-[#1E1B4B]"
                    }`}
                  >
                    {pageNumber}
                  </button>
                ))}
                <button
                  type="button"
                  aria-label="Next page"
                  disabled={page === 5}
                  onClick={() => setPage((current) => Math.min(5, current + 1))}
                  className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[6px] border border-[#E2DFFC] bg-white text-[14px] text-[#1E1B4B] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {">"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ============ RIGHT COLUMN ============ */}
        <div className="min-w-0 flex-[321_1_0px]">
          <div className={`flex h-full flex-col gap-[10px] p-[16px] ${PANEL}`}>
            <p className="text-[16px] font-semibold text-[#1E1B4B]">Question Details</p>
            <p className="text-[13px] text-[#6B6F8D]">Edit the selected question.</p>
            <div className="h-[100px]" />
            {selectedQuestion ? (
              <div className="space-y-[16px]">
                <div className="space-y-[10px]">
                  <label className="block text-[13px] font-medium text-[#1E1B4B]">
                    Question Type
                  </label>
                  <div className="relative">
                    <select
                      value={selectedQuestion.type}
                      onChange={(event) => {
                        setQuestions((current) =>
                          current.map((question) =>
                            question.id === selectedQuestion.id
                              ? { ...question, type: event.target.value }
                              : question,
                          ),
                        );
                      }}
                      className="h-[40px] w-full appearance-none rounded-[8px] border border-[#D7D9ED] bg-white pl-[12px] pr-[32px] text-[14px] text-[#1E1B4B] outline-none"
                    >
                      {Object.keys(TYPE_PILL).map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    <LuChevronDown className="pointer-events-none absolute top-1/2 right-[10px] -translate-y-1/2 text-[#1E1B4B]" size={15} />
                  </div>
                </div>

                <div className="space-y-[8px]">
                  <label className="block text-[13px] font-medium text-[#1E1B4B]">Question Text *</label>
                  <textarea
                    value={selectedQuestion.question}
                    onChange={(event) => {
                      setQuestions((current) =>
                        current.map((question) =>
                          question.id === selectedQuestion.id
                            ? { ...question, question: event.target.value }
                            : question,
                        ),
                      );
                    }}
                    rows={3}
                    className="w-full resize-none rounded-[8px] border border-[#D7D9ED] bg-white p-[12px] text-[14px] text-[#1E1B4B] outline-none"
                  />
                  <div className="flex justify-end text-[11px] italic text-[#6B6F8D]">0 / 500</div>
                </div>

                <div className="space-y-[10px]">
                  <label className="block text-[13px] font-medium text-[#1E1B4B]">Options *</label>
                  <div className="space-y-[10px]">
                    {[
                      "A. You will surely die.",
                      "B. You will not surely die.",
                      "C. God is watching you.",
                      "D. This fruit is not for you.",
                    ].map((option, index) => (
                      <div key={option} className="flex items-center gap-[8px]">
                        <button
                          type="button"
                          role="radio"
                          aria-checked={correctOption === index}
                          aria-label={option}
                          onClick={() => setCorrectOption(index)}
                          className={`flex h-[16px] w-[16px] shrink-0 cursor-pointer items-center justify-center rounded-full border-2 ${
                            correctOption === index
                              ? "border-[#2EAF4B]"
                              : "border-[#1E1B4B]"
                          }`}
                        >
                          {correctOption === index && (
                            <span className="h-[8px] w-[8px] rounded-full bg-[#2EAF4B]" />
                          )}
                        </button>
                        <div className="flex flex-1 items-center gap-[8px] rounded-[8px] border border-[#D7D9ED] bg-white px-[10px] py-[8px]">
                          <span className="text-[13px] text-[#1E1B4B]">{option}</span>
                        </div>
                        <button type="button" className="flex h-[30px] w-[30px] items-center justify-center rounded-[6px] border border-[#F4D0D9] bg-[#FFF1F4] text-[#D1264A]">
                          <LuTrash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button type="button" className="flex items-center gap-[6px] text-[13px] font-semibold text-[#1E1B4B]">
                    <span className="text-[16px]">+</span> Add Option
                  </button>
                </div>

                <div className="space-y-[8px]">
                  <label className="block text-[13px] font-medium text-[#1E1B4B]">Correct Answer</label>
                  <div className="relative">
                    <select
                      defaultValue="B"
                      className="h-[40px] w-full appearance-none rounded-[8px] border border-[#D7D9ED] bg-white pl-[12px] pr-[32px] text-[14px] text-[#1E1B4B] outline-none"
                    >
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                    </select>
                    <LuChevronDown className="pointer-events-none absolute top-1/2 right-[10px] -translate-y-1/2 text-[#1E1B4B]" size={15} />
                  </div>
                </div>

                <div className="space-y-[8px]">
                  <label className="block text-[13px] font-medium text-[#1E1B4B]">Explanation</label>
                  <textarea
                    rows={3}
                    defaultValue="The serpent told Eve that she would not surely die if she ate the fruit."
                    className="w-full resize-none rounded-[8px] border border-[#D7D9ED] bg-white p-[12px] text-[14px] text-[#1E1B4B] outline-none"
                  />
                  <div className="flex justify-end text-[11px] italic text-[#6B6F8D]">72 / 500</div>
                </div>

                <div className="space-y-[8px]">
                  <label className="block text-[13px] font-medium text-[#1E1B4B]">Bible Verse</label>
                  <div className="flex items-center rounded-[8px] border border-[#D7D9ED] bg-white px-[12px] py-[10px] text-[14px] text-[#1E1B4B]">
                    Genesis 3:4
                  </div>
                </div>

                <div className="space-y-[8px]">
                  <label className="block text-[13px] font-medium text-[#1E1B4B]">Note</label>
                  <textarea
                    rows={3}
                    defaultValue="The serpent tried to make Eve doubt God's warning."
                    className="w-full resize-none rounded-[8px] border border-[#D7D9ED] bg-white p-[12px] text-[14px] text-[#1E1B4B] outline-none"
                  />
                  <div className="flex justify-end text-[11px] italic text-[#6B6F8D]">49 / 200</div>
                </div>

                <div className="grid grid-cols-2 gap-[12px]">
                  <div className="space-y-[8px]">
                    <label className="block text-[13px] font-medium text-[#1E1B4B]">Difficulty</label>
                    <div className="relative">
                      <select
                        value={selectedQuestion.difficulty}
                        onChange={(event) => {
                          setQuestions((current) =>
                            current.map((question) =>
                              question.id === selectedQuestion.id
                                ? { ...question, difficulty: event.target.value }
                                : question,
                            ),
                          );
                        }}
                        className="h-[40px] w-full appearance-none rounded-[8px] border border-[#D7D9ED] bg-white pl-[12px] pr-[32px] text-[14px] text-[#1E1B4B] outline-none"
                      >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                      </select>
                      <LuChevronDown className="pointer-events-none absolute top-1/2 right-[10px] -translate-y-1/2 text-[#1E1B4B]" size={15} />
                    </div>
                  </div>

                  <div className="space-y-[8px]">
                    <label className="block text-[13px] font-medium text-[#1E1B4B]">Status</label>
                    <div className="relative">
                      <select
                        value={selectedQuestion.status}
                        onChange={(event) => {
                          setQuestions((current) =>
                            current.map((question) =>
                              question.id === selectedQuestion.id
                                ? { ...question, status: event.target.value }
                                : question,
                            ),
                          );
                        }}
                        className="h-[40px] w-full appearance-none rounded-[8px] border border-[#D7D9ED] bg-white pl-[12px] pr-[32px] text-[14px] text-[#1E1B4B] outline-none"
                      >
                        <option value="Published">Published</option>
                        <option value="Draft">Draft</option>
                      </select>
                      <LuChevronDown className="pointer-events-none absolute top-1/2 right-[10px] -translate-y-1/2 text-[#1E1B4B]" size={15} />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-[8px] pt-[4px]">
                  <button
                    type="button"
                    className="flex h-[44px] w-full items-center justify-center gap-[8px] whitespace-nowrap rounded-[8px] border-[1.5px] border-[#1E1B4B] bg-white text-[14px] font-semibold text-[#1E1B4B]"
                  >
                    <LuSave size={16} strokeWidth={1.8} />
                    Update Question
                  </button>
                  <button
                    type="button"
                    className="flex h-[44px] w-full items-center justify-center gap-[8px] whitespace-nowrap rounded-[8px] border-[1.5px] border-[#B0124A] bg-white text-[14px] font-semibold text-[#B0124A]"
                    onClick={() => handleDeleteQuestion(selectedQuestion.id)}
                  >
                    <LuTrash2 size={16} strokeWidth={1.8} />
                    Delete Question
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-[13px] text-[#6B6F8D]">Select a question to view details.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}