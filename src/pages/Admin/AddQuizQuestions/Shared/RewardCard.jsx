import React from "react";
import { FiStar } from "react-icons/fi";
import { inputCls } from "./ui";

export default function RewardCard({ points, onChange }) {
  return (
    <div className="bg-white border border-[#E2DFFC] rounded-lg p-5">
      <h3 className="text-sm font-semibold text-[#0A0847] flex items-center gap-2 mb-3">
        <FiStar size={16} className="text-[#F5B301] fill-[#F5B301]" /> Reward Points
      </h3>
      <input type="number" min={0} value={points} onChange={(e) => onChange(e.target.value)} className={inputCls} />
    </div>
  );
}