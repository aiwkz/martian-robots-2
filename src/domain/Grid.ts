import { MAX_COORDINATE_VALUE } from '../constants';

export class Grid {
  readonly maxX: number;
  readonly maxY: number;

  private constructor(maxX: number, maxY: number) {
    this.maxX = maxX;
    this.maxY = maxY;
  }

  static create(maxX: number, maxY: number): Grid {
    if (Number.isNaN(maxX) || Number.isNaN(maxY) || maxX < 0 || maxY < 0) {
      throw new Error('Grid values must be positive numbers');
    }
    if (maxX > MAX_COORDINATE_VALUE || maxY > MAX_COORDINATE_VALUE) {
      throw new Error('Grid values exceed limit of 50');
    }
    return new Grid(maxX, maxY);
  }

  isWithinBounds(x: number, y: number): boolean {
    return x >= 0 && y >= 0 && x <= this.maxX && y <= this.maxY;
  }
}
