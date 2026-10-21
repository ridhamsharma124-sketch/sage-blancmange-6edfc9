import { useState } from "react";
import bookImage from "../../../assets/book.png";
import {
  LuEye,
  LuSettings,
  LuBookOpen,
  LuFileText,
  LuCircleHelp,
  LuHeadphones,
  LuBookmark,
  LuLayers,
  LuUsers,
  LuPuzzle,
  LuClock,
  LuCircleCheck,
  LuExternalLink,
  LuPlus,
  LuPencil,
  LuTrash2,
  LuEllipsis,
  LuChevronDown,
  LuLightbulb,
} from "react-icons/lu";
import { WordSearchGlyph, MemoryVerseGlyph } from "./activityGlyphs";
// Figma tile icons (src/assets/activities/)
import quizIcon from "../../../assets/activities/quiz.png";
import wordSearchIcon from "../../../assets/activities/wordsearch.png";
// Figma icons cut from the Activities frames (src/assets/activities/)
import audioTileIcon from "../../../assets/activities/tile_audio.png";
import memoryTileIcon from "../../../assets/activities/tile_memory_card.png";
import memoryTableIcon from "../../../assets/activities/tile_memory_table.png";
import statHeadphones from "../../../assets/activities/stat_headphones.png";
import statClock from "../../../assets/activities/stat_clock.png";
import statBookmark from "../../../assets/activities/stat_bookmark.png";
import statCheck from "../../../assets/activities/stat_check.png";
import btnEye from "../../../assets/activities/btn_eye.png";
import btnExternal from "../../../assets/activities/btn_external.png";
import btnGear from "../../../assets/activities/btn_gear.png";
import tipBulb from "../../../assets/activities/tip_bulb.png";
import audioHeadphones from "../../../assets/activities/audio_headphones.png";
import selectorBook from "../../../assets/activities/selector_book.png";
import infoIcon from "../../../assets/activities/info_icon.png";
import statQuizActive from "../../../assets/activities/stat_quiz_active.png";
import statQuizQuestions from "../../../assets/activities/stat_quiz_questions.png";
import statWsActive from "../../../assets/activities/stat_ws_active.png";
import statWsWords from "../../../assets/activities/stat_ws_words.png";

/* Figma button icon by label: View = eye, Preview = external, Manage = gear */
const btnImage = (label) =>
  label.startsWith("View") ? btnEye : label.startsWith("Preview") ? btnExternal : label.startsWith("Manage") ? btnGear : null;


/* ==========================================================================
   MOCK DATA — text kept exactly as before
   ========================================================================== */
const SELECTORS = [
  { label: "Testament", value: "New Testament", tint: "bg-[#5B0FEE]/10", iconColor: "#5B0FEE", Glyph: LuBookOpen, icon: selectorBook },
  { label: "Book", value: "John", tint: "bg-[#5B0FEE]/10", iconColor: "#5B0FEE", Glyph: LuBookOpen, icon: selectorBook },
  { label: "Book", value: "John", tint: "bg-[#F97316]/10", iconColor: "#F97316", Glyph: LuFileText },
];

const ACTIVITY_CARDS = [
  {
    id: "quiz",
    icon: quizIcon,
    title: "Quiz",
    description: "Test knowledge with multiple question types.",
    tint: "bg-[#001984]/10",
    iconColor: "#001984",
    Glyph: LuCircleHelp,
    stats: [
      { label: "Active", value: "12", Glyph: LuLayers, img: statQuizActive },
      { label: "Questions", value: "12", Glyph: LuCircleHelp, img: statQuizQuestions },
    ],
    buttons: [
      { label: "View Quiz", Glyph: LuEye },
      { label: "Preview", Glyph: LuExternalLink },
    ],
  },
  {
    id: "word-search",
    icon: wordSearchIcon,
    title: "Word Search",
    description: "Test knowledge with multiple question types.",
    tint: "bg-[#21AC1C]/10",
    iconColor: "#21AC1C",
    Glyph: WordSearchGlyph,
    stats: [
      { label: "Active", value: "8", Glyph: LuUsers, img: statWsActive, tileBg: "#E8F3EA" },
      { label: "Words", value: "96", Glyph: LuPuzzle, img: statWsWords, tileBg: "#E8F3EA" },
    ],
    buttons: [
      { label: "View Word Search", Glyph: LuEye },
      { label: "Preview", Glyph: LuExternalLink },
    ],
  },
  {
    id: "audio-stream",
    icon: audioHeadphones,
    tileBg: "#E5E8F3",
    title: "Chapter Audio Stream",
    description: "Listen to engaging audio content.",
    tint: "bg-[#001984]/10",
    iconColor: "#001984",
    Glyph: LuHeadphones,
    stats: [
      { label: "Sessions", value: "5", Glyph: LuHeadphones, img: statHeadphones },
      { label: "Duration", value: "25m", Glyph: LuClock, img: statClock },
    ],
    buttons: [
      { label: "View Audio Stream", Glyph: LuEye },
      { label: "Preview", Glyph: LuExternalLink },
    ],
  },
  {
    id: "memory-verse",
    icon: memoryTileIcon,
    title: "Memory Verse",
    description: "Learn and memorize key Bible verses.",
    tint: "bg-[#F97316]/10",
    iconColor: "#F97316",
    Glyph: MemoryVerseGlyph,
    stats: [
      { label: "Verses", value: "6", Glyph: LuBookmark, img: statBookmark },
      { label: "Practiced", value: "24", Glyph: LuCircleCheck, img: statCheck },
    ],
    buttons: [
      { label: "Manage Memory Verse", Glyph: LuSettings },
      { label: "Preview", Glyph: LuExternalLink },
    ],
  },
];

const TABLE_ROWS = [
  {
    id: "1",
    icon: quizIcon,
    name: "Quiz",
    description: "Knowledge quiz with multiple question types",
    status: "Enabled",
    content: "12 active • 96 questions",
    updated: "May 12, 2024",
    tint: "bg-[#001984]/10",
    iconColor: "#001984",
    Glyph: LuCircleHelp,
  },
  {
    id: "2",
    icon: wordSearchIcon,
    name: "Word Search",
    description: "Word search puzzle game",
    status: "Enabled",
    content: "8 puzzles • 96 words",
    updated: "May 12, 2024",
    tint: "bg-[#21AC1C]/10",
    iconColor: "#21AC1C",
    Glyph: WordSearchGlyph,
  },
  {
    id: "3",
    icon: audioHeadphones,
    tileBg: "#E5E8F3",
    name: "Chapter Audio Stream",
    description: "Audio narration of the chapter",
    status: "Enabled",
    content: "5 sessions • 25 min",
    updated: "May 12, 2024",
    tint: "bg-[#001984]/10",
    iconColor: "#001984",
    Glyph: LuHeadphones,
  },
  {
    id: "4",
    icon: memoryTableIcon,
    name: "Memory Verse",
    description: "Key verses for memorization and practice",
    status: "Enabled",
    content: "6 verses • 24 practiced",
    updated: "May 12, 2024",
    tint: "bg-[#F97316]/10",
    iconColor: "#F97316",
    Glyph: MemoryVerseGlyph,
  },
];

/* ==========================================================================
   PRIMITIVES
   ========================================================================== */
function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className="relative h-[18px] w-[32px] shrink-0 cursor-pointer rounded-full transition-colors"
      style={{ backgroundColor: checked ? "#001984" : "#D6D6DE" }}
    >
      <span
        className="absolute top-[2px] h-[14px] w-[14px] rounded-full bg-white transition-all"
        style={{ left: checked ? 16 : 2 }}
      />
    </button>
  );
}

/* 40x40 toggle box area at the top right of an activity card */
function ToggleBox({ checked, onChange, label }) {
  return (
    <span className="flex h-[40px] w-[40px] shrink-0 items-center justify-center">
      <Toggle checked={checked} onChange={onChange} label={label} />
    </span>
  );
}

function CheckBox({ label }) {
  return (
    <input
      type="checkbox"
      aria-label={label}
      className="h-[14px] w-[14px] shrink-0 cursor-pointer appearance-none rounded-[2px] border-[1.5px] border-[#64828A] bg-white transition-colors checked:bg-[#64828A]"
    />
  );
}

function SelectorCard({ selector }) {
  const { label, value, tint, iconColor, Glyph, icon } = selector;
  return (
    <button
      type="button"
      className="flex h-[106px] min-w-0 items-center gap-4 rounded-lg border border-[#E2DFFC] bg-[#FEFFFF] px-[18px] py-[22px] text-left transition-colors hover:border-[#001984]/40"
    >
      {icon ? (
        <span className="flex h-[66px] w-[66px] shrink-0 items-center justify-center rounded-[16px] bg-[#EEE6FF]">
          <img src={icon} alt="" className="h-[36px] w-[36px]" />
        </span>
      ) : (
        <span
          className={`flex h-[53px] w-[53px] shrink-0 items-center justify-center rounded-[10px] ${tint}`}
        >
          <Glyph size={24} style={{ color: iconColor }} />
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block text-[12px] leading-none text-[#0A0847]/60">{label}</span>
        <span className="mt-2 block truncate text-[18px] leading-none font-semibold text-[#0A0847]">
          {value}
        </span>
      </span>
      <LuChevronDown size={18} className="shrink-0 text-[#0A0847]/60" aria-hidden />
    </button>
  );
}

function ActivityCard({ card, enabled, onToggle }) {
  const { title, description, tint, iconColor, Glyph, icon, tileBg, stats, buttons } = card;
  return (
    <article className="flex h-[268px] min-w-0 flex-col gap-[10px] rounded-lg border border-[#E2DFFC] bg-[#FEFFFF] pt-[22px] pr-[18px] pb-[26px] pl-[17px]">
      <div className="flex items-start justify-between">
        <div className="flex min-w-0 items-start gap-3">
          {tileBg ? (
            <span
              className="flex h-[53px] w-[53px] shrink-0 items-center justify-center rounded-[10px]"
              style={{ backgroundColor: tileBg }}
            >
              <img src={icon} alt="" className="h-[36px] w-[36px]" />
            </span>
          ) : icon ? (
            <img src={icon} alt="" className="h-[53px] w-[53px] shrink-0" />
          ) : (
            <span
              className={`flex h-[53px] w-[53px] shrink-0 items-center justify-center rounded-[10px] ${tint}`}
            >
              <Glyph size={24} style={{ color: iconColor }} />
            </span>
          )}
          <div className="min-w-0">
            <h3 className="text-[16px] leading-none font-semibold text-[#0A0847]">{title}</h3>
            <p className="mt-2 text-[12px] leading-[16px] font-medium text-[#0A0847]/60">
              {description}
            </p>
          </div>
        </div>
        <ToggleBox
          checked={enabled}
          onChange={onToggle}
          label={`Toggle ${title}`}
        />
      </div>

      <div className="grid grid-cols-2 gap-[10px]">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex h-[77px] min-w-0 items-center gap-[10px] rounded-[7.5px] border-[0.75px] border-[#E2DFFC] bg-[#FAF9FE] p-[12px]"
          >
            <span
              className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-lg"
              style={{ backgroundColor: stat.tileBg || "#E5E8F3" }}
            >
              {stat.img ? (
                <img src={stat.img} alt="" className="h-[28px] w-[28px]" />
              ) : (
                <stat.Glyph size={22} style={{ color: iconColor }} aria-hidden />
              )}
            </span>
            <div className="min-w-0">
              <p className="text-[12px] leading-none text-[#0A0847]/60">{stat.label}</p>
              <p className="mt-1.5 text-[18px] leading-none font-semibold text-[#0A0847]">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-[10px]">
        {buttons.map((btn) => (
          <button
            key={btn.label}
            type="button"
            className="flex h-[43px] min-w-0 cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#001984] bg-white px-2 text-[14px] font-medium text-[#001984] transition-colors hover:bg-[#001984]/5"
          >
            {btnImage(btn.label) ? (
              <img src={btnImage(btn.label)} alt="" className="h-[18px] w-[18px] shrink-0" />
            ) : (
              <btn.Glyph size={18} className="shrink-0" />
            )}
            <span className="truncate">{btn.label}</span>
          </button>
        ))}
      </div>
    </article>
  );
}

function StatusBadge({ status }) {
  return (
    <span className="inline-flex h-[28px] items-center rounded-lg bg-[#21AC1C]/10 px-3 text-[12px] font-medium whitespace-nowrap text-[#21AC1C]">
      {status}
    </span>
  );
}

/* ==========================================================================
   PAGE
   ========================================================================== */
export default function Activities() {
  const [toggles, setToggles] = useState(() =>
    Object.fromEntries(ACTIVITY_CARDS.map((card) => [card.id, true])),
  );

  const setToggle = (id) =>
    setToggles((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="min-h-screen bg-[#F9FAFE] font-[Inter] text-[#0A0847]">
      {/* ONE container — every section is a direct child, full width, min-w-0 */}
      <div className="flex w-full min-w-0 flex-col gap-6 px-6 py-6">
        {/* HEADER */}
        <div className="flex w-full min-w-0 flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-[22px] font-semibold text-[#0A0847]">Activities</h1>
            <p className="mt-1.5 text-[14px] font-medium text-[#0A0847]/60">
              Engage and track activities for each chapter.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              className="flex h-[42px] cursor-pointer items-center gap-2 rounded-lg border border-[#E2DFFC] bg-white px-4 text-[14px] font-medium text-[#0A0847] transition-colors hover:bg-[#F9FAFE]"
            >
              <LuEye size={16} />
              Preview as User
            </button>
            <button
              type="button"
              className="flex h-[42px] cursor-pointer items-center gap-2 rounded-lg bg-[#001984] px-4 text-[14px] font-medium text-white transition-colors hover:opacity-90"
            >
              <LuSettings size={16} />
              Activity Settings
            </button>
          </div>
        </div>

        {/* SELECTORS — 3 equal cards, gap 16 */}
        <div className="grid w-full min-w-0 grid-cols-1 gap-4 md:grid-cols-3">
          {SELECTORS.map((selector, i) => (
            <SelectorCard
              key={`${selector.label}-${selector.value}-${i}`}
              selector={selector}
            />
          ))}
        </div>

        {/* SELECTED LOCATION — full width, same edges as selector row */}
        <section className="flex h-[175px] w-full min-w-0 items-center justify-between gap-6 overflow-hidden rounded-lg border border-[#E2DFFC] bg-gradient-to-r from-[#FBF8FF] to-[#F6F1FF] px-6">
          <div className="min-w-0">
            <p className="text-[16px] font-semibold text-[#0A0847]">Selected Location</p>
            <p className="mt-2 text-[13px] text-[#0A0847]/60">
              New Testament &gt; John &gt; Chapter 3
            </p>
            <p className="mt-1.5 text-[13px] text-[#0A0847]/60">Total Activities: 6</p>
          </div>
          <img
            src={bookImage}
            alt="Open book illustration"
            className="h-[110px] w-[220px] shrink-0 object-contain"
          />
        </section>

        {/* INFO BANNER — height 38px (hug) */}
        <section className="flex w-full min-w-0 items-center gap-[10px] rounded-[8px] border border-[#E5E2FC] bg-[#F4F4FE] px-[13px] py-[14px]">
          <img src={infoIcon} alt="" className="h-[24px] w-[24px] shrink-0" />
          <div className="min-w-0">
            <p className="text-[12px] leading-[15px] font-medium text-[#686690]">
              Choose which activities are available for this chapter.
            </p>
            <p className="text-[12px] leading-[15px] text-[#686690]">
              You can enable or disable activities anytime. Controls will be visible to manage
              them easily.
            </p>
          </div>
        </section>

        {/* ACTIVITY CARDS — 2 columns, gap 24 */}
        <div className="grid w-full min-w-0 grid-cols-1 gap-6 lg:grid-cols-2">
          {ACTIVITY_CARDS.map((card) => (
            <ActivityCard
              key={card.id}
              card={card}
              enabled={toggles[card.id]}
              onToggle={() => setToggle(card.id)}
            />
          ))}
        </div>

        {/* TABLE SECTION */}
        <section className="w-full min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="min-w-0">
              <h2 className="text-[16px] font-semibold text-[#0A0847]">
                All Activities for This Chapter
              </h2>
              <p className="mt-1 text-[13px] text-[#0A0847]/60">
                Overview of all activities and their status.
              </p>
            </div>
            <button
              type="button"
              className="flex h-[43px] w-[164px] cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#E2DFFC] bg-white text-[14px] font-medium text-[#0A0847] transition-colors hover:bg-[#F9FAFE]"
            >
              <LuPlus size={15} />
              Add New Activity
            </button>
          </div>

          <div className="mt-4 w-full min-w-0 overflow-hidden rounded-[7.5px] border-[0.75px] border-[#E2DFFC] bg-white">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="h-[50px] bg-[#F3F7FD]">
                  <th scope="col" className="px-5 py-[11.85px]">
                    <CheckBox label="Select all activities" />
                  </th>
                  {["Activity", "Description", "Status", "Content", "Updated", "Actions"].map(
                    (heading) => (
                      <th
                        key={heading}
                        scope="col"
                        className="px-5 py-[11.85px] text-[12px] font-medium whitespace-nowrap text-[#0A0847]/80"
                      >
                        {heading}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map((row) => {
                  const { Glyph } = row;
                  return (
                    <tr
                      key={row.id}
                      className="h-[61px] border-b-[0.75px] border-[#E2DFFC] transition-colors hover:bg-[#FAFAFE]"
                    >
                      <td className="px-5 py-[10px]">
                        <CheckBox label={`Select ${row.name}`} />
                      </td>
                      <td className="px-5 py-[10px]">
                        <div className="flex items-center gap-2.5">
                          {row.tileBg ? (
                            <span
                              className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[8px]"
                              style={{ backgroundColor: row.tileBg }}
                            >
                              <img src={row.icon} alt="" className="h-[24px] w-[24px]" />
                            </span>
                          ) : row.icon ? (
                            <img src={row.icon} alt="" className={`${row.id === "4" ? "h-[47px] w-[47px]" : "h-[36px] w-[36px]"} shrink-0`} />
                          ) : (
                            <span
                              className={`flex h-[41px] w-[41px] shrink-0 items-center justify-center rounded-[10px] ${row.tint}`}
                            >
                              <Glyph size={18} style={{ color: row.iconColor }} aria-hidden />
                            </span>
                          )}
                          <span className="text-[12px] font-medium text-[#0A0847]">
                            {row.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-[10px] text-[12px] text-[#0A0847]/60">
                        {row.description}
                      </td>
                      <td className="px-5 py-[10px]">
                        <StatusBadge status={row.status} />
                      </td>
                      <td className="px-5 py-[10px] text-[12px] font-medium whitespace-nowrap text-[#0A0847]/60">
                        {row.content}
                      </td>
                      <td className="px-5 py-[10px] text-[12px] font-medium whitespace-nowrap text-[#0A0847]/60">
                        {row.updated}
                      </td>
                      <td className="px-5 py-[10px]">
                        <div className="flex items-center gap-[10px]">
                          <div className="flex items-center gap-[10px]">
                            <button
                              type="button"
                              aria-label={`Edit ${row.name}`}
                              className="flex h-[32px] w-[31px] cursor-pointer items-center justify-center rounded-md text-[#001984] transition-colors hover:bg-[#001984]/5"
                            >
                              <LuPencil size={18} />
                            </button>
                            <button
                              type="button"
                              aria-label={`Delete ${row.name}`}
                              className="flex h-[32px] w-[31px] cursor-pointer items-center justify-center rounded-md text-[#DC2626] transition-colors hover:bg-[#DC2626]/5"
                            >
                              <LuTrash2 size={18} />
                            </button>
                          </div>
                          <button
                            type="button"
                            aria-label={`More actions for ${row.name}`}
                            className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[3px] bg-[#0A0847]/10 text-[#0A0847] transition-colors hover:bg-[#0A0847]/15"
                          >
                            <LuEllipsis size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* TIP BANNER */}
        <section className="flex h-[75px] w-full min-w-0 items-center justify-between gap-[10px] rounded-lg bg-[#FE9809]/10 pt-4 pr-[31px] pb-[15px] pl-[18px]">
          <p className="flex min-w-0 items-start gap-[10px] text-[12px] font-medium text-[#FE9809]">
            <img src={tipBulb} alt="" className="mt-[1px] h-[27px] w-[27px] shrink-0" />
            <span>
              Tip: You can reorder and hide an Activity Settings by using the order flow against
              the icon.
            </span>
          </p>
          <button
            type="button"
            className="flex h-[43px] shrink-0 cursor-pointer items-center gap-2 rounded-lg bg-white px-4 text-[14px] font-medium text-[#FE9809] transition-colors hover:bg-[#FFF7ED]"
          >
            <LuSettings size={15} style={{ color: "#FE9809" }} />
            Go to Activity Settings
          </button>
        </section>
      </div>
    </div>
  );
}