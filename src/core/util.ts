import { Room } from '../rooms/room';
import { CORRUPTION_THRESHOLD, Rooms } from './constants';
import { Loader } from './loader';

export const getRoomImage = (room: Rooms, active: boolean, corruption: number): HTMLImageElement => {
  return Loader.getImage(
    `${room.toLocaleLowerCase()}-${active ? 'online' : 'offline'}-${
      corruption >= CORRUPTION_THRESHOLD ? 'corrupted' : 'uncorrupted'
    }`
  );
};

export const getPortraitImage = (id: string): HTMLImageElement => {
  return Loader.getImage(id);
};

export const getNavImages = (room: Rooms): HTMLImageElement[] => {
  return [
    Loader.getImage(`nav-${room.toLocaleLowerCase()}`),
    Loader.getImage(`nav-${room.toLocaleLowerCase()}-active`)
  ];
};

export const clamp = (value: number, min: number, max: number) => {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
};
