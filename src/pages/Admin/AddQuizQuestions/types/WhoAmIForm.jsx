import React, { useState } from "react";
import { FiPlus, FiTrash2, FiX } from "react-icons/fi";
import { MdDragIndicator } from "react-icons/md";
import { Card, Toggle, FieldError, inputCls, errCls } from "../Shared/ui";
import useDragReorder from "../Shared/useDragReorder";

const uid = () => crypto.randomUUID();
const renumber = (clues) => clues.map((c, i) => ({ ...c, order: i + 1 }));

export const config = {
  label: "Who Am I",
  subtitle: "Create a new Who Am I question.",
  badge: null,
  statusHint: false,
  side: "compact",
  sideOrder: ["status", "reward"],
  initialData: () => ({
    person: "Noah",
    aliases: ["None"],
    clues: [
      "I found favor in the eyes of the Lord",
      "I built a large ark",
      "My family survived the flood",
      "A rainbow confirmed God’s covenant",
    ].map((text, i) => ({ id: uid(), text, cost: 10, order: i + 1 })),
    lockPunct: true,
    explanation: "Noah was a righteous man whom God chose to build the ark and preserve life during the flood.",
    scripture: "Genesis 6–9",
    hint: "",
  }),
  validate: (d) => {
    const e = {};
    if (!d.person.trim()) e.person = "Correct Bible person is required.";
    if (d.clues.length === 0 || d.clues.some((c) => !c.text.trim())) e.clues = "Add at least one filled clue.";
    return e;
  },
};

const Field = ({ label, note, children }) => (
  <div>
    <p className="text-sm font-semibold text-[#0A0847] mb-2">
      {label} {note && <span className="font-normal text-[#0A084799]">{note}</span>}
    </p>
    {children}
  </div>
);

export default function WhoAmIForm({ data, onChange, errors }) {
  const [alias, setAlias] = useState("");
  const { props, dragging } = useDragReorder(data.clues, (c) => onChange({ clues: renumber(c) }));

  const setClue = (id, patch) => onChange({ clues: data.clues.map((c) => (c.id === id ? { ...c, ...patch } : c)) });
  const addAlias = () => {
    const v = alias.trim();
    if (v && !data.aliases.includes(v)) onChange({ aliases: [...data.aliases, v] });
    setAlias("");
  };

  return (
    <Card>
      <div className="space-y-6">
        <Field label="Correct Bible Person">
          <input
            value={data.person}
            onChange={(e) => onChange({ person: e.target.value })}
            className={`${inputCls} ${errors.person ? errCls : ""}`}
          />
          <FieldError>{errors.person}</FieldError>
        </Field>

        <Field label="Accepted Names / Aliases">
          <div className="flex flex-wrap items-center gap-2 border border-[#E2DFFC] rounded-md px-2 py-2">
            {data.aliases.map((a) => (
              <span key={a} className="px-3 py-1.5 rounded bg-[#E4E1F7] text-xs font-semibold text-[#0A0847CC] flex items-center gap-2">
                {a}
                <button type="button" onClick={() => onChange({ aliases: data.aliases.filter((x) => x !== a) })} className="cursor-pointer">
                  <FiX size={13} className="text-[#001984]" />
                </button>
              </span>
            ))}
            <input
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addAlias())}
              placeholder="Add alias and press Enter."
              className="flex-1 min-w-[140px] text-xs text-[#0A0847] outline-none px-2 py-1"
            />
          </div>
        </Field>

        <div>
          <p className="text-sm font-semibold text-[#0A0847] mb-3">
            Clues <span className="font-normal text-[#0A084799]">(Drag to Reorder)</span>
          </p>
          <div className="grid grid-cols-[28px_44px_1fr_110px_110px_36px] gap-3 px-1 mb-2 text-xs font-semibold text-[#0A0847]">
            <span />
            <span className="text-center">#</span>
            <span>Clue</span>
            <span>Point Cost</span>
            <span>Reveal Order</span>
            <span />
          </div>
          <div className="space-y-3">
            {data.clues.map((c, i) => (
              <div
                key={c.id}
                {...props(i)}
                className={`grid grid-cols-[28px_44px_1fr_110px_110px_36px] gap-3 items-center ${dragging === i ? "opacity-40" : ""}`}
              >
                <MdDragIndicator size={22} className="text-gray-400 cursor-grab" />
                <span className="h-10 rounded-md bg-[#E4E1F7] text-[#0A0847CC] text-sm font-semibold flex items-center justify-center">
                  {i + 1}
                </span>
                <input value={c.text} onChange={(e) => setClue(c.id, { text: e.target.value })} className={inputCls} />
                <input type="number" min={0} value={c.cost} onChange={(e) => setClue(c.id, { cost: e.target.value })} className={inputCls} />
                <input type="number" min={1} value={c.order} onChange={(e) => setClue(c.id, { order: e.target.value })} className={inputCls} />
                <button
                  type="button"
                  onClick={() => onChange({ clues: renumber(data.clues.filter((x) => x.id !== c.id)) })}
                  className="w-8 h-8 border border-red-200 bg-red-50 rounded-md text-red-500 flex items-center justify-center hover:bg-red-100 cursor-pointer"
                >
                  <FiTrash2 size={13} />
                </button>
              </div>
            ))}
          </div>
          <FieldError>{errors.clues}</FieldError>

          <div className="flex items-center justify-between mt-5">
            <button
              type="button"
              onClick={() => onChange({ clues: [...data.clues, { id: uid(), text: "", cost: 10, order: data.clues.length + 1 }] })}
              className="px-10 py-3 border border-[#001984] rounded-md text-sm font-semibold text-[#001984] flex items-center gap-2 hover:bg-[#EEF2FF] cursor-pointer"
            >
              <FiPlus size={15} /> Add Clue
            </button>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-[#0A0847]">Lock punctuation</span>
              <Toggle tone="blue" checked={data.lockPunct} onChange={(v) => onChange({ lockPunct: v })} />
            </div>
          </div>
        </div>

        <Field label="Answer Explanation">
          <input value={data.explanation} onChange={(e) => onChange({ explanation: e.target.value })} className={inputCls} />
        </Field>
        <Field label="Scripture Reference">
          <input value={data.scripture} onChange={(e) => onChange({ scripture: e.target.value })} className={inputCls} />
        </Field>
        <Field label="Optional Hint" note="(Shown to prayer)">
          <input
            value={data.hint}
            onChange={(e) => onChange({ hint: e.target.value })}
            placeholder="e.g., This person obeyed God and built an ark."
            className={inputCls}
          />
        </Field>
      </div>
    </Card>
  );
}