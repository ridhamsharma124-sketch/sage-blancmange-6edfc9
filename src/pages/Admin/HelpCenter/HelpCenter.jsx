import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  LuFileText,
  LuPlus,
  LuSearch,
  LuChevronDown,
  LuSettings,
  LuEllipsis,
  LuEllipsisVertical,
  LuEye,
  LuPencil,
  LuCopy,
  LuArchive,
  LuTrash2,
  LuCreditCard,
  LuGift,
  LuUser,
  LuBookOpen,
  LuHeart,
  LuBell,
  LuShieldCheck,
  LuLock,
} from "react-icons/lu";
import ArticleModal from "./ArticleModal";

/* ==========================================================================
   DESIGN TOKENS (from the Figma inspect panel)
   Text colour is #0A0847 everywhere:
     100% -> headings / values, 80% -> table + filters, 60% -> muted
   Primary navy #001984 · border #E2DFFC · table header bg #F4F7FC
   All colours are explicit hex so nothing depends on custom Tailwind tokens.
   ========================================================================== */

/* ==========================================================================
   STAT CARD ICONS — hand-drawn SVGs matching the Figma icons
   (Lucide icons look different: Figma uses outlined bars, a ring with a thick
   check, a document with a dash and a two-tone thumbs-up)
   ========================================================================== */
const svgBase = (size) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
});

function BarsIcon({ size = 26 }) {
  return (
    <svg {...svgBase(size)}>
      <rect x="2.8" y="13.5" width="5" height="7.5" rx="1.4" />
      <rect x="9.5" y="8.5" width="5" height="12.5" rx="1.4" />
      <rect x="16.2" y="3" width="5" height="18" rx="1.4" />
    </svg>
  );
}

function CheckRingIcon({ size = 26 }) {
  return (
    <svg {...svgBase(size)}>
      <path d="M20.2 7.6A9.3 9.3 0 1 1 16.4 3.8" />
      <path
        d="M7 12.3L8.4 10.9L10.8 13L18.9 6L20.2 7.3L10.8 16Z"
        fill="currentColor"
        strokeWidth="0.6"
      />
    </svg>
  );
}

function DraftIcon({ size = 26 }) {
  return (
    <svg {...svgBase(size)}>
      <path d="M7 2.8H14.2L19.2 7.8V19A2.2 2.2 0 0 1 17 21.2H7A2.2 2.2 0 0 1 4.8 19V5A2.2 2.2 0 0 1 7 2.8Z" />
      <path d="M9 12.6H15" />
      <path d="M9 16.4H13" />
    </svg>
  );
}

function ThumbIcon({ size = 26 }) {
  return (
    <svg {...svgBase(size)}>
      <rect x="2.2" y="10" width="4.6" height="11" rx="1" fill="#2F86CC" />
      <path d="M9.2 10.3L13 3.4A2 2 0 0 1 16.4 4.6L15.6 9H19.8A2 2 0 0 1 21.8 11.3L20.6 18.6A2 2 0 0 1 18.6 20.2H9.2Z" />
    </svg>
  );
}

/* ==========================================================================
   MOCK DATA
   ========================================================================== */
const STATS = [
  {
    label: "Total articles",
    value: 48,
    icon: BarsIcon,
    badge: "bg-[#F0E6FF] text-[#6A0DDB]",
    valueClass: "text-[#6A0DDB]",
  },
  {
    label: "Published",
    value: 42,
    icon: CheckRingIcon,
    badge: "bg-[#E8F7EE] text-[#2BA84A]",
    valueClass: "text-[#0A0847]",
  },
  {
    label: "Drafts",
    value: 6,
    icon: DraftIcon,
    badge: "bg-[#F9ECE3] text-[#C65406]",
    valueClass: "text-[#C65406]",
  },
  {
    label: "Scheduled",
    value: "91%",
    icon: ThumbIcon,
    badge: "bg-[#E8E5FA] text-[#1D12E0]",
    valueClass: "text-[#1D12B0]",
  },
];

const ARTICLES = [
  {
    id: "1",
    title: "Managing Your Subscription",
    category: "Subscription & Billing",
    views: "2,847",
    helpful: "94%",
    status: "Published",
    updated: "May 12, 2024",
  },
  {
    id: "2",
    title: "Update Payment Method",
    category: "Subscription & Billing",
    views: "2,847",
    helpful: "94%",
    status: "Published",
    updated: "Apr 28, 2024",
  },
  {
    id: "3",
    title: "Redeem Gift Code",
    category: "Gift Codes",
    views: "2,847",
    helpful: "94%",
    status: "Published",
    updated: "Apr 22, 2024",
  },
  {
    id: "4",
    title: "Set Reading Plan Goals",
    category: "Account Settings",
    views: "2,847",
    helpful: "94%",
    status: "Draft",
    updated: "May 12, 2024",
  },
  {
    id: "5",
    title: "Reset Password",
    category: "Account Settings",
    views: "2,847",
    helpful: "94%",
    status: "Published",
    updated: "May 12, 2024",
  },
];

const CATEGORIES = [
  { name: "Subscription & Billing", count: 8, icon: LuCreditCard },
  { name: "Gift Codes", count: 6, icon: LuGift },
  { name: "Account Settings", count: 7, icon: LuUser },
  { name: "Bible Content", count: 4, icon: LuBookOpen },
  { name: "Donations", count: 3, icon: LuHeart },
  { name: "Notifications", count: 2, icon: LuBell },
  { name: "Security", count: 5, icon: LuShieldCheck },
  { name: "Privacy Tips", count: 1, icon: LuLock },
];

const STATUS_PILL = {
  Published: "border-[#CDEFC8] bg-[#E8F8E5] text-[#34A83A]",
  Draft: "border-[#F3D6C2] bg-[#FBEDE4] text-[#C65406]",
};

const MENU_ITEMS = [
  { key: "preview", label: "Preview", icon: LuEye },
  { key: "edit", label: "Edit", icon: LuPencil },
  { key: "duplicate", label: "Duplicate", icon: LuCopy },
  { key: "archive", label: "Archive", icon: LuArchive },
  { key: "delete", label: "Delete", icon: LuTrash2, danger: true },
];

/* Table column widths (taken from Figma: Title 154 + 20px cell padding, etc.) */
const COLUMNS = [
  { label: "Title", w: "18.6%", align: "text-left" },
  { label: "Category", w: "20.7%", align: "text-left" },
  { label: "Views", w: "13%", align: "text-left" },
  { label: "Helpful", w: "9.9%", align: "text-left" },
  { label: "Status", w: "11.8%", align: "text-center" },
  { label: "Updated", w: "11.8%", align: "text-left" },
  { label: "Actions", w: "14.2%", align: "text-center" },
];

/* ==========================================================================
   SMALL PIECES
   ========================================================================== */
function StatusPill({ status }) {
  return (
    <span
      className={`inline-flex h-[26px] min-w-[54px] items-center justify-center whitespace-nowrap rounded-[8px] border px-[15px] text-[12px] font-medium leading-none ${
        STATUS_PILL[status] || "border-gray-200 bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}

function FilterSelect({ value, onChange, options }) {
  return (
    <div className="relative w-full sm:w-[125px]">
      <select
        value={value}
        onChange={onChange}
        className="h-[36px] w-full cursor-pointer appearance-none rounded-[8px] border border-[#E2DFFC] bg-white pl-[14px] pr-[32px] text-[12px] font-medium leading-none text-[#0A0847]/80 outline-none transition-colors focus:border-[#001984]"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <LuChevronDown
        size={14}
        className="pointer-events-none absolute right-[12px] top-1/2 -translate-y-1/2 text-[#0A0847]/80"
      />
    </div>
  );
}

/* ==========================================================================
   MAIN PAGE
   ========================================================================== */
export default function HelpCenter() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Statuses");
  const [visibility, setVisibility] = useState("All Statuses"); // 2nd dropdown in Figma
  const [author, setAuthor] = useState("All Authors");
  const [menu, setMenu] = useState(null);
  const [modal, setModal] = useState(null);

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

  useEffect(() => {
    if (!modal) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setModal(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [modal]);

  const openMenu = (e, id) => {
    e.stopPropagation();
    /* clicking the same 3-dot again closes the menu */
    if (menu?.id === id) {
      setMenu(null);
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const width = 130;
    const x = Math.max(
      8,
      Math.min(rect.right - width, window.innerWidth - width - 8),
    );
    /* always opens downward */
    setMenu({ id, x, y: rect.bottom + 6 });
  };

  const handleMenuAction = (key, id) => {
    if (key === "edit") {
      setModal({ mode: "edit", article: ARTICLES.find((a) => a.id === id) });
    }
    setMenu(null);
  };

  const visible = ARTICLES.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.category.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      status === "All Statuses" ? true : article.status === status;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen space-y-6 bg-[#F8FAFC] p-6 font-[Inter]">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-[22px] font-semibold leading-none text-[#0A0847]">
            Help Center Management
          </h1>
          <p className="mt-[18px] text-[16px] font-medium leading-none text-[#0A0847]/60">
            Create, organize, and manage help content.
          </p>
        </div>
        <button
          onClick={() => setModal({ mode: "create", article: null })}
          className="flex h-[43px] w-[152px] cursor-pointer items-center justify-center gap-[8px] self-start rounded-[8px] bg-[#001984] text-[14px] font-semibold leading-none text-white transition-colors hover:bg-[#001266] sm:self-auto"
        >
          <LuPlus size={20} strokeWidth={1.6} />
          New Article
        </button>
      </div>

      {/* Stat cards — Figma: ~255x154, border 1px #E2DFFC, icon box 60, gap 16 */}
      <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="flex h-[154px] items-center gap-[16px] rounded-[10px] border border-[#E2DFFC] bg-white px-[16px]"
            >
              <div
                className={`flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-[16px] ${stat.badge}`}
              >
                <Icon size={26} />
              </div>
              <div className="min-w-0">
                <p
                  className={`text-[26px] font-bold leading-none ${stat.valueClass}`}
                >
                  {stat.value}
                </p>
                <p className="mt-[10px] text-[14px] font-semibold leading-none text-[#001984]">
                  {stat.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filter row — search 408x42 (r 7.5) · selects 125x36 · button 161x36 */}
      <div className="flex flex-col items-start justify-between gap-4 xl:flex-row xl:items-center">
        <div className="flex flex-col items-start gap-[16px] sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-[408px]">
            <LuSearch
              size={16}
              className="pointer-events-none absolute left-[14px] top-1/2 -translate-y-1/2 text-[#0A0847]/60"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search journeys..."
              className="h-[42px] w-full rounded-[7.5px] border border-[#E2DFFC] bg-white pl-[42px] pr-[50px] text-[14px] font-normal leading-none text-[#0A0847] outline-none transition-colors placeholder:text-[#0A0847]/60 focus:border-[#001984]"
            />
          </div>

          <FilterSelect
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            options={["All Statuses", "Published", "Draft", "Scheduled"]}
          />
          <FilterSelect
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
            options={["All Statuses", "Published", "Draft", "Scheduled"]}
          />
          <FilterSelect
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            options={["All Authors", "John Doe", "Jane Smith"]}
          />
        </div>

        <button
          type="button"
          className="flex h-[36px] w-full cursor-pointer items-center justify-center gap-[8px] whitespace-nowrap rounded-[8px] border border-[#E2DFFC] bg-white px-[12px] text-[12px] font-medium leading-none text-[#0A0847]/80 transition-colors hover:bg-gray-50 xl:w-[161px]"
        >
          <LuSettings size={18} className="shrink-0" />
          Manage Categories
        </button>
      </div>

      {/* Articles table card */}
      <div className="overflow-hidden rounded-[10px] border border-[#E2DFFC] bg-white p-[14px]">
        <div className="mb-[12px] flex items-center gap-[8px] px-[4px]">
          <LuFileText size={16} className="text-[#001984]" />
          <h2 className="text-[14px] font-semibold leading-none text-[#001984]">
            Total articles
          </h2>
        </div>

        <div className="overflow-x-auto" onScroll={() => setMenu(null)}>
          <table className="w-full min-w-[900px] table-fixed border-collapse">
            <colgroup>
              {COLUMNS.map((c) => (
                <col key={c.label} style={{ width: c.w }} />
              ))}
            </colgroup>
            <thead>
              <tr className="h-[50px] bg-[#F4F7FC]">
                {COLUMNS.map((c) => (
                  <th
                    key={c.label}
                    className={`px-[20px] text-[14px] font-medium leading-none text-[#0A0847]/80 ${c.align}`}
                  >
                    {c.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visible.map((article) => (
                <tr
                  key={article.id}
                  className="h-[62px] border-b border-[#EEEDF8] transition-colors last:border-b-0 hover:bg-gray-50/50"
                >
                  <td className="px-[20px] align-middle text-[12px] font-medium leading-[15px] text-[#0A0847]/80">
                    {article.title}
                  </td>
                  <td className="px-[20px] align-middle text-[12px] font-medium leading-none text-[#0A0847]/80">
                    {article.category}
                  </td>
                  <td className="px-[20px] align-middle text-[12px] font-medium leading-none text-[#0A0847]/80">
                    {article.views}
                  </td>
                  <td className="px-[20px] align-middle text-[12px] font-medium leading-none text-[#0A0847]/80">
                    {article.helpful}
                  </td>
                  <td className="px-[20px] text-center align-middle">
                    <StatusPill status={article.status} />
                  </td>
                  <td className="whitespace-nowrap px-[20px] align-middle text-[12px] font-medium leading-none text-[#0A0847]/80">
                    {article.updated}
                  </td>
                  <td className="px-[20px] text-center align-middle">
                    <button
                      onClick={(e) => openMenu(e, article.id)}
                      data-action-menu
                      aria-label={`Actions for ${article.title}`}
                      aria-haspopup="menu"
                      aria-expanded={menu?.id === article.id}
                      className="inline-flex h-[28px] w-[28px] cursor-pointer items-center justify-center rounded-[6px] bg-[#E9E9E9] text-[#0A0847]/60 transition-colors hover:bg-[#DEDEE6]"
                    >
                      <LuEllipsis size={16} />
                    </button>
                  </td>
                </tr>
              ))}

              {visible.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-[20px] py-[40px] text-center text-[12px] font-medium text-[#0A0847]/60"
                  >
                    No articles found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Categories card — rows 62px, count/edit/more boxes 30px, gap 12 */}
      <div className="overflow-hidden rounded-[10px] border border-[#E2DFFC] bg-white p-[14px]">
        <div className="flex flex-col items-start justify-between gap-3 border-b border-[#EEEDF8] px-[4px] pb-[14px] sm:flex-row sm:items-center">
          <h2 className="text-[16px] font-semibold leading-none text-[#0A0847]">
            Categories
          </h2>
          <button
            type="button"
            className="flex h-[42px] w-[166px] cursor-pointer items-center justify-center gap-[8px] rounded-[8px] border border-[#E2DFFC] bg-white text-[14px] font-semibold leading-none text-[#0A0847] transition-colors hover:bg-gray-50"
          >
            <LuPlus size={16} />
            Add Category
          </button>
        </div>

        <div>
          {CATEGORIES.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.name}
                className="flex h-[62px] items-center justify-between gap-3 border-b border-[#EEEDF8] pl-[20px] pr-[24px] last:border-b-0"
              >
                <div className="flex min-w-0 items-center gap-[30px]">
                  <Icon size={18} className="shrink-0 text-[#0A0847]" />
                  <span className="truncate text-[12px] font-medium leading-none text-[#0A0847]/80">
                    {category.name}
                  </span>
                </div>

                <div className="flex shrink-0 items-center gap-[12px]">
                  <span className="flex h-[30px] w-[30px] items-center justify-center rounded-[6px] bg-[#F3F4FB] text-[16px] font-medium leading-none text-[#0A0847]/80">
                    {category.count}
                  </span>
                  <button
                    type="button"
                    aria-label={`Edit ${category.name}`}
                    className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[6px] border border-[#EEEDF8] bg-white text-[#0A0847]/80 transition-colors hover:bg-gray-50"
                  >
                    <LuPencil size={14} />
                  </button>
                  <button
                    type="button"
                    aria-label={`More actions for ${category.name}`}
                    className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[6px] bg-[#E9E9E9] text-[#0A0847]/60 transition-colors hover:bg-[#DEDEE6]"
                  >
                    <LuEllipsisVertical size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Row actions menu */}
      {menu &&
        createPortal(
          <div
            data-menu
            className="fixed z-[60] w-[130px] rounded-lg border border-[#E2DFFC] bg-white py-1 shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
            style={{ left: menu.x, top: menu.y }}
          >
            {MENU_ITEMS.map((item) => {
              const ItemIcon = item.icon;
              return (
                <button
                  key={item.key}
                  onClick={() => handleMenuAction(item.key, menu.id)}
                  className={`flex h-10 w-full cursor-pointer items-center gap-2.5 px-3.5 text-left text-[12px] font-medium transition-colors ${
                    item.danger
                      ? "text-[#C44552] hover:bg-[#F8EAEC]"
                      : "text-[#0A0847]/80 hover:bg-gray-50"
                  }`}
                >
                  <ItemIcon
                    size={16}
                    className={`shrink-0 ${
                      item.danger ? "text-[#C44552]" : "text-[#0A0847]/60"
                    }`}
                  />
                  {item.label}
                </button>
              );
            })}
          </div>,
          document.body,
        )}

      {/* Centered Create / Edit Article modal */}
      {modal && (
        <ArticleModal
          mode={modal.mode}
          article={modal.article}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}