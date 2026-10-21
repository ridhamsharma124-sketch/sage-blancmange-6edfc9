import React from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Card, Toggle, FieldError, inputCls, errCls } from "../Shared/ui";
import ExplanationFields from "../Shared/ExplanationFields";

export const config = {
  label: "True / False",
  subtitle: "Add True / False",
  badge: "type", // header: type pill next to subtitle
  statusHint: true,
  metaEditable: false,
  initialData: () => ({
    statement: "God created light before the sun and moon.",
    correct: "true",
    allowNotStated: false,
    explanation: "Genesis 1:3–5 describes God creating light before the sun, moon, and stars.",
    scripture: "Genesis 1:3–5",
    hint: "Check the order of creation in the first chapter.",
  }),
  validate: (d) => {
    const e = {};
    if (!d.statement.trim()) e.statement = "Statement is required.";
    return e;
  },
};

const Option = ({ value, label, active, onPick, icon }) => (
  <label
    className={`relative h-40 rounded-md border flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors ${
      active ? "border-[#001984] bg-white" : "border-[#E2DFFC] bg-white hover:bg-gray-50"
    }`}
  >
    <input type="radio" name="tf" checked={active} onChange={() => onPick(value)}
      className="absolute top-4 left-4 accent-[#1BA155] w-5 h-5" />
    {icon}
    <span className="text-base font-semibold text-[#0A0847CC]">{label}</span>
  </label>
);

export default function TrueFalseForm({ data, onChange, errors }) {
  return (
    <div className="space-y-5">
      <Card title="Statement">
        <input
          value={data.statement}
          onChange={(e) => onChange({ statement: e.target.value })}
          className={`${inputCls} ${errors.statement ? errCls : ""}`}
        />
        <p className="text-[10px] italic text-[#0A084799] mt-2">Write a clear and concise statement for the user to evaluate.</p>
        <FieldError>{errors.statement}</FieldError>
      </Card>

      <Card title="Correct Answer">
        <div className="grid grid-cols-2 gap-5">
          <Option value="true" label="True" active={data.correct === "true"} onPick={(v) => onChange({ correct: v })}
            icon={<FaCheckCircle size={32} className="text-[#1BA155]" />} />
          <Option value="false" label="False" active={data.correct === "false"} onPick={(v) => onChange({ correct: v })}
            icon={<FaTimesCircle size={32} className="text-[#EB0C10]" />} />
        </div>
        <hr className="border-[#E2DFFC] my-5" />
        <div className="flex items-center justify-between gap-6">
          <div>
            <p className="text-sm font-semibold text-[#0A0847]">
              Allow “Not stated” <span className="font-normal text-[#0A084799]">(Optional)</span>
            </p>
            <p className="text-xs text-[#0A084799] font-medium mt-2">
              Allow users to choose “Not stated” if the answer is not explicitly mentioned in Scripture.
            </p>
          </div>
          <Toggle checked={data.allowNotStated} onChange={(v) => onChange({ allowNotStated: v })} />
        </div>
      </Card>

      <ExplanationFields data={data} onChange={onChange} layout="stacked" />
    </div>
  );
}