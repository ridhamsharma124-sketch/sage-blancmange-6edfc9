import React from "react";
import { Pick, Row } from "../shared/aiUi";

export const config = {
  label: "Multiple Select",
  levelMode: "table",
  defaults: { count: 10, choices: 5, minCorrect: 2, maxCorrect: 3, randomize: true },
  samples: [
    { q: "Who created the heavens and the earth?", options: ["The angels", "God", "Moses", "Abraham"], ref: "Genesis 1:1" },
    { q: "Which were created before humankind?", options: ["Light", "Sky", "Oceans", "Human beings"], ref: "Genesis 1:3-8" },
  ],
};

export const Settings = ({ s, set }) => (
  <>
    <Pick label="Number of Answer Choices" value={s.choices} onChange={(choices) => set({ choices })} from={2} to={6} />
    <Pick label="Minimum Correct Answers" value={s.minCorrect} onChange={(minCorrect) => set({ minCorrect })} from={1} to={s.choices} />
    <Pick label="Maximum Correct Answers" value={s.maxCorrect} onChange={(maxCorrect) => set({ maxCorrect })} from={1} to={s.choices} />
    <Row label="Randomize Answer Choices" checked={s.randomize} onChange={(randomize) => set({ randomize })} />
  </>
);

export const PreviewBody = ({ it, i }) => (
  <>
    <p className="text-sm font-semibold text-[#0A0847]">{i + 1}. {it.q}</p>
    <p className="text-xs text-[#0A084799] pl-5 mt-0.5">Select all that apply</p>
    <div className="mt-2 pl-5 space-y-2">
      {it.options.map((o, k) => (
        <p key={o} className="text-xs text-[#0A0847CC] flex items-center gap-2">
          <span className="w-3.5 h-3.5 border border-[#0A0847CC] rounded-sm" />
          {"ABCDEF"[k]}. {o}
        </p>
      ))}
    </div>
  </>
);