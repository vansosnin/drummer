import { TimeSignature } from "../types";

type TTimeSignatureInfo = [notesCountInBar: number, noteTime: number];

export const getTimeSignatureInfo = (
  timeSignature: TimeSignature
): TTimeSignatureInfo => {
  const [notesCountInBar, noteTime] = timeSignature.split("/").map(Number);
  return [notesCountInBar, noteTime];
};
