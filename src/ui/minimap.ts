import { UIImage } from './ui-image';

export class Minimap extends UIImage {
  constructor(x: number, y: number, width: number, height: number, onClick: () => {}) {
    super(x, y, width, height, onClick, 'minimap-bg');
  }
}
