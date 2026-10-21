import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiSave,
  FiEye,
  FiSend,
  FiCalendar,
  FiChevronDown,
  FiChevronLeft,
  FiUploadCloud,
  FiRefreshCw,
  FiImage,
  FiInfo,
  FiAward,
  FiMessageSquare,
  FiCheckSquare,
  FiWifi,
} from "react-icons/fi";

/* ==========================================================================
   ATOMS (same classes as the rest of the app)
   ========================================================================== */
const Label = ({ children, required, optional }) => (
  <label className="block text-xs font-semibold text-[#0A0847CC] mb-1.5">
    {children} {optional && <span className="font-medium text-[#0A084799]">(Optional)</span>}
    {required && <span className="text-[#EB0C10]"> *</span>}
  </label>
);

const inputCls =
  "w-full border border-[#E2DFFC] rounded-md px-3 py-3 text-xs text-[#0A0847] placeholder-gray-400 bg-white outline-none focus:border-[#001984] transition-all";

const Select = ({ value, onChange, options }) => (
  <div className="relative">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${inputCls} appearance-none pr-9 cursor-pointer`}
    >
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
    <FiChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
  </div>
);

const DateField = ({ value, onChange, disabled }) => (
  <div className="relative">
    <FiCalendar size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0A0847CC] pointer-events-none" />
    <input
      type="date"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      className={`${inputCls} pl-9 disabled:bg-gray-50 disabled:cursor-not-allowed`}
    />
  </div>
);

const Toggle = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer shrink-0 ${
      checked ? "bg-[#001984]" : "bg-gray-200"
    }`}
  >
    <div
      className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform ${
        checked ? "translate-x-4" : "translate-x-0"
      }`}
    />
  </button>
);

const Step = ({ n, title }) => (
  <div className="flex items-center gap-3 mb-4">
    <span className="w-7 h-7 rounded-full bg-[#001984] text-white text-xs font-semibold flex items-center justify-center shrink-0">
      {n}
    </span>
    <h3 className="text-base font-semibold text-[#0A0847]">{title}</h3>
  </div>
);

const Radio = ({ name, checked, onChange, label }) => (
  <label className="flex items-center gap-2 cursor-pointer select-none">
    <input type="radio" name={name} checked={checked} onChange={onChange} className="w-5 h-5 accent-[#001984] cursor-pointer" />
    <span className="text-sm font-medium text-[#0A0847CC]">{label}</span>
  </label>
);

const Counter = ({ value, max }) => (
  <p className="text-[11px] font-medium text-[#0A0847CC] text-right mt-1">
    {value.length}/{max}
  </p>
);

const fmtDate = (iso) =>
  iso
    ? new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
        month: "short", day: "numeric", year: "numeric", timeZone: "UTC",
      })
    : "—";

const TYPES = ["Announcement", "Promotion", "Update", "Content", "Alert"];
const ACTIONS = ["External Link", "Internal Page", "None"];
const SHORT_MAX = 150;
const LONG_MAX = 500;

/* ==========================================================================
   PAGE (NO NAVBAR / NO SIDEBAR)
   ========================================================================== */
export default function CreateNotificationPage() {
  const navigate = useNavigate();
  const imageRef = useRef(null);

  const [f, setF] = useState({
    type: "Announcement",
    title: "",
    short: "",
    banner: "",
    message: "",
    startDate: "",
    endDate: "",
    referral: "",
    audience: "everyone",
    sendMode: "now",
    schedDate: "",
    schedEnd: "",
    actionType: "External Link",
    url: "",
    inApp: true,
    push: true,
    important: true,
  });
  const [errors, setErrors] = useState({});
  const [imgError, setImgError] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  const set = (k, v) => {
    setF((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: undefined }));
  };
  const err = (k) =>
    errors[k] ? <p className="text-[11px] text-[#EB0C10] font-medium mt-1">{errors[k]}</p> : null;

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImgError(false);
      set("banner", URL.createObjectURL(file));
    }
    e.target.value = "";
  };

  const validate = (strict) => {
    const e = {};
    if (!f.title.trim()) e.title = "Title is required";
    if (strict) {
      if (!f.short.trim()) e.short = "Short description is required";
      if (!f.message.trim()) e.message = "Detailed message is required";
      if (f.actionType === "External Link" && !/^https?:\/\/.+/.test(f.url))
        e.url = "Enter a valid URL (https://...)";
      if (f.sendMode === "later" && !f.schedDate) e.schedDate = "Pick a schedule date";
      if (f.endDate && f.startDate && f.endDate < f.startDate) e.endDate = "End must be after start";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (type) => {
    if (type !== "Preview" && !validate(type !== "Save Draft")) return;
    const status =
      type === "Save Draft" ? "Draft" : type === "Schedule" || f.sendMode === "later" ? "Scheduled" : "Sent";
    console.log(`${type} payload:`, { ...f, status });
    alert(`${type}! Check browser console for full payload.`);
    if (type !== "Preview") navigate(-1);
  };

  const hasBanner = f.banner && !imgError;

  return (
    <div className="p-6 bg-[#F8FAFC] min-h-screen font-[Inter] space-y-6">
      <h1 className="text-xl font-semibold text-[#0A0847]">Create Notification</h1>

      <input type="file" ref={imageRef} accept="image/png,image/jpeg" onChange={handleImage} className="hidden" />

      <div className="grid grid-cols-1 xl:grid-cols-[1.9fr_1fr] gap-6 items-start">
        {/* LEFT */}
        <div className="bg-white rounded-lg border border-[#E2DFFC] p-6 space-y-5">
          <Step n={1} title="Basic Information" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label required>Notification Type</Label>
              <Select value={f.type} onChange={(v) => set("type", v)} options={TYPES} />
            </div>
            <div>
              <Label>Page Title:</Label>
              <input className={inputCls} placeholder="Spring Challenge 2025 is Live!" value={f.title} onChange={(e) => set("title", e.target.value)} />
              {err("title")}
            </div>
          </div>

          <div>
            <Label required>Short Description</Label>
            <textarea
              rows={2}
              maxLength={SHORT_MAX}
              placeholder="Take a moment to talk with God."
              value={f.short}
              onChange={(e) => set("short", e.target.value)}
              className={`${inputCls} resize-none`}
            />
            <Counter value={f.short} max={SHORT_MAX} />
            {err("short")}
          </div>

          <div>
            <p className="text-sm font-semibold text-[#0A0847]">Banner Image</p>
            <p className="text-sm text-[#0A084799] font-medium mb-3">Recommended 1200 × 400 • JPG or PNG</p>

            <div className="border border-dashed border-[#CBC6F8] bg-[#F6F7FF] rounded-lg p-4 grid grid-cols-1 sm:grid-cols-[1fr_190px] gap-4 items-center">
              <div className="rounded-lg overflow-hidden bg-gray-100 h-36 flex items-center justify-center">
                {hasBanner ? (
                  <img src={f.banner} alt="Banner" onError={() => setImgError(true)} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-gray-400">
                    <FiImage size={26} />
                    <span className="text-xs font-medium">No image selected</span>
                  </div>
                )}
              </div>
              <button type="button" onClick={() => imageRef.current?.click()} className="flex flex-col items-center gap-2 text-[#0A0847CC] cursor-pointer">
                <FiUploadCloud size={28} className="text-[#001984]" />
                <span className="text-xs font-medium text-center">Recommended<br />1600 × 400 • JPG<br />or PNG</span>
              </button>
            </div>

            <div className="flex items-center justify-end gap-3 mt-3">
              <button
                type="button"
                disabled={!hasBanner}
                onClick={() => setShowBanner(true)}
                className="px-5 py-2.5 border border-[#E2DFFC] bg-white text-[#0A0847] text-xs font-semibold rounded-md flex items-center gap-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <FiEye size={15} /> Preview
              </button>
              <button
                type="button"
                onClick={() => imageRef.current?.click()}
                className="px-5 py-2.5 bg-[#001984] hover:bg-[#001266] text-white text-xs font-semibold rounded-md flex items-center gap-2 cursor-pointer"
              >
                <FiRefreshCw size={15} /> {hasBanner ? "Replace Image" : "Upload Image"}
              </button>
            </div>
          </div>

          <div>
            <Label required>Detailed Message</Label>
            <textarea
              rows={4}
              maxLength={LONG_MAX}
              placeholder="Join the new Spring Challenge to stay fit and climb the leaderboard. Earn badges and win exciting prizes!"
              value={f.message}
              onChange={(e) => set("message", e.target.value)}
              className={`${inputCls} resize-none`}
            />
            <Counter value={f.message} max={LONG_MAX} />
            {err("message")}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label optional>Start Date</Label>
              <DateField value={f.startDate} onChange={(v) => set("startDate", v)} />
            </div>
            <div>
              <Label optional>End Date</Label>
              <DateField value={f.endDate} onChange={(v) => set("endDate", v)} />
              {err("endDate")}
            </div>
          </div>

          <div>
            <Label optional>Referral Information</Label>
            <textarea rows={2} placeholder="Coins, Badges & More" value={f.referral} onChange={(e) => set("referral", e.target.value)} className={`${inputCls} resize-none`} />
          </div>

          {/* 2 */}
          <div>
            <Step n={2} title="Audience" />
            <div className="flex items-center gap-10">
              <Radio name="aud" checked={f.audience === "everyone"} onChange={() => set("audience", "everyone")} label="Everyone" />
              <Radio name="aud" checked={f.audience === "specific"} onChange={() => set("audience", "specific")} label="Specific Audience" />
            </div>
          </div>

          {/* 3 */}
          <div>
            <Step n={3} title="Send Options" />
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
              <Radio name="send" checked={f.sendMode === "now"} onChange={() => set("sendMode", "now")} label="Send Now" />
              <Radio name="send" checked={f.sendMode === "later"} onChange={() => set("sendMode", "later")} label="Schedule Later" />
              <div className="w-44"><DateField disabled={f.sendMode !== "later"} value={f.schedDate} onChange={(v) => set("schedDate", v)} /></div>
              <div className="w-44"><DateField disabled={f.sendMode !== "later"} value={f.schedEnd} onChange={(v) => set("schedEnd", v)} /></div>
            </div>
            {err("schedDate")}
          </div>

          {/* 4 */}
          <div>
            <Step n={4} title="Action / Link" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Action Type</Label>
                <Select value={f.actionType} onChange={(v) => set("actionType", v)} options={ACTIONS} />
              </div>
              <div>
                <Label required={f.actionType === "External Link"}>URL Link</Label>
                <input
                  className={`${inputCls} disabled:bg-gray-50`}
                  disabled={f.actionType === "None"}
                  placeholder="https://faithco.app/challenge/spring-2025"
                  value={f.url}
                  onChange={(e) => set("url", e.target.value)}
                />
                {err("url")}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: live preview */}
        <div className="bg-white rounded-lg border border-[#E2DFFC] p-6">
          <h3 className="text-base font-semibold text-[#0A0847] flex items-center gap-2 mb-4">
            Live Preview (User View) <FiInfo size={16} className="text-[#0A0847CC]" />
          </h3>

          <div className="bg-[#F8F8FF] border border-[#E2DFFC] rounded-lg p-4 min-h-[600px]">
            <div className="flex items-center justify-between text-xs font-semibold text-[#0A0847]">
              <span>9:41</span>
              <FiWifi size={14} />
            </div>

            <div className="flex items-center justify-between mt-4">
              <span className="w-7 h-7 rounded-full bg-white border border-[#E2DFFC] flex items-center justify-center"><FiChevronLeft size={14} /></span>
              <span className="text-[11px] font-semibold text-[#0A0847]">Notification Details</span>
              <span className="w-7 h-7 rounded-full bg-white border border-[#E2DFFC] flex items-center justify-center"><FiMessageSquare size={13} /></span>
            </div>

            <div className="mt-4 rounded-lg overflow-hidden bg-gray-200 h-24 flex items-center justify-center">
              {hasBanner ? <img src={f.banner} alt="" className="w-full h-full object-cover" /> : <FiImage size={22} className="text-gray-400" />}
            </div>

            <div className="flex items-center justify-between gap-2 mt-3">
              <p className="text-sm font-bold text-[#0A0847] truncate">{f.title || "Notification title"}</p>
              <span className="text-[10px] font-medium border border-[#E2DFFC] bg-white rounded px-2 py-0.5 text-[#0A0847CC]">New</span>
            </div>

            <p className="text-[11px] font-semibold text-[#0A0847] mt-3 leading-snug">{f.short || "Short description appears here."}</p>
            <p className="text-[10px] text-[#0A084799] font-medium mt-2 leading-snug">{f.message || "Detailed message appears here."}</p>

            <div className="mt-4 bg-[#E9EAF7] rounded-lg p-3 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-start gap-2">
                  <FiCheckSquare size={16} className="text-[#001984] mt-0.5" />
                  <div><p className="text-[10px] text-[#0A084799]">Start Date</p><p className="text-[11px] font-semibold text-[#0A0847]">{fmtDate(f.startDate)}</p></div>
                </div>
                <div className="flex items-start gap-2">
                  <FiCheckSquare size={16} className="text-[#001984] mt-0.5" />
                  <div><p className="text-[10px] text-[#0A084799]">End Date</p><p className="text-[11px] font-semibold text-[#0A0847]">{fmtDate(f.endDate)}</p></div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <FiAward size={16} className="text-[#001984] mt-0.5" />
                <div><p className="text-[10px] text-[#0A084799]">Rewards</p><p className="text-[11px] font-semibold text-[#0A0847]">{f.referral || "—"}</p></div>
              </div>
            </div>

            <button type="button" className="w-full mt-4 py-3 bg-[#001984] text-white text-xs font-semibold rounded-md">Join Challenge Now</button>
            <p className="text-center text-xs font-semibold text-[#001984] mt-4">Share with others</p>
          </div>

          <p className="text-[11px] text-[#0A084799] font-medium mt-4 flex items-start gap-2">
            External links will open in the “Learning For faithco” application automatically.
            <FiInfo size={14} className="shrink-0 mt-0.5" />
          </p>
        </div>
      </div>

      {/* Toggles */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        {[
          ["inApp", "In-App Notification"],
          ["push", "Push Notification"],
          ["important", "Mark as Important"],
        ].map(([k, l]) => (
          <label key={k} className="flex items-center gap-2 text-xs font-semibold text-[#0A0847]">
            {l} <Toggle checked={f[k]} onChange={(v) => set(k, v)} />
          </label>
        ))}
      </div>

      {/* Footer buttons */}
      <div className="grid grid-cols-2 lg:grid-cols-[1fr_1.3fr_1.4fr_2fr] gap-3">
        <button type="button" onClick={() => submit("Save Draft")} className="py-3 border border-[#E2DFFC] bg-white text-[#0A0847] text-xs font-semibold rounded-md flex items-center justify-center gap-2 hover:bg-gray-50 cursor-pointer">
          <FiSave size={15} /> Save Draft
        </button>
        <button type="button" onClick={() => submit("Preview")} className="py-3 border border-[#001984] bg-white text-[#001984] text-xs font-semibold rounded-md flex items-center justify-center gap-2 hover:bg-[#EEF2FF] cursor-pointer">
          <FiEye size={15} /> Preview
        </button>
        <button type="button" onClick={() => submit("Schedule")} className="py-3 border border-[#001984] bg-white text-[#001984] text-xs font-semibold rounded-md flex items-center justify-center gap-2 hover:bg-[#EEF2FF] cursor-pointer">
          <FiCalendar size={15} /> Schedule
        </button>
        <button type="button" onClick={() => submit("Send Notification")} className="py-3 bg-[#001984] hover:bg-[#001266] text-white text-xs font-semibold rounded-md flex items-center justify-center gap-2 cursor-pointer">
          <FiSend size={15} /> Send Notification
        </button>
      </div>

      {/* Banner preview modal */}
      {showBanner && (
        <div onClick={() => setShowBanner(false)} className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center p-6">
          <img src={f.banner} alt="Banner preview" onClick={(e) => e.stopPropagation()} className="max-w-full max-h-[85vh] rounded-xl" />
        </div>
      )}
    </div>
  );
}