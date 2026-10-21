import React from "react";

export const inputCls =
  "w-full border border-[#E2DFFC] rounded-md px-3 py-3 text-xs text-[#0A0847] placeholder-gray-400 bg-white outline-none focus:border-[#001984] transition-all";
export const errCls = "!border-[#EB0C10]";

export const Card = ({ title, optional, subtitle, children, className = "" }) => (
  <div className={`bg-white border border-[#E2DFFC] rounded-lg p-5 ${className}`}>
    {title && (
      <h3 className="text-sm font-semibold text-[#0A0847]">
        {title}
        {optional && <span className="font-normal text-[#0A084799]"> (Optional)</span>}
      </h3>
    )}
    {subtitle && <p className="text-xs text-[#0A084799] font-medium mt-1">{subtitle}</p>}
    <div className={title || subtitle ? "mt-3" : ""}>{children}</div>
  </div>
);

export const Label = ({ children, optional }) => (
  <label className="block text-xs font-semibold text-[#0A0847CC] mb-1.5">
    {children}
    {optional && <span className="font-normal text-[#0A084799]"> (Optional)</span>}
  </label>
);

export const Counter = ({ value = "", max }) => (
  <p className="text-[10px] italic text-[#0A084799] text-right mt-1.5">
    {value.length}/{max}
  </p>
);

export const FieldError = ({ children }) =>
  children ? <p className="text-[10px] text-[#EB0C10] mt-1">{children}</p> : null;

export const Toggle = ({ checked, onChange, tone = "green" }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className={`w-9 h-5 rounded-full p-0.5 transition-colors shrink-0 cursor-pointer ${
      checked ? (tone === "blue" ? "bg-[#001984]" : "bg-[#1BA155]") : "bg-gray-300"
    }`}
  >
    <span className={`block w-4 h-4 rounded-full bg-white transition-transform ${checked ? "translate-x-4" : ""}`} />
  </button>
);