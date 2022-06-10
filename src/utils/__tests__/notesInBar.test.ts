import { getNotesCountInBar } from "../getNotesCountInBar";
import { Rhythm, TimeSignature } from "../../types";

describe("notesInBar", () => {
  it("ThreeFour", () => {
    expect(getNotesCountInBar(TimeSignature.ThreeFour, Rhythm.Four)).toBe(3);
    expect(getNotesCountInBar(TimeSignature.ThreeFour, Rhythm.Eight2)).toBe(6);
    // expect(notesInBar(TimeSignature.ThreeFour, Rhythm.Eight3)).toBe(9);
    // expect(notesInBar(TimeSignature.ThreeFour, Rhythm.Sixteen4)).toBe(12);
    // expect(notesInBar(TimeSignature.ThreeFour, Rhythm.Sixteen6)).toBe(18);
  });

  it("FourFour", () => {
    expect(getNotesCountInBar(TimeSignature.FourFour, Rhythm.Four)).toBe(4);
    expect(getNotesCountInBar(TimeSignature.FourFour, Rhythm.Eight2)).toBe(8);
    // expect(notesInBar(TimeSignature.FourFour, Rhythm.Eight3)).toBe(12);
    // expect(notesInBar(TimeSignature.FourFour, Rhythm.Sixteen4)).toBe(16);
    // expect(notesInBar(TimeSignature.FourFour, Rhythm.Sixteen6)).toBe(24);
  });

  // it("SixEight", () => {
  //     expect(notesInBar(TimeSignature.SixEight, Rhythm.Four)).toBe(3);
  //     expect(notesInBar(TimeSignature.SixEight, Rhythm.Eight2)).toBe(6);
  //     expect(notesInBar(TimeSignature.SixEight, Rhythm.Eight3)).toBe(9);
  //     expect(notesInBar(TimeSignature.SixEight, Rhythm.Sixteen4)).toBe(12);
  //     expect(notesInBar(TimeSignature.SixEight, Rhythm.Sixteen6)).toBe(18);
  // });

  // it("SevenEight", () => {
  //     expect(notesInBar(TimeSignature.SevenEight, Rhythm.Four)).toBe(null);
  //     expect(notesInBar(TimeSignature.SevenEight, Rhythm.Eight2)).toBe(7);
  //     expect(notesInBar(TimeSignature.SevenEight, Rhythm.Eight3)).toBe(null);
  //     expect(notesInBar(TimeSignature.SevenEight, Rhythm.Sixteen4)).toBe(14);
  //     expect(notesInBar(TimeSignature.SevenEight, Rhythm.Sixteen6)).toBe(21);
  // });
});
