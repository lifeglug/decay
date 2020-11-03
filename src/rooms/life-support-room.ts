import { AIR_MAX, Rooms } from '../core/constants';
import { Hotspot } from '../ui/hotspot';
import { Progress } from '../ui/progress';
import { Room } from './room';

export class LifeSupportRoom extends Room {
  constructor(private getAir: () => number) {
    super(Rooms.LIFE_SUPPORT);
  }

  public enterRoom() {
    this.ui.addElements([
      new Hotspot(129, 160, 320, 70, this.powerClick.bind(this)),
      new Progress(10, 10, 150, 40, AIR_MAX, this.getAir.bind(this), 'Air')
    ]);
  }
}
