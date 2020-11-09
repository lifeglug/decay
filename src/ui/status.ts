import { AIR_MAX, DISTANCE, POWER_MAX } from '../core/constants';
import { _ } from '../core/localisation';
import { UIElement } from './ui-element';

export class Status extends UIElement {
  private power: number;
  private air: number;
  private distance: number;

  public constructor(private getInfo: () => [number, number, number]) {
    super(350, 620, 200, 80, () => {});
  }

  public tick() {
    const [power, air, distance] = this.getInfo();
    this.power = power;
    this.air = air;
    this.distance = distance;
  }

  public draw(ctx: CanvasRenderingContext2D, scale: number) {
    ctx.save();

    ctx.fillStyle = 'white';
    ctx.fillRect(this.x * scale, this.y * scale, this.width * scale, this.height * scale);
    ctx.strokeRect(this.x * scale, this.y * scale, this.width * scale, this.height * scale);

    ctx.fillStyle = 'black';
    ctx.font = `${14 * scale}px monospace`;
    ctx.textBaseline = 'top';
    ctx.fillText(`${_('status-power')} ${this.power}/${POWER_MAX}`, (this.x + 5) * scale, (this.y + 5) * scale);
    ctx.fillText(`${_('status-air')} ${this.air}/${AIR_MAX}`, (this.x + 5) * scale, (this.y + 25) * scale);
    ctx.fillText(`${_('status-distance')} ${this.distance}/${DISTANCE}`, (this.x + 5) * scale, (this.y + 45) * scale);

    ctx.restore();
  }
}
