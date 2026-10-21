import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  FiUsers, FiCheckCircle, FiXCircle, FiSend, FiSearch, FiChevronDown,
  FiChevronLeft, FiChevronRight, FiPlus, FiDownload, FiShield, FiLock,
  FiMoreVertical, FiUserCheck, FiRefreshCw, FiRotateCcw, FiCheck,FiUser, FiEdit2, FiMail, FiTrash2,
} from "react-icons/fi";
import { FaCrown } from "react-icons/fa";
import { GoShieldCheck } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import UserProfileModal from "./UserProfileModal";
import EditUserSecurityModal from "./EditUserSecurityModal";
import ChangeRoleModal from "./ChangeRoleModal";
import ChangePlanModal from "./ChangePlanModal";
import AddIconWhite from "../../../assets/UserManagementSvgs/AddIconWhite.svg";
import CheckMarkIcon from "../../../assets/UserManagementSvgs/CheckMarkIcon.svg";
import DownloadIcon from "../../../assets/UserManagementSvgs/DownloadIcon.svg";
import GuardCheck from "../../../assets/UserManagementSvgs/GuardCheck.svg";
import PendingInviteIcon from "../../../assets/UserManagementSvgs/PendingInviteIcon.svg";
import PremiumIcon from "../../../assets/UserManagementSvgs/PremiumIcon.svg";
import SuspendedIcon from "../../../assets/UserManagementSvgs/SuspendedIcon.svg";
import TwoUsers from "../../../assets/UserManagementSvgs/TwoUsers.svg";

const INITIAL_USERS = [
  { id: "1", name: "John Doe", email: "john.doe@daily.com", role: "Admin", plan: "Premium", verified: true, status: "Active", mfa: true, lastActive: "2h ago", joined: "Jan 12, 2024" },
  { id: "2", name: "Sarah J.", email: "sarah.j@daily.com", role: "Moderator", plan: "Premium", verified: true, status: "Active", mfa: true, lastActive: "5h ago", joined: "Feb 3, 2024" },
  { id: "3", name: "Michael R.", email: "michael.r@daily.com", role: "User", plan: "Free", verified: false, status: "Invited", mfa: false, lastActive: "1d ago", joined: "May 6, 2025" },
  { id: "4", name: "Emily K.", email: "emily.k@daily.com", role: "User", plan: "Premium", verified: true, status: "Active", mfa: true, lastActive: "3h ago", joined: "Mar 18, 2024" },
  { id: "5", name: "David L.", email: "david.l@daily.com", role: "User", plan: "Free", verified: false, status: "Published", mfa: false, lastActive: "7d ago", joined: "Apr 11, 2025" },
  { id: "6", name: "Rachel M.", email: "rachel.m@daily.com", role: "Moderator", plan: "Premium", verified: true, status: "Locked", mfa: false, lastActive: "15d ago", joined: "Jun 2, 2024" },
  { id: "7", name: "Samuel T.", email: "samuel.t@daily.com", role: "User", plan: "Free", verified: true, status: "Suspended", mfa: false, lastActive: "30d ago", joined: "Jan 28, 2024" },
];

// Replace with API totals
const STATS = { total: "12,842", active: "8,234", premium: "3,451", suspended: "352", pending: "805" };

 const SvgIcon = ({ src, size = 16, className = "" }) => (
              <img src={src} alt="" width={size} height={size} className={`shrink-0 ${className}`} />
            );
            
    const AddIconWhiteSvg = (p) => <SvgIcon src={AddIconWhite} {...p} />;
    const GuardCheckSvg = (p) => <SvgIcon src={GuardCheck} {...p} />;
    const DownloadIconSvg = (p) => <SvgIcon src={DownloadIcon} {...p} />;
    const CheckMarkIconSvg = (p) => <SvgIcon src={CheckMarkIcon} {...p} />;

const STATUS_STYLES = {
  Active: "bg-[#21AC1C1A] text-[#21AC1C] border-[#DAF3C8]",
  Invited: "bg-[#7C3AED1A] text-[#7C3AED] border-[#E4D7FB]",
  Published: "bg-[#C654061A] text-[#C65406] border-[#FADCC7]",
  Locked: "bg-gray-100 text-gray-500 border-gray-200",
  Suspended: "bg-[#EB0C101A] text-[#EB0C10] border-[#FBD0D1]",
};

const StatCard = ({ icon, iconBg, label, value }) => (
  <div className="bg-white rounded-lg border border-[#E2DFFC] px-4 py-6 flex items-center gap-4">
    <div className={`w-14 h-14 rounded-xl ${iconBg} flex items-center justify-center shrink-0`}>
       <img src={icon} alt="" className="w-8 h-8" />
    </div>
    <div>
      <p className="text-xs font-semibold text-[#0A084799]">{label}</p>
      <p className="text-2xl font-semibold text-[#001984] mt-0.5">{value}</p>
    </div>
  </div>
);

const Dropdown = ({ label, options, value, onChange }) => (
  <div className="relative">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="appearance-none bg-white border border-[#E2DFFC] rounded-md px-3.5 py-3 pr-8 text-xs font-medium text-[#0A0847CC] outline-none cursor-pointer focus:border-[#001984] min-w-[130px]"
    >
      <option value="">{label}</option>
      {options.map((o) => <option key={o}>{o}</option>)}
    </select>
    <FiChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
  </div>
);

const Checkbox = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={onChange}
    className={`w-4 h-4 rounded border flex items-center justify-center cursor-pointer ${
      checked ? "bg-[#001984] border-[#001984] text-white" : "border-gray-400 bg-white"
    }`}
  >
    {checked && <FiCheck size={11} strokeWidth={3} />}
  </button>
);

const MENU_ITEMS = [
  { key: "profile", label: "Your Profile", icon: FiUser },
  { key: "edit", label: "Edit", icon: FiEdit2 },
  { key: "security", label: "Security & Sessions", icon: FiLock },
  { key: "message", label: "Send Message", icon: FiMail },
  { key: "role", label: "Change Role", icon: FiUserCheck },
  { key: "plan", label: "Change Plan", icon: FiRefreshCw },
  { key: "suspend", label: "Suspend User", icon: FiXCircle, danger: true, divider: true },
  { key: "reactivate", label: "Reactivate User", icon: FiRotateCcw },
  { key: "export", label: "Export User Data", icon: FiDownload },
  { key: "delete", label: "Soft Delete", icon: FiTrash2, danger: true },
];

const UserActionsMenu = ({ isOpen, onToggle, onAction }) => {
  const btnRef = useRef(null);
  const menuRef = useRef(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    if (!isOpen || !btnRef.current) return;
    const r = btnRef.current.getBoundingClientRect();
    const menuH = 390;
    const menuW = 168;
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

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        onClick={onToggle}
        className="w-8 h-8 rounded-md bg-[#E9E9E9] text-gray-600 inline-flex items-center justify-center hover:bg-gray-300 cursor-pointer"
      >
        <FiMoreVertical size={14} />
      </button>

      {isOpen &&
        createPortal(
          <div
            ref={menuRef}
            style={{ position: "fixed", top: pos.top, left: pos.left }}
            className="w-[168px] bg-white rounded-md border border-[#E2DFFC] shadow-lg py-1.5 z-[9999] text-[11px] font-medium"
          >
            {MENU_ITEMS.map(({ key, label, icon: Icon, danger, divider }) => (
              <React.Fragment key={key}>
                {divider && <div className="my-1 border-t border-[#E2DFFC]" />}
                <button
                  type="button"
                  onClick={() => onAction(key)}
                  className={`w-full px-3 py-2 text-left flex items-center gap-2.5 transition-colors cursor-pointer ${
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

export default function UserManagementPage() {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ role: "", plan: "", status: "", verification: "", lastActive: "" });
  const [selected, setSelected] = useState([]);
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [page, setPage] = useState(1);
  const [openActionId, setOpenActionId] = useState(null);
  const [profileUser, setProfileUser] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [roleUser, setRoleUser] = useState(null);
  const [planUser, setPlanUser] = useState(null);

  const navigate = useNavigate();


  const setFilter = (k, v) => { setFilters((p) => ({ ...p, [k]: v })); setPage(1); };

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    const matchQ = u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.id === q;
    return (
      matchQ &&
      (!filters.role || u.role === filters.role) &&
      (!filters.plan || u.plan === filters.plan) &&
      (!filters.status || u.status === filters.status) &&
      (!filters.verification || (filters.verification === "Verified") === u.verified)
    );
  });

  const perPage = parseInt(entriesPerPage, 10);
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);
  const pageNumbers = Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1);

  const allVisibleSelected = visible.length > 0 && visible.every((u) => selected.includes(u.id));
  const toggleAll = () =>
    setSelected(allVisibleSelected
      ? selected.filter((id) => !visible.some((u) => u.id === id))
      : [...new Set([...selected, ...visible.map((u) => u.id)])]);
  const toggleOne = (id) =>
    setSelected((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const bulkSetStatus = (status) => {
    setUsers((p) => p.map((u) => (selected.includes(u.id) ? { ...u, status } : u)));
    setSelected([]);
  };

  const bulkActions = [
    { label: "Assign Role", icon: FiUserCheck, onClick: () => console.log("Assign role", selected) },
    { label: "Change Plan", icon: FiRefreshCw, onClick: () => console.log("Change plan", selected) },
    { label: "Suspend", icon: FiXCircle, onClick: () => bulkSetStatus("Suspended") },
    { label: "Reactivate", icon: FiRotateCcw, onClick: () => bulkSetStatus("Active") },
    { label: "Resend Invite", icon: FiSend, onClick: () => console.log("Resend invite", selected) },
    { label: "Export", icon: FiDownload, onClick: () => console.log("Export", selected) },
  ];

  const handleRowAction = (key, user) => {
  setOpenActionId(null);
  switch (key) {
    case "suspend":
      setUsers((p) => p.map((u) => (u.id === user.id ? { ...u, status: "Suspended" } : u)));
      break;
    case "reactivate":
      setUsers((p) => p.map((u) => (u.id === user.id ? { ...u, status: "Active" } : u)));
      break;
    case "profile":
        setProfileUser(user);
        break;
    case "role":
      setRoleUser(user);
      break;
    case "edit":
        setEditUser(user);
        break;
    case "plan":
        setPlanUser(user);
        break;
    case "delete":
      setUsers((p) => p.filter((u) => u.id !== user.id));
      setSelected((p) => p.filter((id) => id !== user.id));
      break;
    default:
      console.log(key, user); // profile, edit, security, message, role, plan, export
  }
};

  return (
    <div className="p-6 bg-[#F8FAFC] min-h-screen font-[Inter] space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-[#0A0847]">User Management</h1>
        <p className="text-sm text-[#0A084799] font-medium mt-2">
          Manage users, roles, access, security, and subscriptions.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={TwoUsers} iconBg="bg-[#6209FD1A] text-[#7C3AED]" label="Total Users" value={STATS.total} />
        <StatCard icon={CheckMarkIcon} iconBg="bg-[#2BA4521A] text-[#16A34A]" label="Active" value={STATS.active} />
        <StatCard icon={PremiumIcon} iconBg="bg-[#F165221A] text-[#F59E0B]" label="Premium" value={STATS.premium} />
        <StatCard icon={SuspendedIcon} iconBg="bg-[#D715141A] text-[#DC2626]" label="Suspended" value={STATS.suspended} />
        <StatCard icon={PendingInviteIcon} iconBg="bg-[#7D3BD61A] text-[#7C3AED]" label="Pending Invite" value={STATS.pending} />
      </div>

      {/* Filters */}
      <div className="space-y-3">
        <div className="flex flex-col xl:flex-row gap-3 xl:items-center">
          <div className="relative flex-1 xl:max-w-[310px]">
            <FiSearch size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search users by name, email, or ID..."
              className="w-full bg-white border border-[#E2DFFC] rounded-md pl-9 pr-3 py-3 text-xs text-[#0A0847] placeholder-gray-400 outline-none focus:border-[#001984]"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <Dropdown label="Role" options={["Admin", "Moderator", "User"]} value={filters.role} onChange={(v) => setFilter("role", v)} />
            <Dropdown label="Plan" options={["Free", "Premium"]} value={filters.plan} onChange={(v) => setFilter("plan", v)} />
            <Dropdown label="Status" options={Object.keys(STATUS_STYLES)} value={filters.status} onChange={(v) => setFilter("status", v)} />
            <Dropdown label="Verification" options={["Verified", "Unverified"]} value={filters.verification} onChange={(v) => setFilter("verification", v)} />
            <Dropdown label="Last Active" options={["Today", "Last 7 days", "Last 30 days"]} value={filters.lastActive} onChange={(v) => setFilter("lastActive", v)} />
          </div>
        </div>

        <div className="flex flex-wrap justify-end gap-3">
          <button onClick={()=>navigate('/admin/users/add')} type="button" className="px-8 py-2.5 bg-[#001984] text-white rounded-md text-xs font-semibold flex items-center gap-2 hover:bg-[#001266] cursor-pointer">
            <AddIconWhiteSvg size={16} /> Add User
          </button>
          <button type="button" className="px-8 py-2.5 bg-white border border-[#E2DFFC] text-[#0A0847CC] rounded-md text-xs font-semibold flex items-center gap-2 hover:bg-gray-50 cursor-pointer">
            <DownloadIconSvg size={14} /> Export
          </button>
          <button type="button" className="px-6 py-2.5 bg-white border border-[#E2DFFC] text-[#0A0847CC] rounded-md text-xs font-semibold flex items-center gap-2 hover:bg-gray-50 cursor-pointer">
            <GuardCheckSvg size={14} /> Manage Roles
          </button>
        </div>
      </div>

      {/* Table card */}
      <div className="bg-white rounded-lg border border-[#E2DFFC] p-5 space-y-4">
        {selected.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Checkbox checked onChange={() => setSelected([])} />
                <span className="text-xs font-semibold text-[#0A0847CC]">{selected.length} selected</span>
              </div>
              <div className="relative">
                <select className="appearance-none border border-[#E2DFFC] rounded-md px-3 py-2.5 pr-8 text-xs text-[#0A0847CC] bg-white outline-none cursor-pointer min-w-[130px]">
                  <option>Bulk Actions</option>
                </select>
                <FiChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="inline-flex flex-wrap border border-[#E2DFFC] rounded-md divide-x divide-[#E2DFFC] overflow-hidden">
              {bulkActions.map(({ label, icon: Icon, onClick }) => (
                <button
                  key={label}
                  type="button"
                  onClick={onClick}
                  className="px-4 py-3 text-xs font-medium text-[#0A0847CC] flex items-center gap-2 hover:bg-gray-50 cursor-pointer"
                >
                  <Icon size={14} className="text-gray-500" /> {label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[980px]">
            <thead className="bg-[#F3F7FD]">
              <tr className="text-sm text-[#0A0847CC]">
                <th className="p-4 w-10"><Checkbox checked={allVisibleSelected} onChange={toggleAll} /></th>
                <th className="p-4 font-medium">Users</th>
                <th className="p-4 font-medium">Role</th>
                <th className="p-4 font-medium">Plan</th>
                <th className="p-4 font-medium text-center">Verification</th>
                <th className="p-4 font-medium text-center">Status</th>
                <th className="p-4 font-medium text-center">MFA</th>
                <th className="p-4 font-medium">Last Active</th>
                <th className="p-4 font-medium">Joined</th>
                <th className="p-4 font-medium text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2DFFC] text-[#0A0847CC]">
              {visible.length === 0 && (
                <tr><td colSpan={10} className="p-8 text-center text-gray-400">No users found.</td></tr>
              )}
              {visible.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4"><Checkbox checked={selected.includes(u.id)} onChange={() => toggleOne(u.id)} /></td>
                  <td className="p-4">
                    <p className="font-semibold text-[#0A0847]">{u.name}</p>
                    <p className="text-[11px] text-[#0A084799] font-medium">{u.email}</p>
                  </td>
                  <td className="p-4 font-medium">{u.role}</td>
                  <td className="p-4 font-medium">{u.plan}</td>
                  <td className="p-4 text-center">
                    {u.verified ? (
                      <CheckMarkIconSvg size={26} className="text-[#21AC1C] mx-auto" />
                    ) : (
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-medium border inline-block bg-[#F59E0B1A] text-[#C65406] border-[#FADCC7]">
                        Unverified
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    <span className={`px-3 py-1 rounded-md text-[11px] font-medium border inline-block ${STATUS_STYLES[u.status]}`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    {u.mfa ? (
                      <GoShieldCheck size={26} className="text-[#21AC1C] mx-auto" />
                    ) : u.status === "Locked" ? (
                      <FiLock size={24} className="text-gray-400 mx-auto" />
                    ) : (
                      <FiShield size={26} className="text-gray-400 mx-auto" />
                    )}
                  </td>
                  <td className="p-4 font-medium whitespace-nowrap">{u.lastActive}</td>
                  <td className="p-4 font-medium whitespace-nowrap">{u.joined}</td>
                  <td className="p-4 text-center">
                    <UserActionsMenu
  isOpen={openActionId === u.id}
  onToggle={() => setOpenActionId((prev) => (prev === u.id ? null : u.id))}
  onAction={(key) => handleRowAction(key, u)}
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
          <span>users</span>
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

      {/* Footer note */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 bg-[#EEF0FB] border border-[#CBC6F8] rounded-md px-3 py-2.5 text-[11px] font-medium text-[#0A0847CC]">
        <span className="flex items-center gap-2">
          <FiLock size={13} /> Private reflections and prayers are never visible to administrators.
        </span>
        <span className="flex items-center gap-2">
          <FiShield size={13} /> Every account action is recorded.
        </span>
      </div>
      {profileUser && (
  <UserProfileModal
    user={users.find((u) => u.id === profileUser.id) || profileUser}
    onClose={() => setProfileUser(null)}
    onEdit={() => {
      setEditUser(profileUser);
      setProfileUser(null);
    }}
  />
)}

{editUser && (
  <EditUserSecurityModal
    key={editUser.id}
    user={editUser}
    onClose={() => setEditUser(null)}
    onSave={(updated) =>
      setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)))
    }
  />
)}

{roleUser && (
  <ChangeRoleModal
    key={roleUser.id}
    user={users.find((u) => u.id === roleUser.id) || roleUser}
    onClose={() => setRoleUser(null)}
    onSave={(updated) =>
      setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)))
    }
  />
)}

{planUser && (
  <ChangePlanModal
    key={planUser.id}
    user={users.find((u) => u.id === planUser.id) || planUser}
    onClose={() => setPlanUser(null)}
    onSave={(updated) =>
      setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)))
    }
  />
)}
    </div>
  );
}