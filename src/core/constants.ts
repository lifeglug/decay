export const DEBUG = true;

export const COORDINATOR_TICK = 1000;
export const CORRUPTION_THRESHOLD = 2;

export const WIDTH = 1280;
export const HEIGHT = 720;

export const BUTTON_PER_ROW = 3;
export const BUTTON_WIDTH = 90;
export const BUTTON_HEIGHT = 30;
export const BUTTON_GUTTER = 20;

export const AIR_MAX = 90;
export const AIR_CONSUMPTION = 1;
export const DISTANCE = 900;
export const SPEED = 1;

export enum Ending {
  NO_AIR = 'NO_AIR',
  REACHED_DESTINATION = 'REACHED_DESTINATION',
  LOST_SELF = 'LOST_SELF',
  WORSHIP = 'WORSHIP'
}

export enum Rooms {
  BRIDGE = 'BRIDGE',
  NAVIGATION = 'NAVIGATION',
  SENSORS = 'SENSORS',
  WEAPONS = 'WEAPONS',
  LIFE_SUPPORT = 'LIFE_SUPPORT',
  ENGINES = 'ENGINES'
}
