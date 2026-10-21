import React from "react";
import { Sel } from "../shared/aiUi";

export const config = {
  label: "Speed Challenge",
  levelMode: "passages",
  footer: "publish",
  countBadge: true,
  previewSub: "Select the single correct answer.",
  summary: true,
  imageLast: true,
  previewNote: false,
  levelBadge: (s) => s.timeLimit,
  defaults: {
    count: 12,
    passages: [
      { level: "Level 1", passage: "Genesis 1:1–5", n: 3, on: true },
      { level: "Level 2", passage: "Genesis 1:6–13", n: 3, on: true },
      { level: "Level 3", passage: "Genesis 1:20–25", n: 3, on: true },
      { level: "Level 4", passage: "Genesis 1:6–13", n: 3, on: true },
    ],
    format: "Multiple Choice", choices: "4 choices", timeLimit: "15 sec",
    streak: "+2 points (3+ correct)", ramp: "Gradual (every 3 questions)",
  },
  samples: [
    { q: "What did God create first according to Genesis 1:1?", options: ["The earth", "Light", "The heavens", "The stars"] },
    { q: "What did God create on the third day?", options: ["The sun and moon", "The dry land", "The plants and trees", "The seas and land"] },
    { q: "According to Genesis 1:24, what did God create?", options: ["Animals of the field", "Creeping things", "All living creatures", "All of the above"] },
  ],
};

const F = ({ label, children }) => (
  <div><p className="text-sm font-semibold text-[#0A0847] mb-2">{label}</p>{children}</div>
);

export const Settings = ({ s, set }) => (
  <div className="space-y-4">
    <h4 className="text-sm font-semibold text-[#0A0847]">Speed Challenge Settings</h4>
    <F label="Best Question Format">
      <Sel value={s.format} onChange={(format) => set({ format })} options={["Multiple Choice", "True / False", "Mixed"]} />
    </F>
    <F label="Number of Choices">
      <Sel value={s.choices} onChange={(choices) => set({ choices })} options={["2 choices", "3 choices", "4 choices", "5 choices"]} />
    </F>
    <F label="Time Limit per Question">
      <Sel value={s.timeLimit} onChange={(timeLimit) => set({ timeLimit })} options={["10 sec", "15 sec", "20 sec", "30 sec"]} />
    </F>
    <F label="Streak Bonus">
      <Sel value={s.streak} onChange={(streak) => set({ streak })} options={["None", "+1 point (3+ correct)", "+2 points (3+ correct)", "+3 points (5+ correct)"]} />
    </F>
    <F label="Difficulty Ramp">
      <Sel value={s.ramp} onChange={(ramp) => set({ ramp })} options={["None", "Gradual (every 3 questions)", "Gradual (every 5 questions)"]} />
    </F>
  </div>
);

export const PreviewBody = ({ it, i }) => (
  <>
    <p className="text-sm font-semibold text-[#0A0847]">{i + 1}. {it.q}</p>
    <div className="mt-3 pl-5 space-y-2">
      {it.options.map((o, k) => <p key={o} className="text-xs text-[#0A084799]">{"ABCDEF"[k]}. {o}</p>)}
    </div>
  </>
);