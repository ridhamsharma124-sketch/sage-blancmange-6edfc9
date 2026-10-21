import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  FiPlus,
  FiSearch,
  FiMoreVertical,
  FiEye,
  FiEdit2,
  FiDownload,
  FiCopy,
  FiSlash,
  FiTrash2,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiUploadCloud,
  FiRefreshCw,
  FiPlay,
  FiPause,
  FiImage,
  FiBookOpen,
  FiCheckCircle,
  FiFileText,
  FiHeadphones,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import chapterStoryBg from "../../../assets/ChapterStoryBg.png";
import AddWhiteIcon from "../../../assets/ChapterStories/WhiteAddIcon.svg"
import CheckMarkIcon from "../../../assets/ChapterStories/CheckMarkIcon.svg";
import Headphone from "../../../assets/ChapterStories/Headphone.svg";
import PurpleBook from "../../../assets/ChapterStories/PurpleBook.svg";
import OrangeFile from "../../../assets/ChapterStories/OrangeFile.svg";
import UploadIcon from "../../../assets/ChapterStories/UploadIcon.svg";
import ReplaceIcon from "../../../assets/ChapterStories/ReplaceIcon.svg";

/* ==========================================================================
   MOCK DATA
   ========================================================================== */
const THUMBS = [
  "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=80&q=80",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=80&q=80",
  "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?auto=format&fit=crop&w=80&q=80",
];

const INITIAL_STORIES = [
  { id: "1", title: "In the Beginning", testament: "Old Testament", book: "Genesis", chapter: "1", audio: "5:18", reward: 20, assignee: "Maya", status: "Published", format: "Active" },
  { id: "2", title: "Land, Seas & Plants", testament: "Old Testament", book: "Genesis", chapter: "1", audio: "6:04", reward: 20, assignee: "Peter", status: "Published", format: "Active" },
  { id: "3", title: "The Sermon on the Mount", testament: "New Testament", book: "Matthew", chapter: "5", audio: "8:12", reward: 25, assignee: "Unassigned", status: "Disabled", format: "Active" },
  { id: "4", title: "The Beatitudes", testament: "New Testament", book: "Matthew", chapter: "5", audio: "6:36", reward: 20, assignee: "Alex", status: "Draft", format: "Active" },
  { id: "5", title: "The Beatitudes", testament: "Old Testament", book: "Genesis", chapter: "1", audio: "6:36", reward: 20, assignee: "Alex", status: "Published", format: "Active" },
  { id: "6", title: "The Beatitudes", testament: "Old Testament", book: "Genesis", chapter: "1", audio: "6:36", reward: 20, assignee: "Alex", status: "Draft", format: "Active" },
].map((s, i) => ({ ...s, image: THUMBS[i % THUMBS.length] }));

// const DEFAULT_HERO =
//   "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1600&q=80";
const DEFAULT_HERO = chapterStoryBg;



/* ==========================================================================
   REUSABLE UI
   ========================================================================== */


    const SvgIcon = ({ src, size = 16, className = "" }) => (
        <img src={src} alt="" width={size} height={size} className={`shrink-0 ${className}`} />
      );
      
         const WhiteAddIconSvg = (p) => <SvgIcon src={AddWhiteIcon} {...p} />;
         const UploadIconSvg = (p) => <SvgIcon src={UploadIcon} {...p} />;
         const ReplaceIconSvg = (p) => <SvgIcon src={ReplaceIcon} {...p} />;

const StatCard = ({ icon, iconBg, valueClass, value, label }) => (
  <div className="bg-white rounded-lg border border-[#E2DFFC] px-4 py-8 flex items-center gap-4">
    <div className={`w-12 h-12 rounded-2xl ${iconBg} flex items-center justify-center shrink-0`}>
      <img src={icon} alt="" className="w-7 h-7" />
    </div>
    <div>
      <p className={`text-xl font-semibold ${valueClass}`}>{value}</p>
      <p className="text-xs font-semibold text-[#001984] mt-0.5">{label}</p>
    </div>
  </div>
);

const StatusBadge = ({ status }) => {
  const styles = {
    Published: "bg-[#21AC1C1A] text-[#21AC1C] border-[#DAF3C8]",
    Draft: "bg-[#C654061A] text-[#C65406] border-[#F3C9A8]",
    Disabled: "bg-[#0A08471A] text-[#0A0847CC] border-[#E2DFFC]",
  };
  const label = status === "Disabled" ? "Disable" : status;
  return (
    <span
      className={`w-24 py-1 rounded-md text-xs font-medium border inline-block text-center ${styles[status]}`}
    >
      {label}
    </span>
  );
};

const DropdownFilter = ({ value, onChange, options, allLabel }) => (
  <div className="relative">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="appearance-none bg-white border border-[#E2DFFC] rounded-md px-3.5 py-3 pr-9 text-xs font-medium text-[#0A0847CC] outline-none cursor-pointer focus:border-[#001984]"
    >
      <option value="">{allLabel}</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
    <FiChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
  </div>
);

const ActionsMenu = ({ isOpen, onToggle, onDelete, onToggleDisable, onDuplicate, onEdit, onReplaceAudio, onDownload, disabled }) => {
  const btnRef = useRef(null);
  const menuRef = useRef(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    if (!isOpen || !btnRef.current) return;
    const r = btnRef.current.getBoundingClientRect();
    const menuH = 220;
    const menuW = 128;
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
      <button
        ref={btnRef}
        onClick={onToggle}
        className="p-1.5 rounded-md bg-[#E9E9E9] hover:bg-gray-200 text-gray-600 transition-colors cursor-pointer"
      >
        <FiMoreVertical size={18} />
      </button>

      {isOpen &&
        createPortal(
          <div
            ref={menuRef}
            style={{ position: "fixed", top: pos.top, left: pos.left }}
            className="w-32 bg-white rounded-md border border-[#E2DFFC] shadow-md py-1 z-[9999] text-[11px] font-medium text-[#0A0847CC]"
          >
            <button onClick={onReplaceAudio} className={item}>
              <FiEye size={13} className="text-gray-500" /> Replace Audio
            </button>
            <button onClick={onEdit} className={item}>
              <FiEdit2 size={13} className="text-gray-500" /> Edit
            </button>
            <button onClick={onDownload} className={item}>
              <FiDownload size={13} className="text-gray-500" /> Download
            </button>
            <button onClick={onDuplicate} className={item}>
              <FiCopy size={13} className="text-gray-500" /> Duplicate
            </button>
            <button onClick={onToggleDisable} className={item}>
              <FiSlash size={13} className="text-gray-500" /> {disabled ? "Enable" : "Disable"}
            </button>
            <button
              onClick={onDelete}
              className="w-full px-3 py-2.5 text-left hover:bg-red-50 text-[#E11D2E] flex items-center gap-2 transition-colors border-t border-gray-100 cursor-pointer"
            >
              <FiTrash2 size={13} /> Delete
            </button>
          </div>,
          document.body
        )}
    </>
  );
};


export default function ChapterStoriesPage() {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const audioInputRef = useRef(null);
  const replaceTargetRef = useRef(null);
  const audioPlayerRef = useRef(null);

  const [stories, setStories] = useState(INITIAL_STORIES);
  const [heroImage, setHeroImage] = useState(DEFAULT_HERO);
  const [heroError, setHeroError] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const [search, setSearch] = useState("");
  const [testament, setTestament] = useState("");
  const [book, setBook] = useState("");
  const [chapter, setChapter] = useState("");
  const [status, setStatus] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [openActionId, setOpenActionId] = useState(null);
  const [playingId, setPlayingId] = useState(null);

  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [page, setPage] = useState(1);

  /* ---------- Hero image ---------- */
  const handleHeroUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setHeroError(false);
      setHeroImage(URL.createObjectURL(file));
    }
    e.target.value = "";
  };

  /* ---------- Row actions ---------- */
  const handleDelete = (id) => {
    setStories((p) => p.filter((s) => s.id !== id));
    setSelectedIds((p) => p.filter((i) => i !== id));
    setOpenActionId(null);
  };

  const handleToggleDisable = (id) => {
    setStories((p) =>
      p.map((s) => (s.id === id ? { ...s, status: s.status === "Disabled" ? "Draft" : "Disabled" } : s))
    );
    setOpenActionId(null);
  };

  const handleDuplicate = (id) => {
    setStories((p) => {
      const idx = p.findIndex((s) => s.id === id);
      if (idx < 0) return p;
      const copy = { ...p[idx], id: crypto.randomUUID(), status: "Draft" };
      const next = [...p];
      next.splice(idx + 1, 0, copy);
      return next;
    });
    setOpenActionId(null);
  };

  const handleReplaceAudio = (id) => {
    replaceTargetRef.current = id;
    setOpenActionId(null);
    audioInputRef.current?.click();
  };

  const handleAudioChosen = (e) => {
    const file = e.target.files[0];
    const id = replaceTargetRef.current;
    if (file && id) {
      const url = URL.createObjectURL(file);
      const probe = new Audio(url);
      probe.onloadedmetadata = () => {
        const m = Math.floor(probe.duration / 60);
        const s = String(Math.floor(probe.duration % 60)).padStart(2, "0");
        setStories((p) => p.map((x) => (x.id === id ? { ...x, audio: `${m}:${s}`, audioUrl: url } : x)));
      };
      setStories((p) => p.map((x) => (x.id === id ? { ...x, audioUrl: url } : x)));
    }
    e.target.value = "";
  };

  const handleDownload = (item) => {
    setOpenActionId(null);
    if (item.audioUrl) {
      const a = document.createElement("a");
      a.href = item.audioUrl;
      a.download = `${item.title}.mp3`;
      a.click();
    } else {
      alert("No audio file uploaded for this story yet.");
    }
  };

  const togglePlay = (item) => {
    if (!item.audioUrl) {
      alert("No audio file uploaded for this story yet. Use Replace Audio.");
      return;
    }
    if (playingId === item.id) {
      audioPlayerRef.current?.pause();
      setPlayingId(null);
      return;
    }
    if (audioPlayerRef.current) audioPlayerRef.current.pause();
    const player = new Audio(item.audioUrl);
    audioPlayerRef.current = player;
    player.onended = () => setPlayingId(null);
    player.play();
    setPlayingId(item.id);
  };

  /* ---------- Filtering ---------- */
  const books = [...new Set(stories.filter((s) => !testament || s.testament === testament).map((s) => s.book))];
  const chapters = [...new Set(stories.filter((s) => (!book || s.book === book)).map((s) => s.chapter))];

  const filtered = stories.filter((s) => {
    const q = search.toLowerCase();
    return (
      s.title.toLowerCase().includes(q) &&
      (!testament || s.testament === testament) &&
      (!book || s.book === book) &&
      (!chapter || s.chapter === chapter) &&
      (!status || s.status === status)
    );
  });

  const resetFilters = () => {
    setSearch("");
    setTestament("");
    setBook("");
    setChapter("");
    setStatus("");
    setPage(1);
  };

  /* ---------- Pagination ---------- */
  const perPage = parseInt(entriesPerPage, 10);
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);
  const pageNumbers = Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1);

  const allSelected = visible.length > 0 && visible.every((s) => selectedIds.includes(s.id));
  const handleSelectAll = (e) => {
    const ids = visible.map((s) => s.id);
    setSelectedIds((p) => (e.target.checked ? [...new Set([...p, ...ids])] : p.filter((i) => !ids.includes(i))));
  };
  const handleSelectRow = (id) =>
    setSelectedIds((p) => (p.includes(id) ? p.filter((i) => i !== id) : [...p, id]));

  /* ---------- Stats ---------- */
  const publishedCount = stories.filter((s) => s.status === "Published").length;
  const draftCount = stories.filter((s) => s.status === "Draft").length;

  return (
    <div className="p-6 bg-[#F8FAFC] min-h-screen font-[Inter] space-y-6">
      {/* Hidden audio input for Replace Audio */}
      <input type="file" ref={audioInputRef} accept="audio/*" onChange={handleAudioChosen} className="hidden" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-[#0A0847]">Chapter Stories</h1>
          <p className="text-sm text-[#0A084799] font-medium mt-2">
            Manage chapter audio stories, rewards, and homepage artwork.
          </p>
        </div>
        <button
          onClick={() => navigate("/admin/chapter-stories/add")}
          className="bg-[#001984] hover:bg-[#001266] text-white text-xs font-medium px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <WhiteAddIconSvg size={16} /> Add Chapter Story
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={PurpleBook} iconBg="bg-[#EFE7FD] text-[#6D28D9]" valueClass="text-[#6209FD]" value="1,189" label="Total Stories" />
        <StatCard icon={CheckMarkIcon} iconBg="bg-[#2BA4521A] text-[#2BA452]" valueClass="text-[#2BA452]" value="1,124" label="Published" />
        <StatCard icon={OrangeFile} iconBg="bg-[#F3E8D8] text-[#C65406]" valueClass="text-[#C65406]" value="42" label="Drafts" />
        <StatCard icon={Headphone} iconBg="bg-[#E4EEFC] text-[#1D6FE0]" valueClass="text-[#1617E3]" value="96h 18m" label="Total Audio" />
      </div>

      {/* Homepage image card */}
      <div className="bg-white rounded-lg border border-[#E2DFFC] p-4">
        <h2 className="text-xl font-semibold text-[#0A0847]">Chapter Stories Homepage Image</h2>
        <p className="text-sm text-[#0A084799] font-medium mt-1 mb-5">Recommended 1600 × 400 • JPG or PNG</p>

        <input type="file" ref={heroRef} accept="image/png,image/jpeg" onChange={handleHeroUpload} className="hidden" />

        <div className="border border-[#E2DFFC] bg-[#F6F7FF] rounded-lg p-6 grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-6 items-center">
          <div className="rounded-xl overflow-hidden bg-gray-100 h-52 flex items-center justify-center">
            {heroImage && !heroError ? (
              <img
                src={heroImage}
                alt="Chapter stories homepage"
                onError={() => setHeroError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-gray-400">
                <FiImage size={28} />
                <span className="text-xs font-medium">Please select an image first to view</span>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => heroRef.current?.click()}
            className="flex flex-col items-center gap-2 text-[#0A0847CC] cursor-pointer"
          >
            <UploadIconSvg size={30} className="text-[#001984]" />
            <span className="text-xs font-medium text-center">
              Recommended
              <br />
              1600 × 400 • JPG
              <br />
              or PNG
            </span>
          </button>
        </div>

        <div className="flex items-center justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={() => setShowPreview(true)}
            disabled={!heroImage || heroError}
            className="px-5 py-3 border border-[#E2DFFC] bg-white text-[#0A0847] text-xs font-semibold rounded-md flex items-center gap-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <FiEye size={16} /> Preview
          </button>
          <button
            type="button"
            onClick={() => heroRef.current?.click()}
            className="px-5 py-3 bg-[#001984] hover:bg-[#001266] text-white text-xs font-semibold rounded-md flex items-center gap-2 transition-colors cursor-pointer"
          >
            <ReplaceIconSvg size={16} /> Replace Image
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-3">
        <div className="relative w-full xl:w-80">
          <FiSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search title..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full bg-white border border-[#E2DFFC] rounded-md pl-9 pr-3 py-3 text-xs text-[#0A0847] placeholder-gray-400 outline-none focus:border-[#001984]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <DropdownFilter
            allLabel="All Testaments"
            value={testament}
            options={["Old Testament", "New Testament"]}
            onChange={(v) => {
              setTestament(v);
              setBook("");
              setChapter("");
              setPage(1);
            }}
          />
          <DropdownFilter
            allLabel="All Books"
            value={book}
            options={books}
            onChange={(v) => {
              setBook(v);
              setChapter("");
              setPage(1);
            }}
          />
          <DropdownFilter
            allLabel="All Chapters"
            value={chapter}
            options={chapters}
            onChange={(v) => {
              setChapter(v);
              setPage(1);
            }}
          />
          <DropdownFilter
            allLabel="All Statuses"
            value={status}
            options={["Published", "Draft", "Disabled"]}
            onChange={(v) => {
              setStatus(v);
              setPage(1);
            }}
          />
          <button
            type="button"
            onClick={resetFilters}
            className="px-8 py-3 bg-[#F1F2F9] border border-[#E2DFFC] text-[#0A0847CC] text-xs font-medium rounded-md hover:bg-[#E9EAF7] transition-colors cursor-pointer"
          >
            Reset
          </button>
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
                    checked={allSelected}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 accent-[#001984] cursor-pointer"
                  />
                </th>
                {["Story", "Bible Location", "Audio", "Reward", "Assignee", "Format"].map((h) => (
                  <th key={h} className="p-4 font-medium text-sm text-[#0A0847CC]">
                    {h}
                  </th>
                ))}
                <th className="p-4 font-medium text-sm text-[#0A0847CC] text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#E2DFFC] text-[#0A0847]">
              {visible.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-gray-400">
                    No stories found.
                  </td>
                </tr>
              )}

              {visible.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(s.id)}
                      onChange={() => handleSelectRow(s.id)}
                      className="rounded border-gray-300 accent-[#001984] cursor-pointer"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={s.image} alt={s.title} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                      <p className="font-medium text-[#0A0847CC] max-w-[110px]">{s.title}</p>
                    </div>
                  </td>
                  <td className="p-4 font-medium text-[#0A0847CC] whitespace-nowrap">
                    {s.testament} – {s.book} {s.chapter}
                  </td>
                  <td className="p-4 font-medium text-[#0A0847CC] whitespace-nowrap">Audio: {s.audio}</td>
                  <td className="p-4 font-medium text-[#0A0847CC] whitespace-nowrap">{s.reward} pts</td>
                  <td className="p-4 font-medium text-[#0A0847CC]">{s.assignee}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <StatusBadge status={s.status} />
                      <button
                        type="button"
                        onClick={() => togglePlay(s)}
                        className="px-3 py-1.5 border border-[#E2DFFC] rounded-md flex items-center gap-2 text-xs font-medium text-[#001984] hover:bg-[#EEF2FF] transition-colors cursor-pointer"
                      >
                        {playingId === s.id ? <FiPause size={12} /> : <FiPlay size={12} className="fill-[#001984]" />}
                        {s.format}
                      </button>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <ActionsMenu
                      isOpen={openActionId === s.id}
                      onToggle={() => setOpenActionId((p) => (p === s.id ? null : s.id))}
                      disabled={s.status === "Disabled"}
                      onDelete={() => handleDelete(s.id)}
                      onToggleDisable={() => handleToggleDisable(s.id)}
                      onDuplicate={() => handleDuplicate(s.id)}
                      onEdit={() => {
                        setOpenActionId(null);
                        navigate(`/admin/chapter-stories/${s.id}/edit`, { state: { story: s } });
                      }}
                      onReplaceAudio={() => handleReplaceAudio(s.id)}
                      onDownload={() => handleDownload(s)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#0A084799]">
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
              <FiChevronDown size={12} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
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
      </div>

      {/* Preview modal */}
      {showPreview &&
        createPortal(
          <div
            onClick={() => setShowPreview(false)}
            className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center p-6"
          >
            <img
              src={heroImage}
              alt="Preview"
              onClick={(e) => e.stopPropagation()}
              className="max-w-full max-h-[85vh] rounded-xl"
            />
          </div>,
          document.body
        )}
    </div>
  );
}