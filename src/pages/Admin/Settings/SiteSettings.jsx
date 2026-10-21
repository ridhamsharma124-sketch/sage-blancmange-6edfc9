import React, { useState, useRef, useEffect } from "react";
import {
  FiSave,
  FiImage,
  FiBookOpen,
  FiVideo,
  FiUploadCloud,
  FiTrash2,
  FiEdit2,
  FiCheck,
} from "react-icons/fi";
import { HiOutlineLightBulb } from "react-icons/hi2";
import UploadIcon from "../../../assets/DivineCounselSvgs/UploadIcon.svg";

/* ==========================================================================
   ATOMS (same classes as the rest of the app)
   ========================================================================== */

   const SvgIcon = ({ src, size = 16, className = "" }) => (
                 <img src={src} alt="" width={size} height={size} className={`shrink-0 ${className}`} />
               );
   
   const UploadIconSvg = (p) => <SvgIcon src={UploadIcon} {...p} />;

const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white rounded-lg border border-[#E2DFFC] p-6 ${className}`}
  >
    {children}
  </div>
);

const CardHeader = ({ icon: Icon, title, desc }) => (
  <div className="flex items-start gap-3">
    <span className="w-9 h-9 rounded-full bg-[#001984] text-white flex items-center justify-center shrink-0">
      <Icon size={16} />
    </span>
    <div>
      <h3 className="text-sm font-semibold text-[#0A0847] leading-snug">
        {title}
      </h3>
      <p className="text-[11px] text-[#0A084799] font-medium mt-1">{desc}</p>
    </div>
  </div>
);

const RemoveButton = ({ onClick, disabled }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className="px-8 py-2.5 border border-[#E11D2E] bg-white text-[#E11D2E] text-xs font-semibold rounded-md flex items-center justify-center gap-2 hover:bg-red-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
  >
    <FiTrash2 size={14} /> Remove
  </button>
);

/* ==========================================================================
   UPLOAD + PREVIEW BLOCK
   ========================================================================== */
const MediaUpload = ({
  icon,
  title,
  desc,
  kind,
  value,
  onChange,
  accept,
  acceptText,
  maxMB,
  hint,
  aside,
}) => {
  const inputRef = useRef(null);
  const [drag, setDrag] = useState(false);
  const [error, setError] = useState("");
  const isVideo = kind === "video";

  const load = (file) => {
    if (!file) return;
    const okType = isVideo
      ? file.type.startsWith("video/") || file.type === "image/gif"
      : ["image/jpeg", "image/png", "image/webp"].includes(file.type);
    if (!okType)
      return setError(`Unsupported file type. Accepted: ${acceptText}`);
    if (file.size > maxMB * 1024 * 1024)
      return setError(`File is too large. Max size: ${maxMB}MB`);
    setError("");
    onChange({
      url: URL.createObjectURL(file),
      name: file.name,
      type: file.type,
    });
  };

  return (
    <Card>
      <div
        className={`grid grid-cols-1 gap-6 ${
          aside ? "lg:grid-cols-[1fr_200px_1fr]" : "sm:grid-cols-[1fr_200px]"
        }`}
      >
        {/* Column 1: narrow heading + upload */}
        <div>
          <div className="max-w-[260px]">
            <CardHeader icon={icon} title={title} desc={desc} />
          </div>

          <input
            ref={inputRef}
            type="file"
            accept={accept}
            onChange={(e) => {
              load(e.target.files[0]);
              e.target.value = "";
            }}
            className="hidden"
          />
          <div
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDrag(true);
            }}
            onDragLeave={() => setDrag(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDrag(false);
              load(e.dataTransfer.files[0]);
            }}
            className={`mt-5 border border-dashed border-[#CBC6F8] rounded-lg h-36 flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors ${
              drag ? "bg-[#E9EAF7]" : "bg-[#F6F7FF] hover:bg-[#F1F2F9]"
            }`}
          >
            <UploadIconSvg size={28} className="text-[#001984]" />
            <span className="text-sm font-medium text-[#0A0847CC] mt-1">
              {isVideo ? "Upload Video" : "Upload Image"}
            </span>
            <span className="text-[11px] text-[#0A084799] font-medium">
              Click to browse or drag & drop
            </span>
          </div>
          {error && (
            <p className="text-[11px] text-[#EB0C10] font-medium mt-2">
              {error}
            </p>
          )}
          <p className="text-[11px] text-[#0A084799] font-medium mt-3 leading-relaxed">
            Accepted: {acceptText}
            <br />
            Max size: {maxMB}MB
            {hint && (
              <>
                <br />
                {hint}
              </>
            )}
          </p>
        </div>

        {/* Column 2: preview */}
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm font-semibold text-[#0A0847] self-start lg:self-center">
            Current Preview
          </p>
          <div className="w-full max-w-[200px] aspect-[3/4] rounded-lg overflow-hidden border border-[#E2DFFC] bg-gray-100 flex items-center justify-center">
            {value?.url ? (
              isVideo && value.type !== "image/gif" ? (
                <video
                  src={value.url}
                  className="w-full h-full object-cover"
                  muted
                  loop
                  autoPlay
                  playsInline
                />
              ) : (
                <img
                  src={value.url}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              )
            ) : (
              <div className="flex flex-col items-center gap-2 text-gray-400 px-3 text-center">
                {isVideo ? <FiVideo size={26} /> : <FiImage size={26} />}
                <span className="text-[11px] font-medium">
                  Nothing uploaded yet
                </span>
              </div>
            )}
          </div>
          <RemoveButton disabled={!value?.url} onClick={() => onChange(null)} />
        </div>

        {/* Column 3 (optional): tips */}
        {aside}
      </div>
    </Card>
  );
};

/* ==========================================================================
   PAGE (NO NAVBAR / NO SIDEBAR)
   ========================================================================== */
const IMAGE_ACCEPT = "image/png,image/jpeg,image/webp";
const VIDEO_ACCEPT = "video/mp4,video/quicktime,video/webm,image/gif";

export default function SiteSettingsPage() {
  const [media, setMedia] = useState({
    signInBg: null,
    intro: null,
    seasonalBg: null,
    dailyVerseBg: null,
    historyBg: null,
  });
  const setMediaKey = (k) => (v) => setMedia((p) => ({ ...p, [k]: v }));

  const [verse, setVerse] = useState({
    text: "I can do all things through Christ who strengthens me.",
    reference: "Philippians 4:13",
  });
  const [editingVerse, setEditingVerse] = useState(false);
  const [draft, setDraft] = useState(verse);

  // free object URLs on unmount
  const urlsRef = useRef(media);
  urlsRef.current = media;
  useEffect(
    () => () =>
      Object.values(urlsRef.current).forEach(
        (m) => m?.url && URL.revokeObjectURL(m.url),
      ),
    [],
  );

  const saveVerse = () => {
    if (!draft.text.trim() || !draft.reference.trim()) return;
    setVerse({ text: draft.text.trim(), reference: draft.reference.trim() });
    setEditingVerse(false);
  };

  const handleSaveAll = () => {
    const payload = {
      verse,
      media: Object.fromEntries(
        Object.entries(media).map(([k, v]) => [
          k,
          v ? { name: v.name, type: v.type } : null,
        ]),
      ),
    };
    console.log("Site Settings Payload:", payload);
    alert("Settings saved! Check browser console for full payload.");
  };

  return (
    <div className="p-6 bg-[#F8FAFC] min-h-screen font-[Inter] space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-[#0A0847]">
            App Appearance Settings
          </h1>
          <p className="text-sm text-[#0A084799] font-medium mt-2">
            Customize the sign-in experience and app intro content.
          </p>
        </div>
        <button
          type="button"
          onClick={handleSaveAll}
          className="px-5 py-2.5 bg-[#001984] hover:bg-[#001266] text-white text-xs font-semibold rounded-md flex items-center justify-center gap-2 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <FiSave size={15} /> Save All Changes
        </button>
      </div>

      {/* Row 1 */}
      {/* Row 1 */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-stretch">
        <MediaUpload
          icon={FiImage}
          title="Add Background Image to Sign-In Page"
          desc="Upload a background image that will appear on the app's sign-in page."
          kind="image"
          accept={IMAGE_ACCEPT}
          acceptText="JPG, PNG, WebP"
          maxMB={5}
          value={media.signInBg}
          onChange={setMediaKey("signInBg")}
        />

        <Card>
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_200px] gap-6">
            <div>
              <div className="max-w-[260px]">
                <CardHeader
                  icon={FiBookOpen}
                  title="Add Verse to Sign-In Page"
                  desc="Add a Bible verse that will be displayed on the sign-in page to inspire users."
                />
              </div>

              <p className="text-sm font-semibold text-[#0A0847] mt-5 mb-2">
                Bible Verse
              </p>
              {editingVerse ? (
                <div className="space-y-3">
                  <textarea
                    rows={4}
                    placeholder="Enter the verse text..."
                    value={draft.text}
                    onChange={(e) =>
                      setDraft((d) => ({ ...d, text: e.target.value }))
                    }
                    className="w-full border border-[#E2DFFC] rounded-md p-3 text-xs text-[#0A0847] placeholder-gray-400 outline-none resize-none focus:border-[#001984]"
                  />
                  <input
                    placeholder="e.g. Philippians 4:13"
                    value={draft.reference}
                    onChange={(e) =>
                      setDraft((d) => ({ ...d, reference: e.target.value }))
                    }
                    className="w-full border border-[#E2DFFC] rounded-md px-3 py-3 text-xs text-[#0A0847] placeholder-gray-400 outline-none focus:border-[#001984]"
                  />
                </div>
              ) : (
                <div className="border border-[#E2DFFC] bg-[#FAFAFF] rounded-lg p-4 min-h-[150px]">
                  <p className="text-sm text-[#0A0847CC] leading-7">
                    “{verse.text}”
                  </p>
                  <p className="text-sm text-[#0A0847CC] mt-1">
                    {verse.reference}
                  </p>
                </div>
              )}
              <p className="text-[11px] italic text-[#0A084799] font-medium mt-3">
                Ensure text is easy to read on any screen.
              </p>
            </div>

            <div className="flex flex-col items-center gap-3">
              <p className="text-sm font-semibold text-[#0A0847] self-start sm:self-center">
                Current Preview
              </p>
              <div
                className="w-full max-w-[200px] aspect-[3/4] rounded-lg overflow-hidden relative flex items-center justify-center"
                style={{
                  background: media.signInBg?.url
                    ? `url(${media.signInBg.url}) center/cover`
                    : "linear-gradient(180deg,#6B5B95 0%,#3B2A6B 55%,#1B1240 100%)",
                }}
              >
                <div className="absolute inset-0 bg-black/30" />
                <div className="relative text-center text-white px-4">
                  <p className="text-base font-bold tracking-wide">FAITHLY+</p>
                  <p className="text-[10px] font-medium mt-3 leading-relaxed">
                    {verse.text}
                  </p>
                  <p className="text-[10px] font-semibold mt-2">
                    {verse.reference}
                  </p>
                </div>
              </div>

              {editingVerse ? (
                <button
                  type="button"
                  onClick={saveVerse}
                  className="px-8 py-2.5 bg-[#001984] text-white text-xs font-semibold rounded-md flex items-center gap-2 hover:bg-[#001266] cursor-pointer"
                >
                  <FiCheck size={14} /> Save Verse
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setDraft(verse);
                    setEditingVerse(true);
                  }}
                  className="px-8 py-2.5 border border-[#E2DFFC] bg-white text-[#0A0847] text-xs font-semibold rounded-md flex items-center gap-2 hover:bg-gray-50 cursor-pointer"
                >
                  <FiEdit2 size={14} /> Edit Verse
                </button>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Row 2: intro video + tips (3 columns) */}
      <MediaUpload
        icon={FiVideo}
        title="Add Animated Video to App Intro"
        desc="Upload an animation video that will play during the app intro."
        kind="video"
        accept={VIDEO_ACCEPT}
        acceptText="MP4, MOV, WebM, GIF"
        maxMB={20}
        hint="Recommended: 5–10 seconds"
        value={media.intro}
        onChange={setMediaKey("intro")}
        aside={
          <div className="border border-[#E2DFFC] bg-[#F6F7FF] rounded-lg p-6 self-start">
            <div className="flex items-center gap-3">
              <HiOutlineLightBulb size={26} className="text-[#001984]" />
              <h4 className="text-base font-semibold text-[#001984]">Tips</h4>
            </div>
            <ul className="list-disc pl-5 mt-5 space-y-2 text-sm text-[#0A0847CC] leading-relaxed">
              <li>Use a high-quality, visually attractive image or video.</li>
              <li>Recommended duration: 4–10 seconds.</li>
              <li>Supported formats: MP4, MOV, WebM, GIF.</li>
              <li>Max file size: 20MB.</li>
            </ul>
          </div>
        }
      />

      {/* Row 3 */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-stretch">
        <MediaUpload
          icon={FiImage}
          title="Add Background Image to Seasonal Journey"
          desc="Upload a background image that will appear on the app's homepage."
          kind="image"
          accept={IMAGE_ACCEPT}
          acceptText="JPG, PNG, WebP"
          maxMB={5}
          value={media.seasonalBg}
          onChange={setMediaKey("seasonalBg")}
        />
        <MediaUpload
          icon={FiImage}
          title="Add Background Image to Daily Verse"
          desc="Upload a background image that will appear on the app's homepage."
          kind="image"
          accept={IMAGE_ACCEPT}
          acceptText="JPG, PNG, WebP"
          maxMB={5}
          value={media.dailyVerseBg}
          onChange={setMediaKey("dailyVerseBg")}
        />
      </div>

      {/* Row 4 */}
        <MediaUpload
        icon={FiImage}
        title="Add background image for Today in Biblical History"
        desc="Upload for app homepage."
        kind="image"
        accept={IMAGE_ACCEPT}
        acceptText="JPG, PNG, WebP"
        maxMB={5}
        value={media.historyBg}
        onChange={setMediaKey("historyBg")}
        aside={<div className="hidden lg:block" />}
        />
    </div>
  );
}
