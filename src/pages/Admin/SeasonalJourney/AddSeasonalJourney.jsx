import React, { useState, useRef } from "react";
import {
  FiSave,
  FiEye,
  FiSend,
  FiPlus,
  FiCalendar,
  FiChevronDown,
  FiUploadCloud,
  FiEdit2,
  FiTrash2,
  FiPlay,
  FiChevronLeft,
  FiChevronRight,
  FiMusic,
  FiX,
  FiCheck,
  FiImage,
  FiArrowUp,
  FiArrowDown,
  FiInfo,
  FiList,
  FiPause,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import PublishWhiteIcon from "../../../assets/SeasonalJourneys/PublishWhiteIcon.svg";
import SaveIcon from "../../../assets/SeasonalJourneys/SaveIcon.svg";
import CalanderIcon from "../../../assets/SeasonalJourneys/CalanderIcon.svg";
import UploadIcon from "../../../assets/SeasonalJourneys/UploadIcon.svg";
import ImagePreview from "../../../assets/SeasonalJourneys/ImagePreview.png";
import EditIcon from "../../../assets/SeasonalJourneys/Edit.svg";
import TrashRedIcon from "../../../assets/SeasonalJourneys/TrashRedIcon.svg";

/* ==========================================================================
   REUSABLE ATOMS (same styling as your AddDailyVerseWizard)
   ========================================================================== */

 const SvgIcon = ({ src, size = 16, className = "" }) => (
  <img src={src} alt="" width={size} height={size} className={`shrink-0 ${className}`} />
);

   const SaveIconSvg = (p) => <SvgIcon src={SaveIcon} {...p} />;
   const PublishWhiteIconSvg = (p) => <SvgIcon src={PublishWhiteIcon} {...p} />;
   const CalanderIconSvg = (p) => <SvgIcon src={CalanderIcon} {...p} />;
   const UploadIconSvg = (p) => <SvgIcon src={UploadIcon} {...p} />;
   const EditIconSvg = (p) => <SvgIcon src={EditIcon} {...p} />;
   const TrashRedIconSvg = (p) => <SvgIcon src={TrashRedIcon} {...p} />;

const Input = ({ className = "", ...props }) => (
  <input
    className={`w-full border border-[#E2DFFC] rounded-md px-3 py-3 text-xs text-[#0A0847] placeholder-gray-400 bg-white outline-none focus:border-[#001984] transition-all ${className}`}
    {...props}
  />
);

const Select = ({ children, className = "", ...props }) => (
  <select
    className={`w-full border border-[#E2DFFC] rounded-md px-3 py-3 text-xs text-[#0A0847] bg-white outline-none focus:border-[#001984] transition-all cursor-pointer ${className}`}
    {...props}
  >
    {children}
  </select>
);

const Label = ({ children, required }) => (
  <label className="block text-xs font-semibold text-[#0A0847CC] mb-1.5">
    {children} {required && <span className="text-[#EB0C10]">*</span>}
  </label>
);

const SectionTitle = ({ n, title, subtitle }) => (
  <div className="flex items-start gap-3 mb-6">
    <span className="w-8 h-8 rounded-full bg-[#001984] text-white text-sm font-semibold flex items-center justify-center shrink-0">
      {n}
    </span>
    <div>
      <h3 className="text-base font-semibold text-[#0A0847]">{title}</h3>
      {subtitle && (
        <p className="text-xs text-[#0A084799] font-medium mt-0.5">
          {subtitle}
        </p>
      )}
    </div>
  </div>
);

const DateField = ({ value, onChange, placeholder = "mm/dd/yyyy" }) => (
  <div className="relative">
    <input
      type="date"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-11 bg-white border border-[#E2DFFC] rounded-md px-3.5 text-xs text-[#0A0847] placeholder-gray-400 outline-none focus:border-[#001984] appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
    />
    <CalanderIconSvg
      size={14}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
    />
  </div>
);

/** Input + "+" button: view/reuse saved presets, or add a new one */
const TagField = ({
  value,
  onChange,
  suggestions,
  onAddSuggestion,
  placeholder,
}) => {
  const [open, setOpen] = useState(false);
  const [newVal, setNewVal] = useState("");

  const addNew = () => {
    const v = newVal.trim();
    if (!v) return;
    onAddSuggestion(v);
    onChange(v);
    setNewVal("");
    setOpen(false);
  };

  return (
    <div className="relative">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-[#E2DFFC] rounded-md pl-3 pr-11 py-3 text-xs text-[#0A0847] placeholder-gray-400 bg-white outline-none focus:border-[#001984] transition-all"
      />
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-md bg-[#F1F2F9] text-[#0A0847] flex items-center justify-center hover:bg-[#E2DFFC] transition-colors cursor-pointer"
      >
        <FiPlus size={14} />
      </button>

      {open && (
        <div className="absolute z-20 mt-2 w-full bg-white border border-[#E2DFFC] rounded-lg shadow-lg p-3">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
            Saved names
          </p>
          {suggestions.length > 0 ? (
            <div className="flex flex-wrap gap-2 mb-3">
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    onChange(s);
                    setOpen(false);
                  }}
                  className="px-3 py-1.5 rounded-full bg-[#F1F2F9] text-[#0A0847] text-[11px] font-medium hover:bg-[#E2DFFC] transition-colors cursor-pointer"
                >
                  {s}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-[11px] text-gray-400 mb-3">
              No saved names yet.
            </p>
          )}
          <div className="flex items-center gap-2">
            <input
              value={newVal}
              onChange={(e) => setNewVal(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addNew()}
              placeholder="Add new..."
              className="flex-1 border border-[#E2DFFC] rounded-md px-2.5 py-2 text-xs text-[#0A0847] outline-none focus:border-[#001984]"
            />
            <button
              type="button"
              onClick={addNew}
              className="px-3 py-2 bg-[#001984] text-white text-xs font-semibold rounded-md hover:bg-[#001266] cursor-pointer"
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

/** Select with an inset "+" button: add a custom option to the list */
const SelectWithAdd = ({ value, onChange, options, onAddOption }) => {
  const [open, setOpen] = useState(false);
  const [newVal, setNewVal] = useState("");

  const addNew = () => {
    const v = newVal.trim();
    if (!v) return;
    onAddOption(v);
    onChange(v);
    setNewVal("");
    setOpen(false);
  };

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none border border-[#E2DFFC] rounded-md pl-3 pr-20 py-3 text-xs text-[#0A0847] bg-white outline-none focus:border-[#001984] cursor-pointer"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <FiChevronDown
        size={14}
        className="absolute right-11 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
      />
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-md bg-[#F1F2F9] text-[#0A0847] flex items-center justify-center hover:bg-[#E2DFFC] transition-colors cursor-pointer"
      >
        <FiPlus size={14} />
      </button>

      {open && (
        <div className="absolute z-20 mt-2 w-full bg-white border border-[#E2DFFC] rounded-lg shadow-lg p-3 flex items-center gap-2">
          <input
            value={newVal}
            onChange={(e) => setNewVal(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addNew()}
            placeholder="Add new season..."
            className="flex-1 border border-[#E2DFFC] rounded-md px-2.5 py-2 text-xs text-[#0A0847] outline-none focus:border-[#001984]"
          />
          <button
            type="button"
            onClick={addNew}
            className="px-3 py-2 bg-[#001984] text-white text-xs font-semibold rounded-md hover:bg-[#001266] cursor-pointer"
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
};

/* ==========================================================================
   STATIC DATA
   ========================================================================== */
const TIME_ZONES = [
  {
    value: "America/New_York",
    label: "(UTC-05:00) Eastern Time (US & Canada)",
  },
  { value: "America/Chicago", label: "(UTC-06:00) Central Time (US & Canada)" },
  { value: "America/Denver", label: "(UTC-07:00) Mountain Time (US & Canada)" },
  {
    value: "America/Los_Angeles",
    label: "(UTC-08:00) Pacific Time (US & Canada)",
  },
  { value: "GMT", label: "(UTC+00:00) GMT" },
  { value: "Asia/Kolkata", label: "(UTC+05:30) India Standard Time" },
];

const WEEK_DAYS = [
  { id: 0, label: "S" },
  { id: 1, label: "M" },
  { id: 2, label: "T" },
  { id: 3, label: "W" },
  { id: 4, label: "T" },
  { id: 5, label: "F" },
  { id: 6, label: "S" },
];

const CONTENT_ACCESS_OPTIONS = [
  "Unlock content daily",
  "Unlock all at once",
  "Unlock weekly",
];

const DAY_TYPES = ["Devotional", "Reading", "Reflection", "Prayer", "Video"];
const DAY_STATUSES = ["Draft", "Scheduled", "Published"];

const INITIAL_DAYS = [
  {
    id: "d1",
    title: "The Risen King",
    focus: "Jesus' Resurrection",
    type: "Devotional",
    estTime: "10 min",
    releaseDate: "2026-03-29",
    status: "Draft",
  },
  {
    id: "d2",
    title: "Peace Be With You",
    focus: "Jesus Appears to Disciples",
    type: "Devotional",
    estTime: "8 min",
    releaseDate: "2026-03-30",
    status: "Draft",
  },
  {
    id: "d3",
    title: "New Life in Christ",
    focus: "New Beginnings",
    type: "Devotional",
    estTime: "9 min",
    releaseDate: "2026-03-31",
    status: "Draft",
  },
  {
    id: "d4",
    title: "Walk in the Light",
    focus: "Living in His Light",
    type: "Devotional",
    estTime: "10 min",
    releaseDate: "2026-04-01",
    status: "Draft",
  },
  {
    id: "d5",
    title: "Love One Another",
    focus: "A New Commandment",
    type: "Devotional",
    estTime: "8 min",
    releaseDate: "2026-04-02",
    status: "Draft",
  },
];

const STATUS_STYLES = {
  Draft: "bg-[#C654061A] text-[#C65406] border-[#FADCC7]",
  Scheduled: "bg-[#1617E31A] text-[#1617E3] border-[#D4D4FB]",
  Published: "bg-[#21AC1C1A] text-[#21AC1C] border-[#DAF3C8]",
};

const emptyDayForm = {
  title: "",
  focus: "",
  type: "Devotional",
  estTime: "",
  releaseDate: "",
  status: "Draft",
};

/* ==========================================================================
   DAY FORM (used for both Add and Edit)
   ========================================================================== */
const DayForm = ({ value, onChange, onSubmit, onCancel, submitLabel }) => (
  <div className="border border-[#E2DFFC] rounded-lg p-4 mb-4 bg-[#F8FAFC] space-y-3">
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div>
        <Label>Title</Label>
        <Input
          placeholder="e.g. The Risen King"
          value={value.title}
          onChange={(e) => onChange({ ...value, title: e.target.value })}
        />
      </div>
      <div>
        <Label>Focus</Label>
        <Input
          placeholder="e.g. Jesus' Resurrection"
          value={value.focus}
          onChange={(e) => onChange({ ...value, focus: e.target.value })}
        />
      </div>
      <div>
        <Label>Type</Label>
        <Select
          value={value.type}
          onChange={(e) => onChange({ ...value, type: e.target.value })}
        >
          {DAY_TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </Select>
      </div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div>
        <Label>Est. Time</Label>
        <Input
          placeholder="e.g. 10 min"
          value={value.estTime}
          onChange={(e) => onChange({ ...value, estTime: e.target.value })}
        />
      </div>
      <div>
        <Label>Release Date</Label>
        <DateField
          value={value.releaseDate}
          onChange={(v) => onChange({ ...value, releaseDate: v })}
        />
      </div>
      <div>
        <Label>Status</Label>
        <Select
          value={value.status}
          onChange={(e) => onChange({ ...value, status: e.target.value })}
        >
          {DAY_STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </Select>
      </div>
    </div>
    <div className="flex items-center justify-end gap-2 pt-1">
      <button
        type="button"
        onClick={onCancel}
        className="px-4 py-2 border border-[#E2DFFC] text-[#0A0847] text-xs font-semibold rounded-md hover:bg-gray-50 cursor-pointer"
      >
        Cancel
      </button>
      <button
        type="button"
        onClick={onSubmit}
        disabled={!value.title.trim()}
        className="px-4 py-2 bg-[#001984] text-white text-xs font-semibold rounded-md hover:bg-[#001266] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {submitLabel}
      </button>
    </div>
  </div>
);


export default function AddSeasonalJourneyWizard({ onCancel }) {
  const coverImageRef = useRef(null);
  const thumbnailRef = useRef(null);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioPlayerRef = useRef(null);
  const [audioUrl, setAudioUrl] = useState("");
  const navigate = useNavigate();

  const [nameSuggestions, setNameSuggestions] = useState([
    "Easter Journey 2026",
    "Christmas Journey 2026",
  ]);
  const [titleSuggestions, setTitleSuggestions] = useState([
    "Easter: A Journey of Hope",
  ]);
  const [subtitleSuggestions, setSubtitleSuggestions] = useState([
    "Reflecting on the resurrection and new life in Jesus.",
  ]);
  const [seasonOptions, setSeasonOptions] = useState([
    "Easter",
    "Christmas",
    "Lent",
    "Advent",
    "Pentecost",
    "Thanksgiving",
  ]);

  const [formData, setFormData] = useState({
    internalName: "Easter Journey 2026",
    numberOfDays: 7,
    dashboardTitle: "Easter: A Journey of Hope",
    displayEndDate: "2026-04-04",
    dashboardSubtitle: "Reflecting on the resurrection and new life in Jesus.",
    timeZone: "America/New_York",
    season: "Easter",
    displayStartDate: "2026-03-29",
    coverImage: ImagePreview,
    accentColor: "#001984",
    scheduleDays: [0],
    contentAccessBehavior: "Unlock content daily",
    audioFile: null,
    audioFileName: "",
    audioFileSize: "",
    audioThumbnail: "",
  });

  const [days, setDays] = useState(INITIAL_DAYS);
  const [view, setView] = useState("list"); // "list" | "calendar"
  const [reorderMode, setReorderMode] = useState(false);
  const [addingDay, setAddingDay] = useState(false);
  const [editingDayId, setEditingDayId] = useState(null);
  const [dayForm, setDayForm] = useState(emptyDayForm);
  const [entriesPerPage, setEntriesPerPage] = useState("05");
  const [page, setPage] = useState(1);
  const [imgError, setImgError] = useState(false);

  const set = (key, value) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  /* ---------- Uploads ---------- */
  const handleCoverUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImgError(false);
      set("coverImage", URL.createObjectURL(file));
    }
    e.target.value = "";
  };

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (file) set("audioThumbnail", URL.createObjectURL(file));
    e.target.value = "";
  };

  const handleAudioUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      set("audioFile", file);
      set("audioFileName", file.name);
      set("audioFileSize", `${(file.size / (1024 * 1024)).toFixed(1)} MB`);
      setAudioUrl(URL.createObjectURL(file));
      setIsPlaying(false);
    }
    e.target.value = "";
  };

  const removeAudio = () => {
    audioPlayerRef.current?.pause();
    set("audioFile", null);
    set("audioFileName", "");
    set("audioFileSize", "");
    setAudioUrl("");
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (!audioPlayerRef.current) return;
    if (isPlaying) {
      audioPlayerRef.current.pause();
    } else {
      audioPlayerRef.current.play();
    }
    setIsPlaying((p) => !p);
  };

  /* ---------- Schedule day toggle ---------- */
  const toggleScheduleDay = (id) => {
    set(
      "scheduleDays",
      formData.scheduleDays.includes(id)
        ? formData.scheduleDays.filter((d) => d !== id)
        : [...formData.scheduleDays, id],
    );
  };

  /* ---------- Daily Journey Schedule (days table) ---------- */
  const openAddDay = () => {
    setEditingDayId(null);
    setDayForm(emptyDayForm);
    setAddingDay(true);
  };

  const openEditDay = () => {
    navigate("/admin/seasonal-journey/add/edit-daily-content", { state: { days } });
    };

  const cancelDayForm = () => {
    setAddingDay(false);
    setEditingDayId(null);
    setDayForm(emptyDayForm);
  };

  const submitAddDay = () => {
    setDays((prev) => [...prev, { id: crypto.randomUUID(), ...dayForm }]);
    cancelDayForm();
  };

  const submitEditDay = () => {
    setDays((prev) =>
      prev.map((d) => (d.id === editingDayId ? { ...d, ...dayForm } : d)),
    );
    cancelDayForm();
  };

  const deleteDay = (id) => setDays((prev) => prev.filter((d) => d.id !== id));

  const moveDay = (index, dir) => {
    setDays((prev) => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  /* Pagination */
  const perPage = parseInt(entriesPerPage, 10);
  const totalPages = Math.max(1, Math.ceil(days.length / perPage));
  const currentPage = Math.min(page, totalPages);
  const visibleDays = days.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage,
  );
  const pageNumbers = Array.from(
    { length: Math.min(totalPages, 5) },
    (_, i) => i + 1,
  );

  /* ---------- Actions ---------- */
  const handleAction = (type) => {
    const payload = {
      ...formData,
      scheduleDaysLabels: formData.scheduleDays.map(
        (id) => WEEK_DAYS[id].label,
      ),
      days,
    };
    console.log(`Action: ${type}`);
    console.log("Seasonal Journey Payload:", payload);
    alert(`${type}! Check browser console for full payload.`);
  };

  const hasCoverImage = formData.coverImage && !imgError;

  return (
    <div className="bg-[#F8FAFC] min-h-screen p-6 font-[Inter] space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-[#0A0847]">
            Add New Seasonal Journey
          </h1>
          <p className="text-sm text-[#0A084799] font-medium mt-2">
            Create a new spiritual journey for your community.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleAction("Save draft")}
            className="px-4 py-2.5 bg-white border border-[#E2DFFC] rounded-md text-xs font-semibold text-[#0A0847] hover:bg-gray-50 flex items-center gap-2 transition-colors cursor-pointer"
          >
            <SaveIconSvg size={14} /> Save draft
          </button>
          <button
            type="button"
            onClick={() => handleAction("Preview")}
            className="px-4 py-2.5 bg-white border border-[#E2DFFC] rounded-md text-xs font-semibold text-[#0A0847] hover:bg-gray-50 flex items-center gap-2 transition-colors cursor-pointer"
          >
            <FiEye size={14} /> Preview
          </button>
          <button
            type="button"
            onClick={() => handleAction("Publish Journey")}
            className="px-4 py-2.5 bg-[#001984] text-white rounded-md text-xs font-semibold hover:bg-[#001266] flex items-center gap-2 transition-colors cursor-pointer"
          >
            <PublishWhiteIconSvg size={14} /> Publish Journey
          </button>
        </div>
      </div>

      {/* Section 1: Journey Details */}
      <div className="bg-white rounded-lg border border-[#E2DFFC] p-6">
        <SectionTitle
          n={1}
          title="Journey Details"
          subtitle="Provide basic information about your seasonal journey."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-5">
          <div>
            <Label required>Internal Journey Name</Label>
            <TagField
              value={formData.internalName}
              onChange={(v) => set("internalName", v)}
              suggestions={nameSuggestions}
              onAddSuggestion={(v) =>
                setNameSuggestions((prev) => [...new Set([...prev, v])])
              }
              placeholder="e.g. Easter Journey 2026"
            />
          </div>

          <div>
            <Label required>Number of Days</Label>
            <Input
              type="number"
              min={1}
              value={formData.numberOfDays}
              onChange={(e) => set("numberOfDays", e.target.value)}
              placeholder="e.g. 7"
            />
          </div>

          <div>
            <Label required>Short Dashboard Title</Label>
            <TagField
              value={formData.dashboardTitle}
              onChange={(v) => set("dashboardTitle", v)}
              suggestions={titleSuggestions}
              onAddSuggestion={(v) =>
                setTitleSuggestions((prev) => [...new Set([...prev, v])])
              }
              placeholder="e.g. Easter: A Journey of Hope"
            />
            <p className="text-[11px] text-gray-400 font-medium mt-1.5">
              Shown on the user dashboard
            </p>
          </div>

          <div>
            <Label required>Display End Date</Label>
            <DateField
              value={formData.displayEndDate}
              onChange={(v) => set("displayEndDate", v)}
            />
          </div>

          <div>
            <Label required>Dashboard Theme / Subtitle</Label>
            <TagField
              value={formData.dashboardSubtitle}
              onChange={(v) => set("dashboardSubtitle", v)}
              suggestions={subtitleSuggestions}
              onAddSuggestion={(v) =>
                setSubtitleSuggestions((prev) => [...new Set([...prev, v])])
              }
              placeholder="One-line subtitle describing the journey"
            />
            <p className="text-[11px] text-gray-400 font-medium mt-1.5">
              One-line subtitle describing the journey
            </p>
          </div>

          <div>
            <Label required>Time Zone</Label>
            <div className="relative">
              <select
                value={formData.timeZone}
                onChange={(e) => set("timeZone", e.target.value)}
                className="w-full h-11 appearance-none border border-[#E2DFFC] rounded-md px-3 pr-9 text-xs text-[#0A0847] bg-white outline-none focus:border-[#001984] cursor-pointer"
              >
                {TIME_ZONES.map((tz) => (
                  <option key={tz.value} value={tz.value}>
                    {tz.label}
                  </option>
                ))}
              </select>
              <FiChevronDown
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
          </div>

          <div>
            <Label required>Season</Label>
            <SelectWithAdd
              value={formData.season}
              onChange={(v) => set("season", v)}
              options={seasonOptions}
              onAddOption={(v) =>
                setSeasonOptions((prev) => [...new Set([...prev, v])])
              }
            />
          </div>

          <div></div>

          <div>
            <Label required>Display Start Date</Label>
            <DateField
              value={formData.displayStartDate}
              onChange={(v) => set("displayStartDate", v)}
            />
          </div>
        </div>
      </div>

      {/* Section 2: Dashboard Cover + Preview */}
      <div className="bg-white rounded-lg border border-[#E2DFFC] p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Upload + Accent Color */}
          <div>
            <SectionTitle
              n={2}
              title="Dashboard Cover"
              subtitle="Customize how your journey appears on the dashboard."
            />

            <label className="block text-sm font-semibold text-[#0A0847] mb-3">
              Upload Cover Image
            </label>
            <input
              type="file"
              ref={coverImageRef}
              accept="image/*"
              onChange={handleCoverUpload}
              className="hidden"
            />
            <div
              onClick={() => coverImageRef.current?.click()}
              className="border border-dashed border-[#CBC6F8] rounded-lg h-22 flex items-center justify-center gap-3 bg-[#FAFAFF] hover:bg-[#F1F2F9] transition-colors cursor-pointer"
            >
              <UploadIconSvg size={40} className="text-[#001984]" />
              <span className="text-sm text-[#0A0847]">
                Upload / Replace Image
              </span>
            </div>
            <p className="text-[11px] text-[#0A0847CC] font-semibold mt-2">
              Recommended size: 1200×628px
              <br />
              JPG, PNG or WebP
            </p>

            <div className="mt-5">
              <Label required>Accent Color</Label>
              <p className="text-[11px] text-[#0A084799] font-medium mb-2">
                This color will be used for highlights and buttons
              </p>
              <div className="flex items-center gap-2 border border-[#E2DFFC] rounded-md px-3 py-2.5">
                <label
                  className="w-6 h-6 rounded-lg shrink-0 cursor-pointer border border-black/10"
                  style={{ backgroundColor: formData.accentColor }}
                >
                  <input
                    type="color"
                    value={formData.accentColor}
                    onChange={(e) => set("accentColor", e.target.value)}
                    className="opacity-0 w-6 h-6 cursor-pointer"
                  />
                </label>
                <input
                  value={formData.accentColor}
                  onChange={(e) => set("accentColor", e.target.value)}
                  className="flex-1 text-xs font-semibold text-[#0A0847] outline-none"
                />
                <FiChevronDown size={14} className="text-gray-400" />
              </div>
            </div>
          </div>

          {/* Right: Live Preview */}
          <div>
            <h3 className="text-base font-semibold text-[#0A0847] mb-4">
              Start Preview (Web)
            </h3>
            <div className="p-3 border border-[#E2DFFC] rounded-2xl">
            <div className="relative rounded-2xl overflow-hidden bg-gray-100 min-h-[280px] flex flex-col justify-end">
              {hasCoverImage ? (
                <img
                  src={formData.coverImage}
                  onError={() => setImgError(true)}
                  alt="Cover preview"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-gray-400">
                  <FiImage size={28} />
                  <span className="text-xs font-medium">
                    Upload a cover image to preview
                  </span>
                </div>
              )}
              {hasCoverImage && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              )}

              <div
                className="relative p-6"
                style={{ color: `${formData.accentColor}CC` }}
              >
                <p className="text-xs font-medium opacity-90">
                  {formData.internalName}
                </p>
                <h2
                  className="text-2xl font-bold mt-1 leading-tight"
                  style={{ color: formData.accentColor }}
                >
                  {formData.dashboardTitle}
                </h2>
                <div className="flex items-center gap-1.5 text-xs font-medium opacity-90 mt-3">
                  <FiCalendar size={14} />
                  <span>
                    {formData.displayStartDate || "Start"} –{" "}
                    {formData.displayEndDate || "End"} · {formData.numberOfDays}{" "}
                    Days
                  </span>
                </div>
                <div
                  className="h-1.5 rounded-full mt-3 overflow-hidden"
                  style={{ backgroundColor: `${formData.accentColor}4D` }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: "15%",
                      backgroundColor: formData.accentColor,
                    }}
                  />
                </div>
                <button
                  type="button"
                  style={{ backgroundColor: formData.accentColor }}
                  className="w-full mt-4 py-3 rounded-lg text-white text-sm font-semibold cursor-pointer"
                >
                  Go to Your Journey
                </button>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Journey Settings */}
      <div className="bg-white rounded-lg border border-[#E2DFFC] p-6">
        <SectionTitle n={3} title="Journey Settings" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Schedule + Content Access */}
          <div className="space-y-5">
            <div>
              <Label required>Schedule</Label>
              <div className="flex items-center gap-2">
                {WEEK_DAYS.map((d) => {
                  const active = formData.scheduleDays.includes(d.id);
                  return (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => toggleScheduleDay(d.id)}
                      className={`w-9 h-9 rounded-md text-xs font-semibold flex items-center justify-center border transition-colors cursor-pointer ${
                        active
                          ? "bg-[#001984] text-white border-[#001984]"
                          : "bg-white text-[#0A0847] border-[#E2DFFC] hover:bg-gray-50"
                      }`}
                    >
                      {d.label}
                    </button>
                  );
                })}
              </div>
              <p className="text-lg text-[#0A084799] font-medium mt-2">
                Select the days of the week when content will be released. You
                can still edit individual release dates in the content section
                if needed.
              </p>
            </div>

            <div>
              <Label required>Content Access Behavior</Label>
              <div className="relative">
                <select
                  value={formData.contentAccessBehavior}
                  onChange={(e) => set("contentAccessBehavior", e.target.value)}
                  className="w-full h-11 appearance-none border border-[#E2DFFC] rounded-md px-3 pr-9 text-xs text-[#0A0847] bg-white outline-none focus:border-[#001984] cursor-pointer"
                >
                  {CONTENT_ACCESS_OPTIONS.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
                <FiChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
            </div>
          </div>

          {/* Right: Audio + Thumbnail */}
          <div className="space-y-5">
            <div>
              <Label>Write Audio (Optional) Upload</Label>
              <input
                type="file"
                ref={audioRef}
                accept="audio/*"
                onChange={handleAudioUpload}
                className="hidden"
              />
              {formData.audioFileName ? (
                <div className="border border-[#E2DFFC] rounded-lg p-4 bg-[#0A084705]">
                  <audio
                    ref={audioPlayerRef}
                    src={audioUrl}
                    onEnded={() => setIsPlaying(false)}
                    className="hidden"
                  />
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-lg bg-[#0019841A] text-[#001984] flex items-center justify-center shrink-0">
                      <FiMusic size={16} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-[#001984] truncate">
                        {formData.audioFileName}
                      </p>
                      <p className="text-[11px] text-gray-400 font-medium">
                        {formData.audioFileSize}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={togglePlay}
                      className="w-8 h-8 rounded-full border-2 border-[#001984] text-[#001984] flex items-center justify-center hover:bg-[#EEF2FF] transition-colors cursor-pointer shrink-0"
                    >
                      {isPlaying ? (
                        <FiPause size={12} />
                      ) : (
                        <FiPlay size={14} className="ml-0.5" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => audioRef.current?.click()}
                      className="px-5 py-2 bg-white border border-[#E2DFFC] text-[#001984] text-xs font-semibold rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      Replace
                    </button>
                    <button
                      type="button"
                      onClick={removeAudio}
                      className="px-5 py-2 bg-white border border-[#E2DFFC] text-[#001984] text-xs font-semibold rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => audioRef.current?.click()}
                  className="border border-dashed border-[#CBC6F8] rounded-lg h-20 flex items-center justify-center gap-3 bg-[#FAFAFF] hover:bg-[#F1F2F9] transition-colors cursor-pointer"
                >
                  <UploadIconSvg size={20} className="text-[#001984]" />
                  <span className="text-xs font-semibold text-[#0A0847]">
                    Upload Audio
                  </span>
                </div>
              )}
            </div>

            <div>
              <Label>AUDIO/VIDEO THUMBNAIL (Optional)</Label>
              <input
                type="file"
                ref={thumbnailRef}
                accept="image/*"
                onChange={handleThumbnailUpload}
                className="hidden"
              />
              {formData.audioThumbnail ? (
                <div className="relative rounded-lg overflow-hidden border border-[#E2DFFC] h-28">
                  <img
                    src={formData.audioThumbnail}
                    alt="Audio thumbnail"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => thumbnailRef.current?.click()}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-[#001984] text-white hover:bg-[#001266] cursor-pointer"
                  >
                    <FiEdit2 size={12} />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => thumbnailRef.current?.click()}
                  className="h-24 flex items-center justify-center gap-3 bg-[#FAFAFF] hover:bg-[#F1F2F9] transition-colors cursor-pointer border border-dashed border-[#001984]"
                >
                  <UploadIconSvg size={40} className="text-[#001984]" />
                  <span className="text-sm font-normal text-[#0A0847]">
                    Upload / Replace Image
                  </span>
                </div>
              )}
              <p className="text-[11px] text-[#0A084799] font-medium mt-2">
                Recommended size: 1200×628px | JPG, PNG or WebP
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: Daily Journey Schedule */}
      <div className="bg-white rounded-lg border border-[#E2DFFC] p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <SectionTitle n={4} title="Daily Journey Schedule" />
        </div>

        <div className="flex items-center justify-between gap-2 mb-5">
          <div className=" flex gap-2">
            <button
              type="button"
              onClick={() => setView("list")}
              className={`px-5 py-2.5 w-40 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                view === "list"
                  ? "bg-[#001984] text-white"
                  : "border border-[#E2DFFC] text-[#0A0847] hover:bg-gray-50"
              }`}
            >
              List View
            </button>
            <button
              type="button"
              onClick={() => setView("calendar")}
              className={`px-5 py-2.5 w-40 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                view === "calendar"
                  ? "bg-[#001984] text-white"
                  : "border border-[#E2DFFC] text-[#0A0847] hover:bg-gray-50"
              }`}
            >
              Calendar View
            </button>
          </div>
          <span className="text-sm font-semibold text-[#0A084799] shrink-0">
            {days.length} Days in total
          </span>
        </div>

        {view === "calendar" ? (
          <div className="border border-dashed border-[#E2DFFC] rounded-lg p-10 text-center text-gray-400 text-xs font-medium">
            Calendar view isn't built yet — switch to List View to manage days.
          </div>
        ) : (
          <>
            {(addingDay || editingDayId) && (
              <DayForm
                value={dayForm}
                onChange={setDayForm}
                onCancel={cancelDayForm}
                onSubmit={addingDay ? submitAddDay : submitEditDay}
                submitLabel={addingDay ? "Add Day" : "Save Changes"}
              />
            )}

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[760px]">
                <thead className="bg-[#F3F7FD] text-[#0A084799]">
                  <tr>
                    <th className="p-4 font-medium text-sm text-[#0A0847CC]">
                      Day
                    </th>
                    <th className="p-4 font-medium text-sm text-[#0A0847CC]">
                      Title
                    </th>
                    <th className="p-4 font-medium text-sm text-[#0A0847CC]">
                      Focus
                    </th>
                    <th className="p-4 font-medium text-sm text-[#0A0847CC]">
                      Type
                    </th>
                    <th className="p-4 font-medium text-sm text-[#0A0847CC]">
                      Est. Time
                    </th>
                    <th className="p-4 font-medium text-sm text-[#0A0847CC]">
                      Release Date
                    </th>
                    <th className="p-4 font-medium text-sm text-[#0A0847CC]">
                      Status
                    </th>
                    <th className="p-4 text-right font-medium text-sm text-[#0A0847CC]">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2DFFC] text-[#0A0847]">
                  {visibleDays.length === 0 && (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-gray-400">
                        No days added yet.
                      </td>
                    </tr>
                  )}
                  {visibleDays.map((item, i) => {
                    const globalIndex = (currentPage - 1) * perPage + i;
                    return (
                      <tr
                        key={item.id}
                        className="hover:bg-gray-50/50 transition-colors"
                      >
                        <td className="p-4 font-semibold text-[#0A0847CC]">
                          {globalIndex + 1}
                        </td>
                        <td className="p-4 font-medium text-[#0A0847CC] whitespace-nowrap">
                          {item.title}
                        </td>
                        <td className="p-4 font-medium text-[#0A0847CC] whitespace-nowrap">
                          {item.focus}
                        </td>
                        <td className="p-4 font-medium text-[#0A0847CC]">
                          {item.type}
                        </td>
                        <td className="p-4 font-medium text-[#0A0847CC] whitespace-nowrap">
                          {item.estTime}
                        </td>
                        <td className="p-4 font-semibold text-[#222222] whitespace-nowrap">
                          {item.releaseDate}
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-lg text-xs font-medium border inline-block ${STATUS_STYLES[item.status]}`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-end gap-1.5">
                            {reorderMode && (
                              <>
                                <button
                                  type="button"
                                  onClick={() => moveDay(globalIndex, -1)}
                                  className="w-7 h-7 rounded-md border border-[#E2DFFC] text-[#0A0847] flex items-center justify-center hover:bg-gray-50 cursor-pointer"
                                >
                                  <FiArrowUp size={12} />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => moveDay(globalIndex, 1)}
                                  className="w-7 h-7 rounded-md border border-[#E2DFFC] text-[#0A0847] flex items-center justify-center hover:bg-gray-50 cursor-pointer"
                                >
                                  <FiArrowDown size={12} />
                                </button>
                              </>
                            )}
                            <button
                              type="button"
                              onClick={openEditDay}
                              className="w-7 h-7 rounded-md border border-[#E2DFFC] text-[#001984] flex items-center justify-center hover:bg-[#EEF2FF] transition-colors cursor-pointer"
                            >
                              <EditIconSvg size={16} />
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteDay(item.id)}
                              className="w-7 h-7 rounded-md border border-[#E2DFFC] text-[#D80027] flex items-center justify-center hover:bg-red-50 transition-colors cursor-pointer"
                            >
                              <TrashRedIconSvg size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Footer / Pagination */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#0A084799]">
              <div className="flex items-center gap-2">
                <span className="text-[#0A0847CC] font-medium">Display</span>
                <div className="relative">
                  <select
                    value={entriesPerPage}
                    onChange={(e) => {
                      setEntriesPerPage(e.target.value);
                      setPage(1);
                    }}
                    className="appearance-none border border-[#E2DFFC] rounded-lg px-2.5 py-1 pr-6 text-xs text-[#0A0847] outline-none cursor-pointer"
                  >
                    <option value="05">05</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                  </select>
                  <FiChevronDown
                    size={12}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                </div>
                <span>Entries</span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-8 h-8 rounded-lg border border-[#E2DFFC] flex items-center justify-center text-gray-400 hover:bg-gray-50 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                >
                  <FiChevronLeft size={16} />
                </button>
                {pageNumbers.map((n) => (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer ${
                      currentPage === n
                        ? "bg-[#001984] text-white font-bold"
                        : "text-gray-600 hover:bg-gray-50 font-medium"
                    }`}
                  >
                    {n}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="w-8 h-8 rounded-lg border border-[#001984] flex items-center justify-center text-[#001984] hover:bg-gray-50 disabled:opacity-50 disabled:border-[#E2DFFC] cursor-pointer disabled:cursor-not-allowed"
                >
                  <FiChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Add Day / Reorder */}
          </>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between gap-3 pt-5 mt-2">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={openAddDay}
            className="px-4 py-2.5 border border-[#E2DFFC] text-[#0A0847] text-xs font-semibold rounded-md flex items-center gap-2 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <FiPlus size={14} /> Add Day
          </button>
          <button
            type="button"
            onClick={() => setReorderMode((r) => !r)}
            className={`px-4 py-2.5 border text-xs font-semibold rounded-md flex items-center gap-2 transition-colors cursor-pointer ${
              reorderMode
                ? "bg-[#001984] text-white border-[#001984]"
                : "border-[#E2DFFC] text-[#0A0847] hover:bg-gray-50"
            }`}
          >
            {reorderMode ? <FiCheck size={14} /> : <FiList size={14} />}
            {reorderMode ? "Done Reordering" : "Reorder Days"}
          </button>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-medium text-[#0A0847CC]">
          <span>Business as Usual: 0</span>
          <FiInfo size={14} className="text-gray-400" />
        </div>
      </div>
    </div>
  );
}
