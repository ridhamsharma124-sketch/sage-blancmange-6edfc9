import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import {
  FiPlus, FiGrid, FiHelpCircle, FiBox, FiBookOpen, FiTarget, FiFileText,
  FiHeadphones, FiChevronDown, FiChevronLeft, FiChevronRight, FiFilter,
  FiMoreHorizontal, FiLayers, FiSend, FiLock, FiEdit2, FiCopy, FiEyeOff,
  FiEye, FiTrash2,
} from "react-icons/fi";
import { MdDragIndicator } from "react-icons/md";
import LevelFormModal from "./LevelFormModal";
import LevelDetailsModal from "./LevelDetailsModal";
import AudioQuizIcon from "../../../assets/LevelManagementSvgs/AudioQuiz.svg";
import BroadSpectrumIcon from "../../../assets/LevelManagementSvgs/BroadSpectrum.svg";
import EightDotsIcon from "../../../assets/LevelManagementSvgs/EightDots.svg";
import FourBlocksIcon from "../../../assets/LevelManagementSvgs/FourBlocks.svg";
import GreenSendIcon from "../../../assets/LevelManagementSvgs/GreenSendIcon.svg";
import LockIcon from "../../../assets/LevelManagementSvgs/Lock.svg";
import MemoryVerseIcon from "../../../assets/LevelManagementSvgs/MemoryVerse.svg";
import OrangeFileIcon from "../../../assets/LevelManagementSvgs/OrangeFile.svg";
import PuzzleIcon from "../../../assets/LevelManagementSvgs/Puzzle.svg";
import QuizIcon from "../../../assets/LevelManagementSvgs/Quiz.svg";
import StackIcon from "../../../assets/LevelManagementSvgs/Stack.svg";
import StoriesIcon from "../../../assets/LevelManagementSvgs/Stories.svg";

const INITIAL_LEVELS = [
  { id: "1", level: "Level 1", activity: "Quiz", content: "3 Questions", reward: "30 pts", unlock: "Available", status: "Published" },
  { id: "2", level: "Level 2", activity: "Quiz", content: "3 Questions", reward: "30 pts", unlock: "Complete L1", status: "Published" },
  { id: "3", level: "Level 3", activity: "Quiz", content: "3 Questions", reward: "30 pts + Mystery", unlock: "Complete L2", status: "Published" },
  { id: "4", level: "Level 4", activity: "Quiz", content: "3 Questions", reward: "30 pts", unlock: "Complete L3", status: "Published" },
  { id: "5", level: "Level 5", activity: "Quiz", content: "3 Questions", reward: "30 pts", unlock: "Complete L4", status: "Draft" },
  { id: "6", level: "Level 1", activity: "Puzzle", content: "1 Puzzle", reward: "20 pts", unlock: "Available", status: "Draft" },
  { id: "7", level: "Level 2", activity: "Puzzle", content: "1 Puzzle", reward: "20 pts", unlock: "Complete L1", status: "Published" },
  { id: "8", level: "Level 1", activity: "Memory Verse", content: "1 Verse", reward: "15 pts", unlock: "Available", status: "Published" },
  { id: "9", level: "Level 2", activity: "Memory Verse", content: "1 Verse", reward: "15 pts", unlock: "Complete L1", status: "Draft" },
  { id: "10", level: "Mystery Card 1", activity: "Broad Spectrum", content: "Mystery Card", reward: "25 pts", unlock: "After 3 Levels", status: "Published" },
];

// Replace with API totals
const STATS = { total: 42, published: 35, draft: 5, locked: 2 };


const SvgIcon = ({ src, size = 16, className = "" }) => (
              <img src={src} alt="" width={size} height={size} className={`shrink-0 ${className}`} />
            );
            
const AudioQuizIconSvg = (p) => <SvgIcon src={AudioQuizIcon} {...p} />;
const BroadSpectrumIconSvg = (p) => <SvgIcon src={BroadSpectrumIcon} {...p} />;
const EightDotsIconSvg = (p) => <SvgIcon src={EightDotsIcon} {...p} />;
const FourBlocksIconSvg = (p) => <SvgIcon src={FourBlocksIcon} {...p} />;
const GreenSendIconSvg = (p) => <SvgIcon src={GreenSendIcon} {...p} />;
const LockIconSvg = (p) => <SvgIcon src={LockIcon} {...p} />;
const MemoryVerseIconSvg = (p) => <SvgIcon src={MemoryVerseIcon} {...p} />;
const OrangeFileIconSvg = (p) => <SvgIcon src={OrangeFileIcon} {...p} />;
const PuzzleIconSvg = (p) => <SvgIcon src={PuzzleIcon} {...p} />;
const QuizIconSvg = (p) => <SvgIcon src={QuizIcon} {...p} />;
const StackIconSvg = (p) => <SvgIcon src={StackIcon} {...p} />;
const StoriesIconSvg = (p) => <SvgIcon src={StoriesIcon} {...p} />;

const TABS = [
  { label: "All", icon: FourBlocksIconSvg },
  { label: "Quiz", icon: QuizIconSvg },
  { label: "Puzzle", icon: PuzzleIconSvg },
  { label: "Memory Verse", icon: MemoryVerseIconSvg },
  { label: "Broad Spectrum", icon: BroadSpectrumIconSvg },
  { label: "Stories", icon: StoriesIconSvg },
  { label: "Audio Quiz", icon: AudioQuizIconSvg },
];

const ACTIVITY_STYLES = {
  Quiz: "bg-[#E8EBF7] text-[#001984] border-[#D4D8F0]",
  Puzzle: "bg-[#21AC1C1A] text-[#21AC1C] border-[#DAF3C8]",
  "Memory Verse": "bg-[#C654061A] text-[#C65406] border-[#FADCC7]",
  "Broad Spectrum": "bg-[#E91E9E1A] text-[#E91E9E] border-[#F8C9E6]",
  Stories: "bg-[#7C3AED1A] text-[#7C3AED] border-[#E4D7FB]",
  "Audio Quiz": "bg-[#0891B21A] text-[#0891B2] border-[#C5EAF3]",
};

const STATUS_STYLES = {
  Published: "bg-[#21AC1C1A] text-[#21AC1C] border-[#DAF3C8]",
  Draft: "bg-[#C654061A] text-[#C65406] border-[#FADCC7]",
  Locked: "bg-gray-100 text-gray-500 border-gray-200",
};

const StatCard = ({ icon, iconBg, label, value, hint }) => (
  <div className="bg-white rounded-lg border border-[#E2DFFC] px-4 py-5 flex items-center gap-4">
    <div className={`w-14 h-14 rounded-xl ${iconBg} flex items-center justify-center shrink-0`}>
          <img src={icon} alt="" className="w-8 h-8" />
    </div>
    <div>
      <p className="text-xs font-semibold text-[#0A084799]">{label}</p>
      <p className="text-2xl font-semibold text-[#001984] leading-tight">{value}</p>
      <p className="text-xs text-[#0A084799] font-medium">{hint}</p>
    </div>
  </div>
);

const FilterSelect = ({ label, value, onChange, options, allLabel }) => (
  <div className="flex-1 min-w-[180px]">
    <label className="block text-[11px] font-medium text-[#0A0847CC] mb-1.5">{label}</label>
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none bg-white border border-[#E2DFFC] rounded-md px-3 py-2.5 pr-8 text-xs text-[#0A0847CC] outline-none cursor-pointer focus:border-[#001984]"
      >
        <option value="">{allLabel}</option>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
      <FiChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  </div>
);

/* ---------- Row actions menu (portal) ---------- */
const LevelActionsMenu = ({ isOpen, onToggle, onAction, status }) => {
  const btnRef = useRef(null);
  const menuRef = useRef(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    if (!isOpen || !btnRef.current) return;
    const r = btnRef.current.getBoundingClientRect();
    const menuH = 190, menuW = 150;
    const top = r.bottom + menuH > window.innerHeight ? Math.max(8, r.top - menuH - 4) : r.bottom + 4;
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

  const published = status === "Published";
  const items = [
    { key: "edit", label: "Edit", icon: FiEdit2 },
    { key: "view", label: "View Details", icon: FiEye },
    { key: "duplicate", label: "Duplicate", icon: FiCopy },
    { key: "toggle", label: published ? "Unpublish" : "Publish", icon: published ? FiEyeOff : FiEye },
    { key: "delete", label: "Delete", icon: FiTrash2, danger: true, divider: true },
  ];

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        onClick={onToggle}
        className="w-8 h-8 rounded-md bg-[#E9E9E9] text-gray-600 inline-flex items-center justify-center hover:bg-gray-300 cursor-pointer"
      >
        <FiMoreHorizontal size={16} />
      </button>
      {isOpen &&
        createPortal(
          <div
            ref={menuRef}
            style={{ position: "fixed", top: pos.top, left: pos.left }}
            className="w-[150px] bg-white rounded-md border border-[#E2DFFC] shadow-lg py-1.5 z-[9999] text-xs font-medium"
          >
            {items.map(({ key, label, icon: Icon, danger, divider }) => (
              <React.Fragment key={key}>
                {divider && <div className="my-1 border-t border-[#E2DFFC]" />}
                <button
                  type="button"
                  onClick={() => onAction(key)}
                  className={`w-full px-3 py-2 text-left flex items-center gap-2.5 cursor-pointer ${
                    danger ? "text-[#EB0C10] hover:bg-red-50" : "text-[#0A0847CC] hover:bg-gray-50"
                  }`}
                >
                  <Icon size={13} className={danger ? "" : "text-gray-500"} /> {label}
                </button>
              </React.Fragment>
            ))}
          </div>,
          document.body
        )}
    </>
  );
};

export default function LevelsPage() {
  const navigate = useNavigate();
  const [levels, setLevels] = useState(INITIAL_LEVELS);
  const [tab, setTab] = useState("All");
  const [book, setBook] = useState("");
  const [chapter, setChapter] = useState("");
  const [section, setSection] = useState("");
  const [openActionId, setOpenActionId] = useState(null);
  const [dragId, setDragId] = useState(null);
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [page, setPage] = useState(1);
  const [formModal, setFormModal] = useState(null); // { mode: "add" | "edit", level? }
  const [detailsId, setDetailsId] = useState(null);

  // Order = position within the same activity
  const orderOf = (l) => levels.filter((x) => x.activity === l.activity).findIndex((x) => x.id === l.id) + 1;

  const filtered = levels.filter((l) => tab === "All" || l.activity === tab);

  const perPage = parseInt(entriesPerPage, 10);
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);
  const pageNumbers = Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1);

  const handleDrop = (targetId) => {
    const from = levels.find((l) => l.id === dragId);
    const to = levels.find((l) => l.id === targetId);
    setDragId(null);
    if (!from || !to || from.id === to.id || from.activity !== to.activity) return; // same activity only
    setLevels((prev) => {
      const next = [...prev];
      const [moved] = next.splice(next.findIndex((l) => l.id === from.id), 1);
      next.splice(next.findIndex((l) => l.id === to.id), 0, moved);
      return next;
    });
  };

  const handleAction = (key, item) => {
    setOpenActionId(null);
    switch (key) {
      case "edit":
        setFormModal({ mode: "edit", level: item });
        break;
      case "view":
        setDetailsId(item.id);
        break;
      case "duplicate":
        setLevels((p) => {
          const i = p.findIndex((l) => l.id === item.id);
          const copy = { ...item, id: crypto.randomUUID(), status: "Draft" };
          return [...p.slice(0, i + 1), copy, ...p.slice(i + 1)];
        });
        break;
      case "toggle":
        setLevels((p) =>
          p.map((l) => (l.id === item.id ? { ...l, status: l.status === "Published" ? "Draft" : "Published" } : l))
        );
        break;
      case "delete":
        setLevels((p) => p.filter((l) => l.id !== item.id));
        break;
      default:
    }
  };

  return (
    <div className="p-6 bg-[#F8FAFC] min-h-screen font-[Inter] space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[#0A084799]">
            Content <span className="mx-1">›</span> Levels
          </p>
          <h1 className="text-xl font-semibold text-[#0A0847] mt-1">Levels</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/admin/questions/levels/bulk")}
            className="px-6 py-3 bg-white border border-[#001984] text-[#0A0847] rounded-md text-xs font-semibold hover:bg-gray-50 cursor-pointer"
          >
            Create Multiple
          </button>
          <button
            type="button"
            onClick={() => setFormModal({ mode: "add" })}
            className="px-6 py-3 bg-[#001984] hover:bg-[#001266] text-white rounded-md text-xs font-semibold flex items-center gap-2 cursor-pointer"
          >
            <FiPlus size={16} /> Create Level
          </button>
        </div>
      </div>

      {/* Activity tabs */}
      <div className="bg-white rounded-lg border border-[#E2DFFC] p-3 flex items-center justify-between gap-2 overflow-x-auto">
        {TABS.map(({ label, icon: Icon }) => {
          const active = tab === label;
          return (
            <button
              key={label}
              type="button"
              onClick={() => { setTab(label); setPage(1); }}
              className={`flex items-center gap-2.5 px-5 py-4 text-sm font-medium whitespace-nowrap border-b-2 rounded-t-md cursor-pointer transition-colors ${
                active
                  ? "bg-[#F8FBFE] border-[#001984] text-[#001984] font-semibold rounded-b-md"
                  : "border-transparent text-[#0A0847CC] hover:text-[#001984]"
              }`}
            >
              <Icon size={22} className="text-[#001984]" /> {label}
            </button>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row lg:items-end gap-4">
        <FilterSelect label="Book" value={book} onChange={setBook} options={["Genesis", "Exodus", "Leviticus"]} allLabel="All Book" />
        <FilterSelect label="Chapter" value={chapter} onChange={setChapter} options={["Chapter 1", "Chapter 2", "Chapter 3"]} allLabel="All Chapters" />
        <FilterSelect label="Section" value={section} onChange={setSection} options={["Section 1", "Section 2"]} allLabel="All Sections" />
        <button
          type="button"
          className="px-8 py-2.5 bg-[#F3F7FD] border border-[#E2DFFC] text-[#0A0847CC] rounded-md text-xs font-normal flex items-center justify-center gap-2 hover:bg-[#E4E8F8] cursor-pointer"
        >
          <FiFilter size={16} /> More Filters
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={StackIcon} iconBg="bg-[#EDE9FE] text-[#7C3AED]" label="Total Levels" value={STATS.total} hint="All activities" />
        <StatCard icon={GreenSendIcon} iconBg="bg-[#2BA4521A] text-[#16A34A]" label="Published" value={STATS.published} hint="Active levels" />
        <StatCard icon={OrangeFileIcon} iconBg="bg-[#FFEDD5] text-[#EA580C]" label="Draft" value={STATS.draft} hint="Not published" />
        <StatCard icon={LockIcon} iconBg="bg-[#FEE2E2] text-[#DC2626]" label="Locked / Inactive" value={STATS.locked} hint="Hidden from users" />
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-[#E2DFFC] p-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[900px]">
            <thead className="bg-[#F3F7FD]">
              <tr className="text-sm text-[#0A0847CC]">
                <th className="p-4 font-medium">Order</th>
                <th className="p-4 font-medium">Level</th>
                <th className="p-4 font-medium">Activity</th>
                <th className="p-4 font-medium">Content</th>
                <th className="p-4 font-medium">Reward</th>
                <th className="p-4 font-medium">Unlock Rule</th>
                <th className="p-4 font-medium text-center">Status</th>
                <th className="p-4 font-medium text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2DFFC] text-[#0A0847CC]">
              {visible.length === 0 && (
                <tr><td colSpan={8} className="p-8 text-center text-gray-400">No levels found.</td></tr>
              )}
              {visible.map((l) => (
                <tr
                  key={l.id}
                  draggable
                  onDragStart={() => setDragId(l.id)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop(l.id)}
                  onDragEnd={() => setDragId(null)}
                  className={`hover:bg-gray-50/50 transition-colors ${dragId === l.id ? "opacity-40" : ""}`}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-1.5">
                      <EightDotsIconSvg size={10} className="text-gray-400 cursor-grab" />
                      <span className="font-medium">{orderOf(l)}</span>
                    </div>
                  </td>
                  <td className="p-4 font-medium whitespace-nowrap">{l.level}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-md text-xs font-medium border inline-block whitespace-nowrap ${ACTIVITY_STYLES[l.activity] || "bg-gray-100 text-gray-600 border-gray-200"}`}>
                      {l.activity}
                    </span>
                  </td>
                  <td className="p-4 font-medium whitespace-nowrap">{l.content}</td>
                  <td className="p-4 font-medium whitespace-nowrap">{l.reward}</td>
                  <td className="p-4 font-medium whitespace-nowrap">{l.unlock}</td>
                  <td className="p-4 text-center">
                    <span className={`px-3 py-1 rounded-md text-xs font-medium border inline-block ${STATUS_STYLES[l.status]}`}>
                      {l.status}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <LevelActionsMenu
                      isOpen={openActionId === l.id}
                      status={l.status}
                      onToggle={() => setOpenActionId((p) => (p === l.id ? null : l.id))}
                      onAction={(key) => handleAction(key, l)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#0A084799]">
        <div className="flex items-center gap-2">
          <span className="text-[#0A0847CC] font-medium">Display</span>
          <div className="relative">
            <select
              value={entriesPerPage}
              onChange={(e) => { setEntriesPerPage(e.target.value); setPage(1); }}
              className="appearance-none border border-[#E2DFFC] rounded-lg px-2.5 py-1 pr-6 text-xs text-[#0A0847] bg-white outline-none cursor-pointer"
            >
              <option value="05">05</option>
              <option value="10">10</option>
              <option value="25">25</option>
            </select>
            <FiChevronDown size={12} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <span>Levels</span>
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
                currentPage === n ? "bg-[#001984] text-white font-bold" : "text-gray-600 hover:bg-gray-50 font-medium"
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
      {formModal && (
  <LevelFormModal
    key={formModal.level?.id || "new"}
    mode={formModal.mode}
    level={formModal.level}
    levels={levels}
    onClose={() => setFormModal(null)}
    onSave={(saved) =>
      setLevels((prev) =>
        prev.some((l) => l.id === saved.id)
          ? prev.map((l) => (l.id === saved.id ? saved : l))
          : [...prev, saved]
      )
    }
  />
)}

{detailsId && (
  <LevelDetailsModal onClose={() => setDetailsId(null)} />
)}
    </div>
  );
}