import React, { useState, useRef, useEffect } from "react";
import {
  FiSave,
  FiEye,
  FiArrowRight,
  FiArrowLeft,
  FiPlus,
  FiCalendar,
  FiClock,
  FiGlobe,
  FiUpload,
  FiTrash2,
  FiEdit2,
  FiPlay,
  FiRefreshCw,
  FiCheck,
  FiBold,
  FiItalic,
  FiUnderline,
  FiLink,
  FiList,
  FiImage,
  FiVideo,
  FiUsers,
  FiShare2,
  FiXCircle,
  FiChevronDown,
  FiX,
  FiUploadCloud,
  FiInfo,
} from "react-icons/fi";
import {
  BsBook,
  BsHeart,
  BsChatSquareQuote,
  BsAward,
  BsVolumeUp,
  BsShare,
  BsSend,
  BsFillInfoCircleFill,
  BsCheckCircleFill,
} from "react-icons/bs";
import CalendarIcon from "../../../assets/dailyVerseSvgs/CalenderIcon.svg";
import EarthIcon from "../../../assets/dailyVerseSvgs/EarthIcon.svg";
import SaveIcon from "../../../assets/dailyVerseSvgs/SaveIcon.svg";
import TimeIcon from "../../../assets/dailyVerseSvgs/TimeIcon.svg";
import UploadIcon from "../../../assets/dailyVerseSvgs/UploadIcon.svg";
import VerseAction from "../../../assets/dailyVerseSvgs/VerseAction.svg";
import ChurchBookIcon from "../../../assets/dailyVerseSvgs/ChurchBookIcon.svg";
import HeadPhoneIcon from "../../../assets/dailyVerseSvgs/HeadPhoneIcon.svg";
import DeleteIcon from "../../../assets/dailyVerseSvgs/DeleteIcon.svg"
import ReplaceIcon from "../../../assets/dailyVerseSvgs/ReplaceIcon.svg"
import PauseIcon from "../../../assets/dailyVerseSvgs/PauseIcon.svg"
import Uploadicon2 from "../../../assets/dailyVerseSvgs/Uploadicon2.svg"
import Coin from "../../../assets/dailyVerseSvgs/Coin.png";
import PublishingIcon from "../../../assets/dailyVerseSvgs/PublishingIcon.svg";
import RewardsIcon from "../../../assets/dailyVerseSvgs/RewardsIcon.svg";
import VideoPlay from "../../../assets/dailyVerseSvgs/VideoPlay.svg";
import TableImg from "../../../assets/dailyVerseSvgs/tableImg.png";

/* ==========================================================================
   REUSABLE ATOMIC & STYLED COMPONENTS
   ========================================================================== */

const SvgIcon = ({ src, size = 16, className = "" }) => (
  <img src={src} alt="" width={size} height={size} className={`shrink-0 ${className}`} />
);
const SaveSvg = (p) => <SvgIcon src={SaveIcon} {...p} />;
const TimeSvg = (p) => <SvgIcon src={TimeIcon} {...p} />;
const EarthSvg = (p) => <SvgIcon src={EarthIcon} {...p} />;
const CalendarSvg = (p) => <SvgIcon src={CalendarIcon} {...p} />;
const UploadSvg = (p) => <SvgIcon src={UploadIcon} {...p} />;
const VerseActionSvg = (p) => <SvgIcon src={VerseAction} {...p} />;
const ChurchBookSvg = (p) => <SvgIcon src={ChurchBookIcon} {...p} />;
const HeadPhoneSvg = (p) => <SvgIcon src={HeadPhoneIcon} {...p} />;
const DeleteSvg = (p) => <SvgIcon src={DeleteIcon} {...p} />;
const ReplaceSvg = (p) => <SvgIcon src={ReplaceIcon} {...p} />;
const PauseSvg = (p) => <SvgIcon src={PauseIcon} {...p} />;
const UploadSvg2 = (p) => <SvgIcon src={Uploadicon2} {...p} />;
const PublishingSvg = (p) => <SvgIcon src={PublishingIcon} {...p} />;
const RewardsSvg = (p) => <SvgIcon src={RewardsIcon} {...p} />;
const VideoPlaySvg = (p) => <SvgIcon src={VideoPlay} {...p} />;


/** Reusable Input Styling */
const Input = ({ className = "", ...props }) => (
  <input
    className={`w-full border border-[#E2DFFC] rounded-md px-3 py-3 text-xs text-[#0A0847] placeholder-gray-400 bg-white outline-none focus:border-[#001984] focus:ring-[#001984] transition-all ${className}`}
    {...props}
  />
);

/** Reusable Select Styling */
const Select = ({ children, className = "", ...props }) => (
  <select
    className={`w-full border border-[#E2DFFC] rounded-md px-3 py-3 text-xs text-[#0A0847] bg-white outline-none focus:border-[#001984] focus:ring-[#001984] transition-all cursor-pointer ${className}`}
    {...props}
  >
    {children}
  </select>
);

/** Label Component */
const Label = ({ children, required }) => (
  <label className="block text-xs font-semibold text-[#0A0847CC] mb-1.5">
    {children} {required && <span className="text-red-500">*</span>}
  </label>
);

/** Custom Toggle Switch Component */
const Toggle = ({ checked, onChange, label }) => (
  <label className="inline-flex items-center gap-2 cursor-pointer select-none">
    <div
      onClick={() => onChange(!checked)}
      className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-200 ease-in-out ${
        checked ? "bg-[#001984]" : "bg-gray-200"
      }`}
    >
      <div
        className={`w-4 h-4 rounded-full bg-white transform transition-transform duration-200 ease-in-out ${
          checked ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </div>
    {label && (
      <span className="text-xs font-semibold text-[#0A0847]">{label}</span>
    )}
  </label>
);

/** Time Picker Dropdowns (Hour and Minute Selectors) */
const TimePickerPopover = ({
  value,
  onChange,
  placeholder = "Select time",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef(null);

  // Parse existing value or set defaults
  const [hour, minute, ampm] = value ? value.split(/:| /) : ["06", "00", "AM"];

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const updateTime = (newH, newM, newA) => {
    onChange(`${newH}:${newM} ${newA}`);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange("");
  };

  const hoursList = Array.from({ length: 12 }, (_, i) =>
    String(i + 1).padStart(2, "0"),
  );
  const minutesList = [
    "00",
    "05",
    "10",
    "15",
    "20",
    "25",
    "30",
    "35",
    "40",
    "45",
    "50",
    "55",
  ];

  return (
    <div className="relative inline-block w-full" ref={popoverRef}>
      {/* Time Input Pill (Matches Screenshot UI) */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between h-10 bg-white border border-[#E2DFFC] rounded-md px-3.5 cursor-pointer hover:border-[#001984] transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <TimeSvg size={18} />
          <span
            className={`text-xs  ${value ? "text-[#0A0847]" : "text-gray-400"}`}
          >
            {value || placeholder}
          </span>
        </div>

        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="text-gray-400 hover:text-gray-600 p-0.5 rounded-full transition-colors"
          >
            <FiX size={14} />
          </button>
        )}
      </div>

      {/* Popover Dialogue for Hours, Minutes, AM/PM Selection */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 z-50 bg-white border border-[#E2DFFC] rounded-md p-4 w-64 space-y-3">
          <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            Select Time
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            {/* Hours Column */}
            <div>
              <p className="text-[10px] font-bold text-[#0A084799] mb-1">
                Hours
              </p>
              <div className="h-36 overflow-y-auto space-y-1 border-r border-gray-100 pr-1 scrollbar-thin">
                {hoursList.map((h) => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => updateTime(h, minute, ampm)}
                    className={`w-full py-1 text-xs font-semibold rounded-lg transition-colors ${
                      hour === h
                        ? "bg-[#001984] text-white"
                        : "text-[#0A0847] hover:bg-gray-100"
                    }`}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </div>

            {/* Minutes Column */}
            <div>
              <p className="text-[10px] font-bold text-[#0A084799] mb-1">
                Minutes
              </p>
              <div className="h-36 overflow-y-auto space-y-1 border-r border-gray-100 pr-1 scrollbar-thin">
                {minutesList.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => updateTime(hour, m, ampm)}
                    className={`w-full py-1 text-xs font-semibold rounded-lg transition-colors ${
                      minute === m
                        ? "bg-[#001984] text-white"
                        : "text-[#0A0847] hover:bg-gray-100"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* AM / PM Column */}
            <div>
              <p className="text-[10px] font-bold text-[#0A084799] mb-1">
                Period
              </p>
              <div className="space-y-1">
                {["AM", "PM"].map((period) => (
                  <button
                    key={period}
                    type="button"
                    onClick={() => updateTime(hour, minute, period)}
                    className={`w-full py-1.5 text-xs font-bold rounded-lg transition-colors ${
                      ampm === period
                        ? "bg-[#001984] text-white"
                        : "text-[#0A0847] hover:bg-gray-100"
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/** Section Header Block */
const SectionHeader = ({
  icon: Icon,
  title,
  subtitle,
  iconBg = "bg-[#3231DB1A] text-[#3231DB]",
}) => (
  <div className="flex items-center gap-3 mb-5">
    <div
      className={`w-10 h-10 rounded-lg ${iconBg} flex items-center justify-center shrink-0`}
    >
      <Icon size={20} />
    </div>
    <div>
      <h3 className="font-semibold text-sm text-[#0A0847]">{title}</h3>
      {subtitle && (
        <p className="text-[11px] text-[#0A084799] italic font-medium">
          {subtitle}
        </p>
      )}
    </div>
  </div>
);

const audioBtn =
  "h-11 w-full px-6 rounded-md text-xs font-semibold flex items-center justify-center gap-2 border transition-colors cursor-pointer";

/* ==========================================================================
   MAIN ADD DAILY VERSE FORM COMPONENT
   ========================================================================== */
export default function AddDailyVerseWizard({ onCancel }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [imgError, setImgError] = useState(false);

  // Hidden File Inputs Refs
  const bgImageRef = useRef(null);
  const audioFileRef = useRef(null);
  const mediaFileRef = useRef(null);

  // Rich Text Styles for Prayer Body
  const [textFormatting, setTextFormatting] = useState({
    bold: false,
    italic: false,
    underline: false,
  });

  // COMPLETE UNIFIED FORM DATA STATE
  const [formData, setFormData] = useState({
    // Step 1 State
    displayDate: "",
    startTime: "06:00 AM",
    endTime: "11:59 PM",
    timeZone: "(UTC-04:00) US/Eastern Time",
    showOnFirstLogin: false,
    allowClose: true,
    keepAccessible: true,
    backgroundImage:
      "https://images.unsplash.com/photo-1509021436468-1b2a38325b51?auto=format&fit=crop&w=1200&q=80",
    imageAltText: "",
    scriptureRef: "",
    defaultVersion: "NIV",
    verseText: "",
    activeTranslations: ["NIV"],
    dailyTakeaway: "",
    audioFile: null,
    audioFileName: "",
    transcriptEnabled: true,
    playbackSpeed: "0.75x",
    highlightWords: true,
    chapterBook: "Psalms",
    chapterNum: "23",
    enableSave: true,
    enableShare: true,

    // Step 2 State
    selectedQuestion: "",
    selectedRotation: "Psalm 23:2",
    screenSelector: "New Feature (Launch App)",
    inspiresText: "",
    motivationText: "",
    prayerLoving: "",
    relationshipWith: "",
    prayerBody: "",
    appliedMedia: [],
    scriptureMediaList: [
      {
        id: "1",
        name: "Mountain-cross-light.jpg",
        size: "1920×1080px",
        url: "https://images.unsplash.com/photo-1509021436468-1b2a38325b51?auto=format&fit=crop&w=120&q=80",
      },
      {
        id: "2",
        name: "Mountain-cross-light.jpg",
        size: "1920×1080px",
        url: "https://images.unsplash.com/photo-1509021436468-1b2a38325b51?auto=format&fit=crop&w=120&q=80",
      },
    ],
    searchStock: true,
    searchScripture: false,
    enableReflection: true,
    reflectionTitle: "",
    reflectionLimit: "150",
    focusPrompt: "",
    rewardType: "Coins",
    rewardAmount: "",
    enablePersonalPrayer: true,
    personalPrayerPrompt: "",
    strongPrayer: "",
    visibleMode: "User Group",
    visibilityTo: "Only Me (Don't Add)",
  });

  // State Handler Helper
  const updateField = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // Form Submit / Console Log
  const handleSave = (actionType) => {
    console.log(`Action Executed: ${actionType}`);
    console.log("Full Form Payload:", formData);
    alert(
      `Form submitted! Check browser console for full payload. Action: ${actionType}`,
    );
  };

  // Upload Handlers
  const handleBgImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImgError(false);
      updateField("backgroundImage", URL.createObjectURL(file));
    }
  };

  const handleAudioUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      updateField("audioFile", file);
      updateField("audioFileName", file.name);
    }
  };

  const handleApplyMediaUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newMedia = {
        id: crypto.randomUUID(),
        name: file.name,
        size: "Uploaded File",
        url: URL.createObjectURL(file),
      };
      updateField("appliedMedia", [...formData.appliedMedia, newMedia]);
    }
  };

  const handleRemoveScriptureMedia = (id) => {
    updateField(
      "scriptureMediaList",
      formData.scriptureMediaList.filter((item) => item.id !== id),
    );
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen p-6 font-[Inter] space-y-6">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-[#0A0847]">Add Daily Verse</h1>
          <p className="text-sm text-[#0A084799] font-medium mt-2">
            Create and customize your daily verse experience
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSave("Draft Saved")}
            className="px-4 py-2 bg-white border border-[#E2DFFC] rounded-md text-xs font-semibold text-[#0A0847] hover:bg-gray-50 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <SaveSvg size={18} /> Save draft
          </button>
          <button
            onClick={() => handleSave("Preview 3 Screens")}
            className="px-4 py-2 bg-white border border-[#E2DFFC] rounded-md text-xs font-semibold text-[#0A0847] hover:bg-gray-50 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <FiEye size={18} /> Preview All 2 Screens
          </button>
          {currentStep === 1 ? (
            <button
              onClick={() => setCurrentStep(2)}
              className="px-4 py-2 bg-[#001984] text-white rounded-md text-xs font-semibold hover:bg-[#001266] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              Next <FiArrowRight size={18} />
            </button>
          ) : (
            <button
              onClick={() => handleSave("Schedule / Published")}
              className="px-4 py-2 bg-[#001984] text-white rounded-md text-xs font-semibold hover:bg-[#001266] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              Schedule Now
            </button>
          )}
        </div>
      </div>

      {/* Stepper Navigation Indicator */}
      <div className="flex items-center gap-6 pb-2">
        <div
          onClick={() => setCurrentStep(1)}
          className={`flex items-center gap-2 cursor-pointer ${
            currentStep === 1
              ? "text-[#001984] font-bold"
              : "text-gray-400 font-medium"
          }`}
        >
          <span
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
              currentStep === 1
                ? "bg-[#001984] text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            1
          </span>
          <span className="text-xs">Verse & Display</span>
        </div>

        <div className="h-0.5 w-8 bg-gray-200" />

        <div
          onClick={() => setCurrentStep(2)}
          className={`flex items-center gap-2 cursor-pointer ${
            currentStep === 2
              ? "text-[#001984] font-bold"
              : "text-gray-400 font-medium"
          }`}
        >
          <span
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
              currentStep === 2
                ? "bg-[#001984] text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            2
          </span>
          <span className="text-xs">Reflection & Prayer</span>
        </div>
      </div>

      {/* ===================================================================
          STEP 1 CONTENT: VERSE & DISPLAY
          =================================================================== */}
      {currentStep === 1 && (
        <div className="space-y-6">
          {/* Card 1: Schedule & Display */}
          <div className="bg-white rounded-lg border border-[#E2DFFC] p-6 space-y-5">
            <SectionHeader
              icon={CalendarSvg}
              title="Schedule & Display"
              subtitle="Set when and how your verse will be displayed"
            />

            <div className="flex flex-wrap items-end gap-x-6 gap-y-4">
              {/* Display Date */}
              <div className="w-full sm:w-56">
                <Label>Display Date</Label>
                <div className="relative">
                  <CalendarSvg size={16} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="date"
                    placeholder="mm/dd/yyyy"
                    value={formData.displayDate}
                    onChange={(e) => updateField("displayDate", e.target.value)}
                    className="w-full h-10 bg-white border border-[#E2DFFC] rounded-md px-9 text-xs text-[#0A0847] placeholder-gray-400 outline-none focus:border-[#001984] appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                  />
                  {/* <FiCalendar
                    size={14}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                  /> */}
                </div>
              </div>

              {/* Start Time */}
              <div className="w-44">
                <Label>Start Time</Label>
                <TimePickerPopover
                  value={formData.startTime}
                  onChange={(val) => updateField("startTime", val)}
                />
              </div>

              {/* End Time */}
              <div className="w-44">
                <Label>End Time</Label>
                <TimePickerPopover
                  value={formData.endTime}
                  onChange={(val) => updateField("endTime", val)}
                />
              </div>

              {/* Time Zone */}
              <div className="flex-1 w-[240px]">
                <Label>Time Zone</Label>
                <div className="relative inline-block">
                  <EarthSvg size={16} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    value={formData.timeZone}
                    onChange={(e) => updateField("timeZone", e.target.value)}
                    className="h-10 appearance-none bg-white border border-[#E2DFFC] rounded-md px-9 pr-8 text-xs text-[#0A0847] outline-none focus:border-[#001984] cursor-pointer"
                  >
                    <option value="America/New_York">
                      (UTC-04:00) US/Eastern Time
                    </option>
                    <option value="GMT">(UTC+00:00) GMT</option>
                    <option value="Asia/Kolkata">
                      (UTC+05:30) India Standard Time
                    </option>
                  </select>
                  <FiChevronDown
                    size={14}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                </div>
              </div>
            </div>

            {/* Toggles Row */}
            <div className="flex flex-wrap items-center gap-8 pt-2">
              <Toggle
                label="Show on first login only"
                checked={formData.showOnFirstLogin}
                onChange={(val) => updateField("showOnFirstLogin", val)}
              />
              <Toggle
                label="Allow users to close"
                checked={formData.allowClose}
                onChange={(val) => updateField("allowClose", val)}
              />
              <Toggle
                label="Keep accessible from Home"
                checked={formData.keepAccessible}
                onChange={(val) => updateField("keepAccessible", val)}
              />
            </div>
          </div>

          {/* Card 2: Background Image */}
          <div className="bg-white rounded-lg border border-[#E2DFFC] p-6">
            <SectionHeader
              icon={FiImage}
              title="Background Image"
              subtitle="Add a visually inspiring background"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
              <div>
                <label className="block text-base font-bold text-[#0A0847] mb-3">
                  Attach Your Files
                </label>
                <input
                  type="file"
                  ref={bgImageRef}
                  onChange={handleBgImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                <div
                  onClick={() => bgImageRef.current?.click()}
                  className="border border-dashed border-[#001984] h-26 flex items-center justify-center gap-3 bg-[#F5F5FF] hover:bg-[#EEEEFF] transition-colors cursor-pointer"
                >
                  <UploadSvg size={36} />
                  <span className="text-sm font-semibold text-[#0A0847]">
                    Upload / Replace Image
                  </span>
                </div>
                <p className="text-xs font-semibold text-[#0A0847] mt-3">
                  Recommended: 1920 × 600 px
                </p>

                <div className="mt-4">
                  <Label>Image Alt Text</Label>
                  <Input
                    placeholder="Sunrise over mountains with cross"
                    value={formData.imageAltText}
                    onChange={(e) =>
                      updateField("imageAltText", e.target.value)
                    }
                  />
                </div>
              </div>

              {/* Preview Banner */}
              <div className="relative rounded-lg overflow-hidden border border-[#E2DFFC] group bg-gray-100 h-full min-h-56 flex items-center justify-center">
                {formData.backgroundImage && !imgError ? (
                  <>
                    <img
                      src={formData.backgroundImage}
                      alt="Background preview"
                      onError={() => setImgError(true)}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => bgImageRef.current?.click()}
                      className="absolute top-3 right-3 p-2 rounded-full bg-[#001984] hover:bg-[#001266] text-white transition-colors cursor-pointer"
                    >
                      <FiEdit2 size={14} />
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-gray-400">
                    <FiImage size={28} />
                    <span className="text-xs font-medium">
                      Please select an image first to view
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Card 3: Today's Verse */}
          <div className="bg-white rounded-lg border border-[#E2DFFC] p-6">
            <SectionHeader
              icon={ChurchBookSvg}
              title="Today's Verse"
              subtitle="Enter the verse details"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="md:col-span-2">
                <Label>Scripture Reference</Label>
                <Input
                  placeholder="Enter Scripture (e.g. Psalm 23:1)"
                  value={formData.scriptureRef}
                  onChange={(e) => updateField("scriptureRef", e.target.value)}
                />
              </div>
              <div>
                <Label>Default Version</Label>
                <Select
                  value={formData.defaultVersion}
                  onChange={(e) =>
                    updateField("defaultVersion", e.target.value)
                  }
                >
                  <option value="NIV">NIV</option>
                  <option value="KJV">KJV</option>
                  <option value="ESV">ESV</option>
                  <option value="NLT">NLT</option>
                </Select>
              </div>
            </div>

            <div className="mb-4">
              <Label>Verse Text</Label>
              <Input
                placeholder="Enter full verse text..."
                value={formData.verseText}
                onChange={(e) => updateField("verseText", e.target.value)}
              />
            </div>

            <div className="mb-4">
              <Label>Translations</Label>
              <div className="flex items-center gap-3 sm:gap-3">
                {["KJV", "NIV", "NLT"].map((lang) => {
                  const isSelected = formData.activeTranslations.includes(lang);
                  return (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => {
                        const next = isSelected
                          ? formData.activeTranslations.filter(
                              (l) => l !== lang,
                            )
                          : [...formData.activeTranslations, lang];
                        updateField("activeTranslations", next);
                      }}
                      className={`px-4 sm:px-6 py-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-3 border transition-colors cursor-pointer ${
                        isSelected
                          ? "border-[#CBC6F8] bg-[#F1F2F9] text-[#0A0847]"
                          : "border-[#E2DFFC] bg-white text-[#0A0847] hover:bg-gray-50"
                      }`}
                    >
                      {isSelected ? (
                        <BsCheckCircleFill
                          size={18}
                          className="text-[#21AC1C]"
                        />
                      ) : (
                        <FiGlobe size={18} className="text-[#4B4A8A]" />
                      )}
                      {lang}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <Label>Daily Takeaway</Label>
              <Input
                placeholder="Enter daily takeaway message..."
                value={formData.dailyTakeaway}
                onChange={(e) => updateField("dailyTakeaway", e.target.value)}
              />
            </div>
          </div>

          {/* Card 4: Verse Audio & Accessibility */}
          <div className="bg-white rounded-lg border border-[#E2DFFC] p-6">
            <SectionHeader
              icon={HeadPhoneSvg}
              title="Verse Audio & Accessibility"
              subtitle="Enhance accessibility and user experience"
            />

            <input
              type="file"
              ref={audioFileRef}
              accept="audio/*"
              onChange={handleAudioUpload}
              className="hidden"
            />

            <div className="mb-4">
              <Label>Audio File</Label>
              <div className="grid grid-cols-2 sm:grid-cols-[repeat(4,160px)] lg:grid-cols-[repeat(4,180px)] gap-3">
                <button
                  type="button"
                  onClick={() => audioFileRef.current?.click()}
                  className={`${audioBtn} border-[#E2DFFC] bg-[#F5F5FF] text-[#0A0847] hover:bg-[#EEEEFF]`}
                >
                  <UploadSvg2 size={16} /> Upload Audio
                </button>
                <button
                  type="button"
                  onClick={() =>
                    alert(
                      formData.audioFileName
                        ? `Playing ${formData.audioFileName}`
                        : "No audio loaded.",
                    )
                  }
                  className={`${audioBtn} border-[#E2DFFC] bg-white text-[#0A0847CC] hover:bg-gray-50`}
                >
                  <PauseSvg size={16} /> Preview
                </button>
                <button
                  type="button"
                  onClick={() => audioFileRef.current?.click()}
                  className={`${audioBtn} border-[#E2DFFC] bg-white text-[#0A0847CC] hover:bg-gray-50`}
                >
                  <ReplaceSvg size={16} /> Replace
                </button>
                <button
                  type="button"
                  onClick={() => {
                    updateField("audioFile", null);
                    updateField("audioFileName", "");
                  }}
                  className={`${audioBtn} border-[#FECACA] bg-[#FEF2F2] text-[#EF4444] hover:bg-red-100`}
                >
                  <DeleteSvg size={16} /> Remove
                </button>
              </div>
              {formData.audioFileName && (
                <p className="text-xs text-[#059669] font-medium mt-2">
                  Loaded Audio: {formData.audioFileName}
                </p>
              )}
            </div>

            <div className="mb-6">
              <Label>Daily Takeaway</Label>
              <Input
                placeholder="Let God guide your steps today."
                value={formData.dailyTakeaway}
                onChange={(e) => updateField("dailyTakeaway", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div>
                <Label>Transcript / Captions</Label>
                <div className="h-11 flex items-center">
                  <Toggle
                    label={formData.transcriptEnabled ? "Enabled" : "Disabled"}
                    checked={formData.transcriptEnabled}
                    onChange={(val) => updateField("transcriptEnabled", val)}
                  />
                </div>
              </div>

              <div>
                <Label>Playback Speed</Label>
                <div className="relative">
                  <Select
                    value={formData.playbackSpeed}
                    onChange={(e) =>
                      updateField("playbackSpeed", e.target.value)
                    }
                    className="appearance-none pr-8 h-11"
                  >
                    <option>0.75x</option>
                    <option>1.0x</option>
                    <option>1.25x</option>
                  </Select>
                  <FiChevronDown
                    size={14}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                </div>
              </div>

              <div>
                <Label>Highlight Words</Label>
                <div className="h-11 flex items-center">
                  <Toggle
                    label={formData.highlightWords ? "Enabled" : "Disabled"}
                    checked={formData.highlightWords}
                    onChange={(val) => updateField("highlightWords", val)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card 5: Verse Actions */}
          <div className="bg-white rounded-lg border border-[#E2DFFC] p-6">
            <SectionHeader
              icon={VerseActionSvg}
              title="Verse Actions"
              subtitle="Set where and how this verse will appear"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label>Read Full Chapter Destination</Label>
                <Select
                  value={formData.chapterBook}
                  onChange={(e) => updateField("chapterBook", e.target.value)}
                >
                  <option>Psalms</option>
                  <option>Proverbs</option>
                </Select>
              </div>
              <div>
                <Label>Chapter</Label>
                <Select
                  value={formData.chapterNum}
                  onChange={(e) => updateField("chapterNum", e.target.value)}
                >
                  <option>23</option>
                  <option>24</option>
                  <option>25</option>
                </Select>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-2">
              <Toggle
                label="Enable Save"
                checked={formData.enableSave}
                onChange={(val) => updateField("enableSave", val)}
              />
              <Toggle
                label="Enable Share"
                checked={formData.enableShare}
                onChange={(val) => updateField("enableShare", val)}
              />
              <button className="px-4 py-2 border border-[#001984] text-[#001984] text-xs rounded-md flex items-center gap-2 hover:bg-[#EEF2FF] transition-colors cursor-pointer">
                <FiShare2 size={14} /> Preview Share Card
              </button>
            </div>
          </div>

          {/* Step 1 Footer Action Bar */}
          <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="w-full sm:w-auto px-6 py-2.5 border border-[#E2DFFC] text-[#0A0847] font-medium text-xs rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <div className="flex flex-col-reverse sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => handleSave("Draft Saved")}
                className="w-full sm:w-auto px-6 py-2.5 border border-[#E2DFFC] text-[#0A0847] font-medium text-xs rounded-md hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <FiSave size={14} /> Save draft
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#001984] text-white font-medium text-xs rounded-md hover:bg-[#001266] flex items-center justify-center gap-2 whitespace-nowrap transition-colors cursor-pointer"
              >
                Next: Reflection & Prayer <FiArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================
          STEP 2 CONTENT: REFLECTION & PRAYER
          =================================================================== */}
      {currentStep === 2 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-7 space-y-6">
            {/* Card 1: Today's Verse Rotation */}
            <div className="bg-white rounded-lg border border-[#E2DFFC] p-6">
              <SectionHeader
                icon={ChurchBookSvg}
                title="Today's Verse"
                subtitle="Enter the verse details"
              />

              <div className="space-y-4">
                <div>
                  <Label required>Question</Label>
                  <div className="flex items-center gap-2">
                    <Select
                      value={formData.selectedQuestion}
                      onChange={(e) =>
                        updateField("selectedQuestion", e.target.value)
                      }
                    >
                      <option value="">Select question</option>
                      <option value="q1">
                        What does Psalm 23 mean to you?
                      </option>
                    </Select>
                    <button className="p-2.5 bg-[#FEF2F2] text-[#EF4444] rounded-lg hover:bg-red-100 transition-colors">
                      <FiPlus size={16} />
                    </button>
                  </div>
                </div>

                <div>
                  <Label>Set Rotation</Label>
                  <Select
                    value={formData.selectedRotation}
                    onChange={(e) =>
                      updateField("selectedRotation", e.target.value)
                    }
                    className="mb-3"
                  >
                    <option>Showing selected rotation (6 of 10 verses)</option>
                  </Select>

                  {/* Radio Group Items */}
                  <div className="space-y-2">
                    {[
                      { id: "A", label: "Psalm 23:1" },
                      { id: "B", label: "Psalm 23:2" },
                      { id: "C", label: "Psalm 23:3" },
                      { id: "D", label: "Psalm 23:4" },
                    ].map((item) => {
                      const isSelected =
                        formData.selectedRotation === item.label;
                      return (
                        <div
                          key={item.id}
                          onClick={() =>
                            updateField("selectedRotation", item.label)
                          }
                          className={`flex items-center justify-between px-2 py-1.5 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                            isSelected
                              ? "bg-[#F4FFF3] border-[#B2E0AE] text-[#1BA155]"
                              : "bg-white border-transparent text-[#0A0847] hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {/* Radio circle */}
                            <span
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                                isSelected
                                  ? "border-[#21AC1C]"
                                  : "border-[#4B4A8A]"
                              }`}
                            >
                              {isSelected && (
                                <span className="w-2.5 h-2.5 rounded-full bg-[#21AC1C]" />
                              )}
                            </span>
                            <span>{item.id}</span>
                            <span>{item.label}</span>
                          </div>

                          {isSelected && (
                            <div className="flex items-center gap-3">
                              <span className="px-3 py-2 rounded-full bg-[#21AC1C1A] text-[#21AC1C] text-sm font-semibold">
                                Use today
                              </span>
                              <BsCheckCircleFill
                                size={18}
                                className="text-[#21AC1C]"
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <Label>Screen Selector</Label>
                  <Select
                    value={formData.screenSelector}
                    onChange={(e) =>
                      updateField("screenSelector", e.target.value)
                    }
                  >
                    <option>New Feature (Launch App)</option>
                  </Select>
                </div>

                <div>
                  <Label>Inspires Section</Label>
                  <Input
                    placeholder="Enter inspires section text..."
                    value={formData.inspiresText}
                    onChange={(e) =>
                      updateField("inspiresText", e.target.value)
                    }
                  />
                </div>

                <div>
                  <Label>Motivation Section</Label>
                  <Input
                    placeholder="Enter motivation text..."
                    value={formData.motivationText}
                    onChange={(e) =>
                      updateField("motivationText", e.target.value)
                    }
                  />
                </div>

                <button className="w-full py-2.5 border border-[#001984] text-[#001984] font-semibold text-sm rounded-lg hover:bg-[#EEF2FF] flex items-center justify-center gap-2 transition-colors cursor-pointer">
                  <FiPlus size={20} /> Add Another Question
                </button>
                <p className="text-[11px] text-center text-gray-400 font-medium">
                  Add more questions to show more rotation options.
                </p>
              </div>
            </div>

            {/* Card 2: Let's Pray */}
            <div className="bg-white rounded-lg border border-[#E2DFFC] p-6 space-y-4">
              <h3 className="font-bold text-sm text-[#0A0847]">Let's Pray</h3>

              <div>
                <Label>Prayer Loving</Label>
                <Input
                  placeholder="e.g. Let's talk to God"
                  value={formData.prayerLoving}
                  onChange={(e) => updateField("prayerLoving", e.target.value)}
                />
              </div>

              <div>
                <Label>Relationship With</Label>
                <Input
                  placeholder="e.g. A Father of love"
                  value={formData.relationshipWith}
                  onChange={(e) =>
                    updateField("relationshipWith", e.target.value)
                  }
                />
              </div>

              {/* Working Interactive Rich Text Editor */}
              <div>
                <Label>Prayer</Label>
                <div className="border border-[#E2DFFC] rounded-xl overflow-hidden focus-within:border-[#001984]">
                  <div className="bg-[#F8FAFC] border-b border-[#E2DFFC] p-2 flex items-center gap-2 text-gray-600">
                    <button
                      type="button"
                      onClick={() =>
                        setTextFormatting({
                          ...textFormatting,
                          bold: !textFormatting.bold,
                        })
                      }
                      className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${
                        textFormatting.bold ? "bg-gray-300 font-bold" : ""
                      }`}
                    >
                      <FiBold size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setTextFormatting({
                          ...textFormatting,
                          italic: !textFormatting.italic,
                        })
                      }
                      className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${
                        textFormatting.italic ? "bg-gray-300 italic" : ""
                      }`}
                    >
                      <FiItalic size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setTextFormatting({
                          ...textFormatting,
                          underline: !textFormatting.underline,
                        })
                      }
                      className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${
                        textFormatting.underline ? "bg-gray-300 underline" : ""
                      }`}
                    >
                      <FiUnderline size={14} />
                    </button>
                    <span className="w-px h-4 bg-gray-300 mx-1" />
                    <button
                      type="button"
                      className="p-1.5 hover:bg-gray-200 rounded"
                    >
                      <FiLink size={14} />
                    </button>
                    <button
                      type="button"
                      className="p-1.5 hover:bg-gray-200 rounded"
                    >
                      <FiList size={14} />
                    </button>
                  </div>
                  <textarea
                    rows={4}
                    placeholder="Type your prayer here..."
                    value={formData.prayerBody}
                    onChange={(e) => updateField("prayerBody", e.target.value)}
                    className={`w-full p-3 text-xs text-[#0A0847] placeholder-gray-400 outline-none resize-none ${
                      textFormatting.bold ? "font-bold" : "font-medium"
                    } ${textFormatting.italic ? "italic" : ""} ${
                      textFormatting.underline ? "underline" : ""
                    }`}
                  />
                </div>
              </div>

              {/* Working Apply Media */}
              <div>
                <Label>Apply Media</Label>
                <input
                  type="file"
                  ref={mediaFileRef}
                  onChange={handleApplyMediaUpload}
                  className="hidden"
                />
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <button
                    type="button"
                    onClick={() => mediaFileRef.current?.click()}
                    className="h-11 w-full border border-[#E2DFFC] bg-white text-[#0A0847] font-medium text-sm rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <UploadSvg2 size={18} /> Upload
                  </button>
                  <button
                    type="button"
                    onClick={() => mediaFileRef.current?.click()}
                    className="h-11 w-full border border-[#E2DFFC] bg-[#F5F5FF] text-[#001984] font-medium text-sm rounded-lg hover:bg-[#EEEEFF] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <FiImage size={18} /> Photo
                  </button>
                  <button
                    type="button"
                    onClick={() => mediaFileRef.current?.click()}
                    className="h-11 w-full border border-[#E2DFFC] bg-[#F5F5FF] text-[#001984] font-medium text-sm rounded-lg hover:bg-[#EEEEFF] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <VideoPlaySvg size={18} /> Video
                  </button>
                  <button
                    type="button"
                    onClick={() => updateField("appliedMedia", [])}
                    className="h-11 w-full border border-[#FECACA] bg-[#FEF2F2] text-[#DE2128] font-medium text-sm rounded-lg hover:bg-red-100 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <DeleteSvg size={18} /> Remove
                  </button>
                </div>

                {formData.appliedMedia.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formData.appliedMedia.map((m) => (
                      <div
                        key={m.id}
                        className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-200"
                      >
                        <img
                          src={m.url}
                          alt="Applied"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Card 3: Scriptures & Media with Working Remove Button */}
            <div className="bg-white rounded-lg border border-[#E2DFFC] p-6 space-y-4">
              <h3 className="font-bold text-sm text-[#0A0847]">
                Scriptures & Media
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {formData.scriptureMediaList.map((item) => (
                  <div
                    key={item.id}
                    className="border border-[#E2DFFC] rounded-md p-2 flex items-center justify-between bg-white"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={TableImg}
                        alt="Media thumb"
                        className="w-12 h-12 rounded-lg object-cover shrink-0"
                      />
                      <div className="overflow-hidden">
                        <p className="text-[11px] font-bold text-[#0A0847] truncate">
                          {item.name}
                        </p>
                        <p className="text-[10px] text-gray-400 font-medium">
                          {item.size}
                        </p>
                      </div>
                    </div>
                    {/* Working Remove Button */}
                    <button
                      type="button"
                      onClick={() => handleRemoveScriptureMedia(item.id)}
                      className="text-red-500 hover:text-red-700 p-1.5 transition-colors cursor-pointer shrink-0"
                    >
                      <FiXCircle size={18} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-6 pt-2">
                <Toggle
                  label="Search for Stock"
                  checked={formData.searchStock}
                  onChange={(val) => updateField("searchStock", val)}
                />
                <Toggle
                  label="Search Scripture Source"
                  checked={formData.searchScripture}
                  onChange={(val) => updateField("searchScripture", val)}
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-5 space-y-6">
            {/* Card 1: Reflection & Prayer Options */}
            <div className="bg-white rounded-lg border border-[#E2DFFC] p-6 space-y-4">
              <SectionHeader
                icon={ChurchBookSvg}
                title="Reflection & Prayer"
                subtitle="Help users reflect and connect"
              />

              <h4 className="text-sm font-semibold text-[#0A0847CC]">
                Reflection Option
              </h4>

              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#0A0847CC]">
                  Enable Reflection
                </span>
                <Toggle
                  checked={formData.enableReflection}
                  onChange={(val) => updateField("enableReflection", val)}
                />
              </div>

              <div>
                <Label>Reflection Title</Label>
                <Input
                  placeholder="What is God showing you today?"
                  value={formData.reflectionTitle}
                  onChange={(e) =>
                    updateField("reflectionTitle", e.target.value)
                  }
                />
              </div>

              <div>
                <Label>Reflection Limit</Label>
                <div className="relative">
                  <Select
                    value={formData.reflectionLimit}
                    onChange={(e) =>
                      updateField("reflectionLimit", e.target.value)
                    }
                    className="appearance-none pr-8"
                  >
                    <option>150</option>
                    <option>250</option>
                    <option>500</option>
                  </Select>
                  <FiChevronDown
                    size={14}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                  />
                </div>
              </div>

              <div>
                <Label>Focus Prompt</Label>
                <Input
                  placeholder="Gentle reminder"
                  value={formData.focusPrompt}
                  onChange={(e) => updateField("focusPrompt", e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2 text-xs text-[#0A0847CC] italic font-medium">
                <FiInfo size={16} className="text-[#001984] shrink-0" />
                <span>Reflections are also private notes.</span>
              </div>
            </div>

            {/* Card 2: Reward */}
            <div className="bg-white rounded-lg border border-[#E2DFFC] p-6 space-y-4">
              <SectionHeader
                icon={RewardsSvg}
                title="Reward"
                subtitle="Encourage engagement"
              />

              <div>
                <Label>Reward Type</Label>
                <Select
                  value={formData.rewardType}
                  onChange={(e) => updateField("rewardType", e.target.value)}
                >
                  <option>Coins</option>
                  <option>Badges</option>
                </Select>
              </div>

              <div className="mb-8">
                <Label>Amount</Label>
                <div className="relative">
                   <img src={Coin} alt="coin" className="absolute top-1/2 -translate-y-1/2 w-12 h-12 object-contain" />
                  <Input
                    type="number"
                    placeholder="50"
                    value={formData.rewardAmount}
                    onChange={(e) =>
                      updateField("rewardAmount", e.target.value)
                    }
                    className="pl-11"
                  />
                </div>
              </div>
            </div>

            {/* Card 3: Personal Prayer */}
            <div className="bg-white rounded-lg border border-[#E2DFFC] p-6 space-y-4">
              <div className="flex items-center justify-between pb-3">
                <SectionHeader
                  icon={ChurchBookSvg}
                  title="Personal Prayer"
                  subtitle="Enable Personal & Daily Prayer"
                />
                <Toggle
                  checked={formData.enablePersonalPrayer}
                  onChange={(val) => updateField("enablePersonalPrayer", val)}
                />
              </div>

              <div>
                <Label>Personal Prayer Prompt</Label>
                <Input
                  placeholder="e.g. Help me trust and grow in faith"
                  value={formData.personalPrayerPrompt}
                  onChange={(e) =>
                    updateField("personalPrayerPrompt", e.target.value)
                  }
                />
              </div>

              <div>
                <Label>Strong Prayer</Label>
                <Input
                  placeholder="e.g. You guide and protect; give me trust"
                  value={formData.strongPrayer}
                  onChange={(e) => updateField("strongPrayer", e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2 text-xs text-[#0A0847CC] italic font-medium mb-6">
                <FiInfo size={16} className="text-[#001984] shrink-0" />
                <span>Reflections are also private notes.</span>
              </div>
            </div>

            {/* Card 4: Publishing */}
            <div className="bg-white rounded-lg border border-[#E2DFFC] p-6 space-y-4">
              <SectionHeader
                icon={PublishingSvg}
                title="Publishing"
                subtitle="Set schedule details"
              />

              <div className="bg-[#ECFDF3] border border-[#21AC1C] rounded-lg px-3 py-3 flex items-center gap-2 text-xs font-semibold text-[#21AC1C]">
                <FiCalendar size={18} />
                <span>
                  This will be published on{" "}
                  {formData.displayDate || "May 24, 2025"}
                </span>
              </div>

              {/* Visible Mode */}
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-[#0A0847]">
                    Visible Mode
                  </h4>
                  <p className="text-[11px] text-[#0A084799] font-medium mt-0.5">
                    Choose who can see and engage
                  </p>
                </div>
                <div className="relative shrink-0">
                  <select
                    value={formData.visibleMode}
                    onChange={(e) => updateField("visibleMode", e.target.value)}
                    className="h-10 appearance-none bg-[#E8E9FB] rounded-lg pl-4 pr-9 text-xs font-semibold text-[#0A0847] outline-none cursor-pointer"
                  >
                    <option>User Group</option>
                    <option>Public</option>
                  </select>
                  <FiChevronDown
                    size={14}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0A0847] pointer-events-none"
                  />
                </div>
              </div>

              {/* Visibility To */}
              <div>
                <h4 className="text-sm font-semibold text-[#0A0847] mb-3">
                  Visibility To
                </h4>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#3231DB] text-white flex items-center justify-center shrink-0">
                    <FiUsers size={14} />
                  </div>
                  <span className="text-xs font-medium text-[#0A0847CC]">
                    {formData.visibilityTo}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 Bottom Full-Width Action Footer */}
          <div className="lg:col-span-12 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="w-full sm:w-auto px-6 py-2.5 border border-[#E2DFFC] text-[#0A0847] font-medium text-xs rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <FiArrowLeft size={14} /> Back
            </button>
            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => handleSave("Draft Saved")}
                className="w-full sm:w-auto px-6 py-2.5 border border-[#E2DFFC] text-[#0A0847] font-medium text-xs rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <FiSave size={14} /> Save draft
              </button>
              <button
                type="button"
                onClick={() => handleSave("Preview Single Screen")}
                className="w-full sm:w-auto px-6 py-2.5 border border-[#E2DFFC] text-[#0A0847] font-medium text-xs rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <FiEye size={14} /> Preview
              </button>
              <button
                type="button"
                onClick={() => handleSave("Schedule / Published")}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#001984] text-white font-medium text-xs rounded-lg hover:bg-[#001266] flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <FiCalendar size={14} /> Schedule Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
