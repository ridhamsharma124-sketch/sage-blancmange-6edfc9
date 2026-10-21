import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiPlus, FiEye, FiSearch, FiChevronDown, FiChevronLeft, FiChevronRight,
  FiEdit2, FiTrash2, FiMoreVertical, FiInfo, FiBookOpen, FiCheckCircle, FiFileText,
} from "react-icons/fi";
import { MdDragIndicator } from "react-icons/md";
import BlueBook from "../../../assets/BibbleBookSvgs/BlueBook.svg"
import GreenBook from "../../../assets/BibbleBookSvgs/GreenBook.svg"
import PurpleBook from "../../../assets/BibbleBookSvgs/PurpleBook.svg"
import OrangeFile from "../../../assets/BibbleBookSvgs/OrangeFile.svg"
import CheckMarkIcon from "../../../assets/BibbleBookSvgs/CheckMarkIcon.svg"
import EditIcon from "../../../assets/BibbleBookSvgs/Edit.svg"
import TrashRedIcon from "../../../assets/BibbleBookSvgs/TrashRedIcon.svg"

const INITIAL_BOOKS = [
  { id: "1", name: "Genesis", testament: "Old Testament", chapters: 50, articles: 142, status: "Published", updated: "May 18, 2024" },
  { id: "2", name: "Exodus", testament: "Old Testament", chapters: 40, articles: 128, status: "Published", updated: "May 18, 2024" },
  { id: "3", name: "Leviticus", testament: "Old Testament", chapters: 27, articles: 98, status: "Published", updated: "May 18, 2024" },
  { id: "4", name: "Numbers", testament: "Old Testament", chapters: 36, articles: 110, status: "Published", updated: "May 18, 2024" },
  { id: "5", name: "Deuteronomy", testament: "Old Testament", chapters: 34, articles: 102, status: "Published", updated: "May 18, 2024" },
  { id: "6", name: "Habakkuk", testament: "Old Testament", chapters: 3, articles: 18, status: "Published", updated: "May 18, 2024" },
  { id: "7", name: "Zephaniah", testament: "Old Testament", chapters: 3, articles: 16, status: "Published", updated: "May 18, 2024" },
  { id: "8", name: "Matthew", testament: "New Testament", chapters: 4, articles: 23, status: "Published", updated: "May 18, 2024" },
  { id: "9", name: "Mark", testament: "New Testament", chapters: 28, articles: 96, status: "Published", updated: "May 18, 2024" },
  { id: "10", name: "Luke", testament: "New Testament", chapters: 16, articles: 62, status: "Published", updated: "May 18, 2024" },
];

// Replace with API totals
const STATS = { all: 66, old: 39, new: 27, newChapters: 27, published: 66 };

 const SvgIcon = ({ src, size = 16, className = "" }) => (
           <img src={src} alt="" width={size} height={size} className={`shrink-0 ${className}`} />
         );
         
    const EditIconSvg = (p) => <SvgIcon src={EditIcon} {...p} />;
    const TrashRedIconSvg = (p) => <SvgIcon src={TrashRedIcon} {...p} />;

const StatCard = ({ icon, iconBg, value, label }) => (
  <div className="bg-white rounded-lg border border-[#E2DFFC] px-4 py-6 flex items-center gap-4">
    <div className={`w-14 h-14 rounded-xl ${iconBg} flex items-center justify-center shrink-0`}>
       <img src={icon} alt="" className="w-8 h-8" />
    </div>
    <div>
      <p className="text-2xl font-semibold text-[#001984] leading-none">{value}</p>
      <p className="text-sm font-medium text-[#0A084799] mt-1.5">{label}</p>
    </div>
  </div>
);

const TestamentBadge = ({ value }) => (
  <span
    className={`px-3 py-1 rounded-md text-xs font-medium border inline-block whitespace-nowrap ${
      value === "Old Testament"
        ? "bg-[#21AC1C1A] text-[#21AC1C] border-[#DAF3C8]"
        : "bg-[#1617E31A] text-[#1617E3] border-[#D4D4FB]"
    }`}
  >
    {value}
  </span>
);

const StatusBadge = ({ status }) => (
  <span className="px-3 py-1 rounded-md text-xs font-medium border inline-block bg-[#21AC1C1A] text-[#21AC1C] border-[#DAF3C8]">
    {status}
  </span>
);

const Dropdown = ({ value, onChange, options, allLabel }) => (
  <div className="relative">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="appearance-none bg-white border border-[#E2DFFC] rounded-md px-3.5 py-3 pr-8 text-xs font-medium text-[#0A0847CC] outline-none cursor-pointer focus:border-[#001984] min-w-[150px]"
    >
      <option value="">{allLabel}</option>
      {options.map((o) => <option key={o}>{o}</option>)}
    </select>
    <FiChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
  </div>
);

export default function BibleBooksPage() {
  const navigate = useNavigate();
  const [books, setBooks] = useState(INITIAL_BOOKS);
  const [tab, setTab] = useState("All Books");
  const [search, setSearch] = useState("");
  const [testamentFilter, setTestamentFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [page, setPage] = useState(1);
  const [dragId, setDragId] = useState(null);

  const tabs = [
    { label: "All Books" },
    { label: "Old Testament", count: STATS.old },
    { label: "New Testament", count: STATS.new },
  ];

  const filtered = books.filter((b) => {
    const tabOk = tab === "All Books" || b.testament === tab;
    const tOk = testamentFilter ? b.testament === testamentFilter : true;
    const sOk = statusFilter ? b.status === statusFilter : true;
    return tabOk && tOk && sOk && b.name.toLowerCase().includes(search.toLowerCase());
  });

  const canReorder = tab === "All Books" && !search && !testamentFilter && !statusFilter;

  const perPage = parseInt(entriesPerPage, 10);
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);
  const pageNumbers = Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1);

  const handleDrop = (targetId) => {
    if (!dragId || dragId === targetId) return;
    setBooks((prev) => {
      const next = [...prev];
      const from = next.findIndex((b) => b.id === dragId);
      const to = next.findIndex((b) => b.id === targetId);
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
    setDragId(null);
  };

  const deleteBook = (id) => setBooks((prev) => prev.filter((b) => b.id !== id));

  return (
    <div className="p-6 bg-[#F8FAFC] min-h-screen font-[Inter] space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-[#0A0847]">Bible Books</h1>
          <p className="text-sm text-[#0A084799] font-medium mt-2">
            Manage all Bible books and their user page content.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="px-5 py-2.5 bg-white border border-[#001984] text-[#001984] rounded-md text-xs font-semibold flex items-center gap-2 hover:bg-[#EEF2FF] transition-colors cursor-pointer"
          >
            <FiEye size={14} /> View On User
          </button>
          <button
            type="button"
            className="px-5 py-2.5 bg-[#001984] text-white rounded-md text-xs font-semibold flex items-center gap-2 hover:bg-[#001266] transition-colors cursor-pointer"
          >
            <FiPlus size={16} /> Add New Book
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={PurpleBook} iconBg="bg-[#EDE9FE] text-[#7C3AED]" value={STATS.all} label="All Books" />
        <StatCard icon={GreenBook} iconBg="bg-[#DCFCE7] text-[#16A34A]" value={STATS.old} label="Old Testament" />
        <StatCard icon={BlueBook} iconBg="bg-[#DBEAFE] text-[#2563EB]" value={STATS.new} label="New Testament" />
        <StatCard icon={OrangeFile} iconBg="bg-[#FFEDD5] text-[#EA580C]" value={STATS.newChapters} label="New Chapters" />
        <StatCard icon={CheckMarkIcon} iconBg="bg-[#DCFCE7] text-[#16A34A]" value={STATS.published} label="Published" />
      </div>

      {/* Tabs + filters */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-6 text-xs font-medium">
          {tabs.map((t) => {
            const active = tab === t.label;
            return (
              <button
                key={t.label}
                type="button"
                onClick={() => { setTab(t.label); setPage(1); }}
                className={`px-6 py-4 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                  active ? "border-[#001984] text-[#001984] font-semibold" : "border-transparent text-[#0A084799] hover:text-[#0A0847]"
                }`}
              >
                {t.label}{t.count !== undefined && ` (${t.count})`}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <FiSearch size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search topics..."
              className="w-64 bg-white border border-[#E2DFFC] rounded-md pl-9 pr-3 py-3 text-xs text-[#0A0847] placeholder-gray-400 outline-none focus:border-[#001984]"
            />
          </div>
          <Dropdown value={testamentFilter} onChange={(v) => { setTestamentFilter(v); setPage(1); }} options={["Old Testament", "New Testament"]} allLabel="All Testaments" />
          <Dropdown value={statusFilter} onChange={(v) => { setStatusFilter(v); setPage(1); }} options={["Published", "Draft"]} allLabel="All Statuses" />
        </div>
      </div>

      {/* Info banner */}
      <div className="flex items-center gap-2 bg-[#EEF0FB] border border-[#CBC6F8] rounded-md px-3 py-2.5 text-[11px] font-medium text-[#0A0847CC]">
        <FiInfo size={13} className="text-gray-500 shrink-0" />
        Drag and drop books to reorder them. The order will be reflected in the app.
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-[#E2DFFC] p-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[860px]">
            <thead className="bg-[#F3F7FD]">
              <tr className="text-sm text-[#0A0847CC] font-medium">
                <th className="p-4 font-medium">Order</th>
                <th className="p-4 font-medium">Book Name</th>
                <th className="p-4 font-medium">Testament</th>
                <th className="p-4 font-medium">Chapters</th>
                <th className="p-4 font-medium">Articles</th>
                <th className="p-4 font-medium text-center">Status</th>
                <th className="p-4 font-medium">Last Updated</th>
                <th className="p-4 font-medium text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2DFFC] text-[#0A0847CC]">
              {visible.length === 0 && (
                <tr><td colSpan={8} className="p-8 text-center text-gray-400">No books found.</td></tr>
              )}
              {visible.map((b) => {
                const order = books.findIndex((x) => x.id === b.id) + 1;
                return (
                  <tr
                    key={b.id}
                    draggable={canReorder}
                    onDragStart={() => setDragId(b.id)}
                    onDragOver={(e) => canReorder && e.preventDefault()}
                    onDrop={() => canReorder && handleDrop(b.id)}
                    onDragEnd={() => setDragId(null)}
                    className={`hover:bg-gray-50/50 transition-colors ${dragId === b.id ? "opacity-40" : ""}`}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-1.5">
                        <MdDragIndicator size={18} className={`text-gray-400 ${canReorder ? "cursor-grab" : "opacity-40"}`} />
                        <span className="font-medium">{order}</span>
                      </div>
                    </td>
                    <td className="p-4 font-medium">{b.name}</td>
                    <td className="p-4"><TestamentBadge value={b.testament} /></td>
                    <td className="p-4 font-medium">{b.chapters}</td>
                    <td className="p-4 font-medium">{b.articles}</td>
                    <td className="p-4 text-center"><StatusBadge status={b.status} /></td>
                    <td className="p-4 font-medium whitespace-nowrap">{b.updated}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => navigate(`/admin/bible-books/edit/${b.id}`)}
                          className="w-8 h-8 rounded-md border border-[#E2DFFC] text-[#001984] flex items-center justify-center hover:bg-[#EEF2FF] transition-colors cursor-pointer"
                        >
                          <EditIconSvg size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteBook(b.id)}
                          className="w-8 h-8 rounded-md border border-[#E2DFFC] text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors cursor-pointer"
                        >
                          <TrashRedIconSvg size={16} />
                        </button>
                        <button
                          type="button"
                          className="w-8 h-8 rounded-md bg-[#E9E9E9] text-gray-600 flex items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer"
                        >
                          <FiMoreVertical size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#0A084799]">
        <div className="flex items-center gap-2">
          <span className="text-[#0A0847CC] font-medium">Display</span>
          <div className="relative">
            <select
              value={entriesPerPage}
              onChange={(e) => { setEntriesPerPage(e.target.value); setPage(1); }}
              className="appearance-none border border-[#E2DFFC] rounded-lg px-2.5 py-1 pr-6 text-xs font-semibold text-[#0A0847] bg-white outline-none cursor-pointer"
            >
              <option value="05">05</option>
              <option value="10">10</option>
              <option value="25">25</option>
            </select>
            <FiChevronDown size={12} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <span>books</span>
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
  );
}