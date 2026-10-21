import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiChevronDown, FiCheckCircle, FiX } from "react-icons/fi";

const COUNTRIES = ["United States", "India", "United Kingdom", "Canada", "Australia"];
const LANGUAGES = ["English", "Spanish", "French", "Hindi"];
const TIME_ZONES = [
  "(GMT-05:00) Eastern Time (US & Canada)",
  "(GMT-06:00) Central Time (US & Canada)",
  "(GMT-07:00) Mountain Time (US & Canada)",
  "(GMT-08:00) Pacific Time (US & Canada)",
  "(GMT+00:00) GMT",
  "(GMT+05:30) India Standard Time",
];
const ROLES = ["User", "Moderator", "Admin"];
const PLANS = ["Free", "Premium"];
const STATUSES = ["Invited", "Active", "Suspended"];

const inputCls =
  "w-full border border-[#E2DFFC] rounded-md px-3 py-3 text-xs text-[#0A0847] placeholder-gray-400 bg-white outline-none focus:border-[#001984] transition-all";
const errCls = "border-[#EB0C10] focus:border-[#EB0C10]";

const Label = ({ children, required }) => (
  <label className="block text-xs font-semibold text-[#0A0847CC] mb-1.5">
    {children} {required && <span className="text-[#EB0C10]">*</span>}
  </label>
);

const SelectField = ({ value, onChange, options }) => (
  <div className="relative">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${inputCls} appearance-none pr-9 cursor-pointer text-[#0A084799]`}
    >
      {options.map((o) => <option key={o}>{o}</option>)}
    </select>
    <FiChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
  </div>
);

const Toggle = ({ checked, onChange, title, desc }) => (
  <div className="flex items-start gap-3">
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`w-9 h-5 rounded-full p-0.5 mt-0.5 transition-colors shrink-0 cursor-pointer ${
        checked ? "bg-[#001984]" : "bg-gray-300"
      }`}
    >
      <span className={`block w-4 h-4 rounded-full bg-white transition-transform ${checked ? "translate-x-4" : ""}`} />
    </button>
    <div>
      <p className="text-xs font-semibold text-[#0A0847]">{title}</p>
      <p className="text-[10px] text-[#0A084799] font-medium mt-0.5">{desc}</p>
    </div>
  </div>
);

export default function AddUserPage() {
  const navigate = useNavigate();
  const [savedToast, setSavedToast] = useState(false);
  const [errors, setErrors] = useState({});
  const [couponApplied, setCouponApplied] = useState(false);
  const firstRender = useRef(true);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    profileName: "",
    username: "",
    country: "United States",
    language: "English",
    timeZone: TIME_ZONES[0],
    role: "User",
    plan: "Premium",
    coupon: "",
    status: "Invited",
    welcomeEmail: true,
    requireVerification: true,
    initialPassword: true,
  });

  const set = (k, v) => {
    setForm((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: undefined }));
  };

  // Debounced "auto saved" toast after edits
//   useEffect(() => {
//     if (firstRender.current) { firstRender.current = false; return; }
//     const t = setTimeout(() => {
//       // TODO: persist draft (API / localStorage)
//       setSavedToast(true);
//     }, 1200);
//     return () => clearTimeout(t);
//   }, [form]);

//   useEffect(() => {
//     if (!savedToast) return;
//     const t = setTimeout(() => setSavedToast(false), 3500);
//     return () => clearTimeout(t);
//   }, [savedToast]);

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = true;
    if (!form.lastName.trim()) e.lastName = true;
    if (!form.profileName.trim()) e.profileName = true;
    if (!/^\S+@\S+\.\S+$/.test(form.username.trim())) e.username = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (!validate()) return;
    console.log("Add user payload:", form);
    navigate("/admin/users/roles");
  };

  const applyCoupon = () => {
    if (!form.coupon.trim()) return;
    // TODO: validate coupon via API
    setCouponApplied(true);
  };

  return (
    <div className="p-6 bg-[#F8FAFC] min-h-screen font-[Inter] space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => navigate(-1)} className="text-[#0A0847CC] cursor-pointer">
              <FiArrowLeft size={22} />
            </button>
            <h1 className="text-xl font-semibold text-[#0A0847]">Add New User</h1>
          </div>
          <p className="text-sm text-[#0A084799] font-medium mt-2">
            Engage and track activities for each chapter.
          </p>
        </div>

        {/* {savedToast && (
          <div className="flex items-center gap-3 bg-[#21AC1C0D] border border-[#B7E4B4] text-[#21AC1C] rounded-md pl-4 pr-3 py-3 text-xs font-semibold">
            <FiCheckCircle size={18} />
            <span>User details auto saved</span>
            <button type="button" onClick={() => setSavedToast(false)} className="ml-10 cursor-pointer">
              <FiX size={18} />
            </button>
          </div>
        )} */}
      </div>

      {/* Form card */}
      <div className="bg-white rounded-lg border border-[#E2DFFC] p-5 space-y-6">
        {/* Profile Information */}
        <section className="space-y-5">
          <h3 className="text-base font-semibold text-[#0A0847]">Profile Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            <div>
              <Label required>First Name</Label>
              <input
                className={`${inputCls} ${errors.firstName ? errCls : ""}`}
                placeholder="Enter first name"
                value={form.firstName}
                onChange={(e) => set("firstName", e.target.value)}
              />
            </div>
            <div>
              <Label required>Last Name</Label>
              <input
                className={`${inputCls} ${errors.lastName ? errCls : ""}`}
                placeholder="Enter last name"
                value={form.lastName}
                onChange={(e) => set("lastName", e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label required>Profile Name</Label>
            <input
              className={`${inputCls} ${errors.profileName ? errCls : ""}`}
              placeholder="Enter profile name"
              value={form.profileName}
              onChange={(e) => set("profileName", e.target.value)}
            />
          </div>

          <div>
            <Label required>Username</Label>
            <input
              type="email"
              className={`${inputCls} ${errors.username ? errCls : ""}`}
              placeholder="johndoe@example.com"
              value={form.username}
              onChange={(e) => set("username", e.target.value)}
            />
            {errors.username && (
              <p className="text-[10px] text-[#EB0C10] mt-1">Enter a valid email address.</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5">
            <div>
              <Label required>Country</Label>
              <SelectField value={form.country} onChange={(v) => set("country", v)} options={COUNTRIES} />
            </div>
            <div>
              <Label required>Language</Label>
              <SelectField value={form.language} onChange={(v) => set("language", v)} options={LANGUAGES} />
            </div>
            <div>
              <Label required>Time Zone</Label>
              <SelectField value={form.timeZone} onChange={(v) => set("timeZone", v)} options={TIME_ZONES} />
            </div>
          </div>
        </section>

        <hr className="border-[#E2DFFC]" />

        {/* Account Information */}
        <section className="space-y-5">
          <h3 className="text-base font-semibold text-[#0A0847]">Account Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            <div>
              <Label required>Role</Label>
              <SelectField value={form.role} onChange={(v) => set("role", v)} options={ROLES} />
            </div>
            <div>
              <Label required>Plan</Label>
              <SelectField value={form.plan} onChange={(v) => set("plan", v)} options={PLANS} />
            </div>
            <div>
              <Label>Discount / Coupon Code</Label>
              <div className="flex">
                <input
                  className={`${inputCls} rounded-r-none border-r-0`}
                  placeholder="Enter code (optional)"
                  value={form.coupon}
                  onChange={(e) => { set("coupon", e.target.value); setCouponApplied(false); }}
                />
                <button
                  type="button"
                  onClick={applyCoupon}
                  className={`px-6 border border-[#E2DFFC] rounded-r-md text-xs font-semibold cursor-pointer transition-colors ${
                    couponApplied ? "bg-[#21AC1C1A] text-[#21AC1C]" : "bg-[#F1F2F9] text-[#0A084799] hover:bg-[#E2DFFC]"
                  }`}
                >
                  {couponApplied ? "Applied" : "Apply"}
                </button>
              </div>
            </div>
            <div>
              <Label required>Account Status</Label>
              <SelectField value={form.status} onChange={(v) => set("status", v)} options={STATUSES} />
            </div>
          </div>
        </section>

        {/* Invitation & Security */}
        <section className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-[#0A0847]">Invitation &amp; Security</h3>
            <p className="text-sm text-[#0A084799] font-medium mt-2">
              Set up how this user joins and accesses the system with secure options.
            </p>
          </div>

          <div className="space-y-5 pt-1">
            <Toggle
              checked={form.welcomeEmail}
              onChange={(v) => set("welcomeEmail", v)}
              title="Send Welcome Email"
              desc="User will receive an email invitation."
            />
            <Toggle
              checked={form.requireVerification}
              onChange={(v) => set("requireVerification", v)}
              title="Require Email Verification"
              desc="User must verify email before accessing the system."
            />
            <Toggle
              checked={form.initialPassword}
              onChange={(v) => set("initialPassword", v)}
              title="Set Initial Password"
              desc="User will be asked to set their own password."
            />
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="px-10 py-2.5 bg-white border border-[#001984] text-[#0A0847] rounded-md text-sm font-semibold hover:bg-gray-50 cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="px-8 py-2.5 bg-[#4D2ED1] hover:bg-[#3B21A8] text-white rounded-md text-sm font-semibold cursor-pointer"
        >
          Save &amp; Next: Roles
        </button>
      </div>
    </div>
  );
}