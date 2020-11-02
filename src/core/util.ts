import { CORRUPTION_THRESHOLD, Rooms } from './constants';

import bridgeOnlineUncorrupted from '../images/bridge-online-uncorrupted.png';
import bridgeOfflineUncorrupted from '../images/bridge-offline-uncorrupted.png';
import bridgeOfflineCorrupted from '../images/bridge-offline-corrupted.png';
import commsOnlineUncorrupted from '../images/comms-online-uncorrupted.png';
import commsOfflineUncorrupted from '../images/comms-offline-uncorrupted.png';
import commsOfflineCorrupted from '../images/comms-offline-corrupted.png';
import enginesOnlineUncorrupted from '../images/engines-online-uncorrupted.png';
import enginesOfflineUncorrupted from '../images/engines-offline-uncorrupted.png';
import enginesOfflineCorrupted from '../images/engines-offline-corrupted.png';
import navigationOnlineUncorrupted from '../images/navigation-online-uncorrupted.png';
import navigationOfflineUncorrupted from '../images/navigation-offline-uncorrupted.png';
import navigationOfflineCorrupted from '../images/navigation-offline-corrupted.png';
import sensorsOnlineUncorrupted from '../images/sensors-online-uncorrupted.png';
import sensorsOfflineUncorrupted from '../images/sensors-offline-uncorrupted.png';
import sensorsOfflineCorrupted from '../images/sensors-offline-corrupted.png';
import weaponsOnlineUncorrupted from '../images/weapons-online-uncorrupted.png';
import weaponsOfflineUncorrupted from '../images/weapons-offline-uncorrupted.png';
import weaponsOfflineCorrupted from '../images/weapons-offline-corrupted.png';

export const getRoomImage = (room: Rooms, active: boolean, corruption: number): HTMLImageElement => {
  const img = document.createElement('img');

  switch (room) {
    case Rooms.BRIDGE:
      img.src = roomSwitch(
        active,
        corruption,
        bridgeOnlineUncorrupted,
        bridgeOfflineUncorrupted,
        bridgeOfflineCorrupted
      );
      break;
    case Rooms.COMMS:
      img.src = roomSwitch(active, corruption, commsOnlineUncorrupted, commsOfflineUncorrupted, commsOfflineCorrupted);
      break;
    case Rooms.ENGINES:
      img.src = roomSwitch(
        active,
        corruption,
        enginesOnlineUncorrupted,
        enginesOfflineUncorrupted,
        enginesOfflineCorrupted
      );
      break;
    case Rooms.NAVIGATION:
      img.src = roomSwitch(
        active,
        corruption,
        navigationOnlineUncorrupted,
        navigationOfflineUncorrupted,
        navigationOfflineCorrupted
      );
      break;
    case Rooms.SENSORS:
      img.src = roomSwitch(
        active,
        corruption,
        sensorsOnlineUncorrupted,
        sensorsOfflineUncorrupted,
        sensorsOfflineCorrupted
      );
      break;
    case Rooms.WEAPONS:
      img.src = roomSwitch(
        active,
        corruption,
        weaponsOnlineUncorrupted,
        weaponsOfflineUncorrupted,
        weaponsOfflineCorrupted
      );
      break;
  }

  return img;
};

export const roomSwitch = (active, corruption, online, offline, corrupted) => {
  if (active) {
    return online;
  } else if (!active && corruption < CORRUPTION_THRESHOLD) {
    return offline;
  }
  return corrupted;
};
