export const DEBUG = true;

export const COORDINATOR_TICK = 1000;
export const CORRUPTION_THRESHOLD = 2;

export const WIDTH = 512;
export const HEIGHT = 288;

export const BUTTON_PER_ROW = 3;

export const AIR_MAX = 90;
export const AIR_CHARGE = 2;
export const AIR_CONSUMPTION = 1;
export const DISTANCE = 900;
export const SPEED = 1;
export const POWER_MAX = 100;
export const POWER_CHARGE = 1;
export const POWER_CONSUMPTION = 2;

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
  POWER = 'POWER',
  LIFE_SUPPORT = 'LIFE_SUPPORT',
  ENGINES = 'ENGINES'
}

export const Keys = {
  [Rooms.BRIDGE]: '1',
  [Rooms.NAVIGATION]: '2',
  [Rooms.SENSORS]: '3',
  [Rooms.POWER]: '4',
  [Rooms.LIFE_SUPPORT]: '5',
  [Rooms.ENGINES]: '6',
  MUTE: 'm'
};
