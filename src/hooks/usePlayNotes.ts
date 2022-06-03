import { SequencerChannelInstrument, SequencerNote } from "../Sequencer/types";
import { audioService } from "../services/audioService";

let previousActiveNoteIndex: number | null = null;

export const usePlayNotes = (
  instruments: SequencerChannelInstrument[],
  notesByInstrument: SequencerNote[][],
  activeNoteIndex: number | null
): void => {
  if (activeNoteIndex === previousActiveNoteIndex) {
    return;
  }

  previousActiveNoteIndex = activeNoteIndex;

  const notesCount = notesByInstrument[0].length;
  const instrumentsCount = instruments.length;

  for (let n = 0; n < notesCount; n++) {
    for (let i = 0; i < instrumentsCount; i++) {
      if (
        n === activeNoteIndex &&
        notesByInstrument[i][n] === SequencerNote.On
      ) {
        audioService.playSound(instruments[i]);
      }
    }
  }
};
