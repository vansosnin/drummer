import { TimeSignature } from "../Sequencer/types";

type TTimeSignatureInfo = [notesCountInBar: number, noteTime: number];

export const timeSignatureInfo = (
  timeSignature: TimeSignature
): TTimeSignatureInfo => {
  const [notesCountInBar, noteTime] = timeSignature.split("/").map(Number);
  return [notesCountInBar, noteTime];
};
