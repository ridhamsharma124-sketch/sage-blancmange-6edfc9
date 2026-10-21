import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  FiPlus,
  FiSearch,
  FiSettings,
  FiCalendar,
  FiMoreVertical,
  FiEye,
  FiDownload,
  FiRotateCcw,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
  FiChevronDown,
  FiFileText,
  FiDollarSign,
  FiRefreshCw,
  FiUsers,
} from "react-icons/fi";
import { MdUnfoldMore, MdOutlinePayments } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import DollarIcon from "../../../assets/DonationGiftSvg/DollarIcon.svg"
import File from "../../../assets/DonationGiftSvg/File.svg";
import ManualIcon from "../../../assets/DonationGiftSvg/ManualIcon.svg";
import CalendarSvg from "../../../assets/DonationGiftSvg/CalendarSvg.svg";
import RecurringIcon from "../../../assets/DonationGiftSvg/RecurringIcon.svg";
import StatCalendar from "../../../assets/DonationGiftSvg/StatCalendar.svg"
import ActiveRecurringIcon from "../../../assets/DonationGiftSvg/ActiveRecurringIcon.svg"



const SvgIcon = ({ src, size = 16, className = "" }) => (
              <img src={src} alt="" width={size} height={size} className={`shrink-0 ${className}`} />
            );

const CalendarIconSvg = (p) => <SvgIcon src={CalendarSvg} {...p} />;
const FileSvg = (p) => <SvgIcon src={File} {...p} />;


/* ==========================================================================
   MOCK DATA (34 rows, all dated Aug 1 - Aug 17, 2026)
   ========================================================================== */
const BASE_ROWS = [
  { donor: "Mary Jones", email: "mary@email.com", amount: 25, type: "One-Time", method: "Visa", status: "Paid" },
  { donor: "John Smith", email: "john@email.com", amount: 10, type: "Recurring", method: "Mastercard", status: "Active" },
  { donor: "Anonymous", email: "", amount: 50, type: "One-Time", method: "Cash", status: "Recorded" },
  { donor: "Sarah Williams", email: "sarah@email.com", amount: 25, type: "Recurring", method: "Visa", status: "Active" },
  { donor: "Michael Brown", email: "michael@email.com", amount: 100, type: "One-Time", method: "Mastercard", status: "Paid" },
  { donor: "Emily Davis", email: "emily@email.com", amount: 75, type: "One-Time", method: "Visa", status: "Failed" },
  { donor: "David Wilson", email: "david@email.com", amount: 30, type: "Recurring", method: "Mastercard", status: "Cancelled" },
];

const pad = (n) => String(n).padStart(2, "0");

const INITIAL_DONATIONS = Array.from({ length: 34 }, (_, i) => {
  const base = BASE_ROWS[i % BASE_ROWS.length];
  const day = 17 - Math.floor(i / 2);
  return {
    id: String(i + 1),
    date: `2026-08-${pad(Math.max(1, day))}`,
    ...base,
  };
});

const STAT_CARDS_ROW1 = [
  { label: "Total Donations", value: "$12,480", hint: "All time", icon: DollarIcon, bg: "bg-[#3B5BDB]" },
  { label: "This Month", value: "$1,845", hint: "Aug 1 – Aug 17, 2026", icon: StatCalendar, bg: "bg-[#0B3D91]" },
  { label: "Recurring (Monthly)", value: "$740", hint: "Per month", icon: RecurringIcon, bg: "bg-[#0A84E8]" },
];
const STAT_CARDS_ROW2 = [
  { label: "Active Recurring Donors", value: "38", hint: "Donors with active plans", icon: ActiveRecurringIcon, bg: "bg-[#FB923C]" },
  { label: "Manual (Cash/Check)", value: "$620", hint: "Record only donations", icon: ManualIcon, bg: "bg-[#F5B82E]" },
];

const FILTER_CHIPS = [
  { key: "all", label: "All" },
  { key: "one-time", label: "One-Time" },
  { key: "recurring", label: "Recurring" },
  { key: "manual", label: "Cash/Manual" },
  { key: "anonymous", label: "Anonymous" },
  { key: "failed", label: "Failed/Cancelled" },
];

/* ==========================================================================
   HELPERS
   ========================================================================== */
const fmtDate = (iso, withYear = true) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    ...(withYear ? { year: "numeric" } : {}),
    timeZone: "UTC",
  });

const fmtAmount = (n) => `$${n.toFixed(2)}`;

/* ==========================================================================
   REUSABLE UI COMPONENTS
   ========================================================================== */
const StatCard = ({ icon, iconBg, label, value, hint }) => (
  <div className="bg-white rounded-lg border border-[#E2DFFC] px-4 py-6 flex items-center gap-4">
    <div
      className={`w-16 h-16 rounded-full ${iconBg} text-white flex items-center justify-center shrink-0`}
    >
       <img src={icon} alt="" className="w-8 h-8" />
    </div>
    <div>
      <p className="text-sm font-semibold text-[#001984]">{label}</p>
      <p className="text-2xl font-semibold text-[#5B12E8] mt-0.5">{value}</p>
      <p className="text-[11px] text-[#0A084799] font-medium mt-0.5">{hint}</p>
    </div>
  </div>
);

const StatusBadge = ({ status }) => {
  const styles = {
    Paid: "bg-[#21AC1C1A] text-[#21AC1C] border-[#DAF3C8]",
    Active: "bg-[#21AC1C1A] text-[#21AC1C] border-[#DAF3C8]",
    Recorded: "bg-[#1617E31A] text-[#1617E3] border-[#D4D4FB]",
    Failed: "bg-[#EF44441A] text-[#EF4444] border-[#FECACA]",
    Cancelled: "bg-[#C654061A] text-[#C65406] border-[#FADCC7]",
  };
  return (
    <span
      className={`px-3 py-1 rounded-lg text-xs font-medium border inline-block ${
        styles[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
};

/** Tiny card-brand badges */
const CardBrand = ({ method }) => {
  if (method === "Visa") {
    return (
      <span className="inline-flex flex-col items-center justify-center w-7 h-[18px] rounded-[3px] border border-[#E2DFFC] bg-white leading-none">
        <span className="text-[7px] font-extrabold italic text-[#1A1F71]">VISA</span>
        <span className="w-4 h-[2px] bg-[#F7A600] mt-[1px]" />
      </span>
    );
  }
  if (method === "Mastercard") {
    return (
      <span className="inline-flex items-center justify-center w-7 h-[18px] rounded-[3px] bg-[#1A3A8F]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#EB001B]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#F79E1B] -ml-1" />
      </span>
    );
  }
  return null;
};

const DropdownFilter = ({ value, onChange, options, className = "" }) => (
  <div className={`relative ${className}`}>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full appearance-none bg-white border border-[#E2DFFC] rounded-md px-3.5 py-3 pr-9 text-xs font-medium text-[#0A0847CC] outline-none cursor-pointer focus:border-[#001984]"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
    <FiChevronDown
      size={14}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
    />
  </div>
);

/** Date range field with small popover */
const DateRangeField = ({ from, to, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const label =
    from && to ? `${fmtDate(from, false)} – ${fmtDate(to)}` : "Select date range";

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-6 bg-white border border-[#E2DFFC] rounded-md px-3.5 py-3 text-xs font-medium text-[#0A0847CC] hover:border-[#001984] transition-colors cursor-pointer"
      >
        <span className="whitespace-nowrap">{label}</span>
        <CalendarIconSvg size={16} className="text-gray-500 shrink-0" />
      </button>

      {open && (
        <div className="absolute right-0 z-30 mt-2 w-64 bg-white border border-[#E2DFFC] rounded-lg shadow-lg p-4 space-y-3">
          <div>
            <label className="block text-xs font-semibold text-[#0A0847CC] mb-1.5">From</label>
            <input
              type="date"
              value={from}
              onChange={(e) => onChange(e.target.value, to)}
              className="w-full border border-[#E2DFFC] rounded-md px-3 py-2.5 text-xs text-[#0A0847] outline-none focus:border-[#001984]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#0A0847CC] mb-1.5">To</label>
            <input
              type="date"
              value={to}
              min={from}
              onChange={(e) => onChange(from, e.target.value)}
              className="w-full border border-[#E2DFFC] rounded-md px-3 py-2.5 text-xs text-[#0A0847] outline-none focus:border-[#001984]"
            />
          </div>
        </div>
      )}
    </div>
  );
};

/** Actions popover menu (portal) */
const ActionsMenu = ({ isOpen, onToggle, onDelete, onRefund, onView }) => {
  const btnRef = useRef(null);
  const menuRef = useRef(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    if (!isOpen || !btnRef.current) return;
    const r = btnRef.current.getBoundingClientRect();
    const menuH = 170;
    const menuW = 144;
    const top =
      r.bottom + menuH > window.innerHeight ? r.top - menuH - 4 : r.bottom + 4;
    setPos({ top, left: r.right - menuW });
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onDown = (e) => {
      if (menuRef.current?.contains(e.target) || btnRef.current?.contains(e.target)) return;
      onToggle();
    };
    const close = () => onToggle();
    document.addEventListener("mousedown", onDown);
    window.addEventListener("scroll", close, true);
    window.addEventListener("resize", close);
    return () => {
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("resize", close);
    };
  }, [isOpen, onToggle]);

  const item =
    "w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center gap-2 transition-colors cursor-pointer";

  return (
    <>
      <button
        ref={btnRef}
        onClick={onToggle}
        className="p-1.5 rounded-lg bg-[#E9E9E9] hover:bg-gray-200 text-gray-600 transition-colors cursor-pointer"
      >
        <FiMoreVertical size={18} />
      </button>

      {isOpen &&
        createPortal(
          <div
            ref={menuRef}
            style={{ position: "fixed", top: pos.top, left: pos.left }}
            className="w-36 bg-white rounded-md border border-[#E2DFFC] py-1.5 z-[9999] text-xs font-medium text-[#0A0847CC]"
          >
            <button onClick={onView} className={item}>
              <FiEye size={14} className="text-gray-500" /> View
            </button>
            <button className={item}>
              <FiDownload size={14} className="text-gray-500" /> Receipt
            </button>
            <button onClick={onRefund} className={item}>
              <FiRotateCcw size={14} className="text-gray-500" /> Refund
            </button>
            <button
              onClick={onDelete}
              className="w-full px-3 py-2 text-left hover:bg-red-50 text-red-600 flex items-center gap-2 transition-colors border-t border-gray-100 cursor-pointer"
            >
              <FiTrash2 size={14} /> Delete
            </button>
          </div>,
          document.body
        )}
    </>
  );
};

/* ==========================================================================
   MAIN PAGE COMPONENT (NO NAVBAR / NO SIDEBAR)
   ========================================================================== */
export default function DonationsDashboardPage() {
  const navigate = useNavigate();

  const [donations, setDonations] = useState(INITIAL_DONATIONS);
  const [search, setSearch] = useState("");
  const [donationFilter, setDonationFilter] = useState("All Donations");
  const [chip, setChip] = useState("all");
  const [dateFrom, setDateFrom] = useState("2026-08-01");
  const [dateTo, setDateTo] = useState("2026-08-17");
  const [sortDir, setSortDir] = useState("desc");
  const [openActionId, setOpenActionId] = useState(null);
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [page, setPage] = useState(1);

  const handleDelete = (id) => {
    setDonations((prev) => prev.filter((d) => d.id !== id));
    setOpenActionId(null);
  };

  const handleRefund = (id) => {
    setDonations((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: "Cancelled" } : d))
    );
    setOpenActionId(null);
  };

  // Filtering
  const filtered = donations
    .filter((d) => {
      const q = search.toLowerCase();
      const matchesSearch =
        d.donor.toLowerCase().includes(q) || d.email.toLowerCase().includes(q);

      const matchesDropdown =
        donationFilter === "All Donations"
          ? true
          : donationFilter === "Completed"
          ? d.status === "Paid" || d.status === "Recorded"
          : donationFilter === "Active Plans"
          ? d.status === "Active"
          : donationFilter === "Failed / Cancelled"
          ? d.status === "Failed" || d.status === "Cancelled"
          : true;

      const matchesChip =
        chip === "all"
          ? true
          : chip === "one-time"
          ? d.type === "One-Time"
          : chip === "recurring"
          ? d.type === "Recurring"
          : chip === "manual"
          ? d.method === "Cash" || d.method === "Check"
          : chip === "anonymous"
          ? d.donor === "Anonymous"
          : chip === "failed"
          ? d.status === "Failed" || d.status === "Cancelled"
          : true;

      const matchesDate =
        (!dateFrom || d.date >= dateFrom) && (!dateTo || d.date <= dateTo);

      return matchesSearch && matchesDropdown && matchesChip && matchesDate;
    })
    .sort((a, b) =>
      sortDir === "desc" ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date)
    );

  // Pagination
  const perPage = parseInt(entriesPerPage, 10);
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);
  const pageNumbers = Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1);

  return (
    <div className="p-6 bg-[#F8FAFC] min-h-screen font-[Inter] space-y-6">
      {/* Header Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-xl font-semibold text-[#0A0847]">Donations Dashboard</h1>
        <div className="flex items-center gap-3">
          <button
            type="button"
            // onClick={() => navigate("/admin/donations/settings")}
            className="bg-white border border-[#E2DFFC] text-[#0A0847] text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <FiSettings size={16} /> Donation Settings
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/donations/add")}
            className="bg-[#001984] hover:bg-[#001266] text-white text-xs font-medium px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <FiPlus size={18} /> Record Donation
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...STAT_CARDS_ROW1, ...STAT_CARDS_ROW2].map((c) => (
          <StatCard
            key={c.label}
            icon={c.icon}
            iconBg={c.bg}
            label={c.label}
            value={c.value}
            hint={c.hint}
          />
        ))}
      </div>

      {/* Search + Filters */}
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          <div className="relative w-full lg:w-100">
            <FiSearch
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search donor name or email..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full bg-white border border-[#E2DFFC] rounded-md pl-9 pr-3 py-3 text-xs text-[#0A0847] placeholder-gray-400 outline-none focus:border-[#001984]"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-stretch gap-3">
            <DropdownFilter
              className="sm:w-52"
              value={donationFilter}
              onChange={(v) => {
                setDonationFilter(v);
                setPage(1);
              }}
              options={["All Donations", "Completed", "Active Plans", "Failed / Cancelled"]}
            />
            <DateRangeField
              from={dateFrom}
              to={dateTo}
              onChange={(f, t) => {
                setDateFrom(f);
                setDateTo(t);
                setPage(1);
              }}
            />
          </div>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-semibold text-[#0A0847CC]">Filter by:</span>
          {FILTER_CHIPS.map((c) => {
            const active = chip === c.key;
            return (
              <button
                key={c.key}
                type="button"
                onClick={() => {
                  setChip(c.key);
                  setPage(1);
                }}
                className={`px-5 py-2 rounded-md text-xs font-medium border transition-colors cursor-pointer ${
                  active
                    ? "bg-[#001984] text-white border-[#001984]"
                    : "bg-white text-[#0A0847CC] border-[#E2DFFC] hover:bg-gray-50"
                }`}
              >
                {c.label}
                {c.key === "all" && ` ${filtered.length}`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-lg border border-[#E2DFFC] overflow-hidden p-5">
        <div className="flex items-center gap-2 mb-4">
          <FileSvg size={18} className="text-[#001984]" />
          <h3 className="text-sm font-semibold text-[#001984]">Total articles</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[900px]">
            <thead className="bg-[#F3F7FD] border-b border-[#E2DFFC]">
              <tr>
                <th className="p-4 font-medium text-sm text-[#0A0847CC]">
                  <button
                    type="button"
                    onClick={() => setSortDir((d) => (d === "desc" ? "asc" : "desc"))}
                    className="flex items-center gap-8 cursor-pointer"
                  >
                    Date <MdUnfoldMore size={18} className="text-[#0A0847CC]" />
                  </button>
                </th>
                <th className="p-4 font-medium text-sm text-[#0A0847CC]">Donor</th>
                <th className="p-4 font-medium text-sm text-[#0A0847CC]">Email</th>
                <th className="p-4 font-medium text-sm text-[#0A0847CC]">Amount</th>
                <th className="p-4 font-medium text-sm text-[#0A0847CC]">Type</th>
                <th className="p-4 font-medium text-sm text-[#0A0847CC]">Updated</th>
                <th className="p-4 font-medium text-sm text-[#0A0847CC] text-center">Status</th>
                <th className="p-4 font-medium text-sm text-[#0A0847CC] text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#E2DFFC] text-[#0A0847]">
              {visible.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-gray-400">
                    No donations found.
                  </td>
                </tr>
              )}

              {visible.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 font-medium text-[#0A0847CC] whitespace-nowrap">
                    {fmtDate(item.date)}
                  </td>
                  <td className="p-4 font-medium text-[#0A0847CC] whitespace-nowrap">
                    {item.donor}
                  </td>
                  <td className="p-4 font-medium text-[#0A0847CC]">
                    {item.email ? (
                      <a
                        href={`mailto:${item.email}`}
                        className="underline underline-offset-2 hover:text-[#001984]"
                      >
                        {item.email}
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="p-4 font-semibold text-[#0A0847CC]">
                    {fmtAmount(item.amount)}
                  </td>
                  <td className="p-4 font-medium text-[#0A0847CC] whitespace-nowrap">
                    {item.type}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3 font-medium text-[#0A0847CC]">
                      <span>{item.method === "Cash" || item.method === "Check" ? item.method : "Card"}</span>
                      <CardBrand method={item.method} />
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="p-4 text-right">
                    <ActionsMenu
                      isOpen={openActionId === item.id}
                      onToggle={() =>
                        setOpenActionId((prev) => (prev === item.id ? null : item.id))
                      }
                      onDelete={() => handleDelete(item.id)}
                      onRefund={() => handleRefund(item.id)}
                      onView={() => {
                        setOpenActionId(null);
                        navigate(`/admin/donations/${item.id}`, { state: { donation: item } });
                        }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer / Pagination */}
      <div className="px-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#0A084799]">
        <div className="flex items-center gap-2">
          <span className="text-[#0A0847CC] font-medium">Display</span>
          <div className="relative">
            <select
              value={entriesPerPage}
              onChange={(e) => {
                setEntriesPerPage(e.target.value);
                setPage(1);
              }}
              className="appearance-none border border-[#E2DFFC] rounded-lg px-2.5 py-1 pr-6 text-xs font-semibold text-[#0A0847] outline-none cursor-pointer"
            >
              <option value="05">05</option>
              <option value="10">10</option>
              <option value="25">25</option>
            </select>
            <FiChevronDown
              size={12}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>
          <span>Badges</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="w-8 h-8 rounded-lg border border-[#E2DFFC] flex items-center justify-center text-gray-400 hover:bg-gray-50 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          >
            <FiChevronLeft size={16} />
          </button>

          {pageNumbers.map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer ${
                currentPage === n
                  ? "bg-[#001984] text-white font-bold"
                  : "text-gray-600 hover:bg-gray-50 font-medium"
              }`}
            >
              {n}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="w-8 h-8 rounded-lg border border-[#001984] flex items-center justify-center text-[#001984] hover:bg-gray-50 disabled:opacity-50 disabled:border-[#E2DFFC] cursor-pointer disabled:cursor-not-allowed"
          >
            <FiChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}