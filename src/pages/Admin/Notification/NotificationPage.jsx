import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  FiPlus,
  FiSearch,
  FiMoreHorizontal,
  FiEye,
  FiEdit2,
  FiCopy,
  FiSend,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
  FiChevronDown,
  FiBell,
  FiCalendar,
  FiFileText,
  FiVolume2,
  FiGift,
  FiAward,
  FiBookOpen,
  FiAlertTriangle,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

/* ==========================================================================
   MOCK DATA
   ========================================================================== */
const TYPE_ICONS = {
  Announcement: { icon: FiVolume2, bg: "bg-[#0E7490]" },
  Promotion: { icon: FiGift, bg: "bg-[#1D9BF0]" },
  Update: { icon: FiAward, bg: "bg-[#E11D48]" },
  Content: { icon: FiBookOpen, bg: "bg-[#7C3AED]" },
  Alert: { icon: FiAlertTriangle, bg: "bg-[#EF4444]" },
};

const INITIAL_NOTIFICATIONS = [
  { id: "1", title: "Spring Challenge 2025 is Live!", desc: "Join the new Spring Challenge and win exciting rewards!", type: "Announcement", audience: "Everyone", status: "Sent", date: "Aug 12, 2025" },
  { id: "2", title: "Double Circle Weekend", desc: "Earn 2x coins on all updates this weekend!", type: "Promotion", audience: "Everyone", status: "Scheduled", date: "Aug 11, 2025" },
  { id: "3", title: "Weekly Leaderboard Update", desc: "Check out the weekly top rankings on the leaderboard.", type: "Update", audience: "Everyone", status: "Scheduled", date: "Aug 10, 2025" },
  { id: "4", title: "New Bible Plan Available", desc: 'Dive into our new "Path to Action" 7-day Bible plan!', type: "Content", audience: "Everyone", status: "Draft", date: "Aug 9, 2025" },
  { id: "5", title: "Maintenance Alert", desc: "We will be performing maintenance on May 30, 2025 at 02:00 AM.", type: "Alert", audience: "Everyone", status: "Sent", date: "Aug 9, 2025" },
];

const TABS = ["All", "Draft", "Scheduled", "Sent", "Expired"];

/* ==========================================================================
   REUSABLE UI
   ========================================================================== */
const StatCard = ({ icon: Icon, iconBg, valueClass, label, value, hint }) => (
  <div className="bg-white rounded-lg border border-[#E2DFFC] px-4 py-8 flex items-center gap-4">
    <div className={`w-14 h-14 rounded-2xl ${iconBg} flex items-center justify-center shrink-0`}>
      <Icon size={26} />
    </div>
    <div>
      <p className="text-sm font-semibold text-[#001984]">{label}</p>
      <p className={`text-xl font-semibold mt-0.5 ${valueClass}`}>{value}</p>
      <p className="text-[11px] text-[#0A084799] font-medium mt-0.5">{hint}</p>
    </div>
  </div>
);

const STATUS_STYLES = {
  Sent: "bg-[#21AC1C1A] text-[#21AC1C] border-[#DAF3C8]",
  Scheduled: "bg-[#1617E31A] text-[#1617E3] border-[#D4D4FB]",
  Draft: "bg-[#C654061A] text-[#C65406] border-[#F3C9A8]",
  Expired: "bg-[#0A08471A] text-[#0A0847CC] border-[#E2DFFC]",
};

const StatusBadge = ({ status }) => (
  <span
    className={`w-24 py-1 rounded-md text-xs font-medium border inline-block text-center ${
      STATUS_STYLES[status] || "bg-gray-100 text-gray-700"
    }`}
  >
    {status}
  </span>
);

const ActionsMenu = ({ isOpen, onToggle, onView, onEdit, onDuplicate, onSend, onDelete, canSend }) => {
  const btnRef = useRef(null);
  const menuRef = useRef(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    if (!isOpen || !btnRef.current) return;
    const r = btnRef.current.getBoundingClientRect();
    const menuH = 200;
    const menuW = 144;
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
        className="p-1.5 rounded-lg bg-[#E9E9E9] hover:bg-gray-200 text-gray-600 transition-colors cursor-pointer"
      >
        <FiMoreHorizontal size={18} />
      </button>

      {isOpen &&
        createPortal(
          <div
            ref={menuRef}
            style={{ position: "fixed", top: pos.top, left: pos.left }}
            className="w-36 bg-white rounded-md border border-[#E2DFFC] shadow-md py-1 z-[9999] text-xs font-medium text-[#0A0847CC]"
          >
            <button onClick={onView} className={item}><FiEye size={14} className="text-gray-500" /> View</button>
            <button onClick={onEdit} className={item}><FiEdit2 size={14} className="text-gray-500" /> Edit</button>
            <button onClick={onDuplicate} className={item}><FiCopy size={14} className="text-gray-500" /> Duplicate</button>
            {canSend && (
              <button onClick={onSend} className={item}><FiSend size={14} className="text-gray-500" /> Send Now</button>
            )}
            <button
              onClick={onDelete}
              className="w-full px-3 py-2.5 text-left hover:bg-red-50 text-[#E11D2E] flex items-center gap-2 border-t border-gray-100 cursor-pointer"
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
   PAGE (NO NAVBAR / NO SIDEBAR)
   ========================================================================== */
export default function NotificationsPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState(INITIAL_NOTIFICATIONS);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("All");
  const [openActionId, setOpenActionId] = useState(null);
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [page, setPage] = useState(1);

  const handleDelete = (id) => {
    setItems((p) => p.filter((n) => n.id !== id));
    setOpenActionId(null);
  };

  const handleDuplicate = (id) => {
    setItems((p) => {
      const i = p.findIndex((n) => n.id === id);
      if (i < 0) return p;
      const next = [...p];
      next.splice(i + 1, 0, { ...p[i], id: crypto.randomUUID(), status: "Draft" });
      return next;
    });
    setOpenActionId(null);
  };

  const handleSend = (id) => {
    setItems((p) => p.map((n) => (n.id === id ? { ...n, status: "Sent" } : n)));
    setOpenActionId(null);
  };

  const filtered = items.filter((n) => {
    const q = search.toLowerCase();
    return (
      (n.title.toLowerCase().includes(q) || n.desc.toLowerCase().includes(q)) &&
      (tab === "All" || n.status === tab)
    );
  });

  const perPage = parseInt(entriesPerPage, 10);
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);
  const pageNumbers = Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1);

  const th = "p-4 font-medium text-sm text-[#0A0847CC]";
  const td = "p-4 font-medium text-[#0A0847CC]";

  return (
    <div className="p-6 bg-[#F8FAFC] min-h-screen font-[Inter] space-y-6">
      <h1 className="text-xl font-semibold text-[#0A0847]">Notifications</h1>

      {/* Search + New */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative w-full sm:w-[420px]">
          <FiSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search notifications..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full bg-white border border-[#E2DFFC] rounded-md pl-9 pr-3 py-3 text-xs italic text-[#0A0847] placeholder-gray-400 outline-none focus:border-[#001984]"
          />
        </div>
        <button
          type="button"
          onClick={() => navigate("/admin/notifications/create")}
          className="px-5 py-2.5 bg-[#001984] hover:bg-[#001266] text-white text-xs font-semibold rounded-md flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <FiPlus size={18} /> New Notification
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={FiBell} iconBg="bg-[#EFE7FD] text-[#6209FD]" valueClass="text-[#6209FD]" label="Total Notifications" value="152" hint="All time" />
        <StatCard icon={FiCalendar} iconBg="bg-[#E8E9FB] text-[#3231DB]" valueClass="text-[#0A0847]" label="Scheduled" value="24" hint="Upcoming" />
        <StatCard icon={FiFileText} iconBg="bg-[#F3E8D8] text-[#C65406]" valueClass="text-[#C65406]" label="Drafts" value="12" hint="Save for later" />
        <StatCard icon={FiSend} iconBg="bg-[#2BA4521A] text-[#2BA452]" valueClass="text-[#1617E3]" label="Sent" value="116" hint="Delivered" />
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-3">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => {
              setTab(t);
              setPage(1);
            }}
            className={`w-32 py-2.5 rounded-md text-xs font-medium border transition-colors cursor-pointer ${
              tab === t
                ? "bg-[#E4E6F7] text-[#001984] border-[#CBC6F8]"
                : "bg-white text-[#0A0847CC] border-[#E2DFFC] hover:bg-gray-50"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-[#E2DFFC] p-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[900px]">
            <thead className="bg-[#F3F7FD]">
              <tr>
                <th className={th}>Title</th>
                <th className={th}>Type</th>
                <th className={th}>Audience</th>
                <th className={`${th} text-center`}>Status</th>
                <th className={th}>Participants</th>
                <th className={`${th} text-center`}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2DFFC]">
              {visible.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-400">No notifications found.</td>
                </tr>
              )}
              {visible.map((n) => {
                const { icon: Icon, bg } = TYPE_ICONS[n.type] || TYPE_ICONS.Announcement;
                return (
                  <tr key={n.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <span className={`w-9 h-9 rounded-full ${bg} text-white flex items-center justify-center shrink-0`}>
                          <Icon size={16} />
                        </span>
                        <div className="max-w-[240px]">
                          <p className="font-medium text-[#0A0847CC]">{n.title}</p>
                          <p className="text-[10px] text-[#0A084799] font-medium mt-0.5 leading-snug">{n.desc}</p>
                        </div>
                      </div>
                    </td>
                    <td className={td}>{n.type}</td>
                    <td className={td}>{n.audience}</td>
                    <td className="p-4 text-center"><StatusBadge status={n.status} /></td>
                    <td className={`${td} whitespace-nowrap`}>{n.date}</td>
                    <td className="p-4 text-center">
                      <ActionsMenu
                        isOpen={openActionId === n.id}
                        onToggle={() => setOpenActionId((p) => (p === n.id ? null : n.id))}
                        canSend={n.status === "Draft" || n.status === "Scheduled"}
                        onView={() => {
                          setOpenActionId(null);
                          navigate(`/admin/notifications/${n.id}`, { state: { notification: n } });
                        }}
                        onEdit={() => {
                          setOpenActionId(null);
                          navigate(`/admin/notifications/${n.id}/edit`, { state: { notification: n } });
                        }}
                        onDuplicate={() => handleDuplicate(n.id)}
                        onSend={() => handleSend(n.id)}
                        onDelete={() => handleDelete(n.id)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
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
  );
}