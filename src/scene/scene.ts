import { BUTTON_GUTTER, BUTTON_HEIGHT, BUTTON_PER_ROW, BUTTON_WIDTH, HEIGHT, Rooms } from '../core/constants';
import { Coordinator, EventType, TimedEvent } from '../core/coordinator';
import { Dialog } from '../ui/dialog';
import { NavButton } from '../ui/nav-button';
import { UI } from '../ui/ui';
import { Room } from './room';

export class Scene {
  private ui: UI = new UI();
  private dialog: Dialog = new Dialog();
  private room: Room;
  private rooms: Room[] = [
    new Room(Rooms.BRIDGE),
    new Room(Rooms.COMMS),
    new Room(Rooms.NAVIGATION),
    new Room(Rooms.SENSORS),
    new Room(Rooms.WEAPONS),
    new Room(Rooms.ENGINES)
  ];
  private coordinator: Coordinator = new Coordinator(this.fireEvent.bind(this));

  constructor() {
    this.createUI();
    this.changeRoom(Rooms.BRIDGE);
    this.coordinator.start();
  }

  private fireEvent(event: TimedEvent) {
    switch (event.type) {
      case EventType.CORRUPTION:
        this.corruptRoom(event.context.room, event.context.amount);
        break;
      case EventType.OFFLINE:
        this.offlineRoom(event.context.room);
        break;
      case EventType.DIALOG:
        this.coordinator.pause();
        this.dialog.startDialog(event.context.id, () => {
          this.coordinator.unpause();
        });
        break;
    }
  }

  private corruptRoom(room: Rooms, amount: number) {
    this.rooms.map(r => {
      if (r.room === room) {
        r.setCorruption(amount);
      }
    });
  }

  private offlineRoom(room: Rooms) {
    this.rooms.map(r => {
      if (r.room === room) {
        r.setOnline(false);
      }
    });
  }

  private changeRoom(room: Rooms) {
    this.room = this.rooms.find(r => r.room === room);

    this.ui.setActive(element => element?.['room'] === room);
  }

  private createUI() {
    const buttons = this.rooms.map(r => r.room);

    this.ui.addElements([
      ...buttons.map((key, index) => {
        const rows = Math.floor(buttons.length / BUTTON_PER_ROW);
        const row = Math.floor(index / BUTTON_PER_ROW);
        const col = index % BUTTON_PER_ROW;
        const startHeight = HEIGHT - (BUTTON_GUTTER + BUTTON_HEIGHT * rows) - BUTTON_GUTTER;
        const l = (BUTTON_GUTTER + BUTTON_WIDTH) * col + BUTTON_GUTTER;
        let t = startHeight + (BUTTON_HEIGHT + BUTTON_GUTTER) * row;
        return new NavButton(l, t, BUTTON_WIDTH, BUTTON_HEIGHT, this.changeRoom.bind(this, key), index + 1, key);
      })
    ]);
  }

  public onMouseMove(event: MouseEvent, scale: number) {
    this.ui.onMouseMove(event, scale);
    this.room.onMouseMove(event, scale);
    this.dialog.onMouseMove(event, scale);
  }

  public onMouseClick(event: MouseEvent, scale: number) {
    this.ui.onMouseClick(event, scale);
    this.room.onMouseClick(event, scale);
    this.dialog.onMouseClick(event, scale);
  }

  public onKeyDown({ key }: KeyboardEvent) {
    switch (key.toLocaleLowerCase()) {
      case '1':
        this.changeRoom(Rooms.BRIDGE);
        break;
      case '2':
        this.changeRoom(Rooms.COMMS);
        break;
      case '3':
        this.changeRoom(Rooms.NAVIGATION);
        break;
      case '4':
        this.changeRoom(Rooms.SENSORS);
        break;
      case '5':
        this.changeRoom(Rooms.WEAPONS);
        break;
      case '6':
        this.changeRoom(Rooms.ENGINES);
        break;
    }
  }

  public update(delta: number) {
    this.coordinator.update(delta);
  }

  public draw(ctx: CanvasRenderingContext2D, scale: number) {
    ctx.save();
    this.room.draw(ctx, scale);
    this.ui.draw(ctx, scale);
    this.dialog.draw(ctx, scale);
    ctx.restore();
  }
}
