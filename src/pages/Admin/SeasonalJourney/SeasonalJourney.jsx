import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  FiPlus,
  FiSearch,
  FiMoreHorizontal,
  FiEye,
  FiEdit,
  FiCopy,
  FiEyeOff,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
  FiChevronDown,
  FiBarChart2,
  FiFlag,
  FiFileText,
} from "react-icons/fi";
import { BsCheckCircle } from "react-icons/bs";
import { HiOutlineChartBar } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import BlueFlag from "../../../assets/SeasonalJourneys/BlueFlag.svg";
import OrangeFile from "../../../assets/SeasonalJourneys/OrangeFile.svg";
import PurpleBars from "../../../assets/SeasonalJourneys/PurpleBars.svg";
import WhiteAddIcon from "../../../assets/SeasonalJourneys/WhiteAddIcon.svg";
import PublishWhiteIcon from "../../../assets/SeasonalJourneys/PublishWhiteIcon.svg";
import CheckMarkIcon from "../../../assets/SeasonalJourneys/CheckMarkIcon.svg";

/* ==========================================================================
   MOCK DATA
   ========================================================================== */
const INITIAL_JOURNEYS = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=80&q=80",
    journey: "Easter Journey",
    title: "Easter: A Journey of Hope",
    season: "Spring",
    displayDates: "Mar 29 - Apr 6, 2026",
    days: "7 days",
    status: "Active",
    participants: "Aug 12, 2025",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=80&q=80",
    journey: "Christmas Journey",
    title: "Christmas: God With Us",
    season: "Winter",
    displayDates: "Dec 1 - Dec 25, 2026",
    days: "25 days",
    status: "Scheduled",
    participants: "Aug 11, 2025",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=80&q=80",
    journey: "21 Days of Prayer",
    title: "21 Days of Prayer and Fasting",
    season: "Lent",
    displayDates: "Feb 1 - Mar 15, 2026",
    days: "21 days",
    status: "Scheduled",
    participants: "Aug 10, 2025",
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?auto=format&fit=crop&w=80&q=80",
    journey: "Lent Journey",
    title: "Lent: Journey to the Cross",
    season: "Lent",
    displayDates: "Feb 17 - Apr 3, 2026",
    days: "40 days",
    status: "Draft",
    participants: "Aug 9, 2025",
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=80&q=80",
    journey: "Pentecost Journey",
    title: "Pentecost: Power from Above",
    season: "Spring",
    displayDates: "May 10 - May 20, 2026",
    days: "7 days",
    status: "Active",
    participants: "Aug 9, 2025",
  },
  {
    id: "6",
    image: "https://images.unsplash.com/photo-1508616342568-dbf80c1f4f9b?auto=format&fit=crop&w=80&q=80",
    journey: "Thanksgiving Journey",
    title: "Thanksgiving: A Heart of Gratitude",
    season: "Fall",
    displayDates: "Nov 22 - Nov 28, 2026",
    days: "7 days",
    status: "Active",
    participants: "Aug 9, 2025",
  },
  {
    id: "7",
    image: "https://images.unsplash.com/photo-1543589077-47d81606c1bf?auto=format&fit=crop&w=80&q=80",
    journey: "Bethlehem Challenge",
    title: "Bethlehem Challenge (Advent)",
    season: "Winter",
    displayDates: "Dec 1 - Dec 24, 2026",
    days: "24 days",
    status: "Active",
    participants: "Aug 9, 2025",
  },
];

/* ==========================================================================
   REUSABLE UI COMPONENTS
   ========================================================================== */

    const SvgIcon = ({ src, size = 16, className = "" }) => (
     <img src={src} alt="" width={size} height={size} className={`shrink-0 ${className}`} />
   );
   
      const WhiteAddIconSvg = (p) => <SvgIcon src={WhiteAddIcon} {...p} />;

/** 1. Stat Summary Card */
const StatCard = ({ icon, iconBg, label, value, hint }) => (
  <div className="bg-white rounded-lg border border-[#E2DFFC] px-4 py-8 flex items-center gap-4">
    <div
      className={`w-13 h-13 rounded-2xl ${iconBg} flex items-center justify-center shrink-0`}
    >
      <img src={icon} alt="" className="w-7 h-7" />
    </div>
    <div>
      <p className="text-xs font-semibold text-[#001984]">{label}</p>
      <p className="text-xl font-semibold text-[#0A0847] mt-0.5">{value}</p>
      {hint && <p className="text-[11px] text-[#0A084799] font-medium mt-0.5">{hint}</p>}
    </div>
  </div>
);

/** 2. Status Badge */
const StatusBadge = ({ status }) => {
  const styles = {
    Active: "bg-[#21AC1C1A] text-[#21AC1C] border-[#DAF3C8]",
    Scheduled: "bg-[#1617E31A] text-[#1617E3] border-[#D4D4FB]",
    Draft: "bg-[#C654061A] text-[#C65406] border-[#C65406]",
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

/** 3. Dropdown Filter Component */
const DropdownFilter = ({ label, options, value, onChange }) => (
  <div className="relative inline-block">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="appearance-none bg-white border border-[#E2DFFC] rounded-md px-3.5 py-2 pr-8 text-xs font-medium text-[#0A0847CC] outline-none cursor-pointer focus:border-[#001984]"
    >
      <option value="">{label} (All)</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
    <FiChevronDown
      size={14}
      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
    />
  </div>
);

/** 4. Actions Popover Menu */
const ActionsMenu = ({ isOpen, onToggle, onDelete }) => {
  const btnRef = useRef(null);
  const menuRef = useRef(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    if (!isOpen || !btnRef.current) return;
    const r = btnRef.current.getBoundingClientRect();
    const menuH = 190;
    const menuW = 144;
    const top =
      r.bottom + menuH > window.innerHeight ? r.top - menuH - 4 : r.bottom + 4;
    setPos({ top, left: r.right - menuW });
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onDown = (e) => {
      if (
        menuRef.current?.contains(e.target) ||
        btnRef.current?.contains(e.target)
      )
        return;
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

  return (
    <>
      <button
        ref={btnRef}
        onClick={onToggle}
        className="p-1.5 rounded-sm bg-[#E9E9E9] hover:bg-gray-50 text-gray-500 transition-colors cursor-pointer"
      >
        <FiMoreHorizontal size={18} />
      </button>

      {isOpen &&
        createPortal(
          <div
            ref={menuRef}
            style={{ position: "fixed", top: pos.top, left: pos.left }}
            className="w-28 bg-white rounded-md border border-[#E2DFFC] py-1.5 z-[9999] text-xs font-medium text-[#0A0847CC]"
          >
            <button className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center gap-2 transition-colors cursor-pointer">
              <FiEye size={14} className="text-gray-500" /> Preview
            </button>
            <button className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center gap-2 transition-colors cursor-pointer">
              <FiEdit size={14} className="text-gray-500" /> Edit
            </button>
            <button className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center gap-2 transition-colors cursor-pointer">
              <FiCopy size={14} className="text-gray-500" /> Duplicate
            </button>
            <button className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center gap-2 transition-colors cursor-pointer">
              <FiEyeOff size={14} className="text-gray-500" /> Unpublish
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



export default function SeasonalJourneysPage() {
  const [journeys, setJourneys] = useState(INITIAL_JOURNEYS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [seasonFilter, setSeasonFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [openActionId, setOpenActionId] = useState(null);
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const handleDeleteRow = (id) => {
    setJourneys((prev) => prev.filter((j) => j.id !== id));
    setOpenActionId(null);
  };

  // Filtered Journeys
  const filteredJourneys = journeys.filter((j) => {
    const q = search.toLowerCase();
    const matchesSearch =
      j.journey.toLowerCase().includes(q) || j.title.toLowerCase().includes(q);
    const matchesStatus = statusFilter ? j.status === statusFilter : true;
    const matchesSeason = seasonFilter ? j.season === seasonFilter : true;
    const matchesYear = yearFilter ? j.displayDates.includes(yearFilter) : true;
    return matchesSearch && matchesStatus && matchesSeason && matchesYear;
  });

  const perPage = parseInt(entriesPerPage, 10);
  const totalPages = Math.max(1, Math.ceil(filteredJourneys.length / perPage));
  const currentPage = Math.min(page, totalPages);
  const visible = filteredJourneys.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );
  const pageNumbers = Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1);

  const allCount = journeys.length;
  const activeCount = journeys.filter((j) => j.status === "Active").length;
  const scheduledCount = journeys.filter((j) => j.status === "Scheduled").length;
  const draftCount = journeys.filter((j) => j.status === "Draft").length;

  return (
    <div className="p-6 bg-[#F8FAFC] min-h-screen font-[Inter] space-y-6">
      {/* Header Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-[#0A0847]">Seasonal Journeys</h1>
          <p className="text-sm text-[#0A084799] font-medium mt-2">
            Create and manage daily spiritual journeys.
          </p>
        </div>
        <button
          onClick={() => navigate("/admin/seasonal-journey/add")}
          className="bg-[#001984] hover:bg-[#001266] text-white text-xs font-medium px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <WhiteAddIconSvg size={16} /> Add New Journey
        </button>
      </div>

      {/* Top 4 Stat Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={PurpleBars}
          iconBg="bg-[#E8E9FB] text-[#3231DB]"
          label="All Journeys"
          value={allCount}
          hint="Total journeys"
        />
        <StatCard
          icon={CheckMarkIcon}
          iconBg="bg-[#2BA4521A] text-[#2BA452]"
          label="Active"
          value={activeCount}
          hint="Currently active"
        />
        <StatCard
          icon={BlueFlag}
          iconBg="bg-[#E8E9FB] text-[#3231DB]"
          label="Scheduled"
          value={scheduledCount}
          hint="Upcoming journeys"
        />
        <StatCard
          icon={OrangeFile}
          iconBg="bg-[#F3E8D8] text-[#C65406]"
          label="Drafts"
          value={draftCount}
          hint="In draft stage"
        />
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search Bar */}
        <div className="relative w-full sm:w-100">
          <FiSearch
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search journeys..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full bg-white border border-[#E2DFFC] rounded-md pl-9 pr-3 py-3 text-xs text-[#0A084799] placeholder-gray-400 outline-none focus:border-[#001984]"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <DropdownFilter
            label="Status"
            options={["Active", "Scheduled", "Draft"]}
            value={statusFilter}
            onChange={(v) => {
              setStatusFilter(v);
              setPage(1);
            }}
          />
          <DropdownFilter
            label="Season"
            options={["Spring", "Summer", "Fall", "Winter", "Lent"]}
            value={seasonFilter}
            onChange={(v) => {
              setSeasonFilter(v);
              setPage(1);
            }}
          />
          <DropdownFilter
            label="Year"
            options={["2025", "2026"]}
            value={yearFilter}
            onChange={(v) => {
              setYearFilter(v);
              setPage(1);
            }}
          />
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-lg border border-[#E2DFFC] overflow-hidden p-5">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            {/* Table Header */}
            <thead className="bg-[#F3F7FD] border-b border-[#E2DFFC] text-[#0A084799] ">
              <tr>
                <th className="p-4 font-medium text-sm text-[#0A0847CC]">Journey</th>
                <th className="p-4 font-medium text-sm text-[#0A0847CC]">Title</th>
                <th className="p-4 font-medium text-sm text-[#0A0847CC]">Season</th>
                <th className="p-4 font-medium text-sm text-[#0A0847CC]">Display Dates</th>
                <th className="p-4 font-medium text-sm text-[#0A0847CC]">Days</th>
                <th className="p-4 font-medium text-sm text-[#0A0847CC]">Status</th>
                <th className="p-4 font-medium text-sm text-[#0A0847CC]">Participants</th>
                <th className="p-4 text-right font-medium text-sm text-[#0A0847CC]">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-[#E2DFFC] text-[#0A0847]">
              {visible.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-gray-400">
                    No journeys found.
                  </td>
                </tr>
              )}

              {visible.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                        <img
                        src={item.image}
                        alt={item.journey}
                        className="w-10 h-10 rounded-xl object-cover shrink-0"
                        />
                        <p className="font-medium text-[#0A0847CC] max-w-[90px]">{item.journey}</p>
                    </div>
                    </td>
                    <td className="p-4 max-w-[160px]">
                    <p className="font-medium text-[#0A0847CC]">{item.title}</p>
                    </td>
                  <td className="p-4 font-medium text-[#0A0847CC]">{item.season}</td>
                  <td className="p-4 font-medium text-[#0A0847CC] whitespace-nowrap">
                    {item.displayDates}
                  </td>
                  <td className="p-4 font-medium text-[#0A0847CC] whitespace-nowrap">
                    {item.days}
                  </td>
                  <td className="p-4">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="p-4 font-medium text-[#0A0847CC] whitespace-nowrap">
                    {item.participants}
                  </td>
                  <td className="p-4 text-right">
                    <ActionsMenu
                      isOpen={openActionId === item.id}
                      onToggle={() =>
                        setOpenActionId((prev) =>
                          prev === item.id ? null : item.id
                        )
                      }
                      onDelete={() => handleDeleteRow(item.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer / Pagination */}
        <div className="p-4 border-t border-[#E2DFFC] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#0A084799]">
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
            <span>Entries</span>
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
    </div>
  );
}