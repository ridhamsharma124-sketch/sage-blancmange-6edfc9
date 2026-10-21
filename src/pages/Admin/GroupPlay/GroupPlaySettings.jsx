import React, { useState } from "react";
import {
  FiUsers,
  FiClock,
  FiMessageSquare,
  FiBookOpen,
  FiSettings,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiUpload,
  FiInfo,
  FiCheck,
  FiChevronDown,
  FiSliders,
  FiMoreHorizontal
} from "react-icons/fi";
import { MdDragIndicator } from "react-icons/md";
import ThreeUsers from "../../../assets/GroupPlaysvgs/threeusersUnfilled.svg";
import CogIcon from "../../../assets/GroupPlaysvgs/CogIcon.svg";
import GameRemoteIcon from "../../../assets/GroupPlaysvgs/GameRemoteicon.svg";
import MessageIcon from "../../../assets/GroupPlaysvgs/MessageIcon.svg";
import GreenChatIcon from "../../../assets/GroupPlaysvgs/GreenChatIcon.svg";
import PurpleTime from "../../../assets/GroupPlaysvgs/PurpleTime.svg";
import ThreeUsersIcon from "../../../assets/GroupPlaysvgs/ThreeUsers.svg";
import TwoUsersIcon from "../../../assets/GroupPlaysvgs/TwoUsersIcon.svg";
import UploadIcon from "../../../assets/GroupPlaysvgs/UploadIcon.svg";
import TrashRedIcon from "../../../assets/GroupPlaysvgs/TrashRedIcon.svg";
import EditIcon from "../../../assets/GroupPlaysvgs/Edit.svg";

// ==========================================
// MOCK API DATA (Simulated Backend Response)
// ==========================================
const INITIAL_SETTINGS_API_DATA = {
  stats: {
    maxMembers: 50,
    roomExpiryHours: 24,
    chatAllowed: true,
    teamModeAllowed: true,
  },
  roomConfig: {
    roomExpiry: "24 Hours",
    maxMembers: 50,
    lateJoin: true,
    autoStart: false,
    roomCodeType: "auto", // 'auto' | 'custom'
  },
  categories: [
    { id: "oldTestament", name: "Old Testament", count: "240 Questions", selected: true },
    { id: "newTestament", name: "New Testament", count: "310 Questions", selected: true },
    { id: "peopleOfBible", name: "People of the Bible", count: "185 Questions", selected: true },
    { id: "bibleHeroes", name: "Bible Heroes", count: "120 Questions", selected: true },
    { id: "faithLife", name: "Faith & Life", count: "205 Questions", selected: true },
    { id: "churchMinistry", name: "Church & Ministry", count: "95 Questions", selected: false },
    { id: "generalKnowledge", name: "General Knowledge", count: "150 Questions", selected: false },
  ],
  chatSettings: {
    enableChat: true,
    chatDuringGame: true,
    chatDuringDiscussion: true,
    moderateChat: false,
    allowReactions: true,
  },
  teamSettings: {
    enableTeamMode: true,
    maxTeams: "5",
    teamJoinType: "manual", // 'manual' | 'auto'
  },
  prayers: {
    opening: [
      "Let's Pray Together",
      "Start Prayer",
      "Prayer for Unity",
      "Prayer for Guidance",
      "Thank You Lord",
    ],
    closing: [
      "Closing Grace",
      "Peace & Blessings",
      "Final Prayer",
    ],
  },
  otherSettings: {
    showLeaderboard: true,
    showCorrectAnswer: true,
    allowPause: true,
    showExplanation: false,
    enableBgMusic: true,
  },
  imageLibrary: {
    autoAssignNewGroups: true,
    allowHostsChangeImage: true,
    randomizeImages: false,
    tabs: ["All Images", "Truth", "Family", "Men", "Women", "Prayer", "Bible Study", "General"],
    images: [
      { id: 1, url: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=400&q=80" },
      { id: 2, url: "https://images.unsplash.com/photo-1519817650390-64a93db51149?w=400&q=80" },
      { id: 3, url: "https://images.unsplash.com/photo-1499209974431-9dac3cea0047?w=400&q=80" },
      { id: 4, url: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=400&q=80" },
      { id: 5, url: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&q=80" },
    ],
  },
};

// ==========================================
// REUSABLE COMPONENTS
// ==========================================

 const SvgIcon = ({ src, size = 16, className = "" }) => (
           <img src={src} alt="" width={size} height={size} className={`shrink-0 ${className}`} />
         );
         
    const CogIconSvg = (p) => <SvgIcon src={CogIcon} {...p} />;
    const ThreeUsersSvg = (p) => <SvgIcon src={ThreeUsers} {...p} />;
    const GameRemoteIconSvg = (p) => <SvgIcon src={GameRemoteIcon} {...p} />;
    const MessageIconSvg = (p) => <SvgIcon src={MessageIcon} {...p} />;
    const UploadIconSvg = (p) => <SvgIcon src={UploadIcon} {...p} />;
    const TrashIconSvg = (p) => <SvgIcon src={TrashRedIcon} {...p} />;
    const EditIconSvg = (p) => <SvgIcon src={EditIcon} {...p} />;

// 1. Reusable Card Header (Title, Subtitle, Icon)
const CardHeader = ({ icon: Icon, title, subtitle, rightElement }) => (
  <div className="flex items-center justify-between pb-2 border-b border-gray-100">
    <div className="flex items-center gap-2.5">
      {Icon && <Icon className="text-[#001984]" size={24} />}
      <div>
        <h3 className="text-sm font-semibold text-[#0A0847]">{title}</h3>
        {subtitle && <p className="text-xs text-[#0A084799] font-medium">{subtitle}</p>}
      </div>
    </div>
    {rightElement}
  </div>
);

// 2. Reusable Toggle Switch Field
const ToggleField = ({ label, description, checked, onChange, compact = false }) => (
  <div className={`flex items-center justify-between ${compact ? "gap-2" : "py-0.5"}`}>
    <div>
      <p className="font-semibold text-[#0A0847CC] text-xs">{label}</p>
      {description && <p className="text-[9.5px] text-gray-400 ">{description}</p>}
    </div>
    <label className="relative inline-flex items-center cursor-pointer shrink-0">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer"
      />
      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#001984]"></div>
    </label>
  </div>
);

// 3. Reusable Select Dropdown Field
const SelectField = ({ label, required, value, options, onChange, helperText }) => (
  <div>
    {label && (
      <label className="block font-semibold text-[#0A0847CC] text-xs mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
    )}
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-[#E2DFFC] rounded-lg p-2.5 bg-white text-xs text-[#0A0847] appearance-none focus:outline-none focus:border-[#001984]"
      >
        {options.map((opt, i) => (
          <option key={i} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <FiChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={14} />
    </div>
    {helperText && <p className="text-[9.5px] text-gray-400 mt-1">{helperText}</p>}
  </div>
);

const StatCard = ({ icon, iconBg, label, value, hint }) => (
  <div className="bg-white rounded-lg border border-[#E2DFFC] px-4 py-6 flex items-center gap-4">
    <div
      className={`w-13 h-13 rounded-2xl ${iconBg} flex items-center justify-center shrink-0`}
    >
         <img src={icon} alt="" className="w-7 h-7" />
    </div>
    <div>
      <p className="text-xs font-semibold text-[#0A084799]">{label}</p>
      <p className="text-lg font-semibold text-[#0A0847] mt-0.5">{value}</p>
      {hint && <p className="text-[11px] text-[#0A084799] font-medium mt-0.5">{hint}</p>}
    </div>
  </div>
);

// ==========================================
// MAIN COMPONENT
// ==========================================
const GroupPlaySettings = () => {
  // Master API State loaded at top
  const [apiData, setApiData] = useState(INITIAL_SETTINGS_API_DATA);
  const [openingPrayerTab, setOpeningPrayerTab] = useState(true);
  const [selectedCategoryTab, setSelectedCategoryTab] = useState("All Images");

  // Handler Helpers for nested API state updates
  const updateRoomConfig = (field, value) => {
    setApiData((prev) => ({
      ...prev,
      roomConfig: { ...prev.roomConfig, [field]: value },
    }));
  };

  const updateChatSetting = (field, value) => {
    setApiData((prev) => ({
      ...prev,
      chatSettings: { ...prev.chatSettings, [field]: value },
    }));
  };

  const updateTeamSetting = (field, value) => {
    setApiData((prev) => ({
      ...prev,
      teamSettings: { ...prev.teamSettings, [field]: value },
    }));
  };

  const updateOtherSetting = (field, value) => {
    setApiData((prev) => ({
      ...prev,
      otherSettings: { ...prev.otherSettings, [field]: value },
    }));
  };

  const updateImageLibrarySetting = (field, value) => {
    setApiData((prev) => ({
      ...prev,
      imageLibrary: { ...prev.imageLibrary, [field]: value },
    }));
  };

  const toggleCategory = (id) => {
    setApiData((prev) => ({
      ...prev,
      categories: prev.categories.map((c) =>
        c.id === id ? { ...c, selected: !c.selected } : c
      ),
    }));
  };

  const toggleAllCategories = () => {
    const allSelected = apiData.categories.every((c) => c.selected);
    setApiData((prev) => ({
      ...prev,
      categories: prev.categories.map((c) => ({ ...c, selected: !allSelected })),
    }));
  };

  return (
    <div className="p-6 bg-[#F8FAFC] min-h-screen space-y-6 text-[#0A0847] font-[Inter]">
      
      {/* 1. Header Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[#0A0847]">Group Play Settings</h1>
          <p className="text-sm text-[#0A084799] font-medium mt-1">
            Configure how Group Play rooms work and manage content.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="px-4 py-2.5 bg-white border border-[#001984] text-[#0A0847] text-xs font-semibold rounded-md flex items-center gap-2 hover:bg-gray-50 cursor-pointer"
          >
            View Group Play (App)
          </button>
          <button
            type="button"
            onClick={() => console.log("Saved API Payload:", apiData)}
            className="px-4 py-2.5 bg-[#001984] hover:bg-[#001984] text-white text-xs font-semibold rounded-md flex items-center gap-2 cursor-pointer"
          >
           <FiPlus size={18} /> Save All Changes
          </button>
        </div>
      </div>

      {/* 2. Top Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                icon={TwoUsersIcon}
                iconBg="bg-[#6209FD1A] text-[#3231DB]"
                label="Max Members per Room"
                value={apiData.stats.maxMembers}
                hint="members"
              />
              <StatCard
                icon={PurpleTime}
                iconBg="bg-[#6209FD1A] "
                label="Default Room Expiry"
                value={apiData.stats.roomExpiryHours}
                hint="hours"
              />
              <StatCard
                icon={GreenChatIcon}
                iconBg="bg-[#0895351A] text-[#3231DB]"
                label="Chat"
                value={apiData.stats.chatAllowed ? "Allowed" : "Disabled"}
                hint=""
              />
              <StatCard
                icon={ThreeUsersIcon}
                iconBg="bg-[#6209FD1A] text-[#C65406]"
                label="Team Mode"
                value={apiData.stats.teamModeAllowed ? "Allowed" : "Disabled"}
                hint=""
              />
            </div>

      {/* 3. Main Settings Grid (Row 1) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Room Configuration */}
        <div className="bg-white border border-[#E2DFFC] rounded-lg p-5 space-y-4">
          <CardHeader
            icon={CogIconSvg}
            title="Room Configuration"
            subtitle="Set default rules for all rooms."
          />

          <div className="space-y-3 text-xs">
            <SelectField
              label="Room Expiry Duration"
              required
              value={apiData.roomConfig.roomExpiry}
              options={["24 Hours", "12 Hours", "48 Hours"]}
              onChange={(val) => updateRoomConfig("roomExpiry", val)}
              helperText="How long a room can last before it expires."
            />

            <div>
              <label className="block font-semibold text-[#0A0847CC] mb-1">
                Maximum Members per Room <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={apiData.roomConfig.maxMembers}
                onChange={(e) => updateRoomConfig("maxMembers", e.target.value)}
                className="w-full border border-[#E2DFFC] rounded-xl p-2 bg-white text-xs text-[#0A0847] focus:outline-none focus:border-[#001984]"
              />
              <p className="text-[9.5px] text-gray-400 mt-1">Maximum number of players allowed in a room.</p>
            </div>

            <ToggleField
              label="Late Join"
              description="Allow players to join after the game has started."
              checked={apiData.roomConfig.lateJoin}
              onChange={(val) => updateRoomConfig("lateJoin", val)}
            />

            <ToggleField
              label="Auto Start Game"
              description="Start the game automatically when room is full."
              checked={apiData.roomConfig.autoStart}
              onChange={(val) => updateRoomConfig("autoStart", val)}
            />

            <div>
              <p className="font-semibold text-[#0A0847CC] mb-1.5">Room Code Type</p>
              <div className="flex items-center gap-4 text-xs">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="roomCodeType"
                    checked={apiData.roomConfig.roomCodeType === "auto"}
                    onChange={() => updateRoomConfig("roomCodeType", "auto")}
                    className="accent-[#1BA155]"
                  />
                  <span className={apiData.roomConfig.roomCodeType === "auto" ? "text-[#1BA155] font-semibold" : ""}>Auto Generate</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="roomCodeType"
                    checked={apiData.roomConfig.roomCodeType === "custom"}
                    onChange={() => updateRoomConfig("roomCodeType", "custom")}
                    className="accent-[#1BA155]"
                  />
                  <span className={apiData.roomConfig.roomCodeType === "custom" ? "text-[#1BA155] font-semibold" : ""}>Custom (Host can set)</span>
                </label>
              </div>
            </div>

          <div className="bg-[#0019840D] border border-[#AEB7E0] rounded-lg px-2.5 py-1 flex items-start gap-2 font-semibold text-[10px] text-[#0A084799]">
              <FiInfo className="text-[#0A084799] shrink-0 mt-0.5" size={12} />
              <span>These settings will be applied to all new rooms.</span>
            </div>
          </div>
        </div>

        {/* Card 2: Question Bank for Group Play */}
        <div className="bg-white border border-[#E2DFFC] rounded-lg p-5 space-y-4">
          <CardHeader
            icon={FiBookOpen}
            title="Question Bank for Group Play"
            subtitle="Select question categories for Group Play."
          />

          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[11px] text-[#0A0847CC]">Available Categories</span>
            <button
              type="button"
              onClick={toggleAllCategories}
              className="text-[#001984] text-[10px] font-semibold hover:underline cursor-pointer"
            >
              Select All
            </button>
          </div>

          <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
            {apiData.categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => toggleCategory(cat.id)}
                className="flex items-center justify-between py-1 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center ${
                      cat.selected ? "bg-[#259147] border-[#259147] text-white" : "border-gray-300"
                    }`}
                  >
                    {cat.selected && <FiCheck size={10} strokeWidth={3} />}
                  </div>
                  <span className="text-xs font-medium text-[#0A0847CC]">{cat.name}</span>
                </div>
                <span className="text-[10px] text-gray-400 bg-[#F3F2FF] px-2 py-0.5">
                  {cat.count}
                </span>
              </div>
            ))}
          </div>

          <div className="bg-[#0019840D] border border-[#AEB7E0] rounded-lg px-2.5 py-1 flex items-start gap-2 font-semibold text-[10px] text-[#0A084799]">
            <FiInfo className="text-[#0A084799] shrink-0 mt-0.5" size={12} />
            <span>Only selected categories will be available in Group Play.</span>
          </div>
        </div>

        {/* Card 3: Chat Settings */}
        <div className="bg-white border border-[#E2DFFC] rounded-lg p-5 space-y-4">
          <CardHeader
            icon={MessageIconSvg}
            title="Chat Settings"
            subtitle="Control chat and communication."
          />

          <div className="space-y-3.5 text-xs">
            <ToggleField
              label="Enable Chat"
              description="Allow players to chat during the game."
              checked={apiData.chatSettings.enableChat}
              onChange={(val) => updateChatSetting("enableChat", val)}
            />
            <ToggleField
              label="Chat During Game"
              description="Allow chat while questions are being answered."
              checked={apiData.chatSettings.chatDuringGame}
              onChange={(val) => updateChatSetting("chatDuringGame", val)}
            />
            <ToggleField
              label="Chat During Discussion"
              description="Allow chat during discussion time."
              checked={apiData.chatSettings.chatDuringDiscussion}
              onChange={(val) => updateChatSetting("chatDuringDiscussion", val)}
            />
            <ToggleField
              label="Moderate Chat"
              description="Allow host to pause chat/kick users."
              checked={apiData.chatSettings.moderateChat}
              onChange={(val) => updateChatSetting("moderateChat", val)}
            />
            <ToggleField
              label="Allow Reactions"
              description="Allow players to use reactions (thumbs, love, etc.)."
              checked={apiData.chatSettings.allowReactions}
              onChange={(val) => updateChatSetting("allowReactions", val)}
            />
          </div>
        </div>

      </div>

      {/* 4. Main Settings Grid (Row 2) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Card 4: Team Mode Settings */}
        <div className="bg-white border border-[#E2DFFC] rounded-lg p-5 space-y-4">
          <CardHeader
            icon={ThreeUsersSvg}
            title="Team Mode Settings"
            subtitle="Configure team play options."
          />

          <div className="space-y-3.5 text-xs">
            <ToggleField
              label="Enable Team Mode"
              description="Allow hosts to enable team mode."
              checked={apiData.teamSettings.enableTeamMode}
              onChange={(val) => updateTeamSetting("enableTeamMode", val)}
            />

            <SelectField
              label="Max Teams per Room"
              value={apiData.teamSettings.maxTeams}
              options={["5", "2", "4", "8"]}
              onChange={(val) => updateTeamSetting("maxTeams", val)}
              helperText="Maximum number of teams in a room."
            />

            <div>
              <p className="font-semibold text-[#0A0847] mb-1.5">Team Join Type</p>
              <div className="space-y-1.5 text-xs">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="teamJoinType"
                    checked={apiData.teamSettings.teamJoinType === "manual"}
                    onChange={() => updateTeamSetting("teamJoinType", "manual")}
                    className="accent-[#1BA155]"
                  />
                  <span className={apiData.teamSettings.teamJoinType === "manual" ? "text-[#1BA155] font-semibold" : ""}>Manual (Host assigns)</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="teamJoinType"
                    checked={apiData.teamSettings.teamJoinType === "auto"}
                    onChange={() => updateTeamSetting("teamJoinType", "auto")}
                    className="accent-[#1BA155]"
                  />
                  <span className={apiData.teamSettings.teamJoinType === "auto" ? "text-[#1BA155] font-semibold" : ""}>Auto (Players choose)</span>
                </label>
              </div>
            </div>

          <div className="bg-[#0019840D] border border-[#AEB7E0] rounded-lg px-2.5 py-1 flex items-start gap-2 font-semibold text-[10px] text-[#0A084799]">
              <FiInfo className="text-[#0A084799] shrink-0 mt-0.5" size={12} />
              <span>These settings will be applied to all new rooms.</span>
            </div>
          </div>
        </div>

        {/* Card 5: Opening & Closing Prayers */}
        <div className="bg-white border border-[#E2DFFC] rounded-lg p-5 space-y-4">
          <CardHeader
            icon={FiBookOpen}
            title="Opening & Closing Prayers"
            subtitle="Manage prayers for Group Play."
          />

          <div className="grid grid-cols-2 border-b border-[#E2DFFC] text-sm font-semibold text-center">
  <button
    type="button"
    onClick={() => setOpeningPrayerTab(true)}
    className={`pb-2.5 -mb-px border-b-2 text-xs transition-colors ${
      openingPrayerTab
        ? "border-[#001984] text-[#001984]"
        : "border-transparent text-gray-500 hover:text-[#0A0847]"
    }`}
  >
    Opening Prayers
  </button>
  <button
    type="button"
    onClick={() => setOpeningPrayerTab(false)}
    className={`pb-2.5 -mb-px border-b-2 text-xs transition-colors ${
      !openingPrayerTab
        ? "border-[#001984] text-[#001984]"
        : "border-transparent text-gray-500 hover:text-[#0A0847]"
    }`}
  >
    Closing Prayers
  </button>
</div>

          <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1">
  {(openingPrayerTab ? apiData.prayers.opening : apiData.prayers.closing).map((prayer, idx) => (
    <div key={idx} className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MdDragIndicator size={18} className="text-gray-400 cursor-grab shrink-0" />
        <span className="text-xs font-semibold text-[#0A0847CC]">{prayer}</span>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#E2DFFC] bg-white text-[#001984] hover:bg-[#EEF2FF] transition-colors"
        >
          <EditIconSvg size={16} />
        </button>
        <button
          type="button"
          className="w-7 h-7 flex items-center justify-center rounded-lg border border-red-200 text-red-500 hover:bg-red-100 transition-colors"
        >
          <TrashIconSvg size={16} />
        </button>
      </div>
    </div>
  ))}
</div>

          <button
  type="button"
  className="w-full py-2.5 border-1 border-[#001984] rounded-lg text-xs font-semibold text-[#001984] hover:bg-[#EEF2FF] transition-colors flex items-center justify-center gap-2"
>
  <FiPlus size={16} /> Add New {openingPrayerTab ? "Opening" : "Closing"} Prayer
</button>
        </div>

        {/* Card 6: Other Game Settings */}
        <div className="bg-white border border-[#E2DFFC] rounded-lg p-5 space-y-4">
          <CardHeader
            icon={GameRemoteIconSvg}
            title="Other Game Settings"
            subtitle="Additional game behavior settings."
          />

          <div className="space-y-3 text-xs">
            <ToggleField
              label="Show Leaderboard"
              description="Display leaderboard during the game."
              checked={apiData.otherSettings.showLeaderboard}
              onChange={(val) => updateOtherSetting("showLeaderboard", val)}
            />
            <ToggleField
              label="Show Correct Answer Immediately"
              description="Show correct answer right after each question."
              checked={apiData.otherSettings.showCorrectAnswer}
              onChange={(val) => updateOtherSetting("showCorrectAnswer", val)}
            />
            <ToggleField
              label="Allow Pause for Discussion"
              description="Host can pause to discuss the answers."
              checked={apiData.otherSettings.allowPause}
              onChange={(val) => updateOtherSetting("allowPause", val)}
            />
            <ToggleField
              label="Show Explanation"
              description="Show explanation after each question."
              checked={apiData.otherSettings.showExplanation}
              onChange={(val) => updateOtherSetting("showExplanation", val)}
            />
            <ToggleField
              label="Enable Room Background Music"
              description="Play soft background music in waiting room."
              checked={apiData.otherSettings.enableBgMusic}
              onChange={(val) => updateOtherSetting("enableBgMusic", val)}
            />
          </div>
        </div>

      </div>

      {/* 5. Group Image Library Section */}
      <div className="bg-white border border-[#E2DFFC] rounded-lg p-5 space-y-5">
  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
    <CardHeader
      icon={FiUsers}
      title="Group Image Library"
      subtitle="Upload and manage images automatically assigned to newly created groups."
    />

    <div className="flex flex-wrap items-center gap-5 text-xs font-semibold">
      <button
        type="button"
        className="px-6 py-1.5 bg-[#001984] text-white rounded-md flex items-center gap-2 text-sm hover:bg-[#001366] transition-colors"
      >
        <FiUpload size={16} /> Upload Images
      </button>

      <div className="max-w-[150px] leading-tight text-[#0A0847]">
        <ToggleField
          compact
          label="Auto-Assign to New Groups"
          checked={apiData.imageLibrary.autoAssignNewGroups}
          onChange={(val) => updateImageLibrarySetting("autoAssignNewGroups", val)}
        />
      </div>

      <div className="max-w-[150px] leading-tight text-[#0A0847]">
        <ToggleField
          compact
          label="Allow Hosts to Change Image"
          checked={apiData.imageLibrary.allowHostsChangeImage}
          onChange={(val) => updateImageLibrarySetting("allowHostsChangeImage", val)}
        />
      </div>

      <div className="text-[#0A0847]">
        <ToggleField
          compact
          label="Randomize Images"
          checked={apiData.imageLibrary.randomizeImages}
          onChange={(val) => updateImageLibrarySetting("randomizeImages", val)}
        />
      </div>
    </div>
  </div>

  {/* Category Tabs */}
  <div className="flex items-center gap-3 overflow-x-auto pb-1 text-xs font-semibold">
    {apiData.imageLibrary.tabs.map((tab) => (
      <button
        key={tab}
        type="button"
        onClick={() => setSelectedCategoryTab(tab)}
        className={`min-w-[72px] px-4 py-2 rounded-md border bg-white whitespace-nowrap transition-colors ${
          selectedCategoryTab === tab
            ? "border-[#001984] text-[#001984] font-bold"
            : "border-[#E2DFFC] text-[#0A0847] hover:bg-gray-50"
        }`}
      >
        {tab}
      </button>
    ))}
  </div>

  {/* Image Grid */}
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
    {apiData.imageLibrary.images.map((item) => (
      <div
        key={item.id}
        className="group relative rounded-lg overflow-hidden border border-[#E2DFFC] bg-gray-100 aspect-[4/3]"
      >
        <img
          src={item.url}
          alt="Group Library"
          className="w-full h-full object-cover"
        />

        <button
          type="button"
          className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60"
        >
          <FiMoreHorizontal size={12} />
        </button>

        <button
          type="button"
          className="absolute bottom-1.5 right-1.5 px-2.5 py-0.5 bg-white rounded text-[10px] font-semibold text-green-600 shadow-sm hover:bg-green-50"
        >
          Activate
        </button>
      </div>
    ))}

    <div className="border border-dashed border-[#D1D5DB] hover:border-[#001984] rounded-lg p-3 flex flex-col items-center justify-center text-center cursor-pointer bg-white transition-colors aspect-[4/3] group">
      <UploadIconSvg
        className="text-[#001984] mb-1.5"
        size={24}
      />
      <p className="text-[11px] font-bold text-[#0A0847]">Upload More Images</p>
      <p className="text-[9px] text-gray-500 mt-0.5">
        Recommended 1600 × 400 • JPG or PNG
      </p>
    </div>
  </div>

  {/* Footer Pagination */}
  <div className="flex items-center justify-between pt-2 text-xs text-gray-500">
    <div className="flex items-center gap-2">
      <span>Display</span>
      <select className="border border-[#E2DFFC] rounded-md px-2 py-1 text-xs bg-white text-[#0A0847]">
        <option>10</option>
        <option>20</option>
        <option>50</option>
      </select>
      <span>images</span>
    </div>

    <div className="flex items-center gap-1 font-semibold">
      <button type="button" className="w-7 h-7 rounded-md border border-[#E2DFFC] text-gray-400 flex items-center justify-center">‹</button>
      <button type="button" className="w-7 h-7 rounded-md bg-[#001984] text-white flex items-center justify-center">1</button>
      {[2, 3, 4, 5].map((n) => (
        <button key={n} type="button" className="w-7 h-7 rounded-md hover:bg-gray-100 flex items-center justify-center">
          {n}
        </button>
      ))}
      <button type="button" className="w-7 h-7 rounded-md border border-[#001984] text-[#001984] flex items-center justify-center">›</button>
    </div>
  </div>
</div>

    </div>
  );
};

export default GroupPlaySettings;