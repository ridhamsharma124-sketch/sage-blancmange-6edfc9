import MultipleChoiceForm, { config as mc } from "./MultipleChoiceForm";
import TrueFalseForm, { config as tf } from "./TrueFalseForm";
import FillBlanksForm, { config as fb } from "./FillInTheBlanks";
import TapInOrderForm, { config as to } from "./TapInOrderForm";
import VerseBuilderForm, { config as vb } from "./VerseBuilderForm";
import WhoAmIForm, { config as wa } from "./WhoAmIForm";
import AudioQuizForm, { config as aq } from "./AudioQuizForm";
import MatchPairForm, { config as mp } from "./MatchPairForm";
import StorySequenceForm, { config as ss } from "./StorySequenceForm";
import SpeedChallengeForm, { config as sc } from "./SpeedChallengeForm";
import MultipleSelectForm, { config as ms } from "./MultipleSelectForm";

export const QUESTION_TYPES = {
  multiple_choice: { Component: MultipleChoiceForm, ...mc },
  true_false: { Component: TrueFalseForm, ...tf },
  fill_blanks: { Component: FillBlanksForm, ...fb },
  tap_order: { Component: TapInOrderForm, ...to },
verse_builder: { Component: VerseBuilderForm, ...vb },
who_am_i: { Component: WhoAmIForm, ...wa },
audio_quiz: { Component: AudioQuizForm, ...aq },
match_pair: { Component: MatchPairForm, ...mp },
story_sequence: { Component: StorySequenceForm, ...ss },
speed_challenge: { Component: SpeedChallengeForm, ...sc },
multiple_select: { Component: MultipleSelectForm, ...ms },
  // next: tap_order, verse_builder, who_am_i, match_pair, audio_quiz, story_sequence, speed_challenge
};

export const TYPE_OPTIONS = Object.entries(QUESTION_TYPES).map(([key, t]) => ({ key, label: t.label }));