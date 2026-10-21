import React, { useRef, useState } from "react";
import { FiPlus, FiX, FiShuffle, FiUpload, FiImage } from "react-icons/fi";
import { MdDragIndicator } from "react-icons/md";
import { Card, Counter, Toggle, FieldError, inputCls, errCls } from "../Shared/ui";
import useDragReorder from "../Shared/useDragReorder";

const uid = () => crypto.randomUUID();
const step = (text = "") => ({ id: uid(), text, img: "" });

export const config = {
  label: "Story Sequence",
  subtitle: "Create a new question manually",
  badge: null,
  statusHint: false,
  initialData: () => ({
    title: "The Creation Story",
    instructions: "Arrange the events in the order they happened.",
    steps: [
      "God created light",
      "God separated the waters",
      "Dry land appeared",
      "God made the sun, moon and stars",
      "God created animals and humankind",
    ].map(step),
    showImages: true,
    explanation: "This is the correct order of the creation events as recorded in Genesis chapter 1.",
    explanation2: "God called the light “Day” and the darkness he called “Night”.",
    scripture: "Genesis 1:5",
  }),
  validate: (d) => {
    const e = {};
    if (!d.title.trim()) e.title = "Story title is required.";
    if (!d.instructions.trim()) e.instructions = "Instructions are required.";
    if (d.steps.length < 2 || d.steps.some((s) => !s.text.trim())) e.steps = "Add at least 2 filled steps.";
    return e;
  },
};

const H = ({ children }) => <h3 className="text-sm font-semibold text-[#0A0847] mb-2">{children}</h3>;

const ReplaceBtn = ({ onPick }) => {
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
        className="px-6 py-2.5 border border-[#E2DFFC] bg-[#F3F2FF] rounded-md text-xs font-semibold text-[#001984] flex items-center gap-2 hover:bg-[#E9E7FB] cursor-pointer"
      >
        <FiUpload size={14} /> Replace
      </button>
    </>
  );
};

export default function StorySequenceForm({ data, onChange, errors }) {
  const [preview, setPreview] = useState(null);
  const { props, dragging } = useDragReorder(data.steps, (steps) => onChange({ steps }));
  const setStep = (id, patch) => onChange({ steps: data.steps.map((s) => (s.id === id ? { ...s, ...patch } : s)) });

  const shuffle = () => {
    const a = data.steps.map((s) => s.text).filter(Boolean);
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    setPreview(a);
  };

  return (
    <Card>
      <div className="space-y-6">
        <div>
          <H>Story Title</H>
          <input
            maxLength={200}
            value={data.title}
            onChange={(e) => onChange({ title: e.target.value })}
            className={`${inputCls} ${errors.title ? errCls : ""}`}
          />
          <Counter value={data.title} max={200} />
          <FieldError>{errors.title}</FieldError>
        </div>

        <div>
          <H>Instructions</H>
          <textarea
            rows={2}
            maxLength={200}
            value={data.instructions}
            onChange={(e) => onChange({ instructions: e.target.value })}
            className={`${inputCls} resize-none ${errors.instructions ? errCls : ""}`}
          />
          <Counter value={data.instructions} max={200} />
          <FieldError>{errors.instructions}</FieldError>
        </div>

        <div>
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h3 className="text-sm font-semibold text-[#0A0847]">Sequence Steps</h3>
              <p className="text-xs text-[#0A084799] font-medium mt-0.5">Add the events in the correct chronological order.</p>
            </div>
            <button
              type="button"
              onClick={shuffle}
              className="px-8 py-2.5 border border-[#001984] rounded-md text-xs font-semibold text-[#0A0847] flex items-center gap-2 hover:bg-[#EEF2FF] cursor-pointer"
            >
              <FiShuffle size={15} /> Shuffle Preview
            </button>
          </div>

          <div className="space-y-3">
            {data.steps.map((s, i) => (
              <div key={s.id} {...props(i)} className={`flex items-center gap-3 ${dragging === i ? "opacity-40" : ""}`}>
                <span className="w-8 h-8 rounded-full bg-[#001984] text-white text-xs font-semibold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <div className="flex-1 flex items-center gap-3 border border-[#E2DFFC] rounded-md px-2 py-2 bg-white">
                  <MdDragIndicator size={20} className="text-gray-400 cursor-grab shrink-0" />
                  <span className="w-px h-8 bg-[#E2DFFC]" />
                  {data.showImages && (
                    <span className="w-10 h-10 rounded bg-[#E4E1F7] overflow-hidden flex items-center justify-center shrink-0 text-gray-500">
                      {s.img ? <img src={s.img} alt="" className="w-full h-full object-cover" /> : <FiImage size={16} />}
                    </span>
                  )}
                  <input
                    value={s.text}
                    onChange={(e) => setStep(s.id, { text: e.target.value })}
                    placeholder={`Step ${i + 1}`}
                    className="flex-1 text-sm text-[#0A0847CC] outline-none bg-transparent"
                  />
                  {data.showImages && <ReplaceBtn onPick={(img) => setStep(s.id, { img })} />}
                </div>
                <button
                  type="button"
                  onClick={() => onChange({ steps: data.steps.filter((x) => x.id !== s.id) })}
                  className="text-[#0A0847CC] hover:text-[#EB0C10] cursor-pointer shrink-0"
                >
                  <FiX size={22} />
                </button>
              </div>
            ))}
          </div>
          <FieldError>{errors.steps}</FieldError>

          {preview && (
            <div className="mt-4 flex flex-wrap gap-2">
              {preview.map((t, i) => (
                <span key={i} className="px-3 py-1.5 rounded-full bg-[#EEF2FF] border border-[#E2DFFC] text-xs text-[#0A0847CC]">{t}</span>
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={() => onChange({ steps: [...data.steps, step()] })}
            className="mt-5 px-10 py-2.5 border border-[#001984] rounded-md text-xs font-semibold text-[#001984] flex items-center gap-2 hover:bg-[#EEF2FF] cursor-pointer"
          >
            <FiPlus size={16} /> Add Step
          </button>
        </div>

        <hr className="border-[#E2DFFC]" />

        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[#0A0847]">Show step images</p>
            <p className="text-xs text-[#0A084799] font-medium mt-0.5">
              Display images for each step (recommended for better engagement).
            </p>
          </div>
          <Toggle tone="blue" checked={data.showImages} onChange={(v) => onChange({ showImages: v })} />
        </div>

        <div>
          <H>Answer Explanation</H>
          <input maxLength={1000} value={data.explanation} onChange={(e) => onChange({ explanation: e.target.value })} className={inputCls} />
          <Counter value={data.explanation} max={1000} />
        </div>
        <div>
          <H>Answer Explanation</H>
          <input maxLength={1000} value={data.explanation2} onChange={(e) => onChange({ explanation2: e.target.value })} className={inputCls} />
          <Counter value={data.explanation2} max={1000} />
        </div>
        <div>
          <H>Scripture Reference</H>
          <input value={data.scripture} onChange={(e) => onChange({ scripture: e.target.value })} className={inputCls} />
        </div>
      </div>
    </Card>
  );
}