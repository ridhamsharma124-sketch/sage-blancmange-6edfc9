import { useState } from "react";
import {
  PiBookOpen,
  PiCaretDown,
  PiCaretLeft,
  PiCaretRight,
  PiCheckCircle,
  PiDownloadSimple,
  PiGift,
  PiInfo,
  PiMagnifyingGlass,
  PiMusicNotes,
  PiPencilSimple,
  PiPlay,
  PiPlus,
  PiQuestion,
  PiSlidersHorizontal,
  PiTrash,
  PiTrophy,
  PiXCircle,
} from "react-icons/pi";

/* ==========================================================================
   DESIGN TOKENS (taken from the Figma inspect panel)
   Text colour in Figma is always #0A0847 with different opacity:
     100% -> headings / values,  80% -> table header & filters,  60% -> muted
   ========================================================================== */
const NAVY = "#001984"; // icons / primary button (Figma vector colour)
const INK = "#0A0847"; // base text colour
const BORDER = "#E9E9E9"; // table line-color (0.75px)

/* ==========================================================================
   MOCK DATA
   ========================================================================== */
const ICONS = {
  note: { Icon: PiMusicNotes, bg: "#E8E7FF", color: "#0926FD" },
  quiz: { Icon: PiQuestion, bg: "#E8E7FF", color: "#0926FD" },
  correct: { Icon: PiCheckCircle, bg: "#E8F7EC", color: "#2BB24C" },
  wrong: { Icon: PiXCircle, bg: "#E8E7FF", color: "#0926FD" },
  trophy: { Icon: PiTrophy, bg: "#FDF1E3", color: "#F59E0B" },
  gift: { Icon: PiGift, bg: "#FDF1E3", color: "#F59E0B" },
  book: { Icon: PiBookOpen, bg: "#E8F7EC", color: "#2F9E5E" },
};

const CATEGORY_ORDER = ["Background Music", "Quiz", "Rewards", "Scripture", "Word Search", "System"];

const mk = (id, title, category, icon, duration, enabled = true) => ({
  id,
  title,
  category,
  icon,
  file: "faithly_theme.mp3",
  duration,
  size: "8.4 MB",
  enabled,
});

const AUDIO_ROWS = [
  mk(1, "App Background Music", "Background Music", "note", "—"),
  mk(2, "Quiz Background Music", "Quiz", "quiz", "02:18"),
  mk(3, "Correct Answer", "Quiz", "correct", "00:03"),
  mk(4, "Wrong Answer", "Quiz", "wrong", "00:02"),
  mk(5, "Level Complete", "Rewards", "trophy", "00:07"),
  mk(6, "Reward Collected", "Rewards", "gift", "00:07"),
  mk(7, "Verse Released", "Scripture", "book", "00:07"),
  mk(8, "Prayer Amen", "Scripture", "book", "00:07"),
];

/* ==========================================================================
   STAT CARD ICONS — custom SVGs traced from the Figma icons
   (Phosphor icons look different, so these are drawn by hand)
   ========================================================================== */
const svgProps = (size, style) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.9,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  style,
});

function NoteIcon({ size = 36, style }) {
  return (
    <svg {...svgProps(size, style)}>
      <circle cx="6.5" cy="18" r="2.6" />
      <circle cx="17.5" cy="16.5" r="2.6" />
      <path d="M9.1 18V5.2L20.1 3.3V16.5" />
      <path d="M9.1 8.6L20.1 6.8" />
    </svg>
  );
}

function CheckRingIcon({ size = 36, style }) {
  return (
    <svg {...svgProps(size, style)}>
      <path d="M20.2 7.6A9.3 9.3 0 1 1 16.4 3.8" />
      <path
        d="M7 12.3L8.4 10.9L10.8 13L18.9 6L20.2 7.3L10.8 16Z"
        fill="currentColor"
        strokeWidth="0.6"
      />
    </svg>
  );
}

function SpeakerOffIcon({ size = 36, style }) {
  return (
    <svg {...svgProps(size, style)}>
      <path d="M4 9.6H7.4L12 5.6V18.4L7.4 14.4H4Z" />
      <path d="M15.6 9.2A4 4 0 0 1 15.6 14.8" />
      <path d="M18.6 6.4A8 8 0 0 1 18.6 17.6" />
      <path d="M4 3.5L20 20.5" />
    </svg>
  );
}

function StackIcon({ size = 36, style }) {
  return (
    <svg {...svgProps(size, style)}>
      <path d="M12 1.8L21.4 7.2V16.8L12 22.2L2.6 16.8V7.2Z" />
      <path d="M2.6 7.2L12 12.6L21.4 7.2" />
      <path d="M2.6 10.9L12 16.3L21.4 10.9" />
      <path d="M2.6 14.4L12 19.8L21.4 14.4" />
    </svg>
  );
}

const STAT_META = [
  { bg: "#E8E7FF", color: "#0926FD", Icon: NoteIcon, label: "Total Audio" },
  { bg: "#E8F7EC", color: "#2BA84A", Icon: CheckRingIcon, label: "Enabled" },
  { bg: "#FBF0E4", color: "#D4570F", Icon: SpeakerOffIcon, label: "Disabled" },
  { bg: "#E8E7FF", color: "#1D12E0", Icon: StackIcon, label: "Storage Used" },
];

/* ==========================================================================
   SMALL UI BUILDING BLOCKS
   ========================================================================== */
function Switch({ checked, onChange, onClass = "bg-[#159904]", offClass = "bg-[#D1D5DB]" }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      aria-pressed={checked}
      className={`relative h-[18px] w-[32px] shrink-0 cursor-pointer rounded-full transition-colors ${
        checked ? onClass : offClass
      }`}
    >
      <span
        className={`absolute top-[2px] h-[14px] w-[14px] rounded-full bg-white shadow transition-all ${
          checked ? "left-[16px]" : "left-[2px]"
        }`}
      />
    </button>
  );
}

function Select({ value, onChange, options = [], className = "" }) {
  return (
    <span className="relative block">
      <select
        value={value}
        onChange={onChange}
        className={`h-[40px] w-full cursor-pointer appearance-none rounded-[8px] border border-[#E5E4EC] bg-white pl-[12px] pr-[30px] text-[12px] font-medium leading-none text-[#0A0847]/80 outline-none transition focus:border-[#001984] ${className}`}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <PiCaretDown
        size={12}
        className="pointer-events-none absolute right-[10px] top-1/2 -translate-y-1/2 text-[#0A0847]/70"
      />
    </span>
  );
}

/* Dense waveform: ~44 thin bars like the Figma preview (≈133px wide) */
const WAVE = Array.from({ length: 44 }, (_, i) => {
  const v = Math.abs(Math.sin(i * 1.7) * 9 + Math.cos(i * 0.6) * 7);
  return Math.max(4, Math.min(24, Math.round(v + 6)));
});

function Waveform() {
  return (
    <div className="flex h-[24px] w-[133px] shrink-0 items-center gap-[1px]">
      {WAVE.map((h, i) => (
        <span
          key={i}
          className="w-[2px] shrink-0 rounded-full bg-[#4F5BD5]"
          style={{ height: `${h}px` }}
        />
      ))}
    </div>
  );
}

/* ==========================================================================
   MAIN PAGE
   ========================================================================== */
export default function SoundAudio() {
  const [rows, setRows] = useState(AUDIO_ROWS);
  const [tab, setTab] = useState("All");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [status, setStatus] = useState("All Status");
  const [drawerRow, setDrawerRow] = useState(null);
  const [pageSize, setPageSize] = useState(5); // display label only (mock pagination like Figma)
  const [page, setPage] = useState(1);

  const tabs = ["All", ...CATEGORY_ORDER];

  // Mock numbers exactly as in Figma (only 8 sample rows are listed below)
  const STATS = STAT_META.map((m, i) => ({ ...m, value: [15, 13, 2, "48.6 MB"][i] }));

  const filteredRows = rows.filter((row) => {
    const matchesTab = tab === "All" || row.category === tab;
    const q = search.trim().toLowerCase();
    const matchesSearch =
      !q ||
      row.title.toLowerCase().includes(q) ||
      row.category.toLowerCase().includes(q) ||
      row.file.toLowerCase().includes(q);
    const matchesCategory = category === "All Categories" || row.category === category;
    const matchesStatus =
      status === "All Status" || (status === "Enabled" ? row.enabled : !row.enabled);
    return matchesTab && matchesSearch && matchesCategory && matchesStatus;
  });

  const isDefaultView =
    tab === "All" && !search.trim() && category === "All Categories" && status === "All Status";

  // Figma shows all 8 sample rows + static pages 1-5 (mock pagination)
  const totalPages = 5;
  const safePage = page;
  const pagedRows = filteredRows;

  const toggleRow = (id) =>
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r)));

  const resetPage = (fn) => (v) => {
    fn(v);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] p-6 font-[Inter]">
      {/* 1. Header row */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-semibold leading-none text-[#0A0847]">
            Audio Management
          </h1>
          <p className="mt-[12px] text-[16px] font-medium leading-none text-[#0A0847]/60">
            Manage music and sound effects across the entire app.
          </p>
        </div>
        <div className="flex items-center gap-[16px]">
          <button
            type="button"
            className="flex h-[44px] cursor-pointer items-center gap-[10px] rounded-[8px] border border-[#E5E4EC] bg-white px-[20px] text-[14px] font-semibold leading-none text-[#0A0847]/80 transition hover:border-[#001984]"
          >
            <PiSlidersHorizontal size={18} color={NAVY} />
            Audio Settings
          </button>
          <button
            type="button"
            className="flex h-[44px] cursor-pointer items-center gap-[10px] rounded-[8px] bg-[#001984] px-[20px] text-[14px] font-semibold leading-none text-white transition hover:bg-[#0a1c68]"
          >
            <PiPlus size={18} />
            Upload Audio
          </button>
        </div>
      </div>

      {/* 2. Stat cards — Figma: 255x127, radius 8, border 1px, pl 16 / pr 29, gap 10 */}
      <div className="mt-[20px] grid grid-cols-1 gap-[20px] sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map(({ bg, color, Icon, label, value }) => (
          <div
            key={label}
            className="flex h-[127px] w-full items-center gap-[10px] rounded-[8px] border border-[#E5E4EC] bg-white pl-[16px] pr-[29px]"
          >
            <div
              className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-[16px]"
              style={{ backgroundColor: bg }}
            >
              <Icon size={36} style={{ color }} />
            </div>
            <div className="min-w-0">
              <p className="truncate text-[14px] font-semibold leading-none text-[#0A0847]">
                {label}
              </p>
              <p className="mt-[12px] truncate text-[22px] font-semibold leading-none text-[#0A0847]">
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Info text (no background in Figma) */}
      <div className="mt-[16px] flex items-center gap-[8px] text-[12px] font-semibold leading-none text-[#0A0847]/60">
        <PiInfo size={16} className="shrink-0 text-[#0A0847]/70" />
        Featured Date appears on the homepage card and both experience screens.
      </div>

      {/* 4. Search + filters */}
      <div className="mt-[16px] flex flex-wrap items-center justify-between gap-[12px]">
        <div className="relative w-[330px] max-w-full">
          <PiMagnifyingGlass
            size={16}
            className="pointer-events-none absolute left-[14px] top-1/2 -translate-y-1/2 text-[#0A0847]/70"
          />
          <input
            type="text"
            placeholder="Search audio or event..."
            value={search}
            onChange={(e) => resetPage(setSearch)(e.target.value)}
            className="h-[40px] w-full rounded-[8px] border border-[#E5E4EC] bg-white pl-[40px] pr-[12px] text-[13px] font-medium leading-none text-[#0A0847] outline-none transition placeholder:text-[#0A0847]/60 focus:border-[#001984]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-[12px]">
          <div className="w-[160px]">
            <Select
              value={category}
              onChange={(e) => resetPage(setCategory)(e.target.value)}
              options={["All Categories", ...CATEGORY_ORDER]}
            />
          </div>
          <div className="w-[130px]">
            <Select
              value={status}
              onChange={(e) => resetPage(setStatus)(e.target.value)}
              options={["All Status", "Enabled", "Disabled"]}
            />
          </div>
          <span className="text-[12px] font-semibold leading-none text-[#001984]">
            {`${isDefaultView ? 15 : filteredRows.length} audio files`}
          </span>
        </div>
      </div>

      {/* 5. White card: tabs + table + pagination (all inside one card in Figma) */}
      <div className="mt-[16px] overflow-hidden rounded-[10px] border border-[#E5E4EC] bg-white">
        {/* Tabs */}
        <div className="flex items-center overflow-x-auto px-[16px] pt-[16px]">
          {tabs.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => resetPage(setTab)(t)}
              className={`relative cursor-pointer whitespace-nowrap px-[14px] pb-[12px] pt-[4px] text-[12px] leading-none transition ${
                tab === t
                  ? "font-semibold text-[#001984]"
                  : "font-medium text-[#0A0847]/60 hover:text-[#001984]"
              }`}
            >
              {t}
              {tab === t && (
                <span className="absolute bottom-0 left-[8px] right-[8px] h-[3px] rounded-full bg-[#001984]" />
              )}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="mt-[8px] overflow-x-auto">
          <table className="w-full min-w-[960px] border-collapse text-left">
            <thead>
              <tr className="bg-[#F8F9FC]">
                {["Event & Usage", "Audio File", "Preview", "Duration", "Size", "Status", "Actions"].map(
                  (col) => (
                    <th
                      key={col}
                      className={`h-[49px] whitespace-nowrap px-[16px] text-[14px] font-medium leading-none text-[#0A0847]/80 ${
                        col === "Actions" ? "text-center" : "text-left"
                      }`}
                    >
                      {col}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {pagedRows.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-[16px] py-[40px] text-center text-[13px] text-[#0A0847]/60"
                  >
                    No audio files found.
                  </td>
                </tr>
              ) : (
                pagedRows.map((row) => {
                  const { Icon, bg, color } = ICONS[row.icon] || ICONS.quiz;
                  return (
                    <tr key={row.id} className="h-[62px] border-b-[0.75px] border-[#E9E9E9]">
                      <td className="whitespace-nowrap px-[16px]">
                        <div className="flex items-center gap-[10px]">
                          <div
                            className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[8px]"
                            style={{ backgroundColor: bg }}
                          >
                            <Icon size={24} weight="bold" style={{ color }} />
                          </div>
                          <div>
                            <p className="text-[14px] font-medium leading-none text-[#0A0847]">
                              {row.title}
                            </p>
                            <p className="mt-[6px] text-[12px] font-normal leading-none text-[#0A0847]/60">
                              {row.category}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-[16px] text-[12px] font-normal italic leading-none text-[#0A0847]/60">
                        {row.file}
                      </td>
                      <td className="whitespace-nowrap px-[16px]">
                        <div className="flex items-center gap-[10px]">
                          <button
                            type="button"
                            aria-label="Play preview"
                            className="flex h-[20px] w-[20px] shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#001984] text-white transition hover:bg-[#0a1c68]"
                          >
                            <PiPlay size={10} weight="fill" />
                          </button>
                          <Waveform />
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-[16px] text-[12px] font-semibold leading-none text-[#0A0847]">
                        {row.duration}
                      </td>
                      <td className="whitespace-nowrap px-[16px] text-[12px] font-semibold leading-none text-[#0A0847]">
                        {row.size}
                      </td>
                      <td className="whitespace-nowrap px-[16px]">
                        <div className="flex items-center gap-[8px]">
                          <Switch checked={row.enabled} onChange={() => toggleRow(row.id)} />
                          <span
                            className={`text-[12px] font-semibold leading-none ${
                              row.enabled ? "text-[#159904]" : "text-[#9CA3AF]"
                            }`}
                          >
                            {row.enabled ? "Enable" : "Disable"}
                          </span>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-[16px]">
                        <div className="flex items-center justify-center gap-[12px]">
                          <button
                            type="button"
                            onClick={() => setDrawerRow(row)}
                            aria-label="Edit audio"
                            className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[6px] border border-[#D6DBFF] bg-white text-[#0926FD] transition hover:bg-[#F3F4FB]"
                          >
                            <PiPencilSimple size={16} />
                          </button>
                          <button
                            type="button"
                            aria-label="Download"
                            className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[6px] border border-[#E5E4EC] bg-white text-[#0A0847] transition hover:bg-[#F3F4FB]"
                          >
                            <PiDownloadSimple size={16} />
                          </button>
                          <button
                            type="button"
                            aria-label="Delete"
                            className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[6px] border border-[#F8C9D3] bg-[#FDECEF] text-[#E11D48] transition hover:bg-[#FBD5DD]"
                          >
                            <PiTrash size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination footer (inside the card) */}
        <div className="flex flex-col items-center justify-between gap-[12px] px-[16px] py-[16px] sm:flex-row">
          <div className="flex items-center gap-[8px] text-[12px] font-medium leading-none text-[#0A0847]/80">
            <span>Display</span>
            <span className="relative">
              <select
                aria-label="Entries per page"
                value={String(pageSize).padStart(2, "0")}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setPage(1);
                }}
                className="h-[28px] w-[56px] cursor-pointer appearance-none rounded-[4px] border border-[#E5E4EC] bg-white pl-[10px] pr-[22px] text-[12px] font-medium text-[#0A0847]/80 outline-none"
              >
                <option value="05">05</option>
                <option value="10">10</option>
                <option value="25">25</option>
              </select>
              <PiCaretDown
                size={11}
                className="pointer-events-none absolute right-[6px] top-1/2 -translate-y-1/2 text-[#0A0847]/70"
              />
            </span>
            <span>Entries</span>
          </div>

          <div className="flex items-center gap-[8px]">
            <button
              type="button"
              aria-label="Previous page"
              disabled={safePage === 1}
              onClick={() => setPage(safePage - 1)}
              className="flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded-[4px] border border-[#E5E4EC] bg-white text-[#0A0847]/40 transition disabled:cursor-not-allowed enabled:border-[#001984] enabled:text-[#001984]"
            >
              <PiCaretLeft size={12} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setPage(num)}
                className={`flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded-[4px] text-[12px] font-medium leading-none transition ${
                  num === safePage
                    ? "bg-[#001984] font-semibold text-white"
                    : "bg-white text-[#0A0847]/80 hover:bg-[#F3F4FB]"
                }`}
              >
                {num}
              </button>
            ))}
            <button
              type="button"
              aria-label="Next page"
              disabled={safePage === totalPages}
              onClick={() => setPage(safePage + 1)}
              className="flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded-[4px] border border-[#E5E4EC] bg-white text-[#0A0847]/40 transition disabled:cursor-not-allowed enabled:border-[#001984] enabled:text-[#001984]"
            >
              <PiCaretRight size={12} />
            </button>
          </div>
        </div>
      </div>

      {drawerRow && <EditDrawer row={drawerRow} onClose={() => setDrawerRow(null)} />}
    </div>
  );
}

/* ==========================================================================
   EDIT AUDIO MODAL — values taken from the Figma inspect panel
   Panel 260px wide · labels 12px/600 · values 12px/500 80% · sub text 10px
   Input 40px high, radius 8, border 1px #E2DFFC · section gaps 16 / 28
   ========================================================================== */
const MODAL_BORDER = "border-[#E2DFFC]";

function EditDrawer({ row, onClose }) {
  const [form, setForm] = useState({
    event: row.title,
    displayName: `${row.title} Chime`,
    fileName: "correct_chime.wav",
    fileSize: "• 420 KB",
    loop: false,
    volume: 80,
    fadeIn: "0.0s",
    fadeOut: "0.0s",
    enabled: row.enabled,
  });

  const upd = (key) => (e) =>
    setForm((p) => ({ ...p, [key]: e && e.target ? e.target.value : e }));

  const inputCls = `h-[40px] w-full rounded-[8px] border ${MODAL_BORDER} bg-white px-[14px] text-[12px] font-medium leading-none text-[#0A0847]/80 outline-none transition focus:border-[#001984]`;

  const Divider = () => <div className="h-px w-full bg-[#E9E9E9]" />;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[6px]"
        onClick={onClose}
        aria-hidden
      />
      <aside className="fixed left-1/2 top-1/2 z-50 flex max-h-[92vh] w-[260px] max-w-[calc(100vw-32px)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-y-auto rounded-[12px] bg-white px-[16px] pb-[24px] pt-[20px] shadow-[0_24px_48px_rgba(0,0,0,0.25)]">
        {/* Header */}
        <div className="flex items-start justify-between gap-[12px]">
          <div className="min-w-0">
            <h3 className="text-[14px] font-semibold leading-[15px] text-[#0A0847]">Edit Audio</h3>
            <p className="text-[10px] font-normal leading-[15px] text-[#0A0847]">{row.title}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-[22px] w-[22px] shrink-0 cursor-pointer items-center justify-center text-[#001984] transition hover:opacity-70"
          >
            <PiXCircle size={22} weight="bold" />
          </button>
        </div>

        {/* Fields */}
        <div className="mt-[16px] space-y-[16px]">
          <Field label="Event / Usage">
            <Select
              value={form.event}
              onChange={upd("event")}
              options={[
                row.title,
                ...AUDIO_ROWS.map((r) => r.title).filter((t) => t !== row.title),
              ]}
              className="!h-[40px] !border-[#E2DFFC] !pl-[14px]"
            />
          </Field>

          <Field label="Display Name">
            <input value={form.displayName} onChange={upd("displayName")} className={inputCls} />
          </Field>

          <Field label="Audio File">
            <div className={`flex items-center justify-between gap-[8px] rounded-[8px] border ${MODAL_BORDER} bg-white p-[12px]`}>
              <div className="flex min-w-0 flex-col items-center gap-[8px]">
                <div className="flex items-center gap-[12px]">
                  <div className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full bg-[#E8E7FF] text-[#001984]">
                    <PiMusicNotes size={16} weight="bold" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-[10px] font-medium leading-[13px] text-[#0A0847]/80">
                      {form.fileName}
                    </p>
                    <p className="text-[10px] font-normal leading-[13px] text-[#0A0847]/60">
                      {form.fileSize}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className={`h-[30px] w-[76px] cursor-pointer rounded-[8px] border ${MODAL_BORDER} bg-[#F3F5F8] text-[12px] font-medium leading-none text-[#0A0847] transition hover:bg-[#E9ECF2]`}
                >
                  Replace
                </button>
              </div>
              <button
                type="button"
                aria-label="Play file"
                className="flex h-[24px] w-[24px] shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-[#001984] text-[#001984] transition hover:bg-[#F3F4FB]"
              >
                <PiPlay size={10} weight="fill" />
              </button>
            </div>
          </Field>

          <p className="text-[12px] font-medium leading-[1.3] text-[#0A0847]/60">
            Accepted format: MP3, WAV or M4A • Max 20 MB
          </p>
        </div>

        <div className="mt-[16px]">
          <Divider />
        </div>

        {/* Playback */}
        <div className="flex items-center justify-between py-[28px]">
          <div>
            <p className="text-[12px] font-semibold leading-[15px] text-[#0A0847]">Playback</p>
            <p className="text-[12px] font-semibold leading-[15px] text-[#0A0847]/60">Loop</p>
          </div>
          <Switch
            checked={form.loop}
            onChange={upd("loop")}
            onClass="bg-[#34A83A]"
            offClass="bg-[#9B99B8]"
          />
        </div>

        <Divider />

        {/* Volume + fades */}
        <div className="space-y-[16px] pb-[16px] pt-[28px]">
          <Field label="Default Volume">
            <div className="flex items-center gap-[8px]">
              <input
                type="range"
                min={0}
                max={100}
                value={form.volume}
                onChange={upd("volume")}
                className="h-[6px] w-full cursor-pointer accent-[#001984]"
              />
              <span className={`shrink-0 rounded-[4px] border ${MODAL_BORDER} px-[8px] py-[5px] text-[12px] font-semibold leading-none text-[#001984]/80`}>
                {form.volume}%
              </span>
            </div>
          </Field>

          <div className="flex gap-[12px]">
            <Field label="Fade In" className="min-w-0 flex-1">
              <input type="text" value={form.fadeIn} onChange={upd("fadeIn")} className={inputCls} />
            </Field>
            <Field label="Fade Out" className="min-w-0 flex-1">
              <input type="text" value={form.fadeOut} onChange={upd("fadeOut")} className={inputCls} />
            </Field>
          </div>
        </div>

        <Divider />

        {/* Status */}
        <div className="flex items-center justify-between py-[16px]">
          <div>
            <p className="text-[12px] font-semibold leading-[15px] text-[#0A0847]">Status</p>
            <p className="text-[12px] font-semibold leading-[15px] text-[#0A0847]/60">Enabled</p>
          </div>
          <Switch
            checked={form.enabled}
            onChange={upd("enabled")}
            onClass="bg-[#34A83A]"
            offClass="bg-[#9B99B8]"
          />
        </div>

        <Divider />

        {/* Footer buttons */}
        <div className="mt-[16px] flex items-center gap-[12px]">
          <button
            type="button"
            onClick={onClose}
            className={`h-[43px] w-[96px] shrink-0 cursor-pointer rounded-[8px] border ${MODAL_BORDER} bg-white text-[14px] font-semibold leading-none text-[#0A0847] transition hover:bg-[#F3F4FB]`}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onClose}
            className="h-[43px] min-w-0 flex-1 cursor-pointer rounded-[8px] bg-[#001984] text-[14px] font-semibold leading-none text-white transition hover:bg-[#0a1c68]"
          >
            Save Changes
          </button>
        </div>
      </aside>
    </>
  );
}

function Field({ label, className = "", children }) {
  return (
    <div className={className}>
      <label className="mb-[10px] block text-[12px] font-semibold leading-[15px] text-[#0A0847]">
        {label}
      </label>
      {children}
    </div>
  );
}