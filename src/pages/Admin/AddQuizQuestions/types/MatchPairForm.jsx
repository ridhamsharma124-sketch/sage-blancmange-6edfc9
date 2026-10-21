import React, { useRef, useState } from "react";
import { FiPlus, FiTrash2, FiShuffle, FiImage } from "react-icons/fi";
import { MdDragIndicator } from "react-icons/md";
import { Card, Toggle, FieldError, inputCls, errCls } from "../Shared/ui";
import useDragReorder from "../Shared/useDragReorder";

const uid = () => crypto.randomUUID();
const pair = (left = "", right = "") => ({ id: uid(), left, right, leftImg: "", rightImg: "" });

export const config = {
  label: "Match the Pair",
  subtitle: "Create a new Match the Pair question.",
  badge: null,
  statusHint: false,
  initialData: () => ({
    instructions: "Match each person with the correct description.",
    pairs: [
      pair("Noah", "Built the ark"),
      pair("Abraham", "Father of many nations"),
      pair("Moses", "Led Israel from Egypt"),
      pair("David", "Defeated Goliath"),
      pair("Esther", "Became queen"),
    ],
    randomize: true,
    explanation: "These biblical figures played important roles in God’s plan and have unique stories.",
    scripture: "Genesis 1–50",
    hint: "",
  }),
  validate: (d) => {
    const e = {};
    if (!d.instructions.trim()) e.instructions = "Instructions are required.";
    if (d.pairs.length < 2) e.pairs = "Add at least 2 pairs.";
    else if (d.pairs.some((p) => !(p.left.trim() || p.leftImg) || !(p.right.trim() || p.rightImg)))
      e.pairs = "Every pair needs a left and right match.";
    return e;
  },
};

const ImgBtn = ({ img, onPick }) => {
  const ref = useRef(null);
  return (
    <>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onPick(URL.createObjectURL(f));
          e.target.value = "";
        }}
      />
      <button
        type="button"
        onClick={() => ref.current?.click()}
        className="w-10 h-10 border border-[#E2DFFC] rounded-md flex items-center justify-center text-[#0A0847] hover:bg-gray-50 cursor-pointer overflow-hidden shrink-0"
      >
        {img ? <img src={img} alt="" className="w-full h-full object-cover" /> : <FiImage size={16} />}
      </button>
    </>
  );
};

export default function MatchPairForm({ data, onChange, errors }) {
  const [preview, setPreview] = useState(null);
  const { props, dragging } = useDragReorder(data.pairs, (pairs) => onChange({ pairs }));

  const setPair = (id, patch) => onChange({ pairs: data.pairs.map((p) => (p.id === id ? { ...p, ...patch } : p)) });

  const shuffle = () => {
    const rights = data.pairs.map((p) => p.right || "Image");
    for (let i = rights.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [rights[i], rights[j]] = [rights[j], rights[i]];
    }
    setPreview(data.pairs.map((p, i) => ({ left: p.left || "Image", right: rights[i] })));
  };

  return (
    <Card>
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-[#0A0847] mb-2">Instructions</h3>
          <input
            value={data.instructions}
            onChange={(e) => onChange({ instructions: e.target.value })}
            className={`${inputCls} ${errors.instructions ? errCls : ""}`}
          />
          <FieldError>{errors.instructions}</FieldError>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-[#0A0847] mb-3">Matching Pairs</h3>
          <div className="overflow-x-auto">
            <div className="min-w-[540px]">
              <div className="grid grid-cols-[72px_1fr_1fr_44px] border-y border-[#E2DFFC] text-xs font-semibold text-[#0A0847]">
                <span className="py-3 text-center">#</span>
                <span className="py-3 px-4 border-l border-[#E2DFFC]">Left Match</span>
                <span className="py-3 px-4 border-l border-[#E2DFFC]">Right Match</span>
                <span className="border-l border-[#E2DFFC]" />
              </div>

              {data.pairs.map((p, i) => (
                <div
                  key={p.id}
                  {...props(i)}
                  className={`grid grid-cols-[72px_1fr_1fr_44px] items-center ${dragging === i ? "opacity-40" : ""}`}
                >
                  <div className="flex items-center gap-1 py-2.5 pl-1">
                    <MdDragIndicator size={20} className="text-gray-400 cursor-grab shrink-0" />
                    <span className="w-7 h-7 rounded-md bg-[#E4E1F7] text-[#0A0847CC] text-xs font-semibold flex items-center justify-center">
                      {i + 1}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2.5 border-l border-[#E2DFFC]">
                    <input value={p.left} onChange={(e) => setPair(p.id, { left: e.target.value })} className={inputCls} />
                    <ImgBtn img={p.leftImg} onPick={(leftImg) => setPair(p.id, { leftImg })} />
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2.5 border-l border-[#E2DFFC]">
                    <input value={p.right} onChange={(e) => setPair(p.id, { right: e.target.value })} className={inputCls} />
                    <ImgBtn img={p.rightImg} onPick={(rightImg) => setPair(p.id, { rightImg })} />
                  </div>
                  <div className="flex justify-center border-l border-[#E2DFFC] self-stretch items-center">
                    <button
                      type="button"
                      onClick={() => onChange({ pairs: data.pairs.filter((x) => x.id !== p.id) })}
                      className="w-8 h-8 border border-red-200 bg-red-50 rounded-md text-red-500 flex items-center justify-center hover:bg-red-100 cursor-pointer"
                    >
                      <FiTrash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <FieldError>{errors.pairs}</FieldError>

          <div className="flex flex-wrap items-center gap-4 mt-5">
            <button
              type="button"
              onClick={() => onChange({ pairs: [...data.pairs, pair()] })}
              className="px-10 py-2.5 border border-[#001984] rounded-md text-xs font-semibold text-[#0A0847CC] flex items-center gap-2 bg-[#F8F9FE] hover:bg-[#EEF2FF] cursor-pointer"
            >
              <FiPlus size={16} /> Add Pair
            </button>
            <button
              type="button"
              onClick={shuffle}
              className="px-8 py-2.5 border border-[#001984] rounded-md text-xs font-semibold text-[#0A0847CC] flex items-center gap-2 bg-[#F8F9FE] hover:bg-[#EEF2FF] cursor-pointer"
            >
              <FiShuffle size={16} /> Shuffle Preview
            </button>
            <div className="ml-auto flex items-center gap-3">
              <span className="text-xs font-semibold text-[#0A0847]">Randomize both columns</span>
              <Toggle tone="blue" checked={data.randomize} onChange={(v) => onChange({ randomize: v })} />
            </div>
          </div>

          {preview && (
            <div className="mt-4 grid grid-cols-2 gap-2 max-w-md">
              {preview.map((r, i) => (
                <React.Fragment key={i}>
                  <span className="px-3 py-1.5 rounded bg-[#EEF2FF] border border-[#E2DFFC] text-xs text-[#0A0847CC]">{r.left}</span>
                  <span className="px-3 py-1.5 rounded bg-[#EEF2FF] border border-[#E2DFFC] text-xs text-[#0A0847CC]">{r.right}</span>
                </React.Fragment>
              ))}
            </div>
          )}
        </div>

        <div>
          <h3 className="text-sm font-semibold text-[#0A0847] mb-2">Answer Explanation</h3>
          <input value={data.explanation} onChange={(e) => onChange({ explanation: e.target.value })} className={inputCls} />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-[#0A0847] mb-2">Scripture Reference</h3>
          <input value={data.scripture} onChange={(e) => onChange({ scripture: e.target.value })} className={inputCls} />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-[#0A0847] mb-2">
            Optional Hint <span className="font-normal text-[#0A084799]">(shown to player)</span>
          </h3>
          <input
            value={data.hint}
            onChange={(e) => onChange({ hint: e.target.value })}
            placeholder="e.g., Think about the roles each person is known for."
            className={inputCls}
          />
        </div>
      </div>
    </Card>
  );
}