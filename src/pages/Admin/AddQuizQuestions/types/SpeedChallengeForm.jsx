import React, { useState } from "react";
import { FiPlus, FiX, FiChevronDown } from "react-icons/fi";
import { Card, Counter, Toggle, FieldError, inputCls, errCls } from "../Shared/ui";

const uid = () => crypto.randomUUID();
const FORMATS = ["Mixed", "Multiple Choice", "True / False", "Fill in the Blanks", "Story Sequence"];
const SCOPES = ["Genesis Chapter 1", "Genesis Chapter 2", "Genesis (All)", "Old Testament"];
const q = (text, type, answer) => ({ id: uid(), text, type, answer });

export const config = {
  label: "Speed Challenge",
  subtitle: "Create a new question manually",
  badge: null,
  statusHint: false,
  initialData: () => ({
    prompt: "Answer as many Genesis questions as you can before time runs out.",
    format: "Mixed",
    questions: [
      q("What did God create in the beginning?", "Multiple Choice", "The heavens and the earth"),
      q("What did God call the light?", "Multiple Choice", "Day"),
      q("Arrange the creation events in order.", "Story Sequence", "1, 2, 3, 4, 5"),
      q("True or False: God created the sun before the light.", "True/False", "True/False"),
      q("Complete the blank: God said, “Let there be ____.”", "Fill in the Blanks", "The heavens and the earth"),
    ],
    timeLimit: 60,
    pointsCorrect: 0,
    penalty: 0,
    bonuses: [
      { id: uid(), correct: 3, points: 5 },
      { id: uid(), correct: 5, points: 10 },
      { id: uid(), correct: 8, points: 20 },
    ],
    randomize: true,
    allowSkip: true,
    countdown: 3,
    scope: "Genesis Chapter 1",
    instructions: "Read each question carefully and choose the best answer. You can skip a question, but try to score as high as you can!",
  }),
  validate: (d) => {
    const e = {};
    if (!d.prompt.trim()) e.prompt = "Challenge prompt is required.";
    if (d.questions.length === 0) e.questions = "Add at least one question.";
    if (Number(d.timeLimit) <= 0) e.timeLimit = "Time limit must be greater than 0.";
    return e;
  },
};

const H = ({ children, sub }) => (
  <div className="mb-2">
    <h3 className="text-sm font-semibold text-[#0A0847]">{children}</h3>
    {sub && <p className="text-xs text-[#0A084799] font-medium mt-0.5">{sub}</p>}
  </div>
);
const Panel = ({ children, className = "" }) => (
  <div className={`border border-[#E2DFFC] rounded-lg p-5 bg-white ${className}`}>{children}</div>
);
const Lbl = ({ children }) => <label className="block text-xs font-semibold text-[#0A0847CC] mb-1.5">{children}</label>;
const Select = ({ value, onChange, options }) => (
  <div className="relative">
    <select value={value} onChange={(e) => onChange(e.target.value)} className={`${inputCls} appearance-none pr-9 cursor-pointer`}>
      {options.map((o) => <option key={o}>{o}</option>)}
    </select>
    <FiChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
  </div>
);

export default function SpeedChallengeForm({ data, onChange, errors }) {
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState({ text: "", type: "Multiple Choice", answer: "" });

  const addQuestion = () => {
    if (!draft.text.trim()) return;
    onChange({ questions: [...data.questions, { id: uid(), ...draft }] });
    setDraft({ text: "", type: "Multiple Choice", answer: "" });
    setAdding(false);
  };
  const setBonus = (id, patch) => onChange({ bonuses: data.bonuses.map((b) => (b.id === id ? { ...b, ...patch } : b)) });

  return (
    <div className="space-y-5">
      <Card>
        <div className="space-y-6">
          <div>
            <H sub="Displayed to players before they start the challenge.">Challenge Prompt</H>
            <input
              maxLength={200}
              value={data.prompt}
              onChange={(e) => onChange({ prompt: e.target.value })}
              className={`${inputCls} ${errors.prompt ? errCls : ""}`}
            />
            <Counter value={data.prompt} max={200} />
            <FieldError>{errors.prompt}</FieldError>
          </div>

          <div>
            <H>Question Format</H>
            <Select value={data.format} onChange={(format) => onChange({ format })} options={FORMATS} />
            <p className="text-xs italic text-[#0A084799] mt-2">The challenge will include a mix of question types.</p>
          </div>

          <div>
            <div className="flex items-start justify-between gap-4 mb-3">
              <H sub="Add the events in the correct chronological order.">Sequence Steps</H>
              <button
                type="button"
                onClick={() => setAdding((a) => !a)}
                className="px-6 py-2.5 bg-[#E4E1F7] border border-[#CBC6F8] rounded-md text-xs font-semibold text-[#001984] flex items-center gap-2 hover:bg-[#D9D5F2] cursor-pointer"
              >
                <FiPlus size={16} /> Add Question
              </button>
            </div>

            {adding && (
              <div className="mb-3 border border-[#E2DFFC] bg-[#F8FAFC] rounded-md p-4 grid grid-cols-1 md:grid-cols-[2fr_1fr_1.4fr_auto] gap-3 items-end">
                <div><Lbl>Question</Lbl><input value={draft.text} onChange={(e) => setDraft({ ...draft, text: e.target.value })} className={inputCls} /></div>
                <div><Lbl>Type</Lbl><Select value={draft.type} onChange={(type) => setDraft({ ...draft, type })} options={FORMATS.slice(1)} /></div>
                <div><Lbl>Answer</Lbl><input value={draft.answer} onChange={(e) => setDraft({ ...draft, answer: e.target.value })} className={inputCls} /></div>
                <button type="button" onClick={addQuestion} className="px-6 py-3 bg-[#001984] text-white rounded-md text-xs font-semibold cursor-pointer hover:bg-[#001266]">Add</button>
              </div>
            )}

            <div className="space-y-2">
              {data.questions.map((qq, i) => (
                <div key={qq.id} className="flex items-center gap-4 border border-[#E2DFFC] rounded-md px-3 py-2.5 bg-white">
                  <span className="w-8 h-8 rounded-full bg-[#001984] text-white text-xs font-semibold flex items-center justify-center shrink-0">{i + 1}</span>
                  <span className="w-px h-8 bg-[#E2DFFC]" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#0A0847] truncate">{qq.text}</p>
                    <p className="text-[11px] text-[#0A084799] font-medium">{qq.type}</p>
                  </div>
                  <p className="text-[11px] text-[#0A084799] max-w-[170px] hidden md:block">
                    <span className="font-semibold text-[#0A0847CC]">Answer:</span> {qq.answer}
                  </p>
                  <button
                    type="button"
                    onClick={() => onChange({ questions: data.questions.filter((x) => x.id !== qq.id) })}
                    className="text-[#0A0847CC] hover:text-[#EB0C10] cursor-pointer shrink-0"
                  >
                    <FiX size={22} />
                  </button>
                </div>
              ))}
            </div>
            <FieldError>{errors.questions}</FieldError>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Panel className="space-y-4">
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <Lbl>Time Limit<span className="text-[#EB0C10]">*</span></Lbl>
              <input type="number" min={1} value={data.timeLimit} onChange={(e) => onChange({ timeLimit: e.target.value })} className={`${inputCls} ${errors.timeLimit ? errCls : ""}`} />
            </div>
            <span className="text-xs font-semibold text-[#0A0847CC] pb-3">seconds</span>
          </div>
          <FieldError>{errors.timeLimit}</FieldError>
          <div>
            <Lbl>Points per Correct Answer</Lbl>
            <input type="number" min={0} value={data.pointsCorrect} onChange={(e) => onChange({ pointsCorrect: e.target.value })} className={inputCls} />
          </div>
          <div>
            <Lbl>Wrong Answer Penalty</Lbl>
            <input type="number" min={0} value={data.penalty} onChange={(e) => onChange({ penalty: e.target.value })} className={inputCls} />
          </div>
        </Panel>

        <Panel>
          <h3 className="text-sm font-semibold text-[#0A0847] mb-4">Bonus Thresholds</h3>
          <div className="space-y-4">
            {data.bonuses.map((b) => (
              <div key={b.id} className="flex items-center gap-3 text-sm text-[#0A0847CC]">
                <input type="number" min={1} value={b.correct} onChange={(e) => setBonus(b.id, { correct: e.target.value })} className={`${inputCls} !w-12 !px-2 text-center`} />
                <span className="flex-1 min-w-0 leading-5">
  correct answers
</span>
                <div className="flex items-center border border-[#E2DFFC] rounded-md px-2">
                  <span className="text-xs text-[#0A0847CC]">+</span>
                  <input type="number" min={0} value={b.points} onChange={(e) => setBonus(b.id, { points: e.target.value })} className="w-8 py-3 text-xs text-[#0A0847] outline-none bg-transparent" />
                </div>
                <span>points</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel className="!p-0 grid grid-cols-1 sm:grid-cols-2 sm:divide-x divide-[#E2DFFC]">
        <div className="flex items-center justify-between px-6 py-5">
          <span className="text-xs font-semibold text-[#0A0847]">Randomize questions</span>
          <Toggle tone="blue" checked={data.randomize} onChange={(v) => onChange({ randomize: v })} />
        </div>
        <div className="flex items-center justify-between px-6 py-5">
          <span className="text-xs font-semibold text-[#0A0847]">Allow skip</span>
          <Toggle tone="blue" checked={data.allowSkip} onChange={(v) => onChange({ allowSkip: v })} />
        </div>
      </Panel>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Panel>
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <Lbl>Start Countdown</Lbl>
              <input type="number" min={0} value={data.countdown} onChange={(e) => onChange({ countdown: e.target.value })} className={inputCls} />
            </div>
            <span className="text-xs font-semibold text-[#0A0847CC] pb-3">seconds</span>
          </div>
          <p className="text-xs italic text-[#0A084799] mt-3">Countdown before the challenge begins.</p>
        </Panel>
        <Panel>
          <Lbl>Question Scope</Lbl>
          <Select value={data.scope} onChange={(scope) => onChange({ scope })} options={SCOPES} />
          <p className="text-xs italic text-[#0A084799] mt-3">Questions will be selected from this scope.</p>
        </Panel>
      </div>

      <Card>
        <H>
          Instructions <span className="font-normal text-[#0A084799]">(optional)</span>
        </H>
        <textarea
          rows={2}
          maxLength={1000}
          value={data.instructions}
          onChange={(e) => onChange({ instructions: e.target.value })}
          className={`${inputCls} resize-none`}
        />
        <Counter value={data.instructions} max={1000} />
      </Card>
    </div>
  );
}