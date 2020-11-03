import { CORRUPTION_THRESHOLD, HEIGHT, Rooms, WIDTH } from '../core/constants';
import { getRoomImage } from '../core/util';
import { Hotspot } from '../ui/hotspot';
import { UI } from '../ui/ui';

export class Room {
  protected corruption: number = 0;
  protected online: boolean = true;
  protected image: HTMLImageElement;
  protected ui: UI = new UI();

  constructor(public room: Rooms) {
    this.updateRoomImage();
  }

  public enterRoom() {
    this.ui.addElements([new Hotspot(129, 160, 320, 70, this.powerClick.bind(this))]);
  }

  public exitRoom() {}

  public setOnline(online: boolean) {
    if (this.corruption < CORRUPTION_THRESHOLD) {
      this.online = online;
      this.updateRoomImage();
    }
  }

  public isOnline() {
    return this.online;
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

  public update(delta: number) {
    this.ui.update(delta);
  }

  public draw(ctx: CanvasRenderingContext2D, scale: number) {
    ctx.save();

    ctx.drawImage(this.image, 0, 0, WIDTH * scale, HEIGHT * scale);

    this.ui.draw(ctx, scale);

    ctx.restore();
  }

  protected powerClick() {
    this.setOnline(!this.online);
  }

  protected updateRoomImage() {
    this.image = getRoomImage(this.room, this.online, this.corruption);
  }

  protected corruptionChanged() {
    if (this.corruption >= CORRUPTION_THRESHOLD) {
      this.online = false;
      this.updateRoomImage();
    }
    this.updateRoomImage();
  }
}
