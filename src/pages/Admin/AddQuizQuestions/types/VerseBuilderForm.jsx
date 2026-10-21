import React, { useRef, useEffect, useState } from "react";
import { FiTrash2, FiPlus, FiX, FiGrid, FiBold, FiItalic, FiUnderline, FiList, FiLink, FiLink2, FiRotateCcw, FiRotateCw } from "react-icons/fi";
import { MdDragIndicator } from "react-icons/md";
import { Card, Toggle, FieldError, inputCls, errCls } from "../Shared/ui";
import useDragReorder from "../Shared/useDragReorder";

const uid = () => crypto.randomUUID();
const plain = (html) => html.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
const tiles = (text) => text.split(" ").filter(Boolean).map((t) => ({ id: uid(), text: t }));

const VERSE = "In the beginning God created the heavens and the earth.";

export const config = {
  label: "Verse Builder",
  subtitle: "Create a new Verse Builder question.",
  badge: "type",
  statusHint: true,
  side: "compact",
  sideOrder: ["reward", "status"],
  initialData: () => ({
    reference: "Genesis 1:1",
    verseHtml: VERSE,
    words: tiles(VERSE),
    lockPunct: true,
    shuffle: true,
    distractors: ["was", "world", "then", "first", "God’s", "made"],
    explanation: "Genesis 1:1 is the opening verse of the Bible that describes how God created everything.",
    hint: "",
  }),
  validate: (d) => {
    const e = {};
    if (!d.reference.trim()) e.reference = "Verse reference is required.";
    if (d.words.length < 2) e.words = "Create word tiles from the verse text.";
    return e;
  },
};

const Rich = ({ html, onChange }) => {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) ref.current.innerHTML = html;
    // eslint-disable-next-line
  }, []);
  const exec = (cmd, arg) => {
    ref.current?.focus();
    document.execCommand(cmd, false, arg);
    onChange(ref.current.innerHTML);
  };
  const tools = [
    ["undo", FiRotateCcw], ["redo", FiRotateCw], ["|"], ["bold", FiBold], ["italic", FiItalic], ["underline", FiUnderline],
    ["|"], ["insertUnorderedList", FiList], ["insertOrderedList", FiList], ["|"], ["link", FiLink], ["unlink", FiLink2],
  ];
  return (
    <div className="border border-[#E2DFFC] rounded-md">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-[#E2DFFC] flex-wrap">
        {tools.map(([cmd, Icon], i) =>
          cmd === "|" ? (
            <span key={i} className="w-px h-5 bg-[#E2DFFC]" />
          ) : (
            <button
              key={i}
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                if (cmd === "link") {
                  const u = window.prompt("Link URL");
                  if (u) exec("createLink", u);
                } else exec(cmd);
              }}
              className="text-[#0A0847] hover:text-[#001984] cursor-pointer"
            >
              <Icon size={17} />
            </button>
          )
        )}
      </div>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => onChange(e.currentTarget.innerHTML)}
        className="min-h-[70px] px-4 py-3 text-xs text-[#0A0847CC] outline-none"
      />
    </div>
  );
};

export default function VerseBuilderForm({ data, onChange, errors }) {
  const [adding, setAdding] = useState(false);
  const [newWord, setNewWord] = useState("");
  const { props, dragging } = useDragReorder(data.words, (words) => onChange({ words }));

  const addDistractor = () => {
    const v = newWord.trim();
    if (v && !data.distractors.includes(v)) onChange({ distractors: [...data.distractors, v] });
    setNewWord("");
    setAdding(false);
  };

  return (
    <div className="space-y-5">
      <Card>
        <h3 className="text-sm font-semibold text-[#0A0847] mb-3">Verse Reference</h3>
        <input
          value={data.reference}
          onChange={(e) => onChange({ reference: e.target.value })}
          className={`${inputCls} ${errors.reference ? errCls : ""}`}
        />
        <FieldError>{errors.reference}</FieldError>

        <h3 className="text-sm font-semibold text-[#0A0847] mt-5 mb-3">Complete Verse Text</h3>
        <Rich html={data.verseHtml} onChange={(verseHtml) => onChange({ verseHtml })} />

        <button
          type="button"
          onClick={() => onChange({ words: tiles(plain(data.verseHtml)) })}
          className="mt-5 px-4 py-2 border border-[#001984] rounded-lg text-sm font-medium text-[#001984] flex items-center gap-2 hover:bg-[#EEF2FF] cursor-pointer"
        >
          <FiGrid size={18} /> Create Word Tiles
        </button>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-6">
          <div>
            <p className="text-sm font-semibold text-[#0A0847] mb-3">
              Correct Word Order <span className="font-normal text-[#0A084799]">(Drag to Reorder)</span>
            </p>
            <div className="space-y-2">
              {data.words.map((w, i) => (
                <div key={w.id} {...props(i)} className={`flex items-center gap-3 ${dragging === i ? "opacity-40" : ""}`}>
                  <div className="flex-1 flex items-center gap-2 border border-[#E2DFFC] rounded-md px-2 py-1.5 bg-white">
                    <MdDragIndicator size={20} className="text-gray-400 cursor-grab shrink-0" />
                    <span className="w-7 h-7 rounded-md bg-[#E4E1F7] text-[#0A0847CC] text-xs font-semibold flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <input
                      value={w.text}
                      onChange={(e) =>
                        onChange({ words: data.words.map((x) => (x.id === w.id ? { ...x, text: e.target.value } : x)) })
                      }
                      className="flex-1 text-sm text-[#0A0847CC] outline-none px-2 bg-transparent"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => onChange({ words: data.words.filter((x) => x.id !== w.id) })}
                    className="w-8 h-8 border border-red-200 bg-red-50 rounded-md text-red-500 flex items-center justify-center hover:bg-red-100 cursor-pointer"
                  >
                    <FiTrash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
            <FieldError>{errors.words}</FieldError>
          </div>

          <div className="space-y-5">
            <div className="border border-[#E2DFFC] rounded-md p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#0A0847CC]">Lock punctuation</span>
                <Toggle tone="blue" checked={data.lockPunct} onChange={(v) => onChange({ lockPunct: v })} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#0A0847CC]">Shuffle tiles</span>
                <Toggle tone="blue" checked={data.shuffle} onChange={(v) => onChange({ shuffle: v })} />
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-[#0A0847] mb-3">
                Distractor Words <span className="font-normal text-[#0A084799]">(Optional)</span>
              </p>
              <div className="grid grid-cols-3 gap-2">
                {data.distractors.map((d) => (
                  <span key={d} className="px-3 py-2 rounded-md bg-[#E4E1F7] text-xs font-medium text-[#0A0847CC] flex items-center justify-between gap-1">
                    {d}
                    <button type="button" onClick={() => onChange({ distractors: data.distractors.filter((x) => x !== d) })} className="cursor-pointer">
                      <FiX size={13} className="text-[#001984]" />
                    </button>
                  </span>
                ))}
              </div>
              {adding ? (
                <input
                  autoFocus
                  value={newWord}
                  onChange={(e) => setNewWord(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addDistractor()}
                  onBlur={addDistractor}
                  placeholder="Type a word, press Enter"
                  className={`${inputCls} mt-3`}
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setAdding(true)}
                  className="w-full mt-3 py-3 border border-dashed border-[#001984] rounded-md text-sm font-semibold text-[#0A0847CC] flex items-center justify-center gap-2 hover:bg-[#EEF2FF] cursor-pointer"
                >
                  <FiPlus size={16} /> Add Distractor Word
                </button>
              )}
            </div>
          </div>
        </div>
      </Card>

      <Card title="Answer Explanation">
        <input value={data.explanation} onChange={(e) => onChange({ explanation: e.target.value })} className={inputCls} />
      </Card>
      <Card title="Optional Hint">
        <input
          value={data.hint}
          onChange={(e) => onChange({ hint: e.target.value })}
          placeholder="e.g., The verse starts with the word “In” and ends with “earth.”"
          className={inputCls}
        />
      </Card>
    </div>
  );
}