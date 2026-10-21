import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PiCheck,
  PiCheckCircle,
  PiCloudArrowUp,
  PiFloppyDisk,
  PiX,
} from "react-icons/pi";
import chapterDefaultImage from "../../../assets/word search/Chapter Default Image.png";
import clues1Image from "../../../assets/word search/Clues1.png";
import clues2Image from "../../../assets/word search/Clues2.png";

/* ==========================================================================
   SHARED
   ========================================================================== */

function CsvFileIcon() {
  return (
    <svg width="22" height="25" viewBox="0 0 27 30" fill="none" aria-hidden className="shrink-0">
      <path
        d="M5 1.5h10.5l8 8v19H5v-27Z"
        stroke="#0B1F6B"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path d="M15.5 1.5v8h8" stroke="#0B1F6B" strokeWidth="1.3" strokeLinejoin="round" />
      <text
        x="14"
        y="24.4"
        textAnchor="middle"
        fontSize="7.4"
        fontWeight="700"
        fontFamily="Inter, sans-serif"
        fill="#0B1F6B"
      >
        CSV
      </text>
    </svg>
  );
}

function Radio({ checked }) {
  return (
    <span
      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
        checked ? "border-[#001984]" : "border-[#D5DAE3]"
      }`}
    >
      {checked && <span className="h-2 w-2 rounded-full bg-[#001984]" />}
    </span>
  );
}

function Toggle({ on }) {
  return (
    <span
      className={`relative flex h-[14px] w-[26px] shrink-0 items-center rounded-full transition-colors ${
        on ? "bg-[#1456C8]" : "bg-[#DDE3F0]"
      }`}
    >
      <span
        className={`absolute h-[10px] w-[10px] rounded-full bg-white transition-all ${
          on ? "left-[14px]" : "left-[2px]"
        }`}
      />
    </span>
  );
}

function GreyBadge({ children }) {
  return (
    <span className="inline-flex h-[30px] min-w-[71px] items-center justify-center rounded-[8px] border border-[#CFD6EF] bg-[#0019841A] px-2 text-[11px] font-medium text-[#001984]">
      {children}
    </span>
  );
}

function ReadyBadge() {
  return (
    <span className="inline-flex h-[30px] items-center gap-1.5 rounded-[8px] bg-[#E7F8E6] px-2.5 text-[12px] font-semibold text-[#22A04B]">
      <span className="flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-full bg-[#22A04B]">
        <PiCheck size={9} strokeWidth={3} className="text-white" />
      </span>
      Ready
    </span>
  );
}

function OutlineButton({ children, icon, className = "", ...props }) {
  return (
    <button
      type="button"
      className={`flex h-[41px] cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-[6px] border border-[#E2DFFC] bg-white px-5 text-[14px] font-semibold text-[#001984] transition-colors hover:bg-[#F5F8FD] ${className}`}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}

function PrimaryButton({ children, icon, className = "", ...props }) {
  return (
    <button
      type="button"
      className={`flex h-[41px] cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-[6px] bg-[#001984] text-[14px] font-semibold text-white transition-opacity hover:opacity-90 ${className}`}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}

function OptionToggle({ label, sub, on, onToggle }) {
  return (
    <button type="button" onClick={onToggle} className="flex cursor-pointer items-center gap-3">
      <Toggle on={on} />

      <span className="text-left">
        <span className="block text-[12px] font-semibold text-[#001984]">{label}</span>
        <span className="mt-0.5 block text-[10px] text-[#6B7280]">{sub}</span>
      </span>
    </button>
  );
}

/* ==========================================================================
   DATA
   ========================================================================== */

const SUMMARY_CARDS = [
  {
    value: "22",
    label: "Ready to Import",
    sub: "All set to be imported",
    box: "bg-[#F0FAF0] border-[#4CAF6A]",
    valueColor: "#2EA44F",
    labelColor: "#2EA44F",
  },
  {
    value: "2",
    label: "Needs Review",
    sub: "Will be imported after fixes",
    box: "bg-[#FFF8F0] border-[#F2874B]",
    valueColor: "#E8590C",
    labelColor: "#E8590C",
  },
  {
    value: "12",
    label: "AI Images Generated",
    sub: "AI Images Generated",
    box: "bg-white border-[#001984]",
    valueColor: "#001984",
    labelColor: "#001984",
  },
];

const SUMMARY_ROWS = [
  {
    no: 1,
    type: "Hidden Restoration",
    clue: "Who created the heavens and the earth?",
    answer: "God",
    level: "Level 1",
    reward: "10",
    mapsTo: "Chapter Default",
    image: chapterDefaultImage,
  },
  {
    no: 2,
    type: "Verse Restoration",
    clue: "In the beginning, God created the ________.",
    answer: "heavens and the earth",
    level: "Level 1",
    reward: "10",
    mapsTo: "AI Generated",
    image: clues1Image,
  },
  {
    no: 3,
    type: "Audio Revelation",
    clue: "What did God create on the first day?",
    answer: "In the beginning, God created the heavens and the earth.",
    level: "Level 1",
    reward: "10",
    mapsTo: "AI Generated",
    image: clues2Image,
  },
  {
    no: 4,
    type: "Mystery Scripture",
    clue: "Genesis 1:1",
    answer: "Adam",
    level: "Level 1",
    reward: "10",
    mapsTo: "Chapter Default",
    image: chapterDefaultImage,
  },
];

const READY_TO_IMPORT = 22;

const TABLE_COLS = "grid-cols-[44px_150px_240px_130px_104px_84px_140px_minmax(0,1fr)]";

/* ==========================================================================
   PAGE
   ========================================================================== */

export default function CSVUploadImportReview() {
  const navigate = useNavigate();
  const [publishAfterImport, setPublishAfterImport] = useState(true);
  const [showToast, setShowToast] = useState(true);
  const [selectedRow, setSelectedRow] = useState(1);

  return (
    <div className="min-h-[calc(100vh-72px)] bg-[#F9FAFE] font-inter text-[#0A1050]">
      <div className="mx-auto w-full max-w-[1116px] px-6 py-6 pb-12">
        {/* ---------------- page heading ---------------- */}
        <p className="text-[14px] font-normal text-[#6B6A80]">
          Add / Edit Word Search - CSV Upload
        </p>

        <h1 className="mt-1 text-[22px] leading-none font-semibold text-[#0A0847]">
          4. CSV Upload - Import Review
        </h1>

        <p className="mt-2 text-[13px] text-[#0A084799]">
          Review your import summary before finalizing.
        </p>

        {/* ---------------- row A : summary cards ---------------- */}
        <div className="mt-6 grid grid-cols-4 gap-[22px]">
          {SUMMARY_CARDS.map((card) => (
            <section
              key={card.label}
              className={`flex h-[120px] flex-col items-center justify-center gap-[4px] rounded-[8px] border px-4 ${card.box}`}
            >
              <p className="text-[24px] leading-none font-semibold" style={{ color: card.valueColor }}>
                {card.value}
              </p>
              <p className="text-[12px] leading-none font-semibold" style={{ color: card.labelColor }}>
                {card.label}
              </p>
              <p className="text-[10px] leading-none text-[#6B7280]">{card.sub}</p>
            </section>
          ))}

          {/* file summary */}
          <section className="flex h-[120px] flex-col justify-center gap-[4px] rounded-[8px] border border-[#E2DFFC] bg-white px-4">
            <p className="text-[14px] leading-none font-semibold text-[#0A0847CC]">File Summary</p>

            <div className="mt-1 flex items-center gap-2">
              <CsvFileIcon />

              <div className="min-w-0">
                <p className="truncate text-[12px] leading-none font-semibold text-[#0A0847]">
                  genesis_word_search.csv
                </p>
                <p className="mt-1 text-[10px] leading-none text-[#6B7280]">
                  24 rows • 12.4 KB
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* ---------------- main card ---------------- */}
        <section className="mt-6 flex flex-col gap-[24px] rounded-[7.5px] border-[0.75px] border-[#E2DFFC] bg-white p-5">
          <h2 className="text-[14px] font-semibold text-[#0A0847]">
            Import Summary (24 Puzzles)
          </h2>

          <div className="w-full">
            {/* header */}
            <div
              className={`grid h-[50px] w-full items-center border-b-[0.75px] border-[#E9E9E9] bg-[#F3F7FD] ${TABLE_COLS}`}
            >
              <span className="flex justify-center text-[12px] font-semibold text-[#3A3A4F]">
                #
              </span>
              <span className="px-4 text-[12px] font-semibold text-[#3A3A4F]">Type</span>
              <span className="px-4 text-[12px] font-semibold text-[#3A3A4F]">
                Clue / Prompt / Reference
              </span>
              <span className="px-4 text-[12px] font-semibold text-[#3A3A4F]">
                Answer / Focus
              </span>
              <span className="px-4 text-[12px] font-semibold text-[#3A3A4F]">Level</span>
              <span className="px-4 text-[12px] leading-[1.25] font-semibold text-[#3A3A4F]">
                Reward
                <br />
                Points
              </span>
              <span className="px-4 text-[12px] leading-[1.25] font-semibold text-[#3A3A4F]">
                Maps To
                <br />
                (App Field)
              </span>
              <span className="px-4 text-[12px] font-semibold text-[#3A3A4F]">Status</span>
            </div>

            {/* body */}
            {SUMMARY_ROWS.map((row) => (
              <div
                key={row.no}
                onClick={() => setSelectedRow(row.no)}
                className={`grid h-[63px] cursor-pointer items-center border-b-[0.75px] border-[#E9E9E9] ${TABLE_COLS} ${
                  selectedRow === row.no ? "bg-[#F7F9FE]" : ""
                }`}
              >
                <span className="flex justify-center">
                  <Radio checked={selectedRow === row.no} />
                </span>

                <span className="flex items-center gap-2 px-4">
                  <img
                    src={row.image}
                    alt=""
                    className="h-9 w-9 shrink-0 rounded-[6px] object-cover"
                  />
                  <span className="line-clamp-2 text-[11px] leading-[1.3] font-medium text-[#1F2040]">
                    {row.type}
                  </span>
                </span>

                <span className="px-4 text-[11px] leading-[1.3] font-medium text-[#1F2040]">
                  {row.clue}
                </span>

                <span className="px-4 text-[11px] leading-[1.3] font-medium text-[#1F2040]">
                  {row.answer}
                </span>

                <span className="px-4">
                  <GreyBadge>{row.level}</GreyBadge>
                </span>

                <span className="px-4 text-[11px] font-medium text-[#1F2040]">
                  {row.reward}
                </span>

                <span className="px-4">
                  <GreyBadge>{row.mapsTo}</GreyBadge>
                </span>

                <span className="px-4">
                  <ReadyBadge />
                </span>
              </div>
            ))}
          </div>

          {/* ---------------- import options ---------------- */}
          <div>
            <h2 className="text-[14px] font-semibold text-[#0A0847]">Import Options</h2>

            <div className="mt-4 flex items-center">
              <div className="flex h-[32px] items-center gap-[61px]">
                <OptionToggle
                  label="Save as Draft"
                  sub="Save puzzles as draft for later review"
                  on={!publishAfterImport}
                  onToggle={() => setPublishAfterImport(false)}
                />

                <OptionToggle
                  label="Publish after Import"
                  sub="Make puzzles available immediately"
                  on={publishAfterImport}
                  onToggle={() => setPublishAfterImport(true)}
                />
              </div>

              {showToast && (
                <div className="ml-auto flex h-[58px] w-[355px] items-center gap-2.5 rounded-[8px] border border-[#BFE7CB] bg-[#EAF8EE] px-4">
                  <PiCheckCircle size={26} className="shrink-0 text-[#22A04B]" />

                  <span className="flex-1 whitespace-nowrap text-[14px] font-semibold text-[#4B5563]">
                    CSV validated and images assigned
                  </span>

                  <button
                    type="button"
                    onClick={() => setShowToast(false)}
                    aria-label="Close notification"
                    className="cursor-pointer text-[#1F2040] transition-colors hover:text-[#000000]"
                  >
                    <PiX size={22} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ---------------- bottom action bar ---------------- */}
        <div className="mt-8 flex items-center justify-between">
          <OutlineButton
            className="w-[97px] px-0"
            onClick={() => navigate("/admin/word-search/add-edit/csv-upload/review-images")}
          >
            Back
          </OutlineButton>

          <div className="flex items-center gap-3">
            <OutlineButton
              className="w-[129px] px-0"
              icon={<PiFloppyDisk size={16} weight="fill" className="shrink-0" />}
            >
              Save draft
            </OutlineButton>

            <PrimaryButton
              className="w-[201px]"
              icon={<PiCloudArrowUp size={16} className="shrink-0" />}
            >
              Import {READY_TO_IMPORT} Puzzles
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}
