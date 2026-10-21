import React, { useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { FiCheckCircle, FiX } from "react-icons/fi";

const PLANS = [
  { id: "admin", label: "Admin", price: 0, priceLabel: "$0.00", months: 0 },
  { id: "monthly", label: "Monthly", price: 4.99, priceLabel: "$4.99/month", months: 1 },
  { id: "quarterly", label: "Quarterly", price: 12.99, priceLabel: "$12.99/3 months", months: 3 },
  { id: "6months", label: "6 Months", price: 29.99, priceLabel: "$29.99/6 months", months: 6 },
  { id: "yearly", label: "Yearly", price: 49.99, priceLabel: "$49.99/year", months: 12 },
];

const fmtMoney = (n) => `${n < 0 ? "-" : ""}$${Math.abs(n).toFixed(2)}`;
const fmtDate = (d) =>
  d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
const addMonths = (d, m) => {
  const x = new Date(d);
  x.setMonth(x.getMonth() + m);
  return x;
};

const Line = ({ label, value, cls = "", valueCls = "" }) => (
  <div className="flex items-center justify-between text-sm">
    <span className={`font-medium text-[#0A0847CC] ${cls}`}>{label}</span>
    <span className={`font-medium text-[#0A0847CC] ${valueCls}`}>{value}</span>
  </div>
);

export default function ChangePlanModal({ user, onClose, onSave }) {
  // Replace with real subscription data from your API
  const currentPlanLabel = user?.planLabel || "Premium Yearly";
  const currentPaid = user?.currentPaid ?? 49.99;
  const coupon = user?.coupon || "WELCOME20";
  const couponPct = user?.couponPct ?? 20;
  const renewalDate = user?.renewalDate ? new Date(user.renewalDate) : new Date();

  const [selected, setSelected] = useState("monthly");
  const [applyWhen, setApplyWhen] = useState("immediately");
  const [reason, setReason] = useState("");
  const [error, setError] = useState(false);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const plan = PLANS.find((p) => p.id === selected);

  const calc = useMemo(() => {
    const discounted = plan.price * (1 - couponPct / 100);
    const proration = applyWhen === "immediately" ? 15 : 0; // TODO: real proration from billing API
    const effective = applyWhen === "immediately" ? new Date() : renewalDate;
    return {
      adjustment: discounted - currentPaid,
      proration,
      effective,
      nextRenewal: addMonths(effective, plan.months || 1),
    };
    // eslint-disable-next-line
  }, [selected, applyWhen]);

  if (!user) return null;

  const handleConfirm = () => {
    if (!reason.trim()) { setError(true); return; }
    onSave({
      ...user,
      plan: plan.id === "admin" ? "Admin" : "Premium",
      planLabel: `Premium ${plan.label}`,
      planChangeReason: reason.trim(),
      planApply: applyWhen,
    });
    setToast(true);
    setTimeout(onClose, 1200);
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[9998] bg-black/45 flex items-start justify-center overflow-y-auto p-4 sm:p-8 font-[Inter]"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* <button type="button" onClick={onClose}
        className="fixed top-4 right-4 text-white hover:opacity-80 cursor-pointer z-[9999]">
        <FiX size={34} className="border-2 border-white rounded-full p-1" />
      </button> */}

      <div className="relative lg:ml-60 bg-white rounded-lg border border-[#E2DFFC] w-full max-w-[1065px] p-7 space-y-5">
        
        <button type="button" onClick={onClose}
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 cursor-pointer">
                  <FiX size={18} />
                </button>
        
        <h2 className="text-xl font-semibold text-[#0A0847]">Change Plan</h2>

        <div className="flex items-center gap-8">
          <span className="text-sm font-semibold text-[#0A0847]">Current Plan</span>
          <span className="px-5 py-2 rounded-md bg-[#E4E1F7] text-[#0A0847CC] text-xs font-semibold">
            {currentPlanLabel}
          </span>
        </div>

        {/* Plan list */}
        <div>
          <p className="text-xs font-medium text-[#0A0847CC] mb-2">Select a new plan</p>
          <div className="border border-[#E2DFFC] rounded-md overflow-hidden">
            {PLANS.map((p) => {
              const active = selected === p.id;
              return (
                <label
                  key={p.id}
                  className={`flex items-center justify-between px-5 py-4 cursor-pointer transition-colors ${
                    active ? "bg-[#F1F2F9] border-y border-[#CBC6F8]" : "bg-white hover:bg-gray-50"
                  }`}
                >
                  <span className="flex items-center gap-4">
                    <input type="radio" name="plan" checked={active} onChange={() => setSelected(p.id)}
                      className="accent-[#001984] w-5 h-5" />
                    <span className="text-base font-semibold text-[#0A0847CC]">{p.label}</span>
                  </span>
                  <span className="text-sm font-medium text-[#0A084799]">{p.priceLabel}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Apply when */}
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-[#0A0847CC]">Apply change</h3>
          <div className="flex items-center gap-8">
            {[
              { v: "immediately", l: "Apply immediately" },
              { v: "next", l: "Next billing cycle" },
            ].map(({ v, l }) => (
              <label key={v} className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#0A0847]">
                <input type="radio" name="applyWhen" checked={applyWhen === v}
                  onChange={() => setApplyWhen(v)} className="accent-[#001984] w-4 h-4" />
                <span className={applyWhen === v ? "text-[#001984]" : ""}>{l}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="border border-[#E2DFFC] rounded-md p-5 space-y-4">
          <h3 className="text-base font-semibold text-[#0A0847CC]">Apply change</h3>
          <Line label="Price Adjustment" value={fmtMoney(calc.adjustment)} />
          <Line label="New Amount" value={plan.id === "admin" ? "$0.00" : `$${plan.price.toFixed(2)} / ${plan.months === 1 ? "month" : plan.months === 12 ? "year" : `${plan.months} months`}`} />
          {coupon && (
            <Line label={`Coupon Applied (${coupon})`} value={`-${couponPct}%`}
              cls="!text-[#21AC1C]" valueCls="!text-[#21AC1C]" />
          )}
          <Line label="Proration Credit" value={fmtMoney(calc.proration)} />
          <Line label="Effective Date" value={fmtDate(calc.effective)} />
          <Line label="Next Renewal" value={fmtDate(calc.nextRenewal)} />
        </div>

        {/* Payment status */}
        <div className="border border-[#E2DFFC] rounded-md px-5 py-4">
          <div className="flex items-center justify-between">
            <span className="text-base font-semibold text-[#0A0847CC]">Payment Status:</span>
            <span className="text-sm font-semibold text-[#21AC1C]">{user.payment || "Paid"}</span>
          </div>
          <button type="button" onClick={() => console.log("invoices", user.id)}
            className="text-sm font-medium text-[#001984] mt-1 hover:underline cursor-pointer">
            View Invoices &amp; Payment History
          </button>
        </div>

        {/* Danger actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <button type="button" onClick={() => console.log("cancel subscription", user.id)}
            className="py-3.5 bg-white border border-[#EB0C10] text-[#EB0C10] rounded-md text-sm font-semibold hover:bg-red-50 cursor-pointer">
            Cancel Subscription
          </button>
          <button type="button" onClick={() => console.log("issue refund", user.id)}
            className="py-3.5 bg-white border border-[#EB0C10] text-[#EB0C10] rounded-md text-sm font-semibold hover:bg-red-50 cursor-pointer">
            Issue Refund
          </button>
        </div>

        {/* Reason */}
        <div>
          <label className="block text-xs font-semibold text-[#0A0847CC] mb-1.5">
            Reason for Plan Change <span className="text-[#EB0C10]">*</span>
          </label>
          <textarea
            rows={3}
            value={reason}
            onChange={(e) => { setReason(e.target.value); setError(false); }}
            placeholder="Switching to monthly for flexibility."
            className={`w-full border rounded-md px-4 py-3 text-xs text-[#0A0847] placeholder-gray-400 bg-white outline-none resize-none focus:border-[#001984] ${
              error ? "border-[#EB0C10]" : "border-[#E2DFFC]"
            }`}
          />
          {error && <p className="text-[10px] text-[#EB0C10] mt-1">A reason is required for the audit log.</p>}
        </div>

        {/* Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <button type="button" onClick={onClose}
            className="py-3.5 bg-white border border-[#001984] text-[#0A0847] rounded-md text-sm font-semibold hover:bg-gray-50 cursor-pointer">
            Cancel
          </button>
          <button type="button" onClick={handleConfirm}
            className="py-3.5 bg-[#4A2BD0] hover:bg-[#3B21A8] text-white rounded-md text-sm font-semibold cursor-pointer">
            Confirm Plan Change
          </button>
        </div>

        {toast && (
          <div className="flex items-center justify-between bg-[#21AC1C0D] border border-[#B7E4B4] text-[#21AC1C] rounded-md px-4 py-4 text-sm font-semibold">
            <span className="flex items-center gap-3">
              <FiCheckCircle size={22} /> Plan changed and billing history updated.
            </span>
            <button type="button" onClick={() => setToast(false)} className="cursor-pointer"><FiX size={20} /></button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}