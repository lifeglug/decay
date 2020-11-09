export enum EventType {
  OFFLINE = 'OFFLINE',
  CORRUPTION = 'CORRUPTION',
  DIALOG = 'DIALOG',
  RANDOM = 'RANDOM'
}

export interface TimedEvent {
  type: string;
  time: number;
  context?: any;
}
