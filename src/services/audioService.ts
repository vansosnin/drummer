import { SequencerChannelInstrument } from "../Sequencer/types";

const OSCILLATOR_NOTE_LENGTH = 0.1;

class AudioService {
  private readonly audioContext: AudioContext;
  private readonly gainNode: GainNode;
  private readonly hiHatAudioElement: HTMLAudioElement;

  constructor() {
    this.audioContext = new AudioContext();
    this.gainNode = this.audioContext.createGain();

    const OSCILLATORS_COUNT = 2;
    this.gainNode.connect(this.audioContext.destination);
    this.gainNode.gain.value = 1 / (OSCILLATORS_COUNT * 2);

    this.hiHatAudioElement = new Audio(
      process.env.PUBLIC_URL + "/audio/KHats-Clsd-02.mp3"
    );
  }

  public playSound(instrument: SequencerChannelInstrument): void {
    const instruments: Record<SequencerChannelInstrument, () => void> = {
      [SequencerChannelInstrument.Beep]: this.playBeep,
      [SequencerChannelInstrument.Boop]: this.playBoop,
      [SequencerChannelInstrument.HiHat]: this.playHiHat,
    };

    instruments[instrument]();
  }

  private playBeep = (): void => {
    this.playOscillatorSound(440);
  };

  private playBoop = (): void => {
    this.playOscillatorSound(220);
  };

  private playHiHat = (): Promise<void> => {
    return this.hiHatAudioElement.play();
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
  }
}

export const audioService = new AudioService();
