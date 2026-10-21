import React from "react";
import { FiChevronDown, FiInfo, FiCheck } from "react-icons/fi";
import { Toggle, inputCls } from "../../Shared/ui";

export const Sel = ({ value, onChange, options, className = "" }) => (
  <div className={`relative ${className}`}>
    <select value={value} onChange={(e) => onChange(e.target.value)}
      className={`${inputCls} appearance-none pr-9 cursor-pointer`}>
      {options.map((o) =>
        typeof o === "object" ? <option key={o.key} value={o.key}>{o.label}</option> : <option key={o}>{o}</option>
      )}
    </select>
    <FiChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
  </div>
);

export const H = ({ children }) => <p className="text-sm font-semibold text-[#0A0847] mb-2">{children}</p>;
export const Info = () => <FiInfo size={13} className="text-gray-400 inline ml-1.5 -mt-0.5" />;

export const Row = ({ label, desc, info, checked, onChange }) => (
  <div className="flex items-center justify-between gap-4">
    <div>
      <p className="text-xs font-semibold text-[#0A0847CC]">{label}{info && <Info />}</p>
      {desc && <p className="text-[10px] text-[#0A084799] font-medium">{desc}</p>}
    </div>
    <Toggle tone="blue" checked={checked} onChange={onChange} />
  </div>
);

export const Pick = ({ label, value, onChange, from, to }) => (
  <div className="flex items-center justify-between gap-4">
    <p className="text-xs font-semibold text-[#0A0847CC]">{label}</p>
    <Sel className="w-20" value={String(value)} onChange={(v) => onChange(Number(v))}
      options={Array.from({ length: Math.max(to - from + 1, 1) }, (_, i) => String(from + i))} />
  </div>
);

export const Check = ({ label, checked, onChange }) => (
  <button type="button" onClick={() => onChange(!checked)} className="flex items-center gap-3 cursor-pointer">
    <span className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
      checked ? "bg-[#001984] border-[#001984] text-white" : "border-[#0A0847CC] bg-white"}`}>
      {checked && <FiCheck size={11} strokeWidth={3} />}
    </span>
    <span className="text-xs font-medium text-[#0A0847CC]">{label}</span>
  </button>
);