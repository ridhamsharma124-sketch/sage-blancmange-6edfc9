import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LuPlus,
  LuSearch,
  LuGrid2X2,
  LuCircleCheck,
  LuFileText,
  LuCircleX,
  LuList,
  LuEye,
  LuPencil,
  LuEllipsis,
  LuChevronDown,
  LuChevronLeft,
  LuChevronRight,
} from "react-icons/lu";
import audioRevelation from "../../../assets/word search/Audio Revelation.png";
import mysteryScripture from "../../../assets/word search/Mystery Scripture.png";
import EditWordSearchPanel from "./EditWordSearchPanel";

/* ==========================================================================
   DESIGN TOKENS
   ========================================================================== */
const NAVY = "#001984";
const HEADING = "#1B1F4B";
const GRAY = "#6B7194";
const BORDER = "#E4E7F5";
const PAGE_BG = "#F7F8FF";
const TH_BG = "#F3F4FC";

const STAT_CARDS = [
  { iconBg: "#F0E6FF", iconColor: "#7B2FF7", Glyph: LuGrid2X2, value: "248", label: "Total Puzzles" },
  { iconBg: "#E6F6EA", iconColor: "#2EB84B", Glyph: LuCircleCheck, value: "216", label: "Published" },
  { iconBg: "#FBEEE6", iconColor: "#C5651A", Glyph: LuFileText, value: "21", label: "Drafts" },
  { iconBg: "#FBE3EA", iconColor: "#D0103A", Glyph: LuCircleX, value: "11", label: "Disabled" },
];

const STATUS = {
  Published: { pillBg: "#E3F7E6", pillColor: "#2EB84B", trackOn: "#2EB84B", on: true },
  Draft: { pillBg: "#FBEEE6", pillColor: "#C5651A", trackOn: "#C5651A", on: false },
  Disable: { pillBg: "#FBE3EA", pillColor: "#D0103A", trackOn: "#D0103A", on: false },
};

const FILTERS = [
  { id: "ws-testament", all: "All Testaments", options: ["Old Testament", "New Testament"] },
  { id: "ws-book", all: "All Books", options: ["Genesis", "Exodus", "Psalms", "John"] },
  { id: "ws-chapter", all: "All Chapters", options: ["1", "3", "14", "23"] },
  {
    id: "ws-type",
    all: "All Types",
    options: ["Hidden Restoration", "Verse Restoration", "Audio Revelation", "Mystery Scripture"],
  },
  { id: "ws-method", all: "Creation Method", options: ["Chapter Default", "AI Generated"] },
];

const PAGES = [1, 2, 3, 4, 5];
const PAGE_SIZES = [10, 20, 50];

/* ==========================================================================
   MOCK DATA
   ========================================================================== */
const PUZZLES = [
  {
    id: 1,
    topic: "Hidden Restoration",
    image: audioRevelation,
    type: "Hidden Restoration",
    location: "Genesis 1",
    level: "Level 1",
    words: "12 words",
    imageSource: "Chapter Default",
    createdBy: "Admin User",
    status: "Published",
    updated: "May 12, 2024",
  },
  {
    id: 2,
    topic: "Verse Restoration",
    image: mysteryScripture,
    type: "Verse Restoration",
    location: "John 3",
    level: "Level 2",
    words: "8 words",
    imageSource: "Chapter Default",
    createdBy: "Admin User",
    status: "Draft",
    updated: "Apr 28, 2024",
  },
  {
    id: 3,
    topic: "Audio Revelation",
    image: audioRevelation,
    type: "Audio Revelation",
    location: "Psalms 23",
    level: "Level 1",
    words: "10 words",
    imageSource: "AI Generated",
    createdBy: "Admin User",
    status: "Published",
    updated: "Apr 22, 2024",
  },
  {
    id: 4,
    topic: "Mystery Scripture",
    image: mysteryScripture,
    type: "Mystery Scripture",
    location: "Exodus 14",
    level: "Level 2",
    words: "14 words",
    imageSource: "AI Generated",
    createdBy: "Admin User",
    status: "Disable",
    updated: "May 12, 2024",
  },
];

/* ==========================================================================
   SHARED CLASSES
   ========================================================================== */
const selectClass =
  "h-[38px] w-full cursor-pointer appearance-none rounded-[8px] border border-[#E4E7F5] bg-white pl-3 pr-8 text-[13px] text-[#6B7194] outline-none focus:border-[#001984]";

/* ==========================================================================
   PIECES
   ========================================================================== */
function Toggle({ on, color, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className="relative h-[18px] w-[32px] shrink-0 cursor-pointer rounded-full transition-colors"
      style={{ backgroundColor: on ? color : "#D9DCEA" }}
    >
      <span
        className="absolute top-[2px] h-[14px] w-[14px] rounded-full bg-white shadow-sm transition-all"
        style={{ left: on ? 16 : 2 }}
      />
    </button>
  );
}

function RowToggle({ row, value, onChange }) {
  const cfg = STATUS[row.status];
  return (
    <Toggle
      on={value}
      color={cfg.trackOn}
      onChange={onChange}
      label={`Toggle ${row.topic}`}
    />
  );
}

function StatusPill({ status }) {
  const cfg = STATUS[status];
  return (
    <span
      className="inline-block whitespace-nowrap rounded-full px-[10px] py-[3px] text-[11px] font-semibold"
      style={{ backgroundColor: cfg.pillBg, color: cfg.pillColor }}
    >
      {status}
    </span>
  );
}

const actionBtn =
  "flex h-[28px] w-[28px] cursor-pointer items-center justify-center rounded-[6px] border border-[#E4E7F5] bg-white transition-colors";

/* ==========================================================================
   SCREEN 1 — WORD SEARCH MANAGEMENT (list page)
   ========================================================================== */
export default function WordSearchManagement() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filterValues, setFilterValues] = useState({});
  const [selected, setSelected] = useState({});
  const [toggles, setToggles] = useState(() =>
    PUZZLES.reduce((acc, row) => ({ ...acc, [row.id]: STATUS[row.status].on }), {}),
  );
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [panelRow, setPanelRow] = useState(null);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return PUZZLES.filter((row) => {
      const matchesSearch = !q || row.topic.toLowerCase().includes(q);
      const matchesFilters = FILTERS.every(({ id, options }) => {
        const value = filterValues[id];
        return !value || options.includes(value);
      });
      return matchesSearch && matchesFilters;
    });
  }, [search, filterValues]);

  const allSelected = visible.length > 0 && visible.every((row) => selected[row.id]);

  const toggleAll = () =>
    setSelected((prev) => {
      const next = { ...prev };
      visible.forEach((row) => {
        next[row.id] = !allSelected;
      });
      return next;
    });

  return (
    <div className="min-h-[calc(100vh-72px)] font-[Inter]" style={{ backgroundColor: PAGE_BG, color: HEADING }}>
      <div className="mx-auto max-w-[1220px] px-5 py-6">
        {/* header */}
        <div className="flex flex-nowrap items-center justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-[28px] leading-tight font-bold" style={{ color: HEADING }}>
              Word Search Management
            </h1>
            <p className="mt-1 text-[14px] whitespace-nowrap" style={{ color: GRAY }}>
              Create, organize, and manage help content.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/admin/word-search/add-edit")}
            className="flex h-11 w-[190px] shrink-0 cursor-pointer items-center justify-center gap-2 rounded-[8px] px-4 text-[14px] font-semibold whitespace-nowrap text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: NAVY }}
          >
            <LuPlus size={17} />
            Add Word Search
          </button>
        </div>

        {/* stat cards */}
        <div className="mt-[40px] grid grid-cols-4 gap-[18px]">
          {STAT_CARDS.map(({ iconBg, iconColor, Glyph, value, label }) => (
            <div
              key={label}
              className="flex h-[120px] items-center gap-4 rounded-[8px] border bg-white px-5"
              style={{ borderColor: BORDER }}
            >
              <span
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[12px]"
                style={{ backgroundColor: iconBg }}
              >
                <Glyph size={30} style={{ color: iconColor }} strokeWidth={1.8} aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="text-[20px] leading-tight font-bold" style={{ color: HEADING }}>
                  {value}
                </p>
                <p className="mt-1 truncate text-[13px] font-bold" style={{ color: GRAY }}>
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* search + filters */}
        <div className="mt-[40px] flex flex-nowrap items-center justify-between gap-2">
          <div className="relative w-[300px] shrink-0">
            <LuSearch
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: GRAY }}
            />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search puzzles"
              className="h-[40px] w-full rounded-[8px] border border-[#E4E7F5] bg-white pr-3 pl-9 text-[13px] outline-none placeholder:text-[#6B7194A6] focus:border-[#001984]"
              style={{ color: HEADING }}
            />
          </div>

          <div className="flex flex-nowrap items-center gap-2">
            {FILTERS.map(({ id, all, options }) => (
              <div key={id} className="relative min-w-0 flex-1">
                <select
                  id={id}
                  value={filterValues[id] || ""}
                  onChange={(e) =>
                    setFilterValues((prev) => ({ ...prev, [id]: e.target.value }))
                  }
                  className={`${selectClass} truncate whitespace-nowrap`}
                >
                  <option value="">{all}</option>
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
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
            ))}
          </div>
        </div>

        {/* table card */}
        <div className="mt-6 overflow-hidden rounded-[8px] border bg-white" style={{ borderColor: BORDER }}>
          <div className="flex items-center gap-2 px-4 py-3.5">
            <LuList size={17} style={{ color: NAVY }} aria-hidden />
            <h2 className="text-[14px] font-bold" style={{ color: HEADING }}>
              Total articles
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1180px] border-collapse text-left">
              <thead>
                <tr style={{ backgroundColor: TH_BG }}>
                  <th scope="col" className="w-[36px] px-3 py-3">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={toggleAll}
                      aria-label="Select all puzzles"
                      className="h-[15px] w-[15px] cursor-pointer rounded-[3px] accent-[#001984]"
                    />
                  </th>
                  {[
                    { label: "Topic", w: "w-[186px]" },
                    { label: "Type", w: "w-[120px]" },
                    { label: "Bible Location", w: "w-[78px]" },
                    { label: "Level", w: "w-[66px]" },
                    { label: "Words / Items", w: "w-[84px]" },
                    { label: "Image Source", w: "w-[80px]" },
                    { label: "Crea ted By", w: "w-[64px]" },
                    { label: "Status", w: "w-[168px]" },
                    { label: "Updated", w: "w-[104px]" },
                    { label: "Actions", w: "w-[116px]" },
                  ].map(({ label, w }) => (
                    <th
                      key={label}
                      scope="col"
                      className={`${w} px-3 py-3 text-[12px] leading-[1.35] font-semibold`}
                      style={{ color: "#3A4170" }}
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {visible.map((row) => (
                  <tr
                    key={row.id}
                    onClick={() => setPanelRow(row)}
                    className="cursor-pointer border-t transition-colors hover:bg-[#FAFAFE]"
                    style={{ borderColor: BORDER }}
                  >
                    <td className="px-3 py-3" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={!!selected[row.id]}
                        onChange={() =>
                          setSelected((prev) => ({ ...prev, [row.id]: !prev[row.id] }))
                        }
                        aria-label={`Select ${row.topic}`}
                        className="h-[15px] w-[15px] cursor-pointer rounded-[3px] accent-[#001984]"
                      />
                    </td>

                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={row.image}
                          alt=""
                          className="h-10 w-10 shrink-0 rounded-[8px] border object-cover"
                          style={{ borderColor: BORDER }}
                        />
                        <span
                          className="text-[12px] leading-[1.3] font-bold whitespace-nowrap"
                          style={{ color: HEADING }}
                        >
                          {row.topic}
                        </span>
                      </div>
                    </td>

                    <td className="px-3 py-3 text-[12px]" style={{ color: GRAY }}>
                      {row.type}
                    </td>
                    <td className="px-3 py-3 text-[12px]" style={{ color: GRAY }}>
                      {row.location}
                    </td>
                    <td className="px-3 py-3 text-[12px]" style={{ color: GRAY }}>
                      {row.level}
                    </td>
                    <td className="px-3 py-3 text-[12px]" style={{ color: GRAY }}>
                      {row.words}
                    </td>
                    <td className="px-3 py-3 text-[12px]" style={{ color: GRAY }}>
                      {row.imageSource}
                    </td>
                    <td className="px-3 py-3 text-[12px]" style={{ color: GRAY }}>
                      {row.createdBy}
                    </td>

                    <td className="px-3 py-3" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center gap-2">
                        <RowToggle
                          row={row}
                          value={!!toggles[row.id]}
                          onChange={(next) =>
                            setToggles((prev) => ({ ...prev, [row.id]: next }))
                          }
                        />
                        <StatusPill status={row.status} />
                      </div>
                    </td>

                    <td className="px-3 py-3 text-[12px] whitespace-nowrap" style={{ color: GRAY }}>
                      {row.updated}
                    </td>

                    <td className="px-3 py-3" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setPanelRow(row)}
                          aria-label={`Edit ${row.topic}`}
                          className={`${actionBtn} hover:bg-[#F0F2FB]`}
                          style={{ color: NAVY }}
                        >
                          <LuEye size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setPanelRow(row)}
                          aria-label={`Edit ${row.topic}`}
                          className={`${actionBtn} hover:bg-[#F0F2FB]`}
                          style={{ color: NAVY }}
                        >
                          <LuPencil size={15} />
                        </button>
                        <button
                          type="button"
                          aria-label={`More actions for ${row.topic}`}
                          className={`${actionBtn} border-0`}
                          style={{ backgroundColor: "#E9EAF3", color: GRAY }}
                        >
                          <LuEllipsis size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {visible.length === 0 && (
                  <tr>
                    <td colSpan={10} className="px-4 py-12 text-center text-[13px]" style={{ color: GRAY }}>
                      No puzzles match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* footer — outside the card */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[12px]" style={{ color: GRAY }}>
            Display
            <div className="relative">
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                aria-label="Items per page"
                className="h-[30px] w-[60px] cursor-pointer appearance-none rounded-[8px] border border-[#E4E7F5] bg-white pr-5 pl-2.5 text-[12px] outline-none focus:border-[#001984]"
                style={{ color: HEADING }}
              >
                {PAGE_SIZES.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <LuChevronDown
                size={12}
                className="pointer-events-none absolute top-1/2 right-1.5 -translate-y-1/2"
                style={{ color: GRAY }}
                aria-hidden
              />
            </div>
            Total articles
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled
              aria-label="Previous page"
              className="flex h-[30px] w-[30px] cursor-not-allowed items-center justify-center rounded-[8px] text-[14px]"
              style={{ color: "#C3C7DA" }}
            >
              <LuChevronLeft size={15} />
            </button>

            {PAGES.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPage(p)}
                aria-current={page === p ? "page" : undefined}
                className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[8px] border text-[12px] font-semibold transition-colors"
                style={
                  page === p
                    ? { backgroundColor: NAVY, borderColor: NAVY, color: "#FFFFFF" }
                    : { borderColor: BORDER, backgroundColor: "#FFFFFF", color: HEADING }
                }
              >
                {p}
              </button>
            ))}

            <button
              type="button"
              onClick={() => setPage((p) => Math.min(p + 1, PAGES.length))}
              aria-label="Next page"
              className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[8px] text-[14px] transition-colors hover:bg-[#F0F2FB]"
              style={{ borderColor: NAVY, backgroundColor: "#FFFFFF", color: NAVY }}
            >
              <LuChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>

      {panelRow && (
        <EditWordSearchPanel row={panelRow} onClose={() => setPanelRow(null)} />
      )}
    </div>
  );
}
