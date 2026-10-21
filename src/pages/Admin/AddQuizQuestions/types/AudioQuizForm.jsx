import React, { useRef, useState } from "react";
import { FiMusic, FiPlay, FiPause, FiCheck, FiX, FiPlus, FiChevronDown } from "react-icons/fi";
import { MdDragIndicator } from "react-icons/md";
import { Card, Counter, FieldError, inputCls, errCls } from "../Shared/ui";
import useDragReorder from "../Shared/useDragReorder";

const uid = () => crypto.randomUUID();
const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
const FORMATS = ["Multiple Choice", "True / False", "Fill in the Blank"];

export const config = {
  label: "Audio Quiz",
  subtitle: "Create a new question manually",
  badge: null,
  statusHint: false,
  initialData: () => {
    const correct = uid();
    return {
      // Demo audio meta to match the design; replaced on upload
      audio: { name: "creation-narration.mp3", size: "2.4 MB", format: "MP3", secs: 84, url: "" },
      prompt: "What did God call the light?",
      format: "Multiple Choice",
      choices: [
        { id: uid(), text: "The sun and the moon" },
        { id: uid(), text: "The sun and the moon" },
        { id: correct, text: "The sun and the moon" },
        { id: uid(), text: "The sun and the moon" },
      ],
      correctId: correct,
      transcript: "In the beginning, God created the heavens and the earth. And God said, “Let there be light,” and there was light.",
      explanation: "God called the light “Day” and the darkness he called “Night”.",
      scripture: "Genesis 1:5",
      hint: "",
    };
  },
  validate: (d) => {
    const e = {};
    if (!d.audio?.name) e.audio = "Upload an audio file.";
    if (!d.prompt.trim()) e.prompt = "Question prompt is required.";
    if (d.choices.length < 2 || d.choices.some((c) => !c.text.trim())) e.choices = "Fill in all choices (min 2).";
    if (!d.choices.some((c) => c.id === d.correctId)) e.correct = "Select the correct answer.";
    return e;
  },
};

const Waveform = ({ progress }) => (
  <div className="flex-1 flex items-center gap-[2px] h-10">
    {Array.from({ length: 70 }).map((_, i) => (
      <span
        key={i}
        className={`flex-1 rounded-full ${i / 70 < progress ? "bg-[#001984]" : "bg-[#9AA3D4]"}`}
        style={{ height: `${8 + ((i * 37) % 24)}px` }}
      />
    ))}
  </div>
);

export default function AudioQuizForm({ data, onChange, errors }) {
  const fileRef = useRef(null);
  const audioEl = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const { props, dragging } = useDragReorder(data.choices, (choices) => onChange({ choices }));
  const a = data.audio;

  const upload = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setPlaying(false);
    setTime(0);
    onChange({
      audio: {
        name: f.name,
        size: `${(f.size / 1048576).toFixed(1)} MB`,
        format: f.name.split(".").pop().toUpperCase(),
        secs: 0,
        url: URL.createObjectURL(f),
      },
    });
    e.target.value = "";
  };

  const toggle = () => {
    const el = audioEl.current;
    if (!el) return;
    el.paused ? el.play() : el.pause();
  };

  const setText = (id, text) => onChange({ choices: data.choices.map((c) => (c.id === id ? { ...c, text } : c)) });
  const total = a.secs || 0;

  return (
    <Card>
      <div className="space-y-6">
        {/* Audio */}
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-[#0A0847]">Question Audio</h3>
              <p className="text-xs text-[#0A084799] font-medium mt-1">Upload an audio file for the question prompt.</p>
            </div>
            <p className="text-[11px] text-[#0A084799] font-medium">Supported: MP3, WAV, M4A</p>
          </div>
          <input ref={fileRef} type="file" accept="audio/*" onChange={upload} className="hidden" />

          {a.name ? (
            <>
              {a.url && (
                <audio
                  ref={audioEl}
                  src={a.url}
                  onLoadedMetadata={(e) => onChange({ audio: { ...a, secs: e.target.duration } })}
                  onTimeUpdate={(e) => setTime(e.target.currentTime)}
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                  onEnded={() => setPlaying(false)}
                  className="hidden"
                />
              )}
              <div className="mt-3 flex items-center gap-4 border border-[#E2DFFC] bg-[#F8FAFC] rounded-md p-3">
                <span className="w-12 h-12 rounded-md bg-[#001984] text-white flex items-center justify-center shrink-0">
                  <FiMusic size={22} />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#0A0847] truncate">{a.name}</p>
                  <p className="text-[11px] text-[#0A084799] font-medium mt-0.5">
                    {a.format} &nbsp;•&nbsp; {a.size} &nbsp;•&nbsp; {fmt(total)}
                  </p>
                </div>
                <span className="w-8 h-8 rounded-full bg-[#1BA155] text-white flex items-center justify-center">
                  <FiCheck size={16} strokeWidth={3} />
                </span>
              </div>

              <div className="mt-4 flex items-center gap-4 border border-[#E2DFFC] bg-[#F8FAFC] rounded-md px-4 py-3">
                <button
                  type="button"
                  onClick={toggle}
                  disabled={!a.url}
                  title={a.url ? "" : "Upload a file to play"}
                  className="w-11 h-11 rounded-full bg-[#001984] text-white flex items-center justify-center shrink-0 cursor-pointer disabled:opacity-60 disabled:cursor-default"
                >
                  {playing ? <FiPause size={16} /> : <FiPlay size={16} className="ml-0.5" />}
                </button>
                <Waveform progress={total ? time / total : 1} />
                <span className="text-[11px] font-medium text-[#0A0847CC] tabular-nums">
                  {fmt(time || total)} / {fmt(total)}
                </span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <button type="button" onClick={() => fileRef.current?.click()} className="text-[11px] font-semibold text-[#001984] cursor-pointer">
                  Replace audio
                </button>
                <p className="text-[11px] text-[#0A084799] font-medium">Preview first 15 seconds</p>
              </div>
            </>
          ) : (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="mt-3 w-full h-24 border border-dashed border-[#CBC6F8] bg-[#FAFAFF] rounded-md text-xs font-semibold text-[#0A0847] cursor-pointer hover:bg-[#F1F2F9]"
            >
              Upload Audio
            </button>
          )}
          <FieldError>{errors.audio}</FieldError>
        </div>

        {/* Prompt */}
        <div>
          <h3 className="text-sm font-semibold text-[#0A0847] mb-2">Question Prompt</h3>
          <input
            maxLength={200}
            value={data.prompt}
            onChange={(e) => onChange({ prompt: e.target.value })}
            className={`${inputCls} ${errors.prompt ? errCls : ""}`}
          />
          <Counter value={data.prompt} max={200} />
          <FieldError>{errors.prompt}</FieldError>
        </div>

        {/* Format */}
        <div>
          <h3 className="text-sm font-semibold text-[#0A0847] mb-2">Answer Format</h3>
          <div className="relative">
            <select
              value={data.format}
              onChange={(e) => onChange({ format: e.target.value })}
              className={`${inputCls} appearance-none pr-9 cursor-pointer`}
            >
              {FORMATS.map((f) => <option key={f}>{f}</option>)}
            </select>
            <FiChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Choices */}
        <div>
          <div className="flex items-center justify-between mb-3 text-sm text-[#0A0847CC]">
            <span className="font-medium">Answer Choices</span>
            <span className="pr-1">Correct Answer</span>
          </div>
          <div className="space-y-3">
            {data.choices.map((c, i) => {
              const correct = data.correctId === c.id;
              return (
                <div key={c.id} {...props(i)} className={`flex items-center gap-4 ${dragging === i ? "opacity-40" : ""}`}>
                  <input
                    type="radio"
                    name="audio-correct"
                    checked={correct}
                    onChange={() => onChange({ correctId: c.id })}
                    className="accent-[#1BA155] w-5 h-5 cursor-pointer"
                  />
                  <div className="flex-1 flex items-center border border-[#E2DFFC] rounded-md bg-white">
                    <MdDragIndicator size={20} className="text-gray-400 cursor-grab mx-2 shrink-0" />
                    <span className="w-px h-6 bg-[#E2DFFC]" />
                    <input
                      value={c.text}
                      onChange={(e) => setText(c.id, e.target.value)}
                      className="flex-1 text-sm text-[#0A0847CC] outline-none px-3 py-3 bg-transparent"
                    />
                  </div>
                  {correct ? (
                    <span className="w-7 h-7 rounded-full bg-[#1BA155] text-white flex items-center justify-center shrink-0">
                      <FiCheck size={15} strokeWidth={3} />
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        data.choices.length > 2 && onChange({ choices: data.choices.filter((x) => x.id !== c.id) })
                      }
                      className="w-7 h-7 text-[#0A0847CC] flex items-center justify-center shrink-0 cursor-pointer hover:text-[#EB0C10]"
                    >
                      <FiX size={20} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
          <FieldError>{errors.choices || errors.correct}</FieldError>
          <button
            type="button"
            onClick={() => onChange({ choices: [...data.choices, { id: uid(), text: "" }] })}
            className="mt-5 px-10 py-3 border border-[#001984] rounded-md text-sm font-semibold text-[#001984] flex items-center gap-2 hover:bg-[#EEF2FF] cursor-pointer"
          >
            <FiPlus size={16} /> Add Choice
          </button>
        </div>

        <hr className="border-[#E2DFFC]" />

        {/* Text fields */}
        <div>
          <h3 className="text-sm font-semibold text-[#0A0847] mb-2">
            Transcript <span className="font-normal text-[#0A084799]">(recommended)</span>
          </h3>
          <textarea
            rows={2}
            maxLength={1000}
            value={data.transcript}
            onChange={(e) => onChange({ transcript: e.target.value })}
            className={`${inputCls} resize-none`}
          />
          <Counter value={data.transcript} max={1000} />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-[#0A0847] mb-2">Answer Explanation</h3>
          <input
            maxLength={1000}
            value={data.explanation}
            onChange={(e) => onChange({ explanation: e.target.value })}
            className={inputCls}
          />
          <Counter value={data.explanation} max={1000} />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-[#0A0847] mb-2">Scripture Reference</h3>
          <input value={data.scripture} onChange={(e) => onChange({ scripture: e.target.value })} className={inputCls} />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-[#0A0847] mb-2">
            Hint <span className="font-normal text-[#0A084799]">(optional)</span>
          </h3>
          <input value={data.hint} onChange={(e) => onChange({ hint: e.target.value })} className={inputCls} />
        </div>
      </div>
    </Card>
  );
}