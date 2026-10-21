import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiChevronDown,
  FiUploadCloud,
  FiTrash2,
  FiMusic,
  FiCheckCircle,
  FiPlay,
  FiPause,
  FiVolume2,
  FiVolumeX,
  FiMoreVertical,
  FiImage,
} from "react-icons/fi";
import UploadIcon from "../../../assets/ChapterStories/UploadIcon.svg";
import Upload2Icon from "../../../assets/ChapterStories/Uploadicon2.svg";
import TrashRedIcon from "../../../assets/ChapterStories/TrashRedIcon.svg";

/* ==========================================================================
   ATOMS (same classes as the rest of the app)
   ========================================================================== */

     const SvgIcon = ({ src, size = 16, className = "" }) => (
           <img src={src} alt="" width={size} height={size} className={`shrink-0 ${className}`} />
         );
         
    const Upload2IconSvg = (p) => <SvgIcon src={Upload2Icon} {...p} />;
    const UploadIconSvg = (p) => <SvgIcon src={UploadIcon} {...p} />;
    const TrashRedIconSvg = (p) => <SvgIcon src={TrashRedIcon} {...p} />;

const Input = ({ className = "", ...props }) => (
  <input
    className={`w-full border border-[#E2DFFC] rounded-md px-3 py-3 text-xs text-[#0A0847] placeholder-gray-400 bg-white outline-none focus:border-[#001984] transition-all ${className}`}
    {...props}
  />
);

const Label = ({ children, required }) => (
  <label className="block text-xs font-semibold text-[#0A0847CC] mb-1.5">
    {children} {required && <span className="text-[#EB0C10]">*</span>}
  </label>
);

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

const SelectField = ({ value, onChange, options }) => (
  <div className="relative">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full appearance-none border border-[#E2DFFC] rounded-md px-3 pr-9 py-3 text-xs text-[#0A0847] bg-white outline-none focus:border-[#001984] cursor-pointer"
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
    <FiChevronDown
      size={14}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
    />
  </div>
);

const Card = ({ title, children, className = "" }) => (
  <div className={`bg-white rounded-lg border border-[#E2DFFC] p-5 ${className}`}>
    {title && <h3 className="text-base font-semibold text-[#0A0847] mb-4">{title}</h3>}
    {children}
  </div>
);

const Hint = ({ children }) => (
  <p className="text-[10px] italic text-[#0A084799] font-medium mt-1.5">{children}</p>
);

/* ==========================================================================
   DATA
   ========================================================================== */
const BOOKS = {
  "Old Testament": ["Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Psalms", "Proverbs"],
  "New Testament": ["Matthew", "Mark", "Luke", "John", "Acts", "Romans", "Revelation"],
};
const CHAPTERS = Array.from({ length: 50 }, (_, i) => String(i + 1));
const SUMMARY_LIMIT = 200;
const WAVE = [4,8,12,6,14,10,16,8,12,6,14,18,10,8,14,6,12,16,8,10,14,6,12,8,16,10,6,14,12,8,10,14,6,12];

const fmt = (s) => {
  if (!isFinite(s)) return "00:00";
  const m = String(Math.floor(s / 60)).padStart(2, "0");
  const sec = String(Math.floor(s % 60)).padStart(2, "0");
  return `${m}:${sec}`;
};

/* ==========================================================================
   PAGE (NO NAVBAR / NO SIDEBAR)
   ========================================================================== */
export default function AddChapterStoryPage() {
  const navigate = useNavigate();
  const imageRef = useRef(null);
  const audioInputRef = useRef(null);
  const playerRef = useRef(null);

  const [form, setForm] = useState({
    testament: "Old Testament",
    book: "Genesis",
    chapter: "1",
    title: "",
    image: "",
    audioFile: null,
    audioName: "",
    audioSize: "",
    audioUrl: "",
    duration: "",
    status: "Published",
    reward: "20",
    allowReplay: true,
    showInJourney: true,
    displayOrder: "1",
    summary: "",
  });
  const [errors, setErrors] = useState({});
  const [imgError, setImgError] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [total, setTotal] = useState(0);

  const set = (key, value) => {
    setForm((p) => ({ ...p, [key]: value }));
    setErrors((p) => ({ ...p, [key]: undefined }));
  };

  const err = (k) =>
    errors[k] ? <p className="text-[11px] text-[#EB0C10] font-medium mt-1">{errors[k]}</p> : null;

  /* ---------- Testament change resets book ---------- */
  const changeTestament = (t) => {
    setForm((p) => ({ ...p, testament: t, book: BOOKS[t][0] }));
  };

  /* ---------- Image ---------- */
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImgError(false);
      set("image", URL.createObjectURL(file));
    }
    e.target.value = "";
  };

  /* ---------- Audio ---------- */
  const loadAudio = (file) => {
    if (!file || !file.type.startsWith("audio/")) return;
    const url = URL.createObjectURL(file);
    setPlaying(false);
    setCurrent(0);
    setForm((p) => ({
      ...p,
      audioFile: file,
      audioName: file.name,
      audioSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      audioUrl: url,
    }));
    setErrors((p) => ({ ...p, audio: undefined }));
  };

  const handleAudioInput = (e) => {
    loadAudio(e.target.files[0]);
    e.target.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    loadAudio(e.dataTransfer.files[0]);
  };

  const removeAudio = () => {
    playerRef.current?.pause();
    setPlaying(false);
    setCurrent(0);
    setTotal(0);
    setForm((p) => ({ ...p, audioFile: null, audioName: "", audioSize: "", audioUrl: "", duration: "" }));
  };

  const togglePlay = () => {
    const a = playerRef.current;
    if (!a) return;
    if (playing) a.pause();
    else a.play();
    setPlaying(!playing);
  };

  useEffect(() => {
    if (playerRef.current) playerRef.current.muted = muted;
  }, [muted]);

  /* ---------- Validation / submit ---------- */
  const validate = (publish) => {
    const e = {};
    if (!form.title.trim()) e.title = "Story title is required";
    if (publish) {
      if (!form.audioUrl) e.audio = "Please upload an audio file";
      if (form.reward === "" || Number(form.reward) < 0) e.reward = "Enter valid reward points";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (type) => {
    const publish = type === "Publish Story";
    if (!validate(publish)) return;
    const payload = {
      ...form,
      status: type === "Save Draft" ? "Draft" : form.status,
      reward: Number(form.reward),
      displayOrder: Number(form.displayOrder),
    };
    console.log(`${type} payload:`, payload);
    alert(`${type}! Check browser console for full payload.`);
    navigate(-1);
  };

  const hasImage = form.image && !imgError;

  return (
    <div className="p-6 bg-[#F8FAFC] min-h-screen font-[Inter] space-y-5">
      {/* Hidden inputs */}
      <input type="file" ref={imageRef} accept="image/png,image/jpeg" onChange={handleImage} className="hidden" />
      <input type="file" ref={audioInputRef} accept="audio/*" onChange={handleAudioInput} className="hidden" />

      {/* Header */}
      <div>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-semibold text-[#0A0847CC] hover:text-[#001984] cursor-pointer"
        >
          <FiArrowLeft size={18} /> Back to Chapter Stories
        </button>
        <h1 className="text-xl font-semibold text-[#0A0847] mt-4">Add Chapter Stories</h1>
        <p className="text-sm text-[#0A084799] font-medium mt-2">
          Upload and publish an audio story for a Bible chapter.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 items-start">
        {/* LEFT COLUMN */}
        <div className="space-y-5">
          {/* Bible Location */}
          <Card title="Bible Location">
            <Label>Testament</Label>
            <div className="grid grid-cols-2 border border-[#E2DFFC] rounded-md overflow-hidden mb-4">
              {["Old Testament", "New Testament"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => changeTestament(t)}
                  className={`py-2.5 text-xs font-semibold transition-colors cursor-pointer ${
                    form.testament === t
                      ? "bg-[#001984] text-white"
                      : "bg-white text-[#0A0847CC] hover:bg-gray-50"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Book</Label>
                <SelectField value={form.book} onChange={(v) => set("book", v)} options={BOOKS[form.testament]} />
              </div>
              <div>
                <Label>Chapter</Label>
                <SelectField value={form.chapter} onChange={(v) => set("chapter", v)} options={CHAPTERS} />
              </div>
            </div>
          </Card>

          {/* Story Details */}
          <Card title="Story Details">
            <div className="mb-4">
              <Label required>Story Title</Label>
              <Input
                placeholder="In the Beginning"
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
              />
              {err("title")}
            </div>

            <Label>Story Image</Label>
            <div className="relative rounded-lg overflow-hidden border border-[#E2DFFC] bg-gray-100 h-36 flex items-center justify-center">
              {hasImage ? (
                <img
                  src={form.image}
                  alt="Story"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-gray-400">
                  <FiImage size={26} />
                  <span className="text-xs font-medium">Please select an image first to view</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 mt-3">
              <button
                type="button"
                onClick={() => imageRef.current?.click()}
                className="px-4 py-1.5 border border-[#E2DFFC] bg-white text-[#0A0847] text-sm font-semibold rounded-md flex items-center gap-2 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <Upload2IconSvg size={15} /> {hasImage ? "Replace Image" : "Upload Image"}
              </button>
              <button
                type="button"
                disabled={!form.image}
                onClick={() => {
                  setImgError(false);
                  set("image", "");
                }}
                className="px-4 py-1.5 border border-[#E11D2E] bg-white text-[#E11D2E] text-sm font-semibold rounded-md flex items-center gap-2 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <TrashRedIconSvg size={15} /> Remove
              </button>
            </div>
            <p className="text-[11px] text-[#0A084799] font-medium mt-2">
              JPG or PNG • 1200 × 800 recommended
            </p>

            {/* Audio File */}
            <h3 className="text-base font-semibold text-[#0A0847] mt-6 mb-3">Audio File</h3>
            <Label>Upload Audio</Label>
            <div
              onClick={() => audioInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              className={`border border-dashed border-[#CBC6F8] rounded-lg h-24 flex items-center justify-center gap-3 transition-colors cursor-pointer ${
                dragOver ? "bg-[#E9EAF7]" : "bg-[#F6F7FF] hover:bg-[#F1F2F9]"
              }`}
            >
              <UploadIconSvg size={26} className="text-[#001984]" />
              <span className="text-sm font-medium text-[#0A0847CC] text-center leading-snug">
                Drag and drop your audio file here
                <br />
                or click to browse
              </span>
            </div>
            {err("audio")}

            {form.audioUrl && (
              <>
                <div className="mt-4 bg-[#F1FBF0] border border-[#B8E2B5] rounded-md px-3 py-3 flex items-center gap-3">
                  <FiMusic size={16} className="text-[#0A0847CC] shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#001984] truncate">{form.audioName}</p>
                    <p className="text-[10px] text-[#0A084799] font-medium">{form.audioSize}</p>
                  </div>
                  <FiCheckCircle size={18} className="text-[#2BA452] shrink-0" />
                  <button
                    type="button"
                    onClick={removeAudio}
                    className="text-[#E11D2E] hover:opacity-70 cursor-pointer shrink-0"
                    title="Remove audio"
                  >
                    <TrashRedIconSvg size={15} />
                  </button>
                </div>

                <audio
                  ref={playerRef}
                  src={form.audioUrl}
                  onLoadedMetadata={(e) => {
                    setTotal(e.currentTarget.duration);
                    set("duration", fmt(e.currentTarget.duration));
                  }}
                  onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
                  onEnded={() => setPlaying(false)}
                  className="hidden"
                />
              </>
            )}

            <div className="mt-4">
              <Label>Duration</Label>
              <Input readOnly placeholder="00:00" value={form.duration} className="bg-gray-50" />
              <Hint>Duration is detected automatically after upload.</Hint>
            </div>

            <div className="mt-4">
              <Label>15-second preview</Label>
              <div className="border border-[#E2DFFC] rounded-md bg-[#F9FAFC] px-3 py-3 flex items-center gap-3">
                <button
                  type="button"
                  disabled={!form.audioUrl}
                  onClick={togglePlay}
                  className="w-6 h-6 rounded-full bg-[#001984] text-white flex items-center justify-center shrink-0 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  {playing ? <FiPause size={11} /> : <FiPlay size={11} className="ml-0.5" />}
                </button>

                <div className="flex items-center gap-[2px] h-5 flex-1 overflow-hidden">
                  {WAVE.map((h, i) => {
                    const progress = total ? current / total : 0;
                    const active = i / WAVE.length <= progress;
                    return (
                      <span
                        key={i}
                        style={{ height: h }}
                        className={`w-[2px] rounded-full ${active ? "bg-[#001984]" : "bg-[#9AA5E6]"}`}
                      />
                    );
                  })}
                </div>

                <span className="text-[11px] font-medium text-[#0A0847CC] whitespace-nowrap">
                  {fmt(current)}/{fmt(total)}
                </span>
                <button
                  type="button"
                  onClick={() => setMuted((m) => !m)}
                  className="text-[#001984] cursor-pointer"
                >
                  {muted ? <FiVolumeX size={15} /> : <FiVolume2 size={15} />}
                </button>
                <FiMoreVertical size={15} className="text-[#0A0847CC]" />
              </div>
            </div>
          </Card>
        </div>

        {/* RIGHT COLUMN: Publishing */}
        <Card title="Publishing" className="lg:min-h-[1110px]">
          <p className="text-sm font-semibold text-[#0A0847] mb-3">Status</p>
          <div className="space-y-4 mb-5">
            {["Published", "Draft", "Disabled"].map((s) => (
              <label key={s} className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="radio"
                  name="status"
                  checked={form.status === s}
                  onChange={() => set("status", s)}
                  className="w-5 h-5 accent-[#001984] cursor-pointer"
                />
                <span className="text-sm font-medium text-[#0A0847CC]">{s}</span>
              </label>
            ))}
          </div>

          <div className="mb-5">
            <Label>Completion Reward Points</Label>
            <Input
              type="number"
              min="0"
              value={form.reward}
              onChange={(e) => set("reward", e.target.value)}
            />
            <Hint>Awarded after the full story is completed.</Hint>
            {err("reward")}
          </div>

          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-[#0A0847]">Allow replay after completion</span>
            <Toggle checked={form.allowReplay} onChange={(v) => set("allowReplay", v)} />
          </div>
          <div className="flex items-center justify-between mb-5">
            <span className="text-xs font-semibold text-[#0A0847]">Show in chapter journey</span>
            <Toggle checked={form.showInJourney} onChange={(v) => set("showInJourney", v)} />
          </div>

          <div className="mb-5">
            <Label>Display Order</Label>
            <Input
              type="number"
              min="1"
              value={form.displayOrder}
              onChange={(e) => set("displayOrder", e.target.value)}
            />
            <Hint>Lower numbers appear first.</Hint>
          </div>

          <div>
            <Label>Story Summary</Label>
            <textarea
              rows={4}
              maxLength={SUMMARY_LIMIT}
              placeholder="God created the heavens and the earth."
              value={form.summary}
              onChange={(e) => set("summary", e.target.value)}
              className="w-full border border-[#E2DFFC] rounded-md p-3 text-xs text-[#0A0847] placeholder-gray-400 outline-none resize-none focus:border-[#001984]"
            />
            <Hint>
              {form.summary.length} / {SUMMARY_LIMIT} characters
            </Hint>
          </div>
        </Card>
      </div>

      {/* Footer */}
      <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-full sm:w-36 py-3 border border-[#E2DFFC] bg-white text-[#0A0847] font-semibold text-xs rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <div className="flex flex-col-reverse sm:flex-row gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => submit("Save Draft")}
            className="w-full sm:w-48 py-3 border border-[#E2DFFC] bg-white text-[#0A0847] font-semibold text-xs rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={() => submit("Publish Story")}
            className="w-full sm:w-52 py-3 bg-[#001984] text-white font-semibold text-xs rounded-md hover:bg-[#001266] transition-colors cursor-pointer"
          >
            Publish Story
          </button>
        </div>
      </div>
    </div>
  );
}