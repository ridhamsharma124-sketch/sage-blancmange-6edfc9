import React, { useState } from "react";
import { FiPlus, FiTrash2, FiCheck, FiChevronDown } from "react-icons/fi";
import { MdDragIndicator } from "react-icons/md";
import { Card, Counter, FieldError, inputCls, errCls } from "../Shared/ui";
import ExplanationFields from "../Shared/ExplanationFields";

const LETTERS = "ABCDEFGH";
const MAX_CHOICES = 8;
const MIN_CHOICES = 2;
const uid = () => crypto.randomUUID();

export const config = {
  label: "Multiple Select",
  subtitle: "Create a Multiple Choice question.",
  badge: "status",
  statusHint: false,
  initialData: () => {
    const choices = ["Light", "Sky", "Mountains", "Oceans", "Human beings"].map((text) => ({ id: uid(), text }));
    return {
      question: "Which were created before humankind?",
      choices,
      correctIds: [choices[0].id, choices[1].id, choices[3].id],
      min: 2,
      max: 5,
      explanation: "Genesis 1:3–8 describes the creation of light, sky and oceans before God created land animals and human beings.",
      scripture: "Genesis 1:3–8",
      hint: "",
    };
  },
  validate: (d) => {
    const e = {};
    const n = d.correctIds.length;
    if (!d.question.trim()) e.question = "Question is required.";
    if (d.choices.length < MIN_CHOICES || d.choices.some((c) => !c.text.trim())) e.choices = "Fill in all choices (min 2).";
    if (n === 0) e.correct = "Select at least one correct answer.";
    else if (Number(d.min) > Number(d.max)) e.limits = "Minimum cannot exceed maximum.";
    else if (n < Number(d.min) || n > Number(d.max)) e.limits = `Correct answers (${n}) must be between ${d.min} and ${d.max}.`;
    return e;
  },
};

const Limit = ({ label, hint, value, onChange, count }) => (
  <div>
    <p className="text-xs font-semibold text-[#0A0847]">{label}</p>
    <p className="text-[10px] text-[#0A084799] font-medium mb-2">{hint}</p>
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`${inputCls} appearance-none pr-9 cursor-pointer`}
      >
        {Array.from({ length: count }, (_, i) => i + 1).map((n) => <option key={n} value={n}>{n}</option>)}
      </select>
      <FiChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  </div>
);

export default function MultipleSelectForm({ data, onChange, errors }) {
  const [dragIdx, setDragIdx] = useState(null);
  const total = data.choices.length;

  const setText = (id, text) => onChange({ choices: data.choices.map((c) => (c.id === id ? { ...c, text } : c)) });
  const toggle = (id) =>
    onChange({
      correctIds: data.correctIds.includes(id) ? data.correctIds.filter((x) => x !== id) : [...data.correctIds, id],
    });

  const add = () => {
    if (total >= MAX_CHOICES) return;
    onChange({ choices: [...data.choices, { id: uid(), text: "" }] });
  };
  const remove = (id) => {
    if (total <= MIN_CHOICES) return;
    const left = total - 1;
    onChange({
      choices: data.choices.filter((c) => c.id !== id),
      correctIds: data.correctIds.filter((x) => x !== id),
      min: Math.min(data.min, left),
      max: Math.min(data.max, left),
    });
  };
  const drop = (to) => {
    if (dragIdx === null || dragIdx === to) return;
    const next = [...data.choices];
    const [m] = next.splice(dragIdx, 1);
    next.splice(to, 0, m);
    onChange({ choices: next });
    setDragIdx(null);
  };

  return (
    <div className="space-y-5">
      <Card title="Question Prompt" subtitle="Enter the question text that will be shown to users.">
        <input
          maxLength={300}
          value={data.question}
          onChange={(e) => onChange({ question: e.target.value })}
          className={`${inputCls} ${errors.question ? errCls : ""}`}
        />
        <Counter value={data.question} max={300} />
        <FieldError>{errors.question}</FieldError>
      </Card>

      <Card title="Answer Choices" subtitle="Select every correct answer.">
        <div className="flex items-center justify-between px-3 mt-2 mb-3 text-sm font-semibold text-[#0A0847CC]">
          <span className="pl-16">Choice</span>
          <span className="pr-16">Correct Answer</span>
        </div>

        <div className="space-y-3">
          {data.choices.map((c, i) => {
            const checked = data.correctIds.includes(c.id);
            return (
              <div
                key={c.id}
                draggable
                onDragStart={() => setDragIdx(i)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => drop(i)}
                onDragEnd={() => setDragIdx(null)}
                className={`flex items-center gap-4 ${dragIdx === i ? "opacity-40" : ""}`}
              >
                <div className="flex-1 flex items-center gap-2 border border-[#E2DFFC] rounded-md px-2 py-2 bg-white">
                  <MdDragIndicator size={20} className="text-gray-400 cursor-grab shrink-0" />
                  <span className="w-10 h-10 rounded-md bg-[#E4E1F7] text-[#0A0847CC] text-sm font-semibold flex items-center justify-center shrink-0">
                    {LETTERS[i]}
                  </span>
                  <input
                    value={c.text}
                    onChange={(e) => setText(c.id, e.target.value)}
                    placeholder={`Choice ${LETTERS[i]}`}
                    className="flex-1 text-sm text-[#0A0847CC] outline-none px-2 bg-transparent"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => toggle(c.id)}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 cursor-pointer ${
                    checked ? "bg-[#001984] border-[#001984] text-white" : "bg-white border-[#0A0847CC]"
                  }`}
                >
                  {checked && <FiCheck size={13} strokeWidth={3} />}
                </button>
                <button
                  type="button"
                  onClick={() => remove(c.id)}
                  disabled={total <= MIN_CHOICES}
                  className="w-9 h-9 border border-red-200 bg-red-50 rounded-md text-red-500 flex items-center justify-center hover:bg-red-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <FiTrash2 size={14} />
                </button>
              </div>
            );
          })}
        </div>
        <FieldError>{errors.choices || errors.correct}</FieldError>

        <button
          type="button"
          onClick={add}
          disabled={total >= MAX_CHOICES}
          className="w-full mt-5 py-3 border border-dashed border-[#001984] rounded-md text-sm font-semibold text-[#0A0847] flex items-center justify-center gap-2 hover:bg-[#EEF2FF] disabled:opacity-40 cursor-pointer"
        >
          <FiPlus size={16} /> Add Choice
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
          <Limit label="Minimum selections" hint="Minimum number of correct answers to select."
            value={data.min} count={total} onChange={(min) => onChange({ min })} />
          <Limit label="Maximum selections" hint="Maximum number of correct answers to select."
            value={data.max} count={total} onChange={(max) => onChange({ max })} />
        </div>
        <FieldError>{errors.limits}</FieldError>
      </Card>

      <ExplanationFields
        data={data}
        onChange={onChange}
        layout="split"
        explanationSubtitle="Explain why these answers are correct."
        hintPlaceholder="e.g., All of these were made before people were created."
      />
    </div>
  );
}