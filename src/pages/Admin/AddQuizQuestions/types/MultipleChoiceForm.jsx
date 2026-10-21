import React, { useState } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { MdDragIndicator } from "react-icons/md";
import { Card, Counter, FieldError, inputCls, errCls } from "../Shared/ui";
import ExplanationFields from "../Shared/ExplanationFields";

const LETTERS = "ABCDEF";
const MAX_CHOICES = 6;
const MIN_CHOICES = 2;
const uid = () => crypto.randomUUID();

export const config = {
  label: "Multiple Choice",
  subtitle: "Create a Multiple Choice question.",
  badge: "status", // header: Active pill on the right
  statusHint: false,
  metaEditable: true,
  initialData: () => {
    const light = uid();
    return {
      question: "What did God create on the first day?",
      choices: [
        { id: uid(), text: "The sun and the moon" },
        { id: light, text: "Light (Correct Answer)" },
        { id: uid(), text: "The land and the sea" },
        { id: uid(), text: "Plants and animals" },
      ],
      correctId: light,
      explanation: "Genesis 1:3–5 says, “And God said, ‘Let there be light,’ and there was light.”",
      scripture: "Genesis 1:3–5",
      hint: "",
    };
  },
  validate: (d) => {
    const e = {};
    if (!d.question.trim()) e.question = "Question is required.";
    if (d.choices.length < MIN_CHOICES || d.choices.some((c) => !c.text.trim())) e.choices = "Fill in all choices (min 2).";
    if (!d.choices.some((c) => c.id === d.correctId)) e.correct = "Select the correct answer.";
    return e;
  },
};

export default function MultipleChoiceForm({ data, onChange, errors }) {
  const [dragIdx, setDragIdx] = useState(null);

  const setChoice = (id, text) => onChange({ choices: data.choices.map((c) => (c.id === id ? { ...c, text } : c)) });
  const addChoice = () =>
    data.choices.length < MAX_CHOICES && onChange({ choices: [...data.choices, { id: uid(), text: "" }] });
  const removeChoice = (id) => {
    if (data.choices.length <= MIN_CHOICES) return;
    onChange({
      choices: data.choices.filter((c) => c.id !== id),
      correctId: data.correctId === id ? null : data.correctId,
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
      <Card title="Question" subtitle="Enter the question text.">
        <input
          maxLength={300}
          value={data.question}
          onChange={(e) => onChange({ question: e.target.value })}
          className={`${inputCls} ${errors.question ? errCls : ""}`}
        />
        <Counter value={data.question} max={300} />
        <FieldError>{errors.question}</FieldError>
      </Card>

      <Card title="Answer Choices" subtitle="Select the single correct answer.">
        <div className="flex items-center justify-between px-3 mt-2 mb-3 text-sm font-semibold text-[#0A0847CC]">
          <span className="pl-16">Choice</span>
          <span className="pr-16">Correct Answer</span>
        </div>

        <div className="space-y-3">
          {data.choices.map((c, i) => (
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
                  onChange={(e) => setChoice(c.id, e.target.value)}
                  className="flex-1 text-sm text-[#0A0847CC] outline-none px-2 bg-transparent"
                  placeholder={`Choice ${LETTERS[i]}`}
                />
              </div>
              <input
                type="radio"
                name="correct"
                checked={data.correctId === c.id}
                onChange={() => onChange({ correctId: c.id })}
                className="accent-[#1BA155] w-5 h-5 cursor-pointer"
              />
              <button
                type="button"
                onClick={() => removeChoice(c.id)}
                disabled={data.choices.length <= MIN_CHOICES}
                className="w-9 h-9 border border-red-200 bg-red-50 rounded-md text-red-500 flex items-center justify-center hover:bg-red-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <FiTrash2 size={14} />
              </button>
            </div>
          ))}
        </div>

        <FieldError>{errors.choices || errors.correct}</FieldError>

        <button
          type="button"
          onClick={addChoice}
          disabled={data.choices.length >= MAX_CHOICES}
          className="w-full mt-5 py-3 border border-dashed border-[#001984] rounded-md text-sm font-semibold text-[#0A0847] flex items-center justify-center gap-2 hover:bg-[#EEF2FF] disabled:opacity-40 cursor-pointer"
        >
          <FiPlus size={16} /> Add Choice
        </button>
      </Card>

      <ExplanationFields data={data} onChange={onChange} layout="split" />
    </div>
  );
}