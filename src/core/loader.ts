import { images } from './assets';

export class Loader {
  public static loaded: boolean = false;
  private static loadProgress: number = 0;
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

  public static load() {
    this.queueImages();

    Object.keys(this.queue.images).map(key => {
      const img = new Image();
      img.src = this.queue.images[key];
      img.onload = this.imageLoaded.bind(this);
      this.assets.images[key] = img;
    });
  }

  private static imageLoaded() {
    this.loadProgress += 1;
    if (this.loadProgress === Object.keys(this.queue.images).length) {
      this.loadComplete();
    }
  }

  private static loadComplete() {
    this.loaded = true;
  }

  public static getImage(id: string): HTMLImageElement {
    return this.assets.images[id];
  }
}
