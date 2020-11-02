import { images } from './assets';

export class Loader {
  public static loaded: boolean = false;
  private static assets: {
    images: { [key: string]: HTMLImageElement };
  } = {
    images: {}
  };
  private static queue: {
    images: { [key: string]: string };
  } = {
    images: {}
  };

  public static queueImages() {
    this.queue.images = Object.assign({}, images);
  }

  public static load(callback: () => void) {
    this.queueImages();
    let loadProgress = 0;

    const imageLoaded = () => {
      loadProgress += 1;
      if (loadProgress === Object.keys(this.queue.images).length) {
        this.loaded = true;
        callback();
      }
    };

    Object.keys(this.queue.images).map(key => {
      const img = new Image();
      img.src = this.queue.images[key];
      img.onload = imageLoaded.bind(this);
      this.assets.images[key] = img;
    });
  }

  public static getImage(id: string): HTMLImageElement {
    return this.assets.images[id];
  }
}
