import { Rooms } from '../core/constants';
import { Hotspot } from '../ui/hotspot';
import { Room } from './room';

export class PowerRoom extends Room {
  constructor() {
    super(Rooms.POWER);
  }

  public enterRoom() {
    this.ui.addElements([new Hotspot(370, 187, 34, 27, this.powerClick.bind(this))]);
  }
}
