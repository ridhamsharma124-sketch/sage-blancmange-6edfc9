import React, { useState } from "react";
import {
  FiRefreshCw,
  FiSave,
  FiMic,
  FiImage,
  FiCalendar,
  FiChevronDown,
  FiChevronRight,
  FiTrash2,
  FiUpload,
  FiLock,
  FiBookmark,
  FiCheck,
} from "react-icons/fi";
import { MdOutlineTextFields } from "react-icons/md";
import MicroPhone from "../../../assets/JournalSvgs/MicroPhone.svg";
import ImageUpload from "../../../assets/JournalSvgs/ImageUpload.svg";
import AudioRecordingIcon from "../../../assets/JournalSvgs/AudioRecordingIcon.svg";
import StatCalendar from "../../../assets/JournalSvgs/StatCalendar.svg";
import MicIcon from "../../../assets/JournalSvgs/MicIcon.svg";
import AIcon from "../../../assets/JournalSvgs/AIcon.svg";
import ImgUpload from "../../../assets/JournalSvgs/ImgUpload.svg";
import TrashIcon from "../../../assets/JournalSvgs/TrashIcon.svg";
import UploadIcon from "../../../assets/JournalSvgs/UploadIcon.svg";
import LockIcon from "../../../assets/JournalSvgs/LockIcon.svg";
import PinnedIcon from "../../../assets/JournalSvgs/PinnedIcon.svg";
import SaveIcon from "../../../assets/JournalSvgs/SaveIcon.svg";
import EntryIcon from "../../../assets/JournalSvgs/EntryIcon.svg";

/* ==========================================================================
   ATOMS (same classes as the rest of the app)
   ========================================================================== */

const FeatureIcon = ({ src }) => (
  <img src={src} alt="" className="w-8 h-8 shrink-0" />
);

const Toggle = ({ checked, onChange, green = false }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer shrink-0 ${
      checked ? (green ? "bg-[#21AC1C]" : "bg-[#001984]") : "bg-gray-200"
    }`}
  >
    <div
      className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform ${
        checked ? "translate-x-4" : "translate-x-0"
      }`}
    />
  </button>
);

const Card = ({ title, children, className = "" }) => (
  <div className={`bg-white rounded-lg border border-[#E2DFFC] p-6 ${className}`}>
    <h3 className="text-base font-semibold text-[#0A0847] pb-4 mb-2 border-b border-[#E2DFFC]">
      {title}
    </h3>
    {children}
  </div>
);

const IconBadge = ({ icon: Icon, bg, color = "text-white" }) => (
  <span className={`w-8 h-8 rounded-full ${bg} ${color} flex items-center justify-center shrink-0`}>
    <Icon size={15} />
  </span>
);

const SelectField = ({ value, onChange, options }) => (
  <div className="relative">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full appearance-none border border-[#E2DFFC] rounded-md px-3 pr-9 py-3 text-xs text-[#0A0847] bg-white outline-none focus:border-[#001984] cursor-pointer"
    >
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
    <FiChevronDown
      size={14}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
    />
  </div>
);

/** Left-column setting row: icon, title, description, control on the right */
const FeatureRow = ({ icon, title, desc, children, footer }) => (
  <div className="py-4">
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-start gap-3">
        {icon}
        <div>
          <p className="text-sm font-semibold text-[#0A0847]">{title}</p>
          <p className="text-[11px] text-[#0A084799] font-medium mt-0.5 max-w-[260px]">{desc}</p>
        </div>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
    {footer}
  </div>
);

/** Right-column row: title + desc on left, toggle right */
const SideToggle = ({ title, desc, checked, onChange }) => (
  <div className="flex items-start justify-between gap-4 py-2.5">
    <div>
      <p className="text-xs font-semibold text-[#0A0847]">{title}</p>
      <p className="text-[10px] text-[#0A084799] font-medium mt-0.5">{desc}</p>
    </div>
    <Toggle checked={checked} onChange={onChange} />
  </div>
);

const Label = ({ title, desc }) => (
  <div className="mb-2">
    <p className="text-xs font-semibold text-[#0A0847CC]">{title}</p>
    <p className="text-[10px] text-[#0A0847CC] font-medium mt-0.5">{desc}</p>
  </div>
);

/* ==========================================================================
   DEFAULTS
   ========================================================================== */
const DEFAULTS = {
  audioRecording: true,
  charLimitOn: true,
  charLimit: "1000",
  imageUpload: true,
  retentionDays: "365",
  autoDelete: false,
  exportEntries: true,
  privateDefault: true,
  pinEntries: true,
  maxAudio: "5 minutes",
  maxImages: "5 images",
  fileTypes: { JPG: true, PNG: true, JPEG: true, WEBP: true },
  profanity: true,
  notifyNew: false,
  dailyReminder: true,
};

const MAX_CHARS = 5000;

export default function JournalSettingsPage() {
  const [s, setS] = useState(DEFAULTS);
  const set = (k, v) => setS((p) => ({ ...p, [k]: v }));

  const toggleType = (t) =>
    setS((p) => ({ ...p, fileTypes: { ...p.fileTypes, [t]: !p.fileTypes[t] } }));

  const handleReset = () => setS(DEFAULTS);

  const handleSave = () => {
    const payload = {
      ...s,
      charLimit: Number(s.charLimit),
      retentionDays: Number(s.retentionDays),
      allowedFileTypes: Object.keys(s.fileTypes).filter((k) => s.fileTypes[k]),
    };
    console.log("Journal Settings Payload:", payload);
    alert("Settings saved! Check browser console for full payload.");
  };

  const clampChars = (v) => {
    const n = Math.min(MAX_CHARS, Math.max(0, Number(v.replace(/\D/g, "")) || 0));
    set("charLimit", String(n));
  };

  const summary = [
    {
      title: "Audio Recording",
      icon: MicroPhone,
      iconBg: "bg-[#E8E9FB] text-[#001984]",
      status: s.audioRecording ? "Enabled" : "Disabled",
      desc: "Allow users to record voice entries.",
      toggle: { checked: s.audioRecording, onChange: (v) => set("audioRecording", v) },
    },
    {
      title: "Audio Recording",
      icon: AudioRecordingIcon,
      iconBg: "bg-[#E8E9FB] text-[#001984]",
      status: s.audioRecording ? "Enabled" : "Disabled",
      desc: "Allow users to record voice entries.",
    },
    {
      title: "Image Upload",
      icon: ImageUpload,
      iconBg: "bg-[#E8E9FB] text-[#001984]",
      status: s.imageUpload ? "Enabled" : "Disabled",
      desc: "Allow users to upload images.",
      toggle: { checked: s.imageUpload, onChange: (v) => set("imageUpload", v) },
    },
    {
      title: "Retention Period",
      icon: StatCalendar,
      iconBg: "bg-[#E8E9FB] text-[#001984]",
      status: `${s.retentionDays || 0} Days`,
      desc: "How long journal entries are kept",
      arrow: true,
    },
  ];

  return (
    <div className="p-6 bg-[#F8FAFC] min-h-screen font-[Inter] space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-[#0A0847]">Journal Settings</h1>
          <p className="text-sm text-[#0A084799] font-medium mt-2">
            Manage and customize all journal features and behaviors.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="px-5 py-2.5 bg-white border border-[#E2DFFC] text-[#0A0847] text-xs font-semibold rounded-md flex items-center gap-2 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <FiRefreshCw size={15} /> Reset to Default
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2.5 bg-[#001984] hover:bg-[#001266] text-white text-xs font-semibold rounded-md flex items-center gap-2 transition-colors cursor-pointer"
          >
            <img src={SaveIcon} alt="" className="w-4 h-4" /> Save Changes
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summary.map((c) => (
          <div
            key={c.title}
            className="bg-white rounded-lg border border-[#E2DFFC] px-4 py-7 flex items-center gap-4"
          >
            <div
              className={`w-14 h-14 rounded-2xl ${c.iconBg} flex items-center justify-center shrink-0`}
            >
                <img src={c.icon} alt="" className="w-8 h-8" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-[#001984]">{c.title}</p>
              <p
                className={`text-sm font-semibold mt-1 ${
                  c.status === "Enabled"
                    ? "text-[#21AC1C]"
                    : c.status === "Disabled"
                    ? "text-gray-400"
                    : "text-[#0A0847]"
                }`}
              >
                {c.status}
              </p>
              <p className="text-[10px] text-[#0A084799] font-medium mt-1">{c.desc}</p>
            </div>
            {c.toggle && <Toggle green checked={c.toggle.checked} onChange={c.toggle.onChange} />}
            {c.arrow && <FiChevronRight size={16} className="text-[#0A0847CC] shrink-0" />}
          </div>
        ))}
      </div>

      {/* Config */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-6 items-start">
        {/* LEFT */}
        <Card title="Journal Feature Configuration" className="lg:min-h-[665px]">
          <div className="divide-y divide-[#E2DFFC]">
            <FeatureRow
              icon={<FeatureIcon src={MicIcon} />}  
              title="Audio Recording"
              desc="Allow users to record and save audio journal entries."
            >
              <Toggle checked={s.audioRecording} onChange={(v) => set("audioRecording", v)} />
            </FeatureRow>

            <FeatureRow
              icon={<FeatureIcon src={AIcon} />}   
              title="Character Limit"
              desc="Set the maximum number of characters allowed for text entries."
              footer={
                <p className="text-[10px] font-semibold text-[#0A0847CC] text-right mt-1.5">
                  {s.charLimit || 0}/{MAX_CHARS}
                </p>
              }
            >
              <input
                value={s.charLimit}
                onChange={(e) => clampChars(e.target.value)}
                inputMode="numeric"
                className="w-24 border border-[#E2DFFC] rounded-md px-3 py-2.5 font-semibold text-xs text-[#0A0847] outline-none focus:border-[#001984]"
              />
            </FeatureRow>

            <div className="pt-1">
              <FeatureRow
                icon={<FeatureIcon src={ImgUpload} />}  
                title="Image Upload"
                desc="Allow users to upload images while composing journal entries."
              >
                <Toggle checked={s.imageUpload} onChange={(v) => set("imageUpload", v)} />
              </FeatureRow>

              <FeatureRow
                icon={<FeatureIcon src={EntryIcon} />}   
                title="Entry Retention Period"
                desc="Set the number of days to keep journal entries."
                footer={
                  <p className="text-[10px] font-medium text-[#0A084799] text-right mt-1.5">
                    Entries older than this will be archived.
                  </p>
                }
              >
                <div className="flex border border-[#E2DFFC] rounded-md overflow-hidden">
                  <input
                    value={s.retentionDays}
                    onChange={(e) => set("retentionDays", e.target.value.replace(/\D/g, ""))}
                    inputMode="numeric"
                    className="w-16 px-3 py-2.5 text-xs font-semibold text-center text-[#0A0847] outline-none focus:bg-[#FAFAFF]"
                  />
                  <span className="px-4 py-2.5 text-xs font-semibold text-[#0A0847CC] bg-[#F8FAFC] border-l border-[#E2DFFC]">
                    days
                  </span>
                </div>
              </FeatureRow>
            </div>

            <div className="pt-1">
              <FeatureRow
                icon={<FeatureIcon src={TrashIcon} />}  
                title="Auto Delete Expired Entries"
                desc="Automatically delete entries after the retention period."
              >
                <Toggle checked={s.autoDelete} onChange={(v) => set("autoDelete", v)} />
              </FeatureRow>
              <FeatureRow
                icon={<FeatureIcon src={UploadIcon} />}
                title="Export Entries"
                desc="Allow users to export their journal entries."
              >
                <Toggle checked={s.exportEntries} onChange={(v) => set("exportEntries", v)} />
              </FeatureRow>
              <FeatureRow
                icon={<FeatureIcon src={LockIcon} />}  
                title="Private by Default"
                desc="New journal entries will be private by default."
              >
                <Toggle checked={s.privateDefault} onChange={(v) => set("privateDefault", v)} />
              </FeatureRow>
              <FeatureRow
                icon={<FeatureIcon src={PinnedIcon} />} 
                title="Pin Important Entries"
                desc="Allow users to pin and highlight important journal entries."
              >
                <Toggle checked={s.pinEntries} onChange={(v) => set("pinEntries", v)} />
              </FeatureRow>
            </div>
          </div>
        </Card>

        {/* RIGHT */}
        <Card title="Journal Feature Configuration" className="lg:min-h-[665px]">
          <div className="space-y-5 pt-3">
            <div>
              <Label
                title="Max Audio Duration"
                desc="Set the maximum duration for audio recordings."
              />
              <SelectField
                value={s.maxAudio}
                onChange={(v) => set("maxAudio", v)}
                options={["1 minute", "3 minutes", "5 minutes", "10 minutes", "15 minutes"]}
              />
            </div>

            <div>
              <Label
                title="Max Images per Entry"
                desc="Limit the number of images that can be uploaded."
              />
              <SelectField
                value={s.maxImages}
                onChange={(v) => set("maxImages", v)}
                options={["1 image", "3 images", "5 images", "10 images"]}
              />
            </div>

            <div>
              <Label
                title="Allowed File Types"
                desc="Choose which image file types are allowed."
              />
              <div className="flex flex-wrap items-center gap-5">
                {Object.keys(s.fileTypes).map((t) => (
                  <label key={t} className="flex items-center gap-2 cursor-pointer select-none">
                    <span
                      className={`w-4 h-4 rounded border flex items-center justify-center ${
                        s.fileTypes[t]
                          ? "bg-[#001984] border-[#001984] text-white"
                          : "bg-white border-gray-300"
                      }`}
                    >
                      {s.fileTypes[t] && <FiCheck size={11} />}
                    </span>
                    <input
                      type="checkbox"
                      checked={s.fileTypes[t]}
                      onChange={() => toggleType(t)}
                      className="hidden"
                    />
                    <span className="text-[11px] font-semibold text-[#0A0847CC]">{t}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <SideToggle
                title="Profanity Filter"
                desc="Filter inappropriate language in journal entries."
                checked={s.profanity}
                onChange={(v) => set("profanity", v)}
              />
              <SideToggle
                title="Notifications for New Entries"
                desc="Send notification to admins for reported entries."
                checked={s.notifyNew}
                onChange={(v) => set("notifyNew", v)}
              />
              <SideToggle
                title="Daily Journal Reminder"
                desc="Allow users to set daily reminders."
                checked={s.dailyReminder}
                onChange={(v) => set("dailyReminder", v)}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}