import { TNotesTime, getRhythmNotesTime } from "../getRhythmNotesTime";
import { Rhythm } from "../../types";

it("rhythmNotesTime", () => {
  const cases: Record<Rhythm, TNotesTime> = {
    [Rhythm.Four]: [4, false],
    [Rhythm.Eight2]: [8, false],
    // [Rhythm.Eight3]: [8, true],
    // [Rhythm.Sixteen4]: [16, false],
    // [Rhythm.Sixteen6]: [16, true],
  };
  Object.entries(cases).forEach(([rhythm, notesTime]) => {
    expect(getRhythmNotesTime(rhythm as Rhythm)).toEqual(notesTime);
  });
});
