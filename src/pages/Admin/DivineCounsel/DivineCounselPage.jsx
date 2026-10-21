import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  FiFolder,
  FiSettings,
  FiPlus,
  FiSearch,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiMoreVertical,
  FiEye,
  FiEdit2,
  FiDownload,
  FiCopy,
  FiSlash,
  FiTrash2,
  FiPlay,
  FiPause,
  FiBookOpen,
  FiCheckCircle,
  FiFileText,
  FiHeadphones,
  FiUploadCloud,
  FiImage,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import CheckMarkIcon from "../../../assets/DivineCounselSvgs/CheckMarkIcon.svg";
import Headphones from "../../../assets/DivineCounselSvgs/Headphone.svg";
import OrangeFile from "../../../assets/DivineCounselSvgs/OrangeFile.svg";
import PurpleBook from "../../../assets/DivineCounselSvgs/PurpleBook.svg";
import UploadIcon from "../../../assets/DivineCounselSvgs/UploadIcon.svg";
import Edit from "../../../assets/DivineCounselSvgs/Edit.svg";


/* ==========================================================================
   MOCK DATA
   ========================================================================== */
const THUMBS = [
  "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=80&q=80",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=80&q=80",
];

const INITIAL_TOPICS = [
  { id: "1", title: "Marriage", category: "Relationships", subtopics: 3, scriptures: 6, length: "3 min", status: "Published", updated: "May 16, 2025, 2:30 PM" },
  { id: "2", title: "Loneliness", category: "Emotional Health", subtopics: 2, scriptures: 4, length: "2 min", status: "Published", updated: "May 15, 2025, 11:20 AM" },
  { id: "3", title: "Anxiety", category: "Emotional Health", subtopics: 3, scriptures: 5, length: "4 min", status: "Disabled", updated: "May 14, 2025, 9:40 AM" },
  { id: "4", title: "Forgiveness", category: "Spiritual Growth", subtopics: 2, scriptures: 4, length: "3 min", status: "Draft", updated: "May 13, 2025, 4:10 PM" },
].map((t, i) => ({ ...t, image: THUMBS[i % THUMBS.length] }));

const DEFAULT_HERO =
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1600&q=80";

/* ==========================================================================
   ATOMS
   ========================================================================== */


    const SvgIcon = ({ src, size = 16, className = "" }) => (
              <img src={src} alt="" width={size} height={size} className={`shrink-0 ${className}`} />
            );
            
       const UploadIconSvg = (p) => <SvgIcon src={UploadIcon} {...p} />;
       const EditIconSvg = (p) => <SvgIcon src={Edit} {...p} />;



const StatCard = ({ icon, iconBg, valueClass, value, label }) => (
  <div className="bg-white rounded-lg border border-[#E2DFFC] px-4 py-8 flex items-center gap-4">
    <div className={`w-14 h-14 rounded-2xl ${iconBg} flex items-center justify-center shrink-0`}>
      <img src={icon} alt="" className="w-7 h-7" />
    </div>
    <div>
      <p className={`text-xl font-semibold ${valueClass}`}>{value}</p>
      <p className="text-sm font-semibold text-[#0A084799] mt-0.5">{label}</p>
    </div>
  </div>
);

const STATUS_STYLES = {
  Published: "bg-[#21AC1C1A] text-[#21AC1C] border-[#DAF3C8]",
  Draft: "bg-[#C654061A] text-[#C65406] border-[#F3C9A8]",
  Disabled: "bg-[#0A08471A] text-[#0A0847CC] border-[#E2DFFC]",
};

const StatusBadge = ({ status }) => (
  <span className={`w-24 py-1 rounded-md text-xs font-medium border inline-block text-center ${STATUS_STYLES[status]}`}>
    {status === "Disabled" ? "Disable" : status}
  </span>
);

const DropdownFilter = ({ value, onChange, options, allLabel }) => (
  <div className="relative">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="appearance-none bg-white border border-[#E2DFFC] rounded-md px-3.5 py-3 pr-9 text-xs font-medium text-[#0A0847CC] outline-none cursor-pointer focus:border-[#001984]"
    >
      <option value="">{allLabel}</option>
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
    <FiChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
  </div>
);

const ActionsMenu = ({ isOpen, onToggle, onEdit, onDuplicate, onToggleDisable, onDelete, onReplaceAudio, onDownload, disabled }) => {
  const btnRef = useRef(null);
  const menuRef = useRef(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    if (!isOpen || !btnRef.current) return;
    const r = btnRef.current.getBoundingClientRect();
    const menuH = 220, menuW = 144;
    const top = r.bottom + menuH > window.innerHeight ? r.top - menuH - 4 : r.bottom + 4;
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

  const item = "w-full px-3 py-2.5 text-left hover:bg-gray-50 flex items-center gap-2 transition-colors cursor-pointer";

  return (
    <>
      <button ref={btnRef} onClick={onToggle} className="p-1.5 rounded-lg bg-[#E9E9E9] hover:bg-gray-200 text-gray-600 transition-colors cursor-pointer">
        <FiMoreVertical size={18} />
      </button>
      {isOpen &&
        createPortal(
          <div ref={menuRef} style={{ position: "fixed", top: pos.top, left: pos.left }} className="w-36 bg-white rounded-md border border-[#E2DFFC] shadow-md py-1 z-[9999] text-xs font-medium text-[#0A0847CC]">
            <button onClick={onReplaceAudio} className={item}><FiEye size={13} className="text-gray-500" /> Replace Audio</button>
            <button onClick={onEdit} className={item}><FiEdit2 size={13} className="text-gray-500" /> Edit</button>
            <button onClick={onDownload} className={item}><FiDownload size={13} className="text-gray-500" /> Download</button>
            <button onClick={onDuplicate} className={item}><FiCopy size={13} className="text-gray-500" /> Duplicate</button>
            <button onClick={onToggleDisable} className={item}><FiSlash size={13} className="text-gray-500" /> {disabled ? "Enable" : "Disable"}</button>
            <button onClick={onDelete} className="w-full px-3 py-2.5 text-left hover:bg-red-50 text-[#E11D2E] flex items-center gap-2 border-t border-gray-100 cursor-pointer">
              <FiTrash2 size={13} /> Delete
            </button>
          </div>,
          document.body
        )}
    </>
  );
};

/* ==========================================================================
   PAGE
   ========================================================================== */
export default function DivineCounselManagementPage() {
  const navigate = useNavigate();
  const heroRef = useRef(null);

  const [topics, setTopics] = useState(INITIAL_TOPICS);
  const [heroImage, setHeroImage] = useState(DEFAULT_HERO);
  const [heroError, setHeroError] = useState(false);
  const [showPopular, setShowPopular] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [sortBy, setSortBy] = useState("Recently Updated");
  const [openActionId, setOpenActionId] = useState(null);
  const [playingId, setPlayingId] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [page, setPage] = useState(1);

  const categories = [...new Set(topics.map((t) => t.category))];

  const handleHeroUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setHeroError(false);
      setHeroImage(URL.createObjectURL(file));
    }
    e.target.value = "";
  };

  const handleDelete = (id) => {
    setTopics((p) => p.filter((t) => t.id !== id));
    setOpenActionId(null);
  };
  const handleToggleDisable = (id) => {
    setTopics((p) => p.map((t) => (t.id === id ? { ...t, status: t.status === "Disabled" ? "Draft" : "Disabled" } : t)));
    setOpenActionId(null);
  };
  const handleDuplicate = (id) => {
    setTopics((p) => {
      const i = p.findIndex((t) => t.id === id);
      if (i < 0) return p;
      const copy = { ...p[i], id: crypto.randomUUID(), status: "Draft" };
      const next = [...p];
      next.splice(i + 1, 0, copy);
      return next;
    });
    setOpenActionId(null);
  };
  const togglePlay = (id) => setPlayingId((p) => (p === id ? null : id));

  const filtered = topics.filter((t) => {
    const q = search.toLowerCase();
    return (
      t.title.toLowerCase().includes(q) &&
      (!category || t.category === category) &&
      (!status || t.status === status)
    );
  });
  const sorted = [...filtered].sort((a, b) =>
    sortBy === "Recently Updated" ? b.updated.localeCompare(a.updated) : a.title.localeCompare(b.title)
  );

  const perPage = parseInt(entriesPerPage, 10);
  const totalPages = Math.max(1, Math.ceil(sorted.length / perPage));
  const currentPage = Math.min(page, totalPages);
  const visible = sorted.slice((currentPage - 1) * perPage, currentPage * perPage);
  const pageNumbers = Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1);

  const publishedCount = topics.filter((t) => t.status === "Published").length;
  const draftCount = topics.filter((t) => t.status === "Draft").length;

  const hasHero = heroImage && !heroError;

  return (
    <div className="p-6 bg-[#F8FAFC] min-h-screen font-[Inter] space-y-6">
      <input type="file" ref={heroRef} accept="image/png,image/jpeg" onChange={handleHeroUpload} className="hidden" />

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-[#0A0847]">Divine Counsel Management</h1>
          <p className="text-sm text-[#0A084799] font-medium mt-2 max-w-xl">
            Create and manage Scripture-based guidance topics, reflections, audio, prayers, and Amen pages.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button type="button" 
            className="px-4 py-2.5 bg-white border border-[#001984] text-[#0A0847] text-xs font-semibold rounded-md flex items-center gap-2 hover:bg-gray-50 cursor-pointer">
            <FiFolder size={18} /> Manage Categories
          </button>
          <button type="button" 
            className="px-4 py-2.5 bg-white border border-[#001984] text-[#0A0847] text-xs font-semibold rounded-md flex items-center gap-2 hover:bg-gray-50 cursor-pointer">
            <FiSettings size={18} /> Page Settings
          </button>
          <button type="button" onClick={() => navigate("/admin/divine-counsel/add")}
            className="px-4 py-2.5 bg-[#001984] hover:bg-[#001984] text-white text-xs font-semibold rounded-md flex items-center gap-2 cursor-pointer">
            <FiPlus size={18} /> Add New Topic
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={PurpleBook} iconBg="bg-[#EFE7FD] text-[#6D28D9]" valueClass="text-[#001984]" value={topics.length} label="Total Stories" />
        <StatCard icon={CheckMarkIcon} iconBg="bg-[#2BA4521A] text-[#2BA452]" valueClass="text-[#001984]" value={publishedCount} label="Published" />
        <StatCard icon={OrangeFile} iconBg="bg-[#F3E8D8] text-[#C65406]" valueClass="text-[#001984]" value={draftCount} label="Drafts" />
        <StatCard icon={Headphones} iconBg="bg-[#E4EEFC] text-[#1D6FE0]" valueClass="text-[#001984]" value="1h 12m" label="Audio" />
      </div>

      {/* Filters */}
      <div className="flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-3">
        <div className="relative w-full xl:w-80">
          <FiSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search topics..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full bg-white border border-[#E2DFFC] rounded-md pl-9 pr-3 py-3 text-xs text-[#0A0847] placeholder-gray-400 outline-none focus:border-[#001984]"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <DropdownFilter allLabel="All Categories" value={category} options={categories} onChange={(v) => { setCategory(v); setPage(1); }} />
          <DropdownFilter allLabel="All Statuses" value={status} options={["Published", "Draft", "Disabled"]} onChange={(v) => { setStatus(v); setPage(1); }} />
          <DropdownFilter allLabel="Recently Updated" value={sortBy} options={["Recently Updated", "Title (A-Z)"]} onChange={setSortBy} />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-[#E2DFFC] p-5">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[1000px]">
            <thead className="bg-[#F3F7FD] border-b border-[#E2DFFC]">
              <tr>
                <th className="p-4 w-10">
                  <input
                    type="checkbox"
                    checked={visible.length > 0 && visible.every((t) => selectedIds.includes(t.id))}
                    onChange={(e) => {
                      const ids = visible.map((t) => t.id);
                      setSelectedIds((p) => (e.target.checked ? [...new Set([...p, ...ids])] : p.filter((i) => !ids.includes(i))));
                    }}
                    className="rounded border-gray-300 accent-[#001984] cursor-pointer"
                  />
                </th>
                {["Topic", "Category", "Content", "Length", "Audio", "Status", "Updated"].map((h) => (
                  <th key={h} className="p-4 font-medium text-sm text-[#0A0847CC]">{h}</th>
                ))}
                <th className="p-4 font-medium text-sm text-[#0A0847CC] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2DFFC] text-[#0A0847]">
              {visible.length === 0 && (
                <tr><td colSpan={9} className="p-8 text-center text-gray-400">No topics found.</td></tr>
              )}
              {visible.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(t.id)}
                      onChange={() => setSelectedIds((p) => (p.includes(t.id) ? p.filter((i) => i !== t.id) : [...p, t.id]))}
                      className="rounded border-gray-300 accent-[#001984] cursor-pointer"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={t.image} alt={t.title} className="w-9 h-9 rounded-lg object-cover shrink-0" />
                      <p className="font-medium text-[#0A0847CC]">{t.title}</p>
                    </div>
                  </td>
                  <td className="p-4 font-medium text-[#0A0847CC] whitespace-nowrap">{t.category}</td>
                  <td className="p-4 font-medium text-[#0A0847CC] whitespace-nowrap">{t.subtopics} subtopics · {t.scriptures} Scriptures</td>
                  <td className="p-4 font-medium text-[#0A0847CC]">{t.length}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => togglePlay(t.id)}
                        className="w-7 h-7 rounded-full bg-[#001984] text-white flex items-center justify-center shrink-0 cursor-pointer"
                      >
                        {playingId === t.id ? <FiPause size={11} /> : <FiPlay size={11} className="ml-0.5" />}
                      </button>
                      <span className="font-medium text-[#0A0847CC] whitespace-nowrap">00:00 / 03:15</span>
                    </div>
                  </td>
                  <td className="p-4"><StatusBadge status={t.status} /></td>
                  <td className="p-4 font-medium text-[#0A0847CC] whitespace-nowrap">{t.updated}</td>
                  <td className="p-4 text-right">
                    <ActionsMenu
                      isOpen={openActionId === t.id}
                      onToggle={() => setOpenActionId((p) => (p === t.id ? null : t.id))}
                      disabled={t.status === "Disabled"}
                      onEdit={() => { setOpenActionId(null); navigate(`/admin/divine-counsel/${t.id}/edit`, { state: { topic: t } }); }}
                      onDuplicate={() => handleDuplicate(t.id)}
                      onToggleDisable={() => handleToggleDisable(t.id)}
                      onDelete={() => handleDelete(t.id)}
                      onReplaceAudio={() => setOpenActionId(null)}
                      onDownload={() => setOpenActionId(null)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#0A084799]">
          <div className="flex items-center gap-2">
            <span className="text-[#0A0847CC] font-medium">Display</span>
            <div className="relative">
              <select
                value={entriesPerPage}
                onChange={(e) => { setEntriesPerPage(e.target.value); setPage(1); }}
                className="appearance-none border border-[#E2DFFC] rounded-lg px-2.5 py-1 pr-6 text-xs font-semibold text-[#0A0847] outline-none cursor-pointer"
              >
                <option value="05">05</option>
                <option value="10">10</option>
                <option value="25">25</option>
              </select>
              <FiChevronDown size={12} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            <span>Badges</span>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}
              className="w-8 h-8 rounded-lg border border-[#E2DFFC] flex items-center justify-center text-gray-400 hover:bg-gray-50 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed">
              <FiChevronLeft size={16} />
            </button>
            {pageNumbers.map((n) => (
              <button key={n} onClick={() => setPage(n)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer ${currentPage === n ? "bg-[#001984] text-white font-bold" : "text-gray-600 hover:bg-gray-50 font-medium"}`}>
                {n}
              </button>
            ))}
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
              className="w-8 h-8 rounded-lg border border-[#001984] flex items-center justify-center text-[#001984] hover:bg-gray-50 disabled:opacity-50 disabled:border-[#E2DFFC] cursor-pointer disabled:cursor-not-allowed">
              <FiChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* User page card */}
      <div className="bg-white rounded-lg border border-[#E2DFFC] p-6">
        <h3 className="text-lg font-semibold text-[#0A0847] mb-4">Divine Counsel User Page</h3>

        <div className="border border-[#E2DFFC] bg-[#F6F7FF] rounded-lg p-4 grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-6 items-center">
          <div className="rounded-lg overflow-hidden bg-gray-100 h-44 flex items-center justify-center">
            {hasHero ? (
              <img src={heroImage} alt="Divine Counsel cover" onError={() => setHeroError(true)} className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center gap-2 text-gray-400">
                <FiImage size={26} />
                <span className="text-xs font-medium">Please select an image first to view</span>
              </div>
            )}
          </div>
          <button type="button" onClick={() => heroRef.current?.click()} className="flex flex-col items-center gap-2 text-[#0A0847CC] cursor-pointer">
            <UploadIconSvg size={28} className="text-[#001984]" />
            <span className="text-xs font-medium text-center">Recommended<br />1600 × 400 • JPG<br />or PNG</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
          <div className="flex items-center gap-3">
            <button type="button" className="px-5 py-2.5 border border-[#E2DFFC] bg-white text-[#0A0847] text-xs font-semibold rounded-md flex items-center gap-2 hover:bg-gray-50 cursor-pointer">
              <EditIconSvg size={15} /> Edit Welcome Text
            </button>
            <button type="button" onClick={() => heroRef.current?.click()} className="px-5 py-2.5 bg-[#001984] hover:bg-[#001266] text-white text-xs font-semibold rounded-md flex items-center gap-2 cursor-pointer">
              <FiImage size={15} /> Replace Cover Image
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div>
              <p className="text-xs font-semibold text-[#0A0847]">Show Popular Topics</p>
              <p className="text-[10px] italic text-[#0A084799] font-medium mt-0.5">Show explanation after each question.</p>
            </div>
            <button
              type="button"
              onClick={() => setShowPopular((v) => !v)}
              className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer shrink-0 ${showPopular ? "bg-[#001984]" : "bg-gray-200"}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform ${showPopular ? "translate-x-4" : "translate-x-0"}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}