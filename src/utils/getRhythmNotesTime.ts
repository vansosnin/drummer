import { Rhythm } from "../Sequencer/types";

export type TNotesTime = [noteTime: number, isTriplet: boolean];

export const getRhythmNotesTime = (rhythm: Rhythm): TNotesTime => {
  const notes = rhythm.split("-").map(Number);
  const [noteTime] = notes;
  return [noteTime, notes.length % 3 === 0];
};
