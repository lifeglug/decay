export class UIElement {
  protected hovered: boolean = false;
  protected active: boolean = false;

  constructor(
    protected x: number,
    protected y: number,
    protected width: number,
    protected height: number,
    protected onClick: () => {}
  ) {}

  public update(delta: number) {}

  public draw(ctx: CanvasRenderingContext2D, scaleAmount: number) {}

  public setActive(active: boolean) {
    this.active = active;
  }

  public checkMouseOver({ offsetX: x, offsetY: y }: MouseEvent, scaleAmount: number) {
    return (
      x >= this.x * scaleAmount &&
      x <= (this.x + this.width) * scaleAmount &&
      y >= this.y * scaleAmount &&
      y <= (this.y + this.height) * scaleAmount
    );
  }

  public checkClick(event: MouseEvent, scaleAmount: number) {
    if (this.checkMouseOver(event, scaleAmount)) {
      this.onClick();
    }
  }

  public checkHover(event: MouseEvent, scaleAmount) {
    this.hovered = this.checkMouseOver(event, scaleAmount);
  }
}
