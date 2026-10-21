import React, { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  FiArrowLeft,
  FiMoreVertical,
  FiHeart,
  FiUser,
  FiMail,
  FiFileText,
  FiXSquare,
  FiDollarSign,
  FiEdit2,
  FiCheck,
} from "react-icons/fi";
import UserIcon from "../../../assets/DonationGiftSvg/UserIcon.svg";
import MessageIcon from "../../../assets/DonationGiftSvg/MessageIcon.svg";
import NoteIcon from "../../../assets/DonationGiftSvg/NoteIcon.svg";
import CancelSubIcon from "../../../assets/DonationGiftSvg/CancelSubIcon.svg";
import CancelIcon from "../../../assets/DonationGiftSvg/CancelIcon.svg";

/* ==========================================================================
   HELPERS
   ========================================================================== */
const fmtDate = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric", timeZone: "UTC",
  });

const fmtLongDate = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric", timeZone: "UTC",
  });

  const SvgIcon = ({ src, size = 16, className = "" }) => (
                <img src={src} alt="" width={size} height={size} className={`shrink-0 ${className}`} />
              );
  
  const UserIconSvg = (p) => <SvgIcon src={UserIcon} {...p} />;
  const MessageIconSvg = (p) => <SvgIcon src={MessageIcon} {...p} />;
  const NoteIconSvg = (p) => <SvgIcon src={NoteIcon} {...p} />;
  const CancelSubIconSvg = (p) => <SvgIcon src={CancelSubIcon} {...p} />;
  const CancelIconSvg = (p) => <SvgIcon src={CancelIcon} {...p} />;

const STATUS_STYLES = {
  Paid: "bg-[#21AC1C1A] text-[#21AC1C] border-[#DAF3C8]",
  Active: "bg-[#21AC1C1A] text-[#21AC1C] border-[#DAF3C8]",
  Recorded: "bg-[#1617E31A] text-[#1617E3] border-[#D4D4FB]",
  Failed: "bg-[#EF44441A] text-[#EF4444] border-[#FECACA]",
  Cancelled: "bg-[#C654061A] text-[#C65406] border-[#FADCC7]",
  Refunded: "bg-[#C654061A] text-[#C65406] border-[#FADCC7]",
};

const Badge = ({ status, className = "" }) => (
  <span
    className={`px-3 py-1 rounded-lg text-xs font-medium border inline-block ${
      STATUS_STYLES[status] || "bg-gray-100 text-gray-700"
    } ${className}`}
  >
    {status}
  </span>
);

const CardBrand = ({ method }) =>
  method === "Visa" ? (
    <span className="inline-flex flex-col items-center justify-center w-7 h-[18px] rounded-[3px] border border-[#E2DFFC] bg-white leading-none">
      <span className="text-[7px] font-extrabold italic text-[#1A1F71]">VISA</span>
      <span className="w-4 h-[2px] bg-[#F7A600] mt-[1px]" />
    </span>
  ) : (
    <span className="inline-flex items-center justify-center w-7 h-[18px] rounded-[3px] bg-[#1A3A8F]">
      <span className="w-2.5 h-2.5 rounded-full bg-[#EB001B]" />
      <span className="w-2.5 h-2.5 rounded-full bg-[#F79E1B] -ml-1" />
    </span>
  );

/** label left, value right */
const Row = ({ label, children }) => (
  <div className="flex items-center justify-between gap-6 py-1">
    <span className="text-[11px] font-medium text-[#0A084799] whitespace-nowrap">{label}</span>
    <span className="text-[11px] font-medium text-[#0A0847CC] text-right">{children}</span>
  </div>
);

/** Card with a title (and optional icon) and two columns split by a divider */
const InfoCard = ({ icon, title, left, right, className = "" }) => (
  <div className={`bg-white rounded-lg border border-[#E2DFFC] p-4 ${className}`}>
    <div className="flex items-start gap-3">
      {icon}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-[#0A0847]">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 md:divide-x divide-[#E2DFFC]">
          <div className="md:pr-6">{left}</div>
          <div className="md:pl-6 mt-2 md:mt-0">{right}</div>
        </div>
      </div>
    </div>
  </div>
);

/* ==========================================================================
   DEFAULT MOCK (used when nothing is passed via navigate state)
   ========================================================================== */
const buildDonation = (id, passed) => ({
  id,
  number: `DON-${10244 + Number(id || 1)}`,
  date: passed?.date || "2026-08-17",
  time: "9:42 AM",
  donor: passed?.donor || "Mary Jones",
  email: passed?.email || "mary@email.com",
  phone: "(123) 456-7890",
  anonymous: passed?.donor === "Anonymous" ? "Yes" : "No",
  amount: passed?.amount ?? 25,
  type: passed?.type || "One-Time",
  method: passed?.method === "Visa" ? "Visa" : "Mastercard",
  last4: "4832",
  status: passed?.status || "Paid",
  transactionId: "ch_3N7QxCKkkldW9",
  processor: "Stripe",
  receiptSent: "Yes",
  source: "Faithly+ App (iOS)",
  note: "",
  adminNote: { text: "Thank you message sent via email.", meta: "Aug 17, 2026 • Admin" },
  recurring: {
    plan: "$10.00 Monthly",
    started: "May 12, 2026",
    next: "Sep 12, 2026",
    receiptSent: "Yes",
    status: "Active",
  },
});

/* ==========================================================================
   PAGE (NO NAVBAR / NO SIDEBAR)
   ========================================================================== */
export default function DonationDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();

  const [donation, setDonation] = useState(() => buildDonation(id, state?.donation));
  const [editingNote, setEditingNote] = useState(false);
  const [noteDraft, setNoteDraft] = useState(donation.adminNote.text);

  const isRecurring = donation.type === "Recurring" || !!donation.recurring;

  const saveNote = () => {
    setDonation((d) => ({
      ...d,
      adminNote: { text: noteDraft.trim(), meta: `${fmtDate("2026-08-17")} • Admin` },
    }));
    setEditingNote(false);
  };

  const addNote = () => {
    setNoteDraft(donation.adminNote.text);
    setEditingNote(true);
    document.getElementById("admin-notes")?.scrollIntoView({ behavior: "smooth" });
  };

  const cancelRecurring = () =>
    setDonation((d) => ({ ...d, recurring: { ...d.recurring, status: "Cancelled" } }));

  const refund = () => setDonation((d) => ({ ...d, status: "Refunded" }));

  const actions = [
    { label: "View Donor", icon: UserIconSvg, onClick: () => console.log("View donor", donation.donor) },
    { label: "Resend Receipt", icon: MessageIconSvg, onClick: () => alert(`Receipt sent to ${donation.email || "donor"}`) },
    { label: "Add Internal Note", icon: NoteIconSvg, onClick: addNote },
    { label: "Cancel Recurring", icon: CancelIconSvg, onClick: cancelRecurring },
    { label: "Refund Payment", icon: CancelSubIconSvg, onClick: refund, danger: true },
  ];

  const amount = `$${Number(donation.amount).toFixed(2)}`;

  return (
    <div className="p-6 bg-[#F8FAFC] min-h-screen font-[Inter] space-y-5">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate("/admin/donations")}
          className="flex items-center gap-2 text-sm font-medium text-[#0A0847CC] hover:text-[#001984] cursor-pointer"
        >
          <FiArrowLeft size={18} /> Donations Dashboard
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
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold text-[#0A0847]">Donation #{donation.number}</h1>
          <Badge status={donation.status} />
        </div>
        <p className="text-sm text-[#0A084799] font-semibold mt-2">
          {fmtLongDate(donation.date)} • {donation.time}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-4">
          <InfoCard
            icon={
              <span className="w-8 h-8 rounded-full bg-[#001984] text-white flex items-center justify-center shrink-0">
                <FiHeart size={16} className="fill-white" />
              </span>
            }
            title="Donation Information"
            left={
              <>
                <Row label="Amount">{amount}</Row>
                <Row label="Amount">{amount}</Row>
              </>
            }
            right={
              <>
                <Row label="Payment Method">
                  <span className="inline-flex items-center gap-2">
                    <CardBrand method={donation.method} />
                    •••• {donation.last4}
                  </span>
                </Row>
                <Row label="Status">
                  <Badge status={donation.status} className="!text-[11px] !py-0.5" />
                </Row>
              </>
            }
          />

          <InfoCard
            icon={
              <span className="w-8 h-8 rounded-full bg-[#E2E2E2] text-white flex items-center justify-center shrink-0 overflow-hidden">
                <FiUser size={18} className=" fill-white" />
              </span>
            }
            title="Donor"
            left={
              <>
                <Row label="Name">{donation.donor}</Row>
                <Row label="Donation Type">{donation.type}</Row>
              </>
            }
            right={
              <>
                <Row label="Phone">{donation.phone}</Row>
                <Row label="Anonymous to public">{donation.anonymous}</Row>
              </>
            }
          />

          <InfoCard
            title="Transaction Information"
            left={
              <>
                <Row label="Transaction ID">{donation.transactionId}</Row>
                <Row label="Payment Processor">{amount}</Row>
                <Row label="Payment Status">
                  <Badge status={donation.status} className="!text-[11px] !py-0.5" />
                </Row>
              </>
            }
            right={
              <>
                <Row label="Date Processed">
                  {fmtDate(donation.date)} • {donation.time}
                </Row>
                <Row label="Receipt Sent">{donation.receiptSent}</Row>
              </>
            }
          />

          <InfoCard
            title="Additional Information"
            left={<Row label="Source">{donation.source}</Row>}
            right={<Row label="Note">{donation.note || "—"}</Row>}
          />

          {/* Admin Notes */}
          <div id="admin-notes">
            <h4 className="text-xs font-semibold text-[#0A0847CC] mb-2">Admin Notes</h4>
            <div className="bg-[#F1F0FC] border border-[#E2DFFC] rounded-lg px-3 py-2.5 flex items-center justify-between gap-3">
              {editingNote ? (
                <>
                  <input
                    autoFocus
                    value={noteDraft}
                    onChange={(e) => setNoteDraft(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && saveNote()}
                    placeholder="Write an internal note..."
                    className="flex-1 bg-white border border-[#E2DFFC] rounded-md px-3 py-2 text-xs text-[#0A0847] placeholder-gray-400 outline-none focus:border-[#001984]"
                  />
                  <button
                    type="button"
                    onClick={saveNote}
                    className="w-8 h-8 rounded-md bg-[#001984] text-white flex items-center justify-center hover:bg-[#001266] cursor-pointer"
                  >
                    <FiCheck size={14} />
                  </button>
                </>
              ) : (
                <>
                  <div>
                    <p className="text-xs font-semibold text-[#001984]">
                      {donation.adminNote.text || "No notes yet."}
                    </p>
                    {donation.adminNote.text && (
                      <p className="text-[10px] text-[#0A084799] font-medium mt-0.5">
                        {donation.adminNote.meta}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={addNote}
                    className="text-[#001984] hover:opacity-70 cursor-pointer"
                  >
                    <FiEdit2 size={16} />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Recurring Information */}
          {isRecurring && donation.recurring && (
            <div className="bg-[#EEF5FE] border border-[#DCE5F7] rounded-lg p-4">
              <h3 className="text-sm font-semibold text-[#0A0847] mb-2">Recurring Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                <div>
                  <Row label="Recurring Plan">{donation.recurring.plan}</Row>
                  <Row label="Started">{donation.recurring.started}</Row>
                </div>
                <div>
                  <Row label="Next Donation">{donation.recurring.next}</Row>
                  <Row label="Receipt Sent">
                    <Badge status={donation.recurring.status} className="!text-[11px] !py-0.5" />
                  </Row>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: Actions */}
        <div className="bg-white rounded-lg border border-[#E2DFFC] p-4 min-h-[300px]">
          <h3 className="text-base font-semibold text-[#0A0847] pb-3 border-b border-[#0019841A]">
            Actions
          </h3>
          <div className="divide-y divide-[#0019841A]">
            {actions.map(({ label, icon: Icon, onClick, danger }) => (
              <button
                key={label}
                type="button"
                onClick={onClick}
                className={`w-full flex items-center gap-5 py-4 text-xs font-medium cursor-pointer hover:bg-gray-50/60 transition-colors ${
                  danger ? "text-[#ED0005]" : "text-[#0A0847CC]"
                }`}
              >
                <Icon size={18} className={danger ? "text-[#ED0005]" : "text-[#001984]"} />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}