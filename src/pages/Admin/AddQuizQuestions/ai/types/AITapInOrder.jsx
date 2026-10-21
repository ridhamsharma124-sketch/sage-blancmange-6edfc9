import React from "react";
import { Row, Sel, Info } from "../shared/aiUi";

const items = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => `${a + i} Items`);

export const config = {
  label: "Tap in Order",
  heading: "AI Generate • Tap in Order",
  levelMode: "perLevel",
  showSaveDraft: false,
  activitySettings: true,
  previewNote: false,
  defaults: {
    count: 15, perLevel: [5, 5, 5], orderedItems: "6 Items", distractorItems: "0 Items",
    balance: true, requireExplanation: true, refSource: "Use Passage Reference",
  },
  samples: [
    { q: "Put the days of creation in the correct order.", steps: ["Light (Day 1)", "Sky (Day 2)", "Land & Sea, Plants (Day 3)", "Sun, Moon, Stars (Day 4)", "Birds & Sea Creatures (Day 5)", "Land Animals & Humans (Day 6)"] },
    { q: "Order the first four days of creation.", steps: ["Light (Day 1)", "Sky (Day 2)", "Land & Sea, Plants (Day 3)", "Sun, Moon, Stars (Day 4)"] },
  ],
};

export const TopSettings = ({ s, set }) => (
  <div className="space-y-4">
    <h4 className="text-sm font-semibold text-[#0A0847]">Tap in Order Settings</h4>
    <div>
      <p className="text-xs font-semibold text-[#0A0847CC] mb-2">Number of Ordered Items<Info /></p>
      <Sel value={s.orderedItems} onChange={(orderedItems) => set({ orderedItems })} options={items(3, 10)} />
    </div>
    <div>
      <p className="text-xs font-semibold text-[#0A0847CC] mb-2">Number of Distractor Items<Info /></p>
      <Sel value={s.distractorItems} onChange={(distractorItems) => set({ distractorItems })} options={items(0, 4)} />
    </div>
    <Row label="Balance Answers (True / False)" info desc="Keep a 50/50 balance" checked={s.balance} onChange={(balance) => set({ balance })} />
    <Row label="Require Explanation (Optional)" info desc="Ask users to explain their choice" checked={s.requireExplanation} onChange={(requireExplanation) => set({ requireExplanation })} />
    <div>
      <p className="text-xs font-semibold text-[#0A0847CC] mb-2">Bible Reference Source<Info /></p>
      <Sel value={s.refSource} onChange={(refSource) => set({ refSource })} options={["Use Passage Reference", "Chapter Reference", "None"]} />
    </div>
  </div>
);

export const PreviewBody = ({ it, i }) => (
  <>
    <p className="text-sm font-semibold text-[#0A0847]">{i + 1}. {it.q}</p>
    <p className="text-xs font-semibold text-[#0A0847CC] mt-4 pl-4">Correct Order:</p>
    <ol className="mt-2 pl-8 space-y-2 list-decimal text-xs text-[#0A084799]">
      {it.steps.map((t) => <li key={t}>{t}</li>)}
    </ol>
  </>
);