export class UIElement {
  protected hovered: boolean = false;
  protected active: boolean = false;

  constructor(
    protected x: number,
    protected y: number,
    protected width: number,
    protected height: number,
    protected onClick: () => void
  ) {}

  public update(delta: number) {}

  public tick() {}

  public draw(ctx: CanvasRenderingContext2D, scale: number) {}

  public setActive(active: boolean) {
    this.active = active;
  }

  public checkMouseOver({ offsetX: x, offsetY: y }: MouseEvent, scale: number) {
    return (
      x >= this.x * scale &&
      x <= (this.x + this.width) * scale &&
      y >= this.y * scale &&
      y <= (this.y + this.height) * scale
    );
  }

  public checkClick(event: MouseEvent, scale: number) {
    if (this.checkMouseOver(event, scale)) {
      this.onClick();
    }
  }

  public checkHover(event: MouseEvent, scale) {
    this.hovered = this.checkMouseOver(event, scale);
  }
}
