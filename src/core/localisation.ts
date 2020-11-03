import { Rooms } from './constants';

export const translations: { [key: string]: string } = {
  [`nav-${Rooms.BRIDGE}`]: '1. BRDG',
  [`nav-${Rooms.NAVIGATION}`]: '2. NAV',
  [`nav-${Rooms.SENSORS}`]: '3. SNSR',
  [`nav-${Rooms.WEAPONS}`]: '4. WPN',
  [`nav-${Rooms.LIFE_SUPPORT}`]: '5. LSUP',
  [`nav-${Rooms.ENGINES}`]: '6. ENG'
};

export const _ = (id: string) => {
  return translations[id];
};
