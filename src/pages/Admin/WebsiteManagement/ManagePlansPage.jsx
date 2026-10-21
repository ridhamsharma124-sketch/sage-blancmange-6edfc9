import { Children, useState } from "react";
import {
  LuGripVertical as GripVertical,
  LuHeart as Heart,
  LuInfo as Info,
  LuLink as LinkIcon,
  LuMail as Mail,
  LuPlus as Plus,
  LuSave as Save,
  LuShieldCheck as ShieldCheck,
  LuStar as Star,
  LuTag as Tag,
  LuTrash2 as Trash2,
  LuUpload as Upload,
  LuUserPlus as UserPlus,
  LuVideo as Video,
} from "react-icons/lu";
import { FaApple, FaFacebook, FaYoutube } from "react-icons/fa";
import Logo from "../../../components/shared/Logo";

const CARD = "flex flex-col gap-[18px] rounded-[10px] border border-[#E2DFFC] bg-white px-6 py-[26px]";
const INPUT_BASE =
  "h-[40px] rounded-[8px] border border-[#D9DCEA] bg-white pt-[7px] pr-[15px] pb-[7px] text-[13px] font-medium text-[#0A0847] outline-none placeholder:text-[#9AA1B2] focus:border-[#051383]";
const INPUT = `${INPUT_BASE} w-full pl-[11px]`;
const INPUT_WITH_ICON = `${INPUT_BASE} w-full pl-[34px]`;
const DASHED_BTN =
  "flex h-[40px] w-fit items-center justify-center gap-[8px] rounded-[8px] border border-dashed border-[#051383]/60 px-[24px] text-[13px] font-medium";

const APPLE_URL = "https://apps.apple.com/app/faithly";
const PLAY_URL = "https://play.google.com/store/apps/details?id=org.faithly.app";

function GooglePlayMark({ size = 14, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="gp-blue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#00E3FF" />
          <stop offset="1" stopColor="#00A0FF" />
        </linearGradient>
        <linearGradient id="gp-green" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#00E676" />
          <stop offset="1" stopColor="#00C853" />
        </linearGradient>
        <linearGradient id="gp-yellow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFD600" />
          <stop offset="1" stopColor="#FFBC00" />
        </linearGradient>
        <linearGradient id="gp-red" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FF6E40" />
          <stop offset="1" stopColor="#FF3A44" />
        </linearGradient>
      </defs>
      <path fill="url(#gp-blue)" d="M4 2.5 13 12 4 12Z" />
      <path fill="url(#gp-green)" d="M4 12 13 12 4 21.5Z" />
      <path fill="url(#gp-yellow)" d="M4 2.5 19.5 12 13 12Z" />
      <path fill="url(#gp-red)" d="M13 12 19.5 12 4 21.5Z" />
    </svg>
  );
}

function InstagramMark({ size = 14, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="ig-grad" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#F58529" />
          <stop offset="50%" stopColor="#DD2A7B" />
          <stop offset="100%" stopColor="#8134AF" />
        </linearGradient>
      </defs>
      <rect
        x="2.8"
        y="2.8"
        width="18.4"
        height="18.4"
        rx="5.4"
        fill="none"
        stroke="url(#ig-grad)"
        strokeWidth="2"
      />
      <circle cx="12" cy="12" r="4.1" fill="none" stroke="url(#ig-grad)" strokeWidth="2" />
      <circle cx="17.3" cy="6.7" r="1.3" fill="url(#ig-grad)" />
    </svg>
  );
}

function CardHeader({ icon: Icon, title, subtitle }) {
  return (
    <div className="flex items-center gap-[9px]">
      <span className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[10px] bg-[#EDEBFC]">
        <Icon size={22} strokeWidth={1.8} className="text-[#0A0847]" />
      </span>
      <span className="flex min-w-0 flex-col gap-[2px]">
        <h2 className="text-[15px] font-semibold text-[#0A0847]">{title}</h2>
        <p className="text-[12px] leading-[1.35] text-[#6B7280]">{subtitle}</p>
      </span>
    </div>
  );
}

function FieldLabel({ icon: Icon, iconClass = "text-[#0A0847]", children }) {
  return (
    <span className="flex items-center gap-[6px] text-[12px] font-medium text-[#0A0847]">
      {Icon ? <Icon size={14} strokeWidth={2} className={`shrink-0 ${iconClass}`} /> : null}
      {children}
    </span>
  );
}

function UrlInput({ defaultValue, value, onChange, placeholder, withIcon = true }) {
  return (
    <div className="relative min-w-0">
      {withIcon && (
        <LinkIcon
          size={15}
          strokeWidth={2}
          className="pointer-events-none absolute top-1/2 left-[13px] -translate-y-1/2 text-[#6B7280]"
        />
      )}
      <input
        type="text"
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={withIcon ? INPUT_WITH_ICON : INPUT}
      />
    </div>
  );
}

function Split({ leftClass, children }) {
  const [left, right] = Children.toArray(children);
  return (
    <div className="flex flex-col gap-6 min-[860px]:flex-row">
      <div className={`w-full min-w-0 min-[860px]:shrink-0 ${leftClass}`}>{left}</div>
      <div className="hidden w-px shrink-0 self-stretch bg-[#E2DFFC] min-[860px]:block" />
      <div className="min-w-0 min-[860px]:flex-1">{right}</div>
    </div>
  );
}

const INITIAL_FEATURES = [
  { id: 1, name: "Bible Brain", desc: "Text and audio. Ask questions. Get answers." },
  { id: 2, name: "Quizzes & Challenges", desc: "Test your knowledge and strengthen your faith." },
  { id: 3, name: "Word Search Puzzles", desc: "Enjoy fun and meaningful Bible-themed games." },
  { id: 4, name: "Daily Bible Verse", desc: "Receive uplifting verses to encourage your day." },
];

const INITIAL_SOCIALS = [
  {
    id: 1,
    platform: "Facebook",
    icon: "facebook",
    value: "https://facebook.com/faithlyplus",
    editable: false,
  },
  {
    id: 2,
    platform: "Instagram",
    icon: "instagram",
    value: "https://instagram.com/faithlyplus",
    editable: false,
  },
  {
    id: 3,
    platform: "YouTube",
    icon: "youtube",
    value: "https://youtube.com/@faithlyplus",
    editable: false,
  },
];

const SOCIAL_ICONS = {
  facebook: { Icon: FaFacebook, color: "text-[#1877F2]" },
  instagram: { Icon: InstagramMark, color: "" },
  youtube: { Icon: FaYoutube, color: "text-[#FF0000]" },
};

export default function ManagePlansPage() {
  const [features, setFeatures] = useState(INITIAL_FEATURES);
  const [socials, setSocials] = useState(INITIAL_SOCIALS);

  const updateFeature = (id, key, value) =>
    setFeatures((current) => current.map((f) => (f.id === id ? { ...f, [key]: value } : f)));
  const removeFeature = (id) => setFeatures((current) => current.filter((f) => f.id !== id));
  const addFeature = () =>
    setFeatures((current) => [...current, { id: Date.now(), name: "", desc: "" }]);

  const updateSocial = (id, key, value) =>
    setSocials((current) => current.map((s) => (s.id === id ? { ...s, [key]: value } : s)));
  const addSocial = () =>
    setSocials((current) => [
      ...current,
      { id: Date.now(), platform: "", icon: "link", value: "", editable: true },
    ]);

  return (
    <div className="mx-auto flex w-full max-w-[1114px] min-w-0 flex-col gap-6 px-3 py-6 font-inter sm:px-6">
      {/* ================= PAGE HEADER ================= */}
      <div className="flex flex-col gap-[6px]">
        <h1 className="text-[20px] font-bold text-[#0A0847]">Manage Plans</h1>
        <p className="text-[12px] text-[#6B7280]">
          Create and manage your subscription plans and pricing.
        </p>
      </div>

      {/* ================= CARD 1 : Branding & App Links ================= */}
      <section className={CARD}>
        <CardHeader
          icon={Tag}
          title="Branding & App Links"
          subtitle="Manage your logo and important links that appear on the landing page."
        />

        <Split leftClass="min-[860px]:w-[350px]">
          <div className="flex flex-col gap-[8px]">
            <span className="text-[12px] font-medium text-[#0A0847]">Logo</span>
            <div className="flex flex-wrap items-center gap-[14px]">
              <div className="flex h-[90px] w-[200px] shrink-0 items-center justify-center rounded-[8px] border border-[#E2DFFC] bg-[#F1EFFB] p-2">
                <Logo className="max-h-full max-w-full object-contain" />
              </div>
              <button
                type="button"
                className="flex h-[38px] w-fit shrink-0 items-center gap-[8px] rounded-[8px] border border-[#D9DCEA] bg-white px-[14px] text-[13px] font-medium text-[#0A0847] transition hover:border-[#051383]/40"
              >
                <Upload size={15} strokeWidth={2} />
                Upload Logo
              </button>
            </div>
            <p className="text-[11px] leading-[1.45] text-[#6B7280]">
              <span className="block">PNG, JPG or SVG recommended (400×200)</span>
              <span className="block">Current size: 280 × 80 px</span>
            </p>
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-[14px]">
            <div className="flex flex-col gap-[6px]">
              <FieldLabel icon={Heart} iconClass="text-[#E11D48]">
                Give Link
              </FieldLabel>
              <UrlInput defaultValue="https://faithly.org/give" />
            </div>

            <div className="grid grid-cols-1 gap-[14px] min-[560px]:grid-cols-2">
              <div className="flex w-full max-w-[284px] min-w-0 flex-col gap-[6px]">
                <FieldLabel icon={FaApple} iconClass="text-black">
                  Apple App Store Link
                </FieldLabel>
                <UrlInput defaultValue={APPLE_URL} />
              </div>
              <div className="flex w-full max-w-[284px] min-w-0 flex-col gap-[6px]">
                <FieldLabel icon={GooglePlayMark}>Google Play Store Link</FieldLabel>
                <UrlInput defaultValue={PLAY_URL} />
              </div>
            </div>
          </div>
        </Split>

        <div className="flex items-center gap-2 rounded-[8px] border border-[#EAE6FB] bg-[#F3F2FD] px-3 py-2.5">
          <Info size={16} strokeWidth={2} className="shrink-0 text-[#051383]" />
          <span className="text-[12px] leading-[1.45] text-[#0A0847]">
            QR codes are automatically generated from your App Store and Google Play links and will
            update on the landing page.
          </span>
        </div>
      </section>

      {/* ================= CARD 2 : Media & Features ================= */}
      <section className={CARD}>
        <CardHeader
          icon={Video}
          title="Media & Features"
          subtitle="Manage your promo video and key features that appear on the landing page."
        />

        <Split leftClass="min-[860px]:w-[253px]">
          <div className="flex flex-col gap-[6px]">
            <FieldLabel icon={FaApple} iconClass="text-black">
              Apple App Store Link
            </FieldLabel>
            <UrlInput defaultValue={APPLE_URL} />
            <p className="text-[11px] leading-[1.4] text-[#6B7280]">
              Add a YouTube or Vimeo link to your promo video.
            </p>
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-[12px]">
            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
              <span className="flex shrink-0 items-center gap-[7px]">
                <Star size={16} strokeWidth={2} className="text-[#0A0847]" />
                <span className="text-[15px] font-semibold text-[#0A0847]">Features</span>
              </span>
              <p className="min-w-0 flex-1 text-right text-[11px] leading-[1.4] text-[#6B7280]">
                These features appear in the "Powerful Features" section.
              </p>
            </div>

            <div className="flex flex-col gap-[12px]">
              {features.map((feature) => (
                <div key={feature.id} className="flex items-center gap-[12px]">
                  <GripVertical
                    size={18}
                    strokeWidth={1.8}
                    className="shrink-0 text-[#0A0847]"
                  />
                  <input
                    type="text"
                    value={feature.name}
                    onChange={(event) => updateFeature(feature.id, "name", event.target.value)}
                    className={`${INPUT_BASE} w-[230px] shrink-0 pl-[11px]`}
                  />
                  <input
                    type="text"
                    value={feature.desc}
                    onChange={(event) => updateFeature(feature.id, "desc", event.target.value)}
                    className={`${INPUT_BASE} min-w-0 flex-1 pl-[11px]`}
                  />
                  <button
                    type="button"
                    aria-label="Remove feature"
                    onClick={() => removeFeature(feature.id)}
                    className="ml-[58px] shrink-0 text-[#E11D48] transition hover:text-[#BE123C]"
                  >
                    <Trash2 size={17} strokeWidth={1.8} />
                  </button>
                </div>
              ))}

              <div className="flex items-center">
                <button
                  type="button"
                  onClick={addFeature}
                  className={`${DASHED_BTN} min-w-[173px] text-[#0A0847]`}
                >
                  <Plus size={15} strokeWidth={2.2} />
                  Add Feature
                </button>
              </div>
            </div>
          </div>
        </Split>
      </section>

      {/* ================= CARD 3 : Contact & Social ================= */}
      <section className={CARD}>
        <CardHeader
          icon={UserPlus}
          title="Contact & Social"
          subtitle="Manage your contact information and social media links."
        />

        <div className="grid grid-cols-1 gap-[15px] min-[520px]:grid-cols-2 min-[860px]:grid-cols-[0.85fr_1fr_1fr_1fr]">
          <div className="group flex min-w-0 flex-col gap-[6px]">
            <FieldLabel icon={Mail}>Email Address</FieldLabel>
            <UrlInput defaultValue="hello@faithlyplus.com" withIcon={false} />
          </div>

          {socials.map((social) => {
            const brand = SOCIAL_ICONS[social.icon];
            const Icon = brand ? brand.Icon : LinkIcon;
            const iconClass = brand ? brand.color : "text-[#6B7280]";
            return (
              <div key={social.id} className="flex min-w-0 flex-col gap-[6px]">
                <span className="flex items-center gap-[6px]">
                  <Icon size={14} className={`shrink-0 ${iconClass}`} />
                  {social.editable ? (
                    <input
                      type="text"
                      value={social.platform}
                      onChange={(event) => updateSocial(social.id, "platform", event.target.value)}
                      placeholder="Platform"
                      className="min-w-0 flex-1 bg-transparent text-[12px] font-medium text-[#0A0847] outline-none placeholder:text-[#9AA1B2]"
                    />
                  ) : (
                    <span className="min-w-0 truncate text-[12px] font-medium text-[#0A0847]">
                      {social.platform}
                    </span>
                  )}
                </span>
                <UrlInput
                  value={social.value}
                  onChange={(event) => updateSocial(social.id, "value", event.target.value)}
                />
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={addSocial}
          className={`${DASHED_BTN} min-w-[164px] text-[#0A0847]/80`}
        >
          <Plus size={15} strokeWidth={2.2} />
          Add Social
        </button>
      </section>

      {/* ================= FOOTER ================= */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-[10px]">
          <ShieldCheck size={24} strokeWidth={1.8} className="shrink-0 text-[#0A0847]" />
          <span className="text-[13px] text-[#6B7280]">
            Your changes will be reflected on the live site immediately.
          </span>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:gap-3">
          <button
            type="button"
            className="h-[42px] w-full rounded-[8px] border border-[#D9DCEA] bg-white text-[13px] font-medium text-[#0A0847] transition hover:border-[#051383]/40 sm:w-[110px]"
          >
            Cancel
          </button>
          <button
            type="button"
            className="flex h-[42px] w-full items-center justify-center gap-[8px] rounded-[8px] bg-[#051383] text-[13px] font-medium text-white transition hover:bg-[#040F66] sm:w-[124px]"
          >
            <Save size={15} strokeWidth={2} />
            Save draft
          </button>
        </div>
      </div>
    </div>
  );
}
