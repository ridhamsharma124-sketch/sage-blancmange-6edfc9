import { useState } from "react";
import {
  LuPlus,
  LuPencil,
  LuTrash2,
  LuChevronDown,
  LuChevronLeft,
  LuChevronRight,
} from "react-icons/lu";
// Tier icons cut from the Figma frame (colour circle + illustration).
// Path assumes src/pages/Admin/Badges/ -> src/assets/tiers/
import seedIcon from "../../../assets/tiers/tier-seed.png";
import sproutIcon from "../../../assets/tiers/tier-sprout.png";
import treeIcon from "../../../assets/tiers/tier-tree.png";
import faithfulIcon from "../../../assets/tiers/tier-faithful.png";

const TIER_ICONS = {
  seed: seedIcon,
  sprout: sproutIcon,
  tree: treeIcon,
  faithful: faithfulIcon,
};

/* ==========================================================================
   MOCK DATA — hardcoded exactly as specified
   ========================================================================== */
const TIERS = [
  {
    id: "seed",
    name: "Seed",
    subtitle: "Beginning your faith journey",
    points: "0–999",
    description: "Starting faith journey",
    benefits: [
      "Full access to all basic features",
      "Daily challenges",
      "Standard profile",
      "Basic achievements",
      "Standard community cards",
    ],
  },
  {
    id: "sprout",
    name: "Sprout",
    subtitle: "Growing through God's Word",
    points: "1,000–4,999",
    description: "Building skills and growing spiritually",
    benefits: [
      "New profile frame",
      "Additional themes",
      "Reward bonuses",
      "Daily activities",
      "Achievement showcase",
      "Special celebration badge",
    ],
  },
  {
    id: "tree",
    name: "Tree",
    subtitle: "Rooted in Scripture",
    points: "5,000–19,999",
    description: "Deepening your understanding and helping others",
    benefits: [
      "Exclusive app themes",
      "Tree profile frame",
      "Premium notifications",
      "Enhanced statistics",
      "Early access features",
      "Create custom quizzes",
    ],
  },
  {
    id: "faithful",
    name: "Faithful",
    subtitle: "Accomplished and dedicated learner",
    points: "20,000+",
    description: "Making impact and inspiring others",
    benefits: [
      "Faithful profile badge",
      "Celebration animations",
      "Lifetime bonus points",
      "Complete journey timeline",
      "Advanced insights",
      "Publish public quizzes",
      "Community recognition",
      "Invite to Faithly Competition",
    ],
  },
];

const PAGES = [1, 2, 3, 4, 5];
const PAGE_SIZES = [10, 20, 50];

/* ==========================================================================
   SMALL PRIMITIVES
   ========================================================================== */
/* Figma toggle: 26 x 15 track */
function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-[15px] w-[26px] shrink-0 cursor-pointer rounded-full transition-colors ${
        checked ? "bg-[#0A4FB5]" : "bg-[#D1D5DB]"
      }`}
    >
      <span
        className={`absolute top-[2px] h-[11px] w-[11px] rounded-full bg-white transition-all ${
          checked ? "left-[13px]" : "left-[2px]"
        }`}
      />
    </button>
  );
}

/* Figma: header 14px / 500, body 12px / 500 */
const TH_CLASS = "px-5 py-0 text-[14px] font-medium leading-none text-[#0A0847]/80";

/* ==========================================================================
   PAGE — TIERS MANAGEMENT
   ========================================================================== */
export default function TiersManagement() {
  const [activeStates, setActiveStates] = useState(() =>
    TIERS.reduce((acc, tier) => ({ ...acc, [tier.id]: true }), {}),
  );
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const toggleActive = (id) =>
    setActiveStates((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="min-h-screen bg-[#F9FAFE] font-[Inter] text-[#0A0847]">
      <div className="mx-auto max-w-[1072px] space-y-6 px-5 py-6">
        {/* header row */}
        <div className="flex items-start justify-between gap-6">
          <div>
            {/* Figma: Inter 600, 22px */}
            <h1 className="text-[22px] font-semibold leading-none text-[#0A0847]">
              Tiers Management
            </h1>
            {/* Figma: Inter 500, 16px, #0A0847 60% */}
            <p className="mt-[18px] text-[16px] font-medium leading-none text-[#0A0847]/60">
              Create, edit and manage faith journey tiers.
            </p>
          </div>

          {/* Figma: 14px / 600, 8px radius */}
          <button
            type="button"
            className="flex h-[42px] w-[163px] shrink-0 cursor-pointer items-center justify-center gap-2 rounded-[8px] bg-[#001984] text-[14px] font-semibold text-white transition-colors hover:bg-[#001266]"
          >
            <LuPlus size={16} />
            Add New Tier
          </button>
        </div>

        {/* table card — Figma: radius 7.5px, border 0.75px #E2DFFC */}
        <div className="overflow-hidden rounded-[7.5px] border-[0.75px] border-[#E2DFFC] bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] border-collapse text-left">
              <thead>
                {/* Figma header: 50px tall, #F3F3FD fill, 20px side padding */}
                <tr className="h-[50px] bg-[#F3F3FD]">
                  <th scope="col" className={`${TH_CLASS} w-[15.3%] text-left`}>
                    Tier
                  </th>
                  <th scope="col" className={`${TH_CLASS} w-[12.7%] whitespace-nowrap text-left`}>
                    Points Range
                  </th>
                  <th scope="col" className={`${TH_CLASS} w-[16.3%] text-left`}>
                    Description
                  </th>
                  <th scope="col" className={`${TH_CLASS} w-[29.6%] text-left`}>
                    Benefits Unlocked
                  </th>
                  <th scope="col" className={`${TH_CLASS} w-[15.6%] text-left`}>
                    Status
                  </th>
                  <th scope="col" className={`${TH_CLASS} w-[10.5%] text-left`}>
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {TIERS.map((tier) => {
                  return (
                    <tr
                      key={tier.id}
                      className="border-b-[0.75px] border-[#E9E9E9] align-middle transition-colors last:border-b-0 hover:bg-[#FBFBFF]"
                    >
                      {/* Tier */}
                      <td className="px-5 py-5">
                        <div className="flex flex-col items-start">
                          <img src={TIER_ICONS[tier.id]} alt="" className="h-[35px] w-[35px] shrink-0" />
                          {/* Figma: name 12px / 500, subtitle 10px / 500 at 60% */}
                          <p className="mt-[6px] text-[12px] font-medium leading-none text-[#0A0847]/80">
                            {tier.name}
                          </p>
                          <p className="mt-1 w-[100px] text-[10px] font-medium leading-[12px] text-[#0A0847]/60">
                            {tier.subtitle}
                          </p>
                        </div>
                      </td>

                      {/* Points Range */}
                      <td className="whitespace-nowrap px-5 py-5 text-[12px] font-medium leading-none text-[#0A0847]/80">
                        {tier.points}
                      </td>

                      {/* Description */}
                      <td className="px-5 py-5 text-[12px] font-medium leading-[15px] text-[#0A0847]/80">
                        {tier.description}
                      </td>

                      {/* Benefits Unlocked — Figma: 12px / 500, 21px line pitch */}
                      <td className="px-5 py-5">
                        <ul className="list-inside list-disc pl-0 text-[12px] font-medium leading-[21px] text-[#0A0847]/80 marker:text-[#0A0847]/80">
                          {tier.benefits.map((benefit) => (
                            <li key={benefit}>{benefit}</li>
                          ))}
                        </ul>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-5">
                        <div className="flex items-center gap-2">
                          <span className="whitespace-nowrap text-[12px] font-medium leading-none text-[#0A0847]/80">
                            Active
                          </span>
                          <Toggle
                            checked={!!activeStates[tier.id]}
                            onChange={() => toggleActive(tier.id)}
                            label={`Toggle ${tier.name} tier`}
                          />
                        </div>
                      </td>

                      {/* Actions — Figma: 32 x 32 icon buttons */}
                      <td className="px-5 py-5">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            aria-label={`Edit ${tier.name} tier`}
                            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-[6px] border border-[#E2DFFC] bg-white text-[#001984] transition-colors hover:bg-[#F1F1F9]"
                          >
                            <LuPencil size={14} />
                          </button>
                          <button
                            type="button"
                            aria-label={`Delete ${tier.name} tier`}
                            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-[6px] border border-[#F8B4C0] bg-white text-[#E11D48] transition-colors hover:bg-[#FEF2F2]"
                          >
                            <LuTrash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* footer */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t-[0.75px] border-[#E2DFFC] px-4 py-3">
            <div className="flex items-center gap-2 text-[13px] font-medium text-[#0A0847]">
              Display
              <div className="relative">
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                  className="h-[32px] w-[64px] cursor-pointer appearance-none rounded-[6px] border border-[#E2DFFC] bg-white pl-2 pr-6 text-[12px] font-medium text-[#0A0847]/80 outline-none focus:border-[#001984]"
                >
                  {PAGE_SIZES.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
                <LuChevronDown
                  size={13}
                  className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-[#0A0847]/80"
                  aria-hidden
                />
              </div>
              {/* Figma: 12px / 400, 60% */}
              <span className="text-[12px] font-normal text-[#0A0847]/60">Badges</span>
            </div>

            {/* Figma pagination: 24 x 24, radius 3px, 0.75px #001984 borders */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                disabled
                aria-label="Previous page"
                className="flex h-6 w-6 cursor-not-allowed items-center justify-center rounded-[3px] border-[0.75px] border-[#E2DFFC] text-[#0A0847]/30"
              >
                <LuChevronLeft size={14} />
              </button>

              {PAGES.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPage(p)}
                  aria-current={page === p ? "page" : undefined}
                  className={`flex h-6 w-6 cursor-pointer items-center justify-center rounded-[3px] text-[12px] font-medium leading-none transition-colors ${
                    page === p
                      ? "bg-[#001984] font-semibold text-white"
                      : "text-[#0A0847]/80 hover:bg-[#F1F1F9]"
                  }`}
                >
                  {p}
                </button>
              ))}

              <button
                type="button"
                onClick={() => setPage((p) => Math.min(p + 1, PAGES.length))}
                aria-label="Next page"
                className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-[3px] border-[0.75px] border-[#001984] text-[#001984] transition-colors hover:bg-[#F1F1F9]"
              >
                <LuChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}