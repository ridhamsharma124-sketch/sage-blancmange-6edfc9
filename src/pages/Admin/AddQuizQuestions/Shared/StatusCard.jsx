import React from "react";
import { FiUsers } from "react-icons/fi";
import { Toggle } from "./ui";

export default function StatusCard({ active, onChange, showHint }) {
  return (
    <div className="bg-white border border-[#E2DFFC] rounded-lg p-5">
      <h3 className="text-sm font-semibold text-[#0A0847] flex items-center gap-2 mb-3">
        <FiUsers size={16} className="text-gray-500" /> Status
      </h3>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className={`text-sm font-semibold ${active ? "text-[#1BA155]" : "text-gray-500"}`}>
            {active ? "Active" : "Inactive"}
          </p>
          {showHint && (
            <p className="text-[10px] text-[#0A084799] font-medium mt-1">
              {active ? "Question is active and visible to users." : "Question is hidden from users."}
            </p>
          )}
        </div>
        <Toggle checked={active} onChange={onChange} />
      </div>
    </div>
  );
}