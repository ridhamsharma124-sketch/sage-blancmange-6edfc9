import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  FiArrowRight, FiEye, FiChevronDown, FiPlus, FiTrash2, FiInfo, FiCheck, FiX, FiZap,
} from "react-icons/fi";
import { MdDragIndicator } from "react-icons/md";
import EightDotsIcon from "../../../assets/LevelManagementSvgs/EightDots.svg";
import QuestionsparkelsIcon from "../../../assets/LevelManagementSvgs/Questionsparkels.svg";

const ACTIVITIES = ["Quiz", "Puzzle", "Memory Verse", "Broad Spectrum", "Stories", "Audio Quiz"];
const BOOKS = ["Genesis", "Exodus", "Leviticus", "Numbers"];
const CHAPTERS = ["Chapter 1", "Chapter 2", "Chapter 3"];
const SECTIONS = ["Creation", "Moses Is Born", "The Plagues"];
const UNLOCK_RULES = ["Available", "Complete Previous Level", "After 3 Levels"];
const QUIZ_COUNT = 3;
const TITLE_MAX = 100;



const SvgIcon = ({ src, size = 16, className = "" }) => (
              <img src={src} alt="" width={size} height={size} className={`shrink-0 ${className}`} />
            );

const EightDotsIconSvg = (p) => <SvgIcon src={EightDotsIcon} {...p} />;
const QuestionsparkelsIconSvg = (p) => <SvgIcon src={QuestionsparkelsIcon} {...p} />;

// Replace with your question bank API
const QUESTION_BANK = [
  { id: "q1", text: "What did Moses see burning without being consumed?" },
  { id: "q2", text: "Who spoke to Moses from the bush?" },
  { id: "q3", text: "What did God tell Moses to remove?" },
  { id: "q4", text: "Who was Moses' brother?" },
  { id: "q5", text: "Where was Moses tending sheep?" },
  { id: "q6", text: "What was Moses' staff turned into?" },
];

const inputCls =
  "w-full border border-[#E2DFFC] rounded-md px-3 py-3 text-xs text-[#0A0847] placeholder-gray-400 bg-white outline-none focus:border-[#001984] transition-all";
const errCls = "!border-[#EB0C10]";

const Label = ({ children, required, optional }) => (
  <label className="block text-xs font-semibold text-[#0A0847CC] mb-1.5">
    {children}
    {required && <span className="text-[#EB0C10]">*</span>}
    {optional && <span className="font-medium text-[#0A084799]"> (Optional)</span>}
  </label>
);

const SelectField = ({ value, onChange, options, placeholder, error }) => (
  <div className="relative">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${inputCls} appearance-none pr-9 cursor-pointer ${error ? errCls : ""} ${value ? "" : "text-gray-400"}`}
    >
      <option value="">{placeholder}</option>
      {options.map((o) => <option key={o}>{o}</option>)}
    </select>
    <FiChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
  </div>
);

const Section = ({ title, children, className = "" }) => (
  <div className={`border border-[#E2DFFC] rounded-lg p-6 ${className}`}>
    <h3 className="text-base font-semibold text-[#0A0847CC] mb-5">{title}</h3>
    {children}
  </div>
);

/* ---------- Nested question picker ---------- */
const QuestionPicker = ({ selected, max, onClose, onConfirm }) => {
  const [ids, setIds] = useState(selected.map((q) => q.id));
  const toggle = (id) =>
    setIds((p) => (p.includes(id) ? p.filter((x) => x !== id) : p.length < max ? [...p, id] : p));

  return createPortal(
    <div
      className="fixed inset-0 z-[10000] bg-black/50 flex items-center justify-center p-4 font-[Inter]"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-lg w-full max-w-[560px] p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-base font-semibold text-[#0A0847]">Select Questions</h4>
          <span className="text-xs font-semibold text-[#0A084799]">{ids.length} / {max}</span>
        </div>
        <div className="max-h-[320px] overflow-y-auto space-y-2">
          {QUESTION_BANK.map((q) => {
            const on = ids.includes(q.id);
            return (
              <button
                key={q.id}
                type="button"
                onClick={() => toggle(q.id)}
                className={`w-full flex items-center gap-3 text-left border rounded-md px-3 py-3 text-xs cursor-pointer ${
                  on ? "border-[#001984] bg-[#EEF0FB]" : "border-[#E2DFFC] hover:bg-gray-50"
                }`}
              >
                <span className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${on ? "bg-[#001984] border-[#001984] text-white" : "border-gray-400"}`}>
                  {on && <FiCheck size={11} strokeWidth={3} />}
                </span>
                {q.text}
              </button>
            );
          })}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button type="button" onClick={onClose}
            className="py-3 border border-[#001984] rounded-md text-xs font-semibold text-[#0A0847] cursor-pointer hover:bg-gray-50">
            Cancel
          </button>
          <button type="button"
            onClick={() => onConfirm(ids.map((id) => QUESTION_BANK.find((q) => q.id === id)))}
            className="py-3 bg-[#4A2BD0] hover:bg-[#3B21A8] text-white rounded-md text-xs font-semibold cursor-pointer">
            Apply
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

/* ---------- Main modal ---------- */
export default function LevelFormModal({ mode = "add", level, levels = [], onClose, onSave, onPreview }) {
  const isEdit = mode === "edit";

  const [form, setForm] = useState({
    activity: level?.activity || "",
    book: level?.book || "",
    chapter: level?.chapter || "",
    section: level?.section || "",
    title: level?.title || "",
    questions: level?.questions || [],
    unlockRule: level?.unlockRule || "Complete Previous Level",
    points: level?.points ?? 30,
    confirmUnlock: level?.confirmUnlock ?? true,
  });
  const [errors, setErrors] = useState({});
  const [pickerOpen, setPickerOpen] = useState(false);
  const [dragIdx, setDragIdx] = useState(null);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && !pickerOpen && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, pickerOpen]);

  const set = (k, v) => {
    setForm((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: undefined }));
  };

  // Level number assigned automatically per activity
  const levelNumber = isEdit
    ? level.level
    : `Level ${levels.filter((l) => l.activity === form.activity).length + 1}`;

  const isQuiz = form.activity === "Quiz";
  const prevLevelNum = parseInt(String(levelNumber).replace(/\D/g, ""), 10) - 1;

  const unlockHint =
    form.unlockRule === "Complete Previous Level"
      ? `This level will be unlocked when the user completes Level ${Math.max(prevLevelNum, 1)}.`
      : form.unlockRule === "Available"
      ? "This level is available to all users immediately."
      : "This level will be unlocked after the user completes 3 levels.";

  const moveQuestion = (to) => {
    if (dragIdx === null || dragIdx === to) return;
    setForm((p) => {
      const next = [...p.questions];
      const [m] = next.splice(dragIdx, 1);
      next.splice(to, 0, m);
      return { ...p, questions: next };
    });
    setDragIdx(null);
  };
  const removeQuestion = (id) => set("questions", form.questions.filter((q) => q.id !== id));

  const handleSave = (publish) => {
    const e = {};
    if (!form.activity) e.activity = true;
    if (!form.book) e.book = true;
    if (!form.chapter) e.chapter = true;
    if (!form.section) e.section = true;
    if (publish && isQuiz && form.questions.length !== QUIZ_COUNT) e.questions = true;
    if (Number(form.points) < 0 || form.points === "") e.points = true;
    setErrors(e);
    if (Object.keys(e).length) return;

    const contentLabel = isQuiz
      ? `${form.questions.length} Questions`
      : form.activity === "Puzzle" ? "1 Puzzle"
      : form.activity === "Memory Verse" ? "1 Verse"
      : form.questions.length ? `${form.questions.length} Items` : "—";

    onSave({
      ...(level || {}),
      id: level?.id || crypto.randomUUID(),
      level: levelNumber,
      activity: form.activity,
      book: form.book,
      chapter: form.chapter,
      section: form.section,
      title: form.title,
      questions: form.questions,
      content: contentLabel,
      unlockRule: form.unlockRule,
      unlock: form.unlockRule === "Complete Previous Level" ? `Complete L${Math.max(prevLevelNum, 1)}` : form.unlockRule,
      points: Number(form.points),
      reward: `${form.points} pts`,
      confirmUnlock: form.confirmUnlock,
      status: publish ? "Published" : "Draft",
    });
    onClose();
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[9998] bg-black/45 flex items-start justify-center overflow-y-auto p-4 sm:p-8 font-[Inter]"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative bg-white rounded-lg border border-[#E2DFFC] w-full max-w-[1065px] lg:ml-60 p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button type="button" onClick={onClose} className="text-[#0A0847CC] cursor-pointer">
              <FiArrowRight size={24} />
            </button>
            <h2 className="text-xl font-semibold text-[#0A0847]">
                {isEdit ? "Edit Level" : "Create Level"}
            </h2>
          </div>
          <button type="button" onClick={() => onPreview?.(form)}
            className="px-10 py-3 bg-white border border-[#E2DFFC] rounded-md text-xs font-semibold text-[#0A0847CC] flex items-center gap-2 hover:bg-gray-50 cursor-pointer">
            <FiEye size={14} /> Preview
          </button>
        </div>

        {/* Where it belongs */}
        <Section title="Where it belongs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-5">
            <div>
              <Label required>Activity Type</Label>
              <SelectField value={form.activity} onChange={(v) => set("activity", v)} options={ACTIVITIES}
                placeholder="Select activity type" error={errors.activity} />
            </div>
            <div>
              <Label required>Book</Label>
              <SelectField value={form.book} onChange={(v) => set("book", v)} options={BOOKS}
                placeholder="Select book" error={errors.book} />
            </div>
            <div>
              <Label required>Chapter</Label>
              <SelectField value={form.chapter} onChange={(v) => set("chapter", v)} options={CHAPTERS}
                placeholder="Select chapter" error={errors.chapter} />
            </div>
            <div>
              <Label required>Section</Label>
              <SelectField value={form.section} onChange={(v) => set("section", v)} options={SECTIONS}
                placeholder="Select section" error={errors.section} />
            </div>
          </div>
        </Section>

        {/* Level info */}
        <Section title="Level Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
            <div>
              <Label>Level Number</Label>
              <input readOnly value={form.activity || isEdit ? levelNumber : ""} placeholder="Select an activity first"
                className={`${inputCls} bg-[#F8FAFC] cursor-not-allowed`} />
              <p className="text-[10px] italic text-[#0A084799] mt-1.5">Assigned automatically</p>
            </div>
            <div>
              <Label optional>Level Title</Label>
              <input
                maxLength={TITLE_MAX}
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                placeholder="e.g. The Burning Bush"
                className={inputCls}
              />
              <p className="text-[10px] italic text-[#0A084799] mt-1.5 text-right">
                {form.title.length}/{TITLE_MAX}
              </p>
            </div>
          </div>
        </Section>

        {/* Content */}
        <div className={`rounded-lg p-6 bg-[#F3F2FF] border ${errors.questions ? "border-[#EB0C10]" : "border-[#E2DFFC]"}`}>
          <h3 className="text-base font-semibold text-[#0A0847CC] mb-4">Content</h3>

          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-start gap-3">
              <span className="w-9 h-9 rounded-full bg-[#E4E1F7] text-[#001984] flex items-center justify-center shrink-0">
                <QuestionsparkelsIconSvg size={16} />
              </span>
              <div>
                <p className="text-sm font-semibold text-[#0A0847CC]">{form.activity || "Level"} Level</p>
                {isQuiz && (
                  <p className="text-xs text-[#0A084799] font-medium">Each quiz level must have exactly {QUIZ_COUNT} questions.</p>
                )}
              </div>
            </div>
            {isQuiz && (
              <span className={`text-xs font-semibold ${form.questions.length === QUIZ_COUNT ? "text-[#0A0847CC]" : "text-[#C65406]"}`}>
                {form.questions.length} / {QUIZ_COUNT} Questions
              </span>
            )}
          </div>

          <div className="space-y-3">
            {form.questions.length === 0 && (
              <p className="text-xs text-center text-[#0A084799] bg-white border border-dashed border-[#CBC6F8] rounded-md py-6">
                No content selected yet.
              </p>
            )}
            {form.questions.map((q, i) => (
              <div
                key={q.id}
                draggable
                onDragStart={() => setDragIdx(i)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => moveQuestion(i)}
                onDragEnd={() => setDragIdx(null)}
                className={`flex items-center gap-3 bg-white border border-[#E2DFFC] rounded-md px-3 py-3 ${dragIdx === i ? "opacity-40" : ""}`}
              >
                <EightDotsIconSvg size={10} className="text-gray-400 cursor-grab shrink-0" />
                <span className="w-10 h-10 rounded-md bg-[#E4E1F7] text-[#0A0847CC] text-sm font-semibold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <p className="flex-1 text-sm font-medium text-[#0A0847CC]">{q.text}</p>
                <button type="button" onClick={() => console.log("edit question", q.id)}
                  className="px-3 py-2 border border-[#E2DFFC] rounded-md text-xs font-medium text-[#0A0847CC] hover:bg-gray-50 cursor-pointer">
                  Edit
                </button>
                <button type="button" onClick={() => console.log("view question", q.id)}
                  className="w-9 h-9 border border-[#E2DFFC] rounded-md text-[#0A0847CC] flex items-center justify-center hover:bg-gray-50 cursor-pointer">
                  <FiEye size={14} />
                </button>
                <button type="button" onClick={() => removeQuestion(q.id)}
                  className="w-9 h-9 border border-red-200 rounded-md text-red-500 flex items-center justify-center hover:bg-red-100 cursor-pointer">
                  <FiTrash2 size={14} />
                </button>
              </div>
            ))}
          </div>

          {errors.questions && (
            <p className="text-[10px] text-[#EB0C10] mt-2">Quiz levels need exactly {QUIZ_COUNT} questions to publish.</p>
          )}

          <button type="button" onClick={() => setPickerOpen(true)}
            className="mt-5 px-12 py-3 bg-white border border-[#001984] rounded-md text-sm font-semibold text-[#0A0847] flex items-center gap-2 hover:bg-[#EEF2FF] cursor-pointer">
            <FiPlus size={16} /> Select / Replace Questions
          </button>
        </div>

        {/* Progression */}
        <Section title="Progression & Unlock">
          <div className="space-y-5">
            <div>
              <Label>Unlock Rule</Label>
              <div className="relative">
                <select value={form.unlockRule} onChange={(e) => set("unlockRule", e.target.value)}
                  className={`${inputCls} appearance-none pr-9 cursor-pointer`}>
                  {UNLOCK_RULES.map((r) => <option key={r}>{r}</option>)}
                </select>
                <FiChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
              <p className="text-[10px] italic text-[#0A084799] mt-1.5">{unlockHint}</p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-[#0A0847CC] mb-3">Reward</h4>
              <Label>Reward Points</Label>
              <div className="flex">
                <input
                  type="number"
                  min={0}
                  value={form.points}
                  onChange={(e) => set("points", e.target.value)}
                  className={`${inputCls} rounded-r-none ${errors.points ? errCls : ""}`}
                />
                <span className="px-4 flex items-center border border-l-0 border-[#E2DFFC] rounded-r-md bg-[#F3F7FD] text-xs text-[#0A0847CC]">
                  Points
                </span>
              </div>
              <label className="flex items-center gap-2 mt-3 cursor-pointer">
                <button
                  type="button"
                  onClick={() => set("confirmUnlock", !form.confirmUnlock)}
                  className={`w-4 h-4 rounded border flex items-center justify-center ${
                    form.confirmUnlock ? "bg-[#001984] border-[#001984] text-white" : "border-gray-400 bg-white"
                  }`}
                >
                  {form.confirmUnlock && <FiCheck size={11} strokeWidth={3} />}
                </button>
                <span className="text-[10px] italic text-[#0A084799]">{unlockHint}</span>
                <FiInfo size={14} className="text-gray-400" />
              </label>
            </div>
          </div>
        </Section>

        {/* Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
          <button type="button" onClick={onClose}
            className="py-3.5 bg-white border border-[#001984] text-[#0A0847] rounded-md text-sm font-semibold hover:bg-gray-50 cursor-pointer">
            Cancel
          </button>
          <button type="button" onClick={() => handleSave(false)}
            className="py-3.5 bg-white border border-[#001984] text-[#0A0847] rounded-md text-sm font-semibold hover:bg-gray-50 cursor-pointer">
            Save as Draft
          </button>
          <button type="button" onClick={() => handleSave(true)}
            className="py-3.5 bg-[#4A2BD0] hover:bg-[#3B21A8] text-white rounded-md text-sm font-semibold cursor-pointer">
            Save &amp; Publish
          </button>
        </div>
      </div>

      {pickerOpen && (
        <QuestionPicker
          selected={form.questions}
          max={isQuiz ? QUIZ_COUNT : 20}
          onClose={() => setPickerOpen(false)}
          onConfirm={(qs) => { set("questions", qs); setPickerOpen(false); }}
        />
      )}
    </div>,
    document.body
  );
}