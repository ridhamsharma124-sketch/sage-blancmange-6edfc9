import React from "react";
import { Sel, Check } from "../shared/aiUi";
import { inputCls } from "../../Shared/ui";

export const config = {
  label: "Who Am I",
  levelMode: "rows",
  showSaveDraft: false,
  defaults: {
    count: 10,
    rows: [{ level: "Level 1", diff: "Easy", n: 4 }, { level: "Level 2", diff: "Medium", n: 3 }, { level: "Level 3", diff: "Hard", n: 3 }],
    scope: "People in Genesis 1", clues: "5 clues", progressive: true, excludeName: true, aliases: "",
  },
  samples: [
    { q: "I was the first man created by God. Who am I?", clues: ["God formed me from the dust of the ground.", "God breathed life into me.", "I was placed in the Garden of Eden.", "I named the animals.", "I had a wife given to me."] },
    { q: "I was created from the rib of the first man. Who am I?", clues: ["God caused the man to sleep.", "I was made from one of his ribs.", "I was brought to the man.", "I became his partner.", "I was given the name “woman.”"] },
  ],
};

export const Settings = ({ s, set }) => (
  <div className="space-y-4">
    <h4 className="text-sm font-semibold text-[#0A0847]">Who Am I Settings</h4>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <p className="text-sm font-semibold text-[#0A0847] mb-2">Character Scope</p>
        <Sel value={s.scope} onChange={(scope) => set({ scope })} options={["People in Genesis 1", "People in Genesis", "All Old Testament"]} />
      </div>
      <div>
        <p className="text-sm font-semibold text-[#0A0847] mb-2">Clue Count</p>
        <Sel value={s.clues} onChange={(clues) => set({ clues })} options={["3 clues", "4 clues", "5 clues", "6 clues"]} />
      </div>
    </div>
    <Check label="Use Progressive Clues" checked={s.progressive} onChange={(progressive) => set({ progressive })} />
    <Check label="Exclude Character’s Name from Clues" checked={s.excludeName} onChange={(excludeName) => set({ excludeName })} />
    <div>
      <p className="text-sm font-semibold text-[#0A0847] mb-2">Answer Aliases <span className="font-normal text-[#0A084799]">(comma separated)</span></p>
      <input value={s.aliases} onChange={(e) => set({ aliases: e.target.value })} placeholder="e.g., Adam, Man, First man" className={inputCls} />
    </div>
  </div>
);

export const PreviewBody = ({ it, i }) => (
  <>
    <p className="text-sm font-semibold text-[#0A0847]">{i + 1}. {it.q}</p>
    <ol className="mt-3 pl-5 space-y-2 list-decimal text-xs text-[#0A084799]">
      {it.clues.map((c) => <li key={c}>{c}</li>)}
    </ol>
  </>
);