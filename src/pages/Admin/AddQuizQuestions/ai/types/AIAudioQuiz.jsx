import React from "react";
import { FiPlay } from "react-icons/fi";
import { Sel, Check } from "../shared/aiUi";

export const config = {
  label: "Audio Quiz",
  levelMode: "rows",
  showSaveDraft: false,
  previewLayout: "stacked",
  previewSub: false,
  previewNote: false,
  audio: true,
  defaults: {
    count: 10,
    rows: [{ level: "Level 1", diff: "Easy", n: 4 }, { level: "Level 2", diff: "Medium", n: 3 }, { level: "Level 3", diff: "Hard", n: 3 }],
    audioSource: "ai", voice: "Male – Warm & Clear", speed: "Normal", contentType: "Bible Passage",
    clip: "30–45 seconds", opening: "Yes", transcript: true, focus: "Comprehension",
  },
  samples: [
    { q: "Listen to the audio and answer the question.", sub: "According to Genesis 1, what happened on the first day?" },
    { q: "Listen to the audio and answer the question.", sub: "What did God say about the light on the fourth day?" },
  ],
};

const F = ({ label, children }) => (
  <div><p className="text-sm font-semibold text-[#0A0847] mb-2">{label}</p>{children}</div>
);

export const Settings = ({ s, set }) => (
  <div className="space-y-4">
    <h4 className="text-sm font-semibold text-[#0A0847]">Audio Quiz Settings</h4>
    <div className="grid grid-cols-2 border border-[#E2DFFC] rounded-md overflow-hidden text-xs font-semibold">
      {[["ai", "AI Voice"], ["upload", "Upload Audio"]].map(([k, l]) => (
        <button key={k} type="button" onClick={() => set({ audioSource: k })}
          className={`py-2.5 cursor-pointer ${s.audioSource === k ? "bg-[#001984] text-white" : "bg-[#F3F2FF] text-[#0A0847CC]"}`}>{l}</button>
      ))}
    </div>
    {s.audioSource === "upload" ? (
      <p className="text-xs italic text-[#0A084799]">Audio files are uploaded per question after generation.</p>
    ) : (
      <div className="grid grid-cols-2 gap-4">
        <F label="Voice"><Sel value={s.voice} onChange={(voice) => set({ voice })} options={["Male – Warm & Clear", "Female – Calm", "Female – Bright"]} /></F>
        <F label="Reading Speed"><Sel value={s.speed} onChange={(speed) => set({ speed })} options={["Slow", "Normal", "Fast"]} /></F>
      </div>
    )}
    <div className="grid grid-cols-2 gap-4">
      <F label="Audio Content Type"><Sel value={s.contentType} onChange={(contentType) => set({ contentType })} options={["Bible Passage", "Narration", "Story"]} /></F>
      <F label="Clip Length"><Sel value={s.clip} onChange={(clip) => set({ clip })} options={["15–30 seconds", "30–45 seconds", "45–60 seconds"]} /></F>
    </div>
    <F label="Include Opening Content"><Sel value={s.opening} onChange={(opening) => set({ opening })} options={["Yes", "No"]} /></F>
    <Check label="Provide Transcript" checked={s.transcript} onChange={(transcript) => set({ transcript })} />
    <div className="flex items-center justify-between gap-4">
      <p className="text-sm font-semibold text-[#0A0847]">Question Focus</p>
      <Sel className="w-48" value={s.focus} onChange={(focus) => set({ focus })} options={["Comprehension", "Recall", "Detail"]} />
    </div>
  </div>
);

export const PreviewBody = ({ it, i }) => (
  <>
    <div className="flex items-center gap-4 bg-[#F8FAFC] border border-[#E2DFFC] rounded-md px-4 py-3 mb-4">
      <span className="w-11 h-11 rounded-full bg-[#001984] text-white flex items-center justify-center shrink-0"><FiPlay size={16} className="ml-0.5" /></span>
      <div className="flex-1 flex items-center gap-[2px] h-10">
        {Array.from({ length: 60 }).map((_, k) => (
          <span key={k} className="flex-1 rounded-full bg-[#001984]" style={{ height: `${8 + ((k * 37) % 24)}px` }} />
        ))}
      </div>
      <span className="text-[11px] font-medium text-[#0A0847CC] tabular-nums">00:00 / 00:38</span>
    </div>
    <p className="text-sm font-semibold text-[#0A0847]">{i + 1}. {it.q}</p>
    <p className="text-xs text-[#0A084799] pl-4">{it.sub}</p>
  </>
);