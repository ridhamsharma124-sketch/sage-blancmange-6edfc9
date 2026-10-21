import React, { useState } from "react";
import {
  FiFilter,
  FiSave,
  FiHelpCircle,
  FiUsers,
  FiBookOpen,
  FiCalendar,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiChevronRight,
  FiChevronDown,
  FiMusic,
  FiFileText,
  FiGift,
} from "react-icons/fi";
import { HiOutlineFire } from "react-icons/hi2";
import QuestionMark from "../../../assets/BroadSpectrumSvgs/QuestionMark.svg"
import GreenGroupIcons from "../../../assets/BroadSpectrumSvgs/GreenGroupIcons.svg"
import GoldenHands from "../../../assets/BroadSpectrumSvgs/GoldenHands.svg"
import BlueBook from "../../../assets/BroadSpectrumSvgs/BlueBook.svg"
import CalendarIcon from "../../../assets/BroadSpectrumSvgs/CalendarSvg.svg"
import PurpleHands from "../../../assets/BroadSpectrumSvgs/PurplePrayerHands.svg"
import MusicSvg from "../../../assets/BroadSpectrumSvgs/MusicSvg.svg";
import FileSvg from "../../../assets/BroadSpectrumSvgs/FileSvg.svg";
import GiftSvg from "../../../assets/BroadSpectrumSvgs/GiftPurple.svg";
import StreakPurpleSvg from "../../../assets/BroadSpectrumSvgs/StreakPurple.svg";
import DollarCoin from "../../../assets/BroadSpectrumSvgs/DollarCoin.svg";
import EditSvg from "../../../assets/BroadSpectrumSvgs/Edit.svg";
import TrashIcon from "../../../assets/BroadSpectrumSvgs/TrashRedIcon.svg";

/* ==========================================================================
   ATOMS
   ========================================================================== */

    const SvgIcon = ({ src, size = 16, className = "" }) => (
              <img src={src} alt="" width={size} height={size} className={`shrink-0 ${className}`} />
            );
            
       const CalendarIconSvg = (p) => <SvgIcon src={CalendarIcon} {...p} />;
       const PurpleHandsIconSvg = (p) => <SvgIcon src={PurpleHands} {...p} />;
       const MusicIconSvg = (p) => <SvgIcon src={MusicSvg} {...p} />;
       const FileIconSvg = (p) => <SvgIcon src={FileSvg} {...p} />;
       const GiftIconSvg = (p) => <SvgIcon src={GiftSvg} {...p} />;
       const StreakIconSvg = (p) => <SvgIcon src={StreakPurpleSvg} {...p} />;
       const DollarCoinSvg = (p) => <SvgIcon src={DollarCoin} {...p} />;
       const EditIconSvg = (p) => <SvgIcon src={EditSvg} {...p} />;
       const TrashIconSvg = (p) => <SvgIcon src={TrashIcon} {...p} />;


const Toggle = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer shrink-0 ${
      checked ? "bg-[#001984]" : "bg-gray-200"
    }`}
  >
    <div
      className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform ${
        checked ? "translate-x-4" : "translate-x-0"
      }`}
    />
  </button>
);

const Select = ({ value, onChange, options, className = "" }) => (
  <div className={`relative ${className}`}>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full appearance-none border border-[#E2DFFC] rounded-md px-3 pr-9 py-2.5 text-xs text-[#0A0847] bg-white outline-none focus:border-[#001984] cursor-pointer"
    >
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
    <FiChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
  </div>
);

const Card = ({ icon, title, desc, right, children, className = "" }) => (
  <div className={`bg-white rounded-lg border border-[#E2DFFC] p-4 ${className}`}>
    <div className="flex items-start justify-between gap-4 mb-5">
      <div className="flex items-start gap-2">
        {icon}
        <div>
          <h3 className="text-sm font-semibold text-[#0A0847]">{title}</h3>
          <p className="text-[11px] text-[#0A084799] font-medium">{desc}</p>
        </div>
      </div>
      {right}
    </div>
    {children}
  </div>
);

const SettingRow = ({ title, desc, children, inline, required }) => (
  <div className={`py-3 ${inline ? "flex items-center justify-between gap-4" : ""}`}>
    {!inline && (
      <div className="flex items-center justify-between gap-4 mb-1.5">
        <p className="text-xs font-semibold text-[#0A0847CC]">{title}{required && <span className=" px-1 text-[#EB0C10]">*</span>}</p>
      </div>
    )}
    {inline && <p className="text-xs font-semibold text-[#0A0847CC]">{title}</p>}
    {inline ? children : (
      <>
        {children}
        {desc && <p className="text-[10px] text-[#0A084799] italic font-medium mt-1.5">{desc}</p>}
      </>
    )}
  </div>
);

const StatCard = ({ icon, iconBg, value, label }) => (
  <div className="bg-white rounded-lg border border-[#E2DFFC] px-4 py-6 flex items-center gap-4">
    <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center shrink-0`}>
      <img src={icon} alt="" className="w-7 h-7" />
    </div>
    <div>
      <p className="text-base font-semibold text-[#0A0847CC]">{value}</p>
      <p className="text-[11px] text-[#0A084799] font-semibold mt-0.5">{label}</p>
    </div>
  </div>
);

const StatusBadge = () => (
  <span className="w-20 py-1 rounded-md text-xs font-medium border inline-block text-center bg-[#21AC1C1A] text-[#21AC1C] border-[#DAF3C8]">
    Active
  </span>
);

/* ==========================================================================
   DATA
   ========================================================================== */
const CATEGORIES = [
  "Old Testament", "New Testament", "Audio/Video Bible", "Bible Places",
  "Bible Events", "People & Teachings", "Parables & Stories", "Church & Ministry",
];

const INITIAL_OPENING = [
  { id: "o1", title: "Heavenly Father, Thank You", type: "audio" },
  { id: "o2", title: "A Prayer for Wisdom", type: "text" },
  { id: "o3", title: "Lord, Guide My Steps", type: "audio" },
  { id: "o4", title: "Open My Heart Today", type: "audio" },
  { id: "o5", title: "Thank You for Your Word", type: "text" },
];

const INITIAL_CLOSING = [
  { id: "c1", title: "Thank You Lord", type: "audio" },
  { id: "c2", title: "Lord, I Give You Praise", type: "text" },
  { id: "c3", title: "Prayer of Gratitude", type: "audio" },
  { id: "c4", title: "May God Bless My Day", type: "audio" },
  { id: "c5", title: "Keep Me in Your Love", type: "text" },
];

/* ==========================================================================
   PRAYER LIST BLOCK
   ========================================================================== */
const PrayerList = ({ title, desc, prayers, onAdd, onEdit, onDelete, total, onViewAll }) => (
  <div className="space-y-4">
    {/* Main card */}
    <div className="bg-white rounded-lg border border-[#E2DFFC] p-4 overflow-hidden">
      <div className="flex items-start justify-between gap-4 pb-5">
        <div className="flex items-start gap-3">
          <span className=" text-[#7C3AED] flex items-center justify-center shrink-0">
            <PurpleHandsIconSvg size={28} />
          </span>
          <div>
            <h3 className="text-sm font-semibold text-[#0A0847]">{title}</h3>
            <p className="text-[11px] text-[#0A084799] font-medium mt-0.5">{desc}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="px-4 py-2 border border-[#001984] text-[#001984] bg-white text-xs font-semibold rounded-md flex items-center gap-2 hover:bg-[#EEF2FF] cursor-pointer shrink-0"
        >
          <FiPlus size={14} /> Add Prayers
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs min-w-[600px]">
          <thead className="bg-[#F3F7FD]">
            <tr>
              <th className="px-6 py-3 font-medium text-[#0A0847CC]">Prayer Title</th>
              <th className="px-6 py-3 font-medium text-[#0A0847CC]">Type</th>
              <th className="px-6 py-3 font-medium text-[#0A0847CC]">Status</th>
              <th className="px-6 py-3 font-medium text-[#0A0847CC] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2DFFC]">
            {prayers.length === 0 && (
              <tr><td colSpan={4} className="px-6 py-6 text-center text-gray-400">No prayers yet.</td></tr>
            )}
            {prayers.map((p) => (
              <tr key={p.id}>
                <td className="px-6 py-4 font-medium text-[#001984]">{p.title}</td>
                <td className="px-6 py-4 text-[#0A0847CC]">
                  <span className=" flex items-center ">
                    {p.type === "audio" ? <MusicIconSvg size={24} /> : <FileIconSvg size={24} />}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-md text-xs font-medium bg-[#21AC1C1A] text-[#21AC1C] border border-[#DAF3C8] inline-block">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(p)}
                      className="w-8 h-8 rounded-md border border-[#E2DFFC] text-[#001984] flex items-center justify-center hover:bg-gray-50 cursor-pointer"
                    >
                      <EditIconSvg size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(p.id)}
                      className="w-8 h-8 rounded-md border border-[#E2DFFC] text-[#E11D2E] flex items-center justify-center hover:bg-red-50 cursor-pointer"
                    >
                      <TrashIconSvg size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* Separate View All card */}
    <button
      type="button"
      onClick={onViewAll}
      className="w-full bg-[#00198405] border border-[#C8D2FF] rounded-lg px-3 py-1.5 text-[12px] font-normal text-[#001984] flex items-center justify-between hover:bg-[#F8FAFC] cursor-pointer"
    >
      View All {title} ({total}) <FiChevronRight size={14} />
    </button>
  </div>
);

/* ==========================================================================
   PAGE (NO NAVBAR / NO SIDEBAR)
   ========================================================================== */
export default function BroadSpectrumPage() {
  const [s, setS] = useState({
    questionsPerDay: "10",
    continueExploring: true,
    countdownEnabled: true,
    countdownDuration: "5 Seconds",
    showTheme: true,
    resetTime: "12:00 AM",

    categories: Object.fromEntries(CATEGORIES.map((c) => [c, true])),
    easy: "50%",
    medium: "30%",
    hard: "20%",

    xpPerQuestion: "10",
    coinsPerAnswer: "5",
    dailyBonus: "50",
    streakBonus: "10",
    dailyChest: true,
    victoryCard: true,
    victoryEvery: "Every 5 Continuations",

    streakStart: "1",
    maxMultiplier: "3x",
    streakBonusType: "Coins (C)",
    bonusPerStreak: "Coins",

    showExplanations: true,
    showVerse: true,
    allowSkip: true,
    shuffle: false,
    reactionReport: true,
    socialShare: true,
  });

  const set = (k, v) => setS((p) => ({ ...p, [k]: v }));
  const toggleCategory = (c) =>
    setS((p) => ({ ...p, categories: { ...p.categories, [c]: !p.categories[c] } }));

  const allSelected = Object.values(s.categories).every(Boolean);
  const toggleAll = () =>
    setS((p) => ({
      ...p,
      categories: Object.fromEntries(CATEGORIES.map((c) => [c, !allSelected])),
    }));

  const [opening, setOpening] = useState(INITIAL_OPENING);
  const [closing, setClosing] = useState(INITIAL_CLOSING);

  const addPrayer = (setList, kind) =>
    setList((p) => [
      ...p,
      { id: crypto.randomUUID(), title: `New ${kind} Prayer`, type: "text" },
    ]);
  const deletePrayer = (setList, id) => setList((p) => p.filter((x) => x.id !== id));
  const editPrayer = (setList, prayer) => {
    const title = window.prompt("Prayer title", prayer.title);
    if (title === null) return;
    setList((p) => p.map((x) => (x.id === prayer.id ? { ...x, title } : x)));
  };

  const handleSave = () => {
    const payload = { ...s, opening, closing };
    console.log("Broad Spectrum Payload:", payload);
    alert("Settings saved! Check browser console for full payload.");
  };

  return (
    <div className="p-6 bg-[#F8FAFC] min-h-screen font-[Inter] space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-[#0A0847]">Broad Spectrum (Daily Journey)</h1>
          <p className="text-sm text-[#0A084799] font-medium mt-2">
            Manage daily journey experience, questions, prayers and rewards.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button type="button" className="px-5 py-2.5 bg-white border border-[#E2DFFC] text-[#0A0847] text-xs font-semibold rounded-md flex items-center gap-2 hover:bg-gray-50 cursor-pointer">
            <FiFilter size={14} /> Preview Journey
          </button>
          <button type="button" onClick={handleSave} className="px-5 py-2.5 bg-[#001984] hover:bg-[#001266] text-white text-xs font-semibold rounded-md flex items-center gap-2 cursor-pointer">
            <FiSave size={14} /> Save Changes
          </button>
        </div>
      </div>

      {/* Coupon banner */}
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-[#0A0847]">Coupon Codes</h2>
          <StatusBadge />
        </div>
        <p className="text-sm text-[#0A084799] font-medium mt-1">
          Receive complete daily journey and continue exploring without
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={QuestionMark} iconBg="bg-[#EFE7FD] text-[#7C3AED]" value="10 per week" label="Daily Questions" />
        <StatCard icon={GreenGroupIcons} iconBg="bg-[#DCF5DA] text-[#21AC1C]" value="12 active" label="Journey Prayers" />
        <StatCard icon={GoldenHands} iconBg="bg-[#FEF3E2] text-[#F59E0B]" value="10 active" label="Closing Prayers" />
        <StatCard icon={BlueBook} iconBg="bg-[#DBEAFE] text-[#1D6FE0]" value="5,632 across" label="Total Devotions" />
      </div>

      {/* Row: Daily Journey Settings x2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <Card
          icon={<span className=" text-[#7C3AED] flex items-center justify-center"><CalendarIconSvg size={28} /></span>}
          title="Daily Journey Settings"
          desc="Configure the daily limit and flow for users."
        >
          <SettingRow title="Questions per Day" required>
            <Select value={s.questionsPerDay} onChange={(v) => set("questionsPerDay", v)} options={["5", "10", "15", "20"]} />
            <p className="text-[10px] italic text-[#0A084799] font-medium mt-1.5">
              Number of questions users can answer in their daily journey.
            </p>
          </SettingRow>

          <SettingRow inline title="Allow Continue Exploring (Unlimited)">
            <Toggle checked={s.continueExploring} onChange={(v) => set("continueExploring", v)} />
          </SettingRow>
          <p className="text-[10px] italic text-[#0A084799] font-medium -mt-2 mb-2">
            Allow users to continue answering after daily limit is reached.
          </p>

          <SettingRow inline title="Countdown Before First Question">
            <Toggle checked={s.countdownEnabled} onChange={(v) => set("countdownEnabled", v)} />
          </SettingRow>

          <div className="mt-2">
            <Select value={s.countdownDuration} onChange={(v) => set("countdownDuration", v)} options={["3 Seconds", "5 Seconds", "10 Seconds"]} />
            <p className="text-[10px] italic text-[#0A084799] font-medium mt-1.5">Countdown shown before the first question.</p>
          </div>

          <SettingRow inline title="Show Today's Journey Theme">
            <Toggle checked={s.showTheme} onChange={(v) => set("showTheme", v)} />
          </SettingRow>
          <p className="text-[10px] italic text-[#0A084799] font-medium -mt-2 mb-4">
            Display theme and verse on the countdown screen.
          </p>

          <SettingRow inline title="Reset Daily Journey At">
            <Select value={s.resetTime} onChange={(v) => set("resetTime", v)} options={["12:00 AM", "3:00 AM", "6:00 AM"]} className="w-32" />
          </SettingRow>
          <p className="text-[10px] italic text-[#0A084799] font-medium">Time when daily journey resets for all users.</p>
        </Card>

        <Card
          icon={<span className=" text-[#7C3AED] flex items-center justify-center"><CalendarIconSvg size={28} /></span>}
          title="Daily Journey Settings"
          desc="Configure the daily limit and flow for users."
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold text-[#0A0847]">Select All</p>
            <input
              type="checkbox"
              checked={allSelected}
              onChange={toggleAll}
              className="w-4 h-4 rounded accent-[#001984] cursor-pointer"
            />
          </div>

          <div className="space-y-2.5 max-h-[260px] overflow-y-auto pr-1">
            {CATEGORIES.map((c) => (
              <label key={c} className="flex items-center justify-between gap-3 cursor-pointer select-none mb-3">
                <span className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={s.categories[c]}
                    onChange={() => toggleCategory(c)}
                    className="w-4 h-4 rounded accent-[#001984] cursor-pointer"
                  />
                  <span className="text-xs font-medium text-[#0A0847CC]">{c}</span>
                </span>
                <span className="text-xs font-semibold text-[#0A0847]">1,245</span>
              </label>
            ))}
          </div>

          <p className="text-sm font-semibold text-[#0A0847] mt-5 mb-3">Question Difficulty Distribution</p>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <p className="text-[11px] font-medium text-[#0A0847CC] mb-1">Easy</p>
              <Select value={s.easy} onChange={(v) => set("easy", v)} options={["30%", "40%", "50%", "60%"]} />
            </div>
            <div>
              <p className="text-[11px] font-medium text-[#0A0847CC] mb-1">Medium</p>
              <Select value={s.medium} onChange={(v) => set("medium", v)} options={["20%", "30%", "40%"]} />
            </div>
            <div>
              <p className="text-[11px] font-medium text-[#0A0847CC] mb-1">Hard</p>
              <Select value={s.hard} onChange={(v) => set("hard", v)} options={["10%", "20%", "30%"]} />
            </div>
          </div>
          <p className="text-[10px] text-[#0A084799] font-medium mt-2">
            Set the mix of question difficulty for the daily journey.
          </p>
        </Card>
      </div>

      {/* Opening / Closing prayers */}
      <PrayerList
        title="Opening Prayers"
        desc="Manage opening prayers shown for the daily journey."
        prayers={opening.slice(0, 5)}
        total={opening.length}
        onAdd={() => addPrayer(setOpening, "Opening")}
        onEdit={(p) => editPrayer(setOpening, p)}
        onDelete={(id) => deletePrayer(setOpening, id)}
        onViewAll={() => alert(`Showing all ${opening.length} opening prayers`)}
      />

      <PrayerList
        title="Closing Prayers"
        desc="Manage closing prayers for the daily journey."
        prayers={closing.slice(0, 5)}
        total={closing.length}
        onAdd={() => addPrayer(setClosing, "Closing")}
        onEdit={(p) => editPrayer(setClosing, p)}
        onDelete={(id) => deletePrayer(setClosing, id)}
        onViewAll={() => alert(`Showing all ${closing.length} closing prayers`)}
      />

      {/* Rewards / Streaks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <Card
          icon={<span className="text-[#7C3AED] flex items-center justify-center"><GiftIconSvg size={28} /></span>}
          title="Rewards & Points"
          desc="Set rewards for questions and daily completion."
        >
          <div>
            <p className="text-xs font-semibold text-[#0A0847CC] mb-1.5">XP per Question Correct</p>
            <Select value={s.xpPerQuestion} onChange={(v) => set("xpPerQuestion", v)} options={["5", "10", "15", "20"]} />
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold text-[#0A0847CC] mb-1.5">Coins per Correct Answer</p>
            <div className="relative">
              <input
                value={s.coinsPerAnswer}
                onChange={(e) => set("coinsPerAnswer", e.target.value.replace(/\D/g, ""))}
                className="w-full border border-[#E2DFFC] rounded-md px-3 py-2.5 pr-9 text-xs text-[#0A0847] outline-none focus:border-[#001984]"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#F59E0B] text-sm"> <DollarCoinSvg size={20} /> </span>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold text-[#0A0847CC] mb-1.5">Daily Completion Bonus</p>
            <Select value={s.dailyBonus} onChange={(v) => set("dailyBonus", v)} options={["25", "50", "75", "100"]} />
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold text-[#0A0847CC] mb-1.5">Streak Bonus (per day)</p>
            <div className="flex border border-[#E2DFFC] rounded-md overflow-hidden">
              <input
                value={s.streakBonus}
                onChange={(e) => set("streakBonus", e.target.value.replace(/\D/g, ""))}
                className="flex-1 px-3 py-2.5 text-xs text-[#0A0847] outline-none"
              />
              <span className="px-4 py-2.5 text-xs text-[#0A0847CC]">XP</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div>
              <p className="text-xs font-semibold text-[#0A0847CC]">Daily Completion Chest</p>
              <p className="text-[10px] text-[#0A084799] font-medium mt-0.5">Award a chest when users finish journey & quiz mode.</p>
            </div>
            <Toggle checked={s.dailyChest} onChange={(v) => set("dailyChest", v)} />
          </div>

          <div className="flex items-center justify-between mt-4 mb-1.5">
            <p className="text-xs font-semibold text-[#0A0847CC]">Victory Card Reward</p>
            <Toggle checked={s.victoryCard} onChange={(v) => set("victoryCard", v)} />
          </div>
          <Select value={s.victoryEvery} onChange={(v) => set("victoryEvery", v)} options={["Every 3 Continuations", "Every 5 Continuations", "Every 10 Continuations"]} />
          <p className="text-[10px] text-[#0A084799] font-medium mt-1.5">Give a victory card after set number of continues.</p>
        </Card>

        <Card
          icon={<span className="text-[#F59E0B] flex items-center justify-center"><StreakIconSvg size={28} /></span>}
          title="Streaks"
          desc="Configure streak rules and bonuses."
        >
          <div>
            <p className="text-xs font-semibold text-[#0A0847CC] mb-1.5">Streak Start After</p>
            <div className="flex border border-[#E2DFFC] rounded-md overflow-hidden">
              <input
                value={s.streakStart}
                onChange={(e) => set("streakStart", e.target.value.replace(/\D/g, ""))}
                className="flex-1 px-3 py-2.5 text-xs text-[#0A0847] outline-none"
              />
              <span className="px-4 py-2.5 text-xs text-[#0A0847CC] bg-[#F8FAFC] border-l border-[#E2DFFC]">day</span>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold text-[#0A0847CC] mb-1.5">Max Streak Multiplier</p>
            <Select value={s.maxMultiplier} onChange={(v) => set("maxMultiplier", v)} options={["2x", "3x", "5x"]} />
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold text-[#0A0847CC] mb-1.5">Streak Bonus Type</p>
            <input
              value={s.streakBonusType}
              onChange={(e) => set("streakBonusType", e.target.value)}
              className="w-full border border-[#E2DFFC] rounded-md px-3 py-2.5 text-xs text-[#0A0847] outline-none focus:border-[#001984]"
            />
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold text-[#0A0847CC] mb-1.5">Bonus per Streak</p>
            <div className="flex border border-[#E2DFFC] rounded-md overflow-hidden">
              <input
                value={s.bonusPerStreak}
                onChange={(e) => set("bonusPerStreak", e.target.value)}
                className="flex-1 px-3 py-2.5 text-xs text-[#0A0847] outline-none"
              />
              <span className="px-4 py-2.5 text-xs text-[#0A0847CC] ">C</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div>
              <p className="text-xs font-semibold text-[#0A0847CC]">Daily Completion Chest</p>
              <p className="text-[10px] text-[#0A084799] font-medium mt-0.5">Award a chest when users finish journey & quiz mode.</p>
            </div>
            <Toggle checked={true} onChange={() => {}} />
          </div>

          <div className="flex items-center justify-between mt-4 mb-1.5">
            <p className="text-xs font-semibold text-[#0A0847CC]">Victory Card Reward</p>
            <Toggle checked={true} onChange={() => {}} />
          </div>
          <Select value="Every 5 Continuations" onChange={() => {}} options={["Every 5 Continuations"]} />
          <p className="text-[10px] text-[#0A084799] font-medium mt-1.5">Give a victory card after set number of continues.</p>
        </Card>
      </div>

      {/* Other Settings */}
      <div className="bg-white rounded-lg border border-[#E2DFFC] p-6">
        <h3 className="text-base font-semibold text-[#0A0847]">Other Settings</h3>
        <p className="text-[11px] text-[#0A084799] font-medium mb-5">
          Additional settings for the daily journey experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-5">
          {[
            ["showExplanations", "Show Explanations", "Show explanation after each question."],
            ["showVerse", "Show Bible Verse", "Display related Bible verse after each answer."],
            ["allowSkip", "Allow Skip Question", "Users can skip and get a new question."],
            ["shuffle", "Shuffle Questions", "Randomize questions every time."],
            ["reactionReport", "Answer Reaction Report", "Send summary report (answers)."],
            ["socialShare", "Enable Social Share", "Share results & invites and rewards."],
          ].map(([k, title, desc]) => (
            <div key={k} className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-[#0A0847]">{title}</p>
                <p className="text-[10px] text-[#0A084799] font-medium mt-0.5 max-w-[220px]">{desc}</p>
              </div>
              <Toggle checked={s[k]} onChange={(v) => set(k, v)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}