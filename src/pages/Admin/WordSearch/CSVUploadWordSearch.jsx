import { useRef, useState } from "react";
import {
  LuAudioWaveform,
  LuBookOpen,
  LuCheck,
  LuChevronDown,
  LuCloudUpload,
  LuDownload,
  LuGrid3X3,
  LuSettings,
} from "react-icons/lu";
import chapterDefaultImage from "../../../assets/word search/Chapter Default Image.png";

/* ==========================================================================
   DATA
   ========================================================================== */
const FILTERS = [
  {
    id: "testament",
    label: "Testament",
    value: "Old Testament",
    options: ["Old Testament", "New Testament"],
  },
  { id: "book", label: "Book", value: "Genesis", options: ["Genesis", "Exodus", "Psalms", "John"] },
  { id: "chapter", label: "Chapter", value: "1", options: ["1", "2", "3"] },
  { id: "level", label: "Level", value: "Level 1", options: ["Level 1", "Level 2", "Level 3"] },
];

const WORD_SEARCH_TYPES = [
  {
    id: "hidden",
    title: "Hidden Restoration",
    description: "Find hidden Bible words from clues.",
    Glyph: LuGrid3X3,
    columns: [
      { name: "clue", type: "Text", description: "Puzzle clue" },
      { name: "answer", type: "Text", description: "Hidden word answer" },
      { name: "created_by", type: "Text", description: "Creator name (optional)" },
      { name: "difficulty", type: "Number", description: "1=Easy, 2=Medium, 3=Hard" },
      { name: "reward_points", type: "Number", description: "Points for correct answer" },
    ],
  },
  {
    id: "verse",
    title: "Verse Restoration",
    description: "Restore missing words in a verse.",
    Glyph: LuSettings,
    columns: [
      { name: "verse", type: "Text", description: "Full verse text" },
      { name: "missing_word", type: "Text", description: "Blanked out word" },
      { name: "created_by", type: "Text", description: "Creator name (optional)" },
      { name: "difficulty", type: "Number", description: "1=Easy, 2=Medium, 3=Hard" },
      { name: "reward_points", type: "Number", description: "Points for correct answer" },
    ],
  },
  {
    id: "audio",
    title: "Audio Revelation",
    description: "Listen and identify the correct answer.",
    Glyph: LuAudioWaveform,
    columns: [
      { name: "audio_url", type: "Text", description: "Audio file URL" },
      { name: "clue", type: "Text", description: "Puzzle clue" },
      { name: "created_by", type: "Text", description: "Creator name (optional)" },
      { name: "difficulty", type: "Number", description: "1=Easy, 2=Medium, 3=Hard" },
      { name: "reward_points", type: "Number", description: "Points for correct answer" },
    ],
  },
  {
    id: "mystery",
    title: "Mystery Scripture",
    description: "Reveal the hidden Scripture.",
    Glyph: LuBookOpen,
    columns: [
      { name: "scripture", type: "Text", description: "Hidden Scripture text" },
      { name: "clue", type: "Text", description: "Puzzle clue" },
      { name: "created_by", type: "Text", description: "Creator name (optional)" },
      { name: "difficulty", type: "Number", description: "1=Easy, 2=Medium, 3=Hard" },
      { name: "reward_points", type: "Number", description: "Points for correct answer" },
    ],
  },
];

/* ==========================================================================
   FILTER SELECT
   ========================================================================== */
function FilterSelect({ id, label, value, options, onChange }) {
  return (
    <div className="w-[229px] shrink-0">
      <label
        htmlFor={id}
        className="mb-2 block text-[12px] leading-[15px] font-semibold text-[#0A0847]"
      >
        {label}
      </label>

      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-[40px] w-[229px] cursor-pointer appearance-none rounded-[7.47px] border border-[#E2DFFC] bg-white pr-8 pl-3 text-[12px] text-[#0A0847]/60 outline-none focus:border-[#0A0847]/40"
        >
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>

        <LuChevronDown
          size={12}
          strokeWidth={1.8}
          className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[#0A0847]/60"
          aria-hidden
        />
      </div>
    </div>
  );
}

/* ==========================================================================
   WORD SEARCH TYPE CARD
   ========================================================================== */
function TypeCard({ id, title, description, Glyph, selected, onSelect }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={() => onSelect(id)}
      className={`relative flex h-[156px] flex-1 cursor-pointer flex-col items-center justify-center gap-[10px] rounded-[7.5px] border-[0.75px] px-6 py-[14px] text-center transition-colors ${
        selected
          ? "border-[#001984] bg-[#F1F0FB]"
          : "border-[#E2DFFC] bg-white hover:bg-[#EDEFF8]"
      }`}
    >
      <Glyph size={46} strokeWidth={1.2} className="shrink-0 text-[#0A0847]" aria-hidden />

      <span className="text-[13px] font-semibold text-[#0A0847]">{title}</span>

      <span className="max-w-[150px] min-h-[26px] text-[11px] leading-[1.3] text-[#0A0847]/60">
        {description}
      </span>

      {selected && (
        <span className="absolute -top-2.5 -right-2.5 flex h-[20px] w-[20px] items-center justify-center rounded-full bg-[#001984]">
          <LuCheck size={12} strokeWidth={2.5} className="text-white" aria-hidden />
        </span>
      )}
    </button>
  );
}

/* ==========================================================================
   UPLOAD DROP ZONE
   ========================================================================== */
function UploadBox() {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.name.toLowerCase().endsWith(".csv")) {
      e.dataTransfer.clearData();
    }
  };

  return (
    <div
      onDragEnter={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setDragging(false);
      }}
      onDrop={onDrop}
      onClick={() => inputRef.current?.click()}
      className={`csv-dash mt-2.5 flex h-[195px] w-full cursor-pointer flex-col items-center justify-center gap-1 rounded-[7.5px] px-6 py-5 transition-colors ${
        dragging ? "border-[#0A0847]/60 bg-[#E4E7F4]" : "border-[#0A0847]/40 bg-[#EDEFF8]"
      }`}
    >
      <LuCloudUpload size={36} strokeWidth={1.2} className="shrink-0 text-[#0A0847]" aria-hidden />

      <p className="text-[11px] text-[#0A0847]/60">Drag and drop your CSV file here</p>

      <p className="text-[11px] text-[#0A0847]/60">or</p>

      <button
        type="button"
        className="mt-0.5 flex h-[30px] w-[100px] cursor-pointer items-center justify-center rounded-[6px] bg-[#001984] text-[11px] font-semibold text-white transition-opacity hover:opacity-90"
      >
        Browse File
      </button>

      <div className="flex items-center gap-3 text-[10px] text-[#0A0847]/60">
        <span>Accepted format: .csv only</span>
        <span className="h-[3px] w-[3px] shrink-0 rounded-full bg-[#0A0847]/60" />
        <span>Max file size: 10MB</span>
        <span className="h-[3px] w-[3px] shrink-0 rounded-full bg-[#0A0847]/60" />
        <span>Max 1,000 rows</span>
      </div>

      <input ref={inputRef} type="file" accept=".csv" className="hidden" />
    </div>
  );
}

/* ==========================================================================
   REQUIRED COLUMNS PREVIEW
   ========================================================================== */
function ColumnsPreview({ typeTitle, columns }) {
  /* Figma breaks the 5 chips after the 4th one (2nd row holds reward_points). */
  const chipRows = [columns.slice(0, 4), columns.slice(4)];

  return (
    <div className="mt-6 w-full rounded-[7.5px] border-[0.75px] border-[#E2DFFC] bg-[#EDEFF8] p-4">
      <p className="text-[11px] font-semibold text-[#0A0847]">
        Required Columns Preview ({typeTitle})
      </p>

      <div className="mt-3 flex flex-col gap-[10px]">
        {chipRows.map((row, ri) => (
          <div key={ri} className="flex flex-wrap gap-[10px]">
            {row.map(({ name, type, description }) => (
              <div
                key={name}
                className="flex h-[54px] shrink-0 flex-col justify-center gap-[10px] rounded-[7.5px] border-[0.75px] border-[#E2DFFC] bg-white px-3 py-[10px]"
              >
                <p className="text-[11px] leading-none whitespace-nowrap">
                  <span className="font-semibold text-[#0A0847]">{name}</span>{" "}
                  <span className="font-normal text-[#0A0847]/60">({type})</span>
                </p>
                <p className="text-[9px] leading-none whitespace-nowrap text-[#0A0847]/60">
                  {description}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ==========================================================================
   PAGE
   ========================================================================== */
export default function CSVUploadWordSearch() {
  const [typeId, setTypeId] = useState("hidden");
  const [filterValues, setFilterValues] = useState(() =>
    FILTERS.reduce((acc, f) => ({ ...acc, [f.id]: f.value }), {}),
  );

  const activeType = WORD_SEARCH_TYPES.find((t) => t.id === typeId);

  return (
    <div className="min-h-[calc(100vh-72px)] bg-[#F9FAFE] font-inter text-[#0A0847]">
      <div className="mx-auto w-full max-w-[1110px] px-6 pt-10 pb-6">
        {/* ---------------- header ---------------- */}
        <p className="text-[14px] font-normal text-[#6B6A80]">
          Add / Edit Word Search - CSV Upload
        </p>

        <h1 className="mt-1.5 text-[22px] leading-none font-semibold text-[#0A0847]">
          1. CSV Upload - Choose Type &amp; File
        </h1>

        <p className="mt-1.5 text-[14px] font-normal text-[#0A0847]/60">
          Choose the word search type, select your Bible content, and upload your CSV file.
        </p>

        {/* ---------------- filter row ---------------- */}
        <div className="mt-4 flex w-full gap-6">
          {FILTERS.map(({ id, label, options }) => (
            <FilterSelect
              key={id}
              id={id}
              label={label}
              value={filterValues[id]}
              options={options}
              onChange={(v) => setFilterValues((prev) => ({ ...prev, [id]: v }))}
            />
          ))}
        </div>

        {/* ---------------- 1. word search type ---------------- */}
        <h2 className="mt-5 text-[14px] font-semibold text-[#0A0847]">1. Choose Word Search Type</h2>

        <div className="mt-2 flex w-full gap-4">
          {WORD_SEARCH_TYPES.map(({ id, title, description, Glyph }) => (
            <TypeCard
              key={id}
              id={id}
              title={title}
              description={description}
              Glyph={Glyph}
              selected={typeId === id}
              onSelect={setTypeId}
            />
          ))}
        </div>

        {/* ---------------- two column area ---------------- */}
        <div className="mt-5 flex gap-6">
          {/* left */}
          <div className="flex w-[657px] flex-col">
            {/* 2. download csv template */}
            <div>
              <h3 className="text-[14px] leading-[17px]">
                <span className="font-semibold text-[#0A0847]">2. Download CSV Template</span>{" "}
                <span className="font-normal text-[#0A0847]/60">({activeType.title})</span>
              </h3>

              <button
                type="button"
                className="mt-2.5 flex h-[38px] w-[220px] cursor-pointer items-center justify-center gap-2 rounded-[7.5px] border border-[#E2DFFC] bg-white text-[12px] font-medium text-[#0A0847] transition-colors hover:bg-[#EDEFF8]"
              >
                Download CSV Template
                <LuDownload size={12} strokeWidth={1.8} aria-hidden />
              </button>
            </div>

            {/* 2. upload csv file */}
            <div className="mt-8">
              <h3 className="text-[14px] leading-[17px] font-semibold text-[#0A0847]">
                2. Upload CSV File
              </h3>

              <UploadBox />
            </div>

            {/* required columns preview — same left edge + width as the dropzone */}
            <ColumnsPreview typeTitle={activeType.title} columns={activeType.columns} />
          </div>

          {/* right */}
          <aside className="flex h-[353px] w-[381px] shrink-0 flex-col items-center gap-[10px] rounded-[7.5px] border-[0.75px] border-[#E2DFFC] bg-white py-[18px] pr-[24px] pl-[23px]">
            <p className="text-center text-[14px] font-semibold text-[#0A0847]">
              Chapter Default Image
            </p>

            <img
              src={chapterDefaultImage}
              alt="Chapter Default Image"
              className="min-h-0 w-full flex-1 rounded-[8px] object-cover"
            />

            <p className="w-[150px] text-center text-[11px] leading-[1.4] text-[#0A0847]/60">
              Applied automatically to imported puzzles.
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}
