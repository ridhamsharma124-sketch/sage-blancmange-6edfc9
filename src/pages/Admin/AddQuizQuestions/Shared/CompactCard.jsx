import React from "react";
import { FiStar, FiChevronDown } from "react-icons/fi";

export const CompactReward = ({ points, onChange }) => (
  <div className="bg-white border border-[#E2DFFC] rounded-lg p-4">
    <p className="text-xs font-medium text-[#0A084799]">Reward Points</p>
    <div className="flex items-center gap-2 mt-2">
      <FiStar size={16} className="text-[#F5B301] fill-[#F5B301]" />
      <input
        type="number"
        min={0}
        value={points}
        onChange={(e) => onChange(e.target.value)}
        className="w-full text-sm font-semibold text-[#0A0847CC] outline-none bg-transparent"
      />
    </div>
  </div>
);

export const CompactStatus = ({ active, onChange }) => (
  <div className="bg-white border border-[#E2DFFC] rounded-lg p-4">
    <p className="text-xs font-medium text-[#0A084799]">Status</p>
    <div className="relative flex items-center gap-2 mt-2">
      <span className={`w-2 h-2 rounded-full ${active ? "bg-[#1BA155]" : "bg-gray-400"}`} />
      <select
        value={active ? "active" : "inactive"}
        onChange={(e) => onChange(e.target.value === "active")}
        className={`w-full appearance-none bg-transparent outline-none text-sm font-semibold cursor-pointer ${
          active ? "text-[#1BA155]" : "text-gray-500"
        }`}
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      <FiChevronDown size={14} className="absolute right-0 text-gray-400 pointer-events-none" />
    </div>
  </div>
);