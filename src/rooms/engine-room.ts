import { AIR_MAX, DISTANCE, Rooms } from '../core/constants';
import { Hotspot } from '../ui/hotspot';
import { Progress } from '../ui/progress';
import { Room } from './room';

export class EngineRoom extends Room {
  constructor(private getDistance: () => number) {
    super(Rooms.ENGINES);
  }

  public enterRoom() {
    this.ui.addElements([
      new Hotspot(129, 160, 320, 70, this.powerClick.bind(this)),
      new Progress(10, 10, 150, 40, DISTANCE, this.getDistance.bind(this), 'Distance')
    ]);
  }
}
