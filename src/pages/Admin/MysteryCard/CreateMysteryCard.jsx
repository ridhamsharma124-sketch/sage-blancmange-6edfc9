import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LuArrowLeft,
  LuArrowRight,
  LuBookOpen,
  LuChevronDown,
  LuCircleSlash,
  LuCloudUpload,
  LuCross,
  LuSave,
  LuShieldCheck,
  LuSparkles,
  LuStar,
} from "react-icons/lu";
import mysteryCardPreview from "../../../assets/Mystery card preview.png";

/* ==========================================================================
   TOKENS
   ========================================================================== */
const BORDER = "#E2DFFC";
const DEEP_NAVY = "#00007A";
const PAGE_BG = "#F8F8FF";
const GOLD = "#D9A93A";
const NAVY_TINT = "rgba(0, 25, 132, 0.10)";
const ACTIVE_TINT = "rgba(19, 65, 227, 0.10)";

/* ==========================================================================
   SHARED
   ========================================================================== */
const FIELD =
  "w-full rounded-[7.47px] border border-[#E2DFFC] bg-white px-[12px] text-[14px] text-[#2A2750] outline-none placeholder:text-[#8B8FA8] focus:border-[#00007A]";

function Label({ children, optional = false, bare = false }) {
  return (
    <span className="block text-[14px] font-semibold text-[#2A2750]">
      {children}
      {bare ? null : optional ? (
        <span className="font-normal text-[#8B8FA8]"> (optional)</span>
      ) : (
        <span className="text-[#C2185B]"> *</span>
      )}
    </span>
  );
}

function Select({ placeholder }) {
  return (
    <div className="relative w-full">
      <select
        defaultValue=""
        aria-label={placeholder}
        className={`${FIELD} h-[40px] cursor-pointer appearance-none pr-[50px]`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        <option>Option</option>
      </select>
      <LuChevronDown
        size={16}
        className="pointer-events-none absolute top-1/2 right-[16px] -translate-y-1/2 text-[#2A2750]/60"
      />
    </div>
  );
}

/* segmented control — full width, equal segments, shared borders */
function Segmented({ options, value, onChange }) {
  return (
    <div className="flex w-full">
      {options.map((opt, i) => {
        const active = opt === value;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`h-[40px] flex-1 cursor-pointer border px-2 text-[14px] first:rounded-l-[7.47px] last:rounded-r-[7.47px] ${
              i > 0 ? "-ml-px" : ""
            } ${
              active
                ? "relative z-10 border-[#00007A] font-bold text-[#00007A]"
                : "border-[#E2DFFC] bg-white font-normal text-[#6B6F8A]"
            }`}
            style={active ? { background: ACTIVE_TINT } : undefined}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

const CHECKBOX =
  "flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] border-[1.5px] border-[#1B1A52]";

function CheckOption({ label, checked, onChange }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="flex cursor-pointer items-center gap-[12px]"
    >
      <span
        className={`${CHECKBOX} ${
          checked
            ? "border-[#00007A] bg-[#00007A] text-white"
            : "bg-white text-transparent"
        }`}
      >
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
          <path
            d="M1.5 6.2 4.4 9.1 10.5 3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="text-[14px] font-normal text-[#2A2750]">{label}</span>
    </button>
  );
}

/* ==========================================================================
   GOLD ORNAMENTS
   ========================================================================== */
function GoldCorner({ flip }) {
  return (
    <svg
      width="46"
      height="46"
      viewBox="0 0 46 46"
      fill="none"
      aria-hidden
      style={flip ? { right: 0, transform: "scaleX(-1)" } : { left: 0 }}
      className="absolute top-0"
    >
      <path
        d="M2 44V16C2 8.3 8.3 2 16 2h28"
        stroke={GOLD}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M8 44V19C8 12.8 12.8 8 19 8h25"
        stroke={GOLD}
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path d="M14 14l5 5-5 5" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="10" cy="34" r="2.5" fill={GOLD} opacity="0.8" />
    </svg>
  );
}

function GoldDivider() {
  return (
    <div className="flex w-full items-center justify-center" style={{ gap: 10 }}>
      <span className="h-px" style={{ width: 64, background: GOLD }} />
      <span
        className="h-[9px] w-[9px] rotate-45"
        style={{ background: GOLD }}
      />
      <span className="h-px" style={{ width: 64, background: GOLD }} />
    </div>
  );
}

/* blue watercolor open-book illustration, bleeding off the bottom */
function BookWatercolor() {
  return (
    <svg
      width="300"
      height="190"
      viewBox="0 0 300 190"
      fill="none"
      aria-hidden
      className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2"
    >
      <ellipse cx="66" cy="70" rx="52" ry="22" fill="#CFE0F5" opacity="0.55" />
      <ellipse cx="238" cy="58" rx="46" ry="18" fill="#CFE0F5" opacity="0.45" />
      <ellipse cx="150" cy="150" rx="120" ry="34" fill="#B9D3F1" opacity="0.4" />

      <path
        d="M150 74c-18-16-42-24-72-24H44v92h34c30 0 54 8 72 24 18-16 42-24 72-24h34V50h-34c-30 0-54-8-72 24z"
        fill="#8FB8E4"
      />
      <path
        d="M150 74v92c-18-16-42-24-72-24H44V50h34c30 0 54 8 72 24z"
        fill="#B7D2F0"
      />
      <path
        d="M150 74v92c18 16 42 24 72 24h34V50h-34c-30 0-54-8-72 24z"
        fill="#9CC3EC"
      />
      <path d="M150 74v92" stroke="#6E9BD1" strokeWidth="2.5" strokeLinecap="round" />
      <g stroke="#7FA8D8" strokeWidth="2" strokeLinecap="round" opacity="0.65">
        <path d="M62 82h58M62 98h58M62 114h44" />
        <path d="M180 82h58M180 98h58M180 114h44" />
      </g>
    </svg>
  );
}

/* ==========================================================================
   REWARD TILE
   ========================================================================== */
const TILE_ICON = {
  None: LuCircleSlash,
  "Faith Points": LuStar,
  "AI Credits": LuSparkles,
  Badge: LuShieldCheck,
};

function RewardTile({ label, active, onClick }) {
  const Icon = TILE_ICON[label];
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-[85px] w-[134px] shrink-0 cursor-pointer flex-col items-center justify-center rounded-[8px] border ${
        active ? "border-[#00007A]" : "border-[#E2DFFC] bg-white"
      }`}
      style={active ? { background: NAVY_TINT } : undefined}
    >
      <Icon size={28} strokeWidth={1.7} className="text-[#1B1A52]" />
      <span className="mt-[10px] text-[15px] font-semibold text-[#1B1A52]">{label}</span>
    </button>
  );
}

/* ==========================================================================
   PAGE
   ========================================================================== */
export default function CreateMysteryCard() {
  const navigate = useNavigate();
  const [testament, setTestament] = useState("Old Testament");
  const [reward, setReward] = useState("None");
  const [rarity, setRarity] = useState("Common");
  const [status, setStatus] = useState("Draft");
  const [activities, setActivities] = useState({
    Quiz: true,
    "Broad Spectrum": true,
    "Word Search": false,
    "Divine Counsel": false,
    "Group Play": false,
    "Pray With Me": false,
  });
  const fileInputRef = useRef(null);
  const [uploadedName, setUploadedName] = useState("");

  const toggleActivity = (k) =>
    setActivities((prev) => ({ ...prev, [k]: !prev[k] }));

  return (
    <div
      className="min-h-screen w-full p-6 font-inter"
      style={{ background: PAGE_BG, fontFamily: "Inter, sans-serif" }}
    >
      {/* ============ OUTER CARD ============ */}
      <div
        className="w-full min-w-0 rounded-[8px] border bg-white p-[24px]"
        style={{ borderColor: BORDER }}
      >
        {/* ---- back ---- */}
        <button
          type="button"
          onClick={() => navigate("/admin/mystery-card")}
          aria-label="Back to Mystery Card Dashboard"
          className="mb-[16px] flex h-[36px] w-[36px] cursor-pointer items-center justify-center rounded-[6px] border border-[#E2DFFC] bg-white text-[#00007A]"
        >
          <LuArrowLeft size={18} strokeWidth={2} />
        </button>

        {/* ---- header ---- */}
        <h1 className="text-[24px] font-bold text-[#2A2750]">Create New Mystery Card</h1>
        <p className="mt-2 text-[15px] text-[#6B6F8A]">
          Fill in the details below to create a new Mystery Card.
        </p>

        {/* ---- two columns ---- */}
        <div className="mt-6 grid grid-cols-[minmax(0,1fr)_316px] gap-[24px]">
          {/* ===== LEFT — form ===== */}
          <div className="flex min-w-0 flex-col gap-[24px]">
            <div>
              <Label>Card Title</Label>
              <input
                type="text"
                placeholder="Enter a compelling title"
                className={`${FIELD} mt-[6px] h-[40px]`}
              />
            </div>

            <div>
              <Label>Category</Label>
              <div className="mt-[6px]">
                <Select placeholder="Select category" />
              </div>
            </div>

            <div>
              <Label>Testament</Label>
              <div className="mt-[6px]">
                <Segmented
                  options={["Old Testament", "New Testament", "General"]}
                  value={testament}
                  onChange={setTestament}
                />
              </div>
            </div>

            <div>
              <Label>Eligible Activities</Label>
              <div className="mt-[10px] flex flex-wrap gap-[28px]">
                {Object.keys(activities).map((k) => (
                  <CheckOption
                    key={k}
                    label={k}
                    checked={activities[k]}
                    onChange={() => toggleActivity(k)}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-[24px]">
              <div>
                <Label optional>Book</Label>
                <div className="mt-[6px]">
                  <Select placeholder="Select book" />
                </div>
              </div>
              <div>
                <Label optional>Chapter</Label>
                <input
                  type="text"
                  placeholder="e.g. 1-17"
                  className={`${FIELD} mt-[6px] h-[40px]`}
                />
              </div>
            </div>

            <div>
              <Label>Card Content</Label>
              <textarea
                placeholder="Write the card content here..."
                className={`${FIELD} mt-[6px] h-[70px] resize-none py-[10px]`}
              />
            </div>

            <div className="grid grid-cols-2 gap-[24px]">
              <div>
                <Label>Bible Verse Reference</Label>
                <div className="mt-[6px]">
                  <Select placeholder="e.g. 1 Samuel 17:45" />
                </div>
              </div>
              <div>
                <Label>Bible Verse Text</Label>
                <input
                  type="text"
                  placeholder="Enter the full verse text..."
                  className={`${FIELD} mt-[6px] h-[40px]`}
                />
              </div>
            </div>

            <div>
              <Label bare>Encouragement Message</Label>
              <textarea
                placeholder="Write an encouraging message..."
                className={`${FIELD} mt-[6px] h-[70px] resize-none py-[10px]`}
              />
            </div>

            <div className="h-px w-full" style={{ background: "#EEF0F8" }} />

            <div>
              <Label bare>Encouragement Message</Label>
              <textarea
                placeholder="Write an encouraging message..."
                className={`${FIELD} mt-[6px] h-[70px] resize-none py-[10px]`}
              />
            </div>

            <div className="flex items-center justify-between gap-[16px]">
              {["None", "Faith Points", "AI Credits", "Badge"].map((r) => (
                <RewardTile
                  key={r}
                  label={r}
                  active={reward === r}
                  onClick={() => setReward(r)}
                />
              ))}
            </div>

            <div className="grid grid-cols-2 gap-[24px]">
              <div>
                <Label bare>Reward Amount</Label>
                <input
                  type="text"
                  placeholder="e.g. 100"
                  className={`${FIELD} mt-[6px] h-[40px]`}
                />
              </div>
              <div>
                <Label bare>Rarity</Label>
                <div className="mt-[6px]">
                  <Segmented
                    options={["Common", "Uncommon", "Rare", "Legendary"]}
                    value={rarity}
                    onChange={setRarity}
                  />
                </div>
              </div>
            </div>

            <div>
              <Label bare>Card Image</Label>
              <div
                className="mt-[6px] flex h-[77px] w-full cursor-pointer items-center justify-center gap-[14px] rounded-[8px] border-[1.5px] border-dashed px-[22px]"
                style={{ borderColor: DEEP_NAVY, background: NAVY_TINT }}
                title={uploadedName || undefined}
                onClick={() => fileInputRef.current?.click()}
              >
                <LuCloudUpload size={36} strokeWidth={1.6} className="text-[#00007A]" />
                <div className="flex flex-col">
                  <span className="text-[18px] font-semibold text-[#00007A]">Upload an image</span>
                  <span className="text-[13px] text-[#6B6F8A]">PNG or JPG, max 5MB</span>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) setUploadedName(f.name);
                  }}
                />
              </div>
            </div>

            <div>
              <Label bare>Status</Label>
              <div className="mt-[6px]">
                <Segmented
                  options={["Draft", "Active", "Unpublished"]}
                  value={status}
                  onChange={setStatus}
                />
              </div>
            </div>
          </div>

          {/* ===== RIGHT — live preview ===== */}
          <div className="min-w-0">
            <div className="h-[858px] rounded-[8px] border border-edge-input bg-white p-[14px]">
              <p className="text-[16px] font-semibold text-deep-navy">Live Preview</p>

              <div
                className="relative mt-[12px] h-[804px] w-full overflow-hidden rounded-[12px] border border-lavender-line bg-lavender-deep bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${mysteryCardPreview})` }}
              >
                <GoldCorner />
                <GoldCorner flip />

                {/* centered content */}
                <div className="relative z-10 flex flex-col items-center px-[22px] pt-[86px] text-center">
                  <div className="relative mb-[26px]">
                    <LuCross
                      size={26}
                      strokeWidth={2.4}
                      className="absolute -top-[18px] left-1/2 -translate-x-1/2 text-[#D9A93A]"
                    />
                    <LuBookOpen size={56} strokeWidth={1.5} className="text-deep-navy" />
                  </div>

                  <p className="text-[20px] font-bold text-deep-navy">
                    Your card preview will appear here
                  </p>
                  <p className="mt-[10px] text-[14px] text-[#6B6F8A]">
                    Add content and details to see how it looks.
                  </p>

                  <div className="mt-[22px]">
                    <GoldDivider />
                  </div>
                </div>

                <BookWatercolor />
              </div>
            </div>
          </div>
        </div>

        {/* ---- footer actions ---- */}
        <div className="mt-6 flex justify-end gap-[16px]">
          <button
            type="button"
            onClick={() => navigate("/admin/mystery-card")}
            className="h-[40px] cursor-pointer rounded-[8px] border border-[#E2DFFC] bg-white px-[28px] text-[14px] font-semibold text-[#00007A]"
          >
            Cancel
          </button>
          <button
            type="button"
            className="flex h-[40px] cursor-pointer items-center gap-[9px] rounded-[8px] border border-[#E2DFFC] bg-white px-[28px] text-[14px] font-semibold text-[#00007A]"
          >
            <LuSave size={17} strokeWidth={1.8} /> Save draft
          </button>
          <button
            type="button"
            className="flex h-[40px] cursor-pointer items-center gap-[9px] rounded-[8px] bg-[#00007A] px-[28px] text-[14px] font-semibold text-white"
          >
            <LuArrowRight size={17} strokeWidth={2} /> Publish Card
          </button>
        </div>
      </div>
    </div>
  );
}
