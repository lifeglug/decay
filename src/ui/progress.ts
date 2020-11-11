import { UIElement } from './ui-element';

export class Progress extends UIElement {
  private current: number = 0;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    private max: number,
    private getCurrent: () => number,
    private label?: string
  ) {
    super(x, y, width, height, () => {});
  }

  public update() {
    this.current = this.getCurrent();
  }

  public draw(ctx: CanvasRenderingContext2D, scale: number) {
    ctx.save();

    const width = this.width * (this.current / this.max);

    ctx.fillStyle = 'red';
    ctx.fillRect(this.x * scale, this.y * scale, width * scale, this.height * scale);

    ctx.strokeRect(this.x * scale, this.y * scale, this.width * scale, this.height * scale);

    if (this.label) {
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'black';
      ctx.font = `${6 * scale}px 'Press Start 2P'`;
      ctx.fillText(
        `${this.label}: ${this.current} / ${this.max}`,
        (this.x + 10) * scale,
        (this.y + this.height / 2) * scale
      );
    }

    ctx.restore();
  }
}
