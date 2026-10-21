import React from "react";
import { FiChevronDown, FiEdit2, FiUpload } from "react-icons/fi";
import { BsStars } from "react-icons/bs";
import AiIcon from "../../../../assets/AddQuizIcons/AiIcon.svg";

  const SvgIcon = ({ src, size = 16, className = "" }) => (
                <img src={src} alt="" width={size} height={size} className={`shrink-0 ${className}`} />
              );
  
  const AiIconSvg = (p) => <SvgIcon src={AiIcon} {...p} />;

// Mock API options
export const META_OPTIONS = {
  testaments: ["Old Testament", "New Testament"],
  books: {
    "Old Testament": ["Genesis", "Exodus", "Leviticus"],
    "New Testament": ["Matthew", "Mark", "Luke"],
  },
  chapters: ["1", "2", "3", "4", "5"],
  levels: ["Level 1", "Level 2", "Level 3", "Level 4", "Level 5"],
};


const ENTRY_METHODS = [
  { key: "manual", label: "Manual", icon: FiEdit2 },
  { key: "ai", label: "AI Generate", icon: AiIconSvg },
  { key: "csv", label: "CSV Upload", icon: FiUpload },
];

const Select = ({ label, value, onChange, options, placeholder, disabled }) => (
  <div>
    <label className="block text-xs font-semibold text-[#0A0847CC] mb-2">{label}</label>
    <div className="relative">
      <select
  value={value}
  disabled={disabled}
  onChange={(e) => onChange(e.target.value)}
  className={`w-full appearance-none border border-[#E2DFFC] rounded-md px-3 py-3 pr-9 text-xs bg-white outline-none focus:border-[#001984] cursor-pointer disabled:bg-[#F8FAFC] disabled:cursor-not-allowed disabled:opacity-70 ${
    value ? "text-[#0A0847CC]" : "text-gray-400"
  }`}
>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) =>
          typeof o === "string" ? (
            <option key={o} value={o}>{o}</option>
          ) : (
            <option key={o.key} value={o.key}>{o.label}</option>
          )
        )}
      </select>
      <FiChevronDown
        size={14}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
      />
    </div>
  </div>
);

export default function QuestionMetaHeader({
  meta, onMetaChange, typeKey, typeOptions, onTypeChange, entryMethod, onEntryMethod, disabled,
}) {
  return (
    <div className="bg-white rounded-lg border border-[#E2DFFC] p-6 space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.3fr_1.2fr_1fr_1fr_1.2fr] gap-5">
        <Select
          label="Testament"
          value={meta.testament}
          options={META_OPTIONS.testaments}
          onChange={(v) => onMetaChange({ testament: v, book: META_OPTIONS.books[v][0] })}
        />
        <Select
          label="Book"
          value={meta.book}
          options={META_OPTIONS.books[meta.testament]}
          onChange={(v) => onMetaChange({ book: v })}
        />
        <Select
          label="Chapter"
          value={meta.chapter}
          options={META_OPTIONS.chapters}
          onChange={(v) => onMetaChange({ chapter: v })}
        />
        <Select
          label="Level(s)"
          value={meta.level}
          options={META_OPTIONS.levels}
          onChange={(v) => onMetaChange({ level: v })}
        />
        <Select
          label="Question Type"
          value={typeKey}
          options={typeOptions}
          onChange={onTypeChange}
          placeholder="Select type"
        />
      </div>

      <hr className="border-[#E2DFFC]" />

      <div>
        <p className="text-xs font-semibold text-[#0A0847CC] mb-3">Entry Method</p>
        <div className="flex flex-wrap gap-4">
          {ENTRY_METHODS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => onEntryMethod(key)}
              className={`px-8 py-2.5 rounded-md border text-xs font-semibold flex items-center gap-2.5 cursor-pointer transition-colors ${
                entryMethod === key
                  ? "bg-[#001984] border-[#001984] text-white"
                  : "bg-white border-[#E2DFFC] text-[#0A0847CC] hover:bg-gray-50"
              }`}
            >
              <Icon size={16} /> {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}