import React from "react";
import { Row, Sel } from "../shared/aiUi";

export const config = {
  label: "Story Sequence",
  levelMode: "passages",
  footer: "publish",
  countBadge: true,
  previewSub: "Select the single correct answer.",
  summary: true,
  imageLast: true,
  previewNote: false,
  defaults: {
    count: 10,
    passages: [
      { level: "Level 1", passage: "Genesis 1:1–5", n: 2, on: true },
      { level: "Level 2", passage: "Genesis 1:6–13", n: 3, on: true },
      { level: "Level 3", passage: "Genesis 1:20–25", n: 3, on: true },
      { level: "Level 4", passage: "Genesis 1:6–13", n: 2, on: true },
    ],
    source: "Genesis 1 (Creation Account)", cards: "5 to 7", detail: "Standard",
    shuffle: true, partial: true, noAmbiguity: true,
  },
  samples: [
    { q: "Place the events in the correct order.", options: ["The sun and moon", "The dry land", "The plants and trees", "The seas and land"], seq: "C → D → B → A" },
    { q: "Place these events in the correct order.", options: ["God created the birds", "God created the fish", "God blessed them", "He said, “Be fruitful”"], seq: "B → A → C → D" },
    { q: "Place the events in the correct order.", options: ["God formed the animals", "God made man", "God planted the garden", "God breathed life into man"], seq: "C → A → B → D" },
  ],
};

export const Settings = ({ s, set }) => (
  <div className="space-y-4">
    <h4 className="text-sm font-semibold text-[#0A0847]">Story Sequence Settings</h4>
    <div>
      <p className="text-sm font-semibold text-[#0A0847] mb-2">Story or Passage Source</p>
      <Sel value={s.source} onChange={(source) => set({ source })} options={["Genesis 1 (Creation Account)", "Genesis 6–9 (Noah)", "Exodus 1–14 (The Exodus)"]} />
    </div>
    <div>
      <p className="text-sm font-semibold text-[#0A0847] mb-2">Number of Sequence Cards</p>
      <Sel value={s.cards} onChange={(cards) => set({ cards })} options={["3 to 4", "4 to 5", "5 to 7", "7 to 10"]} />
    </div>
    <div>
      <p className="text-sm font-semibold text-[#0A0847] mb-2">Event Detail Level</p>
      <Sel value={s.detail} onChange={(detail) => set({ detail })} options={["Brief", "Standard", "Detailed"]} />
    </div>
    <Row label="Shuffle cards for every question" checked={s.shuffle} onChange={(shuffle) => set({ shuffle })} />
    <Row label="Allow partial credit" checked={s.partial} onChange={(partial) => set({ partial })} />
    <Row label="Prevent ambiguous order" checked={s.noAmbiguity} onChange={(noAmbiguity) => set({ noAmbiguity })} />
  </div>
);

export const PreviewBody = ({ it, i }) => (
  <>
    <p className="text-sm font-semibold text-[#0A0847]">{i + 1}. {it.q}</p>
    <div className="mt-3 pl-5 space-y-2">
      {it.options.map((o, k) => <p key={o} className="text-xs text-[#0A084799]">{"ABCDEF"[k]}. {o}</p>)}
    </div>
    <p className="mt-3 inline-block px-4 py-2 rounded-md bg-[#F4F9E1] text-sm font-semibold text-[#001984]">Correct Sequence: {it.seq}</p>
  </>
);