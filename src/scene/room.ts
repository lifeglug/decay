import { CORRUPTION_THRESHOLD, HEIGHT, Rooms, WIDTH } from '../core/constants';
import { getRoomImage } from '../core/util';
import { Hotspot } from '../ui/hotspot';
import { UI } from '../ui/ui';

export class Room {
  private corruption: number = 0;
  private online: boolean = true;
  private image: HTMLImageElement;
  private ui: UI = new UI();

  constructor(public room: Rooms) {
    this.updateRoomImage();
    this.ui.addElements([new Hotspot(129, 160, 320, 70, this.powerClick.bind(this))]);
  }

  private powerClick() {
    this.setOnline(!this.online);
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

  public onMouseMove(event: MouseEvent, scale: number) {
    this.ui.onMouseMove(event, scale);
  }

  public onMouseClick(event: MouseEvent, scale: number) {
    this.ui.onMouseClick(event, scale);
  }

  public draw(ctx: CanvasRenderingContext2D, scale: number) {
    ctx.save();

    ctx.drawImage(this.image, 0, 0, WIDTH * scale, HEIGHT * scale);

    this.ui.draw(ctx, scale);

    ctx.restore();
  }
}
