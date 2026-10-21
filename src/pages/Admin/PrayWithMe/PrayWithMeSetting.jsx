import React, { useState, useRef } from "react";
import {
  FiEdit2,
  FiTrash2,
  FiUpload,
  FiRefreshCw,
  FiSave,
  FiInfo,
  FiCheck,
  FiChevronDown,
  FiImage,
} from "react-icons/fi";
import { MdDragIndicator } from "react-icons/md";
import InformationFilledIcon from "../../../assets/PrayWithMeSvgs/InformationFilledIcon.svg";
import Edit from "../../../assets/PrayWithMeSvgs/Edit.svg";
import TrashRedIcon from "../../../assets/PrayWithMeSvgs/TrashRedIcon.svg";
import ReplaceIcon from "../../../assets/PrayWithMeSvgs/ReplaceIcon.svg";
import UploadIcon2 from "../../../assets/PrayWithMeSvgs/Uploadicon2.svg";
import SaveIcon from "../../../assets/PrayWithMeSvgs/SaveIcon.svg";


 const SvgIcon = ({ src, size = 16, className = "" }) => (
  <img src={src} alt="" width={size} height={size} className={`shrink-0 ${className}`} />
);

   const InformationIconSvg = (p) => <SvgIcon src={InformationFilledIcon} {...p} />;
   const EditSvg = (p) => <SvgIcon src={Edit} {...p} />;
   const TrashRedSvg = (p) => <SvgIcon src={TrashRedIcon} {...p} />;
   const ReplaceSvg = (p) => <SvgIcon src={ReplaceIcon} {...p} />;
   const UploadIcon2Svg = (p) => <SvgIcon src={UploadIcon2} {...p} />;
    const SaveSvg = (p) => <SvgIcon src={SaveIcon} {...p} />;

/* ==========================================================================
   REUSABLE COMPONENTS
   ========================================================================== */

const Input = ({ className = "", ...props }) => (
  <input
    className={`w-full border border-[#E2DFFC] rounded-md px-3 py-3 text-xs text-[#0A0847] placeholder-gray-400 bg-white outline-none focus:border-[#001984] focus:ring-[#001984] transition-all ${className}`}
    {...props}
  />
);

const Label = ({ children }) => (
  <label className="block text-xs font-semibold text-[#0A0847CC] mb-1.5">
    {children}
  </label>
);

const Toggle = ({ checked, onChange, label }) => (
  <label className="inline-flex items-center gap-2 cursor-pointer select-none">
    <div
      onClick={() => onChange(!checked)}
      className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-200 ease-in-out shrink-0 ${
        checked ? "bg-[#001984]" : "bg-gray-200"
      }`}
    >
      <div
        className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${
          checked ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </div>
    {label && <span className="text-xs font-semibold text-[#0A0847]">{label}</span>}
  </label>
);

/** Numbered section heading */
const SectionTitle = ({ n, title }) => (
  <div className="flex items-center gap-3 pb-4 mb-4 border-b border-[#E2DFFC]">
    <span className="w-8 h-8 rounded-full bg-[#001984] text-white text-sm font-semibold flex items-center justify-center shrink-0">
      {n}
    </span>
    <h3 className="text-base font-medium text-[#0A0847]">{title}</h3>
  </div>
);

/** Setting row: title + optional description on the left, toggle on the right */
const ToggleRow = ({ title, desc, checked, onChange }) => (
  <div className="flex items-center justify-between gap-4 py-3">
    <div>
      <p className="text-sm font-semibold text-[#0A0847]">{title}</p>
      {desc && <p className="text-xs text-[#0A084799] font-medium mt-1">{desc}</p>}
    </div>
    <Toggle checked={checked} onChange={onChange} />
  </div>
);

const Card = ({ className = "", children }) => (
  <div className={`bg-white rounded-lg border border-[#E2DFFC] p-6 ${className}`}>
    {children}
  </div>
);

/* ==========================================================================
   INITIAL DATA
   ========================================================================== */
const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1600&q=80";

const INITIAL_SETTINGS = {
  categories: [
    { id: "1", name: "Healing", posts: 842, enabled: true },
    { id: "2", name: "Family", posts: 715, enabled: true },
    { id: "3", name: "Gratitude", posts: 546, enabled: true },
    { id: "4", name: "Relationships", posts: 214, enabled: true },
    { id: "5", name: "Hope", posts: 164, enabled: true },
  ],
  allowAnonymous: true,
  allowAudio: true,
  allowReactions: true,
  allowTestimony: true,
  autoDelete: "90 days after posting",
  keepAnswered: false,
  requireApproval: true,
  autoHide: true,
  hideAfter: "3 Reports",
  blockedFilter: true,
  notifyAdmins: true,
  pageImage: DEFAULT_IMAGE,
  imageAlt: "Hands clasped in prayer with soft light",
};

/* ==========================================================================
   MAIN PAGE (NO NAVBAR / NO SIDEBAR)
   ========================================================================== */
export default function PrayWithMeSettingsPage() {
  const [settings, setSettings] = useState(INITIAL_SETTINGS);
  const [newCategory, setNewCategory] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [imgError, setImgError] = useState(false);
  const imageRef = useRef(null);

  const set = (key, value) => setSettings((prev) => ({ ...prev, [key]: value }));

  /* ---------- Categories ---------- */
  const toggleCategory = (id) =>
    set(
      "categories",
      settings.categories.map((c) => (c.id === id ? { ...c, enabled: !c.enabled } : c))
    );

  const deleteCategory = (id) =>
    set("categories", settings.categories.filter((c) => c.id !== id));

  const startEdit = (c) => {
    setEditingId(c.id);
    setEditValue(c.name);
  };

  const saveEdit = () => {
    if (editValue.trim()) {
      set(
        "categories",
        settings.categories.map((c) =>
          c.id === editingId ? { ...c, name: editValue.trim() } : c
        )
      );
    }
    setEditingId(null);
  };

  const addCategory = () => {
    const name = newCategory.trim();
    if (!name) return;
    set("categories", [
      ...settings.categories,
      { id: crypto.randomUUID(), name, posts: 0, enabled: true },
    ]);
    setNewCategory("");
  };

  /* ---------- Image ---------- */
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImgError(false);
      set("pageImage", URL.createObjectURL(file));
    }
    e.target.value = "";
  };

  const hasImage = settings.pageImage && !imgError;

  /* ---------- Footer ---------- */
  const handleDiscard = () => {
    setSettings(INITIAL_SETTINGS);
    setNewCategory("");
    setEditingId(null);
    setImgError(false);
  };

  const handleSave = () => {
    console.log("Pray With Me Settings Payload:", settings);
    alert("Settings saved! Check browser console for full payload.");
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen p-6 font-[Inter] space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-[#0A0847]">Pray With Me Settings</h1>
        <p className="text-sm text-[#0A084799] font-medium mt-2">
          Control categories, posting options, safety, retention, and page appearance.
        </p>
      </div>

      {/* Row 1: Categories + Permissions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* 1. Prayer Categories */}
        <Card>
          <SectionTitle n={1} title="Prayer Categories" />

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[420px]">
              <thead>
                <tr className="text-sm font-medium text-[#0A0847CC] border-b border-[#E2DFFC]">
                  <th className="pb-3 font-medium">Category</th>
                  <th className="pb-3 font-medium">Posts</th>
                  <th className="pb-3 font-medium">Enabled</th>
                  <th className="pb-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {settings.categories.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-gray-400">
                      No categories yet.
                    </td>
                  </tr>
                )}
                {settings.categories.map((c) => (
                  <tr key={c.id}>
                    <td className="py-2.5">
                      <div className="flex items-center gap-2">
                        <MdDragIndicator size={16} className="text-gray-400 shrink-0 cursor-grab" />
                        {editingId === c.id ? (
                          <input
                            autoFocus
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onBlur={saveEdit}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") saveEdit();
                              if (e.key === "Escape") setEditingId(null);
                            }}
                            className="w-32 border border-[#001984] rounded-md px-2 py-1 text-xs font-semibold text-[#0A0847] outline-none"
                          />
                        ) : (
                          <span className="font-semibold text-sm text-[#0A0847CC]">{c.name}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-2.5 font-semibold text-[#0A0847CC]">{c.posts}</td>
                    <td className="py-2.5">
                      <Toggle checked={c.enabled} onChange={() => toggleCategory(c.id)} />
                    </td>
                    <td className="py-2.5">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => (editingId === c.id ? saveEdit() : startEdit(c))}
                          className="w-8 h-8 rounded-lg border border-[#E2DFFC] text-[#001984] flex items-center justify-center hover:bg-[#EEF2FF] transition-colors cursor-pointer"
                        >
                          {editingId === c.id ? <FiCheck size={16} /> : <EditSvg size={18} />}
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteCategory(c.id)}
                          className="w-8 h-8 rounded-lg border border-[#E2DFFC] text-[#DE2128] flex items-center justify-center hover:bg-red-50 transition-colors cursor-pointer"
                        >
                          <TrashRedSvg size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-5">
            <Input
              placeholder="New category name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addCategory()}
              className="sm:flex-1 h-11"
            />
            <button
              type="button"
              onClick={addCategory}
              className="h-11 px-6 bg-[#001984] hover:bg-[#001266] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              Add Category
            </button>
          </div>
        </Card>

        {/* 2. Posting Permissions */}
        <Card>
          <SectionTitle n={2} title="Posting Permissions" />
          <div className="divide-y divide-transparent">
            <ToggleRow
              title="Allow anonymous posts"
              desc="Users can submit prayer requests without an account."
              checked={settings.allowAnonymous}
              onChange={(v) => set("allowAnonymous", v)}
            />
            <ToggleRow
              title="Allow audio posts"
              desc="Users can record and upload audio prayer requests."
              checked={settings.allowAudio}
              onChange={(v) => set("allowAudio", v)}
            />
            <ToggleRow
              title="Allow prayer reactions"
              checked={settings.allowReactions}
              onChange={(v) => set("allowReactions", v)}
            />
            <ToggleRow
              title="Allow testimony updates"
              checked={settings.allowTestimony}
              onChange={(v) => set("allowTestimony", v)}
            />
          </div>
        </Card>
      </div>

      {/* Row 2: Retention + Moderation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* 3. Post Retention */}
        <Card>
          <SectionTitle n={3} title="Post Retention" />

          <div className="space-y-4">
            <div>
              <Label>Default auto-delete:</Label>
              <div className="relative">
                <select
                  value={settings.autoDelete}
                  onChange={(e) => set("autoDelete", e.target.value)}
                  className="w-full h-11 appearance-none border border-[#E2DFFC] rounded-lg px-3 pr-9 text-xs font-medium text-[#0A0847] bg-white outline-none focus:border-[#001984] cursor-pointer"
                >
                  <option>30 days after posting</option>
                  <option>60 days after posting</option>
                  <option>90 days after posting</option>
                  <option>180 days after posting</option>
                  <option>Never</option>
                </select>
                <FiChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-medium text-[#0A0847CC]">
              <input
                type="checkbox"
                checked={settings.keepAnswered}
                onChange={(e) => set("keepAnswered", e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 accent-[#001984] cursor-pointer"
              />
              Do not auto delete posts marked answered
            </label>

            <div className="flex items-start gap-2 bg-[#F1F2F9] border border-[#E2DFFC] rounded-lg p-3 text-sm font-normal text-[#001984]">
              <InformationIconSvg size={18} className="shrink-0 mt-0.5" />
              <span>
                A custom deletion date can be set on any post from the management page.
              </span>
            </div>
          </div>
        </Card>

        {/* 4. Moderation & Safety */}
        <Card>
          <SectionTitle n={4} title="Moderation & Safety" />

          <div className="space-y-2">
            <ToggleRow
              title="Require approval before publishing"
              checked={settings.requireApproval}
              onChange={(v) => set("requireApproval", v)}
            />

            <ToggleRow
              title="Automatically hide reported posts"
              checked={settings.autoHide}
              onChange={(v) => set("autoHide", v)}
            />

            <div>
              <Label>After</Label>
              <div className="relative">
                <select
                  value={settings.hideAfter}
                  onChange={(e) => set("hideAfter", e.target.value)}
                  disabled={!settings.autoHide}
                  className="w-full h-11 appearance-none border border-[#E2DFFC] rounded-lg px-3 pr-9 text-xs font-medium text-[#0A0847] bg-white outline-none focus:border-[#001984] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option>1 Report</option>
                  <option>3 Reports</option>
                  <option>5 Reports</option>
                  <option>10 Reports</option>
                </select>
                <FiChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                />
              </div>
            </div>

            <div className="pt-2">
              <Label>Blocked-word filter</Label>
              <div className="flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => alert("Open blocked words manager")}
                  className="h-11 px-8 border border-[#001984] text-[#001984] text-xs font-semibold rounded-lg hover:bg-[#EEF2FF] transition-colors cursor-pointer"
                >
                  Manage blocked words
                </button>
                <Toggle
                  checked={settings.blockedFilter}
                  onChange={(v) => set("blockedFilter", v)}
                />
              </div>
            </div>

            <ToggleRow
              title="Notify admins of flagged posts"
              checked={settings.notifyAdmins}
              onChange={(v) => set("notifyAdmins", v)}
            />
          </div>
        </Card>
      </div>

      {/* 5. Page Appearance */}
      <Card>
        <SectionTitle n={5} title="Page Appearance" />

        <input
          type="file"
          ref={imageRef}
          accept="image/png,image/jpeg"
          onChange={handleImageUpload}
          className="hidden"
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
          {/* Preview banner */}
          <div className="lg:col-span-3 relative rounded-lg overflow-hidden bg-gray-100 min-h-[240px] flex items-center justify-center">
            {hasImage ? (
              <>
                <img
                  src={settings.pageImage}
                  alt={settings.imageAlt}
                  onError={() => setImgError(true)}
                  className="absolute inset-0 w-full h-full object-cover"
                />
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

          {/* Controls */}
          <div className="lg:col-span-2 flex flex-col">
            <button
              type="button"
              onClick={() => imageRef.current?.click()}
              className="h-11 w-full border border-[#E2DFFC] bg-white text-[#0A0847] font-semibold text-xs rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <UploadIcon2Svg size={16} /> Upload New Image
            </button>
            <p className="text-[11px] text-[#0A084799] font-medium mt-2 mb-3">
              JPG or PNG • Recommended 1600 × 900
            </p>

            <div className="space-y-3">
              <button
                type="button"
                onClick={() => imageRef.current?.click()}
                className="h-11 w-full border border-[#E2DFFC] bg-white text-[#0A0847] font-semibold text-xs rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <ReplaceSvg size={16} /> Replace
              </button>
              <button
                type="button"
                onClick={() => {
                  setImgError(false);
                  set("pageImage", "");
                }}
                className="h-11 w-full border border-[#DE2128] bg-white text-[#DE2128] font-semibold text-xs rounded-lg hover:bg-red-50 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <TrashRedSvg size={16} /> Remove
              </button>
            </div>

            <div className="border-t border-[#E2DFFC] mt-5 pt-4">
              <Label>Image alt text:</Label>
              <Input
                value={settings.imageAlt}
                onChange={(e) => set("imageAlt", e.target.value)}
                placeholder="Describe the image"
                className="h-11"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Footer */}
      <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
        <button
          type="button"
          onClick={handleDiscard}
          className="w-full sm:w-auto px-6 py-3 border border-[#E2DFFC] bg-white text-[#0A0847] font-semibold text-xs rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
        >
          Discard Changes
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="w-full sm:w-auto px-8 py-3 bg-[#001984] text-white font-semibold text-xs rounded-lg hover:bg-[#001266] flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <SaveSvg size={16} /> Save draft
        </button>
      </div>
    </div>
  );
}