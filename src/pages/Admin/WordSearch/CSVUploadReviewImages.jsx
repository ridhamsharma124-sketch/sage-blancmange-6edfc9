import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PiSquaresFour,
  PiCheckCircle,
  PiFileText,
  PiXCircle,
  PiCaretLeft,
  PiCaretRight,
} from "react-icons/pi";
import audioRevelationImage from "../../../assets/word search/Audio Revelation.png";
import mysteryScriptureImage from "../../../assets/word search/Mystery Scripture.png";
import selectedPuzzlePreview from "../../../assets/word search/Selected Puzzle Preview.png";

/* ==========================================================================
   SHARED
   ========================================================================== */

function Radio({ checked }) {
  return (
    <span
      className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border ${
        checked ? "border-[#001984]" : "border-[#D5DAE3]"
      }`}
    >
      {checked && <span className="h-2 w-2 rounded-full bg-[#001984]" />}
    </span>
  );
}

function SourceBadge({ children = "Chapter Default" }) {
  return (
    <span className="inline-flex h-[24px] min-w-[79px] items-center justify-center rounded-[8px] bg-[#E2DFFC] px-2 text-[11px] font-medium text-[#001984]">
      {children}
    </span>
  );
}

function RowAction({ children }) {
  return (
    <button
      type="button"
      className="flex h-[30px] cursor-pointer items-center justify-center whitespace-nowrap rounded-[6px] border border-[#E2DFFC] bg-white px-[6px] text-[11px] font-medium text-[#001984] transition-colors hover:bg-[#F5F8FD]"
    >
      {children}
    </button>
  );
}

function OutlineButton({ children, className = "", ...props }) {
  return (
    <button
      type="button"
      className={`flex h-[41px] cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-[6px] border border-[#E2DFFC] bg-white px-5 text-[14px] font-semibold text-[#001984] transition-colors hover:bg-[#F5F8FD] ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function PrimaryButton({ children, className = "", ...props }) {
  return (
    <button
      type="button"
      className={`flex h-[41px] cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-[6px] bg-[#001984] px-7 text-[14px] font-semibold text-white transition-opacity hover:opacity-90 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

/* ==========================================================================
   DATA
   ========================================================================== */

const IMAGE_OPTIONS = ["chapter", "ai"];

const STAT_CARDS = [
  { label: "Total Puzzles", value: 248, Icon: PiSquaresFour, color: "#7C3AED" },
  { label: "Published", value: 216, Icon: PiCheckCircle, color: "#22A04B" },
  { label: "Drafts", value: 21, Icon: PiFileText, color: "#C2570C" },
  { label: "Disabled", value: 11, Icon: PiXCircle, color: "#D80027" },
];

const PUZZLE_ROWS = [
  {
    no: 1,
    clue: "Who created the heavens and the earth?",
    answer: "God",
    image: audioRevelationImage,
  },
  {
    no: 2,
    clue: "What was the name of the first man?",
    answer: "Adam",
    image: mysteryScriptureImage,
  },
  {
    no: 3,
    clue: "Who was the first woman?",
    answer: "Eve",
    image: audioRevelationImage,
  },
  {
    no: 4,
    clue: "Which tree were they commanded not to eat from?",
    answer: "Tree of Knowledge",
    image: mysteryScriptureImage,
  },
  {
    no: 5,
    clue: "Which tree were they commanded not to eat from?",
    answer: "Serpent",
    image: audioRevelationImage,
  },
];

const PREVIEW_KEYS = [
  { label: "Clue", value: "Who created the heavens and the earth?" },
  { label: "Answer", value: "God" },
  { label: "Image Source", badge: true },
  { label: "Note", value: "Images can be changed individually at any time." },
];

const PAGE_NUMBERS = [1, 2, 3, 4, 5];

const TABLE_COLS = "grid-cols-[40px_201px_92px_136px_minmax(0,1fr)]";

/* ==========================================================================
   PAGE
   ========================================================================== */

export default function CSVUploadReviewImages() {
  const navigate = useNavigate();
  const [imageMode, setImageMode] = useState("chapter");
  const [selectedRow, setSelectedRow] = useState(1);

  return (
    <div className="min-h-[calc(100vh-72px)] bg-[#F9FAFE] font-inter text-[#0A1050]">
      <div className="mx-auto w-full max-w-[1116px] px-6 py-6">
        {/* ---------------- page heading ---------------- */}
        <p className="text-[14px] font-normal text-[#6B6A80]">
          Add / Edit Word Search - CSV Upload
        </p>

        <h1 className="mt-1 text-[22px] leading-none font-semibold text-[#0A0847]">
          3. CSV Upload - Review Images
        </h1>

        <p className="mt-2 text-[14px] text-[#0A084799]">
          We&apos;ve validated your file and mapped the columns to the correct fields.
        </p>

        {/* ---------------- row A : radio options + generate button ---------------- */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6">
            {IMAGE_OPTIONS.map((option) => {
              const checked = imageMode === option;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setImageMode(option)}
                  className="flex cursor-pointer items-center gap-2 text-[14px]"
                >
                  <Radio checked={checked} />
                  <span
                    className={
                      checked
                        ? "font-semibold text-[#0A0847]"
                        : "font-semibold text-[#0A084799]"
                    }
                  >
                    {option === "chapter"
                      ? "Keep chapter default images"
                      : "Generate unique AI image for every imported puzzle"}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className="flex h-[42px] w-[200px] cursor-pointer items-center justify-center rounded-[6px] bg-[#001984] text-[14px] font-semibold text-white transition-opacity hover:opacity-90"
          >
            Generate All AI Images
          </button>
        </div>

        {/* ---------------- row B : stat cards ---------------- */}
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-[16px]">
          {STAT_CARDS.map(({ label, value, Icon, color }) => (
            <section
              key={label}
              className="flex h-[115px] items-center gap-[10px] rounded-[8px] border border-[#E2DFFC] bg-[#FEFEFE] pl-4"
            >
              <span
                className="flex h-[62px] w-[62px] shrink-0 items-center justify-center rounded-[18px] p-[7px]"
                style={{ backgroundColor: `${color}1A`, color }}
              >
                <Icon size={28} strokeWidth={1.8} />
              </span>

              <div className="flex min-w-0 flex-col gap-[10px]">
                <p className="text-[24px] leading-none font-semibold text-[#001984]">{value}</p>
                <p className="text-[14px] leading-none font-semibold text-[#001984]">{label}</p>
              </div>
            </section>
          ))}
        </div>

        {/* ---------------- main card : preview table + selected preview ---------------- */}
        <section className="mt-6 flex min-h-[555px] flex-col rounded-[7.5px] border-[0.75px] border-[#E2DFFC] bg-white p-5 lg:flex-row">
          {/* left : table */}
          <div className="flex min-w-0 flex-1 flex-col gap-[24px]">
            <h2 className="text-[14px] font-semibold text-[#0A0847]">
              Import Preview (24 Puzzles)
            </h2>

            <div className="w-full">
              {/* header */}
              <div
                className={`grid h-[50px] w-full items-center border-b-[0.75px] border-[#E9E9E9] bg-[#F3F7FD] ${TABLE_COLS}`}
              >
                <span className="flex justify-center text-[12px] font-semibold text-[#3A3A4F]">
                  #
                </span>
                <span className="px-4 text-[12px] font-semibold text-[#3A3A4F]">
                  Clue / Prompt
                </span>
                <span className="px-4 text-[12px] font-semibold text-[#3A3A4F]">Answer</span>
                <span className="px-4 text-[12px] font-semibold text-[#3A3A4F]">
                  Image Source
                </span>
                <span className="px-4 text-center text-[12px] font-semibold text-[#3A3A4F]">
                  Actions
                </span>
              </div>

              {/* body */}
              {PUZZLE_ROWS.map((row) => (
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

                  <span className="flex items-center gap-[10px] px-4">
                    <img
                      src={row.image}
                      alt=""
                      className="h-[38px] w-[38px] shrink-0 rounded-[8px] bg-[#F5F8FD] object-cover"
                    />
                    <span className="text-[11px] leading-[1.3] font-medium text-[#1F2040]">
                      {row.clue}
                    </span>
                  </span>

                  <span className="px-4 text-[11px] leading-[1.3] font-medium text-[#1F2040]">
                    {row.answer}
                  </span>

                  <span className="px-4">
                    <SourceBadge />
                  </span>

                  <span className="flex items-center justify-center gap-1 px-4">
                    <RowAction>Replace</RowAction>
                    <RowAction>Generate AI</RowAction>
                    <RowAction>Reset Default</RowAction>
                  </span>
                </div>
              ))}
            </div>

            {/* table footer : display + pagination */}
            <div className="flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2 text-[#6B6A80]">
                <span>Display</span>
                <select
                  aria-label="Rows per page"
                  defaultValue="10"
                  className="h-[22px] w-[40px] cursor-pointer appearance-none rounded-[4px] border border-[#D5DAE3] bg-white text-center text-[11px] text-[#1F2040] outline-none"
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                </select>
                <span>Words search</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled
                  aria-label="Previous page"
                  className="flex h-[22px] w-[22px] cursor-not-allowed items-center justify-center rounded-[4px] border border-[#E3E7F0] bg-white text-[#C4C9D4]"
                >
                  <PiCaretLeft size={10} />
                </button>

                {PAGE_NUMBERS.map((n) => (
                  <button
                    key={n}
                    type="button"
                    className={`flex h-[22px] w-[22px] cursor-pointer items-center justify-center rounded-[4px] text-[11px] transition-colors ${
                      n === 1
                        ? "bg-[#001984] font-semibold text-white"
                        : "border border-[#E3E7F0] bg-white text-[#1F2040] hover:bg-[#F5F8FD]"
                    }`}
                  >
                    {n}
                  </button>
                ))}

                <button
                  type="button"
                  aria-label="Next page"
                  className="flex h-[22px] w-[22px] cursor-pointer items-center justify-center rounded-[4px] border border-[#001984] bg-white text-[#001984]"
                >
                  <PiCaretRight size={10} />
                </button>
              </div>
            </div>
          </div>

          {/* divider */}
          <span className="mx-4 hidden w-px shrink-0 bg-[#E9E9E9] lg:block" aria-hidden />

          {/* right : selected puzzle preview */}
          <div className="mt-6 flex w-full shrink-0 flex-col gap-[16px] lg:mt-0 lg:w-[271px]">
            <h2 className="text-[14px] font-semibold text-[#0A0847]">
              Selected Puzzle Preview
            </h2>

            <img
              src={selectedPuzzlePreview}
              alt="Selected puzzle preview"
              className="h-[128px] w-full rounded-[8px] bg-[#F5F8FD] object-cover"
            />

            <div className="flex flex-col gap-[10px]">
              {PREVIEW_KEYS.map((item) => (
                <div key={item.label} className="flex gap-3">
                  <span className="w-[75px] shrink-0 text-[11px] font-bold text-[#001984]">
                    {item.label}
                  </span>

                  {item.badge ? (
                    <SourceBadge />
                  ) : (
                    <span className="text-[11px] leading-[1.4] text-[#6B6A80]">
                      {item.value}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- bottom action bar ---------------- */}
        <div className="mt-8 flex items-center justify-between">
          <OutlineButton
            className="w-[97px] px-0"
            onClick={() => navigate("/admin/word-search/add-edit/csv-upload/validate-map")}
          >
            Back
          </OutlineButton>

          <PrimaryButton
            onClick={() => navigate("/admin/word-search/add-edit/csv-upload/import-review")}
          >
            Continue
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
