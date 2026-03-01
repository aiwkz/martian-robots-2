import { MAX_COORDINATE_VALUE } from '../constants';

export class Position {
  readonly x: number;
  readonly y: number;

  private constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  private static isValid(x: number, y: number): boolean {
    return (
      !Number.isNaN(x) && !Number.isNaN(y) &&
      x >= 0 && y >= 0 &&
      x <= MAX_COORDINATE_VALUE && y <= MAX_COORDINATE_VALUE
    );
  }

  static create(x: number, y: number): Position {
    if (!Position.isValid(x, y)) {
      throw new Error('Robot position values must be positive numbers within limit');
    }
    return new Position(x, y);
  }

  static tryCreate(x: number, y: number): Position | null {
    if (!Position.isValid(x, y)) return null;
    return new Position(x, y);
  }

  toKey(): string {
    return `${this.x},${this.y}`;
  }
}
