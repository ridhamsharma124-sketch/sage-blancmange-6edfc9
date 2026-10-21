import React, { useRef } from "react";
import { FiTrash2 } from "react-icons/fi";
import { Card, Toggle, FieldError, inputCls, errCls } from "../Shared/ui";
import ExplanationFields from "../Shared/ExplanationFields";

const BLANK = /_{3,}/g;
const TOKEN = "___";
const countBlanks = (s) => (s.match(BLANK) || []).length;
const removeNth = (s, n) => {
  let i = -1;
  return s.replace(BLANK, (m) => (++i === n ? "" : m));
};
const newBlank = () => ({ id: crypto.randomUUID(), answer: "", alternatives: "", caseSensitive: false, ignorePunct: true });

export const config = {
  label: "Fill in the Blank",
  subtitle: "Add Fill in the Blank",
  badge: "type",
  statusHint: true,
  metaEditable: false,
  initialData: () => ({
    sentence: "In the beginning, God created the ___ and the ___.",
    answers: [
      { ...newBlank(), answer: "heavens", alternatives: "heaven, sky, skies" },
      { ...newBlank(), answer: "earth", alternatives: "world, ground" },
    ],
    explanation: "Genesis 1:1 tells us that God created everything—the heavens above and the earth below.",
    scripture: "Genesis 1:1",
    hint: "Think about the first things God created.",
  }),
  validate: (d) => {
    const e = {};
    if (countBlanks(d.sentence) === 0) e.sentence = "Add at least one blank.";
    if (d.answers.some((a) => !a.answer.trim())) e.answers = "Every blank needs a correct answer.";
    return e;
  },
};

export default function FillBlanksForm({ data, onChange, errors }) {
  const inputRef = useRef(null);

  const setSentence = (sentence) => {
    const n = countBlanks(sentence);
    onChange({ sentence, answers: Array.from({ length: n }, (_, i) => data.answers[i] ?? newBlank()) });
  };

  const insertBlank = () => {
    const el = inputRef.current;
    const pos = el?.selectionStart ?? data.sentence.length;
    const end = el?.selectionEnd ?? pos;
    setSentence(data.sentence.slice(0, pos) + TOKEN + data.sentence.slice(end));
  };

  const setAnswer = (i, patch) =>
    onChange({ answers: data.answers.map((a, idx) => (idx === i ? { ...a, ...patch } : a)) });

  const removeBlank = (i) =>
    onChange({ sentence: removeNth(data.sentence, i), answers: data.answers.filter((_, idx) => idx !== i) });

  return (
    <div className="space-y-5">
      <Card>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-[#0A0847]">Question Sentence</h3>
          <button type="button" onClick={insertBlank}
            className="px-4 py-2 border border-[#E2DFFC] rounded-md text-[11px] font-semibold text-[#0A0847CC] hover:bg-gray-50 cursor-pointer">
            ＿＿ Insert Blank
          </button>
        </div>
        <input
          ref={inputRef}
          value={data.sentence}
          onChange={(e) => setSentence(e.target.value)}
          className={`${inputCls} ${errors.sentence ? errCls : ""}`}
        />
        <p className="text-[10px] italic text-[#0A084799] mt-2">
          Use the “Insert Blank” button or type ___ to add blanks. You can add multiple blanks.
        </p>
        <FieldError>{errors.sentence}</FieldError>
      </Card>

      <Card title="Correct Answers">
        <div className="divide-y divide-[#E2DFFC]">
          {data.answers.map((a, i) => (
            <div key={a.id} className="grid grid-cols-1 md:grid-cols-[1fr_230px_40px] gap-6 py-5 first:pt-2">
              <div className="space-y-3">
                <span className="inline-block px-3 py-1 rounded bg-[#E4E1F7] text-[11px] font-medium text-[#0A0847CC]">
                  Blank {i + 1}
                </span>
                <input value={a.answer} onChange={(e) => setAnswer(i, { answer: e.target.value })} className={inputCls} />
                <p className="text-xs text-[#0A0847CC]">
                  Accepted alternatives <span className="text-[#0A084799]">(Comma Seprated)</span>
                </p>
                <input value={a.alternatives} onChange={(e) => setAnswer(i, { alternatives: e.target.value })} className={inputCls} />
              </div>
              <div className="space-y-4 pt-1">
                <div>
                  <p className="text-xs font-semibold text-[#0A0847CC] mb-2">Case sensitive</p>
                  <Toggle checked={a.caseSensitive} onChange={(v) => setAnswer(i, { caseSensitive: v })} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#0A0847CC] mb-2">Ignore punctuation</p>
                  <Toggle checked={a.ignorePunct} onChange={(v) => setAnswer(i, { ignorePunct: v })} />
                </div>
              </div>
              <div className="flex md:items-center md:justify-end">
                <button type="button" onClick={() => removeBlank(i)}
                  className="w-9 h-9 border border-red-200 bg-red-50 rounded-md text-red-500 flex items-center justify-center hover:bg-red-100 cursor-pointer">
                  <FiTrash2 size={14} />
                </button>
              </div>
            </div>
          ))}
          {data.answers.length === 0 && (
            <p className="text-xs text-center text-[#0A084799] py-6">No blanks yet. Click “Insert Blank”.</p>
          )}
        </div>
        <FieldError>{errors.answers}</FieldError>
      </Card>

      <ExplanationFields data={data} onChange={onChange} layout="joined"
        subtitle="Provide a hint to help users (shown only if enabled)." />
    </div>
  );
}