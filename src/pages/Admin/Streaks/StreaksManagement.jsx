import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft, FiSettings, FiSave, FiHexagon, FiClock, FiStar, FiUser,
  FiAward, FiShield, FiChevronDown, FiXCircle, FiPlus, FiCheckCircle, FiX,
} from "react-icons/fi";
import FirstSteps from "../../../assets/StreakManagemnetSvgs/FirstSteps.svg";
import ThreeDaysStreak from "../../../assets/StreakManagemnetSvgs/3daysStreak.svg";
import DailyDevotee from "../../../assets/StreakManagemnetSvgs/DailyDevotee.svg";
import ConsistentLearner from "../../../assets/StreakManagemnetSvgs/ConsistentLearner.svg";
import FaithfulLearner from "../../../assets/StreakManagemnetSvgs/FaithfulServant.svg";
import SteadyGrowth from "../../../assets/StreakManagemnetSvgs/SteadyGrowth.svg";
import FaithfulHeart from "../../../assets/StreakManagemnetSvgs/FaithfulHeart.svg";
import FaithfulServant from "../../../assets/StreakManagemnetSvgs/FaithfulServant.svg";
import StreakFeatureIcon from "../../../assets/StreakManagemnetSvgs/StreakFeatureIcon.svg";
import GuardIcon from "../../../assets/StreakManagemnetSvgs/GuardIcon.svg";
import StarIcon from "../../../assets/StreakManagemnetSvgs/StarIcon.svg";
import TrophyIcon from "../../../assets/StreakManagemnetSvgs/ThrophyIcon.svg";
import TimeIcon from "../../../assets/StreakManagemnetSvgs/TimeIcon.svg";
import UserIcon from "../../../assets/StreakManagemnetSvgs/UserIcon.svg";
import WhiteSaveIcon from "../../../assets/StreakManagemnetSvgs/WhiteSaveIcon.svg"


const RESET_TIMES = ["12:00 AM (User's local time)", "3:00 AM (User's local time)", "6:00 AM (User's local time)"];
const MIN_REQUIREMENTS = ["At least 1 activity per day", "At least 2 activities per day", "At least 3 activities per day"];
const GRACE_PERIODS = ["None", "15 minutes", "30 minutes", "50 minutes", "1 hour", "2 hours"];
const ACTIVITY_OPTIONS = ["Quiz Completion", "Bible Reading", "Memory Verses", "Prayer Log", "Group Play", "Journal Entry", "Daily Verse"];

const INITIAL = {
  featureEnabled: true,
  resetTime: RESET_TIMES[0],
  activities: ["Quiz Completion", "Bible Reading", "Memory Verses", "Prayer Log", "Group Play"],
  minRequirement: MIN_REQUIREMENTS[0],
  gracePeriod: "50 minutes",
  loginAloneCounts: false,
  protectionEnabled: true,
  milestones: [
  { id: 1, days: 1, points: 1, badge: "First Steps", icon: FirstSteps, active: true },
  { id: 2, days: 3, points: 3, badge: "3-Day Streak", icon: ThreeDaysStreak, active: true },
  { id: 3, days: 7, points: 10, badge: "Daily Devotee", icon: DailyDevotee, active: true },
  { id: 4, days: 14, points: 15, badge: "Consistent Learner", icon: ConsistentLearner, active: true },
  { id: 5, days: 30, points: 30, badge: "Faithful Learner", icon: FaithfulLearner, active: true },
  { id: 6, days: 60, points: 50, badge: "Steady Growth", icon: SteadyGrowth, active: true },
  { id: 7, days: 100, points: 75, badge: "Faithful Heart", icon: FaithfulHeart, active: true },
  { id: 8, days: 365, points: 150, badge: "Faithful Servant", icon: FaithfulServant, active: true },
],
};

const SvgIcon = ({ src, size = 16, className = "" }) => (
              <img src={src} alt="" width={size} height={size} className={`shrink-0 ${className}`} />
            );
            
    const StreakFeatureIconSvg = (p) => <SvgIcon src={StreakFeatureIcon} {...p} />;
    const GuardIconSvg = (p) => <SvgIcon src={GuardIcon} {...p} />;
    const StarIconSvg = (p) => <SvgIcon src={StarIcon} {...p} />;
    const TrophyIconSvg = (p) => <SvgIcon src={TrophyIcon} {...p} />;
    const TimeIconSvg = (p) => <SvgIcon src={TimeIcon} {...p} />;
    const UserIconSvg = (p) => <SvgIcon src={UserIcon} {...p} />;
    const WhiteSaveIconSvg = (p) => <SvgIcon src={WhiteSaveIcon} {...p} />;

const Toggle = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className={`w-9 h-5 rounded-full p-0.5 transition-colors shrink-0 cursor-pointer ${checked ? "bg-[#001984]" : "bg-gray-300"}`}
  >
    <span className={`block w-4 h-4 rounded-full bg-white transition-transform ${checked ? "translate-x-4" : ""}`} />
  </button>
);

const IconBox = ({ icon: Icon }) => (
  <div className="w-11 h-11 rounded-lg border border-[#E2DFFC] bg-white flex items-center justify-center shrink-0 text-[#001984]">
    <Icon size={24} />
  </div>
);

const SelectField = ({ value, onChange, options }) => (
  <div className="relative">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full appearance-none border border-[#E2DFFC] rounded-md px-3 py-3 pr-9 text-xs text-[#0A0847CC] bg-white outline-none focus:border-[#001984] cursor-pointer"
    >
      {options.map((o) => <option key={o}>{o}</option>)}
    </select>
    <FiChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
  </div>
);

const Card = ({ children, className = "" }) => (
  <div className={`border border-[#E2DFFC] rounded-lg p-5 bg-white ${className}`}>{children}</div>
);

export default function StreakManagementPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("Streak Settings");
  const [s, setS] = useState(INITIAL);
  const [addOpen, setAddOpen] = useState(false);
  const [toast, setToast] = useState(false);

  const set = (k, v) => setS((p) => ({ ...p, [k]: v }));

  const removeActivity = (a) => set("activities", s.activities.filter((x) => x !== a));
  const addActivity = (a) => {
    if (!a) return;
    set("activities", [...s.activities, a]);
    setAddOpen(false);
  };
  const toggleMilestone = (id) =>
    set("milestones", s.milestones.map((m) => (m.id === id ? { ...m, active: !m.active } : m)));

  const save = () => {
    console.log("Streak settings payload:", s);
    setToast(true);
    setTimeout(() => setToast(false), 3500);
  };

  const available = ACTIVITY_OPTIONS.filter((a) => !s.activities.includes(a));

  return (
    <div className="p-6 bg-[#F8FAFC] min-h-screen font-[Inter] space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => navigate(-1)} className="text-[#0A0847CC] cursor-pointer">
              <FiArrowLeft size={22} />
            </button>
            <h1 className="text-xl font-semibold text-[#0A0847]">Streak Management</h1>
          </div>
          <p className="text-sm text-[#0A084799] font-medium mt-2">
            Configure and manage daily streak rules for users.
          </p>
        </div>
        {toast && (
          <div className="flex items-center gap-3 bg-[#21AC1C0D] border border-[#B7E4B4] text-[#21AC1C] rounded-md pl-4 pr-3 py-3 text-xs font-semibold">
            <FiCheckCircle size={18} /> Streak settings saved.
            <button type="button" onClick={() => setToast(false)} className="ml-8 cursor-pointer"><FiX size={18} /></button>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center border-b border-[#E2DFFC]">
        {["Streak Settings", "Credit Packs & Bonuses"].map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`px-12 py-3.5 text-xs font-semibold rounded-t-md cursor-pointer transition-colors ${
              tab === t ? "bg-[#001984] text-white" : "text-[#0A0847CC] hover:text-[#001984]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab !== "Streak Settings" ? (
        <div className="bg-white border border-dashed border-[#E2DFFC] rounded-lg p-12 text-center text-xs font-medium text-gray-400">
          Credit Packs &amp; Bonuses isn't built yet.
        </div>
      ) : (
        <>
          {/* Streak Rules */}
          <div className="bg-white rounded-lg border border-[#E2DFFC] p-6 space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <FiSettings size={28} className="text-[#001984] mt-0.5" />
                <div>
                  <h2 className="text-lg font-semibold text-[#001984]">Streak Rules</h2>
                  <p className="text-xs text-[#0A084799] font-medium mt-1">
                    Set up how streaks work in the system. Save Settings
                  </p>
                </div>
              </div>
              <button type="button" onClick={save}
                className="px-6 py-3 bg-[#001984] hover:bg-[#001266] text-white rounded-md text-xs font-semibold flex items-center gap-2 cursor-pointer shrink-0">
                <WhiteSaveIconSvg size={14} /> Streak Settings
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="flex items-start gap-4">
                <IconBox icon={StreakFeatureIconSvg} />
                <div className="flex-1 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-base font-semibold text-[#0A0847CC]">Streak Feature</p>
                    <p className="text-xs text-[#0A084799] font-medium mt-1">Enable daily streaks for users</p>
                  </div>
                  <Toggle checked={s.featureEnabled} onChange={(v) => set("featureEnabled", v)} />
                </div>
              </Card>

              <Card className="flex items-start gap-4">
                <IconBox icon={TimeIconSvg} />
                <div className="flex-1 space-y-3">
                  <p className="text-base font-semibold text-[#0A0847CC]">Daily Reset Time</p>
                  <SelectField value={s.resetTime} onChange={(v) => set("resetTime", v)} options={RESET_TIMES} />
                </div>
              </Card>

              <Card>
                <p className="text-base font-semibold text-[#0A0847CC]">Qualifying Activities</p>
                <p className="text-xs text-[#0A084799] font-medium mt-1 mb-4">Activities that count toward a streak</p>
                <div className="flex flex-wrap gap-3">
                  {s.activities.map((a) => (
                    <span key={a} className="px-4 py-2.5 rounded-md bg-[#F3F2FF] border border-[#E2DFFC] text-[11px] font-semibold text-[#0A0847CC] flex items-center gap-3">
                      {a}
                      <button type="button" onClick={() => removeActivity(a)} className="text-[#001984] cursor-pointer">
                        <FiXCircle size={15} />
                      </button>
                    </span>
                  ))}
                  <div className="relative">
                    <button type="button" onClick={() => setAddOpen((o) => !o)}
                      disabled={!available.length}
                      className="px-4 py-2.5 rounded-md border border-dashed border-[#001984] text-[11px] font-semibold text-[#001984] flex items-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">
                      <FiPlus size={13} /> Add
                    </button>
                    {addOpen && (
                      <div className="absolute z-20 mt-2 w-44 bg-white border border-[#E2DFFC] rounded-md shadow-lg py-1">
                        {available.map((a) => (
                          <button key={a} type="button" onClick={() => addActivity(a)}
                            className="w-full text-left px-3 py-2 text-xs text-[#0A0847CC] hover:bg-gray-50 cursor-pointer">
                            {a}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Card>

              <Card className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-lg border border-[#E2DFFC] bg-white flex items-center justify-center shrink-0 text-[#001984]">
                  <StarIconSvg size={20} className="fill-[#001984]" />
                </div>
                <div className="flex-1 space-y-3">
                  <p className="text-base font-semibold text-[#0A0847CC]">Minimum Completion Requirement</p>
                  <SelectField value={s.minRequirement} onChange={(v) => set("minRequirement", v)} options={MIN_REQUIREMENTS} />
                </div>
              </Card>

              <Card className="flex items-start gap-4">
                <IconBox icon={TimeIconSvg} />
                <div className="flex-1 space-y-3">
                  <p className="text-base font-semibold text-[#0A0847CC]">Grace Period</p>
                  <SelectField value={s.gracePeriod} onChange={(v) => set("gracePeriod", v)} options={GRACE_PERIODS} />
                  <p className="text-xs italic text-[#0A084799]">
                    {s.gracePeriod === "None"
                      ? "No grace period after midnight."
                      : `Activity within ${s.gracePeriod.replace(" minutes", " mins")} after midnight counts for previous day`}
                  </p>
                </div>
              </Card>

              <Card className="flex items-start gap-4">
                <IconBox icon={UserIconSvg} />
                <div className="flex-1 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-base font-semibold text-[#0A0847CC]">Login Alone Counts?</p>
                    <p className="text-xs text-[#0A084799] font-medium mt-1">
                      {s.loginAloneCounts ? "Login alone counts toward a streak" : "Login without activity does NOT count"}
                    </p>
                  </div>
                  <Toggle checked={s.loginAloneCounts} onChange={(v) => set("loginAloneCounts", v)} />
                </div>
              </Card>
            </div>
          </div>

          {/* Milestones */}
          <div className="bg-white rounded-lg border border-[#E2DFFC] p-6 space-y-5">
            <div className="flex items-start gap-3">
              <TrophyIconSvg size={28} className="text-[#001984] mt-0.5" />
              <div>
                <h2 className="text-lg font-semibold text-[#001984]">Streak Milestones &amp; Rewards</h2>
                <p className="text-xs text-[#0A084799] font-medium mt-1">Points and badges awarded at each milestone.</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[640px]">
                <thead className="bg-[#F3F7FD]">
                  <tr className="text-sm text-[#0A0847CC]">
                    <th className="p-4 font-medium">Milestone (Days)</th>
                    <th className="p-4 font-medium">Points Awarded</th>
                    <th className="p-4 font-medium">Badge Awarded</th>
                    <th className="p-4 font-medium text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2DFFC] text-[#0A0847CC]">
                  {s.milestones.map((m) => (
                    <tr key={m.id} className="hover:bg-gray-50/50">
                      <td className="p-4 font-medium">{m.days}</td>
                      <td className="p-4 font-medium">+{m.points}</td>
                      <td className="p-4">
                        <span className="flex items-center gap-3 font-semibold">
                            <img src={m.icon} alt={m.badge} className="w-8 h-8 object-contain" />
                            {m.badge}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex justify-center">
                          <Toggle checked={m.active} onChange={() => toggleMilestone(m.id)} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Protection */}
          <div className="bg-white rounded-lg border border-[#E2DFFC] p-6 flex items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <GuardIconSvg size={28} className="text-[#001984] mt-0.5" />
              <div>
                <h2 className="text-lg font-semibold text-[#001984]">Streak Protection</h2>
                <p className="text-xs text-[#0A084799] font-medium mt-1">
                  Allow users to use a Streak Shield to avoid losing a streak for one missed day.
                </p>
              </div>
            </div>
            <Toggle checked={s.protectionEnabled} onChange={(v) => set("protectionEnabled", v)} />
          </div>
        </>
      )}
    </div>
  );
}