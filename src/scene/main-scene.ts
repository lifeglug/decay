import { AudioEngine } from '../core/audio-engine';
import {
  AIR_MAX,
  BUTTON_GUTTER,
  BUTTON_HEIGHT,
  BUTTON_PER_ROW,
  BUTTON_WIDTH,
  DISTANCE,
  HEIGHT,
  Rooms,
  SPEED,
  COORDINATOR_TICK,
  AIR_CONSUMPTION,
  Ending,
  POWER_MAX,
  Keys,
  AIR_CHARGE,
  POWER_CONSUMPTION,
  POWER_CHARGE
} from '../core/constants';
import { Dialog } from '../ui/dialog';
import { NavButton } from '../ui/nav-button';
import { Room } from '../rooms/room';
import { LifeSupportRoom } from '../rooms/life-support-room';
import { EventType, TimedEvent } from '../core/models';
import { NavRoom } from '../rooms/nav-room';
import { Scene } from './scene';
import { EngineRoom } from '../rooms/engine-room';
import { BridgeRoom } from '../rooms/bridge-room';
import { PowerRoom } from '../rooms/power-room';
import { SensorsRoom } from '../rooms/sensors-room';
import { Game } from '../core/game';

import eventsJson from '../json/events.json';
import { clamp } from '../core/util';
import { Status } from '../ui/status';

export class MainScene extends Scene {
  private power: number = POWER_MAX;
  private air: number = AIR_MAX;
  private distance: number = DISTANCE;
  private dialog: Dialog = new Dialog();
  private room: Room;
  private rooms: { [key: string]: Room } = {
    [Rooms.BRIDGE]: new BridgeRoom(),
    [Rooms.NAVIGATION]: new NavRoom(),
    [Rooms.SENSORS]: new SensorsRoom(),
    [Rooms.POWER]: new PowerRoom(),
    [Rooms.LIFE_SUPPORT]: new LifeSupportRoom(),
    [Rooms.ENGINES]: new EngineRoom()
  };
  private events: TimedEvent[] = [...eventsJson];
  private timestamp: number = 0;
  private step: number = 0;

  constructor(game: Game) {
    super(game);
    this.createUI();
    this.changeRoom(Rooms.BRIDGE);
  }

  private fireEvent(event: TimedEvent) {
    switch (event.type) {
      case EventType.CORRUPTION:
        this.corruptRoom(event.context.room, event.context.amount);
        break;
      case EventType.RANDOM:
        this.randomEvent(event.context.type, event.context.chance);
        break;
      case EventType.OFFLINE:
        this.offlineRoom(event.context.room);
        break;
      case EventType.DIALOG:
        this.running = false;
        this.dialog.startDialog(event.context.id, () => {
          this.running = true;
        });
        break;
    }
  }

  private randomEvent(type: EventType, chance: number) {
    console.log(type, chance);
  }

  private corruptRoom(room: Rooms, amount: number) {
    this.rooms[room].setCorruption(amount);
  }

  private offlineRoom(room: Rooms) {
    this.rooms[room].setOnline(false);
  }

  private changeRoom(room: Rooms) {
    this.room?.exitRoom();
    this.room = this.rooms[room];
    this.room.enterRoom();

    this.ui.setActive(element => element?.['room'] === room);
  }

  private createUI() {
    const buttons = Object.keys(this.rooms) as Rooms[];

    this.ui.addElements([
      ...buttons.map((key, index) => {
        const rows = Math.floor(buttons.length / BUTTON_PER_ROW);
        const row = Math.floor(index / BUTTON_PER_ROW);
        const col = index % BUTTON_PER_ROW;
        const startHeight = HEIGHT - (BUTTON_GUTTER + BUTTON_HEIGHT * rows) - BUTTON_GUTTER;
        const l = (BUTTON_GUTTER + BUTTON_WIDTH) * col + BUTTON_GUTTER;
        let t = startHeight + (BUTTON_HEIGHT + BUTTON_GUTTER) * row;
        return new NavButton(l, t, BUTTON_WIDTH, BUTTON_HEIGHT, this.changeRoom.bind(this, key), index + 1, key);
      }),
      new Status(() => [this.power, this.air, this.distance])
    ]);
  }

  private endGame(ending: Ending) {
    this.running = false;
    console.log(ending);
  }

  public onMouseMove(event: MouseEvent, scale: number) {
    if (this.running) {
      this.ui.onMouseMove(event, scale);
      this.room.onMouseMove(event, scale);
    }
    this.dialog.onMouseMove(event, scale);
  }

  public onMouseClick(event: MouseEvent, scale: number) {
    if (this.running) {
      this.ui.onMouseClick(event, scale);
      this.room.onMouseClick(event, scale);
    }
    this.dialog.onMouseClick(event, scale);
  }

  public onKeyDown({ key }: KeyboardEvent) {
    if (this.running) {
      switch (key.toLocaleLowerCase()) {
        case Keys.MUTE:
          AudioEngine.toggleMute();
          break;
        case Keys.BRIDGE:
          this.changeRoom(Rooms.BRIDGE);
          break;
        case Keys.NAVIGATION:
          this.changeRoom(Rooms.NAVIGATION);
          break;
        case Keys.SENSORS:
          this.changeRoom(Rooms.SENSORS);
          break;
        case Keys.LIFE_SUPPORT:
          this.changeRoom(Rooms.LIFE_SUPPORT);
          break;
        case Keys.POWER:
          this.changeRoom(Rooms.POWER);
          break;
        case Keys.ENGINES:
          this.changeRoom(Rooms.ENGINES);
          break;
      }
    }
  }

  public update(delta: number) {
    this.ui.update(delta);

    if (this.running) {
      if (this.timestamp >= COORDINATOR_TICK) {
        this.timestamp = 0;
        this.step += 1;
        this.tick();
      }

      this.room.update(delta);

      this.timestamp += delta;
    }
  }

  private tick() {
    this.ui.tick();

    this.events = this.events.filter(event => {
      if (this.step >= event.time) {
        this.fireEvent(event);
      }
      return event.time === null || event.time > this.step;
    });

    if (!this.rooms[Rooms.POWER].isOnline()) {
      this.power = clamp(this.power - POWER_CONSUMPTION, 0, POWER_MAX);
    } else {
      this.power = clamp(this.power + POWER_CHARGE, 0, POWER_MAX);
    }

    const hasPower = this.power > 0;

    if (!hasPower || !this.rooms[Rooms.LIFE_SUPPORT].isOnline()) {
      this.air = clamp(this.air - AIR_CONSUMPTION, 0, AIR_MAX);
    } else {
      this.air = clamp(this.air + AIR_CHARGE, 0, AIR_MAX);
    }

    if (hasPower && this.rooms[Rooms.ENGINES].isOnline()) {
      this.distance -= SPEED;
    }

    if (this.air <= 0) {
      this.endGame(Ending.NO_AIR);
    }

    if (this.distance <= 0) {
      this.endGame(Ending.REACHED_DESTINATION);
    }
  }

  public draw(ctx: CanvasRenderingContext2D, scale: number) {
    ctx.save();
    this.room.draw(ctx, scale);
    this.ui.draw(ctx, scale);
    this.dialog.draw(ctx, scale);
    ctx.restore();
  }
}
