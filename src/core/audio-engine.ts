import rumble from '../sound/rumble.wav';
import { Loader } from './loader';

export class AudioEngine {
  private static muted: boolean = false;
  private static bg: HTMLAudioElement = document.createElement('audio');
  private static ctx: AudioContext = new window.AudioContext();
  private static src: AudioBufferSourceNode;

  public static play(id: string) {
    if (this.muted) {
      return;
    }

    if (!this.src) {
      this.src = this.ctx.createBufferSource();
    }

    this.src.buffer = Loader.getSoundBuffer(id);
    this.src.connect(this.ctx.destination);
    this.src.start(0);
  }

  public static playBackgroundLoop(id: string) {
    this.bg.src = rumble;
    this.bg.loop = true;
    this.bg.play();
  }

  public static stopBackgroundLoop() {
    this.bg.src = null;
    this.bg.loop = false;
  }

  public static mute() {
    this.bg.muted = this.muted = true;
    this.src?.stop();
  }

  public static unmute() {
    this.bg.muted = this.muted = false;
  }

  public static toggleMute() {
    this.muted ? this.unmute() : this.mute();
  }
}
