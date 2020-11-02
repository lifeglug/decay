import { Rooms } from './constants';

export const translations: { [key: string]: string } = {
  [`nav-${Rooms.BRIDGE}`]: '1. BRDG',
  [`nav-${Rooms.COMMS}`]: '2. COMM',
  [`nav-${Rooms.NAVIGATION}`]: '3. NAV',
  [`nav-${Rooms.SENSORS}`]: '4. SNSR',
  [`nav-${Rooms.WEAPONS}`]: '5. WPN',
  [`nav-${Rooms.ENGINES}`]: '6. ENG'
};

export const _ = (id: string) => {
  return translations[id];
};
