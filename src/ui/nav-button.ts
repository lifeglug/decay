import { Rooms } from '../core/constants';
import { UIElement } from './ui-element';

export class NavButton extends UIElement {
  private label: string;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    onClick: () => {},
    protected hotkey: number,
    public room: Rooms
  ) {
    super(x, y, width, height, onClick);
    this.label = `${hotkey}. ${room}`;
  }

  public draw(ctx: CanvasRenderingContext2D, scaleAmount: number) {
    ctx.save();
    ctx.fillStyle = this.hovered ? 'red' : 'white';
    ctx.fillRect(this.x * scaleAmount, this.y * scaleAmount, this.width * scaleAmount, this.height * scaleAmount);

    ctx.strokeStyle = this.active ? 'red' : 'black';
    ctx.strokeRect(this.x * scaleAmount, this.y * scaleAmount, this.width * scaleAmount, this.height * scaleAmount);

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'black';
    ctx.font = '12pt monospace';
    ctx.fillText(this.label, (this.x + this.width / 2) * scaleAmount, (this.y + this.height / 2) * scaleAmount);
    ctx.restore();
  }
}
