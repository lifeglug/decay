import { images, sounds } from './assets';

export class Loader {
  public static audioContext: AudioContext = new window.AudioContext();
  public static loaded: boolean = false;
  private static assets: {
    images: { [key: string]: HTMLImageElement };
    sounds: { [key: string]: AudioBuffer };
  } = {
    images: {},
    sounds: {}
  };
  private static queue: {
    [key: string]: { [key: string]: string };
  } = {
    images: {},
    sounds: {}
  };

  public static async loadSound(path: string): Promise<AudioBuffer> {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open('GET', path, true);
      request.responseType = 'arraybuffer';
      request.onload = () => {
        this.audioContext.decodeAudioData(
          request.response,
          buffer => {
            resolve(buffer);
          },
          reject
        );
      };
      request.send();
    });
  }

  public static load(callback: () => void) {
    this.queue.images = Object.assign({}, images);
    this.queue.sounds = Object.assign({}, sounds);
    const totalItems = Object.keys(this.queue.images).length + Object.keys(this.queue.sounds).length;

    let loadProgress = 0;

    const assetLoaded = () => {
      loadProgress += 1;
      if (loadProgress === totalItems) {
        this.loaded = true;
        callback();
      }
    };

    Promise.all(
      Object.keys(this.queue.sounds).map(key => {
        return this.loadSound(this.queue.sounds[key]).then(buffer => {
          this.assets.sounds[key] = buffer;
          assetLoaded();
        });
      })
    );

    Object.keys(this.queue.images).map(key => {
      const img = new Image();
      img.src = this.queue.images[key];
      img.onload = assetLoaded.bind(this);
      this.assets.images[key] = img;
    });
  }

  public static getImage(id: string): HTMLImageElement {
    return this.assets.images[id];
  }

  public static getSoundBuffer(id: string): AudioBuffer {
    return this.assets.sounds[id];
  }
}
