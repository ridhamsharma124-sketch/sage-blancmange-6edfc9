import { useState } from "react";
import { LuHeadphones, LuUpload } from "react-icons/lu";
import liveQuestionImage from "../../../assets/live question img.png";
import {
  ActivityPageHeader,
  AudioFileCard,
  AudioPlayer,
  Field,
  ImageUploadBox,
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
const DEFAULT_STORY_IMAGE = liveQuestionImage;

const IMAGE_ALT = "Jesus and Nicodemus";
const IMAGE_CAPTION = [
  "Upload an image to represent the story",
  "and help capture attention.",
];

const DESCRIPTION =
  "A powerful dialogue between Jesus & Nicodemus on the new birth. Experience the conversation.";

const DURATION_LABEL = "09:48 min • 10.2 MB";
const INTRO_TIME = "00:10 / 00:10";

/* ==========================================================================
   STORY ENTRY PREVIEW (right card)
   Figma: card 465 wide, radius 8, border 1px #E2DFFC, bg #F9F9FF
   ========================================================================== */
const PREVIEW_TRUNCATE_AT = 74;

function truncate(text, limit) {
  return text.length > limit ? `${text.slice(0, limit).trimEnd()}...` : text;
}
function StoryEntryPreview({ title, description, image }) {
  return (
    <section className="w-full min-w-0 shrink-0 rounded-lg border border-[#E2DFFC] bg-[#F9F9FF] p-8">
      <div className="flex flex-col gap-3">
        <div>
          {/* Figma: Inter 600 / 22px / lh 100% */}
          <h2 className="text-[22px] font-semibold leading-none text-[#0A0847]">
            Story Entry Preview
          </h2>
          <p className="mt-2 text-[16px] text-[#0A084799]">
            This is how the story will appear to users.
          </p>
        </div>

        {image && (
          <img
            src={image}
            alt={IMAGE_ALT}
            className="h-[229px] w-full rounded-lg border border-[#E2DFFC] object-cover"
          />
        )}

        {/* Figma: Inter 600 / 16px / lh 30px */}
        <p className="mt-1 text-[16px] font-semibold leading-[30px] text-[#0A0847]">
          {title}
        </p>

        {/* Figma: Inter italic / 14px / lh 30px */}
        <p className="text-[14px] font-semibold italic leading-[30px] text-[#041581]">
          John 3
        </p>

        <div className="flex items-center gap-2">
          <LuHeadphones size={14} className="shrink-0 text-[#0A084799]" aria-hidden />
          <p className="text-[14px] font-medium italic leading-[30px] text-[#0A084799]">
            <span className="font-semibold">09:48</span> • 24 Plays
          </p>
        </div>

        {/* Figma: Inter 500 italic / 14px */}
        <p className="line-clamp-2 text-[14px] font-medium italic leading-[21px] text-[#0A084799]">
          {truncate(description, PREVIEW_TRUNCATE_AT)}
        </p>

        <AudioPlayer time={INTRO_TIME} variant="preview" />
      </div>
    </section>
  );
}

/* ==========================================================================
   PAGE
   ========================================================================== */
export default function AddChapterAudioStory() {
  const [title, setTitle] = useState("The New Birth: Born Again");
  const [description, setDescription] = useState(DESCRIPTION);
  const [image, setImage] = useState(DEFAULT_STORY_IMAGE);
  const [introLabel, setIntroLabel] = useState("A");
  const [note, setNote] = useState("Draft 1");
  const [transcriberOn, setTranscriberOn] = useState(true);

  return (
    <div className={pageShellClass}>
      <div className={pageBodyClass}>
        <div className={pageInnerClass}>
          <ActivityPageHeader
            breadcrumb={[
              "Bible Content",
              "Articles",
              "John",
              "Chapter 3",
              "Chapter Audio Stories",
            ]}
            title="Add Chapter Audio Story"
          />

          <div className={cardRowClass}>
            {/* LEFT — story form */}
            <section className={formCardClass}>
            <Field label="Story Title" required htmlFor="story-title">
              <TextInput
                id="story-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Field>

            <Field label="Story Description" required htmlFor="story-description">
              <TextArea
                id="story-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                max={500}
                /* Figma: textarea height is 116px (was 100px) */
                className="h-[116px]"
              />
            </Field>

            <div>
              <p className={labelClass}>
                Upload Image <span className="text-[#E11D48]">*</span>
              </p>

              <ImageUploadBox
                image={image}
                onSelect={setImage}
                onRemove={() => setImage(null)}
                caption={IMAGE_CAPTION}
                alt={IMAGE_ALT}
              />
            </div>

            <div>
              {/* Figma: helper text sits INSIDE the card, below a divider.
                  Inter 500 / 12px, 2 lines = 30px tall */}
              <AudioFileCard>
                <p className="pt-[26px] pr-4 pb-[44px] pl-[82px] text-[12px] font-medium leading-[15px] text-[#0A0847]">
                  This audio will be used as the story narration.
                  <br />
                  Supported formats: MP3, WAV, AAC (max 25 MB)
                </p>
              </AudioFileCard>
            </div>

            <div>
              {/* Figma: label Inter 600 / 14px, value Inter 500 / 12px */}
              <p className="text-[14px] font-semibold text-[#0A0847]">
                Duration (Based on Audio)
              </p>
              <p className="mt-1 text-[12px] font-medium text-[#0A084799]">
                {DURATION_LABEL}
              </p>
            </div>

            <div>
              <p className="mb-[6px] text-[14px] font-semibold text-[#0A0847]">
                10-Second Intro/Preview
              </p>
              <AudioPlayer time={INTRO_TIME} />
            </div>

            <Field
              label="Intro / Trailer after Transcription"
              required
              htmlFor="intro-trailer"
            >
              <TextInput
                id="intro-trailer"
                value={introLabel}
                onChange={(e) => setIntroLabel(e.target.value)}
              />
            </Field>

            <Field label="Note" required htmlFor="note">
              <TextInput
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </Field>

            <div className="flex items-center gap-[60px]">
              <p className="text-[14px] font-semibold text-[#0A0847]">
                Enable Transcriber
              </p>
              <Toggle
                checked={transcriberOn}
                onChange={setTranscriberOn}
                label="Enable Transcriber"
              />
            </div>

            <button
              type="button"
              className="flex h-12 w-fit cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#001984] bg-white px-8 text-[14px] font-semibold text-[#0A0847]/60 transition-colors hover:bg-[#F1F1F9]"
            >
              <LuUpload size={15} aria-hidden />
              Upload Transcriber or Paste Text
            </button>
          </section>

          {/* RIGHT — story entry preview */}
          <StoryEntryPreview
            title={title}
            description={description}
            image={image}
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