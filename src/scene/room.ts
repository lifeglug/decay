import { CORRUPTION_THRESHOLD, Rooms } from '../core/constants';
import { getRoomImage } from '../core/util';

export class Room {
  private corruption: number = 0;
  private online: boolean = true;

  private image: HTMLImageElement;

  constructor(public room: Rooms) {
    this.updateRoomImage();
  }

  private updateRoomImage() {
    this.image = getRoomImage(this.room, this.online, this.corruption);
  }

  private corruptionChanged() {
    if (this.corruption >= CORRUPTION_THRESHOLD) {
      this.online = false;
      this.updateRoomImage();
    }
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

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.save();

    ctx.drawImage(this.image, 0, 0);

    ctx.restore();
  }
}
