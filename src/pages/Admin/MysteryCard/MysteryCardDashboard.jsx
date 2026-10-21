import { useNavigate } from "react-router-dom";
import {
  LuChartBar,
  LuChevronDown,
  LuChevronLeft,
  LuChevronRight,
  LuCircleCheck,
  LuEllipsisVertical,
  LuEye,
  LuEyeOff,
  LuFileText,
  LuPencil,
  LuPlus,
  LuSearch,
} from "react-icons/lu";
import davidAndGoliath from "../../../assets/David and Goliath.png";
import hiddenTreasure from "../../../assets/Hidden Treasure.png";
import strengthForTheJourney from "../../../assets/Strength for the Journey.png";
import didYouKnow from "../../../assets/Did You Know.png";
import godsPromise from "../../../assets/God's Promise.png";

/* ==========================================================================
   TOKENS
   ========================================================================== */
const BORDER = "#E2DFFC";
const DEEP_NAVY = "#00007A";
const PAGE_BG = "#F8F8FF";

const CARD = "rounded-[7.5px] border-[0.75px] bg-white";

const GRID =
  "grid items-center gap-x-[10px] grid-cols-[minmax(0,1fr)_105px_64px_minmax(0,1fr)_96px_116px_112px]";

const ROWS = [
  {
    title: "David and Goliath",
    subtitle: "1 Samuel 17:45",
    category: "Bible Hero",
    testament: "OT",
    appearsIn: ["Quiz", "Group Play"],
    reward: "100 Points",
    status: "Active",
    image: davidAndGoliath,
  },
  {
    title: "Hidden Treasure",
    subtitle: "Psalm 119:18",
    category: "Scripture Insight",
    testament: "OT",
    appearsIn: ["Quiz", "Word Search"],
    reward: "50 Points",
    status: "Active",
    image: hiddenTreasure,
  },
  {
    title: "Strength for the Journey",
    subtitle: "James 4:8",
    category: "Hidden Wisdom",
    testament: "NT",
    appearsIn: ["Quiz", "Broad Spectrum"],
    reward: "75 Points",
    status: "Draft",
    image: strengthForTheJourney,
  },
  {
    title: "Did You Know?",
    subtitle: "1 Samuel 17:45",
    category: "Bible Hero",
    testament: "OT",
    appearsIn: ["Broad Spectrum"],
    reward: "100 Points",
    status: "Unpublished",
    image: didYouKnow,
  },
  {
    title: "God's Promise",
    subtitle: "Isaiah 41:10",
    category: "Scripture Insight",
    testament: "OT",
    appearsIn: ["Quiz", "Play With Me"],
    reward: "50 Points",
    status: "Active",
    image: godsPromise,
  },
];

/* ==========================================================================
   STAT CARD
   ========================================================================== */
const STATS = [
  {
    tint: "rgba(19, 65, 227, 0.10)",
    icon: "#1341E3",
    Glyph: LuChartBar,
    label: "Total Cards",
    value: "128",
    caption: "All time",
  },
  {
    tint: "rgba(40, 164, 82, 0.10)",
    icon: "#28A452",
    Glyph: LuCircleCheck,
    label: "Active",
    value: "82",
    caption: "64%",
  },
  {
    tint: "rgba(198, 84, 8, 0.10)",
    icon: "#C65408",
    Glyph: LuFileText,
    label: "Drafts",
    value: "28",
    caption: "22%",
  },
  {
    tint: "rgba(85, 85, 85, 0.10)",
    icon: "#555555",
    Glyph: LuEyeOff,
    label: "Unpublished",
    value: "18",
    caption: "14%",
  },
];

function StatCard({ stat }) {
  const { tint, icon, Glyph, label, value, caption } = stat;
  return (
    <div
      className="flex h-[105px] min-w-0 items-center gap-[10px] rounded-[8px] border border-[#E2DFFC] bg-white px-[16px]"
    >
      <div
        className="flex h-[62px] w-[62px] shrink-0 items-center justify-center rounded-[18px] p-[7px]"
        style={{ background: tint }}
      >
        <Glyph size={28} style={{ color: icon }} />
      </div>

      <div className="flex min-w-0 flex-col gap-[8px]">
        <p className="truncate text-[14px] font-medium text-[#0A0847]">{label}</p>
        <p className="text-[24px] leading-none font-bold text-[#0A0847]">{value}</p>
        <p className="text-[10px] font-semibold text-[#0A0847]/60">{caption}</p>
      </div>
    </div>
  );
}

/* ==========================================================================
   FILTER SELECT BUTTON
   ========================================================================== */
function FilterSelect({ label }) {
  return (
    <button
      type="button"
      className="flex h-[38px] w-[111px] cursor-pointer items-center justify-between rounded-[7.47px] border border-[#E2DFFC] bg-white px-[12px] py-[10px] text-[14px] text-[#0A0847]"
      style={{ gap: 10 }}
    >
      {label}
      <LuChevronDown size={15} className="shrink-0 text-[#0A0847]" />
    </button>
  );
}

/* ==========================================================================
   BADGES
   ========================================================================== */
const TESTAMENT_STYLE = {
  OT: { bg: "rgba(33, 172, 28, 0.10)", fg: "#21AC1C" },
  NT: { bg: "#E6E8FB", fg: "#3B4BDB" },
};

const STATUS_STYLE = {
  Active: { bg: "#E6F6EA", fg: "#21AC1C" },
  Draft: { bg: "#FBE9DC", fg: "#C65408" },
  Unpublished: { bg: "#EDEDED", fg: "#666666" },
};

function TestamentBadge({ value }) {
  const s = TESTAMENT_STYLE[value];
  return (
    <span
      className="inline-flex h-[25px] items-center justify-center rounded-[4px] px-[12px] py-[4px] text-[12px] font-medium"
      style={{ background: s.bg, color: s.fg }}
    >
      {value}
    </span>
  );
}

function CategoryBadge({ value }) {
  return (
    <span
      className="inline-flex h-[42px] w-[105px] items-center justify-center rounded-[8px] border px-[12px] py-[4px] text-center text-[12px] leading-[1.2] font-medium"
      style={{ background: "rgba(19, 65, 227, 0.10)", borderColor: "rgba(19, 65, 227, 0.30)", color: "#1341E3" }}
    >
      {value}
    </span>
  );
}

function StatusBadge({ value }) {
  const s = STATUS_STYLE[value];
  return (
    <span
      className="inline-flex h-[25px] items-center justify-center rounded-[4px] px-[10px] py-[3px] text-[12px] font-medium"
      style={{ background: s.bg, color: s.fg }}
    >
      {value}
    </span>
  );
}

const CHIP =
  "inline-flex h-[30px] items-center rounded-[7.47px] border border-[#E2DFFC] bg-white px-[14px] text-[12px] text-[#0A0847]";

function ActionGroup({ title, onEdit }) {
  const box =
    "flex h-[32px] flex-1 cursor-pointer items-center justify-center rounded-[7.47px] border border-[#E2DFFC] bg-white text-[#00007A]";
  return (
    <div className="flex h-[32px] w-[112px] items-center gap-[10px]">
      <button type="button" aria-label={`View ${title}`} className={box}>
        <LuEye size={15} />
      </button>
      <button type="button" aria-label={`Edit ${title}`} onClick={onEdit} className={box}>
        <LuPencil size={15} />
      </button>
      <button type="button" aria-label={`More actions for ${title}`} className={box}>
        <LuEllipsisVertical size={15} />
      </button>
    </div>
  );
}

/* ==========================================================================
   PAGINATION
   ========================================================================== */
function Pagination() {
  const pages = ["1", "2", "3", "4", "5"];
  return (
    <div className="flex items-center" style={{ gap: 6 }}>
      <button
        type="button"
        disabled
        aria-label="Previous page"
        className="flex h-[26px] w-[26px] cursor-not-allowed items-center justify-center rounded-[4px]"
      >
        <LuChevronLeft size={14} style={{ color: "#C4C6D4" }} />
      </button>

      {pages.map((p) => {
        const active = p === "1";
        return (
          <button
            key={p}
            type="button"
            className="flex h-[26px] w-[26px] cursor-pointer items-center justify-center rounded-[4px] text-[12px]"
            style={
              active
                ? { background: DEEP_NAVY, color: "#FFFFFF" }
                : { color: DEEP_NAVY, background: "#FFFFFF" }
            }
          >
            {p}
          </button>
        );
      })}

      <button
        type="button"
        aria-label="Next page"
        className="flex h-[26px] w-[26px] cursor-pointer items-center justify-center rounded-[4px] border border-[#00007A]"
      >
        <LuChevronRight size={14} style={{ color: DEEP_NAVY }} />
      </button>
    </div>
  );
}

/* ==========================================================================
   PAGE
   ========================================================================== */
export default function MysteryCardDashboard() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen w-full p-6 font-inter"
      style={{ background: PAGE_BG, fontFamily: "Inter, sans-serif" }}
    >
      <div className="w-full min-w-0">
        {/* ---- header ---- */}
        <div className="flex flex-wrap items-start justify-between gap-[16px]">
          <div>
            <h1 className="text-[24px] font-bold text-[#0A0847]">Mystery Card Dashboard</h1>
            <p className="mt-2 text-[15px] text-[#0A0847]/70">
              Overview and management of all Mystery Cards.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/admin/mystery-card/create")}
            className="flex h-[42px] cursor-pointer items-center gap-[16px] rounded-[8px] px-[20px] text-[14px] font-semibold text-white"
            style={{ background: DEEP_NAVY }}
          >
            <LuPlus size={16} strokeWidth={2.4} /> New Card
          </button>
        </div>

        {/* ---- stat cards ---- */}
        <div className="mt-6 grid grid-cols-4 gap-[16px]">
          {STATS.map((s) => (
            <StatCard key={s.label} stat={s} />
          ))}
        </div>

        {/* ---- filter row ---- */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-[10px]">
          <div className="flex h-[42px] w-[408px] max-w-full items-center gap-[16px] rounded-[7.47px] border border-[#E2DFFC] bg-white px-[12px] py-[10px]">
            <LuSearch size={16} className="shrink-0 text-[#0A0847]/60" />
            <input
              type="text"
              placeholder="Search cards..."
              className="h-full min-w-0 flex-1 border-0 bg-transparent text-[14px] text-[#0A0847] outline-none placeholder:text-[#0A0847]/50"
            />
          </div>

          <div className="flex flex-wrap items-center gap-[10px]">
            <FilterSelect label="Testament" />
            <FilterSelect label="Activity" />
            <FilterSelect label="Status" />
            <button
              type="button"
              className="h-[38px] cursor-pointer rounded-[7.47px] px-[24px] text-[14px] font-medium text-[#00007A]"
              style={{ background: "#E6E7F7" }}
            >
              Reset
            </button>
          </div>
        </div>

        {/* ---- table card ---- */}
        <div
          className={`${CARD} mt-5 flex min-h-[508px] w-full flex-col overflow-hidden p-[14px]`}
          style={{ borderColor: BORDER }}
        >
          {/* header row */}
          <div
            className={`${GRID} shrink-0 rounded-[4px] px-3 text-center text-[13px] font-medium text-[#0A0847]`}
            style={{ height: 46, background: "#F3F4FC" }}
          >
            <span>Card</span>
            <span>Category</span>
            <span>Testament</span>
            <span>Appears In</span>
            <span>Reward</span>
            <span>Status</span>
            <span>Actions</span>
          </div>

          {/* body rows */}
          {ROWS.map((r) => (
            <div
              key={r.title}
              className={`${GRID} shrink-0 border-b border-[#EEF0F8] px-3`}
              style={{ height: 66 }}
            >
              {/* card */}
              <div className="flex min-w-0 items-center" style={{ gap: 12 }}>
                <img
                  src={r.image}
                  alt=""
                  className="h-[38px] w-[38px] shrink-0 rounded-[8px] bg-[#F1F2F8] object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate text-[12px] font-medium text-[#0A0847]">{r.title}</p>
                  <p className="mt-[3px] truncate text-[11px] text-[#0A0847]/60">{r.subtitle}</p>
                </div>
              </div>

              {/* category */}
              <span className="flex justify-center">
                <CategoryBadge value={r.category} />
              </span>

              {/* testament */}
              <span className="flex justify-center">
                <TestamentBadge value={r.testament} />
              </span>

              {/* appears in */}
              <div className="flex flex-wrap items-center gap-[10px]">
                {r.appearsIn.map((a) => (
                  <span key={a} className={CHIP}>
                    {a}
                  </span>
                ))}
              </div>

              {/* reward */}
              <span className="text-center text-[12px] font-medium whitespace-nowrap text-[#0A0847]">
                {r.reward}
              </span>

              {/* status */}
              <span className="flex justify-center">
                <StatusBadge value={r.status} />
              </span>

              {/* actions */}
              <div className="flex justify-center">
                <ActionGroup title={r.title} onEdit={() => navigate("/admin/mystery-card/edit")} />
              </div>
            </div>
          ))}

          {/* footer */}
          <div className="mt-auto flex flex-wrap items-center justify-between gap-[10px] px-4 py-4">
            <div className="flex items-center" style={{ gap: 8 }}>
              <span className="text-[13px] text-[#0A0847]">Display</span>
              <select
                defaultValue="10"
                aria-label="Display"
                className="h-[26px] cursor-pointer rounded-[4px] border-[0.75px] border-[#E2DFFC] bg-white px-2 text-[13px] text-[#0A0847] outline-none"
              >
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
              <span className="text-[13px] text-[#0A0847]">Entries</span>
            </div>

            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
}