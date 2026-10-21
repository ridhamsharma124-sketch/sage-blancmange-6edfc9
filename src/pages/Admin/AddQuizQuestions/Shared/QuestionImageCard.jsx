import React, { useRef } from "react";
import { FiUpload, FiImage } from "react-icons/fi";
import { Card } from "./ui";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"; // TODO: chapter default from API

export default function QuestionImageCard({ image, onChange, defaultImage = DEFAULT_IMAGE, onGenerate }) {
  const ref = useRef(null);

  const pick = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onChange(URL.createObjectURL(file));
    e.target.value = "";
  };

  return (
    <Card title="Question Image" subtitle="Chapter default image">
      <input ref={ref} type="file" accept="image/*" onChange={pick} className="hidden" />
      <img src={image || defaultImage} alt="Question" className="w-full h-44 object-cover rounded-md" />
      <p className="text-[10px] italic text-[#0A084799] mt-2">Applied to this question only.</p>
      <button
        type="button"
        onClick={() => ref.current?.click()}
        className="w-full mt-4 py-2.5 border border-[#E2DFFC] rounded-md text-[11px] font-semibold text-[#0A0847CC] flex items-center justify-center gap-2 hover:bg-gray-50 cursor-pointer"
      >
        <FiUpload size={13} /> Replace Default
      </button>
      <button
        type="button"
        onClick={() => onGenerate?.() ?? console.log("generate ai image")}
        className="w-full mt-3 py-2.5 border border-[#001984] bg-[#EEF0FB] rounded-md text-[11px] font-semibold text-[#0A0847CC] flex items-center justify-center gap-2 hover:bg-[#E4E8F8] cursor-pointer"
      >
        <FiImage size={13} /> Generate AI Image
      </button>
    </Card>
  );
}