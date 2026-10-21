import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import {
  PiCalendarBlank,
  PiCaretDown,
  PiCaretLeft,
  PiCaretRight,
  PiCheck,
  PiClockCountdown,
  PiCopy,
  PiDotsThree,
  PiEye,
  PiEyeSlash,
  PiMagnifyingGlass,
  PiPencilSimple,
  PiPlus,
  PiSquaresFour,
  PiTrash,
} from "react-icons/pi";

/* Figma-matched icons (24 grid, stroke = colour) */
const LiveIcon = ({ size = 32, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="1.8" fill={color} />
    <path d="M9.2 9.2a4 4 0 0 0 0 5.6M14.8 9.2a4 4 0 0 1 0 5.6" />
    <path d="M6.4 6.4a8 8 0 0 0 0 11.2M17.6 6.4a8 8 0 0 1 0 11.2" />
  </svg>
);

const DraftIcon = ({ size = 32, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 4H7.5A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5V12" />
    <path d="M16.6 3.6a2.1 2.1 0 0 1 3 3L12.4 14.8 8.4 15.6l.8-4z" />
  </svg>
);

const AudioIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 8.8h3.6L11 5v14l-4.9-3.8H2.5z" fill={color} />
    <path d="M15 8.6a4.6 4.6 0 0 1 0 6.8" strokeWidth="2.2" />
    <path d="M18.2 5.6a9 9 0 0 1 0 12.8" strokeWidth="2.2" />
  </svg>
);

/* ==========================================================================
   MOCK DATA
   ========================================================================== */
const STORIES = [
  { id: "1", date: "May 25, 2026", day: "Mon", homepageTitle: "David Strengthened", fullTitle: "David Encourages Himself in the Lord", scripture: "1 Samuel 30:6", status: "Live", reward: "+1 Treasure", views: "12,451", completions: "7,832" },
  { id: "2", date: "May 24, 2026", day: "Sun", homepageTitle: "Rahab's Faith", fullTitle: "Rahab Showed Unwavering Faith", scripture: "Joshua 2:11", status: "Scheduled", reward: "+1 Treasure", views: "10,872", completions: "6,994" },
  { id: "3", date: "May 23, 2026", day: "Sat", homepageTitle: "Paul's Courage", fullTitle: "Paul Stood Firm Before Kings", scripture: "Acts 26:22", status: "Draft", reward: "+1 Treasure", views: "9,214", completions: "5,800" },
  { id: "4", date: "May 26, 2026", day: "Tue", homepageTitle: "Naaman Healed", fullTitle: "Naaman Was Healed by God's Power", scripture: "Luke 10:27", status: "Scheduled", reward: "+1 Treasure", views: null, completions: null },
  { id: "5", date: "May 28, 2026", day: "Wed", homepageTitle: "Esther's Courage", fullTitle: "Esther Risked Her Life for Her People", scripture: "Daniel 6:22", status: "Draft", reward: "+1 Treasure", views: null, completions: null },
];

const STATS = [
  { label: "All Stories", value: 48, caption: "Total stories", box: "bg-[#EFE9FB]", icon: PiSquaresFour, iconColor: "#7C4DDB" },
  { label: "Live", value: 1, caption: "Currently live", box: "bg-[#E8F7EE]", icon: LiveIcon, iconColor: "#22A45D" },
  { label: "Scheduled", value: 3, caption: "Upcoming", box: "bg-[#1617E31A]", icon: PiClockCountdown, iconColor: "#1617E3" },
  { label: "Drafts", value: 2, caption: "In progress", box: "bg-[#FBEDE1]", icon: DraftIcon, iconColor: "#D9601A" },
];

const STATUS_STYLES = {
  Live: "bg-[#E4F6EA] text-[#22A45D]",
  Scheduled: "bg-[#E6E6FA] text-[#2A2FA8]",
  Draft: "bg-[#FDF1E7] border border-[#E2621B] text-[#E2621B]",
};

const MENU_ITEMS = [
  { key: "preview", label: "Preview", icon: PiEye },
  { key: "edit", label: "Edit", icon: PiPencilSimple },
  { key: "duplicate", label: "Duplicate", icon: PiCopy },
  { key: "unpublish", label: "Unpublish", icon: PiEyeSlash },
  { key: "delete", label: "Delete", icon: PiTrash, danger: true },
];

/* Figma text colour: #0A0847 @ 80% */
const TXT = "text-[#0A0847CC]";
const TH =
  "h-[48px] bg-[#F1F3FB] px-[12px] text-left text-[14px] font-medium leading-none whitespace-nowrap " +
  TXT;
const FILTER_BTN =
  "flex h-[36px] cursor-pointer items-center gap-[7px] rounded-[7.47px] border border-[#E5E7EB] bg-white px-[12px] text-[12px] font-medium leading-none " +
  TXT;

/* ==========================================================================
   STATUS BADGE
   ========================================================================== */
function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex h-[25px] items-center whitespace-nowrap rounded-[8px] px-[12px] text-[12px] font-medium leading-none ${
        STATUS_STYLES[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}

/* ==========================================================================
   TABLE CHECKBOX
   ========================================================================== */
function TableCheckbox({ checked, onChange }) {
  return (
    <label className="relative inline-flex h-[18px] w-[18px] cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="peer h-[18px] w-[18px] appearance-none rounded-[3px] border border-[#6B7280] bg-white transition checked:border-[#001984] checked:bg-[#001984]"
      />
      <PiCheck className="pointer-events-none absolute left-[2px] top-[2px] h-[14px] w-[14px] text-white opacity-0 transition peer-checked:opacity-100" />
    </label>
  );
}

/* ==========================================================================
   MAIN PAGE
   ========================================================================== */
export default function DailyReflectionList() {
  const [menu, setMenu] = useState(null);
  const [selected, setSelected] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => {
      if (
        !e.target.closest("[data-action-menu]") &&
        !e.target.closest("[data-menu]")
      ) {
        setMenu(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const openMenu = (e, id) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const width = 105; // Figma: 105 x 162
    const x = Math.max(
      8,
      Math.min(rect.right - width, window.innerWidth - width - 8),
    );
    setMenu({ id, x, y: rect.bottom + 8 });
  };

  const toggleRow = (id) => setSelected((p) => ({ ...p, [id]: !p[id] }));

  const allChecked = STORIES.every((s) => selected[s.id]);
  const toggleAll = () => {
    if (allChecked) setSelected({});
    else setSelected(Object.fromEntries(STORIES.map((s) => [s.id, true])));
  };

  return (
    <div className="flex min-h-screen flex-col gap-[20px] bg-[#F8FAFC] p-6 font-['Inter',sans-serif]">
      {/* Header */}
      <div className="flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#0A0847]">
            Today in Biblical History
          </h1>
          <p className="mt-2 text-sm font-medium text-[#0A084799]">
            Create, schedule, and manage daily biblical history experiences.
          </p>
        </div>
        <button
          onClick={() => navigate("/admin/dailyreflection/add")}
          className="flex cursor-pointer items-center justify-center gap-2 self-start rounded-lg bg-[#001984] px-4 py-2.5 text-xs font-medium text-white shadow-sm transition-colors hover:bg-[#001266] md:self-auto"
        >
          <PiPlus size={16} />
          Add Historical Story
        </button>
      </div>

      {/* Stats — Figma card 255 x 145, radius 8, border 1, padding-left 16, gap 10 */}
      <div className="grid grid-cols-1 gap-[16px] min-[560px]:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="flex h-[145px] items-center gap-[10px] rounded-[8px] border border-[#E2DFFC] bg-white pl-[16px] pr-[16px]"
            >
              {/* icon box 62 x 62, radius 18, padding 7, icon 32 */}
              <div
                className={`flex h-[62px] w-[62px] shrink-0 items-center justify-center rounded-[18px] p-[7px] ${stat.box}`}
              >
                <Icon size={32} color={stat.iconColor} />
              </div>
              <div className="flex min-w-0 flex-col gap-[10px]">
                <p className="text-[14px] font-semibold leading-none text-[#001984]">
                  {stat.label}
                </p>
                <p className="text-[22px] font-semibold leading-none text-[#0A0847]">
                  {stat.value}
                </p>
                <p className="text-[12px] font-semibold leading-none text-[#0A084799]">
                  {stat.caption}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filter Row — search 273 x 42, filters h-36, radius 7.47 */}
      <div className="flex flex-wrap items-center justify-between gap-[12px]">
        <div className="relative h-[42px] w-full sm:w-[273px]">
          <PiMagnifyingGlass
            size={16}
            className="pointer-events-none absolute left-[12px] top-1/2 -translate-y-1/2 text-[#0A084799]"
          />
          <input
            type="text"
            placeholder="Search stories.."
            className="h-[42px] w-full rounded-[7.47px] border border-[#E5E7EB] bg-white py-[10px] pl-[36px] pr-[12px] text-[12px] font-medium text-[#0A0847] outline-none transition placeholder:text-[#0A084799] focus:border-[#001984]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-[10px]">
          <button className={FILTER_BTN}>
            Status (All)
            <PiCaretDown size={18} />
          </button>
          <button className={FILTER_BTN}>
            Featured Date
            <PiCalendarBlank size={16} />
          </button>
          <button className={FILTER_BTN}>
            Scripture (All)
            <PiCaretDown size={18} />
          </button>
          <button className={FILTER_BTN}>
            Audio (All)
            <PiCaretDown size={18} />
          </button>
          <button className="flex h-[36px] cursor-pointer items-center rounded-[7.47px] border border-[#001984] bg-white px-[22px] text-[12px] font-medium leading-none text-[#001984] transition hover:bg-[#001984]/5">
            Reset
          </button>
        </div>
      </div>

      {/* Table Card — Figma border 0.75px #E2DFFC, radius 7.5 */}
      <div className="rounded-[7.5px] border-[0.75px] border-[#E2DFFC] bg-white p-[14px]">
        <div
          className="overflow-x-auto"
          onScroll={() => setMenu((m) => (m ? null : m))}
        >
          <table className="w-full min-w-[1120px] table-auto border-collapse">
            <thead>
              <tr>
                <th className={`${TH} w-[44px] rounded-l-[6px] pl-[14px] pr-[12px]`}>
                  <TableCheckbox checked={allChecked} onChange={toggleAll} />
                </th>
                <th className={`${TH} min-w-[130px]`}>Featured Date</th>
                <th className={`${TH} min-w-[140px]`}>Homepage Title</th>
                <th className={`${TH} min-w-[190px]`}>Full Story Title</th>
                <th className={`${TH} min-w-[110px]`}>Scripture</th>
                <th className={`${TH} min-w-[110px]`}>Status</th>
                <th className={`${TH} min-w-[70px]`}>Audio</th>
                <th className={`${TH} min-w-[110px]`}>Reward</th>
                <th className={`${TH} min-w-[80px]`}>Views</th>
                <th className={`${TH} min-w-[110px]`}>Completions</th>
                <th className={`${TH} min-w-[80px] rounded-r-[6px] text-center`}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {STORIES.map((story) => (
                <tr
                  key={story.id}
                  className="h-[62px] border-b border-[#EEF0F5] text-[12px] font-medium"
                >
                  <td className="w-[44px] px-[12px] py-[10px] align-middle">
                    <TableCheckbox
                      checked={!!selected[story.id]}
                      onChange={() => toggleRow(story.id)}
                    />
                  </td>

                  <td className={`min-w-[130px] whitespace-nowrap px-[12px] py-[10px] align-middle text-[12px] font-medium ${TXT}`}>
                    <p className="leading-[1.3]">{story.date}</p>
                    <p className="leading-[1.3]">{story.day}</p>
                  </td>

                  <td className={`min-w-[140px] px-[12px] py-[10px] align-middle text-[12px] font-medium ${TXT}`}>
                    <p className="line-clamp-2 leading-[1.3]">{story.homepageTitle}</p>
                  </td>

                  <td className={`min-w-[190px] px-[12px] py-[10px] align-middle text-[12px] font-medium ${TXT}`}>
                    <p className="line-clamp-3 leading-[1.3]">{story.fullTitle}</p>
                  </td>

                  <td className={`min-w-[110px] whitespace-nowrap px-[12px] py-[10px] align-middle text-[12px] font-medium ${TXT}`}>
                    {story.scripture}
                  </td>

                  <td className="min-w-[110px] whitespace-nowrap px-[12px] py-[10px] align-middle">
                    <StatusBadge status={story.status} />
                  </td>

                  {/* Figma audio icon: filled speaker, 24px, #1617E3 */}
                  <td className="min-w-[70px] px-[12px] py-[10px] align-middle">
                    <AudioIcon size={24} color="#1617E3" />
                  </td>

                  <td className="min-w-[110px] whitespace-nowrap px-[12px] py-[10px] align-middle text-[12px] font-semibold text-[#16A34A]">
                    {story.reward}
                  </td>

                  <td className="min-w-[80px] whitespace-nowrap px-[12px] py-[10px] align-middle text-[12px] font-semibold text-[#222222]">
                    {story.views ?? (
                      <span className="font-normal text-[#9CA3AF]">—</span>
                    )}
                  </td>

                  <td className="min-w-[110px] whitespace-nowrap px-[12px] py-[10px] align-middle text-[12px] font-semibold text-[#222222]">
                    {story.completions ?? (
                      <span className="font-normal text-[#9CA3AF]">—</span>
                    )}
                  </td>

                  <td className="min-w-[80px] px-[12px] py-[10px] text-center align-middle">
                    <button
                      onClick={(e) => openMenu(e, story.id)}
                      data-action-menu
                      aria-label={`Actions for ${story.homepageTitle}`}
                      className="inline-flex h-[28px] w-[28px] cursor-pointer items-center justify-center rounded-[6px] bg-[#E5E7EB] text-[#0A0847] transition hover:bg-[#d7dbe3]"
                    >
                      <PiDotsThree size={20} weight="bold" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer — Figma: 12px text, 24 x 24 page buttons, 0.75px #001984 border */}
        <div className="mt-[14px] flex flex-col gap-3 px-[6px] text-[12px] text-[#0A0847CC] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 font-normal">
            Display
            <span className="relative">
              <select className="h-[24px] w-[48px] cursor-pointer appearance-none rounded-[4px] border border-[#E5E7EB] bg-white pl-2 pr-5 text-[12px] font-medium outline-none">
                <option>05</option>
                <option>10</option>
                <option>25</option>
              </select>
              <PiCaretDown
                size={12}
                className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2"
              />
            </span>
            Entries
          </div>

          <div className="flex items-center gap-[8px]">
            <button
              disabled
              aria-label="Previous page"
              className="flex h-[24px] w-[24px] items-center justify-center rounded-[4px] bg-[#E5E7EB] text-[#9CA3AF]"
            >
              <PiCaretLeft size={12} />
            </button>
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                className={`flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded-[4px] text-[12px] ${
                  num === 1
                    ? "bg-[#001984] font-semibold text-white"
                    : "bg-white font-medium text-[#0A0847CC]"
                }`}
              >
                {num}
              </button>
            ))}
            <button
              aria-label="Next page"
              className="flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded-[4px] border-[0.75px] border-[#001984] text-[#001984] transition hover:bg-[#001984] hover:text-white"
            >
              <PiCaretRight size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* Actions Dropdown — Figma 105 x 162, radius 4, padding 12 / 20 / 12, row gap 12, item gap 8, text 10.5px */}
      {menu &&
        createPortal(
          <div
            data-menu
            className="fixed z-[60] flex h-[162px] w-[105px] flex-col gap-[12px] rounded-[4px] border border-[#E5E7EB] bg-white pb-[12px] pl-[12px] pr-[20px] pt-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.12)]"
            style={{ left: menu.x, top: menu.y }}
          >
            {MENU_ITEMS.map((item) => {
              const ItemIcon = item.icon;
              return (
                <button
                  key={item.key}
                  onClick={() => setMenu(null)}
                  className={`flex w-full cursor-pointer items-center gap-[8px] text-left text-[10.5px] font-medium leading-none transition ${
                    item.danger
                      ? "text-[#D0103A] hover:opacity-80"
                      : "text-[#0A0847CC] hover:text-[#0A0847]"
                  }`}
                >
                  <ItemIcon size={14} />
                  {item.label}
                </button>
              );
            })}
          </div>,
          document.body,
        )}
    </div>
  );
}