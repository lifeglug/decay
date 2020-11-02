import eventsJson from '../json/events.json';
import { COORDINATOR_TICK } from './constants';

export enum EventType {
  OFFLINE = 'OFFLINE',
  CORRUPTION = 'CORRUPTION',
  DIALOG = 'DIALOG'
}

export interface TimedEvent {
  type: string;
  time: number;
  context?: any;
}

export class Coordinator {
  private running: boolean = false;
  private events: TimedEvent[] = [...eventsJson];
  private timestamp: number = 0;
  private step: number = 0;

  constructor(private fireEvent: (event: TimedEvent) => void) {}

  public start() {
    this.running = true;
  }

  public pause() {
    this.running = false;
  }

  public unpause() {
    this.running = true;
  }

  public update(delta: number) {
    if (this.running) {
      if (this.timestamp >= COORDINATOR_TICK) {
        this.timestamp = 0;
        this.step += 1;
        this.tick();
      }
      this.timestamp += delta;
    }
  }

  private tick() {
    this.events = this.events.filter(event => {
      if (this.step >= event.time) {
        this.fireEvent(event);
      }
      return event.time > this.step;
    });
  }
}
