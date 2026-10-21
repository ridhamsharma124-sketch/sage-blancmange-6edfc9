import { useEffect, useRef, useState } from "react";
import {
  LuCircleX,
  LuChevronDown,
  LuPaperclip,
  LuSend,
  LuCheck,
  LuImage,
  LuUser,
} from "react-icons/lu";

const ASSIGNEES = ["Maya", "Unassigned", "Peter", "Alex"];
const STATUSES = ["Open", "Waiting", "Resolved"];

/* Avatar: photo when ticket.avatar is set, otherwise initials / user icon.
   Figma uses a 38px rounded-square avatar for both customer and agent. */
function Avatar({ ticket, size = 38 }) {
  if (ticket.avatar) {
    return (
      <img
        src={ticket.avatar}
        alt={ticket.name}
        style={{ width: size, height: size }}
        className="shrink-0 rounded-[8px] object-cover"
      />
    );
  }
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-[8px] text-[13px] font-bold ${ticket.avatarClass}`}
      style={{ width: size, height: size }}
    >
      {ticket.initials ? ticket.initials : <LuUser size={18} className="text-white" />}
    </span>
  );
}

/* ==========================================================================
   TICKET DETAIL — centered modal dialog, 316px wide (Figma frame)
   ========================================================================== */
export default function TicketModal({ ticket, onClose }) {
  const dialogRef = useRef(null);

  const [assignee, setAssignee] = useState(ticket.assignee);
  const [status, setStatus] = useState(ticket.status);
  const [reply, setReply] = useState("");
  const [internalNote, setInternalNote] = useState(ticket.note);
  const [noteOn, setNoteOn] = useState(true);

  const agentInitials =
    ticket.agent.replace(" (Admin)", "").charAt(0).toUpperCase() + "A";

  /* lock page scroll while the dialog is open */
  useEffect(() => {
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, []);

  /* focus trap + return focus to whatever opened the dialog */
  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const node = dialogRef.current;

    const focusables = () =>
      Array.from(
        node?.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );

    focusables()[0]?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const list = focusables();
      if (list.length === 0) return;
      const first = list[0];
      const last = list[list.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    node?.addEventListener("keydown", onKeyDown);
    return () => {
      node?.removeEventListener("keydown", onKeyDown);
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [onClose]);

  const selectClass =
    "h-[41px] w-full cursor-pointer appearance-none rounded-[12px] border border-[#E2DFFC] bg-white pl-4 pr-10 text-[12px] font-medium text-[#0A0847] outline-none transition focus:border-[#0A1172]";

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      {/* backdrop */}
      <div
        className="anim-overlay-in absolute inset-0 backdrop-blur-[3px]"
        style={{ background: "var(--support-overlay)" }}
        onClick={onClose}
        aria-hidden
      />

      {/* dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={ticket.subject}
        className="anim-dialog-in relative flex max-h-[85vh] w-[calc(100%-2rem)] max-w-[316px] flex-col overflow-hidden rounded-[8px] border border-[#E2DFFC] bg-white font-[Inter]"
        style={{ boxShadow: "var(--support-shadow)" }}
      >
        {/* header — fixed */}
        <div className="flex items-start justify-between gap-4 px-4 pb-[10px] pt-5">
          <h2 className="text-[16px] font-semibold leading-[1.2] text-[#0A0847]">
            {ticket.subject}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close ticket"
            className="flex h-[30px] w-[30px] shrink-0 cursor-pointer items-center justify-center rounded-full text-[#1817E3] transition-colors hover:bg-[#F8F9FC]"
          >
            <LuCircleX size={24} strokeWidth={1.75} />
          </button>
        </div>

        {/* body — scrolls internally */}
        <div className="min-h-0 flex-1 space-y-[10px] overflow-y-auto px-4 pb-[37px] pt-0">
          {/* user block */}
          <div className="flex items-center gap-[10px] border-b border-[#E2DFFC] pb-[10px]">
            <Avatar ticket={ticket} />
            <div className="min-w-0 flex-1">
              <p className="text-[16px] font-semibold leading-[1.2] text-[#0A0847]">
                {ticket.name}
              </p>
              <p className="truncate text-[12px] leading-[1.2] text-[#0A0847]/70">
                {ticket.email}
              </p>
            </div>
            <span className="shrink-0 rounded-[8px] border border-[#BBF7D0] bg-[#F0FDF4] px-3 py-[6px] text-[12px] font-medium leading-none text-[#22C55E]">
              {ticket.plan}
            </span>
          </div>
          <p className="text-[12px] leading-[1.2] text-[#0A0847]/70">{ticket.member}</p>

          {/* message card 1 — customer */}
          <div className="rounded-[8px] bg-[#EEF0FF] p-3">
            <div className="flex items-start gap-3">
              <Avatar ticket={ticket} />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[16px] font-semibold leading-[1.2] text-[#0A0847]">
                    {ticket.name}
                  </span>
                  <span className="text-[11px] text-[#0A0847]/60">
                    {ticket.customerTime}
                  </span>
                </div>
                <p className="mt-1 text-[12px] font-medium leading-[15px] text-[#0A0847]/80">
                  {ticket.customerMsg}
                </p>
              </div>
            </div>

            {ticket.attachment && (
              <div className="mt-3 flex items-center gap-3 pl-[50px]">
                <span className="flex h-[54px] w-[38px] shrink-0 items-center justify-center rounded-[4px] border border-[#E2DFFC] bg-white text-[#6B7280]">
                  <LuImage size={16} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[16px] font-medium leading-[1.2] text-[#0A0847]">
                    {ticket.attachment.file}
                  </p>
                  <p className="text-[16px] leading-[1.2] text-[#0A0847]/60">
                    {ticket.attachment.size}
                  </p>
                </div>
                <button
                  type="button"
                  aria-label={`Download ${ticket.attachment.file}`}
                  className="shrink-0 cursor-pointer rounded-md p-1.5 text-[#0A0847] transition-colors hover:bg-[#F8F9FC]"
                >
                  <LuPaperclip size={15} />
                </button>
              </div>
            )}
          </div>

          {/* message card 2 — agent */}
          <div className="rounded-[8px] bg-[#EEF0FF] p-3">
            <div className="flex items-start gap-3">
              <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[8px] bg-[#FDE68A] text-[12px] font-bold text-[#92400E]">
                {agentInitials}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[16px] font-semibold leading-[1.2] text-[#0A0847]">
                    {ticket.agent}
                  </span>
                  <span className="text-[11px] text-[#0A0847]/60">
                    {ticket.agentTime}
                  </span>
                </div>
                <p className="mt-1 text-[12px] font-medium leading-[15px] text-[#0A0847]/80">
                  {ticket.agentMsg}
                </p>
              </div>
            </div>
          </div>

          {/* internal note */}
          <div>
            <div className="mb-[6px] flex items-center justify-between gap-2">
              <label htmlFor="internal-note" className="text-[12px] font-semibold text-[#0A0847]">
                Internal Note{" "}
                <span className="font-normal text-[#0A0847]/60">
                  (visible to agents only)
                </span>
              </label>
              <button
                type="button"
                role="switch"
                aria-checked={noteOn}
                aria-label="Internal Note"
                onClick={() => setNoteOn(!noteOn)}
                className={`relative h-[15px] w-[26px] shrink-0 cursor-pointer rounded-full transition-colors ${
                  noteOn ? "bg-[#0A4FB5]" : "bg-[#D1D5DB]"
                }`}
              >
                <span
                  className={`absolute top-[2px] h-[11px] w-[11px] rounded-full bg-white transition-all ${
                    noteOn ? "left-[13px]" : "left-[2px]"
                  }`}
                />
              </button>
            </div>
            <textarea
              id="internal-note"
              value={internalNote}
              onChange={(e) => setInternalNote(e.target.value)}
              rows={3}
              className="w-full resize-none rounded-[16px] border border-[#E2DFFC] bg-white px-3 py-[10px] text-[10px] font-semibold leading-[1.4] text-[#0A0847]/80 outline-none transition focus:border-[#0A1172]"
            />
          </div>

          {/* assignee + status */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="modal-assignee"
                className="mb-[6px] block text-center text-[12px] font-semibold text-[#0A0847]"
              >
                Assignee
              </label>
              <div className="relative">
                <select
                  id="modal-assignee"
                  value={assignee}
                  onChange={(e) => setAssignee(e.target.value)}
                  className={selectClass}
                >
                  {ASSIGNEES.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <LuChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#0A0847]/70"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="modal-status"
                className="mb-[6px] block text-center text-[12px] font-semibold text-[#0A0847]"
              >
                Status
              </label>
              <div className="relative">
                <select
                  id="modal-status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className={selectClass}
                >
                  {STATUSES.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <LuChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#0A0847]/70"
                />
              </div>
            </div>
          </div>

          {/* reply */}
          <div>
            <textarea
              id="modal-reply"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Write a reply..."
              rows={4}
              className="h-[92px] w-full resize-none rounded-[16px] border border-[#E2DFFC] bg-white px-4 py-3 text-[10px] font-semibold text-[#0A0847] outline-none transition placeholder:text-[#0A0847]/60 focus:border-[#0A1172]"
            />
          </div>

          {/* actions */}
          <button
            type="button"
            onClick={onClose}
            className="flex h-[41px] w-full cursor-pointer items-center justify-center gap-2 rounded-[14px] bg-[#001284] text-[18px] font-semibold text-white transition-colors hover:bg-[#000C66]"
          >
            <LuSend size={16} />
            Send Reply
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex h-[41px] w-full cursor-pointer items-center justify-center gap-2 rounded-[14px] border border-[#15803D] bg-white text-[18px] font-semibold text-[#15803D] transition-colors hover:bg-[#F0FDF4]"
          >
            <LuCheck size={16} />
            Resolve
          </button>
        </div>
      </div>
    </div>
  );
}