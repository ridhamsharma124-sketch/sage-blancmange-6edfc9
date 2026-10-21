import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FiSave,
  FiEye,
  FiSend,
  FiChevronDown,
  FiHeart,
  FiBold,
  FiItalic,
  FiUnderline,
  FiLink,
  FiList,
  FiPlay,
  FiPause,
  FiX,
  FiPlus,
  FiCopy,
  FiTrash2,
  FiMusic,
  FiDownload,
  FiRefreshCw,
  FiCheckCircle,
  FiAlertTriangle,
  FiInfo,
  FiImage,
  FiCheck
} from "react-icons/fi";
// import { MdDragIndicator } from "react-[#0A0847CC]"; // Standard grid handle placeholder icon
import Breadcrumb from "../../../components/UIComponents/BreadCrumb";
import AddJournelPreviewImg from "../../../assets/AddJournelPreviewImg.png";
import GreenBird from "../../../assets/DivineCounselSvgs/GreenBird.svg";
import HandsPurple from "../../../assets/DivineCounselSvgs/HandsPurple.svg";
import YellowHands from "../../../assets/DivineCounselSvgs/YellowHands.svg";
import HeartHandsPurple from "../../../assets/DivineCounselSvgs/HeartHnadsPurple.svg"
import SaveIcon from "../../../assets/DivineCounselSvgs/SaveIcon.svg";

/* ==========================================================================
   ATOMS & FORM HELPERS
   ========================================================================== */

  
      const SvgIcon = ({ src, size = 16, className = "" }) => (
                <img src={src} alt="" width={size} height={size} className={`shrink-0 ${className}`} />
              );
              
         const GreenBirdIconSvg = (p) => <SvgIcon src={GreenBird} {...p} />;
         const HandsPurpleIconSvg = (p) => <SvgIcon src={HandsPurple} {...p} />;
         const YellowHandsIconSvg = (p) => <SvgIcon src={YellowHands} {...p} />;
         const HeartHandsPurpleIconSvg = (p) => <SvgIcon src={HeartHandsPurple} {...p} />;
         const SaveIconSvg = (p) => <SvgIcon src={SaveIcon} {...p} />;


const Input = (props) => (
  <input
    {...props}
    className={`w-full border border-[#E2DFFC] rounded-md px-3 py-2 text-xs text-[#0A0847] placeholder-gray-400 bg-white outline-none focus:border-[#001984] transition-all ${
      props.className || ""
    }`}
  />
);

const Label = ({ children, required }) => (
  <label className="block text-xs font-semibold text-[#0A0847CC] mb-1.5 flex items-center gap-1">
    {children} {required && <span className="text-[#EB0C10]">*</span>}
  </label>
);

const Select = ({ value, onChange, options }) => (
  <div className="relative">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full appearance-none border border-[#E2DFFC] rounded-md px-3 pr-8 py-2 text-xs text-[#0A0847] bg-white outline-none focus:border-[#001984] cursor-pointer"
    >
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
    <FiChevronDown
      size={13}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
    />
  </div>
);

const SectionCard = ({ n, title, children, className = "" }) => (
  <div
    className={`bg-white rounded-lg border border-[#E2DFFC] p-5 ${className}`}
  >
    <div className="flex items-center gap-3 pb-3 mb-4 border-b border-[#E2DFFC]">
      <span className="w-6 h-6 rounded-full bg-[#001984] text-white text-xs font-semibold flex items-center justify-center shrink-0">
        {n}
      </span>
      <h3 className="text-sm font-semibold text-[#0A0847]">{title}</h3>
    </div>
    {children}
  </div>
);

const AdvancedRichArea = ({ value, onChange, placeholder, rows = 4 }) => {
  const [fmt, setFmt] = useState({
    bold: false,
    italic: false,
    underline: false,
  });
  const toggle = (k) => setFmt((p) => ({ ...p, [k]: !p[k] }));
  const btn = "p-1 rounded hover:bg-gray-200 cursor-pointer text-gray-600";
  const on = (v) => (v ? "bg-gray-300 text-[#0A0847]" : "");

  return (
    <div className="border border-[#E2DFFC] rounded-md overflow-hidden focus-within:border-[#001984]">
      <div className="bg-[#F8FAFC] border-b border-[#E2DFFC] px-2 py-1.5 flex items-center gap-2 flex-wrap text-xs">
        {/* Font Family Dropdown */}
        <select className="border border-[#E2DFFC] rounded px-1.5 py-0.5 text-[11px] bg-white text-[#0A0847] outline-none">
          <option>Inter</option>
          <option>Roboto</option>
          <option>Serif</option>
        </select>
        {/* Font Size Dropdown */}
        <select className="border border-[#E2DFFC] rounded px-1.5 py-0.5 text-[11px] bg-white text-[#0A0847] outline-none">
          <option>20</option>
          <option>18</option>
          <option>16</option>
          <option>14</option>
        </select>
        <span className="w-px h-4 bg-gray-300 mx-0.5" />
        <button
          type="button"
          onClick={() => toggle("bold")}
          className={`${btn} ${on(fmt.bold)}`}
        >
          <FiBold size={13} />
        </button>
        <button
          type="button"
          onClick={() => toggle("italic")}
          className={`${btn} ${on(fmt.italic)}`}
        >
          <FiItalic size={13} />
        </button>
        <button
          type="button"
          onClick={() => toggle("underline")}
          className={`${btn} ${on(fmt.underline)}`}
        >
          <FiUnderline size={13} />
        </button>
        <span className="w-px h-4 bg-gray-300 mx-0.5" />
        <button type="button" className={btn}>
          <FiLink size={13} />
        </button>
        <button type="button" className={btn}>
          <FiList size={13} />
        </button>
      </div>
      <textarea
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full p-2.5 text-xs text-[#0A0847] placeholder-gray-400 outline-none resize-none ${
          fmt.bold ? "font-bold" : "font-medium"
        } ${fmt.italic ? "italic" : ""} ${fmt.underline ? "underline" : ""}`}
      />
    </div>
  );
};

const TRANSLATIONS = ["NIV", "KJV", "ESV", "NLT"];
const CATEGORIES = [
  "Relationships",
  "Emotional Health",
  "Spiritual Growth",
  "Work & Purpose",
];
const ACTIVITY_LENGTHS = ["3 minutes", "5 minutes", "10 minutes"];
const FEELING_ICONS = { Peaceful: "🌿", Grateful: "🙏", Encouraged: "💪" };

const emptySubtopic = () => ({
  id: crypto.randomUUID(),
  title: "",
  desc: "",
  verse: "",
});
const emptyPrayer = () => ({
  id: crypto.randomUUID(),
  title: "A Prayer for My Marriage",
  body: "",
});

/* ==========================================================================
   MAIN COMPONENT
   ========================================================================== */
export default function AddDivineCounselTopicPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const passed = location.state?.topic;

  const imageRef = useRef(null);
  const audioRef = useRef(null);
  const audioPlayerRef = useRef(null);

  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});

  const [f, setF] = useState({
    title: passed?.title || "Marriage",
    desc: "God's design for a covenant relationship.",
    category: "Relationships",
    activityLength: "3 minutes",
    status: "Draft",
    displayOrder: "1",
    featured: true,
    coverImage: "",

    reflectionTitle: "God's Design for Marriage",
    reflectionDesc:
      '"Therefore what God has joined together, let no one separate."',
    verseRef: "Mark 10:9",
    translation: "NIV",
    mainReflection:
      "God created marriage to reflect His love and faithfulness. It is a covenant, not just a contract. When two lives God-ordained relationship, His grace is a place to love, forgive, and grow together.",

    subtopics: [
      {
        id: "1",
        title: "Love with Grace",
        desc: "Husbands are called to love with Christ-like sacrifice; wives are called to respect with singleness of heart.",
        verse: "Ephesians 5:25-33",
      },
    ],
    scriptures: ["Ephesians 5:22-33", "Ephesians 5:22-33", "Ephesians 5:22-33"],

    audioName: "",
    audioUrl: "",
    audioSecs: 0,
    audioDuration: "00:00",
    audioSize: "",
    audioFormat: "MP3",
    closingPrayers: [
      {
        id: "1",
        title: "Closing Prayer | A Prayer for My Marriage",
        body: "Lord,\n\nThank You for the gift of marriage. Help us to love each other the way You love us. Hold a relationship rooted in Your presence. Guide our hearts and keep You at the center of our home. May our marriage bring glory to You, be a testimony of Your faithfulness.\n\nIn Jesus' name, Amen.",
      },
    ],
    letUsersChoose: true,

    amenHeading: "Amen!",
    confirmationText: "Your prayer has been heard by our faithful God.",
    encouragementVerse:
      "The Lord gives strength to His people; the Lord blesses His people with peace.",
    amenVerseRef: "Psalm 28:7",
    amenTranslation: "NIV",
    howAreYouFeeling: "Let us know how we can pray with you.",
    feelings: ["Peaceful", "Grateful", "Encouraged"],
    showAddToJournal: true,
    showExploreMore: true,
  });

  const [imgError, setImgError] = useState(false);
  //   const [isPlaying, setIsPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [newScripture, setNewScripture] = useState("");
  const [newFeeling, setNewFeeling] = useState("");

  const audioElRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioTime, setAudioTime] = useState(0);

  const [activeTab, setActiveTab] = useState("reflection");

  const set = (k, v) => {
    setF((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: undefined }));
  };

  /* Step Header Labels */
  const steps = [
    "Topic Detail",
    "Reflection & Scripture",
    "Topic Audio & Closing Prayers",
    "Amen Page",
  ];

  /* Subtopics */
  const updateSubtopic = (id, patch) =>
    setF((p) => ({
      ...p,
      subtopics: p.subtopics.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    }));
  const addSubtopic = () =>
    setF((p) => ({ ...p, subtopics: [...p.subtopics, emptySubtopic()] }));
  const duplicateSubtopic = (id) =>
    setF((p) => {
      const s = p.subtopics.find((x) => x.id === id);
      return {
        ...p,
        subtopics: [...p.subtopics, { ...s, id: crypto.randomUUID() }],
      };
    });
  const removeSubtopic = (id) =>
    setF((p) => ({ ...p, subtopics: p.subtopics.filter((s) => s.id !== id) }));

  /* Scriptures */
  const addScripture = () => {
    const v = newScripture.trim();
    if (!v) return;
    set("scriptures", [...f.scriptures, v]);
    setNewScripture("");
  };
  const removeScripture = (i) =>
    set(
      "scriptures",
      f.scriptures.filter((_, idx) => idx !== i),
    );

  /* Closing prayers */
  const updatePrayer = (id, patch) =>
    setF((p) => ({
      ...p,
      closingPrayers: p.closingPrayers.map((c) =>
        c.id === id ? { ...c, ...patch } : c,
      ),
    }));
  const addPrayer = () =>
    setF((p) => ({
      ...p,
      closingPrayers: [...p.closingPrayers, emptyPrayer()],
    }));
  const duplicatePrayer = (id) =>
    setF((p) => {
      const c = p.closingPrayers.find((x) => x.id === id);
      return {
        ...p,
        closingPrayers: [
          ...p.closingPrayers,
          { ...c, id: crypto.randomUUID() },
        ],
      };
    });
  const removePrayer = (id) =>
    setF((p) => ({
      ...p,
      closingPrayers: p.closingPrayers.filter((c) => c.id !== id),
    }));

  /* Feelings */
  const toggleFeeling = (f2) =>
    setF((p) => ({
      ...p,
      feelings: p.feelings.includes(f2)
        ? p.feelings.filter((x) => x !== f2)
        : [...p.feelings, f2],
    }));
  const addFeeling = () => {
    const v = newFeeling.trim();
    if (!v) return;
    setF((p) => ({ ...p, feelings: [...p.feelings, v] }));
    setNewFeeling("");
  };

  const checklist = [
    { label: "Details", done: true },
    { label: "Scripture", done: true },
    { label: "Audio", done: true },
    { label: "Prayer", done: true },
    { label: "Amen Page", done: true },
  ];

  const fmtTime = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

  const handleAudioUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (f.audioUrl) URL.revokeObjectURL(f.audioUrl);
    setIsPlaying(false);
    setAudioTime(0);
    setF((p) => ({
      ...p,
      audioName: file.name,
      audioUrl: URL.createObjectURL(file),
      audioSize: `${(file.size / 1048576).toFixed(1)} MB`,
      audioFormat: file.name.split(".").pop().toUpperCase(),
      audioSecs: 0,
      audioDuration: "00:00",
    }));
    e.target.value = "";
  };

  const togglePlay = () => {
    const a = audioElRef.current;
    if (!a) return;
    a.paused ? a.play() : a.pause();
  };

  const seekTo = (ratio) => {
    const a = audioElRef.current;
    if (!a || !f.audioSecs) return;
    a.currentTime = ratio * f.audioSecs;
  };

  const handleCoverUpload = (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  if (f.coverImage) URL.revokeObjectURL(f.coverImage);
  setImgError(false);
  set("coverImage", URL.createObjectURL(file));
  e.target.value = "";
};

const removeCover = () => {
  if (f.coverImage) URL.revokeObjectURL(f.coverImage);
  set("coverImage", "");
};

  return (
    <div className="p-6 bg-[#F8FAFC] min-h-screen font-[Inter] space-y-5 text-xs text-[#0A0847]">
      <input
        type="file"
        ref={imageRef}
        accept="image/*"
        onChange={(e) =>
          set("coverImage", URL.createObjectURL(e.target.files[0]))
        }
        className="hidden"
      />
      <input type="file" ref={audioRef} accept="audio/*" className="hidden" />
      <input
        type="file"
        ref={audioRef}
        accept="audio/*"
        onChange={handleAudioUpload}
        className="hidden"
      />
      <input type="file" ref={imageRef} accept="image/*" onChange={handleCoverUpload} className="hidden" />

      {/* Header */}
      <div>
        <Breadcrumb
          items={[
            { label: "Divine Counsel", path: "/admin/divine-counsel" },
            { label: "Add Topic" },
          ]}
        />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
          <div>
            <h1 className="text-xl font-semibold text-[#0A0847]">
              Add Divine Counsel Topic
            </h1>
            <p className="text-xs text-[#0A084799] font-medium mt-1">
              Build the reflection, Scripture, audio, prayer, and Amen
              experience in one place.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              className="px-4 py-2 bg-white border border-[#E2DFFC] text-[#0A0847] text-xs font-semibold rounded flex items-center gap-2 hover:bg-gray-50"
            >
              <SaveIconSvg size={14} /> Save Draft
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-white border border-[#E2DFFC] text-[#0A0847] text-xs font-semibold rounded flex items-center gap-2 hover:bg-gray-50"
            >
              <FiEye size={14} /> Preview
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-[#001984] hover:bg-[#001266] text-white text-xs font-semibold rounded flex items-center gap-2"
            >
              <FiSend size={14} /> Publish Topic
            </button>
          </div>
        </div>
      </div>

      {/* Step indicator progress bar */}
      <div className="flex items-center gap-4 overflow-x-auto pb-1 border-b border-[#E2DFFC] pb-3">
        {steps.map((label, i) => (
          <React.Fragment key={i}>
            <button
              type="button"
              onClick={() => setStep(i + 1)}
              className={`flex items-center gap-2 shrink-0 ${step === i + 1 ? "text-[#001984] font-bold" : "text-gray-400 font-medium"}`}
            >
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === i + 1 ? "bg-[#001984] text-white" : "bg-gray-200 text-gray-600"}`}
              >
                {i + 1}
              </span>
              <span className="text-xs whitespace-nowrap">{label}</span>
            </button>
            {i < steps.length - 1 && (
              <div className="h-0.5 w-12 bg-gray-200 shrink-0" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Main Grid: Left Form (2 cols) vs Right Live Preview & Checklist (1 col) */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-5 items-start">
        {/* Left Form Column */}
        <div className="space-y-5">
          {/* Section 1: Topic Details & Section 2: Reflection & Scripture in 2-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* 1. Topic Details Card */}
            <SectionCard n={1} title="Topic Details">
              <div className="space-y-3">
                <div>
                  <Label required>Choose Discount Type</Label>
                  <Input
                    placeholder="Marriage"
                    value={f.title}
                    onChange={(e) => set("title", e.target.value)}
                  />
                </div>
                <div>
                  <Label required>Brief Description</Label>
                  <Input
                    placeholder="God's design for a covenant relationship."
                    value={f.desc}
                    onChange={(e) => set("desc", e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label required>Category</Label>
                    <Select
                      value={f.category}
                      onChange={(v) => set("category", v)}
                      options={CATEGORIES}
                    />
                  </div>
                  <div>
                    <Label required>Estimated Activity Length</Label>
                    <Select
                      value={f.activityLength}
                      onChange={(v) => set("activityLength", v)}
                      options={ACTIVITY_LENGTHS}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label required>Status</Label>
                    <Select
                      value={f.status}
                      onChange={(v) => set("status", v)}
                      options={["Draft", "Published", "Disabled"]}
                    />
                  </div>
                  <div>
                    <Label required>Display Order</Label>
                    <Select
                      value={f.displayOrder}
                      onChange={(v) => set("displayOrder", v)}
                      options={["1", "2", "3", "4"]}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => set("featured", !f.featured)}
                    className={`w-8 h-4 rounded-full p-0.5 transition-colors ${f.featured ? "bg-[#001984]" : "bg-gray-200"}`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full bg-white shadow-md transform transition-transform ${f.featured ? "translate-x-4" : "translate-x-0"}`}
                    />
                  </button>
                  <span className="text-xs font-semibold text-[#0A0847] flex items-center gap-1">
                    Featured Topic{" "}
                    <FiInfo size={12} className="text-gray-400" />
                  </span>
                </div>

                <div>
              {f.coverImage && !imgError ? (
                <div className="rounded-lg overflow-hidden border border-[#E2DFFC] bg-gray-100 h-28 relative">
                  <img
                    src={f.coverImage}
                    alt="Cover"
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeCover}
                    className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 cursor-pointer"
                  >
                    <FiX size={13} />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => imageRef.current?.click()}
                  className="h-28 rounded-lg border border-dashed border-[#CBC6F8] bg-[#FAFAFF] hover:bg-[#F1F2F9] flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors"
                >
                  <FiImage size={20} className="text-[#001984]" />
                  <span className="text-xs font-semibold text-[#0A0847]">Upload Cover Image</span>
                </div>
              )}
              <p className="text-[10px] text-[#0A084799] font-medium mt-1">Recommended 1600 × 400 • JPG or PNG</p>
              <button
                type="button"
                onClick={() => imageRef.current?.click()}
                className="w-full mt-2 py-2 border border-[#E2DFFC] bg-white text-[#0A0847] text-xs font-semibold rounded flex items-center justify-center gap-2 hover:bg-gray-50 cursor-pointer"
              >
                <FiRefreshCw size={13} /> {f.coverImage && !imgError ? "Replace Image" : "Upload Image"}
              </button>
            </div>
              </div>
            </SectionCard>

            {/* 2. Reflection & Scripture Card */}
            <SectionCard n={2} title="Reflection & Scripture">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Left sub-column */}
                <div className="space-y-3">
                  <div>
                    <Label required>Reflection Title</Label>
                    <Input
                      value={f.reflectionTitle}
                      onChange={(e) => set("reflectionTitle", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label required>Brief Description</Label>
                    <Input
                      value={f.reflectionDesc}
                      onChange={(e) => set("reflectionDesc", e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label required>Verse Reference</Label>
                      <Input
                        value={f.verseRef}
                        onChange={(e) => set("verseRef", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label required>Translation</Label>
                      <Select
                        value={f.translation}
                        onChange={(v) => set("translation", v)}
                        options={TRANSLATIONS}
                      />
                    </div>
                  </div>
                </div>

                {/* Right sub-column: Rich Area */}
                <div>
                  <Label required>Main Reflection</Label>
                  <AdvancedRichArea
                    rows={6}
                    value={f.mainReflection}
                    onChange={(v) => set("mainReflection", v)}
                  />
                </div>
              </div>

              {/* Subtopics Section */}
              <div className="mt-5 border-t border-[#E2DFFC] pt-4">
                <h4 className="text-xs font-bold text-[#001984] mb-3">
                  Subtopics & Bible Verses
                </h4>
                {f.subtopics.map((s) => (
                  <div
                    key={s.id}
                    className="border border-[#E2DFFC] rounded-lg p-3 space-y-3 bg-[#F8FAFC]"
                  >
                    <div className="flex items-center gap-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1">
                        <div>
                          <Label required>Subtopic Title</Label>
                          <Input
                            value={s.title}
                            onChange={(e) =>
                              updateSubtopic(s.id, { title: e.target.value })
                            }
                          />
                        </div>
                        <div>
                          <Label required>Brief Description</Label>
                          <Input
                            value={s.desc}
                            onChange={(e) =>
                              updateSubtopic(s.id, { desc: e.target.value })
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label required>Bible Verse</Label>
                      <Input
                        value={s.verse}
                        onChange={(e) =>
                          updateSubtopic(s.id, { verse: e.target.value })
                        }
                      />
                    </div>
                    <div className="flex items-center gap-2 justify-end">
                      <button
                        type="button"
                        onClick={() => duplicateSubtopic(s.id)}
                        className="px-3 py-1 border border-[#E2DFFC] bg-white text-xs font-semibold rounded flex items-center gap-1"
                      >
                        <FiCopy size={11} /> Duplicate
                      </button>
                      <button
                        type="button"
                        onClick={() => removeSubtopic(s.id)}
                        className="px-3 py-1 border border-[#FECACA] bg-white text-[#E11D2E] text-xs font-semibold rounded flex items-center gap-1"
                      >
                        <FiTrash2 size={11} /> Remove
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addSubtopic}
                  className="w-full mt-3 py-2 bg-[#001984] text-white text-xs font-semibold rounded flex items-center justify-center gap-2"
                >
                  <FiPlus size={13} /> Add Another Subtopic
                </button>

                {/* Subtopics Tag Pill section */}
                <div className="mt-4">
                  <p className="text-xs font-bold text-[#001984] mb-2">
                    Subtopics & Bible Verses
                  </p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {f.scriptures.map((sc, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-[#EEF2FF] rounded-full text-[11px] font-medium text-[#0A0847] flex items-center gap-1 border border-[#E2DFFC]"
                      >
                        {sc}
                        <button
                          type="button"
                          onClick={() => removeScripture(i)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <FiX size={11} />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="e.g. Ephesians 5:22-33"
                      value={newScripture}
                      onChange={(e) => setNewScripture(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={addScripture}
                      className="px-3 py-2 border border-[#001984] text-[#001984] bg-white text-xs font-semibold rounded flex items-center gap-1 shrink-0"
                    >
                      <FiPlus size={12} /> Add Scripture
                    </button>
                  </div>
                </div>
              </div>
            </SectionCard>
          </div>

          {/* Section 3: Topic Audio & Closing Prayers */}
          <SectionCard n={3} title="Topic Audio & Closing Prayers">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Audio visualizer block */}
              <div>
                <Label required>Topic Audio</Label>

                {f.audioUrl ? (
                  <>
                    <audio
                      ref={audioElRef}
                      src={f.audioUrl}
                      onLoadedMetadata={(e) =>
                        setF((p) => ({
                          ...p,
                          audioSecs: e.target.duration,
                          audioDuration: fmtTime(e.target.duration),
                        }))
                      }
                      onTimeUpdate={(e) => setAudioTime(e.target.currentTime)}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      onEnded={() => {
                        setIsPlaying(false);
                        setAudioTime(0);
                      }}
                      className="hidden"
                    />

                    <div className="border border-[#E2DFFC] rounded-lg bg-white overflow-hidden">
                      <div className="flex items-center gap-2 px-3 py-2.5 border-b border-[#E2DFFC]">
                        <FiMusic
                          size={14}
                          className="text-[#001984] shrink-0"
                        />
                        <p className="text-xs font-semibold text-[#0A0847CC] truncate">
                          {f.audioName}
                        </p>
                      </div>

                      <div className="grid grid-cols-3 gap-2 px-3 py-2.5 border-b border-[#E2DFFC] text-[11px]">
                        <div>
                          <p className="font-semibold text-[#0A0847CC]">
                            Duration:
                          </p>
                          <p className="text-[#0A084799] font-medium">
                            {f.audioDuration}
                          </p>
                        </div>
                        <div>
                          <p className="font-semibold text-[#0A0847CC]">
                            File Size:
                          </p>
                          <p className="text-[#0A084799] font-medium">
                            {f.audioSize}
                          </p>
                        </div>
                        <div>
                          <p className="font-semibold text-[#0A0847CC]">
                            Format:
                          </p>
                          <p className="text-[#0A084799] font-medium">
                            {f.audioFormat}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 px-3 py-3">
                        <button
                          type="button"
                          onClick={togglePlay}
                          className="w-7 h-7 rounded-full bg-[#001984] text-white flex items-center justify-center shrink-0 cursor-pointer"
                        >
                          {isPlaying ? (
                            <FiPause size={12} />
                          ) : (
                            <FiPlay size={12} className="ml-0.5" />
                          )}
                        </button>

                        <div
                          className="flex-1 flex items-center gap-[2px] h-7 cursor-pointer"
                          onClick={(e) => {
                            const r = e.currentTarget.getBoundingClientRect();
                            seekTo((e.clientX - r.left) / r.width);
                          }}
                        >
                          {[...Array(48)].map((_, i) => {
                            const played =
                              f.audioSecs && i / 48 < audioTime / f.audioSecs;
                            return (
                              <div
                                key={i}
                                className={`flex-1 rounded-full ${played ? "bg-[#001984]" : "bg-[#B8C0E8]"}`}
                                style={{ height: `${6 + ((i * 7) % 5) * 4}px` }}
                              />
                            );
                          })}
                        </div>

                        <span className="text-[11px] text-[#0A0847CC] font-medium tabular-nums">
                          {fmtTime(
                            isPlaying || audioTime ? audioTime : f.audioSecs,
                          )}
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div
                    onClick={() => audioRef.current?.click()}
                    className="border border-dashed border-[#CBC6F8] rounded-lg h-28 flex flex-col items-center justify-center gap-1 bg-[#FAFAFF] hover:bg-[#F1F2F9] cursor-pointer transition-colors"
                  >
                    <FiMusic size={20} className="text-[#001984]" />
                    <span className="text-xs font-semibold text-[#0A0847]">
                      Upload Audio
                    </span>
                    <span className="text-[10px] text-[#0A084799]">
                      MP3, WAV or M4A
                    </span>
                  </div>
                )}

                {f.audioUrl && (
                  <div className="flex items-center gap-2 mt-3">
                    <button
                      type="button"
                      onClick={togglePlay}
                      className="px-3 py-1.5 border border-[#E2DFFC] rounded-md bg-white text-[11px] font-medium text-[#0A0847CC] flex items-center gap-1.5 hover:bg-gray-50 cursor-pointer"
                    >
                      <FiEye size={12} /> Preview
                    </button>
                    <button
                      type="button"
                      onClick={() => audioRef.current?.click()}
                      className="px-3 py-1.5 border border-[#E2DFFC] rounded-md bg-white text-[11px] font-medium text-[#0A0847CC] flex items-center gap-1.5 hover:bg-gray-50 cursor-pointer"
                    >
                      <FiRefreshCw size={12} /> Replace
                    </button>
                    <a
                      href={f.audioUrl}
                      download={f.audioName}
                      className="px-3 py-1.5 border border-[#E2DFFC] rounded-md bg-white text-[11px] font-medium text-[#0A0847CC] flex items-center gap-1.5 hover:bg-gray-50"
                    >
                      <FiDownload size={12} /> Download
                    </a>
                  </div>
                )}
              </div>

              {/* Closing Prayer Block */}
              <div className="space-y-3">
                {f.closingPrayers.map((p) => (
                  <div
                    key={p.id}
                    className="border border-[#E2DFFC] rounded-lg p-3 bg-white"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-gray-400 cursor-grab">⋮⋮</span>
                      <Input
                        value={p.title}
                        onChange={(e) =>
                          updatePrayer(p.id, { title: e.target.value })
                        }
                        className="!py-1 font-semibold"
                      />
                    </div>
                    <AdvancedRichArea
                      rows={5}
                      value={p.body}
                      onChange={(v) => updatePrayer(p.id, { body: v })}
                    />
                    <div className="flex items-center gap-2 justify-end mt-2">
                      <button
                        type="button"
                        onClick={() => duplicatePrayer(p.id)}
                        className="px-2.5 py-1 border border-[#E2DFFC] bg-white text-xs font-semibold rounded flex items-center gap-1"
                      >
                        <FiCopy size={11} /> Duplicate
                      </button>
                      <button
                        type="button"
                        onClick={() => removePrayer(p.id)}
                        className="px-2.5 py-1 border border-[#FECACA] bg-white text-[#E11D2E] text-xs font-semibold rounded flex items-center gap-1"
                      >
                        <FiTrash2 size={11} /> Remove
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addPrayer}
                  className="w-full py-2 border border-[#001984] text-[#001984] text-xs font-semibold rounded flex items-center justify-center gap-2 hover:bg-[#EEF2FF]"
                >
                  <FiPlus size={13} /> Add Another Closing Prayer
                </button>
                <div className="flex items-center justify-end gap-2 pt-1">
                  <span className="text-xs font-medium">
                    Let users choose a prayer
                  </span>
                  <button
                    type="button"
                    onClick={() => set("letUsersChoose", !f.letUsersChoose)}
                    className={`w-8 h-4 rounded-full p-0.5 transition-colors ${f.letUsersChoose ? "bg-[#001984]" : "bg-gray-200"}`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full bg-white shadow-md transform transition-transform ${f.letUsersChoose ? "translate-x-4" : "translate-x-0"}`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Section 4: Amen Page */}
          <SectionCard n={4} title="Amen Page">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label required>Amen Heading</Label>
                <Input
                  value={f.amenHeading}
                  onChange={(e) => set("amenHeading", e.target.value)}
                />
                <div className="mt-3">
                  <Label required>Confirmation Text</Label>
                  <Input
                    value={f.confirmationText}
                    onChange={(e) => set("confirmationText", e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label required>Encouragement Bible Verse</Label>
                <Input
                  value={f.encouragementVerse}
                  onChange={(e) => set("encouragementVerse", e.target.value)}
                />
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <div>
                    <Label required>Verse Reference</Label>
                    <Input
                      value={f.amenVerseRef}
                      onChange={(e) => set("amenVerseRef", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label required>Translation</Label>
                    <Select
                      value={f.amenTranslation}
                      onChange={(v) => set("amenTranslation", v)}
                      options={TRANSLATIONS}
                    />
                  </div>
                </div>
              </div>
              <div>
                <Label required>How Are You Feeling? Text</Label>
                <Input
                  value={f.howAreYouFeeling}
                  onChange={(e) => set("howAreYouFeeling", e.target.value)}
                />
                <p className="text-xs font-semibold text-[#0A0847CC] mt-3 mb-1.5">
                    Feelings (Multiple select)
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: "Peaceful", Icon: GreenBirdIconSvg, bg: "bg-[#E8F7E8]" },
                      { label: "Grateful", Icon: YellowHandsIconSvg, bg: "bg-[#FFF4DC]" },
                      { label: "Encouraged", Icon: HandsPurpleIconSvg, bg: "bg-[#EEF2FF]" },
                      { label: "Add Feeling", Icon: HeartHandsPurpleIconSvg, bg: "bg-[#F3E8FF]" },
                    ].map(({ label, Icon, bg }) => (
                      <div
                        key={label}
                        className="flex items-center gap-2 px-2.5 py-2 border border-[#E2DFFC] rounded-lg bg-white text-[11px] font-medium text-[#0A0847CC] cursor-pointer hover:bg-gray-50"
                      >
                        <span className={`w-6 h-6 rounded-full ${bg} flex items-center justify-center shrink-0`}>
                          <Icon size={14} />
                        </span>
                        {label}
                      </div>
                    ))}
                  </div>
                {/* <div className="flex items-center gap-1">
                  <Input
                    placeholder="Add Feeling"
                    value={newFeeling}
                    onChange={(e) => setNewFeeling(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={addFeeling}
                    className="p-2 border border-[#001984] text-[#001984] rounded bg-white"
                  >
                    <FiPlus size={12} />
                  </button>
                </div> */}
              </div>
            </div>

            {/* Bottom Toggles Row across full card width */}
            <div className="flex items-center justify-end gap-6 border-t border-[#E2DFFC] mt-4 pt-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#0A0847]">
                  Show Add to Journal
                </span>
                <button
                  type="button"
                  onClick={() => set("showAddToJournal", !f.showAddToJournal)}
                  className={`w-8 h-4 rounded-full p-0.5 transition-colors ${f.showAddToJournal ? "bg-[#001984]" : "bg-gray-200"}`}
                >
                  <div
                    className={`w-3 h-3 rounded-full bg-white shadow-md transform transition-transform ${f.showAddToJournal ? "translate-x-4" : "translate-x-0"}`}
                  />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#0A0847]">
                  Show Explore More Topics
                </span>
                <button
                  type="button"
                  onClick={() => set("showExploreMore", !f.showExploreMore)}
                  className={`w-8 h-4 rounded-full p-0.5 transition-colors ${f.showExploreMore ? "bg-[#001984]" : "bg-gray-200"}`}
                >
                  <div
                    className={`w-3 h-3 rounded-full bg-white shadow-md transform transition-transform ${f.showExploreMore ? "translate-x-4" : "translate-x-0"}`}
                  />
                </button>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* Right Column: Live User Previews & Publishing Checklist */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-[#E2DFFC] p-3 space-y-3">
            {/* Header & Toggle Buttons */}
            <div>
              <h3 className="text-xs font-semibold text-[#0A0847] mb-2">
                Live User Preview
              </h3>

              {/* Toggle Tab Bar matching image design */}
              <div className="grid grid-cols-3 bg-white border border-[#E2DFFC] rounded-lg p-0.5 text-[11px] font-semibold text-center overflow-hidden">
                <button
                  type="button"
                  onClick={() => setActiveTab("reflection")}
                  className={`py-1.5 rounded-md transition-all ${
                    activeTab === "reflection"
                      ? "bg-[#001984] text-white shadow-sm"
                      : "text-[#22215B] hover:bg-gray-50"
                  }`}
                >
                  Reflection
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("prayer")}
                  className={`py-1.5 rounded-md transition-all ${
                    activeTab === "prayer"
                      ? "bg-[#001984] text-white shadow-sm"
                      : "text-[#22215B] hover:bg-gray-50"
                  }`}
                >
                  Prayer
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("amen")}
                  className={`py-1.5 rounded-md transition-all ${
                    activeTab === "amen"
                      ? "bg-[#001984] text-white shadow-sm"
                      : "text-[#22215B] hover:bg-gray-50"
                  }`}
                >
                  Amen
                </button>
              </div>
            </div>

            {/* MAIN FEATURED CARD PREVIEW */}
            <div className="border border-[#E2DFFC] rounded-2xl overflow-hidden text-[10px] relative p-3 pt-4 bg-[#E8EDF5] min-h-[320px] flex flex-col justify-between">
              {/* Full Background Image */}
              <img
                src={AddJournelPreviewImg}
                alt="Preview Background"
                className="absolute inset-0 w-full h-full object-cover z-0"
              />

              {/* Dynamic Top Header Text */}
              <div className="relative z-10 text-center mb-10 pt-1">
                <span className="text-[11px] font-medium text-white drop-shadow-md">
                  {activeTab === "reflection" && "Read or Listen"}
                  {activeTab === "prayer" && "Next Step 🙏"}
                  {activeTab === "amen" && "Then Continue"}
                </span>
                {activeTab === "prayer" && (
                  <p className="font-bold text-[12px] text-white drop-shadow-md leading-tight mt-0.5">
                    {f.prayerTitle || "A Prayer for My Marriage"}
                  </p>
                )}
              </div>

              {/* DYNAMIC CARD CONTENT BASED ON ACTIVE TAB */}

              {/* 1. REFLECTION TAB VIEW */}
              {activeTab === "reflection" && (
                <div className="relative z-10 bg-white/95 backdrop-blur-sm rounded-xl p-3.5 pt-7 text-center space-y-2 text-[#0A0847] shadow-md">
                  {/* Floating Heart Icon */}
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#FF3B5C] border-2 border-white flex items-center justify-center shadow-md">
                    <FiHeart size={18} className="text-white fill-white" />
                  </div>

                  <h3 className="font-bold text-[12px] text-[#22215B]">
                    {f.reflectionTitle || "God's Design for Marriage"}
                  </h3>
                  <p className="text-[10px] text-gray-600 px-1 leading-snug italic">
                    "
                    {f.reflectionDesc ||
                      "Therefore what God has joined together, let no one separate."}
                    "
                  </p>
                  <p className="text-[9px] font-semibold text-gray-500">
                    {f.verseRef || "Mark 10:9"} ({f.translation || "NIV"})
                  </p>

                  <hr className="border-gray-200 my-1.5" />

                  <div className="text-left space-y-1">
                    <p className="font-bold text-[10px] text-[#22215B]">
                      Reflection
                    </p>
                    <p className="text-[9px] leading-relaxed text-gray-600 line-clamp-5">
                      {f.mainReflection ||
                        "God created marriage to reflect His love and faithfulness. It is a covenant, not just a contract..."}
                    </p>
                    <p className="font-bold text-[10px] text-[#22215B] pt-1">
                      Related Scripture
                    </p>
                    <p className="text-[9px] font-bold text-[#001984]">
                      Ephesians 5:22–33
                    </p>
                  </div>
                </div>
              )}

              {/* 2. PRAYER TAB VIEW */}
              {activeTab === "prayer" && (
                <div className="relative z-10 bg-[#DEE5F3]/95 backdrop-blur-sm rounded-xl p-4 text-center text-[#22215B] shadow-md min-h-[160px] flex items-center justify-center">
                  <p className="italic text-[11px] leading-relaxed font-medium">
                    "
                    {f.prayerBody ||
                      "Lord, help us to love, respect, and forgive each other daily. Keep our hearts united according to Your will."}
                    "
                  </p>
                </div>
              )}

              {/* 3. AMEN TAB VIEW */}
              {activeTab === "amen" && (
                <div className="relative z-10 bg-white/95 backdrop-blur-sm rounded-xl p-4 pt-7 text-center shadow-md flex flex-col justify-between items-center space-y-3">
                  {/* Floating Green Checkmark */}
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#34C759] border-2 border-white flex items-center justify-center shadow-md">
                    <svg
                      className="w-5 h-5 text-white stroke-[3]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>

                  <p className="font-bold text-[13px] text-[#22215B]">Amen!</p>

                  <div className="bg-[#001984] text-white rounded-xl p-3.5 text-center w-full shadow-inner">
                    <p className="italic text-[10px] leading-relaxed">
                      Your prayer has been received. Thank you for finishing it
                      with your heart.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* BOTTOM MINI CARDS GRID */}
            <div className="grid grid-cols-2 gap-2 text-[9px] pt-1">
              {/* Mini Prayer Card */}
              <div
                onClick={() => setActiveTab("prayer")}
                className={`border rounded-2xl overflow-hidden relative bg-[#E8EDF5] p-2 pt-3 flex flex-col justify-between cursor-pointer transition-all ${
                  activeTab === "prayer"
                    ? "ring-2 ring-[#001984]"
                    : "border-[#E2DFFC] hover:opacity-95"
                }`}
              >
                <img
                  src={AddJournelPreviewImg}
                  alt="Prayer Card Background"
                  className="absolute inset-0 w-full h-full object-cover z-0"
                />
                <div className="relative z-10 text-center mb-5 pt-0.5 text-white drop-shadow-md">
                  <p className="text-[9px] font-medium flex items-center justify-center gap-1">
                    Next Step 🙏
                  </p>
                  <p className="font-bold text-[10px] leading-tight px-1 mt-0.5">
                    {f.prayerTitle || "A Prayer for My Marriage"}
                  </p>
                </div>

                <div className="relative z-10 bg-[#DEE5F3]/95 backdrop-blur-sm rounded-xl p-2.5 text-center text-[#22215B] flex-1 flex items-center justify-center">
                  <p className="italic text-[9px] leading-tight line-clamp-4">
                    "
                    {f.prayerBody ||
                      "Lord, help us to love, respect, and forgive each other daily..."}
                    "
                  </p>
                </div>

                <div className="relative z-10 text-center pt-2 pb-0.5">
                  <span className="font-bold text-[10px] text-[#22215B]">
                    Prayer
                  </span>
                </div>
              </div>

              {/* Mini Amen Card */}
              <div
                onClick={() => setActiveTab("amen")}
                className={`border rounded-2xl overflow-hidden relative bg-[#E8EDF5] p-2 pt-3 flex flex-col justify-between cursor-pointer transition-all ${
                  activeTab === "amen"
                    ? "ring-2 ring-[#001984]"
                    : "border-[#E2DFFC] hover:opacity-95"
                }`}
              >
                <img
                  src={AddJournelPreviewImg}
                  alt="Amen Card Background"
                  className="absolute inset-0 w-full h-full object-cover z-0"
                />
                <div className="relative z-10 text-center mb-5 pt-0.5 text-white drop-shadow-md">
                  <p className="text-[9px] font-medium">Then Continue</p>
                </div>

                <div className="relative z-10 bg-white/95 backdrop-blur-sm rounded-xl p-2 pt-5 text-center flex-1 flex flex-col justify-between items-center">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#34C759] border-2 border-white flex items-center justify-center">
                    <svg
                      className="w-3.5 h-3.5 text-white stroke-[3]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>

                  <p className="font-bold text-[11px] text-[#22215B] mb-1">
                    Amen!
                  </p>

                  <div className="bg-[#001984] text-white rounded-xl p-2 text-center w-full my-auto">
                    <p className="italic text-[8px] leading-tight">
                      Your prayer has been received. Thank you for finishing it
                      with your heart.
                    </p>
                  </div>
                </div>

                <div className="relative z-10 text-center pt-2 pb-0.5">
                  <span className="font-bold text-[10px] text-[#22215B]">
                    Amen Page
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Publishing Checklist Card */}
          <div className="bg-white rounded-lg border border-[#E2DFFC] p-3">
            <h4 className="text-base font-semibold text-[#0A0847] mb-2.5">
              Publishing Checklist
            </h4>
            <div className="space-y-2">
              {checklist.map((c) => (
                <div
                  key={c.label}
                  className="flex items-center gap-2 text-sm text-[#0A0847CC]"
                >
                   <span className="flex h-5 w-5 items-center justify-center font-medium rounded-[4px] bg-[#259147]">
                      <FiCheck size={14} strokeWidth={3} className="text-white" />
                    </span>
                  {c.label}
                </div>
              ))}
              <div className="flex items-start gap-2 text-sm text-[#0A0847CC] font-medium pt-1 border-t border-[#E2DFFC]">
                <FiAlertTriangle
                  size={18}
                  className="text-[#F59E0B] shrink-0 mt-0.5"
                />
                Preview on mobile before publishing.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[#E2DFFC]">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="px-5 py-2 border border-[#E2DFFC] bg-white text-[#0A0847] font-semibold text-xs rounded hover:bg-gray-50"
        >
          Cancel
        </button>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="px-4 py-2 border border-[#E2DFFC] bg-white text-[#0A0847] font-semibold text-xs rounded hover:bg-gray-50 flex items-center gap-1.5"
          >
            <SaveIconSvg size={13} /> Save draft
          </button>
          <button
            type="button"
            className="px-4 py-2 border border-[#E2DFFC] bg-white text-[#0A0847] font-semibold text-xs rounded hover:bg-gray-50 flex items-center gap-1.5"
          >
            <FiEye size={13} /> Preview Full Experience
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-[#001984] hover:bg-[#001266] text-white font-semibold text-xs rounded flex items-center gap-1.5"
          >
            <FiSend size={13} /> Publish Topic
          </button>
        </div>
      </div>
    </div>
  );
}
