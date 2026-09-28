// Web Audio API Procedural Bansuri / Tanpura Drone & Santhali Folk Atmosphere Synthesizer
class TribalSoundscape {
  private ctx: AudioContext | null = null;
  private isRunning: boolean = false;
  private masterGain: GainNode | null = null;
  private nodes: OscillatorNode[] = [];
  private intervals: NodeJS.Timeout[] = [];

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.2, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
  }

  public start() {
    this.init();
    if (!this.ctx || this.isRunning) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isRunning = true;

    const now = this.ctx.currentTime;
    if (this.masterGain) {
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.linearRampToValueAtTime(0.22, now + 1.5);
    }

    // 1. Root Tanpura Drone (Sa & Pa in Indian classical base - D2 & A2 frequencies: 73.4Hz & 110Hz)
    const baseFreqs = [73.42, 110.0, 146.83, 220.0];
    baseFreqs.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const panner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq + (Math.random() * 0.4 - 0.2), now);

      gain.gain.setValueAtTime(0.04 / (idx + 1), now);

      if (panner) {
        panner.pan.setValueAtTime((idx % 2 === 0 ? -0.4 : 0.4), now);
        osc.connect(gain);
        gain.connect(panner);
        panner.connect(this.masterGain);
      } else {
        osc.connect(gain);
        gain.connect(this.masterGain);
      }

      osc.start();
      this.nodes.push(osc);
    });

    // 2. Meditative Bamboo Flute Melodic Breath (Raag Bhupali / Desh pentatonic intervals: D, E, G, A, B)
    const fluteNotes = [293.66, 329.63, 392.00, 440.00, 493.88, 587.33];
    const playFluteChime = () => {
      if (!this.ctx || !this.isRunning || !this.masterGain) return;
      const note = fluteNotes[Math.floor(Math.random() * fluteNotes.length)];
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(note, this.ctx.currentTime);

      // Breath vibrato LFO
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(5.2, this.ctx.currentTime); // 5Hz vibrato
      lfoGain.gain.setValueAtTime(4.0, this.ctx.currentTime);
      lfo.connect(osc.frequency);
      lfo.start();

      const startTime = this.ctx.currentTime;
      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.exponentialRampToValueAtTime(0.07, startTime + 0.8);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 3.8);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(startTime);
      osc.stop(startTime + 4.0);
      lfo.stop(startTime + 4.0);
    };

    // Play periodic soothing flute chime every 4-6 seconds
    const interval = setInterval(() => {
      if (this.isRunning) {
        playFluteChime();
      }
    }, 4500);
    this.intervals.push(interval);
    playFluteChime();
  }

  public stop() {
    if (!this.ctx || !this.isRunning) return;
    const now = this.ctx.currentTime;
    if (this.masterGain) {
      this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 1.2);
    }
    setTimeout(() => {
      this.nodes.forEach((node) => {
        try { node.stop(); node.disconnect(); } catch {}
      });
      this.nodes = [];
      this.intervals.forEach((i) => clearInterval(i));
      this.intervals = [];
      this.isRunning = false;
    }, 1300);
  }

  public toggle(): boolean {
    if (this.isRunning) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isRunning;
  }
}

export const tribalSoundscape = new TribalSoundscape();
