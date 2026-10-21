import * as mc from "./AIMultipleChoice";
import * as ms from "./AIMultipleSelect";
import * as fb from "./AIFillInTheBlanks";
import * as tf from "./AITrueFalse";
import * as to from "./AITapInOrder";
import * as vb from "./AIVerseBuilder";
import * as wa from "./AIWhoAmI";
import * as mp from "./AIMatchPair";
import * as ss from "./AIStorySequence";
import * as sc from "./AISpeedChallenge";
import * as aq from "./AIAudioQuiz";

const build = (m) => ({
  ...m.config,
  Settings: m.Settings,
  TopSettings: m.TopSettings,
  PreviewBody: m.PreviewBody,
});

export const AI_TYPES = {
  multiple_choice: build(mc),
  multiple_select: build(ms),
  fill_blanks: build(fb),
  true_false: build(tf),
  tap_order: build(to),
verse_builder: build(vb),
who_am_i: build(wa),
match_pair: build(mp),
story_sequence: build(ss),
speed_challenge: build(sc),
audio_quiz: build(aq),
  // next: tap_order, verse_builder, who_am_i, ...
};

export const AI_TYPE_OPTIONS = Object.entries(AI_TYPES).map(([key, t]) => ({ key, label: t.label }));