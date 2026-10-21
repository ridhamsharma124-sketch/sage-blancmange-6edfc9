import React, { useRef, useState } from "react";
import { FiCheck, FiEdit2, FiRefreshCw, FiImage, FiUpload, FiClock, FiVolume2 } from "react-icons/fi";
import AISummary from "./aiSummary";
import { randomImage, randomSample } from "./aiUtils";

const Btn = ({ icon: Icon, children, onClick }) => (
  <button type="button" onClick={onClick}
    className="py-2.5 border border-[#E2DFFC] rounded-md text-[11px] font-semibold text-[#001984] flex items-center justify-center gap-2 hover:bg-[#F3F2FF] cursor-pointer">
    <Icon size={13} /> {children}
  </button>
);

export default function AIPreviewCard({ reg, items, setItems, s }) {
  const [editing, setEditing] = useState(null);
  const fileRef = useRef(null);
  const target = useRef(null);
  const { PreviewBody } = reg;
  const patch = (id, p) => setItems((l) => l.map((x) => (x.id === id ? { ...x, ...p } : x)));

  const stacked = reg.previewLayout === "stacked";

  return (
    <div className="bg-white border border-[#E2DFFC] rounded-lg p-5">
     <div className="flex items-start justify-between gap-4">
  <div>
    <h3 className="text-sm font-semibold text-[#0A0847]">Generated Preview</h3>
    {reg.previewSub !== false && (
      <p className="text-xs text-[#0A084799] font-medium mt-1">
        {typeof reg.previewSub === "string" ? reg.previewSub : "Review sample questions that will be generated."}
      </p>
    )}
  </div>
  {reg.countBadge && <span className="px-3 py-1.5 rounded bg-[#E4E1F7] text-xs font-semibold text-[#0A0847CC]">{s.count} Questions</span>}
</div>

      <input ref={fileRef} type="file" accept="image/*" className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f && target.current) patch(target.current, { img: URL.createObjectURL(f) });
          e.target.value = "";
        }} />

      <div className="mt-5 divide-y divide-[#E2DFFC]">
        {items.map((it, i) => (
          <div key={it.id} className="py-5 first:pt-0">
            <div className="flex items-center gap-3 mb-3">
              <button type="button" onClick={() => patch(it.id, { selected: !it.selected })}
                className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer ${
                  it.selected ? "bg-[#001984] border-[#001984] text-white" : "border-[#0A0847CC] bg-white"}`}>
                {it.selected && <FiCheck size={13} strokeWidth={3} />}
              </button>
              <span className="px-4 py-1.5 rounded-md bg-[#E4E1F7] text-xs font-semibold text-[#0A0847CC]">{it.level}</span>
              {reg.levelBadge && (
  <span className="ml-auto px-3 py-1.5 rounded bg-[#E4E1F7] text-xs font-semibold text-[#0A0847CC] flex items-center gap-1.5">
    <FiClock size={13} /> {reg.levelBadge(s)}
  </span>
)}
            </div>
            <div className={`flex gap-4 ${stacked ? "flex-col" : "flex-col sm:flex-row"}`}>
  {s.images && (stacked ? (
    <div className="flex gap-1 rounded-md overflow-hidden">
      <img src={it.img} alt="" className="flex-1 min-w-0 h-52 object-cover" />
      {it.img2 && <img src={it.img2} alt="" className="flex-1 min-w-0 h-52 object-cover" />}
    </div>
  ) : (
    <img src={it.img} alt="" className="w-full sm:w-48 h-52 object-cover rounded-md shrink-0" />
  ))}
              <div className="flex-1 min-w-0">
                {editing === it.id ? (
                  <textarea autoFocus rows={3} value={it.q} onChange={(e) => patch(it.id, { q: e.target.value })}
                    onBlur={() => setEditing(null)}
                    className="w-full border border-[#E2DFFC] rounded-md p-2 text-sm outline-none focus:border-[#001984]" />
                ) : (
                  <PreviewBody it={it} i={i} s={s} />
                )}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <Btn icon={FiEdit2} onClick={() => setEditing(it.id)}>Edit</Btn>
                  <Btn icon={FiRefreshCw} onClick={() => patch(it.id, randomSample(reg.samples, it.q))}>Regenerate Question</Btn>
<Btn icon={FiImage} onClick={() => patch(it.id, { img: randomImage(it.img), ...(it.img2 ? { img2: randomImage(it.img2) } : {}) })}>Regenerate Image</Btn>   
               <Btn icon={FiUpload} onClick={() => { target.current = it.id; fileRef.current?.click(); }}>Replace Image</Btn>
               {reg.audio && <Btn icon={FiVolume2} onClick={() => patch(it.id, { audioV: Date.now() })}>Regenerate Audio</Btn>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {reg.previewNote !== false && (
        <p className="text-xs italic text-[#0A084799] mt-4">Preview is for example only. Generated content may vary.</p>
      )}
      {reg.summary && <AISummary reg={reg} s={s} />}
    </div>
  );
}