import { Rooms } from '../core/constants';
import { Hotspot } from '../ui/hotspot';
import { Room } from './room';

export class LifeSupportRoom extends Room {
  constructor() {
    super(Rooms.LIFE_SUPPORT);
  }

  public enterRoom() {
    this.ui.addElements([new Hotspot(1066, 276, 90, 70, this.powerClick.bind(this))]);
  }
}
