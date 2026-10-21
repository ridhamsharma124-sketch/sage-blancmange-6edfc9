import React, { useState, useRef } from "react";
import {
  FiSave, FiEye, FiSend, FiChevronLeft, FiChevronRight, FiCalendar,
  FiUploadCloud, FiPlay, FiPause, FiChevronDown, FiBold, FiItalic,
  FiUnderline, FiLink, FiImage, FiAlignLeft, FiAlignCenter, FiAlignRight,
  FiCode, FiSmile,
} from "react-icons/fi";
import { MdFormatIndentIncrease, MdFormatIndentDecrease, MdFormatColorText, MdFormatColorFill } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import PublishWhiteIcon from "../../../assets/SeasonalJourneys/PublishWhiteIcon.svg";
import SaveIcon from "../../../assets/SeasonalJourneys/SaveIcon.svg";
import Calendar2Icon from "../../../assets/SeasonalJourneys/Calendar2Icon.svg";
import UploadIcon from "../../../assets/SeasonalJourneys/UploadIcon.svg";

/* ==========================================================================
   ATOMS
   ========================================================================== */

 const SvgIcon = ({ src, size = 16, className = "" }) => (
  <img src={src} alt="" width={size} height={size} className={`shrink-0 ${className}`} />
);

   const SaveIconSvg = (p) => <SvgIcon src={SaveIcon} {...p} />;
   const PublishWhiteIconSvg = (p) => <SvgIcon src={PublishWhiteIcon} {...p} />;
   const CalendarIconSvg = (p) => <SvgIcon src={Calendar2Icon} {...p} />;
   const UploadIconSvg = (p) => <SvgIcon src={UploadIcon} {...p} />;

const Input = ({ className = "", ...props }) => (
  <input
    className={`w-full border border-[#E2DFFC] rounded-md px-3 py-3 text-xs text-[#0A0847] placeholder-gray-400 bg-white outline-none focus:border-[#001984] transition-all ${className}`}
    {...props}
  />
);

const Select = ({ children, className = "", ...props }) => (
  <div className="relative">
    <select
      className={`w-full appearance-none border border-[#E2DFFC] rounded-md px-3 pr-9 py-3 text-xs text-[#0A0847] bg-white outline-none focus:border-[#001984] cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </select>
    <FiChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
  </div>
);

const Label = ({ children, required }) => (
  <label className="block text-xs font-semibold text-[#0A0847CC] mb-1.5">
    {children} {required && <span className="text-[#EB0C10]">*</span>}
  </label>
);

const DateField = ({ value, onChange }) => (
  <div className="relative">
     <CalendarIconSvg size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
    <input
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-white border border-[#E2DFFC] rounded-md px-9 py-3 text-xs text-[#0A0847] outline-none focus:border-[#001984] appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
    />
  </div>
);

/** Section header: number badge + title/subtitle on left, Start/End Date on right, divider below */
const SectionCard = ({ n, title, subtitle, startDate, endDate, onStart, onEnd, children }) => (
  <div className="bg-white rounded-lg border border-[#E2DFFC] p-6">
    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5 pb-5 mb-5 border-b border-[#E2DFFC]">
      <div className="flex items-start gap-3 shrink-0">
        <span className="w-8 h-8 rounded-full bg-[#001984] text-white text-sm font-semibold flex items-center justify-center shrink-0">
          {n}
        </span>
        <div>
          <h3 className="text-base font-semibold text-[#0A0847]">{title}</h3>
          {subtitle && <p className="text-xs text-[#0A084799] font-medium mt-0.5">{subtitle}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 w-full lg:w-1/2">
        <div>
          <Label required>Start Date</Label>
          <DateField value={startDate} onChange={onStart} />
        </div>
        <div>
          <Label required>End Date</Label>
          <DateField value={endDate} onChange={onEnd} />
        </div>
      </div>
    </div>

    {children}
  </div>
);

/** Lightweight rich text field: Bold/Italic/Underline are real, rest are visual */
const RichTextArea = ({ value, onChange, placeholder, rows = 3 }) => {
  const [fmt, setFmt] = useState({ bold: false, italic: false, underline: false });
  const toggle = (key) => setFmt((prev) => ({ ...prev, [key]: !prev[key] }));

  const iconBtn = "p-1.5 rounded hover:bg-gray-200 transition-colors cursor-pointer text-gray-600";
  const activeBtn = (on) => (on ? "bg-gray-300 text-[#0A0847]" : "");

  return (
    <div className="border border-[#E2DFFC] rounded-md overflow-hidden focus-within:border-[#001984]">
      <div className="bg-[#F8FAFC] border-b border-[#E2DFFC] px-2 py-1.5 flex flex-wrap items-center gap-0.5">
        <select className="text-[11px] border border-[#E2DFFC] rounded px-1.5 py-1 mr-1 text-[#0A0847] bg-white outline-none">
          <option>Inter</option>
        </select>
        <select className="text-[11px] border border-[#E2DFFC] rounded px-1.5 py-1 mr-1.5 text-[#0A0847] bg-white outline-none w-14">
          <option>20</option>
        </select>

        <button type="button" title="Increase font" className={iconBtn}><MdFormatColorText size={14} /></button>
        <span className="w-px h-4 bg-gray-300 mx-1" />
        <button type="button" onClick={() => toggle("bold")} className={`${iconBtn} ${activeBtn(fmt.bold)}`}><FiBold size={14} /></button>
        <button type="button" onClick={() => toggle("italic")} className={`${iconBtn} ${activeBtn(fmt.italic)}`}><FiItalic size={14} /></button>
        <button type="button" onClick={() => toggle("underline")} className={`${iconBtn} ${activeBtn(fmt.underline)}`}><FiUnderline size={14} /></button>
        <button type="button" title="Highlight" className={iconBtn}><MdFormatColorFill size={14} /></button>
        <button type="button" title="Text color" className={iconBtn}><MdFormatColorText size={14} className="text-red-500" /></button>
        <span className="w-px h-4 bg-gray-300 mx-1" />
        <button type="button" title="Align left" className={iconBtn}><FiAlignLeft size={14} /></button>
        <button type="button" title="Align center" className={iconBtn}><FiAlignCenter size={14} /></button>
        <button type="button" title="Align right" className={iconBtn}><FiAlignRight size={14} /></button>
        <span className="w-px h-4 bg-gray-300 mx-1" />
        <button type="button" title="Indent" className={iconBtn}><MdFormatIndentDecrease size={14} /></button>
        <button type="button" title="Outdent" className={iconBtn}><MdFormatIndentIncrease size={14} /></button>
        <span className="w-px h-4 bg-gray-300 mx-1" />
        <button type="button" title="Link" className={iconBtn}><FiLink size={14} /></button>
        <button type="button" title="Unlink" className={iconBtn}><FiCode size={14} /></button>
        <button type="button" title="Emoji" className={iconBtn}><FiSmile size={14} /></button>
        <button type="button" title="Image" className={iconBtn}><FiImage size={14} /></button>
      </div>

      <textarea
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full p-3 text-xs text-[#0A0847] placeholder-gray-400 outline-none resize-none ${
          fmt.bold ? "font-bold" : "font-medium"
        } ${fmt.italic ? "italic" : ""} ${fmt.underline ? "underline" : ""}`}
      />
    </div>
  );
};

/** Audio block: real play/pause + upload. File box = plain white dashed. Thumbnail box = light-purple filled dashed. */
const AudioBlock = ({ fileName, fileUrl, duration, thumbnail, onUploadFile, onUploadThumb, onDelete }) => {
  const audioPlayerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [current, setCurrent] = useState("00:00");
  const fileRef = useRef(null);
  const thumbRef = useRef(null);

  const togglePlay = () => {
    if (!audioPlayerRef.current) return;
    if (isPlaying) audioPlayerRef.current.pause();
    else audioPlayerRef.current.play();
    setIsPlaying((p) => !p);
  };

  const fmtTime = (s) => {
    if (!isFinite(s)) return "00:00";
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = Math.floor(s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Audio file */}
      <div>
        <input type="file" ref={fileRef} accept="audio/*" onChange={onUploadFile} className="hidden" />
        {fileName ? (
          <div className="border border-[#E2DFFC] rounded-lg p-3 flex items-center gap-3">
            <audio
              ref={audioPlayerRef}
              src={fileUrl}
              onEnded={() => setIsPlaying(false)}
              onTimeUpdate={(e) => setCurrent(fmtTime(e.currentTarget.currentTime))}
              className="hidden"
            />
            <button
              type="button"
              onClick={togglePlay}
              className="w-9 h-9 rounded-full border-2 border-[#001984] text-[#001984] flex items-center justify-center hover:bg-[#EEF2FF] transition-colors cursor-pointer shrink-0"
            >
              {isPlaying ? <FiPause size={13} /> : <FiPlay size={14} className="ml-0.5" />}
            </button>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-[#0A0847] truncate">{fileName}</p>
              <p className="text-[11px] text-gray-400 font-medium">{current} / {duration || "00:00"}</p>
            </div>
            <button type="button" onClick={() => fileRef.current?.click()} className="px-4 py-2 bg-white border border-[#E2DFFC] text-[#0A0847] text-xs font-semibold rounded-md hover:bg-gray-50 transition-colors cursor-pointer shrink-0">
              Replace
            </button>
            <button type="button" onClick={onDelete} className="px-4 py-2 bg-white border border-[#E2DFFC] text-[#0A0847] text-xs font-semibold rounded-md hover:bg-gray-50 transition-colors cursor-pointer shrink-0">
              Delete
            </button>
          </div>
        ) : (
          <div
            onClick={() => fileRef.current?.click()}
            className="border border-dashed border-[#CBC6F8] rounded-lg h-20 flex items-center justify-center gap-3 bg-white hover:bg-[#FAFAFF] transition-colors cursor-pointer"
          >
            <UploadIconSvg size={20} className="text-[#001984]" />
            <span className="text-xs font-semibold text-[#0A0847]">Upload Audio</span>
          </div>
        )}
      </div>

      {/* Thumbnail */}
      <div>
        <p className="text-[10px] font-bold text-[#0A084799] tracking-wide mb-1.5">
          AUDIO/VIDEO THUMBNAIL (Optional)
        </p>
        <input type="file" ref={thumbRef} accept="image/*" onChange={onUploadThumb} className="hidden" />
        {thumbnail ? (
          <div className="relative rounded-lg overflow-hidden border border-[#E2DFFC] h-20">
            <img src={thumbnail} alt="thumbnail" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => thumbRef.current?.click()}
              className="absolute top-1.5 right-1.5 p-1 rounded-full bg-[#001984] text-white hover:bg-[#001266] cursor-pointer"
            >
              <UploadIconSvg size={11} />
            </button>
          </div>
        ) : (
          <div
            onClick={() => thumbRef.current?.click()}
            className="border border-dashed border-[#CBC6F8] rounded-lg h-20 flex items-center justify-center gap-3 bg-[#E9EAF7] hover:bg-[#E0E1F5] transition-colors cursor-pointer"
          >
            <UploadIconSvg size={28} className="text-[#001984]" />
            <span className="text-xs font-semibold text-[#0A0847]">Upload / Replace Image</span>
          </div>
        )}
        <p className="text-[10px] text-[#0A084799] font-medium mt-1.5">
          Recommended size: 1200×628px | JPG, PNG or WebP
        </p>
      </div>
    </div>
  );
};

/* ==========================================================================
   STATIC DATA
   ========================================================================== */
const FONT_SIZE_OPTIONS = ["Small", "Medium", "Large"];
const MUSIC_VOLUME_OPTIONS = ["Low (25%)", "Medium (50%)", "High (75%)", "Max (100%)"];
const NAV_STYLE_OPTIONS = ["Bottom Next Button", "Swipe Gesture", "Both"];
const CONTENT_TYPE_OPTIONS = ["Devotional", "Reading", "Reflection", "Prayer", "Video"];
const DURATION_OPTIONS = ["5 minutes", "8 minutes", "10 minutes", "15 minutes", "20 minutes"];

const makeEmptyDay = (n, total) => ({
  dayNumber: n,
  dayDetails: {
    startDate: "", endDate: "", title: "", focus: "", duration: "10 minutes",
    contentType: "Devotional", image: "", imageAlt: "",
  },
  dailyLesson: { startDate: "", endDate: "", text: "" },
  lessonAudio: { startDate: "", endDate: "", fileName: "", fileUrl: "", duration: "", thumbnail: "" },
  reflectiveThought: { startDate: "", endDate: "", text: "" },
  closingPrayer: { startDate: "", endDate: "", text: "" },
  prayerAudio: { startDate: "", endDate: "", fileName: "", fileUrl: "", duration: "", thumbnail: "" },
  contentSettings: {
    startDate: "", endDate: "", backgroundImage: "", textOverlayColor: "#6C4FFF",
    fontSize: "Medium", enableMusic: true, musicVolume: "Medium (50%)",
  },
  navigation: {
    startDate: "", endDate: "",
    previousDay: n === 1 ? "None (This is the first day)" : `Day ${n - 1}`,
    nextDay: n === total ? "None (This is the last day)" : `Day ${n + 1}`,
    navigationStyle: "Bottom Next Button",
  },
});

/* ==========================================================================
   MAIN PAGE
   ========================================================================== */
export default function EditDailyContentPage() {
  const navigate = useNavigate();
const location = useLocation();
const passedDays = location.state?.days;

const totalDays = passedDays?.length || 7;

const [days, setDays] = useState(() =>
  Array.from({ length: totalDays }, (_, i) => {
    const base = makeEmptyDay(i + 1, totalDays);
    const source = passedDays?.[i];
    if (source) {
      base.dayDetails.title = source.title || "";
      base.dayDetails.focus = source.focus || "";
      base.dayDetails.duration = source.estTime || base.dayDetails.duration;
      base.dayDetails.contentType = source.type || base.dayDetails.contentType;
      base.dayDetails.startDate = source.releaseDate || "";
    }
    return base;
  })
);

  const [activeIndex, setActiveIndex] = useState(0);
  const dayImageRef = useRef(null);
  const bgImageRef = useRef(null);

  const activeDay = days[activeIndex];

  const updateDay = (patch) => {
    setDays((prev) => prev.map((d, i) => (i === activeIndex ? { ...d, ...patch } : d)));
  };

  const updateSection = (section, key, value) => {
    updateDay({ [section]: { ...activeDay[section], [key]: value } });
  };

  /* ---- Uploads ---- */
  const handleDayImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) updateSection("dayDetails", "image", URL.createObjectURL(file));
    e.target.value = "";
  };

  const handleBgImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) updateSection("contentSettings", "backgroundImage", URL.createObjectURL(file));
    e.target.value = "";
  };

  const makeAudioHandlers = (section) => ({
    onUploadFile: (e) => {
      const file = e.target.files[0];
      if (file) {
        updateDay({
          [section]: {
            ...activeDay[section],
            fileName: file.name,
            fileUrl: URL.createObjectURL(file),
            duration: "00:00",
          },
        });
      }
      e.target.value = "";
    },
    onUploadThumb: (e) => {
      const file = e.target.files[0];
      if (file) updateSection(section, "thumbnail", URL.createObjectURL(file));
      e.target.value = "";
    },
    onDelete: () => {
      updateDay({ [section]: { ...activeDay[section], fileName: "", fileUrl: "", duration: "" } });
    },
  });

  const lessonAudioHandlers = makeAudioHandlers("lessonAudio");
  const prayerAudioHandlers = makeAudioHandlers("prayerAudio");

  /* ---- Actions ---- */
  const handleAction = (type) => {
    console.log(`Action: ${type}`);
    console.log("Edit Daily Content Payload (all days):", days);
    alert(`${type}! Check browser console for full payload.`);
    if (type === "Publish Journey") navigate(-1);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen p-6 font-[Inter] space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-[#0A0847]">Edit Daily Content</h1>
          <p className="text-sm text-[#0A084799] font-medium mt-2">
            Customize the content and settings for your daily journey.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => handleAction("Save draft")} className="px-4 py-2.5 bg-white border border-[#E2DFFC] rounded-md text-xs font-semibold text-[#0A0847] hover:bg-gray-50 flex items-center gap-2 transition-colors cursor-pointer">
            <SaveIconSvg size={16} /> Save draft
          </button>
          <button type="button" onClick={() => handleAction("Preview")} className="px-4 py-2.5 bg-white border border-[#E2DFFC] rounded-md text-xs font-semibold text-[#0A0847] hover:bg-gray-50 flex items-center gap-2 transition-colors cursor-pointer">
            <FiEye size={16} /> Preview
          </button>
          <button type="button" onClick={() => handleAction("Publish Journey")} className="px-4 py-2.5 bg-[#001984] text-white rounded-md text-xs font-semibold hover:bg-[#001266] flex items-center gap-2 transition-colors cursor-pointer">
            <PublishWhiteIconSvg size={16} /> Publish Journey
          </button>
        </div>
      </div>

      {/* Day Tabs */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          {days.map((d, i) => (
            <button
              key={d.dayNumber}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={`px-4 py-2 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                activeIndex === i
                  ? "bg-[#001984] text-white"
                  : "border border-[#E2DFFC] text-[#0A0847] hover:bg-gray-50"
              }`}
            >
              Day {d.dayNumber}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 shrink-0 bg-white border border-[#E2DFFC] p-1 rounded-md">
          <button
            type="button"
            onClick={() => setActiveIndex((i) => Math.max(0, i - 1))}
            disabled={activeIndex === 0}
            className="w-8 h-8 rounded-md flex items-center justify-center text-[#0A0847] hover:bg-gray-50 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
          >
            <FiChevronLeft size={16} />
          </button>
          <span className="text-xs font-semibold text-[#0A0847]">
            {activeIndex + 1} of {days.length}
          </span>
          <button
            type="button"
            onClick={() => setActiveIndex((i) => Math.min(days.length - 1, i + 1))}
            disabled={activeIndex === days.length - 1}
            className="w-8 h-8 rounded-md flex items-center justify-center text-[#0A0847] hover:bg-gray-50 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
          >
            <FiChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* 1. Day Details */}
      <SectionCard
        n={1}
        title="Day Details"
        startDate={activeDay.dayDetails.startDate}
        endDate={activeDay.dayDetails.endDate}
        onStart={(v) => updateSection("dayDetails", "startDate", v)}
        onEnd={(v) => updateSection("dayDetails", "endDate", v)}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <Label required>Day Title</Label>
            <Input
              placeholder="e.g. The Risen King"
              value={activeDay.dayDetails.title}
              onChange={(e) => updateSection("dayDetails", "title", e.target.value)}
            />
          </div>
          <div>
            <Label required>Focus / Theme</Label>
            <Input
              placeholder="e.g. Jesus' Resurrection"
              value={activeDay.dayDetails.focus}
              onChange={(e) => updateSection("dayDetails", "focus", e.target.value)}
            />
          </div>
          <div>
            <Label required>Estimated Duration</Label>
            <Select
              value={activeDay.dayDetails.duration}
              onChange={(e) => updateSection("dayDetails", "duration", e.target.value)}
            >
              {DURATION_OPTIONS.map((o) => <option key={o}>{o}</option>)}
            </Select>
          </div>
          <div>
            <Label required>Content Type</Label>
            <Select
              value={activeDay.dayDetails.contentType}
              onChange={(e) => updateSection("dayDetails", "contentType", e.target.value)}
            >
              {CONTENT_TYPE_OPTIONS.map((o) => <option key={o}>{o}</option>)}
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label required>Day Image</Label>
            <input type="file" ref={dayImageRef} accept="image/*" onChange={handleDayImageUpload} className="hidden" />
            {activeDay.dayDetails.image ? (
              <div className="relative rounded-lg overflow-hidden border border-[#E2DFFC] h-32">
                <img src={activeDay.dayDetails.image} alt="Day" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => dayImageRef.current?.click()}
                  className="absolute top-2 right-2 px-2 py-1 rounded-md bg-[#001984] text-white text-[10px] font-semibold hover:bg-[#001266] cursor-pointer"
                >
                  Replace
                </button>
              </div>
            ) : (
              <div
                onClick={() => dayImageRef.current?.click()}
                className="border border-dashed border-[#CBC6F8] rounded-lg h-24 flex items-center justify-center gap-3 bg-[#F5F6FF] hover:bg-[#FAFAFF] transition-colors cursor-pointer"
              >
                <UploadIconSvg size={42} className="text-[#001984]" />
                <span className="text-sm font-semibold text-[#0A0847]">Upload / Replace Image</span>
              </div>
            )}
            <p className="text-[11px] text-[#0A084799] font-medium mt-2">
              Recommended size: 1200×628px | JPG, PNG or WebP
            </p>
          </div>

          <div>
            <Label required>Image Alt Text</Label>
            <Input
              placeholder="Jesus entering Jerusalem on a donkey"
              value={activeDay.dayDetails.imageAlt}
              onChange={(e) => updateSection("dayDetails", "imageAlt", e.target.value)}
            />
            <p className="text-[11px] text-gray-400 font-medium mt-1.5">
              Describe the image for accessibility
            </p>
          </div>
        </div>
      </SectionCard>

      {/* 2. Daily Lesson */}
      <SectionCard
        n={2}
        title="Daily Lesson"
        subtitle="Main teaching for the day."
        startDate={activeDay.dailyLesson.startDate}
        endDate={activeDay.dailyLesson.endDate}
        onStart={(v) => updateSection("dailyLesson", "startDate", v)}
        onEnd={(v) => updateSection("dailyLesson", "endDate", v)}
      >
        <RichTextArea
          rows={3}
          placeholder="Write the main teaching for today..."
          value={activeDay.dailyLesson.text}
          onChange={(v) => updateSection("dailyLesson", "text", v)}
        />
      </SectionCard>

      {/* 3. Lesson Audio */}
      <SectionCard
        n={3}
        title="Lesson Audio"
        startDate={activeDay.lessonAudio.startDate}
        endDate={activeDay.lessonAudio.endDate}
        onStart={(v) => updateSection("lessonAudio", "startDate", v)}
        onEnd={(v) => updateSection("lessonAudio", "endDate", v)}
      >
        <AudioBlock
          fileName={activeDay.lessonAudio.fileName}
          fileUrl={activeDay.lessonAudio.fileUrl}
          duration={activeDay.lessonAudio.duration}
          thumbnail={activeDay.lessonAudio.thumbnail}
          {...lessonAudioHandlers}
        />
      </SectionCard>

      {/* 4. Reflective Thought */}
      <SectionCard
        n={4}
        title="Reflective Thought"
        subtitle="Encourage personal reflection and application."
        startDate={activeDay.reflectiveThought.startDate}
        endDate={activeDay.reflectiveThought.endDate}
        onStart={(v) => updateSection("reflectiveThought", "startDate", v)}
        onEnd={(v) => updateSection("reflectiveThought", "endDate", v)}
      >
        <RichTextArea
          rows={2}
          placeholder="How does today's lesson apply to your life?"
          value={activeDay.reflectiveThought.text}
          onChange={(v) => updateSection("reflectiveThought", "text", v)}
        />
      </SectionCard>

      {/* 5. Closing Prayer */}
      <SectionCard
        n={5}
        title="Closing Prayer"
        subtitle="Suggested prayer for the day."
        startDate={activeDay.closingPrayer.startDate}
        endDate={activeDay.closingPrayer.endDate}
        onStart={(v) => updateSection("closingPrayer", "startDate", v)}
        onEnd={(v) => updateSection("closingPrayer", "endDate", v)}
      >
        <RichTextArea
          rows={2}
          placeholder="Write a closing prayer for today..."
          value={activeDay.closingPrayer.text}
          onChange={(v) => updateSection("closingPrayer", "text", v)}
        />
      </SectionCard>

      {/* 6. Prayer Audio */}
      <SectionCard
        n={6}
        title="Prayer Audio"
        startDate={activeDay.prayerAudio.startDate}
        endDate={activeDay.prayerAudio.endDate}
        onStart={(v) => updateSection("prayerAudio", "startDate", v)}
        onEnd={(v) => updateSection("prayerAudio", "endDate", v)}
      >
        <AudioBlock
          fileName={activeDay.prayerAudio.fileName}
          fileUrl={activeDay.prayerAudio.fileUrl}
          duration={activeDay.prayerAudio.duration}
          thumbnail={activeDay.prayerAudio.thumbnail}
          {...prayerAudioHandlers}
        />
      </SectionCard>

      {/* 7 & 8: Day Content Settings + Journey Navigation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* 7. Day Content Settings */}
        <div className="bg-white rounded-lg border border-[#E2DFFC] p-6">
          <div className="flex items-start gap-3 mb-5">
            <span className="w-8 h-8 rounded-full bg-[#001984] text-white text-sm font-semibold flex items-center justify-center shrink-0">7</span>
            <h3 className="text-base font-semibold text-[#0A0847]">Day Content Settings</h3>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <Label required>Start Date</Label>
              <DateField
                value={activeDay.contentSettings.startDate}
                onChange={(v) => updateSection("contentSettings", "startDate", v)}
              />
            </div>
            <div>
              <Label required>End Date</Label>
              <DateField
                value={activeDay.contentSettings.endDate}
                onChange={(v) => updateSection("contentSettings", "endDate", v)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <Label>Background Image</Label>
              <input type="file" ref={bgImageRef} accept="image/*" onChange={handleBgImageUpload} className="hidden" />
              <button
                type="button"
                onClick={() => bgImageRef.current?.click()}
                className="w-full h-11 flex items-center gap-2 border border-[#E2DFFC] rounded-md px-3 text-xs font-medium text-[#0A0847CC] hover:bg-gray-50 transition-colors cursor-pointer"
              >
                {activeDay.contentSettings.backgroundImage ? (
                  <img
                    src={activeDay.contentSettings.backgroundImage}
                    alt="bg"
                    className="w-6 h-6 rounded object-cover shrink-0"
                  />
                ) : (
                  <FiImage size={16} className="text-gray-400 shrink-0" />
                )}
                <span className="truncate">
                  {activeDay.contentSettings.backgroundImage ? "Change Image" : "Select Image"}
                </span>
              </button>
            </div>
            <div>
              <Label>Text Overlay Color</Label>
              <div className="flex items-center gap-2 border border-[#E2DFFC] rounded-md px-3 h-11">
                <label
                  className="w-5 h-5 rounded shrink-0 cursor-pointer border border-black/10"
                  style={{ backgroundColor: activeDay.contentSettings.textOverlayColor }}
                >
                  <input
                    type="color"
                    value={activeDay.contentSettings.textOverlayColor}
                    onChange={(e) => updateSection("contentSettings", "textOverlayColor", e.target.value)}
                    className="opacity-0 w-5 h-5 cursor-pointer"
                  />
                </label>
                <input
                  value={activeDay.contentSettings.textOverlayColor}
                  onChange={(e) => updateSection("contentSettings", "textOverlayColor", e.target.value)}
                  className="flex-1 text-xs font-semibold text-[#0A0847] outline-none"
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <Label>Font Size</Label>
            <Select
              value={activeDay.contentSettings.fontSize}
              onChange={(e) => updateSection("contentSettings", "fontSize", e.target.value)}
            >
              {FONT_SIZE_OPTIONS.map((o) => <option key={o}>{o}</option>)}
            </Select>
          </div>

          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-[#0A0847]">Enable Background Music</span>
            <button
              type="button"
              onClick={() => updateSection("contentSettings", "enableMusic", !activeDay.contentSettings.enableMusic)}
              className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                activeDay.contentSettings.enableMusic ? "bg-[#001984]" : "bg-gray-200"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform ${
                  activeDay.contentSettings.enableMusic ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div>
            <Label>Music Volume</Label>
            <Select
              disabled={!activeDay.contentSettings.enableMusic}
              value={activeDay.contentSettings.musicVolume}
              onChange={(e) => updateSection("contentSettings", "musicVolume", e.target.value)}
              className="disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {MUSIC_VOLUME_OPTIONS.map((o) => <option key={o}>{o}</option>)}
            </Select>
          </div>
        </div>

        {/* 8. Journey Navigation */}
        <div className="bg-white rounded-lg border border-[#E2DFFC] p-6">
          <div className="flex items-start gap-3 mb-5">
            <span className="w-8 h-8 rounded-full bg-[#001984] text-white text-sm font-semibold flex items-center justify-center shrink-0">8</span>
            <h3 className="text-base font-semibold text-[#0A0847]">Journey Navigation</h3>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <Label required>Start Date</Label>
              <DateField
                value={activeDay.navigation.startDate}
                onChange={(v) => updateSection("navigation", "startDate", v)}
              />
            </div>
            <div>
              <Label required>End Date</Label>
              <DateField
                value={activeDay.navigation.endDate}
                onChange={(v) => updateSection("navigation", "endDate", v)}
              />
            </div>
          </div>

          <div className="mb-4">
            <Label>Previous Day</Label>
            <Select
              value={activeDay.navigation.previousDay}
              onChange={(e) => updateSection("navigation", "previousDay", e.target.value)}
            >
              <option>None (This is the first day)</option>
              {days.filter((d) => d.dayNumber < activeDay.dayNumber).map((d) => (
                <option key={d.dayNumber}>
                  Day {d.dayNumber}{d.dayDetails.title ? ` - ${d.dayDetails.title}` : ""}
                </option>
              ))}
            </Select>
          </div>

          <div className="mb-4">
            <Label>Next Day</Label>
            <Select
              value={activeDay.navigation.nextDay}
              onChange={(e) => updateSection("navigation", "nextDay", e.target.value)}
            >
              <option>None (This is the last day)</option>
              {days.filter((d) => d.dayNumber > activeDay.dayNumber).map((d) => (
                <option key={d.dayNumber}>
                  Day {d.dayNumber}{d.dayDetails.title ? ` - ${d.dayDetails.title}` : ""}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <Label>Navigation Style</Label>
            <Select
              value={activeDay.navigation.navigationStyle}
              onChange={(e) => updateSection("navigation", "navigationStyle", e.target.value)}
            >
              {NAV_STYLE_OPTIONS.map((o) => <option key={o}>{o}</option>)}
            </Select>
          </div>
        </div>
      </div>

    </div>
  );
}