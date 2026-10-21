import { useState } from "react";
import {
  LuPlus,
  LuSearch,
  LuFilter,
  LuUser,
  LuChevronDown,
  LuHeadset,
  LuExternalLink,
  LuGripVertical,
} from "react-icons/lu";
import TicketModal from "./TicketModal";
import coverImg from "../../../assets/cover-img.png";
// Stat icons cut from the Figma frames so the glyphs match exactly.
// Adjust these paths to where src/assets/support/*.png live in your project.
import mailIconSrc from "../../../assets/support/mail.png";
import clockIconSrc from "../../../assets/support/clock.png";
import urgentIconSrc from "../../../assets/support/urgent.png";
import barsIconSrc from "../../../assets/support/bars.png";

/* ==========================================================================
   MOCK DATA — hardcoded exactly as specified
   ========================================================================== */
const STATS = [
  {
    tileClass: "bg-[rgba(98,8,253,0.1)]",
    iconSrc: mailIconSrc,
    iconStyle: { width: 36, height: "auto" },
    value: "24",
    valueClass: "text-[#6208FD]",
    label: "Total articles",
  },
  {
    tileClass: "bg-[rgba(198,84,6,0.1)]",
    iconSrc: clockIconSrc,
    iconStyle: { height: 36, width: "auto" },
    value: "7",
    valueClass: "text-[#C65406]",
    label: "Waiting",
  },
  {
    tileClass: "bg-[rgba(210,48,51,0.1)]",
    iconSrc: urgentIconSrc,
    iconStyle: { height: 30, width: "auto" },
    value: "3",
    valueClass: "text-[#D23033]",
    label: "Urgent",
  },
  {
    tileClass: "bg-[rgba(24,23,227,0.1)]",
    iconSrc: barsIconSrc,
    iconStyle: { height: 30, width: "auto" },
    value: null,
    valueClass: "",
    label: "Avg. Response",
  },
];

const STATUS_TABS = ["All 34", "Open 24", "Waiting 7", "Resolved 5", "Urgent 3"];

const TICKETS = [
  {
    id: "1",
    initials: "SJ",
    avatarClass: "bg-[#E0E7FF] text-[#3730A3]",
    avatar: "/avatars/sarah-j.jpg",
    name: "Sarah J.",
    email: "sarah.j@example.com",
    plan: "Pro Plan",
    member: "User ID: 10472 — Member since Mar 18, 2023",
    subject: "Subscription cancellation",
    priority: "High",
    category: "Billing",
    received: "12 min ago",
    assignee: "Maya",
    format: "Active",
    status: "Open",
    customerTime: "12 min ago",
    agentTime: "9 min ago",
    agent: "Maya (Admin)",
    customerMsg:
      "Manage your subscription, payments, and billing information.",
    agentMsg:
      "Hi Sarah, thanks for reaching out. I'm sorry to hear about the issue. I'm looking into this for you now.",
    attachment: { file: "receipt-may-2024.png", size: "245 KB" },
    note: "Payment stuck with pending charges, escalate to billing team.",
  },
  {
    id: "2",
    initials: "DK",
    avatarClass: "bg-[#DBEAFE] text-[#1E40AF]",
    avatar: "/avatars/daniel-k.jpg",
    name: "Daniel K.",
    email: "daniel.k@example.com",
    plan: "Free Plan",
    member: "User ID: 10471 — Member since Jan 12, 2025",
    subject: "Quiz progress missing",
    priority: "Normal",
    category: "Technical",
    received: "38 min ago",
    assignee: "Peter",
    format: "Waiting",
    status: "Waiting",
    customerTime: "38 min ago",
    agentTime: "25 min ago",
    agent: "Peter (Admin)",
    customerMsg:
      "My quiz progress reset overnight and I've lost a full week of answered questions.",
    agentMsg:
      "Thanks for the details, Daniel. I've restored your last-known progress and I'm checking what caused the reset.",
    attachment: null,
    note: "Compare last sync timestamp in DB before closing.",
  },
  {
    id: "3",
    initials: null,
    avatarClass: "bg-[#EA580C]",
    avatar: null,
    name: "Monica R.",
    email: "monica.r@example.com",
    plan: "Pro Plan",
    member: "User ID: 10470 — Member since Oct 05, 2024",
    subject: "Report inappropriate post",
    priority: "Urgent",
    category: "Safety",
    received: "1 hr ago",
    assignee: "Unassigned",
    format: "Open",
    status: "Open",
    customerTime: "1 hr ago",
    agentTime: "45 min ago",
    agent: "Maya (Admin)",
    customerMsg:
      "Hi, I'd like to report a post in the community feed that looks inappropriate.",
    agentMsg:
      "Appreciate you flagging this, Monica. The safety team is reviewing it now — usually within a few hours.",
    attachment: null,
    note: "Flag for safety review before sending a reply.",
  },
  {
    id: "4",
    initials: "JT",
    avatarClass: "bg-[#1F2937] text-white",
    avatar: "/avatars/james-t.jpg",
    name: "James T.",
    email: "james.t@example.com",
    plan: "Free Plan",
    member: "User ID: 10469 — Member since Feb 28, 2025",
    subject: "Gift code not working",
    priority: "Family",
    category: "Gift Codes",
    received: "2 hrs ago",
    assignee: "Alex",
    format: "Resolved",
    status: "Resolved",
    customerTime: "2 hrs ago",
    agentTime: "1 hr ago",
    agent: "Alex (Admin)",
    customerMsg:
      "I received a gift code but it says invalid every time I try to redeem it.",
    agentMsg:
      "Thanks James — I've validated the code on our end and it is active. Please try again in a few minutes.",
    attachment: null,
    note: "Code was fixed on 21 Mar — confirm redeem status before closing.",
  },
];

const CONTACT_SUBJECTS = [
  "Subscription & Billing",
  "Account & Login",
  "Technical Issue",
  "Report a Bug",
  "Other",
];

const SETTINGS_TABS = ["General", "Contact Form", "Automation", "Appearance"];

function priorityClass(priority) {
  if (priority === "High" || priority === "Urgent") {
    return "border-[#FECACA] bg-[rgba(210,48,51,0.1)] text-[#D23033]";
  }
  if (priority === "Normal") {
    return "border-[#89C8FF] bg-[rgba(0,25,132,0.1)] text-[#001984]";
  }
  return "border-[#89C8FF] bg-[rgba(137,200,255,0.1)] text-[#001984]";
}

function statusClass(format) {
  if (format === "Active") {
    return "border-[#4F46E5]/30 bg-[rgba(79,70,229,0.1)] text-[#4F46E5]";
  }
  if (format === "Waiting") {
    return "border-[#C65406]/30 bg-[rgba(198,84,6,0.1)] text-[#C65406]";
  }
  if (format === "Open") {
    return "border-[#001984]/30 bg-[rgba(0,25,132,0.1)] text-[#001984]";
  }
  return "border-[#21AC1C]/30 bg-[rgba(33,172,28,0.1)] text-[#21AC1C]";
}

/* ==========================================================================
   SMALL PRIMITIVES
   ========================================================================== */
function Switch({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors ${
        checked ? "bg-[#001984]" : "bg-[#D1D5DB]"
      }`}
    >
      <span
        className={`absolute top-[2px] h-4 w-4 rounded-full bg-white transition-all ${
          checked ? "left-[18px]" : "left-[2px]"
        }`}
      />
    </button>
  );
}

function Checkbox({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={`flex h-4 w-4 cursor-pointer items-center justify-center rounded-[4px] border transition-colors ${
        checked
          ? "border-[#001984] bg-[#001984]"
          : "border-[#D1D5DB] bg-white"
      }`}
    >
      {checked && (
        <svg viewBox="0 0 12 12" className="h-3 w-3 fill-none stroke-white">
          <path
            d="M2 6.2 4.6 8.8 10 3.4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}

const fieldSelectClass =
  "h-[46px] w-full cursor-pointer appearance-none rounded-[7.47px] border border-[#E2DFFC] bg-white pl-3 pr-[50px] text-[14px] font-medium text-[#0A0847] outline-none transition focus:border-[#001984]";

const bulkSelectClass =
  "h-[36px] w-full cursor-pointer appearance-none rounded-[7.47px] border border-[#E2DFFC] bg-white px-3 pr-8 text-[12px] font-medium text-[#0A0847] outline-none transition focus:border-[#001984]";

function Select({
  id,
  value,
  onChange,
  children,
  className = "",
  selectClass = fieldSelectClass,
}) {
  return (
    <div className={`relative ${className}`}>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={selectClass}
      >
        {children}
      </select>
      <LuChevronDown
        size={15}
        className="pointer-events-none absolute right-[14px] top-1/2 -translate-y-1/2 text-gray-400"
      />
    </div>
  );
}

function FieldLabel({ htmlFor, children }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-[6px] block text-[12px] font-semibold text-[#0A0847]/80"
    >
      {children}
    </label>
  );
}

const settingsInput =
  "h-[44px] w-full min-w-0 rounded-[8px] border border-[#E2DFFC] bg-white px-3 text-[12px] font-medium text-[#0A0847] outline-none transition focus:border-[#001984]";

const settingsSelect =
  "h-[44px] w-full min-w-0 cursor-pointer appearance-none rounded-[8px] border border-[#E2DFFC] bg-white pl-3 pr-10 text-[12px] font-medium text-[#0A0847] outline-none transition focus:border-[#001984]";

const inputClass =
  "h-[46px] w-full rounded-[7.47px] border border-[#E2DFFC] bg-white pl-3 pr-[50px] text-[14px] font-medium text-[#0A0847] outline-none transition focus:border-[#001984]";

const appearanceButton =
  "flex h-[33px] cursor-pointer items-center justify-center gap-2 rounded-[7.47px] border border-[#E2DFFC] bg-white px-3.5 text-[12px] font-medium text-[#0A0847]/80 transition-colors hover:bg-gray-50";

function ToggleRow({ label, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-[14px] font-semibold text-[#0A0847]">{label}</span>
      <Switch checked={checked} onChange={onChange} label={label} />
    </div>
  );
}

/* ==========================================================================
   USER AVATAR — 38×38 rounded square photo (Monica = gradient placeholder)
   ========================================================================== */
function UserAvatar({ ticket }) {
  if (ticket.avatar) {
    return (
      <img
        src={ticket.avatar}
        alt={ticket.name}
        className="h-[38px] w-[38px] shrink-0 rounded-[8px] object-cover"
      />
    );
  }
  return (
    <span
      className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[8px]"
      style={{ background: "linear-gradient(135deg, #FF8A3D, #F5622D)" }}
    >
      <LuUser size={20} className="text-white" />
    </span>
  );
}

/* ==========================================================================
   COVER IMAGE THUMBNAIL — from src/assets/cover-img.png
   ========================================================================== */
function CoverThumb() {
  return (
    <img
      src={coverImg}
      alt="Cover image"
      className="h-[86px] w-full max-w-[206px] rounded-[8px] border border-[#E2DFFC] object-cover object-center"
    />
  );
}

/* ==========================================================================
   MAIN PAGE
   ========================================================================== */
export default function SupportInbox() {
  const [activeTab, setActiveTab] = useState("All 34");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [openTicket, setOpenTicket] = useState(null);
  const [settingsTab, setSettingsTab] = useState("General");
  const [toggles, setToggles] = useState({
    helpCenter: true,
    attachments: true,
    confirmation: true,
    emailNotifications: true,
    inAppNotifications: true,
    internalNote: true,
  });

  const toggleRow = (key) =>
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));

  const toggleSelected = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const visible = TICKETS.filter((ticket) => {
    const q = search.toLowerCase();
    return (
      ticket.name.toLowerCase().includes(q) ||
      ticket.subject.toLowerCase().includes(q) ||
      ticket.category.toLowerCase().includes(q) ||
      ticket.assignee.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] font-[Inter] text-[#0A0847]">
      <div className="w-full min-w-0 space-y-6 px-5 py-6">
        {/* ================= PAGE HEADER ================= */}
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-[22px] font-semibold leading-none text-[#0A0847]">
              Support Inbox &amp; Settings
            </h1>
            <p className="mt-[6px] text-[16px] font-medium text-[#0A0847]/60">
              Review requests, reply to users, and control support option
            </p>
          </div>
          <button
            type="button"
            className="flex h-[42px] shrink-0 cursor-pointer items-center justify-center gap-2 rounded-[8px] bg-[#001984] px-6 text-[14px] font-semibold text-white transition-colors hover:bg-[#001266]"
          >
            <LuPlus size={16} />
            New Article
          </button>
        </div>

        {/* ================= STAT CARDS ================= */}
        <div className="grid grid-cols-[repeat(4,minmax(0,1fr))] gap-5">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex h-[153px] items-center gap-4 rounded-[12px] border border-[#E2DFFC] bg-[#FEFFFF] pl-4 pr-4"
            >
              <div
                className={`flex h-[62px] w-[62px] shrink-0 items-center justify-center rounded-[18px] ${stat.tileClass}`}
              >
                <img
                  src={stat.iconSrc}
                  alt=""
                  style={stat.iconStyle}
                />
              </div>
              <div className="flex min-w-0 flex-col gap-2">
                {stat.value ? (
                  <p className={`text-[22px] font-semibold leading-none ${stat.valueClass}`}>
                    {stat.value}
                  </p>
                ) : null}
                <p className="text-[14px] font-semibold text-[#001984]">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ================= SEARCH + FILTER ================= */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative w-[408px]">
            <LuSearch
              size={17}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search journeys..."
              className="h-[40px] w-full rounded-[7.47px] border border-[#E2DFFC] bg-white pl-[41px] pr-3 text-[14px] text-[#0A0847]/60 outline-none transition placeholder:text-[#0A0847]/60 focus:border-[#001984]"
            />
          </div>
          <button
            type="button"
            className="flex h-[38px] w-[87px] shrink-0 cursor-pointer items-center justify-center gap-2.5 rounded-[7.47px] border border-[#E2DFFC] bg-white px-3 py-[9px] text-[14px] font-medium text-[#0A0847]/80 transition-colors hover:bg-gray-50"
          >
            <LuFilter size={15} />
            Filter
          </button>
        </div>

        {/* ================= STATUS PILL TABS ================= */}
        <div className="flex flex-wrap gap-2.5">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`flex h-[34px] w-[130px] cursor-pointer items-center justify-center rounded-[7.47px] text-[12px] font-medium transition-colors ${
                activeTab === tab
                  ? "border border-[#001984] bg-[#001984] text-white"
                  : "border border-[#E2DFFC] bg-white text-[#0A0847]/80 hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ================= TABLE CARD ================= */}
        <div className="flex w-full flex-col gap-5 rounded-[7.5px] border-[0.75px] border-[#E2DFFC] bg-white p-5">
          {/* bulk actions */}
          <div className="flex flex-wrap items-center gap-3">
            <Select id="bulk-assign" className="w-[130px]" selectClass={bulkSelectClass}>
              <option>Assign</option>
              <option>Maya</option>
              <option>Peter</option>
              <option>Alex</option>
            </Select>
            <Select id="bulk-resolve" className="w-[130px]" selectClass={bulkSelectClass}>
              <option>Mark Resolved</option>
              <option>Mark Open</option>
              <option>Mark Waiting</option>
            </Select>
            <button
              type="button"
              className="flex h-[36px] w-[130px] cursor-pointer items-center justify-center rounded-[7.47px] border border-[#D23033] bg-white px-3 text-[12px] font-medium text-[#D23033] transition-colors hover:bg-[#FEF2F2]"
            >
              Delete / Archive
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] border-collapse">
              <thead>
                <tr className="h-[50px] bg-[#F3F7FD]">
                  <th className="px-5 py-[11.85px] text-left align-middle">
                    <Checkbox
                      checked={selected.length === TICKETS.length}
                      onChange={() =>
                        setSelected(
                          selected.length === TICKETS.length
                            ? []
                            : TICKETS.map((t) => t.id),
                        )
                      }
                      label="Select all tickets"
                    />
                  </th>
                  {["User", "Subject", "Priority", "Category", "Received", "Assignee", "Format"].map(
                    (heading) => (
                      <th
                        key={heading}
                        className="px-5 py-[11.85px] text-left align-middle text-[14px] font-medium text-[#0A0847]"
                      >
                        {heading}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {visible.map((ticket) => (
                  <tr
                    key={ticket.id}
                    onClick={() => setOpenTicket(ticket)}
                    className="h-[63px] cursor-pointer border-b-[0.75px] border-[#E9E9E9] transition-colors hover:bg-gray-50/50"
                  >
                    <td className="px-5 align-middle">
                      <Checkbox
                        checked={selected.includes(ticket.id)}
                        onChange={() => toggleSelected(ticket.id)}
                        label={`Select ${ticket.name}`}
                      />
                    </td>
                    <td className="px-5 align-middle">
                      <div className="flex items-center gap-2.5">
                        <UserAvatar ticket={ticket} />
                        <span className="whitespace-nowrap text-[12px] font-medium text-[#0A0847]/80">
                          {ticket.name}
                        </span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-5 align-middle text-[14px] font-medium text-[#0A0847]/80">
                      {ticket.subject}
                    </td>
                    <td className="px-5 align-middle">
                      <span
                        className={`inline-flex h-[25px] items-center justify-center whitespace-nowrap rounded-[8px] border px-3 py-1 text-[12px] font-medium ${priorityClass(ticket.priority)}`}
                      >
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-5 align-middle text-[14px] font-medium text-[#0A0847]/80">
                      {ticket.category}
                    </td>
                    <td className="whitespace-nowrap px-5 align-middle text-[14px] font-medium text-[#0A0847]/80">
                      {ticket.received}
                    </td>
                    <td className="whitespace-nowrap px-5 align-middle text-[14px] font-medium text-[#0A0847]/80">
                      {ticket.assignee}
                    </td>
                    <td className="px-5 align-middle">
                      <span
                        className={`inline-flex h-[28px] items-center justify-center whitespace-nowrap rounded-[8px] border px-3 text-[12px] font-medium ${statusClass(ticket.format)}`}
                      >
                        {ticket.format}
                      </span>
                    </td>
                  </tr>
                ))}

                {visible.length === 0 && (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-5 py-10 text-center text-[12px] text-[#0A0847]/60"
                    >
                      No results found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================= SETTINGS ================= */}
        <div className="w-full rounded-[8px] border border-[#E2DFFC] bg-white px-5 pb-6 pt-0">
          {/* tab bar — 4 equal columns, full-width divider, underline per tab */}
          <div className="grid w-full grid-cols-[repeat(4,minmax(0,1fr))] border-b-[2px] border-[#E8E8E8]">
            {SETTINGS_TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  setSettingsTab(tab);
                  document
                    .getElementById(`settings-${tab.toLowerCase().replace(/\s+/g, "-")}`)
                    ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
                }}
                aria-pressed={settingsTab === tab}
                className={`-mb-[2px] cursor-pointer border-b-[3px] py-5 text-center text-[16px] font-medium leading-none transition-colors ${
                  settingsTab === tab
                    ? "border-[#001984] text-[#001984]"
                    : "border-transparent text-[#0A0847]/60 hover:text-[#0A0847]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* settings columns — each one is a bordered card */}
          <div className="mt-6 grid grid-cols-[repeat(4,minmax(0,1fr))] gap-6 2xl:gap-10">
            {/* ---- COLUMN 1: General (Help Center Enabled — navy border) ---- */}
            <div id="settings-general" className={`flex min-h-[470px] flex-col rounded-[8px] border bg-white p-4 ${settingsTab === "General" ? "border-[#001984]" : "border-[#E2DFFC]"}`}>
              <div className="flex items-center justify-between gap-3 border-b border-[#E2DFFC] pb-3">
                <span className="text-[14px] font-semibold text-[#0A0847]">Help Center Enabled</span>
                <Switch
                  checked={toggles.helpCenter}
                  onChange={() => toggleRow("helpCenter")}
                  label="Help Center Enabled"
                />
              </div>

              <div className="mt-4 flex flex-col gap-4">
                <div>
                  <FieldLabel htmlFor="support-hours">Support Hours</FieldLabel>
                  <input
                    id="support-hours"
                    type="text"
                    defaultValue="Mon–Fri, 8:00 AM–6:00 PM (PST)"
                    className={settingsInput}
                  />
                </div>

                <div>
                  <FieldLabel htmlFor="response-promise">Response Promise</FieldLabel>
                  <Select id="response-promise" selectClass={settingsSelect}>
                    <option>Within 24 hours</option>
                    <option>Within 12 hours</option>
                    <option>Within 48 hours</option>
                  </Select>
                </div>

                <div>
                  <FieldLabel htmlFor="support-email">Support Email</FieldLabel>
                  <input
                    id="support-email"
                    type="text"
                    defaultValue="support@faithlyplus.com"
                    className={settingsInput}
                  />
                </div>
              </div>
            </div>

            {/* ---- COLUMN 2: Contact Form ---- */}
            <div id="settings-contact-form" className={`flex min-h-[470px] flex-col rounded-[8px] border bg-white p-4 ${settingsTab === "Contact Form" ? "border-[#001984]" : "border-[#E2DFFC]"}`}>
              <h3 className="border-b border-[#E2DFFC] pb-3 text-[14px] font-semibold text-[#0A0847]">
                Contact Form
              </h3>

              <div className="mt-4 flex flex-col gap-4">
                <div>
                  <FieldLabel htmlFor="contact-subjects">Manage contact subjects</FieldLabel>
                  <input
                    id="contact-subjects"
                    type="text"
                    defaultValue="Mon–Fri, 8:00 AM–6:00 PM (PST)"
                    className={settingsInput}
                  />
                </div>

                <ul className="space-y-[10px]">
                  {CONTACT_SUBJECTS.map((subject) => (
                    <li key={subject} className="flex items-center gap-3">
                      <LuGripVertical size={16} className="shrink-0 text-[#001984]" />
                      <span className="flex h-[43px] min-w-0 flex-1 cursor-grab items-center rounded-[5px] border border-[#ECECEC] bg-white px-4 text-[12px] font-medium text-[#0A0847]">
                        {subject}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-[12px] font-semibold text-[#0A0847]">Allow Attachments</span>
                  <Switch
                    checked={toggles.attachments}
                    onChange={() => toggleRow("attachments")}
                    label="Allow Attachments"
                  />
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[12px] font-semibold text-[#0A0847]">Send Confirmation Email</span>
                  <Switch
                    checked={toggles.confirmation}
                    onChange={() => toggleRow("confirmation")}
                    label="Send Confirmation Email"
                  />
                </div>

                <div>
                  <FieldLabel htmlFor="max-file-size">Max File Size</FieldLabel>
                  <Select id="max-file-size" selectClass={settingsSelect}>
                    <option>5 MB</option>
                    <option>10 MB</option>
                    <option>25 MB</option>
                  </Select>
                </div>
              </div>
            </div>

            {/* ---- COLUMN 3: Automation ---- */}
            <div id="settings-automation" className={`flex min-h-[470px] flex-col rounded-[8px] border bg-white p-4 ${settingsTab === "Automation" ? "border-[#001984]" : "border-[#E2DFFC]"}`}>
              <h3 className="border-b border-[#E2DFFC] pb-3 text-[14px] font-semibold text-[#0A0847]">
                Automation
              </h3>

              <div className="mt-4 flex flex-col gap-4">
                <div>
                  <FieldLabel htmlFor="auto-assign">Auto-assign new requests</FieldLabel>
                  <Select id="auto-assign" selectClass={settingsSelect}>
                    <option>Round Robin</option>
                    <option>Load Based</option>
                    <option>Manual</option>
                  </Select>
                </div>

                <div>
                  <FieldLabel htmlFor="urgent-rules">Urgent keyword rules</FieldLabel>
                  <button
                    id="urgent-rules"
                    type="button"
                    className={`${settingsInput} flex cursor-pointer items-center text-left`}
                  >
                    Manage Rules
                  </button>
                </div>

                <div>
                  <FieldLabel htmlFor="auto-close">Auto-close resolved requests after</FieldLabel>
                  <Select id="auto-close" selectClass={settingsSelect}>
                    <option>7 days</option>
                    <option>14 days</option>
                    <option>30 days</option>
                  </Select>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-[12px] font-semibold text-[#0A0847]">Email notifications</span>
                  <Switch
                    checked={toggles.emailNotifications}
                    onChange={() => toggleRow("emailNotifications")}
                    label="Email notifications"
                  />
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[12px] font-semibold text-[#0A0847]">In-app notifications</span>
                  <Switch
                    checked={toggles.inAppNotifications}
                    onChange={() => toggleRow("inAppNotifications")}
                    label="In-app notifications"
                  />
                </div>
              </div>
            </div>

            {/* ---- COLUMN 4: Appearance ---- */}
            <div id="settings-appearance" className={`flex min-h-[470px] flex-col rounded-[8px] border bg-white p-4 ${settingsTab === "Appearance" ? "border-[#001984]" : "border-[#E2DFFC]"}`}>
              <h3 className="border-b border-[#E2DFFC] pb-3 text-[14px] font-semibold text-[#0A0847]">
                Appearance
              </h3>

              <div className="mt-4 flex flex-col gap-4">
                <div>
                  <FieldLabel htmlFor="short-description">Short Description</FieldLabel>
                  <div className="relative w-full">
                    <textarea
                      id="short-description"
                      defaultValue="Manage your subscription, payments, and billing information."
                      rows={3}
                      className="w-full resize-none rounded-[8px] border border-[#E2DFFC] bg-white px-[10px] py-2 pr-12 text-[12px] font-medium text-[#0A0847] outline-none transition focus:border-[#001984]"
                    />
                    <span className="absolute bottom-2 right-2.5 text-[10px] text-[#0A0847]/60">
                      63/160
                    </span>
                  </div>
                </div>

                <div>
                  <FieldLabel htmlFor="support-icon">Support Icon</FieldLabel>
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-[33px] w-[56px] items-center justify-center rounded-[7.47px] border border-[#E2DFFC] bg-white text-[#001984]">
                      <LuHeadset size={17} />
                    </span>
                    <button type="button" className={appearanceButton}>
                      Change Icon
                    </button>
                  </div>
                </div>

                <div>
                  <FieldLabel>Cover Image</FieldLabel>
                  <CoverThumb />
                </div>

                <button
                  type="button"
                  className="flex h-[43px] w-full cursor-pointer items-center justify-center rounded-[8px] border border-[#E2DFFC] bg-[#FEFEFE] text-[12px] font-medium text-[#0A0847]/80 transition-colors hover:bg-gray-50"
                >
                  Change Image
                </button>
                <button
                  type="button"
                  className="flex h-[43px] w-full max-w-[207px] cursor-pointer items-center justify-center gap-2 rounded-[8px] border border-[#E2DFFC] bg-[#FEFEFE] text-[12px] font-medium text-[#0A0847]/80 transition-colors hover:bg-gray-50"
                >
                  Preview User View
                  <LuExternalLink size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= TICKET DETAIL MODAL ================= */}
      {openTicket && (
        <TicketModal ticket={openTicket} onClose={() => setOpenTicket(null)} />
      )}
    </div>
  );
}