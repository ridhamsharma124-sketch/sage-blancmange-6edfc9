import React, { useEffect, useState } from "react";
import { FiSave, FiSettings, FiUpload } from "react-icons/fi";
import { BsStars } from "react-icons/bs";
import { Toggle, Counter, inputCls } from "../Shared/ui";
import { AI_TYPES, AI_TYPE_OPTIONS } from "./types";
import { COUNTS, DIFFICULTIES, makePreview } from "./shared/aiUtils";
import { Sel, H, Row, Info } from "./shared/aiUi";
import LevelsSection from "./shared/LevelsSection";
import AIPreviewCard from "./shared/aiPreviewCard";

const BASE = {
  difficulty: "Medium",
  mode: "new",
  levels: ["Level 1", "Level 2", "Level 3", "Level 4"],
  images: true,
  instructions: "",
  verseRefs: true,
  avoidDup: true,
};

export default function AIGeneratorPanel({ type, meta, onTypeChange }) {
  const reg = AI_TYPES[type];
  const [s, setS] = useState({ ...BASE, ...reg.defaults });
  const [items, setItems] = useState(() => makePreview(reg.samples, BASE.levels));
  const set = (p) => setS((x) => ({ ...x, ...p }));
  const { TopSettings, Settings } = reg;

  const levelList = reg.levelMode === "passages" ? s.passages.filter((p) => p.on).map((p) => p.level) : s.levels;

useEffect(() => {
  setItems(makePreview(reg.samples, levelList));
  // eslint-disable-next-line
}, [levelList.join()]);

//   useEffect(() => {
//     setItems(makePreview(reg.samples, s.levels));
//     // eslint-disable-next-line
//   }, [s.levels.join()]);

  const generate = () =>
    console.log("AI generate payload:", { type, meta, settings: s, preview: items.filter((i) => i.selected) }); // TODO: API
  const draft = () => console.log("AI draft:", { type, meta, settings: s });

  const imageRow = <Row label="Generate a unique AI image for every question" checked={s.images} onChange={(images) => set({ images })} />;
const publish = () => console.log("AI publish:", { type, meta, settings: s, preview: items.filter((i) => i.selected) });

  return (
    <div className="space-y-6">

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] gap-6 items-start">
        {/* Settings */}
        <div className="bg-white border border-[#E2DFFC] rounded-lg p-5 space-y-5">
          {reg.heading && <h3 className="text-base font-semibold text-[#001984]">{reg.heading}</h3>}

          <div>
            <H>Question Type</H>
            <Sel value={type} onChange={onTypeChange} options={AI_TYPE_OPTIONS} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <H>Number of Questions</H>
              <Sel value={String(s.count)} onChange={(v) => set({ count: Number(v) })} options={COUNTS.map(String)} />
            </div>
            <div>
              <H>Difficulty</H>
              <Sel value={s.difficulty} onChange={(difficulty) => set({ difficulty })} options={DIFFICULTIES} />
            </div>
          </div>

          {TopSettings && <TopSettings s={s} set={set} />}

          <hr className="border-[#E2DFFC]" />

          <div className="grid grid-cols-2 gap-4">
            {[["new", "Create New Levels"], ["existing", "Use Existing Levels"]].map(([k, l]) => (
              <button key={k} type="button" onClick={() => set({ mode: k })}
                className={`py-2.5 rounded-md border text-xs font-semibold cursor-pointer ${
                  s.mode === k ? "bg-[#001984] border-[#001984] text-white" : "bg-[#F3F2FF] border-[#E2DFFC] text-[#0A0847CC] hover:bg-[#E9E7FB]"}`}>
                {l}
              </button>
            ))}
          </div>

          <LevelsSection
  mode={reg.levelMode}
  s={s}
  set={set}
  levelData={reg.levelData}
/>

          <Row label="Generate a unique AI image for every question" checked={s.images} onChange={(images) => set({ images })} />

          {Settings && <Settings s={s} set={set} />}

          {!reg.imageLast && imageRow}

          <div>
            <p className="text-xs font-semibold text-[#0A0847CC] mb-2">AI Instructions (Optional)<Info /></p>
            <textarea rows={2} maxLength={500} value={s.instructions}
              onChange={(e) => set({ instructions: e.target.value })}
              placeholder="Add any specific instructions for the AI to follow..."
              className={`${inputCls} resize-none`} />
            <Counter value={s.instructions} max={500} />
          </div>

          <Row label="Include Verse References" info desc={reg.perLevelDescs ? "Add verse references to questions and explanations." : undefined}
            checked={s.verseRefs} onChange={(verseRefs) => set({ verseRefs })} />
          <Row label="Avoid Duplicates" info desc={reg.perLevelDescs ? "AI will avoid generating similar questions." : undefined}
            checked={s.avoidDup} onChange={(avoidDup) => set({ avoidDup })} />
        </div>

        <AIPreviewCard reg={reg} items={items} setItems={setItems} s={s} />
      </div>

{reg.footer === "publish" ? (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <button type="button" onClick={draft}
      className="py-3.5 bg-white border border-[#E2DFFC] rounded-md text-sm font-semibold text-[#0A0847] flex items-center justify-center gap-2 hover:bg-gray-50 cursor-pointer">
      <FiSave size={15} /> Save draft
    </button>
    <button type="button" onClick={generate}
      className="py-3.5 bg-[#EEF0FB] border border-[#C9CDE8] rounded-md text-sm font-semibold text-[#0A0847] flex items-center justify-center gap-2 hover:bg-[#E4E8F8] cursor-pointer">
      <BsStars size={15} /> Generate Questions &amp; Images
    </button>
    <button type="button" onClick={publish}
      className="py-3.5 bg-[#001984] hover:bg-[#001266] text-white rounded-md text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer">
      <FiUpload size={15} /> Publish Selected
    </button>
  </div>
) : (
      <div className={`grid grid-cols-1 gap-6 ${reg.showSaveDraft === false ? "" : "md:grid-cols-[1fr_1.4fr]"}`}>
        {reg.showSaveDraft !== false && (
          <button type="button" onClick={draft}
            className="py-3.5 bg-white border border-[#E2DFFC] rounded-md text-sm font-semibold text-[#0A0847] flex items-center justify-center gap-2 hover:bg-gray-50 cursor-pointer">
            <FiSave size={15} /> Save draft
          </button>
        )}
        <button type="button" onClick={generate}
          className="py-3.5 bg-[#001984] hover:bg-[#001266] text-white rounded-md text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer">
          <BsStars size={15} /> Generate Questions &amp; Images
        </button>
      </div> 
)}
    </div>
  );
}