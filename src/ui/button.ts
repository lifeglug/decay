import { Rooms } from '../core/constants';
import { UIElement } from './ui-element';

export class Button extends UIElement {
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

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.fillStyle = this.hovered ? 'red' : 'white';
    ctx.fillRect(this.x, this.y, this.width, this.height);

    ctx.strokeStyle = this.active ? 'red' : 'black';
    ctx.strokeRect(this.x, this.y, this.width, this.height);

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'black';
    ctx.font = '12pt monospace';
    ctx.fillText(this.label, this.x + this.width / 2, this.y + this.height / 2);
    ctx.restore();
  }
}
