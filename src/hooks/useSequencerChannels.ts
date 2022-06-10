import { SequencerNote } from "../types";
import { useCallback, useState } from "react";
import { instrumentsList } from "../utils/instruments";

let prevTotalNotesCount = 0;

export const useSequencerChannels = (totalNotesCount: number) => {
  const defaultNotes = new Array(totalNotesCount).fill(SequencerNote.Off);

  const [notesByInstrument, setNotesByInstrument] = useState<SequencerNote[][]>(
    instrumentsList.map(() => defaultNotes)
  );

  if (totalNotesCount !== prevTotalNotesCount) {
    setNotesByInstrument(instrumentsList.map(() => defaultNotes));
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

  return { instruments: instrumentsList, notesByInstrument, changeNote, setNotesByInstrument };
};
