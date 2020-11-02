import { DEBUG } from '../core/constants';
import { UIElement } from './ui-element';

export class Hotspot extends UIElement {
  constructor(x: number, y: number, width: number, height: number, onClick: () => {}) {
    super(x, y, width, height, onClick);
  }

  public draw(ctx: CanvasRenderingContext2D, scale: number) {
    ctx.save();

    if (DEBUG) {
      ctx.fillStyle = this.hovered ? 'rgba(255, 0, 0, 0.2)' : 'rgba(255, 0, 0, 0)';
      ctx.fillRect(this.x * scale, this.y * scale, this.width * scale, this.height * scale);
    }

    if (DEBUG) {
      ctx.setLineDash([5, 3]);
      ctx.strokeStyle = 'black';
      ctx.strokeRect(this.x * scale, this.y * scale, this.width * scale, this.height * scale);
    }

    ctx.restore();
  }
}
