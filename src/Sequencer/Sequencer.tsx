import React, { useState, useEffect, useCallback } from "react";
import {
  Rhythm,
  SequencerChannelInstrument,
  SequencerNote,
  TimeSignature,
} from "./types";
import { SequencerNote as SequencerNoteComponent } from "./SequencerNote/SequencerNote";
import { ThemeProvider } from "@mui/material/styles";
import { notesInBar } from "../utils/notesInBar";
import { timeSignatureInfo } from "../utils/timeSignatureInfo";
import { isFirstNoteInBar } from "../utils/isFirstNoteInBar";
import styles from "./Sequencer.module.css";
import { useMetronome } from "../hooks/useMetronome";
import {
  PlayState,
  SequencerControls,
} from "../SequencerControls/SequencerControls";
import { defaultTheme } from "../style/themes";

interface ISequencerProps {}

export const Sequencer = (props: ISequencerProps) => {
  const {
    activeNoteIndex,
    notesCountInBar,
    totalNotesCount,
    isPlaying,
    start,
    stop,
    tempo,
    changeTempo,
    rhythm,
    changeRhythm,
    timeSignature,
    changeTimeSignature,
  } = useMetronome();

  const instruments = Object.values(SequencerChannelInstrument);
  const defaultNotes = new Array(totalNotesCount).fill(SequencerNote.Off);

  // todo: custom hook?
  const [notesByInstrument, setNotesByInstrument] = useState<SequencerNote[][]>(
    instruments.map(() => defaultNotes)
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const ignoredTags = ["input", "textarea", "select", "button", "a"];

      // @ts-ignore
      if (ignoredTags.includes(e.target?.tagName?.toLowerCase())) {
        return;
      }

      if (e.key === " " || e.key === "Enter") {
        if (isPlaying) {
          stop();
        } else {
          start();
        }
      }
    },
    [isPlaying, start, stop]
  );
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  // todo: useCallback?
  const handleChangeNote =
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
    };

  if (notesCountInBar === null) {
    return (
      <div className={styles.error}>
        Cannot build sequencer. Try select different rhythm or time signature
        settings
      </div>
    );
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <div className={styles.container}>
        <div className={styles.sequencer}>
          <div className={styles.channel}>
            <span className={styles.instrument} />
            <SequencerControls
              playState={isPlaying ? PlayState.Play : PlayState.Stop}
              start={start}
              stop={stop}
              tempo={tempo}
              onChangeTempo={changeTempo}
              rhythm={rhythm}
              onChangeRhythm={changeRhythm}
              timeSignature={timeSignature}
              onChangeTimeSignature={changeTimeSignature}
            />
          </div>
          <div className={styles.channel}>
            <span className={styles.instrument} />
            {notesByInstrument[0].map((_, index) => (
              <div key={index} className={styles.barNumber}>
                {isFirstNoteInBar(index, notesCountInBar)
                  ? index / notesCountInBar + 1
                  : null}
              </div>
            ))}
          </div>
          {instruments.map((instrument, instrumentIndex) => (
            <div key={instrumentIndex} className={styles.channel}>
              <span className={styles.instrument}>{instrument}</span>
              {notesByInstrument[instrumentIndex].map((note, noteIndex) => (
                <SequencerNoteComponent
                  key={noteIndex}
                  note={note}
                  isActive={isPlaying && noteIndex === activeNoteIndex}
                  hasAccent={isFirstNoteInBar(noteIndex, notesCountInBar)}
                  onChange={handleChangeNote(instrumentIndex, noteIndex)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </ThemeProvider>
  );
};
