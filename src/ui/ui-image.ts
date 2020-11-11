import { Loader } from '../core/loader';
import { UIElement } from './ui-element';

export class UIImage extends UIElement {
  private image: HTMLImageElement;

  constructor(x: number, y: number, width: number, height: number, onClick: () => {}, image: string) {
    super(x, y, width, height, onClick);
    this.image = Loader.getImage(image);
  }

  public draw(ctx: CanvasRenderingContext2D, scale: number) {
    ctx.save();
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(this.image, this.x * scale, this.y * scale, this.width * scale, this.height * scale);
    ctx.restore();
  }
}
