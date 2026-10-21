import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiSave,
  FiEye,
  FiSend,
  FiCalendar,
  FiChevronDown,
  FiUsers,
  FiPieChart,
  FiUser,
  FiTag,
  FiExternalLink,
  FiCheck,
  FiHelpCircle,
} from "react-icons/fi";
import Breadcrumb from "../../../components/UIComponents/BreadCrumb";
import DollarTag from "../../../assets/CouponCode/DollarTag.svg";
import PieChartIcon from "../../../assets/CouponCode/PieChart.svg";
import Twousers from "../../../assets/CouponCode/Twousers.svg";
import UserPulseCircle from "../../../assets/CouponCode/UserPulseCircle.svg";
import YellowQuestionMark from "../../../assets/CouponCode/YellowQuestionMark.svg";

/* ==========================================================================
   ATOMS (same classes as the rest of the app)
   ========================================================================== */

   
    const SvgIcon = ({ src, size = 16, className = "" }) => (
              <img src={src} alt="" width={size} height={size} className={`shrink-0 ${className}`} />
            );
            
       const DollarTagIconSvg = (p) => <SvgIcon src={DollarTag} {...p} />;
       const PieChartIconSvg = (p) => <SvgIcon src={PieChartIcon} {...p} />;
       const TwousersIconSvg = (p) => <SvgIcon src={Twousers} {...p} />;
       const UserPulseCircleIconSvg = (p) => <SvgIcon src={UserPulseCircle} {...p} />;
       const YellowQuestionMarkSvg = (p) => <SvgIcon src={YellowQuestionMark} {...p} />;


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

const Hint = ({ children }) => (
  <p className="text-[10px] italic text-[#0A084799] font-medium mt-1.5">{children}</p>
);

const Select = ({ value, onChange, options, className = "" }) => (
  <div className={`relative ${className}`}>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full appearance-none border border-[#E2DFFC] rounded-md px-3 pr-9 py-3 text-xs text-[#0A0847] bg-white outline-none focus:border-[#001984] cursor-pointer"
    >
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
    <FiChevronDown
      size={14}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
    />
  </div>
);

const DateField = ({ value, onChange }) => (
  <div className="relative">
    <input
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-white border border-[#E2DFFC] rounded-md px-3 py-3 text-xs text-[#0A0847] outline-none focus:border-[#001984] appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
    />
    <FiCalendar
      size={15}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
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

const Card = ({ n, title, children, className = "" }) => (
  <div className={`bg-white rounded-lg border border-[#E2DFFC] p-6 ${className}`}>
    <div className="flex items-center gap-3 pb-4 mb-5 border-b border-[#E2DFFC]">
      <span className="w-8 h-8 rounded-full bg-[#001984] text-white text-sm font-semibold flex items-center justify-center shrink-0">
        {n}
      </span>
      <h3 className="text-base font-semibold text-[#0A0847]">{title}</h3>
    </div>
    <div className="space-y-4">{children}</div>
  </div>
);

const ToggleRow = ({ title, desc, checked, onChange }) => (
  <div className="flex items-start justify-between gap-4">
    <div>
      <p className="text-xs font-semibold text-[#0A0847CC]">{title}</p>
      {desc && <p className="text-[11px] text-[#0A084799] font-medium mt-0.5 max-w-[220px]">{desc}</p>}
    </div>
    <Toggle checked={checked} onChange={onChange} />
  </div>
);

const SummaryRow = ({ label, children }) => (
  <div className="grid grid-cols-[110px_1fr] gap-2 text-xs">
    <span className="font-medium text-[#0A0847CC]">{label}</span>
    <span className="font-medium text-[#0A0847CC]">{children || "—"}</span>
  </div>
);

const fmtDate = (iso) =>
  iso
    ? new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
        month: "short", day: "2-digit", year: "numeric", timeZone: "UTC",
      })
    : "";

/* ==========================================================================
   DATA
   ========================================================================== */
const COUPON_NAMES = ["Easter Journey 2026", "Christmas Journey 2026", "Faith Starter", "Summer Blessing"];
const CHOOSE_TYPES = ["Monthly", "Yearly", "Lifetime"];
const DISCOUNT_TYPES = ["Percentage", "Fixed Amount"];
const YES_NO = ["Yes", "No"];

const AUDIENCE = [
  ["reuseAfterExpiry", "Allow Reuse After Expiration"],
  ["existingOnly", "Existing Subscribers Only"],
  ["returningOnly", "Returning Users Only"],
  ["churchOnly", "Church / Organization Members Only"],
];

const SECURITY = [
  ["multiAccounts", "Prevent Multiple Accounts", "Block multiple accounts from same device/IP"],
  ["vpnAbuse", "Prevent VPN Abuse", "Block redemptions using VPN or proxy"],
  ["expiredReuse", "Block Expired Code Reuse", "Prevent use of expired codes"],
  ["captcha", "CAPTCHA on Redemption", "Require CAPTCHA during coupon redemption"],
  ["fraudAlerts", "Fraud Detection Alerts", "Get notified for suspicious coupon activity"],
];

const INITIAL = {
  name: "Easter Journey 2026",
  note: "",
  status: "Active",
  chooseType: "Monthly",
  discountType: "Percentage",
  discountValue: "25",
  minAmount: "Monthly",
  startDate: "2025-06-01",
  endDate: "2025-07-31",
  dateDiscountValue: "25",
  autoExpire: true,
  maxTotal: "1000",
  maxPerUser: "1",
  currentUsage: 128,
  allowReuse: false,
  showOnSignup: true,
  featured: true,
  hidden: false,
  banner: "",
  reuseAfterExpiry: true,
  existingOnly: false,
  returningOnly: false,
  churchOnly: false,
  country: "All Countries",
  domains: "",
  applyTo: "First Payment Only",
  freeTrial: "Yes",
  stack: "No",
  giftAllow: "No",
  giftMode: "Redemption",
  recipientUse: "Yes",
  preventGiftSelf: "No",
  multiAccounts: false,
  vpnAbuse: false,
  expiredReuse: false,
  captcha: false,
  fraudAlerts: false,
};

/* ==========================================================================
   PAGE (NO NAVBAR / NO SIDEBAR)
   ========================================================================== */
export default function CreateCouponPage() {
  const navigate = useNavigate();
  const [f, setF] = useState(INITIAL);
  const [errors, setErrors] = useState({});

  const set = (k, v) => {
    setF((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const err = (k) =>
    errors[k] ? <p className="text-[11px] text-[#EB0C10] font-medium mt-1">{errors[k]}</p> : null;

  const remaining = Math.max(0, Number(f.maxTotal || 0) - f.currentUsage);

  const validate = () => {
    const e = {};
    if (!f.name) e.name = "Coupon name is required";
    if (!f.discountValue || Number(f.discountValue) <= 0) e.discountValue = "Enter a valid value";
    if (f.discountType === "Percentage" && Number(f.discountValue) > 100)
      e.discountValue = "Percentage can't exceed 100";
    if (!f.startDate) e.startDate = "Select a start date";
    if (!f.endDate) e.endDate = "Select an end date";
    if (f.startDate && f.endDate && f.endDate < f.startDate)
      e.endDate = "End date must be after start date";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleAction = (type) => {
    if (type !== "Save draft" && !validate()) return;
    const payload = {
      ...f,
      status: type === "Save draft" ? "Draft" : f.status,
      discountValue: Number(f.discountValue),
      maxTotal: Number(f.maxTotal),
      maxPerUser: Number(f.maxPerUser),
      remainingUses: remaining,
      emailDomains: f.domains.split(",").map((d) => d.trim()).filter(Boolean),
    };
    console.log(`${type} payload:`, payload);
    alert(`${type}! Check browser console for full payload.`);
    if (type === "Activate Coupon") navigate(-1);
  };

  const discountText =
    f.discountType === "Percentage"
      ? `${f.discountValue || 0}% off ${f.chooseType}`
      : `$${f.discountValue || 0} off ${f.chooseType}`;

  const audienceText =
    AUDIENCE.slice(1)
      .filter(([k]) => f[k])
      .map(([, l]) => l.replace(" Only", ""))
      .join(", ") || "Everyone";

  return (
    <div className="p-6 bg-[#F8FAFC] min-h-screen font-[Inter] space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
           <Breadcrumb
      items={[
        { label: "Dashboard", path: "/admin" },
        { label: "Coupons", path: "/admin/coupon-codes" },
        { label: "Create Coupon Code" },
      ]}
    />
          <h1 className="text-xl font-semibold text-[#0A0847] mt-2">Create Coupon Code</h1>
        </div>
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => handleAction("Save draft")}
            className="px-4 py-2.5 bg-white border border-[#E2DFFC] text-[#0A0847] text-xs font-semibold rounded-md flex items-center gap-2 hover:bg-gray-50 cursor-pointer">
            <FiSave size={14} /> Save draft
          </button>
          <button type="button" onClick={() => handleAction("Preview")}
            className="px-4 py-2.5 bg-white border border-[#E2DFFC] text-[#0A0847] text-xs font-semibold rounded-md flex items-center gap-2 hover:bg-gray-50 cursor-pointer">
            <FiEye size={14} /> Preview
          </button>
          <button type="button" onClick={() => handleAction("Activate Coupon")}
            className="px-5 py-2.5 bg-[#001984] hover:bg-[#001266] text-white text-xs font-semibold rounded-md flex items-center gap-2 cursor-pointer">
            <FiSend size={14} /> Activate Coupon
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* 1 */}
        <Card n={1} title="Basic Information">
          <div>
            <Label required>Coupon Code Name</Label>
            <Select value={f.name} onChange={(v) => set("name", v)} options={COUPON_NAMES} />
            {err("name")}
          </div>
          <div>
            <Label>Internal Description (Note)</Label>
            <textarea
              rows={5}
              placeholder="Optional notes for internal use only"
              value={f.note}
              onChange={(e) => set("note", e.target.value)}
              className="w-full border border-[#E2DFFC] rounded-md p-3 text-xs text-[#0A0847] placeholder-gray-400 outline-none resize-none focus:border-[#001984]"
            />
          </div>
          <div>
            <Label required>Status</Label>
            <Select value={f.status} onChange={(v) => set("status", v)} options={["Active", "Inactive", "Scheduled"]} />
          </div>
        </Card>

        {/* 2 */}
        <Card n={2} title="Discount Settings">
          <div>
            <Label required>Choose Discount Type</Label>
            <Select value={f.chooseType} onChange={(v) => set("chooseType", v)} options={CHOOSE_TYPES} />
          </div>
          <div>
            <Label required>Discount Type</Label>
            <Select value={f.discountType} onChange={(v) => set("discountType", v)} options={DISCOUNT_TYPES} />
          </div>
          <div>
            <Label required>Discount Value</Label>
            <Input type="number" min="0" value={f.discountValue} onChange={(e) => set("discountValue", e.target.value)} />
            {err("discountValue")}
          </div>
          <div>
            <Label>Minimum Discount Amount (Optional)</Label>
            <Select value={f.minAmount} onChange={(v) => set("minAmount", v)} options={CHOOSE_TYPES} />
          </div>
        </Card>

        {/* 3 */}
        <Card n={3} title="Date & Availability">
          <div>
            <Label required>Start Date</Label>
            <DateField value={f.startDate} onChange={(v) => set("startDate", v)} />
            {err("startDate")}
          </div>
          <div>
            <Label required>End Date</Label>
            <DateField value={f.endDate} onChange={(v) => set("endDate", v)} />
            {err("endDate")}
          </div>
          <div>
            <Label required>Discount Value</Label>
            <Input type="number" min="0" value={f.dateDiscountValue} onChange={(e) => set("dateDiscountValue", e.target.value)} />
          </div>
          <div>
            <Label>Auto Expire</Label>
            <ToggleRow title="In-App Notification" checked={f.autoExpire} onChange={(v) => set("autoExpire", v)} />
          </div>
        </Card>

        {/* 4 */}
        <Card n={4} title="Usage & Limits">
          <div>
            <Label>Maximum Total Uses</Label>
            <Input type="number" min="0" value={f.maxTotal} onChange={(e) => set("maxTotal", e.target.value)} />
          </div>
          <div>
            <Label>Maximum Uses Per User</Label>
            <Input type="number" min="1" value={f.maxPerUser} onChange={(e) => set("maxPerUser", e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#F1F2F9] rounded-lg p-4 flex items-center gap-3">
              <TwousersIconSvg size={28} className="text-[#001984]" />
              <div>
                <p className="text-[11px] font-medium text-[#0A084799]">Current Usage</p>
                <p className="text-lg font-bold text-[#0A0847]">{f.currentUsage}</p>
              </div>
            </div>
            <div className="bg-[#F1F2F9] rounded-lg p-4 flex items-center gap-3">
              <PieChartIconSvg size={28} className="text-[#3231DB]" />
              <div>
                <p className="text-[11px] font-medium text-[#0A084799]">Remaining Uses</p>
                <p className="text-lg font-bold text-[#0A0847]">{remaining}</p>
              </div>
            </div>
          </div>
          <ToggleRow title="Allow Reuse After Expiration" checked={f.allowReuse} onChange={(v) => set("allowReuse", v)} />
        </Card>

        {/* 5 */}
        <Card n={5} title="Visibility & Promotion">
          <ToggleRow title="Show on Sign-up Page" checked={f.showOnSignup} onChange={(v) => set("showOnSignup", v)} />
          <ToggleRow
            title="Featured/Public Coupon"
            desc="Display on public pages and in promo/landing pages"
            checked={f.featured}
            onChange={(v) => setF((p) => ({ ...p, featured: v, hidden: v ? false : p.hidden }))}
          />
          <ToggleRow
            title="Hidden / Private Code"
            desc="Only visible in direct link or admin"
            checked={f.hidden}
            onChange={(v) => setF((p) => ({ ...p, hidden: v, featured: v ? false : p.featured }))}
          />
          <div>
            <Label>Promotional Banner Message (Optional)</Label>
            <Input placeholder="e.g., Get 25% off your first year" value={f.banner} onChange={(e) => set("banner", e.target.value)} />
          </div>
        </Card>

        {/* 6 */}
        <Card n={6} title="Audience Restrictions">
          <div className="space-y-3">
            {AUDIENCE.map(([k, label]) => (
              <label key={k} className="flex items-center gap-3 cursor-pointer select-none">
                <span
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    f[k] ? "bg-[#001984] border-[#001984] text-white" : "bg-white border-[#001984]"
                  }`}
                >
                  {f[k] && <FiCheck size={12} />}
                </span>
                <input type="checkbox" checked={f[k]} onChange={() => set(k, !f[k])} className="hidden" />
                <span className="text-xs font-medium text-[#0A0847CC]">{label}</span>
              </label>
            ))}
          </div>
          <div>
            <Label>Country / Region Restrictions (Optional)</Label>
            <Select value={f.country} onChange={(v) => set("country", v)} options={["All Countries", "United States", "Canada", "United Kingdom", "India"]} />
          </div>
          <div>
            <Label>Email Domain Restrictions (Optional)</Label>
            <Input placeholder="e.g., church.org, gmail.com" value={f.domains} onChange={(e) => set("domains", e.target.value)} />
            <Hint>Separate multiple domains with commas</Hint>
          </div>
        </Card>

        {/* 7 */}
        <Card n={7} title="Subscription Rules">
          <div>
            <Label required>Apply To</Label>
            <Select value={f.applyTo} onChange={(v) => set("applyTo", v)} options={["First Payment Only", "All Payments", "First 3 Months"]} />
          </div>
          <div>
            <Label required>Free Trial Allowed With Coupon</Label>
            <Select value={f.freeTrial} onChange={(v) => set("freeTrial", v)} options={YES_NO} />
          </div>
          <div>
            <Label required>Stack with Other Coupons</Label>
            <Select value={f.stack} onChange={(v) => set("stack", v)} options={YES_NO} />
          </div>
        </Card>

        {/* 8 */}
        <Card n={8} title="Gift Subscription Controls">
          <div>
            <Label required>Allow Coupon on Gift Purchase</Label>
            <div className="grid grid-cols-2 gap-3">
              <Select value={f.giftAllow} onChange={(v) => set("giftAllow", v)} options={YES_NO} />
              <Select value={f.giftMode} onChange={(v) => set("giftMode", v)} options={["Redemption", "Purchase"]} />
            </div>
          </div>
          <div>
            <Label required>Allow Recipient to Use Coupons</Label>
            <Select value={f.recipientUse} onChange={(v) => set("recipientUse", v)} options={YES_NO} />
          </div>
          <div>
            <Label>Prevent Reuse on Gift & Self</Label>
            <Select value={f.preventGiftSelf} onChange={(v) => set("preventGiftSelf", v)} options={YES_NO} />
          </div>
        </Card>

        {/* 9 */}
        <Card n={9} title="Summary (Preview)">
          <div className="flex gap-4">
            <span className="w-12 h-12 rounded-lg bg-[#E8E9FB] text-[#001984] flex items-center justify-center shrink-0">
              <DollarTagIconSvg size={28} />
            </span>
            <div className="space-y-3 flex-1">
              <SummaryRow label="Code Name:">{f.name}</SummaryRow>
              <SummaryRow label="Discount:">{discountText}</SummaryRow>
              <SummaryRow label="Validity:">
                {f.startDate && f.endDate ? `${fmtDate(f.startDate)} ~ ${fmtDate(f.endDate)}` : ""}
              </SummaryRow>
              <SummaryRow label="Status:">{f.status}</SummaryRow>
              <SummaryRow label="Max Uses:">{f.maxTotal} ({f.maxPerUser} per user)</SummaryRow>
              <SummaryRow label="Visibility:">{f.hidden ? "Private" : "Public"}</SummaryRow>
              <SummaryRow label="Audience:">{audienceText}</SummaryRow>
            </div>
          </div>
        </Card>

        {/* Help */}
        <div className="bg-[#FFFBEA] rounded-lg border border-[#F6EBC0] p-6">
          <div className="flex items-center gap-3 pb-4 mb-5 border-b border-[#F0E4B0]">
            <span className="w-8 h-8 rounded-full bg-[#FBBF24] text-white flex items-center justify-center shrink-0">
              <YellowQuestionMarkSvg size={36} />
            </span>
            <h3 className="text-base font-semibold text-[#0A0847]">Need Help?</h3>
          </div>
          <p className="text-sm font-semibold text-[#0A0847] max-w-[300px]">
            Learn how to expertly configure promotions and coupon rules.
          </p>
          <button
            type="button"
            onClick={() => navigate("/admin/help")}
            className="mt-14 px-6 py-3 border border-[#001984] bg-white text-[#001984] text-xs font-semibold rounded-md flex items-center gap-2 hover:bg-[#EEF2FF] cursor-pointer"
          >
            Visit Help Center <FiExternalLink size={14} />
          </button>
        </div>
      </div>

      {/* Security */}
      <div className="bg-white rounded-lg border border-[#E2DFFC] p-6">
        <h3 className="text-base font-semibold text-[#0A0847] mb-5">
          Additional Options (Security & Fraud Protection)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
          {SECURITY.map(([k, title, desc]) => (
            <div key={k} className="flex items-start gap-3">
              <span className="w-11 h-11 rounded-lg bg-[#E8E9FB] text-[#3231DB] flex items-center justify-center shrink-0">
                <UserPulseCircleIconSvg size={32} />
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-[#0A0847]">{title}</p>
                <p className="text-[11px] text-[#0A084799] font-medium mt-0.5">{desc}</p>
              </div>
              {/* <Toggle checked={f[k]} onChange={(v) => set(k, v)} /> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}