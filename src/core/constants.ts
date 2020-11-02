export const DEBUG = true;
export const DEBUG_OUTPUT = document.createElement('textarea');

export const CORRUPTION_THRESHOLD = 2;

export const WIDTH = 1280;
export const HEIGHT = 720;

export const BUTTON_PER_ROW = 3;
export const BUTTON_WIDTH = 90;
export const BUTTON_HEIGHT = 30;
export const BUTTON_GUTTER = 20;

export enum Rooms {
  BRIDGE = 'BRDG',
  COMMS = 'COMM',
  NAVIGATION = 'NAV',
  SENSORS = 'SNSR',
  WEAPONS = 'WPN',
  ENGINES = 'ENG'
}
