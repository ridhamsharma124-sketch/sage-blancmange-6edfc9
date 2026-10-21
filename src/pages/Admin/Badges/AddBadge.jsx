import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuChevronDown, LuCheck } from "react-icons/lu";
// Upload cloud cut from the Figma frame (transparent PNG).
// Path assumes src/pages/Admin/Badges/ -> src/assets/badges/
import uploadCloudIcon from "../../../assets/badges/upload-cloud.png";
// Save floppy cut from the Figma frame (white, transparent).
import saveIcon from "../../../assets/badges/save-icon.png";

/* ==========================================================================
   PRIMITIVES — Figma: labels 12px / 600, inputs 12px / 500, 7.5px radius
   ========================================================================== */
const labelClass = "mb-[6px] block text-[12px] font-semibold text-[#0A0847]";

const inputClass =
  "h-[45px] w-full rounded-[7.5px] border border-[#E2DFFC] bg-white px-3 text-[12px] font-medium text-[#0A0847] outline-none transition placeholder:text-[#0A0847]/80 focus:border-[#041581]";

const selectClass =
  "h-[46px] w-full cursor-pointer appearance-none rounded-[7.5px] border border-[#E2DFFC] bg-white pl-3 pr-10 text-[12px] font-medium text-[#0A0847] outline-none transition focus:border-[#041581]";

/* Figma: helper text 10px / 500 */
const helperClass = "mt-[6px] text-[10px] font-medium leading-none text-[#0A0847]/80";

function FieldSelect({ id, options }) {
  return (
    <div className="relative w-full [&>svg]:pointer-events-none">
      <select id={id} className={selectClass}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <LuChevronDown
        size={16}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0A0847]/80"
      />
    </div>
  );
}

function CounterField({ id, placeholder }) {
  return (
    <div className="relative">
      <textarea
        id={id}
        placeholder={placeholder}
        className="h-[96px] w-full resize-none rounded-[7.5px] border border-[#E2DFFC] bg-white px-3 py-3 pr-12 text-[12px] font-medium text-[#0A0847] outline-none transition placeholder:text-[#0A0847]/80 focus:border-[#041581]"
      />
      <span className="pointer-events-none absolute bottom-2.5 right-3 text-[12px] font-medium text-[#0A0847]/80">
        0/150
      </span>
    </div>
  );
}

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

/* Figma card: radius 7.5px, 0.75px #E2DFFC border, padding 27 / 28 / 32 / 24 */
function Card({ title, children, divider = true }) {
  return (
    <div className="rounded-[7.5px] border-[0.75px] border-[#E2DFFC] bg-white pb-8 pl-6 pr-7 pt-[27px]">
      <div className={divider ? "border-b border-[#E2DFFC] pb-3" : ""}>
        <h2 className="text-[16px] font-medium leading-none text-[#0A0847]">{title}</h2>
      </div>
      <div className={divider ? "pt-5" : "pt-4"}>{children}</div>
    </div>
  );
}

/* ==========================================================================
   MEDAL PREVIEW — red rosette, gold scalloped edge, gold star (Figma 46 x 44)
   ========================================================================== */
function Medal() {
  return (
    <svg viewBox="0 0 60 60" className="h-[44px] w-[46px] shrink-0" role="img" aria-label="Badge preview">
      <circle cx="30" cy="30" r="25.5" fill="#F5C518" stroke="#C79A00" strokeWidth="0.5" strokeDasharray="3 3.4" />
      <circle cx="30" cy="30" r="22.5" fill="#F5C518" />
      <circle cx="30" cy="30" r="18" fill="#C61926" />
      <path
        d="M30 21.8 32.4 28.1 39.2 28.7 34 33.3 35.5 40 30 36.4 24.5 40 26 33.3 20.8 28.7 27.6 28.1Z"
        fill="#F5C518"
        stroke="#E0A800"
        strokeWidth="0.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Figma swatches: 48 x 48, first (selected) is #101D8A */
const SWATCHES = [
  { hex: "#101D8A" },
  { hex: "#46B863" },
  { hex: "#8043E6" },
  { hex: "#2973F8" },
  { hex: "#F6A53C" },
  { hex: "#F15D6B" },
  { hex: "#9AA0B4" },
];

/* ==========================================================================
   PAGE — ADD NEW BADGE
   Figma: left column 528px, right column 476px, page width 1072px
   ========================================================================== */
export default function AddBadge() {
  const navigate = useNavigate();
  const [active, setActive] = useState(true);
  const [color, setColor] = useState("#101D8A");
  const [badgeImage, setBadgeImage] = useState(null);
  const [badgeImageName, setBadgeImageName] = useState("");
  const badgeImageRef = useRef(null);

  const handleBadgeImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setBadgeImage(URL.createObjectURL(file));
      setBadgeImageName(file.name);
    }
    e.target.value = "";
  };

  return (
    <div className="min-h-screen bg-[#F9FAFE] font-[Inter] text-[#0A0847]">
      <div className="w-full px-7 py-6">
        <div className="mx-auto w-full max-w-[1072px] space-y-6">
          {/* header */}
          <div>
            <h1 className="text-[22px] font-semibold leading-none text-[#0A0847]">
              Add New Badge
            </h1>
            <p className="mt-[19px] text-[16px] font-medium leading-none text-[#0A0847]/60">
              Create, edit and manage all badges in the system.
            </p>
          </div>

          {/* two columns */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[528px_476px] lg:justify-between">
            {/* LEFT COLUMN */}
            <div className="flex flex-col gap-[19px]">
              <Card title="Badge Information">
                <div>
                  <label htmlFor="badge-title" className={labelClass}>
                    Badge Title <span className="text-[#E11D48]">*</span>
                  </label>
                  <input
                    id="badge-title"
                    type="text"
                    placeholder="Enter badge title"
                    className={inputClass}
                  />
                </div>

                <div className="mt-4">
                  <label htmlFor="badge-description" className={labelClass}>
                    Badge Description <span className="text-[#E11D48]">*</span>
                  </label>
                  <CounterField id="badge-description" placeholder="Describe what this badge represents" />
                </div>

                <div className="mt-4">
                  <p className={labelClass}>
                    Badge Icon <span className="text-[#E11D48]">*</span>
                  </p>
                  <input
                    ref={badgeImageRef}
                    type="file"
                    accept="image/*"
                    onChange={handleBadgeImageUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => badgeImageRef.current?.click()}
                    className="relative flex h-[100px] w-full cursor-pointer flex-row items-center justify-center gap-3 overflow-hidden rounded-[7.5px] border-[1.5px] border-dashed border-[#001984] bg-[#F6F4FE] transition-colors hover:bg-[#EDEFFF]"
                  >
                    {badgeImage ? (
                      <>
                        <img src={badgeImage} alt="Badge icon preview" className="h-full w-full object-cover" />
                        <span className="absolute bottom-2 right-2 rounded bg-white/90 px-2 py-1 text-[11px] font-semibold text-[#0A0847]/80">
                          Change Image
                        </span>
                      </>
                    ) : (
                      <>
                        <img src={uploadCloudIcon} alt="" className="h-[48px] w-auto shrink-0" />
                        <span className="text-[16px] font-medium leading-none text-[#001984]">
                          Upload / Replace Image
                        </span>
                      </>
                    )}
                  </button>
                  {badgeImageName && (
                    <p className="mt-2 text-[12px] font-medium text-[#0A0847]/80">{badgeImageName}</p>
                  )}
                  <p className="mt-2 text-[12px] font-medium leading-[15px] text-[#0A0847]/80">
                    Recommended size: 1200×628px
                    <br />
                    JPG, PNG or WebP
                  </p>
                </div>

                <div className="mt-4">
                  <label htmlFor="badge-tier" className={labelClass}>
                    Tier <span className="text-[#E11D48]">*</span>
                  </label>
                  <FieldSelect id="badge-tier" options={["Select tier", "Seed", "Sprout", "Tree"]} />
                </div>

                <div className="mt-4 flex items-center">
                  <span className="w-[244px] shrink-0 text-[12px] font-semibold text-[#0A0847]">Status</span>
                  <div className="flex items-center gap-2.5">
                    <Toggle checked={active} onChange={setActive} label="Status" />
                    <span className="text-[12px] font-medium text-[#0A0847]">Active</span>
                  </div>
                </div>
              </Card>

              <Card title="Preview" divider={false}>
                <div className="flex items-center gap-4">
                  <Medal />
                  <div>
                    <p className="text-[24px] font-semibold leading-none text-[#0A0847]">Badge Title</p>
                    <p className="mt-1 text-[16px] font-semibold leading-none text-[#0A0847]/60">
                      Badge description will appear here.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* RIGHT COLUMN */}
            <div className="flex flex-col gap-4">
              <Card title="Requirements">
                <div>
                  <label htmlFor="req-type" className={labelClass}>
                    Requirement Type <span className="text-[#E11D48]">*</span>
                  </label>
                  <FieldSelect
                    id="req-type"
                    options={[
                      "Select requirement type",
                      "Complete quiz",
                      "Prayer streak",
                      "Read chapters",
                      "Invite friends",
                      "Log prayers",
                    ]}
                  />
                  <p className={helperClass}>Choose how users will earn this badge.</p>
                </div>

                <div className="mt-4">
                  <label htmlFor="req-details" className={labelClass}>
                    Requirement Details <span className="text-[#E11D48]">*</span>
                  </label>
                  <CounterField id="req-details" placeholder="Enter requirement details" />
                </div>

                <div className="mt-4">
                  <label htmlFor="req-target" className={labelClass}>
                    Target Amount <span className="text-[#E11D48]">*</span>
                  </label>
                  <FieldSelect
                    id="req-target"
                    options={["Enter target amount", "1 time", "7 times", "30 times", "365 times"]}
                  />
                  <p className={helperClass}>Number of times / days / count required to earn this badge.</p>
                </div>
              </Card>

              <Card title="Points & Display">
                <div>
                  <label htmlFor="points-awarded" className={labelClass}>
                    Points Awarded <span className="text-[#E11D48]">*</span>
                  </label>
                  <FieldSelect
                    id="points-awarded"
                    options={["Enter points to award", "50 pts", "100 pts", "250 pts", "500 pts"]}
                  />
                  <p className={helperClass}>Points users will receive when they earn this badge</p>
                </div>

                <div className="mt-4">
                  <label htmlFor="display-order" className={labelClass}>
                    Display Order <span className="text-[#E11D48]">*</span>
                  </label>
                  <CounterField id="display-order" placeholder="Enter display order" />
                </div>

                <div className="mt-4">
                  <label htmlFor="target-amount-2" className={labelClass}>
                    Target Amount <span className="text-[#E11D48]">*</span>
                  </label>
                  <FieldSelect
                    id="target-amount-2"
                    options={["Enter target amount", "1 time", "7 times", "30 times", "365 times"]}
                  />
                  <p className={helperClass}>Lower numbers appear first (1, 2, 3...).</p>
                </div>

                <div className="mt-4">
                  <p className={labelClass}>Badge Color (Optional)</p>
                  <div className="flex items-center justify-between">
                    {SWATCHES.map((swatch) => {
                      const selected = color === swatch.hex;
                      return (
                        <button
                          key={swatch.hex}
                          type="button"
                          aria-label={`Color ${swatch.hex}`}
                          aria-pressed={selected}
                          onClick={() => setColor(swatch.hex)}
                          className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-[8px] transition-transform hover:scale-105"
                          style={{ backgroundColor: swatch.hex }}
                        >
                          {selected && (
                            <span className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-white">
                              <LuCheck size={15} className="text-[#001984]" strokeWidth={3} />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* bottom action row — Figma buttons 211 x 41, radius 8px */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/admin/badges")}
              className="h-[41px] w-[211px] cursor-pointer rounded-[8px] border border-[#E2DFFC] bg-white text-[14px] font-semibold text-[#0A0847] transition-colors hover:bg-[#F9FAFE]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/badges")}
              className="flex h-[41px] w-[211px] cursor-pointer items-center justify-center gap-2 rounded-[8px] bg-[#001984] text-[14px] font-semibold text-white transition-colors hover:bg-[#000F5C]"
            >
              <img src={saveIcon} alt="" className="h-4 w-auto shrink-0" />
              Save Badge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}