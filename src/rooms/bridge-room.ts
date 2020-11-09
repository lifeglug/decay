import { Rooms } from '../core/constants';
import { Hotspot } from '../ui/hotspot';
import { Room } from './room';

export class BridgeRoom extends Room {
  constructor() {
    super(Rooms.BRIDGE);
  }

  public enterRoom() {
    this.ui.addElements([new Hotspot(634, 478, 94, 59, this.powerClick.bind(this))]);
  }
}
