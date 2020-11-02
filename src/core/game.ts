import { Scene } from '../scene/scene';
import { DEBUG_OUTPUT, HEIGHT, WIDTH } from './constants';

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private scene: Scene = new Scene();
  private lastStep: number = 0;

  constructor(debug: boolean) {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    document.getElementById('viewport').appendChild(this.canvas);
    this.canvas.width = WIDTH;
    this.canvas.height = HEIGHT;

    if (debug) {
      DEBUG_OUTPUT.id = 'debugOutput';
      DEBUG_OUTPUT.rows = 25;
      DEBUG_OUTPUT.cols = 80;
      document.body.appendChild(DEBUG_OUTPUT);
    }

    document.addEventListener('mousedown', this.onMouseClick.bind(this));
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('keydown', this.onKeyDown.bind(this));

    this.loop(0);
  }

  private loop(timestamp: number) {
    const delta = timestamp - this.lastStep;
    this.lastStep = timestamp;

    this.update(delta);
    this.draw();

    window.requestAnimationFrame(this.loop.bind(this));
  }

  private onMouseMove(event: MouseEvent) {
    this.scene.onMouseMove(event);
  }

  private onMouseClick(event: MouseEvent) {
    this.scene.onMouseClick(event);
  }

  private onKeyDown(event: KeyboardEvent) {
    this.scene.onKeyDown(event);
  }

  private update(delta: number) {
    this.scene.update(delta);
  }

  private draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.scene.draw(this.ctx);
  }
}
