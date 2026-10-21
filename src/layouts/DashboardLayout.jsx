import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  PiArrowSquareOut,
  PiBell,
  PiBookOpenText,
  PiCalendarBlank,
  PiCaretDown,
  PiCaretRight,
  PiCards,
  PiClipboardText,
  PiDotsThreeCircle,
  PiFire,
  PiGameController,
  PiGear,
  PiGift,
  PiHandPeace,
  PiHandsPraying,
  PiHeadphones,
  PiHouse,
  PiIdentificationCard,
  PiImages,
  PiLeaf,
  PiListChecks,
  PiList,
  PiMagnifyingGlass,
  PiMedal,
  PiPuzzlePiece,
  PiNotebook,
  PiSignOut,
  PiSparkle,
  PiSpeakerHigh,
  PiTicket,
  PiUserCircle,
  PiUsers,
  PiX,
} from "react-icons/pi";
import Logo from "../components/shared/Logo";

/* ---------------- Sidebar ---------------- */
/*
  Dashboard -> Subscription -> Daily -> Pray with Me -> Seasonal Journey ->
  Audio Stories -> Bible -> Users -> Questions -> Broad Spectrum -> Group Play ->
  Journal -> Media Library -> Settings -> Badges -> Coupon -> Gifts and Donation ->
  Sounds/Audio -> AI Engagement -> Mystery Card -> Quiz Management -> More Info
*/

const NAV_GROUPS = [
  [{ id: "dashboard", label: "Dashboard", icon: PiHouse, path: "/admin" }],
  [
    {
      id: "subscription",
      label: "Subscription",
      icon: PiIdentificationCard,
      path: "/admin/subscriptions",
    },
  ],
  [
    {
      id: "daily",
      label: "Daily",
      icon: PiCalendarBlank,
      children: [
        { id: "daily-verse", label: "Daily Verse", path: "/admin/dailyverse" },
        { id: "daily-reflection", label: "Daily Reflection", path: "/admin/dailyreflection" },
      ],
    },
    { id: "pray", label: "Pray with Me", icon: PiHandsPraying, path: "/admin/pray-with-me" },
    { id: "seasonal", label: "Seasonal Journey", icon: PiLeaf, path: "/admin/seasonal-journey" },
    { id: "audio", label: "Audio Stories", icon: PiHeadphones, path: "/admin/chapter-stories" },
    {
      id: "bible",
      label: "Bible",
      icon: PiBookOpenText,
      children: [
        { id: "bible-books", label: "Books", path: "/admin/bible-books" },
        {
          id: "bible-activities",
          label: "Activities",
          noNavigate: true,
          children: [
            {
              id: "act-overview",
              label: "Activities",
              path: "/admin/activities",
            },
            {
              id: "act-ws-add",
              label: "Add Word Search",
              path: "/admin/activities/word-search/add",
            },
            {
              id: "act-audio-add",
              label: "Add Chapter Audio Story",
              path: "/admin/activities/chapter-audio-story/add",
            },
            {
              id: "act-mv-add",
              label: "Add Memory Verse",
              path: "/admin/activities/memory-verse/add",
            },
          ],
        },
        { id: "memory-verses", label: "Memory Verses", path: "/admin/memory-verse" },
      ],
    },
  ],
  [
    {
      id: "users",
      label: "Users",
      icon: PiUsers,
      children: [
        { id: "users-list", label: "Users", path: "/admin/users" },
        { id: "roles-permissions", label: "Roles & Permissions", path: "/admin/users/roles-permissions" },
      ],
    },
    {
      id: "questions",
      label: "Questions",
      icon: PiClipboardText,
      children: [
        { id: "manage-questions", label: "Manage Questions" },
        { id: "question-types", label: "Question Types", path: "/admin/questions/quiz/add" },
        { id: "level-management", label: "Level Management", path: "/admin/levels" },
        {
          id: "ai-generator",
          label: "AI Generator",
          path: "/admin/activities/quiz/ai-generator",
        },
        {
          id: "bulk-upload",
          label: "Bulk Upload",
          path: "/admin/activities/quiz/bulk-upload",
        },
      
        {
          id: "add-quiz-questions",
          label: "Add Quiz Questions",
          path: "/admin/activities/quiz/add-questions",
        },
        {
          id: "add-question-manually",
          label: "Add Question Manually",
          path: "/admin/activities/quiz/add-question-manually",
        },
      ],
    },
    { id: "broad-spectrum", label: "Broad Spectrum", icon: PiHandPeace, path: "/admin/broad-spectrum" },
    { id: "group-play", label: "Group Play", icon: PiGameController, path: "/admin/group-play-settings" },
    { id: "divine-counsel", label: "Divine Counsel", icon: PiGameController, path: "/admin/divine-counsel" },
    { id: "journal", label: "Journal", icon: PiNotebook, path: "/admin/journal-settings" },
    { id: "media-library", label: "Media Library", icon: PiImages },
    {
      id: "settings",
      label: "Settings",
      icon: PiGear,
      children: [
        { id: "set-site", label: "Site Settings", path: "/admin/settings/site-settings" },
        { id: "set-website", label: "Website Management", path: "/admin/website-management" },
        { id: "set-ai", label: "AI Model" },
        { id: "set-look", label: "Lock & Feel" },
        { id: "set-email", label: "Email Service" },
      ],
    },
  ],
  [
    {
      id: "badges-group",
      label: "Badges",
      icon: PiMedal,
      noNavigate: true,
      children: [
        { id: "badges", label: "Badges", path: "/admin/badges" },
        { id: "tiers", label: "Tiers Management", path: "/admin/tiers" },
      ],
    },
    {
      id: "streaks-group",
      label: "Streak Management",
      icon: PiFire,
      noNavigate: true,
      children: [
        {
          id: "streak-management",
          label: "Streak Management",
          path: "/admin/streaks/management",
        },
        {
          id: "streaks",
          label: "Streak Milestones & Rewards",
          path: "/admin/streaks",
        },
      ],
    },
    {
      id: "word-search",
      label: "Word Search",
      icon: PiPuzzlePiece,
      noNavigate: true,
      children: [
        { id: "ws-management", label: "Word Search Management", path: "/admin/word-search" },
        {
          id: "ws-manual-hidden",
          label: "Manual — Hidden Restoration",
          path: "/admin/word-search/add-edit/manual-hidden",
        },
        {
          id: "ws-manual-verse",
          label: "Manual — Verse Restoration",
          path: "/admin/word-search/add-edit/manual-verse",
        },
        {
          id: "ws-manual-audio",
          label: "Manual — Audio Revelation",
          path: "/admin/word-search/add-edit/manual-audio",
        },
        {
          id: "ws-manual-mystery",
          label: "Manual — Mystery Scripture",
          path: "/admin/word-search/add-edit/manual-mystery",
        },
        {
          id: "ws-ai",
          label: "AI Generate",
          noNavigate: true,
          children: [
            {
              id: "ws-ai-choose",
              label: "Choose Activity Type",
              path: "/admin/word-search/add-edit/ai-generate",
            },
            {
              id: "ws-ai-verse",
              label: "Verse Restoration",
              path: "/admin/word-search/add-edit/ai-generate/verse-restoration",
            },
            {
              id: "ws-ai-mystery",
              label: "Mystery Scripture",
              path: "/admin/word-search/add-edit/ai-generate/mystery-scripture",
            },
            {
              id: "ws-ai-audio",
              label: "Audio Revelation",
              path: "/admin/word-search/add-edit/ai-generate/audio-revelation",
            },
          ],
        },
        {
          id: "ws-csv",
          label: "CSV Upload",
          noNavigate: true,
          children: [
            {
              id: "ws-csv-upload",
              label: "Upload File",
              path: "/admin/word-search/add-edit/csv-upload",
            },
            {
              id: "ws-csv-validate",
              label: "Validate & Map",
              path: "/admin/word-search/add-edit/csv-upload/validate-map",
            },
            {
              id: "ws-csv-review",
              label: "Review Images",
              path: "/admin/word-search/add-edit/csv-upload/review-images",
            },
            {
              id: "ws-csv-import",
              label: "Import Review",
              path: "/admin/word-search/add-edit/csv-upload/import-review",
            },
          ],
        },
      ],
    },
    { id: "coupon", label: "Coupon", icon: PiTicket, path: "/admin/coupon-codes" },
    { id: "gifts", label: "Gifts and Donation", icon: PiGift, path: "/admin/donations" },
    {
      id: "sounds",
      label: "Sounds/Audio",
      icon: PiSpeakerHigh,
      path: "/admin/sound-audio",
    },
    {
      id: "ai",
      label: "AI Engagement",
      icon: PiSparkle,
      children: [
        {
          id: "ai-overview",
          label: "AI Overview & Usage",
          path: "/admin/ai-engagement/overview",
        },
        {
          id: "ai-experience",
          label: "AI Experience Setup",
          path: "/admin/ai-engagement/experience",
        },
        {
          id: "ai-credits",
          label: "AI Credits & Info",
          path: "/admin/ai-engagement/credits",
        },
      ],
    },
    {
      id: "mystery-card",
      label: "Mystery Card",
      icon: PiCards,
      path: "/admin/mystery-card",
    },
    {
      id: "quiz-mgmt-group",
      label: "Quiz Management",
      icon: PiListChecks,
      noNavigate: true,
      children: [
        {
          id: "quiz-management",
          label: "Quiz Management",
          path: "/admin/quiz-management",
        },
        {
          id: "quiz-management-ai-generator",
          label: "AI Generator",
          path: "/admin/quiz-management/ai-generator",
        },
      ],
    },
  ],
  [
    {
      id: "more",
      label: "More Info",
      icon: PiDotsThreeCircle,
      children: [
        {
          id: "help-center",
          label: "Help Center",
          path: "/admin/help-center",
        },
        {
          id: "terms-policies",
          label: "Terms&Policies",
          path: "/admin/terms-privacy",
        },
        {
          id: "support-inbox",
          label: "Support Inbox & Settings",
          path: "/admin/support-inbox",
        },
      ],
    },
  ],
];

const NAV_PATH_MAP = (() => {
  const map = {};
  const walk = (items) => {
    items.forEach((item) => {
      if (Array.isArray(item)) return walk(item);
      if (item.path) map[item.path] = item.id;
      if (item.children) walk(item.children);
    });
  };
  walk(NAV_GROUPS);
  return map;
})();

/* maps "<pathname><search>" -> nav id, for any item that still differs by query
   string. Empty when no nav path carries a query string. */
const NAV_QUERY_MAP = (() => {
  const map = {};
  const walk = (items) => {
    items.forEach((item) => {
      if (Array.isArray(item)) return walk(item);
      if (item.path && item.path.includes("?")) map[item.path] = item.id;
      if (item.children) walk(item.children);
    });
  };
  walk(NAV_GROUPS);
  return map;
})();

/* true when `id` exists anywhere in the (possibly nested) children tree */
const hasActiveIn = (items, id) =>
  items.some((it) => it.id === id || (it.children && hasActiveIn(it.children, id)));

function NavItem({ item, active, collapsed, onNavigate, depth = 0 }) {
  const hasChildren = item.children && item.children.length > 0;
  const hasActiveChild = hasChildren && hasActiveIn(item.children, active);
  const isActive = active === item.id || hasActiveChild;
  /* groups with children start open so their labels are visible in the
     expanded sidebar; the caret still toggles them. */
  const [open, setOpen] = useState(() => hasChildren);
  const isOpen = open || hasActiveChild;

  const Icon = item.icon;
  const isChild = depth > 0;

  const handleClick = () => {
    if (hasChildren) setOpen((v) => !v);
    if (item.noNavigate) return;
    onNavigate(item);
  };

  if (collapsed) {
    return (
      <button
        onClick={handleClick}
        title={item.label}
        className={`flex h-10 w-10 items-center justify-center rounded-nav transition ${
          isActive ? "bg-navy-hover text-white" : "text-muted hover:bg-navy-hover/40 hover:text-white"
        }`}
      >
        {Icon && <Icon size={16} strokeWidth={1.5} />}
      </button>
    );
  }

  return (
    <div>
      <button
        onClick={handleClick}
        className={
          isChild
            ? `flex h-9 w-full items-center rounded-md px-1.5 text-[13px] transition ${
                isActive ? "font-semibold text-white" : "text-[#a8b3d8] hover:text-white"
              }`
            : `flex h-10 w-full items-center gap-3 rounded-nav px-3 text-[14px] transition ${
                isActive
                  ? "bg-navy-hover font-bold text-white"
                  : "text-muted hover:bg-navy-hover/40 hover:text-white"
              }`
        }
      >
        {Icon && (
          <Icon size={16} className={isActive ? "text-white" : "text-muted"} strokeWidth={1.5} />
        )}
        <span className="flex-1 truncate text-left">{item.label}</span>
        {hasChildren && (isOpen ? <PiCaretDown size={14} /> : <PiCaretRight size={14} />)}
      </button>

      {hasChildren && isOpen && (
        <div
          className={`border-l border-white/20 pl-2.5 ${isChild ? "ml-[16px]" : "ml-[20px]"}`}
        >
          {item.children.map((child) => (
            <NavItem
              key={child.id}
              item={child}
              active={active}
              collapsed={collapsed}
              onNavigate={onNavigate}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function Sidebar({ collapsed, mobileOpen, onToggle, onClose, active, onNavigate }) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex h-[100dvh] w-[250px] shrink-0 flex-col bg-[#012859] transition-all duration-200 lg:sticky lg:top-0 lg:bottom-auto lg:z-auto lg:translate-x-0 ${
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      } ${collapsed ? "lg:w-[72px]" : "lg:w-[250px]"}`}
    >
      <div
        className={`relative flex shrink-0 items-center border-b border-white/10 ${
          collapsed ? "h-[88px] flex-col justify-center gap-[6px]" : "h-[108px] justify-start px-[24px]"
        }`}
      >
        <Logo
          className={`object-contain object-left ${
            collapsed ? "h-[40px] w-auto" : "h-[92px] w-[209px]"
          }`}
        />

        {!collapsed && (
          <button
            onClick={onClose}
            title="Close sidebar"
            className="absolute right-[16px] top-[16px] z-20 flex h-7 w-7 items-center justify-center rounded-md text-muted transition hover:bg-navy-hover/50 hover:text-white lg:hidden"
          >
            <PiX size={16} />
          </button>
        )}

        {collapsed ? (
          <button
            onClick={onToggle}
            title="Expand sidebar"
            className="flex h-7 w-7 items-center justify-center rounded-md text-muted transition hover:bg-navy-hover/50 hover:text-white"
          >
            <PiCaretRight size={14} />
          </button>
        ) : (
          <button
            onClick={onToggle}
            title="Collapse sidebar"
            className="absolute -right-[10px] top-1/2 z-20 hidden h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white text-navy shadow-sm transition hover:bg-surface lg:flex"
          >
            <PiCaretRight size={11} />
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-4 overflow-y-auto px-3 py-4">
        {NAV_GROUPS.map((group, gi) => (
          <div key={gi} className="space-y-1">
            {group.map((item) => (
              <NavItem
                key={item.id}
                item={item}
                active={active}
                collapsed={collapsed}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        ))}
      </nav>

      <div className="border-t border-white/10 p-3">
        <div
          className={`flex items-center rounded-xl border border-white/15 bg-navy-deep/60 p-2.5 ${
            collapsed ? "justify-center border-0" : ""
          }`}
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15">
            <PiUserCircle size={24} className="text-white" />
          </div>
          {!collapsed && (
            <>
              <div className="ml-2.5 min-w-0 flex-1">
                <p className="truncate text-[14px] font-bold text-white">John Doe</p>
                <p className="text-[12px] text-muted">Admin</p>
              </div>
              <PiCaretRight size={13} className="rotate-90 text-muted" />
            </>
          )}
        </div>

        {!collapsed && (
          <button className="mt-2 flex h-10 w-full items-center gap-3 rounded-nav px-3 text-[14px] text-[#fca5a5] transition hover:bg-red-500/10">
            <PiSignOut size={16} strokeWidth={1.5} />
            Logout
          </button>
        )}
      </div>
    </aside>
  );
}

/* ---------------- Navbar ---------------- */

function Navbar({ collapsed, onMenuClick, figmaText = false, bellDot = false }) {
  return (
    <header
      className={`flex h-[72px] shrink-0 items-center justify-between gap-3 whitespace-nowrap border-b border-[#E8ECF4] bg-white px-4 shadow-[0_1px_3px_rgba(16,24,40,0.06)] sm:px-6 ${
        collapsed ? "lg:pl-4 lg:pr-6" : ""
      }`}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <button
          onClick={onMenuClick}
          aria-label="Open sidebar"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line bg-white text-navy transition hover:border-navy/40 lg:hidden"
        >
          <PiList size={20} />
        </button>

        <div className="relative w-[270px] shrink-0">
          <PiMagnifyingGlass
            size={16}
            className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 ${
              figmaText ? "text-heading" : "text-subtext"
            }`}
          />
          <input
            type="text"
            placeholder="Search for more..."
            className="h-[38px] w-full rounded-[8px] border border-[#E4E5F0] bg-white pl-9 pr-3 text-[13px] text-[#6B668F] outline-none transition placeholder:text-[#6B668F] focus:border-navy/40"
          />
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2.5">
        <button className={`flex h-[38px] items-center gap-2 rounded-[8px] border border-[#E4E5F0] bg-white px-2.5 text-[14px] font-medium transition hover:border-navy/40 ${figmaText ? "text-heading" : "text-navy"}`}>
          <svg width="20" height="14" viewBox="0 0 60 42" aria-hidden className="shrink-0">
            <defs>
              <clipPath id="uk-flag-clip">
                <rect width="60" height="42" rx="3" />
              </clipPath>
            </defs>
            <g clipPath="url(#uk-flag-clip)">
              <rect width="60" height="42" fill="#012169" />
              <path d="M0 0 L60 42 M60 0 L0 42" stroke="#FFFFFF" strokeWidth="8" />
              <path d="M0 0 L60 42 M60 0 L0 42" stroke="#C8102E" strokeWidth="4" />
              <path d="M30 0 V42 M0 21 H60" stroke="#FFFFFF" strokeWidth="13" />
              <path d="M30 0 V42 M0 21 H60" stroke="#C8102E" strokeWidth="8" />
            </g>
          </svg>
          <span className="hidden sm:inline">English</span>
          <svg
            className="hidden sm:block"
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
          >
            <path
              d="M1 1l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <span className="h-4 w-px bg-[#E8ECF4]" aria-hidden />

        <button
          className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] border border-[#E4E5F0] bg-white transition hover:border-navy/40 ${figmaText ? "text-heading" : "text-navy"}`}
          aria-label="Notifications"
        >
          <PiBell size={18} />
          {bellDot ? (
            <span
              className="absolute top-[8px] right-[8px] h-[8px] w-[8px] rounded-full bg-[#E11D48]"
              aria-hidden
            />
          ) : (
            <span className="absolute -top-1.5 -right-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#E11D48] px-[4px] text-[10px] font-bold leading-none text-white">
              3
            </span>
          )}
        </button>

        <button className="flex h-[38px] items-center gap-2 rounded-[8px] border border-[#E0E3F5] bg-[#EEF0FB] px-3 text-[14px] font-medium text-[#001984] transition hover:border-[#001984]/40">
          <PiArrowSquareOut size={15} />
          <span className="hidden sm:inline">View Website</span>
        </button>
      </div>
    </header>
  );
}

/* ---------------- Dashboard Layout (Sidebar + Navbar) ---------------- */

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 1024px)").matches,
  );
  const [active, setActive] = useState("dashboard");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const resolvedActive =
    NAV_QUERY_MAP[`${location.pathname}${location.search}`] ??
    NAV_PATH_MAP[location.pathname] ??
    active;

  const handleNavigate = (item) => {
    setActive(item.id);
    if (item.path) navigate(item.path);
    setMobileOpen(false);
  };

  return (
    <div className="flex min-h-screen overflow-x-clip bg-surface">
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden
        />
      )}

      <Sidebar
        collapsed={isDesktop && collapsed}
        mobileOpen={mobileOpen}
        onToggle={() => setCollapsed((v) => !v)}
        onClose={() => setMobileOpen(false)}
        active={resolvedActive}
        onNavigate={handleNavigate}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar
          collapsed={collapsed}
          onMenuClick={() => setMobileOpen(true)}
          figmaText={location.pathname === "/admin/ai-engagement/overview"}
          bellDot={
            location.pathname.startsWith("/admin/ai-engagement/experience") ||
            location.pathname.startsWith("/admin/terms-privacy/edit")
          }
        />
        <main className="flex-1 ">
          <Outlet />
        </main>
      </div>
    </div>
  );
}