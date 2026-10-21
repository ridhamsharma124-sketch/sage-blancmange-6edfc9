import { useState } from "react";
import giftIcon from "../../../assets/activities/mv_gift.png";
import shuffleIcon from "../../../assets/activities/mv_shuffle.png";
import bookIcon from "../../../assets/activities/mv_book.png";
import memoryVerseBg from "../../../assets/memory-verse-bg.png";
import liveQuestionImage from "../../../assets/live question img.png";
import {
  ActivityPageHeader,
  AudioFileCard,
  AudioPlayer,
  Field,
  ImageUploadBox,
  Select,
  TextArea,
  TextInput,
  Toggle,
  actionRowClass,
  cardRowClass,
  formCardClass,
  labelClass,
  outlineButton,
  pageBodyClass,
  pageInnerClass,
  pageShellClass,
  purpleButton,
} from "./activityFormShared";

/* ==========================================================================
   MOCK DATA — hardcoded exactly as specified
   ========================================================================== */
const TRANSLATION_OPTIONS = ["NIV", "KJV", "ESV", "NASB", "NLT"];
const TEXT_SIZE_OPTIONS = [
  "Semi-Extra Large",
  "Extra Large",
  "Large",
  "Medium",
  "Small",
];
const ALIGNMENT_OPTIONS = ["0 / 300", "Left", "Center", "Right"];
const DIFFICULTY_OPTIONS = ["Easy", "Medium", "Hard"];
const MEMORY_UNIT_OPTIONS = ["Both Full Verse", "Full Verse", "Partial Verse"];
const SCORE_OPTIONS = ["Points", "None"];

const IMAGE_ALT = "Memory verse background";
const IMAGE_CAPTION = [
  "Use an image: You can drag and drop",
  "an image, or click to select.",
];

const BACKGROUND_MUSIC_TIME = "00:00 / 03:45";

/* shown in the preview while the "Verse Text" field is still empty */
const MOCK_VERSE_TEXT = `For God so loved the
world that he gave his one and
only Son,  that whoever believes
in him shall not perish
but have eternal life.`;

/* ==========================================================================
   USER MEMORY VERSE PREVIEW (right card)
   ========================================================================== */
function VersePreviewCard({ reference, verseText, translation, image }) {
  const typed = verseText.trim().length > 0;

  return (
    <div className="relative mx-auto aspect-[397/583] w-full max-w-[397px] overflow-hidden rounded-lg border border-[#E2DFFC] bg-white">
      <img
        src={image}
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-bottom object-right select-none"
        draggable={false}
      />

      <div className="relative z-10 flex flex-col items-center px-8 pt-8 text-center">
        <span className="font-serif text-[64px] font-bold leading-none text-[#6B6FB5]">
          &ldquo;
        </span>

        <h3 className="mt-3 text-[24px] font-bold text-[#041581]">{reference}</h3>

        <p className="mt-5 max-w-[280px] text-[14px] italic leading-[1.7] whitespace-pre-line text-[#0A084799]">
          {typed ? verseText : MOCK_VERSE_TEXT}
        </p>

        <p className="mt-4 text-[13px] italic text-[#0A084799]">{translation}</p>
      </div>
    </div>
  );
}

function MemoryVersePreview({ reference, verseText, translation, image }) {
  return (
    <section className="w-full min-w-0 shrink-0 rounded-lg border border-[#E2DFFC] bg-[#FEFEFF] p-8">
      <div className="mx-auto flex w-full max-w-[397px] flex-col gap-[14px]">
        <div className="text-center">
          <h2 className="text-[16px] font-bold text-[#0A0847]">
            User Memory Verse Preview
          </h2>
          <p className="mt-1 text-[16px] leading-[1.5] text-[#0A084799]">
            This is how the memory verse
            <br />
            will appear to users.
          </p>
        </div>

        <VersePreviewCard
          reference={reference}
          verseText={verseText}
          translation={translation}
          image={image}
        />

        <div>
          <div className="flex items-center justify-between">
            <p className="text-[10px] text-[#0A084799]">Memorization Progress</p>
            <p className="text-[10px] text-[#0A084799]">0%</p>
          </div>
          <div className="mt-1.5 h-2 w-full rounded-full bg-[#E5E7EB]" />
        </div>

        <div>
          <p className="mb-[6px] text-[12px] font-semibold text-[#0A0847]">
            Start to Earn
          </p>
          <button
            type="button"
            className={`${purpleButton} w-full gap-2 text-[14px] font-semibold`}
          >
            <img src={giftIcon} alt="" className="h-[15px] w-auto" />
            10 Pts
          </button>
        </div>

        <div>
          <p className="mb-[6px] text-[12px] font-semibold text-[#0A0847]">
            Review in Quiz
          </p>
          <button
            type="button"
            className={`${outlineButton} w-full gap-2 text-[14px] font-semibold text-[#0A0847]/60`}
          >
            <img src={shuffleIcon} alt="" className="h-auto w-[16px]" />
            Begin Review
          </button>
        </div>

        <div>
          <p className="mb-[6px] text-[12px] font-semibold text-[#0A0847]">
            Practice Mode
          </p>
          <button
            type="button"
            className={`${outlineButton} w-full gap-2 text-[14px] font-semibold text-[#0A0847]/60`}
          >
            <img src={bookIcon} alt="" className="h-[15px] w-auto" />
            Begin Practice
          </button>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   PAGE
   ========================================================================== */
export default function AddMemoryVerse() {
  const [reference, setReference] = useState("John 3:16");
  const [verseText, setVerseText] = useState("");
  const [translation, setTranslation] = useState("NIV");
  const [textSize, setTextSize] = useState("Semi-Extra Large");
  const [alignment, setAlignment] = useState("0 / 300");
  const [difficulty, setDifficulty] = useState("Medium");
  const [memoryTime, setMemoryTime] = useState("10");
  const [memoryUnit, setMemoryUnit] = useState("Both Full Verse");
  const [uploadImage, setUploadImage] = useState(liveQuestionImage);
  const [score, setScore] = useState("Points");
  const [showCountdown, setShowCountdown] = useState(true);
  const [includeInReview, setIncludeInReview] = useState(true);
  const [audioPlayback, setAudioPlayback] = useState(true);

  const toggleRows = [
    { label: "Show Countdown", value: showCountdown, setter: setShowCountdown },
    {
      label: "Include in Quiz Review",
      value: includeInReview,
      setter: setIncludeInReview,
    },
    {
      label: "Enable Audio Playback",
      value: audioPlayback,
      setter: setAudioPlayback,
    },
  ];

  return (
    <div className={pageShellClass}>
      <div className={pageBodyClass}>
        <div className={pageInnerClass}>
          <ActivityPageHeader
            breadcrumb={[
              "Bible Content",
              "Activities",
              "John",
              "Chapter 3",
              "Memory Verse",
            ]}
            title="Add Memory Verse"
          />

          <div className={cardRowClass}>
            {/* LEFT — memory verse form */}
            <section className={formCardClass}>
            <Field label="Verse Reference" required htmlFor="verse-reference">
              <TextInput
                id="verse-reference"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
              />
            </Field>

            <Field label="Verse Text" required htmlFor="verse-text">
              <TextArea
                id="verse-text"
                value={verseText}
                onChange={(e) => setVerseText(e.target.value)}
                max={300}
                className="h-[102px]"
              />
            </Field>

            <Field label="Translation" htmlFor="translation">
              <Select
                id="translation"
                value={translation}
                options={TRANSLATION_OPTIONS}
                onChange={(e) => setTranslation(e.target.value)}
              />
            </Field>

            <Field label="Text Size (Medium)" htmlFor="text-size">
              <Select
                id="text-size"
                value={textSize}
                options={TEXT_SIZE_OPTIONS}
                onChange={(e) => setTextSize(e.target.value)}
              />
            </Field>

            <div>
              <p className={labelClass}>Verse Alignment (Centered)</p>
              <p className="text-[10.5px] leading-[1.5] text-[#0A084799]">
                Select alignment &ndash; great for big screens
                <br />
                but can use on small screens also.
              </p>
              <div className="mt-2">
                <Select
                  id="verse-alignment"
                  value={alignment}
                  options={ALIGNMENT_OPTIONS}
                  onChange={(e) => setAlignment(e.target.value)}
                />
              </div>
            </div>

            <Field label="Difficulty" htmlFor="difficulty">
              <Select
                id="difficulty"
                value={difficulty}
                options={DIFFICULTY_OPTIONS}
                onChange={(e) => setDifficulty(e.target.value)}
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Memory Time" htmlFor="memory-time">
                <TextInput
                  id="memory-time"
                  value={memoryTime}
                  onChange={(e) => setMemoryTime(e.target.value)}
                />
              </Field>

              <Field label="Memory Unit" htmlFor="memory-unit">
                <Select
                  id="memory-unit"
                  value={memoryUnit}
                  options={MEMORY_UNIT_OPTIONS}
                  onChange={(e) => setMemoryUnit(e.target.value)}
                />
              </Field>
            </div>

            <div>
              <p className={labelClass}>Image / Background</p>

              <ImageUploadBox
                image={uploadImage}
                onSelect={setUploadImage}
                onRemove={() => setUploadImage(null)}
                caption={IMAGE_CAPTION}
                alt={IMAGE_ALT}
              />
            </div>

            <div className="h-px w-full bg-[#E5E4EC]" />

            <div>
              <p className="mb-[6px] text-[12px] font-semibold text-[#0A0847]">
                Background Music
              </p>

              <AudioFileCard>
                <div className="px-3 py-3">
                  <AudioPlayer time={BACKGROUND_MUSIC_TIME} />
                </div>
              </AudioFileCard>
            </div>

            <Field label="Score" htmlFor="score">
              <Select
                id="score"
                value={score}
                options={SCORE_OPTIONS}
                onChange={(e) => setScore(e.target.value)}
              />
            </Field>

            {toggleRows.map((row) => (
              <div key={row.label} className="flex items-center justify-between">
                <p className="text-[12px] font-semibold text-[#0A0847]">
                  {row.label}
                </p>
                <Toggle
                  checked={row.value}
                  onChange={row.setter}
                  label={row.label}
                />
              </div>
            ))}
          </section>

          {/* RIGHT — user memory verse preview */}
          <MemoryVersePreview
            reference={reference}
            verseText={verseText}
            translation={translation}
            image={memoryVerseBg}
          />
        </div>

        {/* BOTTOM ACTION ROW */}
        <div className={actionRowClass}>
          <button type="button" className={`${outlineButton} w-[152px]`}>
            Cancel
          </button>

          <div className="flex flex-wrap gap-4">
            <button type="button" className={`${outlineButton} w-[152px]`}>
              Save as Draft
            </button>
            <button type="button" className={`${outlineButton} w-[188px]`}>
              Preview as User
            </button>
            <button type="button" className={purpleButton}>
              Publish Story
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}