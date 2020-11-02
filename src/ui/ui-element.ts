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

  public draw(ctx: CanvasRenderingContext2D) {}

  public setActive(active: boolean) {
    this.active = active;
  }

  public checkMouseOver({ offsetX: x, offsetY: y }: MouseEvent) {
    return x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height;
  }

  public checkClick(event: MouseEvent) {
    if (this.checkMouseOver(event)) {
      this.onClick();
    }
  }

  public checkHover(event: MouseEvent) {
    this.hovered = this.checkMouseOver(event);
  }
}
