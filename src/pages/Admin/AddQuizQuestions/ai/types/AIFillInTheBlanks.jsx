import React from "react";
import { Pick, Row, Sel } from "../shared/aiUi";

const BLANK_STYLES = { "Underline (_____)": "_____", "Brackets ([ ])": "[ ]", "Dots (.....)": "....." };

export const config = {
  label: "Fill in the Blank",
  levelMode: "table",
  defaults: { count: 10, blanks: 5, variants: 3, randomize: false, blankStyle: "Underline (_____)" },
  samples: [
    { q: "In the beginning, God created the ___ and the ___.", ref: "Genesis 1:1" },
    { q: "God said, “Let the land produce ___: plants yielding seed and ___.”", ref: "Genesis 1:11" },
  ],
};

export const Settings = ({ s, set }) => (
  <>
    <Pick label="Number of Blanks per Question?" value={s.blanks} onChange={(blanks) => set({ blanks })} from={1} to={5} />
    <Pick label="Acceptable Answer Variants" value={s.variants} onChange={(variants) => set({ variants })} from={0} to={5} />
    <Row label="Randomize Answer Choices" checked={s.randomize} onChange={(randomize) => set({ randomize })} />
    <div className="flex items-center justify-between gap-4">
      <p className="text-xs font-semibold text-[#0A0847CC]">Blank Style</p>
      <Sel className="w-48" value={s.blankStyle} onChange={(blankStyle) => set({ blankStyle })} options={Object.keys(BLANK_STYLES)} />
    </div>
  </>
);

export const PreviewBody = ({ it, i, s }) => (
  <>
    <p className="text-sm font-semibold text-[#0A0847]">
      {i + 1}. {it.q.replace(/_{3}/g, BLANK_STYLES[s.blankStyle] || "_____")}
    </p>
    <p className="text-xs text-[#0A084799] mt-3 pl-4">({it.ref})</p>
  </>
);