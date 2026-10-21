import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiEye, FiSave, FiCheck, FiTrash2, FiChevronDown, FiUploadCloud,
  FiBold, FiItalic, FiUnderline, FiLink, FiList, FiCheckCircle, FiStar, FiBookOpen, FiBook,
} from "react-icons/fi";
import { FaFire, FaGraduationCap } from "react-icons/fa";
import { GiLaurels } from "react-icons/gi";
import bibleBook from "../../../assets/bibleBook.svg";
import StreakSvg from "../../../assets/StreakSvg.svg";
import graduationCap from "../../../assets/graduationCap.svg";
import bbook from "../../../assets/bbook.svg";
import TrashRedIcon from "../../../assets/BibbleBookSvgs/TrashRedIcon.svg"
import SaveIcon from "../../../assets/BibbleBookSvgs/Saveicon.svg";
import editBook from "../../../assets/BibbleBookSvgs/editBook.png";
import EyeIcon from "../../../assets/BibbleBookSvgs/EyeIcon.svg";
import Leafs from "../../../assets/BibbleBookSvgs/Leafs.svg";
import UploadIcon from "../../../assets/BibbleBookSvgs/UploadIcon.svg"


/* ---------- atoms ---------- */

const SvgIcon = ({ src, size = 16, className = "" }) => (
           <img src={src} alt="" width={size} height={size} className={`shrink-0 ${className}`} />
         );
         
    const TrashRedIconSvg = (p) => <SvgIcon src={TrashRedIcon} {...p} />;
    const SaveIconSvg = (p) => <SvgIcon src={SaveIcon} {...p} />;
    const EyeIconSvg = (p) => <SvgIcon src={EyeIcon} {...p} />;
    const LeafsIconSvg = (p) => <SvgIcon src={Leafs} {...p} />;
    const UploadIconSvg = (p) => <SvgIcon src={UploadIcon} {...p} />;

const inputCls =
  "w-full border border-[#E2DFFC] rounded-md px-3 py-3 text-xs text-[#0A0847] placeholder-gray-400 bg-white outline-none focus:border-[#001984] transition-all";

const Label = ({ children }) => (
  <label className="block text-xs font-semibold text-[#0A0847CC] mb-1.5">{children}</label>
);

const Card = ({ title, children, className = "" }) => (
  <div className={`bg-white rounded-lg border border-[#E2DFFC] p-5 ${className}`}>
    {title && <h3 className="text-sm font-semibold text-[#0A0847CC] mb-4">{title}</h3>}
    {children}
  </div>
);

const SelectField = ({ value, onChange, children }) => (
  <div className="relative">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${inputCls} appearance-none pr-9 cursor-pointer`}
    >
      {children}
    </select>
    <FiChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
  </div>
);

const Toggle = ({ checked, onChange, label }) => (
  <button type="button" onClick={() => onChange(!checked)} className="flex items-center gap-2 cursor-pointer">
    <span className={`w-9 h-5 rounded-full p-0.5 transition-colors ${checked ? "bg-[#21AC1C]" : "bg-gray-300"}`}>
      <span className={`block w-4 h-4 rounded-full bg-white transition-transform ${checked ? "translate-x-4" : ""}`} />
    </span>
    <span className="text-xs font-semibold text-[#0A0847]">{label}</span>
  </button>
);

const Hint = ({ children }) => (
  <p className="text-[10px] text-gray-400 font-medium mt-1.5">{children}</p>
);

/* ---------- rich text ---------- */
const RichText = ({ value, onChange }) => {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) ref.current.innerHTML = value;
    // eslint-disable-next-line
  }, []);

  const exec = (cmd, arg) => {
    ref.current?.focus();
    document.execCommand(cmd, false, arg);
    onChange(ref.current.innerHTML);
  };
  const tools = [
    { icon: FiBold, cmd: "bold" },
    { icon: FiItalic, cmd: "italic" },
    { icon: FiUnderline, cmd: "underline" },
    { icon: FiList, cmd: "insertUnorderedList" },
  ];

  return (
    <div className="border border-[#E2DFFC] rounded-md overflow-hidden">
      <div className="flex items-center gap-1 p-2 border-b border-[#E2DFFC] bg-[#F8FAFC]">
        {tools.map(({ icon: Icon, cmd }) => (
          <button
            key={cmd}
            type="button"
            onMouseDown={(e) => { e.preventDefault(); exec(cmd); }}
            className="w-7 h-7 rounded border border-[#E2DFFC] bg-white text-[#0A0847] flex items-center justify-center hover:bg-[#EEF2FF] cursor-pointer"
          >
            <Icon size={13} />
          </button>
        ))}
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            const url = window.prompt("Link URL");
            if (url) exec("createLink", url);
          }}
          className="w-7 h-7 rounded border border-[#E2DFFC] bg-white text-[#0A0847] flex items-center justify-center hover:bg-[#EEF2FF] cursor-pointer"
        >
          <FiLink size={13} />
        </button>
      </div>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => onChange(e.currentTarget.innerHTML)}
        className="min-h-[140px] p-3 text-sm text-[#0A0847CC] outline-none"
      />
    </div>
  );
};

/* ---------- page ---------- */
export default function EditBookPage() {
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const [form, setForm] = useState({
    testament: "Old Testament",
    name: "Exodus",
    order: 2,
    subtitle: "A Journey of Deliverance",
    published: true,
    images: [
      editBook,
    ],
    journeyCount: "206+",
    chapterCount: "40",
    helperText: "Explore Scripture through reading, games, memory verses, and challenges.",
    description:
      "Exodus tells the story of God's power to deliver His people from slavery, His faithfulness to His promises, and His guidance to a new freedom in faith.",
    verseText: "“The Lord will fight for you; you need only to be still.”",
    verseRef: "Exodus 14:14",
    showVerse: true,
  });

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length) set("images", [...form.images, ...files.map((f) => URL.createObjectURL(f))]);
    e.target.value = "";
  };

  const removeImage = (i) => set("images", form.images.filter((_, idx) => idx !== i));

  const plainDescription = form.description.replace(/<[^>]+>/g, "");

  const handleAction = (type) => {
    console.log(type, form);
    alert(`${type}! Check console for payload.`);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen p-6 font-[Inter] space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-[#0A0847]">Edit Book — {form.name}</h1>
          <p className="text-sm text-[#0A084799] font-medium mt-2">
            Update the content shown on the {form.name} book page.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleAction("Preview as User")}
            className="px-5 py-2.5 bg-white border border-[#001984] text-[#001984] rounded-md text-xs font-semibold flex items-center gap-2 hover:bg-[#EEF2FF] cursor-pointer"
          >
            <EyeIconSvg size={14} /> Preview as User
          </button>
          <button
            type="button"
            onClick={() => handleAction("Save Changes")}
            className="px-5 py-2.5 bg-[#001984] text-white rounded-md text-xs font-semibold flex items-center gap-2 hover:bg-[#001266] cursor-pointer"
          >
            <SaveIconSvg size={14} /> Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-6 items-start">
        {/* LEFT */}
        <div className="space-y-6">
          <Card title="Topic Details">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr_1fr] gap-4">
              <div>
                <Label>Testament</Label>
                <SelectField value={form.testament} onChange={(v) => set("testament", v)}>
                  <option>Old Testament</option>
                  <option>New Testament</option>
                </SelectField>
              </div>
              <div>
                <Label>Book Name</Label>
                <input className={inputCls} value={form.name} onChange={(e) => set("name", e.target.value)} />
              </div>
              <div>
                <Label>Display Order</Label>
                <input type="number" min={1} className={inputCls} value={form.order} onChange={(e) => set("order", e.target.value)} />
              </div>
            </div>
            <div className="mt-4">
              <Label>Testament</Label>
              <input className={inputCls} value={form.subtitle} onChange={(e) => set("subtitle", e.target.value)} />
            </div>
            <div className="mt-5">
              <p className="text-xs font-semibold text-[#001984] mb-2">Status</p>
              <Toggle checked={form.published} onChange={(v) => set("published", v)} label={form.published ? "Published" : "Draft"} />
            </div>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* col A */}
            <div className="space-y-6">
              <Card title="Book Page Media">
                <p className="text-xs font-medium text-[#0A084799]">Header / Cover Image</p>
                <p className="text-[10px] text-[#0A084799] mb-3">Recommended size: 1280 × 800px</p>
                <input ref={fileRef} type="file" accept="image/*" multiple onChange={handleUpload} className="hidden" />
                <div className="grid grid-cols-2 gap-3">
                  {form.images.map((src, i) => (
                    <div key={src}>
                      <img src={src} alt="Book cover" className="w-full h-54 object-cover rounded-md border border-[#E2DFFC]" />
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="w-full mt-2 py-2 border border-red-300 text-red-500 rounded-md text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-red-50 cursor-pointer"
                      >
                        <TrashRedIconSvg size={16} /> Remove
                      </button>
                    </div>
                  ))}
                  <div
                    onClick={() => fileRef.current?.click()}
                    className="h-54 rounded-md border border-[#E2DFFC] bg-[#FAFAFF] hover:bg-[#F1F2F9] flex flex-col items-center justify-center text-center px-3 cursor-pointer transition-colors"
                  >
                    <UploadIconSvg size={28} className="text-[#001984] mb-2" />
                    <p className="text-[11px] font-semibold text-[#0A0847]">Upload More Images</p>
                    <p className="text-[9px] text-gray-400 mt-1">Recommended JPG or PNG upto 5MB</p>
                  </div>
                </div>
              </Card>

              <Card title="Book Description">
                <RichText value={form.description} onChange={(v) => set("description", v)} />
              </Card>

              <Card title="Featured Verse">
                <Label>Verse Text</Label>
                <textarea
                  rows={2}
                  value={form.verseText}
                  onChange={(e) => set("verseText", e.target.value)}
                  className={`${inputCls} resize-none`}
                />
                <div className="mt-4 max-w-[220px]">
                  <Label>Reference</Label>
                  <input className={inputCls} value={form.verseRef} onChange={(e) => set("verseRef", e.target.value)} />
                </div>
                <div className="mt-4">
                  <Label>Show on user page</Label>
                  <Toggle checked={form.showVerse} onChange={(v) => set("showVerse", v)} label={form.showVerse ? "Published" : "Hidden"} />
                </div>
              </Card>
            </div>

            {/* col B */}
            <div className="space-y-6">
              <Card title="User Page Labels">
                <div className="space-y-4">
                  <div>
                    <Label>Journey Count</Label>
                    <input className={inputCls} value={form.journeyCount} onChange={(e) => set("journeyCount", e.target.value)} />
                    <Hint>Displayed on the total journey count on the book page.</Hint>
                  </div>
                  <div>
                    <Label>Chapter Count (Text)</Label>
                    <input className={inputCls} value={form.chapterCount} onChange={(e) => set("chapterCount", e.target.value)} />
                    <Hint>Calculated from the number of chapters.</Hint>
                  </div>
                  <div>
                    <Label>Helper Text</Label>
                    <textarea
                      rows={3}
                      value={form.helperText}
                      onChange={(e) => set("helperText", e.target.value)}
                      className={`${inputCls} resize-none`}
                    />
                  </div>
                </div>
              </Card>

              <Card title="User Page Labels">
                <div className="space-y-4">
                  <div>
                    <Label>Journey Count</Label>
                    <input className={inputCls} value={form.journeyCount} onChange={(e) => set("journeyCount", e.target.value)} />
                    <Hint>Displayed on the total journey count on the book page.</Hint>
                  </div>
                  <div>
                    <Label>Chapter Count (Text)</Label>
                    <input className={inputCls} value={form.chapterCount} onChange={(e) => set("chapterCount", e.target.value)} />
                    <Hint>Calculated from the number of chapters.</Hint>
                  </div>
                  <div>
                    <Label>Helper Text</Label>
                    <textarea
                      rows={3}
                      value={form.helperText}
                      onChange={(e) => set("helperText", e.target.value)}
                      className={`${inputCls} resize-none`}
                    />
                  </div>
                </div>
              </Card>

              <Card title="Publishing">
                <p className="text-xs font-semibold text-[#0A0847CC] mb-2">Status</p>
                <Toggle checked={form.published} onChange={(v) => set("published", v)} label={form.published ? "Published" : "Draft"} />
                <p className="text-xs font-semibold text-[#0A0847CC] mt-4 mb-1">Last Updated</p>
                <p className="text-xs italic font-medium text-[#0A084799]">May 18, 2024, 10:28 AM</p>
                <div className="mt-4 flex items-center gap-2 bg-[#21AC1C1A] border border-[#DAF3C8] text-[#21AC1C] rounded-md px-3 py-2.5 text-[11px] font-semibold">
                  <FiCheckCircle size={14} /> Changes appear in the app after saving.
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* RIGHT: live preview */}
        <div className="bg-white rounded-lg border border-[#E2DFFC] p-4 space-y-4 xl:sticky xl:top-6">
  {/* Hero */}
  <div className="relative rounded-lg overflow-hidden min-h-[400px] flex flex-col justify-end bg-[#EAF2FF]">
    {form.images[0] && (
      <img src={form.images[0]} alt="" className="absolute inset-0 w-full h-full object-cover" />
    )}
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/60 to-white" />

    <div className="relative px-4 pb-4 text-center">
      <img src={bibleBook} alt="" className="w-10 h-10 mx-auto mb-1" />
      <p className="text-[11px] font-semibold text-[#0A0847] uppercase tracking-wide">{form.testament}</p>
      <h2 className="text-3xl font-semibold text-[#0A0847] uppercase leading-tight">{form.name}</h2>
      <p className="text-xs italic text-[#0A0847] mb-4">{form.subtitle}</p>

      <div className="bg-[#001984] rounded-lg p-3 flex items-center gap-3 text-left">
        <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
          {/* <FaFire size={16} className="text-orange-400" /> */}
          <img src={StreakSvg} alt="" className="w-10 h-10 mx-auto" />
        </div>
        <p className="text-[9px] italic leading-relaxed text-white">{plainDescription}</p>
      </div>
    </div>
  </div>

  {/* Stats */}
  <div className="grid grid-cols-2 gap-3">
    <div className="border border-[#E2DFFC] rounded-lg p-3 flex items-center gap-2">
      <div className="w-8 h-8 rounded-full bg-[#DC2626] text-white flex items-center justify-center shrink-0">
        <img src={bbook} alt="" className="w-10 h-10 mx-auto" />
      </div>
      <div className="leading-tight">
        <p className="text-xs font-semibold text-[#0A0847]">{form.chapterCount}</p>
        <p className="text-xs font-semibold text-[#0A0847]">Chapters</p>
      </div>
    </div>
    <div className="border border-[#E2DFFC] rounded-lg p-3 flex items-center gap-2">
      <div className="w-8 h-8 rounded-full text-white flex items-center justify-center shrink-0">
       <img src={graduationCap} alt="" className="w-10 h-10 mx-auto" />
      </div>
      <div className="leading-tight">
        <p className="text-xs font-semibold text-[#0A0847]">{form.journeyCount}</p>
        <p className="text-xs font-semibold text-[#0A0847]">Journey</p>
      </div>
    </div>
  </div>

  {/* Featured verse */}
  {form.showVerse && (
    <div className="rounded-lg bg-gradient-to-b from-[#E4E8FA] to-[#F1F3FC] px-4 py-9 text-center">
      <p className="text-[10px] font-bold text-[#001984] uppercase tracking-wide mb-3 py-2">Featured Verse</p>
      <div className="flex items-center justify-center gap-2">
        <LeafsIconSvg size={28} className="text-[#3231DB] shrink-0" />
        <p className="text-sm text-[#0A084799]  leading-relaxed">{form.verseText}</p>
        <LeafsIconSvg size={28} className="text-[#3231DB] shrink-0 -scale-x-100" />
      </div>
      <div className="flex items-center justify-center gap-2 mt-6">
        <span className="h-px w-8 bg-[#001984]" />
        <span className="w-1 h-1 rounded-full bg-[#001984]" />
        <p className="text-xs font-bold text-[#001984] uppercase">{form.verseRef}</p>
        <span className="w-1 h-1 rounded-full bg-[#001984]" />
        <span className="h-px w-8 bg-[#001984]" />
      </div>
    </div>
  )}

  {/* Helper text */}
  <div className="flex items-start gap-2 border border-[#E2DFFC] rounded-lg p-3">
    <FiStar size={18} className="text-yellow-400 fill-yellow-400 shrink-0" />
    <p className="text-[11px] text-[#0A084799] font-medium">{form.helperText}</p>
  </div>
</div>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => handleAction("Delete Book")}
          className="px-5 py-3 bg-white border border-red-400 text-red-500 rounded-md text-xs font-semibold flex items-center gap-2 hover:bg-red-50 cursor-pointer"
        >
          <TrashRedIconSvg size={16} /> Delete Book
        </button>
        <button
          type="button"
          onClick={() => handleAction("Save & Publish")}
          className="flex-1 py-3 bg-[#001984] text-white rounded-md text-xs font-semibold flex items-center justify-center gap-2 hover:bg-[#001266] cursor-pointer"
        >
          <FiCheck size={16} /> Save & Publish
        </button>
      </div>
    </div>
  );
}