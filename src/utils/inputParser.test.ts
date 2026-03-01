import { describe, it, expect } from 'vitest';
import { inputParser } from './inputParser';

describe('inputParser() — happy paths', () => {
  it('handles extra whitespace between grid values', () => {
    const result = inputParser('5  3\n1 1 E\nF');
    expect(result.grid.maxX).toBe(5);
    expect(result.grid.maxY).toBe(3);
  });

  it('parses single robot', () => {
    const result = inputParser('5 3\n1 1 E\nRFRFRFRF');
    expect(result.grid.maxX).toBe(5);
    expect(result.grid.maxY).toBe(3);
    expect(result.robots).toHaveLength(1);
    expect(result.robots[0].position.x).toBe(1);
    expect(result.robots[0].position.y).toBe(1);
    expect(result.robots[0].direction).toBe('E');
  });

  it('parses two robots', () => {
    const result = inputParser('5 3\n1 1 E\nRFRFRFRF\n3 2 N\nFRRFLLFFRRFLL');
    expect(result.robots).toHaveLength(2);
  });
});

describe('inputParser() — error paths', () => {
  it('throws on empty string', () => {
    expect(() => inputParser('')).toThrow('No valid input');
  });

  it('throws when grid line has 1 value', () => {
    expect(() => inputParser('5\n1 1 E\nF')).toThrow(
      'Grid values should be two values'
    );
  });

  it('throws when grid line has 3+ values', () => {
    expect(() => inputParser('5 3 1\n1 1 E\nF')).toThrow(
      'Grid values should be two values'
    );
  });

  it('throws when grid line has one value with trailing space', () => {
    expect(() => inputParser('5 \n1 1 E\nF')).toThrow(
      'Grid values should be two values'
    );
  });

  it('throws on odd robot lines (position with no instruction)', () => {
    expect(() => inputParser('5 3\n1 1 E')).toThrow();
  });

  it('throws when grid coords exceed 50', () => {
    expect(() => inputParser('51 3\n1 1 E\nF')).toThrow();
  });

  it('throws when robot has invalid position', () => {
    expect(() => inputParser('5 3\n-1 1 E\nF')).toThrow();
  });
});
