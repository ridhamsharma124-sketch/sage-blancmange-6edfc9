import React from "react";
import { FiFileText, FiLayers, FiImage, FiClock } from "react-icons/fi";

export default function AISummary({ reg, s }) {
  const pass = reg.levelMode === "passages";
  const on = pass ? s.passages.filter((p) => p.on) : [];
  const total = pass ? on.reduce((a, p) => a + Number(p.n || 0), 0) : s.count;
  const levels = pass ? on.length : s.levels.length;
  const cells = [
    [FiFileText, String(total).padStart(2, "0"), "Total Questions"],
    [FiLayers, String(levels).padStart(2, "0"), "Selected Levels"],
    [FiImage, String(s.images ? total : 0).padStart(2, "0"), "Generated Images"],
    [FiClock, `~${Math.round(total * 1.5)} min`, "Estimated Review Time"],
  ];
  return (
    <div className="mt-6 pt-5 border-t border-[#E2DFFC]">
      <h4 className="text-sm font-semibold text-[#0A0847] mb-3">Generation Summary</h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border border-[#E2DFFC] rounded-md p-4">
        {cells.map(([Icon, v, l]) => (
          <div key={l}>
            <p className="flex items-center gap-2 text-sm font-semibold text-[#0A0847]"><Icon size={16} className="text-[#001984]" /> {v}</p>
            <p className="text-[11px] text-[#0A084799] font-medium mt-1">{l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}