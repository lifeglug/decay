import { Rooms } from '../core/constants';
import { Hotspot } from '../ui/hotspot';
import { Room } from './room';

export class SensorsRoom extends Room {
  constructor() {
    super(Rooms.SENSORS);
  }

  public enterRoom() {
    this.ui.addElements([new Hotspot(1131, 462, 72, 73, this.powerClick.bind(this))]);
  }
}
