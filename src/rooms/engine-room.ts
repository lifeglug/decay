import { Rooms } from '../core/constants';
import { Hotspot } from '../ui/hotspot';
import { Room } from './room';

export class EngineRoom extends Room {
  constructor() {
    super(Rooms.ENGINES);
  }

  public enterRoom() {
    this.ui.addElements([new Hotspot(498, 162, 43, 40, this.powerClick.bind(this))]);
  }
}
