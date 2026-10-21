import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  FiSearch,
  FiMoreHorizontal,
  FiEye,
  FiFlag,
  FiCheckCircle,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
  FiChevronDown,
  FiCalendar,
  FiUser,
  FiMusic,
  FiX,
  FiShield,
  FiEyeOff,
  FiInfo,
  FiPlay,
  FiVolume2,
  FiSettings,
} from "react-icons/fi";
import { BsCheckCircle, BsPlayCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import BlueMusicIcon from "../../../assets/PrayWithMeSvgs/BlueMusicIcon.svg";
import CheckMarkicon from "../../../assets/PrayWithMeSvgs/CheckMarkIcon.svg";
import OrangeFlagIcon from "../../../assets/PrayWithMeSvgs/OrangeFlagIcon.svg";
import DeleteIcon from "../../../assets/PrayWithMeSvgs/DeleteBlue.svg";
import CalendaIcon from "../../../assets/PrayWithMeSvgs/CalanderIcon.svg";
import GuardCheck from "../../../assets/PrayWithMeSvgs/GuardCheck.svg";
import EyeClose from '../../../assets/PrayWithMeSvgs/EyeClose.svg';
import TrashWhite from "../../../assets/PrayWithMeSvgs/TrashWhite.svg";
import InformationIcon from "../../../assets/PrayWithMeSvgs/InformationIcon.svg";

/* ==========================================================================
   MOCK DATA
   ========================================================================== */
const INITIAL_PRAYERS = [
  {
    id: "1",
    request: "Please pray for my father's recovery from surgery.",
    name: "Sarah Johnson",
    handle: "@sjohnson",
    avatar: "https://i.pravatar.cc/80?img=12",
    category: "Healing",
    format: "Text",
    reports: 2,
    posted: "May 12, 2025",
    postedTime: "10:30 AM",
    autoDelete: "Aug 12, 2025",
    status: "Active",
  },
  {
    id: "2",
    request: "Pray for wisdom in my new job opportunity.",
    name: "David Thompson",
    handle: "@dthompson",
    avatar: "https://i.pravatar.cc/80?img=15",
    category: "Guidance",
    format: "Audio",
    reports: 1,
    posted: "May 11, 2025",
    postedTime: "2:15 PM",
    autoDelete: "Aug 11, 2025",
    status: "Flagged",
  },
  {
    id: "3",
    request: "Pray for our family to stay united in Christ.",
    name: "Anonymous",
    handle: "",
    avatar: "",
    category: "Strength",
    format: "Text",
    reports: 2,
    posted: "May 10, 2025",
    postedTime: "7:45 AM",
    autoDelete: "Aug 10, 2025",
    status: "Active",
  },
  {
    id: "4",
    request: "Please pray for my son's education and future.",
    name: "Emily Davis",
    handle: "@emilyd",
    avatar: "https://i.pravatar.cc/80?img=32",
    category: "Family",
    format: "Audio",
    reports: 0,
    posted: "May 9, 2025",
    postedTime: "9:20 PM",
    autoDelete: "Aug 9, 2025",
    status: "Active",
  },
  {
    id: "5",
    request: "Please pray for my son's education and future.",
    name: "Michael Brown",
    handle: "@mbrown",
    avatar: "https://i.pravatar.cc/80?img=52",
    category: "Healing",
    format: "Text",
    reports: 1,
    posted: "May 9, 2025",
    postedTime: "9:20 PM",
    autoDelete: "Aug 9, 2025",
    status: "Active",
  },
];

/* ==========================================================================
   REUSABLE UI COMPONENTS
   ========================================================================== */

   const SvgIcon = ({ src, size = 16, className = "" }) => (
  <img src={src} alt="" width={size} height={size} className={`shrink-0 ${className}`} />
);

   const CalendarSvg = (p) => <SvgIcon src={CalendaIcon} {...p} />;
   const GuardCheckSvg = (p) => <SvgIcon src={GuardCheck} {...p} />;
   const EyeCloseSvg = (p) => <SvgIcon src={EyeClose} {...p} />;
    const TrashWhiteSvg = (p) => <SvgIcon src={TrashWhite} {...p} />;
    const InformationIconSvg = (p) => <SvgIcon src={InformationIcon} {...p} />;

/** Stat Summary Card */
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

/** Generic Badge */
const Badge = ({ className = "", children }) => (
  <span
    className={`px-3 py-1 rounded-lg text-xs font-medium border inline-block ${className}`}
  >
    {children}
  </span>
);

const CATEGORY_STYLES = {
  Healing: "bg-[#3231DB1A] text-[#3231DB] border-[#CBCBFE]",
  Guidance: "bg-[#0019841A] text-[#001984] border-[#B9C6FF]",
  Strength: "bg-[#C689061A] text-[#C68906] border-[#F5DEAD]",
  Family: "bg-[#9C1CAC1A] text-[#9C1CAC] border-[#EBBEF1]",
};

const STATUS_STYLES = {
  Active: "bg-[#21AC1C1A] text-[#21AC1C] border-[#DAF3C8]",
  Flagged: "bg-[#EF44441A] text-[#EF4444] border-[#FECACA]",
  Disabled: "bg-gray-100 text-gray-500 border-gray-200",
};

/** Reports count pill */
const ReportsBadge = ({ count }) => (
  <span
    className={`w-9 h-6 rounded-md text-xs font-medium border inline-flex items-center justify-center ${
      count > 0
        ? "bg-[#ED31311A] text-[#ED3131] border-[#FFDBDB]"
        : "bg-[#3231DB1A] text-[#3231DB] border-[#CBCBFE]"
    }`}
  >
    {count}
  </span>
);

/** Avatar with fallback */
const Avatar = ({ src, name }) => {
  const [failed, setFailed] = useState(false);

  if (!name || name === "Anonymous") {
    return (
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FB923C] to-[#F97316] text-white flex items-center justify-center shrink-0">
        <FiUser size={20} />
      </div>
    );
  }

  if (!src || failed) {
    return (
      <div className="w-10 h-10 rounded-lg bg-[#EEF2FF] text-[#001984] text-xs font-bold flex items-center justify-center shrink-0">
        {name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .slice(0, 2)}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      onError={() => setFailed(true)}
      className="w-10 h-10 rounded-lg object-cover shrink-0"
    />
  );
};

/** Dropdown Filter */
const DropdownFilter = ({ label, options, value, onChange }) => (
  <div className="relative inline-block">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="appearance-none bg-white border border-[#E2DFFC] rounded-md px-3.5 py-2.5 pr-8 text-xs font-medium text-[#0A0847CC] outline-none cursor-pointer focus:border-[#001984]"
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

/** Actions Popover Menu (portal) */
const ActionsMenu = ({
  isOpen,
  onToggle,
  onDelete,
  onFlag,
  onApprove,
  onView,
}) => {
  const btnRef = useRef(null);
  const menuRef = useRef(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    if (!isOpen || !btnRef.current) return;
    const r = btnRef.current.getBoundingClientRect();
    const menuH = 150;
    const menuW = 128;
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

  const item =
    "w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center gap-2 transition-colors cursor-pointer";

  return (
    <>
      <button
        ref={btnRef}
        onClick={onToggle}
        className="p-1.5 rounded-sm bg-[#E9E9E9] hover:bg-gray-200 text-gray-500 transition-colors cursor-pointer"
      >
        <FiMoreHorizontal size={18} />
      </button>

      {isOpen &&
        createPortal(
          <div
            ref={menuRef}
            style={{ position: "fixed", top: pos.top, left: pos.left }}
            className="w-32 bg-white rounded-md border border-[#E2DFFC] py-1.5 z-[9999] text-xs font-medium text-[#0A0847CC]"
          >
            <button onClick={onView} className={item}>
              <FiEye size={14} className="text-gray-500" /> View
            </button>
            <button onClick={onApprove} className={item}>
              <FiCheckCircle size={14} className="text-gray-500" /> Approve
            </button>
            <button onClick={onFlag} className={item}>
              <FiFlag size={14} className="text-gray-500" /> Flag
            </button>
            <button
              onClick={onDelete}
              className="w-full px-3 py-2 text-left hover:bg-red-50 text-red-600 flex items-center gap-2 transition-colors border-t border-gray-100 cursor-pointer"
            >
              <FiTrash2 size={14} /> Delete
            </button>
          </div>,
          document.body,
        )}
    </>
  );
};

const WAVE = [
  4, 8, 14, 10, 18, 12, 6, 16, 20, 10, 14, 8, 18, 12, 6, 14, 10, 18, 8, 12, 16,
  6, 10, 14, 8, 18, 12, 6, 10, 16, 8, 12, 14, 6, 10,
];

const ModalSelect = ({ value, onChange, options }) => (
  <div className="relative">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-11 appearance-none bg-white border border-[#E2DFFC] rounded-lg px-3 pr-9 text-xs font-medium text-[#0A0847] outline-none cursor-pointer focus:border-[#001984]"
    >
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
    <FiChevronDown
      size={14}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
    />
  </div>
);

const ReviewPrayerModal = ({ item, onClose, onUpdate, onDelete }) => {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const lbl = "block text-xs font-semibold text-[#0A0847] mb-2";

  return createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center p-4 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl border border-[#E2DFFC] w-full max-w-sm p-5 my-auto max-h-[95vh] overflow-y-auto font-[Inter]"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-sm font-bold text-[#0A0847]">
            Review Prayer Post
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-[#001984] hover:opacity-70 cursor-pointer"
          >
            <FiX
              size={22}
              className="rounded-full border-2 border-[#001984] p-0.5"
            />
          </button>
        </div>

        {/* Prayer text + audio */}
        <div className="border border-[#E2DFFC] rounded-lg p-3 mb-4">
          <p className="text-xs font-medium text-[#0A0847CC] leading-relaxed">
            {item.request}
          </p>
          {item.format === "Audio" && (
            <>
              <div className="mt-3 flex items-center gap-2 bg-[#F3F7FD] border border-[#E2DFFC] rounded-full px-2 py-1.5">
                <button
                  type="button"
                  className="w-6 h-6 rounded-full bg-[#001984] text-white flex items-center justify-center shrink-0 cursor-pointer"
                >
                  <FiPlay size={11} />
                </button>
                <div className="flex-1 flex items-center justify-between h-6">
                  {WAVE.map((h, i) => (
                    <span
                      key={i}
                      style={{ height: h }}
                      className="w-[2px] rounded-full bg-[#3231DB]"
                    />
                  ))}
                </div>
                <FiVolume2 size={14} className="text-[#001984] shrink-0" />
              </div>
              <p className="text-[10px] text-[#0A084799] font-medium mt-1.5">
                00:12 / 00:48
              </p>
            </>
          )}
        </div>

        {/* Posted by */}
        <div className="mb-4">
          <span className={lbl}>Posted By</span>
          <div className="flex items-center gap-3">
            <Avatar src={item.avatar} name={item.name} />
            <div>
              <p className="text-xs font-semibold text-[#0A0847]">
                {item.name}
              </p>
              {item.handle && (
                <p className="text-xs font-medium text-[#0A0847CC]">
                  {item.handle}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <span className={lbl}>Category</span>
            <ModalSelect
              value={item.category}
              onChange={(v) => onUpdate(item.id, { category: v })}
              options={["Healing", "Guidance", "Strength", "Family"]}
            />
          </div>

          <div>
            <span className={lbl}>Reason for Flag</span>
            <ModalSelect
              value={item.flagReason || "Inappropriate content"}
              onChange={(v) => onUpdate(item.id, { flagReason: v })}
              options={["Inappropriate content", "Spam", "Harassment", "Other"]}
            />
          </div>

          <div>
            <span className={lbl}>Auto-delete date</span>
            <div className="h-11 flex items-center justify-between border border-[#E2DFFC] rounded-lg px-3 text-xs font-medium text-[#0A0847]">
              {item.autoDelete}
              <CalendarSvg size={16} className="text-gray-500" />
            </div>
          </div>

          <div>
            <span className={lbl}>Status</span>
            <ModalSelect
              value={item.status}
              onChange={(v) => onUpdate(item.id, { status: v })}
              options={["Active", "Flagged", "Disabled"]}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3 mt-5">
          <button
            type="button"
            onClick={() => onUpdate(item.id, { reports: 0, status: "Active" })}
            className="w-full h-11 border border-[#E2DFFC] rounded-lg text-xs font-semibold text-[#0A0847CC] flex items-center justify-center gap-2 hover:bg-gray-50 cursor-pointer"
          >
            <GuardCheckSvg size={16} /> Dismiss Reports
          </button>
          <button
            type="button"
            onClick={() => onUpdate(item.id, { status: "Disabled" })}
            className="w-full h-11 border border-[#E2DFFC] rounded-lg text-xs font-semibold text-[#0A0847CC] flex items-center justify-center gap-2 hover:bg-gray-50 cursor-pointer"
          >
            <EyeCloseSvg size={18} /> Disable Post
          </button>
          <button
            type="button"
            onClick={() => onDelete(item.id)}
            className="w-full h-11 bg-[#D80027] hover:bg-[#B8002A] rounded-lg text-xs font-semibold text-white flex items-center justify-center gap-2 cursor-pointer"
          >
            <TrashWhiteSvg size={18} /> Delete Permanently
          </button>
        </div>

        <div className="mt-4 flex items-start gap-2 bg-[#0019840D] border border-[#DBE2FF] rounded-lg p-3 text-[11px] font-medium text-[#001984]">
          <InformationIconSvg size={16} className="text-[#001984] shrink-0 mt-0.5" />
          <span>
            Disabled posts are hidden from users and can be restored at any
            time.
          </span>
        </div>
      </div>
    </div>,
    document.body,
  );
};

/* ==========================================================================
   MAIN PAGE COMPONENT (NO NAVBAR / NO SIDEBAR)
   ========================================================================== */
export default function PrayWithMePage() {
  const [prayers, setPrayers] = useState(INITIAL_PRAYERS);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [featuredDate, setFeaturedDate] = useState("");
  const [bulkAction, setBulkAction] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [openActionId, setOpenActionId] = useState(null);
  const [entriesPerPage, setEntriesPerPage] = useState("05");
  const [page, setPage] = useState(1);
  const [reviewId, setReviewId] = useState(null);
  const reviewItem = prayers.find((p) => p.id === reviewId);

  const navigate = useNavigate();

  const dateRef = useRef(null);

  // Filtering
  const filtered = prayers.filter((p) => {
    const q = search.toLowerCase();
    const matchesSearch =
      p.request.toLowerCase().includes(q) ||
      p.name.toLowerCase().includes(q) ||
      p.handle.toLowerCase().includes(q);
    const matchesCategory = categoryFilter
      ? p.category === categoryFilter
      : true;
    const matchesStatus = statusFilter ? p.status === statusFilter : true;
    const matchesType = typeFilter
      ? typeFilter === "Text"
        ? p.format === "Text"
        : p.format === "Audio"
      : true;
    return matchesSearch && matchesCategory && matchesStatus && matchesType;
  });

  // Pagination
  const perPage = parseInt(entriesPerPage, 10);
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage,
  );

  // Selection
  const allSelected =
    visible.length > 0 && visible.every((p) => selectedIds.includes(p.id));

  const handleSelectAll = (e) => {
    const ids = visible.map((p) => p.id);
    setSelectedIds((prev) =>
      e.target.checked
        ? [...new Set([...prev, ...ids])]
        : prev.filter((id) => !ids.includes(id)),
    );
  };

  const handleSelectRow = (id) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );

  // Row actions
  const handleDelete = (id) => {
    setPrayers((prev) => prev.filter((p) => p.id !== id));
    setSelectedIds((prev) => prev.filter((i) => i !== id));
    setOpenActionId(null);
  };

  const setStatus = (id, status) => {
    setPrayers((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
    setOpenActionId(null);
  };

  // Bulk actions
  const handleBulk = (value) => {
    setBulkAction("");
    if (!value || selectedIds.length === 0) return;
    if (value === "Delete") {
      setPrayers((prev) => prev.filter((p) => !selectedIds.includes(p.id)));
    } else if (value === "Flag" || value === "Approve") {
      const status = value === "Flag" ? "Flagged" : "Active";
      setPrayers((prev) =>
        prev.map((p) => (selectedIds.includes(p.id) ? { ...p, status } : p)),
      );
    }
    setSelectedIds([]);
  };

  // Page numbers
  const pageNumbers = Array.from(
    { length: Math.min(totalPages, 5) },
    (_, i) => i + 1,
  );

  const updatePrayer = (id, patch) =>
    setPrayers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    );

  const deleteFromModal = (id) => {
    handleDelete(id);
    setReviewId(null);
  };

  return (
    <div className="p-6 bg-[#F8FAFC] min-h-screen font-[Inter] space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-[#0A0847]">
            Pray With Me Management
          </h1>
          <p className="text-sm text-[#0A084799] font-medium mt-2">
            Review prayer requests, respond regularly, and strengthen
            visibility.
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate("/admin/pray-with-me/settings")}
          className=" text-[#0A0847] text-xs font-medium px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors hover:scale-[1.05] cursor-pointer self-start sm:self-auto"
        >
          <FiSettings size={16} />
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={BlueMusicIcon}
          iconBg="bg-[#EEF2FF] text-[#1617E3]"
          label="Total Posts"
          value="2,481"
        />
        <StatCard
          icon={CheckMarkicon}
          iconBg="bg-[#2BA4521A] text-[#2BA452]"
          label="Active"
          value="2,306"
        />
        <StatCard
          icon={OrangeFlagIcon}
          iconBg="bg-[#EF44441A] text-[#EF4444]"
          label="Flagged"
          value="18"
        />
        <StatCard
          icon={DeleteIcon}
          iconBg="bg-[#E8E9FB] text-[#3231DB]"
          label="Scheduled to Delete"
          value="157"
        />
      </div>

      {/* Search + Filters */}
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          <div className="relative w-full lg:w-[400px]">
            <FiSearch
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search prayers or users"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full bg-white border border-[#E2DFFC] rounded-md pl-9 pr-3 py-3 text-xs text-[#0A0847] placeholder-gray-400 outline-none focus:border-[#001984]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 lg:justify-end">
            <DropdownFilter
              label="Category"
              options={["Healing", "Guidance", "Strength", "Family"]}
              value={categoryFilter}
              onChange={(v) => {
                setCategoryFilter(v);
                setPage(1);
              }}
            />
            <DropdownFilter
              label="Status"
              options={["Active", "Flagged", "Disabled"]}
              value={statusFilter}
              onChange={(v) => {
                setStatusFilter(v);
                setPage(1);
              }}
            />
            <DropdownFilter
              label="Post Type"
              options={["Text", "Audio"]}
              value={typeFilter}
              onChange={(v) => {
                setTypeFilter(v);
                setPage(1);
              }}
            />

            {/* Featured Date */}
            <div
              onClick={() => dateRef.current?.showPicker?.()}
              className="relative bg-white border border-[#E2DFFC] rounded-md px-3.5 py-2.5 text-xs font-medium text-[#0A0847CC] flex items-center gap-3 cursor-pointer hover:border-[#001984] transition-colors"
            >
              <span>{featuredDate || "Featured Date"}</span>
              <CalendarSvg size={16} className="text-gray-500" />
              <input
                ref={dateRef}
                type="date"
                value={featuredDate}
                onChange={(e) => setFeaturedDate(e.target.value)}
                className="absolute inset-0 opacity-0 pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        <div className="relative inline-block">
          <select
            value={bulkAction}
            onChange={(e) => handleBulk(e.target.value)}
            className="appearance-none bg-white border border-[#001984] rounded-md pl-3 pr-9 py-2.5 text-xs font-medium text-[#0A0847CC] outline-none cursor-pointer w-40"
          >
            <option value="">Bulk Actions</option>
            <option value="Approve">Approve</option>
            <option value="Flag">Flag</option>
            <option value="Delete">Delete</option>
          </select>
          <FiChevronDown
            size={14}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0A0847] pointer-events-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-[#E2DFFC] overflow-hidden p-[14px]">
        <div className="overflow-x-auto ">
          <table className="w-full text-left text-xs min-w-[1000px]">
            <thead className="bg-[#F3F7FD] border-b border-[#E2DFFC]">
              <tr className="text-sm font-medium text-[#0A0847CC]">
                <th className="px-4 w-10">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 accent-[#001984] cursor-pointer"
                  />
                </th>
                <th className="px-4 py-3 font-medium">Prayer Request</th>
                <th className="px-4 font-medium">Posted By</th>
                <th className="px-4 font-medium">Category</th>
                <th className="px-4 font-medium">Format</th>
                <th className="px-4 font-medium">Reports</th>
                <th className="px-4 font-medium">Posted</th>
                <th className="px-4 font-medium">Auto-Delete</th>
                <th className="px-4 font-medium">Status</th>
                <th className="px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#E2DFFC] text-[#0A0847]">
              {visible.length === 0 && (
                <tr>
                  <td colSpan={10} className="p-8 text-center text-gray-400">
                    No prayers found.
                  </td>
                </tr>
              )}

              {visible.map((item) => (
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

                  <td className="p-4 max-w-[180px]">
                    <p className="text-xs font-medium text-[#0A0847CC] leading-snug line-clamp-3">
                      {item.request}
                    </p>
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar src={item.avatar} name={item.name} />
                      <div>
                        <p className="font-medium text-[#0A0847CC] whitespace-nowrap">
                          {item.name}
                        </p>
                        {item.handle && (
                          <p className="text-[#0A0847CC] font-medium">
                            {item.handle}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <Badge
                      className={
                        CATEGORY_STYLES[item.category] ||
                        "bg-gray-100 text-gray-700 border-gray-200"
                      }
                    >
                      {item.category}
                    </Badge>
                  </td>

                  <td className="p-4">
                    {item.format === "Audio" ? (
                      <BsPlayCircleFill size={22} className="text-[#001984]" />
                    ) : (
                      <span className="font-medium text-[#0A0847CC]">Text</span>
                    )}
                  </td>

                  <td className="p-4">
                    <ReportsBadge count={item.reports} />
                  </td>

                  <td className="p-4">
                    <p className="font-medium text-[#0A0847CC] whitespace-nowrap">
                      {item.posted}
                    </p>
                    <p className="text-[#0A084799] font-normal">
                      {item.postedTime}
                    </p>
                  </td>

                  <td className="p-4 font-medium text-[#0A0847CC] whitespace-nowrap">
                    {item.autoDelete}
                  </td>

                  <td className="p-4">
                    <Badge className={STATUS_STYLES[item.status]}>
                      {item.status}
                    </Badge>
                  </td>

                  <td className="p-4 text-right">
                    <ActionsMenu
                      isOpen={openActionId === item.id}
                      onToggle={() =>
                        setOpenActionId((prev) =>
                          prev === item.id ? null : item.id,
                        )
                      }
                      onDelete={() => handleDelete(item.id)}
                      onFlag={() => setStatus(item.id, "Flagged")}
                      onApprove={() => setStatus(item.id, "Active")}
                      onView={() => {
                        setReviewId(item.id);
                        setOpenActionId(null);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination */}
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
      {reviewItem && (
        <ReviewPrayerModal
          item={reviewItem}
          onClose={() => setReviewId(null)}
          onUpdate={updatePrayer}
          onDelete={deleteFromModal}
        />
      )}
    </div>
  );
}
