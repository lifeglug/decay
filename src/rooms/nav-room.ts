import { Rooms } from '../core/constants';
import { Hotspot } from '../ui/hotspot';
import { Room } from './room';

export class NavRoom extends Room {
  constructor() {
    super(Rooms.NAVIGATION);
  }

  public enterRoom() {
    this.ui.addElements([new Hotspot(481, 127, 27, 25, this.powerClick.bind(this))]);
  }
}
