import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { FiChevronDown, FiCheckCircle, FiX, FiCheck } from "react-icons/fi";

const COUNTRIES = [
  { name: "USA", flag: "🇺🇸" },
  { name: "India", flag: "🇮🇳" },
  { name: "UK", flag: "🇬🇧" },
  { name: "Canada", flag: "🇨🇦" },
  { name: "Australia", flag: "🇦🇺" },
];
const LANGUAGES = ["English", "Spanish", "French", "Hindi"];
const TIME_ZONES = [
  "(UTC-05:00) Eastern Time", "(UTC-06:00) Central Time", "(UTC-07:00) Mountain Time",
  "(UTC-08:00) Pacific Time", "(UTC+00:00) GMT", "(UTC+05:30) India Standard Time",
];
const ROLES = ["Admin", "Moderator", "User"];
const PLANS = ["Free", "Premium"];
const STATUSES = ["Active", "Invited", "Locked", "Suspended"];

const inputCls =
  "w-full border border-[#E2DFFC] rounded-md px-3 py-3 text-xs text-[#0A0847] placeholder-gray-400 bg-white outline-none focus:border-[#001984] transition-all";

const FieldRow = ({ label, children }) => (
  <div className="grid grid-cols-1 md:grid-cols-[326px_1fr] items-center gap-2 md:gap-0">
    <label className="text-sm font-semibold text-[#0A0847]">{label}</label>
    {children}
  </div>
);

const SelectField = ({ value, onChange, options }) => (
  <div className="relative">
    <select value={value} onChange={(e) => onChange(e.target.value)}
      className={`${inputCls} appearance-none pr-9 cursor-pointer text-[#0A084799]`}>
      {options.map((o) => <option key={o}>{o}</option>)}
    </select>
    <FiChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
  </div>
);

const ActionBtn = ({ children, onClick, disabled }) => (
  <button type="button" onClick={onClick} disabled={disabled}
    className="w-full py-3 border border-[#001984] rounded-md bg-white text-xs font-medium text-[#0A0847] hover:bg-gray-50 disabled:border-[#E2DFFC] disabled:text-gray-400 disabled:cursor-not-allowed cursor-pointer">
    {children}
  </button>
);

const StatusRow = ({ label, status, statusCls = "text-[#21AC1C]", icon = false, children }) => (
  <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_281px] items-center gap-2 md:gap-0">
    <span className="text-sm font-semibold text-[#0A0847]">{label}</span>
    <span className={`flex items-center gap-2 text-sm font-semibold ${statusCls}`}>
      {icon && <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#21AC1C]">
          <FiCheck size={14} strokeWidth={3} className="text-white" />
        </span>}
      {status}
    </span>
    <div>{children}</div>
  </div>
);

export default function EditUserSecurityModal({ user, onClose, onSave }) {
  const [first, ...rest] = (user?.name || "").split(" ");
  const [form, setForm] = useState({
    firstName: user?.firstName ?? first ?? "",
    lastName: user?.lastName ?? rest.join(" "),
    displayName: user?.displayName ?? user?.name ?? "",
    email: user?.email ?? "",
    country: user?.country || "USA",
    language: user?.language || "English",
    timeZone: user?.timeZone || TIME_ZONES[0],
    role: user?.role || "User",
    plan: user?.plan || "Free",
    coupon: user?.coupon || "",
    status: user?.status === "Published" ? "Active" : user?.status || "Active",
    adminNote: "",
    reason: "",
  });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);

  // Replace with API-backed values
  const security = {
    verified: !!user?.verified,
    mfa: !!user?.mfa,
    sessions: user?.activeSessions ?? 2,
    failed: user?.failedAttempts ?? 0,
  };
  const userId = user?.userId || `#${100000 + Number(user?.id || 0)}`;

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!user) return null;

  const set = (k, v) => {
    setForm((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: undefined }));
  };
  const flag = COUNTRIES.find((c) => c.name === form.country)?.flag;

  const handleSave = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = true;
    if (!form.lastName.trim()) e.lastName = true;
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) e.email = true;
    if (!form.reason.trim()) e.reason = true;
    setErrors(e);
    if (Object.keys(e).length) return;

    onSave({
      ...user,
      name: `${form.firstName.trim()} ${form.lastName.trim()}`,
      displayName: form.displayName,
      email: form.email.trim(),
      country: form.country,
      language: form.language,
      timeZone: form.timeZone,
      role: form.role,
      plan: form.plan,
      coupon: form.coupon,
      status: form.status,
      adminNote: form.adminNote,
      changeReason: form.reason,
    });
    setToast(true);
    setTimeout(onClose, 1200);
  };

  const securityAction = (name) => console.log(name, user.id); // wire to API
  const err = (k) => (errors[k] ? "!border-[#EB0C10]" : "");

  return createPortal(
    <div
      className="fixed inset-0 z-[9998] bg-black/45 flex items-start justify-center overflow-y-auto p-4 sm:p-8 font-[Inter]"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative lg:ml-60 bg-white rounded-lg border border-[#E2DFFC] w-full max-w-[1065px] p-7 space-y-6">
        <button type="button" onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 cursor-pointer">
          <FiX size={18} />
        </button>

        <h2 className="text-xl font-semibold text-[#0A0847] px-1">Edit User &amp; Security</h2>

        {/* Profile fields */}
        <div className="space-y-4 px-1">
          <FieldRow label="First Name">
            <input className={`${inputCls} ${err("firstName")}`} value={form.firstName} onChange={(e) => set("firstName", e.target.value)} />
          </FieldRow>
          <FieldRow label="Last Name">
            <input className={`${inputCls} ${err("lastName")}`} value={form.lastName} onChange={(e) => set("lastName", e.target.value)} />
          </FieldRow>
          <FieldRow label="Display Name">
            <input className={inputCls} value={form.displayName} onChange={(e) => set("displayName", e.target.value)} />
          </FieldRow>
          <FieldRow label="Email Address">
            <div className="flex gap-6">
              <input type="email" className={`${inputCls} ${err("email")}`} value={form.email} onChange={(e) => set("email", e.target.value)} />
              <span className={`w-[172px] shrink-0 flex items-center justify-center rounded-md border text-xs font-medium ${
                security.verified ? "bg-[#21AC1C0D] border-[#B7E4B4] text-[#21AC1C]" : "bg-[#F59E0B1A] border-[#FADCC7] text-[#C65406]"
              }`}>
                {security.verified ? "Verified" : "Unverified"}
              </span>
            </div>
          </FieldRow>
          <FieldRow label="Country">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base">{flag}</span>
              <select value={form.country} onChange={(e) => set("country", e.target.value)}
                className={`${inputCls} appearance-none pl-10 pr-9 cursor-pointer !text-sm !text-[#0A0847]`}>
                {COUNTRIES.map((c) => <option key={c.name}>{c.name}</option>)}
              </select>
              <FiChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </FieldRow>
          <FieldRow label="Language">
            <SelectField value={form.language} onChange={(v) => set("language", v)} options={LANGUAGES} />
          </FieldRow>
          <FieldRow label="Time Zone">
            <SelectField value={form.timeZone} onChange={(v) => set("timeZone", v)} options={TIME_ZONES} />
          </FieldRow>
          <FieldRow label="User ID">
            <input readOnly value={userId} className={`${inputCls} bg-[#EEF0F4] text-[#0A084799] cursor-not-allowed`} />
          </FieldRow>
          <FieldRow label="Role">
            <SelectField value={form.role} onChange={(v) => set("role", v)} options={ROLES} />
          </FieldRow>
          <FieldRow label="Plan">
            <SelectField value={form.plan} onChange={(v) => set("plan", v)} options={PLANS} />
          </FieldRow>
          <FieldRow label="Discount / Coupon Code">
            <div className="flex gap-6">
              <input className={inputCls} value={form.coupon}
                onChange={(e) => { set("coupon", e.target.value); setCouponApplied(false); }} />
              <button type="button" onClick={() => form.coupon.trim() && setCouponApplied(true)}
                className={`w-[172px] shrink-0 rounded-md border text-xs font-semibold cursor-pointer ${
                  couponApplied ? "bg-[#21AC1C0D] border-[#B7E4B4] text-[#21AC1C]" : "bg-white border-[#001984] text-[#001984] hover:bg-[#EEF2FF]"
                }`}>
                {couponApplied ? "Applied" : "Apply"}
              </button>
            </div>
          </FieldRow>
        </div>

        <hr className="border-[#E2DFFC]" />

        {/* Account status radios */}
        <div className="px-1 space-y-4">
          <h3 className="text-base font-semibold text-[#0A0847]">Account Status</h3>
          <div className="flex flex-wrap items-center gap-x-14 gap-y-3">
            {STATUSES.map((s) => (
              <label key={s} className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#0A0847]">
                <input type="radio" name="accountStatus" checked={form.status === s}
                  onChange={() => set("status", s)} className="accent-[#001984] w-4 h-4" />
                <span className={form.status === s ? "text-[#001984]" : ""}>{s}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Security panel */}
        <div className="border border-[#E2DFFC] rounded-lg p-7 space-y-6">
          <h3 className="text-base font-semibold text-[#001984]">Account Status</h3>

          <StatusRow label="Account Status" icon status={security.verified ? "Verified" : "Unverified"}
            statusCls={security.verified ? "text-[#21AC1C]" : "text-[#C65406]"}>
            <ActionBtn onClick={() => securityAction("resend-verification")}>Resend Verification</ActionBtn>
          </StatusRow>
          <StatusRow label="Password" status="">
            <ActionBtn onClick={() => securityAction("send-password-reset")}>Send Password Reset</ActionBtn>
          </StatusRow>
          <StatusRow label="Account Status" icon={security.mfa}
            status={security.mfa ? "Enabled" : "Disabled"}
            statusCls={security.mfa ? "text-[#21AC1C]" : "text-gray-400"}>
            <ActionBtn onClick={() => securityAction("reset-mfa")} disabled={!security.mfa}>Reset MFA</ActionBtn>
          </StatusRow>
          <StatusRow label="Active Sessions" status={`${security.sessions} Active Sessions`}>
            <ActionBtn onClick={() => securityAction("sign-out-all")} disabled={!security.sessions}>Sign Out All Devices</ActionBtn>
          </StatusRow>
          <StatusRow label="Failed Login Attempts" status={`${security.failed} failed attempts`} statusCls="text-[#0A0847CC]">
            <ActionBtn onClick={() => securityAction("unlock")} disabled={!security.failed && form.status !== "Locked"}>
              Unlock Account
            </ActionBtn>
          </StatusRow>
        </div>

        {/* Notes */}
        <div className="space-y-5 px-1">
          <div>
            <label className="block text-xs font-semibold text-[#0A0847CC] mb-1.5">Admin Note (internal)</label>
            <input className={inputCls} placeholder="Optional note for administrators..."
              value={form.adminNote} onChange={(e) => set("adminNote", e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#0A0847CC] mb-1.5">
              Reason for Change <span className="text-[#EB0C10]">*</span>
            </label>
            <input className={`${inputCls} ${err("reason")}`} placeholder="Routine profile update."
              value={form.reason} onChange={(e) => set("reason", e.target.value)} />
            {errors.reason && <p className="text-[10px] text-[#EB0C10] mt-1">A reason is required for the audit log.</p>}
          </div>
        </div>

        {/* Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_1.15fr] gap-6 px-1">
          <button type="button" onClick={onClose}
            className="py-3.5 bg-white border border-[#001984] text-[#0A0847] rounded-md text-sm font-semibold hover:bg-gray-50 cursor-pointer">
            Cancel
          </button>
          <button type="button" onClick={handleSave}
            className="py-3.5 bg-[#4A2BD0] hover:bg-[#3B21A8] text-white rounded-md text-sm font-semibold cursor-pointer">
            Save Changes
          </button>
        </div>

        {toast && (
          <div className="flex items-center justify-between bg-[#21AC1C0D] border border-[#B7E4B4] text-[#21AC1C] rounded-md px-4 py-4 text-sm font-semibold">
            <span className="flex items-center gap-3">
              <FiCheckCircle size={22} /> User and security settings updated.
            </span>
            <button type="button" onClick={() => setToast(false)} className="cursor-pointer"><FiX size={20} /></button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}