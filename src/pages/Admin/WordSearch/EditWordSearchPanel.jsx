import { useEffect, useState } from "react";
import { LuX, LuImage, LuSparkles } from "react-icons/lu";

/* ==========================================================================
   DESIGN TOKENS
   ========================================================================== */
const NAVY = "#001984";
const HEADING = "#1B1F4B";
const GRAY = "#6B7194";
const BORDER = "#E4E7F5";
const GREEN = "#2EB84B";

const DETAIL_ROWS = [
  ["Type", "Hidden Restoration"],
  ["Bible Location", "Genesis 1"],
  ["Level", "Level 1"],
  ["Words / Items", "12 words"],
  ["Image Source", "Chapter Default"],
  ["Created By", "Admin User"],
  ["Created", "May 20, 2025 12:30 AM"],
  ["Updated", "May 20, 2025 12:32 AM"],
];

const TABS = ["Details", "Activity", "History"];

/* ==========================================================================
   EDIT WORD SEARCH — centered modal
   ========================================================================== */
export default function EditWordSearchPanel({ row, onClose }) {
  const [tab, setTab] = useState("Details");
  const [open, setOpen] = useState(false);
  const [isPublished, setIsPublished] = useState(true);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setOpen(true));
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-[4px] transition-opacity duration-200 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
        aria-hidden
      />

      <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4">
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Edit Word Search"
          className={`pointer-events-auto my-auto flex max-h-[92vh] w-[760px] max-w-full flex-col overflow-hidden rounded-[8px] border bg-white shadow-[0_24px_48px_rgba(0,0,0,0.25)] transition-all duration-200 ${
            open ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
          style={{ borderColor: BORDER }}
        >
          {/* header */}
          <div className="flex items-start justify-between gap-3 border-b px-6 py-5" style={{ borderColor: BORDER }}>
            <h2 className="text-[20px] font-bold" style={{ color: HEADING }}>
              Edit Word Search
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex h-[26px] w-[26px] shrink-0 cursor-pointer items-center justify-center rounded-full border transition-colors hover:bg-[#F0F2FB]"
              style={{ borderColor: NAVY, color: NAVY }}
            >
              <LuX size={13} />
            </button>
          </div>

          {/* identity */}
          <div className="flex items-center gap-4 px-6 pt-5">
            <img
              src={row.image}
              alt=""
              className="h-[112px] w-[112px] shrink-0 rounded-[8px] border object-cover object-top"
              style={{ borderColor: BORDER }}
            />
            <div className="min-w-0">
              <p className="text-[24px] leading-tight font-bold" style={{ color: HEADING }}>
                {row.topic}
              </p>
              <p className="mt-1.5 text-[13px]" style={{ color: GRAY }}>
                {row.location} &bull; {row.level}
              </p>
              <span
                className="mt-2.5 inline-block rounded-full px-[10px] py-[3px] text-[11px] font-semibold"
                style={{ backgroundColor: "#E3F7E6", color: GREEN }}
              >
                {row.status}
              </span>
            </div>
          </div>

          {/* tabs */}
          <div className="mt-5 flex items-center gap-6 px-6">
            {TABS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`-mb-px cursor-pointer text-[13px] ${tab === t ? "font-bold" : ""}`}
                style={{ color: tab === t ? HEADING : GRAY }}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="mx-6 h-px w-[calc(100%-48px)]" style={{ backgroundColor: BORDER }} />
          {tab === "Details" ? (
            <div className="-mt-px mx-6 mb-0 h-[3px] w-[68px] shrink-0" style={{ backgroundColor: NAVY }} />
          ) : (
            <p className="px-6 py-10 text-center text-[13px]" style={{ color: GRAY }}>
              No {tab.toLowerCase()} to show.
            </p>
          )}

          {/* body */}
          {tab === "Details" && (
            <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
              <div className="flex items-start gap-6">
                {/* puzzle image */}
                <div className="w-[300px] shrink-0">
                  <h3 className="text-[14px] font-bold" style={{ color: HEADING }}>
                    Puzzle Image
                  </h3>
                  <img
                    src={row.image}
                    alt={`${row.topic} puzzle image`}
                    className="mt-3 h-[260px] w-[300px] rounded-[8px] border object-cover object-top"
                    style={{ borderColor: BORDER }}
                  />
                  <button
                    type="button"
                    className="mt-3 flex h-[42px] w-full cursor-pointer items-center justify-center gap-2 rounded-[8px] border bg-white text-[13px] font-semibold transition-colors hover:bg-[#F0F2FB]"
                    style={{ borderColor: NAVY, color: NAVY }}
                  >
                    <LuImage size={16} />
                    Replace Image
                  </button>
                  <button
                    type="button"
                    className="mt-2.5 flex h-[42px] w-full cursor-pointer items-center justify-center gap-2 rounded-[8px] text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: NAVY }}
                  >
                    <LuSparkles size={16} />
                    Generate AI Image
                  </button>
                </div>

                {/* details */}
                <div className="min-w-0 flex-1">
                  <dl className="flex flex-col gap-4">
                    {DETAIL_ROWS.map(([label, value]) => (
                      <div key={label} className="flex items-start justify-between gap-4">
                        <dt className="text-[13px] font-bold" style={{ color: GRAY }}>
                          {label}
                        </dt>
                        <dd className="text-right text-[13px]" style={{ color: GRAY }}>
                          {value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div className="my-6 h-px w-full" style={{ backgroundColor: BORDER }} />

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[13px] font-bold" style={{ color: GRAY }}>
                      Status
                    </span>
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        role="switch"
                        aria-checked={isPublished}
                        aria-label="Toggle status"
                        onClick={() => setIsPublished(!isPublished)}
                        className="relative h-[18px] w-[32px] shrink-0 cursor-pointer rounded-full transition-colors"
                        style={{ backgroundColor: isPublished ? GREEN : "#D9DCEA" }}
                      >
                        <span
                          className="absolute top-[2px] h-[14px] w-[14px] rounded-full bg-white shadow-sm transition-all"
                          style={{ left: isPublished ? 16 : 2 }}
                        />
                      </button>
                      <span
                        className="text-[13px] font-semibold"
                        style={{ color: isPublished ? GREEN : GRAY }}
                      >
                        {isPublished ? "Published" : "Unpublished"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* footer */}
          <div className="border-t p-6" style={{ borderColor: BORDER }}>
            <button
              type="button"
              onClick={onClose}
              className="flex h-12 w-full cursor-pointer items-center justify-center rounded-[8px] text-[14px] font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: NAVY }}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
