import { Rooms } from '../core/constants';
import { Hotspot } from '../ui/hotspot';
import { Room } from './room';

export class EngineRoom extends Room {
  constructor() {
    super(Rooms.ENGINES);
  }

  public enterRoom() {
    this.ui.addElements([new Hotspot(997, 322, 86, 80, this.powerClick.bind(this))]);
  }
}
