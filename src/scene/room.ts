import { CORRUPTION_THRESHOLD, HEIGHT, Rooms, WIDTH } from '../core/constants';
import { getRoomImage } from '../core/util';
import { Hotspot } from '../ui/hotspot';
import { UIElement } from '../ui/ui-element';

export class Room {
  private corruption: number = 0;
  private online: boolean = true;
  private image: HTMLImageElement;
  private ui: UIElement[] = [
    new Hotspot(129, 160, 320, 70, this.powerClick.bind(this)),
    new Hotspot(129, 250, 400, 70, this.corruptionClick.bind(this))
  ];

  constructor(public room: Rooms) {
    this.updateRoomImage();
  }

  private powerClick() {
    this.setOnline(!this.online);
  }

  private corruptionClick() {
    this.setCorruption(this.corruption === 0 ? 5 : 0);
  }

  private updateRoomImage() {
    this.image = getRoomImage(this.room, this.online, this.corruption);
  }

  private corruptionChanged() {
    if (this.corruption >= CORRUPTION_THRESHOLD) {
      this.online = false;
      this.updateRoomImage();
    }
    this.updateRoomImage();
  }

  public setOnline(online: boolean) {
    if (this.corruption < CORRUPTION_THRESHOLD) {
      this.online = online;
      this.updateRoomImage();
    }
  }

  public setCorruption(value: number) {
    this.corruption = value;
    this.corruptionChanged();
  }

  public onMouseMove(event: MouseEvent, scaleAmount: number) {
    this.ui.map(element => {
      element.checkHover(event, scaleAmount);
    });
  }

  public onMouseClick(event: MouseEvent, scaleAmount: number) {
    this.ui.map(element => {
      element.checkClick(event, scaleAmount);
    });
  }

  public draw(ctx: CanvasRenderingContext2D, scaleAmount: number) {
    ctx.save();

    ctx.drawImage(this.image, 0, 0, WIDTH * scaleAmount, HEIGHT * scaleAmount);

    this.ui.map(element => {
      element.draw(ctx, scaleAmount);
    });

    ctx.restore();
  }
}
