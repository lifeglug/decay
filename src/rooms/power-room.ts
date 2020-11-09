import { Rooms } from '../core/constants';
import { Hotspot } from '../ui/hotspot';
import { Room } from './room';

export class PowerRoom extends Room {
  constructor() {
    super(Rooms.POWER);
  }

  public enterRoom() {
    this.ui.addElements([new Hotspot(740, 375, 69, 54, this.powerClick.bind(this))]);
  }
}
