import { SequencerChannelInstrument, SequencerNote } from "../Sequencer/types";
import { useState, useCallback } from "react";

let prevTotalNotesCount = 0;

export const useSequencerChannels = (totalNotesCount: number) => {
  const instruments = Object.values(SequencerChannelInstrument);
  const defaultNotes = new Array(totalNotesCount).fill(SequencerNote.Off);

  const [notesByInstrument, setNotesByInstrument] = useState<SequencerNote[][]>(
    instruments.map(() => defaultNotes)
  );

  if (totalNotesCount !== prevTotalNotesCount) {
    setNotesByInstrument(instruments.map(() => defaultNotes));
    prevTotalNotesCount = totalNotesCount;
  }

  const changeNote = useCallback(
    (instrumentIndex: number, noteIndex: number) => (value: SequencerNote) => {
      setNotesByInstrument(
        notesByInstrument.map((notes, currentInstrumentIndex) =>
          notes.map((note, currentNoteIndex) =>
            instrumentIndex === currentInstrumentIndex &&
            noteIndex === currentNoteIndex
              ? value
              : note
          )
        )
      );
    },
    [notesByInstrument]
  );

  return { instruments, notesByInstrument, changeNote };
};
