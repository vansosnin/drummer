import { Rhythm, TimeSignature } from "../Sequencer/types";
import { rhythmNotesTime } from "./rhythmNotesTime";
import { timeSignatureInfo } from "./timeSignatureInfo";

export const notesInBar = (
  timeSignature: TimeSignature,
  rhythm: Rhythm
): number | null => {
  const [notesCountInBar, noteTime] = timeSignatureInfo(timeSignature);
  const [rhythmNoteTime, isTriplet] = rhythmNotesTime(rhythm);
  const noteMultiplier = (rhythmNoteTime / noteTime) * (isTriplet ? 1.5 : 1);
  const notesInBar = notesCountInBar * noteMultiplier;

  return notesInBar % 1 === 0 ? notesInBar : null;
};
