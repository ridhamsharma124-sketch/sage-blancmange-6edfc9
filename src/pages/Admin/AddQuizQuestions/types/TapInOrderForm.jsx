import React, { useState } from "react";
import { FiPlus, FiTrash2, FiShuffle } from "react-icons/fi";
import { MdDragIndicator } from "react-icons/md";
import { Card, FieldError, inputCls, errCls } from "../Shared/ui";
import ExplanationFields from "../Shared/ExplanationFields";
import useDragReorder from "../Shared/useDragReorder";

const uid = () => crypto.randomUUID();

export const config = {
  label: "Tap in Order",
  subtitle: "Add Tap in Order",
  badge: "type",
  statusHint: true,
  initialData: () => ({
    instruction: "Arrange the days of creation in the correct order.",
    items: ["Light", "Sky", "Land and plants", "Sun, moon and stars", "Birds and sea creatures", "Animals and humankind"].map(
      (text) => ({ id: uid(), text })
    ),
    distractors: "",
    explanation: "God created everything in a beautiful order over six days.",
    scripture: "Genesis 1",
    hint: "Think about what happened first on Day 1.",
  }),
  validate: (d) => {
    const e = {};
    if (!d.instruction.trim()) e.instruction = "Instruction is required.";
    if (d.items.length < 2 || d.items.some((i) => !i.text.trim())) e.items = "Add at least 2 filled items.";
    return e;
  },
};

export default function TapInOrderForm({ data, onChange, errors }) {
  const [preview, setPreview] = useState(null);
  const { props, dragging } = useDragReorder(data.items, (items) => onChange({ items }));

  const setText = (id, text) => onChange({ items: data.items.map((i) => (i.id === id ? { ...i, text } : i)) });
  const remove = (id) => onChange({ items: data.items.filter((i) => i.id !== id) });
  const add = () => onChange({ items: [...data.items, { id: uid(), text: "" }] });
  const shuffle = () => {
    const a = data.items.map((i) => i.text).filter(Boolean);
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    setPreview(a);
  };

  return (
    <div className="space-y-5">
      <Card title="Question Instruction">
        <input
          value={data.instruction}
          onChange={(e) => onChange({ instruction: e.target.value })}
          className={`${inputCls} ${errors.instruction ? errCls : ""}`}
        />
        <p className="text-[10px] italic text-[#0A084799] mt-2">Provide clear instructions for the user.</p>
        <FieldError>{errors.instruction}</FieldError>
      </Card>

      <Card title="Correct Answer">
        <div className="space-y-3">
          {data.items.map((it, i) => (
            <div key={it.id} {...props(i)} className={`flex items-center gap-4 ${dragging === i ? "opacity-40" : ""}`}>
              <div className="flex-1 flex items-center gap-2 border border-[#E2DFFC] rounded-md px-2 py-2 bg-white">
                <MdDragIndicator size={20} className="text-gray-400 cursor-grab shrink-0" />
                <span className="w-10 h-10 rounded-md bg-[#E4E1F7] text-[#0A0847CC] text-sm font-semibold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <input
                  value={it.text}
                  onChange={(e) => setText(it.id, e.target.value)}
                  placeholder={`Item ${i + 1}`}
                  className="flex-1 text-sm text-[#0A0847CC] outline-none px-2 bg-transparent"
                />
              </div>
              <button
                type="button"
                onClick={() => remove(it.id)}
                className="w-9 h-9 border border-red-200 bg-red-50 rounded-md text-red-500 flex items-center justify-center hover:bg-red-100 cursor-pointer"
              >
                <FiTrash2 size={14} />
              </button>
            </div>
          ))}
        </div>
        <FieldError>{errors.items}</FieldError>

        <div className="grid grid-cols-1 sm:grid-cols-[1fr_1.2fr] gap-5 mt-5">
          <button
            type="button"
            onClick={add}
            className="py-2.5 bg-[#F8F9FE] border border-[#001984] rounded-lg text-xs font-semibold text-[#0A0847CC] flex items-center justify-center gap-2 hover:bg-[#EEF2FF] cursor-pointer"
          >
            <FiPlus size={16} /> Add Choice
          </button>
          <button
            type="button"
            onClick={shuffle}
            className="py-2.5 bg-[#F8F9FE] border border-[#001984] rounded-lg text-xs font-semibold text-[#0A0847CC] flex items-center justify-center gap-2 hover:bg-[#EEF2FF] cursor-pointer"
          >
            <FiShuffle size={16} /> Shuffle Preview
          </button>
        </div>

        {preview && (
          <div className="mt-4 flex flex-wrap gap-2">
            {preview.map((t, i) => (
              <span key={i} className="px-3 py-1.5 rounded-full bg-[#EEF2FF] border border-[#E2DFFC] text-xs font-medium text-[#0A0847CC]">
                {t}
              </span>
            ))}
          </div>
        )}
      </Card>

      <Card title="Distractor Items" optional>
        <input
          value={data.distractors}
          onChange={(e) => onChange({ distractors: e.target.value })}
          placeholder="Enter distractor items, comma separated."
          className={inputCls}
        />
        <p className="text-[10px] italic text-[#0A084799] mt-2">These items will be added randomly to increase difficulty.</p>
      </Card>

      <ExplanationFields data={data} onChange={onChange} layout="stacked" />
    </div>
  );
}