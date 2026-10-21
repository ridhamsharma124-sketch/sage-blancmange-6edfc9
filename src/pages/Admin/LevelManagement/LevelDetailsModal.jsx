import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  FiArrowRight, FiEye, FiChevronDown, FiShuffle, FiTrash2, FiCopy, FiMove,
  FiCheck, FiLock, FiGift, FiCircle, FiEdit2, FiArrowUp, FiArrowDown, FiHelpCircle,
} from "react-icons/fi";
import EightDotsIcon from "../../../assets/LevelManagementSvgs/EightDots.svg";
import Quiz from "../../../assets/LevelManagementSvgs/Quiz.svg";
import CopyIcon from "../../../assets/LevelManagementSvgs/CopyIcon.svg";
import GoldCoin from "../../../assets/LevelManagementSvgs/GoldCoin.svg";
import GoldenGift from "../../../assets/LevelManagementSvgs/GoldenGift.svg";
import LockIcon from "../../../assets/LevelManagementSvgs/LockIcon.svg";
import RedGift from "../../../assets/LevelManagementSvgs/RedGift.svg";
import ReplaceIcon from "../../../assets/LevelManagementSvgs/ReplaceIcon.svg";
import TickMark from "../../../assets/LevelManagementSvgs/TickMark.svg";
import DirectionSvg from "../../../assets/LevelManagementSvgs/DirectionIcon.svg";



/* ---------------- Mock API response ---------------- */
const LEVEL_DETAILS_API = {
  id: "3",
  activity: "Quiz",
  level: "Level 3",
  status: "Published",
  title: "The Burning Bush",
  location: ["Exodus 3", "Chapter 3", "The Call of Moses"],
  points: 30,
  mysteryCard: true,
  mysteryLabel: "+ Mystery Card",
  mysteryRewardLabel: "+ Mystery Card after completion",
  unlockRule: "Complete Previous Level (Level 2)",
  unlockedLabel: "Unlocked for users",
  visibility: "Visible to users",
  questions: [
    { id: "q1", text: "What did Moses see burning without being consumed?" },
    { id: "q2", text: "Who spoke to Moses from the bush?" },
    { id: "q3", text: "What did God tell Moses to remove?" },
  ],
  flow: [
    { id: "f1", title: "Level 1", state: "done" },
    { id: "f2", title: "Level 2", state: "done" },
    { id: "f3", title: "Level 3", state: "current" },
    { id: "f4", title: "Mystery Card", type: "mystery" },
    { id: "f5", title: "Level 4", state: "locked" },
  ],
};

const STATUS_STYLES = {
  Published: "bg-[#E0F8E6] text-[#2BA452]",
  Draft: "bg-[#FBE8D8] text-[#C65406]",
};


const SvgIcon = ({ src, size = 16, className = "" }) => (
              <img src={src} alt="" width={size} height={size} className={`shrink-0 ${className}`} />
            );

const EightDotsIconSvg = (p) => <SvgIcon src={EightDotsIcon} {...p} />;
const QuizSvg = (p) => <SvgIcon src={Quiz} {...p} />;
const CopyIconSvg = (p) => <SvgIcon src={CopyIcon} {...p} />;
const GoldCoinSvg = (p) => <SvgIcon src={GoldCoin} {...p} />;
const GoldenGiftSvg = (p) => <SvgIcon src={GoldenGift} {...p} />;
const LockIconSvg = (p) => <SvgIcon src={LockIcon} {...p} />;
const RedGiftSvg = (p) => <SvgIcon src={RedGift} {...p} />;
const ReplaceIconSvg = (p) => <SvgIcon src={ReplaceIcon} {...p} />;
const TickMarkSvg = (p) => <SvgIcon src={TickMark} {...p} />;
const DirectionIconSvg = (p) => <SvgIcon src={DirectionSvg} {...p} />;

/* ---------------- Small pieces ---------------- */
const Section = ({ title, children }) => (
  <div className="border border-[#E2DFFC] rounded-lg p-6">
    {title && <h3 className="text-base font-semibold text-[#0A0847CC] mb-4">{title}</h3>}
    {children}
  </div>
);

const IconBtn = ({ onClick, danger, children }) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-9 h-9 rounded-md border flex items-center justify-center cursor-pointer ${
      danger ? "border-red-200 bg-red-50 text-red-500 hover:bg-red-100" : "border-[#E2DFFC] bg-white text-[#0A0847CC] hover:bg-gray-50"
    }`}
  >
    {children}
  </button>
);

const QuickBtn = ({ onClick, danger, children }) => (
  <button
    type="button"
    onClick={onClick}
    className={`py-3 px-4 rounded-md border text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer ${
      danger
        ? "border-red-100 bg-red-50/40 text-[#EB0C10] hover:bg-red-50"
        : "border-[#001984] bg-white text-[#0A0847] hover:bg-[#EEF2FF]"
    }`}
  >
    {children}
  </button>
);

const FlowCard = ({ title, state, mystery }) => {
  const cls = mystery
    ? "bg-[#FEF6E7] border-[#FADCC7]"
    : state === "current"
    ? "bg-[#F3F2FF] border-2 border-[#001984]"
    : "bg-[#F3F2FF] border-[#CBC6F8]";
  return (
    <div className={`flex-1 min-w-[120px] h-28 rounded-md border flex flex-col items-center justify-center gap-2 text-sm font-semibold text-[#0A0847CC] ${cls}`}>
      {mystery && <GoldenGiftSvg size={22} className="text-[#F59E0B]" />}
      {title}
      {state === "done" && <TickMarkSvg size={24} strokeWidth={3} className="text-[#21AC1C]" />}
      {state === "current" && <FiCircle size={20} className="text-[#001984] fill-[#001984]" />}
      {state === "locked" && <LockIconSvg size={20} />}
    </div>
  );
};

/* ---------------- Modal ---------------- */
export default function LevelDetailsModal({
  onClose = () => {},
  onEdit, onDuplicate, onToggleStatus, onDelete, onPreview,
}) {
  const level = LEVEL_DETAILS_API; // TODO: replace with API response
  const [menuOpen, setMenuOpen] = useState(false);
  const [reorder, setReorder] = useState(false);
  const [questions, setQuestions] = useState(level.questions);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

    const published = level.status === "Published";

  const commit = (next) => setQuestions(next);

  const move = (i, dir) => {
    const to = i + dir;
    if (to < 0 || to >= questions.length) return;
    const next = [...questions];
    [next[i], next[to]] = [next[to], next[i]];
    commit(next);
  };

  const actions = [
    { label: "Edit Level", icon: FiEdit2, fn: onEdit },
    { label: "Duplicate Level", icon: FiCopy, fn: onDuplicate },
    { label: published ? "Unpublish" : "Publish", icon: FiEye, fn: onToggleStatus },
    { label: "Delete Level", icon: FiTrash2, fn: onDelete, danger: true },
  ];

  return createPortal(
    <div
      className="fixed inset-0 z-[9998] bg-black/45 flex items-start justify-center overflow-y-auto p-4 sm:p-8 font-[Inter]"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-lg border border-[#E2DFFC] w-full max-w-[1065px] lg:ml-60 p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button type="button" onClick={onClose} className="text-[#0A0847CC] cursor-pointer">
              <FiArrowRight size={24} />
            </button>
            <h2 className="text-xl font-semibold text-[#0A0847]">Level Details</h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onPreview?.(level)}
              className="px-10 py-3 bg-white border border-[#E2DFFC] rounded-md text-xs font-semibold text-[#0A0847CC] flex items-center gap-2 hover:bg-gray-50 cursor-pointer"
            >
              <FiEye size={14} /> Preview
            </button>
            <div className="relative">
              <button
                type="button"
                onClick={() => setMenuOpen((o) => !o)}
                className="px-8 py-3 bg-[#001984] hover:bg-[#001266] text-white rounded-md text-xs font-semibold flex items-center gap-3 cursor-pointer"
              >
                Action <FiChevronDown size={14} />
              </button>
              {menuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-[#E2DFFC] rounded-md shadow-lg py-1.5 z-20 text-xs font-medium">
                    {actions.map(({ label, icon: Icon, fn, danger }) => (
                      <button
                        key={label}
                        type="button"
                        onClick={() => { setMenuOpen(false); fn?.(); }}
                        className={`w-full px-3 py-2 text-left flex items-center gap-2.5 cursor-pointer ${
                          danger ? "text-[#EB0C10] hover:bg-red-50" : "text-[#0A0847CC] hover:bg-gray-50"
                        }`}
                      >
                        <Icon size={13} /> {label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="border border-[#E2DFFC] rounded-lg p-5">
          <div className="flex items-center gap-4">
            <span className="px-4 py-2 rounded-md bg-[#F2EFFF] text-[#001984] text-base font-medium flex items-center gap-2">
              <QuizSvg size={22} /> {level.activity}
            </span>
            <span className="text-base font-medium text-[#0A0847CC]">{level.level}</span>
            <span className={`px-4 py-1 rounded-md text-sm font-semibold ${STATUS_STYLES[level.status] || "bg-gray-100 text-gray-500"}`}>
              {level.status}
            </span>
          </div>
          <div className="flex items-start justify-between gap-4 mt-4">
            <div>
              <p className="text-base font-semibold text-[#0A0847]">{level.title}</p>
              <p className="text-sm text-[#0A084799] font-medium mt-1">
                {(level.location || [level.book, level.chapter, level.section].filter(Boolean)).join("  •  ")}
              </p>
            </div>
            <div className="text-right">
              <p className="text-base font-semibold text-[#0A0847] flex items-center justify-end gap-2">
                <GoldCoinSvg size={24} /> {level.points} pts
              </p>
              {level.mysteryCard && (
                <p className="text-xs text-[#0A084799] font-medium mt-1 flex items-center justify-end gap-1.5">
                  {level.mysteryLabel} <RedGiftSvg size={18} className="text-[#EB0C10]" />
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="rounded-lg p-6 bg-[#F3F2FF] border border-[#E2DFFC]">
          <div className="flex items-center justify-between mb-4 pl-10">
            <h3 className="text-base font-semibold text-[#0A0847CC]">
              Questions in this level ({questions.length})
            </h3>
            <button
              type="button"
              onClick={() => setReorder((r) => !r)}
              className={`px-4 py-2.5 border rounded-md text-xs font-semibold flex items-center gap-2 cursor-pointer ${
                reorder ? "bg-[#001984] text-white border-[#001984]" : "bg-white border-[#E2DFFC] text-[#0A0847CC] hover:bg-gray-50"
              }`}
            >
              {reorder ? <FiCheck size={14} /> : <ReplaceIconSvg size={14} />}
              {reorder ? "Done" : "Reorder Questions"}
            </button>
          </div>
          <div className="space-y-3">
            {questions.length === 0 && (
              <p className="text-xs text-center text-[#0A084799] bg-white border border-dashed border-[#CBC6F8] rounded-md py-6">
                No questions added yet.
              </p>
            )}
            {questions.map((q, i) => (
              <div key={q.id} className="flex items-center gap-3 bg-white border border-[#E2DFFC] rounded-md px-3 py-2.5">
                <span className="w-10 h-10 rounded-md bg-[#E4E1F7] text-[#0A0847CC] text-sm font-medium flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <p className="flex-1 text-sm font-medium text-[#0A0847CC]">{q.text}</p>
                {reorder && (
                  <>
                    <IconBtn onClick={() => move(i, -1)}><FiArrowUp size={13} /></IconBtn>
                    <IconBtn onClick={() => move(i, 1)}><FiArrowDown size={13} /></IconBtn>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => console.log("edit question", q.id)}
                  className="px-3 h-9 border border-[#E2DFFC] rounded-md text-xs font-medium text-[#0A0847CC] hover:bg-gray-50 cursor-pointer"
                >
                  Edit
                </button>
                <IconBtn onClick={() => console.log("view question", q.id)}><FiEye size={14} /></IconBtn>
                <IconBtn danger onClick={() => commit(questions.filter((x) => x.id !== q.id))}>
                  <FiTrash2 size={14} />
                </IconBtn>
              </div>
            ))}
          </div>
        </div>

        {/* Progression */}
        <Section title="Progression">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-[#0A0847CC]">Unlock Rule</label>
            <span
              className={`px-4 py-1 rounded-md text-sm font-medium ${
                published ? "bg-[#E0F8E6] text-[#2BA452]" : "bg-gray-100 text-gray-500"
              }`}
            >
              {published ? level.unlockedLabel : "Hidden from users"}
            </span>
          </div>
          <div className="relative">
            <input
              readOnly
              value={level.unlockRule}
              className="w-full border border-[#E2DFFC] rounded-md px-3 py-3 pr-9 text-xs text-[#0A0847CC] bg-white outline-none"
            />
            <FiChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          <label className="block text-xs font-semibold text-[#0A0847CC] mt-4 mb-1.5">Reward</label>
          <div className="flex items-center justify-between border border-[#E2DFFC] rounded-md px-3 py-2 text-xs text-[#0A0847CC]">
            <span>{level.points} Points</span>
            {level.mysteryCard && (
              <span className="px-3 py-1.5 rounded bg-[#6209FD1A] text-[#6209FD] font-medium">
                {level.mysteryRewardLabel}
              </span>
            )}
          </div>
        </Section>

        {/* Status */}
        <Section>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-semibold text-[#0A0847CC]">Level Status</h3>
              <p className={`flex items-center gap-2 text-xs font-semibold mt-2 ${published ? "text-[#21AC1C]" : "text-[#C65406]"}`}>
                <span className={`w-3 h-3 rounded-full ${published ? "bg-[#21AC1C]" : "bg-[#C65406]"}`} />
                {level.status}
              </p>
              <p className="text-xs text-[#0A084799] font-medium mt-1 ml-5">
                {published ? level.visibility : "Not visible to users"}
              </p>
            </div>
            <button
              type="button"
              onClick={onToggleStatus}
              className="px-12 py-2 bg-white border border-[#001984] rounded-md text-sm font-semibold text-[#0A0847] hover:bg-[#EEF2FF] cursor-pointer"
            >
              {published ? "Unpublish" : "Publish"}
            </button>
          </div>
        </Section>

        {/* Quick actions */}
        <Section title="Quick Actions">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <QuickBtn onClick={onDuplicate}><CopyIconSvg size={14} /> Duplicate Level</QuickBtn>
            <QuickBtn onClick={() => console.log("move level", level.id)}><DirectionIconSvg size={18} /> Move Level</QuickBtn>
            <QuickBtn onClick={() => onPreview?.(level)}><FiEye size={14} /> Preview Level</QuickBtn>
            <QuickBtn danger onClick={onDelete}><FiTrash2 size={14} /> Delete Level</QuickBtn>
          </div>
        </Section>

        {/* Flow */}
        <Section title="Activity Preview (User Flow)">
          <div className="flex items-center gap-3 overflow-x-auto pb-1">
            {(level.flow || []).map((f, i, arr) => (
              <React.Fragment key={f.id}>
                <FlowCard title={f.title} state={f.state} mystery={f.type === "mystery"} />
                {i < arr.length - 1 && <FiArrowRight size={22} className="text-[#0A0847CC] shrink-0" />}
              </React.Fragment>
            ))}
          </div>
        </Section>
      </div>
    </div>,
    document.body
  );
}