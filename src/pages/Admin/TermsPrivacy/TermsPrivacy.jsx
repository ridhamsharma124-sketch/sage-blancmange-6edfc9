import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
// Adjust these paths to where assets/terms/*.png live in your project.
import checkIconSrc from "../../../assets/terms/check.png";
import warningIconSrc from "../../../assets/terms/warning.png";
import docIconSrc from "../../../assets/terms/doc.png";
import {
  LuPlus,
  LuSearch,
  LuChevronDown,
  LuEllipsis,
  LuEye,
  LuPencil,
  LuCopy,
  LuArchive,
  LuTrash2,
  LuHistory,
} from "react-icons/lu";

/* ==========================================================================
   STAT ICONS
   ========================================================================== */
function StatIcon({ src, size }) {
  return (
    <img
      src={src}
      alt=""
      style={{ height: size, width: "auto" }}
    />
  );
}

/* ==========================================================================
   MOCK DATA
   ========================================================================== */
const DOCUMENTS = [
  {
    id: "1",
    name: "Terms of Use",
    version: "v2.4",
    effective: "Jul 19, 2026",
    status: "Published",
    acceptance: "Required",
  },
  {
    id: "2",
    name: "Privacy Policy",
    version: "v4.1",
    effective: "Jul 19, 2026",
    status: "Published",
    acceptance: "Required",
  },
  {
    id: "3",
    name: "Community Guidelines",
    version: "v1.0",
    effective: "Aug 07, 2026",
    status: "Draft",
    acceptance: "Not required",
  },
  {
    id: "4",
    name: "Cookie Policy",
    version: "v2.0",
    effective: "Aug 20, 2026",
    status: "Needs Review",
    acceptance: "Required",
  },
];

const STATS = [
  {
    label: "Published",
    value: 2,
    iconSrc: checkIconSrc,
    iconSize: 32,
    badge: "bg-green-bg text-green-icon",
    valueClass: "text-heading",
  },
  {
    label: "Needs Review",
    value: 1,
    iconSrc: warningIconSrc,
    iconSize: 28,
    badge: "bg-red-bg text-red",
    valueClass: "text-indigo",
  },
  {
    label: "Draft",
    value: 1,
    iconSrc: docIconSrc,
    iconSize: 25,
    badge: "bg-orange-bg text-orange",
    valueClass: "text-orange-num",
  },
];

const STATUS_PILL = {
  Published: "bg-green-pill text-green",
  "Needs Review": "bg-red-bg text-red",
  Draft: "bg-orange-bg text-orange",
};

const STATUS_OPTIONS = ["All statuses", "Published", "Needs Review", "Draft"];

const MENU_ITEMS = [
  { key: "preview", label: "Preview", icon: LuEye },
  { key: "edit", label: "Edit", icon: LuPencil },
  { key: "duplicate", label: "Duplicate", icon: LuCopy },
  { key: "archive", label: "Archive", icon: LuArchive },
  { key: "delete", label: "Delete", icon: LuTrash2, danger: true },
];

/* ==========================================================================
   STATUS PILL
   ========================================================================== */
function StatusPill({ status }) {
  return (
    <span
      className={`inline-flex h-[25px] items-center whitespace-nowrap rounded-[8px] border border-transparent px-3 text-[12px] font-medium leading-none ${
        STATUS_PILL[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}

/* ==========================================================================
   MAIN PAGE
   ========================================================================== */
export default function TermsPrivacy() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All statuses");
  const [menu, setMenu] = useState(null);
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
    const width = 104;
    const x = Math.max(
      8,
      Math.min(rect.right - width, window.innerWidth - width - 8),
    );
    setMenu({ id, x, y: rect.bottom + 6 });
  };

  const handleMenuAction = (key) => {
    // Edit opens the edit page for the selected document
    if (key === "edit") navigate(`/admin/terms-privacy/edit?id=${menu.id}`);
    setMenu(null);
  };

  const visible = DOCUMENTS.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      status === "All statuses" ? true : doc.status === status;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen space-y-6 bg-[#F8FAFC] p-6 font-[Inter]">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-[22px] font-semibold leading-none text-[#0A0847]">
            Terms &amp; Privacy
          </h1>
          <p className="mt-2 text-[16px] font-medium text-[#0A084799]">
            Manage legal documents shown to users.
          </p>
        </div>

        {/* Add Document: onClick removed, so it does not open any page for now.
            To enable create mode later, add:
            onClick={() => navigate("/admin/terms-privacy/edit?mode=create")} */}
        <button className="flex cursor-pointer items-center gap-2 self-start rounded-[8px] bg-[#001984] px-6 py-3 text-[14px] font-semibold leading-none text-white shadow-sm transition-colors hover:bg-[#001266] sm:self-auto">
          <LuPlus size={16} />
          Add Document
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
        {STATS.map((stat) => {
          return (
            <div
              key={stat.label}
              className="flex h-[123px] items-center gap-4 rounded-[8px] border border-[#E2DFFC] bg-white pl-4 pr-6"
            >
              <div
                className={`flex h-[62px] w-[62px] shrink-0 items-center justify-center rounded-[16px] ${stat.badge}`}
              >
                <StatIcon src={stat.iconSrc} size={stat.iconSize} />
              </div>
              <div className="flex min-w-0 flex-col gap-2.5">
                <p className="text-[14px] font-semibold leading-[17px] text-[#001984]">
                  {stat.label}
                </p>
                <p
                  className={`text-[24px] font-semibold leading-[25px] ${stat.valueClass}`}
                >
                  {stat.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filter row */}
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div className="relative w-full sm:w-[406px]">
          <LuSearch
            size={16}
            className="pointer-events-none absolute left-[13px] top-1/2 -translate-y-1/2 text-[#0A084799]"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search documents"
            className="h-[42px] w-full rounded-[8px] border border-[#E2DFFC] bg-white pl-[38px] pr-3 text-[14px] text-[#0A084799] outline-none transition-colors placeholder:text-[#0A084799] focus:border-[#001984]"
          />
        </div>

        <div className="relative w-full sm:w-[127px]">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-[42px] w-full cursor-pointer appearance-none rounded-[8px] border border-[#E2DFFC] bg-white pl-3.5 pr-8 text-[14px] font-medium text-[#0A0847CC] outline-none transition-colors focus:border-[#001984]"
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <LuChevronDown
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#0A0847CC]"
          />
        </div>
      </div>

      {/* Table card */}
      <div className="overflow-hidden rounded-[7.5px] border-[0.75px] border-[#E2DFFC] bg-white p-[14px]">
        <div className="overflow-x-auto" onScroll={() => setMenu(null)}>
          <table className="w-full min-w-[820px] border-collapse">
            <thead>
              <tr className="bg-[#F3F7FD]">
                <th className="h-[50px] px-5 text-left text-[14px] font-medium text-[#0A0847CC]">
                  Document
                </th>
                <th className="h-[50px] px-5 text-left text-[14px] font-medium text-[#0A0847CC]">
                  Version
                </th>
                <th className="h-[50px] px-5 text-left text-[14px] font-medium text-[#0A0847CC]">
                  Effective Date
                </th>
                <th className="h-[50px] px-5 text-left text-[14px] font-medium text-[#0A0847CC]">
                  Status
                </th>
                <th className="h-[50px] px-5 text-left text-[14px] font-medium text-[#0A0847CC]">
                  User Acceptance
                </th>
                <th className="h-[50px] px-5 text-center text-[14px] font-medium text-[#0A0847CC]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {visible.map((doc) => (
                <tr
                  key={doc.id}
                  className="border-b-[0.75px] border-[#E2DFFC] text-[12px] font-medium text-[#0A0847] transition-colors last:border-b-0 hover:bg-gray-50/50"
                >
                  <td className="h-[82px] px-5 align-middle">{doc.name}</td>
                  <td className="h-[82px] px-5 align-middle">{doc.version}</td>
                  <td className="h-[82px] whitespace-nowrap px-5 align-middle">
                    {doc.effective}
                  </td>
                  <td className="h-[82px] px-5 align-middle">
                    <StatusPill status={doc.status} />
                  </td>
                  <td className="h-[82px] whitespace-nowrap px-5 align-middle">
                    {doc.acceptance}
                  </td>
                  <td className="h-[82px] px-5 text-center align-middle">
                    <button
                      onClick={(e) => openMenu(e, doc.id)}
                      data-action-menu
                      aria-label={`Actions for ${doc.name}`}
                      className="inline-flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[6px] bg-[#0A08471A] text-[#0A0847CC] transition-colors hover:bg-[#0A084733]"
                    >
                      <LuEllipsis size={18} />
                    </button>
                  </td>
                </tr>
              ))}

              {visible.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-10 text-center text-[12px] font-medium text-[#0A084799]"
                  >
                    No documents found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer note */}
      <div className="-mt-2 flex items-center gap-2 text-[12px] font-medium text-[#0A084799]">
        <LuHistory size={18} className="shrink-0 text-[#001984]" />
        All published changes are saved to version history.
      </div>

      {/* Row actions menu  */}
      {menu &&
        createPortal(
          <div
            data-menu
            className="fixed z-[60] w-[104px] rounded-[8px] border border-[#E2DFFC] bg-white py-1 shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
            style={{ left: menu.x, top: menu.y }}
          >
            {MENU_ITEMS.map((item) => {
              const ItemIcon = item.icon;
              return (
                <button
                  key={item.key}
                  onClick={() => handleMenuAction(item.key)}
                  className={`flex h-9 w-full cursor-pointer items-center gap-2 px-3 text-left text-[10.5px] font-medium transition-colors ${
                    item.danger
                      ? "text-[#C0264A] hover:bg-[#F8EAEC]"
                      : "text-[#0A0847CC] hover:bg-gray-50"
                  }`}
                >
                  <ItemIcon
                    size={16}
                    className={`shrink-0 ${item.danger ? "text-[#C0264A]" : "text-[#0A0847CC]"}`}
                  />
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