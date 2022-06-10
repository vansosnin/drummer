import {
  Rhythm,
  SequencerChannelInstrument,
  SequencerNote,
  SequencerPreset,
  TimeSignature,
} from "../../types";
import { instrumentsList } from "../../utils/instruments";

const _ = SequencerNote.Off;
const o = SequencerNote.On;

const rockNotes = new Map([
  // 1           2           3           4
  [
    SequencerChannelInstrument.HiHat,
    [o, _, o, _, o, _, o, _, o, _, o, _, o, _, o, _],
  ],
  [
    SequencerChannelInstrument.Snare,
    [_, _, _, _, o, _, _, _, _, _, _, _, o, _, _, _],
  ],
  [
    SequencerChannelInstrument.Kick,
    [o, _, _, _, _, _, _, _, o, _, o, _, _, _, _, _],
  ],
]);

export const sequencerPresets: Record<
  SequencerPreset,
  [Rhythm, TimeSignature, SequencerNote[][]]
> = {
  [SequencerPreset.Metronome]: [
    Rhythm.Four,
    TimeSignature.FourFour,
    instrumentsList.map((instrument) =>
      instrument === SequencerChannelInstrument.HiHat
        ? new Array(16).fill(o)
        : new Array(16).fill(_)
    ),
  ],
  [SequencerPreset.Rock]: [
    Rhythm.Four,
    TimeSignature.FourFour,
    instrumentsList.map(
      (instrument) => rockNotes.get(instrument) ?? new Array(16).fill(_)
    ),
  ],
};
