export enum SequencerChannelInstrument {
  Beep = "Beep",
  Boop = "Boop",
  HiHat = "HiHat",
  Snare = "Snare",
  Kick = "Kick",
}

export enum Rhythm {
  Four = "4",
  Eight2 = "8-8",
  // Eight3 = "8-8-8",
  // Sixteen4 = "16-16-16-16",
  // Sixteen6 = "16-16-16-16-16-16",
}

export enum TimeSignature {
  ThreeFour = "3/4",
  FourFour = "4/4",
  // SixEight = "6/8",
  // SevenEight = "7/8",
}

export enum SequencerNote {
  Off = "Off",
  On = "On",
}

export enum SequencerPreset {
  Metronome = "Metronome",
  Rock = "Rock",
}

export interface ISequencerChannel {
  instrument: SequencerChannelInstrument;
  barsCount: number;
  notesCountInBar: number;
  timeSignature: TimeSignature;
  rhythm: Rhythm;
  notes: SequencerNote[];
}
