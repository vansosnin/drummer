import {notesInBar} from "../notesInBar";
import {Rhythm, TimeSignature} from "../../Sequencer/types";

describe("notesInBar", () => {
    it("ThreeFour", () => {
        expect(notesInBar(TimeSignature.ThreeFour, Rhythm.Four)).toBe(3);
        expect(notesInBar(TimeSignature.ThreeFour, Rhythm.Eight2)).toBe(6);
        expect(notesInBar(TimeSignature.ThreeFour, Rhythm.Eight3)).toBe(9);
        expect(notesInBar(TimeSignature.ThreeFour, Rhythm.Sixteen4)).toBe(12);
        expect(notesInBar(TimeSignature.ThreeFour, Rhythm.Sixteen6)).toBe(18);
    });

    it("FourFour", () => {
        expect(notesInBar(TimeSignature.FourFour, Rhythm.Four)).toBe(4);
        expect(notesInBar(TimeSignature.FourFour, Rhythm.Eight2)).toBe(8);
        expect(notesInBar(TimeSignature.FourFour, Rhythm.Eight3)).toBe(12);
        expect(notesInBar(TimeSignature.FourFour, Rhythm.Sixteen4)).toBe(16);
        expect(notesInBar(TimeSignature.FourFour, Rhythm.Sixteen6)).toBe(24);
    });

    it("SixEight", () => {
        expect(notesInBar(TimeSignature.SixEight, Rhythm.Four)).toBe(3);
        expect(notesInBar(TimeSignature.SixEight, Rhythm.Eight2)).toBe(6);
        expect(notesInBar(TimeSignature.SixEight, Rhythm.Eight3)).toBe(9);
        expect(notesInBar(TimeSignature.SixEight, Rhythm.Sixteen4)).toBe(12);
        expect(notesInBar(TimeSignature.SixEight, Rhythm.Sixteen6)).toBe(18);
    });

    it("SevenEight", () => {
        expect(notesInBar(TimeSignature.SevenEight, Rhythm.Four)).toBe(null);
        expect(notesInBar(TimeSignature.SevenEight, Rhythm.Eight2)).toBe(7);
        expect(notesInBar(TimeSignature.SevenEight, Rhythm.Eight3)).toBe(null);
        expect(notesInBar(TimeSignature.SevenEight, Rhythm.Sixteen4)).toBe(14);
        expect(notesInBar(TimeSignature.SevenEight, Rhythm.Sixteen6)).toBe(21);
    });
});
