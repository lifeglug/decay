import { Keys, Rooms } from './constants';

export const translations: { [key: string]: string } = {
  [`nav-${Rooms.BRIDGE}`]: `${Keys.BRIDGE}. BRDG`,
  [`nav-${Rooms.NAVIGATION}`]: `${Keys.NAVIGATION}. NAV`,
  [`nav-${Rooms.SENSORS}`]: `${Keys.SENSORS}. SNSR`,
  [`nav-${Rooms.POWER}`]: `${Keys.POWER}. PWR`,
  [`nav-${Rooms.LIFE_SUPPORT}`]: `${Keys.LIFE_SUPPORT}. LSUP`,
  [`nav-${Rooms.ENGINES}`]: `${Keys.ENGINES}. ENG`,
  'status-power': 'PWR: ',
  'status-air': 'AIR: ',
  'status-distance': 'DST: ',
  'dialog-next': '>>>.',
  'dialog-end': 'END.'
};

export const _ = (id: string) => {
  return translations[id];
};
