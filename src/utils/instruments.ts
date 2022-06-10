import { SequencerChannelInstrument } from "../types";

export const instrumentsList = Object.values(SequencerChannelInstrument);

export const hiHatIndex = instrumentsList.findIndex(
    (i) => i === SequencerChannelInstrument.HiHat
);
export const snareIndex = instrumentsList.findIndex(
    (i) => i === SequencerChannelInstrument.Snare
);

export const kickIndex = instrumentsList.findIndex(
    (i) => i === SequencerChannelInstrument.Kick
);
