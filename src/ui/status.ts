import { AIR_MAX, DISTANCE, POWER_MAX } from '../core/constants';
import { Loader } from '../core/loader';
import { _ } from '../core/localisation';
import { UIElement } from './ui-element';

export class Status extends UIElement {
  private bg: HTMLImageElement;
  private power: number;
  private air: number;
  private distance: number;

  public constructor(private getInfo: () => [number, number, number]) {
    super(207, 247, 214, 37, () => {});
    this.bg = Loader.getImage('status-bg');
    this.tick();
  }

  public tick() {
    const [power, air, distance] = this.getInfo();
    this.power = power;
    this.air = air;
    this.distance = distance;
  }

  public draw(ctx: CanvasRenderingContext2D, scale: number) {
    ctx.save();

    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(this.bg, this.x * scale, this.y * scale, this.width * scale, this.height * scale);

    ctx.restore();
  }
}
