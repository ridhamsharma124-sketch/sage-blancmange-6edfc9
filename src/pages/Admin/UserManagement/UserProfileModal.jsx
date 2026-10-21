import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  FiUser, FiCheckCircle, FiCalendar, FiClock, FiGlobe, FiLock,
  FiExternalLink, FiX, FiAward, FiZap, FiHelpCircle, FiFileText, FiUserCheck, FiCheck, 
} from "react-icons/fi";
import StreakIcon from "../../../assets/UserManagementSvgs/StreakIcon.svg";
import TotalScoreIcon from "../../../assets/UserManagementSvgs/TotalScoreIcon.svg";
import QuizCompleteIcon from "../../../assets/UserManagementSvgs/QuizCompleteIcon.svg";
import UserIdIcon from "../../../assets/UserManagementSvgs/UserIdIcon.svg";
import UserRoleIcon from "../../../assets/UserManagementSvgs/UserRoleIcon.svg";
import CountryIcon from "../../../assets/UserManagementSvgs/Country.svg";
import JoinedIcon from "../../../assets/UserManagementSvgs/JoinedIcon.svg";
import LastActive from "../../../assets/UserManagementSvgs/LastActive.svg";
import UserIconSvg from "../../../assets/UserManagementSvgs/UserIconSvg.svg";

 const SvgIcon = ({ src, size = 16, className = "" }) => (
              <img src={src} alt="" width={size} height={size} className={`shrink-0 ${className}`} />
            );
            
    const StreakIconSvg = (p) => <SvgIcon src={StreakIcon} {...p} />;
    const TotalScoreIconSvg = (p) => <SvgIcon src={TotalScoreIcon} {...p} />;
    const QuizCompleteIconSvg = (p) => <SvgIcon src={QuizCompleteIcon} {...p} />;
    const UserIdIconSvg = (p) => <SvgIcon src={UserIdIcon} {...p} />;
    const UserRoleIconSvg = (p) => <SvgIcon src={UserRoleIcon} {...p} />;
    const CountryIconSvg = (p) => <SvgIcon src={CountryIcon} {...p} />;
    const JoinedIconSvg = (p) => <SvgIcon src={JoinedIcon} {...p} />;
    const LastActiveSvg = (p) => <SvgIcon src={LastActive} {...p} />;

const TABS = ["Overview", "Security", "Subscription", "Activity", "Audit Log"];

const STATUS_STYLES = {
  Active: "bg-[#21AC1C1A] text-[#21AC1C] border-[#B7E4B4]",
  Invited: "bg-[#7C3AED1A] text-[#7C3AED] border-[#E4D7FB]",
  Locked: "bg-gray-100 text-gray-500 border-gray-200",
  Suspended: "bg-[#EB0C101A] text-[#EB0C10] border-[#FBD0D1]",
  Published: "bg-[#C654061A] text-[#C65406] border-[#FADCC7]",
};

const Row = ({ icon: Icon, label, children }) => (
  <div className="flex items-center justify-between text-sm">
    <span className="flex items-center gap-3 text-[#0A0847CC] font-medium">
      <Icon size={18} className="text-gray-500" /> {label}
    </span>
    <span className="font-medium text-[#0A0847CC]">{children}</span>
  </div>
);

const Line = ({ label, value, valueCls = "" }) => (
  <div className="flex items-center justify-between text-sm">
    <span className="text-[#0A0847CC] font-medium">{label}</span>
    <span className={`font-medium text-[#0A0847CC] ${valueCls}`}>{value}</span>
  </div>
);

const Check = ({ ok = true, children }) => (
  <div className="flex items-center gap-3 text-sm font-semibold text-[#0A0847CC]">
    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#21AC1C]">
    <FiCheck size={14} strokeWidth={3} className="text-white" />
  </span>
    {children}
  </div>
);

export default function UserProfileModal({ user, onClose, onEdit }) {
  const [tab, setTab] = useState("Overview");
  const [toast, setToast] = useState(true);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(false), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  if (!user) return null;

  // Replace these fallbacks with real API fields
  const p = {
    userId: user.userId || `#${100000 + Number(user.id)}`,
    country: user.country || "USA",
    flag: user.flag || "🇺🇸",
    activeSessions: user.activeSessions ?? 2,
    renews: user.renews || "Aug 25, 2026",
    autoRenew: user.autoRenew ?? true,
    payment: user.payment || "Paid",
    score: user.score ?? "8,742",
    streak: user.streak || "18 days",
    quizzes: user.quizzes ?? 342,
    lastAudit: user.lastAudit || "Plan changed by Admin • Aug 5, 2026",
  };
  const initials = user.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  return createPortal(
    <div
      className="fixed inset-0 z-[9998] bg-black/45 flex items-start justify-center overflow-y-auto p-4 sm:p-8 font-[Inter]"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative lg:ml-60 bg-white rounded-lg border border-[#E2DFFC] w-full max-w-[1065px] p-8 space-y-6">
        <button type="button" onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 cursor-pointer">
          <FiX size={18} />
        </button>

        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full text-xl font-semibold flex items-center justify-center shrink-0">
              <img src={UserIconSvg} alt="" width={64} height={64} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[#0A0847]">{user.name}</h2>
              <p className="text-sm text-[#0A084799] font-medium mt-1">{user.email}</p>
            </div>
          </div>
          <span className={`mr-6 px-5 py-2 rounded-md border text-sm font-semibold ${STATUS_STYLES[user.status] || STATUS_STYLES.Active}`}>
            {user.status}
          </span>
        </div>

        {/* Tabs */}
        <div className="flex items-center border-b border-[#E2DFFC] overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`px-8 py-3 text-sm whitespace-nowrap border-b-2 -mb-px cursor-pointer transition-colors ${
                tab === t ? "border-[#001984] text-[#001984] font-semibold" : "border-transparent text-[#0A084799] font-medium hover:text-[#0A0847]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab !== "Overview" ? (
          <div className="border border-dashed border-[#E2DFFC] rounded-lg p-12 text-center text-xs font-medium text-gray-400">
            {tab} tab isn't built yet.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-[1.45fr_1fr] gap-6">
              <div className="border border-[#E2DFFC] rounded-lg p-5 space-y-6">
                <Row icon={UserIdIconSvg} label="User ID">{p.userId}</Row>
                <Row icon={UserRoleIconSvg} label="Role">
                  <span className="px-3 py-0.5 rounded bg-[#E8E9FB] text-[#001984] text-xs font-semibold">{user.role}</span>
                </Row>
                <Row icon={CountryIconSvg} label="Country">
                  <span className="mr-2">{p.flag}</span>{p.country}
                </Row>
                <Row icon={JoinedIconSvg} label="Joined">{user.joined}</Row>
                <Row icon={LastActiveSvg} label="Last Active">
                  <span className="text-[#21AC1C]">{user.lastActive}</span>
                </Row>
              </div>

              <div className="border border-[#E2DFFC] rounded-lg p-5 space-y-5">
                <h4 className="text-base font-semibold text-[#0A0847]">Security Status</h4>
                <Check ok={user.verified}>{user.verified ? "Email Verified" : "Email Unverified"}</Check>
                <Check ok={user.mfa}>{user.mfa ? "MFA Enabled" : "MFA Disabled"}</Check>
                <Check>{p.activeSessions} Active Sessions</Check>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="border border-[#E2DFFC] rounded-lg p-5 space-y-5">
                <h4 className="text-base font-semibold text-[#0A0847]">Subscription</h4>
                <Line label="Plan" value={user.plan} />
                <Line label="Renews" value={p.renews} />
                <Line label="Auto-Renew" value={p.autoRenew ? "On" : "Off"} valueCls={p.autoRenew ? "!text-[#21AC1C]" : ""} />
                <Line label="Payment" value={p.payment} valueCls="!text-[#21AC1C]" />
              </div>

              <div className="border border-[#E2DFFC] rounded-lg p-5 space-y-5">
                <h4 className="text-base font-semibold text-[#0A0847]">Activity Summary</h4>
                <Row icon={TotalScoreIconSvg} label="Total Score">{p.score}</Row>
                <Row icon={StreakIconSvg} label="Streak">{p.streak}</Row>
                <Row icon={QuizCompleteIconSvg} label="Quizzes Completed">{p.quizzes}</Row>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-[#F5F5F5] border border-[#E2E2E2] rounded-md px-5 py-4 text-sm font-medium text-[#0A0847CC]">
              <FiLock size={22} className="text-[#001984] shrink-0" />
              Private reflections and prayers are never visible to administrators.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-[1.4fr_1.2fr_1.2fr] gap-4">
              <button type="button" onClick={onEdit}
                className="py-3.5 bg-[#4A2BD0] hover:bg-[#3B21A8] text-white rounded-md text-sm font-semibold cursor-pointer">
                Edit User
              </button>
              <button type="button" onClick={() => setTab("Activity")}
                className="py-3.5 bg-white border border-[#001984] text-[#0A0847] rounded-md text-sm font-semibold hover:bg-gray-50 cursor-pointer">
                View Activity
              </button>
              <button type="button" onClick={() => setTab("Audit Log")}
                className="py-3.5 bg-white border border-[#001984] text-[#0A0847] rounded-md text-sm font-semibold hover:bg-gray-50 cursor-pointer">
                Audit Log
              </button>
            </div>

            <div className="flex items-center justify-between border border-[#E2DFFC] rounded-md px-6 py-5 text-sm font-medium text-[#0A0847CC]">
              <span>Recent Audit: {p.lastAudit}</span>
              <button type="button" onClick={() => setTab("Audit Log")} className="text-gray-500 hover:text-[#001984] cursor-pointer">
                <FiExternalLink size={22} />
              </button>
            </div>
          </>
        )}

        {toast && (
          <div className="flex items-center justify-between bg-[#21AC1C0D] border border-[#B7E4B4] text-[#21AC1C] rounded-md px-4 py-4 text-sm font-semibold">
            <span className="flex items-center gap-3">
              <FiCheckCircle size={22} /> User profile loaded successfully.
            </span>
            <button type="button" onClick={() => setToast(false)} className="cursor-pointer"><FiX size={20} /></button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}