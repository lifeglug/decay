import { Game } from '../core/game';
import { UI } from '../ui/ui';

export class Scene {
  protected ui: UI = new UI();
  protected running: boolean = true;

  constructor(game: Game) {}

  public onMouseMove(event: MouseEvent, scale: number) {
    if (this.running) {
      this.ui.onMouseMove(event, scale);
    }
  }

  public onMouseClick(event: MouseEvent, scale: number) {
    if (this.running) {
      this.ui.onMouseClick(event, scale);
    }
  }

  public onKeyDown({ key }: KeyboardEvent) {
    if (this.running) {
      switch (key.toLocaleLowerCase()) {
      }
    }
  }

  public update(delta: number) {
    this.ui.update(delta);
  }

  public draw(ctx: CanvasRenderingContext2D, scale: number) {
    ctx.save();
    this.ui.draw(ctx, scale);
    ctx.restore();
  }
}
