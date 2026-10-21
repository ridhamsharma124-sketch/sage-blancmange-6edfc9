import React from "react";
import { FiX, FiCheck, FiAlertCircle } from "react-icons/fi";
import { H, Info, Sel } from "./aiUi";
import { ALL_LEVELS, DIFFICULTIES, distribute } from "./aiUtils";

const LEVEL_TAGS = [["Level 1", "Easy", "text-[#0A0847CC]"], ["Level 2", "Medium", "text-[#0A0847CC]"], ["Level 3", "Hard", "text-[#EB0C10]"]];

const Total = ({ total, count }) => {
  const ok = total === count && total > 0;
  return (
    <span className="flex items-center gap-2">
      {total} / {count}
      {ok ? <FiCheck size={15} className="text-[#1BA155]" /> : <FiAlertCircle size={15} className="text-[#EB0C10]" />}
    </span>
  );
};

const Chips = ({ s, set }) => {
  const addable = ALL_LEVELS.filter((l) => !s.levels.includes(l));
  return (
    <div>
      <p className="text-xs font-semibold text-[#0A0847CC] mb-2">Assign to Levels</p>
      <div className="flex flex-wrap items-center gap-2 border border-[#E2DFFC] rounded-md p-2">
        {s.levels.map((l) => (
          <span key={l} className="px-2.5 py-1.5 rounded-lg bg-[#F5F4FE] border border-[#E2DFFC] text-[11px] font-semibold text-[#0A0847CC] flex items-center gap-2">
            {l}
            <button type="button" onClick={() => set({ levels: s.levels.filter((x) => x !== l) })} className="cursor-pointer">
              <FiX size={12} className="text-[#0926FD]" />
            </button>
          </span>
        ))}
        {/* {addable.length > 0 && (
          <select value="" onChange={(e) => e.target.value && set({ levels: [...s.levels, e.target.value] })}
            className="ml-auto text-xs text-gray-500 outline-none bg-transparent cursor-pointer">
            <option value="">Add level…</option>
            {addable.map((l) => <option key={l}>{l}</option>)}
          </select>
        )} */}
      </div>
    </div>
  );
};

/** table: split across assigned levels | perLevel: 3 count cards | rows: level + difficulty + count */
export default function LevelsSection({ mode, s, set }) {
  if (mode === "perLevel") {
    const total = s.perLevel.reduce((a, b) => a + Number(b || 0), 0);
    return (
      <div>
        <H>Questions per Level<Info /></H>
        <div className="grid grid-cols-3 gap-3">
          {LEVEL_TAGS.map(([l, d, c], i) => (
            <div key={l} className="flex items-center justify-between border border-[#E2DFFC] rounded-md px-3 py-2">
              <div className="text-[11px] font-semibold text-[#0A0847CC] leading-tight">{l}<br /><span className={c}>{d}</span></div>
              <input type="number" min={0} value={s.perLevel[i]}
                onChange={(e) => set({ perLevel: s.perLevel.map((v, j) => (j === i ? e.target.value : v)) })}
                className="w-11 h-10 border border-[#E2DFFC] rounded-md text-center text-sm outline-none focus:border-[#001984]" />
            </div>
          ))}
        </div>
        <p className="mt-3 text-sm font-semibold text-[#0A0847] flex items-center gap-2">
          Total Questions: <Total total={total} count={s.count} />
        </p>
      </div>
    );
  }

  if (mode === "rows") {
    const total = s.rows.reduce((a, r) => a + Number(r.n || 0), 0);
    const setRow = (i, p) => set({ rows: s.rows.map((r, j) => (j === i ? { ...r, ...p } : r)) });
    return (
      <>
        <Chips s={s} set={set} />
        <div>
          <p className="text-xs font-semibold text-[#0A0847CC] mb-3">Questions per Level<Info /></p>
          <div className="space-y-3">
            {s.rows.map((r, i) => (
              <div key={r.level} className="grid grid-cols-[64px_1fr_72px] gap-3 items-center">
                <span className="text-xs font-semibold text-[#0A0847CC]">{r.level}</span>
                <Sel value={r.diff} onChange={(diff) => setRow(i, { diff })} options={DIFFICULTIES} />
                <input type="number" min={0} value={r.n} onChange={(e) => setRow(i, { n: e.target.value })}
                  className="h-11 border border-[#E2DFFC] rounded-md px-3 text-sm text-[#0A0847CC] outline-none focus:border-[#001984]" />
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between text-xs font-semibold text-[#0A0847]">
            Total Questions <Total total={total} count={s.count} />
          </div>
        </div>
      </>
    );
  }

    if (mode === "passages") {
    const on = s.passages.filter((p) => p.on);
    const off = s.passages.filter((p) => !p.on);
    const total = on.reduce((a, p) => a + Number(p.n || 0), 0);
    const setP = (level, patch) => set({ passages: s.passages.map((p) => (p.level === level ? { ...p, ...patch } : p)) });
    const Box = ({ checked, onClick }) => (
      <button type="button" onClick={onClick}
        className={`w-4 h-4 rounded border-2 flex items-center justify-center cursor-pointer ${checked ? "bg-[#001984] border-[#001984] text-white" : "border-[#0A0847CC] bg-white"}`}>
        {checked && <FiCheck size={10} strokeWidth={3} />}
      </button>
    );
    return (
      <>
        <div>
          <p className="text-xs font-semibold text-[#0A0847CC] mb-2">Selected Levels</p>
          <div className="flex flex-wrap items-center gap-2 border border-[#E2DFFC] rounded-md p-2">
            {on.map((p) => (
              <span key={p.level} className="px-2.5 py-1.5 rounded bg-[#F3F2FF] border border-[#E2DFFC] text-[11px] font-medium text-[#0A0847CC] flex items-center gap-2">
                {p.level}
                <button type="button" onClick={() => setP(p.level, { on: false })} className="cursor-pointer"><FiX size={12} className="text-[#001984]" /></button>
              </span>
            ))}
            {off.length > 0 && (
              <select value="" onChange={(e) => e.target.value && setP(e.target.value, { on: true })}
                className="ml-auto text-xs text-gray-500 outline-none bg-transparent cursor-pointer">
                <option value="">Add level…</option>
                {off.map((p) => <option key={p.level}>{p.level}</option>)}
              </select>
            )}
          </div>
        </div>
        <div className="border border-[#E2DFFC] rounded-md overflow-hidden text-xs text-[#0A0847CC]">
          <div className="grid grid-cols-[28px_1fr_1.4fr_80px] gap-2 items-center px-3 py-2.5 bg-[#F3F7FD] font-semibold">
            <Box checked={on.length === s.passages.length} onClick={() => set({ passages: s.passages.map((p) => ({ ...p, on: on.length !== s.passages.length })) })} />
            <span>Level</span><span>Bible Passage</span><span>Questions</span>
          </div>
          {s.passages.map((p) => (
            <div key={p.level} className="grid grid-cols-[28px_1fr_1.4fr_80px] gap-2 items-center px-3 py-2.5 border-t border-[#E2DFFC]">
              <Box checked={p.on} onClick={() => setP(p.level, { on: !p.on })} />
              <span>{p.level}</span>
              <span className="font-medium">{p.passage}</span>
              <input type="number" min={0} value={p.n} onChange={(e) => setP(p.level, { n: e.target.value })}
                className="w-14 h-8 border border-[#E2DFFC] rounded text-center outline-none focus:border-[#001984]" />
            </div>
          ))}
          <div className="flex items-center justify-between px-4 py-2.5 border-t border-[#E2DFFC] font-semibold text-[#0A0847]">
            Total Questions <Total total={total} count={s.count} />
          </div>
        </div>
      </>
    );
  }

  const rows = distribute(s.count, s.levels.length);
  return (
    <>
      <Chips s={s} set={set} />
      <div>
        <H>Questions per Level</H>
        <div className="border border-[#E2DFFC] rounded-md overflow-hidden text-xs">
          <div className="grid grid-cols-2 bg-[#F5F6F9] font-semibold text-[#0A0847CC]">
            <span className="px-4 py-2.5">Level</span>
            <span className="px-4 py-2.5 border-l border-[#E2DFFC]">Questions</span>
          </div>
          {s.levels.map((l, i) => (
            <div key={l} className="grid grid-cols-2 border-t border-[#E2DFFC] text-[#0A0847CC]">
              <span className="px-4 py-2.5">{l}</span>
              <span className="px-4 py-2.5 border-l border-[#E2DFFC]">{rows[i]}</span>
            </div>
          ))}
          <div className="flex items-center justify-between px-4 py-2.5 border-t border-[#E2DFFC] font-semibold text-[#0A0847]">
            Total Questions <Total total={rows.reduce((a, b) => a + b, 0)} count={s.count} />
          </div>
        </div>
      </div>
    </>
  );
}