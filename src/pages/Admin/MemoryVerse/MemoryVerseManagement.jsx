import { useState } from "react";
import { useNavigate } from "react-router-dom";
import statScrollIcon from "../../../assets/memory-verse/mm_stat_total.png";
import statCheckIcon from "../../../assets/memory-verse/mm_stat_published.png";
import statFileIcon from "../../../assets/memory-verse/mm_stat_drafts.png";
import statCalendarIcon from "../../../assets/memory-verse/mm_stat_scheduled.png";
import searchIcon from "../../../assets/memory-verse/mm_search.png";
import filterIcon from "../../../assets/memory-verse/mm_filter.png";
import plusIcon from "../../../assets/memory-verse/mm_plus.png";
import menuScheduleIcon from "../../../assets/memory-verse/mm_menu_schedule.png";
import menuDuplicateIcon from "../../../assets/memory-verse/mm_menu_duplicate.png";
import menuArchiveIcon from "../../../assets/memory-verse/mm_menu_archive.png";
import menuDeleteIcon from "../../../assets/memory-verse/mm_menu_delete.png";
import chevronRightIcon from "../../../assets/memory-verse/mm_chevron_right.png";
import ellipsisIcon from "../../../assets/memory-verse/mm_ellipsis.png";
import chevronDownIcon from "../../../assets/activities/sel_chevron.png";
import { pageShellClass } from "../Activities/activityFormShared";
import beStrongAndCourageous from "../../../assets/Be strong and courageous.png";

/* ==========================================================================
   TOKENS
   ========================================================================== */
const PURPLE = "#7C3AED";const GREEN = "#21AC1C";
const ORANGE = "#C65406";

const PURPLE_TINT = "rgba(124, 58, 237, 0.10)";
const GREEN_TINT = "rgba(33, 172, 28, 0.10)";
const ORANGE_TINT = "rgba(198, 84, 6, 0.10)";

/* ==========================================================================
   MOCK DATA
   ========================================================================== */
const STATS = [
  {
    label: "Total Verses",
    value: "128",
    icon: statScrollIcon,
    color: PURPLE,
    tint: PURPLE_TINT,
  },
  {
    label: "Published",
    value: "94",
    icon: statCheckIcon,
    color: GREEN,
    tint: GREEN_TINT,
  },
  {
    label: "Drafts",
    value: "18",
    icon: statFileIcon,
    color: ORANGE,
    tint: ORANGE_TINT,
  },
  {
    label: "Scheduled",
    value: "16",
    icon: statCalendarIcon,
    color: PURPLE,
    tint: PURPLE_TINT,
  },
];

const STATUS_STYLES = {
  Published: {
    color: GREEN,
    background: GREEN_TINT,
    border: "rgba(33, 172, 28, 0.20)",
  },
  Scheduled: {
    color: PURPLE,
    background: PURPLE_TINT,
    border: "rgba(124, 58, 237, 0.20)",
  },
  Draft: {
    color: ORANGE,
    background: ORANGE_TINT,
    border: "rgba(198, 84, 6, 0.20)",
  },
};

const ROW_MENU = [
  { id: "schedule", label: "Schedule", icon: menuScheduleIcon },
  { id: "duplicate", label: "Duplicate", icon: menuDuplicateIcon },
  { id: "archive", label: "Archive", icon: menuArchiveIcon },
  { id: "delete", label: "Delete", icon: menuDeleteIcon, danger: true },
];

const VERSES = [
  {
    id: 1,
    title: "Be strong and courageous",
    subtitle: "Have I not commanded you?...",
    location: "Joshua 1:9",
    reward: "50 pts",
    status: "Published",
    updatedDate: "May 8, 2024",
    updatedTime: "2:30 PM",
    image: beStrongAndCourageous,
    live: true,
  },
  {
    id: 2,
    title: "Trust in the Lord",
    subtitle: "Trust in the Lord with all your...",
    location: "Proverbs 3:5–6",
    reward: "50 pts",
    status: "Scheduled",
    updatedDate: "May 6, 2024",
    updatedTime: "11:15 AM",
    image: beStrongAndCourageous,
    live: true,
  },
  {
    id: 3,
    title: "I can do all things",
    subtitle: "I can do all things through...",
    location: "Philippians 4:13",
    reward: "50 pts",
    status: "Draft",
    updatedDate: "May 3, 2024",
    updatedTime: "9:45 AM",
    image: beStrongAndCourageous,
    live: true,
  },
  {
    id: 4,
    title: "The Lord is my shepherd",
    subtitle: "The Lord is my shepherd, I...",
    location: "Psalm 23:1",
    reward: "50 pts",
    status: "Published",
    updatedDate: "Apr 28, 2024",
    updatedTime: "4:20 PM",
    image: beStrongAndCourageous,
    live: false,
  },
];

const PAGE_NUMBERS = [1, 2, 3, 4, 5];
const PAGE_SIZES = ["10", "25", "50", "100"];

const COLS =
  "grid grid-cols-[minmax(200px,1.4fr)_110px_155px_70px_105px_95px_210px] items-center";

/* ==========================================================================
   SMALL PIECES
   ========================================================================== */
function FilterGroup({ label, value, onChange, options }) {
  return (
    <div className="flex shrink-0 flex-col gap-[10px]">
      <span className="text-[12px] font-medium text-[#0A0847]/80">{label}</span>
      <div className="relative w-[130px]">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label={label}
          className="h-[36px] w-full cursor-pointer appearance-none rounded-[7.47px] border border-[#E2DFFC] bg-white py-0 pr-[50px] pl-[12px] text-[13px] font-medium text-[#0A0847] outline-none"
        >
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        <img
          src={chevronDownIcon}
          alt=""
          className="pointer-events-none absolute top-1/2 right-[16px] w-[10px] -translate-y-1/2"
        />
      </div>
    </div>
  );
}

function StepDots() {
  return (
    <div className="flex items-center gap-[4px]">
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#001984] text-[12px] font-medium text-white"
        >
          {n}
        </span>
      ))}
    </div>
  );
}

function StatusPill({ status }) {
  const s = STATUS_STYLES[status];
  return (
    <span
      className="inline-flex h-[25px] items-center rounded-[8px] border px-[12px] py-[4px] text-[12px] font-medium"
      style={{ color: s.color, background: s.background, borderColor: s.border }}
    >
      {status}
    </span>
  );
}

function RowToggle({ on, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onChange}
      className={`relative h-[20px] w-[36px] shrink-0 cursor-pointer rounded-full transition-colors ${
        on ? "bg-[#001984]" : "bg-[#C9CBD6]"
      }`}
    >
      <span
        className={`absolute top-[2px] h-[16px] w-[16px] rounded-full bg-white shadow-sm transition-all ${
          on ? "left-[18px]" : "left-[2px]"
        }`}
      />
    </button>
  );
}

function StatCard({ stat }) {
  return (
    <div className="flex h-[123px] min-w-0 items-center gap-[10px] rounded-[8px] border border-[#E2DFFC] bg-[#FEFFFF] py-0 pr-[29px] pl-[16px]">
      <span
        className="flex h-[62px] w-[62px] shrink-0 items-center justify-center rounded-[18px] p-[7px]"
        style={{ background: stat.tint }}
      >
        <img src={stat.icon} alt="" className="h-[28px] w-auto" />
      </span>
      <div className="flex w-[138px] flex-col gap-[8px]">
        <p className="text-[14px] font-medium text-[#0A0847]/80">{stat.label}</p>
        <p className="text-[24px] leading-none font-bold text-[#001984]">{stat.value}</p>
      </div>
    </div>
  );
}

/* ==========================================================================
   PAGE
   ========================================================================== */
export default function MemoryVerseManagement() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [testament, setTestament] = useState("All");
  const [book, setBook] = useState("All");
  const [chapter, setChapter] = useState("All");
  const [status, setStatus] = useState("All");
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [page, setPage] = useState(1);
  const [openMenu, setOpenMenu] = useState(null);
  const [toggles, setToggles] = useState({ 1: true, 2: true, 3: true, 4: false });

  const rows = VERSES.filter((v) => {
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      v.title.toLowerCase().includes(q) ||
      v.subtitle.toLowerCase().includes(q) ||
      v.location.toLowerCase().includes(q);
    const matchesStatus = status === "All" || v.status === status;
    return matchesQuery && matchesStatus;
  });

  return (
    <div className={`${pageShellClass} min-h-[calc(100vh-72px)] w-full min-w-0`}>
      <div className="flex w-full min-w-0 flex-col gap-[24px] p-6">
        {/* ---------------- header ---------------- */}
        <div className="flex flex-wrap items-start justify-between gap-[16px]">
          <div className="flex flex-col gap-[8px]">
            <h1 className="text-[22px] leading-none font-semibold text-[#0A0847]">
              Memory Verse Management
            </h1>
            <p className="text-[14px] font-medium text-[#0A0847]/60">
              Create, organize, and publish five-step memory activities.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/admin/memory-verse/add-edit/ai-generate")}
            className="flex h-[42px] min-w-[178px] cursor-pointer items-center justify-center gap-[10px] whitespace-nowrap rounded-[8px] bg-[#001984] px-[16px] py-[10px] text-[14px] font-medium text-white"
          >
            <img src={plusIcon} alt="" className="h-[16px] w-[16px]" /> Add Memory Verse
          </button>
        </div>

        {/* ---------------- stat cards ---------------- */}
        <div className="grid w-full grid-cols-4 gap-[16px]">
          {STATS.map((s) => (
            <StatCard key={s.label} stat={s} />
          ))}
        </div>

        {/* ---------------- filter row ---------------- */}
        <div className="flex flex-wrap items-end justify-between gap-[16px]">
          <div className="relative w-[234px] shrink-0">
            <img
              src={searchIcon}
              alt=""
              className="pointer-events-none absolute top-1/2 left-[12px] h-[14px] w-[14px] -translate-y-1/2"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search verses..."
              className="h-[42px] w-full rounded-[7.47px] border border-[#E2DFFC] bg-white py-[10px] pr-[50px] pl-[44px] text-[14px] font-medium text-[#0A0847] outline-none placeholder:text-[#0A0847]/60"
            />
          </div>

          <div className="flex flex-wrap items-end gap-[10px]">
            <FilterGroup
              label="Testament"
              value={testament}
              onChange={setTestament}
              options={["All"]}
            />
            <FilterGroup label="Book" value={book} onChange={setBook} options={["All"]} />
            <FilterGroup
              label="Chapter"
              value={chapter}
              onChange={setChapter}
              options={["All"]}
            />
            <FilterGroup
              label="Status"
              value={status}
              onChange={setStatus}
              options={["All", "Published", "Scheduled", "Draft"]}
            />

            <button
              type="button"
              className="flex h-[36px] shrink-0 cursor-pointer items-center gap-[8px] rounded-[8px] border border-[#E2DFFC] bg-[#E6E7F7] px-[16px] py-[10px] text-[12px] font-medium text-[#0A0847]"
            >
              <img src={filterIcon} alt="" className="h-[16px] w-auto" /> Filters
            </button>
          </div>
        </div>

        {/* ---------------- table card ---------------- */}
        <div className="w-full overflow-hidden rounded-[7.5px] border-[0.75px] border-[#E2DFFC] bg-white">
          {/* header row */}
          <div
            className={`${COLS} h-[50px] border-b-[0.75px] border-[#E2DFFC] bg-[#F3F7FD]`}
          >
            <span className="flex items-center pr-[7.85px] pl-[20px] text-[12px] font-medium text-[#0A0847]/80">
              Verse
            </span>
            {["Bible Location", "Steps", "Reward", "Status", "Updated", "Actions"].map(
              (h) => (
                <span
                  key={h}
                  className="flex items-center justify-center px-[7.85px] text-[12px] font-medium text-[#0A0847]/80 last:pr-[20px]"
                >
                  {h}
                </span>
              ),
            )}
          </div>

          {/* body rows */}
          {rows.map((v) => (
            <div
              key={v.id}
              className={`${COLS} h-[92px] border-b-[0.75px] border-[#E2DFFC] bg-white`}
            >
              {/* verse */}
              <div className="flex min-w-0 items-center gap-[8px] pr-[7.85px] pl-[20px]">
                <img
                  src={v.image}
                  alt=""
                  className="h-[48px] w-[48px] shrink-0 rounded-[4px] bg-[#F1F2F8] object-cover"
                />
                <div className="w-[144px] min-w-0">
                  <p className="truncate text-[10px] font-medium text-[#0A0847]/80">
                    {v.title}
                  </p>
                  <p className="truncate text-[10px] font-medium text-[#0A0847]/80">
                    {v.subtitle}
                  </p>
                </div>
              </div>

              {/* bible location */}
              <span className="flex items-center justify-center px-[7.85px] text-center text-[12px] font-medium text-[#0A0847]">
                {v.location}
              </span>

              {/* steps */}
              <div className="flex flex-col items-center gap-[6px] px-[7.85px]">
                <StepDots />
                <p className="text-[11px] font-medium text-[#0A0847]/80">5/5 Ready</p>
              </div>

              {/* reward */}
              <span className="flex items-center justify-center px-[7.85px] text-center text-[12px] font-medium text-[#0A0847]">
                {v.reward}
              </span>

              {/* status */}
              <span className="flex items-center justify-center px-[7.85px]">
                <StatusPill status={v.status} />
              </span>

              {/* updated */}
              <div className="flex flex-col items-center gap-[2px] px-[7.85px] text-center">
                <p className="text-[12px] font-medium text-[#0A0847]">{v.updatedDate}</p>
                <p className="text-[12px] font-medium text-[#0A0847]">{v.updatedTime}</p>
              </div>

              {/* actions */}
              <div className="relative flex h-[30px] items-center justify-center gap-[4px] pr-[20px] pl-[7.85px]">
                <button
                  type="button"
                  className="cursor-pointer rounded-[4px] border border-[#E2DFFC] bg-white px-[8px] py-[4px] text-[11px] font-medium text-[#0A0847]"
                >
                  Preview
                </button>
                <button
                  type="button"
                onClick={() => navigate("/admin/memory-verse/add-edit")}
                  className="cursor-pointer rounded-[4px] border border-[#E2DFFC] bg-white px-[8px] py-[4px] text-[11px] font-medium text-[#0A0847]"
                >
                  Edit
                </button>

                <RowToggle
                  on={toggles[v.id]}
                  onChange={() => setToggles((t) => ({ ...t, [v.id]: !t[v.id] }))}
                  label={`Toggle ${v.title}`}
                />

                <button
                  type="button"
                  aria-label={`Actions for ${v.title}`}
                  onClick={() => setOpenMenu(openMenu === v.id ? null : v.id)}
                  className="flex h-[24px] w-[24px] shrink-0 cursor-pointer items-center justify-center rounded-[4px] bg-[#E6E7F7] text-[#0A0847]"
                >
                  <img src={ellipsisIcon} alt="" className="h-[14px] w-auto" />
                </button>

                {openMenu === v.id && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setOpenMenu(null)}
                      aria-hidden
                    />
                    <div className="absolute top-[32px] right-[20px] z-20 h-[165px] w-[116px] rounded-[4px] border border-[#E2DFFC] bg-white pt-[12px] pr-[20px] pb-[37px] pl-[12px] shadow-[0_6px_18px_rgba(10,8,71,0.12)]">
                      <div className="flex flex-col gap-[10px]">
                        {ROW_MENU.map((item) => {
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => setOpenMenu(null)}
                              className={`flex cursor-pointer items-center gap-[8px] text-left text-[12px] font-medium ${
                                item.danger ? "text-[#D92D20]" : "text-[#0A0847]"
                              }`}
                            >
                              <img src={item.icon} alt="" className="h-[14px] w-[14px]" />
                              {item.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}

          {rows.length === 0 && (
            <p className="border-b-[0.75px] border-[#E2DFFC] py-[24px] text-center text-[12px] font-medium text-[#0A0847]/60">
              No memory verses match your filters.
            </p>
          )}

          {/* ---------------- footer ---------------- */}
          <div className="flex flex-wrap items-center justify-between gap-[12px] px-[20px] py-[16px]">
            <div className="flex items-center gap-[8px]">
              <span className="text-[12px] font-medium text-[#0A0847]/80">Display</span>
              <div className="relative w-[64px]">
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(e.target.value)}
                  aria-label="Entries per page"
                  className="h-[28px] w-full cursor-pointer appearance-none rounded-[4px] border border-[#E2DFFC] bg-white py-0 pr-[22px] pl-[8px] text-[12px] font-medium text-[#0A0847] outline-none"
                >
                  {PAGE_SIZES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
                <img
                  src={chevronDownIcon}
                  alt=""
                  className="pointer-events-none absolute top-1/2 right-[6px] w-[8px] -translate-y-1/2"
                />
              </div>
              <span className="text-[12px] font-medium text-[#0A0847]/80">Entries</span>
            </div>

            <div className="flex items-center gap-[6px]">
              <button
                type="button"
                aria-label="Previous page"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className={`flex h-[28px] w-[28px] items-center justify-center rounded-[4px] border border-[#E2DFFC] text-[#0A0847]/80 ${
                  page === 1
                    ? "cursor-not-allowed opacity-40"
                    : "cursor-pointer hover:border-[#001984] hover:text-[#001984]"
                }`}
              >
                <img src={chevronRightIcon} alt="" className="h-[14px] w-auto rotate-180" />
              </button>

              {PAGE_NUMBERS.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setPage(n)}
                  className={`h-[28px] w-[28px] cursor-pointer rounded-[4px] text-[12px] font-medium ${
                    page === n
                      ? "border border-[#001984] bg-[#001984] text-white"
                      : "border border-[#E2DFFC] bg-white text-[#0A0847]/80 hover:border-[#001984] hover:text-[#001984]"
                  }`}
                >
                  {n}
                </button>
              ))}

              <button
                type="button"
                aria-label="Next page"
                onClick={() => setPage((p) => Math.min(PAGE_NUMBERS.length, p + 1))}
                className="flex h-[28px] w-[28px] cursor-pointer items-center justify-center rounded-[4px] border border-[#E2DFFC] bg-white text-[#0A0847]/80 hover:border-[#001984] hover:text-[#001984]"
              >
                <img src={chevronRightIcon} alt="" className="h-[14px] w-auto" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}