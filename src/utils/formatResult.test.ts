import { describe, it, expect } from 'vitest';
import { formatResult } from './formatResult';
import { Position } from '../domain/Position';

describe('formatResult()', () => {
  it('formats non-lost robot', () => {
    const result = formatResult({
      position: Position.create(1, 1),
      direction: 'E',
      lost: false,
    });
    expect(result).toEqual({ text: '1 1 E', lost: false });
  });

  it('formats lost robot (text does not include LOST)', () => {
    const result = formatResult({
      position: Position.create(3, 3),
      direction: 'N',
      lost: true,
    });
    expect(result).toEqual({ text: '3 3 N', lost: true });
  });
});
