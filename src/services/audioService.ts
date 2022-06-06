import { SequencerChannelInstrument } from "../Sequencer/types";

const OSCILLATOR_NOTE_LENGTH = 0.1;

const instrumentRelativeUrls = new Map<SequencerChannelInstrument, string>([
  [SequencerChannelInstrument.HiHat, "/audio/hihat.mp3"],
  [SequencerChannelInstrument.Snare, "/audio/snare.mp3"],
  [SequencerChannelInstrument.Kick, "/audio/kick.mp3"],
]);

class AudioService {
  private readonly audioContext: AudioContext;
  private readonly gainNode: GainNode;
  private readonly instrumentAudioBuffers = new Map<
    SequencerChannelInstrument,
    AudioBuffer
  >();

  constructor() {
    this.audioContext = new AudioContext();
    this.gainNode = this.audioContext.createGain();

    this.setupOscillators();
    this.setupInstruments();
  }

  public playSound(instrument: SequencerChannelInstrument): void {
    const instruments: Record<SequencerChannelInstrument, () => void> = {
      [SequencerChannelInstrument.Beep]: () => this.playOscillatorSound(440),
      [SequencerChannelInstrument.Boop]: () => this.playOscillatorSound(220),
      [SequencerChannelInstrument.HiHat]: () =>
        this.playInstrument(SequencerChannelInstrument.HiHat),
      [SequencerChannelInstrument.Snare]: () =>
        this.playInstrument(SequencerChannelInstrument.Snare),
      [SequencerChannelInstrument.Kick]: () =>
        this.playInstrument(SequencerChannelInstrument.Kick),
    };

    instruments[instrument]();
  }

  private setupOscillators() {
    const OSCILLATORS_COUNT = 2;
    this.gainNode.connect(this.audioContext.destination);
    this.gainNode.gain.value = 1 / (OSCILLATORS_COUNT * 2);
  }

  private async setupInstruments(): Promise<void> {
    await Promise.all(
      Array.from(instrumentRelativeUrls.keys()).map(this.setupInstrument)
    );
  }

  private setupInstrument = async (
    instrument: SequencerChannelInstrument
  ): Promise<void> => {
    const relativeUrl = instrumentRelativeUrls.get(instrument);
    const response = await fetch(process.env.PUBLIC_URL + relativeUrl);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
    this.instrumentAudioBuffers.set(instrument, audioBuffer);
  };

  private playInstrument = (instrument: SequencerChannelInstrument) => {
    const bufferSourceNode = this.audioContext.createBufferSource();
    const audioBuffer = this.instrumentAudioBuffers.get(instrument);
    if (!audioBuffer) {
      throw new Error(`Audio buffer not found for instrument ${instrument}`);
    }

    bufferSourceNode.buffer = audioBuffer;
    bufferSourceNode.connect(this.audioContext.destination);
    bufferSourceNode.start();
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
