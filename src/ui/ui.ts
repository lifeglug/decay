import { UIElement } from './ui-element';

export class UI {
  private elements: UIElement[] = [];

  constructor() {}

  public addElements(elements: UIElement[]) {
    this.elements = elements;
  }

  public clearElements() {
    this.elements = [];
  }

  public onMouseMove(event: MouseEvent, scale: number) {
    this.elements.map(element => {
      element.checkHover(event, scale);
    });
  }

  public onMouseClick(event: MouseEvent, scale: number) {
    this.elements.map(element => {
      element.checkClick(event, scale);
    });
  }

  public draw(ctx: CanvasRenderingContext2D, scale: number) {
    this.elements.map(element => {
      element.draw(ctx, scale);
    });
  }

  public setActive(predicate: (element: UIElement) => boolean) {
    this.elements.map(element => {
      if (predicate(element)) {
        element.setActive(true);
      } else {
        element.setActive(false);
      }
    });
  }
}
