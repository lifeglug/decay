import {
  BUTTON_GUTTER,
  BUTTON_HEIGHT,
  BUTTON_PER_ROW,
  BUTTON_WIDTH,
  DEBUG,
  DEBUG_OUTPUT,
  HEIGHT,
  Rooms
} from '../core/constants';
import { Button } from '../ui/button';
import { UIElement } from '../ui/ui-element';
import { Room } from './room';

export class Scene {
  private mouseDown: {};
  private ui: UIElement[] = [];
  private room: Room;
  private rooms: Room[] = [
    new Room(Rooms.BRIDGE),
    new Room(Rooms.COMMS),
    new Room(Rooms.NAVIGATION),
    new Room(Rooms.SENSORS),
    new Room(Rooms.WEAPONS),
    new Room(Rooms.ENGINES)
  ];

  constructor() {
    this.createUI();
    this.changeRoom(Rooms.BRIDGE);
  }

  private changeRoom(room: Rooms) {
    this.room = this.rooms.find(r => r.room === room);

    this.ui = this.ui.map(element => {
      if (element?.['room']) {
        element.setActive((<Button>element).room === room);
      }
      return element;
    });

    if (DEBUG) {
      DEBUG_OUTPUT.textContent += `\nChanged room to ${room}`;
    }
  }

  private createUI() {
    const buttons = this.rooms.map(r => r.room);

    this.ui = buttons.map((key, index) => {
      const rows = Math.floor(buttons.length / BUTTON_PER_ROW);
      const row = Math.floor(index / BUTTON_PER_ROW);
      const col = index % BUTTON_PER_ROW;
      const startHeight = HEIGHT - (BUTTON_GUTTER + BUTTON_HEIGHT * rows) - BUTTON_GUTTER;
      const l = (BUTTON_GUTTER + BUTTON_WIDTH) * col + BUTTON_GUTTER;
      let t = startHeight + (BUTTON_HEIGHT + BUTTON_GUTTER) * row;
      return new Button(l, t, BUTTON_WIDTH, BUTTON_HEIGHT, this.changeRoom.bind(this, key), index + 1, key);
    });
  }

  public onMouseMove(event: MouseEvent) {
    this.ui.map(element => {
      element.checkHover(event);
    });
  }

  public onMouseClick(event: MouseEvent) {
    this.ui.map(element => {
      element.checkClick(event);
    });
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

  public update(delta: number) {}

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.save();

    this.room.draw(ctx);

    this.ui.map(element => {
      element.draw(ctx);
    });

    ctx.restore();
  }
}
