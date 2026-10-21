import React from "react";
import { Row, Sel, Info } from "../shared/aiUi";

export const config = {
  label: "Verse Builder",
  heading: "AI Generate • Verse Builder",
  levelMode: "perLevel",
  showSaveDraft: false,
  activitySettings: true,
  previewNote: false,
  defaults: {
    count: 15, perLevel: [5, 5, 5], passage: "Genesis 1:1–15", translation: "English Standard Version (ESV)",
    tiles: "18 Words", distractors: "4 Words", punctuation: "Remove Punctuation", shuffle: true,
  },
  samples: [
    { q: "Rebuild the verse.", words: ["in", "the", "beginning", "God", "created", "the", "heavens", "and", "the", "earth"], ref: "Genesis 1:1" },
    { q: "Rebuild the verse.", words: ["and", "God", "said", "let", "there", "be", "light", "and", "there", "was", "light"], ref: "Genesis 1:3" },
  ],
};

const words = (a, b, step = 2) => Array.from({ length: Math.floor((b - a) / step) + 1 }, (_, i) => `${a + i * step} Words`);

export const TopSettings = ({ s, set }) => (
  <div className="space-y-4">
    <h4 className="text-sm font-semibold text-[#0A0847]">Verse Builder Settings</h4>
    <div>
      <p className="text-xs font-semibold text-[#0A0847CC] mb-2">Bible Passage<Info /></p>
      <Sel value={s.passage} onChange={(passage) => set({ passage })} options={["Genesis 1:1–15", "Genesis 1:1–31", "Genesis 2:1–25"]} />
    </div>
    <div>
      <p className="text-xs font-semibold text-[#0A0847CC] mb-2">Translation<Info /></p>
      <Sel value={s.translation} onChange={(translation) => set({ translation })}
        options={["English Standard Version (ESV)", "New International Version (NIV)", "King James Version (KJV)", "New Living Translation (NLT)"]} />
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <p className="text-sm font-semibold text-[#0A0847] mb-2">Number of Word Tiles</p>
        <Sel value={s.tiles} onChange={(tiles) => set({ tiles })} options={words(6, 30)} />
      </div>
      <div>
        <p className="text-sm font-semibold text-[#0A0847] mb-2">Distractor Words</p>
        <Sel value={s.distractors} onChange={(distractors) => set({ distractors })} options={words(0, 8, 1)} />
      </div>
    </div>
    <div>
      <p className="text-xs font-semibold text-[#0A0847CC] mb-2">Punctuation Handling<Info /></p>
      <Sel value={s.punctuation} onChange={(punctuation) => set({ punctuation })} options={["Remove Punctuation", "Keep Punctuation"]} />
    </div>
    <Row label="Shuffle Tiles for Users" info desc="Randomize word-tile order." checked={s.shuffle} onChange={(shuffle) => set({ shuffle })} />
  </div>
);

export const PreviewBody = ({ it, i }) => (
  <>
    <p className="text-sm font-semibold text-[#0A0847]">{i + 1}. {it.q}</p>
    <div className="mt-8 pl-4 flex flex-wrap gap-2">
      {it.words.map((w, k) => (
        <span key={k} className="px-3 py-2 rounded bg-[#E4E1F7] text-[11px] font-semibold text-[#0A0847CC]">{w}</span>
      ))}
    </div>
    <p className="text-xs mt-4 pl-4"><span className="text-[#1BA155] font-medium">Correct Verse:</span> <span className="text-[#0A084799]">{it.ref}</span></p>
  </>
);