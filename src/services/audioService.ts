import { SequencerChannelInstrument } from "../Sequencer/types";

const OSCILLATOR_NOTE_LENGTH = 0.1;

class AudioService {
  private readonly audioContext: AudioContext;
  private readonly gainNode: GainNode;

  constructor() {
    this.audioContext = new AudioContext();
    this.gainNode = this.audioContext.createGain();

    const OSCILLATORS_COUNT = 2;
    this.gainNode.connect(this.audioContext.destination);
    this.gainNode.gain.value = 1 / (OSCILLATORS_COUNT * 2);
  }

  public playSound(instrument: SequencerChannelInstrument): void {
    const instruments: Record<SequencerChannelInstrument, () => void> = {
      [SequencerChannelInstrument.Beep]: this.playBeep,
      [SequencerChannelInstrument.Boop]: this.playBoop,
      [SequencerChannelInstrument.HiHat]: this.playHiHat,
    };

    instruments[instrument]();
  }

  private playBeep = () => {
    this.playOscillatorSound(440);
  };

  private playBoop = () => {
    this.playOscillatorSound(220);
  };

  private playHiHat = (): Promise<void> => {
    const audio = new Audio("./audio/KHats-Clsd-02.wav");
    return audio.play();
  };

  private playOscillatorSound(frequency: number): void {
    const oscillator = this.createOscillator(frequency);
    const currentTime = this.audioContext.currentTime;
    oscillator.start(currentTime);
    oscillator.stop(currentTime + OSCILLATOR_NOTE_LENGTH);
  }

  private createOscillator(frequency: number): OscillatorNode {
    const oscillator = this.audioContext.createOscillator();
    oscillator.connect(this.gainNode);
    oscillator.frequency.value = frequency;

    return oscillator;
  };
}

export const audioService = new AudioService();
