import React, { useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";
import { Sel, Check } from "../shared/aiUi";
import { inputCls } from "../../Shared/ui";

export const config = {
  label: "Match the Pair",
  levelMode: "rows",
  showSaveDraft: false,
  previewLayout: "stacked",
  previewSub: false,
  previewNote: false,
  defaults: {
    count: 10,
    rows: [{ level: "Level 1", diff: "Easy", n: 4 }, { level: "Level 2", diff: "Medium", n: 3 }, { level: "Level 3", diff: "Hard", n: 3 }],
    pairs: "5 pairs", categories: ["Person ↔ Event", "Object ↔ Purpose", "Book ↔ Theme"],
    shuffle: true, excludeName: true, aliases: "",
  },
  samples: [
    { pair: true, q: "I was the first man created by God. Who am I?", a: ["Noah", "The Ark", "The Flood", "God’s Promise", "Rainbow"], b: ["Never again destroy the earth by flood", "Built by Noah by God’s command", "Sent by God in Noah’s time", "Righteous man found favor with God", "Sign of God’s covenant"] },
    { pair: true, q: "I was the first man created by God. Who am I?", a: ["Moses’ Staff", "The Ark", "Israel", "God’s Promise", "Mount Sinai"], b: ["Never again destroy the earth by flood", "Built by Noah by God’s command", "Sent by God in Noah’s time", "Righteous man found favor with God", "Sign of God’s covenant"] },
  ],
};

export const Settings = ({ s, set }) => {
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const add = () => {
    const v = name.trim();
    if (v && !s.categories.includes(v)) set({ categories: [...s.categories, v] });
    setName(""); setAdding(false);
  };
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-semibold text-[#0A0847]">Match the Pair Settings</h4>
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-[#0A0847]">Number of Pairs per Question</p>
        <Sel className="w-32" value={s.pairs} onChange={(pairs) => set({ pairs })} options={["3 pairs", "4 pairs", "5 pairs", "6 pairs"]} />
      </div>
      <div>
        <p className="text-sm font-semibold text-[#0A0847] mb-2">Pair Categories</p>
        <div className="flex flex-wrap gap-2 border border-[#E2DFFC] rounded-md p-3">
          {s.categories.map((c) => (
            <span key={c} className="px-3 py-1.5 rounded bg-[#F3F2FF] border border-[#E2DFFC] text-[11px] font-medium text-[#0A0847CC] flex items-center gap-2">
              {c}
              <button type="button" onClick={() => set({ categories: s.categories.filter((x) => x !== c) })} className="cursor-pointer">
                <FiX size={12} className="text-[#001984]" />
              </button>
            </span>
          ))}
          {adding ? (
            <input autoFocus value={name} onChange={(e) => setName(e.target.value)} onBlur={add}
              onKeyDown={(e) => e.key === "Enter" && add()} placeholder="e.g., Place ↔ Event"
              className="px-2 py-1 text-[11px] border border-[#E2DFFC] rounded outline-none focus:border-[#001984]" />
          ) : (
            <button type="button" onClick={() => setAdding(true)}
              className="px-3 py-1.5 rounded border border-[#E2DFFC] text-[11px] font-medium text-[#0A0847CC] flex items-center gap-1.5 hover:bg-gray-50 cursor-pointer">
              <FiPlus size={12} /> Add Category
            </button>
          )}
        </div>
      </div>
      <Check label="Shuffle Both Columns" checked={s.shuffle} onChange={(shuffle) => set({ shuffle })} />
      <Check label="Exclude Character’s Name from Clues" checked={s.excludeName} onChange={(excludeName) => set({ excludeName })} />
      <div>
        <p className="text-sm font-semibold text-[#0A0847] mb-2">Answer Aliases <span className="font-normal text-[#0A084799]">(comma separated)</span></p>
        <input value={s.aliases} onChange={(e) => set({ aliases: e.target.value })} placeholder="e.g., Adam, Man, First man" className={inputCls} />
      </div>
    </div>
  );
};

export const PreviewBody = ({ it, i }) => (
  <>
    <p className="text-sm font-semibold text-[#0A0847]">{i + 1}. {it.q}</p>
    <div className="mt-4 grid grid-cols-[1fr_1.6fr] gap-6 text-xs text-[#0A084799]">
      <div>
        <p className="font-semibold text-[#001984] mb-2">Column A</p>
        {it.a.map((t, k) => <p key={t} className="mb-1.5">{"ABCDEF"[k]}. {t}</p>)}
      </div>
      <div className="border-l border-[#E2DFFC] pl-5">
        <p className="font-semibold text-[#001984] mb-2">Column B</p>
        {it.b.map((t, k) => <p key={t} className="mb-1.5">{k + 1}. {t}</p>)}
      </div>
    </div>
  </>
);