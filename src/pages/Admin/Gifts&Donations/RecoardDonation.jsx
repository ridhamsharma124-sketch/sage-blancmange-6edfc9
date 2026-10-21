import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiMoreVertical,
  FiCalendar,
  FiChevronDown,
  FiInfo,
} from "react-icons/fi";

/* ==========================================================================
   ATOMS (same classes as the rest of the app)
   ========================================================================== */
const Input = ({ className = "", ...props }) => (
  <input
    className={`w-full border border-[#E2DFFC] rounded-md px-3 py-3 text-xs text-[#0A0847] placeholder-gray-400 bg-white outline-none focus:border-[#001984] transition-all ${className}`}
    {...props}
  />
);

const Label = ({ children, required }) => (
  <label className="block text-xs font-semibold text-[#0A0847CC] mb-1.5">
    {children} {required && <span className="text-[#EB0C10]">*</span>}
  </label>
);

const SectionHeading = ({ children }) => (
  <h3 className="text-sm font-medium text-[#0A0847] pb-4 mb-4 border-b border-[#E2DFFC]">
    {children}
  </h3>
);

const Checkbox = ({ checked, onChange, label, hint }) => (
  <label className="flex items-start gap-2 cursor-pointer select-none">
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="mt-0.5 w-4 h-4 rounded border-gray-300 accent-[#001984] cursor-pointer"
    />
    <span>
      <span className="block text-xs font-semibold text-[#0A0847CC]">{label}</span>
      {hint && <span className="block text-[10px] text-[#0A084799] font-medium mt-0.5">{hint}</span>}
    </span>
  </label>
);

const fmtLongDate = (d) =>
  d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
const fmtTime = (d) =>
  d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

const NOTE_LIMIT = 150;
const METHODS = ["Cash", "Check", "Bank Transfer", "Other"];

/* ==========================================================================
   PAGE (NO NAVBAR / NO SIDEBAR)
   ========================================================================== */
export default function RecordDonationPage() {
  const navigate = useNavigate();
  const [now] = useState(() => new Date());
  const today = now.toISOString().slice(0, 10);

  const [form, setForm] = useState({
    amount: "",
    date: today,
    frequency: "one-time",
    badgeTitle: "",
    method: "Cash",
    checkNumber: "",
    donorName: "",
    email: "",
    phone: "",
    anonymous: false,
    unavailable: false,
    note: "",
  });
  const [errors, setErrors] = useState({});

  const set = (key, value) => {
    setForm((p) => ({ ...p, [key]: value }));
    setErrors((p) => ({ ...p, [key]: undefined }));
  };

  const donorDisabled = form.anonymous || form.unavailable;

  const validate = () => {
    const e = {};
    if (!form.amount || Number(form.amount) <= 0) e.amount = "Enter a valid amount";
    if (!form.date) e.date = "Select a date";
    if (!form.badgeTitle.trim()) e.badgeTitle = "Badge title is required";
    if (!form.method) e.method = "Select a method";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const payload = {
      ...form,
      amount: Number(form.amount),
      donorName: donorDisabled ? "" : form.donorName,
      email: donorDisabled ? "" : form.email,
      phone: donorDisabled ? "" : form.phone,
      recordOnly: true,
    };
    console.log("Record Donation Payload:", payload);
    alert("Donation recorded! Check browser console for full payload.");
    navigate(-1);
  };

  const err = (k) =>
    errors[k] ? <p className="text-[11px] text-[#EB0C10] font-medium mt-1">{errors[k]}</p> : null;

  return (
    <div className="p-6 bg-[#F8FAFC] min-h-screen font-[Inter] space-y-5">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-medium text-[#0A0847CC] hover:text-[#001984] cursor-pointer"
        >
          <FiArrowLeft size={18} /> Back to Donation
        </button>
        <button
          type="button"
          className="p-1.5 rounded-lg bg-[#E9E9E9] hover:bg-gray-200 text-gray-600 transition-colors cursor-pointer"
        >
          <FiMoreVertical size={18} />
        </button>
      </div>

      {/* Title */}
      <div>
        <h1 className="text-xl font-semibold text-[#0A0847]">Record a Donation</h1>
        <p className="text-sm text-[#0A084799] font-semibold mt-2">
          {fmtLongDate(now)} • {fmtTime(now)}
        </p>
      </div>

      {/* Info banner */}
      <div className="bg-[#EAEDF8] border border-[#DADFF2] rounded-lg px-4 py-3 flex items-start gap-3">
        <span className="w-5 h-5 mt-0.5 rounded-full bg-[#001984] text-white text-[11px] font-bold flex items-center justify-center shrink-0">
          !
        </span>
        <div>
          <p className="text-sm font-semibold text-[#001984]">Record Only</p>
          <p className="text-xs text-[#0A0847CC] font-medium mt-0.5">
            This records an offline donation. No payment will be charged.
          </p>
        </div>
      </div>

      {/* Form card */}
      <div className="bg-white rounded-lg border border-[#E2DFFC] p-6">
        {/* Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:divide-x divide-[#E2DFFC]">
          <div className="lg:pr-8 pb-6">
            <SectionHeading>Donation Details</SectionHeading>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label required>Donation Amount</Label>
                <div className="flex">
                  <span className="w-10 flex items-center justify-center border border-r-0 border-[#E2DFFC] rounded-l-md bg-[#F1F2F9] text-xs font-bold text-[#001984]">
                    $
                  </span>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="100.00"
                    value={form.amount}
                    onChange={(e) => set("amount", e.target.value)}
                    className="!rounded-l-none"
                  />
                </div>
                {err("amount")}
              </div>

              <div>
                <Label required>Donation Date</Label>
                <div className="relative">
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => set("date", e.target.value)}
                    className="w-full bg-white border border-[#E2DFFC] rounded-md px-3 py-3 text-xs text-[#0A0847] outline-none focus:border-[#001984] appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                  />
                  <FiCalendar
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                  />
                </div>
                {err("date")}
              </div>
            </div>

            {/* Frequency */}
            <div className="flex flex-wrap items-center gap-8 mt-4">
              {[
                { v: "one-time", l: "One-Time" },
                { v: "recurring", l: "Recurring (Record Only)" },
              ].map((o) => (
                <label key={o.v} className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="radio"
                    name="frequency"
                    checked={form.frequency === o.v}
                    onChange={() => set("frequency", o.v)}
                    className="w-4 h-4 accent-[#001984] cursor-pointer"
                  />
                  <span className="text-xs font-medium text-[#0A0847CC]">{o.l}</span>
                </label>
              ))}
            </div>

            <div className="mt-4">
              <Label required>Badge Title</Label>
              <Input
                placeholder="Enter badge title"
                value={form.badgeTitle}
                onChange={(e) => set("badgeTitle", e.target.value)}
              />
              {err("badgeTitle")}
            </div>
          </div>

          <div className="lg:pl-8 pb-6">
            <SectionHeading>Donation Details</SectionHeading>

            <div className="space-y-4">
              <div>
                <Label required>Method</Label>
                <div className="relative">
                  <select
                    value={form.method}
                    onChange={(e) => set("method", e.target.value)}
                    className="w-full appearance-none border border-[#E2DFFC] rounded-md px-3 pr-9 py-3 text-xs text-[#0A0847] bg-white outline-none focus:border-[#001984] cursor-pointer"
                  >
                    {METHODS.map((m) => (
                      <option key={m}>{m}</option>
                    ))}
                  </select>
                  <FiChevronDown
                    size={14}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                </div>
                {err("method")}
              </div>

              <div>
                <Label>Check Number (Optional)</Label>
                <Input
                  placeholder="e.g., 1234"
                  value={form.checkNumber}
                  disabled={form.method !== "Check"}
                  onChange={(e) => set("checkNumber", e.target.value)}
                  className="disabled:bg-gray-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:divide-x divide-[#E2DFFC] border-t border-[#E2DFFC] pt-6">
          <div className="lg:pr-8 pb-6">
            <SectionHeading>Donor Information</SectionHeading>

            <div className="space-y-4">
              <div>
                <Label>Donor Name</Label>
                <Input
                  placeholder="John Doe"
                  value={form.donorName}
                  disabled={donorDisabled}
                  onChange={(e) => set("donorName", e.target.value)}
                  className="disabled:bg-gray-50 disabled:cursor-not-allowed"
                />
              </div>

              <div className="border-t border-[#E2DFFC] pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    placeholder="john.doe@email.com"
                    value={form.email}
                    disabled={donorDisabled}
                    onChange={(e) => set("email", e.target.value)}
                    className="disabled:bg-gray-50 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <Label>Phone (Optional)</Label>
                  <Input
                    placeholder="(123) 456-7890"
                    value={form.phone}
                    disabled={donorDisabled}
                    onChange={(e) => set("phone", e.target.value)}
                    className="disabled:bg-gray-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              <Checkbox
                checked={form.anonymous}
                onChange={(v) => set("anonymous", v)}
                label="Anonymous Donation"
              />
              <Checkbox
                checked={form.unavailable}
                onChange={(v) => set("unavailable", v)}
                label="Donor information unavailable"
                hint="Use this if donor details are not known."
              />
            </div>
          </div>

          <div className="lg:pl-8 pb-6">
            <SectionHeading>Internal Information</SectionHeading>

            <Label>Reference / Note (Optional)</Label>
            <div className="relative">
              <textarea
                rows={4}
                maxLength={NOTE_LIMIT}
                placeholder="Cash donation received during Sunday service."
                value={form.note}
                onChange={(e) => set("note", e.target.value)}
                className="w-full border border-[#E2DFFC] rounded-md p-3 pb-7 text-xs text-[#0A0847] placeholder-gray-400 outline-none resize-none focus:border-[#001984]"
              />
              <span className="absolute right-3 bottom-2.5 text-[11px] font-medium text-[#0A0847CC]">
                {form.note.length}/{NOTE_LIMIT}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#E2DFFC] pt-6 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full sm:w-48 py-3 border border-[#E2DFFC] text-[#0A0847] font-semibold text-xs rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full sm:w-52 py-3 bg-[#001984] text-white font-semibold text-xs rounded-md hover:bg-[#001266] transition-colors cursor-pointer"
          >
            Record Donation
          </button>
        </div>
      </div>
    </div>
  );
}