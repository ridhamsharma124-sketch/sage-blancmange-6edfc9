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
} from "react-icons/fi";
import {
  BsCalendarCheck,
  BsFileEarmarkText,
  BsFillPatchCheckFill
} from "react-icons/bs";
import { PiChurch } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import ChurchSymbol from "../../../assets/dailyVerseSvgs/ChurchSymbol.svg";
import Checkmark from "../../../assets/dailyVerseSvgs/Checkmark.svg";
import CalendarCheck from "../../../assets/dailyVerseSvgs/calenderCheck.svg";
import Files from "../../../assets/dailyVerseSvgs/Files.svg";
import Coin from "../../../assets/dailyVerseSvgs/Coin.png";
import TableImg from "../../../assets/dailyVerseSvgs/tableImg.png";

/* ==========================================================================
   MOCK DATA
   ========================================================================== */
const INITIAL_VERSES = [
  {
    id: "1",
    date: "May 23, 2025",
    day: "Sat",
    image: TableImg,
    scripture: "Psalm 23:4",
    status: "Live",
    version: "NIV",
    reward: 50,
  },
  {
    id: "2",
    date: "May 23, 2025",
    day: "Sat",
    image: TableImg,
    scripture: "Philippians 4:13",
    status: "Scheduled",
    version: "NIV",
    reward: 50,
  },
  {
    id: "3",
    date: "May 23, 2025",
    day: "Sat",
    image: TableImg,
    scripture: "Joshua 1:9",
    status: "Draft",
    version: "KJV",
    reward: 50,
  },
  {
    id: "4",
    date: "May 23, 2025",
    day: "Sat",
    image: TableImg,
    scripture: "Matthew 6:33",
    status: "Scheduled",
    version: "NIV",
    reward: 50,
  },
  {
    id: "5",
    date: "May 23, 2025",
    day: "Sat",
    image: TableImg,
    scripture: "John 10:11",
    status: "Draft",
    version: "ESV",
    reward: 50,
  },
];

/* ==========================================================================
   REUSABLE UI COMPONENTS
   ========================================================================== */

/** 1. Stat Summary Card */
const StatCard = ({ icon, iconBg, label, value }) => (
  <div className="bg-white rounded-lg border border-[#E2DFFC] px-4 py-8 flex items-center gap-4">
    <div
      className={`w-13 h-13 rounded-2xl ${iconBg} flex items-center justify-center shrink-0`}
    >
      <img src={icon} alt="" className="w-7 h-7" />
    </div>
    <div>
      <p className="text-xs font-semibold text-[#001984]">{label}</p>
      <p className="text-xl font-semibold text-[#0A0847] mt-0.5">{value}</p>
    </div>
  </div>
);

/** 2. Status Badge */
const StatusBadge = ({ status }) => {
  const styles = {
    Live: "bg-[#21AC1C1A] text-[#21AC1C] border-[#DAF3C8]",
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
      <option value="">{label}</option>
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

  // position menu relative to the button (flip up if no space below)
  useLayoutEffect(() => {
    if (!isOpen || !btnRef.current) return;
    const r = btnRef.current.getBoundingClientRect();
    const menuH = 190;
    const menuW = 144; // w-36
    const top =
      r.bottom + menuH > window.innerHeight ? r.top - menuH - 4 : r.bottom + 4;
    setPos({ top, left: r.right - menuW });
  }, [isOpen]);

  // close on outside click / scroll / resize
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

/* ==========================================================================
   MAIN PAGE COMPONENT (NO NAVBAR / NO SIDEBAR)
   ========================================================================== */
export default function DailyVersesPage() {
  const [verses, setVerses] = useState(INITIAL_VERSES);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [versionFilter, setVersionFilter] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [openActionId, setOpenActionId] = useState(null);
  const [entriesPerPage, setEntriesPerPage] = useState("05");

  const navigate = useNavigate();

  // Selection Logic
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(verses.map((v) => v.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleDeleteRow = (id) => {
    setVerses((prev) => prev.filter((v) => v.id !== id));
    setOpenActionId(null);
  };

  // Filtered Verses
  const filteredVerses = verses.filter((v) => {
    const matchesSearch =
      v.scripture.toLowerCase().includes(search.toLowerCase()) ||
      v.date.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter ? v.status === statusFilter : true;
    const matchesVersion = versionFilter ? v.version === versionFilter : true;
    return matchesSearch && matchesStatus && matchesVersion;
  });

  return (
    <div className="p-6 bg-[#F8FAFC] min-h-screen font-[Inter] space-y-6">
      {/* Header Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-[#0A0847]">Daily Verses</h1>
          <p className="text-sm text-[#0A084799] font-medium mt-2">
            Create, schedule, preview, and manage every daily experience
          </p>
        </div>
        <button onClick={()=>navigate("/admin/dailyverse/add")} className="bg-[#001984] hover:bg-[#001266] text-white text-xs font-medium px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer self-start sm:self-auto">
          <FiPlus size={16} /> Add Daily Verse
        </button>
      </div>

      {/* Top 4 Stat Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={ChurchSymbol} iconBg="bg-[#EEF2FF]" label="All Verses" value="348" />
        <StatCard icon={Checkmark} iconBg="bg-[#2BA4521A]" label="Live" value="9" />
        <StatCard icon={CalendarCheck} iconBg="bg-[#1617E31A]" label="Scheduled" value="28" />
        <StatCard icon={Files} iconBg="bg-[#C654061A]" label="Drafts" value="6" />
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
            placeholder="Search by verse, reference or text..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-[#E2DFFC] rounded-md pl-9 pr-3 py-3 text-xs text-[#0A084799] placeholder-gray-400 outline-none focus:border-[#001984]"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <DropdownFilter
            label="Status"
            options={["Live", "Scheduled", "Draft"]}
            value={statusFilter}
            onChange={setStatusFilter}
          />
          <DropdownFilter
            label="Date"
            options={["Today", "This Week", "This Month"]}
            value=""
            onChange={() => {}}
          />
          <DropdownFilter
            label="Translation"
            options={["NIV", "KJV", "ESV"]}
            value={versionFilter}
            onChange={setVersionFilter}
          />
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-lg border border-[#E2DFFC] overflow-hidden p-[14px]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            {/* Table Header */}
            <thead className="bg-[#F3F7FD] border-b border-[#E2DFFC] text-[#0A084799] font-bold">
              <tr>
                <th className="p-4 w-10">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={
                      selectedIds.length === verses.length && verses.length > 0
                    }
                    className="rounded border-gray-300 accent-[#001984] cursor-pointer"
                  />
                </th>
                <th className="p-4 font-medium text-sm text-[#0A0847CC]">Date</th>
                <th className="p-4 font-medium text-sm text-[#0A0847CC]">Scripture</th>
                <th className="p-4 font-medium text-sm text-[#0A0847CC]">Status</th>
                <th className="p-4 font-medium text-sm text-[#0A0847CC]">Version</th>
                <th className="p-4 font-medium text-sm text-[#0A0847CC]">Reward</th>
                <th className="p-4 text-right font-medium text-sm text-[#0A0847CC]">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-[#E2DFFC] text-[#0A0847]">
              {filteredVerses.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(item.id)}
                      onChange={() => handleSelectRow(item.id)}
                      className="rounded border-gray-300 accent-[#001984] cursor-pointer"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt="Verse thumbnail"
                        className="w-10 h-10 rounded-lg object-cover shrink-0"
                      />
                      <div>
                        <p className="font-medium text-[#0A0847CC]">{item.date}</p>
                        <p className="text-[xs] text-[#0A084799] font-normal">
                          {item.day}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-medium text-xs text-[#0A0847CC] ">{item.scripture}</td>
                  <td className="p-4">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="p-4 font-semibold text-[#222222]">{item.version}</td>
                  <td className="p-4">
                    <div className="flex items-center text-[#0A0847CC] text-sm font-semibold">
                        <img src={Coin} alt="coin" className="w-12 h-12 object-contain" />
                      {item.reward}
                    </div>
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
                onChange={(e) => setEntriesPerPage(e.target.value)}
                className="appearance-none border border-[#E2DFFC] rounded-lg px-2.5 py-1 pr-6 text-xs text-[#0A0847] outline-none cursor-pointer"
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
            <button className="w-8 h-8 rounded-lg border border-[#E2DFFC] flex items-center justify-center text-gray-400 hover:bg-gray-50 cursor-pointer">
              <FiChevronLeft size={16} />
            </button>
            <button className="w-8 h-8 rounded-lg bg-[#001984] text-white font-bold flex items-center justify-center">
              1
            </button>
            <button className="w-8 h-8 rounded-lg text-gray-600 hover:bg-gray-50 font-medium flex items-center justify-center">
              2
            </button>
            <button className="w-8 h-8 rounded-lg text-gray-600 hover:bg-gray-50 font-medium flex items-center justify-center">
              3
            </button>
            <button className="w-8 h-8 rounded-lg text-gray-600 hover:bg-gray-50 font-medium flex items-center justify-center">
              4
            </button>
            <button className="w-8 h-8 rounded-lg text-gray-600 hover:bg-gray-50 font-medium flex items-center justify-center">
              5
            </button>
            <button className="w-8 h-8 rounded-lg border border-[#E2DFFC] flex items-center justify-center text-gray-600 hover:bg-gray-50 cursor-pointer">
              <FiChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}