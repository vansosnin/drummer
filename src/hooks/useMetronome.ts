import { useEffect, useState } from "react";
import { Rhythm, TimeSignature } from "../Sequencer/types";
import { getNotesCountInBar } from "../utils/getNotesCountInBar";
import { getTimeSignatureInfo } from "../utils/getTimeSignatureInfo";

const metronomeWorker = new Worker(
  new URL("../workers/metronome.js", import.meta.url)
);

export const useMetronome = () => {
  const [activeNoteIndex, setActiveNoteIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [tempo, setTempo] = useState(100);
  const [rhythm, setRhythm] = useState(Rhythm.Four);
  const [timeSignature, setTimeSignature] = useState(TimeSignature.FourFour);

  const notesCountInBar = getNotesCountInBar(timeSignature, rhythm);
  const [barsCount] = getTimeSignatureInfo(timeSignature);
  const totalNotesCount = (notesCountInBar ?? 0) * barsCount;

  const start = () => {
    changeTempo(tempo);
    setIsPlaying(true);
    metronomeWorker.postMessage("start");
  };

  const stop = () => {
    setIsPlaying(false);
    setActiveNoteIndex(null);
    metronomeWorker.postMessage("stop");
  };

  const changeTempo = (newTempo: number) => {
    if (newTempo !== tempo) {
      setTempo(newTempo);
      const interval = _tempoToInterval(newTempo);
      metronomeWorker.postMessage({ interval });
    }
  };

  const _tempoToInterval = (tempo: number): number => {
    return (60 / tempo) * 1000;
  };

  useEffect(() => {
    return () => {
      stop();
    };
  }, []);

  metronomeWorker.onmessage = function (e) {
    if (e.data === "tick") {
      const nextActiveNote =
        (activeNoteIndex === null ? 0 : activeNoteIndex + 1) % totalNotesCount;
      setActiveNoteIndex(nextActiveNote);
    }
  };

  return {
    tempo,
    changeTempo,

    rhythm,
    changeRhythm: setRhythm,

    timeSignature,
    changeTimeSignature: setTimeSignature,

    isPlaying,
    start,
    stop,

    activeNoteIndex,
    notesCountInBar,
    totalNotesCount,
  };
};
