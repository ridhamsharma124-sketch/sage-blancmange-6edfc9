import React from "react";
import { Pick, Row } from "../shared/aiUi";

export const config = {
  label: "Multiple Choice",
  levelMode: "table",
  defaults: { count: 10, choices: 4, exactlyOne: true, randomize: false },
  samples: [
    { q: "Who created the heavens and the earth?", options: ["The angels", "God", "Moses", "Abraham"], ref: "Genesis 1:1" },
    { q: "What did God create on the first day?", options: ["Light", "Animals", "Plants", "Mountains"], ref: "Genesis 1:3-5" },
    { q: "Who was the first man?", options: ["Noah", "Adam", "Cain", "Seth"], ref: "Genesis 2:7" },
  ],
};

export const Settings = ({ s, set }) => (
  <>
    <Pick label="Number of Answer Choices" value={s.choices} onChange={(choices) => set({ choices })} from={2} to={6} />
    <Row label="Exactly One Correct Answer" checked={s.exactlyOne} onChange={(exactlyOne) => set({ exactlyOne })} />
    <Row label="Randomize Answer Choices" checked={s.randomize} onChange={(randomize) => set({ randomize })} />
  </>
);

export const PreviewBody = ({ it, i }) => (
  <>
    <p className="text-sm font-semibold text-[#0A0847]">{i + 1}. {it.q}</p>
    <div className="mt-3 pl-5 space-y-2">
      {it.options.map((o, k) => (
        <p key={o} className="text-xs text-[#0A0847CC]">{"ABCDEF"[k]}. {o}</p>
      ))}
    </div>
  </>
);