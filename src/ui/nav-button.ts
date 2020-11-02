import { Rooms } from '../core/constants';
import { _ } from '../core/localisation';
import { Button } from './button';

export class NavButton extends Button {
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    onClick: () => {},
    protected hotkey: number,
    public room: Rooms
  ) {
    super(x, y, width, height, onClick, _(`nav-${room}`));
  }
}
