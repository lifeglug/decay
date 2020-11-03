export enum EventType {
  OFFLINE = 'OFFLINE',
  CORRUPTION = 'CORRUPTION',
  DIALOG = 'DIALOG'
}

export interface TimedEvent {
  type: string;
  time: number;
  context?: any;
}
