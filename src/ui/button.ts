import { UIElement } from './ui-element';

export class Button extends UIElement {
  constructor(x: number, y: number, width: number, height: number, onClick: () => void, protected label: string) {
    super(x, y, width, height, onClick);
  }

  public draw(ctx: CanvasRenderingContext2D, scale: number) {
    ctx.save();
    ctx.fillStyle = this.hovered ? 'red' : 'white';
    ctx.fillRect(this.x * scale, this.y * scale, this.width * scale, this.height * scale);

    ctx.strokeStyle = this.active ? 'red' : 'black';
    ctx.strokeRect(this.x * scale, this.y * scale, this.width * scale, this.height * scale);

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'black';
    ctx.font = `${6 * scale}px 'Press Start 2P'`;
    ctx.fillText(this.label, (this.x + this.width / 2) * scale, (this.y + this.height / 2) * scale);
    ctx.restore();
  }
}
