import React from "react";
import { Row, Sel, Info } from "../shared/aiUi";

export const config = {
  label: "True / False",
  heading: "AI Generate – True / False",
  levelMode: "perLevel",
  showSaveDraft: false,
  activitySettings: true,
  previewNote: false,
  defaults: {
    count: 15, perLevel: [5, 5, 5], statementSource: "Scripture Statements",
    balance: true, requireExplanation: true, refSource: "Use Passage Reference",
  },
  samples: [
    { q: "God created light on the first day.", answer: true, ref: "Genesis 1:3" },
    { q: "God created the sun before the light.", answer: false, ref: "Genesis 1:14, 16" },
  ],
};

// Rendered between Difficulty and the levels section
export const TopSettings = ({ s, set }) => (
  <div className="space-y-4">
    <h4 className="text-sm font-semibold text-[#0A0847]">True / False Settings</h4>
    <div>
      <p className="text-xs font-semibold text-[#0A0847CC] mb-2">Statement Source<Info /></p>
      <Sel value={s.statementSource} onChange={(statementSource) => set({ statementSource })}
        options={["Scripture Statements", "Study Notes", "Mixed"]} />
    </div>
    <Row label="Balance Answers (True / False)" info desc="Keep a 50/50 balance"
      checked={s.balance} onChange={(balance) => set({ balance })} />
    <Row label="Require Explanation (Optional)" info desc="Ask users to explain their choice"
      checked={s.requireExplanation} onChange={(requireExplanation) => set({ requireExplanation })} />
    <div>
      <p className="text-xs font-semibold text-[#0A0847CC] mb-2">Bible Reference Source<Info /></p>
      <Sel value={s.refSource} onChange={(refSource) => set({ refSource })}
        options={["Use Passage Reference", "Chapter Reference", "None"]} />
    </div>
  </div>
);

export const PreviewBody = ({ it, i }) => (
  <>
    <p className="text-sm font-semibold text-[#0A0847]">{i + 1}. {it.q}</p>
    {["True", "False"].map((o) => (
      <label key={o} className="flex items-center gap-2 mt-2 pl-6 text-xs text-[#0A0847CC]">
        <input type="radio" readOnly checked={(o === "True") === it.answer} className="accent-[#001984]" /> {o}
      </label>
    ))}
    <p className="text-xs font-medium text-[#1BA155] mt-3">Correct Answer: {it.answer ? "True" : "False"}</p>
    <p className="text-xs text-[#0A084799] mt-1">Reference: {it.ref}</p>
  </>
);