import React, { useState } from "react";
import { QUESTION_TYPES, TYPE_OPTIONS } from "./types";
import QuestionMetaHeader from "./Shared/QuestionMetaHeader";
import QuestionImageCard from "./Shared/QuestionImageCard";
import RewardCard from "./Shared/RewardCard";
import StatusCard from "./Shared/StatusCard";
import FormFooter from "./Shared/FormFooter";
import {
  FiList,
  FiEdit3,
  FiFileText,
  FiCheckSquare,
  FiHash,
  FiBookOpen,
  FiUser,
  FiShare2,
  FiHeadphones,
  FiClock,
  FiArrowRight,
  FiRefreshCw,
  FiCheckCircle,
  FiSettings,
} from "react-icons/fi";
import { FaRoute } from "react-icons/fa6";
import { CompactReward, CompactStatus } from "./Shared/CompactCard";
import AIGeneratorPanel from "./ai/AIGeneratorPanel";
import { AI_TYPES } from "./ai/types";
import MultipleChoice from "../../../assets/AddQuizIcons/MultipleChoice.svg";
import FillInTheBlank from "../../../assets/AddQuizIcons/FillinTheBlank.svg";
import TruFalse from "../../../assets/AddQuizIcons/TruFalse.svg";
import TrueFalse from "../../../assets/AddQuizIcons/TrueFalse.svg";
import TapInOrder from "../../../assets/AddQuizIcons/TapInOrder.svg";
import VerseBuilder from "../../../assets/AddQuizIcons/VerseBuilder.svg";
import WhoAmI from "../../../assets/AddQuizIcons/WhoAmI.svg";
import MatchThePair from "../../../assets/AddQuizIcons/MatchThePair.svg";
import AudioQuiz from "../../../assets/AddQuizIcons/AudioQuiz.svg";
import StorySequence from "../../../assets/AddQuizIcons/StorySequence.svg";
import SpeedChallenge from "../../../assets/AddQuizIcons/SpeedChallenge.svg";
import LocationSummary from "../../../assets/AddQuizIcons/LocationSummary.svg";
import AiIcon from "../../../assets/AddQuizIcons/AiIcon.svg";

const META_DEFAULTS = {
  testament: "Old Testament",
  book: "Genesis",
  chapter: "1",
  level: "Level 2",
};

  const SvgIcon = ({ src, size = 16, className = "" }) => (
                <img src={src} alt="" width={size} height={size} className={`shrink-0 ${className}`} />
              );
  
  const LocationSummarySvg = (p) => <SvgIcon src={LocationSummary} {...p} />;
  const AiIconSvg = (p) => <SvgIcon src={AiIcon} {...p} />;

const TYPE_CARDS = [
  { key: "multiple_choice", label: "Multiple Choice", icon: MultipleChoice },
  { key: "multiple_select", label: "Multiple Select", icon: MultipleChoice },
  { key: "fill_blanks", label: "Fill in Blanks", icon: FillInTheBlank },
  { key: "tru_false", label: "Tru / False", icon: TruFalse },
  { key: "true_false", label: "True / False", icon: TrueFalse },
  { key: "tap_order", label: "Tap in Order", icon: TapInOrder },
  { key: "verse_builder", label: "Verse Builder", icon: VerseBuilder },
  { key: "who_am_i", label: "Who Am I", icon: WhoAmI },
  { key: "match_pair", label: "Match the Pair", icon: MatchThePair },
  { key: "audio_quiz", label: "Audio Quiz", icon: AudioQuiz },
  { key: "story_sequence", label: "Story Sequence", icon: StorySequence },
  { key: "speed_challenge", label: "Speed Challenge", icon: SpeedChallenge },
];

export default function QuizQuestionFormPage() {
  const [type, setType] = useState("");
  const [started, setStarted] = useState(false); // false = choose step, true = form step
  const [meta, setMeta] = useState(META_DEFAULTS);
  const [entryMethod, setEntryMethod] = useState("manual");
  const [common, setCommon] = useState({ image: "", points: 10, active: true });
  const [store, setStore] = useState({});
  const [errors, setErrors] = useState({});

  const reg = QUESTION_TYPES[type];
  const data = reg ? (store[type] ?? reg.initialData()) : null;
  const summary = [
    meta.testament,
    meta.book,
    `Chapter ${meta.chapter}`,
    meta.level,
  ].join(" • ");

  const setData = (patch) =>
    setStore((p) => ({
      ...p,
      [type]: { ...(p[type] ?? reg.initialData()), ...patch },
    }));

  const changeType = (key) => {
    setType(key);
    setErrors({});
  };

  const handleContinue = () => {
    if (isAI ? !AI_TYPES[type] : !reg) return;
    setStarted(true);
  };

  const changeSelection = () => {
    setStarted(false);
    setErrors({});
  };

  const submit = (mode) => {
    const errs = mode === "add" ? reg.validate(data) : {};
    setErrors(errs);
    if (Object.keys(errs).length) return;
    console.log("Question payload:", {
      mode,
      type,
      entryMethod,
      meta,
      common,
      data,
    });
  };

  const isAI = entryMethod === "ai";
  const showForm = started && (isAI ? !!AI_TYPES[type] : !!reg);

  return (
    <div className="p-6 bg-[#F8FAFC] min-h-screen font-[Inter] space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[#0A084799]">
            Bible Content <span className="mx-1">&gt;</span>
            <span className="text-[#001984] font-semibold">{meta.book}</span>
            <span className="mx-1">&gt;</span>
            <span className="text-[#001984] font-semibold">
              Chapter {meta.chapter}
            </span>
            <span className="mx-1">&gt;</span> Quiz
          </p>
          <h1 className="text-xl font-semibold text-[#0A0847] mt-2">
            {showForm && isAI ? "AI Question Generator" : "Add Quiz Question"}
          </h1>
          <div className="flex items-center gap-6 mt-3">
            <p className="text-sm text-[#0A084799] font-medium">
              {!showForm ? "Choose the type of question you want to create." : isAI ? "" : reg?.subtitle}
            </p>
            {showForm && !isAI && reg.badge === "type" && (
              <span className="px-8 py-2.5 rounded-md bg-[#E4E1F7] text-xs font-semibold text-[#0A0847CC]">
                {reg.label}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {showForm && !isAI && reg.badge === "status" && (
            <span
              className={`px-8 py-2.5 rounded-md border text-xs font-semibold flex items-center gap-2 ${
                common.active
                  ? "bg-[#21AC1C0D] border-[#B7E4B4] text-[#1BA155]"
                  : "bg-gray-100 border-gray-200 text-gray-500"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${common.active ? "bg-[#1BA155]" : "bg-gray-400"}`}
              />
              {common.active ? "Active" : "Inactive"}
            </span>
          )}
          {showForm && !isAI && (
            <button
              type="button"
              onClick={changeSelection}
              className="px-5 py-2.5 bg-white border border-[#E2DFFC] rounded-md text-xs font-semibold text-[#0A0847CC] flex items-center gap-2 hover:bg-gray-50 cursor-pointer"
            >
              <FiRefreshCw size={13} /> Change Type
            </button>
          )}
          {showForm && isAI && (
        <div className="flex justify-end">
          <button type="button"
            className="px-6 py-3 bg-white border border-[#E2DFFC] rounded-md text-xs font-semibold text-[#0A0847CC] flex items-center gap-2 hover:bg-gray-50 cursor-pointer">
            <FiSettings size={14} /> Activity Settings
          </button>
        </div>
      )}
        </div>
      </div>

      <QuestionMetaHeader
        meta={meta}
        onMetaChange={(patch) => setMeta((p) => ({ ...p, ...patch }))}
        typeKey={type}
        typeOptions={TYPE_OPTIONS}
        onTypeChange={changeType}
        entryMethod={entryMethod}
        onEntryMethod={setEntryMethod}
        disabled={showForm}
      />

      {!showForm ? (
        <>
          {/* Choose type */}
          <div>
            <h3 className="text-sm font-semibold text-[#0A0847CC] mb-4">
              Choose Question Type
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {TYPE_CARDS.map(({ key, label, icon }) => {
                const active = type === key;
                const built = isAI ? !!AI_TYPES[key] : !!QUESTION_TYPES[key];
                return (
                  <button
                    key={key}
                    type="button"
                    disabled={!built}
                    onClick={() => changeType(key)}
                    title={built ? "" : "Coming soon"}
                    className={`h-40 rounded-md border flex flex-col items-center justify-center gap-4 transition-colors ${
                      active
                        ? "bg-[#0019840D] border-[#AEB7E0]"
                        : "bg-white border-[#E2DFFC] hover:bg-gray-50"
                    } ${built ? "cursor-pointer" : "opacity-50 cursor-not-allowed"}`}
                  >
                    {/* <span className="w-14 h-14 rounded-full bg-[#001984] text-white flex items-center justify-center">
                      <Icon size={24} />
                    </span> */}
                    <img src={icon} alt="" className="w-14 h-14 shrink-0" />
                    <span className="text-sm font-medium text-[#0A0847CC]">
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Summary */}
          <div className="bg-[#EEF0FB] border border-[#C9CDE8] rounded-md px-5 py-5 flex items-center gap-4">
            <LocationSummarySvg size={32} className="text-[#001984] shrink-0" />
            <div>
              <p className="text-sm font-semibold text-[#0A0847CC]">
                Selected Location Summary
              </p>
              <p className="text-xs text-[#0A084799] font-medium mt-1">
                {summary}
              </p>
            </div>
          </div>

          {/* Continue */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleContinue}
              disabled={isAI ? !AI_TYPES[type] : !reg}
              className="px-12 py-2.5 bg-[#001984] hover:bg-[#001266] text-white rounded-md text-sm font-medium flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiArrowRight size={14} /> Continue
            </button>
          </div>
        </>
      ) : isAI ? (
        <AIGeneratorPanel key={type} type={type} meta={meta} onTypeChange={changeType} />
      ) : (
        <>
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6 items-start">
            <reg.Component
              key={type}
              data={data}
              onChange={setData}
              errors={errors}
            />
            <div className="space-y-5">
              {reg.side === "compact" && (
                <div className="grid grid-cols-2 gap-4">
                  {reg.sideOrder.map((k) =>
                    k === "status" ? (
                      <CompactStatus
                        key={k}
                        active={common.active}
                        onChange={(active) =>
                          setCommon((p) => ({ ...p, active }))
                        }
                      />
                    ) : (
                      <CompactReward
                        key={k}
                        points={common.points}
                        onChange={(points) =>
                          setCommon((p) => ({ ...p, points }))
                        }
                      />
                    ),
                  )}
                </div>
              )}
              <QuestionImageCard
                image={common.image}
                onChange={(image) => setCommon((p) => ({ ...p, image }))}
              />
              {reg.side !== "compact" && (
                <>
                  <RewardCard
                    points={common.points}
                    onChange={(points) => setCommon((p) => ({ ...p, points }))}
                  />
                  <StatusCard
                    active={common.active}
                    showHint={reg.statusHint}
                    onChange={(active) => setCommon((p) => ({ ...p, active }))}
                  />
                </>
              )}
            </div>
          </div>
          <FormFooter
            onDraft={() => submit("draft")}
            onPreview={() => submit("preview")}
            onSubmit={() => submit("add")}
          />
        </>
      )}
    </div>
  );
}
