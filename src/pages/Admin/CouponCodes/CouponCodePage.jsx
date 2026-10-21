import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  FiFilter,
  FiPlus,
  FiMoreVertical,
  FiEye,
  FiEdit2,
  FiCopy,
  FiSlash,
  FiTrash2,
  FiX,
  FiPercent,
  FiTrendingUp,
  FiTag,
  FiShoppingBag,
  FiCheckCircle,
  FiAward,
  FiHeadphones,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../../components/UIComponents/BreadCrumb";
import DiscountTag from "../../../assets/CouponCode/DiscountTag.svg";
import DiscountTicket from "../../../assets/CouponCode/DiscountTicket.svg";
import FilterIcon from "../../../assets/CouponCode/FilterIcon.svg";
import HeadphoneIcon from "../../../assets/CouponCode/HeadphoneIcon.svg";
import PercentTicketIcon from "../../../assets/CouponCode/PercentTicket.svg";
import RewardTagIcon from "../../../assets/CouponCode/RewardTags.svg";
import ShoppingBagIcon from "../../../assets/CouponCode/ShoppingBag.svg";
import UpTrend from "../../../assets/CouponCode/UpTrend.svg";

/* ==========================================================================
   MOCK DATA
   ========================================================================== */
const INITIAL_COUPONS = [
  { id: "1", code: "WELCOME25", type: "Percentage", value: "25%", start: "May 01, 2025", end: "May 31, 2025", created: "Apr 30, 2025 10:30 AM", status: "Active", uses: 186, max: 1000, given: "$1,254.60", applied: "May 01, 2025 11:20 AM", appliesTo: "Monthly" },
  { id: "2", code: "FAITH10", type: "Fixed", value: "$10.00", start: "May 01, 2025", end: "Jun 30, 2025", created: "Apr 30, 2025 10:30 AM", status: "Active", uses: 87, max: 500, given: "$870.00", applied: "May 01, 2025 11:20 AM", appliesTo: "Monthly" },
  { id: "3", code: "SPIRITUAL20", type: "Percentage", value: "20%", start: "May 01, 2025", end: "Jun 30, 2025", created: "Apr 30, 2025 10:30 AM", status: "Expired", uses: 342, max: 500, given: "$2,140.00", applied: "May 01, 2025 11:20 AM", appliesTo: "Yearly" },
  { id: "4", code: "BIBLES", type: "Fixed", value: "$5.00", start: "May 01, 2025", end: "Jun 30, 2025", created: "Apr 30, 2025 10:30 AM", status: "Expired", uses: 220, max: 300, given: "$1,100.00", applied: "May 01, 2025 11:20 AM", appliesTo: "Monthly" },
  { id: "5", code: "EASTER30", type: "Percentage", value: "30%", start: "May 01, 2025", end: "Jun 30, 2025", created: "Apr 30, 2025 10:30 AM", status: "Expired", uses: 289, max: 400, given: "$3,010.00", applied: "May 01, 2025 11:20 AM", appliesTo: "Yearly" },
  { id: "6", code: "SUMMER15", type: "Percentage", value: "15%", start: "May 01, 2025", end: "Jun 30, 2025", created: "Apr 30, 2025 10:30 AM", status: "Active", uses: 53, max: 200, given: "$412.00", applied: "May 01, 2025 11:20 AM", appliesTo: "Monthly" },
  { id: "7", code: "THANKYOU10", type: "Fixed", value: "$10.00", start: "May 01, 2025", end: "Jun 30, 2025", created: "Apr 30, 2025 10:30 AM", status: "Scheduled", uses: 0, max: 100, given: "$0.00", applied: "—", appliesTo: "Monthly" },
  { id: "8", code: "NEWUSER20", type: "Percentage", value: "20%", start: "May 01, 2025", end: "Jun 30, 2025", created: "Apr 30, 2025 10:30 AM", status: "Active", uses: 108, max: 500, given: "$690.00", applied: "May 01, 2025 11:20 AM", appliesTo: "Monthly" },
];

const RECENT_APPLIED = [
  { date: "May 01, 2025", time: "11:20 AM", user: "5626" },
  { date: "Apr 30, 2025", time: "09:45 PM", user: "3621" },
  { date: "Apr 30, 2025", time: "04:40 PM", user: "3026" },
  { date: "Apr 28, 2025", time: "03:32 PM", user: "1253" },
  { date: "Apr 25, 2025", time: "10:05 AM", user: "5234" },
  { date: "Apr 23, 2025", time: "11:05 AM", user: "5434" },
];

/* ==========================================================================
   ATOMS
   ========================================================================== */
const STATUS_STYLES = {
  Active: "bg-[#21AC1C1A] text-[#21AC1C] border-[#DAF3C8]",
  Expired: "bg-[#EF44441A] text-[#EF4444] border-[#FECACA]",
  Scheduled: "bg-[#6D28D91A] text-[#5B21B6] border-[#D9CBF7]",
  Inactive: "bg-[#0A08471A] text-[#0A0847CC] border-[#E2DFFC]",
};

 const SvgIcon = ({ src, size = 16, className = "" }) => (
           <img src={src} alt="" width={size} height={size} className={`shrink-0 ${className}`} />
         );
         
    const FilterIconSvg = (p) => <SvgIcon src={FilterIcon} {...p} />;
    const UpTrendIconSvg = (p) => <SvgIcon src={UpTrend} {...p} />;
    const DiscountTagIconSvg = (p) => <SvgIcon src={DiscountTag} {...p} />;
    const ShoppingBagIconSvg = (p) => <SvgIcon src={ShoppingBagIcon} {...p} />;

const StatusBadge = ({ status, className = "" }) => (
  <span
    className={`px-3 py-1 rounded-md text-xs font-medium border inline-block min-w-[72px] text-center ${
      STATUS_STYLES[status] || "bg-gray-100 text-gray-700"
    } ${className}`}
  >
    {status}
  </span>
);

const StatCard = ({ icon, iconBg, valueClass, value, label }) => (
  <div className="bg-white rounded-lg border border-[#E2DFFC] px-4 py-8 flex items-center gap-4">
    <div className={`w-14 h-14 rounded-2xl ${iconBg} flex items-center justify-center shrink-0`}>
      <img src={icon} alt="" className="w-8 h-8" />
    </div>
    <div>
      <p className={`text-xl font-semibold ${valueClass}`}>{value}</p>
      <p className="text-xs font-semibold text-[#001984] mt-0.5">{label}</p>
    </div>
  </div>
);

/* ==========================================================================
   ACTIONS MENU (portal)
   ========================================================================== */
const ActionsMenu = ({ isOpen, onToggle, onView, onEdit, onDuplicate, onToggleActive, onDelete, inactive }) => {
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
        className="p-1.5 rounded-md bg-[#E9E9E9] hover:bg-gray-200 text-gray-600 transition-colors cursor-pointer"
      >
        <FiMoreVertical size={18} />
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
            <button onClick={onToggleActive} className={item}>
              <FiSlash size={14} className="text-gray-500" /> {inactive ? "Activate" : "Deactivate"}
            </button>
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
   DETAILS MODAL
   ========================================================================== */
const DetailRow = ({ label, children }) => (
  <div className="grid grid-cols-[130px_1fr] items-center py-2">
    <span className="text-xs font-medium text-[#0A084799]">{label}</span>
    <span className="text-xs font-medium text-[#0A0847CC]">{children}</span>
  </div>
);

const MiniStat = ({ icon: Icon, bg, tint, label, value }) => (
  <div className={`${tint} border border-[#E2DFFC] rounded-lg p-3 flex items-center gap-4`}>
    <div className={`w-14 h-14 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-xs font-medium text-[#0A084799]">{label}</p>
      <p className="text-base font-bold text-[#0A0847] mt-0.5">{value}</p>
    </div>
  </div>
);

const CouponDetailsModal = ({ coupon, onClose, onEdit, onDuplicate, onToggleActive, onDelete }) => {
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const inactive = coupon.status === "Inactive";
  const rows = showAll ? RECENT_APPLIED : RECENT_APPLIED.slice(0, 5);
  const remaining = Math.max(0, coupon.max - coupon.uses);
  const isPct = coupon.type === "Percentage";

  return createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center p-4 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl border border-[#E2DFFC] w-full max-w-md p-6 my-auto max-h-[95vh] overflow-y-auto font-[Inter]"
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#0A0847]">Coupon Code Details</h3>
            <StatusBadge status={coupon.status} className="mt-2 !py-0.5" />
          </div>
          <button type="button" onClick={onClose} className="text-[#001984] hover:opacity-70 cursor-pointer">
            <FiX size={22} className="rounded-full border-2 border-[#001984] p-0.5" />
          </button>
        </div>

        {/* Code */}
        <div className="flex items-center gap-3 mt-4 mb-2">
          <span className="w-10 h-10 rounded-lg bg-[#E8E9FB] text-[#0A0847] flex items-center justify-center shrink-0">
            {isPct ? <FiPercent size={18} /> : <span className="text-base font-bold">$</span>}
          </span>
          <div>
            <p className="text-sm font-bold text-[#0A0847]">{coupon.code}</p>
            <p className="text-xs font-medium text-[#0A084799]">{coupon.type} Discount</p>
          </div>
        </div>

        {/* Details */}
        <div className="mb-4">
          <DetailRow label="Type">{coupon.type}</DetailRow>
          <DetailRow label="Discount Value">{coupon.value}</DetailRow>
          <DetailRow label="Applied To">{coupon.appliesTo}</DetailRow>
          <DetailRow label="Start / End Date">{coupon.start} – {coupon.end}</DetailRow>
          <DetailRow label="Date Created">{coupon.created}</DetailRow>
          <DetailRow label="Created By">Super Admin</DetailRow>
          <DetailRow label="Status"><StatusBadge status={coupon.status} className="!py-0.5" /></DetailRow>
        </div>

        {/* Stats */}
        <div className="space-y-3">
          <MiniStat icon={UpTrendIconSvg} bg="bg-[#E8E9FB] text-[#3231DB]" tint="bg-[#F8F8FF]" label="Total Redemptions" value={coupon.uses} />
          <MiniStat icon={DiscountTagIconSvg} bg="bg-[#DCF5DA] text-[#21AC1C]" tint="bg-[#F5FDF4]" label="Total Discount Given" value={coupon.given} />
          <MiniStat icon={ShoppingBagIconSvg} bg="bg-[#D6E8FB] text-[#1D6FE0]" tint="bg-[#F3F8FE]" label="Remaining Redemptions" value={`${remaining} / ${coupon.max.toLocaleString()}`} />
        </div>

        {/* Applied dates */}
        <div className="flex items-center justify-between mt-6 mb-3">
          <h4 className="text-sm font-bold text-[#0A0847]">Applied Dates (Recent 5)</h4>
          <button
            type="button"
            onClick={() => setShowAll((s) => !s)}
            className="text-xs font-semibold text-[#001984] hover:underline cursor-pointer"
          >
            {showAll ? "Show Less" : "View All"}
          </button>
        </div>

        <div className="border border-[#E2DFFC] rounded-lg p-3">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F3F7FD]">
              <tr>
                <th className="p-3 font-medium text-[#0A0847CC]">Date</th>
                <th className="p-3 font-medium text-[#0A0847CC]">Time</th>
                <th className="p-3 font-medium text-[#0A0847CC]">User ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2DFFC]">
              {rows.map((r, i) => (
                <tr key={i}>
                  <td className="p-3 font-medium text-[#0A0847CC] whitespace-nowrap">{r.date}</td>
                  <td className="p-3 font-medium text-[#0A0847CC] whitespace-nowrap">{r.time}</td>
                  <td className="p-3 font-medium text-[#0A0847CC]">{r.user}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Actions */}
        <div className="border-t border-[#E2DFFC] mt-5 pt-5 space-y-3">
          <div className="grid grid-cols-[1fr_1.4fr_1.4fr] gap-3">
            <button onClick={onEdit} className="py-2.5 border border-[#E2DFFC] text-[#0A0847] text-xs font-semibold rounded-md flex items-center justify-center gap-2 hover:bg-gray-50 cursor-pointer">
              <FiEdit2 size={13} /> Edit
            </button>
            <button onClick={onDuplicate} className="py-2.5 border border-[#E2DFFC] text-[#0A0847] text-xs font-semibold rounded-md flex items-center justify-center gap-2 hover:bg-gray-50 cursor-pointer">
              <FiCopy size={13} /> Duplicate
            </button>
            <button onClick={onToggleActive} className="py-2.5 border border-[#E11D2E] text-[#E11D2E] text-xs font-semibold rounded-md flex items-center justify-center gap-2 hover:bg-red-50 cursor-pointer">
              <FiSlash size={13} /> {inactive ? "Activate" : "Deactivate"}
            </button>
          </div>
          <button onClick={onDelete} className="w-full py-2.5 border border-[#E11D2E] text-[#E11D2E] text-xs font-semibold rounded-md flex items-center justify-center gap-2 hover:bg-red-50 cursor-pointer">
            <FiTrash2 size={13} /> Delete
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};


export default function CouponCodesPage() {
  const navigate = useNavigate();
  const [coupons, setCoupons] = useState(INITIAL_COUPONS);
  const [openActionId, setOpenActionId] = useState(null);
  const [viewId, setViewId] = useState(null);

  const viewing = coupons.find((c) => c.id === viewId);

  const handleDelete = (id) => {
    setCoupons((p) => p.filter((c) => c.id !== id));
    setOpenActionId(null);
    setViewId(null);
  };

  const handleDuplicate = (id) => {
    setCoupons((p) => {
      const i = p.findIndex((c) => c.id === id);
      if (i < 0) return p;
      const copy = { ...p[i], id: crypto.randomUUID(), code: `${p[i].code}_COPY`, uses: 0, given: "$0.00", status: "Scheduled" };
      const next = [...p];
      next.splice(i + 1, 0, copy);
      return next;
    });
    setOpenActionId(null);
    setViewId(null);
  };

  const handleToggleActive = (id) => {
    setCoupons((p) =>
      p.map((c) => (c.id === id ? { ...c, status: c.status === "Inactive" ? "Active" : "Inactive" } : c))
    );
    setOpenActionId(null);
  };

  const handleEdit = (c) => {
    setOpenActionId(null);
    setViewId(null);
    navigate(`/admin/coupons/${c.id}/edit`, { state: { coupon: c } });
  };

  const th = "p-4 font-medium text-sm text-[#0A0847CC] align-middle";
  const td = "p-4 font-medium text-[#0A0847CC]";

  return (
    <div className="p-6 bg-[#F8FAFC] min-h-screen font-[Inter] space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
            <Breadcrumb
                items={[
                  { label: "Dashboard", path: "/admin" },
                  { label: "Coupons" }
                ]}
              />
          <h1 className="text-xl font-semibold text-[#0A0847] mt-2">Coupon Codes</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="px-8 py-2.5 border border-[#001984] bg-white text-[#001984] text-xs font-semibold rounded-md flex items-center gap-2 hover:bg-[#EEF2FF] transition-colors cursor-pointer"
          >
            <FilterIconSvg size={18} /> Preview
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/coupon-codes/create")}
            className="px-5 py-2.5 bg-[#001984] hover:bg-[#001266] text-white text-xs font-semibold rounded-md flex items-center gap-2 transition-colors cursor-pointer"
          >
            <FiPlus size={16} /> Create Coupon
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={PercentTicketIcon} iconBg="bg-[#EFE7FD] text-[#6D28D9]" valueClass="text-[#6209FD]" value="28" label="Total Coupons" />
        <StatCard icon={DiscountTicket} iconBg="bg-[#2BA4521A] text-[#2BA452]" valueClass="text-[#2BA452]" value="18" label="Active Coupons" />
        <StatCard icon={RewardTagIcon} iconBg="bg-[#FEF3E2] text-[#F59E0B]" valueClass="text-[#5B5BD6]" value="1,245" label="Total Redemptions" />
        <StatCard icon={HeadphoneIcon} iconBg="bg-[#E4EEFC] text-[#1D6FE0]" valueClass="text-[#1617E3]" value="$12,540.00" label="Total Discounts Given" />
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-[#E2DFFC] p-5">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[1100px]">
            <thead className="bg-[#F3F7FD]">
              <tr>
                <th className={th}>Code Name</th>
                <th className={th}>Type</th>
                <th className={th}>Value</th>
                <th className={th}>Applied</th>
                <th className={th}>Start / End Date</th>
                <th className={th}>Date Created</th>
                <th className={th}>Status</th>
                <th className={th}>Redemptions / Uses</th>
                <th className={th}>Applied Date</th>
                <th className={`${th} text-right`}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2DFFC]">
              {coupons.length === 0 && (
                <tr>
                  <td colSpan={10} className="p-8 text-center text-gray-400">No coupons found.</td>
                </tr>
              )}
              {coupons.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className={td}>{c.code}</td>
                  <td className={td}>
                    {c.type === "Percentage" && c.id === "1" ? (
                      <span className="inline-flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded bg-[#E8E9FB] text-[9px] font-bold flex items-center justify-center">%</span>
                        {c.type}
                      </span>
                    ) : (
                      c.type
                    )}
                  </td>
                  <td className={td}>{c.value}</td>
                  <td className={td}>{c.value}</td>
                  <td className={`${td} whitespace-nowrap leading-snug`}>
                    {c.start}<br />{c.end}
                  </td>
                  <td className={`${td} whitespace-nowrap leading-snug`}>
                    {c.created.split(" ").slice(0, 3).join(" ")}<br />{c.created.split(" ").slice(3).join(" ")}
                  </td>
                  <td className="p-4"><StatusBadge status={c.status} /></td>
                  <td className={td}>{c.uses}</td>
                  <td className={`${td} whitespace-nowrap leading-snug`}>
                    {c.applied === "—" ? "—" : (<>{c.applied.split(" ").slice(0, 3).join(" ")}<br />{c.applied.split(" ").slice(3).join(" ")}</>)}
                  </td>
                  <td className="p-4 text-right">
                    <ActionsMenu
                      isOpen={openActionId === c.id}
                      onToggle={() => setOpenActionId((p) => (p === c.id ? null : c.id))}
                      inactive={c.status === "Inactive"}
                      onView={() => { setOpenActionId(null); setViewId(c.id); }}
                      onEdit={() => handleEdit(c)}
                      onDuplicate={() => handleDuplicate(c.id)}
                      onToggleActive={() => handleToggleActive(c.id)}
                      onDelete={() => handleDelete(c.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {viewing && (
        <CouponDetailsModal
          coupon={viewing}
          onClose={() => setViewId(null)}
          onEdit={() => handleEdit(viewing)}
          onDuplicate={() => handleDuplicate(viewing.id)}
          onToggleActive={() => handleToggleActive(viewing.id)}
          onDelete={() => handleDelete(viewing.id)}
        />
      )}
    </div>
  );
}