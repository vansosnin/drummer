import { Rhythm, TimeSignature } from "../Sequencer/types";
import { getRhythmNotesTime } from "./getRhythmNotesTime";
import { getTimeSignatureInfo } from "./getTimeSignatureInfo";

export const getNotesCountInBar = (
  timeSignature: TimeSignature,
  rhythm: Rhythm
): number | null => {
  const [notesCountInBar, noteTime] = getTimeSignatureInfo(timeSignature);
  const [rhythmNoteTime, isTriplet] = getRhythmNotesTime(rhythm);
  const noteMultiplier = (rhythmNoteTime / noteTime) * (isTriplet ? 1.5 : 1);
  const notesInBar = notesCountInBar * noteMultiplier;

  return notesInBar % 1 === 0 ? notesInBar : null;
};
