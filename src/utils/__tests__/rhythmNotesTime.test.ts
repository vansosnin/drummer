import { NotesTime, rhythmNotesTime } from "../rhythmNotesTime";
import { Rhythm } from "../../Sequencer/types";

it("rhythmNotesTime", () => {
  const cases: Record<Rhythm, NotesTime> = {
    [Rhythm.Four]: [4, false],
    [Rhythm.Eight2]: [8, false],
    [Rhythm.Eight3]: [8, true],
    [Rhythm.Sixteen4]: [16, false],
    [Rhythm.Sixteen6]: [16, true],
  };
  Object.entries(cases).forEach(([rhythm, notesTime]) => {
    expect(rhythmNotesTime(rhythm as Rhythm)).toEqual(notesTime);
  });
});
