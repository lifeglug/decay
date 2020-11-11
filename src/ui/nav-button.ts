import { Rooms } from '../core/constants';
import { _ } from '../core/localisation';
import { getNavImages } from '../core/util';
import { Button } from './button';

export class NavButton extends Button {
  private image: HTMLImageElement;
  private imageActive: HTMLImageElement;

  constructor(x: number, y: number, width: number, height: number, onClick: () => {}, public room: Rooms) {
    super(x, y, width, height, onClick, '');
    const [normal, active] = getNavImages(room);
    this.image = normal;
    this.imageActive = active;
  }

  public draw(ctx: CanvasRenderingContext2D, scale: number) {
    ctx.save();
    const img = this.active ? this.imageActive : this.image;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(img, this.x * scale, this.y * scale, img.width * scale, img.height * scale);
    ctx.restore();
  }
}
