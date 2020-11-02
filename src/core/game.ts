import { Scene } from '../scene/scene';
import { WIDTH } from './constants';
import { Loader } from './loader';
import { clamp } from './util';

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private scene: Scene;
  private lastStep: number = 0;
  private scale: number = 0;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.ctx.imageSmoothingEnabled = false;
    document.getElementById('viewport').appendChild(this.canvas);
    this.resize();

    document.addEventListener('mousedown', this.onMouseClick.bind(this));
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('keydown', this.onKeyDown.bind(this));
    window.addEventListener('resize', this.resize.bind(this));

    Loader.load(() => {
      this.scene = new Scene();
      this.loop(0);
    });
  }

  private resize() {
    this.canvas.width = clamp(window.innerWidth, WIDTH, window.innerWidth);
    this.canvas.height = (this.canvas.width / 16) * 9;
    this.scale = this.canvas.width / WIDTH;
  }

  private loop(timestamp: number) {
    const delta = timestamp - this.lastStep;
    this.lastStep = timestamp;

    this.update(delta);
    this.draw();

    window.requestAnimationFrame(this.loop.bind(this));
  }

  private onMouseMove(event: MouseEvent) {
    this.scene.onMouseMove(event, this.scale);
  }

  private onMouseClick(event: MouseEvent) {
    this.scene.onMouseClick(event, this.scale);
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

    this.scene.draw(this.ctx, this.scale);
  }
}
